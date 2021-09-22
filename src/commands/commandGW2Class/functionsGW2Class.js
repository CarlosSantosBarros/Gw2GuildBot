const {
  getDBGW2PlayerById,
} = require("../../database/tableInterfaces/tableInterfaceGW2Player");
const { memberNicknameMention } = require("@discordjs/builders");
const { getMembersByRoleName } = require("../../utils/utilsDiscord");

exports.getPlayerClasses = async (userId) => {
  const gw2Player = await getDBGW2PlayerById(userId);
  if (!gw2Player.classes) return [];
  return gw2Player.classes;
};

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
