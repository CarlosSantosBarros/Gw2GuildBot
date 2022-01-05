const { SlashCommandBuilder } = require("@discordjs/builders");
const MenuGW2Profession = require("../menus/menuGW2Professions");
const { embedGW2Professions } = require("../embeds/embedGW2Professions");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("professions")
    .setDescription("Add/Remove Professiones that you play"),
  guildCommand: true,

  async execute(interaction) {
    console.log(`Profession command used by ${interaction.user.username}`);
    const embed = await embedGW2Professions(interaction.member);
    const menu = new MenuGW2Profession(interaction).buildMenu();

    await interaction.reply({
      ephemeral: true,
      components: menu,
      embeds: [embed],
    });
  },
};
