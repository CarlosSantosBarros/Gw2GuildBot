const { SlashCommandBuilder } = require("@discordjs/builders");
const GuildApplication = require("../classes/GuildApplication");
const GW2Player = require("../classes/GW2Player");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("applytest")
    .setDescription("test application to the guild"),
  guildCommand: true,

  async execute(interaction) {
    await interaction.reply({
      content: "applying",
      ephemeral: true,
    });
    const application = new GuildApplication(interaction.user.id);
    const player = new GW2Player(interaction.user.id);
    await player.verify();
    application.setAccountInf(player.getApplicationData());
    const menu = application.menuShouldStart();
    const collectorMessage = await interaction.member.send({
      content:
        // eslint-disable-next-line max-len
        "Thank you for verifying, I see that you are not a guild member, would you like to apply?",
      components: menu,
      fetchReply: true,
    });
    application.controler(collectorMessage);
  },
};
