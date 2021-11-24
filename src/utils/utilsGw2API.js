const { guildSettings } = require("../config.json");
const client = require("gw2api-client");
const cacheMemory = require("gw2api-client/src/cache/memory");
const api = client();
api.debugging(true);
api.cacheStorage(cacheMemory());

/**
 * Gets Guildwars 2 API key/token information.
 * @param {String} apikey - The api key of the user
 * @return {Promise<JSON>} Token info
 */
exports.getGW2TokenInfo = async (apikey) => {
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
 * @return {Promise<JSON>} Account info
 */
exports.getGW2AccountInfo = async (apikey) => {
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

exports.getGW2GuildInfo = async () => {
  const { guildLeaderKey, gw2GuildId } = guildSettings;
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
 * Gets Guildwars 2 characters information.
 * @param {String} apikey - The api key of the user
 * @return {Promise<JSON>} Characters
 */
exports.getCharacters = async (apikey) => {
  api.authenticate(apikey);
  let returnData;
  await api
    .account()
    .characters()
    .all()
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
  let returnData;
  await api
    .worlds()
    .get(worldId)
    .then((result) => (returnData = result));
  return returnData;
};
