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
  getChannelById(id) {
    return this.guild.channels.cache.find((channel) => channel.id === id);
  }

  getMemberById(id) {
    return this.guild.members.cache.find((member) => member.user.id === id);
  }

  getRoleByPermissions(permission) {
    return this.roles.cache.find((role) => !role.permissions.has(permission));
  }

  getMembers() {
    return this.getByRoleId(guildSettings.memberRole).members;
  }

  getApplicationChan() {
    return this.getChannelById(guildSettings.applicationChannel);
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
