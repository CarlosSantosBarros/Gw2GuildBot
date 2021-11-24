const { SlashCommandBuilder } = require("@discordjs/builders");
const GW2Player = require("../classes/GW2Player");
const GW2Professions = require("../classes/GW2Professions");

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
        const gw2Professions = new GW2Professions(interaction);
        const playerProfessionSummary = await gw2Professions.embed();
        const professionesMenu = await gw2Professions.menu();

        const collectorMessage = await interaction.editReply({
          content: "Add classes that you play",
          ephemeral: true,
          components: professionesMenu,
          embeds: [playerProfessionSummary],
          fetchReply: true,
        });
        gw2Professions.controler(collectorMessage);
      }, 1000);
    else
      interaction.member.send({
        content:
          "Thank you for verifying, I see that you are not a guild member, would you like to apply?",
        ephemeral: true,
        // components: yesno,
        // embeds: [playerProfessionSummary],
        fetchReply: true,
      });
  },
};
