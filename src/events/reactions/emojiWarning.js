const { ServerUtils } = require("../../utils");
module.exports = {
  name: "⚠️",
  async execute(messageReaction, user) {
    const server = new ServerUtils();
    const appChan = server.getApplicationChan();
    if (messageReaction.message.channel == appChan) console.log("blacklist");
  },
};
