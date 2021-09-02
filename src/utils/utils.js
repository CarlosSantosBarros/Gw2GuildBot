const fs = require("fs");

// terrible name, call this some thing else
exports.findJSStartingWith_In_AndDo_ = (prefix, path, action) => {
  fs.readdirSync(path)
    .filter((file) => file.endsWith(".js"))
    .filter((file) => file.startsWith(prefix))
    .forEach((file) => action(file));
};
