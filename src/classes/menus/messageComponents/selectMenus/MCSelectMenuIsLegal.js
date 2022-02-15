const { MessageActionRow } = require("discord.js");
const { SelectMenu } = require("..");

module.exports = class SelectMenuIsLegal extends MessageActionRow {
  constructor() {
    super();
    this.addComponents(
      new SelectMenu(
        {
          customId: "isLegal",
          placeholder: "Are you 18 or older?",
        },
        [
          {
            label: "Yes",
            description: "Yes I am 18 or older",
            value: "Yes",
          },
          {
            label: "No",
            description: "No I am younger than 18",
            value: "No",
          },
        ],
        null
      )
    );
  }
};
