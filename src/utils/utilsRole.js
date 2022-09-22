// eslint-disable-next-line no-unused-vars
const { RoleManager, GuildMemberRoleManager, Role, Collection } = require("discord.js");
/**
 * @param {string} roleName
 * @returns {(role: Role) => boolean}
 */
const findRole = (roleName) => { return (role) => role.name === roleName; };

/**
 * @param {string} colorHexValue
 * @returns {(role: Role) => boolean}
 */
const findColor = (colorHexValue) => { return (role) => role.hexColor === colorHexValue; };

module.exports = class RoleUtils {
  /** @param {(RoleManager|GuildMemberRoleManager)} roles  */
  constructor(roles) {
    this.roles = roles;
  }
  /**
   * @param {string} name
   * @returns {(Role|undefined)}
   */
  getRoleByName(name) { return this.roles.cache.find(findRole(name)); }
  /**
   * @param {string} name
   * @returns {Collection<string,Role>}
   */
  getAllRolesByName(name) { return this.roles.cache.filter(findRole(name)); }
  /**
   * @param {string} color
   * @returns {(Role|undefined)}
   */
  getRoleByColor(color) { return this.roles.cache.find(findColor(color)); }
  /**
   * @param {string} color
   * @returns {Collection<string,Role>}
   */
  getAllRolesByColor(color) { return this.roles.cache.filter(findColor(color)); }
  /**
   * @param {string} id
   * @returns {(Role|undefined)}
   */
  getRoleById(id) { return this.roles.cache.find((role) => role.id === id); }

  /**
   * @param {string} name
   * @param {string} color
   * @returns {(Role|undefined)}
   */
  getRoleByNameAndColor(name, color) {
    /**
     * @param {Role} role
     * @returns {boolean}
     */
    const search = (role) => role.hexColor === color && role.name === name;
    return this.roles.cache.find(search);
  }
};
