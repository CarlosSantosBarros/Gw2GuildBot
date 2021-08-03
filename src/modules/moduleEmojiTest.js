const { Collection } = require("discord.js");

const actionfunc = (input) => {
  return console.log(input);
};

const squareFunct = () => actionfunc("xSquare");
const starFunct = () => actionfunc("xStar");
const circleFunct = () => actionfunc("xCircle");

const optionCollection = new Collection();
const optionCollectionArray = [
  { emoji: "870320439505866763", action: squareFunct },
  { emoji: "870320439736553472", action: starFunct },
  { emoji: "870320439732367431", action: circleFunct },
];

exports.getCollection = () => {
  optionCollectionArray.forEach((entry) => {
    optionCollection.set(entry.emoji, entry.action);
  });
  return optionCollection;
};
