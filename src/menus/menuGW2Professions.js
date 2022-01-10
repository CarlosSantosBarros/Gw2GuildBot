const DiscordUtils = require("../utils/utilsDiscord");
const {
  ButtonsGW2Professions,
  SelectMenuProfessions,
  SelectMenuProficiency,
} = require("./messageComponents/");
const EmbedGW2Professions = require("./embeds/embedGW2Professions");
const Menu = require("./Menu");

module.exports = class MenuGW2Profession extends Menu {
  constructor(interaction) {
    super();
    this.interaction = interaction;
    this.availableProfessions = interaction.client.professionsData;
    this.menuState = this.interaction.client.gw2pState.get(
      this.interaction.user.id
    );
    this.proficiency = this.menuState ? this.menuState.proficiency : null;
    this.profession = this.menuState ? this.menuState.profession : null;
    this.memberUtils = new DiscordUtils.MemberUtils(this.interaction.member);
    this.components = [
      new SelectMenuProficiency(
        this.proficiency,
        this.interaction.client.proficiencyData
      ),
      new SelectMenuProfessions(
        this.proficiency,
        this.profession,
        this.memberUtils,
        this.availableProfessions
      ),
      new ButtonsGW2Professions(
        this.proficiency,
        this.profession,
        this.memberUtils
      ),
    ];
    this.embeds = [new EmbedGW2Professions(this.interaction.member)];
  }
};
