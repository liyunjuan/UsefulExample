function getAjax(ops){
    var xhr = ('XMLHttpRequest' in  window) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');

    xhr.onreadystatechange = function () {
        if(xhr.readyState == 4){
            if(xhr.status == 200){
                var data = ops.type === 'json' ? JSON.parse(xhr[ops.type]) : xhr[ops.type];
                ops.success(data);
            }else{
                ops.error(xhr.status);
            }
        }
    };
    xhr.open(ops.method,url,ops.async);
    xhr.send(null);
}
