const MenuGW2Profession = require("../../../menus/menuGW2Professions");
const { embedGW2Professions } = require("../../../embeds/embedGW2Professions");
const DiscordUtils = require("../../../utils/utilsDiscord");
module.exports = {
  customId: "set",
  async execute(interaction) {
    const memberUtils = new DiscordUtils.MemberUtils(interaction.member);
    const utils = new DiscordUtils.GuildUtils();

    const { proficiency, profession } = interaction.client.gw2pState.get(
      interaction.user.id
    );
    const currentMain = memberUtils.getRoleByColor(proficiency.color);
    // terrible name "mainInOtherProficiency"
    const mainInOtherSlot = memberUtils.getRoleByName(profession);
    const newMain = utils.getRoleByNameAndColor(profession, proficiency.color);

    if (currentMain) await memberUtils.removeRole(currentMain.id);
    if (mainInOtherSlot) await memberUtils.removeRole(mainInOtherSlot.id);
    await memberUtils.addRole(newMain.id);

    await interaction.client.gw2pState.delete(interaction.user.id);
    const menu = new MenuGW2Profession(interaction).buildMenu();
    const embed = await embedGW2Professions(interaction.member);
    interaction.update({ embeds: [embed], components: menu });
  },
};
