const { log } = require("../utils/utilsDiscord");

module.exports = {
  name: "ready",
  once: true,
  execute(client) {
    log(`Logged in as ${client.user.tag}!`);
    log(`I serve "${client.guilds.cache.size}" servers.`);
    require("../slashCommands/index")(client);
  },
};
