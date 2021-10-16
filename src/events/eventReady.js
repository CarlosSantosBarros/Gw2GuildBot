const { log } = require("../utils/utils");
const { format, isMonday, isThursday, isTuesday } = require("date-fns");
const { roleMention } = require("@discordjs/builders");

module.exports = {
  name: "ready",
  once: true,
  execute(client) {
    log(`Logged in as ${client.user.tag}!`);
    log(`I serve "${client.guilds.cache.size}" servers.`);
    require("../slashCommands/index")(client);
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
        const announcementChannel = client.channels.cache.find(
          (channel) =>
            channel.name === `${channelName}` && channel.type === "GUILD_TEXT"
        );

        announcementChannel.send({
          content: roleMention("581597683597443073") + message,
        });
      }
    }, 60000);
  },
};
