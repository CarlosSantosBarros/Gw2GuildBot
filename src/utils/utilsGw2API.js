const fetch = require("node-fetch");

exports.isValidAPIKey = async (apikey) => {
  if (apikey === "") throw `You did not enter a key`;
  if (apikey.length != 72) throw `API key is not the correct size`;
  //query api
  await fetch(`https://api.guildwars2.com/v2/account?access_token=` + apikey)
    .then(() => {
      return apikey;
    })
    .catch((error) => {
      throw error;
    });
};

//getAPI-END-POINT
