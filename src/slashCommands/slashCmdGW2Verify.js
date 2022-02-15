const { SlashCommandBuilder } = require("@discordjs/builders");
const { GW2Player } = require("../classes/GW2Player");
const { ClassGW2Profession } = require("../classes/ClassGW2Profession");
const { MemberUtils } = require("../utils/");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("verify")
    .setDescription("Verify using a gw2 API key")
    .addStringOption((option) =>
      option
        .setName("key")
        .setDescription("Key requiers the *account* and *progression* scopes")
        .setRequired(true)
    ),
  guildCommand: true,

  async execute(interaction) {
    await interaction.reply({
      content: "You are being verified",
      ephemeral: true,
    });

    const player = new GW2Player(interaction.member);
    await player.verify(interaction.options.getString("key"));

    const member = new MemberUtils(interaction.member);
    if (member.isMember()) {
      console.log(`Profession command used by ${interaction.user.username}`);

      const user = new ClassGW2Profession(interaction.member);
      user.setEmptyState();
      user.updateMessage(interaction);
    } else
      interaction.editReply({
        content: `Thank you for verifying, 
          I see that you are not a guild member, use /apply if you would like to join`,
      });
  },
};
