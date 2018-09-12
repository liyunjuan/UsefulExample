var PublicJs = {};
 2 PublicJs.IsPhone = function () {//判断是否是手机浏览器
 3     try {
 4         if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
 5             return true;
 6         } else {
 7             return false;
 8         }
 9     } catch (e) {
10         return false;
11     }
12 }
13 //鼠标事件
14 PublicJs.Mouse = {
15     Down: (PublicJs.IsPhone() ? "touchstart" : "mousedown"),
16     Move: (PublicJs.IsPhone() ? "touchmove" : "mousemove"),
17     Up: (PublicJs.IsPhone() ? "touchend" : "mouseup"),
18 };
19 //鼠标移动
20 PublicJs.Move = function (e) {
21     var move = { x: 0, y: 0 };
22     var _e = e.touches ? e : window.event;
23     if (PublicJs.IsPhone()) {
24         try {
25             // evt.preventDefault(); //阻止触摸时浏览器的缩放、滚动条滚动等
26             var touch = _e.touches[0]; //获取第一个触点
27             move.x = Number(touch.pageX); //页面触点X坐标
28             move.y = Number(touch.pageY); //页面触点Y坐标
29         } catch (e) {
30             move.x = _e.screenX;
31             move.y = _e.screenY;
32         }
33     }
34     else {
35         move.x = e.screenX;
36         move.y = e.screenY;
37     }
38     return move;
39 };