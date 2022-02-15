const Menu = require("./Menu");
const {
  SelectMenuWillRoleSwap,
  SelectMenuIsLegal,
  ButtonsGuildApplication,
} = require("./messageComponents/");
const EmbedGuildApplication = require("./embeds/embedGuildApplication");

module.exports = class MenuGuildApplication extends Menu {
  constructor(member, state) {
    super();
    if (state.application)
      this.components = [
        new SelectMenuIsLegal(),
        new SelectMenuWillRoleSwap(),
        new ButtonsGuildApplication(state.application),
      ];
    this.embeds = [new EmbedGuildApplication(member, state)];
  }
};
