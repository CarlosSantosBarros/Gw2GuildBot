const { client } = require("../index");
const DiscordUtils = require("../utils/utilsDiscord");

module.exports = class ClassGW2Profession {
  constructor(member) {
    this.member = new DiscordUtils.MemberUtils(member);
    this.utils = new DiscordUtils.ServerUtils();
    this.userId = member.user.id;
    this.state = client.gw2pState.get(member.user.id);
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
    const newMain = this.utils.getRoleByNameAndColor(
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

    const role2Add = this.utils.getRoleByNameAndColor(
      profession,
      proficiency.color
    );
    await this.member.addRole(role2Add.id);

    this.setEmptyState();
  }
  async removeProfession() {
    const { proficiency, profession } = this.state;
    const professionRole = this.utils.getRoleByNameAndColor(
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
