const { readdirSync }= require('fs');
const { extname } = require('path');
const chalk = require('chalk');

const files = readdirSync(__dirname);
for (const file of files) {
    if (extname(file) === '.json') {
    console.log(chalk.magenta(file));
    } else {
        console.log(chalk.blue(file));
    }
}

console.log('ENVIRONMENT', process.env.EXT);
console.log('ENVIRONMENT', process.argv);