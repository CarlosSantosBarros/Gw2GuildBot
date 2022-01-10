module.exports = {
  name: "interactionCreate",
  once: false,
  async execute(interaction) {
    try {
      let collection = interaction.client.slashCommands;
      let key = interaction.commandName;
      if (interaction.isButton()) collection = interaction.client.buttons;
      if (interaction.isSelectMenu())
        collection = interaction.client.selectMenus;
      if (interaction.isMessageComponent()) key = interaction.customId;

      if (!collection.has(key)) console.log(`Interaction ${interaction.type}`);
      await collection.get(key).execute(interaction);
    } catch (error) {
      let errorMsg = error;
      if (typeof error === "object") {
        console.log(error);
        // eslint-disable-next-line no-ex-assign
        errorMsg = "There was an error trying to execute that action!";
      }
      await interaction.update({
        content: errorMsg,
        embeds: [],
        components: [],
      });
    }
  },
};
