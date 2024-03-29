const { ServerUtils } = require("../../../../utils/");
const { toEmoji, getMentorsAsString } = require("../../../../utils/utilsStringFormaters");

module.exports = class FieldProfession {
  /**
  * @param {ServerUtils} server
  */
  constructor(profession, server) {
    const emoji = toEmoji(profession);
    const mentors = getMentorsAsString(profession.value, server);
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
