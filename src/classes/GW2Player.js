const { getGW2AccountInfo, getGW2GuildInfo } = require("../utils/utilsGw2API");
const InterfaceGW2Player = require("../database");
const DiscordUtils = require("../utils/utilsDiscord");

module.exports = class GW2Player {
  constructor(id) {
    // refactor here to only use this.interaction
    this.GW2Player = new InterfaceGW2Player();
    this.GW2Player.setSelector({
      where: {
        snowflake: id,
      },
    });
    this.id = id;
    this.playerData;
    this.accountData;
  }

  async verify(key) {
    let queryKey = key;
    this.playerData = await this.GW2Player.get();
    if (this.playerData) queryKey = this.playerData.apiKey;
    this.accountData = await getGW2AccountInfo(queryKey);
    if (!this.playerData) {
      await this.GW2Player.create();
      this.playerData = {
        accountName: this.accountData.name,
        apiKey: key,
      };
      this.GW2Player.update(this.playerData);
    }

    //import this from config
    if (
      this.accountData.guilds.includes("F7F37FC2-C23D-E411-A278-AC162DC0070D")
    ) {
      const utils = new DiscordUtils.GuildUtils();
      // import from config
      const memberRole = utils.getRoleByName("Chao Member");
      const member = utils.getMemberById(this.id);
      await member.roles.add(memberRole.id);

      const guildInfo = await getGW2GuildInfo();
      guildInfo.every(async (guildMember) => {
        if (guildMember.name == this.accountData.name) {
          const rankRole = utils.getRoleByName(guildMember.rank);
          await member.roles.add(rankRole.id);
          return;
        }
      });
      return;
    }
  }

  getApplicationData() {
    return {
      snowflake: this.id,
      accountName: this.accountData.name,
      server: this.accountData.world,
      wvwRank: this.accountData.wvw_rank,
    };
  }
};
