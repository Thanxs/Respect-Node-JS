const chalk = require("chalk");
const parseArgs = require('minimist')(process.argv.slice(2));

const log = console.log;

global.console.log = (...args) => {
    if (!parseArgs.color) {
        log(chalk.keyword('red')(...args));
    } else {
        const colorsInString = parseArgs.color.slice(1, -1);
        const colorArr = colorsInString.split(',');
        colorArr.forEach(color => {
            if (colorArr.includes(color)) {
                log(chalk.keyword(color)(...args));
            }
        });
    }
};

