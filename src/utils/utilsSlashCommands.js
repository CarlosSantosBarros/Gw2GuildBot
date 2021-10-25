const { SlashCommandBuilder } = require("@discordjs/builders");
const { findJSStartingWith_In_AndDo_ } = require("./utils");
const { log } = require("./utils");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const path = require("path");

exports.createCommandData = (config) => {
  const { subfolder, name, description, subCommandCollection } = config;
  const commandObj = new SlashCommandBuilder()
    .setName(name)
    .setDescription(description);

  const loadSubcommands = (fileItem) => {
    const subCom = require(subfolder + fileItem);
    commandObj.addSubcommand((subcommand) => subCom.configure(subcommand));
    subCommandCollection.set(subCom.config.name, subCom);
  };
  findJSStartingWith_In_AndDo_("slashSub", subfolder, loadSubcommands);
  return commandObj;
};

const token = process.env.DISCORD_TOKEN;
const clientId = process.env.CLIENT_ID;
const rest = new REST({ version: "9" }).setToken(token);

exports.refreshGuildCommands = async (fileFilter, dir, guildId) => {
  const commands = [];
  const loadCommand = (fileItem) => {
    const filePath = path.join(dir, `./${fileItem}`);
    const command = require(filePath);
    if (command.guildCommand) {
      log("Refreshing: Guild " + command.data.name);
      commands.push(command.data.toJSON());
    }
  };
  findJSStartingWith_In_AndDo_(fileFilter, dir, loadCommand);
  await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
    body: commands,
    defaultPermission: false,
  });
};

exports.refreshGlobalCommands = async (fileFilter, dir) => {
  const commands = [];
  const loadCommand = (fileItem) => {
    const filePath = path.join(dir, `./${fileItem}`);
    const command = require(filePath);
    if (!command.guildCommand) {
      log("Refreshing: Global " + command.data.name);
      commands.push(command.data.toJSON());
    }
  };
  findJSStartingWith_In_AndDo_(fileFilter, dir, loadCommand);

  await rest.put(Routes.applicationCommands(clientId), {
    body: commands,
  });
};
