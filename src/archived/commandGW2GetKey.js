const { getDBUserById } = require("../utils/utilsDatabase");

module.exports = {
  name: "getkey",
  description: "Get API key",
  args: [],
  usage: "<APIKEY>",

  async execute(message) {
    const user = await getDBUserById(message.author.id);
    message.reply(`${user.apikey}`);
  },
};
