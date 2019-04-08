function bind(content){
    if(typeof this !== 'function'){
        throw new Error('not a function');
    }
    let fn = this;
    let args = [].slice.call(arguments,1);
    let resFn = function(){
        return fn.apply(this instanceof resFn ? this:content,args.concat([].slice.call(arguments)))
    }
    function temp(){}
    temp.prototype = this.prototype
    resFn.prototype = new temp();
    return resFn()
}
