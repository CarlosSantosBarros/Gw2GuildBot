const Menu = require("./Menu");
const { client } = require("../index");
const {
  SelectMenuWillRoleSwap,
  SelectMenuIsLegal,
  ButtonsGuildApplication,
} = require("./messageComponents/");
const EmbedGuildApplication = require("./embeds/embedGuildApplication");
const { MemberUtils } = require("../utils");

module.exports = class MenuGuildApplication extends Menu {
  constructor(member) {
    super();
    this.state = client.guildAppState.get(member.user.id);
    this.components = [
      new SelectMenuIsLegal(),
      new SelectMenuWillRoleSwap(),
      new ButtonsGuildApplication(this.state.application),
    ];
    this.member = new MemberUtils(member);
    this.embeds = [new EmbedGuildApplication(this.member, this.state)];
    console.log(this.state);
  }
};
