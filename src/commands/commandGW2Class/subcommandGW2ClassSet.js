const { classesMenu } = require("./dataGW2Class");

const subConfig = {
  name: "set",
  decription: "Set class priority",
};

const configure = (subCommandObj) => {
  return subCommandObj
    .setName(subConfig.name)
    .setDescription(subConfig.decription);
};

module.exports = {
  config: subConfig,
  configure: configure,
  async execute(interaction) {
    await interaction.reply({
      content: "Select test",
      ephemeral: true,
      components: classesMenu,
    });
    // * Extract this to be reusable
    // * Start
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
      }
    );
    collectorButton.on("collect", (collected) => {
      //check what button
      //check if can add
      //check if can remove

      //when done
      collected.update({
        content: "done",
        ephemeral: true,
        components: [],
      });
      collectorSelect.stop();
    });
    //* End
  },
};
