const { readdirSync } = require("fs");
const { extname } = require("path");
const chalk = require("chalk");
const parseArgs = require("minimist")(process.argv.slice(2));

const files = readdirSync(__dirname);
const extensions = process.env.EXT;
let colors = parseArgs.colors.slice(1, -1).split(",");
let numeric_value = 0;

const selected_files = [];

files.forEach(file => {
  if (extensions.includes(extname(file))) {
    if (extname(file)) {
      selected_files.push(file);
    }
  }
});

selected_files.forEach(selected_file => {
  if (numeric_value >= colors.length) {
    numeric_value = 0;
  }
  console.log(chalk.keyword(colors[numeric_value])(selected_file));
  numeric_value++;
});
