const { SlashCommandBuilder } = require("@discordjs/builders");
const { findJSStartingWith_In_AndDo_ } = require("./utils");
const { log } = require("./utilsDiscord");
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
  findJSStartingWith_In_AndDo_("sub", subfolder, loadSubcommands);
  return commandObj;
};

/*maybe dont need to put this here and can go straight
 into refresh command file as its probs only used here */
exports.refreshCommands = async (fileFilter, dir) => {
  const commands = [];
  const token = process.env.DISCORD_TOKEN;
  const clientId = process.env.CLIENT_ID;
  const guildId = process.env.GUILD_ID;
  const rest = new REST({ version: "9" }).setToken(token);

  const loadCommand = (fileItem) => {
    const filePath = path.join(dir, `./${fileItem}`);
    const command = require(filePath);
    log("Refreshing: " + command.data.name);
    commands.push(command.data.toJSON());
  };
  findJSStartingWith_In_AndDo_(fileFilter, dir, loadCommand);

  await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
    body: commands,
  });
};
