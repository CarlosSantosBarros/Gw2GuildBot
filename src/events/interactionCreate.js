module.exports = async (interaction) => {
  if (!interaction.isCommand()) return;
  if (!interaction.client.commands.has(interaction.commandName)) return;

  try {
    await interaction.client.commands
      .get(interaction.commandName)
      .execute(interaction);
  } catch (error) {
    if (typeof error === "object") {
      console.log(error);
      error = "There was an error trying to execute that command!";
      await interaction.reply({
        content: error,
        ephemeral: true,
      });
    }
  }
};
