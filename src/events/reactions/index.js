const Discord = require("discord.js");
const { log, findJSStartingWith_In_AndDo_ } = require("../../utils/utils");

module.exports = async (client) => {
  client.emoji = new Discord.Collection();

  const loadReaction = (fileItem) => {
    const emoji = require(`./${fileItem}`);
    log(`Loading: ${emoji.name}`);
    client.emoji.set(emoji.name, emoji);
  };
  findJSStartingWith_In_AndDo_("emoji", __dirname, loadReaction);
  log("Reactions loaded");
};
