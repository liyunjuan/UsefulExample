function debounce(fun,wait=50,immediate){
    let timer;
    return function(){
        if(immediate){
            fn.apply(this,arguments);
        }
        if(timer) clearTimeout(timer)
        timer = setTimeout( () => {
            fn.apple(this,arguments)
        },wait)
    }
}
