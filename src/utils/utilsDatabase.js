const { User } = require("../database/");

exports.getDBUserById = async (id) => {
  await User.findOne({
    where: {
      snowflake: id,
    },
  }).then((res) => {
    if (res === null) throw "You have not set an API key";
    return res;
  });
};
