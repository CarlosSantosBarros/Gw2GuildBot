// Refactor - Not sure about this, its not broken but risky

const { Client, Intents, Collection } = require("discord.js");
const clientIntents = new Intents();
// move intents to config file
clientIntents.add(
  Intents.FLAGS.GUILDS,
  Intents.FLAGS.GUILD_PRESENCES,
  Intents.FLAGS.GUILD_MEMBERS,
  Intents.FLAGS.GUILD_BANS,
  Intents.FLAGS.GUILD_MESSAGES,
  Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
  Intents.FLAGS.DIRECT_MESSAGES,
  Intents.FLAGS.DIRECT_MESSAGE_REACTIONS
);

/**
 * @typedef {object} Wrapper
 * @property {Collection} [professionsData] - Professions Data
 * @property {Collection} [proficiencyData] - Proficiency Data
 * @property {Collection} [gw2pState] - GW2 Profession State
 * @property {Collection} [guildAppState] - Guild Application State
 * @property {Collection} [guildAppStatus] - Guild Application Status
 */

/**
 * @type {Wrapper}
 * @extends {Client} Base Client
 */

exports.ClientWrapper = class extends Client {
  constructor() {
    super({
      intents: clientIntents,
      partials: ["MESSAGE", "CHANNEL", "REACTION"],
    });
    this.professionsData = new Collection();
    this.proficiencyData = new Collection();
    this.gw2pState = new Collection();
    this.guildAppState = new Collection();
    this.guildAppStatus = new Collection();
  }
};
