$(function () {
var PublicJs = {};

//鼠标事件
PublicJs.Mouse = {
    Down:  "touchstart",
    Move:  "touchmove" ,
    Up: "touchend"
};
//鼠标移动
PublicJs.Move = function (e) {
    var move = { x: 0, y: 0 };
    var _e = e.touches ? e : window.event;
//  if (PublicJs.IsPhone()) {
        try {
            // evt.preventDefault(); //阻止触摸时浏览器的缩放、滚动条滚动等
            var touch = _e.touches[0]; //获取第一个触点
            move.x = Number(touch.pageX); //页面触点X坐标
            move.y = Number(touch.pageY); //页面触点Y坐标
        } catch (e) {
            move.x = _e.screenX;
            move.y = _e.screenY;
        }
//  }
//  else {
//      move.x = e.screenX;
//      move.y = e.screenY;
//  }
    return move;
};

//悬浮球
var SuspendedBall = {
    ShowWidth: 500,//显示悬浮球的页面宽度
    //添加悬浮球 参数集合可中包含有 top、left、scc、class四个属性
    Add: function (obj) {
        // if ($(".SuspendedBall").length == 0) {
        //     $("body").append("<div class=\"SuspendedBall\"><div></div></div>")
        //     // $("body").append("<div class=\"BallBox\"><div class=\"Bg\"></div><div class=\"BallBoxInfo\"></div></div>")
        // }
        if (obj) {
            var _this = $(".SuspendedBall");
            if (typeof (obj.top) != "undefined") {
                _this.offset({ top: obj.top });
            }
            if (typeof (obj.left) != "undefined") {
                _this.offset({ left: obj.left });
            }
            if (typeof (obj.css) != "undefined") {
                _this.css(obj.css);
            }
            if (typeof (obj.class) != "undefined") {
                _this.addClass(obj.class);
            }
        }
    },
    //控制悬浮球移动，显示的方法 其中UpFun是指的当触摸或鼠标抬起的时候的执行的方法
    Move: function (UpFun) {//第一个参数是鼠标抬起的事件触发，第二个参数是创建的时候添加的其他事件
        var x = 0, y = 0;
        var sx = 0, sy = 0;
        var mx = 0, my = 0;
        var isDown = false;
        var isMove = false;
        $(window).resize(function () {
            if ($(window).width() < SuspendedBall.ShowWidth) {
                $(".SuspendedBall").show();
                $(".BallBox").hide();
            }
            else {
                $(".SuspendedBall").hide();
                $(".BallBox").hide();
            }
        })
        $("body").bind(PublicJs.Mouse.Down, function (e) {
            if ($(window).width() < SuspendedBall.ShowWidth) {
                $(".SuspendedBall").show();
                $(".BallBox").hide();
            }
        });
        // $(".BallBox").bind(PublicJs.Mouse.Down, function (e) {
        //     if ($(window).width() < SuspendedBall.ShowWidth) {
        //         $(".SuspendedBall").show();
        //         $(".BallBox").hide();
        //     }
        //     return false;//取消元素事件向下冒泡
        // });
        $(".SuspendedBall").bind(PublicJs.Mouse.Down, function (e) {
            //#region 去除原有的动画样式
            var right = $(window).width() - $(this).width();
            var bottom = $(window).height() - $(this).height();
            if ($(this).hasClass("ToLeft")) {
                $(this).removeClass("ToLeft").offset({ left: 0 });
            }
            else if ($(this).hasClass("ToTop")) {
                $(this).removeClass("ToTop").offset({ top: 0 });
            }
            else if ($(this).hasClass("ToBottom")) {
                $(this).removeClass("ToBottom").offset({ top: bottom });
            }
            else if ($(this).hasClass("ToRight")) {
                $(this).removeClass("ToRight").offset({ left: right });
            }
            //#endregion-----
            isDown = true;
            x = $(this).offset().left;
            y = $(this).offset().top;
            var move = PublicJs.Move(e);
            sx = move.x;
            sy = move.y;
            return false;//取消元素事件向下冒泡
        });
        $(".SuspendedBall").bind(PublicJs.Mouse.Move, function (e) {
            if (isDown) {
                var move = PublicJs.Move(e);
                mx = move.x - sx;//获取鼠标移动了多少
                my = move.y - sy;//获取鼠标移动了多少

                var movemunber = 5;//当触摸的时候移动像素小于这个值的时候代表着不移动
                if ((mx) > movemunber || (0 - mx) > movemunber || (my) > movemunber || (0 - my) > movemunber) {
                    isMove = true;
                }
                var _top = (y + my), _left = (x + mx);
                var maxtop = $(window).height()-$(this).height();//获取最小的宽度
                var maxleft = $(window).width() - $(this).width();//获取最大的宽度
                _top = _top < 0 ? 0 : (_top > maxtop ? maxtop : _top);//避免小球移除移出去
                _left = _left > 0 ? _left : 0;//避免小球移除移出去
                $(this).offset({ top: _top , left: _left });
                mx = move.x;
                my = move.y;
                // isMove = true;
            }
            return false;//取消元素事件向下冒泡
        })
        $(".SuspendedBall").bind(PublicJs.Mouse.Up, function (e) {
            var _this = this;
            ///添加定时器，是因为有的时候move事件还没运行完就运行了这个事件，为了给这个时间添加一个缓冲时间这里定义了10毫秒
            setTimeout(function () {
                if (isMove) {//如果移动了执行移动方法
                    var move = { x: $(_this).offset().left, y: $(_this).offset().top };
                    var width = $(window).width() / 2;
                    var height = $(window).height() / 2;
                    var ToLeftOrRight = "left";
                    var ToTopOrBottom = "top";
                    var MoveTo = "x";
                    if (move.x > width) {
                        ToLeftOrRight = "right";
                        move.x = 2 * width - move.x;//左右边距
                    }
                    if (move.y > height) {
                        ToTopOrBottom = "bottom";
                        move.y = 2 * height - move.y;//上下边距
                    }
                    if (move.x > move.y) {
                        MoveTo = "y";
                    }

                    $(_this).removeClass("ToLeft").removeClass("ToTop").removeClass("ToBottom").removeClass("ToRight");//去除原样式
                    if (MoveTo == "x") {
                        if (ToLeftOrRight == "left") {
                            $(_this).addClass("ToLeft");
                        }
                        else {
                            $(_this).addClass("ToRight");
                        }
                    }
                    else {
                        if (ToTopOrBottom == "top") {
                            $(_this).addClass("ToTop");
                        }
                        else {
                            $(_this).addClass("ToBottom");
                        }
                    }
                }
                else {
                    if (typeof (UpFun) == "function") {
                        UpFun();
                    }
                    // $(".SuspendedBall").hide();
                    // $(".BallBox").show();
                }
                isDown = false;
                isMove = false;
            }, 10);
            return false;//取消元素事件向下冒泡
        })
    },
    //这个方法是显示页面上面的悬浮球方法
    ShowBall: function () {
        $(".SuspendedBall").show();
        $(".BallBox").hide();
    },
    //这个方法是显示页面上面的悬浮球菜单的方法
    ShowBox: function () {
        $(".SuspendedBall").hide();
        $(".BallBox").show();
    },
    //这个方法是给悬浮球菜单添加内容的方法
    BoxHtml: function (html) {
        $(".BallBoxInfo").html(html);
    },
    //这个方法是获取到父级页面的悬浮球的方法
    Partent: function () {
        if (typeof (window.parent.SuspendedBall) != "undefind") {
            return window.parent.SuspendedBall;
        }
        return null;
    }
};
//frame页面点击隐藏顶级父页面悬浮球菜单的方法
function FrameBodyClick() {
    var topWin = (function (p, c) {
        while (p != c) {
            c = p
            p = p.parent
        }
        return c
    })(window.parent, window);
    $("body").bind(PublicJs.Mouse.Down, function (e) {
        if (topWin.SuspendedBall) {
            if ($(window).width() < topWin.SuspendedBall.ShowWidth) {
                topWin.SuspendedBall.ShowBall();
            }
        }
    });
}

    FrameBodyClick();
// })

// SuspendedBall.js

// $(function () {
    SuspendedBall.Add();//添加悬浮球
    SuspendedBall.BoxHtml("<ul class=\"SMenu\">" + $("#MenuInfo").html() + "</ul>");//添加菜单框的内容当然，具体的样式和里面的内容需要自己去写
    SuspendedBall.Move();//这个就是让悬浮球动起来的方法。为啥单独写个不写到add方法里面呢？因为你可以在页面中直接写入悬浮球的两个div。这个方法里面可以添加一个参数，这个参数是个function。当鼠标抬起的时候会调用到这个方法。
});

// 页面使用的js