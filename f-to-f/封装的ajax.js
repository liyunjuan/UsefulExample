var ajax = function(){
    var ajax = function(){
            return ('XMLHttpRequest' in window) ? function(){
                return new XmlHttpRequest();
            } : function(){
                return new ActiveXObject('Microsoft.XMLHTTP');
            }
        },
        formatData = function(fd){
            var res = '';
            for(var f in fd){
                res += f + '=' + fd[f] + '&';
            }
            return res.slice(0,-1);
        },
        AJAX = function(ops){
            var root = this,
                req = ajax();
            root.req = req;
            root.url = ops.url;
            root.type = ops.type === 'xml' ? 'responseXML' : 'responseText';
            root.method = ops.method || 'GET';
            root.async = ops.async || true;  //true为异步
            root.data = ops.data || {};
            root.before = ops.before || function(){};
            root.complete = ops.complete || function(){};
            root.success = ops.success || function(){};
            root.error = ops.error || function(){};
            root.absort = req.absort;

            root.setData = function(data){
                for(var d in data){
                    root.data[d] = data[d];
                }
            };
            root.send = function(){
                var datastring = formatData(root.data),
                    sendstring = null,
                    get = false,
                    async = root.async,
                    before = root.before,
                    complete = root.complete,
                    method = root.method,
                    type = root.type;
                if(method === 'GET'){
                    root.url.indexOf('?') === -1 ? root.url += "?"+datastring : root.url += datastring;
                    get = true;
                }
                before();
                req.open(method,root.url,async);
                if(!get){
                    req.setRequestHeader('Content-type',"application/x-www-form-urlencoded");
                    sendstring = datastring;
                }
                req.onreadystatechange = async ? function(){
                    if(req.readyState == 4){
                        complete();
                        if(req.status == 200){
                            var data = ops.type === 'json' ? JSON.parse(req[type]) : req[type];
                            root.success(data);
                        }else{
                            root.error(req.status);
                        }
                    }
                } : null;
                req.send(sendstring);
                if(!async){
                    complete();
                    var data = ops.type === 'json' : JSON.parse(req[type]) : req[type];
                    root.success(data);
                }
            };
            root.url && root.send();
        };
    return function(ops){return new AJAX(ops);};
}();
