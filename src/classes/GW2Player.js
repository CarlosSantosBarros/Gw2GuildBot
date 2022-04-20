const { getGW2GuildInfo } = require("../utils/utilsGw2API");
const { InterfaceGW2Player } = require("./database");
const { MemberUtils } = require("../utils/");
const { guildSettings } = require("../config.json");

exports.GW2Player = class extends InterfaceGW2Player {
  constructor(member) {
    super(member.user.id);
    this.member = new MemberUtils(member);
  }

  async init() {
    await this.getPlayerDataById();
    await this.getAccountData();
  }

  async verify(key) {
    this.apiKey = key;
    await this.getAccountData();
    if (!this.accountData.wvw_rank)
      throw "This key is missing the **progression** scope";
    this.updatePlayer();

    if (this.accountData.guilds.includes(guildSettings.gw2GuildId)) {
      await this.member.addMemberRole();

      const guildInfo = await getGW2GuildInfo();
      const guildMember = guildInfo.find(
        (gMember) => gMember.name === this.accountData.name
      );
      await this.member.addRankrole(guildMember.rank);
    } else await this.member.addVerifiedRole();
  }

  getApplicationData() {
    console.log(this.accountData);
    return {
      snowflake: this.id,
      accountName: this.accountData.name,
      application: {
        server: this.accountData.world,
        wvwRank: this.accountData.wvw_rank,
      },
    };
  }
};
