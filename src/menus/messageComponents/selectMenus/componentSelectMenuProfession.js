const { MessageActionRow } = require("discord.js");
const { SelectMenu } = require("..");
const { professionsSettings } = require("../../../config.json");

module.exports = class SelectMenuProfession extends MessageActionRow {
  // Refactor-here this can maybe take menu state instead ?
  constructor(proficiency, profession, memberUtils, professionsData) {
    super();
    this.availableProfessions = professionsData;
    if (proficiency) {
      const currentProficiency = memberUtils.getRolesByColor(proficiency.color);
      if (currentProficiency.size == proficiency.max) {
        const filter = (profItem) =>
          proficiency.value === "main"
            ? !memberUtils.getRoleByNameAndColor(
                profItem.value,
                professionsSettings.mentorColor
              )
            : memberUtils.getRoleByNameAndColor(
                profItem.value,
                proficiency.color
              );
        this.availableProfessions = professionsData.filter((profItem) =>
          filter(profItem)
        );
      }
    }
    this.component = new SelectMenu(
      {
        customId: "profession",
        placeholder: "Select A profession",
        // eslint-disable-next-line no-unneeded-ternary
        disabled: proficiency ? false : true,
      },
      this.availableProfessions,
      profession
    );
    this.addComponents(this.component);
  }
};
