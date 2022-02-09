// Run dotenv
require("dotenv").config();
const { ClientWrapper } = require("./classes/ClassClientWrapper");

exports.client = new ClientWrapper();
require("./events/index.js")(this.client);

const config = require("./config.json");
this.client.login(process.env.DISCORD_TOKEN);
