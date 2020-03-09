const { EXT } = process.env;
const parseArgs = require("minimist")(process.argv.slice(2));

const DEEP = 1;
const MAX_DEEP = Infinity;
const EXTENSIONS = JSON.parse(EXT || "[]");
const SEARCH = parseArgs.search || '';

module.exports = {
    EXTENSIONS,
    DEEP,
    MAX_DEEP,
    SEARCH
};
