const {
  buildClassManageMenu,
  buildPlayerClassSummary,
} = require("./componentsGW2Class");
const { removeFromArray } = require("../../utils/utils");
const { getPlayerClasses } = require("./functionsGW2Class");
const { updateDBGW2PlayerById } = require("../../utils/utilsDatabase");

const subConfig = {
  name: "manage",
  decription: "Add/Remove Classes that you play",
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
    const classesMenu = await buildClassManageMenu();
    let classesArray = await getPlayerClasses(interaction.user.id);
    let currentValue;
    const playerClassSummary = buildPlayerClassSummary(
      classesArray,
      interaction.user
    );
    await interaction.reply({
      content: "Summary embed at start",
      ephemeral: true,
      components: classesMenu,
      embeds: [playerClassSummary],
    });
    // * Extract this to be reusable
    // * Start
    const collectorSelect = interaction.channel.createMessageComponentCollector(
      { componentType: "SELECT_MENU" }
    );

    collectorSelect.on("collect", async (collected) => {
      currentValue = collected.values[0];
      const actionButton = classesArray.includes(currentValue)
        ? "remove"
        : "add";
      const classesMenuNew = await buildClassManageMenu({
        button: actionButton,
        select: currentValue,
      });
      collected.update({ components: classesMenuNew });
    });

    const collectorButton = interaction.channel.createMessageComponentCollector(
      {
        componentType: "BUTTON",
      }
    );
    collectorButton.on("collect", async (collected) => {
      //when done
      if (collected.customId == "done") {
        await updateDBGW2PlayerById(interaction.user.id, {
          classes: { classes: classesArray },
        });
        collected.update({
          content: "Summary embed at end",
          components: [],
        });
        collectorSelect.stop();
        collectorButton.stop();
        return;
      }
      //check if can add
      if (collected.customId == "add") classesArray.push(currentValue);
      //check if can remove
      if (collected.customId == "remove")
        classesArray = removeFromArray(classesArray, currentValue);
      console.log(classesArray);
      const newPlayerClassSummary = buildPlayerClassSummary(
        classesArray,
        interaction.user
      );
      collected.update({
        content: "Updated something to do with: " + currentValue,
        components: classesMenu,
        embeds: [newPlayerClassSummary],
      });
    });
    //* End
  },
};
