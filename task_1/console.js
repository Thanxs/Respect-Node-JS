const chalk = require("chalk");
const parseArgs = require('minimist')(process.argv.slice(2));

const log = console.log;

global.console.log = (...args) => {
    const colorArray = parseArgs.color
    .slice(1, -1)
    .split(',');
    
};

log('hello!', 'hybchy');
