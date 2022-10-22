const { MemberUtils } = require("../../../../utils/");
const { getProfessionsAsString } = require("../../../../utils/utilsStringFormaters");

module.exports = class FieldProficiency {
  /**@param {MemberUtils} member*/
  constructor(proficiency, member) {
    const isMember = member.isMember();
    const proficiencies = member.getProficiencies(proficiency.color);
    const fieldHeading =
      proficiencies.size == 0
        ? `You do not have a ${proficiency.label}`
        : `Your ${proficiency.label} (${proficiencies.size}/${proficiency.max})`;
    let body = "-----------------";
    if (!isMember && proficiencies.size != 0)
      body = getProfessionsAsString(proficiencies);

    return {
      name: `${fieldHeading}`,
      value: `${body}`,
      // eslint-disable-next-line no-unneeded-ternary
      inline: isMember ? false : true,
    };
  }
};
