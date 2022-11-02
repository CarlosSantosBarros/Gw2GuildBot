const { ActionRowBuilder, ButtonStyle } = require("discord.js");
const { buildButtons } = require("..");

const buttonData = [
  { customId: "continue", label: "Continue", style: ButtonStyle.Primary, disabled: true },
];

module.exports = class ButtonsGuildApplication extends ActionRowBuilder {
  // Refactor-here this can maybe take menu state instead ?
  constructor(state) {
    super();
    if (state.isLegal && state.willRoleSwap) this.buttonAction = "continue";

    this.buttons = buildButtons(buttonData, this.buttonAction);
    this.addComponents(this.buttons);
  }
};
