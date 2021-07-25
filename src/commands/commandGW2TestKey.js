const { getDBUserById } = require("../utils/utilsDatabase");
const { emojiReply } = require("../utils/utilsEmoji");
const { getGW2TokenInfo } = require("../utils/utilsGw2API");

module.exports = {
  name: "testkey",
  description: "Test API key",
  args: [],
  usage: "<APIKEY>",

  async execute(message) {
    const user = await getDBUserById(message.author.id);
    const response = await getGW2TokenInfo(user.apikey);
    if (response.text) throw response.text;
    const emoji = "👍";
    await message.react(emoji);
    await emojiReply(message, emoji);
    message.reply("Api key name: '" + response.name + "' tested");
  },
};
