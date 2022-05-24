const { MessageEmbed } = require("discord.js");
const FieldProfession = require("./embedComponents/fieldProfession");
const FieldProficiency = require("./embedComponents/fieldProficiency");
const { client } = require("../../../index");

// if application dont show guild spesific stuff

module.exports = class EmbedGW2Professions extends MessageEmbed {
  constructor(member) {
    super();
    this.user = member.getUser();
    this.setAuthor({ name: this.user.username });
    this.setTitle("Player Summary");
    this.setDescription("Professions:");
    this.setThumbnail(this.user.avatarURL());

    // @ts-ignore
    client.proficiencyData.forEach((proficiency) => {
      // @ts-ignore
      this.addFields(new FieldProficiency(proficiency, member));
      const proficiencies = member.getProficiencies(proficiency.color);
      if (member.isMember())
        proficiencies.forEach((item) => {
          // @ts-ignore
          const profession = client.professionsData.get(item.name);
          // @ts-ignore
          this.addFields(new FieldProfession(profession));
        });
    });
  }
};
