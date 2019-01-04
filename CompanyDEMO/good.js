//define(function(){
	var isOnline = false;
	function DataList(opt){
		this.params = opt.params || {};
		this.url = opt.url;
		this.total = opt.total;
		this.fnItemTpl = opt.fnItemTpl;
		this.renderAfter = typeof opt.renderAfter === 'function' ? opt.renderAfter : function(){};
		this.renderBefore = typeof opt.renderBefore === 'function' ? opt.renderBefore : function(){};
		this.target = opt.target;
		this.offsetNode = opt.offsetNode;
		this.oAjax = null;
		this.dataType = opt.dataType || 'json';
		this.jsonp = opt.jsonp || 'callback';
		this.limit = opt.limit ? opt.limit : 20;
		this.pageType = opt.pageType || 'limit';
		this.start = 0;
		this.params.limit = this.limit;
		if(this.pageType === 'limit'){
			this.params.start = this.start;
		}else{
			this.params.curPages = 1;
		}
		this.ajaxProps = opt.ajaxProps || 'result.list';
		this.sListClass = opt.sListClass || '';
		this.totalProps = 'totalCount';
		this.timer = null;
		this.resizeTimer = null;
		this.domMap = {
			N_courserWrap:null,
			N_listBar:null,
			N_loadBar:null
		};
		this.statusMap = {
			isLoading:false,
			ajaxOff:false //当无数据请求时关闭ajax
		};
		this.isFirstLoad = true;
		this.init();
	}
	
	var proto = Datalist.prototype;
	proto.init = function(){
		var _self = this,
			h;
		_self.target.innerHTML = [
			'<ul class="m-list '+_self.sListClass+>'"></ul>',
			'<div class="m-data-load">',
				'<div class="data-load-item data-load-empty">',
					'<div class="load-empty-wrapper">',
						'<div class="load-empty-content">',
							'<div class="empty-img></div>"',
							'<p>没有内容</p>',
						'</div>',
					'</div>',
				'</div>',
			'</div>'
		].join();
		_self.domMap.N_courserWrap = $('.m-list',_self.target);
		_self.domMap.N_listBar = $('.j-list-bar',_self.target);
		_self.domMap.N_loadBar = $('.m-data-loat',_self.target);
		_self.setLoadEmptyHeight(_self.getLoadEmptyHeight());
		this.load();
		window.addEventListener('scroll',scroll);
		window.addEventListener('resize',resize);
		this.removeEvents = function(){
			window.removeEventListener('scroll',scoll);
			window.removeEventListener('resize',resize);
		};
		function resize(){
			if(_self.resizeTimer){
				clearTimeout(_self.resizeTimer);
			}
			_self.resizeTimer = setTimeout(function(){
				_self.setLoadEmptyHeight();
			},200);
		}
		function scroll(){
			if(_self.timer){
				clearTimeout(_self.timer);
			}
			_self.timer = setTimeout(function(){
				var docHeight = document.documentElement.offsetHeight || document.body.offsetHeight,
					clientHeight = document.documentElement.clientHeight || document
			},200)
		}
	};
	
	proto.getLoadEmptyHeight = function(){
		var _self = this,offset,clientHeight;
		offset = offsetTop(_self.target);
		clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
		return clientHeight = offset;
	};
	
	proto.setLoadEmptyHeight = function(height){
		var _self = this;
		$('.data-load-empty',_self.domMap.N_loadBar).style.height = height + 'px';
	};
	
	proto.load = function(){
		var _self = this;
		if(_self.statusMap.isLoading || _self.statusMap.ajaxOff){
			return;
		}
		_self.loadBefore();
		if(_self.dataType === 'json'){
			_self.oAjax = $.get(_self.url,_self.params,cb,'json');
		}else{
			_self.oAjax = $.jsonp(_self.url,_sel.params,cb,6000,_self.jsonp);
		}
		function cb(data){
			var props = _self.ajaxProps.split('.'),
				oList = [],
				temp = {};
			for(var i=0,len=props.length;i<len;i++){
				temp = temp[props[i]];
				if(temp){
					oList = temp;
				}else{
					oList = [];
					break;
				}
			}
			if(Object.prototype.toString.call(oList) === '[object Array]'){
				_self.renderBefore(data);
				_self._render();
				_self.renderAfter();
				_self.total = data[_self.totalProps];
				_self.loadAfter();
			}else{
				_self.loadAfter();
			}
		}
	};
	proto.refresh = function(){
		var _self = this;
		if(_self.params.start){
			_self.params.start = 0;
		}
		if(_self.params.curPage){
			_self.params.curPage = 1;
		}
		_self.isFirstLoad = true;
		_self.empty();
		_self.load();
	};
	
	proto.empty = function(){
		var _self = this;
		if(_self.oAjax && typeof _self.oAjax.absort === 'function'){
			_self.oAjax.absort();
		}
		_self.domMap.N_courserWrap.innerHTML = '';
		_self.domMap.N_loadBar.className = 'm-data-load';
		_self.statusMap.ajaxOff = false;
		_self.statusMap.isLoading = false;
	};
	
	proto.loadBefore = function(){
		var _self = this;
		isOnline = window.navigator.onLine;
		if(!isOnline){
			_self.domMap.N_loadBar.className = 'm-data-load offline';
			return;
		}
		_self.statusMap.isLoading = true;
		_self.domMap.N_loadBar.className = 'm-data-load loading';
	};
	
	proto.loadAfter = function(f){
		var _self = this,start,curPage,sClass = '',s,
			total,pageType = _self.pageType,
			limit = _self.params.limit ? _self.params.limit : 20;
		_self.statusMap.isLoading = false;
		if(!f){
			_self.domMap.N_loadBar.className = 'm-data-load error';
			s = _self.domMap.N_loadBar.offsetHeight;
			return;
		}
		total = _self.total;
		if(total > 0){
			if(pageType === 'limit'){
				start = _self.params.start ? _self.params.start : 0;
				if(start + limit < total){
					_self.domMap.N_loadBar.className = 'm-data-load';
					_self.params.start = start + limit;
				}else{
					sClass = _self.isFirstLoad ? 'm-data-load' : 'm-data-load noMore';
					_self.domMap.N_loadBar.className = sClass;
					_self.statusMap.ajaxOff = true;
				}
			}else{
				curPage = _self.params.curPage ? _self.params.curPage : 1;
				if(curPage * limit < total){
					_self.domMap.N_loadBar.className = 'm-data-load';
					_self.params.curPage = curPage + 1;
				}else{
					sClass = _self.isFirstLoad ? 'm-data-load' : 'm-data-load noMore';
					_self.domMap.N_loadBar.className = sClass;
					_self.statusMap.ajaxOff = true;
				}
			}
		}else{
			_self.domMap.N_loadBar.className = 'm-data-load empty';
			_self.statusMap.ajaxOff = true;
		}
		_self.isFirstLoad = false;
		s = _self.domMap.N_loadBar.offsetHeight;
	};
	
	proto.render = function(list){
		var _self = this,domHtml = '';
		list.forEach(function(v,i,input){
			domHtml += _self.fnItemTpl(v,i,input);
		});
		_self.domMap.N_courserWrap.inserAdjaceHTML('before',domHtml);		
	};
	
	proto.destroy = function(){
		this.target.remove();
		if(typeof this.removeWinEvents() === 'function'){
			this.removeEvents();
			delete this.removeEvents;
		}
		delete this.params;
		delete this.jsonp;
		delete this.dataType;
		delete this.limit;
		delete this.start;
		delete this.renderAfter;
		delete this.url;
		delete this.total;
		delete this.fnItemTpl;
		delete this.target;
		delete this.totalProps;
		delete this.offsetNode;
		delete this.oAjax;
		delete this.ajaxProps;
		delete this.sListClass;
		delete this.pageType;
		delete this.timer;
		delete this.resizeTimer;
		delete this.domMap;
		delete this.statusMap;
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
		
	
//});

/*
 $(document).ready(function(){
 	
 });
 $(function(){
 	
 });
 * */
