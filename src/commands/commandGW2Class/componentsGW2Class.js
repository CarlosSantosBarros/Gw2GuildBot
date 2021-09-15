const { MessageActionRow, MessageEmbed } = require("discord.js");
const { memberNicknameMention } = require("@discordjs/builders");
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
  const embedObject = new MessageEmbed()
    .setAuthor(playerInfo.username)
    .setTitle("Player Summary")
    .setDescription("Classes:")
    .setThumbnail(playerInfo.avatarURL());
  if (!playerClassArray.length)
    embedObject.addField("You have not added any classes", "\u200B");
  playerClassArray.forEach(async (fieldItem) => {
    const fieldData = classDataCollection().get(fieldItem);
    const emojiSting = "<:" + fieldData.label + ":" + fieldData.emoji + ">";
    let mentorString = "";
    fieldData.mentors.forEach((mentorItem) => {
      const concatString =
        memberNicknameMention(mentorItem.mentorId) + "/" + mentorItem.mentorIGN;
      mentorString = mentorString.concat(" ", concatString);
    });

    const fieldString = {
      name: emojiSting + fieldData.label + emojiSting,
      value:
        "**Role**: " +
        fieldData.description +
        " **Build:** *[Here](" +
        fieldData.build +
        ")*" +
        "\n" +
        "**Mentor**: " +
        mentorString,
    };
    embedObject.addFields(fieldString);
  });
  return embedObject;
};
