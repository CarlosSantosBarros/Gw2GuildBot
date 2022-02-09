const StateGuildApplication = require("./state/StateGuildApplication");

exports.ClassGuildApplication = class extends StateGuildApplication {
  constructor(user) {
    super(user.id);
  }
  //

  async submit(msgId) {
    const app = this.getAppState();
    this.selectApplication(msgId);
    await this.create();
    await this.update(app);
    this.removeState(this.userId);
  }

  async onGuildText(message) {
    this.getAppStatus();
    if (!this.state) return await message.delete();
    this.setApplicationReason(message.content);
  }
  async onWhiteCheckMark(message) {
    const app = this.getAppStatus();
    let appId = message.id;
    let reason = "Met requirements";
    if (app) {
      appId = app.appId;
      reason = app.applicationStatus.reason;
      await message.delete();
    }
    this.selectApplication(appId);
    this.accept(reason);
    this.removeStatus(this.userId);
  }
};
