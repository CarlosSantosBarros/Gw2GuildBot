const { MessageActionRow } = require("discord.js");
const {
  buildButtons,
  buildSelectMenu,
} = require("../../utils/utilsMessageComponents");
const { professionsSettings } = require("../../config.json");

const professionSelectBase = {
  customId: "profession",
  placeholder: "Select A profession",
};
const proficiencySelectBase = {
  customId: "proficiency",
  placeholder: "Proficiency",
};

const buttonData = [
  { customId: "set", label: "Set", style: "PRIMARY", disabled: true },
  { customId: "add", label: "Add", style: "PRIMARY", disabled: true },
  { customId: "remove", label: "Remove", style: "PRIMARY", disabled: true },
  {
    customId: "done",
    label: "Done",
    style: "SUCCESS",
    emoji: "870320857837346887",
    disabled: false,
  },
];

exports.menuGW2Profession = async (rebuildOptions) => {
  if (!rebuildOptions)
    rebuildOptions = {
      selectedProficiencyValue: null,
      selectedProfessionValue: null,
      buttonAction: null,
    };
  const { selectedProficiencyValue, selectedProfessionValue, buttonAction } =
    rebuildOptions;
  const { professionsData, proficiencyData } = professionsSettings;

  const selectProficiency = buildSelectMenu(
    proficiencySelectBase,
    proficiencyData,
    selectedProficiencyValue
  );

  /**
   * rebuild profession selection based on roles
   * remove role if its selected in other tier
   */

  const selectProfession = buildSelectMenu(
    professionSelectBase,
    professionsData,
    selectedProfessionValue
  );

  const buttons = buildButtons(buttonData, buttonAction);

  return [
    new MessageActionRow().addComponents(selectProficiency),
    new MessageActionRow().addComponents(selectProfession),
    new MessageActionRow().addComponents(buttons),
  ];
};
