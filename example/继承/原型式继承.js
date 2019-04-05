/**
 * @Time 2019/3/24下午5:44
 * @Filename 原型式继承
 */
function SuperClass(){
  this.name = 'lyj'
  this.sayName = function () {
    console.log('name:'+this.name)
  }
}
//设置构造函数的原型
SuperClass.prototype.age = 22
SuperClass.prototype.fridends = ['lily','kangkang'];
SuperClass.prototype.showAge = function () {
  console.log('age:'+this.age)
}

function SubClass() {
  
}
//这句执行表示子构造函数的constructor指向了父构造函数的的constructor
SubClass.prototype = SuperClass.prototype
//所以子构造函数需要修正constructor
SubClass.prototype.constructor = SubClass

//以上实现了继承，实例调用，实例的是子造函数
var child = new SubClass();
// child.sayName(); //这句会报错，不能继承构造函数的实例对象的成员
child.showAge();
console.log(child.fridends)
