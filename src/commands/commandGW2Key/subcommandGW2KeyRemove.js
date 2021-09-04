const {
  getDBGW2PlayerById,
  updateDBGW2PlayerById,
} = require("../../utils/utilsDatabase");
const { getGW2TokenInfo } = require("../../utils/utilsGw2API");

const subConfig = {
  name: "remove",
  decription: "Remove Key",
};

const configure = (subCommandObj) => {
  return subCommandObj
    .setName(subConfig.name)
    .setDescription(subConfig.decription);
};

module.exports = {
  config: subConfig,
  configure: configure,
  async execute(interaction) {
    const apiKey = await getDBGW2PlayerById(interaction.user.id);
    if (!apiKey) throw "You have not set an API key";
    const tokenInfo = await getGW2TokenInfo(apiKey.apikey);
    await updateDBGW2PlayerById(interaction.user.id, "");
    interaction.reply({
      content: "Removed Api key Name: " + tokenInfo.name,
      ephemeral: true,
    });
  },
};
