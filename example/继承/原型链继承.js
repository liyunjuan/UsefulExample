/**
 * @Time 2019/3/24下午6:08
 * @Filename 原型链继承
 */
function SuperClass(){
  this.name = 'lyj'
  this.age = 22
  this.sayName = function () {
    console.log('name:'+this.name)
  }
}
//设置构造函数的原型
SuperClass.prototype.fridends = ['lily','kangkang'];
SuperClass.prototype.showAge = function () {
  console.log('age:'+this.age)
}
function SubClass() {

}
//实现继承
SubClass.prototype = new SuperClass();
//修改constructor
SubClass.prototype.constructor = SubClass
//实例
let child = new SubClass()
child.sayName();
child.showAge();
console.log(child.age)
//修改实例的属性时，父构造函数的原型对象也会变化
child.fridends.push('wy')
console.log(child.fridends)
//看父函数的实例
let father = new SuperClass()
console.log(father.fridends)

