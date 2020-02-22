const { readdirSync, statSync } = require("fs");
const { extname, join } = require("path");
const chalk = require("chalk");
const parseArgs = require("minimist")(process.argv.slice(2));
require("./console.js");

const getAllFiles = dir =>
  readdirSync(dir).reduce((files, file) => {
    const name = join(dir, file);
    const isDirectory = statSync(name).isDirectory();
    return isDirectory ? [...files, ...getAllFiles(name)] : [...files, name];
  }, []);

const getFilesByDeepValue = () => {
  const deep__value = 0;
  if (parseArgs.deep === deep__value) {
    return getAllFiles(__dirname);
  } else {
    return readdirSync(__dirname);
  }
};

const getColors = () => {
  let colors = parseArgs.colors;
  if (colors === undefined) {
    colors = ["red", "green", "blue"];
  } else {
    colors = colors.slice(1, -1).split(",");
  }

  return colors;
};

const getSelectedFiles = () => {
  const files = getFilesByDeepValue();
  const extensions = process.env.EXT;
  const selected_files = [];

  if (extensions === undefined) {
    return selected_files;
  }

  files.forEach(file => {
    if (extensions.includes(extname(file))) {
      if (extname(file)) {
        selected_files.push(file);
      }
    }
  });

  return selected_files;
};

const multiColorIteration = arr => {
  const colors = getColors();
  let numeric_value = 0;
  arr.forEach(item => {
    if (numeric_value >= colors.length) {
      numeric_value = 0;
    }
    try {
      console.log(chalk.keyword(colors[numeric_value])(item));
    } catch (e) {
      console.log(chalk.magenta(`${item} ====== (this file is painted with magenta, because you passed a color to the arguments that does not exist)`));
    }

    numeric_value++;
  });
};

const makeColorfulConsole = () => {
  const files = getFilesByDeepValue();
  const selected_files = getSelectedFiles();
  if (selected_files.length === 0) {
    multiColorIteration(files);
  } else {
    multiColorIteration(selected_files);
  }
};

module.exports = {
  makeColorfulConsole
};
