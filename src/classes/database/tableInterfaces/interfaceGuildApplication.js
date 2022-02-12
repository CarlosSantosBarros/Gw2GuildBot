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

  async updateStatus(status, reason) {
    const updateString = {
      applicationStatus: { status: status, reason: reason },
    };
    await this.update(updateString);
    return updateString;
  }

  async getApplication() {
    return await this.get();
  }
};
