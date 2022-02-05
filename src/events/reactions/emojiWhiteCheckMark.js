const { ServerUtils } = require("../../utils");
const { InterfaceGuildApplication } = require("../../classes/database");
const { client } = require("../../index");

module.exports = {
  name: "✅",
  async execute(messageReaction, user) {
    const server = new ServerUtils();
    // refactor - change to is application chan and pass channel
    const appChan = server.getApplicationChan();
    if (messageReaction.message.channel == appChan) {
      const app = client.guildAppStatus.get(user.id);
      let appId = messageReaction.message.id;
      // add config value
      let reason = "Met requirements";
      if (app) {
        appId = app.appId;
        reason = app.applicationStatus.reason;
        await messageReaction.message.delete();
      }
      const dbApp = new InterfaceGuildApplication();
      dbApp.setSelector({
        where: { applicationId: appId },
      });
      dbApp.update({
        applicationStatus: { status: "accepted", reason: reason },
      });
      client.guildAppStatus.delete(user.id);
      /**
       * check if there is app state
       * if no set default message
       * if yes get state
       * write state db with status
       */
    }
  },
};
