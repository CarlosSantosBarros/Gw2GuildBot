const { memberNicknameMention } = require("@discordjs/builders");
const DiscordUtils = require("../../../utils/utilsDiscord");
const utils = new DiscordUtils.GuildUtils();

//can tidy here
exports.fieldProfession = (professionItem) => {
  const emojiSting = `<:${professionItem.label}:${professionItem.emoji}>`;
  // // change here to use mentor role
  // let professionMentorString = "";
  // professionItem.mentors.forEach((mentorItem) => {
  //   const concatString = `${memberNicknameMention(mentorItem.mentorId)}/${
  //     mentorItem.mentorIGN
  //   }`;
  //   professionMentorString = professionMentorString.concat(" ", concatString);
  // });

  const fieldValueString = `**Players**: ${
    utils.getMembersByRoleName(professionItem.value).size
  }
    **Role**: ${professionItem.description} 
    **Build:** *[Here](${professionItem.build})*`;
  // **Mentor**: ${professionMentorString}

  return {
    name: emojiSting + professionItem.label + emojiSting,
    value: fieldValueString,
    inline: true,
  };
};
