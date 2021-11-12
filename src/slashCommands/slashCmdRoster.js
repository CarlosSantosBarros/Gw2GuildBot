const { SlashCommandBuilder } = require("@discordjs/builders");
const GW2Professions = require("../classes/GW2Professions");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("roster")
    .setDescription("show profession roster!"),
  guildCommand: true,

  async execute(interaction) {
    const gw2Professions = new GW2Professions(interaction);
    const rosterEmbed = gw2Professions.roster();
    await interaction.reply({
      embeds: [rosterEmbed],
      ephemeral: false,
    });
  },
};
