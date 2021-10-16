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

// this is now in config file, import it from there
const guildId = "F7F37FC2-C23D-E411-A278-AC162DC0070D";
const leaderkey =
  "E1FECABE-9989-BA4A-A262-92D5233CD96143FA83FC-D1EB-49CB-9C6E-9A14BD453421";

exports.getGW2GuildInfo = async () => {
  api.authenticate(leaderkey);
  let returnData;
  await api
    .guild(guildId)
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
