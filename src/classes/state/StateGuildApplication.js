const { client } = require("../../index");
const { InterfaceGuildApplication } = require("../database");
const { isLegalMessage, willRoleSwapMessage } =
  require("../../config.json").applicationSettings;
module.exports = class StateGW2Profession extends InterfaceGuildApplication {
  constructor(userId) {
    super();
    this.userId = userId;
    this.state;
  }

  getAppState() {
    this.state = client.guildAppState.get(this.userId);
    return this.state;
  }
  setAppState() {
    client.guildAppState.set(this.userId, this.state);
  }
  getAppStatus() {
    this.state = client.guildAppStatus.get(this.userId);
    return this.state;
  }
  setAppStatus() {
    client.guildAppStatus.set(this.userId, this.state);
  }

  // AppState functions --- Start ---
  setAccountData(accountData, serverInfo) {
    this.state = {
      ...accountData,
      application: {
        ...accountData.application,
        server: serverInfo,
      },
    };
    this.setAppState();
  }

  meetsRequirement(value, message) {
    if (value == "No") throw { content: { text: message } };
  }

  selectIsLegal(value) {
    this.meetsRequirement(value, isLegalMessage);
    this.getAppState();
    this.state = {
      ...this.state,
      application: {
        ...this.state.application,
        isLegal: value,
      },
    };
    this.setAppState();
  }

  selectWillRoleSwap(value) {
    this.meetsRequirement(value, willRoleSwapMessage);
    this.getAppState();
    this.state = {
      ...this.state,
      application: {
        ...this.state.application,
        willRoleSwap: value,
      },
    };
    this.setAppState();
  }

  async setHasDoneProfs() {
    this.getAppState();
    this.state = {
      ...this.state,
      application: {
        ...this.state.application,
        hasDoneProfs: true,
      },
    };
    this.setAppState();
  }

  hasDoneProfs() {
    // refactor - ternery operator?
    this.getAppState();
    if (!this.state.application) return false;
    return this.state.application.hasDoneProfs;
  }

  setPersonalMessage(message) {
    this.getAppState();
    this.state = {
      ...this.state,
      application: {
        ...this.state.application,
        personalMessage: message,
      },
    };
    this.setAppState();
  }

  removeAppState(id) {
    client.guildAppState.delete(id);
  }
  // AppState functions --- End ---

  // AppStatus functions --- Start ---
  // refactor - bad name
  toggleApplicationReason(applicationId) {
    this.state = {
      appId: applicationId,
    };
    this.setAppStatus();
  }

  setApplicationReason(message) {
    this.state = {
      ...this.state,
      applicationStatus: { reason: message },
    };
    this.setAppStatus();
  }

  removeAppStatus(id) {
    client.guildAppStatus.delete(id);
  }
  // AppStatus functions --- End ---
};
