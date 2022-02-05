const Menu = require("./Menu");
const { client } = require("../index");
const { MemberUtils } = require("../utils/");
const {
  ButtonsGW2Professions,
  SelectMenuProfessions,
  SelectMenuProficiency,
} = require("./messageComponents/");
const EmbedGW2Professions = require("./embeds/embedGW2Professions");

module.exports = class MenuGW2Profession extends Menu {
  constructor(member, state) {
    super();
    this.member = new MemberUtils(member);
    this.components = [
      new SelectMenuProficiency(state, client.proficiencyData),
      new SelectMenuProfessions(state, this.member, client.professionsData),
      new ButtonsGW2Professions(state, this.member),
    ];
    this.embeds = [new EmbedGW2Professions(this.member)];
  }
};
