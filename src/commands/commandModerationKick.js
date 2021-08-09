const { moderation } = require("../config.json");
const { Permissions } = require("discord.js");

module.exports = {
  name: "kick",
  description: "Tag a member and kick them .",
  args: ["member", "string"],
  usage: "<@name>, <Reason>",
  channelOnly: moderation.channelOnlyMod,
  permission: Permissions.FLAGS.KICK_MEMBERS,

  async execute(message, args) {
    const { isValidModerationTarget, moderationLog } =
      await require("../utilsModeration")(message, this.name);
    const { member, string } = args;
    await isValidModerationTarget(member);
    // await member.kick(string);
    await moderationLog(args);
    message.reply(`${member.user.username} has been kicked`);
  },
};
