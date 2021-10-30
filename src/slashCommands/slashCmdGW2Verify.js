const { SlashCommandBuilder } = require("@discordjs/builders");
const GW2Player = require("../classes/GW2Player");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("verify")
    .setDescription("Verify using a gw2 API key")
    .addStringOption((option) =>
      option
        .setName("key")
        .setDescription("Key requiers the *account* scope")
        .setRequired(true)
    ),
  guildCommand: true,

  async execute(interaction) {
    const key = interaction.options.getString("key");
    const player = new GW2Player(interaction.user.id);
    await player.verify(key);

    await interaction.reply({
      content: "You are now verified",
      ephemeral: true,
    });

    // const verifiedRole = utils.getRoleByName("Verified");
    // await member.roles.add(verifiedRole.id);

    /**
     * getUserByRole
     * if has role
     * ask if want to apply
     * if yes show embed with current information
     * older than 18 dialog
     * class select dialog + willing to play other builds/classes
     * private message asking tell us more about your self
     */
  },
};
