exports.emojiCollector = async (message) => {
  const filter = (reaction, user) => {
    return reaction.emoji.name === "👍" && user.id === message.author.id;
  };

  const collector = message.createReactionCollector(filter, { time: 15000 });

  collector.on("collect", (reaction, user) => {
    console.log(`Collected ${reaction.emoji.name} from ${user.tag}`);
  });

  collector.on("end", (collected) => {
    console.log(`Collected ${collected.size} items`);
  });
};

exports.emojiReply = async (message) => {
  const filter = (reaction, user) => {
    return reaction.emoji.name === "👍" && user.id === message.author.id;
  };
  message
    .awaitReactions(filter, { max: 1, time: 60000, errors: ["time"] })
    .then((collected) => {
      const reaction = collected.first();

      if (reaction.emoji.name === "👍")
        message.reply("you reacted with a thumbs up.");
      else message.reply("you reacted with a thumbs down.");
    })
    .catch(() => {
      message.reply("you reacted with neither a thumbs up, nor a thumbs down.");
    });
};
