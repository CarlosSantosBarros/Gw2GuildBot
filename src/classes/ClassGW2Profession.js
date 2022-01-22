const { client } = require("../index");
const { ServerUtils, MemberUtils } = require("../utils/");

exports.ClassGW2Profession = class {
  constructor(member) {
    this.member = new MemberUtils(member);
    this.server = new ServerUtils();
    this.userId = member.user.id;
    this.state = client.gw2pState.get(this.userId);
  }

  selectProficiency(value) {
    const object = client.proficiencyData.get(value);
    client.gw2pState.set(this.userId, {
      ...this.state,
      proficiency: object,
    });
  }

  selectProfession(value) {
    client.gw2pState.set(this.userId, {
      ...this.state,
      profession: value,
    });
  }

  setEmptyState() {
    client.gw2pState.set(this.userId, {
      profession: null,
      proficiency: null,
    });
  }

  async setProfession() {
    const { proficiency, profession } = this.state;
    const currentMain = this.member.getRoleByColor(proficiency.color);
    // terrible name "mainInOtherSlot"
    const mainInOtherSlot = this.member.getRoleByName(profession);
    const newMain = this.server.getRoleByNameAndColor(
      profession,
      proficiency.color
    );

    if (currentMain) await this.member.removeRole(currentMain.id);
    if (mainInOtherSlot) await this.member.removeRole(mainInOtherSlot.id);
    await this.member.addRole(newMain.id);

    this.setEmptyState();
  }

  async addProfession() {
    const { proficiency, profession } = this.state;

    const roleInOtherSlot = this.member.getRoleByName(profession);
    if (roleInOtherSlot) await this.member.removeRole(roleInOtherSlot.id);

    const role2Add = this.server.getRoleByNameAndColor(
      profession,
      proficiency.color
    );
    await this.member.addRole(role2Add.id);

    this.setEmptyState();
  }
  async removeProfession() {
    const { proficiency, profession } = this.state;
    const professionRole = this.server.getRoleByNameAndColor(
      profession,
      proficiency.color
    );

    await this.member.removeRole(professionRole.id);

    this.setEmptyState();
  }

  finishSelection() {
    client.gw2pState.delete(this.userId);
  }
};
