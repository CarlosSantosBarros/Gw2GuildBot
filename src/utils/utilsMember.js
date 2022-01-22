const { guildSettings, professionsSettings } = require("../config.json");
const { RoleUtils } = require("./utilsRole");
/**
 * Juicy refactor here,
 * extend GuildMember class
 * super(client, member, guild)
 * cant do this, .filter() breaks,
 * something to do with the role manager
 */

exports.MemberUtils = class extends RoleUtils {
  constructor(member) {
    super(member.roles);
    this.member = member;
  }
  async addRole(id) {
    await this.roles.add(id);
  }
  async removeRole(id) {
    await this.roles.remove(id);
  }
  getUser() {
    return this.member.user;
  }
  async addMemberRole() {
    await this.addRole(guildSettings.memberRole);
  }
  async addVerifiedRole() {
    await this.addRole(guildSettings.verifiedRole);
  }
  isMember() {
    return this.getRoleById(guildSettings.memberRole);
  }
  getProficiencies(color) {
    return this.getAllRolesByColor(color);
  }
  isMentorFor(value) {
    return this.getRoleByNameAndColor(value, professionsSettings.mentorColor);
  }
};
