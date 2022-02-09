const {
  ClassGuildApplication,
} = require("../../../classes/ClassGuildApplication");
const MenuGuildApplication = require("../../../menus/menuGuildApplication");
module.exports = {
  customId: "isLegal",
  async execute(interaction) {
    const isLegal = interaction.values[0];
    const member = interaction.member;
    const application = new ClassGuildApplication(member.user);
    const state = application.selectIsLegal(isLegal);

    const menu = new MenuGuildApplication(member, state);
    const components = menu.getComponents();
    const embeds = menu.getEmbeds();
    interaction.update({ components: components, embeds: embeds });
  },
};
