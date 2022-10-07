module.exports = {
  name: "messageReactionAdd",
  once: false,
  async execute(messageReaction, user) {
    if (user.bot) return;
    // @ts-ignore
    const collection = messageReaction.client.emoji;
    const key = messageReaction.emoji.name;
    if (!collection.has(key)) return;
    await collection.get(key).execute(messageReaction, user);
  },
};
