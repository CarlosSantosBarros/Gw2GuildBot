const MenuGW2Profession = require("../../../menus/menuGW2Professions");
module.exports = {
  customId: "proficiency",
  async execute(interaction) {
    const currentValue = interaction.values[0];
    const currentUser = interaction.client.gw2pState.get(interaction.user.id);
    const proficiencyObj = interaction.client.proficiencyData.get(currentValue);
    interaction.client.gw2pState.set(interaction.user.id, {
      ...currentUser,
      proficiency: proficiencyObj,
    });
    const menu = new MenuGW2Profession(interaction).buildMenu();
    interaction.update({ components: menu });
  },
};
