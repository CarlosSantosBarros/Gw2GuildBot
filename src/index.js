// Run dotenv
require("dotenv").config();

const Discord = require("discord.js");
const client = new Discord.Client();

require("./events/index.js")(client);
require("./commands/index")(client);

const config = require("./config.json");
client.login(process.env.DISCORD_TOKEN);
