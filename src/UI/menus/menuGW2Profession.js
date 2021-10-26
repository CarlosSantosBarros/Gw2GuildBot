const { MessageActionRow } = require("discord.js");
const {
  buildButtons,
  buildSelectMenu,
} = require("../../utils/utilsMessageComponents");
const {
  classDataCollection,
} = require("../../slashCommands/slashCmdGW2Class/dataGW2Class");
const baseSelect = {
  customId: "class",
  placeholder: "Select A Class",
};
const buttonData = [
  { customId: "add", label: "Add", style: "PRIMARY", disabled: true },
  { customId: "remove", label: "Remove", style: "PRIMARY", disabled: true },
  {
    customId: "done",
    label: "Done",
    style: "SUCCESS",
    emoji: "870320857837346887",
    disabled: true,
  },
];

exports.menuGW2Profession = async (rebuildOptions) => {
  if (!rebuildOptions)
    rebuildOptions = {
      buttonAction: null,
      selectedValue: null,
    };
  const { selectedValue, buttonAction } = rebuildOptions;
  const classData = classDataCollection();
  const selectMenu = buildSelectMenu(baseSelect, classData, selectedValue);
  const buttons = buildButtons(buttonData, buttonAction);
  return [
    new MessageActionRow().addComponents(selectMenu),
    new MessageActionRow().addComponents(buttons),
  ];
};
