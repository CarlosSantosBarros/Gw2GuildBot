const ClassGuildApplication = require("../../../classes/ClassGuildApplication");
const ModalApplicationMessages = require("../../../classes/menus/modals/modalApplicationMessages");
const { ServerUtils, getGuild } = require("../../../utils");
const { denied } = require("../../../config.json").applicationSettings;

module.exports = {
  customId: "deny",
  async execute(interaction) {
    const server = new ServerUtils(getGuild(interaction.client));
    if (server.isApplicationChan(interaction.channel)) {
      const application = new ClassGuildApplication(interaction.member, server);
      await application.deny(interaction.message.id, interaction.user.username);
      const modal = new ModalApplicationMessages(interaction.user, denied);
      interaction.showModal(modal);
    }
  },
};