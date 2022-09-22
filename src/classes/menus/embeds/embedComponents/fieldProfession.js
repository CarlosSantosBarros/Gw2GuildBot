const { ServerUtils } = require("../../../../utils/");
const { getGuild } = require("../../../../utils/utils");
const { toEmoji, getMentorsAsString } = require("../../../../utils/utilsStringFormaters");

module.exports = class FieldProfession {
  constructor(profession, client) {
    const emoji = toEmoji(profession);
    const server = new ServerUtils(getGuild(client));
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
