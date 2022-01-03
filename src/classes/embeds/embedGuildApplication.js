const { MessageEmbed } = require("discord.js");

exports.embedGuildApplication = async (user, accountInfo) => {
  return new Promise((resolve) => {
    const embedObject = new MessageEmbed()
      .setAuthor({ name: user.username })
      .setTitle("Guild Application")
      .setDescription(accountInfo.accountName)
      .setThumbnail(user.avatarURL())
      .addField("Server:", `${accountInfo.server.name}`)
      .addField("WvW Rank:", `${accountInfo.wvwRank}`);
    if (accountInfo.isLegal)
      embedObject.addField("Are you over 18?", accountInfo.isLegal);
    if (accountInfo.willRoleSwap)
      embedObject.addField(
        "Are you willing to play other classes or builds?",
        accountInfo.willRoleSwap
      );
    resolve(embedObject);
  });
};
