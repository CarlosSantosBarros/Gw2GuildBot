const {
  filterAllOptionEmojisByAuthor,
  getActionFromCollectionByEmoji,
} = require("../utils/utilsEmoji");

module.exports = async (cmdMessage, config) => {
  let botMessage;

  const createDialogMessage = async (dialogText) => {
    await cmdMessage.channel.send(dialogText).then((message) => {
      config.collection.forEach((value, key) => {
        message.react(key);
      });
      botMessage = message;
    });
  };

  const emojiSelectSingleActionFromOptions = async () => {
    const onCollected = (collected) => {
      const selectedEmoji = collected.first().emoji.id;
      const action = getActionFromCollectionByEmoji(
        config.collection,
        selectedEmoji
      );
      action();
    };
    emojiMuiltiOptionCollecter(onCollected);
  };

  const emojiSelectMuiltiActionFromOptions = async () => {
    const onCollected = (collected) => {
      collected.forEach((value, key) => {
        const action = getActionFromCollectionByEmoji(config.collection, key);
        action();
      });
    };
    await emojiMuiltiOptionCollecter(onCollected);
  };

  const emojiMuiltiOptionCollecter = async (onCollected) => {
    const collector = botMessage.createReactionCollector(
      filterAllOptionEmojisByAuthor(config.commandUser, config.collection),
      config.collectorSettings
    );
    collector.on("collect", (reaction, user) => {
      console.log(`Collected ${reaction.emoji.name} from ${user.tag}`);
    });
    collector.on("end", async (collected) => {
      console.log(`Collected ${collected.size} items`);
      if (collected.size === 0) {
        botMessage.delete();
        botMessage.channel.send("No reactions");
        return;
      }
      botMessage.reactions.removeAll().catch((error) => {
        console.error("Failed to clear reactions: ", error);
        throw "Something bad happened";
      });
      collected.forEach((entry) => botMessage.react(entry.emoji.id));
      onCollected(collected);
    });
  };

  return {
    createDialogMessage: createDialogMessage,
    emojiSelectSingleActionFromOptions: emojiSelectSingleActionFromOptions,
    emojiSelectMuiltiActionFromOptions: emojiSelectMuiltiActionFromOptions,
  };
};
