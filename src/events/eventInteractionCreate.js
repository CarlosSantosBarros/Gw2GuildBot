const {
  buildClassManageMenu,
  buildPlayerClassSummary,
} = require("../commands/commandGW2Class/componentsGW2Class");
const { removeFromArray } = require("../utils/utils");
const {
  getPlayerClasses,
} = require("../commands/commandGW2Class/functionsGW2Class");
const {
  updateDBGW2PlayerById,
} = require("../database/tableInterfaces/tableInterfaceGW2Player");
const Discord = require("discord.js");

const currentValueCollection = new Discord.Collection();
const rosterCollection = new Discord.Collection();

module.exports = {
  name: "interactionCreate",
  once: false,
  async execute(interaction) {
    /**
     * juicy refactor here
     * manage class selection as roles
     * *Start here*
     */
    const classesMenu = await buildClassManageMenu();
    if (interaction.commandName == "gw2class") {
      const classesArray = await getPlayerClasses(interaction.user.id);
      const playerClassSummary = buildPlayerClassSummary(
        classesArray,
        interaction.user
      );
      currentValueCollection.set(interaction.user.id, {
        classesArray: classesArray,
      });
      await interaction.reply({
        ephemeral: true,
        components: classesMenu,
        embeds: [playerClassSummary],
      });
    }
    // select stuff
    if (interaction.customId == "class") {
      const currentUser = currentValueCollection.get(interaction.user.id);
      const currentValue = interaction.values[0];
      const actionButton = currentUser.classesArray.includes(currentValue)
        ? "remove"
        : "add";
      const classesMenuNew = await buildClassManageMenu({
        button: actionButton,
        select: currentValue,
      });
      interaction.update({ components: classesMenuNew });
      currentValueCollection.set(interaction.user.id, {
        ...currentUser,
        currentValue: currentValue,
      });
    }
    //button stuff
    if (interaction.isButton()) {
      const currentUser = currentValueCollection.get(interaction.user.id);
      console.log(currentUser.classesArray);
      //when done
      if (interaction.customId == "done") {
        await updateDBGW2PlayerById(interaction.user.id, {
          classes: currentUser.classesArray,
        });
        currentValueCollection.delete(interaction.user.id);
        interaction.update({
          components: [],
        });
        return;
      }
      //check if can add
      if (interaction.customId == "add")
        currentUser.classesArray.push(currentUser.currentValue);
      //check if can remove
      if (interaction.customId == "remove")
        currentUser.classesArray = removeFromArray(
          currentUser.classesArray,
          currentUser.currentValue
        );
      console.log(currentUser.classesArray);
      currentValueCollection.set(interaction.user.id, {
        classesArray: currentUser.classesArray,
      });
      const newPlayerClassSummary = buildPlayerClassSummary(
        currentUser.classesArray,
        interaction.user
      );
      interaction.update({
        components: classesMenu,
        embeds: [newPlayerClassSummary],
      });
    }

    //* End

    if (!interaction.isCommand()) return;
    if (!interaction.client.commands.has(interaction.commandName)) return;

    try {
      await interaction.client.commands
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
