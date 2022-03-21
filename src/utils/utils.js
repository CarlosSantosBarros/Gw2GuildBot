const { format } = require("date-fns");
const { memberNicknameMention } = require("@discordjs/builders");
const { ServerUtils } = require("./");
const { logging, guildSettings } = require("../config.json");
const { IsSuccessLogging, IsFailureLogging } = logging;
const fs = require("fs");

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
  return this.forEachToString(server.getMentorsFor(name), mentorformat);
};

exports.getProfessionsAsString = (proficiencies) => {
  const { client } = require("../index");
  const professionFormat = (profession) => {
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
