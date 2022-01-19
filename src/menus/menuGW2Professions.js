const DiscordUtils = require("../utils/utilsDiscord");
const { client } = require("../index");
const {
  ButtonsGW2Professions,
  SelectMenuProfessions,
  SelectMenuProficiency,
} = require("./messageComponents/");
const EmbedGW2Professions = require("./embeds/embedGW2Professions");
const Menu = require("./Menu");

module.exports = class MenuGW2Profession extends Menu {
  constructor(member) {
    super();
    this.state = client.gw2pState.get(member.user.id);
    this.member = new DiscordUtils.MemberUtils(member);
    this.components = [
      new SelectMenuProficiency(this.state, client.proficiencyData),
      new SelectMenuProfessions(
        this.state,
        this.member,
        client.professionsData
      ),
      new ButtonsGW2Professions(this.state, this.member),
    ];
    this.embeds = [new EmbedGW2Professions(member)];
  }
};
