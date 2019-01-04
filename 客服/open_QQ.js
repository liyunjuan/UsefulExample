(function(a, c) {
	if (a) {
		return
	}
	a = window.BizQQWPA = {};
	var n = {};
	var k = {};
	var m = {};
	var e = {
		global: a,
		moduleCache: k,
		moduleLoading: m,
		version: "3.3.20140328",
		srcRoot: "http://combo.b.qq.com",
		srcPath: "/crm/wpa/src/",
		srcMap: {
			"util.getJSONP": "util.getScript,util.serialize",
			"util.onLoad": "util.events",
			"util.extend": "lang.each,lang.typeEnhance",
			"util.blockStorage": "util.sessionStorage",
			"util.localStorage": "util.cookie,lang.trim",
			"util.sessionStorage": "util.localStorage,util.cookie",
			"util.taskMgr": "util.proxy",
			"util.Bits": "util.proxy,util.pad",
			"util.css": "util.contains",
			"util.titleFlash": "util.taskMgr",
			"wpa.wpaMgr": "globalSettings,lang.each,util.proxy,util.titleFlash,util.report,util.serialize,util.domain,util.cookie,wpa.WPA",
			"wpa.WPA": "globalSettings,lang.browser,lang.typeEnhance,util.proxy,util.pad,util.Bits,util.getScript,util.getJSONP,util.domain,util.cookie,util.events,util.onLoad,util.offset,util.report,util.log,util.speedReport,util.Panel,util.onIframeLoaded,util.GUID,wpa.getQQVersion,wpa.ViewHelper,wpa.views,wpa.ta,wpa.kfuin,wpa.sid",
			"wpa.ta": "util.getScript,util.serialize,util.cookie",
			"wpa.invite": "util.log,util.getJSONP,util.proxy,util.domain,util.blockStorage,util.taskMgr,wpa.wpaMgr",
			"wpa.filter": "util.domain",
			"wpa.getQQVersion": "globalSettings,lang.browser,util.events",
			"wpa.ViewHelper": "util.getJSONP,util.report,util.proxy,util.onLoad,util.className,util.events,util.Style,util.titleFlash",
			"wpa.kfuin": "util.getJSONP",
			"wpa.sid": "util.getJSONP,util.domain",
			"wpa.visitor": "util.log,util.speedReport,util.getJSONP,util.domain,util.pubSub,wpa.filter,wpa.ta,wpa.invite,wpa.wpaMgr,wpa.ta,wpa.kfuin",
			"wpa.SelectPanel": "lang.browser,util.Style,util.className,util.events,util.offset,util.css,util.proxy,lang.extend",
			"wpa.APIs.add": "globalSettings,lang.each,lang.typeEnhance,lang.extend,util.domain,wpa.WPA,wpa.wpaMgr",
			"wpa.APIs.addCustom": "globalSettings,lang.each,lang.typeEnhance,lang.extend,util.domain,wpa.WPA,wpa.wpaMgr",
			"wpa.APIs.visitor": "globalSettings,wpa.visitor",
			"wpa.APIs.gdtChat": "globalSettings,lang.extend,lang.browser,wpa.WPA",
			"wpa.APIs.link": "globalSettings,lang.extend,lang.browser,wpa.WPA"
		},
		useCombo: true,
		comboTag: "/c/=",
		comboDelimiter: ",",
		debug: false,
		grey: false,
		logURL: "http://promreport.crm2.qq.com/wpa/r.gif"
	};
	var d = function() {
		var p = /(^[\s�]+)|([\s�]+$)/g;
		return String.prototype.trim ? function(q) {
			return q == null ? "" : String.prototype.trim.call(q)
		} : function(q) {
			return q == null ? "" : q.toString().replace(p, "")
		}
	}();
	var l = function(s, v, r) {
		var q, t = 0,
			u = s.length,
			p = u === c || Object.prototype.toString(s) === "[object Function]";
		if (r) {
			if (p) {
				for (q in s) {
					if (v.apply(s[q], r) === false) {
						break
					}
				}
			} else {
				for (; t < u;) {
					if (v.apply(s[t++], r) === false) {
						break
					}
				}
			}
		} else {
			if (p) {
				for (q in s) {
					if (v.call(s[q], q, s[q]) === false) {
						break
					}
				}
			} else {
				for (; t < u;) {
					if (v.call(s[t], t, s[t++]) === false) {
						break
					}
				}
			}
		}
		return s
	};
	var i = function() {
		var p = {};
		l("Boolean Number String Function Array Date RegExp Object".split(" "), function(s, r) {
			p["[object " + r + "]"] = r.toLowerCase()
		});
		var q = Object.prototype.toString;
		return i = {
			toString: function(s) {
				var r = i.isArray;
				if (!r(s)) {
					return s + ""
				}
				return function(v) {
					var u = arguments.callee,
						t = [];
					l(v, function(x, w) {
						if (!r(w)) {
							t.push(w + "");
							return
						}
						t.push("[" + u(w) + "]")
					});
					return t.join(",")
				}(s)
			},
			type: function(r) {
				return r == null ? String(r) : p[q.call(r)] || "object"
			},
			isFunction: function(r) {
				return i.type(r) === "function"
			},
			isArray: Array.isArray || function(r) {
				return i.type(r) === "array"
			},
			isWindow: function(r) {
				return r != null && r == r.window
			},
			isPlainObject: function(u) {
				if (!u || i.type(u) !== "object" || u.nodeType || i.isWindow(u)) {
					return false
				}
				try {
					var r = Object.prototype.hasOwnProperty;
					if (u.constructor && !r.call(u, "constructor") && !r.call(u.constructor.prototype, "isPrototypeOf")) {
						return false
					}
				} catch (t) {
					return false
				}
				var s;
				for (s in u) {}
				return s === c || r.call(u, s)
			},
			isString: function(r) {
				return i.type(r) === "string"
			},
			isNumeric: function(r) {
				return !isNaN(parseFloat(r)) && isFinite(r)
			}
		}
	}();
	var o = function(t, s, r) {
		t = t || {};
		s = s || "=";
		r = r || "&";
		var p = [];
		for (var q in t) {
			if (t.hasOwnProperty(q)) {
				p.push(q + s + encodeURIComponent((t[q] || "") + ""))
			}
		}
		return p.join(r)
	};
	var g = function() {
		var p = {};
		return function(t) {
			var s = +new Date(),
				r = "log_" + s,
				q = p[r] = new Image();
			q.onload = q.onerror = function() {
				p[r] = null
			};
			t += (t.indexOf("?") > -1 ? "&" : "?") + s;
			q.src = t
		}
	}();
	var f = function() {
		var s = 0,
			q = 1,
			t = 2;
		var p = e.LOG_URL;
		var r = i;
		return function(v) {
			var u = v.url || p,
				x = v.level || t,
				w = (r.isString(v) ? v : v.info) || "Empty info!";
			if (e.debug) {
				console && console.log(w);
				return
			}
			if (x > q) {
				return
			}
			if (i.isPlainObject(w)) {
				w = o(w)
			}
			u += (u.indexOf("?") > -1 ? "?" : "&") + "level" + x + ":" + w;
			g(u)
		}
	}();
	var j = function() {
		var p = {};
		return {
			pub: function() {
				var t = Array.prototype.slice.call(arguments, 0);
				var s = t.shift();
				var v = [],
					w = s.split(".");
				for (var u = 0, q = w.length; u < q; u++) {
					v = v.concat(p[w.join(".")] || []);
					w.pop()
				}
				if (v.length === 0) {
					return this
				}
				var r = this;
				l(v, function(x, y) {
					y.apply(r, t)
				});
				return this
			},
			sub: function(r, q) {
				l(r.split(" "), function() {
					if (this === "") {
						return
					}(p[this] || (p[this] = [])).push(q)
				});
				return this
			},
			unSub: function(r, q) {
				l(r.split(" "), function() {
					if (this === "" || !p[this]) {
						return
					}
					if (!q) {
						p[this] = [];
						return
					}
					var t = p[this],
						u = 0,
						s;
					while (s = t[u++]) {
						if (s === q) {
							t.splice(u, 1)
						}
					}
				})
			},
			one: function(s, r) {
				var q = this;
				l(s.split(" "), function(u, t) {
					q.sub(t, function() {
						r.apply(this, arguments);
						q.unSub(t, arguments.callee)
					})
				})
			}
		}
	}();
	var b = function(q) {
		if (i.isString(q) && q.length > 0) {
			q = q.split(",");
			var r = {},
				p = {};
			l(q, function(u, t) {
				var v = d(t),
					s = v.split(".").pop();
				r[v] = p[s] = k[v]
			});
			return function(s) {
				return p[s] || r[s]
			}
		}
		return function() {
			return null
		}
	};
	var h = function(v, r, p) {
		if (!p) {
			p = r;
			r = ""
		}
		v = d(v);
		var u = v.split("."),
			q = u.pop(),
			t = n,
			w, s;
		while (u.length > 0) {
			w = u.shift();
			t[w] = t[w] || {};
			if (i.isNumeric(t[w]) || typeof t[w] === "boolean") {
				throw new TypeError("define: cannot attach stuffs to number or boolean!")
			}
			t = t[w]
		}
		r = b(r);
		if (!i.isFunction(p)) {
			throw new TypeError("define: factory should be function!")
		}
		s = p(r);
		k[v] = t[q] = s
	};
	h("globalSettings", function() {
		return e
	});
	h("lang.each", function() {
		return l
	});
	h("lang.trim", function() {
		return d
	});
	h("lang.typeEnhance", "lang.each", function() {
		return i
	});
	h("util.serialize", "lang.each,lang.typeEnhance", function() {
		return o
	});
	h("util.report", function() {
		return g
	});
	h("util.log", "globalSettings,lang.each,lang.typeEnhance,util.report", function() {
		return f
	});
	h("util.pubSub", "lang.each", function() {
		return j
	});
	h("util.speedReport", "util.report", function(r) {
		var p = r("report");
		var q = function(t, s, v, u) {
			this.url = "http://isdspeed.qq.com/cgi-bin/r.cgi?flag1=" + t + "&flag2=" + s + "&flag3=" + v + "&";
			this.p0 = +new Date();
			this.points = [this.p0];
			this.rate = u || 1
		};
		q.prototype = {
			addPoint: function(s, v) {
				var u = this.points;
				if (s >= u.length) {
					for (var t = u.length; t < s; t++) {
						u.push(0)
					}
				}
				v = v || (+new Date() - this.p0);
				u[s] = v;
				return this
			},
			pushPoint: function(s) {
				s = s || (+new Date() - this.p0);
				this.points.push(s);
				return this
			},
			send: function(w) {
				if (Math.random() > (w || this.rate)) {
					return
				}
				var t = this.url,
					v = this.points;
				for (var u = 1, s = v.length; u < s; u++) {
					if (v[u]) {
						t += u + "=" + v[u] + "&"
					}
				}
				p(t);
				return this
			}
		};
		return function(t, s, u) {
			return new q(t, s, u)
		}
	});
	h("util.getScript", function() {
		return function(q, s) {
			var p = document.createElement("script"),
				r = document.getElementsByTagName("head")[0];
			setTimeout(function() {
				if (!r) {
					setTimeout(arguments.callee, 0)
				} else {
					r.insertBefore(p, r.firstChild)
				}
			}, 1);
			p.onload = p.onreadystatechange = function(t) {
				if (!this.readyState || this.readyState === "loaded" || this.readyState === "complete") {
					s && s(t || window.event, p)
				}
			};
			p.type = "text/javascript";
			p.charset = "utf-8";
			p.async = true;
			p.src = q;
			return p
		}
	});
	h("util.combo", "globalSettings,util.getScript", function(q) {
		var s = q("globalSettings"),
			p = q("getScript");
		var r = 20;
		return function(v, y, A) {
			for (var x = 0, t = Math.ceil(y.length / r), z, u; x < t; x++) {
				z = r * x;
				u = t === x + 1 ? y.length : z + r;
				var w = v + s.comboTag + y.slice(z, u).join(s.comboDelimiter) + "?v=" + s.version;
				p(w, A)
			}
		}
	});
	h("util.getRequireList", "globalSettings", function(p) {
		var s = p("globalSettings");
		var r = s.srcMap,
			q = s.moduleCache;
		return function(t) {
			if (!t || t.split(",").length === 0) {
				return ""
			}
			var y = [],
				x = t.split(","),
				w = 0,
				v = {},
				z, u;
			while (z = x[w++]) {
				if (typeof q[z] !== "undefined" || v[z]) {
					continue
				}
				y.push(z);
				v[z] = true;
				u = r[z];
				if (!u) {
					continue
				}
				x = x.concat(u.split(","))
			}
			return y
		}
	});
	h("api.require", "globalSettings,lang.each,lang.trim,lang.typeEnhance,util.pubSub,util.combo,util.getRequireList", function(s) {
		var w = s("globalSettings"),
			t = s("typeEnhance"),
			u = s("each"),
			p = s("trim"),
			q = s("pubSub"),
			v = s("combo"),
			r = s("getRequireList");
		return a.require = function(y, C) {
			if (t.isFunction(y)) {
				C = y;
				y = ""
			}
			C = C || function() {};
			var B = [];
			u(y.split(","), function(D, E) {
				B.push(p(E))
			});
			y = B.join(",");
			if (!t.isString(y)) {
				throw new TypeError("api.require: require should be string!")
			}
			if (typeof C !== "undefined" && !t.isFunction(C)) {
				throw new TypeError("api.require: callback should be function!")
			}
			var x = r(y);
			if (x.length === 0) {
				C && C(b(y))
			} else {
				var A = [],
					z = [];
				u(x, function(D, E) {
					if (!m[E]) {
						A.push(w.srcPath + E.split(".").join("/") + ".js");
						m[E] = true
					}
					z.push("api.define." + E)
				});
				q.one(z.join(" "), function() {
					var E = 0,
						F = "",
						D = z.length;
					return function(G) {
						if (new RegExp("(?:^| )" + G + "(?: |$)").test(F)) {
							return
						}
						F += " " + G;
						if (++E < D) {
							return
						}
						C && C(b(y))
					}
				}());
				if (A.length > 0) {
					v(w.srcRoot, A)
				}
			}
			return a
		}
	});
	h("api.define", "lang.typeEnhance,api.require,util.pubSub", function(q) {
		var s = q("typeEnhance"),
			r = q("api.require"),
			p = q("util.pubSub");
		return a.define = function(v, u, t) {
			if (!s.isString(v)) {
				throw new TypeError("api.define: path should be string!")
			}
			if (!t) {
				t = u;
				u = ""
			}
			r(u, function() {
				h(v, u, t);
				p.pub("api.define." + v, v)
			});
			return a
		}
	});
	h("api.remove", function() {
		return function(p) {
			k[p] = null;
			return a
		}
	});
	h("api.set", "lang.each,globalSettings", function(p) {
		var q = p("each");
		return a.set = function(r, t) {
			var s = r;
			if (typeof r === "string") {
				s = {};
				s[r] = t
			}
			q(s, function(u, v) {
				e[u] = v
			})
		}
	});
	h("api.setVersion", "globalSettings", function(p) {
		var r = p("globalSettings");
		var q = r.global;
		return q.setVersion = function(s) {
			r.version = s;
			return q
		}
	});
	h("api.setResourceMap", "globalSettings", function(p) {
		var r = p("globalSettings");
		var q = r.global;
		return q.setResourceMap = function(s) {
			l(s, function(t, u) {
				r.RESOURCE_MAP[t] = u
			});
			return q
		}
	});
	h("api.load", "api.require,globalSettings,util.speedReport", function(s) {
		var B = s("require"),
			t = s("globalSettings"),
			r = s("speedReport");
		var z = "0",
			v = "1",
			y = "2",
			A = "4",
			x = "20",
			u = "0",
			w = "1",
			q = "2";
		var p = t.global;
		return p.load = function(C) {
			if (!C) {
				return
			}
			C.insert = function() {
				var E = document.getElementsByTagName("script"),
					F = E[E.length - 1];
				return function(G) {
					F.parentNode.insertBefore(G, F)
				}
			}();
			var D = r("7818", "21", "1");
			B("util.speedReport,util.domain,wpa.wpaMgr,wpa.visitor,wpa.kfuin", function(E) {
				D.addPoint(2).send();
				var J = E("wpaMgr"),
					I = E("visitor"),
					H = E("domain"),
					K = E("speedReport"),
					F = E("kfuin");
				var G = C.nameAccount;
				if (!G) {
					return
				}
				C.dm = H.topDomain;
				C.sv = A;
				if (C.wty === v || !C.wty) {
					J.newWPA(C)
				}
				I(C);
				C.kfuin && F.set(G, C.kfuin)
			});
			return p
		}
	});
	h("wpa.APIs", "globalSettings,lang.each,api.require,util.pubSub,util.speedReport", function(s) {
		var t = s("globalSettings"),
			w = s("each"),
			x = s("require"),
			v = s("pubSub"),
			r = s("speedReport");
		var u = "wpa.APIs.";
		var q = t.global;
		var p = ["add", "addCustom", "on", "visitor", "gdtChat", "link"];
		w(p, function() {
			q[this] = function(y) {
				return function() {
					var z = arguments,
						A = u + y;
					var B = r("7818", "21", "1");
					v.one("api.define." + A, function() {
						B.addPoint("3").send();
						q[y].apply(q, z)
					});
					x(A)
				}
			}(this)
		})
	})
})(window.BizQQWPA);
BizQQWPA.set("srcPath", "/crm/wpa/release/3.3.7/");
BizQQWPA.setVersion("3.3.7.20160126").load({
	"wty": "1",
	"kfuin": "800042429",
	"nameAccount": "800042429",
	"type": "12",
	"sv": "4",
	"title": "\u4f01\u4e1a\u540d\u79f0",
	"aty": "2",
	"a": "4",
	"ws": "www.ablesky.com",
	"btn1": "\u8425\u9500QQ\u4ea4\u8c08",
	"btn2": "\u4e0b\u6b21\u518d\u8bf4",
	"fsty": "0",
	"fposX": "2",
	"fposY": "1",
	"csty": "1",
	"tx": "1",
	"txw": null,
	"txh": null,
	"wd": "\u5168\u56fd\u514d\u8d39\u7535\u8bdd",
	"wd2": "4006780660",
	"curl": "",
	"wid": "",
	"di": ""
});