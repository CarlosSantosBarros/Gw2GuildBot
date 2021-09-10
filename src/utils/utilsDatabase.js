const { UniqueConstraintError } = require("sequelize");
const { GW2Player } = require("../database/");

/*
  ? This can maybe be extracted into a class or something like that
  ? maybe have a file for each table?
 */

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
  const userDel = await GW2Player.destroy({
    where: {
      snowflake: id,
    },
  });
  return userDel;
};

const createDBGW2PlayerById = async (id) => {
  const userCre = await GW2Player.create({
    snowflake: id,
  }).catch((error) => {
    if (error instanceof UniqueConstraintError)
      throw "Your already have a key stored";
  });
  return userCre;
};

exports.updateDBGW2PlayerById = async (id, newValue) => {
  const userUpdate = await GW2Player.update(newValue, {
    where: {
      snowflake: id,
    },
  });
  return userUpdate;
};
