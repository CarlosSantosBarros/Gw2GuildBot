// eslint-disable-next-line no-unused-vars
const { RoleManager, GuildMemberRoleManager } = require("discord.js");

module.exports = class RoleUtils {
  constructor() {
    this.roles;
  }
  /**
   *
   * @param {(RoleManager|GuildMemberRoleManager)} roles
   */
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

  getRoleByNameAndColor(name, color) {
    const search = (role) => role.hexColor === color && role.name === name;
    return this.roles.cache.find(search);
  }
};
