/**
 * @Time 2019/3/24下午6:30
 * @Filename 组合继承:借用构造函数+原型式继承
*/
function Person(name,age){
  this.name = name
  this.age = age
  this.friends = ['lyj','tll','wy']
  this.sayName = function () {
    console.log(this.name)
  }
}
//父构造函数的原型对象
Person.prototype.showAge = function () {
  console.log(this.age)
}
function Student(name) {
  //使用call借用Person构造函数
  Person.call(this,name)
}
//设置继承
Student.prototype = Person.prototype
//修改constructor
Student.prototype.constructor = Student

//实例调用
var stu = new Student('lyj')
stu.sayName();//lyj
console.log(stu.friends)
//如果要使用age，需要实例化父构造函数
var per = new Person('jyl',22)
per.sayName()//jyl
per.showAge() //22
//不会改变子函数的值
stu.sayName()  //lyj
stu.showAge()//undefined