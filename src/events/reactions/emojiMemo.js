const { ServerUtils } = require("../../utils");
const {
  ClassGuildApplication,
} = require("../../classes/ClassGuildApplication");

module.exports = {
  name: "📝",
  async execute(messageReaction, user) {
    const server = new ServerUtils();
    if (server.isApplicationChan(messageReaction.message.channel)) {
      const application = new ClassGuildApplication(user);
      application.toggleApplicationReason(messageReaction.message.id);
    }
  },
};
