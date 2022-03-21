const { ServerUtils } = require("../../../../utils/");
const { toEmoji, getMentorsAsString } = require("../../../../utils/utils");

module.exports = class FieldProfession {
  constructor(profession) {
    const emoji = toEmoji(profession);
    const mentors = getMentorsAsString(profession.value);
    const server = new ServerUtils();
    return {
      name: `${emoji} ${profession.label} ${emoji}`,
      value: `**Players**: ${server.getPlayers(profession.value)}
    **Role**: ${profession.description} 
    **Build:** *[Here](${profession.build})* 
    ${mentors ? `**Mentor**: ${mentors}` : ""}`,
      inline: true,
    };
  }
};
