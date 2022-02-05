const { client } = require("../../index");
module.exports = class StateGW2Profession {
  constructor(userId) {
    this.userId = userId;
    this.state = client.gw2pState.get(this.userId);
  }
  getState() {
    return client.gw2pState.get(this.userId);
  }
  selectProficiency(value) {
    const object = client.proficiencyData.get(value);
    const newState = {
      ...this.state,
      proficiency: object,
    };
    client.gw2pState.set(this.userId, newState);
    return newState;
  }

  selectProfession(value) {
    const newState = {
      ...this.state,
      profession: value,
    };
    client.gw2pState.set(this.userId, newState);
    return newState;
  }

  async setEmptyState() {
    const newState = {
      profession: null,
      proficiency: null,
    };
    client.gw2pState.set(this.userId, newState);
    return newState;
  }
  finishSelection() {
    client.gw2pState.delete(this.userId);
  }
};
