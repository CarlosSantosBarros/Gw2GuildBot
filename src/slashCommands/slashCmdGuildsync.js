const { SlashCommandBuilder } = require("@discordjs/builders");
const { guildSettings, botAdminPerms } = require("../config.json");
const { ServerUtils } = require("../utils");
const { isVerifiedMember, forEachToString } = require("../utils/utils");
const { getGW2GuildInfo } = require("../utils/utilsGw2API");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("guildsync")
    .setDescription("Sync roles for verified discord users")
    .setDefaultPermission(false),
  guildCommand: true,
  perms: botAdminPerms,

  async execute(interaction) {
    await interaction.reply({
      content: "Syncing...",
      ephemeral: true,
    });
    const server = new ServerUtils();

    const guildInfo = await getGW2GuildInfo();
    const discordMembers = server.getMembers();
    let verifiedString = "";
    guildInfo.every(async (entry) => {
      const verifiedMember = await isVerifiedMember(entry.name);
      if (!verifiedMember) return;
      // await this.member.addRankrole(entry.rank);
      // await this.member.addMemberRole();
      verifiedString = verifiedString.concat(" ", entry.name);
      discordMembers.delete(verifiedMember.getId());
    });
    const formatString = (item) => {
      return item.displayNamel;
    };
    const notVerifiedMembers = forEachToString(discordMembers, formatString);

    interaction.update({
      content: `**Verified** ${verifiedString} **Not Verified** ${notVerifiedMembers}`,
      ephemeral: true,
    });
  },
};
