const ServerUtils = require("./utilsServer");
const { guildSettings, professionsSettings } = require("../config.json");
const RoleUtils = require("./utilsRole");
/**
 * extend GuildMember class
 * super(client, member, guild)
 * cant do this, .filter() breaks,
 * something to do with the role manager
 */

module.exports = class MemberUtils extends RoleUtils {
  constructor(member) {
    super();
    this.member = member;
    this.init(member.roles);
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
  getId() {
    return this.member.user.id;
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
  async addRankrole(rank) {
    const server = new ServerUtils();
    const rankRole = server.getRoleByName(rank);
    if (!rankRole)
      throw "The role for your rank does not exist, please contact a mod or guild officer";
    if (this.getRoleById(rankRole.id)) return;
    await this.addRole(rankRole.id);
  }
  async replaceRoleWith(oldRole, newRole) {
    await this.member.removeRole(oldRole.id);
    await this.member.addRole(newRole.id);
  }
};
