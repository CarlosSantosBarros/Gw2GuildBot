const { client } = require("../../index");
const { InterfaceGuildApplication } = require("../database");
module.exports = class StateGW2Profession {
  constructor(userId) {
    this.userId = userId;
    this.state;
    this.interface = new InterfaceGuildApplication();
  }

  getAppState() {
    this.state = client.guildAppState.get(this.userId);
    return this.state;
  }
  storeAppState() {
    client.guildAppState.set(this.userId, this.state);
  }
  getAppStatus() {
    this.state = client.guildAppStatus.get(this.userId);
    return this.state;
  }
  setAppStatus() {
    client.guildAppStatus.set(this.userId, this.state);
  }

  async hasOpenApplication(id) {
    this.interface.selectUser(id);
    return await this.interface.getApplication();
  }

  // AppState functions --- Start ---
  async setAccountData(accountData, serverInfo) {
    this.interface.selectUser(this.userId);
    this.getAppState();
    if (!this.state) {
      this.state = await this.interface.getApplication();
      if (!this.state) {
        await this.interface.create();
        this.state = {
          ...accountData,
          application: {
            ...accountData.application,
            server: serverInfo,
          },
        };
        await this.interface.updateAppication(this.state);
      }
      this.storeAppState();
      return this.state;
    }
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
    this.meetsRequirement(value);
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
