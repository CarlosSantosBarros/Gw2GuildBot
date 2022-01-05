const { MessageEmbed } = require("discord.js");
const { memberNicknameMention } = require("@discordjs/builders");
const DiscordUtils = require("../utils/utilsDiscord");
const { forEachToString } = require("../utils/utils");
const { fieldProfession } = require("./embedComponents/fieldProfession");
const { rosterSummarySettings, guildSettings } = require("../config.json");

exports.embedRosterSummary = (guild) => {
  const utils = new DiscordUtils.GuildUtils();
  const embedObject = new MessageEmbed()
    .setThumbnail(guild.iconURL())
    .setAuthor("Ordo Ab [Chao]")
    .setTitle("Roster Summary")
    .setDescription("Guild Breakdown");

  const officerFormat = (item) => {
    return memberNicknameMention(item.id);
  };
  const membershipFormat = (item) => {
    return `\n ${item.prefixString} ${
      utils.getMembersByRoleId(item.roleId).size
    }`;
  };

  const officerCollection = utils.getMembersByRoleId(guildSettings.officerRole);

  const officerString = forEachToString(officerCollection, officerFormat);
  const membershipString = forEachToString(
    rosterSummarySettings,
    membershipFormat
  );

  embedObject.addFields({
    name: "Membership:",
    value: `${membershipString}
      <:officer:888815047026032721> **Officers**:
      ${officerString}
      \u200B`,
  });

  embedObject.addField("Profession Breakdown:", "\u200B");
  guild.client.professionsData.forEach((professionItem) => {
    const professionFieldString = {
      ...fieldProfession(professionItem, guild),
      ...{ inline: true },
    };
    embedObject.addFields(professionFieldString);
  });
  return embedObject;
};
