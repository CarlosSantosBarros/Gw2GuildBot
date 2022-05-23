const { SlashCommandBuilder } = require("@discordjs/builders");
const { InterfaceGW2Player } = require("../classes/database");
const { ServerUtils, MemberUtils } = require("../utils");
const { isVerifiedMember, forEachToString } = require("../utils/utils");
const { getGW2GuildInfo } = require("../utils/utilsGw2API");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("guildsync")
    .setDescription("Sync roles for verified discord users")
    .setDefaultPermission(false),
  guildCommand: true,

  async execute(interaction) {
    await interaction.reply({
      content: "Syncing...",
      ephemeral: true,
    });

    const guildMembers = await getGW2GuildInfo();
    const gw2db = new InterfaceGW2Player();
    const verified = await gw2db.getAll();
    const server = new ServerUtils();
    while (verified.length > 0) {
      const verifiedUser = verified.shift().get();
      const index = guildMembers.findIndex(
        (entry) => entry.name === verifiedUser.accountName
      );
      const discordMember = server.getMemberById(verifiedUser.snowflake);
      if (!discordMember)
        return await gw2db.deletePlayer(verifiedUser.snowflake);
      const member = new MemberUtils(discordMember);
      const rankRole = member.getRankRole();
      if (index > 0) {
        const verifiedGuildMember = guildMembers.splice(index, 1)[0];
        await member.addMemberRole();
        await member.addRankrole(verifiedGuildMember.rank);
      } else {
        if (rankRole) await member.removeRole(rankRole);
        // Notes - this is maybe bad because removeMemberRole() already checks for isMember()
        if (member.isMember()) {
          await gw2db.deletePlayer(verifiedUser.snowflake);
          const proficiencies = member.getAllProficiencies();
          if (proficiencies) await member.removeRole(proficiencies);
        }
        await member.removeMemberRole();
      }
    }

    const getAccNames = (item) => {
      return `${item.name}\n`;
    };
    const notVeried = forEachToString(guildMembers, getAccNames);

    interaction.editReply({
      content: `**Finished**\nThe following have not verified:\n${notVeried}`,
      ephemeral: true,
    });
  },
};

/**
 * verified users
 *
 * guild members
 *
 * discord users
 */
