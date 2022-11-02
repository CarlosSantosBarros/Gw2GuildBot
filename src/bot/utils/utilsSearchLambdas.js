const { Role, GuildMember } = require("discord.js");

/**
 * @param {string} roleName
 * @returns {(role: Role) => boolean}
 */
const findRoleByName = (roleName) => { return (role) => role.name === roleName; };

/**
 * @param {string} colorHexValue
 * @returns {(role: Role) => boolean}
 */
const findColorByHex = (colorHexValue) => { return (role) => role.hexColor === colorHexValue; };

/**
 * @param {string} roleId
 * @returns {(role: Role) => boolean}
 */
const findRoleById = (roleId) => { return (role) => role.id === roleId; };

module.exports = { findRoleByName, findColorByHex, findRoleById };