const { getCollection } = require("../modules/moduleEmojiTest");
const { filterAllOptionEmojisByAuthor } = require("../utils/utilsEmoji");

module.exports = {
  name: "single",
  description: "Test emoji functionality",
  args: [],
  usage: "<comand>",
  /*
POSSIBLE REFACTOR HERE BECAUSE OF
FILTER BEING PART OF CONFIG OBJECT
*/
  async execute(message) {
    const optionsCollection = getCollection();
    const filter = filterAllOptionEmojisByAuthor(
      message.author.id,
      optionsCollection
    );
    const emojiOptionConfig = {
      collection: optionsCollection,
      commandUser: message.author.id,
      collectorSettings: {
        filter,
        max: 1,
        time: 10000,
        errors: ["time"],
      },
    };
    const emojiDialog = await require("../modules/moduleEmojiCommandInterface")(
      message,
      emojiOptionConfig
    );
    await emojiDialog.createDialogMessage("Select 1");
    await emojiDialog.emojiSelectMuiltiActionFromOptions();
  },
};
