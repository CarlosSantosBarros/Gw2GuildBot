module.exports = class FieldProficiency {
  constructor(proficiency, member) {
    const proficiencies = member.getProficiencies(proficiency.color);
    const isMember = member.isMember();
    const fieldHeading =
      proficiencies.size == 0
        ? `You do not have a ${proficiency.label}`
        : `Your ${proficiency.label} (${proficiencies.size}/${proficiency.max})`;

    return {
      name: `${fieldHeading}`,
      value: `${isMember ? "-----------------" : "classesString"}`,
      // eslint-disable-next-line no-unneeded-ternary
      inline: isMember ? false : true,
    };
  }
};
