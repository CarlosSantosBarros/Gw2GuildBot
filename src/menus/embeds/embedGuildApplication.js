const { MessageEmbed } = require("discord.js");
const FieldProficiency = require("./embedComponents/fieldProficiency");
const { client } = require("../../index");

module.exports = class EmbedGuildApplication extends MessageEmbed {
  constructor(member, applicationData) {
    super();
    this.user = member.getUser();
    this.setAuthor({ name: this.user.username });
    this.setTitle("Guild Application");
    this.setDescription(applicationData.accountName);
    this.setThumbnail(this.user.avatarURL());
    this.addField("Server:", `${applicationData.server.name}`);
    this.addField("WvW Rank:", `${applicationData.wvwRank}`);
    if (applicationData.isLegal)
      this.addField("Are you over 18?", applicationData.isLegal);
    if (applicationData.willRoleSwap)
      this.addField(
        "Are you willing to play other classes or builds?",
        applicationData.willRoleSwap
      );
    if (applicationData.hasDoneProfs)
      client.proficiencyData.forEach((proficiency) => {
        this.addFields(new FieldProficiency(proficiency, member));
      });
    if (applicationData.personalMessage)
      this.addField("Personal Message", applicationData.personalMessage);
  }
};
