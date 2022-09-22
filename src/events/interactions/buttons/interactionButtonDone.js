const { ClassGW2Profession } = require("../../../classes/ClassGW2Profession");
const ModalPersonalMessage = require("../../../classes/menus/modals/modalPersonalMessage");
const { MemberUtils } = require("../../../utils");

module.exports = {
  customId: "done",
  async execute(interaction) {
    const user = new ClassGW2Profession(interaction.member);
    user.finishSelection();
    const member = new MemberUtils(interaction.member);
    if (member.isMember()) return;

    await interaction.showModal(new ModalPersonalMessage(interaction.user));
  },
};
