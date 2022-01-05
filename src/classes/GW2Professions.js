const MenuGW2Profession = require("../menus/menuGW2Professions");
const { embedGW2Professions } = require("../embeds/embedGW2Professions");
const { embedRosterSummary } = require("../embeds/embedRosterSummary");

module.exports = class GW2Professions {
  constructor(interaction) {
    this.interaction = interaction;
    this.isApplication;
  }

  async controler(message) {
    const professionManageCollector = message.createMessageComponentCollector({
      idle: 60000,
    });

    professionManageCollector.on("end", async (collected, reason) => {
      let contentString = "done";
      if (reason == "idle") contentString = "This operation has timed out";
      this.interaction.editReply({
        components: [],
        content: contentString,
        embeds: [],
      });
    });
  }

  async menu() {
    const menu = new MenuGW2Profession(this.interaction);
    return menu.buildMenu();
  }
  async embed() {
    return await embedGW2Professions(this.interaction.member);
  }
  async roster() {
    return embedRosterSummary(this.interaction.guild);
  }
  setApplication() {
    this.isApplication = true;
  }
};
