const { MessageEmbed } = require("discord.js");
const { fieldProfession } = require("./embedComponents/fieldProfession");
const DiscordUtils = require("../../utils/utilsDiscord");

exports.embedGW2Professions = async (member) => {
  const professionsData = member.client.professionsData;
  const proficiencyData = member.client.proficiencyData;
  const memberUtils = new DiscordUtils.MemberUtils(member);
  const embedObject = new MessageEmbed()
    .setAuthor(member.user.username)
    .setTitle("Player Summary")
    .setDescription("Professiones:")
    .setThumbnail(member.user.avatarURL());
  const addFieldByProfessionName = (professionName) => {
    const professionItem = professionsData.get(professionName);
    const professionFieldString = fieldProfession(professionItem);
    embedObject.addFields(professionFieldString);
  };

  proficiencyData.forEach((proficiency) => {
    const proficiencyProfession = memberUtils.getRoleByColor(proficiency.color);
    if (!proficiencyProfession)
      return embedObject.addField(
        `You do not have a ${proficiency.label}`,
        "-----------------"
      );
    embedObject.addField(`Your ${proficiency.label}`, "-----------------");
    if (proficiencyProfession.size >= 2) {
      proficiencyProfession.forEach((profession) => {
        addFieldByProfessionName(profession.name);
      });
      return;
    }
    addFieldByProfessionName(proficiencyProfession.name);
  });

  return Promise.resolve(embedObject);
};
