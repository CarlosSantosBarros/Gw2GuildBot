const { SlashCommandBuilder } = require("@discordjs/builders");
const EmbedRosterSummary = require("../classes/menus/embeds/embedRosterSummary");
const { botAdminPerms } = require("../config.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("roster")
    .setDescription("show profession roster!")
    .setDefaultPermission(false),
  guildCommand: true,
  perms: botAdminPerms,

  async execute(interaction) {
    const embeds = new EmbedRosterSummary();
    console.log(embeds);
    await interaction.reply({
      embeds: [embeds],
      ephemeral: false,
    });
  },
};
