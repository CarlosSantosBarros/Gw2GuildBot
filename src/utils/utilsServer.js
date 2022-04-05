const { client } = require("..");
const { guildSettings, professionsSettings } = require("../config.json");
const { RoleUtils } = require("./utilsRole");

exports.ServerUtils = class extends RoleUtils {
  constructor() {
    super();
    this.guild = client.guilds.cache.find(
      (guildEntry) => guildEntry.id === guildSettings.discordGuildId
    );
    this.init(this.guild.roles);
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
    return this.getMembersByRoleId(guildSettings.memberRole);
  }

  getOfficers() {
    return this.getMembersByRoleId(guildSettings.officerRole);
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
    const mentors = this.getRoleByNameAndColor(
      value,
      professionsSettings.mentorColor
    );
    return mentors ? mentors.members : mentors;
  }

  getMembersByRoleId(roleId) {
    return this.getRoleById(roleId).members;
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
