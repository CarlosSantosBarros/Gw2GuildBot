const { client } = require("..");
const { guildSettings, professionsSettings } = require("../config.json");
const { RoleUtils } = require("./utilsRole");

/**
 * juicy refactor here
 * base classe to extend/inherit from
 * extend discord guild class
 */
exports.ServerUtils = class extends RoleUtils {
  constructor() {
    super();
    this.guild = client.guilds.cache.find(
      (guildEntry) => guildEntry.id === guildSettings.discordGuildId
    );
    this.roles = this.guild.roles;
  }
  getChannelByNameAndType(textName, type) {
    return this.guild.channels.cache.find(
      (channel) => channel.name === textName && channel.type === type
    );
  }

  getRoleByPermissions(permission) {
    return this.roles.cache.find((role) => !role.permissions.has(permission));
  }

  getMembers() {
    return this.getByRoleId(guildSettings.memberRole).members;
  }

  getMentorsFor(value) {
    return this.getRoleByNameAndColor(value, professionsSettings.mentorColor)
      .members;
  }
  getPlayers(value) {
    return this.guild.members.cache.filter(
      (member) =>
        member.roles.cache.find(
          (role) => role.id === guildSettings.memberRole
        ) && member.roles.cache.find((role) => role.name === value)
    ).size;
  }
};
