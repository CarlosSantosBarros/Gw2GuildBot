const { format } = require("date-fns");
const { logging } = require("../config.json");
const { IsSuccessLogging, IsFailureLogging } = logging;
const fs = require("fs");

// terrible name, call this something else
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

exports.createCollection = (collection, data) => {
  data.forEach((entry) => {
    collection.set(entry.value, entry);
  });
};
