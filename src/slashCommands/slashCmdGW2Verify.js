const { SlashCommandBuilder } = require("@discordjs/builders");
const { GW2Player } = require("../classes/GW2Player");
const { ClassGW2Profession } = require("../classes/ClassGW2Profession");
const { MemberUtils, ServerUtils, getGuild } = require("../utils/");
const { verifyMessage } = require("../config.json");

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

    const server = new ServerUtils(getGuild(interaction.client));
    const member = new MemberUtils(interaction.member, server);
    const player = new GW2Player(member);
    await player.verify(interaction.options.getString("key"));

    if (member.isMember()) {
      console.log(`Profession command used by ${interaction.user.username}`);

      const user = new ClassGW2Profession(interaction.member, server);
      user.updateMessage(interaction);
    } else
      interaction.editReply({
        content: verifyMessage,
      });
  },
};
