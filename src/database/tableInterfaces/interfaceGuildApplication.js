const Interface = require("./Interface");
const { ModelGuildApplication } = require("./models");

module.exports = class InterfaceGuildApplication extends Interface {
  constructor() {
    super(ModelGuildApplication);
  }
};
