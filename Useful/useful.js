//获取过后的几天
function GetDateStr(selectDay,AddDayCount) {
    var dd = new Date(selectDay);
    dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期
    var y = dd.getFullYear();
    var m = dd.getMonth()+1;//获取当前月份的日期
    var d = dd.getDate();
    if (m<10) m='0'+m;
    if (d<10) d='0'+d;
    return y + "-" + m + "-" + d;
}
/*
 用法：
	var select_date = new Date();
	var y = select_date.getFullYear(),
	    m = select_date.getMonth()+ 1,//获取当前的月份
	    d = select_date.getDate();
	if (m<10) m='0'+m;
	if (d<10) d='0'+d;
	var selected = y + '-' + m + '-' + d; 
	var select_date_end = GetDateStr(selected,30); //30天后
 * */

//时间戳转日期
function timeInit(time){
   var d = new Date(time),
       year = d.getFullYear(),
       month = d.getMonth()+1,
       date = d.getDate(),
       hour = d.getHours(),
       minute = d.getMinutes(),
       seconds = d.getSeconds();
   hour = hour<10?'0'+hour:hour;
   minute = minute <10?'0'+minute:minute;
   return year+"-"+month+"-"+date+" "+hour+":"+minute+":"+seconds;
}
//手机号转*
function phoneInit(phone){
	var str = '';
	if(phone){
		 str = phone.substr(0,3) + '****' + phone.substr(7);
	}
	return str;
}
//限制输入的方法
function replaceInlegalCharacters(str,reg) {
    $('.'+str).on('keyup',function () {
        this.value=this.value.replace(reg,'');
    })
}
