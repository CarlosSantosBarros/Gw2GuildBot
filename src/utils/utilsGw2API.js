const { guildSettings } = require("../config.json");
const client = require("gw2api-client");
const cacheMemory = require("gw2api-client/src/cache/memory");

const api = client();
// api.debugging(true);
api.cacheStorage(cacheMemory());

/*
this could maybe be a class,
authenticating for every query is probably bad and will get flagged in high trafic moments
*/

/**
 * @typedef AccountInfo
 * @type {object}
 * @property {string} name
 * @property {number} world
 * @property {array} guilds
 * @property {number} wvw_rank
 */

/**
 * Gets Guildwars 2 API key/token information.
 * @param {string} apikey - The api key of the user
 * @return {Promise<JSON>} Token info
 */
exports.getGW2TokenInfo = async (apikey) => {
  console.log("Getting token info");
  api.authenticate(apikey);
  let returnData;
  await api
    .tokeninfo()
    .get()
    .then((result) => {
      if (result.text) throw result.text;
      returnData = result;
    })
    .catch((error) => {
      throw error;
    });
  return returnData;
};
/**
 * Gets Guildwars 2 Account information.
 * @param {String} apikey - The api key of the user
 * @return {Promise<AccountInfo>} Account info
 */
exports.getGW2AccountInfo = async (apikey) => {
  console.log("Getting account info");
  api.authenticate(apikey);
  let returnData;
  await api
    .account()
    .get()
    .then((result) => {
      if (result.text) throw result.text;
      returnData = result;
    })
    .catch((error) => {
      throw error;
    });
  return returnData;
};
/**
 * Gets Guildwars 2 Account information.
 * @return {Promise<Array>} Guild membership info
 */
exports.getGW2GuildInfo = async () => {
  const { guildLeaderKey, gw2GuildId } = guildSettings;
  console.log("Getting guild membership info");
  api.authenticate(guildLeaderKey);
  let returnData;
  await api
    .guild(gw2GuildId)
    .members()
    .get()
    .then((result) => {
      if (result.text) throw result.text;
      returnData = result;
    })
    .catch((error) => {
      throw error;
    });
  return returnData;
};

/**
 *
 * @param {number} id String
 * @returns {Promise<any[]>}
 */

exports.getGW2GuildLog = async (id) => {
  const { guildLeaderKey, gw2GuildId } = guildSettings;
  api.debugging(false);
  api.authenticate(guildLeaderKey);
  let returnData;
  await api
    .guild(gw2GuildId)
    .log()
    .since(id)
    .then((result) => {
      if (result.text) throw result.text;
      returnData = result;
    })
    .catch((error) => {
      throw error;
    });
  return returnData;
};

exports.getWorld = async (worldId) => {
  console.log("Getting world ID");
  let returnData;
  await api
    .worlds()
    .get(worldId)
    .then((result) => (returnData = result));
  return returnData;
};
