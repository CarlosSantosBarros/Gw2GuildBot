const Interface = require("./Interface");
const { ModelGuildApplication } = require("./models");

module.exports = class InterfaceGuildApplication extends Interface {
  constructor() {
    super(ModelGuildApplication);
  }
  selectApplication(id) {
    this.setSelector({
      where: { applicationId: id },
    });
  }

  async accept(reason) {
    this.update({
      applicationStatus: { status: "accepted", reason: reason },
    });
  }
};
