const { log } = require("../util");
module.exports = guild => {
  log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
};
