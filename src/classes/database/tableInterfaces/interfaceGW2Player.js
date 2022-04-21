const Interface = require("./Interface");
const { ModelGW2Player } = require("./models");
const { getGW2AccountInfo } = require("../../../utils/utilsGw2API");

// refactor - bad smell here
module.exports = class InterfaceGW2Player extends Interface {
  constructor() {
    super(ModelGW2Player);
    this.playerData;
    this.accountData;
    this.apiKey;
  }
  async getPlayerDataById(id) {
    this.setSelector({ where: { snowflake: id } });
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
