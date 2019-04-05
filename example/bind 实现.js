/**
 * @Time 2019/3/23下午12:54
 * @Filename bind 实现
 */
if(!Function.prototype.bind){
  Function.prototype.bind = function (oThis) {
    if(typeof this !== 'function'){
      throw new TypeError('not support');
    }
    var aArgs = Array.prototype.slice.call(arguments,1),
        fTobind = this,
        fNOP = function(){},
        fBound = function () {
          return fTobind.apply(this instanceof fNOP ? this : oThis,
                                aArgs.concat(Array.prototype.slice.call(arguments)));
        };
        fNOP.prototype = this.prototype
        fBound.prototype = new fNOP();
        return fBound;
  }
}












Function.prototype.bind = function (oThis) {
  if(typeof this !== 'function'){
    throw new TypeError('not')
  }

  var args = [].slice.call(arguments,1),
      ftobind = this,
      fnop = function(){},
      fbound = function(){
        return ftobind.apply(this instanceof fnop?this:oThis,
                              args.concat([].slice.call(arguments)))
      }
      fnop.prototype = this.prototype
      fbound = new fnop()
      return fbound
}
