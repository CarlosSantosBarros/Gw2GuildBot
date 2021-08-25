const Discord = require("discord.js");
const fs = require("fs");
const { log } = require("../utils/utilsDiscord");

module.exports = async (client) => {
  client.commands = new Discord.Collection();
  //~
  if (!client.application.owner) await client.application.fetch();
  fs.readdirSync(__dirname)
    .filter((file) => file.endsWith(".js"))
    .filter((file) => file.startsWith("command"))
    .forEach(async (file) => {
      log(`${file}`);
      const command = require(`./${file}`);
      client.commands.set(command.name, command);
      //~
      await client.application.commands
        .create({
          name: command.name,
          description: command.description,
        })
        .catch(console.error);
    });

  log("Commands loaded");
};
