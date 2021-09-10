const { MessageSelectMenu, MessageButton } = require("discord.js");

exports.buildSelectMenu = (config) => {
  const { id, placeholder } = config;
  const selectMenuObject = new MessageSelectMenu()
    .setCustomId(id)
    .setPlaceholder(placeholder);
  if (config.options) selectMenuObject.addOptions(config.options);
  return selectMenuObject;
};

exports.buildButton = (config) => {
  const { customId, label, style } = config;
  const buttonObject = new MessageButton()
    .setCustomId(customId)
    .setLabel(label)
    .setStyle(style);
  if (config.disabled) buttonObject.setDisabled(config.disabled);
  if (config.emoji) buttonObject.setEmoji(config.emoji);
  return buttonObject;
};
