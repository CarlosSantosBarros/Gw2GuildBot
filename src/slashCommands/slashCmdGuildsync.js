const { SlashCommandBuilder } = require("@discordjs/builders");
const { InterfaceGW2Player } = require("../classes/database");
const { ServerUtils, MemberUtils } = require("../utils");
const { forEachToString } = require("../utils/utils");
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
    const discordUsersToSync = server.getMembers();
    while (verified.length > 0) {
      const verifiedUser = verified.shift().get();
      const { snowflake, accountName } = verifiedUser;
      const index = guildMembers.findIndex(
        (entry) => entry.name === accountName
      );
      const discordMember = server.getMemberById(snowflake);
      if (!discordMember) return await gw2db.deletePlayer(snowflake);

      const member = new MemberUtils(discordMember);

      if (index > -1) {
        const verifiedGuildMember = guildMembers.splice(index, 1)[0];
        await member.addMemberRole();
        await member.addRankrole(verifiedGuildMember.rank);
      } else await gw2db.deletePlayer(snowflake);
      discordUsersToSync.delete(snowflake);
    }
    let removedRolesFrom = "";
    discordUsersToSync.forEach(async (item) => {
      const member = new MemberUtils(item);
      removedRolesFrom = removedRolesFrom.concat(" ", `${item.displayName}\n`);

      const rankRole = member.getRankRole();
      if (rankRole) await member.removeRole(rankRole);

      const proficiencies = member.getAllProficiencies();
      if (proficiencies) await member.removeRole(proficiencies);

      await member.removeMemberRole();
    });

    const getAccNames = (item) => {
      return `${item.name}\n`;
    };
    const notVeried = forEachToString(guildMembers, getAccNames);

    interaction.editReply({
      content: `**Finished**\nThe follow have had their roles removed:\n${removedRolesFrom}\nThe following have not verified:\n${notVeried}`,
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
