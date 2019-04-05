/**
 * @Time 2019/3/24下午6:21
 * @Filename 借用构造函数继承
 */
function Person(name){
  this.name = name
  this.friends = ['lyj','tll','wy']
  this.sayName = function () {
    console.log(this.name)
  }
}
function Student(name) {
  //使用call借用Person构造函数
  Person.call(this,name)
}
//实例化测试
var stu = new Student('小王八');
stu.sayName();
console.log(stu.friends)
