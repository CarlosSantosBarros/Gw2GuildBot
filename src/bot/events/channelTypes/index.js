const { fileLoader } = require("../../utils");

module.exports = async (client) => {
  // client.channelTypes = new Discord.Collection();

  // const loadReaction = (fileItem) => {
  //   const channel = require(`./${fileItem}`);
  //   log(`Loading: ${channel.name}`);
  //   client.channelTypes.set(channel.name, channel);
  // };
  // findJSStartingWith_In_AndDo_("channel", __dirname, loadReaction);
  // log("Channels loaded");

  const config = {
    prefix: "channel",
    dirPath: __dirname,
  };

  client.channelTypes = fileLoader(config);
};
