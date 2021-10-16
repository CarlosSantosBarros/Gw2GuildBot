const { format } = require("date-fns");
const { logging } = require("../config.json");
const { IsSuccessLogging, IsFailureLogging } = logging;
const fs = require("fs");

// terrible name, call this some thing else
exports.findJSStartingWith_In_AndDo_ = (prefix, path, action) => {
  fs.readdirSync(path)
    .filter((file) => file.endsWith(".js"))
    .filter((file) => file.startsWith(prefix))
    .forEach((file) => action(file));
};

exports.removeFromArray = (array, string) => {
  const isNotString = (item) => {
    return item !== string;
  };
  return array.filter(isNotString);
};

exports.log = (message) => {
  const dateString = format(new Date(), "PPPppp");
  if (IsSuccessLogging) console.log(`[${dateString}] ${message}`);

  if (IsFailureLogging) console.log(`[${dateString}] ${message}`);
};

exports.isValidLogChannel = async (channels, logChannel) => {
  let channelToSendLog = await this.getChannelObj(channels, logChannel, "text");
  if (!channelToSendLog)
    channelToSendLog = await channels.create(logChannel, {
      type: "text",
    });

  return channelToSendLog;
};
