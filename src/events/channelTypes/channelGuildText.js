const { ServerUtils } = require("../../utils");
const { client } = require("../../index");
module.exports = {
  name: "GUILD_TEXT",
  async execute(message) {
    const server = new ServerUtils();
    const appChan = server.getApplicationChan();
    if (message.channel == appChan) {
      if (message.author.bot) {
        await message.react("📝");
        await message.react("👍");
      } else {
        const app = client.guildAppStatus.get(message.author.id);
        if (!app) return await message.delete();
        client.guildAppStatus.set(message.author.id, {
          ...app,
          applicationStatus: { reason: message.content },
        });
        /**
         * get app state by user
         * set app state with: ...appstate , message
         */
      }
      await message.react("✅");
      await message.react("🚫");
      await message.react("⚠️");
    }
  },
};
