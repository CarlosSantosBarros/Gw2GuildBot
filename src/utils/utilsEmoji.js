//////////////////////////////////////////////
///REFACTOR THIS INTO A MODULE
//////////////////////////////////////////////
const getActionFromCollectionByEmoji = (collection, emoji) => {
  return collection.get(emoji);
};

//this is for messages by users where the bot reacts
const filterSingleEmojiByAuthor = (message, emoji) => {
  return (reaction, user) =>
    reaction.emoji.name === emoji && user.id === message.author.id;
};

//this is for messages by the bot where it also reacts
const filterAllOptionEmojisByAuthor = (commandUser, optionCollection) => {
  return (reaction, user) => {
    const isEmojiInCollection = getActionFromCollectionByEmoji(
      optionCollection,
      reaction.emoji.id
    );
    return isEmojiInCollection && user.id === commandUser;
  };
};

exports.emojiTriggeredAction = async (message, config) => {
  const { emoji, action, collectorSettings } = config;
  await message.react(emoji);
  message
    .awaitReactions(
      filterSingleEmojiByAuthor(message, emoji),
      collectorSettings
    )
    .then((collected) => {
      const reaction = collected.first();
      action(reaction);
    });
};

exports.emojiSelectSingleActionFromOptions = async (message, config) => {
  const collector = message.createReactionCollector(
    filterAllOptionEmojisByAuthor(config.commandUser, config.collection),
    config.collectorSettings
  );
  const onCollected = (collected) => {
    const selectedEmoji = collected.first().emoji.id;
    const action = getActionFromCollectionByEmoji(
      config.collection,
      selectedEmoji
    );
    console.log(action());
  };
  emojiMuiltiOptionCollecter(message, collector, onCollected);
};

const emojiMuiltiOptionCollecter = (message, collector, onCollected) => {
  collector.on("collect", (reaction, user) => {
    console.log(`Collected ${reaction.emoji.name} from ${user.tag}`);
  });
  collector.on("end", async (collected) => {
    console.log(`Collected ${collected.size} items`);

    if (collected.size === 0) {
      message.delete();
      message.channel.send("No reactions");
      return;
    }
    message.reactions.removeAll().catch((error) => {
      console.error("Failed to clear reactions: ", error);
      throw "Something bad happened";
    });
    collected.forEach((entry) => message.react(entry.emoji.id));
    onCollected(collected);
  });
};
