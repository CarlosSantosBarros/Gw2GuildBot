const MenuGW2Profession = require("../../../menus/menuGW2Professions");
const DiscordUtils = require("../../../utils/utilsDiscord");
module.exports = {
  customId: "add",
  async execute(interaction) {
    const memberUtils = new DiscordUtils.MemberUtils(interaction.member);
    const utils = new DiscordUtils.GuildUtils();

    const { proficiency, profession } = interaction.client.gw2pState.get(
      interaction.user.id
    );
    const roleInOtherSlot = memberUtils.getRoleByName(profession);
    if (roleInOtherSlot) await memberUtils.removeRole(roleInOtherSlot.id);

    const role2Add = utils.getRoleByNameAndColor(profession, proficiency.color);
    await memberUtils.addRole(role2Add.id);

    interaction.client.gw2pState.delete(interaction.user.id);
    const menu = new MenuGW2Profession(interaction);
    const components = menu.getComponents();
    const embeds = menu.getEmbeds();
    interaction.update({ embeds: embeds, components: components });
  },
};
