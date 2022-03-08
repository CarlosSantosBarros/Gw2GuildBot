// Run dotenv
require("dotenv").config();
const { ClientWrapper } = require("./classes/ClassClientWrapper");

exports.client = new ClientWrapper();
require("./events/index.js")(this.client);

// ------ uncomment the next 2 lines
//const { token } = require("./config.json");
// this.client.login(token);

// ------ comment the next line
this.client.login(process.env.DISCORD_TOKEN);
