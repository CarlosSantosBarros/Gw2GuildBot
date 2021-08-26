const Discord = require("discord.js");
const fs = require("fs");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const { log } = require("../utils/utilsDiscord");

module.exports = async (client) => {
  client.commands = new Discord.Collection();
  const commands = [];

  fs.readdirSync(__dirname)
    .filter((file) => file.endsWith(".js"))
    .filter((file) => file.startsWith("command"))
    .forEach(async (file) => {
      const command = require(`./${file}`);
      client.commands.set(command.data.name, command);
      commands.push(command.data.toJSON());
      log("Loaded: " + command.data.name);
    });

  const token = process.env.DISCORD_TOKEN;
  const clientId = process.env.CLIENT_ID;
  const guildId = process.env.GUILD_ID;
  const rest = new REST({ version: "9" }).setToken(token);

  try {
    console.log("Started refreshing application (/) commands.");
    await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
      body: commands,
    });
    console.log("Successfully reloaded application (/) commands.");
  }
  catch (error) {
    console.error(error);
  }
  log("Commands loaded");
};
