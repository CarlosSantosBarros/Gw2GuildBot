const Discord = require("discord.js");
const classDataArray = [
  {
    label: "Firebrand",
    description: "Support",
    value: "Firebrand",
    emoji: "620986123203641354",
    mentorId: "106799270820052992",
    mentorIGN: "Shizuma.8179",
    build:
      "http://gw2skills.net/editor/?PWwAYd7lRwwYfMJmJmyW6vdA-zVJYjRJ/hkpEoahQ6KANeICwW4t43mF-w",
  },
  {
    label: "Dragonhunter",
    description: "Power DPS",
    value: "Dragonhunter",
    emoji: "620986122734141471",
  },
  {
    label: "Scrapper",
    description: "Support",
    value: "Support Scrapper",
    emoji: "620986123027611658",
  },
  {
    label: "Scrapper",
    description: "Power DPS",
    value: "DPS Scrapper",
    emoji: "620986123027611658",
  },
  {
    label: "Spellbreaker",
    description: "Support",
    value: "Support Spellbreaker",
    emoji: "620986123342315521",
  },
  {
    label: "Spellbreaker",
    description: "Power DPS",
    value: "DPS Spellbreaker",
    emoji: "620986123342315521",
  },
  {
    label: "Chrono",
    description: "Support",
    value: "Chrono Spellbreaker",
    emoji: "620986123103240222",
  },
  {
    label: "Herald",
    description: "Power DPS",
    value: "Herald",
    emoji: "620986122977411083",
  },
  {
    label: "Scourge",
    description: "Power DPS",
    value: "Scourge",
    emoji: "620986123111497738",
  },
];

exports.classDataCollection = () => {
  const collectionObject = new Discord.Collection();
  classDataArray.forEach((entry) => {
    collectionObject.set(entry.value, entry);
  });
  return collectionObject;
};

exports.buttonData = [
  { customId: "add", label: "Add", style: "PRIMARY", disabled: true },
  { customId: "remove", label: "Remove", style: "PRIMARY", disabled: true },
  {
    customId: "done",
    label: "Done",
    style: "SUCCESS",
    emoji: "870320857837346887",
  },
];
