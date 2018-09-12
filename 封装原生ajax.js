var ajax = function(){
	var ajax = function(){
			return ('XMLHttpRequest' in window) ? function(){
				return new XMLHttpRequest();
			} : function(){
				return new ActiveXObject("Microsoft.XMLHTTP");
			}
		}(),
		formatData = function(fd){
			var res = '';
		}

}