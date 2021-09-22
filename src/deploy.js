const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");

const fs = require("fs");

const commands = [];
const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.startsWith("command"))
  .filter((file) => file.endsWith(".js"));

// Place your client and guild ids here
const token = "Njk1MjM2OTIwNDY0Mzc1OTI4.XoXP1g.feqMTqsomPvn3nRxB2Xf7UMIJRI";
const clientId = "695236920464375928";
const guildId = "294892279322378240";

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  //   console.log(command.data);
  commands.push(command.data.toJSON());
}

const rest = new REST({ version: "9" }).setToken(token);

(async () => {
  try {
    console.log("Started refreshing application (/) commands.");

    await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
      body: commands,
    });

    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error(error);
  }
})();