const { client } = require("..");
const { guildSettings, professionsSettings } = require("../config.json");
const { RoleUtils } = require("./utilsRole");

exports.ServerUtils = class extends RoleUtils {
  constructor() {
    super();
    this.guild = client.guilds.cache.find(
      (guildEntry) => guildEntry.id === guildSettings.discordGuildId
    );
    this.roles = this.guild.roles;
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
    return this.guild.members.cache.find((member) => member.user.id === id);
  }

  getRoleByPermissions(permission) {
    return this.roles.cache.find((role) => !role.permissions.has(permission));
  }

  getMembers() {
    return this.getRoleById(guildSettings.memberRole).members;
  }

  getApplicationChan() {
    return this.getChannelById(guildSettings.applicationChannel);
  }

  isApplicationChan(value) {
    if (value == this.getChannelById(guildSettings.applicationChannel))
      return true;
    return false;
  }

  getMentorsFor(value) {
    return this.getRoleByNameAndColor(value, professionsSettings.mentorColor)
      .members;
  }

  // refactor - 2 finds inside of a filter is maybe bad
  getPlayers(value) {
    return this.guild.members.cache.filter(
      (member) =>
        member.roles.cache.find(
          (role) => role.id === guildSettings.memberRole
        ) && member.roles.cache.find((role) => role.name === value)
    ).size;
  }
};
