const { SlashCommandBuilder } = require("@discordjs/builders");
const {
  buildGw2ClassManager,
} = require("./slashCmdGW2Class/componentsGW2Class");
const { embedGW2Professions } = require("../UI/embeds/embedGW2Professions");
const { menuGW2Profession } = require("../UI/menus/menuGW2Profession");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("professions")
    .setDescription("Add/Remove Classes that you play"),
  guildCommand: true,

  async execute(interaction) {
    const playerClassSummary = await embedGW2Professions(interaction.member);
    const classesMenu = await menuGW2Profession();
    const classManagedMessage = await interaction.reply({
      ephemeral: true,
      components: classesMenu,
      embeds: [playerClassSummary],
      fetchReply: true,
    });
    buildGw2ClassManager(interaction, classManagedMessage);
  },
};
