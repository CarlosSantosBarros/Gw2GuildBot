const { getDBUserById } = require("../../utils/utilsDatabase");
const { emojiTriggeredAction } = require("../../utils/utilsEmoji");
const { getGW2TokenInfo } = require("../../utils/utilsGw2API");

module.exports = {
  name: "testkey",
  description: "Test API key",
  args: [],
  usage: "<APIKEY>",

  async execute(message) {
    const user = await getDBUserById(message.author.id);
    const response = await getGW2TokenInfo(user.apikey);
    if (response.text) throw response.text;

    const funct = (data) => {
      message.reply(
        "Api key name: '" +
          response.name +
          "' tested using: " +
          data.count +
          " " +
          user.apikey
      );
    };
    //rename this to represent single choise actions
    const emojiConfig = {
      emoji: "👍",
      action: funct,
      collectorSettings: { max: 1, time: 60000, errors: ["time"] },
    };
    await emojiTriggeredAction(message, emojiConfig);
  },
};
