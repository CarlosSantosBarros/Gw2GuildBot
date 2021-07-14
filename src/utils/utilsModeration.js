const { MessageEmbed } = require("discord.js");
const fs = module.require("fs");
const { isValidLogChannel, getRoleByName } = require("../../../util");
const { moderation } = require("../../../config.json");

module.exports = async (message, action) => {

  const isValidModerationTarget = async (target) => {
    if (target.id === message.author.id) throw `You can't ${action} yourself`;
    if (target.roles.highest.position >= message.member.roles.highest.position)
      throw `You can't ${action} a member with equal or higher permissions `;
  };

  const isValidMuteRole = async () => {
    const roles = message.guild.roles;
    let mutedRole = await getRoleByName(roles, "Muted");
    if (!mutedRole)
      mutedRole = await roles.create({
        data: {
          name: "Muted",
          color: "RED",
          permissions: [],
        },
      });

    message.guild.channels.cache.forEach(async (channel) => {
      await channel.updateOverwrite(mutedRole, {
        SEND_MESSAGES: false,
        ADD_REACTIONS: false,
      });
    });
    return mutedRole;
  };

  const moderationLog = async (args) => {
    const msg = new MessageEmbed();
    const { member, time, string } = args;
    const author = message.author;
    const channelToSendLog = await isValidLogChannel(
      member.guild.channels,
      moderation.logChannel,
    );

    // color code for severaty
    switch (action) {
      case "mute":
        msg.setColor("YELLOW");
        break;
      case "kick":
        msg.setColor("ORANGE");
        break;
      case "ban":
        msg.setColor("RED");
        break;
      default:
        break;
    }
const duration = (action === "mute") ? "hours" : "days";
    let description = `***Member***: ${member.user.username} \n ***Action***: ${action}`;
    if (time) description += `\n ***Duration***: ${time} ${duration}`;

    if (string) description += `\n ***Reason***: ${string.trim()}`;

    msg
      .setAuthor(`${author.username}`, author.displayAvatarURL())
      .setThumbnail(`${member.user.displayAvatarURL()}`)
      .setDescription(description)
      .setTimestamp();
    channelToSendLog.send(msg);
  };

  const addToModerationList = async (member, time) => {
    const duration = (action === "mute") ? 3600000 : 86400000;
    message.client.moderatedList[member.id] = {
      guild: message.guild.id,
      time: Date.now() + parseInt(time) * duration,
      type: action,
    };

    await fs.writeFile(
      "./src/modules/commands/moderation/moderationList.json",
      JSON.stringify(message.client.moderatedList),
      "utf8",
      (err) => {
        if (err) throw err;
      }
    );
  };

  // isBanned(snowflake)return bool

  // isMuted(snowflake) return bool
  // moderationTimer
  return {
    isValidModerationTarget:isValidModerationTarget,
    isValidMuteRole:isValidMuteRole,
    moderationLog:moderationLog,
    addToModerationList:addToModerationList
  };
};
