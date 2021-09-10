const { MessageActionRow, MessageEmbed } = require("discord.js");
const { memberNicknameMention, hyperlink } = require("@discordjs/builders");
const {
  buildSelectMenu,
  buildButton,
} = require("../../utils/utilsMessageComponents");
const { classDataCollection, buttonData } = require("./dataGW2Class");

const baseSelect = {
  id: "class",
  placeholder: "Select A Class",
};

exports.buildClassManageMenu = async (rebuildOptions) => {
  //build select
  const classData = classDataCollection();
  const select = buildSelectMenu(baseSelect);
  const selectOptions = [];
  classData.forEach((item) => {
    const optionItem = {
      label: item.label,
      description: item.description,
      value: item.value,
      emoji: item.emoji,
    };
    if (rebuildOptions && rebuildOptions.select == item.value)
      item = { default: true, ...optionItem };
    selectOptions.push(item);
  });
  select.addOptions(selectOptions);
  // build buttons
  const buttons = [];
  buttonData.forEach((item) => {
    const buttonItem = buildButton(item);
    if (rebuildOptions && rebuildOptions.button == item.customId)
      buttonItem.setDisabled(false);
    buttons.push(buttonItem);
  });
  return [
    new MessageActionRow().addComponents(select),
    new MessageActionRow().addComponents(buttons),
  ];
};

exports.buildPlayerClassSummary = (playerClassArray, playerInfo) => {
  console.log(playerInfo);
  const embedObject = new MessageEmbed()
    .setAuthor(playerInfo.username)
    .setTitle("Player Summary")
    .setDescription("Classes:")
    .setThumbnail(playerInfo.avatarURL());
  if (!playerClassArray.length)
    embedObject.addField("You have not added any classes", "\u200B");
  playerClassArray.forEach(async (item) => {
    const fieldData = classDataCollection().get(item);
    const emojiSting = "<:" + fieldData.label + ":" + fieldData.emoji + ">";
    const fieldString = {
      name: emojiSting + fieldData.label + emojiSting,
      value:
        "**Role**: " +
        fieldData.description +
        " **Mentor**: " +
        memberNicknameMention(fieldData.mentorId) +
        "/" +
        fieldData.mentorIGN +
        " **[Build](" +
        fieldData.build +
        ")**",
    };
    embedObject.addFields(fieldString);
  });
  return embedObject;
};
