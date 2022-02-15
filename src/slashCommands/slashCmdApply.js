const { SlashCommandBuilder } = require("@discordjs/builders");
const MenuGuildApplication = require("../classes/menus/menuGuildApplication");
const { GW2Player } = require("../classes/GW2Player");
const { getWorld } = require("../utils/utilsGw2API");
const { ClassGuildApplication } = require("../classes/ClassGuildApplication");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("apply")
    .setDescription("Apply to join the guild"),
  guildCommand: true,

  async execute(interaction) {
    await interaction.reply({
      content: "Applying...",
      ephemeral: true,
    });
    const member = interaction.member;
    const player = new GW2Player(member);
    await player.init();
    const accountData = player.getApplicationData();

    const serverInfo = await getWorld(accountData.application.server);
    const application = new ClassGuildApplication(interaction.user);
    const state = application.setAccountData(accountData, serverInfo);

    const menu = new MenuGuildApplication(member, state);
    const components = menu.getComponents();
    const embeds = menu.getEmbeds();
    await interaction.editReply({
      content: "Please select the approriate answers and click continue",
      components: components,
      embeds: embeds,
      ephemeral: true,
    });
  },
};
