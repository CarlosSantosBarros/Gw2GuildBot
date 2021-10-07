module.exports = {
  name: "interactionCreate",
  once: false,
  async execute(interaction) {
    if (!interaction.isCommand()) return;
    if (!interaction.client.slashCommands.has(interaction.commandName)) return;

    try {
      await interaction.client.slashCommands
        .get(interaction.commandName)
        .execute(interaction);
    } catch (error) {
      let errorMsg = error;
      if (typeof error === "object") {
        console.log(error);
        // eslint-disable-next-line no-ex-assign
        errorMsg = "There was an error trying to execute that command!";
      }
      await interaction.reply({
        content: errorMsg,
        ephemeral: true,
      });
    }
  },
};
