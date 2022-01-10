const { SlashCommandBuilder } = require("@discordjs/builders");
const MenuGW2Profession = require("../menus/menuGW2Professions");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("roster")
    .setDescription("show profession roster!"),
  guildCommand: true,

  async execute(interaction) {
    const embeds = new MenuGW2Profession.getEmbeds();
    await interaction.reply({
      embeds: embeds,
      ephemeral: false,
    });
  },
};
