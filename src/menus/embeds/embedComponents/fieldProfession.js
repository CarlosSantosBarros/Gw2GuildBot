const { memberNicknameMention } = require("@discordjs/builders");
const DiscordUtils = require("../../../utils/utilsDiscord");
const { forEachToString } = require("../../../utils/utils");
const utils = new DiscordUtils.ServerUtils();
const { professionsSettings } = require("../../../config.json");

exports.fieldProfession = (professionItem) => {
  const emojiSting = `<:${professionItem.label}:${professionItem.emoji}>`;
  const mentorRole = utils.getRoleByNameAndColor(
    professionItem.value,
    professionsSettings.mentorColor
  );

  const mentorformat = (item) => {
    return memberNicknameMention(item.user.id);
  };
  const professionMentors = utils.getMembersByRoleId(mentorRole.id);
  const mentorString = forEachToString(professionMentors, mentorformat);

  const fieldValueString = `**Players**: ${
    utils.getGuildMembersByRoleName(professionItem.value).size
  }
    **Role**: ${professionItem.description} 
    **Build:** *[Here](${professionItem.build})* 
    ${mentorString ? `**Mentor**: ${mentorString}` : ""}`;

  return {
    name: `${emojiSting} ${professionItem.label} ${emojiSting}`,
    value: fieldValueString,
    inline: true,
  };
};
