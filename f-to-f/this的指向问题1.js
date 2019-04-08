// 1. 首先有个类型机器
function ClassMachine() {
    console.log("类型创造机器");
}
// 2. 然后我们定义一个对象物品
let thingOne = {};
// 3. 对象物品通过万能术 __proto__ 指向了类型机器的原型（即 No 2 始机器）
thingOne.__proto__ = ClassMachine.prototype;
// 4. ？？？
// ClassMachine.call(thingOne);
// 5. 定义了类型机器的动作
ClassMachine.prototype.action = function(){
    console.log("动作创造机器");
}
// 6. 这个对象物品执行了动作
thingOne.action();
/*
 * Console：
 * 类型创造机器
 * 动作创造机器
*/
