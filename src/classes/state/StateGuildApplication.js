const State = require("./State");
const { isLegalMessage, willRoleSwapMessage } =
  require("../../config.json").applicationSettings;

module.exports = class StateGuildApplication extends State {
  constructor(user) {
    super(user.client.guildAppState);
    this.userId = user.id;
  }

  setAccountData(accountData, serverInfo) {
    this.setState(this.userId, {
      ...accountData,
      application: {
        ...accountData.application,
        server: serverInfo,
      },
    });
    return this.getState(this.userId);
  }

  meetsRequirement(value, message) { if (value == "No") throw { content: { text: message } }; }

  setIsLegal(value) {
    this.meetsRequirement(value, isLegalMessage);
    const currentState = this.getState(this.userId);
    this.setState(this.userId, {
      ...currentState,
      application: {
        ...currentState.application,
        isLegal: value,
      },
    });
    return this.getState(this.userId);
  }

  setWillRoleSwap(value) {
    this.meetsRequirement(value, willRoleSwapMessage);
    const currentState = this.getState(this.userId);
    this.setState(this.userId, {
      ...currentState,
      application: {
        ...currentState.application,
        willRoleSwap: value,
      },
    });
    return this.getState(this.userId);
  }

  setPersonalMessage(message) {
    const currentState = this.getState(this.userId);
    this.setState(this.userId, {
      ...currentState,
      application: {
        ...currentState.application,
        personalMessage: message,
      },
    });
  }


  getApplicationStatus(appId) { return this.getState(appId); }


  setApplicationStatus(status, appId, user) {
    this.setState(appId, {
      status: status,
      user: user
    });
  }

  setApplicationReason(reason, appId) {
    const currentState = this.getState(appId);
    this.setState(appId, {
      ...currentState,
      reason: reason
    });
  }

  removeAppStatus(appId) { this.deleteState(appId); }

};
