const Discord = require("discord.js");
const fs = require("fs");
const { log } = require("../utils/utilsDiscord");

module.exports = (client) => {
  client.commands = new Discord.Collection();

  fs.readdirSync(__dirname)
    .filter((file) => file.endsWith(".js"))
    .filter((file) => file.startsWith("command"))
    .forEach((file) => {
      log(`${file}`);
      const command = require(`./${file}`);
      client.commands.set(command.name, command);
    });

    log("Commands loaded");
};
