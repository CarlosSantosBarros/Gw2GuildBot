const { User } = require("../database/");
const { log } = require("../utils/utilsDiscord");
const fetch = require("node-fetch");

module.exports = {
  name: "testkey",
  description: "Test API key",
  args: [],
  usage: "<APIKEY>",

  async execute(message) {
    const user = await User.findOne({
      where: {
        snowflake: message.author.id,
      },
    });
    const response = await fetch(
      `https://api.guildwars2.com/v2/account?access_token=` + user.apikey
    )
      .then((res) => {
        return res.json();
      })
      .catch((error) => console.log(error));
    if (response.text) throw response.text;
    console.log(response.name);
  },
};
