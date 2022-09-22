const { SlashCommandBuilder } = require("@discordjs/builders");
const { ClassGW2Profession } = require("../classes/ClassGW2Profession");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("professions")
    .setDescription("Add/Remove Professions that you play")
    .setDefaultPermission(false),
  guildCommand: true,

  async execute(interaction) {
    console.log(`Profession command used by ${interaction.user.username}`);
    const member = interaction.member;
    const user = new ClassGW2Profession(member);
    user.startSelection();
    user.updateMessage(interaction);
  },
};
