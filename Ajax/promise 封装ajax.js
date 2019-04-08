var getAjax = function(option){
    var opt = {
        url:option.url || '',
        data:option.data || {},
        method:option.method || 'GET',
        async:option.async || true,
        before:option.before || function(){}
    };
    var formatData = function(data){
        var _data = '';
        for(var f in data){
            _data += f + '=' + data[f] + '&';
        }
        return _data.slice(0,-1);
    }

    var promise = new Promise(function(resolve,reject){
        var xhr = ('XMLHttpRequest' in window)?new XMLHttpRequest():new ActiveXObject('Microsoft.XMLHTTP');
        var datastring = formatData(opt.data),sendstring;
        if(opt.method === 'GET'){
            opt.url.indexOf('?') ? opt.url += "?"+ datastring : opt.url += '&' + datastring;
        }
        opt.before();
        xhr.open(opt.method,opt.url,opt.async);
        xhr.responseType = 'json';
        if(opt.method == 'GET'){
            xhr.setRequestHeader('Accept','application/json');
        }else{
            xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
            sendstring = datastring;
        }
        xhr.onreadystatechange = handler;

        xhr.send(sendstring);
        function handler(){
            if(this.readyState != 4){
                return;
            }else if(this.status === 200){
                console.log(this.readyState)
                resolve(this.response);
            }else{
                console.log(22222)
                reject(new Error(this.response));
            }
        }
    });
    return promise;
};

/**
 * 1、实例化xhr对象，做兼容
 * 2、xhr.open(请求方法，url，同步异步)
 * 3、xhr.onreadystatechange，在open之后去监听这个，当readyState变为4之后，数据返回回来了，然后xhr.status为200或者304的时候，就表示可以用数据了
 * 4、xhr.send()
 */