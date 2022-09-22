const { SelectMenuBuilder, ButtonBuilder } = require("discord.js");

exports.SelectMenu = class SelectMenu extends SelectMenuBuilder {
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
    const buttonItem = new ButtonBuilder(item);
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
exports.ButtonsGuildApplication = require("./buttons/MCButtonsGuildApplication");
exports.ButtonsGuildApplicationProcess = require("./buttons/MCButtonsGuildApplicationProcess");
