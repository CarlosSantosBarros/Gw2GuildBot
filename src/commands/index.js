const Discord = require("discord.js");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const { log } = require("../utils/utilsDiscord");
const { findJSStartingWith_In_AndDo_ } = require("../utils/utils");

module.exports = async (client) => {
  client.commands = new Discord.Collection();
  const commands = [];

  const loadCommand = (fileItem) => {
    const command = require(`./${fileItem}`);
    log("Loading: " + command.data.name);
    client.commands.set(command.data.name, command);
    commands.push(command.data.toJSON());
  };
  findJSStartingWith_In_AndDo_("command", __dirname, loadCommand);

  const token = process.env.DISCORD_TOKEN;
  const clientId = process.env.CLIENT_ID;
  const guildId = process.env.GUILD_ID;
  const rest = new REST({ version: "9" }).setToken(token);

  console.log("Started refreshing application (/) commands.");
  await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
    body: commands,
  });
  console.log("Successfully reloaded application (/) commands.");
  log("Commands loaded");
};
