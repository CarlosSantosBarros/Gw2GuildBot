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
exports.client = new Client({
  intents: clientIntents,
  partials: ["MESSAGE", "CHANNEL", "REACTION"],
});
require("./events/index.js")(this.client);

const config = require("./config.json");
this.client.login(process.env.DISCORD_TOKEN);
