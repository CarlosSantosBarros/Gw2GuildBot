const Discord = require("discord.js");
const { log, findJSStartingWith_In_AndDo_ } = require("../utils/utils");

module.exports = async (client) => {
  client.slashCommands = new Discord.Collection();

  const loadSlashCommand = (fileItem) => {
    const slashCommand = require(`./${fileItem}`);
    log("Loading: " + slashCommand.data.name);
    client.slashCommands.set(slashCommand.data.name, slashCommand);
  };
  findJSStartingWith_In_AndDo_("slashCmd", __dirname, loadSlashCommand);
  log("Commands loaded");
};
