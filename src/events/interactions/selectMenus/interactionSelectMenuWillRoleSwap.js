const ClassGuildApplication = require("../../../classes/ClassGuildApplication");
const MenuGuildApplication = require("../../../menus/menuGuildApplication");
module.exports = {
  customId: "willRoleSwap",
  async execute(interaction) {
    const willRoleSwap = interaction.values[0];
    const member = interaction.member;
    const stateClass = new ClassGuildApplication(member.user);
    stateClass.selectWillRoleSwap(willRoleSwap);

    // something is wrong here, should pass member not interaction
    const menu = new MenuGuildApplication(interaction);
    const components = menu.getComponents();
    const embeds = menu.getEmbeds();
    interaction.update({ components: components, embeds: embeds });
  },
};
