const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const { guildSettings } = require("./config.json");
const fs = require("fs");
const guildId = guildSettings.discordGuildId;

// ----- uncommment next line
// const { token, clientId } = require("./config.json");

// ------ comment the next two lines
const token = process.env.DISCORD_TOKEN;
const clientId = process.env.CLIENT_ID;

const commands = [];
const commandFiles = fs
  .readdirSync("./slashCommands")
  .filter((file) => file.startsWith("slashCmd"));

for (const file of commandFiles) {
  const command = require(`./slashCommands/${file}`);
  if (command.guildCommand) {
    console.log(`Deploying Global command: ${command.data.name}`);
    commands.push(command.data.toJSON());
  }
}

const rest = new REST({ version: "9" }).setToken(token);

(async () => {
  try {
    console.log("Started deploying application (/) commands.");
    await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
      body: commands,
    });
    console.log("after");
    console.log("Successfully deployed application (/) commands.");
  } catch (error) {
    console.error(error);
  }
})();
