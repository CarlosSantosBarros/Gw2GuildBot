const { SlashCommandBuilder } = require("@discordjs/builders");
const InterfaceGW2Player = require("../database");
const { tokenAccInfoEmbed } = require("../utils/utilsEmbed");
const {
  getGW2TokenInfo,
  getGW2AccountInfo,
  getGW2GuildInfo,
} = require("../utils/utilsGw2API");
const { getRoleByName } = require("../utils/utilsDiscord");
const {
  buildGw2ClassManager,
  buildPlayerClassSummary,
  buildClassManageMenu,
} = require("./slashCmdGW2Class/componentsGW2Class");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("verify")
    .setDescription("Verify using a gw2 API key")
    .addStringOption((option) =>
      option
        .setName("key")
        .setDescription("Key requiers the *account* scope")
        .setRequired(true)
    ),
  guildCommand: true,

  async execute(interaction) {
    /**
     *  refactor to class?
     *  put all db and api stuff in a class maybe
     * */
    const key = interaction.options.getString("key");
    const player = new InterfaceGW2Player();
    player.setSelector({
      where: {
        snowflake: interaction.user.id,
      },
    });
    await player.get();
    await player.update({ apiKey: key });
    // API stuff
    const tokenInfo = await getGW2TokenInfo(key);
    //TODO: check for right permissions here at some point
    const accountInfo = await getGW2AccountInfo(key);
    // reply stuff
    // use role to to check instead of isMember
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
    // line 47
    if (isMember)
      setTimeout(async () => {
        // maybe put this all in a class also
        // class stuff needs rework
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
