const { ServerUtils } = require("../../utils");
const {
  ClassGuildApplication,
} = require("../../classes/ClassGuildApplication");

module.exports = {
  name: "⚠️",
  async execute(messageReaction, user) {
    const server = new ServerUtils();
    const message = messageReaction.message;
    if (server.isApplicationChan(message.channel)) {
      const application = new ClassGuildApplication(user);
      await application.blackList(message, user);
      await application.updateMessage(messageReaction);
      await application.notify();
    }
  },
};
