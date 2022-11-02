const Menu = require("./Menu");
const {
  ButtonsGW2Professions,
  SelectMenuProfessions,
  SelectMenuProficiency,
} = require("./messageComponents/");
const EmbedGW2Professions = require("./embeds/embedGW2Professions");
const { MemberUtils } = require("../../utils/");

module.exports = class MenuGW2Profession extends Menu {
  /** @param {MemberUtils} member */
  constructor(member, state) {
    super();
    this.components = [
      new SelectMenuProficiency(state),
      new SelectMenuProfessions(state, member),
      new ButtonsGW2Professions(state, member),
    ];
    this.embeds = [new EmbedGW2Professions(member)];
  }
};
