const { SlashCommandBuilder } = require("@discordjs/builders");
const { getGW2AccountInfo, getGW2GuildInfo } = require("../utils/utilsGw2API");

const {
  buildGw2ClassManager,
  buildPlayerClassSummary,
  buildClassManageMenu,
} = require("./slashCmdGW2Class/componentsGW2Class");
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
    const player = new GW2Player(interaction);
    await player.getAPIData(key);
    await player.giveRoles(interaction.guild);

    // line 47
    // if (isMember)
    // setTimeout(async () => {
    //   // maybe put this all in a class also
    //   // class stuff needs rework
    //   const playerClassSummary = buildPlayerClassSummary(interaction.member);
    //   const classesMenu = buildClassManageMenu();
    //   const classManagedMessage = await interaction.editReply({
    //     content: "Add classes that you play",
    //     ephemeral: true,
    //     components: classesMenu,
    //     embeds: [playerClassSummary],
    //     fetchReply: true,
    //   });
    //   buildGw2ClassManager(interaction, classManagedMessage);
    // }, 5000);
  },
};
