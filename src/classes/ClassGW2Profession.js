const { ServerUtils, MemberUtils } = require("../utils");
const { GuildMember } = require("discord.js");
const MenuGW2Profession = require("./menus/menuGW2Professions");
const StateGW2Profession = require("./state/StateGW2Profession");
const { proficiencyData } = require("../utils/utilsCollections");

exports.ClassGW2Profession = class {
  /**
   * @param {GuildMember} member
   * @param {ServerUtils} server
  */
  constructor(member, server) {
    this.member = new MemberUtils(member, server);
    this.server = server;
    this.state = new StateGW2Profession(member.user);
    this.selectedRole = undefined;
  }

  getSelectedRole() {
    const { profession, proficiency } = this.state.getSelection();
    return this.server.getRoleByNameAndColor(profession, proficiency.color);
  }

  async removeRoleInOtherSlot() {
    const { profession } = this.state.getSelection();
    const roleInOtherSlot = this.member.getRoleByName(profession);
    if (roleInOtherSlot) await this.member.removeRole(roleInOtherSlot.id);
  }

  startSelection() { this.state.setEmptyState(); }

  async selectProficiency(interaction) {
    this.state.setProficiency(interaction.values[0]);
    await this.updateMessage(interaction);
  }

  async selectProfession(interaction) {
    this.state.setProfession(interaction.values[0]);
    await this.updateMessage(interaction);
  }

  async setMain() {
    const main = proficiencyData.get("Main");
    const currentMain = this.member.getRoleByColor(main.color);
    if (currentMain) await this.member.removeRole(currentMain.id);
    await this.removeRoleInOtherSlot();
    const selectedRole = this.getSelectedRole();
    if (selectedRole) await this.member.addRole(selectedRole.id);
    this.state.setEmptyState();
  }

  async addProfession() {
    await this.removeRoleInOtherSlot();
    const selectedRole = this.getSelectedRole();
    if (selectedRole) await this.member.addRole(selectedRole.id);
    this.state.setEmptyState();
  }

  async removeProfession() {
    await this.getSelectedRole();
    const selectedRole = this.getSelectedRole();
    if (selectedRole) await this.member.removeRole(selectedRole.id);
    this.state.setEmptyState();
  }

  finishSelection() { this.state.deleteSelection(); }

  async updateMessage(message) {
    const selection = this.state.getSelection();
    const menu = new MenuGW2Profession(this.member, selection);
    const embeds = menu.getEmbeds();
    const components = menu.getComponents();
    // If statement to filter what kinda of change needs to be done
    if (message.isButton())
      await message.update({ embeds: embeds, components: components });
    else if (message.isStringSelectMenu())
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
