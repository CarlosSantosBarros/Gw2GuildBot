const Discord = require("discord.js");
const { guildSettings } = require("../config.json");
const { ServerUtils, log, guildSync, getGuild, eventReminder } = require("../utils");

module.exports = {
  name: "ready",
  once: true,
  /**
 * @param {Client} client
 */
  async execute(client) {
    log(`Logged in as ${client.user.tag}!`);
    log(`I serve "${client.guilds.cache.size}" servers.`);
    require("../slashCommands/index")(client);
    require("./interactions/selectMenus/index")(client);
    require("./interactions/buttons/index")(client);
    require("./interactions/modals/index")(client);
    require("../events/reactions/index")(client);
    require("./channelTypes/index")(client);
    client.gw2pState = new Discord.Collection();
    client.guildAppState = new Discord.Collection();
    client.guildAppStatus = new Discord.Collection();
    const server = new ServerUtils(getGuild(client));

    log("Role data loaded");

    // setInterval(() => { eventReminder(server); }, 60000);

    const intervalTime = guildSettings.syncTimerInMins * 60000;
    setInterval(async () => { await guildSync(server); }, intervalTime);
  },
};
