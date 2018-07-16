function Sister()  
{   
    this.age=18;  
    this.sayAge= function()   
    {  
        console.log("Sister Age:"+this.age);  
    }  
    this.yaya=function()  
    {  
        console.log("yaya.....");  
    }  
}  
function Brother()  
{   
    this.age=25;  
    this.sayAge=function(){  
        console.log("Brother Age:"+this.age);  
    }  
    this.hoho=function()  
    {  
        console.log("hoho.....")  
    }  
}  
var sis=new Sister();  
var bro=new Brother();  
sis.sayAge.call(bro);//Sister Age:25  //意思是：sis的sayAge方法里面的this，指的是bro里面的this的值，所以就是25（单单把sis的sayAge移动到bro对象中去执行）

function currying( fn, n) { 
    return function (m) { 
        // console.log(this);
        return fn. call( this, m, n); 
    }; 
}
function tailFactorial( n, total) { 
if (n === 1) return total; 
    return tailFactorial( n - 1, n * total); 
} 
const factorial = currying( tailFactorial, 1); 
console.log(factorial(5)) // 120  5*

