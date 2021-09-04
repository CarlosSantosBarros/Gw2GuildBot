const {
  createDBGW2PlayerById,
  getDBGW2PlayerById,
  updateDBGW2PlayerById,
} = require("../../utils/utilsDatabase");
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
    const apiKey = interaction.options.getString("key");
    const userExists = await getDBGW2PlayerById(interaction.user.id);
    !userExists
      ? await createDBGW2PlayerById(interaction.user.id, apiKey)
      : await updateDBGW2PlayerById(interaction.user.id, apiKey);
    const tokenInfo = await getGW2TokenInfo(apiKey);
    //TODO: check for right permissions here at some point
    const accountInfo = await getGW2AccountInfo(apiKey);
    const keyEmbed = tokenAccInfoEmbed(tokenInfo, accountInfo);

    await interaction.reply({
      content: "Added the following as default key",
      embeds: [keyEmbed],
      ephemeral: true,
    });
  },
};
