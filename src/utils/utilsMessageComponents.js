const { MessageSelectMenu, MessageButton } = require("discord.js");

exports.buildSelectMenu = (baseData, selectMenuDataArray, selectedValue) => {
  const selectMenuObject = new MessageSelectMenu(baseData);
  selectMenuDataArray.forEach((item) => {
    let isDefault = false;
    if (selectedValue == item.value) isDefault = true;
    const optionItem = {
      label: item.label,
      description: item.description,
      value: item.value,
      emoji: item.emoji,
      default: isDefault,
    };
    selectMenuObject.addOptions(optionItem);
  });
  return selectMenuObject;
};

exports.buildButtons = (buttonDataArray, buttonAction) => {
  const buttonArray = [];
  buttonDataArray.forEach((item) => {
    const buttonItem = new MessageButton(item);
    let isDisabled = item.disabled;
    if (buttonAction == item.customId) isDisabled = false;
    buttonItem.setDisabled(isDisabled);
    buttonArray.push(buttonItem);
  });
  return buttonArray;
};
