const { EXTENSIONS, DEEP, MAX_DEEP, SEARCH } = require("./data.js");
const { path_to_folder } = require("./path_finder.js");
require("./coloring.js");
const Finder = require('./ee.js');

const fl = new Finder(path_to_folder, DEEP, MAX_DEEP, EXTENSIONS, SEARCH);

fl.on("started", () => {
    console.log("Parse start");
    fl.emit("parse");
});

fl.on("file", (file) => {
    console.log("Receive file: ", file);
});

fl.on("processing", (data) => {
    console.log("Processing data: ", JSON.stringify(data));
});

fl.on("finished", () => {
    console.log("Parse end")
});
