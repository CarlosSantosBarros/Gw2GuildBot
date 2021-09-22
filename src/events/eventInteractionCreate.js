const {
  buildClassManageMenu,
  buildPlayerClassSummary,
} = require("../commands/commandGW2Class/componentsGW2Class");

const Discord = require("discord.js");
const { getRoleByName } = require("../utils/utilsDiscord");
const {
  updateRoster,
} = require("../commands/commandGW2Class/functionsGW2Class");
const {
  buildRosterSummary,
} = require("../commands/commandGW2Class/componentsGW2Class");

const currentValueCollection = new Discord.Collection();

module.exports = {
  name: "interactionCreate",
  once: false,
  async execute(interaction) {
    let classesMenu = buildClassManageMenu();
    const userMember = interaction.member;
    const guildRoles = interaction.guild.roles;

    if (interaction.commandName == "gw2class") {
      const playerClassSummary = buildPlayerClassSummary(userMember);
      await interaction.reply({
        ephemeral: true,
        components: classesMenu,
        embeds: [playerClassSummary],
      });
    }

    if (interaction.customId == "class") {
      let currentValue = interaction.values[0];
      const actionButton = getRoleByName(userMember.roles, currentValue)
        ? "remove"
        : "add";
      classesMenu = buildClassManageMenu({
        button: actionButton,
        select: currentValue,
      });
      interaction.update({ components: classesMenu });
      currentValue = getRoleByName(guildRoles, currentValue);
      currentValueCollection.set(userMember.id, currentValue);
    }

    if (interaction.isButton()) {
      const currentValue = currentValueCollection.get(userMember.id);
      if (interaction.customId == "add")
        await userMember.roles.add(currentValue.id);
      if (interaction.customId == "remove")
        await userMember.roles.remove(currentValue.id);
      classesMenu = buildClassManageMenu({
        button: "done",
        select: null,
      });
      if (interaction.customId == "done") {
        currentValueCollection.delete(userMember.id);
        const channel = await interaction.guild.channels.fetch(
          "886280778600808448"
        );
        const message = await channel.messages.fetch("889858795356962816");
        const rosterEmbed = await buildRosterSummary(interaction.guild);
        await message.edit({
          embeds: [rosterEmbed],
        });
        classesMenu = [];
      }

      const newPlayerClassSummary = buildPlayerClassSummary(userMember);
      interaction.update({
        components: classesMenu,
        embeds: [newPlayerClassSummary],
      });
    }

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
