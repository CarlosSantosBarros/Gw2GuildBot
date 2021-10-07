const Discord = require("discord.js");
const { log } = require("../utils/utilsDiscord");
const { findJSStartingWith_In_AndDo_ } = require("../utils/utils");
//const { refreshCommands } = require("../utils/utilsSlashCommands");

module.exports = async (client) => {
  client.slashCommands = new Discord.Collection();

  const loadSlashCommand = (fileItem) => {
    const slashCommand = require(`./${fileItem}`);
    log("Loading: " + slashCommand.data.name);
    client.slashCommands.set(slashCommand.data.name, slashCommand);
  };
  findJSStartingWith_In_AndDo_("command", __dirname, loadSlashCommand);
  log("Commands loaded");
  // refreshCommands("commandSlash", __dirname);
};
