const fetch = require("node-fetch");

const queryApiByNameWithKey = async (endPointName, key) => {
  return await fetch(
    `https://api.guildwars2.com/v2/` + endPointName + `?access_token=` + key
  )
    .then((res) => {
      return res.json();
    })
    .catch((error) => {
      throw error;
    });
};

exports.getGW2TokenInfo = async (apikey) => {
  //query api
  return await queryApiByNameWithKey("tokeninfo", apikey);
};
