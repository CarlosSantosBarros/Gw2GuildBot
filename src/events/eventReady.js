const { log, getChannelByNameAndType } = require("../utils/utilsDiscord");
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
          message = ": Guild Meeting starts in 1h!";
        }
        const channel = getChannelByNameAndType(
          client.channels,
          channelName,
          "GUILD_TEXT"
        );
        // roleMention("581597683597443073") +
        channel.send({
          content: message,
        });
      }
    }, 60000);
  },
};
