const { MessageEmbed } = require("discord.js");
const { getWorld } = require("../../utils/utilsGw2API");

exports.embedGuildApplication = async (user, accountInfo) => {
  const server = await getWorld(accountInfo.server);
  return new Promise((resolve) => {
    const embedObject = new MessageEmbed()
      .setAuthor(user.username)
      .setTitle("Guild Application")
      .setDescription(accountInfo.accountName)
      .setThumbnail(user.avatarURL())
      .addField("Server:", `${server.name}`)
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
