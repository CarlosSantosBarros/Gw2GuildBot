// refactor - maybe make some sort link with state?
module.exports = class Menu {
  constructor() {
    this.components;
    this.embeds;
  }
  getEmbeds() {
    return this.embeds;
  }
  getComponents() {
    return this.components;
  }
};
