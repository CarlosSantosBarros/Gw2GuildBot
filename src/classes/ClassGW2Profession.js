const MenuGW2Profession = require("./menus/menuGW2Professions");
const { ServerUtils, MemberUtils } = require("../utils/");
const StateGW2Profession = require("./state/StateGW2Profession");

exports.ClassGW2Profession = class extends StateGW2Profession {
  constructor(member) {
    super(member.user.id);
    this.member = new MemberUtils(member);
    this.server = new ServerUtils();
  }

  getSelectedRole() {
    return this.server.getRoleByNameAndColor(
      this.state.profession,
      this.state.proficiency.color
    );
  }

  async removeRoleInOtherSlot() {
    const roleInOtherSlot = this.member.getRoleByName(this.state.profession);
    if (roleInOtherSlot) await this.member.removeRole(roleInOtherSlot.id);
  }

  async setProfession() {
    const currentMain = this.member.getRoleByColor(
      this.state.proficiency.color
    );
    if (currentMain) await this.member.removeRole(currentMain.id);
    this.removeRoleInOtherSlot();
    await this.member.addRole(this.getSelectedRole().id);
    return this.setEmptyState();
  }

  async addProfession() {
    this.removeRoleInOtherSlot();
    await this.member.addRole(this.getSelectedRole().id);
    return this.setEmptyState();
  }

  async removeProfession() {
    await this.member.removeRole(this.getSelectedRole().id);
    return this.setEmptyState();
  }

  async updateMessage(message) {
    const menu = new MenuGW2Profession(this.member, this.state);
    const embeds = menu.getEmbeds();
    const components = menu.getComponents();
    // If statement to filter what kinda of change needs to be done
    if (message.isButton())
      await message.update({ embeds: embeds, components: components });
    else if (message.isSelectMenu())
      await message.update({ components: components });
    else if (message.replied)
      await message.editReply({
        content:
          "You have been verified, please select your skill level and class",
        components: components,
        embeds: embeds,
      });
    else
      await message.reply({
        ephemeral: true,
        components: components,
        embeds: embeds,
      });
  }
};
