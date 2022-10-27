const Discord = require("discord.js");
const { format, isMonday, isThursday, isTuesday, set, differenceInHours, getUnixTime, differenceInMinutes } = require("date-fns");
const { formatInTimeZone, utcToZonedTime } = require("date-fns-tz");
const { roleMention } = require("@discordjs/builders");
const { guildSettings } = require("../config.json");
const { ServerUtils, log, guildSync, getGuild } = require("../utils");

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

    setInterval(() => {
      //https://nodatime.org/TimeZones
      const config = {
        timeZone: "Europe/London",
        time: { hours: 17, minutes: 15 },
        interval: 60
      };

      const nowZonedTime = utcToZonedTime(new Date(), config.timeZone);
      const targetTime = set(nowZonedTime, config.time);
      const minutes = differenceInMinutes(targetTime, nowZonedTime, { roundingMethod: "ceil" });
      if (minutes == config.interval) {
        let channelName;
        let message;
        const unixTime = getUnixTime(targetTime);
        if (isMonday(nowZonedTime) || isThursday(nowZonedTime)) {
          channelName = "rally_call";
          message = `: Guild WvW Raid starts in <t:${unixTime}:R>! at <t:${unixTime}:f>`;
        } else if (isTuesday(nowZonedTime)) {
          channelName = "chao_chat";
          message = `: Guild meeting in <t:${unixTime}:R>! Duration 30 min MAX.  <t:${unixTime}:f>`;
        } else return;

        const announceChan = server.getTextChannel(channelName);
        if (!announceChan) console.log(`${channelName} does not exist`);
        else announceChan.send({
          content: roleMention(guildSettings.memberRole) + message,
        });
      }
    }, 60000);

    const intervalTime = guildSettings.syncTimerInMins * 60000;
    setInterval(async () => {
      const { removedRolesFrom, notVeried } = await guildSync(server);
      // console.log(
      //   // eslint-disable-next-line max-len
      //   `**Finished**\nThe follow have had their roles removed:\n${removedRolesFrom}\nThe following have not verified:\n${notVeried}`
      // );
    }, intervalTime);
  },
};
