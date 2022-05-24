const { SlashCommandBuilder } = require("@discordjs/builders");

const { guildSync } = require("../utils/utils");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("guildsync")
    .setDescription("Sync roles for verified discord users")
    .setDefaultPermission(false),
  guildCommand: true,

  async execute(interaction) {
    await interaction.reply({
      content: "Syncing...",
      ephemeral: true,
    });

    const { removedRolesFrom, notVeried } = await guildSync();

    interaction.editReply({
      // eslint-disable-next-line max-len
      content: `**Finished**\nThe follow have had their roles removed:\n${removedRolesFrom}\nThe following have not verified:\n${notVeried}`,
      ephemeral: true,
    });
  },
};
