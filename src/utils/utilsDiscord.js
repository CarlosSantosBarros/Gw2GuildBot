const { guildObject } = require("./../");
const { guildSettings } = require("../config.json");
/**
 * juicy refactor here
 * base classe to extend/inherit from
 */
class ServerUtils {
  constructor() {
    this.guild = guildObject();
  }
  getChannelByNameAndType(textName, type) {
    return this.guild.channels.cache.find(
      (channel) => channel.name === textName && channel.type === type
    );
  }
  getRoleByName(roleName) {
    return this.guild.roles.cache.find((role) => role.name === roleName);
  }

  getRoleById(id) {
    return this.guild.roles.cache.find((role) => role.id === id);
  }

  getRolesByName(roleName) {
    return this.guild.roles.cache.filter((role) => role.name === roleName);
  }

  getRoleByColor(colorHexValue) {
    return this.guild.roles.cache.find(
      (role) => role.hexColor === colorHexValue
    );
  }

  getRoleByNameAndColor(roleName, colorHexValue) {
    return this.guild.roles.cache.find(
      (role) => role.hexColor === colorHexValue && role.name === roleName
    );
  }

  getRoleByPermissions(permission) {
    return this.guild.roles.cache.find(
      (role) => !role.permissions.has(permission)
    );
  }

  getMemberById(id) {
    return this.guild.members.cache.find((member) => member.id === id);
  }

  getMembersByRoleId(id) {
    return this.guild.roles.cache.find((role) => role.id === id).members;
  }

  getMembersByRoleName(roleName) {
    return this.guild.members.cache.filter((member) =>
      member.roles.cache.find((role) => role.name === roleName)
    );
  }

  getGuildMembersByRoleName(roleName) {
    return this.guild.members.cache.filter(
      (member) =>
        member.roles.cache.find(
          (role) => role.id === guildSettings.memberRole
        ) && member.roles.cache.find((role) => role.name === roleName)
    );
  }
}

class MemberUtils {
  constructor(member) {
    this.member = member;
  }
  getRoleByName(roleName) {
    return this.member.roles.cache.find((role) => role.name === `${roleName}`);
  }
  getRoleByColor(colorHexValue) {
    return this.member.roles.cache.find(
      (role) => role.hexColor === colorHexValue
    );
  }

  getRolesByColor(colorHexValue) {
    return this.member.roles.cache.filter(
      (role) => role.hexColor === colorHexValue
    );
  }

  getRoleByNameAndColor(roleName, colorHexValue) {
    return this.member.roles.cache.find(
      (role) => role.hexColor === colorHexValue && role.name === roleName
    );
  }

  hasRoleByName(roleName) {
    return this.member.roles.cache.has(roleName);
  }
  async addRole(id) {
    await this.member.roles.add(id);
  }
  async removeRole(id) {
    await this.member.roles.remove(id);
  }
}

module.exports = {
  ServerUtils: ServerUtils,
  MemberUtils: MemberUtils,
};
