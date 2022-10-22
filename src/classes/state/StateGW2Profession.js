const { proficiencyData } = require("../../utils/utilsCollections");
const State = require("./State");

/**
 * @typedef ProfessionSelection
 * @type {object}
 * @property {object} proficiency
 * @property {string} profession
 */


/**
 * @class
 * @extends {State}
 */
module.exports = class StateGW2Profession extends State {
  constructor(user) {
    super(user.client.gw2pState);
    this.userId = user.userId;
    // init proficiencyDara collection
  }

  setProficiency(value) {
    const object = proficiencyData.get(value);
    const currentState = this.getState(this.userId);
    this.setState(this.userId, {
      ...currentState,
      proficiency: object,
    });
  }

  setProfession(value) {
    const currentState = this.getState(this.userId);
    this.setState(this.userId, {
      ...currentState,
      profession: value,
    });
  }

  setEmptyState() {
    this.setState(this.userId, {
      profession: "",
      proficiency: null,
    });
  }

  deleteSelection() {
    // @ts-ignore
    this.state.delete(this.userId);
  }
  /**
   * @returns {ProfessionSelection} ProfessionSelection
   */
  getSelection() {
    let selection = this.getState(this.userId);
    if (!selection) selection = {
      profession: "",
      proficiency: null,
    };
    return selection;
  }
};
