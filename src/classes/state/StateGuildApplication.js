const { client } = require("../../index");
const { InterfaceGuildApplication } = require("../database");
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
  getAppStatus() {
    this.state = client.guildAppStatus.get(this.userId);
    return this.state;
  }

  // AppState functions --- Start ---
  setAccountData(accountData, serverInfo) {
    const newState = {
      ...accountData,
      application: {
        ...accountData.application,
        server: serverInfo,
      },
    };
    client.guildAppState.set(this.userId, newState);
    return newState;
  }
  // Refactor - move message to config
  meetsRequirement(value) {
    if (value == "No")
      throw {
        content: {
          text: `Unfortunately this is a requirement to join the guild.
Failure to meet this criteria means you have been unsuccessful in your application.
Feel free to reapply if/when the circumstances change`,
        },
      };
  }
  selectIsLegal(value) {
    this.meetsRequirement(value);
    this.getAppState();
    const newState = {
      ...this.state,
      application: {
        ...this.state.application,
        isLegal: value,
      },
    };
    client.guildAppState.set(this.userId, newState);
    return newState;
  }

  selectWillRoleSwap(value) {
    this.meetsRequirement(value);
    this.getAppState();
    const newState = {
      ...this.state,
      application: {
        ...this.state.application,
        willRoleSwap: value,
      },
    };
    client.guildAppState.set(this.userId, newState);
    return newState;
  }

  async setHasDoneProfs() {
    this.getAppState();
    const newState = {
      ...this.state,
      application: {
        ...this.state.application,
        hasDoneProfs: true,
      },
    };
    client.guildAppState.set(this.userId, newState);
    return newState;
  }

  hasDoneProfs() {
    // refactor - ternery operator?
    this.getAppState();
    if (!this.state.application) return false;
    return this.state.application.hasDoneProfs;
  }

  setPersonalMessage(message) {
    this.getAppState();
    const newState = {
      ...this.state,
      application: {
        ...this.state.application,
        personalMessage: message,
      },
    };
    client.guildAppState.set(this.userId, newState);
    return newState;
  }

  removeAppState(id) {
    client.guildAppState.delete(id);
  }
  // AppState functions --- End ---

  // AppStatus functions --- Start ---
  // refactor - bad name
  toggleApplicationReason(applicationId) {
    client.guildAppStatus.set(this.userId, {
      appId: applicationId,
    });
  }

  setApplicationReason(message) {
    client.guildAppStatus.set(this.userId, {
      ...this.state,
      applicationStatus: { reason: message },
    });
  }

  removeAppStatus(id) {
    client.guildAppStatus.delete(id);
  }
  // AppStatus functions --- End ---
};
