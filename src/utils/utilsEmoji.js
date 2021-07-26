// This function needs renaming, it does not represent what it does
// need to pass an awaitReacitons collecter options
exports.emojiReply = async (message, emoji, funct) => {
  //   filter may need to be extracted because you may not always need author
  const filter = (reaction, user) =>
    reaction.emoji.name === emoji && user.id === message.author.id;
  await message.react(emoji);
  message
    .awaitReactions(filter, { max: 1, time: 60000, errors: ["time"] })
    .then((collected) => {
      const reaction = collected.first();
      if (reaction.emoji.name === emoji) funct();
      // message.reply("You reacted with: " + emoji);
    })
    .catch((error) => {
      console.log(error.size);
    });
};
