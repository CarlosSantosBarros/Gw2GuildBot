const { ServerUtils } = require("../../utils");
const {
  ClassGuildApplication,
} = require("../../classes/ClassGuildApplication");
const MenuGuildApplication = require("../../menus/menuGuildApplication");

module.exports = {
  name: "🚫",
  async execute(messageReaction, user) {
    const server = new ServerUtils();
    const message = messageReaction.message;
    if (server.isApplicationChan(message.channel)) {
      const application = new ClassGuildApplication(user);
      await application.deny(message);
      const state = await application.getApplication();

      const member = server.getMemberById(state.snowflake);
      const menu = new MenuGuildApplication(member, state);
      const embeds = menu.getEmbeds();
      const appMessage = await message.channel.messages.fetch(
        state.applicationId
      );
      await appMessage.edit({ embeds: embeds });
    }
  },
};
