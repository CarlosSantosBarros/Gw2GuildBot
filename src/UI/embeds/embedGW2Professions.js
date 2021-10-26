const { MessageEmbed } = require("discord.js");
const { fieldProfession } = require("./embedComponents/fieldProfession");
const {
  classDataCollection,
} = require("../../slashCommands/slashCmdGW2Class/dataGW2Class");
const DiscordUtils = require("../../utils/utilsDiscord");

exports.embedGW2Professions = async (member) => {
  const memberUtils = new DiscordUtils.MemberUtils(member);
  const embedObject = new MessageEmbed()
    .setAuthor(member.user.username)
    .setTitle("Player Summary")
    .setDescription("Classes:")
    .setThumbnail(member.user.avatarURL());

  let hasRole = false;
  classDataCollection().forEach((classItem) => {
    if (!memberUtils.getRoleByName(classItem.value)) return;
    hasRole = true;
    const classFieldString = fieldProfession(classItem);
    embedObject.addFields(classFieldString);
  });
  if (!hasRole)
    embedObject.addField("You have not added any classes", "\u200B");
  console.log("made menu");
  return Promise.resolve(embedObject);
};
