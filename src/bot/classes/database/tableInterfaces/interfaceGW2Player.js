const Interface = require("./Interface");
const { ModelGW2Player } = require("./models");
const { getGW2AccountInfo } = require("../../../utils/utilsGw2API");

// refactor - bad smell here
module.exports = class InterfaceGW2Player extends Interface {
  constructor() {
    super(ModelGW2Player);
  }
  async getApiKeyById(id) {
    this.setSelector({ where: { snowflake: id } });
    const playerData = await this.get();
    return playerData.apiKey;
  }

  // refactor - maybe i dont need this
  async getPlayerDataByIgn(ign) {
    this.setSelector({ where: { accountName: ign } });
    return await this.get();
  }

  async getAccountData(key) {
    return await getGW2AccountInfo(key);
  }
  async updatePlayer(id, object) {
    this.setSelector({ where: { snowflake: id } });
    await this.findOrCreate();
    await this.update(object);
  }
  async deletePlayer(id) {
    this.setSelector({ where: { snowflake: id } });
    await this.deleted();
  }
};
