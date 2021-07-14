const moment = require("moment");

const { logging } = require("../config.json");
//loging messages

const { IsSuccessLogging, IsFailureLogging } = logging;
exports.log = (message) => {
  if (IsSuccessLogging)
    console.log(`[${moment().format("YYYY-MM-DD HH:mm:ss")}] ${message}`);

  if (IsFailureLogging)
    console.log(`[${moment().format("YYYY-MM-DD HH:mm:ss")}] ${message}`);
};

exports.isValidLogChannel = async (channels, logChannel) => {
  let channelToSendLog = await this.getChannelObj(channels, logChannel, "text");
  if (!channelToSendLog)
    channelToSendLog = await channels.create(logChannel, {
      type: "text",
    });

  return channelToSendLog;
};

exports.getChannelObj = (channels, textName, type) => {
  return channels.cache.find(
    (channel) => channel.name === `${textName}` && channel.type === type
  );
};

exports.getRoleByName = async (roles, roleName) => {
  return roles.cache.find((role) => role.name === `${roleName}`);
};

exports.getRoleByPermissions = async (roles, permission) => {
  return roles.cache.find((role) => !role.permissions.has(permission));
};

exports.getGuildMemberById = async (guild, id) => {
  return guild.members.cache.find((member) => member.id === id);
};

exports.getGuildById = async (client, id) => {
  return client.guilds.cache.find((guild) => guild.id === id);
};
