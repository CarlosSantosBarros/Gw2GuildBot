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
  selectUser(id) {
    this.setSelector({
      where: {
        snowflake: id,
        applicationStatus: null,
      },
    });
  }

  async updateStatus(status, reason) {
    await this.update({
      applicationStatus: { status: status, reason: reason },
    });
  }

  async updateAppication(application) {
    await this.update(application);
  }

  async getApplication() {
    return await this.get();
  }
};
