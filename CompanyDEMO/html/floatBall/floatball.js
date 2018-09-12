var suspendedBall = document.querySelector('.suspendedBall');

//获取内部样式表属性的属性值----不带单位的数值
function getStyleValue(obj,attributeName){
	if(obj.currentStyle){ //IE用
		return parseFloat(obj.currentStyle[attributeName]);
	}else{
		return parseFloat(window.getComputedStyle(obj,null)[attributeName]);//兼容FF
	}
}

// var window_x = document.body.offsetWidth || document.documentElement.offsetWidth;
var window_x;
// var window_y = document.body.offsetHeight || document.documentElement.offsetHeight;
var window_y;


suspendedBall.addEventListener('touchstart',function(e){
	window_x = e.view.innerWidth;//屏幕的宽度
	window_y = e.view.innerHeight;//屏幕的可用高度，不包含滚动条

	
	var _this = this;
	var e = e || window.event;
	//如果有动画的类名，先将其移除
	if(_this.classList.contains('ToLeft')){
		_this.classList.remove('ToLeft');
	}else if(_this.classList.contains('ToRight')){
		_this.classList.remove('ToRight');
	}else if(_this.classList.contains('ToTop')){
		_this.classList.remove('ToTop');
	}else if(_this.classList.contains('bbb')){
		_this.classList.remove('bbb');
	}



	var touchObj = e.touches[0];//获取触摸点的坐标
	// console.log(e)
	var x = touchObj.clientX;
	var y = touchObj.clientY;
	var half_x = getStyleValue(_this,'width')/2;
	var half_y = getStyleValue(_this,'height')/2;

	
	//防止溢出外面
	 if(x>window_x-half_x){
		x = window_x-half_x;
	}else if(x<half_x){
		x = half_x;
	}
	
	if(y>window_y-half_y){
		y = window_y-half_y
	}else if(y<half_y){
		y=half_y;
	}
	var _this_left = x-half_x;
	var _this_top = y-half_y;

	_this.style.left = _this_left+'px';
	_this.style.top = _this_top+'px';

})
suspendedBall.addEventListener('touchmove',function(e){

	var _this = this;
	var e = e || window.event;
	var touchObj = e.touches[0];//获取触摸点的坐标
	// console.log(e)
	var x = touchObj.clientX;
	var y = touchObj.clientY;
	var half_x = getStyleValue(_this,'width')/2;
	var half_y = getStyleValue(_this,'height')/2;

	
	
	 if(x>window_x-half_x){
		x = window_x-half_x;
	}else if(x<half_x){
		x = half_x;
	}
	
	if(y>window_y-half_y){
		y = window_y-half_y
	}else if(y<half_y){
		y=half_y;
	}
	var _this_left = x-half_x;
	var _this_top = y-half_y;
	_this.style.left = _this_left+'px';
	_this.style.top = _this_top+'px';

	e.preventDefault();//阻止默认行为

})

suspendedBall.addEventListener('touchend',function(e){
	var _this = this;
	var e = e || window.event;
	
	var targetObj = e.target;
	
	var target_x = parseFloat(targetObj.style.left);
	var target_y = parseFloat(targetObj.style.top);

	var hole_x = getStyleValue(_this,'width');
	var hole_y = getStyleValue(_this,'height');

	
	//判断是往哪个方向滑动
	// var move_top = 

	//如果在中间，都是左右滑动，如果在上面或下面就要判断
	if(target_y>window_x/2 && target_y<(window_y-window_x/2)){
		if(target_x>(window_x/2-hole_x/2)){			
			_this.classList.add('ToRight')
		}else{
			_this.classList.add('ToLeft');
		}
	}else if(target_y<=window_x/2){
		if(target_x<window_x/2){
			if(target_y<target_x){
				_this.classList.add('ToTop');
			}else{
				_this.classList.add('ToLeft');
			}
		}else{
			if(target_y<(window_x-target_x-hole_x)){//如果在右边，就判读离右边的距离，用总长度减去x的坐标和自身宽度
				_this.classList.add('ToTop');
			}else{
				_this.classList.add('ToRight');
			}
		}
		
	}else{
		if(target_x<window_x/2){
			if((window_y-target_y-hole_y)<target_x){//最下边的距离如果小于x的宽度，就往下
				_this.classList.add('bbb');
			}else{
				_this.classList.add('ToLeft');
			}
		}else{
			if((window_y-target_y-hole_y)<(window_x-target_x-hole_x)){
				_this.classList.add('bbb');
			}else{
				_this.classList.add('ToRight');
			}
		}
	}
})