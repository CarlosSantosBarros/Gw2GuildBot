const { userMention } = require("discord.js");
const { professionsData } = require("./utilsCollections");
const { rosterSummarySettings } = require("../../config.json");

exports.toEmoji = (data) => { return `<:${data.label}:${data.emoji}>`; };

exports.mentorformat = (mentor) => { return userMention(mentor.user.id); };

exports.forEachToString = (data, itemFormat) => {
  let returnString = "";
  data.forEach((item) => {
    const concatString = itemFormat(item);
    returnString = returnString.concat(" ", concatString);
  });
  return returnString;
};

exports.getMentorsAsString = (name, server) => {
  const mentors = server.getMentorsFor(name);
  return mentors ? this.forEachToString(mentors, this.mentorformat) : mentors;
};

exports.getProfessionsAsString = (proficiencies) => {
  const professionFormat = (profession) => {
    const prof = professionsData.get(profession.name);
    const emoji = this.toEmoji(prof);
    return `${emoji} ${prof.label} ${emoji}`;
  };
  return this.forEachToString(proficiencies, professionFormat);
};

exports.getOfficersAsString = (server) => {
  const officerCollection = server.getOfficers();
  const officerFormat = (item) => { return userMention(item.id); };
  return this.forEachToString(officerCollection, officerFormat);
};

exports.getmembershipAsString = (server) => {
  const membershipFormat = (item) => {
    const memberShipSize = server.getMembersByRoleId(item.roleId).size;
    return `\n ${item.prefixString} ${memberShipSize}`;
  };
  return this.forEachToString(rosterSummarySettings, membershipFormat);
};