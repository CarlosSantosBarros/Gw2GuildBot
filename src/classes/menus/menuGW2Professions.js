const { MessageActionRow } = require("discord.js");
const { buildButtons, SelectMenu } = require("./messageComponents");
const { professionsSettings } = require("../../config.json");

const buttonData = [
  { customId: "set", label: "Set", style: "PRIMARY", disabled: true },
  { customId: "add", label: "Add", style: "PRIMARY", disabled: true },
  { customId: "remove", label: "Remove", style: "PRIMARY", disabled: true },
  { customId: "done",
    label: "Done",
    style: "SUCCESS",
    emoji: "870320857837346887",
    disabled: false,
  },
];

// This can be a class

module.exports = class MenuGW2Profession {
  constructor() {
    this.selectedProficiencyValue;
    this.selectedProfessionValue;
    this.buttonAction;
    this.availableProfessions = professionsSettings.professionsData;
  }

  setProficiencyValue(value) { this.selectedProficiencyValue = value; }
  setProfessionValue(value) { this.selectedProfessionValue = value; }
  setButtonAction(value) { this.buttonAction = value; }
  setAvailableProfessions(value) { this.availableProfessions = value; }
  buildMenu() {
    const selectProficiency = new SelectMenu(
      {
        customId: "proficiency",
        placeholder: "Proficiency",
      },
      professionsSettings.proficiencyData,
      this.selectedProficiencyValue
    );
    const selectProfession = new SelectMenu(
      {
        customId: "profession",
        placeholder: "Select A profession",
        // eslint-disable-next-line no-unneeded-ternary
        disabled: this.selectedProficiencyValue ? false : true,
      },
      this.availableProfessions,
      this.selectedProfessionValue
    );

    const buttons = buildButtons(buttonData, this.buttonAction);

    return [
      new MessageActionRow().addComponents(selectProficiency),
      new MessageActionRow().addComponents(selectProfession),
      new MessageActionRow().addComponents(buttons),
    ];
  }
};
