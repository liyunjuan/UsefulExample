 //悬浮球
  2 var SuspendedBall = {
  3     ShowWidth: 500,//显示悬浮球的页面宽度
  4     //添加悬浮球 参数集合可中包含有 top、left、scc、class四个属性
  5     Add: function (obj) {
  6         if ($(".SuspendedBall").length == 0) {
  7             $("body").append("<div class=\"SuspendedBall\"><div></div></div>")
  8             $("body").append("<div class=\"BallBox\"><div class=\"Bg\"></div><div class=\"BallBoxInfo\"></div></div>")
  9         }
 10         if (obj) {
 11             var _this = $(".SuspendedBall");
 12             if (typeof (obj.top) != "undefined") {
 13                 _this.offset({ top: obj.top });
 14             }
 15             if (typeof (obj.left) != "undefined") {
 16                 _this.offset({ left: obj.left });
 17             }
 18             if (typeof (obj.css) != "undefined") {
 19                 _this.css(obj.css);
 20             }
 21             if (typeof (obj.class) != "undefined") {
 22                 _this.addClass(obj.class);
 23             }
 24         }
 25     },
 26     //控制悬浮球移动，显示的方法 其中UpFun是指的当触摸或鼠标抬起的时候的执行的方法
 27     Move: function (UpFun) {//第一个参数是鼠标抬起的事件触发，第二个参数是创建的时候添加的其他事件
 28         var x = 0, y = 0;
 29         var sx = 0, sy = 0;
 30         var mx = 0, my = 0;
 31         var isDown = false;
 32         var isMove = false;
 33         $(window).resize(function () {
 34             if ($(window).width() < SuspendedBall.ShowWidth) {
 35                 $(".SuspendedBall").show();
 36                 $(".BallBox").hide();
 37             }
 38             else {
 39                 $(".SuspendedBall").hide();
 40                 $(".BallBox").hide();
 41             }
 42         })
 43         $("body").bind(PublicJs.Mouse.Down, function (e) {
 44             if ($(window).width() < SuspendedBall.ShowWidth) {
 45                 $(".SuspendedBall").show();
 46                 $(".BallBox").hide();
 47             }
 48         });
 49         $(".BallBox").bind(PublicJs.Mouse.Down, function (e) {
 50             if ($(window).width() < SuspendedBall.ShowWidth) {
 51                 $(".SuspendedBall").show();
 52                 $(".BallBox").hide();
 53             }
 54             return false;//取消元素事件向下冒泡
 55         });
 56         $(".SuspendedBall").bind(PublicJs.Mouse.Down, function (e) {
 57             //#region 去除原有的动画样式
 58             var right = $(window).width() - $(this).width();
 59             var bottom = $(window).height() - $(this).height();
 60             if ($(this).hasClass("ToLeft")) {
 61                 $(this).removeClass("ToLeft").offset({ left: 0 });
 62             }
 63             else if ($(this).hasClass("ToTop")) {
 64                 $(this).removeClass("ToTop").offset({ top: 0 });
 65             }
 66             else if ($(this).hasClass("ToBottom")) {
 67                 $(this).removeClass("ToBottom").offset({ top: bottom });
 68             }
 69             else if ($(this).hasClass("ToRight")) {
 70                 $(this).removeClass("ToRight").offset({ left: right });
 71             }
 72             //#endregion-----
 73             isDown = true;
 74             x = $(this).offset().left;
 75             y = $(this).offset().top;
 76             var move = PublicJs.Move(e);
 77             sx = move.x;
 78             sy = move.y;
 79             return false;//取消元素事件向下冒泡
 80         });
 81         $(".SuspendedBall").bind(PublicJs.Mouse.Move, function (e) {
 82             if (isDown) {
 83                 var move = PublicJs.Move(e);
 84                 mx = move.x - sx;//获取鼠标移动了多少
 85                 my = move.y - sy;//获取鼠标移动了多少
 86 
 87                 var movemunber = 5;//当触摸的时候移动像素小于这个值的时候代表着不移动
 88                 if ((mx) > movemunber || (0 - mx) > movemunber || (my) > movemunber || (0 - my) > movemunber) {
 89                     isMove = true;
 90                 }
 91                 var _top = (y + my), _left = (x + mx);
 92                 var maxtop = $(window).height()-$(this).height();//获取最小的宽度
 93                 var maxleft = $(window).width() - $(this).width();//获取最大的宽度
 94                 _top = _top < 0 ? 0 : (_top > maxtop ? maxtop : _top);//避免小球移除移出去
 95                 _left = _left > 0 ? _left : 0;//避免小球移除移出去
 96                 $(this).offset({ top: _top , left: _left });
 97                 mx = move.x;
 98                 my = move.y;
 99                 // isMove = true;
100             }
101             return false;//取消元素事件向下冒泡
102         })
103         $(".SuspendedBall").bind(PublicJs.Mouse.Up, function (e) {
104             var _this = this;
105             ///添加定时器，是因为有的时候move事件还没运行完就运行了这个事件，为了给这个时间添加一个缓冲时间这里定义了10毫秒
106             setTimeout(function () {
107                 if (isMove) {//如果移动了执行移动方法
108                     var move = { x: $(_this).offset().left, y: $(_this).offset().top };
109                     var width = $(window).width() / 2;
110                     var height = $(window).height() / 2;
111                     var ToLeftOrRight = "left";
112                     var ToTopOrBottom = "top";
113                     var MoveTo = "x";
114                     if (move.x > width) {
115                         ToLeftOrRight = "right";
116                         move.x = 2 * width - move.x;//左右边距
117                     }
118                     if (move.y > height) {
119                         ToTopOrBottom = "bottom";
120                         move.y = 2 * height - move.y;//上下边距
121                     }
122                     if (move.x > move.y) {
123                         MoveTo = "y";
124                     }
125 
126                     $(_this).removeClass("ToLeft").removeClass("ToTop").removeClass("ToBottom").removeClass("ToRight");//去除原样式
127                     if (MoveTo == "x") {
128                         if (ToLeftOrRight == "left") {
129                             $(_this).addClass("ToLeft");
130                         }
131                         else {
132                             $(_this).addClass("ToRight");
133                         }
134                     }
135                     else {
136                         if (ToTopOrBottom == "top") {
137                             $(_this).addClass("ToTop");
138                         }
139                         else {
140                             $(_this).addClass("ToBottom");
141                         }
142                     }
143                 }
144                 else {
145                     if (typeof (UpFun) == "function") {
146                         UpFun();
147                     }
148                     $(".SuspendedBall").hide();
149                     $(".BallBox").show();
150                 }
151                 isDown = false;
152                 isMove = false;
153             }, 10);
154             return false;//取消元素事件向下冒泡
155         })
156     },
157     //这个方法是显示页面上面的悬浮球方法
158     ShowBall: function () {
159         $(".SuspendedBall").show();
160         $(".BallBox").hide();
161     },
162     //这个方法是显示页面上面的悬浮球菜单的方法
163     ShowBox: function () {
164         $(".SuspendedBall").hide();
165         $(".BallBox").show();
166     },
167     //这个方法是给悬浮球菜单添加内容的方法
168     BoxHtml: function (html) {
169         $(".BallBoxInfo").html(html);
170     },
171     //这个方法是获取到父级页面的悬浮球的方法
172     Partent: function () {
173         if (typeof (window.parent.SuspendedBall) != "undefind") {
174             return window.parent.SuspendedBall;
175         }
176         return null;
177     }
178 };
179 //frame页面点击隐藏顶级父页面悬浮球菜单的方法
180 function FrameBodyClick() {
181     var topWin = (function (p, c) {
182         while (p != c) {
183             c = p
184             p = p.parent
185         }
186         return c
187     })(window.parent, window);
188     $("body").bind(PublicJs.Mouse.Down, function (e) {
189         if (topWin.SuspendedBall) {
190             if ($(window).width() < topWin.SuspendedBall.ShowWidth) {
191                 topWin.SuspendedBall.ShowBall();
192             }
193         }
194     });
195 }
196 $(function () {
197     FrameBodyClick();
198 })