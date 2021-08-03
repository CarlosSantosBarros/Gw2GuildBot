const { Collection } = require("discord.js");
const { emojiSelectSingleActionFromOptions } = require("../utils/utilsEmoji");

module.exports = {
  name: "testemoji",
  description: "Test emoji functionality",
  args: [],
  usage: "<comand>",

  async execute(message) {
    const actionfunc = () => {
      return "xSquare";
    };
    // put this in module
    const optionCollection = new Collection();
    const optionCollectionArrray = [
      {
        emoji: "870320439505866763",
        action: actionfunc,
      },
      { emoji: "870320439736553472", action: "xStar" },
      { emoji: "870320439732367431", action: "xCircle" },
    ];

    const dialogMessage = await message.channel
      .send("Test?")
      .then((botmessage) => {
        // put this is module also
        optionCollectionArrray.forEach((entry) => {
          optionCollection.set(entry.emoji, entry.action);
          botmessage.react(entry.emoji);
        });
        return botmessage;
      });

    const emojiOptionConfig = {
      collection: optionCollection,
      commandUser: message.author.id,
      collectorSettings: {
        max: 1,
        time: 10000,
        errors: ["time"],
      },
    };
    await emojiSelectSingleActionFromOptions(dialogMessage, emojiOptionConfig);
  },
};
