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

  updateStatus(status, reason) {
    this.update({
      applicationStatus: { status: status, reason: reason },
    });
  }

  async acceptApplication(reason) {
    this.updateStatus("accepted", reason);
  }

  async denyApplication(reason) {
    this.updateStatus("denied", reason);
  }

  async blackListApplication(reason) {
    this.updateStatus("blacklisted", reason);
  }
};
