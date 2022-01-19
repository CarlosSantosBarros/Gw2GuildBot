const { MessageActionRow } = require("discord.js");
const { SelectMenu } = require("..");
const { professionsSettings } = require("../../../config.json");

module.exports = class SelectMenuProfession extends MessageActionRow {
  constructor(state, member, professionsData) {
    super();
    this.availableProfessions = professionsData;
    if (state.proficiency) {
      const proficiency = state.proficiency;
      const currentProficiency = member.getRolesByColor(proficiency.color);
      if (currentProficiency.size == proficiency.max) {
        const filter = (profItem) =>
          proficiency.value === "main"
            ? !member.getRoleByNameAndColor(
                profItem.value,
                professionsSettings.mentorColor
              )
            : member.getRoleByNameAndColor(profItem.value, proficiency.color);
        this.availableProfessions = professionsData.filter((profItem) =>
          filter(profItem)
        );
      }
    }
    this.addComponents(
      new SelectMenu(
        {
          customId: "profession",
          placeholder: "Select A profession",
          // eslint-disable-next-line no-unneeded-ternary
          disabled: state.proficiency ? false : true,
        },
        this.availableProfessions,
        state.profession
      )
    );
  }
};
