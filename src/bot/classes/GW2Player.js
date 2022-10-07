const { getGW2GuildInfo } = require("../utils/utilsGw2API");
const { InterfaceGW2Player } = require("./database");
const { MemberUtils } = require("../utils/");
const { guildSettings } = require("../../config.json");

exports.GW2Player = class {
  constructor(member) {
    this.id = member.user.id;
    this.member = new MemberUtils(member);
  }

  async verify(key) {
    const dbPlayer = new InterfaceGW2Player();
    const accountData = await dbPlayer.getAccountData(key);
    if (!accountData.wvw_rank)
      throw "This key is missing the **progression** scope";
    dbPlayer.updatePlayer(this.id, {
      accountName: accountData.name,
      apiKey: key,
    });
    if (accountData.guilds.includes(guildSettings.gw2GuildId)) {
      await this.member.addMemberRole();
      const guildInfo = await getGW2GuildInfo();
      const guildMember = guildInfo.find(
        (gMember) => gMember.name === accountData.name
      );
      await this.member.addRankrole(guildMember.rank);
    } else await this.member.addVerifiedRole();
  }

  async getApplicationData() {
    const dbPlayer = new InterfaceGW2Player();
    const key = await dbPlayer.getApiKeyById(this.id);
    const accountData = await dbPlayer.getAccountData(key);
    return {
      snowflake: this.id,
      accountName: accountData.name,
      application: {
        server: accountData.world,
        wvwRank: accountData.wvw_rank,
      },
    };
  }
};
