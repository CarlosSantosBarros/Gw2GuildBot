const fs = require("fs");

exports.findJSStartingWith_In_AndDo_ = (prefix, path, action) => {
  fs.readdirSync(path)
    .filter((file) => file.endsWith(".js"))
    .filter((file) => file.startsWith(prefix))
    .forEach((file) => action(file));
};
