/**
 * @version    
 */ 
(function($) {
	var arrweebox = [];
	
	// 预加载对话框边框图片
	var preloadingImg = function() {
		for (var i = 0, item; item = arguments[i]; i++) {
			if (typeof item == 'string' && item.length > 0) {
				try {
					new Image().src = item;
				} catch (e) {}
			}
		}
	};
	
	preloadingImg(IMG_PATH + '/market/dialog/dialog-tl.png', IMG_PATH + '/market/dialog/dialog-tr.png', IMG_PATH + '/market/dialog/dialog-bl.png', 
		IMG_PATH + '/market/dialog/dialog-br.png', IMG_PATH + '/market/dialog/dialog-square.png');
	
	var weebox = function(config) {
		var self 		= this;
		this.options    = {};			// 配置对象
		this.dh 		= null;			// 弹窗
		this.mh 		= null;			// 遮罩
		this.dc			= null;			// 内容
		this.df			= null;			// 底部
		this.db			= null;			// 按钮容器
		this.selector 	= null;			
		this.ajaxurl 	= null;			
		this._dragging 	= false;
		this._options 	= config || {};
		this._content 	= config.content || '';
		this.event = {};				// 弹窗实例事件
		this._defaults 	= {
			boxid: null,      // 设定了此值后，以后在打开同样boxid的弹窗时，前一个将被自动关闭
			boxclass: null,  
			title: '',       
			headStyle: '',	  // 弹窗头部样式
			bodyStyle : '',	// 弹窗内容区样式
			footStyle:'',
			width: 0,
			height: 0, 
			timeout: 0, 
			draggable: true,  
			modal: false,      
			position: 'center', 
			
			/*
			 	buttons: [{
					text: '确定',
					css: 'background-color: #AAA;',
					click: function() {
						console.log(this, 'this is button dom')
					}
				}, {
					text: '取消',
					click: function() {
						console.log(this, 'this is button dom')
					}
				}]
			 */
			buttons: [],			// array: button. if array length equal 0, will not show button container.
			clickClose: false,      // if click not in dialog content area, will close dialog.
			zIndex: 10000,          // z-index
			close: null,  			// events：Triggered when the dialog is closed.
			closeOnEscape: true,	// events：Specifies whether the dialog should close when it has focus and the user presses the esacpe (ESC) key.
			open: null  			// events: Triggered when the dialog is opened.
		};
		
		// 初始化选项
		this.initOptions = function() {
			self._options = self._options || {};
			self._options.title = self._options.title || '';
			self._options.boxclass = self._options.boxclass;
			
			self.options  = $.extend({}, self._defaults, self._options);
			self._options = null;
			self._defaults = null;
		};
		
		// 初始化弹窗Box
		this.initBox = function() {
			
			var html = ['<div class="dialog-box">',
				'<table class="dialog-table">',
					'<tr>',
						'<td class="td-tl"></td>',
						'<td class="td-mm"></td>',
						'<td class="td-tr"></td>',
					'</tr>',
					'<tr>',
						'<td class="td-mm"></td>',
						'<td class="td-content">',
						
							'<div class="dialog-header">',
								'<h3 class="dialog-title"></h3>',
								'<a title="关闭" class="dialog-close">×</a>',
							'</div>',
							'<div class="dialog-content"></div>',
							'<div class="dialog-button-container"></div>',
								
						'</td>',
						'<td class="td-mm"></td>',
					'</tr>',
					'<tr>',
						'<td class="td-bl"></td>',
						'<td class="td-mm"></td>',
						'<td class="td-br"></td>',
					'</tr>',
				'</table>',
			'</div>'].join('')
			self.dh = $(html).appendTo('body').css({
				position: 'absolute',	
				overflow: 'hidden',
				zIndex: self.options.zIndex
			});
			self.dc = self.find('.dialog-content');
			self.dt = self.find('.dialog-title');
			self.dr = self.find('.dialog-header');
			self.db = self.find('.dialog-button-container');
			
			if (self.options.boxid) {
				self.dh.attr('id', self.options.boxid);
			}
			if (self.options.boxclass) {
				self.dh.addClass(self.options.boxclass);
			}
			if (self.options.height > 0) {
				self.dc.css('height', self.options.height);
			}
			if (self.options.width > 0) {
				self.dh.css('width', self.options.width);
			}
			if (typeof self.options.headStyle === 'object') {
				self.dr.css($.extend({}, self.options.headStyle));
			}
			if (typeof self.options.bodyStyle === 'object') {
				self.dc.css($.extend({}, self.options.bodyStyle));
			}
			if (typeof self.options.footStyle === 'object') {
				self.db.css($.extend({}, self.options.footStyle));
			}
			self.dh.bgiframe();
		};
		
		//初始化遮照
		this.initMask = function() {
			if (self.options.modal) {
				if ($.browser.msie) {
                    h= document.compatMode == "CSS1Compat" ? document.documentElement.clientHeight : document.body.clientHeight;
                    w= document.compatMode == "CSS1Compat" ? document.documentElement.clientWidth : document.body.clientWidth;
                } else {
                    h= self.bheight();
                    w= self.bwidth();
                }
                
				self.mh = $('<div class="dialog-mask"></div>')
				.appendTo('body').css({
					width: w,
					height: h,
					zIndex: self.options.zIndex - 1
				}).bgiframe();
			}
		};
		
		// 初始化弹窗内容
		this.initContent = function(content) {
			
			// init buttons
			var _b = self.options.buttons, _btnDom;
			for (var i = 0, buttonConfig; buttonConfig = _b[i]; i++) {
				_btnDom = document.createElement('button');
				
				_btnDom._click = buttonConfig.click ? buttonConfig.click : self.close;
				
				//当背景色与默认不同（被重写）设置白色字；默认蓝色字，白色背景
				if(buttonConfig.css && buttonConfig.css.backgroundColor){
					buttonConfig.css.color = "#fff";
				}
				
				$(_btnDom).attr('type', 'button')
					.text(buttonConfig.text)
					.css($.extend({}, {
						//backgroundColor: '#AAA',
						marginLeft: i > 0 ? 30 : 0 
					}, buttonConfig.css))
					.click(function(event) {
						event.preventDefault();
						
						this._click();
				});
				if(buttonConfig.sClass){
					$(_btnDom)[0].className = buttonConfig.sClass;
				}
				self.db.append(_btnDom);
			}
			
			
			if (self.options.title) {
				self.dt.html(self.options.title);
			} else {
				self.dt.hide();
			}
			
			if (self.options.buttons.length === 0) {
				self.dh.find('.dialog-button-container').hide();
			}

			self.setContent(self._content);	
			self.show();
			self.event.open();
		};
		
		// 初始化弹窗事件
		this.initEvent = function() {
			self.dh.find(".dialog-close, .dialog-cancel").unbind('click').click(function(event) {
				event.preventDefault();
				self.close();
			});
			
			// setting tabIndex makes the div focusable
			// setting outline to 0 prevents a border on focus in Mozilla
			self.dh.attr('tabIndex', -1).css('outline', 0).keydown(function(event) {
				if (self.options.closeOnEscape && event.keyCode
					&& event.keyCode === 27) {
					
					self.close(event);
					event.preventDefault();
				}
			});
			
			if (self.options.timeout > 0) {
				window.setTimeout(self.close, (self.options.timeout * 1000));
			}
			
			this.drag();	
		};
		
		// 设置close事件
		this.setOnclose = function(fn) {
			self.options.close = fn;
		};
		
		// 弹窗拖拽
		this.drag = function() {
			if (self.options.draggable && self.options.title) {
				self.dr.css({
					cursor: 'move'
				}).mousedown(function(event){
					
					var h  = this; 
					var o  = document;
					var ox = self.dh.position().left;
					var oy = self.dh.position().top;
					var mx = event.clientX;
					var my = event.clientY;
					var width = self.dh.width();
					var height = self.dh.height();
					var bwidth = self.bwidth();
					var bheight = self.bheight(); 
			        if (h.setCapture) {
			            h.setCapture();
			        }
			        
					$(document).mousemove(function(event) {	
						if (window.getSelection) {
							window.getSelection().removeAllRanges();
						} else { 
				        	document.selection.empty();
				        }
						//TODO
						var left = Math.max(ox+event.clientX-mx, 0);
						var top = Math.max(oy+event.clientY-my, 0);
						var left = Math.min(left, bwidth-width);
						var top = Math.min(top, bheight-height);
						self.dh.css({left: left, top: top});
					}).mouseup(function(){
						if(h.releaseCapture) { 
			                h.releaseCapture();
			            }
				        $(document).unbind('mousemove');
				        $(document).unbind('mouseup');
					});
				});	
			}	
		};
		
		// 打开前的回弹函数
		this.event.open = function() {
			if (typeof(self.options.open) == "function") {
				self.options.open(self);
			}
		};
		
		// 显示弹窗
		this.show = function() {
			if (self.options.buttons.length > 0) {
				self.dh.find('.dialog-button-container').show();
			}
			if (self.options.position == 'center') {
				self.setCenterPosition();
			} else {
				self.setElementPosition();
			}
			
			self.dh.show();
			
			if (self.mh) {
				self.mh.show();
			}
		};
		
		this.hide = function(fn) {
			self.dh.hide(fn);
		};
		
		// 在弹窗内查找元素
		this.find = function(selector) {
			return self.dh.find(selector);
		};
		
		this.setWidth = function(width) {
			self.dh.width(width);
		};
		
		// 设置标题
		this.setTitle = function(title) {
			self.dt.html(title);
		};
		
		//取得标题
		this.getTitle = function() {
			return self.dt.html();
		};
		
		// 设置内容
		this.setContent = function(content) {
			self.dc.html(content);
			self.setCenterPosition();
		};
		
		// 取得内容
		this.getContent = function() {
			return self.dc.html();
		};

		// 关闭弹窗
		this.close = function(n) {
			if (typeof(self.options.close) == "function") {
				self.options.close(self);
			}

			//从数组中删除
			for (i = 0; i < arrweebox.length; i++) {
				if (arrweebox[i].dh.get(0) == self.dh.get(0)) {
					arrweebox.splice(i, 1);
					break;
				}
			}
			self.hide();
			self.dh.remove();
			if (self.mh) {
				self.mh.remove();
			}
		};
		
		// 取得遮照高度
		this.bheight = function() {
			if ($.browser.msie && $.browser.version < 7) {
				var scrollHeight = Math.max(
					document.documentElement.scrollHeight,
					document.body.scrollHeight
				);
				var offsetHeight = Math.max(
					document.documentElement.offsetHeight,
					document.body.offsetHeight
				);
				
				if (scrollHeight < offsetHeight) {
					return $(window).height();
				} else {
					return scrollHeight;
				}
			} else {
				return $(document).height();
			}
		};
		
		// 取得遮照宽度
		this.bwidth = function() {
			if ($.browser.msie && $.browser.version < 7) {
				var scrollWidth = Math.max(
					document.documentElement.scrollWidth,
					document.body.scrollWidth
				);
				var offsetWidth = Math.max(
					document.documentElement.offsetWidth,
					document.body.offsetWidth
				);
				
				if (scrollWidth < offsetWidth) {
					return $(window).width();
				} else {
					return scrollWidth;
				}
			} else {
				return $(document).width();
			}
		};
		
		// 将弹窗显示在中间位置
		this.setCenterPosition = function() {
			var wnd = $(window), doc = $(document),
				pTop = doc.scrollTop(),	pLeft = doc.scrollLeft();
			pTop += (wnd.height()- self.dh.height()) / 2 ;
			pLeft += (wnd.width() - self.dh.width()) / 2;
			self.dh.css({top: pTop, left: pLeft});
		};
		
		// 根据元素设置弹窗显示位置
		this.setElementPosition = function() {
			var trigger = $(self.options.position.refele);
			var reftop = self.options.position.reftop || 0;
			var refleft = self.options.position.refleft || 0;
			var adjust = (typeof self.options.position.adjust=="undefined")?true:self.options.position.adjust;
			var top = trigger.offset().top + trigger.height();
			var left = trigger.offset().left;
			var docWidth = document.documentElement.clientWidth || document.body.clientWidth;
			var docHeight = document.documentElement.clientHeight|| document.body.clientHeight;
			var docTop = document.documentElement.scrollTop|| document.body.scrollTop;
			var docLeft = document.documentElement.scrollLeft|| document.body.scrollLeft;
			var docBottom = docTop + docHeight;
			var docRight = docLeft + docWidth;
			if (adjust && left + self.dh.width() > docRight) {
				left = docRight - self.dh.width() - 1;
			}
			if (adjust && top + self.dh.height() > docBottom) {
				top = docBottom - self.dh.height() - 1;
			}
			left = Math.max(left+refleft, 0);
			top = Math.max(top+reftop, 0);
			self.dh.css({top: top, left: left});
		}
		
		this.initOptions();
		this.initMask();
		this.initBox();		
		this.initContent();
		this.initEvent();
	};
	
	/**
	 * @constructor weeboxs
	 */
	function weeboxs() {		
		var self = this;
		this._onbox = false;
		this._opening = false;
		this.zIndex = 10000;
		this.length = function() {
			return arrweebox.length;
		}
		this.open = function(options) {
			self._opening = true;
			if (typeof(options) == "undefined") {
				options = {};
			}
			if (options.boxid) {
				for(var i=0; i<arrweebox.length; i++) {
					if (arrweebox[i].dh.attr('id') == options.boxid) {
						arrweebox[i].close();
						break;
					}
				}
			}
			options.zIndex = self.zIndex;
			self.zIndex += 10;
			var box = new weebox(options);
			box.dh.click(function(){self._onbox = true;});
			arrweebox.push(box);
			/*-----解决在ie下页面过大时出现部分阴影没有覆盖的问题-----by ePim*/
			if (box.options.position != "center"){
				box.setElementPosition();
			}
			if (box.mh) {
				box.mh.css({
					width: box.bwidth(),
					height: box.bheight()
				});
			}
			/*-----解决在ie下页面过大时出现部分没有遮罩的问题-----by ePim(WanJiDong@gmail.com)*/
			return box;
		};
		
		// 关闭最上层窗体,程序调用方法：jQuery.weeboxs.close();
		this.close = function(){
			var closingBox = this.getTopBox();
			if(false!=closingBox) {
				closingBox.close();
			}
		};
		
		this.getTopBox = function() {
			if (arrweebox.length>0) {
				return arrweebox[arrweebox.length-1];
			} else {
				return false;
			}
		};
		
		$(window).scroll(function() {
			if (arrweebox.length > 0) {
				for (i = 0; i < arrweebox.length; i++) {
					var box = arrweebox[i];

					if (box.options.position != "center"){
						box.setElementPosition();
					}
					if (box.mh) {
						box.mh.css({
							width: box.bwidth(),
							height: box.bheight()
						});
					}
				}
			}		
		}).resize(function() {
			if (arrweebox.length > 0) {
				var box = self.getTopBox();

				if (box.mh) {
					box.mh.css({
						width: box.bwidth(),
						height: box.bheight()
					});
				}
			}
		});
		
		
		$(document).click(function(event) {
			if (event.button == 2)
				return true;
			if (arrweebox.length > 0) {
				var box = self.getTopBox();
				if (!self._opening && !self._onbox && box.options.clickClose) {
					box.close();
				}
			}
			self._opening = false;
			self._onbox = false;
		});
	}
	
	$.extend({
		dialog : new weeboxs().open
	});		
})(jQuery);


