const { getGW2AccountInfo, getGW2GuildInfo } = require("../utils/utilsGw2API");
const InterfaceGW2Player = require("../database");
const DiscordUtils = require("../utils/utilsDiscord");

module.exports = class GW2Player {
  constructor(interaction) {
    // refactor here to only use this.interaction
    this.interaction = interaction;
    this.snowflake = interaction.user.id;
    this.member = interaction.member;
    this.GW2Player = new InterfaceGW2Player();
    this.GW2Player.setSelector({
      where: {
        snowflake: this.snowflake,
      },
    });
    this.playerData;
    this.accountData;
    this.isMember;
  }

  async getAPIData(key) {
    this.playerData = await this.GW2Player.get();
    if (!this.playerData) await this.GW2Player.create();
    this.accountData = await getGW2AccountInfo(key);
    this.playerData = {
      accountName: this.accountData.name,
      apiKey: key,
    };
    this.GW2Player.update(this.playerData);
  }

  async giveRoles(guild) {
    const utils = new DiscordUtils(guild);
    if (
      this.accountData.guilds.includes("F7F37FC2-C23D-E411-A278-AC162DC0070D")
    ) {
      this.isMember = true;
      // import from config
      const memberRole = utils.getRoleByName("Chao Member");
      await this.member.roles.add(memberRole.id);

      const guildInfo = await getGW2GuildInfo();
      guildInfo.every(async (member) => {
        if (member.name == this.accountData.name) {
          const rankRole = await utils.getRoleByName(member.rank);
          await this.member.roles.add(rankRole.id);
          return;
        }
      });
      return;
    }
    const verifiedRole = utils.getRoleByName("Verified");
    await this.member.roles.add(verifiedRole.id);
    await this.interaction.reply({
      content: "You are now verified",
      ephemeral: true,
    });
  }
  getApplicationData() {
    return {
      accountName: this.accountData.name,
      server: this.accountData.world,
      wvwRank: this.accountData.wvw_rank,
    };
  }
};
