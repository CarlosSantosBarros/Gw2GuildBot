const { getGW2AccountInfo, getGW2GuildInfo } = require("../utils/utilsGw2API");
const { InterfaceGW2Player } = require("./database");
const { ServerUtils, MemberUtils } = require("../utils/");
const { guildSettings } = require("../config.json");

// refactor - maybe extend db interface
// or maybe extend the api util as a class and have that extend the db interface?
// refactor - maybe param should be Id/snowflake
exports.GW2Player = class {
  constructor(member) {
    this.member = new MemberUtils(member);
    this.id = member.user.id;
    this.GW2Player = new InterfaceGW2Player();
    this.GW2Player.setSelector({ where: { snowflake: this.id } });
    this.playerData;
    this.accountData;
    this.apiKey;
  }

  async getPlayerData() {
    this.playerData = await this.GW2Player.get();
    if (this.playerData) this.apiKey = this.playerData.apiKey;
  }

  async setAccountData() {
    this.accountData = await getGW2AccountInfo(this.apiKey);
  }
  // refactor - this is messy
  async verify(key) {
    this.apiKey = key;
    await this.setAccountData();
    if (!this.accountData.wvw_rank)
      throw "This key is missing the *progression* scope";
    await this.getPlayerData();
    if (!this.playerData) await this.GW2Player.create();
    this.playerData = {
      accountName: this.accountData.name,
      apiKey: key,
    };
    this.GW2Player.update(this.playerData);
    const server = new ServerUtils();

    if (this.accountData.guilds.includes(guildSettings.gw2GuildId)) {
      await this.member.addMemberRole();

      // Refactor here, extract to be used for auto role update
      const guildInfo = await getGW2GuildInfo();
      // filter() or find() here
      guildInfo.every(async (guildMember) => {
        if (guildMember.name != this.accountData.name) return;
        const rankRole = server.getRoleByName(guildMember.rank);
        await this.member.addRole(rankRole.id);
      });
    } else await this.member.addVerifiedRole();
  }

  getAccountData() {
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
