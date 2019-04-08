function Person(){}
Person.prototype.name = '小白兔';
Person.prototype.sayName = function () {
    console.log('我的名字是：'+this.name);
}

// console.log(Person.prototype.constructor === Person)
// console.log(person.__proto__ === Person.prototype)
// console.log(person.name)
// person.sayName();

function Man(){}
Man.prototype.age = 22;
Man.prototype.showAge = function(){
    console.log('我的年龄是：'+this.age);
}
Person.prototype = new Man();
var person = new Person();
// person.showAge();
// console.log(Person.prototype.__proto__ === Man.prototype)
// console.log(Man.prototype.__proto__ === Object.prototype)
// console.log(Object.prototype.__proto__ === null)

function Person() {}
function eat() {}
console.log(Person.__proto__ === Function.prototype)
console.log(eat.__proto__ === Function.prototype)
console.log(Function.prototype.__proto__ === Object.prototype)
