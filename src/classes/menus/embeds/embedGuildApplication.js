const { EmbedBuilder, userMention } = require("discord.js");
const FieldProficiency = require("./embedComponents/fieldProficiency");
const FieldAppStatus = require("./embedComponents/fieldAppStatus");
const { proficiencyData } = require("../../../utils/utilsCollections");

module.exports = class EmbedGuildApplication extends EmbedBuilder {
  constructor(member, state) {
    super();
    this.user = member.getUser();
    this.setAuthor({ name: this.user.username });
    this.setTitle("Guild Application");
    this.setDescription(
      `${userMention(this.user.id)}/${state.accountName}`
    );
    this.setThumbnail(this.user.avatarURL());
    let embedColour = "Yellow";
    const application = state.application;
    this.addFields(
      { name: "Server:", value: `${application.server.name}` },
      { name: "WvW Rank:", value: `${application.wvwRank}` }
    );
    if (application.isLegal)
      this.addFields({ name: "Are you over 18?", value: application.isLegal });
    if (application.willRoleSwap)
      this.addFields({
        name:
          "Are you willing to play other classes or builds?",
        value: application.willRoleSwap
      });
    if (application.hasDoneProfs)
      proficiencyData.every((proficiency) =>
        // @ts-ignore
        this.addFields(new FieldProficiency(proficiency, member))
      );
    if (application.personalMessage)
      this.addFields({ name: "Personal Message", value: application.personalMessage });
    if (state.applicationStatus) {
      const status = state.applicationStatus;
      switch (status.status) {
        case "Denied":
          embedColour = "Red";
          break;
        case "Blacklisted":
          embedColour = "DarkButNotBlack";
          break;
        default:
          embedColour = "Green";
          break;
      }
      // @ts-ignore
      this.addFields(new FieldAppStatus(state.applicationStatus));
    }
    // @ts-ignore
    this.setColor(embedColour);
  }
};
