const { memberNicknameMention } = require("@discordjs/builders");
const { getMembersByRoleName } = require("../../utils/utilsDiscord");

exports.buildClassFieldString = (classItem, guild) => {
  const emojiSting = `<:${classItem.label}:${classItem.emoji}>`;
  let classMentorString = "";
  classItem.mentors.forEach((mentorItem) => {
    const concatString = `${memberNicknameMention(mentorItem.mentorId)}/${
      mentorItem.mentorIGN
    }`;
    classMentorString = classMentorString.concat(" ", concatString);
  });

  const fieldValueString = `**Players**: ${
    getMembersByRoleName(guild, classItem.value).size
  }
    **Role**: ${classItem.description} 
    **Build:** *[Here](${classItem.build})*
    **Mentor**: ${classMentorString}`;

  return {
    name: emojiSting + classItem.label + emojiSting,
    value: fieldValueString,
  };
};
