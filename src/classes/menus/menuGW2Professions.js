const Menu = require("./Menu");
const { client } = require("../../index");
const {
  ButtonsGW2Professions,
  SelectMenuProfessions,
  SelectMenuProficiency,
} = require("./messageComponents/");
const EmbedGW2Professions = require("./embeds/embedGW2Professions");

module.exports = class MenuGW2Profession extends Menu {
  constructor(member, state) {
    super();
    this.components = [
      new SelectMenuProficiency(state, client.proficiencyData),
      new SelectMenuProfessions(state, member, client.professionsData),
      new ButtonsGW2Professions(state, member),
    ];
    this.embeds = [new EmbedGW2Professions(member)];
  }
};
