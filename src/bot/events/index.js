const { fileLoader } = require("../utils");

module.exports = (client) => {
  // const loadEvent = (fileItem) => {
  //   const event = require(`./${fileItem}`);
  //   if (event.once) client.once(event.name, (...args) => event.execute(...args));
  //   else client.on(event.name, (...args) => event.execute(...args));
  //   log(`Loaded: ${event.name}`);
  // };
  // findJSStartingWith_In_AndDo_("event", __dirname, loadEvent);

  // log("Events loaded");

  const config = {
    prefix: "event",
    dirPath: __dirname,
  };

  fileLoader(config, client);
};
