const { moderation } = require("../config.json");

module.exports = {
  name: "mute",
  description: "Tag a member and mute them.",
  args: ["member", "time", "string"],
  usage: "<@Name>, <#Hours>, <Reason>",
  channelOnly: moderation.channelOnlyMod,
  permission: "MUTE_MEMBERS",

  async execute(message, args) {
    const {
      isValidModerationTarget,
      isValidMuteRole,
      moderationLog,
      addToModerationList,
    } = await require("../utilsModeration")(message, this.name);
    const { member, time, string } = args;

    await isValidModerationTarget(member);
    // const mutedRole = await isValidMuteRole();
    // if (member.roles.cache.has(mutedRole.id))
    //   throw `${member.user.username} is already muted`;

    // await member.roles
    //   .add(mutedRole, string)
    //   .then(() => addToModerationList(member, time));

    await moderationLog(args);
    message.reply(`${member.user.username} has been muted for ${time} hours`);
  },
};
