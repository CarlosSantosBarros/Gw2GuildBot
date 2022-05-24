const { client } = require("../../index");
module.exports = class StateGW2Profession {
  constructor(userId) {
    this.userId = userId;
    // @ts-ignore
    this.state = client.gw2pState.get(this.userId);
  }
  setState() {
    // @ts-ignore
    client.gw2pState.set(this.userId, this.state);
  }
  getState() {
    // @ts-ignore
    return client.gw2pState.get(this.userId);
  }
  selectProficiency(value) {
    // @ts-ignore
    const object = client.proficiencyData.get(value);
    this.state = {
      ...this.state,
      proficiency: object,
    };
    this.setState();
  }

  selectProfession(value) {
    this.state = {
      ...this.state,
      profession: value,
    };
    this.setState();
  }

  async setEmptyState() {
    this.state = {
      profession: null,
      proficiency: null,
    };
    this.setState();
  }
  finishSelection() {
    // @ts-ignore
    client.gw2pState.delete(this.userId);
  }
};
