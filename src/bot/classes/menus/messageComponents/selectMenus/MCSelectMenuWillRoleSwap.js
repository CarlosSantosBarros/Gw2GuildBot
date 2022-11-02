const { ActionRowBuilder } = require("discord.js");
const { SelectMenu } = require("..");

module.exports = class SelectMenuWillRoleSwap extends ActionRowBuilder {
  constructor() {
    super();
    this.addComponents(
      new SelectMenu(
        {
          customId: "willRoleSwap",
          placeholder: "Are you willing to play other classes or builds?",
        },
        [
          {
            label: "Yes",
            description: "Yes I'm willing to roleswap",
            value: "Yes",
          },
          {
            label: "No",
            description: "No I'm not willing to roleswap",
            value: "No",
          },
        ],
        null
      )
    );
  }
};
