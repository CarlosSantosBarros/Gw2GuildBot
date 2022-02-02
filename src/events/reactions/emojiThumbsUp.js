const { ServerUtils } = require("../../utils");
const { InterfaceGuildApplication } = require("../../database/");
module.exports = {
  name: "👍",
  async execute(messageReaction, user) {
    const server = new ServerUtils();
    const appChan = server.getApplicationChan();
    if (messageReaction.message.channel == appChan) {
      const dbApp = new InterfaceGuildApplication();
      const data = await dbApp.getAll({
        where: { applicationStatus: { reason: "yeah yeah yeah" } },
      });
      console.log(data);
    }
  },
};
