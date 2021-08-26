const { log } = require("../util");
const {
  isValidMuteRole,
  isValidModerationLogChannel,
} = require("../modules/commands/moderation/utilsModeration");
module.exports = async (guild) => {
  log(`New guild joined: ${guild.name} (id: ${guild.id}).`);
  log(`This guild has ${guild.memberCount} members!`);
  log(`Setting up channels for use`);
  // require("../setup/setup")(guild);
  const { channels, roles } = guild;
  await isValidMuteRole(roles);
  await isValidModerationLogChannel(channels);
  log(`Im ready to be used on "${guild.name}"`);
};
