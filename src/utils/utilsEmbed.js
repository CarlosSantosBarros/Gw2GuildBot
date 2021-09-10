const { MessageEmbed } = require("discord.js");

exports.tokenAccInfoEmbed = (tokenInfo, accountInfo) => {
  const permissionString = tokenInfo.permissions.toString();
  const embedObject = new MessageEmbed()
    .setTitle("Key name: " + tokenInfo.name)
    .setDescription("Key ID: " + tokenInfo.id)
    .setAuthor(accountInfo.name)
    .addField("Permittion: ", permissionString.replace(/,/g, `\n`));
  return embedObject;
};
