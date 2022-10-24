const { ClassGW2Profession } = require("../../../classes/ClassGW2Profession");
const ModalPersonalMessage = require("../../../classes/menus/modals/modalPersonalMessage");
const { MemberUtils, ServerUtils, getGuild } = require("../../../utils");

module.exports = {
  customId: "done",
  async execute(interaction) {
    const server = new ServerUtils(getGuild(interaction.client));
    const user = new ClassGW2Profession(interaction.member, server);
    user.finishSelection();
    const member = new MemberUtils(interaction.member, server);
    if (!member.isMember()) await interaction.showModal(new ModalPersonalMessage(interaction.user));
    else await interaction.update({
      content: 'You have finished selecting your professions',
      components: [],
      embeds: [],
    });
  },
};
