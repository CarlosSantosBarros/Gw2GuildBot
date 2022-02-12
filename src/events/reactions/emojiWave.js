const { ServerUtils } = require("../../utils");
module.exports = {
  name: "👋",
  async execute(messageReaction, user) {
    const server = new ServerUtils();
    if (server.isApplicationChan(messageReaction.message.channel))
      console.log("left");
  },
};
