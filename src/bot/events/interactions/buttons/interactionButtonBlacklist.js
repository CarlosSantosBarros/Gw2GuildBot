const ClassGuildApplication = require("../../../classes/ClassGuildApplication");
const ModalApplicationMessages = require("../../../classes/menus/modals/modalApplicationMessages");
const { ServerUtils } = require("../../../utils");
const { getGuild } = require("../../../utils/utils");
const { blacklisted } = require("../../../../config.json").applicationSettings;

module.exports = {
  customId: "blacklist",
  async execute(interaction) {
    const server = new ServerUtils(getGuild(interaction.client));
    if (server.isApplicationChan(interaction.channel)) {
      const application = new ClassGuildApplication(interaction.user);
      await application.blackList(interaction.message.id, interaction.user.username);
      const modal = new ModalApplicationMessages(interaction.user, blacklisted);
      interaction.showModal(modal);
    }
  },
};
