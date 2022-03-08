const { SlashCommandBuilder } = require("@discordjs/builders");
const { ClassGuildApplication } = require("../classes/ClassGuildApplication");
const { guildSettings } = require("../config.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("apply")
    .setDescription("Apply to join the guild")
    .setDefaultPermission(false),
  guildCommand: true,
  perms: [
    {
      id: guildSettings.verifiedRole,
      type: "ROLE",
      permission: true,
    },
  ],

  async execute(interaction) {
    await interaction.reply({
      content: "Applying...",
      ephemeral: true,
    });

    const application = new ClassGuildApplication(interaction.user);
    await application.startApplication(interaction.member);
    await application.updateMessage(interaction);
  },
};
