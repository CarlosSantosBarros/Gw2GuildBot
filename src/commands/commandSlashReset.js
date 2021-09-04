const { SlashCommandBuilder } = require("@discordjs/builders");
const { log } = require("../utils/utilsDiscord");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("reset")
    .setDescription("Remove all commands!"),

  async execute(interaction) {
    await interaction.reply({
      content: "Started removing application (/) commands.",
      ephemeral: true,
      components: [],
    });
    const commands = await interaction.client.application.commands.fetch({
      guildId: interaction.guildId,
    });
    commands.forEach((command) => {
      if (command.name == "refresh" || command.name == "reset") return;
      log("Removing: " + command.name);
      command.delete();
    });
    await interaction.editReply({
      content: "Successfully removed application (/) commands.",
      ephemeral: true,
      components: [],
    });
  },
};
