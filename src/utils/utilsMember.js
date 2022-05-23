const ServerUtils = require("./utilsServer");
const { guildSettings, professionsSettings } = require("../config.json");
const RoleUtils = require("./utilsRole");
const { memberRole, recuitRole, gw2RankColour, verifiedRole } = guildSettings;
const {
  Collection,
  GuildMember,
  GuildMemberRoleManager,
} = require("discord.js");
/**
 * extend GuildMember class
 * super(client, member, guild)
 * cant do this, .filter() breaks,
 * something to do with the role manager
 */

module.exports = class MemberUtils extends RoleUtils {
  /**
   * @param {GuildMember} member
   */
  constructor(member) {
    super();
    this.member = member;
    this.init(member.roles);
  }
  async addRole(id) {
    if (this.roles instanceof GuildMemberRoleManager) await this.roles.add(id);
  }
  async removeRole(id) {
    if (this.roles instanceof GuildMemberRoleManager)
      await this.roles.remove(id);
  }
  getUser() {
    return this.member.user;
  }
  getId() {
    return this.member.user.id;
  }
  async addMemberRole() {
    if (!this.isMember()) await this.addRole(memberRole);
  }
  async addVerifiedRole() {
    await this.addRole(verifiedRole);
  }
  async addRecruitRole() {
    if (!this.isRecuit) await this.addRole(recuitRole);
  }
  async removeMemberRole() {
    if (this.isMember()) await this.removeRole(memberRole);
  }
  async removeVerifiedRole() {
    if (this.isVerified()) await this.removeRole(verifiedRole);
  }
  isMember() {
    return this.getRoleById(memberRole);
  }
  isVerified() {
    return this.getRoleById(verifiedRole);
  }
  isRecuit() {
    return this.getRoleById(recuitRole);
  }
  getProficiencies(color) {
    return this.getAllRolesByColor(color);
  }
  getAllProficiencies() {
    let proficiencies = new Collection();
    professionsSettings.proficiencyData.forEach((entry) => {
      const currentCollection = this.getProficiencies(entry.color);
      console.log(currentCollection);
      proficiencies = proficiencies.concat(currentCollection);
    });
    return proficiencies;
  }

  isMentorFor(value) {
    return this.getRoleByNameAndColor(value, professionsSettings.mentorColor);
  }
  getRankRole() {
    return this.getRoleByColor(gw2RankColour);
  }

  async addRankrole(rank) {
    const hasRankRole = this.getRankRole();
    // these 2 hasRankRole ifs smell bad but i cant see why
    if (!hasRankRole || hasRankRole.name !== rank) {
      const server = new ServerUtils();
      let rankRoleTarget = server.getRoleByNameAndColor(rank, gw2RankColour);
      if (!rankRoleTarget)
        rankRoleTarget = await server.createRole(rank, gw2RankColour);
      await this.addRole(rankRoleTarget);
    }
    if (hasRankRole) {
      if (hasRankRole.name === rank) return;
      await this.removeRole(hasRankRole);
    }
  }

  async replaceRoleWith(oldRole, newRole) {
    await this.removeRole(oldRole.id);
    await this.addRole(newRole.id);
  }
};
