const { MessageEmbed } = require("discord.js");
const { memberNicknameMention } = require("@discordjs/builders");
const { ServerUtils } = require("../../../utils/");
const { forEachToString } = require("../../../utils/utils");
const FieldProfession = require("./embedComponents/fieldProfession");
const { rosterSummarySettings } = require("../../../config.json");

module.exports = class EmbedRosterSummary extends MessageEmbed {
  constructor() {
    super();
    const server = new ServerUtils();
    const guild = server.guild;
    this.setThumbnail(guild.iconURL());
    this.setAuthor({ name: "Ordo Ab [Chao]" });
    this.setTitle("Roster Summary");
    this.setDescription("Guild Breakdown");

    const officerFormat = (item) => {
      return memberNicknameMention(item.id);
    };
    const membershipFormat = (item) => {
      return `\n ${item.prefixString} ${
        server.getMembersByRoleId(item.roleId).size
      }`;
    };

    const officerCollection = server.getOfficers();
    const officerString = forEachToString(officerCollection, officerFormat);
    const membershipString = forEachToString(
      rosterSummarySettings,
      membershipFormat
    );

    this.addFields({
      name: "Membership:",
      value: `${membershipString}
      <:officer:888815047026032721> **Officers**:
      ${officerString}
      \u200B`,
    });

    this.addField("Profession Breakdown:", "\u200B");
    // @ts-ignore
    guild.client.professionsData.forEach((professionItem) => {
      const professionFieldString = {
        ...new FieldProfession(professionItem),
        ...{ inline: true },
      };
      // @ts-ignore
      this.addFields(professionFieldString);
    });
  }
};
