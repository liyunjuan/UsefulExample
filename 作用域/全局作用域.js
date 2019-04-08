var name = 'www';
function getName(){
    console.log(this === global)
    console.log(global.name);
}
var o = {
    name:'ooo',
    getName:getName
};

o.getName();

var f = o.getName;
f();

getName();