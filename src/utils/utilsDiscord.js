const { guildObject } = require("./../");
/**
 * juicy refactor here
 * base classe to extend/inherit from
 */
class GuildUtils {
  constructor(guild) {
    // this.guild = guild;
    this.guild = guildObject();
  }
  getChannelByNameAndType(textName, type) {
    return this.guild.channels.cache.find(
      (channel) => channel.name === `${textName}` && channel.type === type
    );
  }
  getRoleByName(roleName) {
    return this.guild.roles.cache.find((role) => role.name === `${roleName}`);
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
    return this.guild.roles.cache.find((role) => role.name === roleName)
      .members;
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
  GuildUtils: GuildUtils,
  MemberUtils: MemberUtils,
};
