const { SlashCommandBuilder } = require("@discordjs/builders");
const {
  buildRosterSummary,
} = require("../slashCommands/commandGW2Class/componentsGW2Class");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("roster")
    .setDescription("show class roster!"),
  guildCommand: true,

  async execute(interaction) {
    const rosterEmbed = buildRosterSummary(interaction.guild);
    await interaction.reply({
      embeds: [rosterEmbed],
      ephemeral: false,
    });
  },
};
