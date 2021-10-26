const { memberNicknameMention } = require("@discordjs/builders");
const DiscordUtils = require("../../../utils/utilsDiscord");
const utils = new DiscordUtils.GuildUtils();

//can tidy here
exports.fieldProfession = (classItem) => {
  const emojiSting = `<:${classItem.label}:${classItem.emoji}>`;
  let classMentorString = "";
  // change here to use mentor role
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
