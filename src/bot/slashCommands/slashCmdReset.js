const { SlashCommandBuilder } = require("@discordjs/builders");
const { log } = require("../utils/utils");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("reset")
    .setDescription("Remove all commands!")
    .setDefaultPermission(false),
  guildCommand: true,

  async execute(interaction) {
    await interaction.reply({
      content: "Started removing application (/) commands.",
      ephemeral: true,
    });
    const commands = await interaction.client.application.commands.fetch({
      guildId: interaction.guildId,
    });
    commands.forEach((command) => {
      log(`Removing: ${command.name}`);
      command.delete();
    });
    await interaction.editReply({
      content: "Successfully removed application (/) commands.",
      ephemeral: true,
    });
  },
};
