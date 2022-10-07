module.exports = class Menu {
  constructor() {
    this.components = undefined;
    this.embeds = undefined;
  }
  getEmbeds() {
    return this.embeds;
  }
  getComponents() {
    return this.components;
  }
};
