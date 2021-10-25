const { SlashCommandBuilder } = require("@discordjs/builders");
const {
  buildGw2ClassManager,
  buildClassManageMenu,
  buildPlayerClassSummary,
} = require("./slashCmdGW2Class/componentsGW2Class");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("professions")
    .setDescription("Add/Remove Classes that you play"),
  guildCommand: true,
  async execute(interaction) {
    const playerClassSummary = buildPlayerClassSummary(interaction.member);
    const classesMenu = buildClassManageMenu();
    const classManagedMessage = await interaction.reply({
      ephemeral: true,
      components: classesMenu,
      embeds: [playerClassSummary],
      fetchReply: true,
    });
    buildGw2ClassManager(interaction, classManagedMessage);
  },
};
