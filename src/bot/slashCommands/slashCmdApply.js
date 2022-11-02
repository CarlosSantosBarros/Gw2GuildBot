const { SlashCommandBuilder } = require("@discordjs/builders");
const ClassGuildApplication = require("../classes/ClassGuildApplication");
const { ServerUtils, getGuild } = require("../utils");


module.exports = {
  data: new SlashCommandBuilder()
    .setName("apply")
    .setDescription("Apply to join the guild")
    .setDefaultPermission(false),
  guildCommand: true,

  async execute(interaction) {
    await interaction.reply({
      content: "Applying...",
      ephemeral: true,
    });
    const server = new ServerUtils(getGuild(interaction.client));
    const application = new ClassGuildApplication(interaction.member, server);
    await application.startApplication(interaction);
  },
};
