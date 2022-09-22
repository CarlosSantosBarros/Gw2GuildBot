// eslint-disable-next-line no-unused-vars
const { Client, Guild } = require("discord.js");
const { format } = require("date-fns");
const { MemberUtils, ServerUtils } = require("./");
const { logging, guildSettings } = require("../config.json");
const { gw2RankColour, discordGuildId } = guildSettings;
const { IsSuccessLogging, IsFailureLogging } = logging;
const fs = require("fs");
const { getGW2GuildInfo } = require("./utilsGw2API");
const { InterfaceGW2Player } = require("../classes/database");
const { forEachToString } = require("./utilsStringFormaters");


// terrible name, call this something else
exports.findJSStartingWith_In_AndDo_ = (prefix, path, action) => {
  fs.readdirSync(path)
    .filter((file) => file.endsWith(".js") && file.startsWith(prefix))
    .forEach((file) => action(file));
};

exports.log = (message) => {
  const dateString = format(new Date(), "PPPppp");
  if (IsSuccessLogging) console.log(`[${dateString}] ${message}`);
  if (IsFailureLogging) console.log(`[${dateString}] ${message}`);
};

exports.isErrorBadApiKey = (errorContent) => {
  if (
    errorContent.text === "Invalid access token" ||
    errorContent.text === "invalid key"
  )
    return true;
  else return false;
};

/**
 * @param {ServerUtils} server
 * @typedef SyncOutput
 * @type {object}
 * @property {string} removedRolesFrom
 * @property {string} notVeried
 * @returns {Promise<SyncOutput>}
 */
exports.guildSync = async (server) => {
  const guildMembers = await getGW2GuildInfo();
  const gw2db = new InterfaceGW2Player();
  const verified = await gw2db.getAll();
  const discordUsersToSync = server.getMembers();
  while (verified.length > 0) {
    const verifiedUser = verified.shift().get();
    const { snowflake, accountName } = verifiedUser;
    const index = guildMembers.findIndex((entry) => entry.name === accountName);
    const discordMember = server.getMemberById(snowflake);

    const member = new MemberUtils(discordMember);
    if (member.isVerified()) {
      discordUsersToSync.delete(snowflake);
      continue;
    }

    if (index != -1) {
      const verifiedGuildMember = guildMembers.splice(index, 1)[0];
      await member.addMemberRole();
      const rankRole = server.getRoleByNameAndColor(verifiedGuildMember.rank, gw2RankColour);
      if (rankRole) await member.addRankrole(rankRole);
      member.removeVerifiedRole();
    } else {
      await gw2db.deletePlayer(snowflake);
      continue;
    }
    discordUsersToSync.delete(snowflake);
  }
  let removedRolesFrom = "";
  discordUsersToSync.forEach(async (item) => {
    const member = new MemberUtils(item);
    removedRolesFrom = removedRolesFrom.concat(" ", `${item.displayName}\n`);

    await member.removeRankRole();
    await member.removeProficiencies();
    await member.removeMemberRole();
  });

  const getAccNames = (item) => {
    return `${item.name}\n`;
  };
  const notVeried = forEachToString(guildMembers, getAccNames);
  return { removedRolesFrom, notVeried };
};

/**
 * @param {Client} client
 * @returns {Guild}
 */
exports.getGuild = (client) => {
  /**
   * @param {Guild} guild
   * @returns {boolean}
   */
  const search = (guild) => guild.id === discordGuildId;
  // @ts-ignore
  return client.guilds.cache.find(search);
};
