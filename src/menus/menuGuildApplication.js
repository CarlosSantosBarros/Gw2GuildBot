const Menu = require("./Menu");
const {
  SelectMenuWillRoleSwap,
  SelectMenuIsLegal,
  ButtonsGuildApplication,
} = require("./messageComponents/");
const EmbedGuildApplication = require("./embeds/embedGuildApplication");
const { MemberUtils } = require("../utils");

module.exports = class MenuGuildApplication extends Menu {
  /**
   * @param {import("discord.js").GuildMember} member
   */
  constructor(member, state) {
    super();
    this.components = [
      new SelectMenuIsLegal(),
      new SelectMenuWillRoleSwap(),
      new ButtonsGuildApplication(state.application),
    ];
    this.member = new MemberUtils(member);
    this.embeds = [new EmbedGuildApplication(this.member, state)];
    console.log(state);
  }
};
