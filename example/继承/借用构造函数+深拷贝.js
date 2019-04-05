/**
 * @Time 2019/3/24下午7:05
 * @Filename 借用构造函数+深拷贝
 */
function Person(name,age){
  this.name = name
  this.age = age
  this.friends = ['lyj','tll','wy']
  this.sayName = function () {
    console.log(this.name)
  }
  this.showAge = function () {
    console.log(this.age)
  }
}
function Student(name,age) {
  //使用call借用Person构造函数
  Person.call(this,name,age)
}
//使用深拷贝实现继承
deepCopy(Student.prototype,Person.prototype);
//修改子构造的constructor
Student.prototype.constructor = Student

//深拷贝函数（递归实现）
//将obj2的成员拷贝到obj1中，只拷贝实例成员
function deepCopy(obj1,obj2) {
  for(var key in obj2){
    if(obj2.hasOwnProperty(key)){
      //判断是否是引用类型的成员变量
      if(typeof obj2[key] == 'object'){
        obj1[key] = Array.isArray(obj2[key])?[]:{}
        deepCopy(obj1[key],obj2[key])
      }else{
        obj1[key] = obj2[key]
      }
    }
  }
}

//实例化使用
var stu = new Student('llllyj',25)
stu.sayName()
stu.showAge()