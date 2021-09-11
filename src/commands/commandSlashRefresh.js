const { SlashCommandBuilder } = require("@discordjs/builders");
const { refreshCommands } = require("../utils/utilsSlashCommands");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("refresh")
    .setDescription("Refresh/update commands!"),

  async execute(interaction) {
    await interaction.reply({
      content: "Started refreshing application (/) commands.",
      ephemeral: true,
    });
    refreshCommands("command", __dirname, interaction.guildId);
    await interaction.editReply({
      content: "Successfully reloaded application (/) commands.",
      ephemeral: true,
    });
  },
};
