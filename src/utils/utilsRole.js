const { client } = require("..");
const { guildSettings } = require("../config.json");

module.exports = class RoleUtils {
  constructor() {
    this.guild = client.guilds.cache.find(
      (guildEntry) => guildEntry.id === guildSettings.discordGuildId
    );
    this.init(this.guild.roles);
    this.roles;
  }
  init(roles) {
    this.roles = roles;
  }
  getRoleByName(roleName) {
    return this.roles.cache.find((role) => role.name === roleName);
  }
  getAllRolesByName(roleName) {
    return this.roles.cache.filter((role) => role.name === roleName);
  }

  getRoleById(id) {
    return this.roles.cache.find((role) => role.id === id);
  }
  getRoleByColor(colorHexValue) {
    return this.roles.cache.find((role) => role.hexColor === colorHexValue);
  }

  getAllRolesByColor(colorHexValue) {
    return this.roles.cache.filter((role) => role.hexColor === colorHexValue);
  }

  async getRoleByNameAndColor(name, color) {
    const roleTarget = this.roles.cache.find(
      (role) => role.hexColor === color && role.name === name
    );
    if (!roleTarget)
      return await this.guild.roles.create({
        name,
        color,
      });
    return roleTarget;
  }
};
