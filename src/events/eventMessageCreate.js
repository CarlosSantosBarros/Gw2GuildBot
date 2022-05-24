module.exports = {
  name: "messageCreate",
  once: false,
  async execute(message) {
    try {
      const collection = message.client.channelTypes;
      const key = message.channel.type;
      if (!collection.has(key)) return console.log(`Channel ${key}`);
      await collection.get(key).execute(message);
    } catch (error) {
      if (typeof error === "object") {
        console.log(error);
        // eslint-disable-next-line no-ex-assign
        error = "There was an error trying to execute that command!";
      }
      message.reply(error);
    }
  },
};
