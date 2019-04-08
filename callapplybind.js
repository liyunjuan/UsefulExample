var a = {
	user:"追梦子",
	fn:function(){
		console.log(this.user);
	}
};
console.log('---------call------');
var b = a.fn;
b();//undefined

a.fn();//追梦子--这里能够打印是因为，这里的this指向的是函数a，那为什么上面的不指向a？

b.call(a);//追梦子--通过call，给第一个参数添加要把b添加到哪个环境中，就是this指向a；
b.call(a,1,2);//追梦子--可以有多个参数，但是call只给第一个参数添加，this指向a

console.log('---------apply------');
b.apply(a);//追梦子--跟call差不多，使this指向a（第一个参数）
b.apply(a,[1,20]);//追梦子--也可以有很多个参数，但是第二个参数必须是数组，this指向a（第一个参数）

var c = {
	user:'追梦子C',
	fun:function(a,b,c){
		console.log(this.user);
		console.log(a+b+c);
	}
};
var bb = c.fun;
bb.apply(c,[2,3,5]);//追梦子C，10    数组的参数个数与对应函数的参数个数相同
bb.call(c,2,3,6);//追梦子C 11   第二个参数的个数与对应函数的参数个数相同

bb.call(null);//undefined  NaN  

//----------//注意如果call和apply的第一个参数写的是null，那么this指向的是window对象
var d = {
	user:'追梦子C',
	fun:function(){
		console.log(this);
	}
};
var bbb = d.fun;
//bbb.call(null);//打印window

//======//bind方法和call、apply方法有些不同，但是不管怎么说它们都可以用来改变this的指向。
console.log('---------bind------');
var xx = b.bind(a);//不会打印东西--对，这就是bind和call、apply方法的不同，实际上bind方法返回的是一个修改过后的函数。
xx();
