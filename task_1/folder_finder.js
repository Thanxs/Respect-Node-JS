const { readdirSync } = require("fs");
const { join, extname } = require("path");

const getFiles = (path_name, deep, max_deep, extensions) => {
  return function innerFn(_path_name = path_name, _deep = deep) {
    const files = [];
    const entities = readdirSync(_path_name, { withFileTypes: true });
    entities.forEach(entity => {
      if (entity.isDirectory()) {
        const new_path = join(_path_name, entity.name);
        if (_deep >= max_deep && max_deep !== 0) {
          return;
        }
        files.push(...innerFn(new_path, _deep++));
      } else if (entity.isFile()) {
        if (
          extensions.includes(extname(entity.name)) ||
          extensions.length === 0
        ) {
          files.push(join(_path_name, entity.name));
        }
      }
    });
    return files;
  };
};

module.exports = {
  getFiles
};
