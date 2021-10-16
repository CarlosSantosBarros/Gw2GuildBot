module.exports = class DiscordUtils {
  constructor(guild) {
    this.guild = guild;
  }
  getChannelByNameAndType(textName, type) {
    return this.guild.channels.cache.find(
      (channel) => channel.name === `${textName}` && channel.type === type
    );
  }
  getRoleByName(roleName) {
    return this.guild.roles.cache.find((role) => role.name === `${roleName}`);
  }

  getRoleByPermissions(permission) {
    return this.guild.roles.cache.find(
      (role) => !role.permissions.has(permission)
    );
  }

  getGuildMemberById(id) {
    return this.guild.members.cache.find((member) => member.id === id);
  }

  getMembersByRoleId(id) {
    return this.guild.roles.cache.find((role) => role.id === id).members;
  }

  getMembersByRoleName(roleName) {
    return this.guild.roles.cache.find((role) => role.name === roleName)
      .members;
  }
};
