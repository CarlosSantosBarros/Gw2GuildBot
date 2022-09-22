const {
  Collection, GuildMemberRoleManager,
  // eslint-disable-next-line no-unused-vars
  GuildMember, User, Role, RoleResolvable
} = require("discord.js");
const RoleUtils = require("./utilsRole");
const { guildSettings, professionsSettings } = require("../config.json");
const { mentorColor } = professionsSettings;
const { memberRole, recuitRole, gw2RankColour, verifiedRole } = guildSettings;
const { proficiencyData } = require("./utilsCollections");


/**
 * @extends RoleUtils
 */
module.exports = class MemberUtils extends RoleUtils {
  /** @param {GuildMember} member */
  constructor(member) {
    super(member.roles);
    this.member = member;
  }
  /** @param {RoleResolvable|Collection<string,Role>} id */
  async addRole(id) {
    if (this.roles instanceof GuildMemberRoleManager) await this.roles.add(id);
  }
  /** @param {RoleResolvable|Collection<string,Role>} id */
  async removeRole(id) {
    if (this.roles instanceof GuildMemberRoleManager) await this.roles.remove(id);
  }
  /** @returns {User} */
  getUser() { return this.member.user; }
  /** @returns {string} */
  getId() { return this.member.user.id; }

  async addMemberRole() { if (!this.isMember()) await this.addRole(memberRole); }
  async addVerifiedRole() { await this.addRole(verifiedRole); }
  async addRecruitRole() { if (!this.isRecuit) await this.addRole(recuitRole); }
  async removeMemberRole() { if (this.isMember()) await this.removeRole(memberRole); }
  async removeVerifiedRole() { if (this.isVerified()) await this.removeRole(verifiedRole); }

  /** @returns {(Role|undefined)} */
  isMember() { return this.getRoleById(memberRole); }

  /** @returns {(Role|undefined)} */
  isVerified() { return this.getRoleById(verifiedRole); }

  /** @returns {(Role|undefined)} */
  isRecuit() { return this.getRoleById(recuitRole); }

  /**
   * @param {string} color
   * @returns {Collection<string,Role>}
   */
  getProficiencies(color) { return this.getAllRolesByColor(color); }

  async removeProficiencies() {
    let proficiencies = new Collection();
    proficiencyData.forEach((entry) => {
      const currentCollection = this.getProficiencies(entry.color);
      proficiencies = proficiencies.concat(currentCollection);
    });
    await this.removeRole(proficiencies);
  }

  /**
   * @param {string} value
   * @returns {(Role|undefined)}
   */
  isMentorFor(value) { return this.getRoleByNameAndColor(value, mentorColor); }

  /** @returns {(Role|undefined)} */
  getRankRole() { return this.getRoleByColor(gw2RankColour); }

  /** @param {Role} rankRole */
  async addRankrole(rankRole) {
    await this.removeRankRole();
    await this.addRole(rankRole.id);
  }

  async removeRankRole() {
    const rankRole = this.getRankRole();
    if (rankRole) await this.removeRole(rankRole);
  }

  async replaceRoleWith(oldRole, newRole) {
    await this.removeRole(oldRole.id);
    await this.addRole(newRole.id);
  }
};
