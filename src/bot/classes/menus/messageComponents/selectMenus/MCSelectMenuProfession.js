const { ActionRowBuilder } = require("discord.js");
const { SelectMenu } = require("..");
const { professionsData } = require("../../../../utils/utilsCollections");


module.exports = class SelectMenuProfession extends ActionRowBuilder {
  constructor(state, member) {
    super();
    this.availableProfessions = professionsData;
    if (state.proficiency) {
      const proficiency = state.proficiency;
      const proficiencyRoles = member.getProficiencies(proficiency.color);
      if (proficiencyRoles.size === proficiency.max)
        this.availableProfessions = professionsData.filter((profItem) =>
          proficiency.value === "main"
            ? !member.isMentorFor(profItem.value)
            : member.getRoleByNameAndColor(profItem.value, proficiency.color)
        );
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
