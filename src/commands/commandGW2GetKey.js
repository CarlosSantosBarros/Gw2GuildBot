const { User } = require("../database/");
const { log } = require("../utils/utilsDiscord");

module.exports = {
  name: "getkey",
  description: "Get API key",
  args: [],
  usage: "<APIKEY>",

  async execute(message) {
    const key = await User.findOne({
      where: {
        snowflake: message.author.id,
      },
    });

    message.reply(`${key.apikey}`);
  },
};