/*! Copyright (c) 2010 Brandon Aaron (http://brandonaaron.net)
 * Licensed under the MIT License (LICENSE.txt).
 *
 * Version 2.1.2
 */

(function($){

$.fn.bgiframe = ($.browser.msie && /msie 6\.0/i.test(navigator.userAgent) ? function(s) {
    s = $.extend({
        top     : 'auto', // auto == .currentStyle.borderTopWidth
        left    : 'auto', // auto == .currentStyle.borderLeftWidth
        width   : 'auto', // auto == offsetWidth
        height  : 'auto', // auto == offsetHeight
        opacity : true,
        src     : 'javascript:false;'
    }, s);
    var html = '<iframe class="bgiframe"frameborder="0"tabindex="-1"src="'+s.src+'"'+
                   'style="display:block;position:absolute;z-index:-1;'+
                       (s.opacity !== false?'filter:Alpha(Opacity=\'0\');':'')+
                       'top:'+(s.top=='auto'?'expression(((parseInt(this.parentNode.currentStyle.borderTopWidth)||0)*-1)+\'px\')':prop(s.top))+';'+
                       'left:'+(s.left=='auto'?'expression(((parseInt(this.parentNode.currentStyle.borderLeftWidth)||0)*-1)+\'px\')':prop(s.left))+';'+
                       'width:'+(s.width=='auto'?'expression(this.parentNode.offsetWidth+\'px\')':prop(s.width))+';'+
                       'height:'+(s.height=='auto'?'expression(this.parentNode.offsetHeight+\'px\')':prop(s.height))+';'+
                '"/>';
    return this.each(function() {
        if ( $(this).children('iframe.bgiframe').length === 0 )
            this.insertBefore( document.createElement(html), this.firstChild );
    });
} : function() { return this; });

// old alias
$.fn.bgIframe = $.fn.bgiframe;

function prop(n) {
    return n && n.constructor === Number ? n + 'px' : n;
}

})(jQuery);
