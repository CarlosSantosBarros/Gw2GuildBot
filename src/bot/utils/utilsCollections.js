const { Collection } = require("discord.js");
const { professionsSettings } = require("../../config.json");
const professionsData = new Collection(professionsSettings.professionsData);
const proficiencyData = new Collection(professionsSettings.proficiencyData);
module.exports = { professionsData, proficiencyData };
