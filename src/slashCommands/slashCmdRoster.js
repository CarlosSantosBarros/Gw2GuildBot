const { SlashCommandBuilder } = require("@discordjs/builders");
const { embedRosterSummary } = require("../UI/embeds/embedRosterSummary");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("roster")
    .setDescription("show profession roster!"),
  guildCommand: true,

  async execute(interaction) {
    const rosterEmbed = embedRosterSummary(interaction.guild);
    await interaction.reply({
      embeds: [rosterEmbed],
      ephemeral: false,
    });
  },
};
