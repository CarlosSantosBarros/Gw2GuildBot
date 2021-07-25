exports.emojiReply = async (message, emoji) => {
  const filter = (reaction, user) =>
    reaction.emoji.name === emoji && user.id === message.author.id;
  message
    .awaitReactions(filter, { max: 1, time: 60000, errors: ["time"] })
    .then((collected) => {
      const reaction = collected.first();
      if (reaction.emoji.name === emoji)
        message.reply("You reacted with: " + emoji);
    })
    .catch((error) => {
      console.log(error.size);
    });
};
