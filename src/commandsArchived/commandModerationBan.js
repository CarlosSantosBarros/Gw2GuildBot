const { moderation } = require("../config.json");
const { Permissions } = require("discord.js");

module.exports = {
  name: "ban",
  description: "Tag a member and ban them.",
  args: ["member", "time", "string"],
  usage: "<@Name>, <#Days>, <Reason>",
  channelOnly: moderation.channelOnlyMod,
  permission: Permissions.FLAGS.BAN_MEMBERS,

  async execute(message, args) {
    const { isValidModerationTarget, moderationLog, addToModerationList } =
      await require("../utilsModeration")(message, this.name);
    const { member, time, string } = args;

    await isValidModerationTarget(member);
    await addToModerationList(member, time);
    // member.ban({ days: args[1], reason: string, });
    await moderationLog(args);
    message.reply(`${member.user.username} has been banned for ${time} days`);
  },
};
