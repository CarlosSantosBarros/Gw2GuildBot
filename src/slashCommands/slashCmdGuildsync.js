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
      const member = new MemberUtils(
        server.getMemberById(verifiedUser.snowflake)
      );
      const rankRole = member.hasRankRole();
      if (index > 0) {
        const verifiedGuildMember = guildMembers.splice(index, 1)[0];
        member.addMemberRole();
        await member.addRankrole(verifiedGuildMember.rank);
      } else {
        if (rankRole) member.removeRole(rankRole);
        // Notes - this is maybe bad because removeMemberRole() already checks for isMember()
        if (member.isMember()) {
          await gw2db.deletePlayer(verifiedUser.snowflake);
          const proficiencies = member.getAllProficiencies();
          member.removeRole(proficiencies);
        }
        await member.removeMemberRole();
      }
    }

    interaction.editReply({
      content: `**Finished**`,
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
