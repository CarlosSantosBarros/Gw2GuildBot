const Interface = require("./Interface");
const { ModelGuildApplication } = require("./models");

module.exports = class InterfaceGuildApplication extends Interface {
  constructor() {
    super(ModelGuildApplication);
  }
  selectApplication(id) {
    this.setSelector({ where: { applicationId: id }, });
  }

  async updateStatus(applicationStatusData) {
    return await this.update({ applicationStatus: applicationStatusData, });
  }

  async getApplication() { return await this.get(); }
};
