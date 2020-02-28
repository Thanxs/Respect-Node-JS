const { EXT } = process.env;
const DEEP = 1;
const MAX_DEEP = Infinity;
const EXTENSIONS = JSON.parse(EXT || "[]");

module.exports = {
    EXTENSIONS,
    DEEP,
    MAX_DEEP
};
