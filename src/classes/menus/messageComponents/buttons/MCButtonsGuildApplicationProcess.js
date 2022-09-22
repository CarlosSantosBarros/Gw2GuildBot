const { ActionRowBuilder, ButtonStyle } = require("discord.js");
const { buildButtons } = require("..");

const buttonData = [
  { customId: "accept", label: "Accept", style: ButtonStyle.Success, disabled: false },
  { customId: "deny", label: "Deny", style: ButtonStyle.Danger, disabled: false },
  { customId: "blacklist", label: "Blacklist", style: ButtonStyle.Secondary, disabled: false },
];

module.exports = class ButtonsGuildApplicationProcess extends ActionRowBuilder {
  // Refactor-here this can maybe take menu state instead ?
  constructor() {
    super();
    this.buttons = buildButtons(buttonData);
    this.addComponents(this.buttons);
  }
};