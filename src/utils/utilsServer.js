const { guildSettings, professionsSettings } = require("../config.json");
const RoleUtils = require("./utilsRole");
const { client } = require("..");
const { memberRole, officerRole, applicationChannel, gw2RankColour } =
  guildSettings;

const serverSearch = (guildEntry) =>
  guildEntry.id === guildSettings.discordGuildId;

module.exports = class ServerUtils extends RoleUtils {
  constructor() {
    super();
    this.guild = client.guilds.cache.find(serverSearch);
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
    return this.getMembersByRoleId(memberRole);
  }

  getOfficers() {
    return this.getMembersByRoleId(officerRole);
  }

  getApplicationChan() {
    return this.getChannelById(applicationChannel);
  }

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
  getGw2RankByName(rankName) {
    return this.getRoleByNameAndColor(rankName, gw2RankColour);
  }

  async createRole(name, color) {
    return await this.guild.roles.create({
      name,
      color,
    });
  }
};
