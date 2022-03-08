const { guildSettings, professionsSettings } = require("../config.json");
const { RoleUtils } = require("./utilsRole");
/**
 // refactor -
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
  // refactor - maybe add getUserId() ?
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
    if (!this.isMember()) await this.addRole(guildSettings.memberRole);
  }
  async addVerifiedRole() {
    await this.addRole(guildSettings.verifiedRole);
  }
  async addRecruitRole() {
    if (!this.isRecuit) await this.addRole(guildSettings.recuitRole);
  }
  async removeMemberRole() {
    await this.removeRole(guildSettings.memberRole);
  }
  async removeVerifiedRole() {
    await this.removeRole(guildSettings.verifiedRole);
  }
  isMember() {
    return this.getRoleById(guildSettings.memberRole);
  }
  isVerified() {
    return this.getRoleById(guildSettings.verifiedRole);
  }
  isRecuit() {
    return this.getRoleById(guildSettings.recuitRole);
  }
  getProficiencies(color) {
    return this.getAllRolesByColor(color);
  }
  isMentorFor(value) {
    return this.getRoleByNameAndColor(value, professionsSettings.mentorColor);
  }
};
