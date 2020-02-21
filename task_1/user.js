const user = {
    name: "Alex",
    position: 'Node JS developer',
    sayHello() {
        console.log(`Hello, my name is ${this.name} and I'm ${this.position}`);        
    }
};

module.exports = user;