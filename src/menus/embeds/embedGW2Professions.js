const { MessageEmbed } = require("discord.js");
const { fieldProfession } = require("./embedComponents/fieldProfession");
const DiscordUtils = require("../../utils/utilsDiscord");
const { client } = require("../../index");

// if application dont show guild spesific stuff

module.exports = class EmbedGW2Professions extends MessageEmbed {
  constructor(member) {
    super();
    this.memberUtils = new DiscordUtils.MemberUtils(member);
    this.setAuthor({ name: member.user.username });
    this.setTitle("Player Summary");
    this.setDescription("Professions:");
    this.setThumbnail(member.user.avatarURL());

    client.proficiencyData.forEach((proficiency) => {
      const proficiencyProfession = this.memberUtils.getRolesByColor(
        proficiency.color
      );

      const fieldHeading =
        proficiencyProfession.size == 0
          ? `You do not have a ${proficiency.label}`
          : `Your ${proficiency.label} (${proficiencyProfession.size}/${proficiency.max})`;
      this.addField(`${fieldHeading}`, "-----------------");
      proficiencyProfession.forEach((profession) => {
        this.addFieldByProfessionName(profession.name);
      });
    });
  }
  addFieldByProfessionName(professionName) {
    const professionItem = client.professionsData.get(professionName);
    const professionFieldString = fieldProfession(professionItem);
    this.addFields(professionFieldString);
  }
};
