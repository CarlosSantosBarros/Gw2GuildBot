const Discord = require("discord.js");
const { createCommandData } = require("../utils/utilsSlashCommands");
const path = require("path");
// const { getCharacters } = require("../utils/utilsGw2API");
// const { getDBGW2PlayerById } = require("../utils/utilsDatabase");

const subpath = path.join(__dirname, "./commandGW2Class/");
const subCollection = new Discord.Collection();
const commandConfig = {
  subfolder: subpath,
  name: "gw2class",
  description: "Guildwars 2 class commands",
  subCommandCollection: subCollection,
};

const commandData = createCommandData(commandConfig);

module.exports = {
  data: commandData,
  async execute(interaction) {
    await subCollection
      .get(interaction.options.getSubcommand())
      .execute(interaction);
  },
};
