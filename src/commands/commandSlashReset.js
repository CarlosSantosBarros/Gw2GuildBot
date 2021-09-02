const { SlashCommandBuilder } = require("@discordjs/builders");

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
      console.log("Removing: " + command.name);
      //   command.delete().then(console.log());
    });
    await interaction.editReply({
      content: "Successfully removed application (/) commands.",
      ephemeral: true,
      components: [],
    });
  },
};
