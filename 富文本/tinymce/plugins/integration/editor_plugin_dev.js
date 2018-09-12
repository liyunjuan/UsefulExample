(function(e) {
	var t = e.DOM,
		n = e.dom.Event,
		r = e.is,
		i = e.each;
	e.create("tinymce.plugins.ASEditorPlugin", {
		init: function(n, r) {
			var i = navigator.userAgent.toLowerCase(),
				s = /msie 6/.test(i),
				o = /msie 7/.test(i),
				u = [],
				a = r;
			n.addCommand("_mceImage", function() {
				var r = typeof define == "function" && define.amd && define.amd.jQuery,
					i = "uploadImage",
					s = "netlinks";
				if (!u.image) {
					u.image = !0;
					var o = 40,
						f = $.dialog({
							title: "插入图片",
							modal: !0,
							content: ['<div class="mce-editor-insert-photo clearfix">', '<ul class="tabs-nav clearfix">', '<li class="select" data-tab="', i, '">上传图片</li>', '<li data-tab="netlinks">网络图片</li></ul>', '<div class="tabs-container">', '<div class="tabs-', i, '">', '<div class="insert-tip">请从本地选择图片，图片格式必须为PNG,JPG,JPEG或GIF.且图片大小不能超过2M.</div>', '<form enctype="multipart/form-data" method="POST">', '<input type="hidden" name="postImage" value="2" />', '<input type="hidden" name="type" value="1" />', "<span>上传文件：</span>", '<input type="file" name="picture1" size="' + o + '" class="field-file" onchange="document.getElementById(\'J_uploadFilePathField\').value=this.value" />', '<input type="text" class="field field-path" autocomplete="off" id="J_uploadFilePathField" />', '<button type="button" class="button-browse">浏览</button>', '<button type="submit" style="display: none;">submit</button>', "</form>", "</div>", '<div class="tabs-', s, '">', '<div class="insert-tip">举例：http://stat.ablesky.com/content/images/icon/absLogo.jpg</div>', '<form enctype="multipart/form-data" method="post">', '<input type="text" class="field" autocomplete="off" style="margin-bottom: 5px;" />', '<input type="text" class="field" autocomplete="off" style="margin-bottom: 5px;" />', '<input type="text" class="field" autocomplete="off" style="margin-bottom: 5px;" />', '<input type="text" class="field" autocomplete="off" style="margin-bottom: 5px;" />', '<input type="text" class="field" autocomplete="off" />', "</form>", "</div>", "</div>", '<div class="valid-container"></div>', "</div>"].join(""),
							buttons: [{
								text: "上传",
								css: {
									backgroundColor: "#09F"
								},
								click: function() {
									$(".tabs-" + d + " form", l).submit()
								}
							}, {
								text: "取消"
							}],
							width: 500,
							close: function() {
								u.image = !1
							}
						}),
						l = $(".mce-editor-insert-photo"),
						c = $(".tabs-nav", l),
						h = $('input[type="file"]', l),
						p = $(".valid-container", l),
						d = i;
					$(".button-browse", l).on({
						mouseover: function() {
							$('input[type="file"]', l).show()
						}
					}), h.on({
						mouseout: function() {
							$(this).hide()
						}
					}), $("form", l).submit(function() {
						function t() {
							e.ajaxSubmit({
								beforeSubmit: v,
								success: m,
								timeout: 1e4,
								url: "communityapi.do?action=uploadThreadPhoto",
								type: "POST",
								dataType: "json",
								iframe: !0
							})
						}
						var e = $(this);
						return d == i ? r ? require(["lib/jquery/jquery.form"], function() {
							t()
						}) : t() : d == s && ($.each($(".tabs-" + s + ' input[type="text"]', l), function() {
							this.value && g(this.value)
						}), f.close()), !1
					}), $("li", c).click(function() {
						var e = $(this);
						d = e.attr("data-tab"), d == s && p.hide(), e.addClass("select").siblings("li").removeClass("select"), $(".tabs-" + d, l).show().siblings().hide()
					});

					function v() {
						var e = $("input[name='picture1']", l);
						try {
							var t = $.trim(e.val()),
								n = new RegExp("(.|/)(png|jpg|jpeg|gif)$", "i"),
								r = !1;
							return t == "" ? p.show().html('<span style="color:#F33;">请选择要上传的图片</span>') : n.test(t) ? (p.show().html('<span style="color:#7B4;"><img src="' + a + '/img/loading-16-16.gif" />上传文件中，请稍等...</span>'), r = !0) : p.show().html('<span style="color:#F33;">图片格式必须为PNG,JPG,JPEG或GIF.</span>'), r
						} catch (i) {
							return !1
						}
					}
					function m(e) {
						if (e && e.success) if (e.urlList.length) {
							p.hide();
							var t = e.urlList;
							for (var n = 0; n < t.length; n++) g(t[n].replace(/\&amp;/g, "&"));
							f.close()
						} else p.show().html('<span style="color:#F33;">文件过大,请上传2M以内的图片.</span>');
						else e && e.message && f.setContent(e.message)
					}
					var g = function(r) {
							if (e) {
								var i = {
									vspace: "",
									hspace: "",
									border: "",
									align: ""
								};
								e.extend(i, {
									src: r
								}), n.execCommand("mceInsertContent", !1, t.createHTML("img", i), {
									skip_undo: 1
								}), n.undoManager.add()
							}
						}
				}
			}), n.addButton("image", {
				title: "ASEditor.image_title",
				cmd: "_mceImage"
			}), n.addCommand("_mceEmotions", function() {
				if (!u.emotion) {
					u.emotion = !0;
					var e = ["微笑", "大笑", "调皮", "难过", "气愤", "大哭", "疑问", "流汗", "可怜", "惊讶", "睡", "害羞", "色", "酷", "病", "头晕", "笑嘻嘻", "鄙视", "安心", "天使", "魔鬼", "示爱", "爱心", "心碎", "玫瑰", "凋谢", "强", "弱", "握手", "金币", "礼物", "学历"],
						t = ['<div class="mce-editor-emotions"><table>'];
					for (var r = 0, i; i = e[r]; r++) r % 8 === 0 && t.push("<tr>"), t.push('<td><img class="emotion" title="' + e[r] + '" src="' + a + "/img/" + (r + 1) + '.gif" /></td>'), (r + 1) % 8 === 0 && t.push("</tr>");
					t.push("</table></div>");
					var s = $.dialog({
						title: "添加表情",
						content: t.join(""),
						buttons: [{
							text: "取消"
						}],
						open: function() {
							$(".mce-editor-emotions img.emotion").click(function(e) {
								e.preventDefault();
								var t = n.selection.getBookmark();
								n.selection.moveToBookmark(t), n.execCommand("mceInsertContent", !1, $(this).parent().html()), n.undoManager.add(), s.close()
							})
						},
						close: function() {
							u.emotion = !1
						}
					})
				}
			}), n.addButton("emotions", {
				title: "ASEditor.emotions_title",
				cmd: "_mceEmotions"
			}), n.addCommand("_mceASInsertLink", function() {
				function a(e) {
					function t(e, t) {
						return e = e.nodeType == 1 ? e.value : e, e == "" || (new RegExp(t)).test(e)
					}
					return t(e, "^[-!#$%&'*+\\./0-9=?A-Z^_`a-z{|}~]+@[-!#$%&'*+\\/0-9=?A-Z^_`a-z{|}~]+.[-!#$%&'*+\\./0-9=?A-Z^_`a-z{|}~]+$")
				}
				function f(e) {
					e.value && a(e) && !/^\s*mailto:/i.test(e.value) && confirm('您输入URL是电子邮件地址，是否需要加"mailto:"前缀？') && (e.value = "mailto:" + e.value), /^\s*www\./i.test(e.value) && confirm('您输入的URL是一个外部链接，是否要加上"http://"前缀？') && (e.value = "http://" + e.value)
				}
				function l(e, t, r) {
					var i = n.dom;
					if (typeof r == "undefined" || r == null) r = "";
					t == "style" && (r = i.serializeStyle(i.parseStyle(r), "a")), i.setAttrib(e, t, r)
				}
				function c(e) {
					var t = $(".mce-editor-insert-link input").get(0).value.replace(/ /g, "%20");
					l(e, "href", t), l(e, "title"), l(e, "target", "_blank"), l(e, "id"), l(e, "style"), l(e, "rel"), l(e, "rev"), l(e, "charset"), l(e, "hreflang"), l(e, "dir"), l(e, "lang"), l(e, "tabindex"), l(e, "accesskey"), l(e, "type"), l(e, "onfocus"), l(e, "onblur"), l(e, "onclick"), l(e, "ondblclick"), l(e, "onmousedown"), l(e, "onmouseup"), l(e, "onmouseover"), l(e, "onmousemove"), l(e, "onmouseout"), l(e, "onkeypress"), l(e, "onkeydown"), l(e, "onkeyup"), tinyMCE.isMSIE5 && (e.outerHTML = e.outerHTML)
				}
				function h() {
					var t = n,
						r, i, o, u = $(".mce-editor-insert-link input").get(0);
					n.selection.moveToBookmark(s);
					var a = n.dom.getParent(n.selection.getNode(), "A");
					if (a) {
						var l = n.selection.getBookmark(1);
						n.dom.remove(a, 1), n.selection.moveToBookmark(l)
					}
					r = t.selection.getNode(), f(u), r = t.dom.getParent(r, "A");
					if (!u.value) {
						o = t.selection.getBookmark(), t.dom.remove(r, 1), t.selection.moveToBookmark(o), n.execCommand("mceEndUndoLevel"), d.close();
						return
					}
					if (r == null) {
						t.getDoc().execCommand("unlink", !1, null), n.execCommand("mceInsertLink", !1, "#mce_temp_url#", {
							skip_undo: 1
						}), i = e.grep(t.dom.select("a"), function(e) {
							return t.dom.getAttrib(e, "href") == "#mce_temp_url#"
						});
						for (o = 0; o < i.length; o++) c(r = i[o])
					} else c(r);
					if (r.childNodes.length != 1 || r.firstChild.nodeName != "IMG") t.focus(), t.selection.select(r), t.selection.collapse(0);
					n.execCommand("mceEndUndoLevel"), d.close()
				}
				var t = n,
					r = n.selection,
					i = r.getNode(),
					s = r.getBookmark(1),
					o = n.dom.getAttrib(i, "href");
				if (r.isCollapsed() && !n.dom.getParent(r.getNode(), "A")) return;
				if (!u.link) {
					u.link = !0;
					var p = ['<div class="mce-editor-insert-link">'];
					p.push("<p>URL，例如:http://www.ablesky.com</p>"), p.push('<p style="margin-top: 10px;"><input type="text" class="field" value="' + (o ? o : "") + '" /></p>'), p.push("</div>");
					var d = $.dialog({
						title: "添加链接",
						width: 400,
						content: p.join(""),
						buttons: [{
							text: "确定",
							css: {
								backgroundColor: "#09F"
							},
							click: function() {
								h()
							}
						}, {
							text: "取消"
						}],
						close: function() {
							u.link = !1
						},
						open: function() {
							$(".mce-editor-insert-link input").focus()
						}
					})
				}
			}), n.addButton("link", {
				title: "advlink.link_desc",
				cmd: "_mceASInsertLink"
			}), n.addCommand("_mceHTMLSource", function() {
				if (!u.HTMLSource) {
					u.HTMLSource = !0;

					function t() {
						n.setContent($('textarea[name="mceCodeSource"]').val(), {
							source_view: !0
						}), r.close()
					}
					var r = $.dialog({
						title: "HTML代码编辑器",
						content: '<div class="mce-editor-html-source"><textarea name="mceCodeSource" rows="15" cols="100" style="width: 97.5%; height: 100%; font-family: Courier New,Courier,monospace;" dir="ltr" wrap="soft"></textarea></div>',
						width: 600,
						modal: !0,
						buttons: [{
							text: "更新",
							css: {
								backgroundColor: "#09F"
							},
							click: function() {
								t()
							}
						}, {
							text: "取消"
						}],
						close: function() {
							u.HTMLSource = !1
						},
						open: function() {
							var t = $('textarea[name="mceCodeSource"]').get(0);
							e.isGecko && (t.spellcheck == n.getParam("gecko_spellcheck")), $(t).val(n.getContent({
								source_view: !0
							}))
						}
					})
				}
			}), n.addButton("code", {
				title: "ASEditor.code_desc",
				cmd: "_mceHTMLSource"
			}), n.onInit.add(function(e) {
				e.dom.bind(e.getDoc(), ["dragend", "dragover", "draggesture", "dragdrop", "drop", "drag"], function(e) {
					return e.preventDefault(), e.stopPropagation(), !1
				})
			}), n.plugins.paste.onPreProcess.add(function(e, t) {
				var n = /<img[^>]+src="data:image.*?;base64[^>]*?>/ig,
					r = t.content;
				n.test(r) && (t.content = r.replace(n, ""), alert("编辑器暂不支持复制粘贴方式上传图片，请您选择插入图片按钮！"))
			})
		},
		getInfo: function() {
			return {
				longname: "AbleSky_Editor",
				author: "Baoyu Xu",
				authorurl: "http://www.ablesky.com/bxu",
				infourl: "http://www.ablesky.com",
				version: e.majorVersion + "." + e.minorVersion
			}
		}
	}), e.PluginManager.add("integration", e.plugins.ASEditorPlugin)
})(tinymce)