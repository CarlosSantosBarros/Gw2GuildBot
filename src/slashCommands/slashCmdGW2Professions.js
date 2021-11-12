const { SlashCommandBuilder } = require("@discordjs/builders");
const GW2Professions = require("../classes/GW2Professions");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("professions")
    .setDescription("Add/Remove Professiones that you play"),
  guildCommand: true,

  async execute(interaction) {
    console.log(`Profession command used by ${interaction.user.username}`);
    const gw2Professions = new GW2Professions(interaction);
    const playerProfessionSummary = await gw2Professions.embed();
    const professionesMenu = await gw2Professions.menu();

    const collectorMessage = await interaction.reply({
      ephemeral: true,
      components: professionesMenu,
      embeds: [playerProfessionSummary],
      fetchReply: true,
    });
    gw2Professions.controler(collectorMessage);
  },
};
