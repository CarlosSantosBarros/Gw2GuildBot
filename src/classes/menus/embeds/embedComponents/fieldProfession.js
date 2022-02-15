const { ServerUtils } = require("../../../../utils/");
const { toEmoji, getMentorsAsString } = require("../../../../utils/utils");
const { client } = require("../../../../index");

module.exports = class FieldProfession {
  constructor(name) {
    const profession = client.professionsData.get(name);
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
