const { fileLoader } = require("../../../utils");

module.exports = async (client) => {
  // client.selectMenus = new Discord.Collection();

  // const loadSelectMenu = (fileItem) => {
  //   const selectMenu = require(`./${fileItem}`);
  //   log(`Loading: ${selectMenu.customId}`);
  //   client.selectMenus.set(selectMenu.customId, selectMenu);
  // };
  // findJSStartingWith_In_AndDo_(
  //   "interactionSelectMenu",
  //   __dirname,
  //   loadSelectMenu
  // );
  // log("Select Menus loaded");

  const config = {
    prefix: "interactionSelectMenu",
    dirPath: __dirname,
  };

  client.selectMenus = fileLoader(config);
};
