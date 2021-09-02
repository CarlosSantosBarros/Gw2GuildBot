const Discord = require("discord.js");
const { log } = require("../utils/utilsDiscord");
const { findJSStartingWith_In_AndDo_ } = require("../utils/utils");
//const { refreshCommands } = require("../utils/utilsSlashCommands");

module.exports = async (client) => {
  client.commands = new Discord.Collection();

  const loadCommand = (fileItem) => {
    const command = require(`./${fileItem}`);
    log("Loading: " + command.data.name);
    client.commands.set(command.data.name, command);
  };
  findJSStartingWith_In_AndDo_("command", __dirname, loadCommand);
  log("Commands loaded");
  // refreshCommands("commandSlash", __dirname);
};
