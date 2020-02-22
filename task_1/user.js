const chalk = require("chalk");

exports.user = {
  name: "Alex",
  position: "NodeJS developer",
  sayHello() {
    console.log(chalk.magenta(`Hello, my name is ${this.name} and I'm ${this.position}`));
  }
};
