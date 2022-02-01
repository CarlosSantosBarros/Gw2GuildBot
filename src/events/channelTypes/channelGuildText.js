const { ServerUtils } = require("../../utils");

module.exports = {
  name: "GUILD_TEXT",
  async execute(message) {
    const server = new ServerUtils();
    const appChan = server.getApplicationChan();
    if (message.channel == appChan)
      if (message.author.bot) {
        await message.react("✅");
        await message.react("🚫");
        await message.react("⚠️");
        await message.react("👋");
        await message.react("👍");
      } else {
      }
  },
};
