const { format } = require("date-fns");
const { memberNicknameMention } = require("@discordjs/builders");
const { ServerUtils, MemberUtils } = require("./");
const { logging, guildSettings } = require("../config.json");
const { IsSuccessLogging, IsFailureLogging } = logging;
const fs = require("fs");
const { getGW2GuildInfo } = require("./utilsGw2API");
const { InterfaceGW2Player } = require("../classes/database");

// terrible name, call this something else
exports.findJSStartingWith_In_AndDo_ = (prefix, path, action) => {
  fs.readdirSync(path)
    .filter((file) => file.endsWith(".js") && file.startsWith(prefix))
    .forEach((file) => action(file));
};

exports.removeFromArray = (array, string) => {
  const isNotString = (item) => {
    return item !== string;
  };
  return array.filter(isNotString);
};

exports.log = (message) => {
  const dateString = format(new Date(), "PPPppp");
  if (IsSuccessLogging) console.log(`[${dateString}] ${message}`);
  if (IsFailureLogging) console.log(`[${dateString}] ${message}`);
};

exports.createCollection = (collection, data) => {
  data.forEach((entry) => {
    collection.set(entry.value, entry);
  });
};

exports.forEachToString = (data, itemFormat) => {
  let returnString = "";
  data.forEach((item) => {
    const concatString = itemFormat(item);
    returnString = returnString.concat(" ", concatString);
  });
  return returnString;
};

exports.toEmoji = (data) => {
  return `<:${data.label}:${data.emoji}>`;
};

exports.getMentorsAsString = (name) => {
  const mentorformat = (mentor) => {
    return memberNicknameMention(mentor.user.id);
  };
  const server = new ServerUtils();
  const mentors = server.getMentorsFor(name);
  return mentors ? this.forEachToString(mentors, mentorformat) : mentors;
};

exports.getProfessionsAsString = (proficiencies) => {
  const { client } = require("../index");
  const professionFormat = (profession) => {
    // @ts-ignore
    const prof = client.professionsData.get(profession.name);
    const emoji = this.toEmoji(prof);
    return `${emoji} ${prof.label} ${emoji} 
    `;
  };
  return this.forEachToString(proficiencies, professionFormat);
};

exports.isErrorBadApiKey = (errorContent) => {
  if (
    errorContent.text === "Invalid access token" ||
    errorContent.text === "invalid key"
  )
    return true;
  else return false;
};

exports.isProtectedRole = (role) => {
  if (role.id === guildSettings.memberRole) return true;
  if (role.hexColor === guildSettings.gw2RankColour) return true;
  return false;
};

/**
 * @typedef SyncOutput
 * @type {object}
 * @property {string} removedRolesFrom
 * @property {string} notVeried
 */
/**
 *
 * @returns {Promise<SyncOutput>}
 */
exports.guildSync = async () => {
  const guildMembers = await getGW2GuildInfo();
  const gw2db = new InterfaceGW2Player();
  const verified = await gw2db.getAll();
  const server = new ServerUtils();
  const discordUsersToSync = server.getMembers();
  while (verified.length > 0) {
    const verifiedUser = verified.shift().get();
    const { snowflake, accountName } = verifiedUser;
    const index = guildMembers.findIndex((entry) => entry.name === accountName);
    const discordMember = server.getMemberById(snowflake);
    if (!discordMember) {
      await gw2db.deletePlayer(snowflake);
      continue;
    }

    const member = new MemberUtils(discordMember);

    if (index > -1) {
      const verifiedGuildMember = guildMembers.splice(index, 1)[0];
      await member.addMemberRole();
      await member.addRankrole(verifiedGuildMember.rank);
    } else await gw2db.deletePlayer(snowflake);
    discordUsersToSync.delete(snowflake);
  }
  let removedRolesFrom = "";
  discordUsersToSync.forEach(async (item) => {
    const member = new MemberUtils(item);
    removedRolesFrom = removedRolesFrom.concat(" ", `${item.displayName}\n`);

    const rankRole = member.getRankRole();
    if (rankRole) await member.removeRole(rankRole);

    const proficiencies = member.getAllProficiencies();
    if (proficiencies) await member.removeRole(proficiencies);

    await member.removeMemberRole();
  });

  const getAccNames = (item) => {
    return `${item.name}\n`;
  };
  const notVeried = this.forEachToString(guildMembers, getAccNames);
  return { removedRolesFrom, notVeried };
};
