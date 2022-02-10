const {
  ClassGuildApplication,
} = require("../../classes/ClassGuildApplication");
const { ServerUtils } = require("../../utils");
module.exports = {
  name: "⚠️",
  async execute(messageReaction, user) {
    const server = new ServerUtils();
    const appChan = server.getApplicationChan();
    if (messageReaction.message.channel == appChan) {
      const application = new ClassGuildApplication(user);
      application.blackList(messageReaction.message);
      const data = await application.get();
      console.log(data);
    }
  },
};
