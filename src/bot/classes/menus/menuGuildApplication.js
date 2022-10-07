const Menu = require("./Menu");
const {
  SelectMenuWillRoleSwap,
  SelectMenuIsLegal,
  ButtonsGuildApplication,
  ButtonsGuildApplicationProcess,
} = require("./messageComponents/");
const EmbedGuildApplication = require("./embeds/embedGuildApplication");

module.exports = class MenuGuildApplication extends Menu {
  constructor(member, state) {
    super();
    if (state.application) {
      let components = [
        new SelectMenuIsLegal(),
        new SelectMenuWillRoleSwap(),
        new ButtonsGuildApplication(state.application),
      ];
      if (state.application.personalMessage)
        components = [new ButtonsGuildApplicationProcess()];
      this.components = components;
    }
    this.embeds = [new EmbedGuildApplication(member, state)];
  }
};
