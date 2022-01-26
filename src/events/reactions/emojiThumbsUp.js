module.exports = {
  name: "👍",
  async execute(messageReaction, user) {
    messageReaction.message.edit({
      content: `emoji pressed: ${messageReaction.emoji.name} by ${user.username}`,
      embeds: [],
    });
  },
};
