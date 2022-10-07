const { findJSStartingWith_In_AndDo_, log } = require("./utils");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const path = require("path");

const { token, clientId } = require("../../config.json");

const rest = new REST({ version: "9" }).setToken(token);

exports.refreshGuildCommands = async (fileFilter, dir, guildId) => {
  const commands = [];
  const loadCommand = (fileItem) => {
    const filePath = path.join(dir, `./${fileItem}`);
    const command = require(filePath);
    if (command.guildCommand) {
      log(`Refreshing: Guild ${command.data.name}`);
      commands.push(command.data.toJSON());
    }
  };
  findJSStartingWith_In_AndDo_(fileFilter, dir, loadCommand);
  await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
    body: commands,
  });
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
