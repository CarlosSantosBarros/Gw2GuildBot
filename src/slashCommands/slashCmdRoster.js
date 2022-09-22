const { SlashCommandBuilder } = require("@discordjs/builders");
const EmbedRosterSummary = require("../classes/menus/embeds/embedRosterSummary");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("roster")
    .setDescription("show profession roster!")
    .setDefaultPermission(false),
  guildCommand: true,

  async execute(interaction) {
    const embeds = new EmbedRosterSummary(interaction.client);
    console.log(embeds);
    await interaction.reply({
      embeds: [embeds],
      ephemeral: false,
    });
  },
};
