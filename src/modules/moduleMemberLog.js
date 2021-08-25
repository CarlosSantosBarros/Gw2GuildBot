const { MessageEmbed } = require("discord.js");
const { memberLog } = require("../config.json");
const { isValidLogChannel } = require("../utils/utilsDiscord");
module.exports = async (member, event) => {
  const channelToSendLog = await isValidLogChannel(
    member.guild.channels,
    memberLog
  );
  const msg = new MessageEmbed();

  switch (event) {
    case "Joined":
      msg.setColor("GREEN");
      break;
    default:
      msg.setColor("RED");
      break;
  }

  msg
    .setAuthor(
      `${member.displayName} - ${event}`,
      member.user.displayAvatarURL()
    )
    .setTimestamp();

  channelToSendLog.send(msg);
};
