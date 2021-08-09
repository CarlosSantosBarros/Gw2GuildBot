const { log } = require("../utils/utilsDiscord");
const { logging } = require("../config.json");
const reqEvent = (event) => require(`./${event}`);
const { IsDebugging, IsRaw } = logging;

module.exports = (client) => {
  client.on("ready", () => reqEvent("ready")(client));
  client.on("guildMemberAdd", (member) => reqEvent("guildMemberAdd")(member));
  client.on("guildMemberRemove", (member) =>
    reqEvent("guildMemberRemove")(member)
  );
  client.on("guildCreate", (guild) => reqEvent("guildCreate")(guild));
  client.on("guildDelete", (guild) => reqEvent("guildDelete")(guild));
  client.on("messageCreate", (message) =>
    reqEvent("messageCreate")(message, client)
  );

  client.on("debug", (event) => {
    if (IsDebugging) console.log(event);
  });
  client.on("raw", async (event) => {
    if (IsRaw) console.log(event.d);
  });
  log("Events loaded");
};
