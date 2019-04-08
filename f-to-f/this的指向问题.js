var obj = {
    birth: 1995,
    getAge: function() {
        var b = this.birth; // 1995;
        var fn = function() {
            return this.birth;
            // this 指向被改变了！
            // 因为这里重新定义了个 function，
            // 假设它内部有属于自己的 this1，
            // 然后 getAge 的 this 为 this2，
            // 那么，fn 当然奉行就近原则，使用自己的 this，即：this1
        };
        return fn();
    }
}

console.log(obj.getAge());
