module.exports = {
  name: "interactionCreate",
  once: false,
  async execute(interaction) {
    try {
      let collection = interaction.client.slashCommands;
      let key = interaction.commandName;
      if (interaction.isButton()) collection = interaction.client.buttons;
      else if (interaction.isSelectMenu())
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
        if (error.content)
          if (error.content.text === "Invalid access token")
            errorMsg =
              "There is something wrong with the API key you are using";
          else if (error.content.text === "invalid key")
            errorMsg = "The API key you are using does not exist";
          else errorMsg = error.content.text;
      }
      const reply = {
        content: errorMsg,
        embeds: [],
        components: [],
        ephemeral: true,
      };
      if (interaction.isApplicationCommand())
        await interaction.editReply(reply);
      else await interaction.update(reply);
    }
  },
};
