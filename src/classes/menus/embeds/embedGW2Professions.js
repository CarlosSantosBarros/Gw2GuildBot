const { EmbedBuilder } = require("discord.js");
const FieldProfession = require("./embedComponents/fieldProfession");
const FieldProficiency = require("./embedComponents/fieldProficiency");
const { professionsData, proficiencyData } = require('../../../utils//utilsCollections');
const { MemberUtils } = require("../../../utils");

module.exports = class EmbedGW2Professions extends EmbedBuilder {
  /**
   * @param {MemberUtils} member
   * */
  constructor(member) {
    super();
    this.user = member.getUser();
    this.setAuthor({ name: this.user.username });
    this.setTitle("Player Summary");
    this.setDescription("Professions:");
    this.setThumbnail(this.user.avatarURL());

    proficiencyData.forEach((proficiency) => {
      this.addFields(new FieldProficiency(proficiency, member));
      const proficiencies = member.getProficiencies(proficiency.color);
      if (member.isMember())
        proficiencies.forEach((item) => {
          const profession = professionsData.get(item.name);
          this.addFields(new FieldProfession(profession, member.getServer()));
        });
    });
  }
};
