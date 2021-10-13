const InterfaceGW2Player = require("../../database/tableInterfaces/interfaceGW2Player");
const { tokenAccInfoEmbed } = require("../../utils/utilsEmbed");
const {
  getGW2TokenInfo,
  getGW2AccountInfo,
  getGW2GuildInfo,
} = require("../../utils/utilsGw2API");
const { getRoleByName } = require("../../utils/utilsDiscord");
const {
  buildGw2ClassManager,
  buildPlayerClassSummary,
  buildClassManageMenu,
} = require("../slashCmdGW2Class/componentsGW2Class");
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
    const player = new InterfaceGW2Player();
    player.setSelector({
      where: {
        snowflake: interaction.user.id,
      },
    });
    await player.get();
    await player.update({ apikey: key });
    // API stuff
    const tokenInfo = await getGW2TokenInfo(key);
    //TODO: check for right permissions here at some point
    const accountInfo = await getGW2AccountInfo(key);
    // reply stuff
    let isMember = false;
    if (accountInfo.guilds.includes("F7F37FC2-C23D-E411-A278-AC162DC0070D")) {
      isMember = true;
      await interaction.member.roles.add("581597683597443073");
    }
    const keyEmbed = tokenAccInfoEmbed(tokenInfo, accountInfo);
    const guildInfo = await getGW2GuildInfo();
    guildInfo.every(async (member) => {
      if (member.name == accountInfo.name) {
        const rankRole = await getRoleByName(
          interaction.guild.roles,
          member.rank
        );
        await interaction.member.roles.add(rankRole.id);
        return;
      }
    });
    await interaction.reply({
      content: "You are now verified",
      embeds: [keyEmbed],
      ephemeral: true,
    });
    // console.log(interaction);
    if (isMember)
      setTimeout(async () => {
        const playerClassSummary = buildPlayerClassSummary(interaction.member);
        const classesMenu = buildClassManageMenu();
        const classManagedMessage = await interaction.editReply({
          content: "Add classes that you play",
          ephemeral: true,
          components: classesMenu,
          embeds: [playerClassSummary],
          fetchReply: true,
        });
        buildGw2ClassManager(interaction, classManagedMessage);
      }, 5000);
  },
};
