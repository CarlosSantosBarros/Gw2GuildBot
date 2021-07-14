const { User } = require("../database/");
const { log } = require("../utils/utilsDiscord");

module.exports = {
  name: "addkey",
  description: "Add API key",
  args: ["APIKey"],
  usage: "<APIKEY>",

  async execute(message, args) {
    await User.create({
      snowflake: message.author.id,
      apikey: args.apikey,
    })
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
    message.reply(`Your key has been added`);
  },
};
