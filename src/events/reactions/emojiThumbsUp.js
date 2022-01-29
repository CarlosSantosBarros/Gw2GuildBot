const { ServerUtils } = require("../../utils");
module.exports = {
  name: "👍",
  async execute(messageReaction, user) {
    const server = new ServerUtils();
    const appChan = server.getApplicationChan();
    if (messageReaction.message.channel == appChan)
      messageReaction.message.edit({
        content: `emoji pressed: ${messageReaction.emoji.name} by ${user.username}`,
        embeds: [],
      });
  },
};
