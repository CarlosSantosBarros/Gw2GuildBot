const { guildSettings } = require("../../config.json");
const client = require("gw2api-client");
const cacheMemory = require("gw2api-client/src/cache/memory");
const api = client();
api.debugging(true);
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
  api.authenticate(apikey);
  return await api
    .tokeninfo()
    .get()
    .then((result) => {
      if (result.text) throw result.text;
      return result;
    })
    .catch((error) => {
      throw error;
    });
};
/**
 * Gets Guildwars 2 Account information.
 * @param {String} apikey - The api key of the user
 * @return {Promise<AccountInfo>} Account info
 */
exports.getGW2AccountInfo = async (apikey) => {
  api.authenticate(apikey);
  return await api
    .account()
    .get()
    .then((result) => {
      if (result.text) throw result.text;
      return result;
    })
    .catch((error) => {
      throw error;
    });
};
/**
 * Gets Guildwars 2 Account information.
 * @return {Promise<Array>} Guild membership info
 */
exports.getGW2GuildInfo = async () => {
  const { guildLeaderKey, gw2GuildId } = guildSettings;
  api.authenticate(guildLeaderKey);
  return await api
    .guild(gw2GuildId)
    .members()
    .get()
    .then((result) => {
      if (result.text) throw result.text;
      return result;
    })
    .catch((error) => {
      throw error;
    });
};

exports.getWorld = async (worldId) => {
  return await api
    .worlds()
    .get(worldId)
    .then((result) => { return result; });
};
