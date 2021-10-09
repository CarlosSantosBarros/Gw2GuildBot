const { format } = require("date-fns");

const { logging } = require("../config.json");

const { IsSuccessLogging, IsFailureLogging } = logging;
exports.log = (message) => {
  const dateString = format(new Date(), "PPPppp");
  if (IsSuccessLogging) console.log(`[${dateString}] ${message}`);

  if (IsFailureLogging) console.log(`[${dateString}] ${message}`);
};

exports.isValidLogChannel = async (channels, logChannel) => {
  let channelToSendLog = await this.getChannelObj(channels, logChannel, "text");
  if (!channelToSendLog)
    channelToSendLog = await channels.create(logChannel, {
      type: "text",
    });

  return channelToSendLog;
};

// Refactor to use guild as param
exports.getChannelByNameAndType = (channels, textName, type) => {
  return channels.cache.find(
    (channel) => channel.name === `${textName}` && channel.type === type
  );
};

exports.getRoleByName = (roles, roleName) => {
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

exports.getMembersByRoleId = (guild, id) => {
  return guild.roles.cache.find((role) => role.id === id).members;
};

exports.getMembersByRoleName = (guild, roleName) => {
  return guild.roles.cache.find((role) => role.name === roleName).members;
};
