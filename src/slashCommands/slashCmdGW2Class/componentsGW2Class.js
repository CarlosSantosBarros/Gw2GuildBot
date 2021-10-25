const { MessageActionRow, MessageEmbed } = require("discord.js");
const {
  buildSelectMenu,
  buildButton,
} = require("../../utils/utilsMessageComponents");
const { classDataCollection, buttonData } = require("./dataGW2Class");
const DiscordUtils = require("../../utils/utilsDiscord");
const { buildClassFieldString } = require("./functionsGW2Class");
const { memberNicknameMention } = require("@discordjs/builders");

const baseSelect = {
  id: "class",
  placeholder: "Select A Class",
};

const utils = new DiscordUtils.GuildUtils();

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
 * !!!!! this need to be a promise as it bugs sometimes
 */

exports.buildPlayerClassSummary = (playerMember) => {
  const memberUtils = new DiscordUtils.MemberUtils(playerMember);
  const embedObject = new MessageEmbed()
    .setAuthor(playerMember.user.username)
    .setTitle("Player Summary")
    .setDescription("Classes:")
    .setThumbnail(playerMember.user.avatarURL());

  let hasRole = false;
  classDataCollection().forEach((classItem) => {
    if (!memberUtils.getRoleByName(classItem.value)) return;
    hasRole = true;
    const classFieldString = buildClassFieldString(classItem);
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
  const officerCollection = utils.getMembersByRoleId("618286301111910400");
  officerCollection.forEach((officer) => {
    const concatString = memberNicknameMention(officer.id);
    officerString = officerString.concat(" ", concatString);
  });

  // refactor getMembersByRoleId getMembersByRoleName use role name instead of id
  // and/or use config file
  embedObject.addFields({
    name: "Membership:",
    value: `<:Chao:743800298560028672> **Total members**: ${
      utils.getMembersByRoleId("581597683597443073").size
    }
    <:commander:888814161725886484> **Commanders**: ${
      utils.getMembersByRoleId("618286716423372832").size
    }
    <:recruit:888815068983218186> **Recruits**: ${
      utils.getMembersByRoleId("816397178004045864").size
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

exports.buildGw2ClassManager = async (interaction, classManagedMessage) => {
  const memberUtils = new DiscordUtils.MemberUtils(interaction.member);
  let currentValue;

  const classManageCollector =
    classManagedMessage.createMessageComponentCollector({
      idle: 20000,
    });

  classManageCollector.on("collect", async (collected) => {
    let classesMenu = this.buildClassManageMenu();
    if (collected.customId == "class") {
      currentValue = collected.values[0];
      const actionButton = memberUtils.getRoleByName(currentValue)
        ? "remove"
        : "add";
      classesMenu = this.buildClassManageMenu({
        button: actionButton,
        select: currentValue,
      });
      currentValue = utils.getRoleByName(currentValue);
      collected.update({ components: classesMenu });
    }

    if (collected.isButton()) {
      if (collected.customId == "add")
        await memberUtils.addRole(currentValue.id);
      if (collected.customId == "remove")
        await memberUtils.removeRole(currentValue.id);
      if (collected.customId == "done") {
        classesMenu = this.buildClassManageMenu({
          button: "done",
          select: null,
        });
        classManageCollector.stop();
      }
      const newPlayerClassSummary = await this.buildPlayerClassSummary(
        interaction.member
      );
      await collected.update({
        components: classesMenu,
        embeds: [newPlayerClassSummary],
      });
    }
  });
  classManageCollector.on("end", async (collected, reason) => {
    if (reason == "idle")
      interaction.editReply({
        components: [],
        content: "This operation has timed out",
        embeds: [],
      });
  });
  //* End
};
