const {
  createDBGW2PlayerById,
  getDBGW2PlayerById,
  updateDBGW2PlayerById,
} = require("../../database/tableInterfaces/tableInterfaceGW2Player");
const { tokenAccInfoEmbed } = require("../../utils/utilsEmbed");
const {
  getGW2TokenInfo,
  getGW2AccountInfo,
} = require("../../utils/utilsGw2API");

const subConfig = {
  name: "add",
  decription: "Add key",
  options: { name: "key", decription: "API Key" },
};

const configure = (subCommandObj) => {
  return subCommandObj
    .setName(subConfig.name)
    .setDescription(subConfig.decription)
    .addStringOption((option) =>
      option
        .setName(subConfig.options.name)
        .setDescription(subConfig.options.decription)
    );
};

module.exports = {
  config: subConfig,
  configure: configure,
  async execute(interaction) {
    const key = interaction.options.getString("key");
    const gw2Player = await getDBGW2PlayerById(interaction.user.id);
    if (!gw2Player) await createDBGW2PlayerById(interaction.user.id);
    await updateDBGW2PlayerById(interaction.user.id, { apikey: key });
    const tokenInfo = await getGW2TokenInfo(key);
    //TODO: check for right permissions here at some point
    const accountInfo = await getGW2AccountInfo(key);
    const keyEmbed = tokenAccInfoEmbed(tokenInfo, accountInfo);
    await interaction.reply({
      content: "Added the following as default key",
      embeds: [keyEmbed],
      ephemeral: true,
    });
  },
};
