const { MessageActionRow } = require("discord.js");
const {
  buildButtons,
  buildSelectMenu,
} = require("../../utils/utilsMessageComponents");
const {
  dataGW2Professions,
  dataProficiency,
} = require("../dialogData/dataGW2Professions");

const professionSelectBase = {
  customId: "class",
  placeholder: "Select A Class",
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
    disabled: true,
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

  console.log(rebuildOptions);

  const selectProficiency = buildSelectMenu(
    proficiencySelectBase,
    dataProficiency,
    selectedProficiencyValue
  );

  const selectProfession = buildSelectMenu(
    professionSelectBase,
    dataGW2Professions,
    selectedProfessionValue
  );

  const buttons = buildButtons(buttonData, buttonAction);
  return [
    new MessageActionRow().addComponents(selectProficiency),
    new MessageActionRow().addComponents(selectProfession),
    new MessageActionRow().addComponents(buttons),
  ];
};
