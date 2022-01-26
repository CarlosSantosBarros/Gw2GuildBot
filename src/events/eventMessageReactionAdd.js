const { client } = require("../index");
module.exports = {
  name: "messageReactionAdd",
  once: false,
  async execute(messageReaction, user) {
    if (user.bot) return;
    const collection = client.emoji;
    const key = messageReaction.emoji.name;
    console.log(key);
    if (!collection.has(key)) console.log(`Reaction ${key}`);
    await collection.get(key).execute(messageReaction, user);
  },
};
