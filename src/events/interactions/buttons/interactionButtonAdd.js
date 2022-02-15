const { ClassGW2Profession } = require("../../../classes/ClassGW2Profession");

module.exports = {
  customId: "add",
  async execute(interaction) {
    const member = interaction.member;
    const user = new ClassGW2Profession(member);
    await user.addProfession();
    user.updateMessage(interaction);
  },
};
