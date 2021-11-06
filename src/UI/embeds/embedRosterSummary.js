const { MessageEmbed } = require("discord.js");
const { memberNicknameMention } = require("@discordjs/builders");
const DiscordUtils = require("../../utils/utilsDiscord");
const { fieldProfession } = require("./embedComponents/fieldProfession");

exports.embedRosterSummary = (guild) => {
  const utils = new DiscordUtils.GuildUtils();
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
