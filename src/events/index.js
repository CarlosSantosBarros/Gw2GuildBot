const { fileLoader } = require("../utils");

module.exports = (client) => {

  const config = {
    prefix: "event",
    dirPath: __dirname,
  };

  fileLoader(config, client);
};
