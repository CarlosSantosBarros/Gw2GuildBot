const { ActionRowBuilder } = require("discord.js");
const { SelectMenu } = require("..");
const { proficiencyData } = require("../../../../utils/utilsCollections");

module.exports = class SelectMenuProficiency extends ActionRowBuilder {
  // Refactor-here this can maybe take menu state instead ?
  constructor(state) {
    super();
    this.addComponents(
      new SelectMenu(
        {
          customId: "proficiency",
          placeholder: "Proficiency",
        },
        proficiencyData,
        state.proficiency ? state.proficiency.value : null
      )
    );
  }
};
