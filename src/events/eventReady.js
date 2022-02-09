const { log } = require("../utils/utils");
const { format, isMonday, isThursday, isTuesday } = require("date-fns");
const { roleMention } = require("@discordjs/builders");
const { createCollection } = require("../utils/utils");
const { professionsSettings, guildSettings } = require("../config.json");

module.exports = {
  name: "ready",
  once: true,
  /**
   * @param {import('../classes/ClassClientWrapper').ClientWrapper} client
   */
  execute(client) {
    log(`Logged in as ${client.user.tag}!`);
    log(`I serve "${client.guilds.cache.size}" servers.`);
    require("../slashCommands/index")(client);
    require("./interactions/selectMenus/index")(client);
    require("./interactions/buttons/index")(client);
    require("../events/reactions/index")(client);
    require("./channelTypes/index")(client);
    const { professionsData, proficiencyData } = professionsSettings;
    createCollection(client.professionsData, professionsData);
    log("Profession data loaded");
    createCollection(client.proficiencyData, proficiencyData);
    log("Role data loaded");

    setInterval(() => {
      const date = new Date();
      const time = format(date, "HHmm");
      if (time == "1745") {
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

        // refactor - move to util getChannelByName()
        const announcementChannel = client.channels.cache.find(
          (channel) =>
            channel.name === `${channelName}` && channel.type === "GUILD_TEXT"
        );

        announcementChannel.send({
          content: roleMention(guildSettings.memberRole) + message,
        });
      }
    }, 60000);
  },
};
