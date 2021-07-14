const fs = require("fs");
const {
  getGuildById,
  getGuildMemberById,
  getRoleByName,
  log,
} = require("../utils/utilsDiscord");
// cnst { User } = require("../database/");

module.exports = async (client) => {
  log(`Logged in as ${client.user.tag}!`);
  log(`I serve "${client.guilds.cache.size}" servers.`);

  //
  // THIS NEEDS TO BE REPLACED WITH A COLLECTION OR A DATABASE CALL OR BOTH
  //

  client.moderatedList = require("../data/moderationList.json");
  // start timer
  // checks every xtime for expired moderation

  // Every 5 seconds check the "moderationList.json" file to see when a users mute is up
  setInterval(async () => {
    if (JSON.stringify(client.moderatedList) === "{}") return;

    //loop through list
    for (const index in client.moderatedList) {
      const time = client.moderatedList[index].time;
      //if the moderation has expired
      if (Date.now() > time) {
        //get the guild to act on
        const guild = await getGuildById(
          client,
          client.moderatedList[index].guild
        );
        //get the type of action
        const type = client.moderatedList[index].type;
        if (type === "ban") await guild.members.unban(index);
        if (type === "mute") {
          const member = await getGuildMemberById(guild, index);
          console.log(index);
          const mutedRole = await getRoleByName(guild.roles, "Muted");
          await member.roles.remove(mutedRole);
        }
        delete client.moderatedList[index];
        fs.writeFile(
          "./src/modules/commands/moderation/moderationList.json",
          JSON.stringify(client.moderatedList),
          "utf8",
          (err) => {
            if (err) throw err;
            console.log("The file has been saved!");
          }
        );
      }
    }
  }, 60000);
};
