const { memberNicknameMention } = require("@discordjs/builders");
const DiscordUtils = require("../../../utils/utilsDiscord");
const utils = new DiscordUtils.GuildUtils();
const { professionsSettings } = require("../../../config.json");

//can tidy here
exports.fieldProfession = (professionItem) => {
  const emojiSting = `<:${professionItem.label}:${professionItem.emoji}>`;
  const mentorRole = utils.getRoleByNameAndColor(
    professionItem.value,
    professionsSettings.mentorColor
  );
  const professionMentors = utils.getMembersByRoleId(mentorRole.id);
  let professionMentorString = "";
  professionMentors.forEach((mentorItem) => {
    professionMentorString = professionMentorString.concat(
      " ",
      memberNicknameMention(mentorItem.user.id)
    );
  });

  const fieldValueString = `**Players**: ${
    utils.getMembersByRoleName(professionItem.value).size
  }
    **Role**: ${professionItem.description} 
    **Build:** *[Here](${professionItem.build})* 
    ${professionMentorString ? `**Mentor**: ${professionMentorString}` : ""}`;

  return {
    name: emojiSting + professionItem.label + emojiSting,
    value: fieldValueString,
    inline: true,
  };
};
