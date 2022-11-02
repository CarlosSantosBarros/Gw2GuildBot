// eslint-disable-next-line no-unused-vars
const { Client, Collection } = require("discord.js");

/**
 * @typedef ProfessionSelection
 * @type {object}
 * @property {object} proficiency
 * @property {string} profession
 */

/**
 * @typedef ServerData
 * @type {object}
 * @property {number} id
 * @property {string} name
 * @property {string} population
 */

/**
 * @typedef ApplicationData
 * @type {object}
 * @property {ServerData} server
 * @property {number} wvwRank
 * @property {string} isLegal
 * @property {string} willRoleSwap
 * @property {boolean} hasDoneProfs
 * @property {string} personalMessage
 */

/**
 * @typedef AppState
 * @type {(ApplicationData|ProfessionSelection)}
 */
module.exports = class State {
  /**
  * @param {Collection} state
  */
  constructor(state) {
    this.state = state;
  }
  /**
  * @param {string} id
  * @returns {AppState}
  */
  getState(id) { return this.state.get(id); }
  /**
  * @param {string} id
  * @param {AppState} data
  */
  setState(id, data) { this.state.set(id, data); }
  /**
  * @param {string} id
  */
  deleteState(id) { this.state.delete(id); }
};