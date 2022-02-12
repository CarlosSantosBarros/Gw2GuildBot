const { ServerUtils } = require("../../utils");
const {
  ClassGuildApplication,
} = require("../../classes/ClassGuildApplication");

module.exports = {
  name: "⚠️",
  async execute(messageReaction, user) {
    const server = new ServerUtils();
    if (server.isApplicationChan(messageReaction.message.channel)) {
      const application = new ClassGuildApplication(user);
      const data = await application.blackList(messageReaction.message);
      console.log(data);
    }
  },
};
