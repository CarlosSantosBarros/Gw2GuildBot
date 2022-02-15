const { ClassGW2Profession } = require("../../../classes/ClassGW2Profession");

module.exports = {
  customId: "set",
  async execute(interaction) {
    const member = interaction.member;
    const user = new ClassGW2Profession(member);
    await user.setProfession();
    user.updateMessage(interaction);
  },
};
