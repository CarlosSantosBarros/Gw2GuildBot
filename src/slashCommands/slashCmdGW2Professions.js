const { SlashCommandBuilder } = require("@discordjs/builders");
const {
  controlerGW2Professions,
} = require("../UI/controlers/controlerGW2Professions");
const { embedGW2Professions } = require("../UI/embeds/embedGW2Professions");
const { menuGW2Profession } = require("../UI/menus/menuGW2Professions");
const { MemberUtils } = require("../utils/utilsDiscord");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("professions")
    .setDescription("Add/Remove Professiones that you play"),
  guildCommand: true,

  async execute(interaction) {
    const playerProfessionSummary = await embedGW2Professions(
      interaction.member
    );
    const memberUtils = new MemberUtils(interaction.member);
    let hasMain;
    if (!memberUtils.getRoleByColor("#000000")) hasMain = "main";
    const professionesMenu = await menuGW2Profession({
      selectedProficiencyValue: hasMain,
      selectedProfessionValue: null,
      buttonAction: "done",
    });
    const collectorMessage = await interaction.reply({
      ephemeral: true,
      components: professionesMenu,
      embeds: [playerProfessionSummary],
      fetchReply: true,
    });
    controlerGW2Professions(interaction, collectorMessage);
  },
};
