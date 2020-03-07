const { promises } = require("fs");
const { join, extname, relative } = require("path");

const getFiles = (path_name, deep, max_deep, extensions, search, emitter) => {
  return async function finder(_path_name = path_name, _deep = deep) {
    const files = [];
    const entities = await promises.readdir(_path_name, {
      withFileTypes: true
    });
    for (const entity of entities) {
      if (entity.isDirectory()) {
        emitter("found:dirs");
        const new_path = join(_path_name, entity.name);
        if (_deep >= max_deep && max_deep !== 0) {
          continue;
        }
        files.push(...(await finder(new_path, _deep++)));
      } else if (entity.isFile()) {
        emitter("found:files");
        if (
          extensions.includes(extname(entity.name)) ||
          extensions.length === 0 &&
          !search || (search && entity.name.includes(search))
        ) {
          const relative_path = relative(
            path_name,
            join(_path_name, entity.name)
          );
          files.push(relative_path);
          emitter("file", relative_path);
        }
      }
    }
    return files;
  };
};

module.exports = {
  getFiles
};
