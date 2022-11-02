const { fileLoader } = require("../../../utils");

module.exports = async (client) => {
  // client.buttons = new Discord.Collection();

  // const loadSelectMenu = (fileItem) => {
  //   const button = require(`./${fileItem}`);
  //   log(`Loading: ${button.customId}`);
  //   client.buttons.set(button.customId, button);
  // };
  // findJSStartingWith_In_AndDo_("interactionButton", __dirname, loadSelectMenu);
  // log("Buttons loaded");

  const config = {
    prefix: "interactionButton",
    dirPath: __dirname,
  };

  client.buttons = fileLoader(config);
};
