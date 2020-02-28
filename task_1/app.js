const { getFiles } = require("./folder_finder");
const { EXTENSIONS, DEEP, MAX_DEEP } = require("./data");
const { path_to_folder } = require("./path_finder");
require("./coloring.js");

const files = getFiles(path_to_folder, DEEP, MAX_DEEP, EXTENSIONS)();
files.forEach(file => {
  console.log(file);
});
