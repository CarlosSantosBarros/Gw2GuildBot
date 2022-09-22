const ClassGuildApplication = require("../../../classes/ClassGuildApplication");
const ModalApplicationMessages = require("../../../classes/menus/modals/modalApplicationMessages");
const { ServerUtils } = require("../../../utils");
const { getGuild } = require("../../../utils/utils");
const { accepted } = require("../../../config.json").applicationSettings;

module.exports = {
  customId: "accept",
  async execute(interaction) {
    const server = new ServerUtils(getGuild(interaction.client));
    if (server.isApplicationChan(interaction.channel)) {
      const application = new ClassGuildApplication(interaction.user);
      await application.accept(interaction.message.id, interaction.user.username);
      const modal = new ModalApplicationMessages(interaction.user, accepted);
      interaction.showModal(modal);
    }
  },
};
