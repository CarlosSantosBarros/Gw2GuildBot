const { prefix } = require("../config.json");
const { isValidAPIKey } = require("./utilsGw2API");

module.exports = async (message) => {
  const isValidCommand = async (commandName) => {
    const commandsCollecttion = message.client.commands;
    const command = commandsCollecttion.get(commandName);
    const hasPermissionOptions = {
      checkAdmin: true,
      checkOwner: true,
    };
    if (!commandsCollecttion.has(commandName))
      throw `Command: "!${commandName}" doesn't exist!`;
    const author = message.guild.member(message.author);
    if (
      command.permission &&
      !author.hasPermission(command.permission, hasPermissionOptions)
    )
      throw "You don't have permission to do that";
    if (!message.guild && command.channelOnly)
      throw `This command is for text channels only`;
    return command;
  };

  const isValidTarget = async (modName) => {
    const targetUser = message.mentions.users.first();
    const targetMember = message.guild.member(targetUser);
    if (!targetUser)
      throw `You need to tag a user in order to ${modName} them!`;
    if (!targetMember) throw `The user isn't in this server`;
    return targetMember;
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

    //
    // REMOVE WHITE SPACE FROM BEGINING OF STRING
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
        argObj.apikey = await isValidAPIKey(commandInputArray[index].slice(1));
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
