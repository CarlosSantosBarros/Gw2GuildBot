const emojiSingleFilterByAuthor = (message, emoji) => {
  return (reaction, user) =>
    reaction.emoji.name === emoji && user.id === message.author.id;
};

exports.emojiTriggeredAction = async (message, config) => {
  const { emoji, action, collectorSettings } = config;

  await message.react(emoji);

  message
    .awaitReactions(
      emojiSingleFilterByAuthor(message, emoji),
      collectorSettings
    )
    .then((collected) => {
      const reaction = collected.first();
      action(reaction);
    })
    .catch((error) => {
      console.log(error.size);
    });
};
