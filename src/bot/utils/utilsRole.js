// eslint-disable-next-line no-unused-vars
const { RoleManager, GuildMemberRoleManager, Role, Collection } = require("discord.js");
const { findRoleByName, findColorByHex, findRoleById } = require("./utilsSearchLambdas");


module.exports = class RoleUtils {
  /** @param {(RoleManager|GuildMemberRoleManager)} roles  */
  constructor(roles) {
    this.roles = roles;
  }
  /**
   * @param {string} name
   * @returns {(Role|undefined)}
   */
  getRoleByName(name) { return this.roles.cache.find(findRoleByName(name)); }
  /**
   * @param {string} name
   * @returns {Collection<string,Role>}
   */
  getAllRolesByName(name) { return this.roles.cache.filter(findRoleByName(name)); }
  /**
   * @param {string} color
   * @returns {(Role|undefined)}
   */
  getRoleByColor(color) { return this.roles.cache.find(findColorByHex(color)); }
  /**
   * @param {string} color
   * @returns {Collection<string,Role>}
   */
  getAllRolesByColor(color) { return this.roles.cache.filter(findColorByHex(color)); }
  /**
   * @param {string} id
   * @returns {(Role|undefined)}
   */
  getRoleById(id) { return this.roles.cache.find(findRoleById(id)); }

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
