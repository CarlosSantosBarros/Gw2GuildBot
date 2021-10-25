const { memberNicknameMention } = require("@discordjs/builders");
const DiscordUtils = require("../../utils/utilsDiscord");
const utils = new DiscordUtils.GuildUtils();

exports.buildClassFieldString = (classItem) => {
  const emojiSting = `<:${classItem.label}:${classItem.emoji}>`;
  let classMentorString = "";
  classItem.mentors.forEach((mentorItem) => {
    const concatString = `${memberNicknameMention(mentorItem.mentorId)}/${
      mentorItem.mentorIGN
    }`;
    classMentorString = classMentorString.concat(" ", concatString);
  });

  const fieldValueString = `**Players**: ${
    utils.getMembersByRoleName(classItem.value).size
  }
    **Role**: ${classItem.description} 
    **Build:** *[Here](${classItem.build})*
    **Mentor**: ${classMentorString}`;

  return {
    name: emojiSting + classItem.label + emojiSting,
    value: fieldValueString,
  };
};
