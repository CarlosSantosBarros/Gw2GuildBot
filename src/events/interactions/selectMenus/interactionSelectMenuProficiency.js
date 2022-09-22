const { ClassGW2Profession } = require("../../../classes/ClassGW2Profession");

module.exports = {
  customId: "proficiency",
  async execute(interaction) {
    const member = interaction.member;
    const user = new ClassGW2Profession(member);
    user.selectProficiency(interaction);
  },
};
