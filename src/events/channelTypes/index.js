const Discord = require("discord.js");
const { log, findJSStartingWith_In_AndDo_ } = require("../../utils/utils");

module.exports = async (client) => {
  client.channelTypes = new Discord.Collection();

  const loadReaction = (fileItem) => {
    const channel = require(`./${fileItem}`);
    log(`Loading: ${channel.name}`);
    client.channelTypes.set(channel.name, channel);
  };
  findJSStartingWith_In_AndDo_("channel", __dirname, loadReaction);
  log("Channels loaded");
};
