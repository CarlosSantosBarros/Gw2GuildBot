const MenuGW2Profession = require("../../../menus/menuGW2Professions");
module.exports = {
  customId: "profession",
  async execute(interaction) {
    const currentValue = interaction.values[0];
    const currentUser = interaction.client.gw2pState.get(interaction.user.id);
    interaction.client.gw2pState.set(interaction.user.id, {
      ...currentUser,
      profession: currentValue,
    });
    const components = new MenuGW2Profession(interaction).getComponents();
    interaction.update({ components: components });
  },
};
