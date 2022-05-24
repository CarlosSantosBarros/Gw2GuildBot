const { log, guildSync } = require("../utils/utils");
const Discord = require("discord.js");
const { format, isMonday, isThursday, isTuesday } = require("date-fns");
const { roleMention } = require("@discordjs/builders");
const { createCollection } = require("../utils/utils");
const { professionsSettings, guildSettings } = require("../config.json");
const { ServerUtils } = require("../utils");

module.exports = {
  name: "ready",
  once: true,

  async execute(client) {
    log(`Logged in as ${client.user.tag}!`);
    log(`I serve "${client.guilds.cache.size}" servers.`);
    require("../slashCommands/index")(client);
    require("./interactions/selectMenus/index")(client);
    require("./interactions/buttons/index")(client);
    require("../events/reactions/index")(client);
    require("./channelTypes/index")(client);
    client.professionsData = new Discord.Collection();
    client.proficiencyData = new Discord.Collection();
    client.gw2pState = new Discord.Collection();
    client.guildAppState = new Discord.Collection();
    client.guildAppStatus = new Discord.Collection();
    const { professionsData, proficiencyData, mentorColor } =
      professionsSettings;
    createCollection(client.professionsData, professionsData);
    log("Profession data loaded");
    createCollection(client.proficiencyData, proficiencyData);
    const server = new ServerUtils();
    professionsData.forEach(async (profession) => {
      const name = profession.value;
      proficiencyData.forEach(async (proficiency) => {
        const color = proficiency.color;
        const targetRole = server.getRoleByNameAndColor(name, color);
        if (!targetRole) await server.createRole(name, color);
      });
      const targetRole = server.getRoleByNameAndColor(name, mentorColor);
      if (!targetRole) await server.createRole(name, mentorColor);
    });

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

        const announcementChannel = server.getChannelByNameAndType(
          channelName,
          "GUILD_TEXT"
        );
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
      const { removedRolesFrom, notVeried } = await guildSync();
      console.log(
        // eslint-disable-next-line max-len
        `**Finished**\nThe follow have had their roles removed:\n${removedRolesFrom}\nThe following have not verified:\n${notVeried}`
      );
    }, intervalTime);
  },
};
