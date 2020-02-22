global.print = console.log;
global.idx = 0;

global.console.log = (...args) => {
    print(`${++idx}:`, ...args);
};
