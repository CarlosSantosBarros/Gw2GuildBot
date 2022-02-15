const { MessageActionRow } = require("discord.js");
const { buildButtons } = require("..");

const buttonData = [
  { customId: "set", label: "Set", style: "PRIMARY", disabled: true },
  { customId: "add", label: "Add", style: "PRIMARY", disabled: true },
  { customId: "remove", label: "Remove", style: "PRIMARY", disabled: true },
  {
    customId: "done",
    label: "Done",
    style: "SUCCESS",
    emoji: "870320857837346887",
    disabled: false,
  },
];

module.exports = class ButtonsGW2Professions extends MessageActionRow {
  // Refactor-here this can maybe take menu state instead ?
  constructor(state, member) {
    super();
    if (state.proficiency && state.profession) {
      const { proficiency, profession } = state;
      this.buttonAction = "set";
      if (proficiency.value !== "main")
        this.buttonAction = member.getRoleByNameAndColor(
          profession,
          proficiency.color
        )
          ? "remove"
          : "add";
    }
    this.buttons = buildButtons(buttonData, this.buttonAction);
    this.addComponents(this.buttons);
  }
};
