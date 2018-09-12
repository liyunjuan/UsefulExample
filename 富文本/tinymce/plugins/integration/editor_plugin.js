/**
 * editor_plugin_src.js Copyright 2013, Ablesky Released under LGPL License.
 * License: http://tinymce.moxiecode.com/license Contributing:
 * http://www.ablesky.com
 */

(function(tinymce) {
	var DOM = tinymce.DOM, Event = tinymce.dom.Event, is = tinymce.is, each = tinymce.each;

	tinymce.create('tinymce.plugins.ASEditorPlugin', {
	    init: function(ed, url) {

		    var agent = navigator.userAgent.toLowerCase(), isIE6 = /msie 6/.test(agent), isIE7 = /msie 7/.test(agent);
		    var _dialogs = [];

		    /**
			 * image
			 */
		    ed.addCommand('_mceImage', function() {

			    var isAMD = typeof define === 'function' && define.amd && define.amd.jQuery;
			    var TAB_UPLOAD_IMAGE = 'uploadImage', TAB_NETLINKS = 'netlinks';

			    if (!_dialogs['image']) {
				    _dialogs['image'] = true;

				    var uploadSize = 40;
				    var $uploadWin = $.dialog({
				        title: '插入图片',
				        modal: true,
				        content: ['<div class="mce-editor-insert-photo clearfix">', '<ul class="tabs-nav clearfix">', '<li class="select" data-tab="', TAB_UPLOAD_IMAGE, '">上传图片</li>', '<li data-tab="netlinks">网络图片</li>' + '</ul>',

				        '<div class="tabs-container">', '<div class="tabs-', TAB_UPLOAD_IMAGE, '">', '<div class="insert-tip">请从本地选择图片，图片格式必须为PNG,JPG,JPEG或GIF.且图片大小不能超过2M.</div>', '<form enctype="multipart/form-data" method="POST">', '<input type="hidden" name="postImage" value="2" />',
				                '<input type="hidden" name="type" value="1" />',

				                '<span>上传文件：</span>', '<input type="file" name="picture1" size="' + uploadSize + '" class="field-file" onchange="document.getElementById(\'J_uploadFilePathField\').value=this.value" />',
				                '<input type="text" class="field field-path" autocomplete="off" id="J_uploadFilePathField" />',

				                '<button type="button" class="button-browse">浏览</button>', '<button type="submit" style="display: none;">submit</button>', '</form>', '</div>',

				                '<div class="tabs-', TAB_NETLINKS, '">', '<div class="insert-tip">举例：http://stat.ablesky.com/content/images/icon/absLogo.jpg</div>', '<form enctype="multipart/form-data" method="post">',
				                '<input type="text" class="field" autocomplete="off" style="margin-bottom: 5px;" />', '<input type="text" class="field" autocomplete="off" style="margin-bottom: 5px;" />', '<input type="text" class="field" autocomplete="off" style="margin-bottom: 5px;" />',
				                '<input type="text" class="field" autocomplete="off" style="margin-bottom: 5px;" />', '<input type="text" class="field" autocomplete="off" />', '</form>', '</div>', '</div>',

				                '<div class="valid-container"></div>', '</div>'].join(''),
				        buttons: [{
				            text: '上传',
				            css: {
					            backgroundColor: '#09F'
				            },
				            click: function() {
					            $('.tabs-' + currentTab + ' form', $uploadPhotoContainer).submit();
				            }
				        }, {
					        text: '取消'
				        }],
				        width: 500,
				        close: function() {
					        _dialogs['image'] = false;
				        }
				    });

				    var $uploadPhotoContainer = $(".mce-editor-insert-photo"), // 顶层容器
				    $tabsNav = $('.tabs-nav', $uploadPhotoContainer), // 选项卡
				    $fileInput = $('input[type="file"]', $uploadPhotoContainer), // 上传路径
				    $validContainer = $('.valid-container', $uploadPhotoContainer), // 验证信息展示容器
				    currentTab = TAB_UPLOAD_IMAGE; // 默认为上传图片Tab

				    $('.button-browse', $uploadPhotoContainer).on({
					    mouseover: function() {
						    $('input[type="file"]', $uploadPhotoContainer).show();
					    }
				    });

				    $fileInput.on({
					    mouseout: function() {
						    $(this).hide();
					    }
				    });

				    // 上传图片表单提交
				    $('form', $uploadPhotoContainer).submit(function() {
					    var $form = $(this);

					    function doSubmit() {
					    	var hasCover = $("#background-pic").attr("itemid");
					    	var requestUrl = "communityapi.do?action=orgPostUploadThreadPhoto";
					    	if(hasCover!=0){
					    		requestUrl += "&hasCover="+hasCover;
					    	}
						    $form.ajaxSubmit({
						        beforeSubmit: beforeSubmit,
						        success: uploadSuccess,
						        timeout: 1000 * 10,
						        url: requestUrl,
						        type: 'POST',
						        dataType: 'json',
						        iframe: true
						    });
					    }

					    if (currentTab == TAB_UPLOAD_IMAGE) {
						    if (isAMD) {
							    require(['lib/jquery/jquery.form'], function() {
								    doSubmit();
							    });
						    } else {
							    doSubmit();
						    }
					    } else if (currentTab == TAB_NETLINKS) {
						    // 遍历网路图片TAB下的文本框
						    $.each($('.tabs-' + TAB_NETLINKS + ' input[type="text"]', $uploadPhotoContainer), function() {
							    if (this.value) {
								    insertImage(this.value);
							    }
						    });

						    $uploadWin.close();
					    }

					    // to prevent standard browser submit and page
					    // navigation
					    return false;
				    });

				    $('li', $tabsNav).click(function() {
					    var $this = $(this);
					    currentTab = $this.attr('data-tab');

					    if (currentTab == TAB_NETLINKS) {
						    $validContainer.hide(); // 隐藏验证信息
					    }
					    $this.addClass('select').siblings('li').removeClass('select');
					    $('.tabs-' + currentTab, $uploadPhotoContainer).show().siblings().hide();
				    });

				    function beforeSubmit() {
					    var $photo = $("input[name='picture1']", $uploadPhotoContainer);
					    try {
						    var fileName = $.trim($photo.val());
						    var regFileType = new RegExp('(\.|\/)(png|jpg|jpeg|gif)$', 'i');
						    var flag = false;
						    if (fileName == '') {
							    $validContainer.show().html('<span style="color:#F33;">请选择要上传的图片</span>');
						    } else if (!regFileType.test(fileName)) {
							    $validContainer.show().html('<span style="color:#F33;">图片格式必须为PNG,JPG,JPEG或GIF.</span>');
						    } else {
							    $validContainer.show().html('<span style="color:#7B4;"><img src="' + IMG_PATH + '/market/common/loading-16-16.gif" />上传文件中，请稍等...</span>');
							    flag = true;
						    }
						    return flag;
					    } catch (e) {
						    return false;
					    }
				    }

				    function uploadSuccess(data) {
					    if (data && data.success) { // data.success返回的永远是true,除了在后端出异常的情况下，所以不能根据此值来判断图片是否上传成功
						    if (data.urlList.length) {// urlList不为空时才是上传成功
							    $validContainer.hide();
							    var list = data.urlList;
							    for ( var i = 0; i < list.length; i++) {
								    insertImage(list[i].replace(/\&amp;/g, '&'));
							    }
							    $uploadWin.close();
							    $('#background-pic').css('display','block');
							    $('#background-pic').attr('src',data.photoUrl).attr('itemid',data.photoId);
								$('.btn1').css('display','none');
								$('.btn2').css('display','block');
								$('.btn3').css('display','block');
						    } else {// 上传失败
							    $validContainer.show().html('<span style="color:#F33;">文件过大,请上传2M以内的图片.</span>');
						    }
					    } else if (data && data.message) {
						    $uploadWin.setContent(data.message);
					    }
				    }

				    var insertImage = function(link) {
					    if (tinymce) {
						    var args = {
						        vspace: '',
						        hspace: '',
						        border: '',
						        align: ''
						    }
						    tinymce.extend(args, {
							    src: link
						    });

						    ed.execCommand('mceInsertContent', false, DOM.createHTML('img', args), {
							    skip_undo: 1
						    });
						    ed.undoManager.add();
					    }
				    }
			    }
		    });
		    ed.addButton('image', {
		        title: 'ASEditor.image_title',
		        cmd: '_mceImage'
		    });

		    // /**
		    // * media
		    // */
		    // ed.addCommand('_mceInsertMedia', function() {
		    //				
		    // });
		    // ed.addButton('media', {title : 'ASEditor.media_title', cmd :
		    // '_mceInsertMedia'});

		    /**
			 * faces
			 */
		    ed.addCommand('_mceEmotions', function() {

			    if (!_dialogs['emotion']) {
				    _dialogs['emotion'] = true;

				    var faceTitles = ['微笑', '大笑', '调皮', '难过', '气愤', '大哭', '疑问', '流汗', '可怜', '惊讶', '睡', '害羞', '色', '酷', '病', '头晕', '笑嘻嘻', '鄙视', '安心', '天使', '魔鬼', '示爱', '爱心', '心碎', '玫瑰', '凋谢', '强', '弱', '握手', '金币', '礼物', '学历'];
				    var htmlArr = ['<div class="mce-editor-emotions"><table>'];

				    for ( var i = 0, item; item = faceTitles[i]; i++) {
					    if (i % 8 === 0) {
						    htmlArr.push('<tr>');
					    }

					    htmlArr.push('<td><img class="emotion" title="' + faceTitles[i] + '" src="' + IMG_PATH + '/icon_v5/emotions/default/' + (i + 1) + '.gif" /></td>');

					    if ((i + 1) % 8 === 0) {
						    htmlArr.push('</tr>');
					    }
				    }
				    htmlArr.push('</table></div>');

				    var $dialog = $.dialog({
				        title: '添加表情',
				        content: htmlArr.join(''),
				        buttons: [{
					        text: '取消'
				        }],
				        open: function() {
					        $('.mce-editor-emotions img.emotion').click(function(event) {
						        event.preventDefault();

						        var selectionBookmark = ed.selection.getBookmark();
						        ed.selection.moveToBookmark(selectionBookmark);

						        ed.execCommand('mceInsertContent', false, $(this).parent().html());
						        ed.undoManager.add();

						        $dialog.close();
					        });
				        },
				        close: function() {
					        _dialogs['emotion'] = false;
				        }
				    });
			    }
		    });
		    ed.addButton('emotions', {
		        title: 'ASEditor.emotions_title',
		        cmd: '_mceEmotions'
		    });

		    /**
			 * insert link
			 */
		    ed.addCommand('_mceASInsertLink', function() {
			    var inst = ed;
			    var se = ed.selection;
			    var elm = se.getNode();
			    var bookMark = se.getBookmark(1);
			    ;
			    var href = ed.dom.getAttrib(elm, 'href');

			    // No selection and not in link
			    if (se.isCollapsed() && !ed.dom.getParent(se.getNode(), 'A'))
				    return;

			    function isEmail(s) {
				    function test(s, p) {
					    s = s.nodeType == 1 ? s.value : s;

					    return s == '' || new RegExp(p).test(s);
				    }

				    return test(s, '^[-!#$%&\'*+\\./0-9=?A-Z^_`a-z{|}~]+@[-!#$%&\'*+\\/0-9=?A-Z^_`a-z{|}~]+\.[-!#$%&\'*+\\./0-9=?A-Z^_`a-z{|}~]+$');
			    }

			    function checkPrefix(n) {
				    if (n.value && isEmail(n) && !/^\s*mailto:/i.test(n.value) && confirm('\u60a8\u8f93\u5165URL\u662f\u7535\u5b50\u90ae\u4ef6\u5730\u5740\uff0c\u662f\u5426\u9700\u8981\u52a0\"mailto:\"\u524d\u7f00\uff1f'))
					    n.value = 'mailto:' + n.value;

				    if (/^\s*www\./i.test(n.value) && confirm('\u60a8\u8f93\u5165\u7684URL\u662f\u4e00\u4e2a\u5916\u90e8\u94fe\u63a5\uff0c\u662f\u5426\u8981\u52a0\u4e0a\"http://\"\u524d\u7f00\uff1f'))
					    n.value = 'http://' + n.value;
			    }

			    function setAttrib(elm, attrib, value) {
				    var dom = ed.dom;

				    if (typeof (value) == "undefined" || value == null) {
					    value = "";
				    }

				    // Clean up the style
				    if (attrib == 'style')
					    value = dom.serializeStyle(dom.parseStyle(value), 'a');

				    dom.setAttrib(elm, attrib, value);
			    }

			    function setAllAttribs(elm) {
				    var href = $('.mce-editor-insert-link input').get(0).value.replace(/ /g, '%20');

				    setAttrib(elm, 'href', href);
				    setAttrib(elm, 'title');
				    setAttrib(elm, 'target', '_blank');
				    setAttrib(elm, 'id');
				    setAttrib(elm, 'style');
				    setAttrib(elm, 'rel');
				    setAttrib(elm, 'rev');
				    setAttrib(elm, 'charset');
				    setAttrib(elm, 'hreflang');
				    setAttrib(elm, 'dir');
				    setAttrib(elm, 'lang');
				    setAttrib(elm, 'tabindex');
				    setAttrib(elm, 'accesskey');
				    setAttrib(elm, 'type');
				    setAttrib(elm, 'onfocus');
				    setAttrib(elm, 'onblur');
				    setAttrib(elm, 'onclick');
				    setAttrib(elm, 'ondblclick');
				    setAttrib(elm, 'onmousedown');
				    setAttrib(elm, 'onmouseup');
				    setAttrib(elm, 'onmouseover');
				    setAttrib(elm, 'onmousemove');
				    setAttrib(elm, 'onmouseout');
				    setAttrib(elm, 'onkeypress');
				    setAttrib(elm, 'onkeydown');
				    setAttrib(elm, 'onkeyup');

				    // Refresh in old MSIE
				    if (tinyMCE.isMSIE5)
					    elm.outerHTML = elm.outerHTML;
			    }

			    function insertAction() {
				    var inst = ed;
				    var elm, elementArray, i;
				    var linkInput = $('.mce-editor-insert-link input').get(0);

				    // 获取在编辑器内选中的文本
				    ed.selection.moveToBookmark(bookMark);
				    var e = ed.dom.getParent(ed.selection.getNode(), "A");
				    if (e) {
					    var b = ed.selection.getBookmark(1);
					    ed.dom.remove(e, 1);
					    ed.selection.moveToBookmark(b);
				    }

				    elm = inst.selection.getNode();
				    checkPrefix(linkInput);

				    elm = inst.dom.getParent(elm, "A");

				    // Remove element if there is no href
				    if (!linkInput.value) {
					    i = inst.selection.getBookmark();
					    inst.dom.remove(elm, 1);
					    inst.selection.moveToBookmark(i);
					    ed.execCommand("mceEndUndoLevel");
					    $dialog.close();
					    return;
				    }

				    // Create new anchor elements
				    if (elm == null) {
					    inst.getDoc().execCommand("unlink", false, null);
					    ed.execCommand("mceInsertLink", false, "#mce_temp_url#", {
						    skip_undo: 1
					    });

					    elementArray = tinymce.grep(inst.dom.select("a"), function(n) {
						    return inst.dom.getAttrib(n, 'href') == '#mce_temp_url#';
					    });
					    for (i = 0; i < elementArray.length; i++) {
						    setAllAttribs(elm = elementArray[i]);
					    }
				    } else setAllAttribs(elm);

				    // Don't move caret if selection was image
				    if (elm.childNodes.length != 1 || elm.firstChild.nodeName != 'IMG') {
					    inst.focus();
					    inst.selection.select(elm);
					    inst.selection.collapse(0);
				    }

				    ed.execCommand("mceEndUndoLevel");
				    $dialog.close();
			    }

			    if (!_dialogs['link']) {
				    _dialogs['link'] = true;

				    var htmlArr = ['<div class="mce-editor-insert-link">'];
				    htmlArr.push('<p>URL，例如:http://www.ablesky.com</p>');
				    htmlArr.push('<p style="margin-top: 10px;"><input type="text" class="field" value="' + (href ? href : '') + '" /></p>');
				    htmlArr.push('</div>');

				    var $dialog = $.dialog({
				        title: '添加链接',
				        width: 400,
				        content: htmlArr.join(''),
				        buttons: [{
				            text: '确定',
				            css: {
					            backgroundColor: '#09F'
				            },
				            click: function() {
					            insertAction();
				            }
				        }, {
					        text: '取消'
				        }],
				        close: function() {
					        _dialogs['link'] = false;
				        },
				        open: function() {
					        $('.mce-editor-insert-link input').focus();
				        }
				    });
			    }
		    });
		    ed.addButton('link', {
		        title: 'advlink.link_desc',
		        cmd: '_mceASInsertLink'
		    });

		    /**
			 * source editor
			 */
		    ed.addCommand('_mceHTMLSource', function() {

			    if (!_dialogs['HTMLSource']) {
				    _dialogs['HTMLSource'] = true;

				    function saveContent() {
					    ed.setContent($('textarea[name="mceCodeSource"]').val(), {
						    source_view: true
					    });
					    $dialog.close();
				    }

				    var $dialog = $.dialog({
				        title: 'HTML\u4ee3\u7801\u7f16\u8f91\u5668',
				        content: '<div class="mce-editor-html-source"><textarea name="mceCodeSource" rows="15" cols="100" ' + 'style="width: 97.5%; height: 100%; font-family: Courier New,Courier,monospace;" dir="ltr" wrap="soft">' + '</textarea></div>',
				        width: 600,
				        modal: true,
				        buttons: [{
				            text: '更新',
				            css: {
					            backgroundColor: '#09F'
				            },
				            click: function() {
					            saveContent();
				            }
				        }, {
					        text: '取消'
				        }],
				        close: function() {
					        _dialogs['HTMLSource'] = false;
				        },
				        open: function() {
					        var textarea = $('textarea[name="mceCodeSource"]').get(0);
					        // Remove Gecko spellchecking
					        if (tinymce.isGecko&&ed.getParam("gecko_spellcheck")) {
						        textarea.spellcheck = ed.getParam("gecko_spellcheck");
					        }

					        $(textarea).val(ed.getContent({
						        source_view: true
					        }));
				        }
				    });
			    }
		    });
		    ed.addButton('code', {
		        title: 'ASEditor.code_desc',
		        cmd: '_mceHTMLSource'
		    });

		    ed.onInit.add(function(ed) {
			    // prevent drag&drop
			    ed.dom.bind(ed.getDoc(), ['dragend', 'dragover', 'draggesture', 'dragdrop', 'drop', 'drag'], function(e) {
				    e.preventDefault();
				    e.stopPropagation();
				    return false;
			    });
		    });
		    // remove Base64 images
		    ed.plugins.paste.onPreProcess.add(function(pl, o) {
			    var regExp = /<img[^>]+src="data:image.*?;base64[^>]*?>/ig, _pasteString = o.content;
			    if (regExp.test(_pasteString)) {
				    o.content = _pasteString.replace(regExp, '');
				    alert('编辑器暂不支持复制粘贴方式上传图片，请您选择插入图片按钮！');
			    }
		    });
		    
		    
		    // /**
		    // * media
		    // */
		    // ed.addCommand('_mceInsertMedia', function() {
		    //				
		    // });
		    // ed.addButton('media', {title : 'ASEditor.media_title', cmd :
		    // '_mceInsertMedia'});
		    /**
			 * media
			 */
		    ed.addCommand('_mceInsertMedia', function() {

			    if (!_dialogs['media']) {
				    _dialogs['media'] = true;

				    function saveContent() {
				    	var htmlCheck=$('#html').attr('checked')?true:false;
				    	var insertHtml='';
				    	var htmlCode=$('#htmlCode');
				    	var videoWidth=$('#videoWidth');
				    	var videoHeight=$('#videoHeight');
				    	var flashUrl=$('#flashUrl');
				    	if(htmlCheck){
				    		if(htmlCode.val()){
				    			insertHtml=htmlCode.val();
				    			setSave(insertHtml);
				    		}else{
    				    		$('.errorTip').show();
				    		}
				    		
				    	}else{
				    		var width=videoWidth.val()?videoWidth.val():320;
				    		var height=videoHeight.val()?videoHeight.val():270;
				    		var videoUrl=flashUrl.val();
				    		if(videoUrl){
				    			insertHtml=['<object width="'+width+'" height="'+height+'">'+
                						'<param name="allowFullScreen" value="true">'+
                						'<param name="wmode" value="transparent">'+
                						'<param name="flashVars" value="" />'+
                						'<param name="movie" value="'+videoUrl+'" />'+
                						'<embed src="'+videoUrl+'" flashVars="" width="'+width+'" height="'+height+'"  allowFullScreen="true" wmode="transparent" autostart="false" type="application/x-shockwave-flash" />'+
                						'</object>'].join('');
				    			setSave(insertHtml);
				    		}else{
				    			$('.errorTip').show();
				    		}
				    	}
				    }
				    
				    function setSave(insertHtml){
				    	var selectionBookmark = ed.selection.getBookmark();
				        ed.selection.moveToBookmark(selectionBookmark);

				        ed.execCommand('mceInsertContent', false, insertHtml);
				        ed.undoManager.add();
					    $dialog.close();
				    }
				    
				    function initVideo(){
				    	$('textarea').on('focus',function(){
				    		var $this=$(this);
				    		$this.next('label').hide();
				    		$('#J_videottype').find('input').attr('checked',false);
				    		$this.parent().prev('input').attr('checked',true);
				    		$this.parent().prev('input').click();
				    		$('.errorTip').hide();
				    	}).on('blur',function(){
				    		var $this=$(this);
				    		if($this.val()==''){
				    			$this.next('label').show();
				    		}				    		
				    	});
				    	$('#flash').on('click',function(){
				    		var $this=$(this);
				    		if(this.checked){
				    			$('.setXY').show();
				    		}
				    	});
				    	$('#html').on('click',function(){
				    		var $this=$(this);
				    		if(this.checked){
				    			$('.setXY').hide();
				    		}
				    	});
				    }
				    var videottype = ['<div id="J_videottype" class="showorhide" style="margin-bottom:40px;">'+
		    	            			'<div class="new-video-wrapper image-info">'+
		                				'<ul>'+
		                    				'<li class="alternative" style="height:60px;padding:5px 0;position: relative;">'+
		                						'<input id="html" type="radio" style="top:-20px;*top:20px;position:relative;" name="upLoadVideo" checked/>'+
		                						'<div style="position: relative;background:#fff;height:60px;margin-left: 6px;*margin-left:0px; display:inline-block;*float:left;">'+
		                                			'<textarea id="htmlCode" max-length="1000" style="width:518px;margin:0px;height:60px;line-height:20px;position: relative;resize: none;z-index:2;background: url('+IMG_PATH+'/img/s.gif) repeat scroll 0 0 transparent;" class="input-text-dialog30 videosource user-write enter-text"></textarea>'+
		                                    		'<label style="color: #646464;cursor: text; font-size: 12px;left: 5px;line-height: 27px; position: absolute;top: 2px; z-index: 1;">请输入html代码，推荐使用AbleSky视频链接</label>'+
		                                		'</div>'+
		                					'</li>'+
		                					'<li class="alternative" style="height:60px;padding:5px 0;position: relative;">'+
		                						'<input id="flash" type="radio" style="top:-20px;*top:20px;position:relative;" name="upLoadVideo" />'+
		                						'<div style="position: relative;background:#fff;height:60px;margin-left: 6px;*margin-left:0px; display:inline-block;*float:left;">'+
		                                			'<textarea id="flashUrl" max-length="1000"  style="width:518px;margin:0px;height:60px;line-height:20px;position: relative;resize: none;z-index:2;background: url('+IMG_PATH+'/img/s.gif) repeat scroll 0 0 transparent;" class="input-text-dialog30 videosource user-write enter-text"></textarea>'+
		                                    		'<label style="color: #646464;cursor: text; font-size: 12px;left: 5px;line-height: 27px; position: absolute;top: 2px; z-index: 1;">请输入flash地址</label>'+
		                                		'</div>'+
		                					'</li>'+
		                				'</ul>'+
		                				'<div class="setXY" style="padding:10px;display:none;"><span>视频尺寸：</span>'+
		                					'宽度<input id="videoWidth" maxlength="4" onkeyup="this.value=this.value.replace(/\D*$/,\'\')" style="width:80px;margin:0 10px;border: 1px solid #9ad2f7;">'+
		                					'高度<input id="videoHeight" maxlength="4" onkeyup="this.value=this.value.replace(/\D*$/,\'\')" style="width:80px;margin:0 10px;border: 1px solid #9ad2f7;">'+
		                				'</div>'+
		                				'<div class="errorTip" style="color:red;display:none;">请填写视频代码或地址！</div>'+
		                			'</div>'+
		                		'</div>'
		                			].join('');
				    var $dialog = $.dialog({
				        title: '插入视频',
				        width:600,
				        height:180,
				        content: videottype,
				        buttons: [{
				            text: '保存',
				            css: {
					            backgroundColor: '#09F'
				            },
				            click: function() {
					            saveContent();
				            }
				        },{
					        text: '取消'
				        }],
				        open: function() {
				        	initVideo();
				        },
				        close: function() {
					        _dialogs['media'] = false;
				        }
				    });
			    }
		    });
		    ed.addButton('media', {
		        title: 'ASEditor.media_title',
		        cmd: '_mceInsertMedia'
		    });
	    },

	    getInfo: function() {
		    return {
		        longname: 'AbleSky_Editor',
		        author: 'Baoyu Xu',
		        authorurl: 'http://www.ablesky.com/bxu',
		        infourl: 'http://www.ablesky.com',
		        version: tinymce.majorVersion + "." + tinymce.minorVersion
		    };
	    }

	});

	// Register plugin
	tinymce.PluginManager.add('integration', tinymce.plugins.ASEditorPlugin);
})(tinymce);
