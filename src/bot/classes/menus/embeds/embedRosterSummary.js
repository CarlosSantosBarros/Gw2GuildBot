const { EmbedBuilder } = require("discord.js");
const { ServerUtils } = require("../../../utils/");
const FieldProfession = require("./embedComponents/fieldProfession");
const { professionsData } = require("../../../utils/utilsCollections");
const { getOfficersAsString, getmembershipAsString } = require("../../../utils/utilsStringFormaters");

module.exports = class EmbedRosterSummary extends EmbedBuilder {
  /**
 * @param {ServerUtils} server
 * */
  constructor(server) {
    super();
    const guild = server.guild;
    this.setThumbnail(guild.iconURL());
    this.setAuthor({ name: "Ordo Ab [Chao]" });
    this.setTitle("Roster Summary");
    this.setDescription("Guild Breakdown");

    const membershipString = getmembershipAsString(server);
    const officerString = getOfficersAsString(server);
    this.addFields({
      name: "Membership:",
      value: `${membershipString}
      <:officer:888815047026032721> **Officers**:
      ${officerString}
      \u200B`,
    });

    this.addField("Profession Breakdown:", "\u200B");
    // @ts-ignore
    professionsData.every((professionItem) => {
      const professionFieldString = {
        ...new FieldProfession(professionItem),
        ...{ inline: true },
      };
      // @ts-ignore
      this.addFields(professionFieldString);
    });
  }
};
