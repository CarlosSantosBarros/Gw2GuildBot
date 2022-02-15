const { MessageEmbed } = require("discord.js");
const FieldProficiency = require("./embedComponents/fieldProficiency");
const { client } = require("../../../index");
const { memberNicknameMention } = require("@discordjs/builders");
const FieldAppStatus = require("./embedComponents/fieldAppStatus");

module.exports = class EmbedGuildApplication extends MessageEmbed {
  constructor(member, state) {
    super();
    this.user = member.getUser();
    this.setAuthor({ name: this.user.username });
    this.setTitle("Guild Application");
    this.setDescription(
      `${memberNicknameMention(this.user.id)}/${state.accountName}`
    );
    this.setThumbnail(this.user.avatarURL());
    let embedColour = "YELLOW";
    if (state.applicationStatus) {
      const status = state.applicationStatus;
      switch (status.status) {
        case "accepted":
          embedColour = "GREEN";
          break;
        case "denied":
          embedColour = "RED";
          break;
        case "blacklisted":
          embedColour = "NOT_QUITE_BLACK";
          break;

        default:
          break;
      }
      this.addFields(new FieldAppStatus(state.applicationStatus));
    } else {
      const application = state.application;
      this.addField("Server:", `${application.server.name}`);
      this.addField("WvW Rank:", `${application.wvwRank}`);
      if (application.isLegal)
        this.addField("Are you over 18?", application.isLegal);
      if (application.willRoleSwap)
        this.addField(
          "Are you willing to play other classes or builds?",
          application.willRoleSwap
        );
      if (application.hasDoneProfs)
        client.proficiencyData.forEach((proficiency) =>
          // refactor - return correct type
          this.addFields(new FieldProficiency(proficiency, member))
        );
      if (application.personalMessage)
        this.addField("Personal Message", application.personalMessage);
    }
    this.setColor(embedColour);
  }
};
