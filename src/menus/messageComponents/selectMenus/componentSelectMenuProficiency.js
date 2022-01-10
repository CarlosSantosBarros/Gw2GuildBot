const { MessageActionRow } = require("discord.js");
const { SelectMenu } = require("..");

module.exports = class SelectMenuProficiency extends MessageActionRow {
  // Refactor-here this can maybe take menu state instead ?
  constructor(proficiency, proficiencyData) {
    super();
    this.component = new SelectMenu(
      {
        customId: "proficiency",
        placeholder: "Proficiency",
      },
      proficiencyData,
      proficiency ? proficiency.value : null
    );
    this.addComponents(this.component);
  }
};
