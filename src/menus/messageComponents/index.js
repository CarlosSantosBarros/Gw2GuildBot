const { MessageSelectMenu, MessageButton } = require("discord.js");

// TURN THIS INTO A CLASS
// https://www.w3schools.com/js/js_class_inheritance.asp

exports.SelectMenu = class SelectMenu extends MessageSelectMenu {
  constructor(baseData, selectMenuDataArray, selectedValue) {
    super(baseData);
    selectMenuDataArray.forEach((item) => {
      this.addOptions({
        label: item.label,
        description: item.description,
        value: item.value,
        emoji: item.emoji,
        // eslint-disable-next-line no-unneeded-ternary
        default: selectedValue == item.value ? true : false,
      });
    });
  }
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

exports.ButtonsGW2Professions = require("./buttons/MCButtonsGW2Professions");
exports.SelectMenuProfessions = require("./selectMenus/MCSelectMenuProfession");
exports.SelectMenuProficiency = require("./selectMenus/MCSelectMenuProficiency");
exports.SelectMenuWillRoleSwap = require("./selectMenus/MCSelectMenuWillRoleSwap");
exports.SelectMenuIsLegal = require("./selectMenus/MCSelectMenuIsLegal");
