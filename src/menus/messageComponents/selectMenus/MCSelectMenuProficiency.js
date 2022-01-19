const { MessageActionRow } = require("discord.js");
const { SelectMenu } = require("..");

module.exports = class SelectMenuProficiency extends MessageActionRow {
  // Refactor-here this can maybe take menu state instead ?
  constructor(state, data) {
    super();
    console.log(state);
    this.addComponents(
      new SelectMenu(
        {
          customId: "proficiency",
          placeholder: "Proficiency",
        },
        data,
        state.proficiency ? state.proficiency.value : null
      )
    );
  }
};
