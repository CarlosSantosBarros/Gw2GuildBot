const ClassGuildApplication = require("../../../classes/ClassGuildApplication");
const MenuGuildApplication = require("../../../menus/menuGuildApplication");
module.exports = {
  customId: "willRoleSwap",
  async execute(interaction) {
    const willRoleSwap = interaction.values[0];
    const member = interaction.member;
    const stateClass = new ClassGuildApplication(member.user);
    stateClass.selectWillRoleSwap(willRoleSwap);

    const menu = new MenuGuildApplication(interaction);
    const components = menu.getComponents();
    const embeds = menu.getEmbeds();
    interaction.update({ components: components, embeds: embeds });
  },
};
