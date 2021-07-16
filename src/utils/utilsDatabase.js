const { UniqueConstraintError } = require("sequelize");
const { User } = require("../database/");

exports.getDBUserById = async (id) => {
  const userRes = await User.findOne({
    where: {
      snowflake: id,
    },
  });
  if (userRes === null) throw "You have not set an API key";
  return userRes;
};

exports.deleteDBUserById = async (id) => {
  const userDel = await User.destroy({
    where: {
      snowflake: id,
    },
  });
  return userDel;
};

exports.createDBUserById = async (id, key) => {
  const userCre = await User.create({
    snowflake: id,
    apikey: key,
  }).catch((error) => {
    if (error instanceof UniqueConstraintError)
      throw "Your already have a key stored";
  });
  return userCre;
};

exports.updateDBUserById = async (id, newValue) => {
  const userUpdate = await User.update(
    { apikey: newValue },
    {
      where: {
        snowflake: id,
      },
    }
  ).catch((error) => {
    // if (error instanceof UniqueConstraintError)
    //   throw "Your already have a key stored";
    console.log(error);
  });
  return userUpdate;
};
