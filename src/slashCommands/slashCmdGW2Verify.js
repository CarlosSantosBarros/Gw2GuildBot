const { SlashCommandBuilder } = require("@discordjs/builders");
const GW2Player = require("../classes/GW2Player");
const MenuGW2Profession = require("../menus/menuGW2Professions");

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

    if (player.getIsMember())
      setTimeout(async () => {
        console.log(`Profession command used by ${interaction.user.username}`);
        const menu = new MenuGW2Profession(interaction);
        const embeds = menu.getEmbeds();
        const components = menu.getComponents();

        await interaction.reply({
          ephemeral: true,
          components: components,
          embeds: embeds,
        });
      }, 1000);
    else
      interaction.member.send({
        content:
          "Thank you for verifying, I see that you are not a guild member, would you like to apply?",
        ephemeral: true,
      });
  },
};
