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

  async updateStatus(status, reason, username) {
    await this.update({
      applicationStatus: { status: status, reason: reason, user: username },
    });
  }

  async getApplication() {
    return await this.get();
  }
};
