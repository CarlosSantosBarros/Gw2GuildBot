const { MessageActionRow } = require("discord.js");
const {
  buildButtons,
  buildSelectMenu,
} = require("../../utils/utilsMessageComponents");
const { professionsSettings } = require("../../config.json");

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
  let { professionsData } = professionsSettings;

  const selectProficiency = buildSelectMenu(
    {
      customId: "proficiency",
      placeholder: "Proficiency",
    },
    professionsSettings.proficiencyData,
    selectedProficiencyValue
  );

  /**
   * rebuild profession selection based on roles
   * remove role if its selected in other tier
   */
  if (rebuildOptions.availableProfessions)
    professionsData = rebuildOptions.availableProfessions;
  const selectProfession = buildSelectMenu(
    {
      customId: "profession",
      placeholder: "Select A profession",
      disabled: selectedProficiencyValue ? false : true,
    },
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
