const { ServerUtils } = require("../../utils");
const {
  ClassGuildApplication,
} = require("../../classes/ClassGuildApplication");

module.exports = {
  name: "✅",
  async execute(messageReaction, user) {
    const server = new ServerUtils();
    // refactor - change to is application chan and pass channel
    if (server.isApplicationChan(messageReaction.message.channel)) {
      const application = new ClassGuildApplication(user);
      application.onWhiteCheckMark(messageReaction.message);
    }
  },
};
