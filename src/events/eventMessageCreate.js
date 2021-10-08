const { prefix } = require("../config.json");

module.exports = {
  name: "messageCreate",
  once: false,
  async execute(message) {
    try {
      if (!message.content.startsWith(prefix) || message.author.bot) return;
      const { isValidCommand, isValidArgs } =
        await require("../utils/utilsTextCommands")(message);
      const commandName = message.content
        .slice(prefix.length)
        .split(/ +/)[0]
        .toLowerCase();
      const command = await isValidCommand(commandName);
      const args = await isValidArgs(command);
      await command.execute(message, args);
    } catch (error) {
      if (typeof error === "object") {
        console.log(error);
        error = "There was an error trying to execute that command!";
      }
      message.reply(error);
    }
  },
};
