const { UniqueConstraintError } = require("sequelize");
const { DiscordGuild } = require("..");

/*
  ? Refactor here - pass model instead of import?
 */

exports.getDiscordGuildById = async (id) => {
  let userRes = await DiscordGuild.findOne({
    where: {
      snowflake: id,
    },
  });
  if (!userRes) userRes = await createDiscordGuildById(id);
  return userRes;
};

exports.deleteDiscordGuildById = async (id) => {
  return await DiscordGuild.destroy({
    where: {
      snowflake: id,
    },
  });
};

const createDiscordGuildById = async (id) => {
  return await DiscordGuild.create({
    snowflake: id,
  }).catch((error) => {
    if (error instanceof UniqueConstraintError)
      throw "Your already have a key stored";
  });
};

exports.updateDiscordGuildById = async (id, newValue) => {
  return await DiscordGuild.update(newValue, {
    where: {
      snowflake: id,
    },
  });
};
