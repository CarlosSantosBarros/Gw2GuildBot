const Interface = require("./Interface");
const { modelGuildApplication } = require("./models");

module.exports = class InterfaceGuildApplication extends Interface {
  constructor() {
    super(modelGuildApplication);
  }
};
