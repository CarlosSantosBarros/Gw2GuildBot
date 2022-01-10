const { embedGuildApplication } = require("../embeds/embedGuildApplication");
const { menuYesNo } = require("../menus/menuYesNo");
const {
  menuIsLegal,
  menuWillRoleSwap,
} = require("../menus/menuGuildApplication");
const { getWorld } = require("../utils/utilsGw2API");

module.exports = class GuildApplication {
  constructor(id) {
    this.id = id;
    this.accountInfo;
    this.applicationData = { snowflake: this.id };
  }

  menuShouldStart() {
    return menuYesNo();
  }

  controler(message) {
    const collector = message.channel.createMessageComponentCollector();
    collector.on("collect", async (collected) => {
      console.log(this.applicationData);
      let embedApplication;
      let updateString;
      let menu;
      if (collected.isButton()) {
        if (collected.customId == "yes") {
          const serverInfo = await getWorld(this.applicationData.server);
          this.applicationData = {
            ...this.applicationData,
            server: serverInfo,
          };
          embedApplication = await embedGuildApplication(
            collected.user,
            this.applicationData
          );
          message.edit({ components: [] });
          menu = menuIsLegal();
          return collected.reply({
            components: menu,
            embeds: [embedApplication],
          });
        }
        collector.stop("notApplying");
      }
      if (collected.isSelectMenu()) {
        if (collected.customId == "isLegal") {
          this.applicationData = {
            ...this.applicationData,
            isLegal: collected.values[0],
          };
          menu = menuWillRoleSwap();
        }
        if (collected.customId == "willRoleSwap") {
          this.applicationData = {
            ...this.applicationData,
            willRoleSwap: collected.values[0],
          };
          menu = [];
        }
        embedApplication = await embedGuildApplication(
          collected.user,
          this.applicationData
        );
        updateString = {
          components: menu,
          embeds: [embedApplication],
        };
        if (collected.values[0] == "No")
          updateString = {
            content:
              // eslint-disable-next-line max-len
              "Unfortunately this is a requirement to join the guild. Failure to meet this criteria means you have been unsuccessful in your application. Feel free to reapply if/when the circumstances change",
            components: [],
            embeds: [],
          };
        collected.update(updateString);
      }
    });
    collector.on("end", async (collected, reason) => {
      if (reason == "personalMessage")
        this.currentInteraction.update({
          content:
            // eslint-disable-next-line max-len
            "In no more than 2000 charecters, tell us anymore information that you want us to know. (Play style, experience, what you look for, irl info or something about yourself).",
          embeds: [],
        });
      if (reason == "notApplying")
        message.edit({
          content: "If you change your mind in the future just verify again!",
          components: [],
        });
    });
  }
  setAccountInf(accountInfo) {
    this.applicationData = { ...this.applicationData, ...accountInfo };
  }
};
