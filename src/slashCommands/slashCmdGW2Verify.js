const { SlashCommandBuilder } = require("@discordjs/builders");
const { GW2Player } = require("../classes/GW2Player");
const { ClassGW2Profession } = require("../classes/ClassGW2Profession");
const MenuGW2Profession = require("../menus/menuGW2Professions");

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
    const key = interaction.options.getString("key");
    const player = new GW2Player(interaction.member);
    await player.verify(key);

    if (player.getIsMember()) {
      console.log(`Profession command used by ${interaction.user.username}`);

      const user = new ClassGW2Profession(interaction.member);
      user.setEmptyState();

      const menu = new MenuGW2Profession(interaction.member);
      const embeds = menu.getEmbeds();
      const components = menu.getComponents();

      await interaction.editReply({
        content:
          "You have been verified, please select your skill level and class",
        ephemeral: true,
        components: components,
        embeds: embeds,
      });
    } else
      interaction.editReply({
        content: `Thank you for verifying, 
          I see that you are not a guild member, use /apply if you would like to join`,
        ephemeral: true,
      });
  },
};
