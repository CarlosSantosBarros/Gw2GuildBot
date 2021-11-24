const { MessageActionRow } = require("discord.js");
const { buildButtons } = require("./messageComponents");

const buttonData = [
  { customId: "yes", label: "Yes", style: "PRIMARY", disabled: false },
  { customId: "no", label: "No", style: "PRIMARY", disabled: false },
];

exports.menuYesNo = () => {
  const buttons = buildButtons(buttonData);
  return [new MessageActionRow().addComponents(buttons)];
};
