const { MessageActionRow, MessageEmbed } = require("discord.js");
const {
  buildSelectMenu,
  buildButton,
} = require("../../utils/utilsMessageComponents");
const { classDataCollection, buttonData } = require("./dataGW2Class");
const {
  getRoleByName,
  getMembersByRoleId,
} = require("../../utils/utilsDiscord");
const { buildClassFieldString } = require("./functionsGW2Class");
const { memberNicknameMention } = require("@discordjs/builders");

const baseSelect = {
  id: "class",
  placeholder: "Select A Class",
};

exports.buildClassManageMenu = (rebuildOptions) => {
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
 * !!!!! this need to be a promise
 */

exports.buildPlayerClassSummary = (playerMember) => {
  const embedObject = new MessageEmbed()
    .setAuthor(playerMember.user.username)
    .setTitle("Player Summary")
    .setDescription("Classes:")
    .setThumbnail(playerMember.user.avatarURL());

  let hasRole = false;
  classDataCollection().forEach((classItem) => {
    if (!getRoleByName(playerMember.roles, classItem.value)) return;
    hasRole = true;
    const classFieldString = buildClassFieldString(
      classItem,
      playerMember.guild
    );
    embedObject.addFields(classFieldString);
  });
  if (!hasRole)
    embedObject.addField("You have not added any classes", "\u200B");
  return embedObject;
};

exports.buildRosterSummary = (guild) => {
  const embedObject = new MessageEmbed()
    .setThumbnail(guild.iconURL())
    .setAuthor("Ordo Ab [Chao]")
    .setTitle("Roster Summary")
    .setDescription("Guild Breakdown");

  let officerString = "";
  const officerCollection = getMembersByRoleId(guild, "618286301111910400");
  officerCollection.forEach((officer) => {
    const concatString = memberNicknameMention(officer.id);
    officerString = officerString.concat(" ", concatString);
  });

  embedObject.addFields({
    name: "Membership:",
    value: `<:Chao:743800298560028672> **Total members**: ${
      getMembersByRoleId(guild, "581597683597443073").size
    }
    <:commander:888814161725886484> **Commanders**: ${
      getMembersByRoleId(guild, "618286716423372832").size
    }
    <:recruit:888815068983218186> **Recruits**: ${
      getMembersByRoleId(guild, "816397178004045864").size
    }
    <:officer:888815047026032721> **Officers**:
    ${officerString}
    \u200B`,
  });

  embedObject.addField("Class Breakdown:", "\u200B");
  classDataCollection().forEach((classItem) => {
    const classFieldString = {
      ...buildClassFieldString(classItem, guild),
      ...{ inline: true },
    };
    embedObject.addFields(classFieldString);
  });
  return embedObject;
};
