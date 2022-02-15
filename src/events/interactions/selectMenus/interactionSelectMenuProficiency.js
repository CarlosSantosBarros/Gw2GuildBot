const { ClassGW2Profession } = require("../../../classes/ClassGW2Profession");

module.exports = {
  customId: "proficiency",
  async execute(interaction) {
    const currentValue = interaction.values[0];
    const member = interaction.member;
    const user = new ClassGW2Profession(member);
    user.selectProficiency(currentValue);
    user.updateMessage(interaction);
  },
};
