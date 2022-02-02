const { ServerUtils } = require("../../utils");
const { InterfaceGuildApplication } = require("../../database/");
module.exports = {
  name: "🚫",
  async execute(messageReaction, user) {
    const server = new ServerUtils();
    const appChan = server.getApplicationChan();
    if (messageReaction.message.channel == appChan) {
      console.log("denied");
      const dbApp = new InterfaceGuildApplication();
      dbApp.setSelector({
        where: { applicationId: messageReaction.message.id },
      });
      dbApp.update({ applicationStatus: { status: "denied", reason: "nope" } });
    }
  },
};
