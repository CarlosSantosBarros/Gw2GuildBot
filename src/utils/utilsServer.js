// eslint-disable-next-line no-unused-vars
const { Guild, Collection, GuildMember } = require("discord.js");

const { guildSettings, professionsSettings } = require("../config.json");
const RoleUtils = require("./utilsRole");
const { memberRole, officerRole, applicationChannel, gw2RankColour } =
  guildSettings;

/**
 * Role utils that are tied to a server
 * @module ServerUtils
 */

module.exports = class ServerUtils extends RoleUtils {
  /** @param {Guild} guild */
  constructor(guild) {
    super(guild.roles);
    this.guild = guild;
  }

  getChannelByNameAndType(name, type) {
    return this.guild.channels.cache.find(
      (channel) => channel.name === name && channel.type === type
    );
  }
  getChannelById(id) {
    return this.guild.channels.cache.find((channel) => channel.id === id);
  }

  getMemberById(id) {
    const returnedMember = this.guild.members.cache.find((member) => member.user.id === id);
    if (!returnedMember) throw "That user is no longer in the server";
    else return returnedMember;
  }

  getRoleByPermissions(permission) {
    return this.roles.cache.find((role) => !role.permissions.has(permission));
  }
  /**
   * @returns {Collection<string,GuildMember>}
   */
  getMembers() { return this.getMembersByRoleId(memberRole); }

  getOfficers() { return this.getMembersByRoleId(officerRole); }

  getApplicationChan() { return this.getChannelById(applicationChannel); }

  isApplicationChan(value) {
    if (value == this.getChannelById(applicationChannel)) return true;
    return false;
  }

  getMentorsFor(value) {
    const mentors = this.getRoleByNameAndColor(
      value,
      professionsSettings.mentorColor
    );
    return mentors ? mentors.members : mentors;
  }

  getMembersByRoleId(roleId) {
    return this.getRoleById(roleId).members;
  }

  // refactor - refactored but still bad :S
  getPlayers(value) {
    const members = this.getMembers();
    return members.filter((member) =>
      member.roles.cache.find((role) => role.name === value)
    ).size;
  }
  getGw2RankByName(rankName) { return this.getRoleByNameAndColor(rankName, gw2RankColour); }

  async createRole(name, color) {
    return await this.guild.roles.create({
      name,
      color,
    });
  }
};
