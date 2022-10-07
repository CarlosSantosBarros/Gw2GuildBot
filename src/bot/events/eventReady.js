const { log, guildSync, getGuild } = require("../utils/utils");
const Discord = require("discord.js");
const { format, isMonday, isThursday, isTuesday } = require("date-fns");
const { roleMention } = require("@discordjs/builders");
const { guildSettings } = require("../../config.json");
const { ServerUtils } = require("../utils");

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
    const guild = getGuild(client);
    const server = new ServerUtils(guild);

    log("Role data loaded");

    setInterval(() => {
      const date = new Date();
      const time = format(date, "HHmm");
      if (time == "1645") {
        let channelName;
        let message;
        if (isMonday(date) || isThursday(date)) {
          channelName = "rally_call";
          message = ": Guild WvW Raid starts in 1h!";
        }
        if (isTuesday(date)) {
          channelName = "chao_chat";
          message = ": Guild meeting in 1h! Duration 30 min MAX.";
        }
        if (channelName == null) return;

        const announcementChannel = server.getAnnouncementChan(channelName);
        if (!announcementChannel)
          return console.log(`${channelName} does not exist`);
        // @ts-ignore
        announcementChannel.send({
          content: roleMention(guildSettings.memberRole) + message,
        });
      }
    }, 60000);

    const intervalTime = guildSettings.syncTimerInMins * 60000;
    setInterval(async () => {
      const { removedRolesFrom, notVeried } = await guildSync(server);
      console.log(
        // eslint-disable-next-line max-len
        `**Finished**\nThe follow have had their roles removed:\n${removedRolesFrom}\nThe following have not verified:\n${notVeried}`
      );
    }, intervalTime);
  },
};
