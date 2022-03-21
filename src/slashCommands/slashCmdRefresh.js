const { SlashCommandBuilder } = require("@discordjs/builders");
const {
  refreshGuildCommands,
  // refreshGlobalCommands,
} = require("../utils/utilsSlashCommands");
const { botAdminPerms } = require("../config.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("refresh")
    .setDescription("Refresh/update commands!")
    .setDefaultPermission(false),
  guildCommand: true,
  perms: botAdminPerms,

  async execute(interaction) {
    await interaction.reply({
      content: "Started refreshing application (/) commands.",
      ephemeral: true,
    });
    refreshGuildCommands("slashCmd", __dirname, interaction.guildId);
    // refreshGlobalCommands("slashCmd", __dirname);

    await interaction.editReply({
      content: "Successfully reloaded application (/) commands.",
      ephemeral: true,
    });
  },
};
