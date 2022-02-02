const { ServerUtils } = require("../../utils");
const { client } = require("../../index");
module.exports = {
  name: "📝",
  async execute(messageReaction, user) {
    const server = new ServerUtils();
    // refactor - change to isApplicationChan(channel)
    const appChan = server.getApplicationChan();
    if (messageReaction.message.channel == appChan)
      client.guildAppStatus.set(user.id, {
        appId: messageReaction.message.id,
      });
    /**
     * if in app chan
     * make state entry - key:user
     * entry: {
     *      appId: messageID,
     * }
     */
  },
};
