const { MessageEmbed } = require("discord.js");
const FieldProficiency = require("./embedComponents/fieldProficiency");
const { client } = require("../../index");
const { memberNicknameMention } = require("@discordjs/builders");

module.exports = class EmbedGuildApplication extends MessageEmbed {
  constructor(member, state) {
    super();
    const application = state.application;
    console.log(application);
    this.user = member.getUser();
    this.setAuthor({ name: this.user.username });
    this.setTitle("Guild Application");
    this.setDescription(
      `${memberNicknameMention(this.user.id)}/${state.accountName}`
    );
    this.setThumbnail(this.user.avatarURL());
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
      client.proficiencyData.forEach((proficiency) => {
        this.addFields(new FieldProficiency(proficiency, member));
      });
    if (application.personalMessage)
      this.addField("Personal Message", application.personalMessage);
  }
};
