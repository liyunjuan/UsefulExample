var myModules = (
	function Manage(){
		var modules = {};

		function define(name,deps,impl){
			for(var i=0;i<deps.length;i++){
				deps[i] = modules[deps[i]];
			}
			modules[name] = impl.apply(impl,deps);
		}

		function get(name){
			return modules[name];
		}

		return {
			def:define,
			ge:get
		};
	}
)();

myModules.def("bar",[],function(){
	function hello(who){
		return 'Let me introduce: ' + who;
	}
	return {
		hello:hello
	};
});

myModules.def("foo",["bar"],function(aaa){
	var hungry = 'hippo';

	function awesome(){
		console.log(aaa.hello(hungry).toUpperCase());
	}

	return {
		awesome:awesome
	};
});

var bar = myModules.ge('bar');
var foo = myModules.ge('foo');

console.log(bar.hello('hippo'));

foo.awesome();