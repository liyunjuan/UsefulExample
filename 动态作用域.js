// function foo(){
// 	console.log(a);
// }

// function bar(){
// 	var a = 3;
// 	foo();
// }

// var a = 2;

// foo();

// bar();

var obj = {
	id:'awesome',
	cool:function coolFn(){
		console.log(this.id);
	}
}

var id = 'not awesome';
obj.cool();

setTimeout(obj.cool,1000);
obj.cool()