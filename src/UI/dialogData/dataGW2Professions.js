const Discord = require("discord.js");

(exports.dataProficiency = [
  {
    label: "Main",
    description: "This is the class you play the most",
    value: "main",
  },
  {
    label: "Alternative",
    description: "These are your next most played classes",
    value: "alt",
  },
  {
    label: "Learner",
    description: "These are classes you are learning",
    value: "learn",
  },
]),
  (exports.dataGW2Professions = [
    {
      label: "Firebrand",
      description: "Support",
      value: "Firebrand",
      emoji: "620986123203641354",
      mentors: [{ mentorId: "106799270820052992", mentorIGN: "Shizuma.8179" }],
      build:
        "http://gw2skills.net/editor/?PWwAYd7lRwwYfMJmJmyW6vdA-zVJYjRJ/hkpEoahQ6KANeICwW4t43mF-w",
    },
    {
      label: "Dragonhunter",
      description: "Power DPS",
      value: "Dragonhunter",
      emoji: "620986122734141471",
      mentors: [{ mentorId: "106799270820052992", mentorIGN: "Shizuma.8179" }],
      build:
        "http://en.gw2skills.net/editor/?PWwAYt7lFwQYOsG2IO0L+tUA-zVJYiRNfh0TI0UCURFY7FIg9wbR/ZA-w",
    },
    {
      label: "Scrapper",
      description: "Support",
      value: "Support-Scrapper",
      emoji: "620986123027611658",
      mentors: [
        { mentorId: "341313381950816257", mentorIGN: "Lynce.2935" },
        { mentorId: "610486169855066123", mentorIGN: "Cherullann.5149" },
      ],
      build:
        "http://gw2skills.net/editor/?PeQAIlNweYOMP2Je0TntSA-zVJYjRBfZkZBUdC47BJU2AvF/2sA-w",
    },
    {
      label: "Scrapper",
      description: "Power DPS",
      value: "DPS-Scrapper",
      emoji: "620986123027611658",
      mentors: [
        { mentorId: "103109623006924800", mentorIGN: "MandatoryManeiac.3207" },
        { mentorId: "154656450965143552", mentorIGN: "Fulco.6920" },
      ],
      build:
        "http://en.gw2skills.net/editor/?PegAIJlRUwgYcsN2JO2LvteA-zVJYiRFfh0UYUbBURGY7FJM6to/ZE-w",
    },
    // {
    //   label: "Spellbreaker",
    //   description: "Support",
    //   value: "Support-Spellbreaker",
    //   emoji: "620986123342315521",
    //   mentors: [
    //     { mentorId: "314633700006690818", mentorIGN: "lordkrall.7241" },
    //     { mentorId: "151334112731463680", mentorIGN: "MaaZe.2893" },
    //   ],
    //   build:
    //     "http://gw2skills.net/editor/?PWwAYd7lRwwYfMJmJmyW6vdA-zVJYjRJ/hkpEoahQ6KANeICwW4t43mF-w",
    // },
    {
      label: "Spellbreaker",
      description: "Power DPS",
      value: "DPS-Spellbreaker",
      emoji: "620986123342315521",
      mentors: [{ mentorId: "151334112731463680", mentorIGN: "MaaZe.2893" }],
      build:
        "http://gw2skills.net/editor/?PWwAYd7lRwwYfMJmJmyW6vdA-zVJYjRJ/hkpEoahQ6KANeICwW4t43mF-w",
    },
    {
      label: "Chrono",
      description: "Support",
      value: "Chrono",
      emoji: "620986123103240222",
      mentors: [{ mentorId: "106799270820052992", mentorIGN: "Shizuma.8179" }],
      build:
        "http://gw2skills.net/editor/?PWwAYd7lRwwYfMJmJmyW6vdA-zVJYjRJ/hkpEoahQ6KANeICwW4t43mF-w",
    },
    {
      label: "Herald",
      description: "Power DPS",
      value: "Herald",
      emoji: "620986122977411083",
      mentors: [{ mentorId: "224952859379105793", mentorIGN: "Hmmmzz.8190" }],
      build:
        "http://gw2skills.net/editor/?PWwAYd7lRwwYfMJmJmyW6vdA-zVJYjRJ/hkpEoahQ6KANeICwW4t43mF-w",
    },
    {
      label: "Scourge",
      description: "Power DPS",
      value: "Scourge",
      emoji: "620986123111497738",
      mentors: [{ mentorId: "150985163873058816", mentorIGN: "Andeleon.1754" }],
      build:
        "http://gw2skills.net/editor/?PWwAYd7lRwwYfMJmJmyW6vdA-zVJYjRJ/hkpEoahQ6KANeICwW4t43mF-w",
    },
  ]);

exports.collectionGW2Professions = () => {
  const collectionObject = new Discord.Collection();
  this.dataGW2Professions.forEach((entry) => {
    collectionObject.set(entry.value, entry);
  });
  return collectionObject;
};
