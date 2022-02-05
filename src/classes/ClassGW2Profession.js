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

  // refactor - bad name?
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
};
