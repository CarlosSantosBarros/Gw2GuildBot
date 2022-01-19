const { SlashCommandBuilder } = require("@discordjs/builders");
const MenuGW2Profession = require("../menus/menuGW2Professions");
const ClassGW2Profession = require("../classes/ClassGW2Profession");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("professions")
    .setDescription("Add/Remove Professiones that you play"),
  guildCommand: true,

  async execute(interaction) {
    console.log(`Profession command used by ${interaction.user.username}`);
    const member = interaction.member;
    const user = new ClassGW2Profession(member);
    user.setEmptyState();
    const menu = new MenuGW2Profession(member);
    const embeds = menu.getEmbeds();
    const components = menu.getComponents();

    await interaction.reply({
      ephemeral: true,
      components: components,
      embeds: embeds,
    });
  },
};
