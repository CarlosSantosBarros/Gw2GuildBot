const { ServerUtils } = require("../../utils");
const {
  ClassGuildApplication,
} = require("../../classes/ClassGuildApplication");
module.exports = {
  name: "GUILD_TEXT",
  async execute(message) {
    const server = new ServerUtils();
    if (server.isApplicationChan(message.channel)) {
      if (message.author.bot) {
        await message.react("📝");
        await message.react("👍");
      } else {
        const application = new ClassGuildApplication(message.author);
        application.addReason(message);
      }
      await message.react("✅");
      await message.react("🚫");
      await message.react("⚠️");
    }
  },
};
