const { SlashCommandBuilder } = require("@discordjs/builders");
const { ClassGW2Profession } = require("../classes/ClassGW2Profession");
const { ServerUtils, getGuild } = require("../utils");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("professions")
    .setDescription("Add/Remove Professions that you play")
    .setDefaultPermission(false),
  guildCommand: true,

  async execute(interaction) {
    console.log(`Profession command used by ${interaction.user.username}`);
    const server = new ServerUtils(getGuild(interaction.client));
    const user = new ClassGW2Profession(interaction.member, server);
    user.startSelection();
    user.updateMessage(interaction);
  },
};
