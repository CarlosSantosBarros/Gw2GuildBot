const fs = require("fs");
const { log } = require("../utils/utilsDiscord");

module.exports = (client) => {
  fs.readdirSync(__dirname)
    .filter((file) => file.endsWith(".js"))
    .filter((file) => file.startsWith("event"))
    .forEach((file) => {
      const event = require(`./${file}`);
      if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
        log("Loaded: " + event.name);
        return;
      }
      client.on(event.name, (...args) => event.execute(...args));
      log("Loaded: " + event.name);
    });

  log("Events loaded");
};
