const { MessageActionRow, MessageEmbed } = require("discord.js");
const { memberNicknameMention, userMention } = require("@discordjs/builders");
const {
  buildSelectMenu,
  buildButton,
} = require("../../utils/utilsMessageComponents");
const { classDataCollection, buttonData } = require("./dataGW2Class");
const { getMembersByRoleId } = require("../../utils/utilsDiscord");

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

/**
 * juicy refactor here
 * manage class selection as roles
 */

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
        ")*\n" +
        "**Mentor**: " +
        mentorString,
    };
    embedObject.addFields(fieldString);
  });
  return embedObject;
};

exports.buildRosterSummary = (rosterCollection, guild) => {
  const embedObject = new MessageEmbed()
    .setThumbnail(guild.iconURL())
    .setAuthor("Ordo Ab [Chao]")
    .setTitle("Roster Summary")
    .setDescription("Guild Breakdown");

  const commanderCollection = getMembersByRoleId(guild, "618286716423372832");
  const recruitCollection = getMembersByRoleId(guild, "816397178004045864");
  const officerCollection = getMembersByRoleId(guild, "618286301111910400");
  const totalMembers = getMembersByRoleId(guild, "581597683597443073");

  let officerString = "";
  officerCollection.forEach((officer) => {
    const concatString = memberNicknameMention(officer.id);
    officerString = officerString.concat(" ", concatString);
  });

  embedObject.addFields(
    {
      name: "Membership:",
      value: `<:Chao:743800298560028672> **Total members**: ${totalMembers.size}
    <:commander:888814161725886484> **Commanders**: ${commanderCollection.size}
    <:recruit:888815068983218186> **Recruits**: ${recruitCollection.size}
    <:officer:888815047026032721> **Officers**:
    ${officerString} 
    \u200B`,
    }
    // {
    //   name: "<:officer:888815047026032721> Officers",
    //   value: officerString + " \n \u200B",
    // }
  );

  embedObject.addField("Class Breakdown:", "\u200B");
  classDataCollection().forEach((classItem) => {
    const emojiSting = "<:" + classItem.label + ":" + classItem.emoji + ">";
    let classMentorString = "";
    classItem.mentors.forEach((mentorItem) => {
      const concatString =
        memberNicknameMention(mentorItem.mentorId) + "/" + mentorItem.mentorIGN;
      classMentorString = classMentorString.concat(" ", concatString);
    });

    const fieldValueString =
      `**Players**: ${rosterCollection.get(classItem.value).length}` +
      `\n**Role**: ${classItem.description} ` +
      `\n**Build:** *[Here](${classItem.build})*` +
      `\n**Mentor**: ${classMentorString}`;

    const fieldObject = {
      name: emojiSting + classItem.label + emojiSting,
      value: fieldValueString,
      inline: true,
    };

    embedObject.addFields(fieldObject);
  });
  return embedObject;
};
