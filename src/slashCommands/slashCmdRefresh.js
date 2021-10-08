const { SlashCommandBuilder } = require("@discordjs/builders");
const {
  refreshGuildCommands,
  refreshGlobalCommands,
} = require("../utils/utilsSlashCommands");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("refresh")
    .setDescription("Refresh/update commands!"),
  guildCommand: false,

  async execute(interaction) {
    await interaction.reply({
      content: "Started refreshing application (/) commands.",
      ephemeral: true,
    });
    refreshGuildCommands("command", __dirname, interaction.guildId);
    refreshGlobalCommands("command", __dirname);

    await interaction.editReply({
      content: "Successfully reloaded application (/) commands.",
      ephemeral: true,
    });
  },
};
