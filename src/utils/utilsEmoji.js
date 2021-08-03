exports.getActionFromCollectionByEmoji = (collection, emoji) => {
  return collection.get(emoji);
};

const filterSingleEmojiByAuthor = (message, emoji) => {
  return (reaction, user) =>
    reaction.emoji.name === emoji && user.id === message.author.id;
};

exports.filterAllOptionEmojisByAuthor = (commandUser, optionCollection) => {
  return (reaction, user) => {
    const isEmojiInCollection = this.getActionFromCollectionByEmoji(
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
