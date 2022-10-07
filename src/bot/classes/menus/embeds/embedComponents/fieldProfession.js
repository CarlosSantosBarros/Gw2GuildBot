const { ServerUtils } = require("../../../../utils/");
const { getGuild } = require("../../../../utils/utils");
const { toEmoji, getMentorsAsString } = require("../../../../utils/utilsStringFormaters");

module.exports = class FieldProfession {
  constructor(profession, client) {
    const emoji = toEmoji(profession);
    const server = new ServerUtils(getGuild(client));
    const mentors = getMentorsAsString(profession.value, server);
    const numberOfPlayer = server.getPlayers(profession.value).size;
    return {
      name: `${emoji} ${profession.label} ${emoji}`,
      value: `**Players**: ${numberOfPlayer}
    **Role**: ${profession.description} 
    **Build:** *[Here](${profession.build})* 
    ${mentors ? `**Mentor**: ${mentors}` : ""}`,
      inline: true,
    };
  }
};
