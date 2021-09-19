const { SlashCommandBuilder } = require("@discordjs/builders");
const Discord = require("discord.js");
const {
  getDiscordGuildById,
} = require("../database/tableInterfaces/tableInterfaceDiscordGuild");
const { buildRosterSummary } = require("./commandGW2Class/componentsGW2Class");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("roster")
    .setDescription("show class roster!"),
  guildCommand: true,

  async execute(interaction) {
    const dbRoster = await getDiscordGuildById(interaction.guildId);
    // console.log(dbRoster.GW2ClassClasses);
    const rosterCollection = new Discord.Collection(
      Object.entries(dbRoster.GW2ClassClasses)
    );
    // const collectionAsJson = Object.fromEntries(rosterCollection);
    // await updateDiscordGuildById(interaction.guildId, {
    //   GW2ClassClasses: collectionAsJson,
    // });
    const rosterEmbed = buildRosterSummary(rosterCollection, interaction.guild);
    await interaction.reply({
      content: "class roster embed goes here",
      embeds: [rosterEmbed],
      ephemeral: true,
    });
  },
};
