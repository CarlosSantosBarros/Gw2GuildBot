const { InteractionType } = require("discord.js");

exports.isCommand = (interaction) => {
  return interaction.type === InteractionType.ApplicationCommand;
};
exports.isAutocomplete = (interaction) => {
  return interaction.type === InteractionType.ApplicationCommandAutocomplete;
};
exports.isMessageComponent = (interaction) => {
  return interaction.type === InteractionType.MessageComponent;
};
exports.isModalSubmit = (interaction) => {
  return interaction.type === InteractionType.ModalSubmit;
};