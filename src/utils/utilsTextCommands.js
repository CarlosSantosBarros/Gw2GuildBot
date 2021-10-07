const { prefix } = require("../config.json");
const { getGuildMemberById } = require("./utilsDiscord");
/*
JUICY REFACTOR RIGHT HERE
*/
module.exports = async (message) => {
  const isValidCommand = async (commandName) => {
    const commandsCollecttion = message.client.commands;
    const command = commandsCollecttion.get(commandName);
    if (!commandsCollecttion.has(commandName))
      throw `Command: "!${commandName}" doesn't exist!`;
    const author = getGuildMemberById(message.guild, message.author.id);
    if (command.permission && !author.permissions.has(command.permission))
      throw "You don't have permission to do that";
    if (!message.guild && command.channelOnly)
      throw `This command is for text channels only`;
    return command;
  };

  const isValidTarget = async (moderationAction) => {
    const targetUser = message.mentions.users.first();
    if (!targetUser)
      throw `You need to tag a user in order to ${moderationAction} them!`;
    const targetMember = message.guild.member(targetUser);
    if (!targetMember) throw `The user isn't in this server`;
    return targetMember;
  };

  const isValidAPIKeyString = (apiKeyString) => {
    if (apiKeyString === "") throw `You did not enter a key`;
    if (apiKeyString.length != 72) throw `API key is not the correct size`;
    return apiKeyString;
  };

  const isValidArgs = async (command) => {
    const commandInputArray = message.content
      .slice(command.name.length + prefix.length)
      .split(",");
    const commandArgArray = command.args;
    if (commandInputArray.length < commandArgArray.length)
      throw `Not enough arguments \n The proper usage would be: ${prefix}${command.name} ${command.usage}`;
    const argObj = {};

    //
    // need to change arg type checking, maybe turn it into ENUM
    //

    for (let index = 0; index < commandInputArray.length; index++) {
      if (commandArgArray[index] === "member") {
        argObj.member = await isValidTarget(command.name);
        continue;
      }
      const isNumber = parseInt(commandInputArray[index].trim());
      if (commandArgArray[index] === "time" && typeof isNumber === "number") {
        argObj.time = isNumber;
        continue;
      }
      if (commandArgArray[index] === "string") {
        argObj.string = commandInputArray[index];
        continue;
      }
      // add api key validation here
      if (commandArgArray[index] === "APIKey") {
        argObj.apikey = await isValidAPIKeyString(
          commandInputArray[index].slice(1)
        );
        break;
      }

      // throw `Incorrect arguments \n\ The proper usage would be: ${prefix}${command.name} ${command.usage}`;
    }
    return argObj;
  };
  return {
    isValidCommand: isValidCommand,
    isValidTarget: isValidTarget,
    isValidArgs: isValidArgs,
  };
};
