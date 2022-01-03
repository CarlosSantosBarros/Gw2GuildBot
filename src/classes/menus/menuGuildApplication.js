const { MessageActionRow } = require("discord.js");
const { SelectMenu } = require("./messageComponents");

const dataIsLegal = [
  {
    label: "Yes",
    description: "Yes I am 18 or older",
    value: "Yes",
  },
  {
    label: "No",
    description: "No I am younger than 18",
    value: "No",
  },
];

const dataWillRoleSwap = [
  {
    label: "Yes",
    description: "Yes I'm willing to roleswap",
    value: "Yes",
  },
  {
    label: "No",
    description: "No I'm not willing to roleswap",
    value: "No",
  },
];

exports.menuIsLegal = () => {
  return [
    new MessageActionRow().addComponents(
      new SelectMenu({
          customId: "isLegal",
          placeholder: "Are you 18 or older?",
        },
        dataIsLegal,
        null
      )
    ),
  ];
};

exports.menuWillRoleSwap = () => {
  return [
    new MessageActionRow().addComponents(
      new SelectMenu({
          customId: "willRoleSwap",
          placeholder: "Are you willing to play other classes or builds?",
        },
        dataWillRoleSwap,
        null
      )
    ),
  ];
};
