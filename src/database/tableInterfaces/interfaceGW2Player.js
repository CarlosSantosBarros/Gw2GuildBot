const Interface = require("./Interface");
const { ModelGW2Player } = require("./models");

module.exports = class InterfaceGW2Player extends Interface {
  constructor() {
    super(ModelGW2Player);
  }
};
