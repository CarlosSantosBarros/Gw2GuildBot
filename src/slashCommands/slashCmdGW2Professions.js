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
    .setDescription("Add/Remove Classes that you play"),
  guildCommand: true,

  async execute(interaction) {
    const playerClassSummary = await embedGW2Professions(interaction.member);
    const memberUtils = new MemberUtils(interaction.member);
    let hasMain;
    if (!memberUtils.getRoleByColor("#000000")) hasMain = "main";
    const classesMenu = await menuGW2Profession({
      selectedProficiencyValue: hasMain,
      selectedProfessionValue: null,
      buttonAction: null,
    });
    const classManagedMessage = await interaction.reply({
      ephemeral: true,
      components: classesMenu,
      embeds: [playerClassSummary],
      fetchReply: true,
    });
    controlerGW2Professions(interaction, classManagedMessage);
  },
};
