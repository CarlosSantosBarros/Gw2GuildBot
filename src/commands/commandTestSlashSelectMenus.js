const { selectMenu } = require("../modules/moduleSlashTest");

module.exports = {
  name: "select",
  description: "Test select menues",
  args: [],
  usage: "<comand>",

  async execute(interaction) {
    await interaction.reply({
      content: "Select test",
      ephemeral: true,
      components: selectMenu,
    });
    // ~
    const collectorSelect = interaction.channel.createMessageComponentCollector(
      {
        componentType: "SELECT_MENU",
      }
    );
    collectorSelect.on("collect", (i) => {
      if (i.user.id === interaction.user.id)
        console.log(`${i.user.username} clicked on the ${i.customId} button.`);
      console.log(`${i.values}`);
      i.reply({
        content: i.values[0],
        ephemeral: true,
        components: [],
      });
    });

    collectorSelect.on("end", (collected) => {
      console.log(`Collected ${collected.size} interactions.`);
    });

    const collectorButton = interaction.channel.createMessageComponentCollector(
      {
        componentType: "BUTTON",
        max: 1,
      }
    );
    collectorButton.on("collect", (collected) => {
      collected.update({
        content: "done",
        ephemeral: true,
        components: [],
      });
      collectorSelect.stop();
    });
  },
};
