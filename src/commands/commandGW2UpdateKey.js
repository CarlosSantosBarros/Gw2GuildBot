const { updateDBUserById } = require("../utils/utilsDatabase");
const { getGW2TokenInfo } = require("../utils/utilsGw2API");

module.exports = {
  name: "updatekey",
  description: "Update API key",
  args: ["APIKey"],
  usage: "<APIKEY>",

  async execute(message, args) {
    const response = await getGW2TokenInfo(args.apikey);
    if (response.text) throw response.text;
    await updateDBUserById(message.author.id, args.apikey);
    message.reply("Api key name: '" + response.name + "' updated");
  },
};
