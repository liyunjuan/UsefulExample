//通用函数柯里化，要传入一个函数，才有柯里化
function composeFunctions(func){
	//这里的第一个参数需要柯里化的函数，所以要去掉第一个参数
	var args = Array.prototype.slice.call(arguments,1);
	console.log(args)
	var _func = function(){
		if(arguments.length === 0){
			return func.apply(this,args);
		}
		
		Array.prototype.push.apply(args,arguments);
		return _func;
	}
	
	return _func;
}
//利用通用方法实现add的调用方式
function add(){
    return [].reduce.call(arguments,function(a,b){return a+b});
}
//console.log(composeFunctions(add(1,2,3)(1)(2)(3)(4,5,6)(7,8))());
console.log(composeFunctions(add,1,2,3)(1)(2)(3,4,5,5)(5,6,6,7,8,8)(1)(1)(1)());


//下面是实现add的柯里化
//例子：实现add（）函数的柯里化，使得add(1,2,3)(1)(2)(3)(4,5,6)(7,8)() === 42
function add(){
	var args = [].slice.call(arguments);
	
	var _add = function(){
		if(arguments.length == 0){
			return args.reduce(function(a,b){return a+b;})
		}else{
			[].push.apply(args,arguments);
			return _add;
		}
	}
	
	return _add;
}

<!--console.log(add(1,2,3)(1)(2)(3)(4,5,6)(7,8)())-->



