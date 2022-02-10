const StateGuildApplication = require("./state/StateGuildApplication");

exports.ClassGuildApplication = class extends StateGuildApplication {
  constructor(user) {
    super(user.id);
  }

  async submit(msgId) {
    const app = this.getAppState();
    this.selectApplication(msgId);
    await this.create();
    await this.update(app);
    this.removeAppState(this.userId);
  }

  async addReason(message) {
    this.getAppStatus();
    if (!this.state) return await message.delete();
    this.setApplicationReason(message.content);
  }

  // refactor - config value for default messages
  async processApplication(message, reason) {
    const app = this.getAppStatus();
    let appId = message.id;
    if (app) {
      appId = app.appId;
      reason = app.applicationStatus.reason;
      await message.delete();
    }
    this.selectApplication(appId);
    this.removeAppStatus(this.userId);
    return reason;
  }

  async accept(message) {
    const reason = await this.processApplication(message, "Met requirements");
    this.acceptApplication(reason);
    return reason;
  }

  async deny(message) {
    const reason = await this.processApplication(message, "Nope");
    this.denyApplication(reason);
    return reason;
  }

  async blackList(message) {
    const reason = await this.processApplication(message, "HELL NO");
    this.blackListApplication(reason);
    return reason;
  }
};
