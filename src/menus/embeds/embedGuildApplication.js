const { MessageEmbed } = require("discord.js");

module.exports = class EmbedGuildApplication extends MessageEmbed {
  constructor(user, applicationData) {
    super();
    this.setAuthor({ name: user.username });
    this.setTitle("Guild Application");
    this.setDescription(applicationData.accountName);
    this.setThumbnail(user.avatarURL());
    this.addField("Server:", `${applicationData.server.name}`);
    this.addField("WvW Rank:", `${applicationData.wvwRank}`);
    if (applicationData.isLegal)
      this.addField("Are you over 18?", applicationData.isLegal);
    if (applicationData.willRoleSwap)
      this.addField(
        "Are you willing to play other classes or builds?",
        applicationData.willRoleSwap
      );
  }
};
