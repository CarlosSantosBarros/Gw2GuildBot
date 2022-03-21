const { findJSStartingWith_In_AndDo_, log } = require("./utils");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const path = require("path");
const { client } = require("../index");
const Discord = require("discord.js");

// ------ uncomment the next line
// const { token, clientId } = require("../config.json");

// ------ comment the next two lines
const token = process.env.DISCORD_TOKEN;
const clientId = process.env.CLIENT_ID;

const rest = new REST({ version: "9" }).setToken(token);

exports.refreshGuildCommands = async (fileFilter, dir, guildId) => {
  const commands = [];
  const permedCommands = new Discord.Collection();
  const loadCommand = (fileItem) => {
    const filePath = path.join(dir, `./${fileItem}`);
    const command = require(filePath);
    if (command.guildCommand) {
      log(`Refreshing: Guild ${command.data.name}`);
      commands.push(command.data.toJSON());
    }
    if (command.perms) permedCommands.set(command.data.name, command.perms);
  };
  findJSStartingWith_In_AndDo_(fileFilter, dir, loadCommand);
  await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
    body: commands,
  });
  const registeredCommands = await client.application.commands.fetch({
    guildId: guildId,
  });
  await setCommandPermissions(registeredCommands, permedCommands);
};

exports.refreshGlobalCommands = async (fileFilter, dir) => {
  const commands = [];
  const loadCommand = (fileItem) => {
    const filePath = path.join(dir, `./${fileItem}`);
    const command = require(filePath);
    if (!command.guildCommand) {
      log(`Refreshing: Global ${command.data.name}`);
      commands.push(command.data.toJSON());
    }
  };
  findJSStartingWith_In_AndDo_(fileFilter, dir, loadCommand);

  await rest.put(Routes.applicationCommands(clientId), {
    body: commands,
  });
};

const setCommandPermissions = async (commands, perms) => {
  perms.forEach(async (permissions, key) => {
    const command = commands.find((entry) => entry.name === key);
    await command.permissions.add({ permissions });
  });
};
