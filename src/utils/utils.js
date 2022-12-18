const { Client, Guild, Collection, roleMention } = require("discord.js");
const { format, set, getUnixTime, differenceInMinutes } = require("date-fns");
const { utcToZonedTime } = require("date-fns-tz");

const fs = require("fs");
const MemberUtils = require("./utilsMember");
const { forEachToString } = require("./utilsStringFormaters");
const { InterfaceGW2Player } = require("../classes/database");
const { guildSettings, eventSettings } = require("../config.json");
const { discordGuildId, memberRole } = guildSettings;
const path = require("path");

/**  terrible name, call this something else
 * @param {string} prefix
 * @param {fs.PathLike} dirPath
 * @param {Function} action
 */
function findJSStartingWith_In_AndDo_(prefix, dirPath, action) {
  fs.readdirSync(dirPath)
    .filter((file) => file.endsWith(".js") && file.startsWith(prefix))
    .forEach((file) => action(file));
}

function log(message) { console.log(`[${format(new Date(), "PPPppp")}] ${message}`); }

function fileLoader(config, client) {
  const { prefix, dirPath } = config;
  const collection = new Collection();

  const itemLoader = (fileItem) => {
    const filePath = path.join(dirPath, `./${fileItem}`);
    const item = require(filePath);
    let key = item.customId;
    if (prefix == "channel" || prefix == "event") key = item.name;
    else if (prefix == "slashCmd") key = item.data.name;

    if (prefix != "event") {
      log(`Loading: ${key}`);
      collection.set(key, item);
      return;
    }
    if (item.once) client.once(item.name, (...args) => item.execute(...args));
    else client.on(key, (...args) => item.execute(...args));
  };

  fs.readdirSync(dirPath)
    .filter((file) => file.endsWith(".js") && file.startsWith(prefix))
    .forEach((file) => itemLoader(file));
  log(`${prefix} Files loaded`);
  return collection;
}


function isErrorBadApiKey(errorContent) {
  if (
    errorContent.text === "Invalid access token" ||
    errorContent.text === "invalid key"
  )
    return true;
  else return false;
}

/**
 * @param {ServerUtils} server
 * @typedef SyncOutput
 * @type {object}
 * @property {string} removedRolesFrom
 * @property {string} notVeried
 * @returns {Promise<SyncOutput>}
 */
async function guildSync(server) {
  const { getGW2GuildInfo } = require("./utilsGw2API");
  const guildMembers = await getGW2GuildInfo();
  const gw2db = new InterfaceGW2Player();
  const verified = await gw2db.getAll();
  const discordUsersToClear = server.getMembers();
  while (verified.length > 0) {
    // const verifiedUser = verified.shift().get();
    const { snowflake, accountName } = verified.shift().get();
    const index = guildMembers.findIndex((entry) => entry.name === accountName);
    const discordMember = server.getMemberById(snowflake);
    const member = new MemberUtils(discordMember, server);

    if (index != -1) {
      const verifiedGuildMember = guildMembers.splice(index, 1)[0];
      await member.addMemberRole();
      await member.addRankrole(verifiedGuildMember.rank);
      await member.removeVerifiedRole();
      discordUsersToClear.delete(snowflake);
      log(`${accountName} is in guild, give roles and dont clear`);
      continue;
    } else if (member.isVerified()) {
      discordUsersToClear.delete(snowflake);
      log(`${accountName} is verified, dont clear`);
      continue;
    } else {
      await gw2db.deletePlayer(snowflake);
      log(`${accountName} is not verified or in guild, remove key and clear`);
      continue;
    }
  }
  let removedRolesFrom = "";
  discordUsersToClear.forEach(async (item) => {
    const member = new MemberUtils(item, server);
    removedRolesFrom = removedRolesFrom.concat(" ", `${item.displayName}\n`);
    log(`Removed roles from ${item.displayName}`);
    await member.removeRankRole();
    await member.removeProficiencies();
    await member.removeMemberRole();
  });

  const getAccNames = (item) => {
    return `${item.name}\n`;
  };
  const notVeried = forEachToString(guildMembers, getAccNames);
  return { removedRolesFrom, notVeried };
}

async function eventReminder(server) {
  // when setting the timezones in the config use one from this site
  // https://nodatime.org/TimeZones
  const { timeZone, interval, events } = eventSettings;
  const now = new Date();

  events.forEach(async (item) => {
    if (item.days.includes(format(now, "EEEEEE"))) {
      const nowZonedTime = utcToZonedTime(new Date(), timeZone);
      const targetTime = set(nowZonedTime, item.time);
      const minutes = differenceInMinutes(targetTime, nowZonedTime, { roundingMethod: "ceil" });
      if (minutes == interval) {
        const unixTime = getUnixTime(targetTime);
        const role = roleMention(memberRole);
        const channel = server.getTextChannel(item.channel);
        if (!channel) log(`${item.channel} does not exist`);
        else await channel.send({
          content: `${role}: ${item.name} starts <t:${unixTime}:R>! at <t:${unixTime}:f>`
        });
      }
    }
  });
}
/**
   * @param {Client} client
   * @returns {Guild}
   */
function getGuild(client) {
  /**
     * @param {Guild} guild
     * @returns {boolean}
     */
  const search = (guild) => guild.id === discordGuildId;
  // @ts-ignore
  return client.guilds.cache.find(search);
}

module.exports = {
  findJSStartingWith_In_AndDo_: findJSStartingWith_In_AndDo_,
  log: log,
  isErrorBadApiKey: isErrorBadApiKey,
  guildSync: guildSync,
  getGuild: getGuild,
  fileLoader: fileLoader,
  eventReminder: eventReminder
};