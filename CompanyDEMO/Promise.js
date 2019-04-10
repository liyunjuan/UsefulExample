var p = getAjax({
    url:'ajax/clientService/checkoutOrgUsername',
    data:{
        username:org_name,
        orgId:orgId
    },
    method:'post'
});
p.then(function(data){
    if(data.success){
        orgName.text(org_name);
        hideErrorTip($this,'.errorTip');
        acceptOrgUserName = org_name;
    }else{
        orgName.text('--');
        showErrorTip($this,'.errorTip',data.message);
    }
},function(err){
    console.log(err)
})

var getAjax = function(option){
    var opt = {
        url:option.url || '',
        data:option.data || {},
        method:option.method || 'GET',
        async:option.async || true
    };
    var setData = function(data){
        var _data = {};
        for(var i in data){
            _data[i] = data[i];
        }
        return _data;
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
        console.log(datastring)
        if(opt.method === 'GET'){
            opt.url.indexOf('?') ? opt.url += "?"+ datastring : opt.url += '&' + datastring;
        }
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
