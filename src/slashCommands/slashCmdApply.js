const { SlashCommandBuilder } = require("@discordjs/builders");
const MenuGuildApplication = require("../menus/menuGuildApplication");
const { GW2Player } = require("../classes/GW2Player");
const { getWorld } = require("../utils/utilsGw2API");

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

    const player = new GW2Player(interaction.member);
    await player.init();
    const accountData = player.getApplicationData();

    // move into application class ----
    const serverInfo = await getWorld(accountData.application.server);
    interaction.client.guildAppState.set(interaction.user.id, {
      ...accountData,
      application: {
        ...accountData.application,
        server: serverInfo,
      },
    });
    //  -----

    const menu = new MenuGuildApplication(interaction.member);
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
