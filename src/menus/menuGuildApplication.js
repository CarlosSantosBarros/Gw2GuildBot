const Menu = require("./Menu");
const { client } = require("../index");
const {
  SelectMenuWillRoleSwap,
  SelectMenuIsLegal,
} = require("./messageComponents/");
const EmbedGuildApplication = require("./embeds/embedGuildApplication");

module.exports = class MenuGuildApplication extends Menu {
  constructor(member) {
    super();
    this.state = client.guildAppState.get(member.user.id);
    this.components = [new SelectMenuIsLegal(), new SelectMenuWillRoleSwap()];
    this.embeds = [new EmbedGuildApplication(member.user, this.state)];
    console.log(this.state);
  }
};
