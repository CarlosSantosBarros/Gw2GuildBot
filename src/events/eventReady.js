const { log, isVerifiedMember } = require("../utils/utils");
const Discord = require("discord.js");
const { format, isMonday, isThursday, isTuesday } = require("date-fns");
const { roleMention } = require("@discordjs/builders");
const { createCollection } = require("../utils/utils");
const { professionsSettings, guildSettings } = require("../config.json");
const { getGW2GuildLog } = require("../utils/utilsGw2API");
const { ServerUtils, MemberUtils } = require("../utils");
const { InterfaceGW2Player } = require("../classes/database");
const fs = require("fs");
const EmbedRosterSummary = require("../classes/menus/embeds/embedRosterSummary");

module.exports = {
  name: "ready",
  once: true,
  /**
   * @param {import('../classes/ClassClientWrapper').ClientWrapper} client
   */
  async execute(client) {
    log(`Logged in as ${client.user.tag}!`);
    log(`I serve "${client.guilds.cache.size}" servers.`);
    require("../slashCommands/index")(client);
    require("./interactions/selectMenus/index")(client);
    require("./interactions/buttons/index")(client);
    require("../events/reactions/index")(client);
    require("./channelTypes/index")(client);
    client.professionsData = new Discord.Collection();
    client.proficiencyData = new Discord.Collection();
    client.gw2pState = new Discord.Collection();
    client.guildAppState = new Discord.Collection();
    client.guildAppStatus = new Discord.Collection();
    const { professionsData, proficiencyData } = professionsSettings;
    createCollection(client.professionsData, professionsData);
    log("Profession data loaded");
    createCollection(client.proficiencyData, proficiencyData);
    log("Role data loaded");
    const server = new ServerUtils();

    setInterval(() => {
      const date = new Date();
      const time = format(date, "HHmm");
      if (time == "1645") {
        let channelName;
        let message;
        if (isMonday(date) || isThursday(date)) {
          channelName = "rally_call";
          message = ": Guild WvW Raid starts in 1h!";
        }
        if (isTuesday(date)) {
          channelName = "chao_chat";
          message = ": Guild meeting in 1h! Duration 30 min MAX.";
        }
        if (channelName == null) return;

        const announcementChannel = server.getChannelByNameAndType(
          channelName,
          "GUILD_TEXT"
        );
        if (!announcementChannel) console.log(`${channelName} does not exist`);
        announcementChannel.send({
          content: roleMention(guildSettings.memberRole) + message,
        });
      }
    }, 60000);

    const intervalTime = guildSettings.scyncTimerInMins * 60000;
    setInterval(async () => {
      const { rosterSummaryChannel, rosterSummaryMsg } = guildSettings;
      const summaryChan = server.getChannelById(rosterSummaryChannel);
      if (summaryChan) {
        const summaryMessage = await summaryChan.messages.fetch(
          rosterSummaryMsg
        );
        if (summaryMessage) {
          const summaryEmbed = new EmbedRosterSummary();
          summaryMessage.edit({ embeds: [summaryEmbed] });
        }
      }
      try {
        console.log("Checking guild log for new events");
        const path = "/scyncLog.json";
        const readData = fs.readFileSync(__dirname + path, "utf8");
        const json = JSON.parse(readData);
        const guildLog = await getGW2GuildLog(json.lastId);
        if (guildLog.length === 0) console.log("No new guild events");
        else {
          guildLog.reverse().forEach(async (entry) => {
            if (entry.type == "joined") {
              const member = await isVerifiedMember(entry.user);
              if (!member) return;

              await member.addMemberRole();
              await member.addRecruitRole();
              console.log(
                `${entry.user} Joined guild, i have given them roles`
              );
            } else if (entry.type == "rank_change") {
              const member = await isVerifiedMember(entry.user);
              if (!member) return;

              const oldRank = server.getGw2RankByName(entry.old_rank);
              const newRank = server.getGw2RankByName(entry.new_rank);
              await member.replaceRoleWith(oldRank.id, newRank.id);
              console.log(`${entry.user} has had roles changed`);
            } else if (entry.type == "kick") {
              const member = await isVerifiedMember(entry.user);
              if (!member) return;

              await member.roles.remove(member.roles.cache);
              console.log(`${entry.user} Left guild, i have removed roles`);
            }
          });

          const lastItem = guildLog[guildLog.length - 1];
          const item = {
            lastId: lastItem.id,
          };
          const writeData = JSON.stringify(item);
          fs.writeFile(__dirname + path, writeData, "utf8", (err) => {
            if (err) console.log(`Error writing file: ${err}`);
            else console.log(`File is written successfully!`);
          });
        }
      } catch (err) {
        console.log(`Error reading file from disk: ${err}`);
      }
    }, intervalTime);
  },
};
