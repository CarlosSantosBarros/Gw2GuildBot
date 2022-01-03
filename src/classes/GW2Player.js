const { getGW2AccountInfo, getGW2GuildInfo } = require("../utils/utilsGw2API");
const InterfaceGW2Player = require("../database");
const DiscordUtils = require("../utils/utilsDiscord");
const { guildSettings } = require("../config.json");

module.exports = class GW2Player {
  constructor(id) {
    this.GW2Player = new InterfaceGW2Player();
    this.GW2Player.setSelector({ where: { snowflake: id, }, });
    this.id = id;
    this.playerData;
    this.accountData;
    this.isMember;
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

    if (this.accountData.guilds.includes(guildSettings.gw2GuildId)) {
      const utils = new DiscordUtils.GuildUtils();
      const member = utils.getMemberById(this.id);
      await member.roles.add(guildSettings.memberRole);
      this.isMember = true;

      const guildInfo = await getGW2GuildInfo();
      // filter() or find() here
      guildInfo.every(async (guildMember) => {
        if (guildMember.name == this.accountData.name) {
          const rankRole = utils.getRoleByName(guildMember.rank);
          await member.roles.add(rankRole.id);
        }
      });
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

  getIsMember() {
    return this.isMember;
  }
};
