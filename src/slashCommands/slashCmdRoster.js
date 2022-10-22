const { SlashCommandBuilder } = require("@discordjs/builders");
const EmbedRosterSummary = require("../classes/menus/embeds/embedRosterSummary");
const { ServerUtils, getGuild } = require("../utils");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("roster")
    .setDescription("show profession roster!")
    .setDefaultPermission(false),
  guildCommand: true,

  async execute(interaction) {
    const server = new ServerUtils(getGuild(interaction.client));
    const embeds = new EmbedRosterSummary(server);
    console.log(embeds);
    await interaction.reply({
      embeds: [embeds],
      ephemeral: false,
    });
  },
};
