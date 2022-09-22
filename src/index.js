// Run dotenv
require("dotenv").config();
const { Client, GatewayIntentBits, Partials } = require("discord.js");
const clientIntents = [
  GatewayIntentBits.Guilds,
  GatewayIntentBits.GuildPresences,
  GatewayIntentBits.GuildMembers,
  GatewayIntentBits.GuildBans,
  GatewayIntentBits.GuildMessages,
  GatewayIntentBits.GuildMessageReactions,
  GatewayIntentBits.DirectMessages,
  GatewayIntentBits.DirectMessageReactions,
];
const client = new Client({
  intents: clientIntents,
  partials: [Partials.Message, Partials.Channel, Partials.Reaction],
});
require("./events/index.js")(client);

const { token } = require("./config.json");
client.login(token);
