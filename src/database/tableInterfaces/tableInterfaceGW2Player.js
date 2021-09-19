const { UniqueConstraintError } = require("sequelize");
const { GW2Player } = require("..");

/*
  ? Refactor here - pass model instead of import?
 */
exports.getAll = async () => {
  return await GW2Player.findAll();
};

exports.getDBGW2PlayerById = async (id) => {
  let userRes = await GW2Player.findOne({
    where: {
      snowflake: id,
    },
  });
  if (!userRes) userRes = await createDBGW2PlayerById(id);
  return userRes;
};

exports.deleteDBGW2PlayerById = async (id) => {
  return await GW2Player.destroy({
    where: {
      snowflake: id,
    },
  });
};

const createDBGW2PlayerById = async (id) => {
  return await GW2Player.create({
    snowflake: id,
  }).catch((error) => {
    if (error instanceof UniqueConstraintError)
      throw "Your already have a key stored";
  });
};

exports.updateDBGW2PlayerById = async (id, newValue) => {
  return await GW2Player.update(newValue, {
    where: {
      snowflake: id,
    },
  });
};
