const Interface = require("./Interface");
const { ModelGW2Player } = require("./models");
const { getGW2AccountInfo } = require("../../../utils/utilsGw2API");

module.exports = class InterfaceGW2Player extends Interface {
  constructor(id) {
    super(ModelGW2Player);
    this.id = id;
    this.setSelector({ where: { snowflake: this.id } });
    this.playerData;
    this.accountData;
    this.apiKey;
  }
  async getPlayerDataById() {
    this.playerData = await this.get();
    this.apiKey = this.playerData.apiKey;
  }

  async getPlayerDataByIgn(ign) {
    this.setSelector({ where: { accountName: ign } });
    return await this.get();
  }

  async getAccountData() {
    this.accountData = await getGW2AccountInfo(this.apiKey);
  }
  async updatePlayer() {
    await this.findOrCreate();
    await this.update({
      accountName: this.accountData.name,
      apiKey: this.apiKey,
    });
  }
};
