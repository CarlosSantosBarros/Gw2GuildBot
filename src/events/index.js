const { findJSStartingWith_In_AndDo_ } = require("../utils/utils");
const { log } = require("../utils/utilsDiscord");

module.exports = (client) => {
  const loadEvent = (fileItem) => {
    const event = require(`./${fileItem}`);
    if (event.once) {
      client.once(event.name, (...args) => event.execute(...args));
      log("Loaded: " + event.name);
      return;
    }
    client.on(event.name, (...args) => event.execute(...args));
    log("Loaded: " + event.name);
  };
  findJSStartingWith_In_AndDo_("event", __dirname, loadEvent);

  log("Events loaded");
};
