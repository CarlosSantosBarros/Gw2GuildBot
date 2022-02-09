const {
  ClassGuildApplication,
} = require("../../../classes/ClassGuildApplication");
const MenuGuildApplication = require("../../../menus/menuGuildApplication");
module.exports = {
  customId: "willRoleSwap",
  async execute(interaction) {
    const willRoleSwap = interaction.values[0];
    const member = interaction.member;
    const application = new ClassGuildApplication(member.user);
    const state = application.selectWillRoleSwap(willRoleSwap);

    const menu = new MenuGuildApplication(member, state);
    const components = menu.getComponents();
    const embeds = menu.getEmbeds();
    interaction.update({ components: components, embeds: embeds });
  },
};
