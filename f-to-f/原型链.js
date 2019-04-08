var A = function() {};
A.prototype.n = 1;
var b = new A();
A.prototype = {
    n: 2,
    m: 3
}
var c = new A();

// console.log(b.n); //1
// console.log(b.m);//undefined
//
// console.log(c.n);//2
// console.log(c.m);//3

var F = function() {};

// function Person(){}
function Man(){}
Man.prototype = new Person();

Object.prototype.a = function() {
    console.log('a');
};

Function.prototype.b = function() {
    console.log('b');
}

var f = new F();

// f.a(); //报错
// f.b();//报错

// F.a(); //a
// F.b();//b
// console.log(Person.__proto__ === Function.prototype) //true
// console.log(Man.__proto__ === Function.prototype)//true
// console.log(Person.prototype.__proto__ === Function.prototype)//false
// console.log(Man.prototype.__proto__ === Function.prototype)//false
// console.log(F.__proto__ === Function.prototype)  //普通函数是Function的实例   true
// console.log(Function.prototype.__proto__ === Object.prototype)  //true //子构造函数的prototype的__proto__指向上级构造函数的prototype
// console.log(Object.prototype.__proto__ === null) //这是原型链的终点

function Person(name) {
    this.name = name
}
let p = new Person('Tom');
// console.log(p.__proto__ === Person.prototype)//true
// console.log(Person.__proto__ === Function.prototype) //true

var foo = {},
    F = function(){};
Object.prototype.a = 'value a';
Function.prototype.b = 'value b';

// console.log(foo.a); //value a
// console.log(foo.b);//undefined
//
// console.log(F.a);//value a
// console.log(F.b);//value b

var a = {}
console.log(a.__proto__ === Function.prototype)  //false
console.log(Object.__proto__ === Function.prototype)    //true
console.log(typeof Object)  //function
console.log(typeof Person)  //function

