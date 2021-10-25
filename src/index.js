// Run dotenv
require("dotenv").config();
const { Client, Intents } = require("discord.js");
const clientIntents = new Intents();
// move intents to config file
clientIntents.add(
  Intents.FLAGS.GUILDS,
  Intents.FLAGS.GUILD_PRESENCES,
  Intents.FLAGS.GUILD_MEMBERS,
  Intents.FLAGS.GUILD_BANS,
  Intents.FLAGS.GUILD_MESSAGES,
  Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
  Intents.FLAGS.DIRECT_MESSAGES,
  Intents.FLAGS.DIRECT_MESSAGE_REACTIONS
);
const client = new Client({ intents: clientIntents });
require("./events/index.js")(client);

const config = require("./config.json");
client.login(process.env.DISCORD_TOKEN);

exports.guildObject = () => {
  return client.guilds.cache.find(
    (guild) => guild.id === config.guildSettings.discordGuildId
  );
};
