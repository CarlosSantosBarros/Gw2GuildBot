const MenuGW2Profession = require("../../../menus/menuGW2Professions");
const { ClassGW2Profession } = require("../../../classes/ClassGW2Profession");

module.exports = {
  customId: "profession",
  async execute(interaction) {
    const currentValue = interaction.values[0];
    const member = interaction.member;
    const user = new ClassGW2Profession(member);
    user.selectProfession(currentValue);
    const components = new MenuGW2Profession(member).getComponents();
    interaction.update({ components: components });
  },
};
