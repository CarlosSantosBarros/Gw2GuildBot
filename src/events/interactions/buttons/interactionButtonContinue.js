const MenuGW2Profession = require("../../../menus/menuGW2Professions");
const { ClassGW2Profession } = require("../../../classes/ClassGW2Profession");

module.exports = {
  customId: "continue",
  async execute(interaction) {
    const member = interaction.member;
    const user = new ClassGW2Profession(member);
    user.setEmptyState();
    const menu = new MenuGW2Profession(member);
    const components = menu.getComponents();
    const embeds = menu.getEmbeds();
    interaction.update({ embeds: embeds, components: components });
  },
};
