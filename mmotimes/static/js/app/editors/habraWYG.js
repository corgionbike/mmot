!function(e) {
    "use strict";
    function t(t) {
        var r = t.data;
        t.isDefaultPrevented() || (t.preventDefault(),
        e(this).ajaxSubmit(r))
    }
    function r(t) {
        var r = t.target
          , i = e(r);
        if (!i.is("[type=submit],[type=image]")) {
            var n = i.closest("[type=submit]");
            if (0 === n.length)
                return;
            r = n[0]
        }
        var a = this;
        if (a.clk = r,
        "image" == r.type)
            if (void 0 !== t.offsetX)
                a.clk_x = t.offsetX,
                a.clk_y = t.offsetY;
            else if ("function" == typeof e.fn.offset) {
                var o = i.offset();
                a.clk_x = t.pageX - o.left,
                a.clk_y = t.pageY - o.top
            } else
                a.clk_x = t.pageX - r.offsetLeft,
                a.clk_y = t.pageY - r.offsetTop;
        setTimeout(function() {
            a.clk = a.clk_x = a.clk_y = null
        }, 100)
    }
    function i() {
        if (e.fn.ajaxSubmit.debug) {
            var t = "[jquery.form] " + Array.prototype.join.call(arguments, "");
            window.console && window.console.log || window.opera && window.opera.postError && window.opera.postError(t)
        }
    }
    var n = {};
    n.fileapi = void 0 !== e("<input type='file'/>").get(0).files,
    n.formdata = void 0 !== window.FormData;
    var a = !!e.fn.prop;
    e.fn.attr2 = function() {
        if (!a)
            return this.attr.apply(this, arguments);
        var e = this.prop.apply(this, arguments);
        return e && e.jquery || "string" == typeof e ? e : this.attr.apply(this, arguments)
    }
    ,
    e.fn.ajaxSubmit = function(t) {
        function r(r) {
            var i, n, a = e.param(r, t.traditional).split("&"), o = a.length, s = [];
            for (i = 0; o > i; i++)
                a[i] = a[i].replace(/\+/g, " "),
                n = a[i].split("="),
                s.push([decodeURIComponent(n[0]), decodeURIComponent(n[1])]);
            return s
        }
        function o(r) {
            function n(e) {
                var t = null;
                try {
                    e.contentWindow && (t = e.contentWindow.document)
                } catch (e) {
                    i("cannot get iframe.contentWindow document: " + e)
                }
                if (t)
                    return t;
                try {
                    t = e.contentDocument ? e.contentDocument : e.document
                } catch (r) {
                    i("cannot get iframe.contentDocument: " + r),
                    t = e.document
                }
                return t
            }
            function o() {
                function t() {
                    try {
                        var e = n(f).readyState;
                        i("state = " + e),
                        e && "uninitialized" == e.toLowerCase() && setTimeout(t, 50)
                    } catch (e) {
                        i("Server abort: ", e, " (", e.name, ")"),
                        l(w),
                        S && clearTimeout(S),
                        S = void 0
                    }
                }
                var r = d.attr2("target")
                  , a = d.attr2("action");
                y.setAttribute("target", g),
                s || y.setAttribute("method", "POST"),
                a != p.url && y.setAttribute("action", p.url),
                p.skipEncodingOverride || s && !/post/i.test(s) || d.attr({
                    encoding: "multipart/form-data",
                    enctype: "multipart/form-data"
                }),
                p.timeout && (S = setTimeout(function() {
                    v = !0,
                    l(P)
                }, p.timeout));
                var o = [];
                try {
                    if (p.extraData)
                        for (var c in p.extraData)
                            p.extraData.hasOwnProperty(c) && (e.isPlainObject(p.extraData[c]) && p.extraData[c].hasOwnProperty("name") && p.extraData[c].hasOwnProperty("value") ? o.push(e('<input type="hidden" name="' + p.extraData[c].name + '">').val(p.extraData[c].value).appendTo(y)[0]) : o.push(e('<input type="hidden" name="' + c + '">').val(p.extraData[c]).appendTo(y)[0]));
                    p.iframeTarget || (_.appendTo("body"),
                    f.attachEvent ? f.attachEvent("onload", l) : f.addEventListener("load", l, !1)),
                    setTimeout(t, 15);
                    try {
                        y.submit()
                    } catch (e) {
                        var u = document.createElement("form").submit;
                        u.apply(y)
                    }
                } finally {
                    y.setAttribute("action", a),
                    r ? y.setAttribute("target", r) : d.removeAttr("target"),
                    e(o).remove()
                }
            }
            function l(t) {
                if (!b.aborted && !E) {
                    if (D = n(f),
                    D || (i("cannot access response document"),
                    t = w),
                    t === P && b)
                        return b.abort("timeout"),
                        void x.reject(b, "timeout");
                    if (t == w && b)
                        return b.abort("server abort"),
                        void x.reject(b, "error", "server abort");
                    if (D && D.location.href != p.iframeSrc || v) {
                        f.detachEvent ? f.detachEvent("onload", l) : f.removeEventListener("load", l, !1);
                        var r, a = "success";
                        try {
                            if (v)
                                throw "timeout";
                            var o = "xml" == p.dataType || D.XMLDocument || e.isXMLDoc(D);
                            if (i("isXml=" + o),
                            !o && window.opera && (null === D.body || !D.body.innerHTML) && --M)
                                return i("requeing onLoad callback, DOM not available"),
                                void setTimeout(l, 250);
                            var s = D.body ? D.body : D.documentElement;
                            b.responseText = s ? s.innerHTML : null,
                            b.responseXML = D.XMLDocument ? D.XMLDocument : D,
                            o && (p.dataType = "xml"),
                            b.getResponseHeader = function(e) {
                                return {
                                    "content-type": p.dataType
                                }[e]
                            }
                            ,
                            s && (b.status = Number(s.getAttribute("status")) || b.status,
                            b.statusText = s.getAttribute("statusText") || b.statusText);
                            var c = (p.dataType || "").toLowerCase()
                              , d = /(json|script|text)/.test(c);
                            if (d || p.textarea) {
                                var u = D.getElementsByTagName("textarea")[0];
                                if (u)
                                    b.responseText = u.value,
                                    b.status = Number(u.getAttribute("status")) || b.status,
                                    b.statusText = u.getAttribute("statusText") || b.statusText;
                                else if (d) {
                                    var h = D.getElementsByTagName("pre")[0]
                                      , g = D.getElementsByTagName("body")[0];
                                    h ? b.responseText = h.textContent ? h.textContent : h.innerText : g && (b.responseText = g.textContent ? g.textContent : g.innerText)
                                }
                            } else
                                "xml" == c && !b.responseXML && b.responseText && (b.responseXML = k(b.responseText));
                            try {
                                T = N(b, c, p)
                            } catch (e) {
                                a = "parsererror",
                                b.error = r = e || a
                            }
                        } catch (e) {
                            i("error caught: ", e),
                            a = "error",
                            b.error = r = e || a
                        }
                        b.aborted && (i("upload aborted"),
                        a = null),
                        b.status && (a = b.status >= 200 && 300 > b.status || 304 === b.status ? "success" : "error"),
                        "success" === a ? (p.success && p.success.call(p.context, T, "success", b),
                        x.resolve(b.responseText, "success", b),
                        m && e.event.trigger("ajaxSuccess", [b, p])) : a && (void 0 === r && (r = b.statusText),
                        p.error && p.error.call(p.context, b, a, r),
                        x.reject(b, "error", r),
                        m && e.event.trigger("ajaxError", [b, p, r])),
                        m && e.event.trigger("ajaxComplete", [b, p]),
                        m && !--e.active && e.event.trigger("ajaxStop"),
                        p.complete && p.complete.call(p.context, b, a),
                        E = !0,
                        p.timeout && clearTimeout(S),
                        setTimeout(function() {
                            p.iframeTarget || _.remove(),
                            b.responseXML = null
                        }, 100)
                    }
                }
            }
            var c, u, p, m, g, _, f, b, C, I, v, S, y = d[0], x = e.Deferred();
            if (r)
                for (u = 0; h.length > u; u++)
                    c = e(h[u]),
                    a ? c.prop("disabled", !1) : c.removeAttr("disabled");
            if (p = e.extend(!0, {}, e.ajaxSettings, t),
            p.context = p.context || p,
            g = "jqFormIO" + (new Date).getTime(),
            p.iframeTarget ? (_ = e(p.iframeTarget),
            I = _.attr2("name"),
            I ? g = I : _.attr2("name", g)) : (_ = e('<iframe name="' + g + '" src="' + p.iframeSrc + '" />'),
            _.css({
                position: "absolute",
                top: "-1000px",
                left: "-1000px"
            })),
            f = _[0],
            b = {
                aborted: 0,
                responseText: null,
                responseXML: null,
                status: 0,
                statusText: "n/a",
                getAllResponseHeaders: function() {},
                getResponseHeader: function() {},
                setRequestHeader: function() {},
                abort: function(t) {
                    var r = "timeout" === t ? "timeout" : "aborted";
                    i("aborting upload... " + r),
                    this.aborted = 1;
                    try {
                        f.contentWindow.document.execCommand && f.contentWindow.document.execCommand("Stop")
                    } catch (e) {}
                    _.attr("src", p.iframeSrc),
                    b.error = r,
                    p.error && p.error.call(p.context, b, r, t),
                    m && e.event.trigger("ajaxError", [b, p, r]),
                    p.complete && p.complete.call(p.context, b, r)
                }
            },
            m = p.global,
            m && 0 == e.active++ && e.event.trigger("ajaxStart"),
            m && e.event.trigger("ajaxSend", [b, p]),
            p.beforeSend && !1 === p.beforeSend.call(p.context, b, p))
                return p.global && e.active--,
                x.reject(),
                x;
            if (b.aborted)
                return x.reject(),
                x;
            (C = y.clk) && (I = C.name) && !C.disabled && (p.extraData = p.extraData || {},
            p.extraData[I] = C.value,
            "image" == C.type && (p.extraData[I + ".x"] = y.clk_x,
            p.extraData[I + ".y"] = y.clk_y));
            var P = 1
              , w = 2
              , G = e("meta[name=csrf-token]").attr("content")
              , A = e("meta[name=csrf-param]").attr("content");
            A && G && (p.extraData = p.extraData || {},
            p.extraData[A] = G),
            p.forceSync ? o() : setTimeout(o, 10);
            var T, D, E, M = 50, k = e.parseXML || function(e, t) {
                return window.ActiveXObject ? (t = new ActiveXObject("Microsoft.XMLDOM"),
                t.async = "false",
                t.loadXML(e)) : t = (new DOMParser).parseFromString(e, "text/xml"),
                t && t.documentElement && "parsererror" != t.documentElement.nodeName ? t : null
            }
            , L = e.parseJSON || function(e) {
                return window.eval("(" + e + ")")
            }
            , N = function(t, r, i) {
                var n = t.getResponseHeader("content-type") || ""
                  , a = "xml" === r || !r && n.indexOf("xml") >= 0
                  , o = a ? t.responseXML : t.responseText;
                return a && "parsererror" === o.documentElement.nodeName && e.error && e.error("parsererror"),
                i && i.dataFilter && (o = i.dataFilter(o, r)),
                "string" == typeof o && ("json" === r || !r && n.indexOf("json") >= 0 ? o = L(o) : ("script" === r || !r && n.indexOf("javascript") >= 0) && e.globalEval(o)),
                o
            };
            return x
        }
        if (!this.length)
            return i("ajaxSubmit: skipping submit process - no element selected"),
            this;
        var s, l, c, d = this;
        "function" == typeof t && (t = {
            success: t
        }),
        s = t.type || this.attr2("method"),
        l = t.url || this.attr2("action"),
        c = "string" == typeof l ? e.trim(l) : "",
        c = c || window.location.href || "",
        c && (c = (c.match(/^([^#]+)/) || [])[1]),
        t = e.extend(!0, {
            url: c,
            success: e.ajaxSettings.success,
            type: s || "GET",
            iframeSrc: /^https/i.test(window.location.href || "") ? "javascript:false" : "about:blank"
        }, t);
        var u = {};
        if (this.trigger("form-pre-serialize", [this, t, u]),
        u.veto)
            return i("ajaxSubmit: submit vetoed via form-pre-serialize trigger"),
            this;
        if (t.beforeSerialize && !1 === t.beforeSerialize(this, t))
            return i("ajaxSubmit: submit aborted via beforeSerialize callback"),
            this;
        var p = t.traditional;
        void 0 === p && (p = e.ajaxSettings.traditional);
        var m, h = [], g = this.formToArray(t.semantic, h);
        if (t.data && (t.extraData = t.data,
        m = e.param(t.data, p)),
        t.beforeSubmit && !1 === t.beforeSubmit(g, this, t))
            return i("ajaxSubmit: submit aborted via beforeSubmit callback"),
            this;
        if (this.trigger("form-submit-validate", [g, this, t, u]),
        u.veto)
            return i("ajaxSubmit: submit vetoed via form-submit-validate trigger"),
            this;
        var _ = e.param(g, p);
        m && (_ = _ ? _ + "&" + m : m),
        "GET" == t.type.toUpperCase() ? (t.url += (t.url.indexOf("?") >= 0 ? "&" : "?") + _,
        t.data = null) : t.data = _;
        var f = [];
        if (t.resetForm && f.push(function() {
            d.resetForm()
        }),
        t.clearForm && f.push(function() {
            d.clearForm(t.includeHidden)
        }),
        !t.dataType && t.target) {
            var b = t.success || function() {}
            ;
            f.push(function(r) {
                var i = t.replaceTarget ? "replaceWith" : "html";
                e(t.target)[i](r).each(b, arguments)
            })
        } else
            t.success && f.push(t.success);
        if (t.success = function(e, r, i) {
            for (var n = t.context || this, a = 0, o = f.length; o > a; a++)
                f[a].apply(n, [e, r, i || d, d])
        }
        ,
        t.error) {
            var C = t.error;
            t.error = function(e, r, i) {
                var n = t.context || this;
                C.apply(n, [e, r, i, d])
            }
        }
        if (t.complete) {
            var I = t.complete;
            t.complete = function(e, r) {
                var i = t.context || this;
                I.apply(i, [e, r, d])
            }
        }
        var v = e('input[type=file]:enabled[value!=""]', this)
          , S = v.length > 0
          , y = "multipart/form-data"
          , x = d.attr("enctype") == y || d.attr("encoding") == y
          , P = n.fileapi && n.formdata;
        i("fileAPI :" + P);
        var w, G = (S || x) && !P;
        !1 !== t.iframe && (t.iframe || G) ? t.closeKeepAlive ? e.get(t.closeKeepAlive, function() {
            w = o(g)
        }) : w = o(g) : w = (S || x) && P ? function(i) {
            for (var n = new FormData, a = 0; i.length > a; a++)
                n.append(i[a].name, i[a].value);
            if (t.extraData) {
                var o = r(t.extraData);
                for (a = 0; o.length > a; a++)
                    o[a] && n.append(o[a][0], o[a][1])
            }
            t.data = null;
            var l = e.extend(!0, {}, e.ajaxSettings, t, {
                contentType: !1,
                processData: !1,
                cache: !1,
                type: s || "POST"
            });
            t.uploadProgress && (l.xhr = function() {
                var e = jQuery.ajaxSettings.xhr();
                return e.upload && e.upload.addEventListener("progress", function(e) {
                    var r = 0
                      , i = e.loaded || e.position
                      , n = e.total;
                    e.lengthComputable && (r = Math.ceil(i / n * 100)),
                    t.uploadProgress(e, i, n, r)
                }, !1),
                e
            }
            ),
            l.data = null;
            var c = l.beforeSend;
            return l.beforeSend = function(e, t) {
                t.data = n,
                c && c.call(this, e, t)
            }
            ,
            e.ajax(l)
        }(g) : e.ajax(t),
        d.removeData("jqxhr").data("jqxhr", w);
        for (var A = 0; h.length > A; A++)
            h[A] = null;
        return this.trigger("form-submit-notify", [this, t]),
        this
    }
    ,
    e.fn.ajaxForm = function(n) {
        if (n = n || {},
        n.delegation = n.delegation && e.isFunction(e.fn.on),
        !n.delegation && 0 === this.length) {
            var a = {
                s: this.selector,
                c: this.context
            };
            return !e.isReady && a.s ? (i("DOM not ready, queuing ajaxForm"),
            e(function() {
                e(a.s, a.c).ajaxForm(n)
            }),
            this) : (i("terminating; zero elements found by selector" + (e.isReady ? "" : " (DOM not ready)")),
            this)
        }
        return n.delegation ? (e(document).off("submit.form-plugin", this.selector, t).off("click.form-plugin", this.selector, r).on("submit.form-plugin", this.selector, n, t).on("click.form-plugin", this.selector, n, r),
        this) : this.ajaxFormUnbind().bind("submit.form-plugin", n, t).bind("click.form-plugin", n, r)
    }
    ,
    e.fn.ajaxFormUnbind = function() {
        return this.unbind("submit.form-plugin click.form-plugin")
    }
    ,
    e.fn.formToArray = function(t, r) {
        var i = [];
        if (0 === this.length)
            return i;
        var a = this[0]
          , o = t ? a.getElementsByTagName("*") : a.elements;
        if (!o)
            return i;
        var s, l, c, d, u, p, m;
        for (s = 0,
        p = o.length; p > s; s++)
            if (u = o[s],
            (c = u.name) && !u.disabled)
                if (t && a.clk && "image" == u.type)
                    a.clk == u && (i.push({
                        name: c,
                        value: e(u).val(),
                        type: u.type
                    }),
                    i.push({
                        name: c + ".x",
                        value: a.clk_x
                    }, {
                        name: c + ".y",
                        value: a.clk_y
                    }));
                else if ((d = e.fieldValue(u, !0)) && d.constructor == Array)
                    for (r && r.push(u),
                    l = 0,
                    m = d.length; m > l; l++)
                        i.push({
                            name: c,
                            value: d[l]
                        });
                else if (n.fileapi && "file" == u.type) {
                    r && r.push(u);
                    var h = u.files;
                    if (h.length)
                        for (l = 0; h.length > l; l++)
                            i.push({
                                name: c,
                                value: h[l],
                                type: u.type
                            });
                    else
                        i.push({
                            name: c,
                            value: "",
                            type: u.type
                        })
                } else
                    null !== d && void 0 !== d && (r && r.push(u),
                    i.push({
                        name: c,
                        value: d,
                        type: u.type,
                        required: u.required
                    }));
        if (!t && a.clk) {
            var g = e(a.clk)
              , _ = g[0];
            (c = _.name) && !_.disabled && "image" == _.type && (i.push({
                name: c,
                value: g.val()
            }),
            i.push({
                name: c + ".x",
                value: a.clk_x
            }, {
                name: c + ".y",
                value: a.clk_y
            }))
        }
        return i
    }
    ,
    e.fn.formSerialize = function(t) {
        return e.param(this.formToArray(t))
    }
    ,
    e.fn.fieldSerialize = function(t) {
        var r = [];
        return this.each(function() {
            var i = this.name;
            if (i) {
                var n = e.fieldValue(this, t);
                if (n && n.constructor == Array)
                    for (var a = 0, o = n.length; o > a; a++)
                        r.push({
                            name: i,
                            value: n[a]
                        });
                else
                    null !== n && void 0 !== n && r.push({
                        name: this.name,
                        value: n
                    })
            }
        }),
        e.param(r)
    }
    ,
    e.fn.fieldValue = function(t) {
        for (var r = [], i = 0, n = this.length; n > i; i++) {
            var a = this[i]
              , o = e.fieldValue(a, t);
            null === o || void 0 === o || o.constructor == Array && !o.length || (o.constructor == Array ? e.merge(r, o) : r.push(o))
        }
        return r
    }
    ,
    e.fieldValue = function(t, r) {
        var i = t.name
          , n = t.type
          , a = t.tagName.toLowerCase();
        if (void 0 === r && (r = !0),
        r && (!i || t.disabled || "reset" == n || "button" == n || ("checkbox" == n || "radio" == n) && !t.checked || ("submit" == n || "image" == n) && t.form && t.form.clk != t || "select" == a && -1 == t.selectedIndex))
            return null;
        if ("select" == a) {
            var o = t.selectedIndex;
            if (0 > o)
                return null;
            for (var s = [], l = t.options, c = "select-one" == n, d = c ? o + 1 : l.length, u = c ? o : 0; d > u; u++) {
                var p = l[u];
                if (p.selected) {
                    var m = p.value;
                    if (m || (m = p.attributes && p.attributes.value && !p.attributes.value.specified ? p.text : p.value),
                    c)
                        return m;
                    s.push(m)
                }
            }
            return s
        }
        return e(t).val()
    }
    ,
    e.fn.clearForm = function(t) {
        return this.each(function() {
            e("input,select,textarea", this).clearFields(t)
        })
    }
    ,
    e.fn.clearFields = e.fn.clearInputs = function(t) {
        var r = /^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i;
        return this.each(function() {
            var i = this.type
              , n = this.tagName.toLowerCase();
            r.test(i) || "textarea" == n ? this.value = "" : "checkbox" == i || "radio" == i ? this.checked = !1 : "select" == n ? this.selectedIndex = -1 : "file" == i ? /MSIE/.test(navigator.userAgent) ? e(this).replaceWith(e(this).clone(!0)) : e(this).val("") : t && (!0 === t && /hidden/.test(i) || "string" == typeof t && e(this).is(t)) && (this.value = "")
        })
    }
    ,
    e.fn.resetForm = function() {
        return this.each(function() {
            ("function" == typeof this.reset || "object" == typeof this.reset && !this.reset.nodeType) && this.reset()
        })
    }
    ,
    e.fn.enable = function(e) {
        return void 0 === e && (e = !0),
        this.each(function() {
            this.disabled = !e
        })
    }
    ,
    e.fn.selected = function(t) {
        return void 0 === t && (t = !0),
        this.each(function() {
            var r = this.type;
            if ("checkbox" == r || "radio" == r)
                this.checked = t;
            else if ("option" == this.tagName.toLowerCase()) {
                var i = e(this).parent("select");
                t && i[0] && "select-one" == i[0].type && i.find("option").selected(!1),
                this.selected = t
            }
        })
    }
    ,
    e.fn.ajaxSubmit.debug = !1
}(jQuery),
function(e) {
    "function" == typeof define && define.amd ? define(["jquery"], e) : e(jQuery)
}(function(e) {
    function t(e) {
        return e
    }
    function r(e) {
        return decodeURIComponent(e.replace(n, " "))
    }
    function i(e) {
        0 === e.indexOf('"') && (e = e.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\"));
        try {
            return a.json ? JSON.parse(e) : e
        } catch (e) {}
    }
    var n = /\+/g
      , a = e.cookie = function(n, o, s) {
        if (void 0 !== o) {
            if (s = e.extend({}, a.defaults, s),
            "number" == typeof s.expires) {
                var l = s.expires
                  , c = s.expires = new Date;
                c.setDate(c.getDate() + l)
            }
            return o = a.json ? JSON.stringify(o) : String(o),
            document.cookie = [a.raw ? n : encodeURIComponent(n), "=", a.raw ? o : encodeURIComponent(o), s.expires ? "; expires=" + s.expires.toUTCString() : "", s.path ? "; path=" + s.path : "", s.domain ? "; domain=" + s.domain : "", s.secure ? "; secure" : ""].join("")
        }
        for (var d = a.raw ? t : r, u = document.cookie.split("; "), p = n ? void 0 : {}, m = 0, h = u.length; m < h; m++) {
            var g = u[m].split("=")
              , _ = d(g.shift())
              , f = d(g.join("="));
            if (n && n === _) {
                p = i(f);
                break
            }
            n || (p[_] = i(f))
        }
        return p
    }
    ;
    a.defaults = {},
    e.removeCookie = function(t, r) {
        return void 0 !== e.cookie(t) && (e.cookie(t, "", e.extend({}, r, {
            expires: -1
        })),
        !0)
    }
}),
jQuery.effects || function(e, t) {
    var r = "ui-effects-";
    e.effects = {
        effect: {}
    },
    function(e, t) {
        function r(e, t, r) {
            var i = d[t.type] || {};
            return null == e ? r || !t.def ? null : t.def : (e = i.floor ? ~~e : parseFloat(e),
            isNaN(e) ? t.def : i.mod ? (e + i.mod) % i.mod : 0 > e ? 0 : i.max < e ? i.max : e)
        }
        function i(t) {
            var r = l()
              , i = r._rgba = [];
            return t = t.toLowerCase(),
            m(s, function(e, n) {
                var a, o = n.re.exec(t), s = o && n.parse(o), l = n.space || "rgba";
                if (s)
                    return a = r[l](s),
                    r[c[l].cache] = a[c[l].cache],
                    i = r._rgba = a._rgba,
                    !1
            }),
            i.length ? ("0,0,0,0" === i.join() && e.extend(i, a.transparent),
            r) : a[t]
        }
        function n(e, t, r) {
            return r = (r + 1) % 1,
            6 * r < 1 ? e + (t - e) * r * 6 : 2 * r < 1 ? t : 3 * r < 2 ? e + (t - e) * (2 / 3 - r) * 6 : e
        }
        var a, o = /^([\-+])=\s*(\d+\.?\d*)/, s = [{
            re: /rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
            parse: function(e) {
                return [e[1], e[2], e[3], e[4]]
            }
        }, {
            re: /rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
            parse: function(e) {
                return [2.55 * e[1], 2.55 * e[2], 2.55 * e[3], e[4]]
            }
        }, {
            re: /#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/,
            parse: function(e) {
                return [parseInt(e[1], 16), parseInt(e[2], 16), parseInt(e[3], 16)]
            }
        }, {
            re: /#([a-f0-9])([a-f0-9])([a-f0-9])/,
            parse: function(e) {
                return [parseInt(e[1] + e[1], 16), parseInt(e[2] + e[2], 16), parseInt(e[3] + e[3], 16)]
            }
        }, {
            re: /hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
            space: "hsla",
            parse: function(e) {
                return [e[1], e[2] / 100, e[3] / 100, e[4]]
            }
        }], l = e.Color = function(t, r, i, n) {
            return new e.Color.fn.parse(t,r,i,n)
        }
        , c = {
            rgba: {
                props: {
                    red: {
                        idx: 0,
                        type: "byte"
                    },
                    green: {
                        idx: 1,
                        type: "byte"
                    },
                    blue: {
                        idx: 2,
                        type: "byte"
                    }
                }
            },
            hsla: {
                props: {
                    hue: {
                        idx: 0,
                        type: "degrees"
                    },
                    saturation: {
                        idx: 1,
                        type: "percent"
                    },
                    lightness: {
                        idx: 2,
                        type: "percent"
                    }
                }
            }
        }, d = {
            byte: {
                floor: !0,
                max: 255
            },
            percent: {
                max: 1
            },
            degrees: {
                mod: 360,
                floor: !0
            }
        }, u = l.support = {}, p = e("<p>")[0], m = e.each;
        p.style.cssText = "background-color:rgba(1,1,1,.5)",
        u.rgba = p.style.backgroundColor.indexOf("rgba") > -1,
        m(c, function(e, t) {
            t.cache = "_" + e,
            t.props.alpha = {
                idx: 3,
                type: "percent",
                def: 1
            }
        }),
        l.fn = e.extend(l.prototype, {
            parse: function(n, o, s, d) {
                if (n === t)
                    return this._rgba = [null, null, null, null],
                    this;
                (n.jquery || n.nodeType) && (n = e(n).css(o),
                o = t);
                var u = this
                  , p = e.type(n)
                  , h = this._rgba = [];
                return o !== t && (n = [n, o, s, d],
                p = "array"),
                "string" === p ? this.parse(i(n) || a._default) : "array" === p ? (m(c.rgba.props, function(e, t) {
                    h[t.idx] = r(n[t.idx], t)
                }),
                this) : "object" === p ? (n instanceof l ? m(c, function(e, t) {
                    n[t.cache] && (u[t.cache] = n[t.cache].slice())
                }) : m(c, function(t, i) {
                    var a = i.cache;
                    m(i.props, function(e, t) {
                        if (!u[a] && i.to) {
                            if ("alpha" === e || null == n[e])
                                return;
                            u[a] = i.to(u._rgba)
                        }
                        u[a][t.idx] = r(n[e], t, !0)
                    }),
                    u[a] && e.inArray(null, u[a].slice(0, 3)) < 0 && (u[a][3] = 1,
                    i.from && (u._rgba = i.from(u[a])))
                }),
                this) : void 0
            },
            is: function(e) {
                var t = l(e)
                  , r = !0
                  , i = this;
                return m(c, function(e, n) {
                    var a, o = t[n.cache];
                    return o && (a = i[n.cache] || n.to && n.to(i._rgba) || [],
                    m(n.props, function(e, t) {
                        if (null != o[t.idx])
                            return r = o[t.idx] === a[t.idx]
                    })),
                    r
                }),
                r
            },
            _space: function() {
                var e = []
                  , t = this;
                return m(c, function(r, i) {
                    t[i.cache] && e.push(r)
                }),
                e.pop()
            },
            transition: function(e, t) {
                var i = l(e)
                  , n = i._space()
                  , a = c[n]
                  , o = 0 === this.alpha() ? l("transparent") : this
                  , s = o[a.cache] || a.to(o._rgba)
                  , u = s.slice();
                return i = i[a.cache],
                m(a.props, function(e, n) {
                    var a = n.idx
                      , o = s[a]
                      , l = i[a]
                      , c = d[n.type] || {};
                    null !== l && (null === o ? u[a] = l : (c.mod && (l - o > c.mod / 2 ? o += c.mod : o - l > c.mod / 2 && (o -= c.mod)),
                    u[a] = r((l - o) * t + o, n)))
                }),
                this[n](u)
            },
            blend: function(t) {
                if (1 === this._rgba[3])
                    return this;
                var r = this._rgba.slice()
                  , i = r.pop()
                  , n = l(t)._rgba;
                return l(e.map(r, function(e, t) {
                    return (1 - i) * n[t] + i * e
                }))
            },
            toRgbaString: function() {
                var t = "rgba("
                  , r = e.map(this._rgba, function(e, t) {
                    return null == e ? t > 2 ? 1 : 0 : e
                });
                return 1 === r[3] && (r.pop(),
                t = "rgb("),
                t + r.join() + ")"
            },
            toHslaString: function() {
                var t = "hsla("
                  , r = e.map(this.hsla(), function(e, t) {
                    return null == e && (e = t > 2 ? 1 : 0),
                    t && t < 3 && (e = Math.round(100 * e) + "%"),
                    e
                });
                return 1 === r[3] && (r.pop(),
                t = "hsl("),
                t + r.join() + ")"
            },
            toHexString: function(t) {
                var r = this._rgba.slice()
                  , i = r.pop();
                return t && r.push(~~(255 * i)),
                "#" + e.map(r, function(e) {
                    return e = (e || 0).toString(16),
                    1 === e.length ? "0" + e : e
                }).join("")
            },
            toString: function() {
                return 0 === this._rgba[3] ? "transparent" : this.toRgbaString()
            }
        }),
        l.fn.parse.prototype = l.fn,
        c.hsla.to = function(e) {
            if (null == e[0] || null == e[1] || null == e[2])
                return [null, null, null, e[3]];
            var t, r, i = e[0] / 255, n = e[1] / 255, a = e[2] / 255, o = e[3], s = Math.max(i, n, a), l = Math.min(i, n, a), c = s - l, d = s + l, u = .5 * d;
            return t = l === s ? 0 : i === s ? 60 * (n - a) / c + 360 : n === s ? 60 * (a - i) / c + 120 : 60 * (i - n) / c + 240,
            r = 0 === c ? 0 : u <= .5 ? c / d : c / (2 - d),
            [Math.round(t) % 360, r, u, null == o ? 1 : o]
        }
        ,
        c.hsla.from = function(e) {
            if (null == e[0] || null == e[1] || null == e[2])
                return [null, null, null, e[3]];
            var t = e[0] / 360
              , r = e[1]
              , i = e[2]
              , a = e[3]
              , o = i <= .5 ? i * (1 + r) : i + r - i * r
              , s = 2 * i - o;
            return [Math.round(255 * n(s, o, t + 1 / 3)), Math.round(255 * n(s, o, t)), Math.round(255 * n(s, o, t - 1 / 3)), a]
        }
        ,
        m(c, function(i, n) {
            var a = n.props
              , s = n.cache
              , c = n.to
              , d = n.from;
            l.fn[i] = function(i) {
                if (c && !this[s] && (this[s] = c(this._rgba)),
                i === t)
                    return this[s].slice();
                var n, o = e.type(i), u = "array" === o || "object" === o ? i : arguments, p = this[s].slice();
                return m(a, function(e, t) {
                    var i = u["object" === o ? e : t.idx];
                    null == i && (i = p[t.idx]),
                    p[t.idx] = r(i, t)
                }),
                d ? (n = l(d(p)),
                n[s] = p,
                n) : l(p)
            }
            ,
            m(a, function(t, r) {
                l.fn[t] || (l.fn[t] = function(n) {
                    var a, s = e.type(n), l = "alpha" === t ? this._hsla ? "hsla" : "rgba" : i, c = this[l](), d = c[r.idx];
                    return "undefined" === s ? d : ("function" === s && (n = n.call(this, d),
                    s = e.type(n)),
                    null == n && r.empty ? this : ("string" === s && (a = o.exec(n)) && (n = d + parseFloat(a[2]) * ("+" === a[1] ? 1 : -1)),
                    c[r.idx] = n,
                    this[l](c)))
                }
                )
            })
        }),
        l.hook = function(t) {
            var r = t.split(" ");
            m(r, function(t, r) {
                e.cssHooks[r] = {
                    set: function(t, n) {
                        var a, o, s = "";
                        if ("transparent" !== n && ("string" !== e.type(n) || (a = i(n)))) {
                            if (n = l(a || n),
                            !u.rgba && 1 !== n._rgba[3]) {
                                for (o = "backgroundColor" === r ? t.parentNode : t; ("" === s || "transparent" === s) && o && o.style; )
                                    try {
                                        s = e.css(o, "backgroundColor"),
                                        o = o.parentNode
                                    } catch (e) {}
                                n = n.blend(s && "transparent" !== s ? s : "_default")
                            }
                            n = n.toRgbaString()
                        }
                        try {
                            t.style[r] = n
                        } catch (e) {}
                    }
                },
                e.fx.step[r] = function(t) {
                    t.colorInit || (t.start = l(t.elem, r),
                    t.end = l(t.end),
                    t.colorInit = !0),
                    e.cssHooks[r].set(t.elem, t.start.transition(t.end, t.pos))
                }
            })
        }
        ,
        l.hook("backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor"),
        e.cssHooks.borderColor = {
            expand: function(e) {
                var t = {};
                return m(["Top", "Right", "Bottom", "Left"], function(r, i) {
                    t["border" + i + "Color"] = e
                }),
                t
            }
        },
        a = e.Color.names = {
            aqua: "#00ffff",
            black: "#000000",
            blue: "#0000ff",
            fuchsia: "#ff00ff",
            gray: "#808080",
            green: "#008000",
            lime: "#00ff00",
            maroon: "#800000",
            navy: "#000080",
            olive: "#808000",
            purple: "#800080",
            red: "#ff0000",
            silver: "#c0c0c0",
            teal: "#008080",
            white: "#ffffff",
            yellow: "#ffff00",
            transparent: [null, null, null, 0],
            _default: "#ffffff"
        }
    }(jQuery),
    function() {
        function r(t) {
            var r, i, n = t.ownerDocument.defaultView ? t.ownerDocument.defaultView.getComputedStyle(t, null) : t.currentStyle, a = {};
            if (n && n.length && n[0] && n[n[0]])
                for (i = n.length; i--; )
                    r = n[i],
                    "string" == typeof n[r] && (a[e.camelCase(r)] = n[r]);
            else
                for (r in n)
                    "string" == typeof n[r] && (a[r] = n[r]);
            return a
        }
        function i(t, r) {
            var i, n, o = {};
            for (i in r)
                n = r[i],
                t[i] !== n && !a[i] && (e.fx.step[i] || !isNaN(parseFloat(n))) && (o[i] = n);
            return o
        }
        var n = ["add", "remove", "toggle"]
          , a = {
            border: 1,
            borderBottom: 1,
            borderColor: 1,
            borderLeft: 1,
            borderRight: 1,
            borderTop: 1,
            borderWidth: 1,
            margin: 1,
            padding: 1
        };
        e.each(["borderLeftStyle", "borderRightStyle", "borderBottomStyle", "borderTopStyle"], function(t, r) {
            e.fx.step[r] = function(e) {
                ("none" !== e.end && !e.setAttr || 1 === e.pos && !e.setAttr) && (jQuery.style(e.elem, r, e.end),
                e.setAttr = !0)
            }
        }),
        e.fn.addBack || (e.fn.addBack = function(e) {
            return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
        }
        ),
        e.effects.animateClass = function(t, a, o, s) {
            var l = e.speed(a, o, s);
            return this.queue(function() {
                var a, o = e(this), s = o.attr("class") || "", c = l.children ? o.find("*").addBack() : o;
                c = c.map(function() {
                    return {
                        el: e(this),
                        start: r(this)
                    }
                }),
                a = function() {
                    e.each(n, function(e, r) {
                        t[r] && o[r + "Class"](t[r])
                    })
                }
                ,
                a(),
                c = c.map(function() {
                    return this.end = r(this.el[0]),
                    this.diff = i(this.start, this.end),
                    this
                }),
                o.attr("class", s),
                c = c.map(function() {
                    var t = this
                      , r = e.Deferred()
                      , i = e.extend({}, l, {
                        queue: !1,
                        complete: function() {
                            r.resolve(t)
                        }
                    });
                    return this.el.animate(this.diff, i),
                    r.promise()
                }),
                e.when.apply(e, c.get()).done(function() {
                    a(),
                    e.each(arguments, function() {
                        var t = this.el;
                        e.each(this.diff, function(e) {
                            t.css(e, "")
                        })
                    }),
                    l.complete.call(o[0])
                })
            })
        }
        ,
        e.fn.extend({
            _addClass: e.fn.addClass,
            addClass: function(t, r, i, n) {
                return r ? e.effects.animateClass.call(this, {
                    add: t
                }, r, i, n) : this._addClass(t)
            },
            _removeClass: e.fn.removeClass,
            removeClass: function(t, r, i, n) {
                return arguments.length > 1 ? e.effects.animateClass.call(this, {
                    remove: t
                }, r, i, n) : this._removeClass.apply(this, arguments)
            },
            _toggleClass: e.fn.toggleClass,
            toggleClass: function(r, i, n, a, o) {
                return "boolean" == typeof i || i === t ? n ? e.effects.animateClass.call(this, i ? {
                    add: r
                } : {
                    remove: r
                }, n, a, o) : this._toggleClass(r, i) : e.effects.animateClass.call(this, {
                    toggle: r
                }, i, n, a)
            },
            switchClass: function(t, r, i, n, a) {
                return e.effects.animateClass.call(this, {
                    add: r,
                    remove: t
                }, i, n, a)
            }
        })
    }(),
    function() {
        function i(t, r, i, n) {
            return e.isPlainObject(t) && (r = t,
            t = t.effect),
            t = {
                effect: t
            },
            null == r && (r = {}),
            e.isFunction(r) && (n = r,
            i = null,
            r = {}),
            ("number" == typeof r || e.fx.speeds[r]) && (n = i,
            i = r,
            r = {}),
            e.isFunction(i) && (n = i,
            i = null),
            r && e.extend(t, r),
            i = i || r.duration,
            t.duration = e.fx.off ? 0 : "number" == typeof i ? i : i in e.fx.speeds ? e.fx.speeds[i] : e.fx.speeds._default,
            t.complete = n || r.complete,
            t
        }
        function n(t) {
            return !(t && "number" != typeof t && !e.fx.speeds[t]) || "string" == typeof t && !e.effects.effect[t]
        }
        e.extend(e.effects, {
            version: "1.10.1",
            save: function(e, t) {
                for (var i = 0; i < t.length; i++)
                    null !== t[i] && e.data(r + t[i], e[0].style[t[i]])
            },
            restore: function(e, i) {
                var n, a;
                for (a = 0; a < i.length; a++)
                    null !== i[a] && (n = e.data(r + i[a]),
                    n === t && (n = ""),
                    e.css(i[a], n))
            },
            setMode: function(e, t) {
                return "toggle" === t && (t = e.is(":hidden") ? "show" : "hide"),
                t
            },
            getBaseline: function(e, t) {
                var r, i;
                switch (e[0]) {
                case "top":
                    r = 0;
                    break;
                case "middle":
                    r = .5;
                    break;
                case "bottom":
                    r = 1;
                    break;
                default:
                    r = e[0] / t.height
                }
                switch (e[1]) {
                case "left":
                    i = 0;
                    break;
                case "center":
                    i = .5;
                    break;
                case "right":
                    i = 1;
                    break;
                default:
                    i = e[1] / t.width
                }
                return {
                    x: i,
                    y: r
                }
            },
            createWrapper: function(t) {
                if (t.parent().is(".ui-effects-wrapper"))
                    return t.parent();
                var r = {
                    width: t.outerWidth(!0),
                    height: t.outerHeight(!0),
                    float: t.css("float")
                }
                  , i = e("<div></div>").addClass("ui-effects-wrapper").css({
                    fontSize: "100%",
                    background: "transparent",
                    border: "none",
                    margin: 0,
                    padding: 0
                })
                  , n = {
                    width: t.width(),
                    height: t.height()
                }
                  , a = document.activeElement;
                try {
                    a.id
                } catch (e) {
                    a = document.body
                }
                return t.wrap(i),
                (t[0] === a || e.contains(t[0], a)) && e(a).focus(),
                i = t.parent(),
                "static" === t.css("position") ? (i.css({
                    position: "relative"
                }),
                t.css({
                    position: "relative"
                })) : (e.extend(r, {
                    position: t.css("position"),
                    zIndex: t.css("z-index")
                }),
                e.each(["top", "left", "bottom", "right"], function(e, i) {
                    r[i] = t.css(i),
                    isNaN(parseInt(r[i], 10)) && (r[i] = "auto")
                }),
                t.css({
                    position: "relative",
                    top: 0,
                    left: 0,
                    right: "auto",
                    bottom: "auto"
                })),
                t.css(n),
                i.css(r).show()
            },
            removeWrapper: function(t) {
                var r = document.activeElement;
                return t.parent().is(".ui-effects-wrapper") && (t.parent().replaceWith(t),
                (t[0] === r || e.contains(t[0], r)) && e(r).focus()),
                t
            },
            setTransition: function(t, r, i, n) {
                return n = n || {},
                e.each(r, function(e, r) {
                    var a = t.cssUnit(r);
                    a[0] > 0 && (n[r] = a[0] * i + a[1])
                }),
                n
            }
        }),
        e.fn.extend({
            effect: function() {
                function t(t) {
                    function i() {
                        e.isFunction(a) && a.call(n[0]),
                        e.isFunction(t) && t()
                    }
                    var n = e(this)
                      , a = r.complete
                      , s = r.mode;
                    (n.is(":hidden") ? "hide" === s : "show" === s) ? i() : o.call(n[0], r, i)
                }
                var r = i.apply(this, arguments)
                  , n = r.mode
                  , a = r.queue
                  , o = e.effects.effect[r.effect];
                return e.fx.off || !o ? n ? this[n](r.duration, r.complete) : this.each(function() {
                    r.complete && r.complete.call(this)
                }) : !1 === a ? this.each(t) : this.queue(a || "fx", t)
            },
            _show: e.fn.show,
            show: function(e) {
                if (n(e))
                    return this._show.apply(this, arguments);
                var t = i.apply(this, arguments);
                return t.mode = "show",
                this.effect.call(this, t)
            },
            _hide: e.fn.hide,
            hide: function(e) {
                if (n(e))
                    return this._hide.apply(this, arguments);
                var t = i.apply(this, arguments);
                return t.mode = "hide",
                this.effect.call(this, t)
            },
            __toggle: e.fn.toggle,
            toggle: function(t) {
                if (n(t) || "boolean" == typeof t || e.isFunction(t))
                    return this.__toggle.apply(this, arguments);
                var r = i.apply(this, arguments);
                return r.mode = "toggle",
                this.effect.call(this, r)
            },
            cssUnit: function(t) {
                var r = this.css(t)
                  , i = [];
                return e.each(["em", "px", "%", "pt"], function(e, t) {
                    r.indexOf(t) > 0 && (i = [parseFloat(r), t])
                }),
                i
            }
        })
    }(),
    function() {
        var t = {};
        e.each(["Quad", "Cubic", "Quart", "Quint", "Expo"], function(e, r) {
            t[r] = function(t) {
                return Math.pow(t, e + 2)
            }
        }),
        e.extend(t, {
            Sine: function(e) {
                return 1 - Math.cos(e * Math.PI / 2)
            },
            Circ: function(e) {
                return 1 - Math.sqrt(1 - e * e)
            },
            Elastic: function(e) {
                return 0 === e || 1 === e ? e : -Math.pow(2, 8 * (e - 1)) * Math.sin((80 * (e - 1) - 7.5) * Math.PI / 15)
            },
            Back: function(e) {
                return e * e * (3 * e - 2)
            },
            Bounce: function(e) {
                for (var t, r = 4; e < ((t = Math.pow(2, --r)) - 1) / 11; )
                    ;
                return 1 / Math.pow(4, 3 - r) - 7.5625 * Math.pow((3 * t - 2) / 22 - e, 2)
            }
        }),
        e.each(t, function(t, r) {
            e.easing["easeIn" + t] = r,
            e.easing["easeOut" + t] = function(e) {
                return 1 - r(1 - e)
            }
            ,
            e.easing["easeInOut" + t] = function(e) {
                return e < .5 ? r(2 * e) / 2 : 1 - r(-2 * e + 2) / 2
            }
        })
    }()
}(jQuery),
function(e, t) {
    e.effects.effect.highlight = function(t, r) {
        var i = e(this)
          , n = ["backgroundImage", "backgroundColor", "opacity"]
          , a = e.effects.setMode(i, t.mode || "show")
          , o = {
            backgroundColor: i.css("backgroundColor")
        };
        "hide" === a && (o.opacity = 0),
        e.effects.save(i, n),
        i.show().css({
            backgroundImage: "none",
            backgroundColor: t.color || "#ffff99"
        }).animate(o, {
            queue: !1,
            duration: t.duration,
            easing: t.easing,
            complete: function() {
                "hide" === a && i.hide(),
                e.effects.restore(i, n),
                r()
            }
        })
    }
}(jQuery),
function(e) {
    function t(t) {
        if ("string" == typeof t.data && (t.data = {
            keys: t.data
        }),
        t.data && t.data.keys && "string" == typeof t.data.keys) {
            var r = t.handler
              , i = t.data.keys.toLowerCase().split(" ");
            t.handler = function(t) {
                if (this === t.target || !(e.hotkeys.options.filterInputAcceptingElements && e.hotkeys.textInputTypes.test(t.target.nodeName) || e.hotkeys.options.filterContentEditable && e(t.target).attr("contenteditable") || e.hotkeys.options.filterTextInputs && e.inArray(t.target.type, e.hotkeys.textAcceptingInputTypes) > -1)) {
                    var n = "keypress" !== t.type && e.hotkeys.specialKeys[t.which]
                      , a = String.fromCharCode(t.which).toLowerCase()
                      , o = ""
                      , s = {};
                    e.each(["alt", "ctrl", "shift"], function(e, r) {
                        t[r + "Key"] && n !== r && (o += r + "+")
                    }),
                    t.metaKey && !t.ctrlKey && "meta" !== n && (o += "meta+"),
                    t.metaKey && "meta" !== n && o.indexOf("alt+ctrl+shift+") > -1 && (o = o.replace("alt+ctrl+shift+", "hyper+")),
                    n ? s[o + n] = !0 : (s[o + a] = !0,
                    s[o + e.hotkeys.shiftNums[a]] = !0,
                    "shift+" === o && (s[e.hotkeys.shiftNums[a]] = !0));
                    for (var l = 0, c = i.length; l < c; l++)
                        if (s[i[l]])
                            return r.apply(this, arguments)
                }
            }
        }
    }
    e.hotkeys = {
        version: "0.8",
        specialKeys: {
            8: "backspace",
            9: "tab",
            10: "return",
            13: "return",
            16: "shift",
            17: "ctrl",
            18: "alt",
            19: "pause",
            20: "capslock",
            27: "esc",
            32: "space",
            33: "pageup",
            34: "pagedown",
            35: "end",
            36: "home",
            37: "left",
            38: "up",
            39: "right",
            40: "down",
            45: "insert",
            46: "del",
            59: ";",
            61: "=",
            96: "0",
            97: "1",
            98: "2",
            99: "3",
            100: "4",
            101: "5",
            102: "6",
            103: "7",
            104: "8",
            105: "9",
            106: "*",
            107: "+",
            109: "-",
            110: ".",
            111: "/",
            112: "f1",
            113: "f2",
            114: "f3",
            115: "f4",
            116: "f5",
            117: "f6",
            118: "f7",
            119: "f8",
            120: "f9",
            121: "f10",
            122: "f11",
            123: "f12",
            144: "numlock",
            145: "scroll",
            173: "-",
            186: ";",
            187: "=",
            188: ",",
            189: "-",
            190: ".",
            191: "/",
            192: "`",
            219: "[",
            220: "\\",
            221: "]",
            222: "'"
        },
        shiftNums: {
            "`": "~",
            1: "!",
            2: "@",
            3: "#",
            4: "$",
            5: "%",
            6: "^",
            7: "&",
            8: "*",
            9: "(",
            0: ")",
            "-": "_",
            "=": "+",
            ";": ": ",
            "'": '"',
            ",": "<",
            ".": ">",
            "/": "?",
            "\\": "|"
        },
        textAcceptingInputTypes: ["text", "password", "number", "email", "url", "range", "date", "month", "week", "time", "datetime", "datetime-local", "search", "color", "tel"],
        textInputTypes: /textarea|input|select/i,
        options: {
            filterInputAcceptingElements: !0,
            filterTextInputs: !0,
            filterContentEditable: !0
        }
    },
    e.each(["keydown", "keyup", "keypress"], function() {
        e.event.special[this] = {
            add: t
        }
    })
}(jQuery || this.jQuery || window.jQuery),
function(e) {
    e.jGrowl = function(t, r) {
        0 == e("#jGrowl").size() && e('<div id="jGrowl"></div>').addClass(r && r.position ? r.position : e.jGrowl.defaults.position).appendTo("body"),
        e("#jGrowl").jGrowl(t, r)
    }
    ,
    e.fn.jGrowl = function(t, r) {
        if (e.isFunction(this.each)) {
            var i = arguments;
            return this.each(function() {
                void 0 == e(this).data("jGrowl.instance") && (e(this).data("jGrowl.instance", e.extend(new e.fn.jGrowl, {
                    notifications: [],
                    element: null,
                    interval: null
                })),
                e(this).data("jGrowl.instance").startup(this)),
                e.isFunction(e(this).data("jGrowl.instance")[t]) ? e(this).data("jGrowl.instance")[t].apply(e(this).data("jGrowl.instance"), e.makeArray(i).slice(1)) : e(this).data("jGrowl.instance").create(t, r)
            })
        }
    }
    ,
    e.extend(e.fn.jGrowl.prototype, {
        defaults: {
            pool: 0,
            header: "",
            group: "",
            sticky: !1,
            position: "top-right",
            glue: "after",
            theme: "default",
            themeState: "highlight",
            corners: "10px",
            check: 250,
            life: 3e3,
            closeDuration: "normal",
            openDuration: "normal",
            easing: "swing",
            closer: !0,
            closeTemplate: "&times;",
            closerTemplate: "<div>[ close all ]</div>",
            log: function(e, t, r) {},
            beforeOpen: function(e, t, r) {},
            afterOpen: function(e, t, r) {},
            open: function(e, t, r) {},
            beforeClose: function(e, t, r) {},
            close: function(e, t, r) {},
            animateOpen: {
                opacity: "show"
            },
            animateClose: {
                opacity: "hide"
            }
        },
        notifications: [],
        element: null,
        interval: null,
        create: function(t, r) {
            var r = e.extend({}, this.defaults, r);
            void 0 !== r.speed && (r.openDuration = r.speed,
            r.closeDuration = r.speed),
            this.notifications.push({
                message: t,
                options: r
            }),
            r.log.apply(this.element, [this.element, t, r])
        },
        render: function(t) {
            var r = this
              , i = t.message
              , n = t.options
              , t = e('<div class="jGrowl-notification ' + n.themeState + " ui-corner-all" + (void 0 != n.group && "" != n.group ? " " + n.group : "") + '"><div class="jGrowl-close">' + n.closeTemplate + '</div><div class="jGrowl-header">' + n.header + '</div><div class="jGrowl-message">' + i + "</div></div>").data("jGrowl", n).addClass(n.theme).children("div.jGrowl-close").bind("click.jGrowl", function() {
                e(this).parent().trigger("jGrowl.close")
            }).parent();
            e(t).bind("mouseover.jGrowl", function() {
                e("div.jGrowl-notification", r.element).data("jGrowl.pause", !0)
            }).bind("mouseout.jGrowl", function() {
                e("div.jGrowl-notification", r.element).data("jGrowl.pause", !1)
            }).bind("jGrowl.beforeOpen", function() {
                0 != n.beforeOpen.apply(t, [t, i, n, r.element]) && e(this).trigger("jGrowl.open")
            }).bind("jGrowl.open", function() {
                0 != n.open.apply(t, [t, i, n, r.element]) && ("after" == n.glue ? e("div.jGrowl-notification:last", r.element).after(t) : e("div.jGrowl-notification:first", r.element).before(t),
                e(this).animate(n.animateOpen, n.openDuration, n.easing, function() {
                    !e.browser.msie || 1 !== parseInt(e(this).css("opacity"), 10) && 0 !== parseInt(e(this).css("opacity"), 10) || this.style.removeAttribute("filter"),
                    e(this).data("jGrowl").created = new Date,
                    e(this).trigger("jGrowl.afterOpen")
                }))
            }).bind("jGrowl.afterOpen", function() {
                n.afterOpen.apply(t, [t, i, n, r.element])
            }).bind("jGrowl.beforeClose", function() {
                0 != n.beforeClose.apply(t, [t, i, n, r.element]) && e(this).trigger("jGrowl.close")
            }).bind("jGrowl.close", function() {
                e(this).data("jGrowl.pause", !0),
                e(this).animate(n.animateClose, n.closeDuration, n.easing, function() {
                    e(this).remove();
                    var a = n.close.apply(t, [t, i, n, r.element]);
                    e.isFunction(a) && a.apply(t, [t, i, n, r.element])
                })
            }).trigger("jGrowl.beforeOpen"),
            "" != n.corners && void 0 != e.fn.corner && e(t).corner(n.corners),
            e("div.jGrowl-notification:parent", r.element).size() > 1 && 0 == e("div.jGrowl-closer", r.element).size() && 0 != this.defaults.closer && e(this.defaults.closerTemplate).addClass("jGrowl-closer ui-state-highlight ui-corner-all").addClass(this.defaults.theme).appendTo(r.element).animate(this.defaults.animateOpen, this.defaults.speed, this.defaults.easing).bind("click.jGrowl", function() {
                e(this).siblings().trigger("jGrowl.beforeClose"),
                e.isFunction(r.defaults.closer) && r.defaults.closer.apply(e(this).parent()[0], [e(this).parent()[0]])
            })
        },
        update: function() {
            e(this.element).find("div.jGrowl-notification:parent").each(function() {
                void 0 != e(this).data("jGrowl") && void 0 != e(this).data("jGrowl").created && e(this).data("jGrowl").created.getTime() + parseInt(e(this).data("jGrowl").life) < (new Date).getTime() && 1 != e(this).data("jGrowl").sticky && (void 0 == e(this).data("jGrowl.pause") || 1 != e(this).data("jGrowl.pause")) && e(this).trigger("jGrowl.beforeClose")
            }),
            this.notifications.length > 0 && (0 == this.defaults.pool || e(this.element).find("div.jGrowl-notification:parent").size() < this.defaults.pool) && this.render(this.notifications.shift()),
            e(this.element).find("div.jGrowl-notification:parent").size() < 2 && e(this.element).find("div.jGrowl-closer").animate(this.defaults.animateClose, this.defaults.speed, this.defaults.easing, function() {
                e(this).remove()
            })
        },
        startup: function(t) {
            this.element = e(t).addClass("jGrowl").append('<div class="jGrowl-notification"></div>'),
            this.interval = setInterval(function() {
                e(t).data("jGrowl.instance").update()
            }, parseInt(this.defaults.check)),
            e.browser.msie && parseInt(e.browser.version) < 7 && !window.XMLHttpRequest && e(this.element).addClass("ie6")
        },
        shutdown: function() {
            e(this.element).removeClass("jGrowl").find("div.jGrowl-notification").remove(),
            clearInterval(this.interval)
        },
        close: function() {
            e(this.element).find("div.jGrowl-notification").each(function() {
                e(this).trigger("jGrowl.beforeClose")
            })
        }
    }),
    e.jGrowl.defaults = e.fn.jGrowl.prototype.defaults
}(jQuery),
function(e, t) {
    var r = function(e, t, r) {
        var i;
        return function() {
            function n() {
                r || e.apply(a, o),
                i = null
            }
            var a = this
              , o = arguments;
            i ? clearTimeout(i) : r && e.apply(a, o),
            i = setTimeout(n, t || 100)
        }
    };
    jQuery.fn[t] = function(e) {
        return e ? this.bind("resize", r(e)) : this.trigger(t)
    }
}(jQuery, "smartModalResize"),
function(e) {
    "use strict";
    var t = {
        init: function(t) {
            var r = {
                top: "auto",
                left: "auto",
                autoOpen: !1,
                overlayOpacity: .5,
                overlayColor: "#000",
                overlayClose: !0,
                overlayParent: "body",
                closeOnEscape: !0,
                closeButtonClass: ".close",
                transitionIn: "",
                transitionOut: "",
                onOpen: !1,
                onClose: !1,
                zIndex: function() {
                    return function(e) {
                        return e === -1 / 0 ? 0 : e + 1
                    }(Math.max.apply(Math, e.makeArray(e("*").map(function() {
                        return e(this).css("z-index")
                    }).filter(function() {
                        return e.isNumeric(this)
                    }).map(function() {
                        return parseInt(this, 10)
                    }))))
                },
                updateZIndexOnOpen: !0,
                hasVariableWidth: !1
            };
            return t = e.extend(r, t),
            this.each(function() {
                var r = t
                  , i = e(this).parent()
                  , n = e(this);
                i.css({
                    "z-index": r.updateZIndexOnOpen ? 0 : r.zIndex() + 1
                }),
                n.bind("openModal", function() {
                    var t = r.updateZIndexOnOpen ? r.zIndex() : parseInt(i.css("z-index"), 10)
                      , a = t + 1;
                    "" !== r.transitionIn && "" !== r.transitionOut && n.removeClass(r.transitionOut).addClass(r.transitionIn),
                    i.css({
                        display: "block",
                        "z-index": a
                    }),
                    e("body").addClass("n-modal_open"),
                    r.onOpen && "function" == typeof r.onOpen && r.onOpen(n[0])
                }),
                n.bind("closeModal", function() {
                    "" !== r.transitionIn && "" !== r.transitionOut ? (n.removeClass(r.transitionIn).addClass(r.transitionOut),
                    n.one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function() {
                        i.css("display", "none")
                    })) : i.css("display", "none"),
                    e("body").removeClass("n-modal_open"),
                    r.onClose && "function" == typeof r.onClose && r.onClose(n[0])
                }),
                i.click(function(e) {
                    e.target == this && r.overlayClose && n.trigger("closeModal")
                }),
                e(document).keydown(function(e) {
                    r.closeOnEscape && 27 === e.keyCode && n.trigger("closeModal")
                }),
                e(window).smartModalResize(function() {
                    r.hasVariableWidth && n.css({
                        "margin-left": (parseInt(r.left, 10) > -1 ? 0 : -n.outerWidth() / 2) + "px",
                        "margin-top": (parseInt(r.top, 10) > -1 ? 0 : -n.outerHeight() / 2) + "px"
                    })
                }),
                n.on("click", r.closeButtonClass, function(e) {
                    n.trigger("closeModal"),
                    e.preventDefault()
                }),
                r.autoOpen && n.trigger("openModal")
            })
        }
    };
    e.fn.easyModal = function(r) {
        return t[r] ? t[r].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof r && r ? void e.error("Method " + r + " does not exist on jQuery.easyModal") : t.init.apply(this, arguments)
    }
}(jQuery),
function(e) {
    e.fn.tipTip = function(t) {
        var r = {
            activation: "hover",
            keepAlive: !1,
            maxWidth: "200px",
            edgeOffset: 3,
            defaultPosition: "bottom",
            delay: 400,
            fadeIn: 200,
            fadeOut: 200,
            attribute: "title",
            content: !1,
            enter: function() {},
            exit: function() {}
        }
          , i = e.extend(r, t);
        if (e("#tiptip_holder").length <= 0) {
            var n = e('<div id="tiptip_holder" style="max-width:' + i.maxWidth + ';"></div>')
              , a = e('<div id="tiptip_content"></div>')
              , o = e('<div id="tiptip_arrow"></div>');
            e("body").append(n.html(a).prepend(o.html('<div id="tiptip_arrow_inner"></div>')))
        } else
            var n = e("#tiptip_holder")
              , a = e("#tiptip_content")
              , o = e("#tiptip_arrow");
        return this.each(function() {
            function t() {
                i.enter.call(this),
                a.html(l),
                n.hide().removeAttr("class").css("margin", "0"),
                o.removeAttr("style");
                var t = parseInt(s.offset().top)
                  , r = parseInt(s.offset().left)
                  , d = parseInt(s.outerWidth())
                  , u = parseInt(s.outerHeight())
                  , p = n.outerWidth()
                  , m = n.outerHeight()
                  , h = Math.round((d - p) / 2)
                  , g = Math.round((u - m) / 2)
                  , _ = Math.round(r + h)
                  , f = Math.round(t + u + i.edgeOffset)
                  , b = ""
                  , C = ""
                  , I = Math.round(p - 12) / 2;
                "bottom" == i.defaultPosition ? b = "_bottom" : "top" == i.defaultPosition ? b = "_top" : "left" == i.defaultPosition ? b = "_left" : "right" == i.defaultPosition && (b = "_right");
                var v = h + r < parseInt(e(window).scrollLeft())
                  , S = p + r > parseInt(e(window).width());
                v && h < 0 || "_right" == b && !S || "_left" == b && r < p + i.edgeOffset + 5 ? (b = "_right",
                C = Math.round(m - 13) / 2,
                I = -12,
                _ = Math.round(r + d + i.edgeOffset),
                f = Math.round(t + g)) : (S && h < 0 || "_left" == b && !v) && (b = "_left",
                C = Math.round(m - 13) / 2,
                I = Math.round(p),
                _ = Math.round(r - (p + i.edgeOffset + 5)),
                f = Math.round(t + g));
                var y = t + u + i.edgeOffset + m + 8 > parseInt(e(window).height() + e(window).scrollTop())
                  , x = t + u - (i.edgeOffset + m + 8) < 0;
                y || "_bottom" == b && y || "_top" == b && !x ? ("_top" == b || "_bottom" == b ? b = "_top" : b += "_top",
                C = m,
                f = Math.round(t - (m + 5 + i.edgeOffset))) : (x | ("_top" == b && x) || "_bottom" == b && !y) && ("_top" == b || "_bottom" == b ? b = "_bottom" : b += "_bottom",
                C = -12,
                f = Math.round(t + u + i.edgeOffset)),
                "_right_top" == b || "_left_top" == b ? f += 5 : "_right_bottom" != b && "_left_bottom" != b || (f -= 5),
                "_left_top" != b && "_left_bottom" != b || (_ += 5),
                o.css({
                    "margin-left": I + "px",
                    "margin-top": C + "px"
                }),
                n.css({
                    "margin-left": _ + "px",
                    "margin-top": f + "px"
                }).attr("class", "tip" + b),
                c && clearTimeout(c),
                c = setTimeout(function() {
                    n.stop(!0, !0).fadeIn(i.fadeIn)
                }, i.delay)
            }
            function r() {
                i.exit.call(this),
                c && clearTimeout(c),
                n.fadeOut(i.fadeOut)
            }
            var s = e(this);
            if (i.content)
                var l = i.content;
            else
                var l = s.attr(i.attribute);
            if ("" != l) {
                i.content || s.removeAttr(i.attribute);
                var c = !1;
                "hover" == i.activation ? (s.hover(function() {
                    t()
                }, function() {
                    i.keepAlive || r()
                }),
                i.keepAlive && n.hover(function() {}, function() {
                    r()
                })) : "focus" == i.activation ? s.focus(function() {
                    t()
                }).blur(function() {
                    r()
                }) : "click" == i.activation && (s.click(function() {
                    return t(),
                    !1
                }).hover(function() {}, function() {
                    i.keepAlive || r()
                }),
                i.keepAlive && n.hover(function() {}, function() {
                    r()
                }))
            }
        })
    }
}(jQuery),
function(e) {
    function t(e) {
        return "object" == typeof e ? e : {
            top: e,
            left: e
        }
    }
    var r = e.scrollTo = function(t, r, i) {
        e(window).scrollTo(t, r, i)
    }
    ;
    r.defaults = {
        axis: "xy",
        duration: parseFloat(e.fn.jquery) >= 1.3 ? 0 : 1,
        limit: !0
    },
    r.window = function(t) {
        return e(window)._scrollable()
    }
    ,
    e.fn._scrollable = function() {
        return this.map(function() {
            var t = this;
            if (t.nodeName && -1 == e.inArray(t.nodeName.toLowerCase(), ["iframe", "#document", "html", "body"]))
                return t;
            var r = (t.contentWindow || t).document || t.ownerDocument || t;
            return /webkit/i.test(navigator.userAgent) || "BackCompat" == r.compatMode ? r.body : r.documentElement
        })
    }
    ,
    e.fn.scrollTo = function(i, n, a) {
        return "object" == typeof n && (a = n,
        n = 0),
        "function" == typeof a && (a = {
            onAfter: a
        }),
        "max" == i && (i = 9e9),
        a = e.extend({}, r.defaults, a),
        n = n || a.duration,
        a.queue = a.queue && a.axis.length > 1,
        a.queue && (n /= 2),
        a.offset = t(a.offset),
        a.over = t(a.over),
        this._scrollable().each(function() {
            function o(e) {
                c.animate(u, n, a.easing, e && function() {
                    e.call(this, d, a)
                }
                )
            }
            if (null != i) {
                var s, l = this, c = e(l), d = i, u = {}, p = c.is("html,body");
                switch (typeof d) {
                case "number":
                case "string":
                    if (/^([+-]=?)?\d+(\.\d+)?(px|%)?$/.test(d)) {
                        d = t(d);
                        break
                    }
                    if (d = e(d, this),
                    !d.length)
                        return;
                case "object":
                    (d.is || d.style) && (s = (d = e(d)).offset())
                }
                e.each(a.axis.split(""), function(e, t) {
                    var i = "x" == t ? "Left" : "Top"
                      , n = i.toLowerCase()
                      , m = "scroll" + i
                      , h = l[m]
                      , g = r.max(l, t);
                    if (s)
                        u[m] = s[n] + (p ? 0 : h - c.offset()[n]),
                        a.margin && (u[m] -= parseInt(d.css("margin" + i)) || 0,
                        u[m] -= parseInt(d.css("border" + i + "Width")) || 0),
                        u[m] += a.offset[n] || 0,
                        a.over[n] && (u[m] += d["x" == t ? "width" : "height"]() * a.over[n]);
                    else {
                        var _ = d[n];
                        u[m] = _.slice && "%" == _.slice(-1) ? parseFloat(_) / 100 * g : _
                    }
                    a.limit && /^\d+$/.test(u[m]) && (u[m] = u[m] <= 0 ? 0 : Math.min(u[m], g)),
                    !e && a.queue && (h != u[m] && o(a.onAfterFirst),
                    delete u[m])
                }),
                o(a.onAfter)
            }
        }).end()
    }
    ,
    r.max = function(t, r) {
        var i = "x" == r ? "Width" : "Height"
          , n = "scroll" + i;
        if (!e(t).is("html,body"))
            return t[n] - e(t)[i.toLowerCase()]();
        var a = "client" + i
          , o = t.ownerDocument.documentElement
          , s = t.ownerDocument.body;
        return Math.max(o[n], s[n]) - Math.min(o[a], s[a])
    }
}(jQuery),
function($, window, undefined) {
    $.fn.tabslet = function(options) {
        var defaults = {
            mouseevent: "click",
            attribute: "href",
            animation: !1,
            autorotate: !1,
            deeplinking: !1,
            pauseonhover: !0,
            delay: 2e3,
            active: 1,
            container: !1,
            controls: {
                prev: ".prev",
                next: ".next"
            }
        }
          , options = $.extend(defaults, options);
        return this.each(function() {
            function deep_link() {
                var e = [];
                elements.find("a").each(function() {
                    e.push($(this).attr($this.opts.attribute))
                });
                var t = $.inArray(location.hash, e);
                return t > -1 ? t + 1 : $this.data("active") || options.active
            }
            var $this = $(this)
              , _cache_li = []
              , _cache_div = []
              , _container = options.container ? $(options.container) : $this
              , _tabs = _container.find("> div");
            _tabs.each(function() {
                _cache_div.push($(this).css("display"))
            });
            var elements = $this.find("> ul li")
              , i = options.active - 1;
            if (!$this.data("tabslet-init")) {
                $this.data("tabslet-init", !0),
                $this.opts = [],
                $.map(["mouseevent", "attribute", "animation", "autorotate", "deeplinking", "deeplinking", "pauseonhover", "delay", "container"], function(e, t) {
                    $this.opts[e] = $this.data(e) || options[e]
                }),
                $this.opts.active = $this.opts.deeplinking ? deep_link() : $this.data("active") || options.active,
                _tabs.hide(),
                $this.opts.active && (_tabs.eq($this.opts.active - 1).show(),
                elements.eq($this.opts.active - 1).find("a").addClass("active"));
                var fn = eval(function() {
                    $(this).trigger("_before"),
                    elements.find("a").removeClass("active"),
                    $(this).find("a").addClass("active"),
                    _tabs.hide(),
                    i = elements.index($(this));
                    var e = $(this).find("a").attr($this.opts.attribute);
                    return $this.opts.deeplinking && (location.hash = e),
                    $this.opts.animation ? _container.find(e).animate({
                        opacity: "show"
                    }, "slow", function() {
                        $(this).trigger("_after")
                    }) : (_container.find(e).show(),
                    $(this).trigger("_after")),
                    !1
                }), init = eval("elements." + $this.opts.mouseevent + "(fn)"), t, forward = function() {
                    i = ++i % elements.length,
                    "hover" == $this.opts.mouseevent ? elements.eq(i).trigger("mouseover") : elements.eq(i).click(),
                    $this.opts.autorotate && (clearTimeout(t),
                    t = setTimeout(forward, $this.opts.delay),
                    $this.mouseover(function() {
                        $this.opts.pauseonhover && clearTimeout(t)
                    }))
                };
                $this.opts.autorotate && (t = setTimeout(forward, $this.opts.delay),
                $this.hover(function() {
                    $this.opts.pauseonhover && clearTimeout(t)
                }, function() {
                    t = setTimeout(forward, $this.opts.delay)
                }),
                $this.opts.pauseonhover && $this.on("mouseleave", function() {
                    clearTimeout(t),
                    t = setTimeout(forward, $this.opts.delay)
                }));
                var move = function(e) {
                    "forward" == e && (i = ++i % elements.length),
                    "backward" == e && (i = --i % elements.length),
                    elements.eq(i).click()
                };
                $this.find(options.controls.next).click(function() {
                    move("forward")
                }),
                $this.find(options.controls.prev).click(function() {
                    move("backward")
                }),
                $this.on("next", function() {
                    move("forward")
                }),
                $this.on("prev", function() {
                    move("backward")
                }),
                $this.on("destroy", function() {
                    $(this).removeData().find("> ul li").each(function(e) {
                        $(this).find("a").removeClass("active")
                    }),
                    _tabs.each(function(e) {
                        $(this).removeAttr("style").css("display", _cache_div[e])
                    })
                })
            }
        })
    }
    ,
    $(document).ready(function() {
        $('[data-toggle="tabslet"]').tabslet()
    })
}(jQuery),
function(e, t, r) {
    "use strict";
    var i = e(t)
      , n = t.document
      , a = e(n)
      , o = function() {
        for (var e = 3, t = n.createElement("div"), r = t.getElementsByTagName("i"); t.innerHTML = "\x3c!--[if gt IE " + ++e + "]><i></i><![endif]--\x3e",
        r[0]; )
            ;
        return e > 4 ? e : void 0
    }()
      , s = function() {
        var e = void 0 !== t.pageXOffset ? t.pageXOffset : "CSS1Compat" == n.compatMode ? t.document.documentElement.scrollLeft : t.document.body.scrollLeft
          , r = void 0 !== t.pageYOffset ? t.pageYOffset : "CSS1Compat" == n.compatMode ? t.document.documentElement.scrollTop : t.document.body.scrollTop;
        void 0 === s.x && (s.x = e,
        s.y = r),
        void 0 === s.distanceX ? (s.distanceX = e,
        s.distanceY = r) : (s.distanceX = e - s.x,
        s.distanceY = r - s.y);
        var i = s.x - e
          , a = s.y - r;
        s.direction = i < 0 ? "right" : i > 0 ? "left" : a <= 0 ? "down" : a > 0 ? "up" : "first",
        s.x = e,
        s.y = r
    };
    i.on("scroll", s),
    e.fn.hcStyle = function(r) {
        if (!r)
            return null;
        var i, a = e(this), o = a.clone().css("display", "none");
        o.find("input:radio").attr("name", "copy-" + Math.floor(100 * Math.random() + 1)),
        a.after(o);
        var s = function(e, r) {
            var i;
            return e.currentStyle ? i = e.currentStyle[r.replace(/-\w/g, function(e) {
                return e.toUpperCase().replace("-", "")
            })] : t.getComputedStyle && (i = n.defaultView.getComputedStyle(e, null).getPropertyValue(r)),
            i = /margin/g.test(r) ? parseInt(i) === a[0].offsetLeft ? i : "auto" : i
        };
        return "string" == typeof r ? i = s(o[0], r) : (i = {},
        e.each(r, function(e, t) {
            i[t] = s(o[0], t)
        })),
        o.remove(),
        i || null
    }
    ,
    e.fn.extend({
        hcSticky: function(r) {
            return 0 == this.length ? this : (this.pluginOptions("hcSticky", {
                top: 0,
                bottom: 0,
                bottomEnd: 0,
                innerTop: 0,
                innerSticker: null,
                className: "sticky",
                wrapperClassName: "wrapper-sticky",
                stickTo: null,
                responsive: !0,
                followScroll: !0,
                offResolutions: null,
                onStart: e.noop,
                onStop: e.noop,
                on: !0,
                fn: null
            }, r || {}, {
                reinit: function() {
                    e(this).hcSticky()
                },
                stop: function() {
                    e(this).pluginOptions("hcSticky", {
                        on: !1
                    }).each(function() {
                        var t = e(this)
                          , r = t.pluginOptions("hcSticky")
                          , i = t.parent("." + r.wrapperClassName)
                          , n = t.offset().top - i.offset().top;
                        t.css({
                            position: "absolute",
                            top: n,
                            bottom: "auto",
                            left: "auto",
                            right: "auto"
                        }).removeClass(r.className)
                    })
                },
                off: function() {
                    e(this).pluginOptions("hcSticky", {
                        on: !1
                    }).each(function() {
                        var t = e(this)
                          , r = t.pluginOptions("hcSticky")
                          , i = t.parent("." + r.wrapperClassName);
                        t.css({
                            position: "relative",
                            top: "auto",
                            bottom: "auto",
                            left: "auto",
                            right: "auto"
                        }).removeClass(r.className),
                        i.css("height", "auto")
                    })
                },
                on: function() {
                    e(this).each(function() {
                        e(this).pluginOptions("hcSticky", {
                            on: !0,
                            remember: {
                                offsetTop: i.scrollTop()
                            }
                        }).hcSticky()
                    })
                },
                destroy: function() {
                    var t = e(this)
                      , r = t.pluginOptions("hcSticky")
                      , n = t.parent("." + r.wrapperClassName);
                    t.removeData("hcStickyInit").css({
                        position: n.css("position"),
                        top: n.css("top"),
                        bottom: n.css("bottom"),
                        left: n.css("left"),
                        right: n.css("right")
                    }).removeClass(r.className),
                    i.off("resize", r.fn.resize).off("scroll", r.fn.scroll),
                    t.unwrap()
                }
            }),
            r && void 0 !== r.on && (r.on ? this.hcSticky("on") : this.hcSticky("off")),
            "string" == typeof r ? this : this.each(function() {
                var r = e(this)
                  , n = r.pluginOptions("hcSticky")
                  , l = function() {
                    var e = r.parent("." + n.wrapperClassName);
                    return e.length > 0 && (e.css({
                        height: r.outerHeight(!0),
                        width: function() {
                            var t = e.hcStyle("width");
                            return t.indexOf("%") >= 0 || "auto" == t ? ("border-box" == r.css("box-sizing") || "border-box" == r.css("-moz-box-sizing") ? r.css("width", e.width()) : r.css("width", e.width() - parseInt(r.css("padding-left") - parseInt(r.css("padding-right")))),
                            t) : r.outerWidth(!0)
                        }()
                    }),
                    e)
                }() || function() {
                    var t = r.hcStyle(["width", "margin-left", "left", "right", "top", "bottom", "float", "display"])
                      , i = r.css("display")
                      , a = e("<div>", {
                        class: n.wrapperClassName
                    }).css({
                        display: i,
                        height: r.outerHeight(!0),
                        width: function() {
                            return t.width.indexOf("%") >= 0 || "auto" == t.width && "inline-block" != i && "inline" != i ? (r.css("width", parseFloat(r.css("width"))),
                            t.width) : "auto" != t.width || "inline-block" != i && "inline" != i ? "auto" == t["margin-left"] ? r.outerWidth() : r.outerWidth(!0) : r.width()
                        }(),
                        margin: t["margin-left"] ? "auto" : null,
                        position: function() {
                            var e = r.css("position");
                            return "static" == e ? "relative" : e
                        }(),
                        float: t.float || null,
                        left: t.left,
                        right: t.right,
                        top: t.top,
                        bottom: t.bottom,
                        "vertical-align": "top"
                    });
                    return r.wrap(a),
                    7 === o && 0 === e("head").find("style#hcsticky-iefix").length && e('<style id="hcsticky-iefix">.' + n.wrapperClassName + " {zoom: 1;}</style>").appendTo("head"),
                    r.parent()
                }();
                if (!r.data("hcStickyInit")) {
                    r.data("hcStickyInit", !0);
                    var c = !(!n.stickTo || !("document" == n.stickTo || n.stickTo.nodeType && 9 == n.stickTo.nodeType || "object" == typeof n.stickTo && n.stickTo instanceof ("undefined" != typeof HTMLDocument ? HTMLDocument : Document)))
                      , d = n.stickTo ? c ? a : "string" == typeof n.stickTo ? e(n.stickTo) : n.stickTo : l.parent();
                    r.css({
                        top: "auto",
                        bottom: "auto",
                        left: "auto",
                        right: "auto"
                    }),
                    i.load(function() {
                        r.outerHeight(!0) > d.height() && (l.css("height", r.outerHeight(!0)),
                        r.hcSticky("reinit"))
                    });
                    var u = function(e) {
                        r.hasClass(n.className) || (e = e || {},
                        r.css({
                            position: "fixed",
                            top: e.top || 0,
                            left: e.left || l.offset().left
                        }).addClass(n.className),
                        n.onStart.apply(r[0]),
                        l.addClass("sticky-active"))
                    }
                      , p = function(e) {
                        e = e || {},
                        e.position = e.position || "absolute",
                        e.top = e.top || 0,
                        e.left = e.left || 0,
                        "fixed" != r.css("position") && parseInt(r.css("top")) == e.top || (r.css({
                            position: e.position,
                            top: e.top,
                            left: e.left
                        }).removeClass(n.className),
                        n.onStop.apply(r[0]),
                        l.removeClass("sticky-active"))
                    }
                      , m = function(t) {
                        if (n.on && r.is(":visible")) {
                            if (r.outerHeight(!0) >= d.height())
                                return void p();
                            var a, o = n.innerSticker ? e(n.innerSticker).position().top : n.innerTop ? n.innerTop : 0, m = l.offset().top, h = d.height() - n.bottomEnd + (c ? 0 : m), g = l.offset().top - n.top + o, _ = r.outerHeight(!0) + n.bottom, f = i.height(), b = i.scrollTop(), C = r.offset().top, I = C - b;
                            if (void 0 !== n.remember && n.remember) {
                                var v = C - n.top - o;
                                return void (_ - o > f && n.followScroll ? v < b && b + f <= v + r.height() && (n.remember = !1) : n.remember.offsetTop > v ? b <= v && (u({
                                    top: n.top - o
                                }),
                                n.remember = !1) : b >= v && (u({
                                    top: n.top - o
                                }),
                                n.remember = !1))
                            }
                            b > g ? h + n.bottom - (n.followScroll && f < _ ? 0 : n.top) <= b + _ - o - (_ - o > f - (g - o) && n.followScroll && (a = _ - f - o) > 0 ? a : 0) ? p({
                                top: h - _ + n.bottom - m
                            }) : _ - o > f && n.followScroll ? I + _ <= f ? "down" == s.direction ? u({
                                top: f - _
                            }) : I < 0 && "fixed" == r.css("position") && p({
                                top: C - (g + n.top - o) - s.distanceY
                            }) : "up" == s.direction && C >= b + n.top - o ? u({
                                top: n.top - o
                            }) : "down" == s.direction && C + _ > f && "fixed" == r.css("position") && p({
                                top: C - (g + n.top - o) - s.distanceY
                            }) : u({
                                top: n.top - o
                            }) : p()
                        }
                    }
                      , h = !1
                      , g = !1
                      , _ = function() {
                        if (b(),
                        f(),
                        n.on) {
                            if (n.responsive) {
                                g || (g = r.clone().attr("style", "").css({
                                    visibility: "hidden",
                                    height: 0,
                                    overflow: "hidden",
                                    paddingTop: 0,
                                    paddingBottom: 0,
                                    marginTop: 0,
                                    marginBottom: 0
                                }),
                                l.after(g));
                                var e = l.hcStyle("width")
                                  , t = g.hcStyle("width");
                                "auto" == t && "auto" != e && (t = parseInt(r.css("width"))),
                                t != e && l.width(t),
                                h && clearTimeout(h),
                                h = setTimeout(function() {
                                    h = !1,
                                    g.remove(),
                                    g = !1
                                }, 250)
                            }
                            if (function() {
                                "fixed" == r.css("position") ? r.css("left", l.offset().left) : r.css("left", 0)
                            }(),
                            r.outerWidth(!0) != l.width()) {
                                var i = "border-box" == r.css("box-sizing") || "border-box" == r.css("-moz-box-sizing") ? l.width() : l.width() - parseInt(r.css("padding-left")) - parseInt(r.css("padding-right"));
                                i = i - parseInt(r.css("margin-left")) - parseInt(r.css("margin-right")),
                                r.css("width", i)
                            }
                        }
                    };
                    r.pluginOptions("hcSticky", {
                        fn: {
                            scroll: m,
                            resize: _
                        }
                    });
                    var f = function() {
                        if (n.offResolutions) {
                            e.isArray(n.offResolutions) || (n.offResolutions = [n.offResolutions]);
                            var t = !0;
                            e.each(n.offResolutions, function(e, n) {
                                n < 0 ? i.width() < -1 * n && (t = !1,
                                r.hcSticky("off")) : i.width() > n && (t = !1,
                                r.hcSticky("off"))
                            }),
                            t && !n.on && r.hcSticky("on")
                        }
                    };
                    f(),
                    i.on("resize", _);
                    var b = function() {
                        var r = !1;
                        void 0 != e._data(t, "events").scroll && e.each(e._data(t, "events").scroll, function(e, t) {
                            t.handler == n.fn.scroll && (r = !0)
                        }),
                        r || (n.fn.scroll(!0),
                        i.on("scroll", n.fn.scroll))
                    };
                    b()
                }
            }))
        }
    })
}(jQuery, this),
function(e, t) {
    "use strict";
    e.fn.extend({
        pluginOptions: function(t, r, i, n) {
            return this.data(t) || this.data(t, {}),
            t && void 0 === r ? this.data(t).options : (i = i || r || {},
            "object" == typeof i || void 0 === i ? this.each(function() {
                var a = e(this);
                a.data(t).options ? a.data(t, e.extend(a.data(t), {
                    options: e.extend(a.data(t).options, i || {})
                })) : (a.data(t, {
                    options: e.extend(r, i || {})
                }),
                n && (a.data(t).commands = n))
            }) : "string" == typeof i ? this.each(function() {
                e(this).data(t).commands[i].call(this)
            }) : this)
        }
    })
}(jQuery),
function() {
    var e, t, r, i, n, a = {}.hasOwnProperty, o = function(e, t) {
        function r() {
            this.constructor = e
        }
        for (var i in t)
            a.call(t, i) && (e[i] = t[i]);
        return r.prototype = t.prototype,
        e.prototype = new r,
        e.__super__ = t.prototype,
        e
    };
    i = function() {
        function e() {
            this.options_index = 0,
            this.parsed = []
        }
        return e.prototype.add_node = function(e) {
            return "OPTGROUP" === e.nodeName.toUpperCase() ? this.add_group(e) : this.add_option(e)
        }
        ,
        e.prototype.add_group = function(e) {
            var t, r, i, n, a, o;
            for (t = this.parsed.length,
            this.parsed.push({
                array_index: t,
                group: !0,
                label: this.escapeExpression(e.label),
                title: e.title ? e.title : void 0,
                children: 0,
                disabled: e.disabled,
                classes: e.className
            }),
            a = e.childNodes,
            o = [],
            i = 0,
            n = a.length; i < n; i++)
                r = a[i],
                o.push(this.add_option(r, t, e.disabled));
            return o
        }
        ,
        e.prototype.add_option = function(e, t, r) {
            if ("OPTION" === e.nodeName.toUpperCase())
                return "" !== e.text ? (null != t && (this.parsed[t].children += 1),
                this.parsed.push({
                    array_index: this.parsed.length,
                    options_index: this.options_index,
                    value: e.value,
                    text: e.text,
                    html: e.innerHTML,
                    title: e.title ? e.title : void 0,
                    selected: e.selected,
                    disabled: !0 === r ? r : e.disabled,
                    group_array_index: t,
                    group_label: null != t ? this.parsed[t].label : null,
                    classes: e.className,
                    style: e.style.cssText
                })) : this.parsed.push({
                    array_index: this.parsed.length,
                    options_index: this.options_index,
                    empty: !0
                }),
                this.options_index += 1
        }
        ,
        e.prototype.escapeExpression = function(e) {
            var t, r;
            return null == e || !1 === e ? "" : /[\&\<\>\"\'\`]/.test(e) ? (t = {
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#x27;",
                "`": "&#x60;"
            },
            r = /&(?!\w+;)|[\<\>\"\'\`]/g,
            e.replace(r, function(e) {
                return t[e] || "&amp;"
            })) : e
        }
        ,
        e
    }(),
    i.select_to_array = function(e) {
        var t, r, n, a, o;
        for (r = new i,
        o = e.childNodes,
        n = 0,
        a = o.length; n < a; n++)
            t = o[n],
            r.add_node(t);
        return r.parsed
    }
    ,
    t = function() {
        function e(t, r) {
            this.form_field = t,
            this.options = null != r ? r : {},
            e.browser_is_supported() && (this.is_multiple = this.form_field.multiple,
            this.set_default_text(),
            this.set_default_values(),
            this.setup(),
            this.set_up_html(),
            this.register_observers(),
            this.on_ready())
        }
        return e.prototype.set_default_values = function() {
            var e = this;
            return this.click_test_action = function(t) {
                return e.test_active_click(t)
            }
            ,
            this.activate_action = function(t) {
                return e.activate_field(t)
            }
            ,
            this.active_field = !1,
            this.mouse_on_container = !1,
            this.results_showing = !1,
            this.result_highlighted = null,
            this.allow_single_deselect = null != this.options.allow_single_deselect && null != this.form_field.options[0] && "" === this.form_field.options[0].text && this.options.allow_single_deselect,
            this.disable_search_threshold = this.options.disable_search_threshold || 0,
            this.disable_search = this.options.disable_search || !1,
            this.enable_split_word_search = null == this.options.enable_split_word_search || this.options.enable_split_word_search,
            this.group_search = null == this.options.group_search || this.options.group_search,
            this.search_contains = this.options.search_contains || !1,
            this.single_backstroke_delete = null == this.options.single_backstroke_delete || this.options.single_backstroke_delete,
            this.max_selected_options = this.options.max_selected_options || 1 / 0,
            this.inherit_select_classes = this.options.inherit_select_classes || !1,
            this.display_selected_options = null == this.options.display_selected_options || this.options.display_selected_options,
            this.display_disabled_options = null == this.options.display_disabled_options || this.options.display_disabled_options,
            this.include_group_label_in_selected = this.options.include_group_label_in_selected || !1,
            this.max_shown_results = this.options.max_shown_results || Number.POSITIVE_INFINITY
        }
        ,
        e.prototype.set_default_text = function() {
            return this.form_field.getAttribute("data-placeholder") ? this.default_text = this.form_field.getAttribute("data-placeholder") : this.is_multiple ? this.default_text = this.options.placeholder_text_multiple || this.options.placeholder_text || e.default_multiple_text : this.default_text = this.options.placeholder_text_single || this.options.placeholder_text || e.default_single_text,
            this.results_none_found = this.form_field.getAttribute("data-no_results_text") || this.options.no_results_text || e.default_no_result_text
        }
        ,
        e.prototype.choice_label = function(e) {
            return this.include_group_label_in_selected && null != e.group_label ? "<b class='group-name'>" + e.group_label + "</b>" + e.html : e.html
        }
        ,
        e.prototype.mouse_enter = function() {
            return this.mouse_on_container = !0
        }
        ,
        e.prototype.mouse_leave = function() {
            return this.mouse_on_container = !1
        }
        ,
        e.prototype.input_focus = function(e) {
            var t = this;
            if (this.is_multiple) {
                if (!this.active_field)
                    return setTimeout(function() {
                        return t.container_mousedown()
                    }, 50)
            } else if (!this.active_field)
                return this.activate_field()
        }
        ,
        e.prototype.input_blur = function(e) {
            var t = this;
            if (!this.mouse_on_container)
                return this.active_field = !1,
                setTimeout(function() {
                    return t.blur_test()
                }, 100)
        }
        ,
        e.prototype.results_option_build = function(e) {
            var t, r, i, n, a, o, s;
            for (t = "",
            n = 0,
            s = this.results_data,
            a = 0,
            o = s.length; a < o && (r = s[a],
            i = "",
            i = r.group ? this.result_add_group(r) : this.result_add_option(r),
            "" !== i && (n++,
            t += i),
            (null != e ? e.first : void 0) && (r.selected && this.is_multiple ? this.choice_build(r) : r.selected && !this.is_multiple && this.single_set_selected_text(this.choice_label(r))),
            !(n >= this.max_shown_results)); a++)
                ;
            return t
        }
        ,
        e.prototype.result_add_option = function(e) {
            var t, r;
            return e.search_match && this.include_option_in_results(e) ? (t = [],
            e.disabled || e.selected && this.is_multiple || t.push("active-result"),
            !e.disabled || e.selected && this.is_multiple || t.push("disabled-result"),
            e.selected && t.push("result-selected"),
            null != e.group_array_index && t.push("group-option"),
            "" !== e.classes && t.push(e.classes),
            r = document.createElement("li"),
            r.className = t.join(" "),
            r.style.cssText = e.style,
            r.setAttribute("data-option-array-index", e.array_index),
            r.innerHTML = e.search_text,
            e.title && (r.title = e.title),
            this.outerHTML(r)) : ""
        }
        ,
        e.prototype.result_add_group = function(e) {
            var t, r;
            return (e.search_match || e.group_match) && e.active_options > 0 ? (t = [],
            t.push("group-result"),
            e.classes && t.push(e.classes),
            r = document.createElement("li"),
            r.className = t.join(" "),
            r.innerHTML = e.search_text,
            e.title && (r.title = e.title),
            this.outerHTML(r)) : ""
        }
        ,
        e.prototype.results_update_field = function() {
            if (this.set_default_text(),
            this.is_multiple || this.results_reset_cleanup(),
            this.result_clear_highlight(),
            this.results_build(),
            this.results_showing)
                return this.winnow_results()
        }
        ,
        e.prototype.reset_single_select_options = function() {
            var e, t, r, i, n;
            for (i = this.results_data,
            n = [],
            t = 0,
            r = i.length; t < r; t++)
                e = i[t],
                e.selected ? n.push(e.selected = !1) : n.push(void 0);
            return n
        }
        ,
        e.prototype.results_toggle = function() {
            return this.results_showing ? this.results_hide() : this.results_show()
        }
        ,
        e.prototype.results_search = function(e) {
            return this.results_showing ? this.winnow_results() : this.results_show()
        }
        ,
        e.prototype.winnow_results = function() {
            var e, t, r, i, n, a, o, s, l, c, d, u;
            for (this.no_results_clear(),
            i = 0,
            a = this.get_search_text(),
            e = a.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"),
            l = new RegExp(e,"i"),
            r = this.get_search_regex(e),
            u = this.results_data,
            c = 0,
            d = u.length; c < d; c++)
                t = u[c],
                t.search_match = !1,
                n = null,
                this.include_option_in_results(t) && (t.group && (t.group_match = !1,
                t.active_options = 0),
                null != t.group_array_index && this.results_data[t.group_array_index] && (n = this.results_data[t.group_array_index],
                0 === n.active_options && n.search_match && (i += 1),
                n.active_options += 1),
                t.search_text = t.group ? t.label : t.html,
                t.group && !this.group_search || (t.search_match = this.search_string_match(t.search_text, r),
                t.search_match && !t.group && (i += 1),
                t.search_match ? (a.length && (o = t.search_text.search(l),
                s = t.search_text.substr(0, o + a.length) + "</em>" + t.search_text.substr(o + a.length),
                t.search_text = s.substr(0, o) + "<em>" + s.substr(o)),
                null != n && (n.group_match = !0)) : null != t.group_array_index && this.results_data[t.group_array_index].search_match && (t.search_match = !0)));
            return this.result_clear_highlight(),
            i < 1 && a.length ? (this.update_results_content(""),
            this.no_results(a)) : (this.update_results_content(this.results_option_build()),
            this.winnow_results_set_highlight())
        }
        ,
        e.prototype.get_search_regex = function(e) {
            var t;
            return t = this.search_contains ? "" : "^",
            new RegExp(t + e,"i")
        }
        ,
        e.prototype.search_string_match = function(e, t) {
            var r, i, n, a;
            if (t.test(e))
                return !0;
            if (this.enable_split_word_search && (e.indexOf(" ") >= 0 || 0 === e.indexOf("[")) && (i = e.replace(/\[|\]/g, "").split(" "),
            i.length))
                for (n = 0,
                a = i.length; n < a; n++)
                    if (r = i[n],
                    t.test(r))
                        return !0
        }
        ,
        e.prototype.choices_count = function() {
            var e, t, r, i;
            if (null != this.selected_option_count)
                return this.selected_option_count;
            for (this.selected_option_count = 0,
            i = this.form_field.options,
            t = 0,
            r = i.length; t < r; t++)
                e = i[t],
                e.selected && (this.selected_option_count += 1);
            return this.selected_option_count
        }
        ,
        e.prototype.choices_click = function(e) {
            if (e.preventDefault(),
            !this.results_showing && !this.is_disabled)
                return this.results_show()
        }
        ,
        e.prototype.keyup_checker = function(e) {
            var t, r;
            switch (t = null != (r = e.which) ? r : e.keyCode,
            this.search_field_scale(),
            t) {
            case 8:
                if (this.is_multiple && this.backstroke_length < 1 && this.choices_count() > 0)
                    return this.keydown_backstroke();
                if (!this.pending_backstroke)
                    return this.result_clear_highlight(),
                    this.results_search();
                break;
            case 13:
                if (e.preventDefault(),
                this.results_showing)
                    return this.result_select(e);
                break;
            case 27:
                return this.results_showing && this.results_hide(),
                !0;
            case 9:
            case 38:
            case 40:
            case 16:
            case 91:
            case 17:
            case 18:
                break;
            default:
                return this.results_search()
            }
        }
        ,
        e.prototype.clipboard_event_checker = function(e) {
            var t = this;
            return setTimeout(function() {
                return t.results_search()
            }, 50)
        }
        ,
        e.prototype.container_width = function() {
            return null != this.options.width ? this.options.width : this.form_field.offsetWidth + "px"
        }
        ,
        e.prototype.include_option_in_results = function(e) {
            return !(this.is_multiple && !this.display_selected_options && e.selected) && (!(!this.display_disabled_options && e.disabled) && !e.empty)
        }
        ,
        e.prototype.search_results_touchstart = function(e) {
            return this.touch_started = !0,
            this.search_results_mouseover(e)
        }
        ,
        e.prototype.search_results_touchmove = function(e) {
            return this.touch_started = !1,
            this.search_results_mouseout(e)
        }
        ,
        e.prototype.search_results_touchend = function(e) {
            if (this.touch_started)
                return this.search_results_mouseup(e)
        }
        ,
        e.prototype.outerHTML = function(e) {
            var t;
            return e.outerHTML ? e.outerHTML : (t = document.createElement("div"),
            t.appendChild(e),
            t.innerHTML)
        }
        ,
        e.browser_is_supported = function() {
            return !/iP(od|hone)/i.test(window.navigator.userAgent) && ((!/Android/i.test(window.navigator.userAgent) || !/Mobile/i.test(window.navigator.userAgent)) && (!/IEMobile/i.test(window.navigator.userAgent) && (!/Windows Phone/i.test(window.navigator.userAgent) && (!/BlackBerry/i.test(window.navigator.userAgent) && (!/BB10/i.test(window.navigator.userAgent) && ("Microsoft Internet Explorer" !== window.navigator.appName || document.documentMode >= 8))))))
        }
        ,
        e.default_multiple_text = "Select Some Options",
        e.default_single_text = "Select an Option",
        e.default_no_result_text = "No results match",
        e
    }(),
    e = jQuery,
    e.fn.extend({
        chosen: function(i) {
            return t.browser_is_supported() ? this.each(function(t) {
                var n, a;
                if (n = e(this),
                a = n.data("chosen"),
                "destroy" === i)
                    return void (a instanceof r && a.destroy());
                a instanceof r || n.data("chosen", new r(this,i))
            }) : this
        }
    }),
    r = function(t) {
        function r() {
            return n = r.__super__.constructor.apply(this, arguments)
        }
        return o(r, t),
        r.prototype.setup = function() {
            return this.form_field_jq = e(this.form_field),
            this.current_selectedIndex = this.form_field.selectedIndex,
            this.is_rtl = this.form_field_jq.hasClass("chosen-rtl")
        }
        ,
        r.prototype.set_up_html = function() {
            var t, r;
            return t = ["chosen-container"],
            t.push("chosen-container-" + (this.is_multiple ? "multi" : "single")),
            this.inherit_select_classes && this.form_field.className && t.push(this.form_field.className),
            this.is_rtl && t.push("chosen-rtl"),
            r = {
                class: t.join(" "),
                style: "width: " + this.container_width() + ";",
                title: this.form_field.title
            },
            this.form_field.id.length && (r.id = this.form_field.id.replace(/[^\w]/g, "_") + "_chosen"),
            this.container = e("<div />", r),
            this.is_multiple ? this.container.html('<ul class="chosen-choices"><li class="search-field"><input type="text" value="' + this.default_text + '" class="default" autocomplete="off" style="width:25px;" /></li></ul><div class="chosen-drop"><ul class="chosen-results"></ul></div>') : this.container.html('<a class="chosen-single chosen-default"><span>' + this.default_text + '</span><div><b></b></div></a><div class="chosen-drop"><div class="chosen-search"><input type="text" autocomplete="off" /></div><ul class="chosen-results"></ul></div>'),
            this.form_field_jq.hide().after(this.container),
            this.dropdown = this.container.find("div.chosen-drop").first(),
            this.search_field = this.container.find("input").first(),
            this.search_results = this.container.find("ul.chosen-results").first(),
            this.search_field_scale(),
            this.search_no_results = this.container.find("li.no-results").first(),
            this.is_multiple ? (this.search_choices = this.container.find("ul.chosen-choices").first(),
            this.search_container = this.container.find("li.search-field").first()) : (this.search_container = this.container.find("div.chosen-search").first(),
            this.selected_item = this.container.find(".chosen-single").first()),
            this.results_build(),
            this.set_tab_index(),
            this.set_label_behavior()
        }
        ,
        r.prototype.on_ready = function() {
            return this.form_field_jq.trigger("chosen:ready", {
                chosen: this
            })
        }
        ,
        r.prototype.register_observers = function() {
            var e = this;
            return this.container.bind("touchstart.chosen", function(t) {
                return e.container_mousedown(t),
                t.preventDefault()
            }),
            this.container.bind("touchend.chosen", function(t) {
                return e.container_mouseup(t),
                t.preventDefault()
            }),
            this.container.bind("mousedown.chosen", function(t) {
                e.container_mousedown(t)
            }),
            this.container.bind("mouseup.chosen", function(t) {
                e.container_mouseup(t)
            }),
            this.container.bind("mouseenter.chosen", function(t) {
                e.mouse_enter(t)
            }),
            this.container.bind("mouseleave.chosen", function(t) {
                e.mouse_leave(t)
            }),
            this.search_results.bind("mouseup.chosen", function(t) {
                e.search_results_mouseup(t)
            }),
            this.search_results.bind("mouseover.chosen", function(t) {
                e.search_results_mouseover(t)
            }),
            this.search_results.bind("mouseout.chosen", function(t) {
                e.search_results_mouseout(t)
            }),
            this.search_results.bind("mousewheel.chosen DOMMouseScroll.chosen", function(t) {
                e.search_results_mousewheel(t)
            }),
            this.search_results.bind("touchstart.chosen", function(t) {
                e.search_results_touchstart(t)
            }),
            this.search_results.bind("touchmove.chosen", function(t) {
                e.search_results_touchmove(t)
            }),
            this.search_results.bind("touchend.chosen", function(t) {
                e.search_results_touchend(t)
            }),
            this.form_field_jq.bind("chosen:updated.chosen", function(t) {
                e.results_update_field(t)
            }),
            this.form_field_jq.bind("chosen:activate.chosen", function(t) {
                e.activate_field(t)
            }),
            this.form_field_jq.bind("chosen:open.chosen", function(t) {
                e.container_mousedown(t)
            }),
            this.form_field_jq.bind("chosen:close.chosen", function(t) {
                e.input_blur(t)
            }),
            this.search_field.bind("blur.chosen", function(t) {
                e.input_blur(t)
            }),
            this.search_field.bind("keyup.chosen", function(t) {
                e.keyup_checker(t)
            }),
            this.search_field.bind("keydown.chosen", function(t) {
                e.keydown_checker(t)
            }),
            this.search_field.bind("focus.chosen", function(t) {
                e.input_focus(t)
            }),
            this.search_field.bind("cut.chosen", function(t) {
                e.clipboard_event_checker(t)
            }),
            this.search_field.bind("paste.chosen", function(t) {
                e.clipboard_event_checker(t)
            }),
            this.is_multiple ? this.search_choices.bind("click.chosen", function(t) {
                e.choices_click(t)
            }) : this.container.bind("click.chosen", function(e) {
                e.preventDefault()
            })
        }
        ,
        r.prototype.destroy = function() {
            return e(this.container[0].ownerDocument).unbind("click.chosen", this.click_test_action),
            this.search_field[0].tabIndex && (this.form_field_jq[0].tabIndex = this.search_field[0].tabIndex),
            this.container.remove(),
            this.form_field_jq.removeData("chosen"),
            this.form_field_jq.show()
        }
        ,
        r.prototype.search_field_disabled = function() {
            return this.is_disabled = this.form_field_jq[0].disabled,
            this.is_disabled ? (this.container.addClass("chosen-disabled"),
            this.search_field[0].disabled = !0,
            this.is_multiple || this.selected_item.unbind("focus.chosen", this.activate_action),
            this.close_field()) : (this.container.removeClass("chosen-disabled"),
            this.search_field[0].disabled = !1,
            this.is_multiple ? void 0 : this.selected_item.bind("focus.chosen", this.activate_action))
        }
        ,
        r.prototype.container_mousedown = function(t) {
            if (!this.is_disabled && (t && "mousedown" === t.type && !this.results_showing && t.preventDefault(),
            null == t || !e(t.target).hasClass("search-choice-close")))
                return this.active_field ? this.is_multiple || !t || e(t.target)[0] !== this.selected_item[0] && !e(t.target).parents("a.chosen-single").length || (t.preventDefault(),
                this.results_toggle()) : (this.is_multiple && this.search_field.val(""),
                e(this.container[0].ownerDocument).bind("click.chosen", this.click_test_action),
                this.results_show()),
                this.activate_field()
        }
        ,
        r.prototype.container_mouseup = function(e) {
            if ("ABBR" === e.target.nodeName && !this.is_disabled)
                return this.results_reset(e)
        }
        ,
        r.prototype.search_results_mousewheel = function(e) {
            var t;
            if (e.originalEvent && (t = e.originalEvent.deltaY || -e.originalEvent.wheelDelta || e.originalEvent.detail),
            null != t)
                return e.preventDefault(),
                "DOMMouseScroll" === e.type && (t *= 40),
                this.search_results.scrollTop(t + this.search_results.scrollTop())
        }
        ,
        r.prototype.blur_test = function(e) {
            if (!this.active_field && this.container.hasClass("chosen-container-active"))
                return this.close_field()
        }
        ,
        r.prototype.close_field = function() {
            return e(this.container[0].ownerDocument).unbind("click.chosen", this.click_test_action),
            this.active_field = !1,
            this.results_hide(),
            this.container.removeClass("chosen-container-active"),
            this.clear_backstroke(),
            this.show_search_field_default(),
            this.search_field_scale()
        }
        ,
        r.prototype.activate_field = function() {
            return this.container.addClass("chosen-container-active"),
            this.active_field = !0,
            this.search_field.val(this.search_field.val()),
            this.search_field.focus()
        }
        ,
        r.prototype.test_active_click = function(t) {
            var r;
            return r = e(t.target).closest(".chosen-container"),
            r.length && this.container[0] === r[0] ? this.active_field = !0 : this.close_field()
        }
        ,
        r.prototype.results_build = function() {
            return this.parsing = !0,
            this.selected_option_count = null,
            this.results_data = i.select_to_array(this.form_field),
            this.is_multiple ? this.search_choices.find("li.search-choice").remove() : this.is_multiple || (this.single_set_selected_text(),
            this.disable_search || this.form_field.options.length <= this.disable_search_threshold ? (this.search_field[0].readOnly = !0,
            this.container.addClass("chosen-container-single-nosearch")) : (this.search_field[0].readOnly = !1,
            this.container.removeClass("chosen-container-single-nosearch"))),
            this.update_results_content(this.results_option_build({
                first: !0
            })),
            this.search_field_disabled(),
            this.show_search_field_default(),
            this.search_field_scale(),
            this.parsing = !1
        }
        ,
        r.prototype.result_do_highlight = function(e) {
            var t, r, i, n, a;
            if (e.length) {
                if (this.result_clear_highlight(),
                this.result_highlight = e,
                this.result_highlight.addClass("highlighted"),
                i = parseInt(this.search_results.css("maxHeight"), 10),
                a = this.search_results.scrollTop(),
                n = i + a,
                r = this.result_highlight.position().top + this.search_results.scrollTop(),
                (t = r + this.result_highlight.outerHeight()) >= n)
                    return this.search_results.scrollTop(t - i > 0 ? t - i : 0);
                if (r < a)
                    return this.search_results.scrollTop(r)
            }
        }
        ,
        r.prototype.result_clear_highlight = function() {
            return this.result_highlight && this.result_highlight.removeClass("highlighted"),
            this.result_highlight = null
        }
        ,
        r.prototype.results_show = function() {
            return this.is_multiple && this.max_selected_options <= this.choices_count() ? (this.form_field_jq.trigger("chosen:maxselected", {
                chosen: this
            }),
            !1) : (this.container.addClass("chosen-with-drop"),
            this.results_showing = !0,
            this.search_field.focus(),
            this.search_field.val(this.search_field.val()),
            this.winnow_results(),
            this.form_field_jq.trigger("chosen:showing_dropdown", {
                chosen: this
            }))
        }
        ,
        r.prototype.update_results_content = function(e) {
            return this.search_results.html(e)
        }
        ,
        r.prototype.results_hide = function() {
            return this.results_showing && (this.result_clear_highlight(),
            this.container.removeClass("chosen-with-drop"),
            this.form_field_jq.trigger("chosen:hiding_dropdown", {
                chosen: this
            })),
            this.results_showing = !1
        }
        ,
        r.prototype.set_tab_index = function(e) {
            var t;
            if (this.form_field.tabIndex)
                return t = this.form_field.tabIndex,
                this.form_field.tabIndex = -1,
                this.search_field[0].tabIndex = t
        }
        ,
        r.prototype.set_label_behavior = function() {
            var t = this;
            if (this.form_field_label = this.form_field_jq.parents("label"),
            !this.form_field_label.length && this.form_field.id.length && (this.form_field_label = e("label[for='" + this.form_field.id + "']")),
            this.form_field_label.length > 0)
                return this.form_field_label.bind("click.chosen", function(e) {
                    return t.is_multiple ? t.container_mousedown(e) : t.activate_field()
                })
        }
        ,
        r.prototype.show_search_field_default = function() {
            return this.is_multiple && this.choices_count() < 1 && !this.active_field ? (this.search_field.val(this.default_text),
            this.search_field.addClass("default")) : (this.search_field.val(""),
            this.search_field.removeClass("default"))
        }
        ,
        r.prototype.search_results_mouseup = function(t) {
            var r;
            if (r = e(t.target).hasClass("active-result") ? e(t.target) : e(t.target).parents(".active-result").first(),
            r.length)
                return this.result_highlight = r,
                this.result_select(t),
                this.search_field.focus()
        }
        ,
        r.prototype.search_results_mouseover = function(t) {
            var r;
            if (r = e(t.target).hasClass("active-result") ? e(t.target) : e(t.target).parents(".active-result").first())
                return this.result_do_highlight(r)
        }
        ,
        r.prototype.search_results_mouseout = function(t) {
            if (e(t.target).hasClass("active-result"))
                return this.result_clear_highlight()
        }
        ,
        r.prototype.choice_build = function(t) {
            var r, i, n = this;
            return r = e("<li />", {
                class: "search-choice"
            }).html("<span>" + this.choice_label(t) + "</span>"),
            t.disabled ? r.addClass("search-choice-disabled") : (i = e("<a />", {
                class: "search-choice-close",
                "data-option-array-index": t.array_index
            }),
            i.bind("click.chosen", function(e) {
                return n.choice_destroy_link_click(e)
            }),
            r.append(i)),
            this.search_container.before(r)
        }
        ,
        r.prototype.choice_destroy_link_click = function(t) {
            if (t.preventDefault(),
            t.stopPropagation(),
            !this.is_disabled)
                return this.choice_destroy(e(t.target))
        }
        ,
        r.prototype.choice_destroy = function(e) {
            if (this.result_deselect(e[0].getAttribute("data-option-array-index")))
                return this.show_search_field_default(),
                this.is_multiple && this.choices_count() > 0 && this.search_field.val().length < 1 && this.results_hide(),
                e.parents("li").first().remove(),
                this.search_field_scale()
        }
        ,
        r.prototype.results_reset = function() {
            if (this.reset_single_select_options(),
            this.form_field.options[0].selected = !0,
            this.single_set_selected_text(),
            this.show_search_field_default(),
            this.results_reset_cleanup(),
            this.form_field_jq.trigger("change"),
            this.active_field)
                return this.results_hide()
        }
        ,
        r.prototype.results_reset_cleanup = function() {
            return this.current_selectedIndex = this.form_field.selectedIndex,
            this.selected_item.find("abbr").remove()
        }
        ,
        r.prototype.result_select = function(e) {
            var t, r;
            if (this.result_highlight)
                return t = this.result_highlight,
                this.result_clear_highlight(),
                this.is_multiple && this.max_selected_options <= this.choices_count() ? (this.form_field_jq.trigger("chosen:maxselected", {
                    chosen: this
                }),
                !1) : (this.is_multiple ? t.removeClass("active-result") : this.reset_single_select_options(),
                t.addClass("result-selected"),
                r = this.results_data[t[0].getAttribute("data-option-array-index")],
                r.selected = !0,
                this.form_field.options[r.options_index].selected = !0,
                this.selected_option_count = null,
                this.is_multiple ? this.choice_build(r) : this.single_set_selected_text(this.choice_label(r)),
                (e.metaKey || e.ctrlKey) && this.is_multiple || this.results_hide(),
                this.show_search_field_default(),
                (this.is_multiple || this.form_field.selectedIndex !== this.current_selectedIndex) && this.form_field_jq.trigger("change", {
                    selected: this.form_field.options[r.options_index].value
                }),
                this.current_selectedIndex = this.form_field.selectedIndex,
                e.preventDefault(),
                this.search_field_scale())
        }
        ,
        r.prototype.single_set_selected_text = function(e) {
            return null == e && (e = this.default_text),
            e === this.default_text ? this.selected_item.addClass("chosen-default") : (this.single_deselect_control_build(),
            this.selected_item.removeClass("chosen-default")),
            this.selected_item.find("span").html(e)
        }
        ,
        r.prototype.result_deselect = function(e) {
            var t;
            return t = this.results_data[e],
            !this.form_field.options[t.options_index].disabled && (t.selected = !1,
            this.form_field.options[t.options_index].selected = !1,
            this.selected_option_count = null,
            this.result_clear_highlight(),
            this.results_showing && this.winnow_results(),
            this.form_field_jq.trigger("change", {
                deselected: this.form_field.options[t.options_index].value
            }),
            this.search_field_scale(),
            !0)
        }
        ,
        r.prototype.single_deselect_control_build = function() {
            if (this.allow_single_deselect)
                return this.selected_item.find("abbr").length || this.selected_item.find("span").first().after('<abbr class="search-choice-close"></abbr>'),
                this.selected_item.addClass("chosen-single-with-deselect")
        }
        ,
        r.prototype.get_search_text = function() {
            return e("<div/>").text(e.trim(this.search_field.val())).html()
        }
        ,
        r.prototype.winnow_results_set_highlight = function() {
            var e, t;
            if (t = this.is_multiple ? [] : this.search_results.find(".result-selected.active-result"),
            null != (e = t.length ? t.first() : this.search_results.find(".active-result").first()))
                return this.result_do_highlight(e)
        }
        ,
        r.prototype.no_results = function(t) {
            var r;
            return r = e('<li class="no-results">' + this.results_none_found + ' "<span></span>"</li>'),
            r.find("span").first().html(t),
            this.search_results.append(r),
            this.form_field_jq.trigger("chosen:no_results", {
                chosen: this
            })
        }
        ,
        r.prototype.no_results_clear = function() {
            return this.search_results.find(".no-results").remove()
        }
        ,
        r.prototype.keydown_arrow = function() {
            var e;
            return this.results_showing && this.result_highlight ? (e = this.result_highlight.nextAll("li.active-result").first()) ? this.result_do_highlight(e) : void 0 : this.results_show()
        }
        ,
        r.prototype.keyup_arrow = function() {
            var e;
            return this.results_showing || this.is_multiple ? this.result_highlight ? (e = this.result_highlight.prevAll("li.active-result"),
            e.length ? this.result_do_highlight(e.first()) : (this.choices_count() > 0 && this.results_hide(),
            this.result_clear_highlight())) : void 0 : this.results_show()
        }
        ,
        r.prototype.keydown_backstroke = function() {
            var e;
            return this.pending_backstroke ? (this.choice_destroy(this.pending_backstroke.find("a").first()),
            this.clear_backstroke()) : (e = this.search_container.siblings("li.search-choice").last(),
            e.length && !e.hasClass("search-choice-disabled") ? (this.pending_backstroke = e,
            this.single_backstroke_delete ? this.keydown_backstroke() : this.pending_backstroke.addClass("search-choice-focus")) : void 0)
        }
        ,
        r.prototype.clear_backstroke = function() {
            return this.pending_backstroke && this.pending_backstroke.removeClass("search-choice-focus"),
            this.pending_backstroke = null
        }
        ,
        r.prototype.keydown_checker = function(e) {
            var t, r;
            switch (t = null != (r = e.which) ? r : e.keyCode,
            this.search_field_scale(),
            8 !== t && this.pending_backstroke && this.clear_backstroke(),
            t) {
            case 8:
                this.backstroke_length = this.search_field.val().length;
                break;
            case 9:
                this.results_showing && !this.is_multiple && this.result_select(e),
                this.mouse_on_container = !1;
                break;
            case 13:
                this.results_showing && e.preventDefault();
                break;
            case 32:
                this.disable_search && e.preventDefault();
                break;
            case 38:
                e.preventDefault(),
                this.keyup_arrow();
                break;
            case 40:
                e.preventDefault(),
                this.keydown_arrow()
            }
        }
        ,
        r.prototype.search_field_scale = function() {
            var t, r, i, n, a, o, s, l;
            if (this.is_multiple) {
                for (0,
                o = 0,
                n = "position:absolute; left: -1000px; top: -1000px; display:none;",
                a = ["font-size", "font-style", "font-weight", "font-family", "line-height", "text-transform", "letter-spacing"],
                s = 0,
                l = a.length; s < l; s++)
                    i = a[s],
                    n += i + ":" + this.search_field.css(i) + ";";
                return t = e("<div />", {
                    style: n
                }),
                t.text(this.search_field.val()),
                e("body").append(t),
                o = t.width() + 25,
                t.remove(),
                r = this.container.outerWidth(),
                o > r - 10 && (o = r - 10),
                this.search_field.css({
                    width: o + "px"
                })
            }
        }
        ,
        r
    }(t)
}
.call(this),
function(e) {
    "undefined" != typeof module && "object" == typeof exports ? "undefined" != typeof window ? module.exports = e() : module.exports = e : window.Dropdown = e()
}(function(e) {
    var t = function(e) {
        this.menu = "object" == typeof e ? e : document.querySelector(e),
        this.init()
    };
    t.prototype = {
        init: function() {
            this.actions(),
            this.menu.setAttribute("tabindex", "0"),
            document.addEventListener("click", this.handle, !1)
        },
        actions: function() {
            var e = this;
            this.handle = function(t) {
                var r = t.target || t.currentTarget
                  , i = []
                  , n = e.menu.parentNode.getElementsByTagName("*");
                /\#$/g.test(r.href) && t.preventDefault();
                for (var a = 0, o = n.length || 0; a < o; a++)
                    o && i.push(n[a]);
                if (r === e.menu || r.parentNode === e.menu || r.parentNode.parentNode === e.menu)
                    e.toggle(t);
                else {
                    if (i && i.indexOf(r) > -1)
                        return;
                    e.close()
                }
            }
            ,
            this.toggle = function(e) {
                /\bdropdown_active/.test(this.menu.parentNode.className) ? (this.close(),
                document.removeEventListener("keydown", this.key, !1)) : (this.menu.parentNode.classList.add("dropdown_active"),
                this.menu.classList.add("btn_active"),
                this.menu.setAttribute("aria-expanded", !0),
                document.addEventListener("keydown", this.key, !1))
            }
            ,
            this.key = function(t) {
                27 == t.which && e.close()
            }
            ,
            this.close = function() {
                e.menu.parentNode.classList.remove("dropdown_active"),
                e.menu.classList.remove("btn_active"),
                e.menu.setAttribute("aria-expanded", !1)
            }
        }
    };
    var r = document.querySelectorAll("[data-toggle=dropdown]")
      , i = 0
      , n = r.length;
    for (i; i < n; i++)
        new t(r[i]);
    return t
}),
"document"in self && ("classList"in document.createElement("_") && (!document.createElementNS || "classList"in document.createElementNS("http://www.w3.org/2000/svg", "g")) ? function() {
    "use strict";
    var e = document.createElement("_");
    if (e.classList.add("c1", "c2"),
    !e.classList.contains("c2")) {
        var t = function(e) {
            var t = DOMTokenList.prototype[e];
            DOMTokenList.prototype[e] = function(e) {
                var r, i = arguments.length;
                for (r = 0; r < i; r++)
                    e = arguments[r],
                    t.call(this, e)
            }
        };
        t("add"),
        t("remove")
    }
    if (e.classList.toggle("c3", !1),
    e.classList.contains("c3")) {
        var r = DOMTokenList.prototype.toggle;
        DOMTokenList.prototype.toggle = function(e, t) {
            return 1 in arguments && !this.contains(e) == !t ? t : r.call(this, e)
        }
    }
    e = null
}() : function(e) {
    "use strict";
    if ("Element"in e) {
        var t = e.Element.prototype
          , r = Object
          , i = String.prototype.trim || function() {
            return this.replace(/^\s+|\s+$/g, "")
        }
          , n = Array.prototype.indexOf || function(e) {
            for (var t = 0, r = this.length; t < r; t++)
                if (t in this && this[t] === e)
                    return t;
            return -1
        }
          , a = function(e, t) {
            this.name = e,
            this.code = DOMException[e],
            this.message = t
        }
          , o = function(e, t) {
            if ("" === t)
                throw new a("SYNTAX_ERR","An invalid or illegal string was specified");
            if (/\s/.test(t))
                throw new a("INVALID_CHARACTER_ERR","String contains an invalid character");
            return n.call(e, t)
        }
          , s = function(e) {
            for (var t = i.call(e.getAttribute("class") || ""), r = t ? t.split(/\s+/) : [], n = 0, a = r.length; n < a; n++)
                this.push(r[n]);
            this._updateClassName = function() {
                e.setAttribute("class", this.toString())
            }
        }
          , l = s.prototype = []
          , c = function() {
            return new s(this)
        };
        if (a.prototype = Error.prototype,
        l.item = function(e) {
            return this[e] || null
        }
        ,
        l.contains = function(e) {
            return e += "",
            -1 !== o(this, e)
        }
        ,
        l.add = function() {
            var e, t = arguments, r = 0, i = t.length, n = !1;
            do {
                e = t[r] + "",
                -1 === o(this, e) && (this.push(e),
                n = !0)
            } while (++r < i);n && this._updateClassName()
        }
        ,
        l.remove = function() {
            var e, t, r = arguments, i = 0, n = r.length, a = !1;
            do {
                for (e = r[i] + "",
                t = o(this, e); -1 !== t; )
                    this.splice(t, 1),
                    a = !0,
                    t = o(this, e)
            } while (++i < n);a && this._updateClassName()
        }
        ,
        l.toggle = function(e, t) {
            e += "";
            var r = this.contains(e)
              , i = r ? !0 !== t && "remove" : !1 !== t && "add";
            return i && this[i](e),
            !0 === t || !1 === t ? t : !r
        }
        ,
        l.toString = function() {
            return this.join(" ")
        }
        ,
        r.defineProperty) {
            var d = {
                get: c,
                enumerable: !0,
                configurable: !0
            };
            try {
                r.defineProperty(t, "classList", d)
            } catch (e) {
                -2146823252 === e.number && (d.enumerable = !1,
                r.defineProperty(t, "classList", d))
            }
        } else
            r.prototype.__defineGetter__ && t.__defineGetter__("classList", c)
    }
}(self)),
function(e) {
    e.fn.overflowing = function(t, r) {
        var i = this
          , n = []
          , a = !(!r || "function" != typeof r)
          , o = !1;
        if (this.options = t || window,
        this.each(function() {
            var t = e(this);
            elPosition = t.position(),
            elWidth = t.width(),
            elHeight = t.height();
            var s = t.parentsUntil(i.options)
              , l = e(i.options);
            s.push(l);
            for (var c = 0; c < s.length; c++) {
                var d = e(s[c]).position()
                  , u = (e(s[c]).width(),
                e(s[c]).height());
                (elPosition.top < 0 || elPosition.top > u + d.top || elPosition.top + elHeight > u + d.top) && (o = !0,
                e(s[c]).addClass("overflowed"),
                n.push(s[c]),
                a && r(s[c]))
            }
            t.parents(i.options).hasClass("overflowed") && t.addClass("overflowing")
        }),
        !a)
            return n.length > 1 ? n : o
    }
}(jQuery),
function(e) {
    "use strict";
    var t = function(e) {
        var t, i;
        return function() {
            t = !1
        }
        ,
        function() {
            var n = r(arguments);
            if (t)
                return void (i = n);
            t = !0;
            var a = this;
            n.unshift(function r() {
                if (i) {
                    var n = i;
                    i = void 0,
                    n.unshift(r),
                    e.apply(a, n)
                } else
                    t = !1
            }),
            e.apply(this, n)
        }
    }
      , r = function(e) {
        return Array.prototype.slice.call(e)
    }
      , i = function() {
        var t;
        return t = e("<div></div>").css(["color"]).color,
        void 0 !== t ? function(e, t) {
            return e.css(t)
        }
        : function(t, r) {
            var i;
            return i = {},
            e.each(r, function(e, r) {
                i[r] = t.css(r)
            }),
            i
        }
    }()
      , n = function(e) {
        return e
    }
      , a = function(e) {
        var t = {};
        return function(r, i) {
            t[r] ? i(t[r]) : e.call(this, r, function(e) {
                t[r] = (t[r] || []).concat(e),
                i.apply(null, arguments)
            })
        }
    }
      , o = function(e, t) {
        var r, i;
        if (e.indexOf)
            return -1 != e.indexOf(t);
        for (r = 0,
        i = e.length; r < i; r++)
            if (e[r] === t)
                return !0;
        return !1
    }
      , s = function() {
        function r(t, r) {
            var i;
            this.el = t.get(0),
            i = this.el === document.activeElement,
            this.$el = t,
            this.id = "textComplete" + s++,
            this.strategies = [],
            this.option = r,
            i ? (this.initialize(),
            this.$el.focus()) : this.$el.one("focus.textComplete", e.proxy(this.initialize, this))
        }
        var n, a, o, s;
        return n = {
            list: '<ul class="dropdown-menu"></ul>'
        },
        a = {
            list: {
                position: "absolute",
                left: 0,
                zIndex: "100",
                display: "none"
            }
        },
        o = e(n.list).css(a.list),
        s = 0,
        e.extend(r.prototype, {
            initialize: function() {
                var t, r, i;
                t = o.clone(),
                this.listView = new l(t,this),
                this.$el.on({
                    "keyup.textComplete": e.proxy(this.onKeyup, this),
                    "keydown.textComplete": e.proxy(this.listView.onKeydown, this.listView)
                }),
                i = this.option.appendTo,
                i ? t.appendTo(i instanceof e ? i : e(i)) : t.appendTo(e("body")),
                r = {},
                r["click." + this.id] = e.proxy(this.onClickDocument, this),
                r["keyup." + this.id] = e.proxy(this.onKeyupDocument, this),
                e(document).on(r)
            },
            register: function(e) {
                this.strategies = this.strategies.concat(e)
            },
            renderList: function(e) {
                this.clearAtNext && (this.listView.clear(),
                this.clearAtNext = !1),
                e.length && (this.listView.strategy = this.strategy,
                this.listView.shown || this.listView.setPosition(this.getCaretPosition()).clear().activate(),
                e = e.slice(0, this.strategy.maxCount),
                this.listView.render(e)),
                !this.listView.data.length && this.listView.shown && this.listView.deactivate()
            },
            searchCallbackFactory: function(e) {
                var t = this;
                return function(r, i) {
                    t.renderList(r),
                    i || (e(),
                    t.clearAtNext = !0)
                }
            },
            onKeyup: function(e) {
                var t, r;
                if (!this.skipSearch(e))
                    if (t = this.extractSearchQuery(this.getTextFromHeadToCaret()),
                    t.length) {
                        if (r = t[1],
                        this.term === r)
                            return;
                        this.term = r,
                        this.search(t)
                    } else
                        this.term = null,
                        this.listView.deactivate()
            },
            skipSearch: function(e) {
                switch (e.keyCode) {
                case 40:
                case 38:
                    return !0
                }
                if (e.ctrlKey)
                    switch (e.keyCode) {
                    case 78:
                    case 80:
                        return !0
                    }
            },
            onSelect: function(t) {
                var r, i, n, a, o, s;
                if (r = this.getTextFromHeadToCaret(),
                "true" == this.el.contentEditable) {
                    a = window.getSelection(),
                    o = a.getRangeAt(0),
                    s = o.cloneRange(),
                    s.selectNodeContents(o.startContainer);
                    i = s.toString().substring(o.startOffset)
                } else
                    i = this.el.value.substring(this.el.selectionEnd);
                if (n = this.strategy.replace(t),
                e.isArray(n) && (i = n[1] + i,
                n = n[0]),
                r = r.replace(this.strategy.match, n),
                "true" == this.el.contentEditable) {
                    o.selectNodeContents(o.startContainer),
                    o.deleteContents();
                    var l = document.createTextNode(r + i);
                    o.insertNode(l),
                    o.setStart(l, r.length),
                    o.collapse(!0),
                    a.removeAllRanges(),
                    a.addRange(o)
                } else
                    this.$el.val(r + i),
                    this.el.selectionStart = this.el.selectionEnd = r.length;
                this.$el.trigger("change").trigger("textComplete:select", t),
                this.el.focus()
            },
            onClickDocument: function(e) {
                e.originalEvent && !e.originalEvent.keepTextCompleteDropdown && this.listView.deactivate()
            },
            onKeyupDocument: function(e) {
                this.listView.shown && 27 === e.keyCode && (this.listView.deactivate(),
                this.$el.focus())
            },
            destroy: function() {
                this.$el.off(".textComplete"),
                e(document).off("." + this.id),
                this.listView && this.listView.destroy(),
                this.$el.data("textComplete", void 0),
                this.$el = null
            },
            getCaretPosition: function() {
                var e, t;
                return e = this.getCaretRelativePosition(),
                t = this.$el.offset(),
                e.top += t.top,
                e.left += t.left,
                e
            },
            getCaretRelativePosition: function() {
                var t, r, n, a, o, s, l, c, d, u;
                return "true" != this.el.contentEditable ? (t = ["border-width", "font-family", "font-size", "font-style", "font-variant", "font-weight", "height", "letter-spacing", "word-spacing", "line-height", "text-decoration", "text-align", "width", "padding-top", "padding-right", "padding-bottom", "padding-left", "margin-top", "margin-right", "margin-bottom", "margin-left", "border-style", "box-sizing"],
                l = this.$el[0].scrollHeight > this.$el[0].offsetHeight,
                r = e.extend({
                    position: "absolute",
                    overflow: l ? "scroll" : "auto",
                    "white-space": "pre-wrap",
                    top: 0,
                    left: -9999,
                    direction: s
                }, i(this.$el, t)),
                n = e("<div></div>").css(r).text(this.getTextFromHeadToCaret()),
                a = e("<span></span>").text(".").appendTo(n),
                this.$el.before(n),
                o = a.position(),
                o.top += a.height() - this.$el.scrollTop(),
                n.remove()) : (c = window.getSelection().getRangeAt(0).cloneRange(),
                d = document.createElement("span"),
                c.insertNode(d),
                c.selectNodeContents(d),
                c.deleteContents(),
                u = e(d),
                o = u.offset(),
                o.top += u.height() - this.$el.offset().top),
                s = this.$el.attr("dir") || this.$el.css("direction"),
                "rtl" === s && (o.left -= this.listView.$el.width()),
                o
            },
            getTextFromHeadToCaret: function() {
                var e, t, r;
                if ("true" == this.el.contentEditable) {
                    if (window.getSelection) {
                        var r = window.getSelection().getRangeAt(0)
                          , i = r.cloneRange();
                        i.selectNodeContents(r.startContainer),
                        e = i.toString().substring(0, r.startOffset)
                    }
                } else
                    t = this.el.selectionEnd,
                    "number" == typeof t ? e = this.el.value.substring(0, t) : document.selection && (r = this.el.createTextRange(),
                    r.moveStart("character", 0),
                    r.moveEnd("textedit"),
                    e = r.text);
                return e
            },
            extractSearchQuery: function(e) {
                var t, r, i, n;
                for (t = 0,
                r = this.strategies.length; t < r; t++)
                    if (i = this.strategies[t],
                    n = e.match(i.match))
                        return [i, n[i.index]];
                return []
            },
            search: t(function(e, t) {
                var r;
                this.strategy = t[0],
                r = t[1],
                this.strategy.search(r, this.searchCallbackFactory(e))
            })
        }),
        r
    }()
      , l = function() {
        function t(t, r) {
            this.data = [],
            this.$el = t,
            this.index = 0,
            this.completer = r,
            this.$el.on("mousedown.textComplete", "li.textcomplete-item", e.proxy(this.onClick, this))
        }
        return e.extend(t.prototype, {
            shown: !1,
            render: function(t) {
                var r, i, n, a, s, l;
                for (r = "",
                this.strategy.header && (l = e.isFunction(this.strategy.header) ? this.strategy.header(t) : this.strategy.header,
                r += '<li class="textcomplete-header">' + l + "</li>"),
                i = 0,
                n = t.length; i < n && (s = t[i],
                o(this.data, s) || (a = this.data.length,
                this.data.push(s),
                r += '<li class="textcomplete-item" data-index="' + a + '"><a>',
                r += this.strategy.template(s),
                r += "</a></li>",
                this.data.length !== this.strategy.maxCount)); i++)
                    ;
                this.strategy.footer && (l = e.isFunction(this.strategy.footer) ? this.strategy.footer(t) : this.strategy.footer,
                r += '<li class="textcomplete-footer">' + l + "</li>"),
                this.$el.append(r),
                this.data.length ? this.activateIndexedItem() : this.deactivate()
            },
            clear: function() {
                return this.data = [],
                this.$el.html(""),
                this.index = 0,
                this
            },
            activateIndexedItem: function() {
                this.$el.find(".active").removeClass("active"),
                this.getActiveItem().addClass("active")
            },
            getActiveItem: function() {
                return e(this.$el.children(".textcomplete-item").get(this.index))
            },
            activate: function() {
                return this.shown || (this.$el.show(),
                this.completer.$el.trigger("textComplete:show"),
                this.shown = !0),
                this
            },
            deactivate: function() {
                return this.shown && (this.$el.hide(),
                this.completer.$el.trigger("textComplete:hide"),
                this.shown = !1,
                this.data = [],
                this.index = null),
                this
            },
            setPosition: function(e) {
                var t;
                return "top" === this.strategy.placement ? (t = parseInt(this.$el.css("font-size")),
                e = {
                    top: "auto",
                    bottom: this.$el.parent().height() - e.top + t,
                    left: e.left
                }) : e.bottom = "auto",
                this.$el.css(e),
                this
            },
            select: function(e) {
                var t = this;
                this.completer.onSelect(this.data[e]),
                setTimeout(function() {
                    t.deactivate()
                }, 0)
            },
            onKeydown: function(e) {
                this.shown && (38 === e.keyCode || e.ctrlKey && 80 === e.keyCode ? (e.preventDefault(),
                0 === this.index ? this.index = this.data.length - 1 : this.index -= 1,
                this.activateIndexedItem()) : 40 === e.keyCode || e.ctrlKey && 78 === e.keyCode ? (e.preventDefault(),
                this.index === this.data.length - 1 ? this.index = 0 : this.index += 1,
                this.activateIndexedItem()) : 13 !== e.keyCode && 9 !== e.keyCode || (e.preventDefault(),
                this.select(parseInt(this.getActiveItem().data("index"), 10))))
            },
            onClick: function(t) {
                var r = e(t.target);
                t.preventDefault(),
                t.originalEvent.keepTextCompleteDropdown = !0,
                r.hasClass("textcomplete-item") || (r = r.parents("li.textcomplete-item")),
                this.select(parseInt(r.data("index"), 10))
            },
            destroy: function() {
                this.deactivate(),
                this.$el.off("click.textComplete").remove(),
                this.$el = null
            }
        }),
        t
    }();
    e.fn.textcomplete = function(t, r) {
        var i, o, l, c;
        if (c = "textComplete",
        r || (r = {}),
        "destroy" === t)
            return this.each(function() {
                var t = e(this).data(c);
                t && t.destroy()
            });
        for (i = 0,
        o = t.length; i < o; i++)
            l = t[i],
            l.template || (l.template = n),
            null == l.index && (l.index = 2),
            l.cache && (l.search = a(l.search)),
            l.maxCount || (l.maxCount = 10);
        return this.each(function() {
            var i, n;
            i = e(this),
            n = i.data(c),
            n || (n = new s(i,r),
            i.data(c, n)),
            n.register(t)
        })
    }
}(window.jQuery || window.Zepto),
function($) {
    function fnFormatResult(e, t, r) {
        var i = "(" + r.replace(reEscape, "\\$1") + ")";
        return e.toString().replace(new RegExp(i,"gi"), "<strong>$1</strong>")
    }
    function Autocomplete(e, t) {
        this.el = $(e),
        this.el.attr("autocomplete", "off"),
        this.suggestions = [],
        this.data = [],
        this.badQueries = [],
        this.selectedIndex = -1,
        this.currentValue = this.el.val(),
        this.intervalId = 0,
        this.cachedResponse = [],
        this.onChangeInterval = null,
        this.ignoreValueChange = !1,
        this.serviceUrl = t.serviceUrl,
        this.isLocal = !1,
        this.options = {
            autoSubmit: !1,
            minChars: 1,
            maxHeight: 300,
            deferRequestBy: 0,
            width: 0,
            highlight: !0,
            params: {},
            fnFormatResult: fnFormatResult,
            delimiter: null,
            zIndex: 9999
        },
        this.initialize(),
        this.setOptions(t)
    }
    var reEscape = new RegExp("(\\" + ["/", ".", "*", "+", "?", "|", "(", ")", "[", "]", "{", "}", "\\"].join("|\\") + ")","g");
    $.fn.autocomplete = function(e) {
        return new Autocomplete(this.get(0) || $("<input />"),e)
    }
    ,
    Autocomplete.prototype = {
        killerFn: null,
        initialize: function() {
            var e, t, r;
            e = this,
            t = Math.floor(1048576 * Math.random()).toString(16),
            r = "Autocomplete_" + t,
            this.killerFn = function(t) {
                0 === $(t.target).parents(".autocomplete").size() && (e.killSuggestions(),
                e.disableKillerFn())
            }
            ,
            this.options.width || (this.options.width = this.el.width()),
            this.mainContainerId = "AutocompleteContainter_" + t,
            $('<div id="' + this.mainContainerId + '" style="position:absolute;z-index:9999;"><div class="autocomplete-w1"><div class="autocomplete" id="' + r + '" style="display:none; width:300px;"></div></div></div>').appendTo("body"),
            this.container = $("#" + r),
            this.fixPosition(),
            window.opera ? this.el.keypress(function(t) {
                e.onKeyPress(t)
            }) : this.el.keydown(function(t) {
                e.onKeyPress(t)
            }),
            this.el.keyup(function(t) {
                e.onKeyUp(t)
            }),
            this.el.blur(function() {
                e.enableKillerFn()
            }),
            this.el.focus(function() {
                e.fixPosition()
            })
        },
        setOptions: function(e) {
            var t = this.options;
            $.extend(t, e),
            t.lookup && (this.isLocal = !0,
            $.isArray(t.lookup) && (t.lookup = {
                suggestions: t.lookup,
                data: []
            })),
            $("#" + this.mainContainerId).css({
                zIndex: t.zIndex
            }),
            this.container.css({
                maxHeight: t.maxHeight + "px",
                width: t.width
            })
        },
        clearCache: function() {
            this.cachedResponse = [],
            this.badQueries = []
        },
        disable: function() {
            this.disabled = !0
        },
        enable: function() {
            this.disabled = !1
        },
        fixPosition: function() {
            var e = this.el.offset();
            $("#" + this.mainContainerId).css({
                top: e.top + this.el.innerHeight() + "px",
                left: e.left + "px"
            })
        },
        enableKillerFn: function() {
            var e = this;
            $(document).bind("click", e.killerFn)
        },
        disableKillerFn: function() {
            var e = this;
            $(document).unbind("click", e.killerFn)
        },
        killSuggestions: function() {
            var e = this;
            this.stopKillSuggestions(),
            this.intervalId = window.setInterval(function() {
                e.hide(),
                e.stopKillSuggestions()
            }, 300)
        },
        stopKillSuggestions: function() {
            window.clearInterval(this.intervalId)
        },
        onKeyPress: function(e) {
            if (!this.disabled && this.enabled) {
                switch (e.keyCode) {
                case 27:
                    this.el.val(this.currentValue),
                    this.hide();
                    break;
                case 9:
                case 13:
                    if (-1 === this.selectedIndex)
                        return void this.hide();
                    if (this.select(this.selectedIndex),
                    9 === e.keyCode)
                        return;
                    break;
                case 38:
                    this.moveUp();
                    break;
                case 40:
                    this.moveDown();
                    break;
                default:
                    return
                }
                e.stopImmediatePropagation(),
                e.preventDefault()
            }
        },
        onKeyUp: function(e) {
            if (!this.disabled) {
                switch (e.keyCode) {
                case 38:
                case 40:
                    return
                }
                if (clearInterval(this.onChangeInterval),
                this.currentValue !== this.el.val())
                    if (this.options.deferRequestBy > 0) {
                        var t = this;
                        this.onChangeInterval = setInterval(function() {
                            t.onValueChange()
                        }, this.options.deferRequestBy)
                    } else
                        this.onValueChange()
            }
        },
        onValueChange: function() {
            clearInterval(this.onChangeInterval),
            this.currentValue = this.el.val();
            var e = this.getQuery(this.currentValue);
            if (this.selectedIndex = -1,
            this.ignoreValueChange)
                return void (this.ignoreValueChange = !1);
            "" === e || e.length < this.options.minChars ? this.hide() : this.getSuggestions(e)
        },
        getQuery: function(e) {
            var t, r;
            return (t = this.options.delimiter) ? (r = e.split(t),
            $.trim(r[r.length - 1])) : $.trim(e)
        },
        getSuggestionsLocal: function(e) {
            var t, r, i, n, a;
            for (r = this.options.lookup,
            i = r.suggestions.length,
            t = {
                suggestions: [],
                data: []
            },
            e = e.toLowerCase(),
            a = 0; a < i; a++)
                n = r.suggestions[a],
                0 === n.toLowerCase().indexOf(e) && (t.suggestions.push(n),
                t.data.push(r.data[a]));
            return t
        },
        getSuggestions: function(e) {
            var t, r;
            t = this.isLocal ? this.getSuggestionsLocal(e) : this.cachedResponse[e],
            t && $.isArray(t.suggestions) ? (this.suggestions = t.suggestions,
            this.data = t.data,
            this.suggest()) : this.isBadQuery(e) || (r = this,
            r.options.params.query = e,
            $.get(this.serviceUrl, r.options.params, function(e) {
                r.processResponse(e)
            }, "text"))
        },
        isBadQuery: function(e) {
            for (var t = this.badQueries.length; t--; )
                if (0 === e.indexOf(this.badQueries[t]))
                    return !0;
            return !1
        },
        hide: function() {
            this.enabled = !1,
            this.selectedIndex = -1,
            this.container.hide()
        },
        suggest: function() {
            if (0 === this.suggestions.length)
                return void this.hide();
            var e, t, r, i, n, a, o, s, l;
            for (e = this,
            t = this.suggestions.length,
            i = this.options.fnFormatResult,
            n = this.getQuery(this.currentValue),
            s = function(t) {
                return function() {
                    e.activate(t)
                }
            }
            ,
            l = function(t) {
                return function() {
                    e.select(t)
                }
            }
            ,
            this.container.hide().empty(),
            a = 0; a < t; a++)
                o = this.suggestions[a],
                r = $((e.selectedIndex === a ? '<div class="selected"' : "<div") + ' title="' + o + '">' + i(o, this.data[a], n) + "</div>"),
                r.mouseover(s(a)),
                r.click(l(a)),
                this.container.append(r);
            this.enabled = !0,
            this.container.show()
        },
        processResponse: function(text) {
            var response;
            try {
                response = eval("(" + text + ")")
            } catch (e) {
                return
            }
            $.isArray(response.data) || (response.data = []),
            this.options.noCache || (this.cachedResponse[response.query] = response,
            0 === response.suggestions.length && this.badQueries.push(response.query)),
            response.query === this.getQuery(this.currentValue) && (this.suggestions = response.suggestions,
            this.data = response.data,
            this.suggest())
        },
        activate: function(e) {
            var t, r;
            return t = this.container.children(),
            -1 !== this.selectedIndex && t.length > this.selectedIndex && $(t.get(this.selectedIndex)).removeClass(),
            this.selectedIndex = e,
            -1 !== this.selectedIndex && t.length > this.selectedIndex && (r = t.get(this.selectedIndex),
            $(r).addClass("selected")),
            r
        },
        deactivate: function(e, t) {
            e.className = "",
            this.selectedIndex === t && (this.selectedIndex = -1)
        },
        select: function(e) {
            var t, r;
            (t = this.suggestions[e]) && (this.el.val(t),
            this.options.autoSubmit && (r = this.el.parents("form"),
            r.length > 0 && r.get(0).submit()),
            this.ignoreValueChange = !0,
            this.hide(),
            this.onSelect(e))
        },
        moveUp: function() {
            if (-1 !== this.selectedIndex)
                return 0 === this.selectedIndex ? (this.container.children().get(0).className = "",
                this.selectedIndex = -1,
                void this.el.val(this.currentValue)) : void this.adjustScroll(this.selectedIndex - 1)
        },
        moveDown: function() {
            this.selectedIndex !== this.suggestions.length - 1 && this.adjustScroll(this.selectedIndex + 1)
        },
        adjustScroll: function(e) {
            var t, r, i, n;
            t = this.activate(e),
            r = t.offsetTop,
            i = this.container.scrollTop(),
            n = i + this.options.maxHeight - 25,
            r < i ? this.container.scrollTop(r) : r > n && this.container.scrollTop(r - this.options.maxHeight + 25),
            this.el.val(this.getValue(this.suggestions[e]))
        },
        onSelect: function(e) {
            var t, r, i, n;
            t = this,
            r = t.options.onSelect,
            i = t.suggestions[e],
            n = t.data[e],
            t.el.val(t.getValue(i)),
            $.isFunction(r) && r(i, n, t.el)
        },
        getValue: function(e) {
            var t, r, i, n;
            return n = this,
            (t = n.options.delimiter) ? (r = n.currentValue,
            i = r.split(t),
            1 === i.length ? e : r.substr(0, r.length - i[i.length - 1].length) + e) : e
        }
    }
}(jQuery),
function(e, t, r, i) {
    "use strict";
    function n(t, r) {
        this.$element = e(t),
        r && ("string" !== e.type(r.delay) && "number" !== e.type(r.delay) || (r.delay = {
            show: r.delay,
            hide: r.delay
        })),
        this.options = e.extend({}, l, r),
        this._defaults = l,
        this._name = a,
        this._targetclick = !1,
        this.init(),
        c.push(this.$element)
    }
    var a = "webuiPopover"
      , o = "webui-popover"
      , s = "webui.popover"
      , l = {
        placement: "auto",
        width: "auto",
        height: "auto",
        trigger: "click",
        style: "",
        delay: {
            show: null,
            hide: null
        },
        async: {
            method: "GET",
            data: null,
            before: null,
            success: null
        },
        cache: !0,
        multi: !1,
        arrow: !0,
        title: "",
        content: "",
        closeable: !1,
        padding: !0,
        url: "",
        type: "html",
        animation: null,
        template: '<div class="webui-popover"><div class="arrow"></div><div class="webui-popover-inner"><a href="#" class="close">&times;</a><h3 class="webui-popover-title"></h3><div class="webui-popover-content"><i class="icon-refresh"></i> <p>&nbsp;</p></div></div></div>',
        backdrop: !1,
        dismissible: !0,
        onShow: null,
        onHide: null,
        abortXHR: !0,
        autoHide: !1,
        offsetTop: 0,
        offsetLeft: 0,
        iframeOptions: {
            frameborder: "0",
            allowtransparency: "true",
            id: "",
            name: "",
            scrolling: "",
            onload: "",
            height: "",
            width: ""
        }
    }
      , c = []
      , d = e('<div class="webui-popover-backdrop"></div>')
      , u = 0
      , p = !1
      , m = e(r)
      , h = function(e, t) {
        return isNaN(e) ? t || 0 : Number(e)
    }
      , g = function(e) {
        return e.data("plugin_" + a)
    }
      , _ = function() {
        for (var e = 0; e < c.length; e++)
            c[e].webuiPopover("hide");
        m.trigger("hiddenAll." + s)
    }
      , f = function(e) {
        var t = {
            x: 0,
            y: 0
        };
        if ("touchstart" === e.type || "touchmove" === e.type || "touchend" === e.type || "touchcancel" === e.type) {
            var r = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
            t.x = r.pageX,
            t.y = r.pageY
        } else
            "mousedown" !== e.type && "mouseup" !== e.type && "click" !== e.type || (t.x = e.pageX,
            t.y = e.pageY);
        return t
    };
    n.prototype = {
        init: function() {
            "click" === this.getTrigger() ? this.$element.off("click touchend").on("click touchend", e.proxy(this.toggle, this)) : "hover" === this.getTrigger() && this.$element.off("mouseenter mouseleave click").on("mouseenter", e.proxy(this.mouseenterHandler, this)).on("mouseleave", e.proxy(this.mouseleaveHandler, this)),
            this._poped = !1,
            this._inited = !0,
            this._opened = !1,
            this._idSeed = u,
            this.options.backdrop && d.appendTo(r.body).hide(),
            u++,
            "sticky" === this.getTrigger() && this.show()
        },
        destroy: function() {
            for (var e = -1, t = 0; t < c.length; t++)
                if (c[t] === this.$element) {
                    e = t;
                    break
                }
            c.splice(e, 1),
            this.hide(),
            this.$element.data("plugin_" + a, null),
            "click" === this.getTrigger() ? this.$element.off("click") : "hover" === this.getTrigger() && this.$element.off("mouseenter mouseleave"),
            this.$target && this.$target.remove()
        },
        hide: function(t, r) {
            if ((t || "sticky" !== this.getTrigger()) && this._opened) {
                r && (r.preventDefault(),
                r.stopPropagation()),
                this.xhr && !0 === this.options.abortXHR && (this.xhr.abort(),
                this.xhr = null);
                var i = e.Event("hide." + s);
                if (this.$element.trigger(i, [this.$target]),
                this.$target) {
                    this.$target.removeClass("in").addClass(this.getHideAnimation());
                    var n = this;
                    setTimeout(function() {
                        n.$target.hide()
                    }, 300)
                }
                this.options.backdrop && d.hide(),
                this._opened = !1,
                this.$element.trigger("hidden." + s, [this.$target]),
                this.options.onHide && this.options.onHide(this.$target)
            }
        },
        resetAutoHide: function() {
            var e = this
              , t = e.getAutoHide();
            t && (e.autoHideHandler && clearTimeout(e.autoHideHandler),
            e.autoHideHandler = setTimeout(function() {
                e.hide()
            }, t))
        },
        toggle: function(e) {
            e && (e.preventDefault(),
            e.stopPropagation()),
            this[this.getTarget().hasClass("in") ? "hide" : "show"]()
        },
        hideAll: function() {
            _()
        },
        show: function() {
            var e = this.getTarget().removeClass().addClass(o).addClass(this._customTargetClass);
            this.options.multi || this.hideAll(),
            this._opened || (this.getCache() && this._poped && "" !== this.content || (this.content = "",
            this.setTitle(this.getTitle()),
            this.options.closeable || e.find(".close").off("click").remove(),
            this.isAsync() ? this.setContentASync(this.options.content) : this.setContent(this.getContent()),
            e.show()),
            this.displayContent(),
            this.options.onShow && this.options.onShow(e),
            this.bindBodyEvents(),
            this.options.backdrop && d.show(),
            this._opened = !0,
            this.resetAutoHide())
        },
        displayContent: function() {
            var t = this.getElementPosition()
              , i = this.getTarget().removeClass().addClass(o).addClass(this._customTargetClass)
              , n = this.getContentElement()
              , a = i[0].offsetWidth
              , l = i[0].offsetHeight
              , c = "bottom"
              , d = e.Event("show." + s);
            this.$element.trigger(d, [i]);
            var u = this.$element.data("width") || this.options.width;
            "" === u && (u = this._defaults.width),
            "auto" !== u && i.width(u);
            var p = this.$element.data("height") || this.options.height;
            "" === p && (p = this._defaults.height),
            "auto" !== p && n.height(p),
            this.options.style && this.$target.addClass(o + "-" + this.options.style),
            this.options.arrow || i.find(".arrow").remove(),
            i.detach().css({
                top: -2e3,
                left: -2e3,
                display: "block"
            }),
            this.getAnimation() && i.addClass(this.getAnimation()),
            i.appendTo(r.body),
            c = this.getPlacement(t),
            this.$element.trigger("added." + s),
            this.initTargetEvents(),
            this.options.padding || ("auto" !== this.options.height && n.css("height", n.outerHeight()),
            this.$target.addClass("webui-no-padding")),
            a = i[0].offsetWidth,
            l = i[0].offsetHeight;
            var m = this.getTargetPositin(t, c, a, l);
            if (this.$target.css(m.position).addClass(c).addClass("in"),
            "iframe" === this.options.type) {
                var h = i.find("iframe")
                  , g = i.width()
                  , _ = h.parent().height();
                "" !== this.options.iframeOptions.width && "auto" !== this.options.iframeOptions.width && (g = this.options.iframeOptions.width),
                "" !== this.options.iframeOptions.height && "auto" !== this.options.iframeOptions.height && (_ = this.options.iframeOptions.height),
                h.width(g).height(_)
            }
            if (this.options.arrow || this.$target.css({
                margin: 0
            }),
            this.options.arrow) {
                var f = this.$target.find(".arrow");
                f.removeAttr("style"),
                "left" === c || "right" === c ? f.css({
                    top: this.$target.height() / 2
                }) : "top" !== c && "bottom" !== c || f.css({
                    left: this.$target.width() / 2
                }),
                m.arrowOffset && (-1 === m.arrowOffset.left || -1 === m.arrowOffset.top ? f.hide() : f.css(m.arrowOffset))
            }
            this._poped = !0,
            this.$element.trigger("shown." + s, [this.$target])
        },
        isTargetLoaded: function() {
            return 0 === this.getTarget().find("i.glyphicon-refresh").length
        },
        getTriggerElement: function() {
            return this.$element
        },
        getTarget: function() {
            if (!this.$target) {
                var t = a + this._idSeed;
                this.$target = e(this.options.template).attr("id", t).data("trigger-element", this.getTriggerElement()),
                this._customTargetClass = this.$target.attr("class") !== o ? this.$target.attr("class") : null,
                this.getTriggerElement().attr("data-target", t)
            }
            return this.$target
        },
        getTitleElement: function() {
            return this.getTarget().find(".webui-popover-title")
        },
        getContentElement: function() {
            return this.$contentElement || (this.$contentElement = this.getTarget().find(".webui-popover-content")),
            this.$contentElement
        },
        getTitle: function() {
            return this.$element.attr("data-title") || this.options.title || this.$element.attr("title")
        },
        getUrl: function() {
            return this.$element.attr("data-url") || this.options.url
        },
        getAutoHide: function() {
            return this.$element.attr("data-auto-hide") || this.options.autoHide
        },
        getOffsetTop: function() {
            return h(this.$element.attr("data-offset-top")) || this.options.offsetTop
        },
        getOffsetLeft: function() {
            return h(this.$element.attr("data-offset-left")) || this.options.offsetLeft
        },
        getAsyncMethod: function() {
            return this.$element.attr("data-async-method") || this.options.async.method
        },
        getAsyncData: function() {
            return this.options.async.data
        },
        getCache: function() {
            var e = this.$element.attr("data-cache");
            if (void 0 !== e)
                switch (e.toLowerCase()) {
                case "true":
                case "yes":
                case "1":
                    return !0;
                case "false":
                case "no":
                case "0":
                    return !1
                }
            return this.options.cache
        },
        getTrigger: function() {
            return this.$element.attr("data-trigger") || this.options.trigger
        },
        getDelayShow: function() {
            var e = this.$element.attr("data-delay-show");
            return void 0 !== e ? e : 0 === this.options.delay.show ? 0 : this.options.delay.show || 100
        },
        getHideDelay: function() {
            var e = this.$element.attr("data-delay-hide");
            return void 0 !== e ? e : 0 === this.options.delay.hide ? 0 : this.options.delay.hide || 100
        },
        getAnimation: function() {
            return this.$element.attr("data-animation") || this.options.animation
        },
        getHideAnimation: function() {
            var e = this.getAnimation();
            return e ? e + "-out" : "out"
        },
        setTitle: function(e) {
            var t = this.getTitleElement();
            e ? t.html(e) : t.remove()
        },
        hasContent: function() {
            return this.getContent()
        },
        getIframe: function() {
            var t = e("<iframe></iframe>").attr("src", this.getUrl())
              , r = this;
            return e.each(this._defaults.iframeOptions, function(e) {
                void 0 !== r.options.iframeOptions[e] && t.attr(e, r.options.iframeOptions[e])
            }),
            t
        },
        getContent: function() {
            if (this.getUrl())
                switch (this.options.type) {
                case "iframe":
                    this.content = this.getIframe();
                    break;
                case "html":
                    try {
                        this.content = e(this.getUrl()),
                        this.content.is(":visible") || this.content.show()
                    } catch (e) {
                        throw new Error("Unable to get popover content. Invalid selector specified.")
                    }
                }
            else if (!this.content) {
                var t = "";
                if (t = e.isFunction(this.options.content) ? this.options.content.apply(this.$element[0], [this]) : this.options.content,
                this.content = this.$element.attr("data-content") || t,
                !this.content) {
                    var r = this.$element.next();
                    r && r.hasClass(o + "-content") && (this.content = r)
                }
            }
            return this.content
        },
        setContent: function(e) {
            var t = this.getTarget()
              , r = this.getContentElement();
            "string" == typeof e ? r.html(e) : e instanceof jQuery && (e.removeClass(o + "-content"),
            r.html(""),
            e.appendTo(r)),
            this.$target = t
        },
        isAsync: function() {
            return "async" === this.options.type
        },
        setContentASync: function(t) {
            var r = this;
            this.xhr || (this.xhr = e.ajax({
                url: this.getUrl(),
                type: this.getAsyncMethod(),
                data: this.getAsyncData(),
                cache: this.getCache(),
                beforeSend: function(e) {
                    r.options.async.before && r.options.async.before(r, e)
                },
                success: function(i) {
                    r.bindBodyEvents(),
                    t && e.isFunction(t) ? r.content = t.apply(r.$element[0], [i]) : r.content = i,
                    r.setContent(r.content),
                    r.getContentElement().removeAttr("style"),
                    r.displayContent(),
                    r.options.async.success && r.options.async.success(r, i)
                },
                complete: function() {
                    r.xhr = null
                }
            }))
        },
        bindBodyEvents: function() {
            this.options.dismissible && "click" === this.getTrigger() && !p && (m.off("keyup.webui-popover").on("keyup.webui-popover", e.proxy(this.escapeHandler, this)),
            m.off("click.webui-popover touchend.webui-popover").on("click.webui-popover touchend.webui-popover", e.proxy(this.bodyClickHandler, this)))
        },
        mouseenterHandler: function() {
            var e = this;
            e._timeout && clearTimeout(e._timeout),
            e._enterTimeout = setTimeout(function() {
                e.getTarget().is(":visible") || e.show()
            }, this.getDelayShow())
        },
        mouseleaveHandler: function() {
            var e = this;
            clearTimeout(e._enterTimeout),
            e._timeout = setTimeout(function() {
                e.hide()
            }, this.getHideDelay())
        },
        escapeHandler: function(e) {
            27 === e.keyCode && this.hideAll()
        },
        bodyClickHandler: function(e) {
            p = !0;
            for (var t = !0, r = 0; r < c.length; r++) {
                var i = g(c[r]);
                if (i._opened) {
                    var n = i.getTarget().offset().left
                      , a = i.getTarget().offset().top
                      , o = i.getTarget().offset().left + i.getTarget().width()
                      , s = i.getTarget().offset().top + i.getTarget().height()
                      , l = f(e);
                    if (l.x >= n && l.x <= o && l.y >= a && l.y <= s) {
                        t = !1;
                        break
                    }
                }
            }
            t && _()
        },
        initTargetEvents: function() {
            "hover" === this.getTrigger() && this.$target.off("mouseenter mouseleave").on("mouseenter", e.proxy(this.mouseenterHandler, this)).on("mouseleave", e.proxy(this.mouseleaveHandler, this)),
            this.$target.find(".close").off("click").on("click", e.proxy(this.hide, this, !0))
        },
        getPlacement: function(e) {
            var t, i = r.documentElement, n = r.body, a = i.clientWidth, o = i.clientHeight, s = Math.max(n.scrollTop, i.scrollTop), l = Math.max(n.scrollLeft, i.scrollLeft), c = Math.max(0, e.left - l), d = Math.max(0, e.top - s);
            t = "function" == typeof this.options.placement ? this.options.placement.call(this, this.getTarget()[0], this.$element[0]) : this.$element.data("placement") || this.options.placement;
            var u = "horizontal" === t
              , p = "vertical" === t;
            return "auto" === t || u || p ? t = c < a / 3 ? d < o / 3 ? u ? "right-bottom" : "bottom-right" : d < 2 * o / 3 ? p ? d <= o / 2 ? "bottom-right" : "top-right" : "right" : u ? "right-top" : "top-right" : c < 2 * a / 3 ? d < o / 3 ? u ? c <= a / 2 ? "right-bottom" : "left-bottom" : "bottom" : d < 2 * o / 3 ? u ? c <= a / 2 ? "right" : "left" : d <= o / 2 ? "bottom" : "top" : u ? c <= a / 2 ? "right-top" : "left-top" : "top" : d < o / 3 ? u ? "left-bottom" : "bottom-left" : d < 2 * o / 3 ? p ? d <= o / 2 ? "bottom-left" : "top-left" : "left" : u ? "left-top" : "top-left" : "auto-top" === t ? t = c < a / 3 ? "top-right" : c < 2 * a / 3 ? "top" : "top-left" : "auto-bottom" === t ? t = c < a / 3 ? "bottom-right" : c < 2 * a / 3 ? "bottom" : "bottom-left" : "auto-left" === t ? t = d < o / 3 ? "left-top" : d < 2 * o / 3 ? "left" : "left-bottom" : "auto-right" === t && (t = d < o / 3 ? "right-top" : d < 2 * o / 3 ? "right" : "right-bottom"),
            t
        },
        getElementPosition: function() {
            return e.extend({}, this.$element.offset(), {
                width: this.$element[0].offsetWidth,
                height: this.$element[0].offsetHeight
            })
        },
        getTargetPositin: function(e, t, i, n) {
            var a = e
              , o = r.documentElement
              , s = r.body
              , l = o.clientWidth
              , c = o.clientHeight
              , d = this.$element.outerWidth()
              , u = this.$element.outerHeight()
              , p = Math.max(s.scrollTop, o.scrollTop)
              , m = Math.max(s.scrollLeft, o.scrollLeft)
              , h = {}
              , g = null
              , _ = this.options.arrow ? 20 : 0
              , f = d < _ + 10 ? _ : 0
              , b = u < _ + 10 ? _ : 0
              , C = 0
              , I = c + p
              , v = l + m
              , S = a.left + a.width / 2 - f > 0
              , y = a.left + a.width / 2 + f < v
              , x = a.top + a.height / 2 - b > 0
              , P = a.top + a.height / 2 + b < I;
            switch (t) {
            case "bottom":
                h = {
                    top: a.top + a.height,
                    left: a.left + a.width / 2 - i / 2
                };
                break;
            case "top":
                h = {
                    top: a.top - n,
                    left: a.left + a.width / 2 - i / 2
                };
                break;
            case "left":
                h = {
                    top: a.top + a.height / 2 - n / 2,
                    left: a.left - i
                };
                break;
            case "right":
                h = {
                    top: a.top + a.height / 2 - n / 2,
                    left: a.left + a.width
                };
                break;
            case "top-right":
                h = {
                    top: a.top - n,
                    left: S ? a.left - f : 10
                },
                g = {
                    left: S ? Math.min(d, i) / 2 + f : -2e3
                };
                break;
            case "top-left":
                C = y ? f : -10,
                h = {
                    top: a.top - n,
                    left: a.left - i + a.width + C
                },
                g = {
                    left: y ? i - Math.min(d, i) / 2 - f : -2e3
                };
                break;
            case "bottom-right":
                h = {
                    top: a.top + a.height,
                    left: S ? a.left - f : 10
                },
                g = {
                    left: S ? Math.min(d, i) / 2 + f : -2e3
                };
                break;
            case "bottom-left":
                C = y ? f : -10,
                h = {
                    top: a.top + a.height,
                    left: a.left - i + a.width + C
                },
                g = {
                    left: y ? i - Math.min(d, i) / 2 - f : -2e3
                };
                break;
            case "right-top":
                C = P ? b : -10,
                h = {
                    top: a.top - n + a.height + C,
                    left: a.left + a.width
                },
                g = {
                    top: P ? n - Math.min(u, n) / 2 - b : -2e3
                };
                break;
            case "right-bottom":
                h = {
                    top: x ? a.top - b : 10,
                    left: a.left + a.width
                },
                g = {
                    top: x ? Math.min(u, n) / 2 + b : -2e3
                };
                break;
            case "left-top":
                C = P ? b : -10,
                h = {
                    top: a.top - n + a.height + C,
                    left: a.left - i
                },
                g = {
                    top: P ? n - Math.min(u, n) / 2 - b : -2e3
                };
                break;
            case "left-bottom":
                h = {
                    top: x ? a.top - b : 10,
                    left: a.left - i
                },
                g = {
                    top: x ? Math.min(u, n) / 2 + b : -2e3
                }
            }
            return h.top += this.getOffsetTop(),
            h.left += this.getOffsetLeft(),
            {
                position: h,
                arrowOffset: g
            }
        }
    },
    e.fn[a] = function(t, r) {
        var i = []
          , o = this.each(function() {
            var o = e.data(this, "plugin_" + a);
            o ? "destroy" === t ? o.destroy() : "string" == typeof t && i.push(o[t]()) : (t ? "string" == typeof t ? "destroy" !== t && (r || (o = new n(this,null),
            i.push(o[t]()))) : "object" == typeof t && (o = new n(this,t)) : o = new n(this,null),
            e.data(this, "plugin_" + a, o))
        });
        return i.length ? i : o
    }
}(jQuery, window, document),
function() {
    "use strict";
    function e() {
        var e = "{}";
        if ("userDataBehavior" == S) {
            I.load("jStorage");
            try {
                e = I.getAttribute("jStorage")
            } catch (e) {}
            try {
                P = I.getAttribute("jStorage_update")
            } catch (e) {}
            C.jStorage = e
        }
        o(),
        c(),
        d()
    }
    function t() {
        "localStorage" == S || "globalStorage" == S ? "addEventListener"in window ? window.addEventListener("storage", r, !1) : document.attachEvent("onstorage", r) : "userDataBehavior" == S && setInterval(r, 1e3)
    }
    function r() {
        var e;
        clearTimeout(x),
        x = setTimeout(function() {
            if ("localStorage" == S || "globalStorage" == S)
                e = C.jStorage_update;
            else if ("userDataBehavior" == S) {
                I.load("jStorage");
                try {
                    e = I.getAttribute("jStorage_update")
                } catch (e) {}
            }
            e && e != P && (P = e,
            i())
        }, 25)
    }
    function i() {
        var t, r = _.parse(_.stringify(b.__jstorage_meta.CRC32));
        e(),
        t = _.parse(_.stringify(b.__jstorage_meta.CRC32));
        var i, a = [], o = [];
        for (i in r)
            if (r.hasOwnProperty(i)) {
                if (!t[i]) {
                    o.push(i);
                    continue
                }
                r[i] != t[i] && "2." == String(r[i]).substr(0, 2) && a.push(i)
            }
        for (i in t)
            t.hasOwnProperty(i) && (r[i] || a.push(i));
        n(a, "updated"),
        n(o, "deleted")
    }
    function n(e, t) {
        e = [].concat(e || []);
        var r, i, n, a;
        if ("flushed" == t) {
            e = [];
            for (var o in y)
                y.hasOwnProperty(o) && e.push(o);
            t = "deleted"
        }
        for (r = 0,
        n = e.length; r < n; r++) {
            if (y[e[r]])
                for (i = 0,
                a = y[e[r]].length; i < a; i++)
                    y[e[r]][i](e[r], t);
            if (y["*"])
                for (i = 0,
                a = y["*"].length; i < a; i++)
                    y["*"][i](e[r], t)
        }
    }
    function a() {
        var e = (+new Date).toString();
        if ("localStorage" == S || "globalStorage" == S)
            try {
                C.jStorage_update = e
            } catch (e) {
                S = !1
            }
        else
            "userDataBehavior" == S && (I.setAttribute("jStorage_update", e),
            I.save("jStorage"));
        r()
    }
    function o() {
        if (C.jStorage)
            try {
                b = _.parse(String(C.jStorage))
            } catch (e) {
                C.jStorage = "{}"
            }
        else
            C.jStorage = "{}";
        v = C.jStorage ? String(C.jStorage).length : 0,
        b.__jstorage_meta || (b.__jstorage_meta = {}),
        b.__jstorage_meta.CRC32 || (b.__jstorage_meta.CRC32 = {})
    }
    function s() {
        p();
        try {
            C.jStorage = _.stringify(b),
            I && (I.setAttribute("jStorage", C.jStorage),
            I.save("jStorage")),
            v = C.jStorage ? String(C.jStorage).length : 0
        } catch (e) {}
    }
    function l(e) {
        if ("string" != typeof e && "number" != typeof e)
            throw new TypeError("Key name must be string or numeric");
        if ("__jstorage_meta" == e)
            throw new TypeError("Reserved key name");
        return !0
    }
    function c() {
        var e, t, r, i, o = 1 / 0, l = !1, d = [];
        if (clearTimeout(f),
        b.__jstorage_meta && "object" == typeof b.__jstorage_meta.TTL) {
            e = +new Date,
            r = b.__jstorage_meta.TTL,
            i = b.__jstorage_meta.CRC32;
            for (t in r)
                r.hasOwnProperty(t) && (r[t] <= e ? (delete r[t],
                delete i[t],
                delete b[t],
                l = !0,
                d.push(t)) : r[t] < o && (o = r[t]));
            o != 1 / 0 && (f = setTimeout(c, Math.min(o - e, 2147483647))),
            l && (s(),
            a(),
            n(d, "deleted"))
        }
    }
    function d() {
        var e;
        if (b.__jstorage_meta.PubSub) {
            var t, r = G, i = [];
            for (e = b.__jstorage_meta.PubSub.length - 1; e >= 0; e--)
                t = b.__jstorage_meta.PubSub[e],
                t[0] > G && (r = t[0],
                i.unshift(t));
            for (e = i.length - 1; e >= 0; e--)
                u(i[e][1], i[e][2]);
            G = r
        }
    }
    function u(e, t) {
        if (w[e])
            for (var r = 0, i = w[e].length; r < i; r++)
                try {
                    w[e][r](e, _.parse(_.stringify(t)))
                } catch (e) {}
    }
    function p() {
        if (b.__jstorage_meta.PubSub) {
            for (var e = +new Date - 2e3, t = 0, r = b.__jstorage_meta.PubSub.length; t < r; t++)
                if (b.__jstorage_meta.PubSub[t][0] <= e) {
                    b.__jstorage_meta.PubSub.splice(t, b.__jstorage_meta.PubSub.length - t);
                    break
                }
            b.__jstorage_meta.PubSub.length || delete b.__jstorage_meta.PubSub
        }
    }
    function m(e, t) {
        b.__jstorage_meta || (b.__jstorage_meta = {}),
        b.__jstorage_meta.PubSub || (b.__jstorage_meta.PubSub = []),
        b.__jstorage_meta.PubSub.unshift([+new Date, e, t]),
        s(),
        a()
    }
    function h(e, t) {
        for (var r, i = e.length, n = t ^ i, a = 0; i >= 4; )
            r = 255 & e.charCodeAt(a) | (255 & e.charCodeAt(++a)) << 8 | (255 & e.charCodeAt(++a)) << 16 | (255 & e.charCodeAt(++a)) << 24,
            r = 1540483477 * (65535 & r) + ((1540483477 * (r >>> 16) & 65535) << 16),
            r ^= r >>> 24,
            r = 1540483477 * (65535 & r) + ((1540483477 * (r >>> 16) & 65535) << 16),
            n = 1540483477 * (65535 & n) + ((1540483477 * (n >>> 16) & 65535) << 16) ^ r,
            i -= 4,
            ++a;
        switch (i) {
        case 3:
            n ^= (255 & e.charCodeAt(a + 2)) << 16;
        case 2:
            n ^= (255 & e.charCodeAt(a + 1)) << 8;
        case 1:
            n ^= 255 & e.charCodeAt(a),
            n = 1540483477 * (65535 & n) + ((1540483477 * (n >>> 16) & 65535) << 16)
        }
        return n ^= n >>> 13,
        n = 1540483477 * (65535 & n) + ((1540483477 * (n >>> 16) & 65535) << 16),
        (n ^= n >>> 15) >>> 0
    }
    var g = window.jQuery || window.$ || (window.$ = {})
      , _ = {
        parse: window.JSON && (window.JSON.parse || window.JSON.decode) || String.prototype.evalJSON && function(e) {
            return String(e).evalJSON()
        }
        || g.parseJSON || g.evalJSON,
        stringify: Object.toJSON || window.JSON && (window.JSON.stringify || window.JSON.encode) || g.toJSON
    };
    if ("function" != typeof _.parse || "function" != typeof _.stringify)
        throw new Error("No JSON support found, include //cdnjs.cloudflare.com/ajax/libs/json2/20110223/json2.js to page");
    var f, b = {
        __jstorage_meta: {
            CRC32: {}
        }
    }, C = {
        jStorage: "{}"
    }, I = null, v = 0, S = !1, y = {}, x = !1, P = 0, w = {}, G = +new Date, A = {
        isXML: function(e) {
            var t = (e ? e.ownerDocument || e : 0).documentElement;
            return !!t && "HTML" !== t.nodeName
        },
        encode: function(e) {
            if (!this.isXML(e))
                return !1;
            try {
                return (new XMLSerializer).serializeToString(e)
            } catch (t) {
                try {
                    return e.xml
                } catch (e) {}
            }
            return !1
        },
        decode: function(e) {
            var t, r = "DOMParser"in window && (new DOMParser).parseFromString || window.ActiveXObject && function(e) {
                var t = new ActiveXObject("Microsoft.XMLDOM");
                return t.async = "false",
                t.loadXML(e),
                t
            }
            ;
            return !!r && (t = r.call("DOMParser"in window && new DOMParser || window, e, "text/xml"),
            !!this.isXML(t) && t)
        }
    };
    g.jStorage = {
        version: "0.4.12",
        set: function(e, t, r) {
            if (l(e),
            r = r || {},
            void 0 === t)
                return this.deleteKey(e),
                t;
            if (A.isXML(t))
                t = {
                    _is_xml: !0,
                    xml: A.encode(t)
                };
            else {
                if ("function" == typeof t)
                    return;
                t && "object" == typeof t && (t = _.parse(_.stringify(t)))
            }
            return b[e] = t,
            b.__jstorage_meta.CRC32[e] = "2." + h(_.stringify(t), 2538058380),
            this.setTTL(e, r.TTL || 0),
            n(e, "updated"),
            t
        },
        get: function(e, t) {
            return l(e),
            e in b ? b[e] && "object" == typeof b[e] && b[e]._is_xml ? A.decode(b[e].xml) : b[e] : void 0 === t ? null : t
        },
        deleteKey: function(e) {
            return l(e),
            e in b && (delete b[e],
            "object" == typeof b.__jstorage_meta.TTL && e in b.__jstorage_meta.TTL && delete b.__jstorage_meta.TTL[e],
            delete b.__jstorage_meta.CRC32[e],
            s(),
            a(),
            n(e, "deleted"),
            !0)
        },
        setTTL: function(e, t) {
            var r = +new Date;
            return l(e),
            t = Number(t) || 0,
            e in b && (b.__jstorage_meta.TTL || (b.__jstorage_meta.TTL = {}),
            t > 0 ? b.__jstorage_meta.TTL[e] = r + t : delete b.__jstorage_meta.TTL[e],
            s(),
            c(),
            a(),
            !0)
        },
        getTTL: function(e) {
            var t = +new Date;
            return l(e),
            e in b && b.__jstorage_meta.TTL && b.__jstorage_meta.TTL[e] ? b.__jstorage_meta.TTL[e] - t || 0 : 0
        },
        flush: function() {
            return b = {
                __jstorage_meta: {
                    CRC32: {}
                }
            },
            s(),
            a(),
            n(null, "flushed"),
            !0
        },
        storageObj: function() {
            function e() {}
            return e.prototype = b,
            new e
        },
        index: function() {
            var e, t = [];
            for (e in b)
                b.hasOwnProperty(e) && "__jstorage_meta" != e && t.push(e);
            return t
        },
        storageSize: function() {
            return v
        },
        currentBackend: function() {
            return S
        },
        storageAvailable: function() {
            return !!S
        },
        listenKeyChange: function(e, t) {
            l(e),
            y[e] || (y[e] = []),
            y[e].push(t)
        },
        stopListening: function(e, t) {
            if (l(e),
            y[e]) {
                if (!t)
                    return void delete y[e];
                for (var r = y[e].length - 1; r >= 0; r--)
                    y[e][r] == t && y[e].splice(r, 1)
            }
        },
        subscribe: function(e, t) {
            if (!(e = (e || "").toString()))
                throw new TypeError("Channel not defined");
            w[e] || (w[e] = []),
            w[e].push(t)
        },
        publish: function(e, t) {
            if (!(e = (e || "").toString()))
                throw new TypeError("Channel not defined");
            m(e, t)
        },
        reInit: function() {
            e()
        },
        noConflict: function(e) {
            return delete window.$.jStorage,
            e && (window.jStorage = this),
            this
        }
    },
    function() {
        var e = !1;
        if ("localStorage"in window)
            try {
                window.localStorage.setItem("_tmptest", "tmpval"),
                e = !0,
                window.localStorage.removeItem("_tmptest")
            } catch (e) {}
        if (e)
            try {
                window.localStorage && (C = window.localStorage,
                S = "localStorage",
                P = C.jStorage_update)
            } catch (e) {}
        else if ("globalStorage"in window)
            try {
                window.globalStorage && (C = "localhost" == window.location.hostname ? window.globalStorage["localhost.localdomain"] : window.globalStorage[window.location.hostname],
                S = "globalStorage",
                P = C.jStorage_update)
            } catch (e) {}
        else {
            if (I = document.createElement("link"),
            !I.addBehavior)
                return void (I = null);
            I.style.behavior = "url(#default#userData)",
            document.getElementsByTagName("head")[0].appendChild(I);
            try {
                I.load("jStorage")
            } catch (e) {
                I.setAttribute("jStorage", "{}"),
                I.save("jStorage"),
                I.load("jStorage")
            }
            var i = "{}";
            try {
                i = I.getAttribute("jStorage")
            } catch (e) {}
            try {
                P = I.getAttribute("jStorage_update")
            } catch (e) {}
            C.jStorage = i,
            S = "userDataBehavior"
        }
        o(),
        c(),
        t(),
        d(),
        "addEventListener"in window && window.addEventListener("pageshow", function(e) {
            e.persisted && r()
        }, !1)
    }()
}(),
function() {
    function e() {
        return $("#markdown, #comment_markdown").is(":checked")
    }
    habraWYG = {
        insertTagWithText: function(t, r) {
            if (e() && "b" === r)
                return habraWYG.insertTag(t, "**", "**");
            if (e() && "i" === r)
                return habraWYG.insertTag(t, "*", "*");
            if (e() && "s" === r)
                return habraWYG.insertTag(t, "~~", "~~");
            if (e() && "h2" === r)
                return habraWYG.insertTag(t, "## ", "");
            if (e() && "h3" === r)
                return habraWYG.insertTag(t, "### ", "");
            if (e() && "h4" === r)
                return habraWYG.insertTag(t, "#### ", "");
            if (e() && "blockquote" === r)
                return habraWYG.insertTag(t, "> ", "");
            var i = "<" + r + ">"
              , n = "</" + r + ">";
            return habraWYG.insertTag(t, i, n),
            !1
        },
        insertTagWithLatex: function(e, t) {
            var r = t
              , i = t;
            return habraWYG.insertTag(e, r, i),
            !1
        },
        insertImage: function(t) {
            var r = prompt("Введите src картинки", "http://");
            if (r) {
                if (e())
                    return habraWYG.insertTag(t, "![image", "](" + r + ")");
                habraWYG.insertTag(t, '<img src="' + r + '" alt="image"/>', "")
            }
            return !1
        },
        insertLink: function(t) {
            var r = prompt("Введите URL ссылки", "http://");
            if (r) {
                if (e())
                    return habraWYG.insertTag(t, "[", "](" + r + ")");
                habraWYG.insertTag(t, '<a href="' + r + '">', "</a>")
            }
            return !1
        },
        insertSpoiler: function(e) {
            return habraWYG.insertTag(e, '<spoiler title="Заголовок спойлера">\n', "\n</spoiler>"),
            !1
        },
        insertUser: function(e) {
            var t = prompt("Введите никнейм пользователя", "");
            return t && habraWYG.insertTag(e, "@" + t, ""),
            !1
        },
        insertHabracut: function(e) {
            return habraWYG.insertTag(e, "<cut />", ""),
            !1
        },
        insertTag: function(e, t, r, i) {
            var n = $(e).parents(".editor")
              , a = $("textarea", n).get(0);
            a.focus();
            var o = a.scrollTop
              , s = habraWYG.getCursor(a)
              , l = a.value.substring(0, s.start)
              , c = a.value.substring(s.start, s.end)
              , d = a.value.substring(s.end);
            if (i && (c = c.replace(/\r/g, ""),
            c = "" != c ? c : " ",
            c = c.replace(new RegExp(i.findStr,"gm"), i.repStr)),
            s.start == s.end)
                var u = s.start + t.length;
            else
                var u = String(l + t + c + r).length;
            return a.value = l + t + c + r + d,
            habraWYG.setCursor(a, u, u),
            o && (a.scrollTop = o),
            $("textarea", n).trigger("change"),
            !1
        },
        insertTagFromDropBox: function(e) {
            habraWYG.insertTagWithText(e, e.value),
            e.selectedIndex = 0
        },
        insertList: function(t) {
            var r = "<" + t.value + ">\n"
              , i = "\n</" + t.value + ">"
              , n = {
                findStr: "^(.+)",
                repStr: "\t<li>$1</li>"
            };
            e() && "ul" === t.value && (n = {
                findStr: "^(.+)",
                repStr: "- $1"
            },
            r = "",
            i = ""),
            e() && "ol" === t.value && (n = {
                findStr: "^(.+)",
                repStr: "1. $1"
            },
            r = "",
            i = ""),
            habraWYG.insertTag(t, r, i, n),
            t.selectedIndex = 0
        },
        insertSource: function(t) {
            if ("code" === t.value) {
                var r = "<code>\n"
                  , i = "\n</code>";
                e() ? habraWYG.insertTag(t, "`", "`") : habraWYG.insertTag(t, r, i),
                t.selectedIndex = 0
            } else {
                var r = '<source lang="' + t.value + '">\n'
                  , i = "\n</source>";
                e() ? habraWYG.insertTag(t, "```" + t.value + "\n", "\n```") : habraWYG.insertTag(t, r, i),
                t.selectedIndex = 0
            }
        },
        insertTab: function(e, t) {
            if (e || (e = window.event),
            e.keyCode)
                var r = e.keyCode;
            else if (e.which)
                var r = e.which;
            switch (e.type) {
            case "keydown":
                16 == r && (habraWYG.shift = !0);
                break;
            case "keyup":
                16 == r && (habraWYG.shift = !1)
            }
            t.focus();
            var i = habraWYG.getCursor(t);
            if (i.start == i.end)
                return !0;
            if (9 == r && !habraWYG.shift) {
                var n = {
                    findStr: "^(.+)",
                    repStr: "\t$1"
                };
                return habraWYG.insertTag(t, "", "", n),
                !1
            }
            if (9 == r && habraWYG.shift) {
                var n = {
                    findStr: "^\t(.+)",
                    repStr: "$1"
                };
                return habraWYG.insertTag(t, "", "", n),
                !1
            }
        },
        getCursor: function(e) {
            var t = {
                start: 0,
                end: 0
            };
            if (e.setSelectionRange)
                t.start = e.selectionStart,
                t.end = e.selectionEnd;
            else {
                if (!document.selection)
                    return !1;
                if (document.selection && document.selection.createRange) {
                    var r = document.selection.createRange()
                      , i = r.duplicate();
                    i.moveToElementText(e),
                    i.setEndPoint("EndToEnd", r),
                    t.start = i.text.length - r.text.length,
                    t.end = t.start + r.text.length
                }
            }
            return t
        },
        setCursor: function(e, t, r) {
            if (e.createTextRange) {
                var i = e.createTextRange();
                i.move("character", t),
                i.select()
            } else
                e.selectionStart && e.setSelectionRange(t, r)
        },
        insertLatex: function(e, t) {
            if ("" != e.value) {
                var r = endTag = t;
                habraWYG.insertTag(link, r + e.value, endTag)
            }
            return !1
        }
    }
}(),
function() {
    function e() {
        return !!$("#mdCheck").length && $("#mdCheck").is(":checked")
    }
    function t(e) {
        /\bhas-nested/.test(e.parentNode.className) && (e.classList.remove("btn_active"),
        e.setAttribute("aria-expanded", !1),
        e.parentNode.classList.remove("dropdown_active"))
    }
    habraWYG2 = {
        insertTagWithText: function(t, r) {
            if (e() && "b" === r)
                return habraWYG2.insertTag(t, "**", "**");
            if (e() && "i" === r)
                return habraWYG2.insertTag(t, "*", "*");
            if (e() && "s" === r)
                return habraWYG2.insertTag(t, "~~", "~~");
            if (e() && "h2" === r)
                return habraWYG2.insertTag(t, "## ", "");
            if (e() && "h3" === r)
                return habraWYG2.insertTag(t, "### ", "");
            if (e() && "h4" === r)
                return habraWYG2.insertTag(t, "#### ", "");
            if (e() && "blockquote" === r)
                return habraWYG2.insertTag(t, "> ", "");
            var i = "<" + r + ">"
              , n = "</" + r + ">";
            habraWYG2.insertTag(t, i, n)
        },
        insertTagWithLatex: function(e, t) {
            var r = t
              , i = t;
            habraWYG2.insertTag(e, r, i)
        },
        insertImage: function(t) {
            var r = prompt("Введите src картинки", "http://");
            if (r) {
                if (e())
                    return habraWYG2.insertTag(t, "![image", "](" + r + ")");
                habraWYG2.insertTag(t, '<img src="' + r + '" alt="image"/>', "")
            }
            return !1
        },
        insertLink: function(t) {
            var r = prompt("Введите URL ссылки", "http://");
            if (r) {
                if (e())
                    return habraWYG2.insertTag(t, "[", "](" + r + ")");
                habraWYG2.insertTag(t, '<a href="' + r + '">', "</a>")
            }
            return !1
        },
        insertSpoiler: function(e) {
            return habraWYG2.insertTag(e, '<spoiler title="Заголовок спойлера">\n', "\n</spoiler>"),
            !1
        },
        insertUser: function(e) {
            var t = prompt("Введите никнейм пользователя", "");
            return t && habraWYG2.insertTag(e, "@" + t, ""),
            !1
        },
        insertHabracut: function(e) {
            return habraWYG2.insertTag(e, "<cut />", ""),
            !1
        },
        insertTag: function(e, r, i, n) {
            var e = e || null;
            if (e) {
                t(e.parentNode.parentNode.parentNode.getElementsByTagName("button")[0])
            }
            var a = document.getElementById("text_textarea");
            a.focus();
            var o = a.scrollTop
              , s = habraWYG2.getCursor(a)
              , l = a.value.substring(0, s.start)
              , c = a.value.substring(s.start, s.end)
              , d = a.value.substring(s.end);
            if (n && (c = c.replace(/\r/g, ""),
            c = "" != c ? c : " ",
            c = c.replace(new RegExp(n.findStr,"gm"), n.repStr)),
            s.start == s.end)
                var u = s.start + r.length;
            else
                var u = String(l + r + c + i).length;
            return a.value = l + r + c + i + d,
            habraWYG2.setCursor(a, u, u),
            o && (a.scrollTop = o),
            !1
        },
        insertTagFromDropBox: function(e) {
            habraWYG2.insertTagWithText(e, e.value),
            e.selectedIndex = 0
        },
        insertList: function(t, r) {
            var i = "<" + r + ">\n"
              , n = "\n</" + r + ">"
              , a = {
                findStr: "^(.+)",
                repStr: "\t<li>$1</li>"
            };
            e() && "ul" === r && (a = {
                findStr: "^(.+)",
                repStr: "- $1"
            },
            i = "",
            n = ""),
            e() && "ol" === r && (a = {
                findStr: "^(.+)",
                repStr: "1. $1"
            },
            i = "",
            n = ""),
            habraWYG2.insertTag(t, i, n, a),
            t.selectedIndex = 0
        },
        insertSource: function(e) {
            function r(t) {
                document.getElementById("mdCheck").checked ? habraWYG2.insertTag(e, "```" + t + "\n", "\n```") : habraWYG2.insertTag(e, '<source lang="' + t + '">', "</source>")
            }
            var i = document.getElementById("list-languages")
              , n = document.createElement("ul");
            n.className = "list-languages";
            var a = document.createElement("li");
            a.className = "list-languages__item",
            a.appendChild(document.createTextNode("Code")),
            a.onclick = function(r) {
                r.preventDefault(),
                document.getElementById("mdCheck").checked ? habraWYG2.insertTag(e, "```", "```") : habraWYG2.insertTag(e, "<code>", "</code>"),
                t(e)
            }
            ,
            n.appendChild(a);
            var o = hljs.listLanguages();
            o.sort();
            for (var s = 0; s < o.length; s++) {
                var l = document.createElement("li");
                l.className = "list-languages__item",
                l.setAttribute("data-lang", o[s]),
                l.appendChild(document.createTextNode(o[s])),
                n.appendChild(l),
                l.onclick = function(i) {
                    i.preventDefault(),
                    r(i.target.getAttribute("data-lang")),
                    t(e)
                }
            }
            return i.appendChild(n),
            !1
        },
        insertTab: function(e, t) {
            if (e || (e = window.event),
            e.keyCode)
                var r = e.keyCode;
            else if (e.which)
                var r = e.which;
            switch (e.type) {
            case "keydown":
                16 == r && (habraWYG2.shift = !0);
                break;
            case "keyup":
                16 == r && (habraWYG2.shift = !1)
            }
            t.focus();
            var i = habraWYG2.getCursor(t);
            if (i.start == i.end)
                return !0;
            if (9 == r && !habraWYG2.shift) {
                var n = {
                    findStr: "^(.+)",
                    repStr: "\t$1"
                };
                return habraWYG2.insertTag(t, "", "", n),
                !1
            }
            if (9 == r && habraWYG2.shift) {
                var n = {
                    findStr: "^\t(.+)",
                    repStr: "$1"
                };
                return habraWYG2.insertTag(t, "", "", n),
                !1
            }
        },
        getCursor: function(e) {
            var t = {
                start: 0,
                end: 0
            };
            if (e.setSelectionRange)
                t.start = e.selectionStart,
                t.end = e.selectionEnd;
            else {
                if (!document.selection)
                    return !1;
                if (document.selection && document.selection.createRange) {
                    var r = document.selection.createRange()
                      , i = r.duplicate();
                    i.moveToElementText(e),
                    i.setEndPoint("EndToEnd", r),
                    t.start = i.text.length - r.text.length,
                    t.end = t.start + r.text.length
                }
            }
            return t
        },
        setCursor: function(e, t, r) {
            if (e.createTextRange) {
                var i = e.createTextRange();
                i.move("character", t),
                i.select()
            } else
                e.selectionStart && e.setSelectionRange(t, r)
        }
    }
}(),
function(e) {
    "undefined" != typeof exports ? e(exports) : (self.hljs = e({}),
    "function" == typeof define && define.amd && define("hljs", [], function() {
        return self.hljs
    }))
}(function(e) {
    function t(e) {
        return e.replace(/&/gm, "&amp;").replace(/</gm, "&lt;").replace(/>/gm, "&gt;")
    }
    function r(e) {
        return e.nodeName.toLowerCase()
    }
    function i(e, t) {
        var r = e && e.exec(t);
        return r && 0 == r.index
    }
    function n(e) {
        return /^(no-?highlight|plain|text)$/i.test(e)
    }
    function a(e) {
        var t, r, i, a = e.className + " ";
        if (a += e.parentNode ? e.parentNode.className : "",
        r = /\blang(?:uage)?-([\w-]+)\b/i.exec(a))
            return I(r[1]) ? r[1] : "no-highlight";
        for (a = a.split(/\s+/),
        t = 0,
        i = a.length; i > t; t++)
            if (I(a[t]) || n(a[t]))
                return a[t]
    }
    function o(e, t) {
        var r, i = {};
        for (r in e)
            i[r] = e[r];
        if (t)
            for (r in t)
                i[r] = t[r];
        return i
    }
    function s(e) {
        var t = [];
        return function e(i, n) {
            for (var a = i.firstChild; a; a = a.nextSibling)
                3 == a.nodeType ? n += a.nodeValue.length : 1 == a.nodeType && (t.push({
                    event: "start",
                    offset: n,
                    node: a
                }),
                n = e(a, n),
                r(a).match(/br|hr|img|input/) || t.push({
                    event: "stop",
                    offset: n,
                    node: a
                }));
            return n
        }(e, 0),
        t
    }
    function l(e, i, n) {
        function a() {
            return e.length && i.length ? e[0].offset != i[0].offset ? e[0].offset < i[0].offset ? e : i : "start" == i[0].event ? e : i : e.length ? e : i
        }
        function o(e) {
            function i(e) {
                return " " + e.nodeName + '="' + t(e.value) + '"'
            }
            d += "<" + r(e) + Array.prototype.map.call(e.attributes, i).join("") + ">"
        }
        function s(e) {
            d += "</" + r(e) + ">"
        }
        function l(e) {
            ("start" == e.event ? o : s)(e.node)
        }
        for (var c = 0, d = "", u = []; e.length || i.length; ) {
            var p = a();
            if (d += t(n.substr(c, p[0].offset - c)),
            c = p[0].offset,
            p == e) {
                u.reverse().forEach(s);
                do {
                    l(p.splice(0, 1)[0]),
                    p = a()
                } while (p == e && p.length && p[0].offset == c);u.reverse().forEach(o)
            } else
                "start" == p[0].event ? u.push(p[0].node) : u.pop(),
                l(p.splice(0, 1)[0])
        }
        return d + t(n.substr(c))
    }
    function c(e) {
        function t(e) {
            return e && e.source || e
        }
        function r(r, i) {
            return new RegExp(t(r),"m" + (e.cI ? "i" : "") + (i ? "g" : ""))
        }
        function i(n, a) {
            if (!n.compiled) {
                if (n.compiled = !0,
                n.k = n.k || n.bK,
                n.k) {
                    var s = {}
                      , l = function(t, r) {
                        e.cI && (r = r.toLowerCase()),
                        r.split(" ").forEach(function(e) {
                            var r = e.split("|");
                            s[r[0]] = [t, r[1] ? Number(r[1]) : 1]
                        })
                    };
                    "string" == typeof n.k ? l("keyword", n.k) : Object.keys(n.k).forEach(function(e) {
                        l(e, n.k[e])
                    }),
                    n.k = s
                }
                n.lR = r(n.l || /\b\w+\b/, !0),
                a && (n.bK && (n.b = "\\b(" + n.bK.split(" ").join("|") + ")\\b"),
                n.b || (n.b = /\B|\b/),
                n.bR = r(n.b),
                n.e || n.eW || (n.e = /\B|\b/),
                n.e && (n.eR = r(n.e)),
                n.tE = t(n.e) || "",
                n.eW && a.tE && (n.tE += (n.e ? "|" : "") + a.tE)),
                n.i && (n.iR = r(n.i)),
                void 0 === n.r && (n.r = 1),
                n.c || (n.c = []);
                var c = [];
                n.c.forEach(function(e) {
                    e.v ? e.v.forEach(function(t) {
                        c.push(o(e, t))
                    }) : c.push("self" == e ? n : e)
                }),
                n.c = c,
                n.c.forEach(function(e) {
                    i(e, n)
                }),
                n.starts && i(n.starts, a);
                var d = n.c.map(function(e) {
                    return e.bK ? "\\.?(" + e.b + ")\\.?" : e.b
                }).concat([n.tE, n.i]).map(t).filter(Boolean);
                n.t = d.length ? r(d.join("|"), !0) : {
                    exec: function() {
                        return null
                    }
                }
            }
        }
        i(e)
    }
    function d(e, r, n, a) {
        function o(e, t) {
            for (var r = 0; r < t.c.length; r++)
                if (i(t.c[r].bR, e))
                    return t.c[r]
        }
        function s(e, t) {
            if (i(e.eR, t)) {
                for (; e.endsParent && e.parent; )
                    e = e.parent;
                return e
            }
            return e.eW ? s(e.parent, t) : void 0
        }
        function l(e, t) {
            return !n && i(t.iR, e)
        }
        function p(e, t) {
            var r = C.cI ? t[0].toLowerCase() : t[0];
            return e.k.hasOwnProperty(r) && e.k[r]
        }
        function m(e, t, r, i) {
            var n = i ? "" : v.classPrefix
              , a = '<span class="' + n
              , o = r ? "" : "</span>";
            return (a += e + '">') + t + o
        }
        function h() {
            if (!x.k)
                return t(G);
            var e = ""
              , r = 0;
            x.lR.lastIndex = 0;
            for (var i = x.lR.exec(G); i; ) {
                e += t(G.substr(r, i.index - r));
                var n = p(x, i);
                n ? (A += n[1],
                e += m(n[0], t(i[0]))) : e += t(i[0]),
                r = x.lR.lastIndex,
                i = x.lR.exec(G)
            }
            return e + t(G.substr(r))
        }
        function g() {
            var e = "string" == typeof x.sL;
            if (e && !S[x.sL])
                return t(G);
            var r = e ? d(x.sL, G, !0, P[x.sL]) : u(G, x.sL.length ? x.sL : void 0);
            return x.r > 0 && (A += r.r),
            e && (P[x.sL] = r.top),
            m(r.language, r.value, !1, !0)
        }
        function _() {
            return void 0 !== x.sL ? g() : h()
        }
        function f(e, r) {
            var i = e.cN ? m(e.cN, "", !0) : "";
            e.rB ? (w += i,
            G = "") : e.eB ? (w += t(r) + i,
            G = "") : (w += i,
            G = r),
            x = Object.create(e, {
                parent: {
                    value: x
                }
            })
        }
        function b(e, r) {
            if (G += e,
            void 0 === r)
                return w += _(),
                0;
            var i = o(r, x);
            if (i)
                return w += _(),
                f(i, r),
                i.rB ? 0 : r.length;
            var n = s(x, r);
            if (n) {
                var a = x;
                a.rE || a.eE || (G += r),
                w += _();
                do {
                    x.cN && (w += "</span>"),
                    A += x.r,
                    x = x.parent
                } while (x != n.parent);return a.eE && (w += t(r)),
                G = "",
                n.starts && f(n.starts, ""),
                a.rE ? 0 : r.length
            }
            if (l(r, x))
                throw new Error('Illegal lexeme "' + r + '" for mode "' + (x.cN || "<unnamed>") + '"');
            return G += r,
            r.length || 1
        }
        var C = I(e);
        if (!C)
            throw new Error('Unknown language: "' + e + '"');
        c(C);
        var y, x = a || C, P = {}, w = "";
        for (y = x; y != C; y = y.parent)
            y.cN && (w = m(y.cN, "", !0) + w);
        var G = ""
          , A = 0;
        try {
            for (var T, D, E = 0; x.t.lastIndex = E,
            T = x.t.exec(r); )
                D = b(r.substr(E, T.index - E), T[0]),
                E = T.index + D;
            for (b(r.substr(E)),
            y = x; y.parent; y = y.parent)
                y.cN && (w += "</span>");
            return {
                r: A,
                value: w,
                language: e,
                top: x
            }
        } catch (e) {
            if (-1 != e.message.indexOf("Illegal"))
                return {
                    r: 0,
                    value: t(r)
                };
            throw e
        }
    }
    function u(e, r) {
        r = r || v.languages || Object.keys(S);
        var i = {
            r: 0,
            value: t(e)
        }
          , n = i;
        return r.forEach(function(t) {
            if (I(t)) {
                var r = d(t, e, !1);
                r.language = t,
                r.r > n.r && (n = r),
                r.r > i.r && (n = i,
                i = r)
            }
        }),
        n.language && (i.second_best = n),
        i
    }
    function p(e) {
        return v.tabReplace && (e = e.replace(/^((<[^>]+>|\t)+)/gm, function(e, t) {
            return t.replace(/\t/g, v.tabReplace)
        })),
        v.useBR && (e = e.replace(/\n/g, "<br>")),
        e
    }
    function m(e, t, r) {
        var i = t ? y[t] : r
          , n = [e.trim()];
        return e.match(/\bhljs\b/) || n.push("hljs"),
        -1 === e.indexOf(i) && n.push(i),
        n.join(" ").trim()
    }
    function h(e) {
        var t = a(e);
        if (!n(t)) {
            var r;
            v.useBR ? (r = document.createElementNS("http://www.w3.org/1999/xhtml", "div"),
            r.innerHTML = e.innerHTML.replace(/\n/g, "").replace(/<br[ \/]*>/g, "\n")) : r = e;
            var i = r.textContent
              , o = t ? d(t, i, !0) : u(i)
              , c = s(r);
            if (c.length) {
                var h = document.createElementNS("http://www.w3.org/1999/xhtml", "div");
                h.innerHTML = o.value,
                o.value = l(c, s(h), i)
            }
            o.value = p(o.value),
            e.innerHTML = o.value,
            e.className = m(e.className, t, o.language),
            e.result = {
                language: o.language,
                re: o.r
            },
            o.second_best && (e.second_best = {
                language: o.second_best.language,
                re: o.second_best.r
            })
        }
    }
    function g(e) {
        v = o(v, e)
    }
    function _() {
        if (!_.called) {
            _.called = !0;
            var e = document.querySelectorAll("pre code");
            Array.prototype.forEach.call(e, h)
        }
    }
    function f() {
        addEventListener("DOMContentLoaded", _, !1),
        addEventListener("load", _, !1)
    }
    function b(t, r) {
        var i = S[t] = r(e);
        i.aliases && i.aliases.forEach(function(e) {
            y[e] = t
        })
    }
    function C() {
        return Object.keys(S)
    }
    function I(e) {
        return e = (e || "").toLowerCase(),
        S[e] || S[y[e]]
    }
    var v = {
        classPrefix: "hljs-",
        tabReplace: null,
        useBR: !1,
        languages: void 0
    }
      , S = {}
      , y = {};
    return e.highlight = d,
    e.highlightAuto = u,
    e.fixMarkup = p,
    e.highlightBlock = h,
    e.configure = g,
    e.initHighlighting = _,
    e.initHighlightingOnLoad = f,
    e.registerLanguage = b,
    e.listLanguages = C,
    e.getLanguage = I,
    e.inherit = o,
    e.IR = "[a-zA-Z]\\w*",
    e.UIR = "[a-zA-Z_]\\w*",
    e.NR = "\\b\\d+(\\.\\d+)?",
    e.CNR = "(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)",
    e.BNR = "\\b(0b[01]+)",
    e.RSR = "!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",
    e.BE = {
        b: "\\\\[\\s\\S]",
        r: 0
    },
    e.ASM = {
        cN: "string",
        b: "'",
        e: "'",
        i: "\\n",
        c: [e.BE]
    },
    e.QSM = {
        cN: "string",
        b: '"',
        e: '"',
        i: "\\n",
        c: [e.BE]
    },
    e.PWM = {
        b: /\b(a|an|the|are|I|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|like)\b/
    },
    e.C = function(t, r, i) {
        var n = e.inherit({
            cN: "comment",
            b: t,
            e: r,
            c: []
        }, i || {});
        return n.c.push(e.PWM),
        n.c.push({
            cN: "doctag",
            b: "(?:TODO|FIXME|NOTE|BUG|XXX):",
            r: 0
        }),
        n
    }
    ,
    e.CLCM = e.C("//", "$"),
    e.CBCM = e.C("/\\*", "\\*/"),
    e.HCM = e.C("#", "$"),
    e.NM = {
        cN: "number",
        b: e.NR,
        r: 0
    },
    e.CNM = {
        cN: "number",
        b: e.CNR,
        r: 0
    },
    e.BNM = {
        cN: "number",
        b: e.BNR,
        r: 0
    },
    e.CSSNM = {
        cN: "number",
        b: e.NR + "(%|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc|px|deg|grad|rad|turn|s|ms|Hz|kHz|dpi|dpcm|dppx)?",
        r: 0
    },
    e.RM = {
        cN: "regexp",
        b: /\//,
        e: /\/[gimuy]*/,
        i: /\n/,
        c: [e.BE, {
            b: /\[/,
            e: /\]/,
            r: 0,
            c: [e.BE]
        }]
    },
    e.TM = {
        cN: "title",
        b: e.IR,
        r: 0
    },
    e.UTM = {
        cN: "title",
        b: e.UIR,
        r: 0
    },
    e
}),
hljs.registerLanguage("aspectj", function(e) {
    var t = "false synchronized int abstract float private char boolean static null if const for true while long throw strictfp finally protected import native final return void enum else extends implements break transient new catch instanceof byte super volatile case assert short package default double public try this switch continue throws privileged aspectOf adviceexecution proceed cflowbelow cflow initialization preinitialization staticinitialization withincode target within execution getWithinTypeName handler thisJoinPoint thisJoinPointStaticPart thisEnclosingJoinPointStaticPart declare parents warning error soft precedence thisAspectInstance"
      , r = "get set args call";
    return {
        k: t,
        i: /<\/|#/,
        c: [e.C("/\\*\\*", "\\*/", {
            r: 0,
            c: [{
                b: /\w+@/,
                r: 0
            }, {
                cN: "doctag",
                b: "@[A-Za-z]+"
            }]
        }), e.CLCM, e.CBCM, e.ASM, e.QSM, {
            cN: "class",
            bK: "aspect",
            e: /[{;=]/,
            eE: !0,
            i: /[:;"\[\]]/,
            c: [{
                bK: "extends implements pertypewithin perthis pertarget percflowbelow percflow issingleton"
            }, e.UTM, {
                b: /\([^\)]*/,
                e: /[)]+/,
                k: t + " " + r,
                eE: !1
            }]
        }, {
            cN: "class",
            bK: "class interface",
            e: /[{;=]/,
            eE: !0,
            r: 0,
            k: "class interface",
            i: /[:"\[\]]/,
            c: [{
                bK: "extends implements"
            }, e.UTM]
        }, {
            bK: "pointcut after before around throwing returning",
            e: /[)]/,
            eE: !1,
            i: /["\[\]]/,
            c: [{
                b: e.UIR + "\\s*\\(",
                rB: !0,
                c: [e.UTM]
            }]
        }, {
            b: /[:]/,
            rB: !0,
            e: /[{;]/,
            r: 0,
            eE: !1,
            k: t,
            i: /["\[\]]/,
            c: [{
                b: e.UIR + "\\s*\\(",
                k: t + " " + r
            }, e.QSM]
        }, {
            bK: "new throw",
            r: 0
        }, {
            cN: "function",
            b: /\w+ +\w+(\.)?\w+\s*\([^\)]*\)\s*((throws)[\w\s,]+)?[\{;]/,
            rB: !0,
            e: /[{;=]/,
            k: t,
            eE: !0,
            c: [{
                b: e.UIR + "\\s*\\(",
                rB: !0,
                r: 0,
                c: [e.UTM]
            }, {
                cN: "params",
                b: /\(/,
                e: /\)/,
                r: 0,
                k: t,
                c: [e.ASM, e.QSM, e.CNM, e.CBCM]
            }, e.CLCM, e.CBCM]
        }, e.CNM, {
            cN: "meta",
            b: "@[A-Za-z]+"
        }]
    }
}),
hljs.registerLanguage("swift", function(e) {
    var t = {
        keyword: "__COLUMN__ __FILE__ __FUNCTION__ __LINE__ as as! as? associativity break case catch class continue convenience default defer deinit didSet do dynamic dynamicType else enum extension fallthrough false final for func get guard if import in indirect infix init inout internal is lazy left let mutating nil none nonmutating operator optional override postfix precedence prefix private protocol Protocol public repeat required rethrows return right self Self set static struct subscript super switch throw throws true try try! try? Type typealias unowned var weak where while willSet",
        literal: "true false nil",
        built_in: "abs advance alignof alignofValue anyGenerator assert assertionFailure bridgeFromObjectiveC bridgeFromObjectiveCUnconditional bridgeToObjectiveC bridgeToObjectiveCUnconditional c contains count countElements countLeadingZeros debugPrint debugPrintln distance dropFirst dropLast dump encodeBitsAsWords enumerate equal fatalError filter find getBridgedObjectiveCType getVaList indices insertionSort isBridgedToObjectiveC isBridgedVerbatimToObjectiveC isUniquelyReferenced isUniquelyReferencedNonObjC join lazy lexicographicalCompare map max maxElement min minElement numericCast overlaps partition posix precondition preconditionFailure print println quickSort readLine reduce reflect reinterpretCast reverse roundUpToAlignment sizeof sizeofValue sort split startsWith stride strideof strideofValue swap toString transcode underestimateCount unsafeAddressOf unsafeBitCast unsafeDowncast unsafeUnwrap unsafeReflect withExtendedLifetime withObjectAtPlusZero withUnsafePointer withUnsafePointerToObject withUnsafeMutablePointer withUnsafeMutablePointers withUnsafePointer withUnsafePointers withVaList zip"
    }
      , r = {
        cN: "type",
        b: "\\b[A-Z][\\w']*",
        r: 0
    }
      , i = e.C("/\\*", "\\*/", {
        c: ["self"]
    })
      , n = {
        cN: "subst",
        b: /\\\(/,
        e: "\\)",
        k: t,
        c: []
    }
      , a = {
        cN: "number",
        b: "\\b([\\d_]+(\\.[\\deE_]+)?|0x[a-fA-F0-9_]+(\\.[a-fA-F0-9p_]+)?|0b[01_]+|0o[0-7_]+)\\b",
        r: 0
    }
      , o = e.inherit(e.QSM, {
        c: [n, e.BE]
    });
    return n.c = [a],
    {
        k: t,
        c: [o, e.CLCM, i, r, a, {
            cN: "function",
            bK: "func",
            e: "{",
            eE: !0,
            c: [e.inherit(e.TM, {
                b: /[A-Za-z$_][0-9A-Za-z$_]*/,
                i: /\(/
            }), {
                b: /</,
                e: />/,
                i: />/
            }, {
                cN: "params",
                b: /\(/,
                e: /\)/,
                endsParent: !0,
                k: t,
                c: ["self", a, o, e.CBCM, {
                    b: ":"
                }],
                i: /["']/
            }],
            i: /\[|%/
        }, {
            cN: "class",
            bK: "struct protocol class extension enum",
            k: t,
            e: "\\{",
            eE: !0,
            c: [e.inherit(e.TM, {
                b: /[A-Za-z$_][0-9A-Za-z$_]*/
            })]
        }, {
            cN: "meta",
            b: "(@warn_unused_result|@exported|@lazy|@noescape|@NSCopying|@NSManaged|@objc|@convention|@required|@noreturn|@IBAction|@IBDesignable|@IBInspectable|@IBOutlet|@infix|@prefix|@postfix|@autoclosure|@testable|@available|@nonobjc|@NSApplicationMain|@UIApplicationMain)"
        }, {
            bK: "import",
            e: /$/,
            c: [e.CLCM, i]
        }]
    }
}),
hljs.registerLanguage("basic", function(e) {
    return {
        cI: !0,
        i: "^.",
        l: "[a-zA-Z][a-zA-Z0-9_$%!#]*",
        k: {
            keyword: "ABS ASC AND ATN AUTO|0 BEEP BLOAD|10 BSAVE|10 CALL CALLS CDBL CHAIN CHDIR CHR$|10 CINT CIRCLE CLEAR CLOSE CLS COLOR COM COMMON CONT COS CSNG CSRLIN CVD CVI CVS DATA DATE$ DEFDBL DEFINT DEFSNG DEFSTR DEF|0 SEG USR DELETE DIM DRAW EDIT END ENVIRON ENVIRON$ EOF EQV ERASE ERDEV ERDEV$ ERL ERR ERROR EXP FIELD FILES FIX FOR|0 FRE GET GOSUB|10 GOTO HEX$ IF|0 THEN ELSE|0 INKEY$ INP INPUT INPUT# INPUT$ INSTR IMP INT IOCTL IOCTL$ KEY ON OFF LIST KILL LEFT$ LEN LET LINE LLIST LOAD LOC LOCATE LOF LOG LPRINT USING LSET MERGE MID$ MKDIR MKD$ MKI$ MKS$ MOD NAME NEW NEXT NOISE NOT OCT$ ON OR PEN PLAY STRIG OPEN OPTION BASE OUT PAINT PALETTE PCOPY PEEK PMAP POINT POKE POS PRINT PRINT] PSET PRESET PUT RANDOMIZE READ REM RENUM RESET|0 RESTORE RESUME RETURN|0 RIGHT$ RMDIR RND RSET RUN SAVE SCREEN SGN SHELL SIN SOUND SPACE$ SPC SQR STEP STICK STOP STR$ STRING$ SWAP SYSTEM TAB TAN TIME$ TIMER TROFF TRON TO USR VAL VARPTR VARPTR$ VIEW WAIT WHILE WEND WIDTH WINDOW WRITE XOR"
        },
        c: [e.QSM, e.C("REM", "$", {
            r: 10
        }), e.C("'", "$", {
            r: 0
        }), {
            cN: "symbol",
            b: "^[0-9]+ ",
            r: 10
        }, {
            cN: "number",
            b: "\\b([0-9]+[0-9edED.]*[#!]?)",
            r: 0
        }, {
            cN: "number",
            b: "(&[hH][0-9a-fA-F]{1,4})"
        }, {
            cN: "number",
            b: "(&[oO][0-7]{1,6})"
        }]
    }
}),
hljs.registerLanguage("scilab", function(e) {
    var t = [e.CNM, {
        cN: "string",
        b: "'|\"",
        e: "'|\"",
        c: [e.BE, {
            b: "''"
        }]
    }];
    return {
        aliases: ["sci"],
        l: /%?\w+/,
        k: {
            keyword: "abort break case clear catch continue do elseif else endfunction end for function global if pause return resume select try then while",
            literal: "%f %F %t %T %pi %eps %inf %nan %e %i %z %s",
            built_in: "abs and acos asin atan ceil cd chdir clearglobal cosh cos cumprod deff disp error exec execstr exists exp eye gettext floor fprintf fread fsolve imag isdef isempty isinfisnan isvector lasterror length load linspace list listfiles log10 log2 log max min msprintf mclose mopen ones or pathconvert poly printf prod pwd rand real round sinh sin size gsort sprintf sqrt strcat strcmps tring sum system tanh tan type typename warning zeros matrix"
        },
        i: '("|#|/\\*|\\s+/\\w+)',
        c: [{
            cN: "function",
            bK: "function",
            e: "$",
            c: [e.UTM, {
                cN: "params",
                b: "\\(",
                e: "\\)"
            }]
        }, {
            b: "[a-zA-Z_][a-zA-Z_0-9]*('+[\\.']*|[\\.']+)",
            e: "",
            r: 0
        }, {
            b: "\\[",
            e: "\\]'*[\\.']*",
            r: 0,
            c: t
        }, e.C("//", "$")].concat(t)
    }
}),
hljs.registerLanguage("cs", function(e) {
    var t = "abstract as base bool break byte case catch char checked const continue decimal dynamic default delegate do double else enum event explicit extern false finally fixed float for foreach goto if implicit in int interface internal is lock long null when object operator out override params private protected public readonly ref sbyte sealed short sizeof stackalloc static string struct switch this true try typeof uint ulong unchecked unsafe ushort using virtual volatile void while async protected public private internal ascending descending from get group into join let orderby partial select set value var where yield"
      , r = e.IR + "(<" + e.IR + ">)?";
    return {
        aliases: ["csharp"],
        k: t,
        i: /::/,
        c: [e.C("///", "$", {
            rB: !0,
            c: [{
                cN: "doctag",
                v: [{
                    b: "///",
                    r: 0
                }, {
                    b: "\x3c!--|--\x3e"
                }, {
                    b: "</?",
                    e: ">"
                }]
            }]
        }), e.CLCM, e.CBCM, {
            cN: "meta",
            b: "#",
            e: "$",
            k: {
                "meta-keyword": "if else elif endif define undef warning error line region endregion pragma checksum"
            }
        }, {
            cN: "string",
            b: '@"',
            e: '"',
            c: [{
                b: '""'
            }]
        }, e.ASM, e.QSM, e.CNM, {
            bK: "class interface",
            e: /[{;=]/,
            i: /[^\s:]/,
            c: [e.TM, e.CLCM, e.CBCM]
        }, {
            bK: "namespace",
            e: /[{;=]/,
            i: /[^\s:]/,
            c: [e.inherit(e.TM, {
                b: "[a-zA-Z](\\.?\\w)*"
            }), e.CLCM, e.CBCM]
        }, {
            bK: "new return throw await",
            r: 0
        }, {
            cN: "function",
            b: "(" + r + "\\s+)+" + e.IR + "\\s*\\(",
            rB: !0,
            e: /[{;=]/,
            eE: !0,
            k: t,
            c: [{
                b: e.IR + "\\s*\\(",
                rB: !0,
                c: [e.TM],
                r: 0
            }, {
                cN: "params",
                b: /\(/,
                e: /\)/,
                eB: !0,
                eE: !0,
                k: t,
                r: 0,
                c: [e.ASM, e.QSM, e.CNM, e.CBCM]
            }, e.CLCM, e.CBCM]
        }]
    }
}),
hljs.registerLanguage("inform7", function(e) {
    return {
        aliases: ["i7"],
        cI: !0,
        k: {
            keyword: "thing room person man woman animal container supporter backdrop door scenery open closed locked inside gender is are say understand kind of rule"
        },
        c: [{
            cN: "string",
            b: '"',
            e: '"',
            r: 0,
            c: [{
                cN: "subst",
                b: "\\[",
                e: "\\]"
            }]
        }, {
            cN: "section",
            b: /^(Volume|Book|Part|Chapter|Section|Table)\b/,
            e: "$"
        }, {
            b: /^(Check|Carry out|Report|Instead of|To|Rule|When|Before|After)\b/,
            e: ":",
            c: [{
                b: "\\(This",
                e: "\\)"
            }]
        }, {
            cN: "comment",
            b: "\\[",
            e: "\\]",
            c: ["self"]
        }]
    }
}),
hljs.registerLanguage("mathematica", function(e) {
    return {
        aliases: ["mma"],
        l: "(\\$|\\b)" + e.IR + "\\b",
        k: "AbelianGroup Abort AbortKernels AbortProtect Above Abs Absolute AbsoluteCorrelation AbsoluteCorrelationFunction AbsoluteCurrentValue AbsoluteDashing AbsoluteFileName AbsoluteOptions AbsolutePointSize AbsoluteThickness AbsoluteTime AbsoluteTiming AccountingForm Accumulate Accuracy AccuracyGoal ActionDelay ActionMenu ActionMenuBox ActionMenuBoxOptions Active ActiveItem ActiveStyle AcyclicGraphQ AddOnHelpPath AddTo AdjacencyGraph AdjacencyList AdjacencyMatrix AdjustmentBox AdjustmentBoxOptions AdjustTimeSeriesForecast AffineTransform After AiryAi AiryAiPrime AiryAiZero AiryBi AiryBiPrime AiryBiZero AlgebraicIntegerQ AlgebraicNumber AlgebraicNumberDenominator AlgebraicNumberNorm AlgebraicNumberPolynomial AlgebraicNumberTrace AlgebraicRules AlgebraicRulesData Algebraics AlgebraicUnitQ Alignment AlignmentMarker AlignmentPoint All AllowedDimensions AllowGroupClose AllowInlineCells AllowKernelInitialization AllowReverseGroupClose AllowScriptLevelChange AlphaChannel AlternatingGroup AlternativeHypothesis Alternatives AmbientLight Analytic AnchoredSearch And AndersonDarlingTest AngerJ AngleBracket AngularGauge Animate AnimationCycleOffset AnimationCycleRepetitions AnimationDirection AnimationDisplayTime AnimationRate AnimationRepetitions AnimationRunning Animator AnimatorBox AnimatorBoxOptions AnimatorElements Annotation Annuity AnnuityDue Antialiasing Antisymmetric Apart ApartSquareFree Appearance AppearanceElements AppellF1 Append AppendTo Apply ArcCos ArcCosh ArcCot ArcCoth ArcCsc ArcCsch ArcSec ArcSech ArcSin ArcSinDistribution ArcSinh ArcTan ArcTanh Arg ArgMax ArgMin ArgumentCountQ ARIMAProcess ArithmeticGeometricMean ARMAProcess ARProcess Array ArrayComponents ArrayDepth ArrayFlatten ArrayPad ArrayPlot ArrayQ ArrayReshape ArrayRules Arrays Arrow Arrow3DBox ArrowBox Arrowheads AspectRatio AspectRatioFixed Assert Assuming Assumptions AstronomicalData Asynchronous AsynchronousTaskObject AsynchronousTasks AtomQ Attributes AugmentedSymmetricPolynomial AutoAction AutoDelete AutoEvaluateEvents AutoGeneratedPackage AutoIndent AutoIndentSpacings AutoItalicWords AutoloadPath AutoMatch Automatic AutomaticImageSize AutoMultiplicationSymbol AutoNumberFormatting AutoOpenNotebooks AutoOpenPalettes AutorunSequencing AutoScaling AutoScroll AutoSpacing AutoStyleOptions AutoStyleWords Axes AxesEdge AxesLabel AxesOrigin AxesStyle Axis BabyMonsterGroupB Back Background BackgroundTasksSettings Backslash Backsubstitution Backward Band BandpassFilter BandstopFilter BarabasiAlbertGraphDistribution BarChart BarChart3D BarLegend BarlowProschanImportance BarnesG BarOrigin BarSpacing BartlettHannWindow BartlettWindow BaseForm Baseline BaselinePosition BaseStyle BatesDistribution BattleLemarieWavelet Because BeckmannDistribution Beep Before Begin BeginDialogPacket BeginFrontEndInteractionPacket BeginPackage BellB BellY Below BenfordDistribution BeniniDistribution BenktanderGibratDistribution BenktanderWeibullDistribution BernoulliB BernoulliDistribution BernoulliGraphDistribution BernoulliProcess BernsteinBasis BesselFilterModel BesselI BesselJ BesselJZero BesselK BesselY BesselYZero Beta BetaBinomialDistribution BetaDistribution BetaNegativeBinomialDistribution BetaPrimeDistribution BetaRegularized BetweennessCentrality BezierCurve BezierCurve3DBox BezierCurve3DBoxOptions BezierCurveBox BezierCurveBoxOptions BezierFunction BilateralFilter Binarize BinaryFormat BinaryImageQ BinaryRead BinaryReadList BinaryWrite BinCounts BinLists Binomial BinomialDistribution BinomialProcess BinormalDistribution BiorthogonalSplineWavelet BipartiteGraphQ BirnbaumImportance BirnbaumSaundersDistribution BitAnd BitClear BitGet BitLength BitNot BitOr BitSet BitShiftLeft BitShiftRight BitXor Black BlackmanHarrisWindow BlackmanNuttallWindow BlackmanWindow Blank BlankForm BlankNullSequence BlankSequence Blend Block BlockRandom BlomqvistBeta BlomqvistBetaTest Blue Blur BodePlot BohmanWindow Bold Bookmarks Boole BooleanConsecutiveFunction BooleanConvert BooleanCountingFunction BooleanFunction BooleanGraph BooleanMaxterms BooleanMinimize BooleanMinterms Booleans BooleanTable BooleanVariables BorderDimensions BorelTannerDistribution Bottom BottomHatTransform BoundaryStyle Bounds Box BoxBaselineShift BoxData BoxDimensions Boxed Boxes BoxForm BoxFormFormatTypes BoxFrame BoxID BoxMargins BoxMatrix BoxRatios BoxRotation BoxRotationPoint BoxStyle BoxWhiskerChart Bra BracketingBar BraKet BrayCurtisDistance BreadthFirstScan Break Brown BrownForsytheTest BrownianBridgeProcess BrowserCategory BSplineBasis BSplineCurve BSplineCurve3DBox BSplineCurveBox BSplineCurveBoxOptions BSplineFunction BSplineSurface BSplineSurface3DBox BubbleChart BubbleChart3D BubbleScale BubbleSizes BulletGauge BusinessDayQ ButterflyGraph ButterworthFilterModel Button ButtonBar ButtonBox ButtonBoxOptions ButtonCell ButtonContents ButtonData ButtonEvaluator ButtonExpandable ButtonFrame ButtonFunction ButtonMargins ButtonMinHeight ButtonNote ButtonNotebook ButtonSource ButtonStyle ButtonStyleMenuListing Byte ByteCount ByteOrdering C CachedValue CacheGraphics CalendarData CalendarType CallPacket CanberraDistance Cancel CancelButton CandlestickChart Cap CapForm CapitalDifferentialD CardinalBSplineBasis CarmichaelLambda Cases Cashflow Casoratian Catalan CatalanNumber Catch CauchyDistribution CauchyWindow CayleyGraph CDF CDFDeploy CDFInformation CDFWavelet Ceiling Cell CellAutoOverwrite CellBaseline CellBoundingBox CellBracketOptions CellChangeTimes CellContents CellContext CellDingbat CellDynamicExpression CellEditDuplicate CellElementsBoundingBox CellElementSpacings CellEpilog CellEvaluationDuplicate CellEvaluationFunction CellEventActions CellFrame CellFrameColor CellFrameLabelMargins CellFrameLabels CellFrameMargins CellGroup CellGroupData CellGrouping CellGroupingRules CellHorizontalScrolling CellID CellLabel CellLabelAutoDelete CellLabelMargins CellLabelPositioning CellMargins CellObject CellOpen CellPrint CellProlog Cells CellSize CellStyle CellTags CellularAutomaton CensoredDistribution Censoring Center CenterDot CentralMoment CentralMomentGeneratingFunction CForm ChampernowneNumber ChanVeseBinarize Character CharacterEncoding CharacterEncodingsPath CharacteristicFunction CharacteristicPolynomial CharacterRange Characters ChartBaseStyle ChartElementData ChartElementDataFunction ChartElementFunction ChartElements ChartLabels ChartLayout ChartLegends ChartStyle Chebyshev1FilterModel Chebyshev2FilterModel ChebyshevDistance ChebyshevT ChebyshevU Check CheckAbort CheckAll Checkbox CheckboxBar CheckboxBox CheckboxBoxOptions ChemicalData ChessboardDistance ChiDistribution ChineseRemainder ChiSquareDistribution ChoiceButtons ChoiceDialog CholeskyDecomposition Chop Circle CircleBox CircleDot CircleMinus CirclePlus CircleTimes CirculantGraph CityData Clear ClearAll ClearAttributes ClearSystemCache ClebschGordan ClickPane Clip ClipboardNotebook ClipFill ClippingStyle ClipPlanes ClipRange Clock ClockGauge ClockwiseContourIntegral Close Closed CloseKernels ClosenessCentrality Closing ClosingAutoSave ClosingEvent ClusteringComponents CMYKColor Coarse Coefficient CoefficientArrays CoefficientDomain CoefficientList CoefficientRules CoifletWavelet Collect Colon ColonForm ColorCombine ColorConvert ColorData ColorDataFunction ColorFunction ColorFunctionScaling Colorize ColorNegate ColorOutput ColorProfileData ColorQuantize ColorReplace ColorRules ColorSelectorSettings ColorSeparate ColorSetter ColorSetterBox ColorSetterBoxOptions ColorSlider ColorSpace Column ColumnAlignments ColumnBackgrounds ColumnForm ColumnLines ColumnsEqual ColumnSpacings ColumnWidths CommonDefaultFormatTypes Commonest CommonestFilter CommonUnits CommunityBoundaryStyle CommunityGraphPlot CommunityLabels CommunityRegionStyle CompatibleUnitQ CompilationOptions CompilationTarget Compile Compiled CompiledFunction Complement CompleteGraph CompleteGraphQ CompleteKaryTree CompletionsListPacket Complex Complexes ComplexExpand ComplexInfinity ComplexityFunction ComponentMeasurements ComponentwiseContextMenu Compose ComposeList ComposeSeries Composition CompoundExpression CompoundPoissonDistribution CompoundPoissonProcess CompoundRenewalProcess Compress CompressedData Condition ConditionalExpression Conditioned Cone ConeBox ConfidenceLevel ConfidenceRange ConfidenceTransform ConfigurationPath Congruent Conjugate ConjugateTranspose Conjunction Connect ConnectedComponents ConnectedGraphQ ConnesWindow ConoverTest ConsoleMessage ConsoleMessagePacket ConsolePrint Constant ConstantArray Constants ConstrainedMax ConstrainedMin ContentPadding ContentsBoundingBox ContentSelectable ContentSize Context ContextMenu Contexts ContextToFilename ContextToFileName Continuation Continue ContinuedFraction ContinuedFractionK ContinuousAction ContinuousMarkovProcess ContinuousTimeModelQ ContinuousWaveletData ContinuousWaveletTransform ContourDetect ContourGraphics ContourIntegral ContourLabels ContourLines ContourPlot ContourPlot3D Contours ContourShading ContourSmoothing ContourStyle ContraharmonicMean Control ControlActive ControlAlignment ControllabilityGramian ControllabilityMatrix ControllableDecomposition ControllableModelQ ControllerDuration ControllerInformation ControllerInformationData ControllerLinking ControllerManipulate ControllerMethod ControllerPath ControllerState ControlPlacement ControlsRendering ControlType Convergents ConversionOptions ConversionRules ConvertToBitmapPacket ConvertToPostScript ConvertToPostScriptPacket Convolve ConwayGroupCo1 ConwayGroupCo2 ConwayGroupCo3 CoordinateChartData CoordinatesToolOptions CoordinateTransform CoordinateTransformData CoprimeQ Coproduct CopulaDistribution Copyable CopyDirectory CopyFile CopyTag CopyToClipboard CornerFilter CornerNeighbors Correlation CorrelationDistance CorrelationFunction CorrelationTest Cos Cosh CoshIntegral CosineDistance CosineWindow CosIntegral Cot Coth Count CounterAssignments CounterBox CounterBoxOptions CounterClockwiseContourIntegral CounterEvaluator CounterFunction CounterIncrements CounterStyle CounterStyleMenuListing CountRoots CountryData Covariance CovarianceEstimatorFunction CovarianceFunction CoxianDistribution CoxIngersollRossProcess CoxModel CoxModelFit CramerVonMisesTest CreateArchive CreateDialog CreateDirectory CreateDocument CreateIntermediateDirectories CreatePalette CreatePalettePacket CreateScheduledTask CreateTemporary CreateWindow CriticalityFailureImportance CriticalitySuccessImportance CriticalSection Cross CrossingDetect CrossMatrix Csc Csch CubeRoot Cubics Cuboid CuboidBox Cumulant CumulantGeneratingFunction Cup CupCap Curl CurlyDoubleQuote CurlyQuote CurrentImage CurrentlySpeakingPacket CurrentValue CurvatureFlowFilter CurveClosed Cyan CycleGraph CycleIndexPolynomial Cycles CyclicGroup Cyclotomic Cylinder CylinderBox CylindricalDecomposition D DagumDistribution DamerauLevenshteinDistance DampingFactor Darker Dashed Dashing DataCompression DataDistribution DataRange DataReversed Date DateDelimiters DateDifference DateFunction DateList DateListLogPlot DateListPlot DatePattern DatePlus DateRange DateString DateTicksFormat DaubechiesWavelet DavisDistribution DawsonF DayCount DayCountConvention DayMatchQ DayName DayPlus DayRange DayRound DeBruijnGraph Debug DebugTag Decimal DeclareKnownSymbols DeclarePackage Decompose Decrement DedekindEta Default DefaultAxesStyle DefaultBaseStyle DefaultBoxStyle DefaultButton DefaultColor DefaultControlPlacement DefaultDuplicateCellStyle DefaultDuration DefaultElement DefaultFaceGridsStyle DefaultFieldHintStyle DefaultFont DefaultFontProperties DefaultFormatType DefaultFormatTypeForStyle DefaultFrameStyle DefaultFrameTicksStyle DefaultGridLinesStyle DefaultInlineFormatType DefaultInputFormatType DefaultLabelStyle DefaultMenuStyle DefaultNaturalLanguage DefaultNewCellStyle DefaultNewInlineCellStyle DefaultNotebook DefaultOptions DefaultOutputFormatType DefaultStyle DefaultStyleDefinitions DefaultTextFormatType DefaultTextInlineFormatType DefaultTicksStyle DefaultTooltipStyle DefaultValues Defer DefineExternal DefineInputStreamMethod DefineOutputStreamMethod Definition Degree DegreeCentrality DegreeGraphDistribution DegreeLexicographic DegreeReverseLexicographic Deinitialization Del Deletable Delete DeleteBorderComponents DeleteCases DeleteContents DeleteDirectory DeleteDuplicates DeleteFile DeleteSmallComponents DeleteWithContents DeletionWarning Delimiter DelimiterFlashTime DelimiterMatching Delimiters Denominator DensityGraphics DensityHistogram DensityPlot DependentVariables Deploy Deployed Depth DepthFirstScan Derivative DerivativeFilter DescriptorStateSpace DesignMatrix Det DGaussianWavelet DiacriticalPositioning Diagonal DiagonalMatrix Dialog DialogIndent DialogInput DialogLevel DialogNotebook DialogProlog DialogReturn DialogSymbols Diamond DiamondMatrix DiceDissimilarity DictionaryLookup DifferenceDelta DifferenceOrder DifferenceRoot DifferenceRootReduce Differences DifferentialD DifferentialRoot DifferentialRootReduce DifferentiatorFilter DigitBlock DigitBlockMinimum DigitCharacter DigitCount DigitQ DihedralGroup Dilation Dimensions DiracComb DiracDelta DirectedEdge DirectedEdges DirectedGraph DirectedGraphQ DirectedInfinity Direction Directive Directory DirectoryName DirectoryQ DirectoryStack DirichletCharacter DirichletConvolve DirichletDistribution DirichletL DirichletTransform DirichletWindow DisableConsolePrintPacket DiscreteChirpZTransform DiscreteConvolve DiscreteDelta DiscreteHadamardTransform DiscreteIndicator DiscreteLQEstimatorGains DiscreteLQRegulatorGains DiscreteLyapunovSolve DiscreteMarkovProcess DiscretePlot DiscretePlot3D DiscreteRatio DiscreteRiccatiSolve DiscreteShift DiscreteTimeModelQ DiscreteUniformDistribution DiscreteVariables DiscreteWaveletData DiscreteWaveletPacketTransform DiscreteWaveletTransform Discriminant Disjunction Disk DiskBox DiskMatrix Dispatch DispersionEstimatorFunction Display DisplayAllSteps DisplayEndPacket DisplayFlushImagePacket DisplayForm DisplayFunction DisplayPacket DisplayRules DisplaySetSizePacket DisplayString DisplayTemporary DisplayWith DisplayWithRef DisplayWithVariable DistanceFunction DistanceTransform Distribute Distributed DistributedContexts DistributeDefinitions DistributionChart DistributionDomain DistributionFitTest DistributionParameterAssumptions DistributionParameterQ Dithering Div Divergence Divide DivideBy Dividers Divisible Divisors DivisorSigma DivisorSum DMSList DMSString Do DockedCells DocumentNotebook DominantColors DOSTextFormat Dot DotDashed DotEqual Dotted DoubleBracketingBar DoubleContourIntegral DoubleDownArrow DoubleLeftArrow DoubleLeftRightArrow DoubleLeftTee DoubleLongLeftArrow DoubleLongLeftRightArrow DoubleLongRightArrow DoubleRightArrow DoubleRightTee DoubleUpArrow DoubleUpDownArrow DoubleVerticalBar DoublyInfinite Down DownArrow DownArrowBar DownArrowUpArrow DownLeftRightVector DownLeftTeeVector DownLeftVector DownLeftVectorBar DownRightTeeVector DownRightVector DownRightVectorBar Downsample DownTee DownTeeArrow DownValues DragAndDrop DrawEdges DrawFrontFaces DrawHighlighted Drop DSolve Dt DualLinearProgramming DualSystemsModel DumpGet DumpSave DuplicateFreeQ Dynamic DynamicBox DynamicBoxOptions DynamicEvaluationTimeout DynamicLocation DynamicModule DynamicModuleBox DynamicModuleBoxOptions DynamicModuleParent DynamicModuleValues DynamicName DynamicNamespace DynamicReference DynamicSetting DynamicUpdating DynamicWrapper DynamicWrapperBox DynamicWrapperBoxOptions E EccentricityCentrality EdgeAdd EdgeBetweennessCentrality EdgeCapacity EdgeCapForm EdgeColor EdgeConnectivity EdgeCost EdgeCount EdgeCoverQ EdgeDashing EdgeDelete EdgeDetect EdgeForm EdgeIndex EdgeJoinForm EdgeLabeling EdgeLabels EdgeLabelStyle EdgeList EdgeOpacity EdgeQ EdgeRenderingFunction EdgeRules EdgeShapeFunction EdgeStyle EdgeThickness EdgeWeight Editable EditButtonSettings EditCellTagsSettings EditDistance EffectiveInterest Eigensystem Eigenvalues EigenvectorCentrality Eigenvectors Element ElementData Eliminate EliminationOrder EllipticE EllipticExp EllipticExpPrime EllipticF EllipticFilterModel EllipticK EllipticLog EllipticNomeQ EllipticPi EllipticReducedHalfPeriods EllipticTheta EllipticThetaPrime EmitSound EmphasizeSyntaxErrors EmpiricalDistribution Empty EmptyGraphQ EnableConsolePrintPacket Enabled Encode End EndAdd EndDialogPacket EndFrontEndInteractionPacket EndOfFile EndOfLine EndOfString EndPackage EngineeringForm Enter EnterExpressionPacket EnterTextPacket Entropy EntropyFilter Environment Epilog Equal EqualColumns EqualRows EqualTilde EquatedTo Equilibrium EquirippleFilterKernel Equivalent Erf Erfc Erfi ErlangB ErlangC ErlangDistribution Erosion ErrorBox ErrorBoxOptions ErrorNorm ErrorPacket ErrorsDialogSettings EstimatedDistribution EstimatedProcess EstimatorGains EstimatorRegulator EuclideanDistance EulerE EulerGamma EulerianGraphQ EulerPhi Evaluatable Evaluate Evaluated EvaluatePacket EvaluationCell EvaluationCompletionAction EvaluationElements EvaluationMode EvaluationMonitor EvaluationNotebook EvaluationObject EvaluationOrder Evaluator EvaluatorNames EvenQ EventData EventEvaluator EventHandler EventHandlerTag EventLabels ExactBlackmanWindow ExactNumberQ ExactRootIsolation ExampleData Except ExcludedForms ExcludePods Exclusions ExclusionsStyle Exists Exit ExitDialog Exp Expand ExpandAll ExpandDenominator ExpandFileName ExpandNumerator Expectation ExpectationE ExpectedValue ExpGammaDistribution ExpIntegralE ExpIntegralEi Exponent ExponentFunction ExponentialDistribution ExponentialFamily ExponentialGeneratingFunction ExponentialMovingAverage ExponentialPowerDistribution ExponentPosition ExponentStep Export ExportAutoReplacements ExportPacket ExportString Expression ExpressionCell ExpressionPacket ExpToTrig ExtendedGCD Extension ExtentElementFunction ExtentMarkers ExtentSize ExternalCall ExternalDataCharacterEncoding Extract ExtractArchive ExtremeValueDistribution FaceForm FaceGrids FaceGridsStyle Factor FactorComplete Factorial Factorial2 FactorialMoment FactorialMomentGeneratingFunction FactorialPower FactorInteger FactorList FactorSquareFree FactorSquareFreeList FactorTerms FactorTermsList Fail FailureDistribution False FARIMAProcess FEDisableConsolePrintPacket FeedbackSector FeedbackSectorStyle FeedbackType FEEnableConsolePrintPacket Fibonacci FieldHint FieldHintStyle FieldMasked FieldSize File FileBaseName FileByteCount FileDate FileExistsQ FileExtension FileFormat FileHash FileInformation FileName FileNameDepth FileNameDialogSettings FileNameDrop FileNameJoin FileNames FileNameSetter FileNameSplit FileNameTake FilePrint FileType FilledCurve FilledCurveBox Filling FillingStyle FillingTransform FilterRules FinancialBond FinancialData FinancialDerivative FinancialIndicator Find FindArgMax FindArgMin FindClique FindClusters FindCurvePath FindDistributionParameters FindDivisions FindEdgeCover FindEdgeCut FindEulerianCycle FindFaces FindFile FindFit FindGeneratingFunction FindGeoLocation FindGeometricTransform FindGraphCommunities FindGraphIsomorphism FindGraphPartition FindHamiltonianCycle FindIndependentEdgeSet FindIndependentVertexSet FindInstance FindIntegerNullVector FindKClan FindKClique FindKClub FindKPlex FindLibrary FindLinearRecurrence FindList FindMaximum FindMaximumFlow FindMaxValue FindMinimum FindMinimumCostFlow FindMinimumCut FindMinValue FindPermutation FindPostmanTour FindProcessParameters FindRoot FindSequenceFunction FindSettings FindShortestPath FindShortestTour FindThreshold FindVertexCover FindVertexCut Fine FinishDynamic FiniteAbelianGroupCount FiniteGroupCount FiniteGroupData First FirstPassageTimeDistribution FischerGroupFi22 FischerGroupFi23 FischerGroupFi24Prime FisherHypergeometricDistribution FisherRatioTest FisherZDistribution Fit FitAll FittedModel FixedPoint FixedPointList FlashSelection Flat Flatten FlattenAt FlatTopWindow FlipView Floor FlushPrintOutputPacket Fold FoldList Font FontColor FontFamily FontForm FontName FontOpacity FontPostScriptName FontProperties FontReencoding FontSize FontSlant FontSubstitutions FontTracking FontVariations FontWeight For ForAll Format FormatRules FormatType FormatTypeAutoConvert FormatValues FormBox FormBoxOptions FortranForm Forward ForwardBackward Fourier FourierCoefficient FourierCosCoefficient FourierCosSeries FourierCosTransform FourierDCT FourierDCTFilter FourierDCTMatrix FourierDST FourierDSTMatrix FourierMatrix FourierParameters FourierSequenceTransform FourierSeries FourierSinCoefficient FourierSinSeries FourierSinTransform FourierTransform FourierTrigSeries FractionalBrownianMotionProcess FractionalPart FractionBox FractionBoxOptions FractionLine Frame FrameBox FrameBoxOptions Framed FrameInset FrameLabel Frameless FrameMargins FrameStyle FrameTicks FrameTicksStyle FRatioDistribution FrechetDistribution FreeQ FrequencySamplingFilterKernel FresnelC FresnelS Friday FrobeniusNumber FrobeniusSolve FromCharacterCode FromCoefficientRules FromContinuedFraction FromDate FromDigits FromDMS Front FrontEndDynamicExpression FrontEndEventActions FrontEndExecute FrontEndObject FrontEndResource FrontEndResourceString FrontEndStackSize FrontEndToken FrontEndTokenExecute FrontEndValueCache FrontEndVersion FrontFaceColor FrontFaceOpacity Full FullAxes FullDefinition FullForm FullGraphics FullOptions FullSimplify Function FunctionExpand FunctionInterpolation FunctionSpace FussellVeselyImportance GaborFilter GaborMatrix GaborWavelet GainMargins GainPhaseMargins Gamma GammaDistribution GammaRegularized GapPenalty Gather GatherBy GaugeFaceElementFunction GaugeFaceStyle GaugeFrameElementFunction GaugeFrameSize GaugeFrameStyle GaugeLabels GaugeMarkers GaugeStyle GaussianFilter GaussianIntegers GaussianMatrix GaussianWindow GCD GegenbauerC General GeneralizedLinearModelFit GenerateConditions GeneratedCell GeneratedParameters GeneratingFunction Generic GenericCylindricalDecomposition GenomeData GenomeLookup GeodesicClosing GeodesicDilation GeodesicErosion GeodesicOpening GeoDestination GeodesyData GeoDirection GeoDistance GeoGridPosition GeometricBrownianMotionProcess GeometricDistribution GeometricMean GeometricMeanFilter GeometricTransformation GeometricTransformation3DBox GeometricTransformation3DBoxOptions GeometricTransformationBox GeometricTransformationBoxOptions GeoPosition GeoPositionENU GeoPositionXYZ GeoProjectionData GestureHandler GestureHandlerTag Get GetBoundingBoxSizePacket GetContext GetEnvironment GetFileName GetFrontEndOptionsDataPacket GetLinebreakInformationPacket GetMenusPacket GetPageBreakInformationPacket Glaisher GlobalClusteringCoefficient GlobalPreferences GlobalSession Glow GoldenRatio GompertzMakehamDistribution GoodmanKruskalGamma GoodmanKruskalGammaTest Goto Grad Gradient GradientFilter GradientOrientationFilter Graph GraphAssortativity GraphCenter GraphComplement GraphData GraphDensity GraphDiameter GraphDifference GraphDisjointUnion GraphDistance GraphDistanceMatrix GraphElementData GraphEmbedding GraphHighlight GraphHighlightStyle GraphHub Graphics Graphics3D Graphics3DBox Graphics3DBoxOptions GraphicsArray GraphicsBaseline GraphicsBox GraphicsBoxOptions GraphicsColor GraphicsColumn GraphicsComplex GraphicsComplex3DBox GraphicsComplex3DBoxOptions GraphicsComplexBox GraphicsComplexBoxOptions GraphicsContents GraphicsData GraphicsGrid GraphicsGridBox GraphicsGroup GraphicsGroup3DBox GraphicsGroup3DBoxOptions GraphicsGroupBox GraphicsGroupBoxOptions GraphicsGrouping GraphicsHighlightColor GraphicsRow GraphicsSpacing GraphicsStyle GraphIntersection GraphLayout GraphLinkEfficiency GraphPeriphery GraphPlot GraphPlot3D GraphPower GraphPropertyDistribution GraphQ GraphRadius GraphReciprocity GraphRoot GraphStyle GraphUnion Gray GrayLevel GreatCircleDistance Greater GreaterEqual GreaterEqualLess GreaterFullEqual GreaterGreater GreaterLess GreaterSlantEqual GreaterTilde Green Grid GridBaseline GridBox GridBoxAlignment GridBoxBackground GridBoxDividers GridBoxFrame GridBoxItemSize GridBoxItemStyle GridBoxOptions GridBoxSpacings GridCreationSettings GridDefaultElement GridElementStyleOptions GridFrame GridFrameMargins GridGraph GridLines GridLinesStyle GroebnerBasis GroupActionBase GroupCentralizer GroupElementFromWord GroupElementPosition GroupElementQ GroupElements GroupElementToWord GroupGenerators GroupMultiplicationTable GroupOrbits GroupOrder GroupPageBreakWithin GroupSetwiseStabilizer GroupStabilizer GroupStabilizerChain Gudermannian GumbelDistribution HaarWavelet HadamardMatrix HalfNormalDistribution HamiltonianGraphQ HammingDistance HammingWindow HankelH1 HankelH2 HankelMatrix HannPoissonWindow HannWindow HaradaNortonGroupHN HararyGraph HarmonicMean HarmonicMeanFilter HarmonicNumber Hash HashTable Haversine HazardFunction Head HeadCompose Heads HeavisideLambda HeavisidePi HeavisideTheta HeldGroupHe HeldPart HelpBrowserLookup HelpBrowserNotebook HelpBrowserSettings HermiteDecomposition HermiteH HermitianMatrixQ HessenbergDecomposition Hessian HexadecimalCharacter Hexahedron HexahedronBox HexahedronBoxOptions HiddenSurface HighlightGraph HighlightImage HighpassFilter HigmanSimsGroupHS HilbertFilter HilbertMatrix Histogram Histogram3D HistogramDistribution HistogramList HistogramTransform HistogramTransformInterpolation HitMissTransform HITSCentrality HodgeDual HoeffdingD HoeffdingDTest Hold HoldAll HoldAllComplete HoldComplete HoldFirst HoldForm HoldPattern HoldRest HolidayCalendar HomeDirectory HomePage Horizontal HorizontalForm HorizontalGauge HorizontalScrollPosition HornerForm HotellingTSquareDistribution HoytDistribution HTMLSave Hue HumpDownHump HumpEqual HurwitzLerchPhi HurwitzZeta HyperbolicDistribution HypercubeGraph HyperexponentialDistribution Hyperfactorial Hypergeometric0F1 Hypergeometric0F1Regularized Hypergeometric1F1 Hypergeometric1F1Regularized Hypergeometric2F1 Hypergeometric2F1Regularized HypergeometricDistribution HypergeometricPFQ HypergeometricPFQRegularized HypergeometricU Hyperlink HyperlinkCreationSettings Hyphenation HyphenationOptions HypoexponentialDistribution HypothesisTestData I Identity IdentityMatrix If IgnoreCase Im Image Image3D Image3DSlices ImageAccumulate ImageAdd ImageAdjust ImageAlign ImageApply ImageAspectRatio ImageAssemble ImageCache ImageCacheValid ImageCapture ImageChannels ImageClip ImageColorSpace ImageCompose ImageConvolve ImageCooccurrence ImageCorners ImageCorrelate ImageCorrespondingPoints ImageCrop ImageData ImageDataPacket ImageDeconvolve ImageDemosaic ImageDifference ImageDimensions ImageDistance ImageEffect ImageFeatureTrack ImageFileApply ImageFileFilter ImageFileScan ImageFilter ImageForestingComponents ImageForwardTransformation ImageHistogram ImageKeypoints ImageLevels ImageLines ImageMargins ImageMarkers ImageMeasurements ImageMultiply ImageOffset ImagePad ImagePadding ImagePartition ImagePeriodogram ImagePerspectiveTransformation ImageQ ImageRangeCache ImageReflect ImageRegion ImageResize ImageResolution ImageRotate ImageRotated ImageScaled ImageScan ImageSize ImageSizeAction ImageSizeCache ImageSizeMultipliers ImageSizeRaw ImageSubtract ImageTake ImageTransformation ImageTrim ImageType ImageValue ImageValuePositions Implies Import ImportAutoReplacements ImportString ImprovementImportance In IncidenceGraph IncidenceList IncidenceMatrix IncludeConstantBasis IncludeFileExtension IncludePods IncludeSingularTerm Increment Indent IndentingNewlineSpacings IndentMaxFraction IndependenceTest IndependentEdgeSetQ IndependentUnit IndependentVertexSetQ Indeterminate IndexCreationOptions Indexed IndexGraph IndexTag Inequality InexactNumberQ InexactNumbers Infinity Infix Information Inherited InheritScope Initialization InitializationCell InitializationCellEvaluation InitializationCellWarning InlineCounterAssignments InlineCounterIncrements InlineRules Inner Inpaint Input InputAliases InputAssumptions InputAutoReplacements InputField InputFieldBox InputFieldBoxOptions InputForm InputGrouping InputNamePacket InputNotebook InputPacket InputSettings InputStream InputString InputStringPacket InputToBoxFormPacket Insert InsertionPointObject InsertResults Inset Inset3DBox Inset3DBoxOptions InsetBox InsetBoxOptions Install InstallService InString Integer IntegerDigits IntegerExponent IntegerLength IntegerPart IntegerPartitions IntegerQ Integers IntegerString Integral Integrate Interactive InteractiveTradingChart Interlaced Interleaving InternallyBalancedDecomposition InterpolatingFunction InterpolatingPolynomial Interpolation InterpolationOrder InterpolationPoints InterpolationPrecision Interpretation InterpretationBox InterpretationBoxOptions InterpretationFunction InterpretTemplate InterquartileRange Interrupt InterruptSettings Intersection Interval IntervalIntersection IntervalMemberQ IntervalUnion Inverse InverseBetaRegularized InverseCDF InverseChiSquareDistribution InverseContinuousWaveletTransform InverseDistanceTransform InverseEllipticNomeQ InverseErf InverseErfc InverseFourier InverseFourierCosTransform InverseFourierSequenceTransform InverseFourierSinTransform InverseFourierTransform InverseFunction InverseFunctions InverseGammaDistribution InverseGammaRegularized InverseGaussianDistribution InverseGudermannian InverseHaversine InverseJacobiCD InverseJacobiCN InverseJacobiCS InverseJacobiDC InverseJacobiDN InverseJacobiDS InverseJacobiNC InverseJacobiND InverseJacobiNS InverseJacobiSC InverseJacobiSD InverseJacobiSN InverseLaplaceTransform InversePermutation InverseRadon InverseSeries InverseSurvivalFunction InverseWaveletTransform InverseWeierstrassP InverseZTransform Invisible InvisibleApplication InvisibleTimes IrreduciblePolynomialQ IsolatingInterval IsomorphicGraphQ IsotopeData Italic Item ItemBox ItemBoxOptions ItemSize ItemStyle ItoProcess JaccardDissimilarity JacobiAmplitude Jacobian JacobiCD JacobiCN JacobiCS JacobiDC JacobiDN JacobiDS JacobiNC JacobiND JacobiNS JacobiP JacobiSC JacobiSD JacobiSN JacobiSymbol JacobiZeta JankoGroupJ1 JankoGroupJ2 JankoGroupJ3 JankoGroupJ4 JarqueBeraALMTest JohnsonDistribution Join Joined JoinedCurve JoinedCurveBox JoinForm JordanDecomposition JordanModelDecomposition K KagiChart KaiserBesselWindow KaiserWindow KalmanEstimator KalmanFilter KarhunenLoeveDecomposition KaryTree KatzCentrality KCoreComponents KDistribution KelvinBei KelvinBer KelvinKei KelvinKer KendallTau KendallTauTest KernelExecute KernelMixtureDistribution KernelObject Kernels Ket Khinchin KirchhoffGraph KirchhoffMatrix KleinInvariantJ KnightTourGraph KnotData KnownUnitQ KolmogorovSmirnovTest KroneckerDelta KroneckerModelDecomposition KroneckerProduct KroneckerSymbol KuiperTest KumaraswamyDistribution Kurtosis KuwaharaFilter Label Labeled LabeledSlider LabelingFunction LabelStyle LaguerreL LambdaComponents LambertW LanczosWindow LandauDistribution Language LanguageCategory LaplaceDistribution LaplaceTransform Laplacian LaplacianFilter LaplacianGaussianFilter Large Larger Last Latitude LatitudeLongitude LatticeData LatticeReduce Launch LaunchKernels LayeredGraphPlot LayerSizeFunction LayoutInformation LCM LeafCount LeapYearQ LeastSquares LeastSquaresFilterKernel Left LeftArrow LeftArrowBar LeftArrowRightArrow LeftDownTeeVector LeftDownVector LeftDownVectorBar LeftRightArrow LeftRightVector LeftTee LeftTeeArrow LeftTeeVector LeftTriangle LeftTriangleBar LeftTriangleEqual LeftUpDownVector LeftUpTeeVector LeftUpVector LeftUpVectorBar LeftVector LeftVectorBar LegendAppearance Legended LegendFunction LegendLabel LegendLayout LegendMargins LegendMarkers LegendMarkerSize LegendreP LegendreQ LegendreType Length LengthWhile LerchPhi Less LessEqual LessEqualGreater LessFullEqual LessGreater LessLess LessSlantEqual LessTilde LetterCharacter LetterQ Level LeveneTest LeviCivitaTensor LevyDistribution Lexicographic LibraryFunction LibraryFunctionError LibraryFunctionInformation LibraryFunctionLoad LibraryFunctionUnload LibraryLoad LibraryUnload LicenseID LiftingFilterData LiftingWaveletTransform LightBlue LightBrown LightCyan Lighter LightGray LightGreen Lighting LightingAngle LightMagenta LightOrange LightPink LightPurple LightRed LightSources LightYellow Likelihood Limit LimitsPositioning LimitsPositioningTokens LindleyDistribution Line Line3DBox LinearFilter LinearFractionalTransform LinearModelFit LinearOffsetFunction LinearProgramming LinearRecurrence LinearSolve LinearSolveFunction LineBox LineBreak LinebreakAdjustments LineBreakChart LineBreakWithin LineColor LineForm LineGraph LineIndent LineIndentMaxFraction LineIntegralConvolutionPlot LineIntegralConvolutionScale LineLegend LineOpacity LineSpacing LineWrapParts LinkActivate LinkClose LinkConnect LinkConnectedQ LinkCreate LinkError LinkFlush LinkFunction LinkHost LinkInterrupt LinkLaunch LinkMode LinkObject LinkOpen LinkOptions LinkPatterns LinkProtocol LinkRead LinkReadHeld LinkReadyQ Links LinkWrite LinkWriteHeld LiouvilleLambda List Listable ListAnimate ListContourPlot ListContourPlot3D ListConvolve ListCorrelate ListCurvePathPlot ListDeconvolve ListDensityPlot Listen ListFourierSequenceTransform ListInterpolation ListLineIntegralConvolutionPlot ListLinePlot ListLogLinearPlot ListLogLogPlot ListLogPlot ListPicker ListPickerBox ListPickerBoxBackground ListPickerBoxOptions ListPlay ListPlot ListPlot3D ListPointPlot3D ListPolarPlot ListQ ListStreamDensityPlot ListStreamPlot ListSurfacePlot3D ListVectorDensityPlot ListVectorPlot ListVectorPlot3D ListZTransform Literal LiteralSearch LocalClusteringCoefficient LocalizeVariables LocationEquivalenceTest LocationTest Locator LocatorAutoCreate LocatorBox LocatorBoxOptions LocatorCentering LocatorPane LocatorPaneBox LocatorPaneBoxOptions LocatorRegion Locked Log Log10 Log2 LogBarnesG LogGamma LogGammaDistribution LogicalExpand LogIntegral LogisticDistribution LogitModelFit LogLikelihood LogLinearPlot LogLogisticDistribution LogLogPlot LogMultinormalDistribution LogNormalDistribution LogPlot LogRankTest LogSeriesDistribution LongEqual Longest LongestAscendingSequence LongestCommonSequence LongestCommonSequencePositions LongestCommonSubsequence LongestCommonSubsequencePositions LongestMatch LongForm Longitude LongLeftArrow LongLeftRightArrow LongRightArrow Loopback LoopFreeGraphQ LowerCaseQ LowerLeftArrow LowerRightArrow LowerTriangularize LowpassFilter LQEstimatorGains LQGRegulator LQOutputRegulatorGains LQRegulatorGains LUBackSubstitution LucasL LuccioSamiComponents LUDecomposition LyapunovSolve LyonsGroupLy MachineID MachineName MachineNumberQ MachinePrecision MacintoshSystemPageSetup Magenta Magnification Magnify MainSolve MaintainDynamicCaches Majority MakeBoxes MakeExpression MakeRules MangoldtLambda ManhattanDistance Manipulate Manipulator MannWhitneyTest MantissaExponent Manual Map MapAll MapAt MapIndexed MAProcess MapThread MarcumQ MardiaCombinedTest MardiaKurtosisTest MardiaSkewnessTest MarginalDistribution MarkovProcessProperties Masking MatchingDissimilarity MatchLocalNameQ MatchLocalNames MatchQ Material MathematicaNotation MathieuC MathieuCharacteristicA MathieuCharacteristicB MathieuCharacteristicExponent MathieuCPrime MathieuGroupM11 MathieuGroupM12 MathieuGroupM22 MathieuGroupM23 MathieuGroupM24 MathieuS MathieuSPrime MathMLForm MathMLText Matrices MatrixExp MatrixForm MatrixFunction MatrixLog MatrixPlot MatrixPower MatrixQ MatrixRank Max MaxBend MaxDetect MaxExtraBandwidths MaxExtraConditions MaxFeatures MaxFilter Maximize MaxIterations MaxMemoryUsed MaxMixtureKernels MaxPlotPoints MaxPoints MaxRecursion MaxStableDistribution MaxStepFraction MaxSteps MaxStepSize MaxValue MaxwellDistribution McLaughlinGroupMcL Mean MeanClusteringCoefficient MeanDegreeConnectivity MeanDeviation MeanFilter MeanGraphDistance MeanNeighborDegree MeanShift MeanShiftFilter Median MedianDeviation MedianFilter Medium MeijerG MeixnerDistribution MemberQ MemoryConstrained MemoryInUse Menu MenuAppearance MenuCommandKey MenuEvaluator MenuItem MenuPacket MenuSortingValue MenuStyle MenuView MergeDifferences Mesh MeshFunctions MeshRange MeshShading MeshStyle Message MessageDialog MessageList MessageName MessageOptions MessagePacket Messages MessagesNotebook MetaCharacters MetaInformation Method MethodOptions MexicanHatWavelet MeyerWavelet Min MinDetect MinFilter MinimalPolynomial MinimalStateSpaceModel Minimize Minors MinRecursion MinSize MinStableDistribution Minus MinusPlus MinValue Missing MissingDataMethod MittagLefflerE MixedRadix MixedRadixQuantity MixtureDistribution Mod Modal Mode Modular ModularLambda Module Modulus MoebiusMu Moment Momentary MomentConvert MomentEvaluate MomentGeneratingFunction Monday Monitor MonomialList MonomialOrder MonsterGroupM MorletWavelet MorphologicalBinarize MorphologicalBranchPoints MorphologicalComponents MorphologicalEulerNumber MorphologicalGraph MorphologicalPerimeter MorphologicalTransform Most MouseAnnotation MouseAppearance MouseAppearanceTag MouseButtons Mouseover MousePointerNote MousePosition MovingAverage MovingMedian MoyalDistribution MultiedgeStyle MultilaunchWarning MultiLetterItalics MultiLetterStyle MultilineFunction Multinomial MultinomialDistribution MultinormalDistribution MultiplicativeOrder Multiplicity Multiselection MultivariateHypergeometricDistribution MultivariatePoissonDistribution MultivariateTDistribution N NakagamiDistribution NameQ Names NamespaceBox Nand NArgMax NArgMin NBernoulliB NCache NDSolve NDSolveValue Nearest NearestFunction NeedCurrentFrontEndPackagePacket NeedCurrentFrontEndSymbolsPacket NeedlemanWunschSimilarity Needs Negative NegativeBinomialDistribution NegativeMultinomialDistribution NeighborhoodGraph Nest NestedGreaterGreater NestedLessLess NestedScriptRules NestList NestWhile NestWhileList NevilleThetaC NevilleThetaD NevilleThetaN NevilleThetaS NewPrimitiveStyle NExpectation Next NextPrime NHoldAll NHoldFirst NHoldRest NicholsGridLines NicholsPlot NIntegrate NMaximize NMaxValue NMinimize NMinValue NominalVariables NonAssociative NoncentralBetaDistribution NoncentralChiSquareDistribution NoncentralFRatioDistribution NoncentralStudentTDistribution NonCommutativeMultiply NonConstants None NonlinearModelFit NonlocalMeansFilter NonNegative NonPositive Nor NorlundB Norm Normal NormalDistribution NormalGrouping Normalize NormalizedSquaredEuclideanDistance NormalsFunction NormFunction Not NotCongruent NotCupCap NotDoubleVerticalBar Notebook NotebookApply NotebookAutoSave NotebookClose NotebookConvertSettings NotebookCreate NotebookCreateReturnObject NotebookDefault NotebookDelete NotebookDirectory NotebookDynamicExpression NotebookEvaluate NotebookEventActions NotebookFileName NotebookFind NotebookFindReturnObject NotebookGet NotebookGetLayoutInformationPacket NotebookGetMisspellingsPacket NotebookInformation NotebookInterfaceObject NotebookLocate NotebookObject NotebookOpen NotebookOpenReturnObject NotebookPath NotebookPrint NotebookPut NotebookPutReturnObject NotebookRead NotebookResetGeneratedCells Notebooks NotebookSave NotebookSaveAs NotebookSelection NotebookSetupLayoutInformationPacket NotebooksMenu NotebookWrite NotElement NotEqualTilde NotExists NotGreater NotGreaterEqual NotGreaterFullEqual NotGreaterGreater NotGreaterLess NotGreaterSlantEqual NotGreaterTilde NotHumpDownHump NotHumpEqual NotLeftTriangle NotLeftTriangleBar NotLeftTriangleEqual NotLess NotLessEqual NotLessFullEqual NotLessGreater NotLessLess NotLessSlantEqual NotLessTilde NotNestedGreaterGreater NotNestedLessLess NotPrecedes NotPrecedesEqual NotPrecedesSlantEqual NotPrecedesTilde NotReverseElement NotRightTriangle NotRightTriangleBar NotRightTriangleEqual NotSquareSubset NotSquareSubsetEqual NotSquareSuperset NotSquareSupersetEqual NotSubset NotSubsetEqual NotSucceeds NotSucceedsEqual NotSucceedsSlantEqual NotSucceedsTilde NotSuperset NotSupersetEqual NotTilde NotTildeEqual NotTildeFullEqual NotTildeTilde NotVerticalBar NProbability NProduct NProductFactors NRoots NSolve NSum NSumTerms Null NullRecords NullSpace NullWords Number NumberFieldClassNumber NumberFieldDiscriminant NumberFieldFundamentalUnits NumberFieldIntegralBasis NumberFieldNormRepresentatives NumberFieldRegulator NumberFieldRootsOfUnity NumberFieldSignature NumberForm NumberFormat NumberMarks NumberMultiplier NumberPadding NumberPoint NumberQ NumberSeparator NumberSigns NumberString Numerator NumericFunction NumericQ NuttallWindow NValues NyquistGridLines NyquistPlot O ObservabilityGramian ObservabilityMatrix ObservableDecomposition ObservableModelQ OddQ Off Offset OLEData On ONanGroupON OneIdentity Opacity Open OpenAppend Opener OpenerBox OpenerBoxOptions OpenerView OpenFunctionInspectorPacket Opening OpenRead OpenSpecialOptions OpenTemporary OpenWrite Operate OperatingSystem OptimumFlowData Optional OptionInspectorSettings OptionQ Options OptionsPacket OptionsPattern OptionValue OptionValueBox OptionValueBoxOptions Or Orange Order OrderDistribution OrderedQ Ordering Orderless OrnsteinUhlenbeckProcess Orthogonalize Out Outer OutputAutoOverwrite OutputControllabilityMatrix OutputControllableModelQ OutputForm OutputFormData OutputGrouping OutputMathEditExpression OutputNamePacket OutputResponse OutputSizeLimit OutputStream Over OverBar OverDot Overflow OverHat Overlaps Overlay OverlayBox OverlayBoxOptions Overscript OverscriptBox OverscriptBoxOptions OverTilde OverVector OwenT OwnValues PackingMethod PaddedForm Padding PadeApproximant PadLeft PadRight PageBreakAbove PageBreakBelow PageBreakWithin PageFooterLines PageFooters PageHeaderLines PageHeaders PageHeight PageRankCentrality PageWidth PairedBarChart PairedHistogram PairedSmoothHistogram PairedTTest PairedZTest PaletteNotebook PalettePath Pane PaneBox PaneBoxOptions Panel PanelBox PanelBoxOptions Paneled PaneSelector PaneSelectorBox PaneSelectorBoxOptions PaperWidth ParabolicCylinderD ParagraphIndent ParagraphSpacing ParallelArray ParallelCombine ParallelDo ParallelEvaluate Parallelization Parallelize ParallelMap ParallelNeeds ParallelProduct ParallelSubmit ParallelSum ParallelTable ParallelTry Parameter ParameterEstimator ParameterMixtureDistribution ParameterVariables ParametricFunction ParametricNDSolve ParametricNDSolveValue ParametricPlot ParametricPlot3D ParentConnect ParentDirectory ParentForm Parenthesize ParentList ParetoDistribution Part PartialCorrelationFunction PartialD ParticleData Partition PartitionsP PartitionsQ ParzenWindow PascalDistribution PassEventsDown PassEventsUp Paste PasteBoxFormInlineCells PasteButton Path PathGraph PathGraphQ Pattern PatternSequence PatternTest PauliMatrix PaulWavelet Pause PausedTime PDF PearsonChiSquareTest PearsonCorrelationTest PearsonDistribution PerformanceGoal PeriodicInterpolation Periodogram PeriodogramArray PermutationCycles PermutationCyclesQ PermutationGroup PermutationLength PermutationList PermutationListQ PermutationMax PermutationMin PermutationOrder PermutationPower PermutationProduct PermutationReplace Permutations PermutationSupport Permute PeronaMalikFilter Perpendicular PERTDistribution PetersenGraph PhaseMargins Pi Pick PIDData PIDDerivativeFilter PIDFeedforward PIDTune Piecewise PiecewiseExpand PieChart PieChart3D PillaiTrace PillaiTraceTest Pink Pivoting PixelConstrained PixelValue PixelValuePositions Placed Placeholder PlaceholderReplace Plain PlanarGraphQ Play PlayRange Plot Plot3D Plot3Matrix PlotDivision PlotJoined PlotLabel PlotLayout PlotLegends PlotMarkers PlotPoints PlotRange PlotRangeClipping PlotRangePadding PlotRegion PlotStyle Plus PlusMinus Pochhammer PodStates PodWidth Point Point3DBox PointBox PointFigureChart PointForm PointLegend PointSize PoissonConsulDistribution PoissonDistribution PoissonProcess PoissonWindow PolarAxes PolarAxesOrigin PolarGridLines PolarPlot PolarTicks PoleZeroMarkers PolyaAeppliDistribution PolyGamma Polygon Polygon3DBox Polygon3DBoxOptions PolygonBox PolygonBoxOptions PolygonHoleScale PolygonIntersections PolygonScale PolyhedronData PolyLog PolynomialExtendedGCD PolynomialForm PolynomialGCD PolynomialLCM PolynomialMod PolynomialQ PolynomialQuotient PolynomialQuotientRemainder PolynomialReduce PolynomialRemainder Polynomials PopupMenu PopupMenuBox PopupMenuBoxOptions PopupView PopupWindow Position Positive PositiveDefiniteMatrixQ PossibleZeroQ Postfix PostScript Power PowerDistribution PowerExpand PowerMod PowerModList PowerSpectralDensity PowersRepresentations PowerSymmetricPolynomial Precedence PrecedenceForm Precedes PrecedesEqual PrecedesSlantEqual PrecedesTilde Precision PrecisionGoal PreDecrement PredictionRoot PreemptProtect PreferencesPath Prefix PreIncrement Prepend PrependTo PreserveImageOptions Previous PriceGraphDistribution PrimaryPlaceholder Prime PrimeNu PrimeOmega PrimePi PrimePowerQ PrimeQ Primes PrimeZetaP PrimitiveRoot PrincipalComponents PrincipalValue Print PrintAction PrintForm PrintingCopies PrintingOptions PrintingPageRange PrintingStartingPageNumber PrintingStyleEnvironment PrintPrecision PrintTemporary Prism PrismBox PrismBoxOptions PrivateCellOptions PrivateEvaluationOptions PrivateFontOptions PrivateFrontEndOptions PrivateNotebookOptions PrivatePaths Probability ProbabilityDistribution ProbabilityPlot ProbabilityPr ProbabilityScalePlot ProbitModelFit ProcessEstimator ProcessParameterAssumptions ProcessParameterQ ProcessStateDomain ProcessTimeDomain Product ProductDistribution ProductLog ProgressIndicator ProgressIndicatorBox ProgressIndicatorBoxOptions Projection Prolog PromptForm Properties Property PropertyList PropertyValue Proportion Proportional Protect Protected ProteinData Pruning PseudoInverse Purple Put PutAppend Pyramid PyramidBox PyramidBoxOptions QBinomial QFactorial QGamma QHypergeometricPFQ QPochhammer QPolyGamma QRDecomposition QuadraticIrrationalQ Quantile QuantilePlot Quantity QuantityForm QuantityMagnitude QuantityQ QuantityUnit Quartics QuartileDeviation Quartiles QuartileSkewness QueueingNetworkProcess QueueingProcess QueueProperties Quiet Quit Quotient QuotientRemainder RadialityCentrality RadicalBox RadicalBoxOptions RadioButton RadioButtonBar RadioButtonBox RadioButtonBoxOptions Radon RamanujanTau RamanujanTauL RamanujanTauTheta RamanujanTauZ Random RandomChoice RandomComplex RandomFunction RandomGraph RandomImage RandomInteger RandomPermutation RandomPrime RandomReal RandomSample RandomSeed RandomVariate RandomWalkProcess Range RangeFilter RangeSpecification RankedMax RankedMin Raster Raster3D Raster3DBox Raster3DBoxOptions RasterArray RasterBox RasterBoxOptions Rasterize RasterSize Rational RationalFunctions Rationalize Rationals Ratios Raw RawArray RawBoxes RawData RawMedium RayleighDistribution Re Read ReadList ReadProtected Real RealBlockDiagonalForm RealDigits RealExponent Reals Reap Record RecordLists RecordSeparators Rectangle RectangleBox RectangleBoxOptions RectangleChart RectangleChart3D RecurrenceFilter RecurrenceTable RecurringDigitsForm Red Reduce RefBox ReferenceLineStyle ReferenceMarkers ReferenceMarkerStyle Refine ReflectionMatrix ReflectionTransform Refresh RefreshRate RegionBinarize RegionFunction RegionPlot RegionPlot3D RegularExpression Regularization Reinstall Release ReleaseHold ReliabilityDistribution ReliefImage ReliefPlot Remove RemoveAlphaChannel RemoveAsynchronousTask Removed RemoveInputStreamMethod RemoveOutputStreamMethod RemoveProperty RemoveScheduledTask RenameDirectory RenameFile RenderAll RenderingOptions RenewalProcess RenkoChart Repeated RepeatedNull RepeatedString Replace ReplaceAll ReplaceHeldPart ReplaceImageValue ReplaceList ReplacePart ReplacePixelValue ReplaceRepeated Resampling Rescale RescalingTransform ResetDirectory ResetMenusPacket ResetScheduledTask Residue Resolve Rest Resultant ResumePacket Return ReturnExpressionPacket ReturnInputFormPacket ReturnPacket ReturnTextPacket Reverse ReverseBiorthogonalSplineWavelet ReverseElement ReverseEquilibrium ReverseGraph ReverseUpEquilibrium RevolutionAxis RevolutionPlot3D RGBColor RiccatiSolve RiceDistribution RidgeFilter RiemannR RiemannSiegelTheta RiemannSiegelZ Riffle Right RightArrow RightArrowBar RightArrowLeftArrow RightCosetRepresentative RightDownTeeVector RightDownVector RightDownVectorBar RightTee RightTeeArrow RightTeeVector RightTriangle RightTriangleBar RightTriangleEqual RightUpDownVector RightUpTeeVector RightUpVector RightUpVectorBar RightVector RightVectorBar RiskAchievementImportance RiskReductionImportance RogersTanimotoDissimilarity Root RootApproximant RootIntervals RootLocusPlot RootMeanSquare RootOfUnityQ RootReduce Roots RootSum Rotate RotateLabel RotateLeft RotateRight RotationAction RotationBox RotationBoxOptions RotationMatrix RotationTransform Round RoundImplies RoundingRadius Row RowAlignments RowBackgrounds RowBox RowHeights RowLines RowMinHeight RowReduce RowsEqual RowSpacings RSolve RudvalisGroupRu Rule RuleCondition RuleDelayed RuleForm RulerUnits Run RunScheduledTask RunThrough RuntimeAttributes RuntimeOptions RussellRaoDissimilarity SameQ SameTest SampleDepth SampledSoundFunction SampledSoundList SampleRate SamplingPeriod SARIMAProcess SARMAProcess SatisfiabilityCount SatisfiabilityInstances SatisfiableQ Saturday Save Saveable SaveAutoDelete SaveDefinitions SawtoothWave Scale Scaled ScaleDivisions ScaledMousePosition ScaleOrigin ScalePadding ScaleRanges ScaleRangeStyle ScalingFunctions ScalingMatrix ScalingTransform Scan ScheduledTaskActiveQ ScheduledTaskData ScheduledTaskObject ScheduledTasks SchurDecomposition ScientificForm ScreenRectangle ScreenStyleEnvironment ScriptBaselineShifts ScriptLevel ScriptMinSize ScriptRules ScriptSizeMultipliers Scrollbars ScrollingOptions ScrollPosition Sec Sech SechDistribution SectionGrouping SectorChart SectorChart3D SectorOrigin SectorSpacing SeedRandom Select Selectable SelectComponents SelectedCells SelectedNotebook Selection SelectionAnimate SelectionCell SelectionCellCreateCell SelectionCellDefaultStyle SelectionCellParentStyle SelectionCreateCell SelectionDebuggerTag SelectionDuplicateCell SelectionEvaluate SelectionEvaluateCreateCell SelectionMove SelectionPlaceholder SelectionSetStyle SelectWithContents SelfLoops SelfLoopStyle SemialgebraicComponentInstances SendMail Sequence SequenceAlignment SequenceForm SequenceHold SequenceLimit Series SeriesCoefficient SeriesData SessionTime Set SetAccuracy SetAlphaChannel SetAttributes Setbacks SetBoxFormNamesPacket SetDelayed SetDirectory SetEnvironment SetEvaluationNotebook SetFileDate SetFileLoadingContext SetNotebookStatusLine SetOptions SetOptionsPacket SetPrecision SetProperty SetSelectedNotebook SetSharedFunction SetSharedVariable SetSpeechParametersPacket SetStreamPosition SetSystemOptions Setter SetterBar SetterBox SetterBoxOptions Setting SetValue Shading Shallow ShannonWavelet ShapiroWilkTest Share Sharpen ShearingMatrix ShearingTransform ShenCastanMatrix Short ShortDownArrow Shortest ShortestMatch ShortestPathFunction ShortLeftArrow ShortRightArrow ShortUpArrow Show ShowAutoStyles ShowCellBracket ShowCellLabel ShowCellTags ShowClosedCellArea ShowContents ShowControls ShowCursorTracker ShowGroupOpenCloseIcon ShowGroupOpener ShowInvisibleCharacters ShowPageBreaks ShowPredictiveInterface ShowSelection ShowShortBoxForm ShowSpecialCharacters ShowStringCharacters ShowSyntaxStyles ShrinkingDelay ShrinkWrapBoundingBox SiegelTheta SiegelTukeyTest Sign Signature SignedRankTest SignificanceLevel SignPadding SignTest SimilarityRules SimpleGraph SimpleGraphQ Simplify Sin Sinc SinghMaddalaDistribution SingleEvaluation SingleLetterItalics SingleLetterStyle SingularValueDecomposition SingularValueList SingularValuePlot SingularValues Sinh SinhIntegral SinIntegral SixJSymbol Skeleton SkeletonTransform SkellamDistribution Skewness SkewNormalDistribution Skip SliceDistribution Slider Slider2D Slider2DBox Slider2DBoxOptions SliderBox SliderBoxOptions SlideView Slot SlotSequence Small SmallCircle Smaller SmithDelayCompensator SmithWatermanSimilarity SmoothDensityHistogram SmoothHistogram SmoothHistogram3D SmoothKernelDistribution SocialMediaData Socket SokalSneathDissimilarity Solve SolveAlways SolveDelayed Sort SortBy Sound SoundAndGraphics SoundNote SoundVolume Sow Space SpaceForm Spacer Spacings Span SpanAdjustments SpanCharacterRounding SpanFromAbove SpanFromBoth SpanFromLeft SpanLineThickness SpanMaxSize SpanMinSize SpanningCharacters SpanSymmetric SparseArray SpatialGraphDistribution Speak SpeakTextPacket SpearmanRankTest SpearmanRho Spectrogram SpectrogramArray Specularity SpellingCorrection SpellingDictionaries SpellingDictionariesPath SpellingOptions SpellingSuggestionsPacket Sphere SphereBox SphericalBesselJ SphericalBesselY SphericalHankelH1 SphericalHankelH2 SphericalHarmonicY SphericalPlot3D SphericalRegion SpheroidalEigenvalue SpheroidalJoiningFactor SpheroidalPS SpheroidalPSPrime SpheroidalQS SpheroidalQSPrime SpheroidalRadialFactor SpheroidalS1 SpheroidalS1Prime SpheroidalS2 SpheroidalS2Prime Splice SplicedDistribution SplineClosed SplineDegree SplineKnots SplineWeights Split SplitBy SpokenString Sqrt SqrtBox SqrtBoxOptions Square SquaredEuclideanDistance SquareFreeQ SquareIntersection SquaresR SquareSubset SquareSubsetEqual SquareSuperset SquareSupersetEqual SquareUnion SquareWave StabilityMargins StabilityMarginsStyle StableDistribution Stack StackBegin StackComplete StackInhibit StandardDeviation StandardDeviationFilter StandardForm Standardize StandbyDistribution Star StarGraph StartAsynchronousTask StartingStepSize StartOfLine StartOfString StartScheduledTask StartupSound StateDimensions StateFeedbackGains StateOutputEstimator StateResponse StateSpaceModel StateSpaceRealization StateSpaceTransform StationaryDistribution StationaryWaveletPacketTransform StationaryWaveletTransform StatusArea StatusCentrality StepMonitor StieltjesGamma StirlingS1 StirlingS2 StopAsynchronousTask StopScheduledTask StrataVariables StratonovichProcess StreamColorFunction StreamColorFunctionScaling StreamDensityPlot StreamPlot StreamPoints StreamPosition Streams StreamScale StreamStyle String StringBreak StringByteCount StringCases StringCount StringDrop StringExpression StringForm StringFormat StringFreeQ StringInsert StringJoin StringLength StringMatchQ StringPosition StringQ StringReplace StringReplaceList StringReplacePart StringReverse StringRotateLeft StringRotateRight StringSkeleton StringSplit StringTake StringToStream StringTrim StripBoxes StripOnInput StripWrapperBoxes StrokeForm StructuralImportance StructuredArray StructuredSelection StruveH StruveL Stub StudentTDistribution Style StyleBox StyleBoxAutoDelete StyleBoxOptions StyleData StyleDefinitions StyleForm StyleKeyMapping StyleMenuListing StyleNameDialogSettings StyleNames StylePrint StyleSheetPath Subfactorial Subgraph SubMinus SubPlus SubresultantPolynomialRemainders SubresultantPolynomials Subresultants Subscript SubscriptBox SubscriptBoxOptions Subscripted Subset SubsetEqual Subsets SubStar Subsuperscript SubsuperscriptBox SubsuperscriptBoxOptions Subtract SubtractFrom SubValues Succeeds SucceedsEqual SucceedsSlantEqual SucceedsTilde SuchThat Sum SumConvergence Sunday SuperDagger SuperMinus SuperPlus Superscript SuperscriptBox SuperscriptBoxOptions Superset SupersetEqual SuperStar Surd SurdForm SurfaceColor SurfaceGraphics SurvivalDistribution SurvivalFunction SurvivalModel SurvivalModelFit SuspendPacket SuzukiDistribution SuzukiGroupSuz SwatchLegend Switch Symbol SymbolName SymletWavelet Symmetric SymmetricGroup SymmetricMatrixQ SymmetricPolynomial SymmetricReduction Symmetrize SymmetrizedArray SymmetrizedArrayRules SymmetrizedDependentComponents SymmetrizedIndependentComponents SymmetrizedReplacePart SynchronousInitialization SynchronousUpdating Syntax SyntaxForm SyntaxInformation SyntaxLength SyntaxPacket SyntaxQ SystemDialogInput SystemException SystemHelpPath SystemInformation SystemInformationData SystemOpen SystemOptions SystemsModelDelay SystemsModelDelayApproximate SystemsModelDelete SystemsModelDimensions SystemsModelExtract SystemsModelFeedbackConnect SystemsModelLabels SystemsModelOrder SystemsModelParallelConnect SystemsModelSeriesConnect SystemsModelStateFeedbackConnect SystemStub Tab TabFilling Table TableAlignments TableDepth TableDirections TableForm TableHeadings TableSpacing TableView TableViewBox TabSpacings TabView TabViewBox TabViewBoxOptions TagBox TagBoxNote TagBoxOptions TaggingRules TagSet TagSetDelayed TagStyle TagUnset Take TakeWhile Tally Tan Tanh TargetFunctions TargetUnits TautologyQ TelegraphProcess TemplateBox TemplateBoxOptions TemplateSlotSequence TemporalData Temporary TemporaryVariable TensorContract TensorDimensions TensorExpand TensorProduct TensorQ TensorRank TensorReduce TensorSymmetry TensorTranspose TensorWedge Tetrahedron TetrahedronBox TetrahedronBoxOptions TeXForm TeXSave Text Text3DBox Text3DBoxOptions TextAlignment TextBand TextBoundingBox TextBox TextCell TextClipboardType TextData TextForm TextJustification TextLine TextPacket TextParagraph TextRecognize TextRendering TextStyle Texture TextureCoordinateFunction TextureCoordinateScaling Therefore ThermometerGauge Thick Thickness Thin Thinning ThisLink ThompsonGroupTh Thread ThreeJSymbol Threshold Through Throw Thumbnail Thursday Ticks TicksStyle Tilde TildeEqual TildeFullEqual TildeTilde TimeConstrained TimeConstraint Times TimesBy TimeSeriesForecast TimeSeriesInvertibility TimeUsed TimeValue TimeZone Timing Tiny TitleGrouping TitsGroupT ToBoxes ToCharacterCode ToColor ToContinuousTimeModel ToDate ToDiscreteTimeModel ToeplitzMatrix ToExpression ToFileName Together Toggle ToggleFalse Toggler TogglerBar TogglerBox TogglerBoxOptions ToHeldExpression ToInvertibleTimeSeries TokenWords Tolerance ToLowerCase ToNumberField TooBig Tooltip TooltipBox TooltipBoxOptions TooltipDelay TooltipStyle Top TopHatTransform TopologicalSort ToRadicals ToRules ToString Total TotalHeight TotalVariationFilter TotalWidth TouchscreenAutoZoom TouchscreenControlPlacement ToUpperCase Tr Trace TraceAbove TraceAction TraceBackward TraceDepth TraceDialog TraceForward TraceInternal TraceLevel TraceOff TraceOn TraceOriginal TracePrint TraceScan TrackedSymbols TradingChart TraditionalForm TraditionalFunctionNotation TraditionalNotation TraditionalOrder TransferFunctionCancel TransferFunctionExpand TransferFunctionFactor TransferFunctionModel TransferFunctionPoles TransferFunctionTransform TransferFunctionZeros TransformationFunction TransformationFunctions TransformationMatrix TransformedDistribution TransformedField Translate TranslationTransform TransparentColor Transpose TreeForm TreeGraph TreeGraphQ TreePlot TrendStyle TriangleWave TriangularDistribution Trig TrigExpand TrigFactor TrigFactorList Trigger TrigReduce TrigToExp TrimmedMean True TrueQ TruncatedDistribution TsallisQExponentialDistribution TsallisQGaussianDistribution TTest Tube TubeBezierCurveBox TubeBezierCurveBoxOptions TubeBox TubeBSplineCurveBox TubeBSplineCurveBoxOptions Tuesday TukeyLambdaDistribution TukeyWindow Tuples TuranGraph TuringMachine Transparent UnateQ Uncompress Undefined UnderBar Underflow Underlined Underoverscript UnderoverscriptBox UnderoverscriptBoxOptions Underscript UnderscriptBox UnderscriptBoxOptions UndirectedEdge UndirectedGraph UndirectedGraphQ UndocumentedTestFEParserPacket UndocumentedTestGetSelectionPacket Unequal Unevaluated UniformDistribution UniformGraphDistribution UniformSumDistribution Uninstall Union UnionPlus Unique UnitBox UnitConvert UnitDimensions Unitize UnitRootTest UnitSimplify UnitStep UnitTriangle UnitVector Unprotect UnsameQ UnsavedVariables Unset UnsetShared UntrackedVariables Up UpArrow UpArrowBar UpArrowDownArrow Update UpdateDynamicObjects UpdateDynamicObjectsSynchronous UpdateInterval UpDownArrow UpEquilibrium UpperCaseQ UpperLeftArrow UpperRightArrow UpperTriangularize Upsample UpSet UpSetDelayed UpTee UpTeeArrow UpValues URL URLFetch URLFetchAsynchronous URLSave URLSaveAsynchronous UseGraphicsRange Using UsingFrontEnd V2Get ValidationLength Value ValueBox ValueBoxOptions ValueForm ValueQ ValuesData Variables Variance VarianceEquivalenceTest VarianceEstimatorFunction VarianceGammaDistribution VarianceTest VectorAngle VectorColorFunction VectorColorFunctionScaling VectorDensityPlot VectorGlyphData VectorPlot VectorPlot3D VectorPoints VectorQ Vectors VectorScale VectorStyle Vee Verbatim Verbose VerboseConvertToPostScriptPacket VerifyConvergence VerifySolutions VerifyTestAssumptions Version VersionNumber VertexAdd VertexCapacity VertexColors VertexComponent VertexConnectivity VertexCoordinateRules VertexCoordinates VertexCorrelationSimilarity VertexCosineSimilarity VertexCount VertexCoverQ VertexDataCoordinates VertexDegree VertexDelete VertexDiceSimilarity VertexEccentricity VertexInComponent VertexInDegree VertexIndex VertexJaccardSimilarity VertexLabeling VertexLabels VertexLabelStyle VertexList VertexNormals VertexOutComponent VertexOutDegree VertexQ VertexRenderingFunction VertexReplace VertexShape VertexShapeFunction VertexSize VertexStyle VertexTextureCoordinates VertexWeight Vertical VerticalBar VerticalForm VerticalGauge VerticalSeparator VerticalSlider VerticalTilde ViewAngle ViewCenter ViewMatrix ViewPoint ViewPointSelectorSettings ViewPort ViewRange ViewVector ViewVertical VirtualGroupData Visible VisibleCell VoigtDistribution VonMisesDistribution WaitAll WaitAsynchronousTask WaitNext WaitUntil WakebyDistribution WalleniusHypergeometricDistribution WaringYuleDistribution WatershedComponents WatsonUSquareTest WattsStrogatzGraphDistribution WaveletBestBasis WaveletFilterCoefficients WaveletImagePlot WaveletListPlot WaveletMapIndexed WaveletMatrixPlot WaveletPhi WaveletPsi WaveletScale WaveletScalogram WaveletThreshold WeaklyConnectedComponents WeaklyConnectedGraphQ WeakStationarity WeatherData WeberE Wedge Wednesday WeibullDistribution WeierstrassHalfPeriods WeierstrassInvariants WeierstrassP WeierstrassPPrime WeierstrassSigma WeierstrassZeta WeightedAdjacencyGraph WeightedAdjacencyMatrix WeightedData WeightedGraphQ Weights WelchWindow WheelGraph WhenEvent Which While White Whitespace WhitespaceCharacter WhittakerM WhittakerW WienerFilter WienerProcess WignerD WignerSemicircleDistribution WilksW WilksWTest WindowClickSelect WindowElements WindowFloating WindowFrame WindowFrameElements WindowMargins WindowMovable WindowOpacity WindowSelected WindowSize WindowStatusArea WindowTitle WindowToolbars WindowWidth With WolframAlpha WolframAlphaDate WolframAlphaQuantity WolframAlphaResult Word WordBoundary WordCharacter WordData WordSearch WordSeparators WorkingPrecision Write WriteString Wronskian XMLElement XMLObject Xnor Xor Yellow YuleDissimilarity ZernikeR ZeroSymmetric ZeroTest ZeroWidthTimes Zeta ZetaZero ZipfDistribution ZTest ZTransform $Aborted $ActivationGroupID $ActivationKey $ActivationUserRegistered $AddOnsDirectory $AssertFunction $Assumptions $AsynchronousTask $BaseDirectory $BatchInput $BatchOutput $BoxForms $ByteOrdering $Canceled $CharacterEncoding $CharacterEncodings $CommandLine $CompilationTarget $ConditionHold $ConfiguredKernels $Context $ContextPath $ControlActiveSetting $CreationDate $CurrentLink $DateStringFormat $DefaultFont $DefaultFrontEnd $DefaultImagingDevice $DefaultPath $Display $DisplayFunction $DistributedContexts $DynamicEvaluation $Echo $Epilog $ExportFormats $Failed $FinancialDataSource $FormatType $FrontEnd $FrontEndSession $GeoLocation $HistoryLength $HomeDirectory $HTTPCookies $IgnoreEOF $ImagingDevices $ImportFormats $InitialDirectory $Input $InputFileName $InputStreamMethods $Inspector $InstallationDate $InstallationDirectory $InterfaceEnvironment $IterationLimit $KernelCount $KernelID $Language $LaunchDirectory $LibraryPath $LicenseExpirationDate $LicenseID $LicenseProcesses $LicenseServer $LicenseSubprocesses $LicenseType $Line $Linked $LinkSupported $LoadedFiles $MachineAddresses $MachineDomain $MachineDomains $MachineEpsilon $MachineID $MachineName $MachinePrecision $MachineType $MaxExtraPrecision $MaxLicenseProcesses $MaxLicenseSubprocesses $MaxMachineNumber $MaxNumber $MaxPiecewiseCases $MaxPrecision $MaxRootDegree $MessageGroups $MessageList $MessagePrePrint $Messages $MinMachineNumber $MinNumber $MinorReleaseNumber $MinPrecision $ModuleNumber $NetworkLicense $NewMessage $NewSymbol $Notebooks $NumberMarks $Off $OperatingSystem $Output $OutputForms $OutputSizeLimit $OutputStreamMethods $Packages $ParentLink $ParentProcessID $PasswordFile $PatchLevelID $Path $PathnameSeparator $PerformanceGoal $PipeSupported $Post $Pre $PreferencesDirectory $PrePrint $PreRead $PrintForms $PrintLiteral $ProcessID $ProcessorCount $ProcessorType $ProductInformation $ProgramName $RandomState $RecursionLimit $ReleaseNumber $RootDirectory $ScheduledTask $ScriptCommandLine $SessionID $SetParentLink $SharedFunctions $SharedVariables $SoundDisplay $SoundDisplayFunction $SuppressInputFormHeads $SynchronousEvaluation $SyntaxHandler $System $SystemCharacterEncoding $SystemID $SystemWordLength $TemporaryDirectory $TemporaryPrefix $TextStyle $TimedOut $TimeUnit $TimeZone $TopDirectory $TraceOff $TraceOn $TracePattern $TracePostAction $TracePreAction $Urgent $UserAddOnsDirectory $UserBaseDirectory $UserDocumentsDirectory $UserName $Version $VersionNumber",
        c: [{
            cN: "comment",
            b: /\(\*/,
            e: /\*\)/
        }, e.ASM, e.QSM, e.CNM, {
            b: /\{/,
            e: /\}/,
            i: /:/
        }]
    }
}),
hljs.registerLanguage("golo", function(e) {
    return {
        k: {
            keyword: "println readln print import module function local return let var while for foreach times in case when match with break continue augment augmentation each find filter reduce if then else otherwise try catch finally raise throw orIfNull DynamicObject|10 DynamicVariable struct Observable map set vector list array",
            literal: "true false null"
        },
        c: [e.HCM, e.QSM, e.CNM, {
            cN: "meta",
            b: "@[A-Za-z]+"
        }]
    }
}),
hljs.registerLanguage("oxygene", function(e) {
    var t = "abstract add and array as asc aspect assembly async begin break block by case class concat const copy constructor continue create default delegate desc distinct div do downto dynamic each else empty end ensure enum equals event except exit extension external false final finalize finalizer finally flags for forward from function future global group has if implementation implements implies in index inherited inline interface into invariants is iterator join locked locking loop matching method mod module namespace nested new nil not notify nullable of old on operator or order out override parallel params partial pinned private procedure property protected public queryable raise read readonly record reintroduce remove repeat require result reverse sealed select self sequence set shl shr skip static step soft take then to true try tuple type union unit unsafe until uses using var virtual raises volatile where while with write xor yield await mapped deprecated stdcall cdecl pascal register safecall overload library platform reference packed strict published autoreleasepool selector strong weak unretained"
      , r = e.C("{", "}", {
        r: 0
    })
      , i = e.C("\\(\\*", "\\*\\)", {
        r: 10
    })
      , n = {
        cN: "string",
        b: "'",
        e: "'",
        c: [{
            b: "''"
        }]
    }
      , a = {
        cN: "string",
        b: "(#\\d+)+"
    }
      , o = {
        cN: "function",
        bK: "function constructor destructor procedure method",
        e: "[:;]",
        k: "function constructor|10 destructor|10 procedure|10 method|10",
        c: [e.TM, {
            cN: "params",
            b: "\\(",
            e: "\\)",
            k: t,
            c: [n, a]
        }, r, i]
    };
    return {
        cI: !0,
        k: t,
        i: '("|\\$[G-Zg-z]|\\/\\*|</|=>|->)',
        c: [r, i, e.CLCM, n, a, e.NM, o, {
            cN: "class",
            b: "=\\bclass\\b",
            e: "end;",
            k: t,
            c: [n, a, r, i, e.CLCM, o]
        }]
    }
}),
hljs.registerLanguage("yaml", function(e) {
    var t = {
        literal: "{ } true false yes no Yes No True False null"
    }
      , r = "^[ \\-]*"
      , i = "[a-zA-Z_][\\w\\-]*"
      , n = {
        cN: "attr",
        v: [{
            b: r + i + ":"
        }, {
            b: r + '"' + i + '":'
        }, {
            b: r + "'" + i + "':"
        }]
    }
      , a = {
        cN: "template-variable",
        v: [{
            b: "{{",
            e: "}}"
        }, {
            b: "%{",
            e: "}"
        }]
    }
      , o = {
        cN: "string",
        r: 0,
        v: [{
            b: /'/,
            e: /'/
        }, {
            b: /"/,
            e: /"/
        }],
        c: [e.BE, a]
    };
    return {
        cI: !0,
        aliases: ["yml", "YAML", "yaml"],
        c: [n, {
            cN: "meta",
            b: "^---s*$",
            r: 10
        }, {
            cN: "string",
            b: "[\\|>] *$",
            rE: !0,
            c: o.c,
            e: n.v[0].b
        }, {
            b: "<%[%=-]?",
            e: "[%-]?%>",
            sL: "ruby",
            eB: !0,
            eE: !0,
            r: 0
        }, {
            cN: "type",
            b: "!!" + e.UIR
        }, {
            cN: "meta",
            b: "&" + e.UIR + "$"
        }, {
            cN: "meta",
            b: "\\*" + e.UIR + "$"
        }, {
            cN: "bullet",
            b: "^ *-",
            r: 0
        }, o, e.HCM, e.CNM],
        k: t
    }
}),
hljs.registerLanguage("perl", function(e) {
    var t = "getpwent getservent quotemeta msgrcv scalar kill dbmclose undef lc ma syswrite tr send umask sysopen shmwrite vec qx utime local oct semctl localtime readpipe do return format read sprintf dbmopen pop getpgrp not getpwnam rewinddir qqfileno qw endprotoent wait sethostent bless s|0 opendir continue each sleep endgrent shutdown dump chomp connect getsockname die socketpair close flock exists index shmgetsub for endpwent redo lstat msgctl setpgrp abs exit select print ref gethostbyaddr unshift fcntl syscall goto getnetbyaddr join gmtime symlink semget splice x|0 getpeername recv log setsockopt cos last reverse gethostbyname getgrnam study formline endhostent times chop length gethostent getnetent pack getprotoent getservbyname rand mkdir pos chmod y|0 substr endnetent printf next open msgsnd readdir use unlink getsockopt getpriority rindex wantarray hex system getservbyport endservent int chr untie rmdir prototype tell listen fork shmread ucfirst setprotoent else sysseek link getgrgid shmctl waitpid unpack getnetbyname reset chdir grep split require caller lcfirst until warn while values shift telldir getpwuid my getprotobynumber delete and sort uc defined srand accept package seekdir getprotobyname semop our rename seek if q|0 chroot sysread setpwent no crypt getc chown sqrt write setnetent setpriority foreach tie sin msgget map stat getlogin unless elsif truncate exec keys glob tied closedirioctl socket readlink eval xor readline binmode setservent eof ord bind alarm pipe atan2 getgrent exp time push setgrent gt lt or ne m|0 break given say state when"
      , r = {
        cN: "subst",
        b: "[$@]\\{",
        e: "\\}",
        k: t
    }
      , i = {
        b: "->{",
        e: "}"
    }
      , n = {
        v: [{
            b: /\$\d/
        }, {
            b: /[\$%@](\^\w\b|#\w+(::\w+)*|{\w+}|\w+(::\w*)*)/
        }, {
            b: /[\$%@][^\s\w{]/,
            r: 0
        }]
    }
      , a = [e.BE, r, n]
      , o = [n, e.HCM, e.C("^\\=\\w", "\\=cut", {
        eW: !0
    }), i, {
        cN: "string",
        c: a,
        v: [{
            b: "q[qwxr]?\\s*\\(",
            e: "\\)",
            r: 5
        }, {
            b: "q[qwxr]?\\s*\\[",
            e: "\\]",
            r: 5
        }, {
            b: "q[qwxr]?\\s*\\{",
            e: "\\}",
            r: 5
        }, {
            b: "q[qwxr]?\\s*\\|",
            e: "\\|",
            r: 5
        }, {
            b: "q[qwxr]?\\s*\\<",
            e: "\\>",
            r: 5
        }, {
            b: "qw\\s+q",
            e: "q",
            r: 5
        }, {
            b: "'",
            e: "'",
            c: [e.BE]
        }, {
            b: '"',
            e: '"'
        }, {
            b: "`",
            e: "`",
            c: [e.BE]
        }, {
            b: "{\\w+}",
            c: [],
            r: 0
        }, {
            b: "-?\\w+\\s*\\=\\>",
            c: [],
            r: 0
        }]
    }, {
        cN: "number",
        b: "(\\b0[0-7_]+)|(\\b0x[0-9a-fA-F_]+)|(\\b[1-9][0-9_]*(\\.[0-9_]+)?)|[0_]\\b",
        r: 0
    }, {
        b: "(\\/\\/|" + e.RSR + "|\\b(split|return|print|reverse|grep)\\b)\\s*",
        k: "split return print reverse grep",
        r: 0,
        c: [e.HCM, {
            cN: "regexp",
            b: "(s|tr|y)/(\\\\.|[^/])*/(\\\\.|[^/])*/[a-z]*",
            r: 10
        }, {
            cN: "regexp",
            b: "(m|qr)?/",
            e: "/[a-z]*",
            c: [e.BE],
            r: 0
        }]
    }, {
        cN: "function",
        bK: "sub",
        e: "(\\s*\\(.*?\\))?[;{]",
        eE: !0,
        r: 5,
        c: [e.TM]
    }, {
        b: "-\\w\\b",
        r: 0
    }, {
        b: "^__DATA__$",
        e: "^__END__$",
        sL: "mojolicious",
        c: [{
            b: "^@@.*",
            e: "$",
            cN: "comment"
        }]
    }];
    return r.c = o,
    i.c = o,
    {
        aliases: ["pl"],
        k: t,
        c: o
    }
}),
hljs.registerLanguage("vim", function(e) {
    return {
        l: /[!#@\w]+/,
        k: {
            keyword: "N|0 P|0 X|0 a|0 ab abc abo al am an|0 ar arga argd arge argdo argg argl argu as au aug aun b|0 bN ba bad bd be bel bf bl bm bn bo bp br brea breaka breakd breakl bro bufdo buffers bun bw c|0 cN cNf ca cabc caddb cad caddf cal cat cb cc ccl cd ce cex cf cfir cgetb cgete cg changes chd che checkt cl cla clo cm cmapc cme cn cnew cnf cno cnorea cnoreme co col colo com comc comp con conf cope cp cpf cq cr cs cst cu cuna cunme cw d|0 delm deb debugg delc delf dif diffg diffo diffp diffpu diffs diffthis dig di dl dell dj dli do doautoa dp dr ds dsp e|0 ea ec echoe echoh echom echon el elsei em en endfo endf endt endw ene ex exe exi exu f|0 files filet fin fina fini fir fix fo foldc foldd folddoc foldo for fu g|0 go gr grepa gu gv ha h|0 helpf helpg helpt hi hid his i|0 ia iabc if ij il im imapc ime ino inorea inoreme int is isp iu iuna iunme j|0 ju k|0 keepa kee keepj lN lNf l|0 lad laddb laddf la lan lat lb lc lch lcl lcs le lefta let lex lf lfir lgetb lgete lg lgr lgrepa lh ll lla lli lmak lm lmapc lne lnew lnf ln loadk lo loc lockv lol lope lp lpf lr ls lt lu lua luad luaf lv lvimgrepa lw m|0 ma mak map mapc marks mat me menut mes mk mks mksp mkv mkvie mod mz mzf nbc nb nbs n|0 new nm nmapc nme nn nnoreme noa no noh norea noreme norm nu nun nunme ol o|0 om omapc ome on ono onoreme opt ou ounme ow p|0 profd prof pro promptr pc ped pe perld po popu pp pre prev ps pt ptN ptf ptj ptl ptn ptp ptr pts pu pw py3 python3 py3d py3f py pyd pyf q|0 quita qa r|0 rec red redi redr redraws reg res ret retu rew ri rightb rub rubyd rubyf rund ru rv s|0 sN san sa sal sav sb sbN sba sbf sbl sbm sbn sbp sbr scrip scripte scs se setf setg setl sf sfir sh sim sig sil sl sla sm smap smapc sme sn sni sno snor snoreme sor so spelld spe spelli spellr spellu spellw sp spr sre st sta startg startr star stopi stj sts sun sunm sunme sus sv sw sy synti sync t|0 tN tabN tabc tabdo tabe tabf tabfir tabl tabm tabnew tabn tabo tabp tabr tabs tab ta tags tc tcld tclf te tf th tj tl tm tn to tp tr try ts tu u|0 undoj undol una unh unl unlo unm unme uns up v|0 ve verb vert vim vimgrepa vi viu vie vm vmapc vme vne vn vnoreme vs vu vunme windo w|0 wN wa wh wi winc winp wn wp wq wqa ws wu wv x|0 xa xmapc xm xme xn xnoreme xu xunme y|0 z|0 ~ Next Print append abbreviate abclear aboveleft all amenu anoremenu args argadd argdelete argedit argglobal arglocal argument ascii autocmd augroup aunmenu buffer bNext ball badd bdelete behave belowright bfirst blast bmodified bnext botright bprevious brewind break breakadd breakdel breaklist browse bunload bwipeout change cNext cNfile cabbrev cabclear caddbuffer caddexpr caddfile call catch cbuffer cclose center cexpr cfile cfirst cgetbuffer cgetexpr cgetfile chdir checkpath checktime clist clast close cmap cmapclear cmenu cnext cnewer cnfile cnoremap cnoreabbrev cnoremenu copy colder colorscheme command comclear compiler continue confirm copen cprevious cpfile cquit crewind cscope cstag cunmap cunabbrev cunmenu cwindow delete delmarks debug debuggreedy delcommand delfunction diffupdate diffget diffoff diffpatch diffput diffsplit digraphs display deletel djump dlist doautocmd doautoall deletep drop dsearch dsplit edit earlier echo echoerr echohl echomsg else elseif emenu endif endfor endfunction endtry endwhile enew execute exit exusage file filetype find finally finish first fixdel fold foldclose folddoopen folddoclosed foldopen function global goto grep grepadd gui gvim hardcopy help helpfind helpgrep helptags highlight hide history insert iabbrev iabclear ijump ilist imap imapclear imenu inoremap inoreabbrev inoremenu intro isearch isplit iunmap iunabbrev iunmenu join jumps keepalt keepmarks keepjumps lNext lNfile list laddexpr laddbuffer laddfile last language later lbuffer lcd lchdir lclose lcscope left leftabove lexpr lfile lfirst lgetbuffer lgetexpr lgetfile lgrep lgrepadd lhelpgrep llast llist lmake lmap lmapclear lnext lnewer lnfile lnoremap loadkeymap loadview lockmarks lockvar lolder lopen lprevious lpfile lrewind ltag lunmap luado luafile lvimgrep lvimgrepadd lwindow move mark make mapclear match menu menutranslate messages mkexrc mksession mkspell mkvimrc mkview mode mzscheme mzfile nbclose nbkey nbsart next nmap nmapclear nmenu nnoremap nnoremenu noautocmd noremap nohlsearch noreabbrev noremenu normal number nunmap nunmenu oldfiles open omap omapclear omenu only onoremap onoremenu options ounmap ounmenu ownsyntax print profdel profile promptfind promptrepl pclose pedit perl perldo pop popup ppop preserve previous psearch ptag ptNext ptfirst ptjump ptlast ptnext ptprevious ptrewind ptselect put pwd py3do py3file python pydo pyfile quit quitall qall read recover redo redir redraw redrawstatus registers resize retab return rewind right rightbelow ruby rubydo rubyfile rundo runtime rviminfo substitute sNext sandbox sargument sall saveas sbuffer sbNext sball sbfirst sblast sbmodified sbnext sbprevious sbrewind scriptnames scriptencoding scscope set setfiletype setglobal setlocal sfind sfirst shell simalt sign silent sleep slast smagic smapclear smenu snext sniff snomagic snoremap snoremenu sort source spelldump spellgood spellinfo spellrepall spellundo spellwrong split sprevious srewind stop stag startgreplace startreplace startinsert stopinsert stjump stselect sunhide sunmap sunmenu suspend sview swapname syntax syntime syncbind tNext tabNext tabclose tabedit tabfind tabfirst tablast tabmove tabnext tabonly tabprevious tabrewind tag tcl tcldo tclfile tearoff tfirst throw tjump tlast tmenu tnext topleft tprevious trewind tselect tunmenu undo undojoin undolist unabbreviate unhide unlet unlockvar unmap unmenu unsilent update vglobal version verbose vertical vimgrep vimgrepadd visual viusage view vmap vmapclear vmenu vnew vnoremap vnoremenu vsplit vunmap vunmenu write wNext wall while winsize wincmd winpos wnext wprevious wqall wsverb wundo wviminfo xit xall xmapclear xmap xmenu xnoremap xnoremenu xunmap xunmenu yank",
            built_in: "abs acos add and append argc argidx argv asin atan atan2 browse browsedir bufexists buflisted bufloaded bufname bufnr bufwinnr byte2line byteidx call ceil changenr char2nr cindent clearmatches col complete complete_add complete_check confirm copy cos cosh count cscope_connection cursor deepcopy delete did_filetype diff_filler diff_hlID empty escape eval eventhandler executable exists exp expand extend feedkeys filereadable filewritable filter finddir findfile float2nr floor fmod fnameescape fnamemodify foldclosed foldclosedend foldlevel foldtext foldtextresult foreground function garbagecollect get getbufline getbufvar getchar getcharmod getcmdline getcmdpos getcmdtype getcwd getfontname getfperm getfsize getftime getftype getline getloclist getmatches getpid getpos getqflist getreg getregtype gettabvar gettabwinvar getwinposx getwinposy getwinvar glob globpath has has_key haslocaldir hasmapto histadd histdel histget histnr hlexists hlID hostname iconv indent index input inputdialog inputlist inputrestore inputsave inputsecret insert invert isdirectory islocked items join keys len libcall libcallnr line line2byte lispindent localtime log log10 luaeval map maparg mapcheck match matchadd matcharg matchdelete matchend matchlist matchstr max min mkdir mode mzeval nextnonblank nr2char or pathshorten pow prevnonblank printf pumvisible py3eval pyeval range readfile reltime reltimestr remote_expr remote_foreground remote_peek remote_read remote_send remove rename repeat resolve reverse round screenattr screenchar screencol screenrow search searchdecl searchpair searchpairpos searchpos server2client serverlist setbufvar setcmdpos setline setloclist setmatches setpos setqflist setreg settabvar settabwinvar setwinvar sha256 shellescape shiftwidth simplify sin sinh sort soundfold spellbadword spellsuggest split sqrt str2float str2nr strchars strdisplaywidth strftime stridx string strlen strpart strridx strtrans strwidth submatch substitute synconcealed synID synIDattr synIDtrans synstack system tabpagebuflist tabpagenr tabpagewinnr tagfiles taglist tan tanh tempname tolower toupper tr trunc type undofile undotree values virtcol visualmode wildmenumode winbufnr wincol winheight winline winnr winrestcmd winrestview winsaveview winwidth writefile xor"
        },
        i: /[{:]/,
        c: [e.NM, e.ASM, {
            cN: "string",
            b: /"((\\")|[^"\n])*("|\n)/
        }, {
            cN: "variable",
            b: /[bwtglsav]:[\w\d_]*/
        }, {
            cN: "function",
            bK: "function function!",
            e: "$",
            r: 0,
            c: [e.TM, {
                cN: "params",
                b: "\\(",
                e: "\\)"
            }]
        }]
    }
}),
hljs.registerLanguage("livecodeserver", function(e) {
    var t = {
        b: "\\b[gtps][A-Z]+[A-Za-z0-9_\\-]*\\b|\\$_[A-Z]+",
        r: 0
    }
      , r = [e.CBCM, e.HCM, e.C("--", "$"), e.C("[^:]//", "$")]
      , i = e.inherit(e.TM, {
        v: [{
            b: "\\b_*rig[A-Z]+[A-Za-z0-9_\\-]*"
        }, {
            b: "\\b_[a-z0-9\\-]+"
        }]
    })
      , n = e.inherit(e.TM, {
        b: "\\b([A-Za-z0-9_\\-]+)\\b"
    });
    return {
        cI: !1,
        k: {
            keyword: "$_COOKIE $_FILES $_GET $_GET_BINARY $_GET_RAW $_POST $_POST_BINARY $_POST_RAW $_SESSION $_SERVER codepoint codepoints segment segments codeunit codeunits sentence sentences trueWord trueWords paragraph after byte bytes english the until http forever descending using line real8 with seventh for stdout finally element word words fourth before black ninth sixth characters chars stderr uInt1 uInt1s uInt2 uInt2s stdin string lines relative rel any fifth items from middle mid at else of catch then third it file milliseconds seconds second secs sec int1 int1s int4 int4s internet int2 int2s normal text item last long detailed effective uInt4 uInt4s repeat end repeat URL in try into switch to words https token binfile each tenth as ticks tick system real4 by dateItems without char character ascending eighth whole dateTime numeric short first ftp integer abbreviated abbr abbrev private case while if div mod wrap and or bitAnd bitNot bitOr bitXor among not in a an within contains ends with begins the keys of keys",
            literal: "SIX TEN FORMFEED NINE ZERO NONE SPACE FOUR FALSE COLON CRLF PI COMMA ENDOFFILE EOF EIGHT FIVE QUOTE EMPTY ONE TRUE RETURN CR LINEFEED RIGHT BACKSLASH NULL SEVEN TAB THREE TWO six ten formfeed nine zero none space four false colon crlf pi comma endoffile eof eight five quote empty one true return cr linefeed right backslash null seven tab three two RIVERSION RISTATE FILE_READ_MODE FILE_WRITE_MODE FILE_WRITE_MODE DIR_WRITE_MODE FILE_READ_UMASK FILE_WRITE_UMASK DIR_READ_UMASK DIR_WRITE_UMASK",
            built_in: "put abs acos aliasReference annuity arrayDecode arrayEncode asin atan atan2 average avg avgDev base64Decode base64Encode baseConvert binaryDecode binaryEncode byteOffset byteToNum cachedURL cachedURLs charToNum cipherNames codepointOffset codepointProperty codepointToNum codeunitOffset commandNames compound compress constantNames cos date dateFormat decompress directories diskSpace DNSServers exp exp1 exp2 exp10 extents files flushEvents folders format functionNames geometricMean global globals hasMemory harmonicMean hostAddress hostAddressToName hostName hostNameToAddress isNumber ISOToMac itemOffset keys len length libURLErrorData libUrlFormData libURLftpCommand libURLLastHTTPHeaders libURLLastRHHeaders libUrlMultipartFormAddPart libUrlMultipartFormData libURLVersion lineOffset ln ln1 localNames log log2 log10 longFilePath lower macToISO matchChunk matchText matrixMultiply max md5Digest median merge millisec millisecs millisecond milliseconds min monthNames nativeCharToNum normalizeText num number numToByte numToChar numToCodepoint numToNativeChar offset open openfiles openProcesses openProcessIDs openSockets paragraphOffset paramCount param params peerAddress pendingMessages platform popStdDev populationStandardDeviation populationVariance popVariance processID random randomBytes replaceText result revCreateXMLTree revCreateXMLTreeFromFile revCurrentRecord revCurrentRecordIsFirst revCurrentRecordIsLast revDatabaseColumnCount revDatabaseColumnIsNull revDatabaseColumnLengths revDatabaseColumnNames revDatabaseColumnNamed revDatabaseColumnNumbered revDatabaseColumnTypes revDatabaseConnectResult revDatabaseCursors revDatabaseID revDatabaseTableNames revDatabaseType revDataFromQuery revdb_closeCursor revdb_columnbynumber revdb_columncount revdb_columnisnull revdb_columnlengths revdb_columnnames revdb_columntypes revdb_commit revdb_connect revdb_connections revdb_connectionerr revdb_currentrecord revdb_cursorconnection revdb_cursorerr revdb_cursors revdb_dbtype revdb_disconnect revdb_execute revdb_iseof revdb_isbof revdb_movefirst revdb_movelast revdb_movenext revdb_moveprev revdb_query revdb_querylist revdb_recordcount revdb_rollback revdb_tablenames revGetDatabaseDriverPath revNumberOfRecords revOpenDatabase revOpenDatabases revQueryDatabase revQueryDatabaseBlob revQueryResult revQueryIsAtStart revQueryIsAtEnd revUnixFromMacPath revXMLAttribute revXMLAttributes revXMLAttributeValues revXMLChildContents revXMLChildNames revXMLCreateTreeFromFileWithNamespaces revXMLCreateTreeWithNamespaces revXMLDataFromXPathQuery revXMLEvaluateXPath revXMLFirstChild revXMLMatchingNode revXMLNextSibling revXMLNodeContents revXMLNumberOfChildren revXMLParent revXMLPreviousSibling revXMLRootNode revXMLRPC_CreateRequest revXMLRPC_Documents revXMLRPC_Error revXMLRPC_GetHost revXMLRPC_GetMethod revXMLRPC_GetParam revXMLText revXMLRPC_Execute revXMLRPC_GetParamCount revXMLRPC_GetParamNode revXMLRPC_GetParamType revXMLRPC_GetPath revXMLRPC_GetPort revXMLRPC_GetProtocol revXMLRPC_GetRequest revXMLRPC_GetResponse revXMLRPC_GetSocket revXMLTree revXMLTrees revXMLValidateDTD revZipDescribeItem revZipEnumerateItems revZipOpenArchives round sampVariance sec secs seconds sentenceOffset sha1Digest shell shortFilePath sin specialFolderPath sqrt standardDeviation statRound stdDev sum sysError systemVersion tan tempName textDecode textEncode tick ticks time to tokenOffset toLower toUpper transpose truewordOffset trunc uniDecode uniEncode upper URLDecode URLEncode URLStatus uuid value variableNames variance version waitDepth weekdayNames wordOffset xsltApplyStylesheet xsltApplyStylesheetFromFile xsltLoadStylesheet xsltLoadStylesheetFromFile add breakpoint cancel clear local variable file word line folder directory URL close socket process combine constant convert create new alias folder directory decrypt delete variable word line folder directory URL dispatch divide do encrypt filter get include intersect kill libURLDownloadToFile libURLFollowHttpRedirects libURLftpUpload libURLftpUploadFile libURLresetAll libUrlSetAuthCallback libURLSetCustomHTTPHeaders libUrlSetExpect100 libURLSetFTPListCommand libURLSetFTPMode libURLSetFTPStopTime libURLSetStatusCallback load multiply socket prepare process post seek rel relative read from process rename replace require resetAll resolve revAddXMLNode revAppendXML revCloseCursor revCloseDatabase revCommitDatabase revCopyFile revCopyFolder revCopyXMLNode revDeleteFolder revDeleteXMLNode revDeleteAllXMLTrees revDeleteXMLTree revExecuteSQL revGoURL revInsertXMLNode revMoveFolder revMoveToFirstRecord revMoveToLastRecord revMoveToNextRecord revMoveToPreviousRecord revMoveToRecord revMoveXMLNode revPutIntoXMLNode revRollBackDatabase revSetDatabaseDriverPath revSetXMLAttribute revXMLRPC_AddParam revXMLRPC_DeleteAllDocuments revXMLAddDTD revXMLRPC_Free revXMLRPC_FreeAll revXMLRPC_DeleteDocument revXMLRPC_DeleteParam revXMLRPC_SetHost revXMLRPC_SetMethod revXMLRPC_SetPort revXMLRPC_SetProtocol revXMLRPC_SetSocket revZipAddItemWithData revZipAddItemWithFile revZipAddUncompressedItemWithData revZipAddUncompressedItemWithFile revZipCancel revZipCloseArchive revZipDeleteItem revZipExtractItemToFile revZipExtractItemToVariable revZipSetProgressCallback revZipRenameItem revZipReplaceItemWithData revZipReplaceItemWithFile revZipOpenArchive send set sort split start stop subtract union unload wait write"
        },
        c: [t, {
            cN: "keyword",
            b: "\\bend\\sif\\b"
        }, {
            cN: "function",
            bK: "function",
            e: "$",
            c: [t, n, e.ASM, e.QSM, e.BNM, e.CNM, i]
        }, {
            cN: "function",
            b: "\\bend\\s+",
            e: "$",
            k: "end",
            c: [n, i]
        }, {
            bK: "command on",
            e: "$",
            c: [t, n, e.ASM, e.QSM, e.BNM, e.CNM, i]
        }, {
            cN: "meta",
            v: [{
                b: "<\\?(rev|lc|livecode)",
                r: 10
            }, {
                b: "<\\?"
            }, {
                b: "\\?>"
            }]
        }, e.ASM, e.QSM, e.BNM, e.CNM, i].concat(r),
        i: ";$|^\\[|^="
    }
}),
hljs.registerLanguage("profile", function(e) {
    return {
        c: [e.CNM, {
            b: "[a-zA-Z_][\\da-zA-Z_]+\\.[\\da-zA-Z_]{1,3}",
            e: ":",
            eE: !0
        }, {
            b: "(ncalls|tottime|cumtime)",
            e: "$",
            k: "ncalls tottime|10 cumtime|10 filename",
            r: 10
        }, {
            b: "function calls",
            e: "$",
            c: [e.CNM],
            r: 10
        }, e.ASM, e.QSM, {
            cN: "string",
            b: "\\(",
            e: "\\)$",
            eB: !0,
            eE: !0,
            r: 0
        }]
    }
}),
hljs.registerLanguage("sml", function(e) {
    return {
        aliases: ["ml"],
        k: {
            keyword: "abstype and andalso as case datatype do else end eqtype exception fn fun functor handle if in include infix infixr let local nonfix of op open orelse raise rec sharing sig signature struct structure then type val with withtype where while",
            built_in: "array bool char exn int list option order real ref string substring vector unit word",
            literal: "true false NONE SOME LESS EQUAL GREATER nil"
        },
        i: /\/\/|>>/,
        l: "[a-z_]\\w*!?",
        c: [{
            cN: "literal",
            b: "\\[(\\|\\|)?\\]|\\(\\)"
        }, e.C("\\(\\*", "\\*\\)", {
            c: ["self"]
        }), {
            cN: "symbol",
            b: "'[A-Za-z_](?!')[\\w']*"
        }, {
            cN: "type",
            b: "`[A-Z][\\w']*"
        }, {
            cN: "type",
            b: "\\b[A-Z][\\w']*",
            r: 0
        }, {
            b: "[a-z_]\\w*'[\\w']*"
        }, e.inherit(e.ASM, {
            cN: "string",
            r: 0
        }), e.inherit(e.QSM, {
            i: null
        }), {
            cN: "number",
            b: "\\b(0[xX][a-fA-F0-9_]+[Lln]?|0[oO][0-7_]+[Lln]?|0[bB][01_]+[Lln]?|[0-9][0-9_]*([Lln]|(\\.[0-9_]*)?([eE][-+]?[0-9_]+)?)?)",
            r: 0
        }, {
            b: /[-=]>/
        }]
    }
}),
hljs.registerLanguage("asciidoc", function(e) {
    return {
        aliases: ["adoc"],
        c: [e.C("^/{4,}\\n", "\\n/{4,}$", {
            r: 10
        }), e.C("^//", "$", {
            r: 0
        }), {
            cN: "title",
            b: "^\\.\\w.*$"
        }, {
            b: "^[=\\*]{4,}\\n",
            e: "\\n^[=\\*]{4,}$",
            r: 10
        }, {
            cN: "section",
            r: 10,
            v: [{
                b: "^(={1,5}) .+?( \\1)?$"
            }, {
                b: "^[^\\[\\]\\n]+?\\n[=\\-~\\^\\+]{2,}$"
            }]
        }, {
            cN: "meta",
            b: "^:.+?:",
            e: "\\s",
            eE: !0,
            r: 10
        }, {
            cN: "meta",
            b: "^\\[.+?\\]$",
            r: 0
        }, {
            cN: "quote",
            b: "^_{4,}\\n",
            e: "\\n_{4,}$",
            r: 10
        }, {
            cN: "code",
            b: "^[\\-\\.]{4,}\\n",
            e: "\\n[\\-\\.]{4,}$",
            r: 10
        }, {
            b: "^\\+{4,}\\n",
            e: "\\n\\+{4,}$",
            c: [{
                b: "<",
                e: ">",
                sL: "xml",
                r: 0
            }],
            r: 10
        }, {
            cN: "bullet",
            b: "^(\\*+|\\-+|\\.+|[^\\n]+?::)\\s+"
        }, {
            cN: "symbol",
            b: "^(NOTE|TIP|IMPORTANT|WARNING|CAUTION):\\s+",
            r: 10
        }, {
            cN: "strong",
            b: "\\B\\*(?![\\*\\s])",
            e: "(\\n{2}|\\*)",
            c: [{
                b: "\\\\*\\w",
                r: 0
            }]
        }, {
            cN: "emphasis",
            b: "\\B'(?!['\\s])",
            e: "(\\n{2}|')",
            c: [{
                b: "\\\\'\\w",
                r: 0
            }],
            r: 0
        }, {
            cN: "emphasis",
            b: "_(?![_\\s])",
            e: "(\\n{2}|_)",
            r: 0
        }, {
            cN: "string",
            v: [{
                b: "``.+?''"
            }, {
                b: "`.+?'"
            }]
        }, {
            cN: "code",
            b: "(`.+?`|\\+.+?\\+)",
            r: 0
        }, {
            cN: "code",
            b: "^[ \\t]",
            e: "$",
            r: 0
        }, {
            b: "^'{3,}[ \\t]*$",
            r: 10
        }, {
            b: "(link:)?(http|https|ftp|file|irc|image:?):\\S+\\[.*?\\]",
            rB: !0,
            c: [{
                b: "(link|image:?):",
                r: 0
            }, {
                cN: "link",
                b: "\\w",
                e: "[^\\[]+",
                r: 0
            }, {
                cN: "string",
                b: "\\[",
                e: "\\]",
                eB: !0,
                eE: !0,
                r: 0
            }],
            r: 10
        }]
    }
}),
hljs.registerLanguage("twig", function(e) {
    var t = {
        cN: "params",
        b: "\\(",
        e: "\\)"
    }
      , r = "attribute block constant cycle date dump include max min parent random range source template_from_string"
      , i = {
        bK: r,
        k: {
            name: r
        },
        r: 0,
        c: [t]
    }
      , n = {
        b: /\|[A-Za-z_]+:?/,
        k: "abs batch capitalize convert_encoding date date_modify default escape first format join json_encode keys last length lower merge nl2br number_format raw replace reverse round slice sort split striptags title trim upper url_encode",
        c: [i]
    }
      , a = "autoescape block do embed extends filter flush for if import include macro sandbox set spaceless use verbatim";
    return a = a + " " + a.split(" ").map(function(e) {
        return "end" + e
    }).join(" "),
    {
        aliases: ["craftcms"],
        cI: !0,
        sL: "xml",
        c: [e.C(/\{#/, /#}/), {
            cN: "template-tag",
            b: /\{%/,
            e: /%}/,
            c: [{
                cN: "name",
                b: /\w+/,
                k: a,
                starts: {
                    eW: !0,
                    c: [n, i],
                    r: 0
                }
            }]
        }, {
            cN: "template-variable",
            b: /\{\{/,
            e: /}}/,
            c: ["self", n, i]
        }]
    }
}),
hljs.registerLanguage("gcode", function(e) {
    return {
        aliases: ["nc"],
        cI: !0,
        l: "[A-Z_][A-Z0-9_.]*",
        k: "IF DO WHILE ENDWHILE CALL ENDIF SUB ENDSUB GOTO REPEAT ENDREPEAT EQ LT GT NE GE LE OR XOR",
        c: [{
            cN: "meta",
            b: "\\%"
        }, {
            cN: "meta",
            b: "([O])([0-9]+)"
        }].concat([e.CLCM, e.CBCM, e.C(/\(/, /\)/), e.inherit(e.CNM, {
            b: "([-+]?([0-9]*\\.?[0-9]+\\.?))|" + e.CNR
        }), e.inherit(e.ASM, {
            i: null
        }), e.inherit(e.QSM, {
            i: null
        }), {
            cN: "name",
            b: "([G])([0-9]+\\.?[0-9]?)"
        }, {
            cN: "name",
            b: "([M])([0-9]+\\.?[0-9]?)"
        }, {
            cN: "attr",
            b: "(VC|VS|#)",
            e: "(\\d+)"
        }, {
            cN: "attr",
            b: "(VZOFX|VZOFY|VZOFZ)"
        }, {
            cN: "built_in",
            b: "(ATAN|ABS|ACOS|ASIN|SIN|COS|EXP|FIX|FUP|ROUND|LN|TAN)(\\[)",
            e: "([-+]?([0-9]*\\.?[0-9]+\\.?))(\\])"
        }, {
            cN: "symbol",
            v: [{
                b: "N",
                e: "\\d+",
                i: "\\W"
            }]
        }])
    }
}),
hljs.registerLanguage("capnproto", function(e) {
    return {
        aliases: ["capnp"],
        k: {
            keyword: "struct enum interface union group import using const annotation extends in of on as with from fixed",
            built_in: "Void Bool Int8 Int16 Int32 Int64 UInt8 UInt16 UInt32 UInt64 Float32 Float64 Text Data AnyPointer AnyStruct Capability List",
            literal: "true false"
        },
        c: [e.QSM, e.NM, e.HCM, {
            cN: "meta",
            b: /@0x[\w\d]{16};/,
            i: /\n/
        }, {
            cN: "symbol",
            b: /@\d+\b/
        }, {
            cN: "class",
            bK: "struct enum",
            e: /\{/,
            i: /\n/,
            c: [e.inherit(e.TM, {
                starts: {
                    eW: !0,
                    eE: !0
                }
            })]
        }, {
            cN: "class",
            bK: "interface",
            e: /\{/,
            i: /\n/,
            c: [e.inherit(e.TM, {
                starts: {
                    eW: !0,
                    eE: !0
                }
            })]
        }]
    }
}),
hljs.registerLanguage("protobuf", function(e) {
    return {
        k: {
            keyword: "package import option optional required repeated group",
            built_in: "double float int32 int64 uint32 uint64 sint32 sint64 fixed32 fixed64 sfixed32 sfixed64 bool string bytes",
            literal: "true false"
        },
        c: [e.QSM, e.NM, e.CLCM, {
            cN: "class",
            bK: "message enum service",
            e: /\{/,
            i: /\n/,
            c: [e.inherit(e.TM, {
                starts: {
                    eW: !0,
                    eE: !0
                }
            })]
        }, {
            cN: "function",
            bK: "rpc",
            e: /;/,
            eE: !0,
            k: "rpc returns"
        }, {
            b: /^\s*[A-Z_]+/,
            e: /\s*=/,
            eE: !0
        }]
    }
}),
hljs.registerLanguage("fsharp", function(e) {
    var t = {
        b: "<",
        e: ">",
        c: [e.inherit(e.TM, {
            b: /'[a-zA-Z0-9_]+/
        })]
    };
    return {
        aliases: ["fs"],
        k: "abstract and as assert base begin class default delegate do done downcast downto elif else end exception extern false finally for fun function global if in inherit inline interface internal lazy let match member module mutable namespace new null of open or override private public rec return sig static struct then to true try type upcast use val void when while with yield",
        i: /\/\*/,
        c: [{
            cN: "keyword",
            b: /\b(yield|return|let|do)!/
        }, {
            cN: "string",
            b: '@"',
            e: '"',
            c: [{
                b: '""'
            }]
        }, {
            cN: "string",
            b: '"""',
            e: '"""'
        }, e.C("\\(\\*", "\\*\\)"), {
            cN: "class",
            bK: "type",
            e: "\\(|=|$",
            eE: !0,
            c: [e.UTM, t]
        }, {
            cN: "meta",
            b: "\\[<",
            e: ">\\]",
            r: 10
        }, {
            cN: "symbol",
            b: "\\B('[A-Za-z])\\b",
            c: [e.BE]
        }, e.CLCM, e.inherit(e.QSM, {
            i: null
        }), e.CNM]
    }
}),
hljs.registerLanguage("autoit", function(e) {
    var t = {
        v: [e.C(";", "$", {
            r: 0
        }), e.C("#cs", "#ce"), e.C("#comments-start", "#comments-end")]
    }
      , r = {
        b: "\\$[A-z0-9_]+"
    }
      , i = {
        cN: "string",
        v: [{
            b: /"/,
            e: /"/,
            c: [{
                b: /""/,
                r: 0
            }]
        }, {
            b: /'/,
            e: /'/,
            c: [{
                b: /''/,
                r: 0
            }]
        }]
    }
      , n = {
        v: [e.BNM, e.CNM]
    };
    return {
        cI: !0,
        i: /\/\*/,
        k: {
            keyword: "ByRef Case Const ContinueCase ContinueLoop Default Dim Do Else ElseIf EndFunc EndIf EndSelect EndSwitch EndWith Enum Exit ExitLoop For Func Global If In Local Next ReDim Return Select Static Step Switch Then To Until Volatile WEnd While With",
            built_in: "Abs ACos AdlibRegister AdlibUnRegister Asc AscW ASin Assign ATan AutoItSetOption AutoItWinGetTitle AutoItWinSetTitle Beep Binary BinaryLen BinaryMid BinaryToString BitAND BitNOT BitOR BitRotate BitShift BitXOR BlockInput Break Call CDTray Ceiling Chr ChrW ClipGet ClipPut ConsoleRead ConsoleWrite ConsoleWriteError ControlClick ControlCommand ControlDisable ControlEnable ControlFocus ControlGetFocus ControlGetHandle ControlGetPos ControlGetText ControlHide ControlListView ControlMove ControlSend ControlSetText ControlShow ControlTreeView Cos Dec DirCopy DirCreate DirGetSize DirMove DirRemove DllCall DllCallAddress DllCallbackFree DllCallbackGetPtr DllCallbackRegister DllClose DllOpen DllStructCreate DllStructGetData DllStructGetPtr DllStructGetSize DllStructSetData DriveGetDrive DriveGetFileSystem DriveGetLabel DriveGetSerial DriveGetType DriveMapAdd DriveMapDel DriveMapGet DriveSetLabel DriveSpaceFree DriveSpaceTotal DriveStatus EnvGet EnvSet EnvUpdate Eval Execute Exp FileChangeDir FileClose FileCopy FileCreateNTFSLink FileCreateShortcut FileDelete FileExists FileFindFirstFile FileFindNextFile FileFlush FileGetAttrib FileGetEncoding FileGetLongName FileGetPos FileGetShortcut FileGetShortName FileGetSize FileGetTime FileGetVersion FileInstall FileMove FileOpen FileOpenDialog FileRead FileReadLine FileReadToArray FileRecycle FileRecycleEmpty FileSaveDialog FileSelectFolder FileSetAttrib FileSetEnd FileSetPos FileSetTime FileWrite FileWriteLine Floor FtpSetProxy FuncName GUICreate GUICtrlCreateAvi GUICtrlCreateButton GUICtrlCreateCheckbox GUICtrlCreateCombo GUICtrlCreateContextMenu GUICtrlCreateDate GUICtrlCreateDummy GUICtrlCreateEdit GUICtrlCreateGraphic GUICtrlCreateGroup GUICtrlCreateIcon GUICtrlCreateInput GUICtrlCreateLabel GUICtrlCreateList GUICtrlCreateListView GUICtrlCreateListViewItem GUICtrlCreateMenu GUICtrlCreateMenuItem GUICtrlCreateMonthCal GUICtrlCreateObj GUICtrlCreatePic GUICtrlCreateProgress GUICtrlCreateRadio GUICtrlCreateSlider GUICtrlCreateTab GUICtrlCreateTabItem GUICtrlCreateTreeView GUICtrlCreateTreeViewItem GUICtrlCreateUpdown GUICtrlDelete GUICtrlGetHandle GUICtrlGetState GUICtrlRead GUICtrlRecvMsg GUICtrlRegisterListViewSort GUICtrlSendMsg GUICtrlSendToDummy GUICtrlSetBkColor GUICtrlSetColor GUICtrlSetCursor GUICtrlSetData GUICtrlSetDefBkColor GUICtrlSetDefColor GUICtrlSetFont GUICtrlSetGraphic GUICtrlSetImage GUICtrlSetLimit GUICtrlSetOnEvent GUICtrlSetPos GUICtrlSetResizing GUICtrlSetState GUICtrlSetStyle GUICtrlSetTip GUIDelete GUIGetCursorInfo GUIGetMsg GUIGetStyle GUIRegisterMsg GUISetAccelerators GUISetBkColor GUISetCoord GUISetCursor GUISetFont GUISetHelp GUISetIcon GUISetOnEvent GUISetState GUISetStyle GUIStartGroup GUISwitch Hex HotKeySet HttpSetProxy HttpSetUserAgent HWnd InetClose InetGet InetGetInfo InetGetSize InetRead IniDelete IniRead IniReadSection IniReadSectionNames IniRenameSection IniWrite IniWriteSection InputBox Int IsAdmin IsArray IsBinary IsBool IsDeclared IsDllStruct IsFloat IsFunc IsHWnd IsInt IsKeyword IsNumber IsObj IsPtr IsString Log MemGetStats Mod MouseClick MouseClickDrag MouseDown MouseGetCursor MouseGetPos MouseMove MouseUp MouseWheel MsgBox Number ObjCreate ObjCreateInterface ObjEvent ObjGet ObjName OnAutoItExitRegister OnAutoItExitUnRegister Opt Ping PixelChecksum PixelGetColor PixelSearch ProcessClose ProcessExists ProcessGetStats ProcessList ProcessSetPriority ProcessWait ProcessWaitClose ProgressOff ProgressOn ProgressSet Ptr Random RegDelete RegEnumKey RegEnumVal RegRead RegWrite Round Run RunAs RunAsWait RunWait Send SendKeepActive SetError SetExtended ShellExecute ShellExecuteWait Shutdown Sin Sleep SoundPlay SoundSetWaveVolume SplashImageOn SplashOff SplashTextOn Sqrt SRandom StatusbarGetText StderrRead StdinWrite StdioClose StdoutRead String StringAddCR StringCompare StringFormat StringFromASCIIArray StringInStr StringIsAlNum StringIsAlpha StringIsASCII StringIsDigit StringIsFloat StringIsInt StringIsLower StringIsSpace StringIsUpper StringIsXDigit StringLeft StringLen StringLower StringMid StringRegExp StringRegExpReplace StringReplace StringReverse StringRight StringSplit StringStripCR StringStripWS StringToASCIIArray StringToBinary StringTrimLeft StringTrimRight StringUpper Tan TCPAccept TCPCloseSocket TCPConnect TCPListen TCPNameToIP TCPRecv TCPSend TCPShutdown TCPStartup TimerDiff TimerInit ToolTip TrayCreateItem TrayCreateMenu TrayGetMsg TrayItemDelete TrayItemGetHandle TrayItemGetState TrayItemGetText TrayItemSetOnEvent TrayItemSetState TrayItemSetText TraySetClick TraySetIcon TraySetOnEvent TraySetPauseIcon TraySetState TraySetToolTip TrayTip UBound UDPBind UDPCloseSocket UDPOpen UDPRecv UDPSend UDPShutdown UDPStartup VarGetType WinActivate WinActive WinClose WinExists WinFlash WinGetCaretPos WinGetClassList WinGetClientSize WinGetHandle WinGetPos WinGetProcess WinGetState WinGetText WinGetTitle WinKill WinList WinMenuSelectItem WinMinimizeAll WinMinimizeAllUndo WinMove WinSetOnTop WinSetState WinSetTitle WinSetTrans WinWait WinWaitActive WinWaitClose WinWaitNotActive Array1DToHistogram ArrayAdd ArrayBinarySearch ArrayColDelete ArrayColInsert ArrayCombinations ArrayConcatenate ArrayDelete ArrayDisplay ArrayExtract ArrayFindAll ArrayInsert ArrayMax ArrayMaxIndex ArrayMin ArrayMinIndex ArrayPermute ArrayPop ArrayPush ArrayReverse ArraySearch ArrayShuffle ArraySort ArraySwap ArrayToClip ArrayToString ArrayTranspose ArrayTrim ArrayUnique Assert ChooseColor ChooseFont ClipBoard_ChangeChain ClipBoard_Close ClipBoard_CountFormats ClipBoard_Empty ClipBoard_EnumFormats ClipBoard_FormatStr ClipBoard_GetData ClipBoard_GetDataEx ClipBoard_GetFormatName ClipBoard_GetOpenWindow ClipBoard_GetOwner ClipBoard_GetPriorityFormat ClipBoard_GetSequenceNumber ClipBoard_GetViewer ClipBoard_IsFormatAvailable ClipBoard_Open ClipBoard_RegisterFormat ClipBoard_SetData ClipBoard_SetDataEx ClipBoard_SetViewer ClipPutFile ColorConvertHSLtoRGB ColorConvertRGBtoHSL ColorGetBlue ColorGetCOLORREF ColorGetGreen ColorGetRed ColorGetRGB ColorSetCOLORREF ColorSetRGB Crypt_DecryptData Crypt_DecryptFile Crypt_DeriveKey Crypt_DestroyKey Crypt_EncryptData Crypt_EncryptFile Crypt_GenRandom Crypt_HashData Crypt_HashFile Crypt_Shutdown Crypt_Startup DateAdd DateDayOfWeek DateDaysInMonth DateDiff DateIsLeapYear DateIsValid DateTimeFormat DateTimeSplit DateToDayOfWeek DateToDayOfWeekISO DateToDayValue DateToMonth Date_Time_CompareFileTime Date_Time_DOSDateTimeToArray Date_Time_DOSDateTimeToFileTime Date_Time_DOSDateTimeToStr Date_Time_DOSDateToArray Date_Time_DOSDateToStr Date_Time_DOSTimeToArray Date_Time_DOSTimeToStr Date_Time_EncodeFileTime Date_Time_EncodeSystemTime Date_Time_FileTimeToArray Date_Time_FileTimeToDOSDateTime Date_Time_FileTimeToLocalFileTime Date_Time_FileTimeToStr Date_Time_FileTimeToSystemTime Date_Time_GetFileTime Date_Time_GetLocalTime Date_Time_GetSystemTime Date_Time_GetSystemTimeAdjustment Date_Time_GetSystemTimeAsFileTime Date_Time_GetSystemTimes Date_Time_GetTickCount Date_Time_GetTimeZoneInformation Date_Time_LocalFileTimeToFileTime Date_Time_SetFileTime Date_Time_SetLocalTime Date_Time_SetSystemTime Date_Time_SetSystemTimeAdjustment Date_Time_SetTimeZoneInformation Date_Time_SystemTimeToArray Date_Time_SystemTimeToDateStr Date_Time_SystemTimeToDateTimeStr Date_Time_SystemTimeToFileTime Date_Time_SystemTimeToTimeStr Date_Time_SystemTimeToTzSpecificLocalTime Date_Time_TzSpecificLocalTimeToSystemTime DayValueToDate DebugBugReportEnv DebugCOMError DebugOut DebugReport DebugReportEx DebugReportVar DebugSetup Degree EventLog__Backup EventLog__Clear EventLog__Close EventLog__Count EventLog__DeregisterSource EventLog__Full EventLog__Notify EventLog__Oldest EventLog__Open EventLog__OpenBackup EventLog__Read EventLog__RegisterSource EventLog__Report Excel_BookAttach Excel_BookClose Excel_BookList Excel_BookNew Excel_BookOpen Excel_BookOpenText Excel_BookSave Excel_BookSaveAs Excel_Close Excel_ColumnToLetter Excel_ColumnToNumber Excel_ConvertFormula Excel_Export Excel_FilterGet Excel_FilterSet Excel_Open Excel_PictureAdd Excel_Print Excel_RangeCopyPaste Excel_RangeDelete Excel_RangeFind Excel_RangeInsert Excel_RangeLinkAddRemove Excel_RangeRead Excel_RangeReplace Excel_RangeSort Excel_RangeValidate Excel_RangeWrite Excel_SheetAdd Excel_SheetCopyMove Excel_SheetDelete Excel_SheetList FileCountLines FileCreate FileListToArray FileListToArrayRec FilePrint FileReadToArray FileWriteFromArray FileWriteLog FileWriteToLine FTP_Close FTP_Command FTP_Connect FTP_DecodeInternetStatus FTP_DirCreate FTP_DirDelete FTP_DirGetCurrent FTP_DirPutContents FTP_DirSetCurrent FTP_FileClose FTP_FileDelete FTP_FileGet FTP_FileGetSize FTP_FileOpen FTP_FilePut FTP_FileRead FTP_FileRename FTP_FileTimeLoHiToStr FTP_FindFileClose FTP_FindFileFirst FTP_FindFileNext FTP_GetLastResponseInfo FTP_ListToArray FTP_ListToArray2D FTP_ListToArrayEx FTP_Open FTP_ProgressDownload FTP_ProgressUpload FTP_SetStatusCallback GDIPlus_ArrowCapCreate GDIPlus_ArrowCapDispose GDIPlus_ArrowCapGetFillState GDIPlus_ArrowCapGetHeight GDIPlus_ArrowCapGetMiddleInset GDIPlus_ArrowCapGetWidth GDIPlus_ArrowCapSetFillState GDIPlus_ArrowCapSetHeight GDIPlus_ArrowCapSetMiddleInset GDIPlus_ArrowCapSetWidth GDIPlus_BitmapApplyEffect GDIPlus_BitmapApplyEffectEx GDIPlus_BitmapCloneArea GDIPlus_BitmapConvertFormat GDIPlus_BitmapCreateApplyEffect GDIPlus_BitmapCreateApplyEffectEx GDIPlus_BitmapCreateDIBFromBitmap GDIPlus_BitmapCreateFromFile GDIPlus_BitmapCreateFromGraphics GDIPlus_BitmapCreateFromHBITMAP GDIPlus_BitmapCreateFromHICON GDIPlus_BitmapCreateFromHICON32 GDIPlus_BitmapCreateFromMemory GDIPlus_BitmapCreateFromResource GDIPlus_BitmapCreateFromScan0 GDIPlus_BitmapCreateFromStream GDIPlus_BitmapCreateHBITMAPFromBitmap GDIPlus_BitmapDispose GDIPlus_BitmapGetHistogram GDIPlus_BitmapGetHistogramEx GDIPlus_BitmapGetHistogramSize GDIPlus_BitmapGetPixel GDIPlus_BitmapLockBits GDIPlus_BitmapSetPixel GDIPlus_BitmapUnlockBits GDIPlus_BrushClone GDIPlus_BrushCreateSolid GDIPlus_BrushDispose GDIPlus_BrushGetSolidColor GDIPlus_BrushGetType GDIPlus_BrushSetSolidColor GDIPlus_ColorMatrixCreate GDIPlus_ColorMatrixCreateGrayScale GDIPlus_ColorMatrixCreateNegative GDIPlus_ColorMatrixCreateSaturation GDIPlus_ColorMatrixCreateScale GDIPlus_ColorMatrixCreateTranslate GDIPlus_CustomLineCapClone GDIPlus_CustomLineCapCreate GDIPlus_CustomLineCapDispose GDIPlus_CustomLineCapGetStrokeCaps GDIPlus_CustomLineCapSetStrokeCaps GDIPlus_Decoders GDIPlus_DecodersGetCount GDIPlus_DecodersGetSize GDIPlus_DrawImageFX GDIPlus_DrawImageFXEx GDIPlus_DrawImagePoints GDIPlus_EffectCreate GDIPlus_EffectCreateBlur GDIPlus_EffectCreateBrightnessContrast GDIPlus_EffectCreateColorBalance GDIPlus_EffectCreateColorCurve GDIPlus_EffectCreateColorLUT GDIPlus_EffectCreateColorMatrix GDIPlus_EffectCreateHueSaturationLightness GDIPlus_EffectCreateLevels GDIPlus_EffectCreateRedEyeCorrection GDIPlus_EffectCreateSharpen GDIPlus_EffectCreateTint GDIPlus_EffectDispose GDIPlus_EffectGetParameters GDIPlus_EffectSetParameters GDIPlus_Encoders GDIPlus_EncodersGetCLSID GDIPlus_EncodersGetCount GDIPlus_EncodersGetParamList GDIPlus_EncodersGetParamListSize GDIPlus_EncodersGetSize GDIPlus_FontCreate GDIPlus_FontDispose GDIPlus_FontFamilyCreate GDIPlus_FontFamilyCreateFromCollection GDIPlus_FontFamilyDispose GDIPlus_FontFamilyGetCellAscent GDIPlus_FontFamilyGetCellDescent GDIPlus_FontFamilyGetEmHeight GDIPlus_FontFamilyGetLineSpacing GDIPlus_FontGetHeight GDIPlus_FontPrivateAddFont GDIPlus_FontPrivateAddMemoryFont GDIPlus_FontPrivateCollectionDispose GDIPlus_FontPrivateCreateCollection GDIPlus_GraphicsClear GDIPlus_GraphicsCreateFromHDC GDIPlus_GraphicsCreateFromHWND GDIPlus_GraphicsDispose GDIPlus_GraphicsDrawArc GDIPlus_GraphicsDrawBezier GDIPlus_GraphicsDrawClosedCurve GDIPlus_GraphicsDrawClosedCurve2 GDIPlus_GraphicsDrawCurve GDIPlus_GraphicsDrawCurve2 GDIPlus_GraphicsDrawEllipse GDIPlus_GraphicsDrawImage GDIPlus_GraphicsDrawImagePointsRect GDIPlus_GraphicsDrawImageRect GDIPlus_GraphicsDrawImageRectRect GDIPlus_GraphicsDrawLine GDIPlus_GraphicsDrawPath GDIPlus_GraphicsDrawPie GDIPlus_GraphicsDrawPolygon GDIPlus_GraphicsDrawRect GDIPlus_GraphicsDrawString GDIPlus_GraphicsDrawStringEx GDIPlus_GraphicsFillClosedCurve GDIPlus_GraphicsFillClosedCurve2 GDIPlus_GraphicsFillEllipse GDIPlus_GraphicsFillPath GDIPlus_GraphicsFillPie GDIPlus_GraphicsFillPolygon GDIPlus_GraphicsFillRect GDIPlus_GraphicsFillRegion GDIPlus_GraphicsGetCompositingMode GDIPlus_GraphicsGetCompositingQuality GDIPlus_GraphicsGetDC GDIPlus_GraphicsGetInterpolationMode GDIPlus_GraphicsGetSmoothingMode GDIPlus_GraphicsGetTransform GDIPlus_GraphicsMeasureCharacterRanges GDIPlus_GraphicsMeasureString GDIPlus_GraphicsReleaseDC GDIPlus_GraphicsResetClip GDIPlus_GraphicsResetTransform GDIPlus_GraphicsRestore GDIPlus_GraphicsRotateTransform GDIPlus_GraphicsSave GDIPlus_GraphicsScaleTransform GDIPlus_GraphicsSetClipPath GDIPlus_GraphicsSetClipRect GDIPlus_GraphicsSetClipRegion GDIPlus_GraphicsSetCompositingMode GDIPlus_GraphicsSetCompositingQuality GDIPlus_GraphicsSetInterpolationMode GDIPlus_GraphicsSetPixelOffsetMode GDIPlus_GraphicsSetSmoothingMode GDIPlus_GraphicsSetTextRenderingHint GDIPlus_GraphicsSetTransform GDIPlus_GraphicsTransformPoints GDIPlus_GraphicsTranslateTransform GDIPlus_HatchBrushCreate GDIPlus_HICONCreateFromBitmap GDIPlus_ImageAttributesCreate GDIPlus_ImageAttributesDispose GDIPlus_ImageAttributesSetColorKeys GDIPlus_ImageAttributesSetColorMatrix GDIPlus_ImageDispose GDIPlus_ImageGetDimension GDIPlus_ImageGetFlags GDIPlus_ImageGetGraphicsContext GDIPlus_ImageGetHeight GDIPlus_ImageGetHorizontalResolution GDIPlus_ImageGetPixelFormat GDIPlus_ImageGetRawFormat GDIPlus_ImageGetThumbnail GDIPlus_ImageGetType GDIPlus_ImageGetVerticalResolution GDIPlus_ImageGetWidth GDIPlus_ImageLoadFromFile GDIPlus_ImageLoadFromStream GDIPlus_ImageResize GDIPlus_ImageRotateFlip GDIPlus_ImageSaveToFile GDIPlus_ImageSaveToFileEx GDIPlus_ImageSaveToStream GDIPlus_ImageScale GDIPlus_LineBrushCreate GDIPlus_LineBrushCreateFromRect GDIPlus_LineBrushCreateFromRectWithAngle GDIPlus_LineBrushGetColors GDIPlus_LineBrushGetRect GDIPlus_LineBrushMultiplyTransform GDIPlus_LineBrushResetTransform GDIPlus_LineBrushSetBlend GDIPlus_LineBrushSetColors GDIPlus_LineBrushSetGammaCorrection GDIPlus_LineBrushSetLinearBlend GDIPlus_LineBrushSetPresetBlend GDIPlus_LineBrushSetSigmaBlend GDIPlus_LineBrushSetTransform GDIPlus_MatrixClone GDIPlus_MatrixCreate GDIPlus_MatrixDispose GDIPlus_MatrixGetElements GDIPlus_MatrixInvert GDIPlus_MatrixMultiply GDIPlus_MatrixRotate GDIPlus_MatrixScale GDIPlus_MatrixSetElements GDIPlus_MatrixShear GDIPlus_MatrixTransformPoints GDIPlus_MatrixTranslate GDIPlus_PaletteInitialize GDIPlus_ParamAdd GDIPlus_ParamInit GDIPlus_ParamSize GDIPlus_PathAddArc GDIPlus_PathAddBezier GDIPlus_PathAddClosedCurve GDIPlus_PathAddClosedCurve2 GDIPlus_PathAddCurve GDIPlus_PathAddCurve2 GDIPlus_PathAddCurve3 GDIPlus_PathAddEllipse GDIPlus_PathAddLine GDIPlus_PathAddLine2 GDIPlus_PathAddPath GDIPlus_PathAddPie GDIPlus_PathAddPolygon GDIPlus_PathAddRectangle GDIPlus_PathAddString GDIPlus_PathBrushCreate GDIPlus_PathBrushCreateFromPath GDIPlus_PathBrushGetCenterPoint GDIPlus_PathBrushGetFocusScales GDIPlus_PathBrushGetPointCount GDIPlus_PathBrushGetRect GDIPlus_PathBrushGetWrapMode GDIPlus_PathBrushMultiplyTransform GDIPlus_PathBrushResetTransform GDIPlus_PathBrushSetBlend GDIPlus_PathBrushSetCenterColor GDIPlus_PathBrushSetCenterPoint GDIPlus_PathBrushSetFocusScales GDIPlus_PathBrushSetGammaCorrection GDIPlus_PathBrushSetLinearBlend GDIPlus_PathBrushSetPresetBlend GDIPlus_PathBrushSetSigmaBlend GDIPlus_PathBrushSetSurroundColor GDIPlus_PathBrushSetSurroundColorsWithCount GDIPlus_PathBrushSetTransform GDIPlus_PathBrushSetWrapMode GDIPlus_PathClone GDIPlus_PathCloseFigure GDIPlus_PathCreate GDIPlus_PathCreate2 GDIPlus_PathDispose GDIPlus_PathFlatten GDIPlus_PathGetData GDIPlus_PathGetFillMode GDIPlus_PathGetLastPoint GDIPlus_PathGetPointCount GDIPlus_PathGetPoints GDIPlus_PathGetWorldBounds GDIPlus_PathIsOutlineVisiblePoint GDIPlus_PathIsVisiblePoint GDIPlus_PathIterCreate GDIPlus_PathIterDispose GDIPlus_PathIterGetSubpathCount GDIPlus_PathIterNextMarkerPath GDIPlus_PathIterNextSubpathPath GDIPlus_PathIterRewind GDIPlus_PathReset GDIPlus_PathReverse GDIPlus_PathSetFillMode GDIPlus_PathSetMarker GDIPlus_PathStartFigure GDIPlus_PathTransform GDIPlus_PathWarp GDIPlus_PathWiden GDIPlus_PathWindingModeOutline GDIPlus_PenCreate GDIPlus_PenCreate2 GDIPlus_PenDispose GDIPlus_PenGetAlignment GDIPlus_PenGetColor GDIPlus_PenGetCustomEndCap GDIPlus_PenGetDashCap GDIPlus_PenGetDashStyle GDIPlus_PenGetEndCap GDIPlus_PenGetMiterLimit GDIPlus_PenGetWidth GDIPlus_PenSetAlignment GDIPlus_PenSetColor GDIPlus_PenSetCustomEndCap GDIPlus_PenSetDashCap GDIPlus_PenSetDashStyle GDIPlus_PenSetEndCap GDIPlus_PenSetLineCap GDIPlus_PenSetLineJoin GDIPlus_PenSetMiterLimit GDIPlus_PenSetStartCap GDIPlus_PenSetWidth GDIPlus_RectFCreate GDIPlus_RegionClone GDIPlus_RegionCombinePath GDIPlus_RegionCombineRect GDIPlus_RegionCombineRegion GDIPlus_RegionCreate GDIPlus_RegionCreateFromPath GDIPlus_RegionCreateFromRect GDIPlus_RegionDispose GDIPlus_RegionGetBounds GDIPlus_RegionGetHRgn GDIPlus_RegionTransform GDIPlus_RegionTranslate GDIPlus_Shutdown GDIPlus_Startup GDIPlus_StringFormatCreate GDIPlus_StringFormatDispose GDIPlus_StringFormatGetMeasurableCharacterRangeCount GDIPlus_StringFormatSetAlign GDIPlus_StringFormatSetLineAlign GDIPlus_StringFormatSetMeasurableCharacterRanges GDIPlus_TextureCreate GDIPlus_TextureCreate2 GDIPlus_TextureCreateIA GetIP GUICtrlAVI_Close GUICtrlAVI_Create GUICtrlAVI_Destroy GUICtrlAVI_IsPlaying GUICtrlAVI_Open GUICtrlAVI_OpenEx GUICtrlAVI_Play GUICtrlAVI_Seek GUICtrlAVI_Show GUICtrlAVI_Stop GUICtrlButton_Click GUICtrlButton_Create GUICtrlButton_Destroy GUICtrlButton_Enable GUICtrlButton_GetCheck GUICtrlButton_GetFocus GUICtrlButton_GetIdealSize GUICtrlButton_GetImage GUICtrlButton_GetImageList GUICtrlButton_GetNote GUICtrlButton_GetNoteLength GUICtrlButton_GetSplitInfo GUICtrlButton_GetState GUICtrlButton_GetText GUICtrlButton_GetTextMargin GUICtrlButton_SetCheck GUICtrlButton_SetDontClick GUICtrlButton_SetFocus GUICtrlButton_SetImage GUICtrlButton_SetImageList GUICtrlButton_SetNote GUICtrlButton_SetShield GUICtrlButton_SetSize GUICtrlButton_SetSplitInfo GUICtrlButton_SetState GUICtrlButton_SetStyle GUICtrlButton_SetText GUICtrlButton_SetTextMargin GUICtrlButton_Show GUICtrlComboBoxEx_AddDir GUICtrlComboBoxEx_AddString GUICtrlComboBoxEx_BeginUpdate GUICtrlComboBoxEx_Create GUICtrlComboBoxEx_CreateSolidBitMap GUICtrlComboBoxEx_DeleteString GUICtrlComboBoxEx_Destroy GUICtrlComboBoxEx_EndUpdate GUICtrlComboBoxEx_FindStringExact GUICtrlComboBoxEx_GetComboBoxInfo GUICtrlComboBoxEx_GetComboControl GUICtrlComboBoxEx_GetCount GUICtrlComboBoxEx_GetCurSel GUICtrlComboBoxEx_GetDroppedControlRect GUICtrlComboBoxEx_GetDroppedControlRectEx GUICtrlComboBoxEx_GetDroppedState GUICtrlComboBoxEx_GetDroppedWidth GUICtrlComboBoxEx_GetEditControl GUICtrlComboBoxEx_GetEditSel GUICtrlComboBoxEx_GetEditText GUICtrlComboBoxEx_GetExtendedStyle GUICtrlComboBoxEx_GetExtendedUI GUICtrlComboBoxEx_GetImageList GUICtrlComboBoxEx_GetItem GUICtrlComboBoxEx_GetItemEx GUICtrlComboBoxEx_GetItemHeight GUICtrlComboBoxEx_GetItemImage GUICtrlComboBoxEx_GetItemIndent GUICtrlComboBoxEx_GetItemOverlayImage GUICtrlComboBoxEx_GetItemParam GUICtrlComboBoxEx_GetItemSelectedImage GUICtrlComboBoxEx_GetItemText GUICtrlComboBoxEx_GetItemTextLen GUICtrlComboBoxEx_GetList GUICtrlComboBoxEx_GetListArray GUICtrlComboBoxEx_GetLocale GUICtrlComboBoxEx_GetLocaleCountry GUICtrlComboBoxEx_GetLocaleLang GUICtrlComboBoxEx_GetLocalePrimLang GUICtrlComboBoxEx_GetLocaleSubLang GUICtrlComboBoxEx_GetMinVisible GUICtrlComboBoxEx_GetTopIndex GUICtrlComboBoxEx_GetUnicode GUICtrlComboBoxEx_InitStorage GUICtrlComboBoxEx_InsertString GUICtrlComboBoxEx_LimitText GUICtrlComboBoxEx_ReplaceEditSel GUICtrlComboBoxEx_ResetContent GUICtrlComboBoxEx_SetCurSel GUICtrlComboBoxEx_SetDroppedWidth GUICtrlComboBoxEx_SetEditSel GUICtrlComboBoxEx_SetEditText GUICtrlComboBoxEx_SetExtendedStyle GUICtrlComboBoxEx_SetExtendedUI GUICtrlComboBoxEx_SetImageList GUICtrlComboBoxEx_SetItem GUICtrlComboBoxEx_SetItemEx GUICtrlComboBoxEx_SetItemHeight GUICtrlComboBoxEx_SetItemImage GUICtrlComboBoxEx_SetItemIndent GUICtrlComboBoxEx_SetItemOverlayImage GUICtrlComboBoxEx_SetItemParam GUICtrlComboBoxEx_SetItemSelectedImage GUICtrlComboBoxEx_SetMinVisible GUICtrlComboBoxEx_SetTopIndex GUICtrlComboBoxEx_SetUnicode GUICtrlComboBoxEx_ShowDropDown GUICtrlComboBox_AddDir GUICtrlComboBox_AddString GUICtrlComboBox_AutoComplete GUICtrlComboBox_BeginUpdate GUICtrlComboBox_Create GUICtrlComboBox_DeleteString GUICtrlComboBox_Destroy GUICtrlComboBox_EndUpdate GUICtrlComboBox_FindString GUICtrlComboBox_FindStringExact GUICtrlComboBox_GetComboBoxInfo GUICtrlComboBox_GetCount GUICtrlComboBox_GetCueBanner GUICtrlComboBox_GetCurSel GUICtrlComboBox_GetDroppedControlRect GUICtrlComboBox_GetDroppedControlRectEx GUICtrlComboBox_GetDroppedState GUICtrlComboBox_GetDroppedWidth GUICtrlComboBox_GetEditSel GUICtrlComboBox_GetEditText GUICtrlComboBox_GetExtendedUI GUICtrlComboBox_GetHorizontalExtent GUICtrlComboBox_GetItemHeight GUICtrlComboBox_GetLBText GUICtrlComboBox_GetLBTextLen GUICtrlComboBox_GetList GUICtrlComboBox_GetListArray GUICtrlComboBox_GetLocale GUICtrlComboBox_GetLocaleCountry GUICtrlComboBox_GetLocaleLang GUICtrlComboBox_GetLocalePrimLang GUICtrlComboBox_GetLocaleSubLang GUICtrlComboBox_GetMinVisible GUICtrlComboBox_GetTopIndex GUICtrlComboBox_InitStorage GUICtrlComboBox_InsertString GUICtrlComboBox_LimitText GUICtrlComboBox_ReplaceEditSel GUICtrlComboBox_ResetContent GUICtrlComboBox_SelectString GUICtrlComboBox_SetCueBanner GUICtrlComboBox_SetCurSel GUICtrlComboBox_SetDroppedWidth GUICtrlComboBox_SetEditSel GUICtrlComboBox_SetEditText GUICtrlComboBox_SetExtendedUI GUICtrlComboBox_SetHorizontalExtent GUICtrlComboBox_SetItemHeight GUICtrlComboBox_SetMinVisible GUICtrlComboBox_SetTopIndex GUICtrlComboBox_ShowDropDown GUICtrlDTP_Create GUICtrlDTP_Destroy GUICtrlDTP_GetMCColor GUICtrlDTP_GetMCFont GUICtrlDTP_GetMonthCal GUICtrlDTP_GetRange GUICtrlDTP_GetRangeEx GUICtrlDTP_GetSystemTime GUICtrlDTP_GetSystemTimeEx GUICtrlDTP_SetFormat GUICtrlDTP_SetMCColor GUICtrlDTP_SetMCFont GUICtrlDTP_SetRange GUICtrlDTP_SetRangeEx GUICtrlDTP_SetSystemTime GUICtrlDTP_SetSystemTimeEx GUICtrlEdit_AppendText GUICtrlEdit_BeginUpdate GUICtrlEdit_CanUndo GUICtrlEdit_CharFromPos GUICtrlEdit_Create GUICtrlEdit_Destroy GUICtrlEdit_EmptyUndoBuffer GUICtrlEdit_EndUpdate GUICtrlEdit_Find GUICtrlEdit_FmtLines GUICtrlEdit_GetCueBanner GUICtrlEdit_GetFirstVisibleLine GUICtrlEdit_GetLimitText GUICtrlEdit_GetLine GUICtrlEdit_GetLineCount GUICtrlEdit_GetMargins GUICtrlEdit_GetModify GUICtrlEdit_GetPasswordChar GUICtrlEdit_GetRECT GUICtrlEdit_GetRECTEx GUICtrlEdit_GetSel GUICtrlEdit_GetText GUICtrlEdit_GetTextLen GUICtrlEdit_HideBalloonTip GUICtrlEdit_InsertText GUICtrlEdit_LineFromChar GUICtrlEdit_LineIndex GUICtrlEdit_LineLength GUICtrlEdit_LineScroll GUICtrlEdit_PosFromChar GUICtrlEdit_ReplaceSel GUICtrlEdit_Scroll GUICtrlEdit_SetCueBanner GUICtrlEdit_SetLimitText GUICtrlEdit_SetMargins GUICtrlEdit_SetModify GUICtrlEdit_SetPasswordChar GUICtrlEdit_SetReadOnly GUICtrlEdit_SetRECT GUICtrlEdit_SetRECTEx GUICtrlEdit_SetRECTNP GUICtrlEdit_SetRectNPEx GUICtrlEdit_SetSel GUICtrlEdit_SetTabStops GUICtrlEdit_SetText GUICtrlEdit_ShowBalloonTip GUICtrlEdit_Undo GUICtrlHeader_AddItem GUICtrlHeader_ClearFilter GUICtrlHeader_ClearFilterAll GUICtrlHeader_Create GUICtrlHeader_CreateDragImage GUICtrlHeader_DeleteItem GUICtrlHeader_Destroy GUICtrlHeader_EditFilter GUICtrlHeader_GetBitmapMargin GUICtrlHeader_GetImageList GUICtrlHeader_GetItem GUICtrlHeader_GetItemAlign GUICtrlHeader_GetItemBitmap GUICtrlHeader_GetItemCount GUICtrlHeader_GetItemDisplay GUICtrlHeader_GetItemFlags GUICtrlHeader_GetItemFormat GUICtrlHeader_GetItemImage GUICtrlHeader_GetItemOrder GUICtrlHeader_GetItemParam GUICtrlHeader_GetItemRect GUICtrlHeader_GetItemRectEx GUICtrlHeader_GetItemText GUICtrlHeader_GetItemWidth GUICtrlHeader_GetOrderArray GUICtrlHeader_GetUnicodeFormat GUICtrlHeader_HitTest GUICtrlHeader_InsertItem GUICtrlHeader_Layout GUICtrlHeader_OrderToIndex GUICtrlHeader_SetBitmapMargin GUICtrlHeader_SetFilterChangeTimeout GUICtrlHeader_SetHotDivider GUICtrlHeader_SetImageList GUICtrlHeader_SetItem GUICtrlHeader_SetItemAlign GUICtrlHeader_SetItemBitmap GUICtrlHeader_SetItemDisplay GUICtrlHeader_SetItemFlags GUICtrlHeader_SetItemFormat GUICtrlHeader_SetItemImage GUICtrlHeader_SetItemOrder GUICtrlHeader_SetItemParam GUICtrlHeader_SetItemText GUICtrlHeader_SetItemWidth GUICtrlHeader_SetOrderArray GUICtrlHeader_SetUnicodeFormat GUICtrlIpAddress_ClearAddress GUICtrlIpAddress_Create GUICtrlIpAddress_Destroy GUICtrlIpAddress_Get GUICtrlIpAddress_GetArray GUICtrlIpAddress_GetEx GUICtrlIpAddress_IsBlank GUICtrlIpAddress_Set GUICtrlIpAddress_SetArray GUICtrlIpAddress_SetEx GUICtrlIpAddress_SetFocus GUICtrlIpAddress_SetFont GUICtrlIpAddress_SetRange GUICtrlIpAddress_ShowHide GUICtrlListBox_AddFile GUICtrlListBox_AddString GUICtrlListBox_BeginUpdate GUICtrlListBox_ClickItem GUICtrlListBox_Create GUICtrlListBox_DeleteString GUICtrlListBox_Destroy GUICtrlListBox_Dir GUICtrlListBox_EndUpdate GUICtrlListBox_FindInText GUICtrlListBox_FindString GUICtrlListBox_GetAnchorIndex GUICtrlListBox_GetCaretIndex GUICtrlListBox_GetCount GUICtrlListBox_GetCurSel GUICtrlListBox_GetHorizontalExtent GUICtrlListBox_GetItemData GUICtrlListBox_GetItemHeight GUICtrlListBox_GetItemRect GUICtrlListBox_GetItemRectEx GUICtrlListBox_GetListBoxInfo GUICtrlListBox_GetLocale GUICtrlListBox_GetLocaleCountry GUICtrlListBox_GetLocaleLang GUICtrlListBox_GetLocalePrimLang GUICtrlListBox_GetLocaleSubLang GUICtrlListBox_GetSel GUICtrlListBox_GetSelCount GUICtrlListBox_GetSelItems GUICtrlListBox_GetSelItemsText GUICtrlListBox_GetText GUICtrlListBox_GetTextLen GUICtrlListBox_GetTopIndex GUICtrlListBox_InitStorage GUICtrlListBox_InsertString GUICtrlListBox_ItemFromPoint GUICtrlListBox_ReplaceString GUICtrlListBox_ResetContent GUICtrlListBox_SelectString GUICtrlListBox_SelItemRange GUICtrlListBox_SelItemRangeEx GUICtrlListBox_SetAnchorIndex GUICtrlListBox_SetCaretIndex GUICtrlListBox_SetColumnWidth GUICtrlListBox_SetCurSel GUICtrlListBox_SetHorizontalExtent GUICtrlListBox_SetItemData GUICtrlListBox_SetItemHeight GUICtrlListBox_SetLocale GUICtrlListBox_SetSel GUICtrlListBox_SetTabStops GUICtrlListBox_SetTopIndex GUICtrlListBox_Sort GUICtrlListBox_SwapString GUICtrlListBox_UpdateHScroll GUICtrlListView_AddArray GUICtrlListView_AddColumn GUICtrlListView_AddItem GUICtrlListView_AddSubItem GUICtrlListView_ApproximateViewHeight GUICtrlListView_ApproximateViewRect GUICtrlListView_ApproximateViewWidth GUICtrlListView_Arrange GUICtrlListView_BeginUpdate GUICtrlListView_CancelEditLabel GUICtrlListView_ClickItem GUICtrlListView_CopyItems GUICtrlListView_Create GUICtrlListView_CreateDragImage GUICtrlListView_CreateSolidBitMap GUICtrlListView_DeleteAllItems GUICtrlListView_DeleteColumn GUICtrlListView_DeleteItem GUICtrlListView_DeleteItemsSelected GUICtrlListView_Destroy GUICtrlListView_DrawDragImage GUICtrlListView_EditLabel GUICtrlListView_EnableGroupView GUICtrlListView_EndUpdate GUICtrlListView_EnsureVisible GUICtrlListView_FindInText GUICtrlListView_FindItem GUICtrlListView_FindNearest GUICtrlListView_FindParam GUICtrlListView_FindText GUICtrlListView_GetBkColor GUICtrlListView_GetBkImage GUICtrlListView_GetCallbackMask GUICtrlListView_GetColumn GUICtrlListView_GetColumnCount GUICtrlListView_GetColumnOrder GUICtrlListView_GetColumnOrderArray GUICtrlListView_GetColumnWidth GUICtrlListView_GetCounterPage GUICtrlListView_GetEditControl GUICtrlListView_GetExtendedListViewStyle GUICtrlListView_GetFocusedGroup GUICtrlListView_GetGroupCount GUICtrlListView_GetGroupInfo GUICtrlListView_GetGroupInfoByIndex GUICtrlListView_GetGroupRect GUICtrlListView_GetGroupViewEnabled GUICtrlListView_GetHeader GUICtrlListView_GetHotCursor GUICtrlListView_GetHotItem GUICtrlListView_GetHoverTime GUICtrlListView_GetImageList GUICtrlListView_GetISearchString GUICtrlListView_GetItem GUICtrlListView_GetItemChecked GUICtrlListView_GetItemCount GUICtrlListView_GetItemCut GUICtrlListView_GetItemDropHilited GUICtrlListView_GetItemEx GUICtrlListView_GetItemFocused GUICtrlListView_GetItemGroupID GUICtrlListView_GetItemImage GUICtrlListView_GetItemIndent GUICtrlListView_GetItemParam GUICtrlListView_GetItemPosition GUICtrlListView_GetItemPositionX GUICtrlListView_GetItemPositionY GUICtrlListView_GetItemRect GUICtrlListView_GetItemRectEx GUICtrlListView_GetItemSelected GUICtrlListView_GetItemSpacing GUICtrlListView_GetItemSpacingX GUICtrlListView_GetItemSpacingY GUICtrlListView_GetItemState GUICtrlListView_GetItemStateImage GUICtrlListView_GetItemText GUICtrlListView_GetItemTextArray GUICtrlListView_GetItemTextString GUICtrlListView_GetNextItem GUICtrlListView_GetNumberOfWorkAreas GUICtrlListView_GetOrigin GUICtrlListView_GetOriginX GUICtrlListView_GetOriginY GUICtrlListView_GetOutlineColor GUICtrlListView_GetSelectedColumn GUICtrlListView_GetSelectedCount GUICtrlListView_GetSelectedIndices GUICtrlListView_GetSelectionMark GUICtrlListView_GetStringWidth GUICtrlListView_GetSubItemRect GUICtrlListView_GetTextBkColor GUICtrlListView_GetTextColor GUICtrlListView_GetToolTips GUICtrlListView_GetTopIndex GUICtrlListView_GetUnicodeFormat GUICtrlListView_GetView GUICtrlListView_GetViewDetails GUICtrlListView_GetViewLarge GUICtrlListView_GetViewList GUICtrlListView_GetViewRect GUICtrlListView_GetViewSmall GUICtrlListView_GetViewTile GUICtrlListView_HideColumn GUICtrlListView_HitTest GUICtrlListView_InsertColumn GUICtrlListView_InsertGroup GUICtrlListView_InsertItem GUICtrlListView_JustifyColumn GUICtrlListView_MapIDToIndex GUICtrlListView_MapIndexToID GUICtrlListView_RedrawItems GUICtrlListView_RegisterSortCallBack GUICtrlListView_RemoveAllGroups GUICtrlListView_RemoveGroup GUICtrlListView_Scroll GUICtrlListView_SetBkColor GUICtrlListView_SetBkImage GUICtrlListView_SetCallBackMask GUICtrlListView_SetColumn GUICtrlListView_SetColumnOrder GUICtrlListView_SetColumnOrderArray GUICtrlListView_SetColumnWidth GUICtrlListView_SetExtendedListViewStyle GUICtrlListView_SetGroupInfo GUICtrlListView_SetHotItem GUICtrlListView_SetHoverTime GUICtrlListView_SetIconSpacing GUICtrlListView_SetImageList GUICtrlListView_SetItem GUICtrlListView_SetItemChecked GUICtrlListView_SetItemCount GUICtrlListView_SetItemCut GUICtrlListView_SetItemDropHilited GUICtrlListView_SetItemEx GUICtrlListView_SetItemFocused GUICtrlListView_SetItemGroupID GUICtrlListView_SetItemImage GUICtrlListView_SetItemIndent GUICtrlListView_SetItemParam GUICtrlListView_SetItemPosition GUICtrlListView_SetItemPosition32 GUICtrlListView_SetItemSelected GUICtrlListView_SetItemState GUICtrlListView_SetItemStateImage GUICtrlListView_SetItemText GUICtrlListView_SetOutlineColor GUICtrlListView_SetSelectedColumn GUICtrlListView_SetSelectionMark GUICtrlListView_SetTextBkColor GUICtrlListView_SetTextColor GUICtrlListView_SetToolTips GUICtrlListView_SetUnicodeFormat GUICtrlListView_SetView GUICtrlListView_SetWorkAreas GUICtrlListView_SimpleSort GUICtrlListView_SortItems GUICtrlListView_SubItemHitTest GUICtrlListView_UnRegisterSortCallBack GUICtrlMenu_AddMenuItem GUICtrlMenu_AppendMenu GUICtrlMenu_CalculatePopupWindowPosition GUICtrlMenu_CheckMenuItem GUICtrlMenu_CheckRadioItem GUICtrlMenu_CreateMenu GUICtrlMenu_CreatePopup GUICtrlMenu_DeleteMenu GUICtrlMenu_DestroyMenu GUICtrlMenu_DrawMenuBar GUICtrlMenu_EnableMenuItem GUICtrlMenu_FindItem GUICtrlMenu_FindParent GUICtrlMenu_GetItemBmp GUICtrlMenu_GetItemBmpChecked GUICtrlMenu_GetItemBmpUnchecked GUICtrlMenu_GetItemChecked GUICtrlMenu_GetItemCount GUICtrlMenu_GetItemData GUICtrlMenu_GetItemDefault GUICtrlMenu_GetItemDisabled GUICtrlMenu_GetItemEnabled GUICtrlMenu_GetItemGrayed GUICtrlMenu_GetItemHighlighted GUICtrlMenu_GetItemID GUICtrlMenu_GetItemInfo GUICtrlMenu_GetItemRect GUICtrlMenu_GetItemRectEx GUICtrlMenu_GetItemState GUICtrlMenu_GetItemStateEx GUICtrlMenu_GetItemSubMenu GUICtrlMenu_GetItemText GUICtrlMenu_GetItemType GUICtrlMenu_GetMenu GUICtrlMenu_GetMenuBackground GUICtrlMenu_GetMenuBarInfo GUICtrlMenu_GetMenuContextHelpID GUICtrlMenu_GetMenuData GUICtrlMenu_GetMenuDefaultItem GUICtrlMenu_GetMenuHeight GUICtrlMenu_GetMenuInfo GUICtrlMenu_GetMenuStyle GUICtrlMenu_GetSystemMenu GUICtrlMenu_InsertMenuItem GUICtrlMenu_InsertMenuItemEx GUICtrlMenu_IsMenu GUICtrlMenu_LoadMenu GUICtrlMenu_MapAccelerator GUICtrlMenu_MenuItemFromPoint GUICtrlMenu_RemoveMenu GUICtrlMenu_SetItemBitmaps GUICtrlMenu_SetItemBmp GUICtrlMenu_SetItemBmpChecked GUICtrlMenu_SetItemBmpUnchecked GUICtrlMenu_SetItemChecked GUICtrlMenu_SetItemData GUICtrlMenu_SetItemDefault GUICtrlMenu_SetItemDisabled GUICtrlMenu_SetItemEnabled GUICtrlMenu_SetItemGrayed GUICtrlMenu_SetItemHighlighted GUICtrlMenu_SetItemID GUICtrlMenu_SetItemInfo GUICtrlMenu_SetItemState GUICtrlMenu_SetItemSubMenu GUICtrlMenu_SetItemText GUICtrlMenu_SetItemType GUICtrlMenu_SetMenu GUICtrlMenu_SetMenuBackground GUICtrlMenu_SetMenuContextHelpID GUICtrlMenu_SetMenuData GUICtrlMenu_SetMenuDefaultItem GUICtrlMenu_SetMenuHeight GUICtrlMenu_SetMenuInfo GUICtrlMenu_SetMenuStyle GUICtrlMenu_TrackPopupMenu GUICtrlMonthCal_Create GUICtrlMonthCal_Destroy GUICtrlMonthCal_GetCalendarBorder GUICtrlMonthCal_GetCalendarCount GUICtrlMonthCal_GetColor GUICtrlMonthCal_GetColorArray GUICtrlMonthCal_GetCurSel GUICtrlMonthCal_GetCurSelStr GUICtrlMonthCal_GetFirstDOW GUICtrlMonthCal_GetFirstDOWStr GUICtrlMonthCal_GetMaxSelCount GUICtrlMonthCal_GetMaxTodayWidth GUICtrlMonthCal_GetMinReqHeight GUICtrlMonthCal_GetMinReqRect GUICtrlMonthCal_GetMinReqRectArray GUICtrlMonthCal_GetMinReqWidth GUICtrlMonthCal_GetMonthDelta GUICtrlMonthCal_GetMonthRange GUICtrlMonthCal_GetMonthRangeMax GUICtrlMonthCal_GetMonthRangeMaxStr GUICtrlMonthCal_GetMonthRangeMin GUICtrlMonthCal_GetMonthRangeMinStr GUICtrlMonthCal_GetMonthRangeSpan GUICtrlMonthCal_GetRange GUICtrlMonthCal_GetRangeMax GUICtrlMonthCal_GetRangeMaxStr GUICtrlMonthCal_GetRangeMin GUICtrlMonthCal_GetRangeMinStr GUICtrlMonthCal_GetSelRange GUICtrlMonthCal_GetSelRangeMax GUICtrlMonthCal_GetSelRangeMaxStr GUICtrlMonthCal_GetSelRangeMin GUICtrlMonthCal_GetSelRangeMinStr GUICtrlMonthCal_GetToday GUICtrlMonthCal_GetTodayStr GUICtrlMonthCal_GetUnicodeFormat GUICtrlMonthCal_HitTest GUICtrlMonthCal_SetCalendarBorder GUICtrlMonthCal_SetColor GUICtrlMonthCal_SetCurSel GUICtrlMonthCal_SetDayState GUICtrlMonthCal_SetFirstDOW GUICtrlMonthCal_SetMaxSelCount GUICtrlMonthCal_SetMonthDelta GUICtrlMonthCal_SetRange GUICtrlMonthCal_SetSelRange GUICtrlMonthCal_SetToday GUICtrlMonthCal_SetUnicodeFormat GUICtrlRebar_AddBand GUICtrlRebar_AddToolBarBand GUICtrlRebar_BeginDrag GUICtrlRebar_Create GUICtrlRebar_DeleteBand GUICtrlRebar_Destroy GUICtrlRebar_DragMove GUICtrlRebar_EndDrag GUICtrlRebar_GetBandBackColor GUICtrlRebar_GetBandBorders GUICtrlRebar_GetBandBordersEx GUICtrlRebar_GetBandChildHandle GUICtrlRebar_GetBandChildSize GUICtrlRebar_GetBandCount GUICtrlRebar_GetBandForeColor GUICtrlRebar_GetBandHeaderSize GUICtrlRebar_GetBandID GUICtrlRebar_GetBandIdealSize GUICtrlRebar_GetBandLength GUICtrlRebar_GetBandLParam GUICtrlRebar_GetBandMargins GUICtrlRebar_GetBandMarginsEx GUICtrlRebar_GetBandRect GUICtrlRebar_GetBandRectEx GUICtrlRebar_GetBandStyle GUICtrlRebar_GetBandStyleBreak GUICtrlRebar_GetBandStyleChildEdge GUICtrlRebar_GetBandStyleFixedBMP GUICtrlRebar_GetBandStyleFixedSize GUICtrlRebar_GetBandStyleGripperAlways GUICtrlRebar_GetBandStyleHidden GUICtrlRebar_GetBandStyleHideTitle GUICtrlRebar_GetBandStyleNoGripper GUICtrlRebar_GetBandStyleTopAlign GUICtrlRebar_GetBandStyleUseChevron GUICtrlRebar_GetBandStyleVariableHeight GUICtrlRebar_GetBandText GUICtrlRebar_GetBarHeight GUICtrlRebar_GetBarInfo GUICtrlRebar_GetBKColor GUICtrlRebar_GetColorScheme GUICtrlRebar_GetRowCount GUICtrlRebar_GetRowHeight GUICtrlRebar_GetTextColor GUICtrlRebar_GetToolTips GUICtrlRebar_GetUnicodeFormat GUICtrlRebar_HitTest GUICtrlRebar_IDToIndex GUICtrlRebar_MaximizeBand GUICtrlRebar_MinimizeBand GUICtrlRebar_MoveBand GUICtrlRebar_SetBandBackColor GUICtrlRebar_SetBandForeColor GUICtrlRebar_SetBandHeaderSize GUICtrlRebar_SetBandID GUICtrlRebar_SetBandIdealSize GUICtrlRebar_SetBandLength GUICtrlRebar_SetBandLParam GUICtrlRebar_SetBandStyle GUICtrlRebar_SetBandStyleBreak GUICtrlRebar_SetBandStyleChildEdge GUICtrlRebar_SetBandStyleFixedBMP GUICtrlRebar_SetBandStyleFixedSize GUICtrlRebar_SetBandStyleGripperAlways GUICtrlRebar_SetBandStyleHidden GUICtrlRebar_SetBandStyleHideTitle GUICtrlRebar_SetBandStyleNoGripper GUICtrlRebar_SetBandStyleTopAlign GUICtrlRebar_SetBandStyleUseChevron GUICtrlRebar_SetBandStyleVariableHeight GUICtrlRebar_SetBandText GUICtrlRebar_SetBarInfo GUICtrlRebar_SetBKColor GUICtrlRebar_SetColorScheme GUICtrlRebar_SetTextColor GUICtrlRebar_SetToolTips GUICtrlRebar_SetUnicodeFormat GUICtrlRebar_ShowBand GUICtrlRichEdit_AppendText GUICtrlRichEdit_AutoDetectURL GUICtrlRichEdit_CanPaste GUICtrlRichEdit_CanPasteSpecial GUICtrlRichEdit_CanRedo GUICtrlRichEdit_CanUndo GUICtrlRichEdit_ChangeFontSize GUICtrlRichEdit_Copy GUICtrlRichEdit_Create GUICtrlRichEdit_Cut GUICtrlRichEdit_Deselect GUICtrlRichEdit_Destroy GUICtrlRichEdit_EmptyUndoBuffer GUICtrlRichEdit_FindText GUICtrlRichEdit_FindTextInRange GUICtrlRichEdit_GetBkColor GUICtrlRichEdit_GetCharAttributes GUICtrlRichEdit_GetCharBkColor GUICtrlRichEdit_GetCharColor GUICtrlRichEdit_GetCharPosFromXY GUICtrlRichEdit_GetCharPosOfNextWord GUICtrlRichEdit_GetCharPosOfPreviousWord GUICtrlRichEdit_GetCharWordBreakInfo GUICtrlRichEdit_GetFirstCharPosOnLine GUICtrlRichEdit_GetFont GUICtrlRichEdit_GetLineCount GUICtrlRichEdit_GetLineLength GUICtrlRichEdit_GetLineNumberFromCharPos GUICtrlRichEdit_GetNextRedo GUICtrlRichEdit_GetNextUndo GUICtrlRichEdit_GetNumberOfFirstVisibleLine GUICtrlRichEdit_GetParaAlignment GUICtrlRichEdit_GetParaAttributes GUICtrlRichEdit_GetParaBorder GUICtrlRichEdit_GetParaIndents GUICtrlRichEdit_GetParaNumbering GUICtrlRichEdit_GetParaShading GUICtrlRichEdit_GetParaSpacing GUICtrlRichEdit_GetParaTabStops GUICtrlRichEdit_GetPasswordChar GUICtrlRichEdit_GetRECT GUICtrlRichEdit_GetScrollPos GUICtrlRichEdit_GetSel GUICtrlRichEdit_GetSelAA GUICtrlRichEdit_GetSelText GUICtrlRichEdit_GetSpaceUnit GUICtrlRichEdit_GetText GUICtrlRichEdit_GetTextInLine GUICtrlRichEdit_GetTextInRange GUICtrlRichEdit_GetTextLength GUICtrlRichEdit_GetVersion GUICtrlRichEdit_GetXYFromCharPos GUICtrlRichEdit_GetZoom GUICtrlRichEdit_GotoCharPos GUICtrlRichEdit_HideSelection GUICtrlRichEdit_InsertText GUICtrlRichEdit_IsModified GUICtrlRichEdit_IsTextSelected GUICtrlRichEdit_Paste GUICtrlRichEdit_PasteSpecial GUICtrlRichEdit_PauseRedraw GUICtrlRichEdit_Redo GUICtrlRichEdit_ReplaceText GUICtrlRichEdit_ResumeRedraw GUICtrlRichEdit_ScrollLineOrPage GUICtrlRichEdit_ScrollLines GUICtrlRichEdit_ScrollToCaret GUICtrlRichEdit_SetBkColor GUICtrlRichEdit_SetCharAttributes GUICtrlRichEdit_SetCharBkColor GUICtrlRichEdit_SetCharColor GUICtrlRichEdit_SetEventMask GUICtrlRichEdit_SetFont GUICtrlRichEdit_SetLimitOnText GUICtrlRichEdit_SetModified GUICtrlRichEdit_SetParaAlignment GUICtrlRichEdit_SetParaAttributes GUICtrlRichEdit_SetParaBorder GUICtrlRichEdit_SetParaIndents GUICtrlRichEdit_SetParaNumbering GUICtrlRichEdit_SetParaShading GUICtrlRichEdit_SetParaSpacing GUICtrlRichEdit_SetParaTabStops GUICtrlRichEdit_SetPasswordChar GUICtrlRichEdit_SetReadOnly GUICtrlRichEdit_SetRECT GUICtrlRichEdit_SetScrollPos GUICtrlRichEdit_SetSel GUICtrlRichEdit_SetSpaceUnit GUICtrlRichEdit_SetTabStops GUICtrlRichEdit_SetText GUICtrlRichEdit_SetUndoLimit GUICtrlRichEdit_SetZoom GUICtrlRichEdit_StreamFromFile GUICtrlRichEdit_StreamFromVar GUICtrlRichEdit_StreamToFile GUICtrlRichEdit_StreamToVar GUICtrlRichEdit_Undo GUICtrlSlider_ClearSel GUICtrlSlider_ClearTics GUICtrlSlider_Create GUICtrlSlider_Destroy GUICtrlSlider_GetBuddy GUICtrlSlider_GetChannelRect GUICtrlSlider_GetChannelRectEx GUICtrlSlider_GetLineSize GUICtrlSlider_GetLogicalTics GUICtrlSlider_GetNumTics GUICtrlSlider_GetPageSize GUICtrlSlider_GetPos GUICtrlSlider_GetRange GUICtrlSlider_GetRangeMax GUICtrlSlider_GetRangeMin GUICtrlSlider_GetSel GUICtrlSlider_GetSelEnd GUICtrlSlider_GetSelStart GUICtrlSlider_GetThumbLength GUICtrlSlider_GetThumbRect GUICtrlSlider_GetThumbRectEx GUICtrlSlider_GetTic GUICtrlSlider_GetTicPos GUICtrlSlider_GetToolTips GUICtrlSlider_GetUnicodeFormat GUICtrlSlider_SetBuddy GUICtrlSlider_SetLineSize GUICtrlSlider_SetPageSize GUICtrlSlider_SetPos GUICtrlSlider_SetRange GUICtrlSlider_SetRangeMax GUICtrlSlider_SetRangeMin GUICtrlSlider_SetSel GUICtrlSlider_SetSelEnd GUICtrlSlider_SetSelStart GUICtrlSlider_SetThumbLength GUICtrlSlider_SetTic GUICtrlSlider_SetTicFreq GUICtrlSlider_SetTipSide GUICtrlSlider_SetToolTips GUICtrlSlider_SetUnicodeFormat GUICtrlStatusBar_Create GUICtrlStatusBar_Destroy GUICtrlStatusBar_EmbedControl GUICtrlStatusBar_GetBorders GUICtrlStatusBar_GetBordersHorz GUICtrlStatusBar_GetBordersRect GUICtrlStatusBar_GetBordersVert GUICtrlStatusBar_GetCount GUICtrlStatusBar_GetHeight GUICtrlStatusBar_GetIcon GUICtrlStatusBar_GetParts GUICtrlStatusBar_GetRect GUICtrlStatusBar_GetRectEx GUICtrlStatusBar_GetText GUICtrlStatusBar_GetTextFlags GUICtrlStatusBar_GetTextLength GUICtrlStatusBar_GetTextLengthEx GUICtrlStatusBar_GetTipText GUICtrlStatusBar_GetUnicodeFormat GUICtrlStatusBar_GetWidth GUICtrlStatusBar_IsSimple GUICtrlStatusBar_Resize GUICtrlStatusBar_SetBkColor GUICtrlStatusBar_SetIcon GUICtrlStatusBar_SetMinHeight GUICtrlStatusBar_SetParts GUICtrlStatusBar_SetSimple GUICtrlStatusBar_SetText GUICtrlStatusBar_SetTipText GUICtrlStatusBar_SetUnicodeFormat GUICtrlStatusBar_ShowHide GUICtrlTab_ActivateTab GUICtrlTab_ClickTab GUICtrlTab_Create GUICtrlTab_DeleteAllItems GUICtrlTab_DeleteItem GUICtrlTab_DeselectAll GUICtrlTab_Destroy GUICtrlTab_FindTab GUICtrlTab_GetCurFocus GUICtrlTab_GetCurSel GUICtrlTab_GetDisplayRect GUICtrlTab_GetDisplayRectEx GUICtrlTab_GetExtendedStyle GUICtrlTab_GetImageList GUICtrlTab_GetItem GUICtrlTab_GetItemCount GUICtrlTab_GetItemImage GUICtrlTab_GetItemParam GUICtrlTab_GetItemRect GUICtrlTab_GetItemRectEx GUICtrlTab_GetItemState GUICtrlTab_GetItemText GUICtrlTab_GetRowCount GUICtrlTab_GetToolTips GUICtrlTab_GetUnicodeFormat GUICtrlTab_HighlightItem GUICtrlTab_HitTest GUICtrlTab_InsertItem GUICtrlTab_RemoveImage GUICtrlTab_SetCurFocus GUICtrlTab_SetCurSel GUICtrlTab_SetExtendedStyle GUICtrlTab_SetImageList GUICtrlTab_SetItem GUICtrlTab_SetItemImage GUICtrlTab_SetItemParam GUICtrlTab_SetItemSize GUICtrlTab_SetItemState GUICtrlTab_SetItemText GUICtrlTab_SetMinTabWidth GUICtrlTab_SetPadding GUICtrlTab_SetToolTips GUICtrlTab_SetUnicodeFormat GUICtrlToolbar_AddBitmap GUICtrlToolbar_AddButton GUICtrlToolbar_AddButtonSep GUICtrlToolbar_AddString GUICtrlToolbar_ButtonCount GUICtrlToolbar_CheckButton GUICtrlToolbar_ClickAccel GUICtrlToolbar_ClickButton GUICtrlToolbar_ClickIndex GUICtrlToolbar_CommandToIndex GUICtrlToolbar_Create GUICtrlToolbar_Customize GUICtrlToolbar_DeleteButton GUICtrlToolbar_Destroy GUICtrlToolbar_EnableButton GUICtrlToolbar_FindToolbar GUICtrlToolbar_GetAnchorHighlight GUICtrlToolbar_GetBitmapFlags GUICtrlToolbar_GetButtonBitmap GUICtrlToolbar_GetButtonInfo GUICtrlToolbar_GetButtonInfoEx GUICtrlToolbar_GetButtonParam GUICtrlToolbar_GetButtonRect GUICtrlToolbar_GetButtonRectEx GUICtrlToolbar_GetButtonSize GUICtrlToolbar_GetButtonState GUICtrlToolbar_GetButtonStyle GUICtrlToolbar_GetButtonText GUICtrlToolbar_GetColorScheme GUICtrlToolbar_GetDisabledImageList GUICtrlToolbar_GetExtendedStyle GUICtrlToolbar_GetHotImageList GUICtrlToolbar_GetHotItem GUICtrlToolbar_GetImageList GUICtrlToolbar_GetInsertMark GUICtrlToolbar_GetInsertMarkColor GUICtrlToolbar_GetMaxSize GUICtrlToolbar_GetMetrics GUICtrlToolbar_GetPadding GUICtrlToolbar_GetRows GUICtrlToolbar_GetString GUICtrlToolbar_GetStyle GUICtrlToolbar_GetStyleAltDrag GUICtrlToolbar_GetStyleCustomErase GUICtrlToolbar_GetStyleFlat GUICtrlToolbar_GetStyleList GUICtrlToolbar_GetStyleRegisterDrop GUICtrlToolbar_GetStyleToolTips GUICtrlToolbar_GetStyleTransparent GUICtrlToolbar_GetStyleWrapable GUICtrlToolbar_GetTextRows GUICtrlToolbar_GetToolTips GUICtrlToolbar_GetUnicodeFormat GUICtrlToolbar_HideButton GUICtrlToolbar_HighlightButton GUICtrlToolbar_HitTest GUICtrlToolbar_IndexToCommand GUICtrlToolbar_InsertButton GUICtrlToolbar_InsertMarkHitTest GUICtrlToolbar_IsButtonChecked GUICtrlToolbar_IsButtonEnabled GUICtrlToolbar_IsButtonHidden GUICtrlToolbar_IsButtonHighlighted GUICtrlToolbar_IsButtonIndeterminate GUICtrlToolbar_IsButtonPressed GUICtrlToolbar_LoadBitmap GUICtrlToolbar_LoadImages GUICtrlToolbar_MapAccelerator GUICtrlToolbar_MoveButton GUICtrlToolbar_PressButton GUICtrlToolbar_SetAnchorHighlight GUICtrlToolbar_SetBitmapSize GUICtrlToolbar_SetButtonBitMap GUICtrlToolbar_SetButtonInfo GUICtrlToolbar_SetButtonInfoEx GUICtrlToolbar_SetButtonParam GUICtrlToolbar_SetButtonSize GUICtrlToolbar_SetButtonState GUICtrlToolbar_SetButtonStyle GUICtrlToolbar_SetButtonText GUICtrlToolbar_SetButtonWidth GUICtrlToolbar_SetCmdID GUICtrlToolbar_SetColorScheme GUICtrlToolbar_SetDisabledImageList GUICtrlToolbar_SetDrawTextFlags GUICtrlToolbar_SetExtendedStyle GUICtrlToolbar_SetHotImageList GUICtrlToolbar_SetHotItem GUICtrlToolbar_SetImageList GUICtrlToolbar_SetIndent GUICtrlToolbar_SetIndeterminate GUICtrlToolbar_SetInsertMark GUICtrlToolbar_SetInsertMarkColor GUICtrlToolbar_SetMaxTextRows GUICtrlToolbar_SetMetrics GUICtrlToolbar_SetPadding GUICtrlToolbar_SetParent GUICtrlToolbar_SetRows GUICtrlToolbar_SetStyle GUICtrlToolbar_SetStyleAltDrag GUICtrlToolbar_SetStyleCustomErase GUICtrlToolbar_SetStyleFlat GUICtrlToolbar_SetStyleList GUICtrlToolbar_SetStyleRegisterDrop GUICtrlToolbar_SetStyleToolTips GUICtrlToolbar_SetStyleTransparent GUICtrlToolbar_SetStyleWrapable GUICtrlToolbar_SetToolTips GUICtrlToolbar_SetUnicodeFormat GUICtrlToolbar_SetWindowTheme GUICtrlTreeView_Add GUICtrlTreeView_AddChild GUICtrlTreeView_AddChildFirst GUICtrlTreeView_AddFirst GUICtrlTreeView_BeginUpdate GUICtrlTreeView_ClickItem GUICtrlTreeView_Create GUICtrlTreeView_CreateDragImage GUICtrlTreeView_CreateSolidBitMap GUICtrlTreeView_Delete GUICtrlTreeView_DeleteAll GUICtrlTreeView_DeleteChildren GUICtrlTreeView_Destroy GUICtrlTreeView_DisplayRect GUICtrlTreeView_DisplayRectEx GUICtrlTreeView_EditText GUICtrlTreeView_EndEdit GUICtrlTreeView_EndUpdate GUICtrlTreeView_EnsureVisible GUICtrlTreeView_Expand GUICtrlTreeView_ExpandedOnce GUICtrlTreeView_FindItem GUICtrlTreeView_FindItemEx GUICtrlTreeView_GetBkColor GUICtrlTreeView_GetBold GUICtrlTreeView_GetChecked GUICtrlTreeView_GetChildCount GUICtrlTreeView_GetChildren GUICtrlTreeView_GetCount GUICtrlTreeView_GetCut GUICtrlTreeView_GetDropTarget GUICtrlTreeView_GetEditControl GUICtrlTreeView_GetExpanded GUICtrlTreeView_GetFirstChild GUICtrlTreeView_GetFirstItem GUICtrlTreeView_GetFirstVisible GUICtrlTreeView_GetFocused GUICtrlTreeView_GetHeight GUICtrlTreeView_GetImageIndex GUICtrlTreeView_GetImageListIconHandle GUICtrlTreeView_GetIndent GUICtrlTreeView_GetInsertMarkColor GUICtrlTreeView_GetISearchString GUICtrlTreeView_GetItemByIndex GUICtrlTreeView_GetItemHandle GUICtrlTreeView_GetItemParam GUICtrlTreeView_GetLastChild GUICtrlTreeView_GetLineColor GUICtrlTreeView_GetNext GUICtrlTreeView_GetNextChild GUICtrlTreeView_GetNextSibling GUICtrlTreeView_GetNextVisible GUICtrlTreeView_GetNormalImageList GUICtrlTreeView_GetParentHandle GUICtrlTreeView_GetParentParam GUICtrlTreeView_GetPrev GUICtrlTreeView_GetPrevChild GUICtrlTreeView_GetPrevSibling GUICtrlTreeView_GetPrevVisible GUICtrlTreeView_GetScrollTime GUICtrlTreeView_GetSelected GUICtrlTreeView_GetSelectedImageIndex GUICtrlTreeView_GetSelection GUICtrlTreeView_GetSiblingCount GUICtrlTreeView_GetState GUICtrlTreeView_GetStateImageIndex GUICtrlTreeView_GetStateImageList GUICtrlTreeView_GetText GUICtrlTreeView_GetTextColor GUICtrlTreeView_GetToolTips GUICtrlTreeView_GetTree GUICtrlTreeView_GetUnicodeFormat GUICtrlTreeView_GetVisible GUICtrlTreeView_GetVisibleCount GUICtrlTreeView_HitTest GUICtrlTreeView_HitTestEx GUICtrlTreeView_HitTestItem GUICtrlTreeView_Index GUICtrlTreeView_InsertItem GUICtrlTreeView_IsFirstItem GUICtrlTreeView_IsParent GUICtrlTreeView_Level GUICtrlTreeView_SelectItem GUICtrlTreeView_SelectItemByIndex GUICtrlTreeView_SetBkColor GUICtrlTreeView_SetBold GUICtrlTreeView_SetChecked GUICtrlTreeView_SetCheckedByIndex GUICtrlTreeView_SetChildren GUICtrlTreeView_SetCut GUICtrlTreeView_SetDropTarget GUICtrlTreeView_SetFocused GUICtrlTreeView_SetHeight GUICtrlTreeView_SetIcon GUICtrlTreeView_SetImageIndex GUICtrlTreeView_SetIndent GUICtrlTreeView_SetInsertMark GUICtrlTreeView_SetInsertMarkColor GUICtrlTreeView_SetItemHeight GUICtrlTreeView_SetItemParam GUICtrlTreeView_SetLineColor GUICtrlTreeView_SetNormalImageList GUICtrlTreeView_SetScrollTime GUICtrlTreeView_SetSelected GUICtrlTreeView_SetSelectedImageIndex GUICtrlTreeView_SetState GUICtrlTreeView_SetStateImageIndex GUICtrlTreeView_SetStateImageList GUICtrlTreeView_SetText GUICtrlTreeView_SetTextColor GUICtrlTreeView_SetToolTips GUICtrlTreeView_SetUnicodeFormat GUICtrlTreeView_Sort GUIImageList_Add GUIImageList_AddBitmap GUIImageList_AddIcon GUIImageList_AddMasked GUIImageList_BeginDrag GUIImageList_Copy GUIImageList_Create GUIImageList_Destroy GUIImageList_DestroyIcon GUIImageList_DragEnter GUIImageList_DragLeave GUIImageList_DragMove GUIImageList_Draw GUIImageList_DrawEx GUIImageList_Duplicate GUIImageList_EndDrag GUIImageList_GetBkColor GUIImageList_GetIcon GUIImageList_GetIconHeight GUIImageList_GetIconSize GUIImageList_GetIconSizeEx GUIImageList_GetIconWidth GUIImageList_GetImageCount GUIImageList_GetImageInfoEx GUIImageList_Remove GUIImageList_ReplaceIcon GUIImageList_SetBkColor GUIImageList_SetIconSize GUIImageList_SetImageCount GUIImageList_Swap GUIScrollBars_EnableScrollBar GUIScrollBars_GetScrollBarInfoEx GUIScrollBars_GetScrollBarRect GUIScrollBars_GetScrollBarRGState GUIScrollBars_GetScrollBarXYLineButton GUIScrollBars_GetScrollBarXYThumbBottom GUIScrollBars_GetScrollBarXYThumbTop GUIScrollBars_GetScrollInfo GUIScrollBars_GetScrollInfoEx GUIScrollBars_GetScrollInfoMax GUIScrollBars_GetScrollInfoMin GUIScrollBars_GetScrollInfoPage GUIScrollBars_GetScrollInfoPos GUIScrollBars_GetScrollInfoTrackPos GUIScrollBars_GetScrollPos GUIScrollBars_GetScrollRange GUIScrollBars_Init GUIScrollBars_ScrollWindow GUIScrollBars_SetScrollInfo GUIScrollBars_SetScrollInfoMax GUIScrollBars_SetScrollInfoMin GUIScrollBars_SetScrollInfoPage GUIScrollBars_SetScrollInfoPos GUIScrollBars_SetScrollRange GUIScrollBars_ShowScrollBar GUIToolTip_Activate GUIToolTip_AddTool GUIToolTip_AdjustRect GUIToolTip_BitsToTTF GUIToolTip_Create GUIToolTip_Deactivate GUIToolTip_DelTool GUIToolTip_Destroy GUIToolTip_EnumTools GUIToolTip_GetBubbleHeight GUIToolTip_GetBubbleSize GUIToolTip_GetBubbleWidth GUIToolTip_GetCurrentTool GUIToolTip_GetDelayTime GUIToolTip_GetMargin GUIToolTip_GetMarginEx GUIToolTip_GetMaxTipWidth GUIToolTip_GetText GUIToolTip_GetTipBkColor GUIToolTip_GetTipTextColor GUIToolTip_GetTitleBitMap GUIToolTip_GetTitleText GUIToolTip_GetToolCount GUIToolTip_GetToolInfo GUIToolTip_HitTest GUIToolTip_NewToolRect GUIToolTip_Pop GUIToolTip_PopUp GUIToolTip_SetDelayTime GUIToolTip_SetMargin GUIToolTip_SetMaxTipWidth GUIToolTip_SetTipBkColor GUIToolTip_SetTipTextColor GUIToolTip_SetTitle GUIToolTip_SetToolInfo GUIToolTip_SetWindowTheme GUIToolTip_ToolExists GUIToolTip_ToolToArray GUIToolTip_TrackActivate GUIToolTip_TrackPosition GUIToolTip_Update GUIToolTip_UpdateTipText HexToString IEAction IEAttach IEBodyReadHTML IEBodyReadText IEBodyWriteHTML IECreate IECreateEmbedded IEDocGetObj IEDocInsertHTML IEDocInsertText IEDocReadHTML IEDocWriteHTML IEErrorNotify IEFormElementCheckBoxSelect IEFormElementGetCollection IEFormElementGetObjByName IEFormElementGetValue IEFormElementOptionSelect IEFormElementRadioSelect IEFormElementSetValue IEFormGetCollection IEFormGetObjByName IEFormImageClick IEFormReset IEFormSubmit IEFrameGetCollection IEFrameGetObjByName IEGetObjById IEGetObjByName IEHeadInsertEventScript IEImgClick IEImgGetCollection IEIsFrameSet IELinkClickByIndex IELinkClickByText IELinkGetCollection IELoadWait IELoadWaitTimeout IENavigate IEPropertyGet IEPropertySet IEQuit IETableGetCollection IETableWriteToArray IETagNameAllGetCollection IETagNameGetCollection IE_Example IE_Introduction IE_VersionInfo INetExplorerCapable INetGetSource INetMail INetSmtpMail IsPressed MathCheckDiv Max MemGlobalAlloc MemGlobalFree MemGlobalLock MemGlobalSize MemGlobalUnlock MemMoveMemory MemVirtualAlloc MemVirtualAllocEx MemVirtualFree MemVirtualFreeEx Min MouseTrap NamedPipes_CallNamedPipe NamedPipes_ConnectNamedPipe NamedPipes_CreateNamedPipe NamedPipes_CreatePipe NamedPipes_DisconnectNamedPipe NamedPipes_GetNamedPipeHandleState NamedPipes_GetNamedPipeInfo NamedPipes_PeekNamedPipe NamedPipes_SetNamedPipeHandleState NamedPipes_TransactNamedPipe NamedPipes_WaitNamedPipe Net_Share_ConnectionEnum Net_Share_FileClose Net_Share_FileEnum Net_Share_FileGetInfo Net_Share_PermStr Net_Share_ResourceStr Net_Share_SessionDel Net_Share_SessionEnum Net_Share_SessionGetInfo Net_Share_ShareAdd Net_Share_ShareCheck Net_Share_ShareDel Net_Share_ShareEnum Net_Share_ShareGetInfo Net_Share_ShareSetInfo Net_Share_StatisticsGetSvr Net_Share_StatisticsGetWrk Now NowCalc NowCalcDate NowDate NowTime PathFull PathGetRelative PathMake PathSplit ProcessGetName ProcessGetPriority Radian ReplaceStringInFile RunDos ScreenCapture_Capture ScreenCapture_CaptureWnd ScreenCapture_SaveImage ScreenCapture_SetBMPFormat ScreenCapture_SetJPGQuality ScreenCapture_SetTIFColorDepth ScreenCapture_SetTIFCompression Security__AdjustTokenPrivileges Security__CreateProcessWithToken Security__DuplicateTokenEx Security__GetAccountSid Security__GetLengthSid Security__GetTokenInformation Security__ImpersonateSelf Security__IsValidSid Security__LookupAccountName Security__LookupAccountSid Security__LookupPrivilegeValue Security__OpenProcessToken Security__OpenThreadToken Security__OpenThreadTokenEx Security__SetPrivilege Security__SetTokenInformation Security__SidToStringSid Security__SidTypeStr Security__StringSidToSid SendMessage SendMessageA SetDate SetTime Singleton SoundClose SoundLength SoundOpen SoundPause SoundPlay SoundPos SoundResume SoundSeek SoundStatus SoundStop SQLite_Changes SQLite_Close SQLite_Display2DResult SQLite_Encode SQLite_ErrCode SQLite_ErrMsg SQLite_Escape SQLite_Exec SQLite_FastEncode SQLite_FastEscape SQLite_FetchData SQLite_FetchNames SQLite_GetTable SQLite_GetTable2d SQLite_LastInsertRowID SQLite_LibVersion SQLite_Open SQLite_Query SQLite_QueryFinalize SQLite_QueryReset SQLite_QuerySingleRow SQLite_SafeMode SQLite_SetTimeout SQLite_Shutdown SQLite_SQLiteExe SQLite_Startup SQLite_TotalChanges StringBetween StringExplode StringInsert StringProper StringRepeat StringTitleCase StringToHex TCPIpToName TempFile TicksToTime Timer_Diff Timer_GetIdleTime Timer_GetTimerID Timer_Init Timer_KillAllTimers Timer_KillTimer Timer_SetTimer TimeToTicks VersionCompare viClose viExecCommand viFindGpib viGpibBusReset viGTL viInteractiveControl viOpen viSetAttribute viSetTimeout WeekNumberISO WinAPI_AbortPath WinAPI_ActivateKeyboardLayout WinAPI_AddClipboardFormatListener WinAPI_AddFontMemResourceEx WinAPI_AddFontResourceEx WinAPI_AddIconOverlay WinAPI_AddIconTransparency WinAPI_AddMRUString WinAPI_AdjustBitmap WinAPI_AdjustTokenPrivileges WinAPI_AdjustWindowRectEx WinAPI_AlphaBlend WinAPI_AngleArc WinAPI_AnimateWindow WinAPI_Arc WinAPI_ArcTo WinAPI_ArrayToStruct WinAPI_AssignProcessToJobObject WinAPI_AssocGetPerceivedType WinAPI_AssocQueryString WinAPI_AttachConsole WinAPI_AttachThreadInput WinAPI_BackupRead WinAPI_BackupReadAbort WinAPI_BackupSeek WinAPI_BackupWrite WinAPI_BackupWriteAbort WinAPI_Beep WinAPI_BeginBufferedPaint WinAPI_BeginDeferWindowPos WinAPI_BeginPaint WinAPI_BeginPath WinAPI_BeginUpdateResource WinAPI_BitBlt WinAPI_BringWindowToTop WinAPI_BroadcastSystemMessage WinAPI_BrowseForFolderDlg WinAPI_BufferedPaintClear WinAPI_BufferedPaintInit WinAPI_BufferedPaintSetAlpha WinAPI_BufferedPaintUnInit WinAPI_CallNextHookEx WinAPI_CallWindowProc WinAPI_CallWindowProcW WinAPI_CascadeWindows WinAPI_ChangeWindowMessageFilterEx WinAPI_CharToOem WinAPI_ChildWindowFromPointEx WinAPI_ClientToScreen WinAPI_ClipCursor WinAPI_CloseDesktop WinAPI_CloseEnhMetaFile WinAPI_CloseFigure WinAPI_CloseHandle WinAPI_CloseThemeData WinAPI_CloseWindow WinAPI_CloseWindowStation WinAPI_CLSIDFromProgID WinAPI_CoInitialize WinAPI_ColorAdjustLuma WinAPI_ColorHLSToRGB WinAPI_ColorRGBToHLS WinAPI_CombineRgn WinAPI_CombineTransform WinAPI_CommandLineToArgv WinAPI_CommDlgExtendedError WinAPI_CommDlgExtendedErrorEx WinAPI_CompareString WinAPI_CompressBitmapBits WinAPI_CompressBuffer WinAPI_ComputeCrc32 WinAPI_ConfirmCredentials WinAPI_CopyBitmap WinAPI_CopyCursor WinAPI_CopyEnhMetaFile WinAPI_CopyFileEx WinAPI_CopyIcon WinAPI_CopyImage WinAPI_CopyRect WinAPI_CopyStruct WinAPI_CoTaskMemAlloc WinAPI_CoTaskMemFree WinAPI_CoTaskMemRealloc WinAPI_CoUninitialize WinAPI_Create32BitHBITMAP WinAPI_Create32BitHICON WinAPI_CreateANDBitmap WinAPI_CreateBitmap WinAPI_CreateBitmapIndirect WinAPI_CreateBrushIndirect WinAPI_CreateBuffer WinAPI_CreateBufferFromStruct WinAPI_CreateCaret WinAPI_CreateColorAdjustment WinAPI_CreateCompatibleBitmap WinAPI_CreateCompatibleBitmapEx WinAPI_CreateCompatibleDC WinAPI_CreateDesktop WinAPI_CreateDIB WinAPI_CreateDIBColorTable WinAPI_CreateDIBitmap WinAPI_CreateDIBSection WinAPI_CreateDirectory WinAPI_CreateDirectoryEx WinAPI_CreateEllipticRgn WinAPI_CreateEmptyIcon WinAPI_CreateEnhMetaFile WinAPI_CreateEvent WinAPI_CreateFile WinAPI_CreateFileEx WinAPI_CreateFileMapping WinAPI_CreateFont WinAPI_CreateFontEx WinAPI_CreateFontIndirect WinAPI_CreateGUID WinAPI_CreateHardLink WinAPI_CreateIcon WinAPI_CreateIconFromResourceEx WinAPI_CreateIconIndirect WinAPI_CreateJobObject WinAPI_CreateMargins WinAPI_CreateMRUList WinAPI_CreateMutex WinAPI_CreateNullRgn WinAPI_CreateNumberFormatInfo WinAPI_CreateObjectID WinAPI_CreatePen WinAPI_CreatePoint WinAPI_CreatePolygonRgn WinAPI_CreateProcess WinAPI_CreateProcessWithToken WinAPI_CreateRect WinAPI_CreateRectEx WinAPI_CreateRectRgn WinAPI_CreateRectRgnIndirect WinAPI_CreateRoundRectRgn WinAPI_CreateSemaphore WinAPI_CreateSize WinAPI_CreateSolidBitmap WinAPI_CreateSolidBrush WinAPI_CreateStreamOnHGlobal WinAPI_CreateString WinAPI_CreateSymbolicLink WinAPI_CreateTransform WinAPI_CreateWindowEx WinAPI_CreateWindowStation WinAPI_DecompressBuffer WinAPI_DecryptFile WinAPI_DeferWindowPos WinAPI_DefineDosDevice WinAPI_DefRawInputProc WinAPI_DefSubclassProc WinAPI_DefWindowProc WinAPI_DefWindowProcW WinAPI_DeleteDC WinAPI_DeleteEnhMetaFile WinAPI_DeleteFile WinAPI_DeleteObject WinAPI_DeleteObjectID WinAPI_DeleteVolumeMountPoint WinAPI_DeregisterShellHookWindow WinAPI_DestroyCaret WinAPI_DestroyCursor WinAPI_DestroyIcon WinAPI_DestroyWindow WinAPI_DeviceIoControl WinAPI_DisplayStruct WinAPI_DllGetVersion WinAPI_DllInstall WinAPI_DllUninstall WinAPI_DPtoLP WinAPI_DragAcceptFiles WinAPI_DragFinish WinAPI_DragQueryFileEx WinAPI_DragQueryPoint WinAPI_DrawAnimatedRects WinAPI_DrawBitmap WinAPI_DrawEdge WinAPI_DrawFocusRect WinAPI_DrawFrameControl WinAPI_DrawIcon WinAPI_DrawIconEx WinAPI_DrawLine WinAPI_DrawShadowText WinAPI_DrawText WinAPI_DrawThemeBackground WinAPI_DrawThemeEdge WinAPI_DrawThemeIcon WinAPI_DrawThemeParentBackground WinAPI_DrawThemeText WinAPI_DrawThemeTextEx WinAPI_DuplicateEncryptionInfoFile WinAPI_DuplicateHandle WinAPI_DuplicateTokenEx WinAPI_DwmDefWindowProc WinAPI_DwmEnableBlurBehindWindow WinAPI_DwmEnableComposition WinAPI_DwmExtendFrameIntoClientArea WinAPI_DwmGetColorizationColor WinAPI_DwmGetColorizationParameters WinAPI_DwmGetWindowAttribute WinAPI_DwmInvalidateIconicBitmaps WinAPI_DwmIsCompositionEnabled WinAPI_DwmQueryThumbnailSourceSize WinAPI_DwmRegisterThumbnail WinAPI_DwmSetColorizationParameters WinAPI_DwmSetIconicLivePreviewBitmap WinAPI_DwmSetIconicThumbnail WinAPI_DwmSetWindowAttribute WinAPI_DwmUnregisterThumbnail WinAPI_DwmUpdateThumbnailProperties WinAPI_DWordToFloat WinAPI_DWordToInt WinAPI_EjectMedia WinAPI_Ellipse WinAPI_EmptyWorkingSet WinAPI_EnableWindow WinAPI_EncryptFile WinAPI_EncryptionDisable WinAPI_EndBufferedPaint WinAPI_EndDeferWindowPos WinAPI_EndPaint WinAPI_EndPath WinAPI_EndUpdateResource WinAPI_EnumChildProcess WinAPI_EnumChildWindows WinAPI_EnumDesktops WinAPI_EnumDesktopWindows WinAPI_EnumDeviceDrivers WinAPI_EnumDisplayDevices WinAPI_EnumDisplayMonitors WinAPI_EnumDisplaySettings WinAPI_EnumDllProc WinAPI_EnumFiles WinAPI_EnumFileStreams WinAPI_EnumFontFamilies WinAPI_EnumHardLinks WinAPI_EnumMRUList WinAPI_EnumPageFiles WinAPI_EnumProcessHandles WinAPI_EnumProcessModules WinAPI_EnumProcessThreads WinAPI_EnumProcessWindows WinAPI_EnumRawInputDevices WinAPI_EnumResourceLanguages WinAPI_EnumResourceNames WinAPI_EnumResourceTypes WinAPI_EnumSystemGeoID WinAPI_EnumSystemLocales WinAPI_EnumUILanguages WinAPI_EnumWindows WinAPI_EnumWindowsPopup WinAPI_EnumWindowStations WinAPI_EnumWindowsTop WinAPI_EqualMemory WinAPI_EqualRect WinAPI_EqualRgn WinAPI_ExcludeClipRect WinAPI_ExpandEnvironmentStrings WinAPI_ExtCreatePen WinAPI_ExtCreateRegion WinAPI_ExtFloodFill WinAPI_ExtractIcon WinAPI_ExtractIconEx WinAPI_ExtSelectClipRgn WinAPI_FatalAppExit WinAPI_FatalExit WinAPI_FileEncryptionStatus WinAPI_FileExists WinAPI_FileIconInit WinAPI_FileInUse WinAPI_FillMemory WinAPI_FillPath WinAPI_FillRect WinAPI_FillRgn WinAPI_FindClose WinAPI_FindCloseChangeNotification WinAPI_FindExecutable WinAPI_FindFirstChangeNotification WinAPI_FindFirstFile WinAPI_FindFirstFileName WinAPI_FindFirstStream WinAPI_FindNextChangeNotification WinAPI_FindNextFile WinAPI_FindNextFileName WinAPI_FindNextStream WinAPI_FindResource WinAPI_FindResourceEx WinAPI_FindTextDlg WinAPI_FindWindow WinAPI_FlashWindow WinAPI_FlashWindowEx WinAPI_FlattenPath WinAPI_FloatToDWord WinAPI_FloatToInt WinAPI_FlushFileBuffers WinAPI_FlushFRBuffer WinAPI_FlushViewOfFile WinAPI_FormatDriveDlg WinAPI_FormatMessage WinAPI_FrameRect WinAPI_FrameRgn WinAPI_FreeLibrary WinAPI_FreeMemory WinAPI_FreeMRUList WinAPI_FreeResource WinAPI_GdiComment WinAPI_GetActiveWindow WinAPI_GetAllUsersProfileDirectory WinAPI_GetAncestor WinAPI_GetApplicationRestartSettings WinAPI_GetArcDirection WinAPI_GetAsyncKeyState WinAPI_GetBinaryType WinAPI_GetBitmapBits WinAPI_GetBitmapDimension WinAPI_GetBitmapDimensionEx WinAPI_GetBkColor WinAPI_GetBkMode WinAPI_GetBoundsRect WinAPI_GetBrushOrg WinAPI_GetBufferedPaintBits WinAPI_GetBufferedPaintDC WinAPI_GetBufferedPaintTargetDC WinAPI_GetBufferedPaintTargetRect WinAPI_GetBValue WinAPI_GetCaretBlinkTime WinAPI_GetCaretPos WinAPI_GetCDType WinAPI_GetClassInfoEx WinAPI_GetClassLongEx WinAPI_GetClassName WinAPI_GetClientHeight WinAPI_GetClientRect WinAPI_GetClientWidth WinAPI_GetClipboardSequenceNumber WinAPI_GetClipBox WinAPI_GetClipCursor WinAPI_GetClipRgn WinAPI_GetColorAdjustment WinAPI_GetCompressedFileSize WinAPI_GetCompression WinAPI_GetConnectedDlg WinAPI_GetCurrentDirectory WinAPI_GetCurrentHwProfile WinAPI_GetCurrentObject WinAPI_GetCurrentPosition WinAPI_GetCurrentProcess WinAPI_GetCurrentProcessExplicitAppUserModelID WinAPI_GetCurrentProcessID WinAPI_GetCurrentThemeName WinAPI_GetCurrentThread WinAPI_GetCurrentThreadId WinAPI_GetCursor WinAPI_GetCursorInfo WinAPI_GetDateFormat WinAPI_GetDC WinAPI_GetDCEx WinAPI_GetDefaultPrinter WinAPI_GetDefaultUserProfileDirectory WinAPI_GetDesktopWindow WinAPI_GetDeviceCaps WinAPI_GetDeviceDriverBaseName WinAPI_GetDeviceDriverFileName WinAPI_GetDeviceGammaRamp WinAPI_GetDIBColorTable WinAPI_GetDIBits WinAPI_GetDiskFreeSpaceEx WinAPI_GetDlgCtrlID WinAPI_GetDlgItem WinAPI_GetDllDirectory WinAPI_GetDriveBusType WinAPI_GetDriveGeometryEx WinAPI_GetDriveNumber WinAPI_GetDriveType WinAPI_GetDurationFormat WinAPI_GetEffectiveClientRect WinAPI_GetEnhMetaFile WinAPI_GetEnhMetaFileBits WinAPI_GetEnhMetaFileDescription WinAPI_GetEnhMetaFileDimension WinAPI_GetEnhMetaFileHeader WinAPI_GetErrorMessage WinAPI_GetErrorMode WinAPI_GetExitCodeProcess WinAPI_GetExtended WinAPI_GetFileAttributes WinAPI_GetFileID WinAPI_GetFileInformationByHandle WinAPI_GetFileInformationByHandleEx WinAPI_GetFilePointerEx WinAPI_GetFileSizeEx WinAPI_GetFileSizeOnDisk WinAPI_GetFileTitle WinAPI_GetFileType WinAPI_GetFileVersionInfo WinAPI_GetFinalPathNameByHandle WinAPI_GetFinalPathNameByHandleEx WinAPI_GetFocus WinAPI_GetFontMemoryResourceInfo WinAPI_GetFontName WinAPI_GetFontResourceInfo WinAPI_GetForegroundWindow WinAPI_GetFRBuffer WinAPI_GetFullPathName WinAPI_GetGeoInfo WinAPI_GetGlyphOutline WinAPI_GetGraphicsMode WinAPI_GetGuiResources WinAPI_GetGUIThreadInfo WinAPI_GetGValue WinAPI_GetHandleInformation WinAPI_GetHGlobalFromStream WinAPI_GetIconDimension WinAPI_GetIconInfo WinAPI_GetIconInfoEx WinAPI_GetIdleTime WinAPI_GetKeyboardLayout WinAPI_GetKeyboardLayoutList WinAPI_GetKeyboardState WinAPI_GetKeyboardType WinAPI_GetKeyNameText WinAPI_GetKeyState WinAPI_GetLastActivePopup WinAPI_GetLastError WinAPI_GetLastErrorMessage WinAPI_GetLayeredWindowAttributes WinAPI_GetLocaleInfo WinAPI_GetLogicalDrives WinAPI_GetMapMode WinAPI_GetMemorySize WinAPI_GetMessageExtraInfo WinAPI_GetModuleFileNameEx WinAPI_GetModuleHandle WinAPI_GetModuleHandleEx WinAPI_GetModuleInformation WinAPI_GetMonitorInfo WinAPI_GetMousePos WinAPI_GetMousePosX WinAPI_GetMousePosY WinAPI_GetMUILanguage WinAPI_GetNumberFormat WinAPI_GetObject WinAPI_GetObjectID WinAPI_GetObjectInfoByHandle WinAPI_GetObjectNameByHandle WinAPI_GetObjectType WinAPI_GetOpenFileName WinAPI_GetOutlineTextMetrics WinAPI_GetOverlappedResult WinAPI_GetParent WinAPI_GetParentProcess WinAPI_GetPerformanceInfo WinAPI_GetPEType WinAPI_GetPhysicallyInstalledSystemMemory WinAPI_GetPixel WinAPI_GetPolyFillMode WinAPI_GetPosFromRect WinAPI_GetPriorityClass WinAPI_GetProcAddress WinAPI_GetProcessAffinityMask WinAPI_GetProcessCommandLine WinAPI_GetProcessFileName WinAPI_GetProcessHandleCount WinAPI_GetProcessID WinAPI_GetProcessIoCounters WinAPI_GetProcessMemoryInfo WinAPI_GetProcessName WinAPI_GetProcessShutdownParameters WinAPI_GetProcessTimes WinAPI_GetProcessUser WinAPI_GetProcessWindowStation WinAPI_GetProcessWorkingDirectory WinAPI_GetProfilesDirectory WinAPI_GetPwrCapabilities WinAPI_GetRawInputBuffer WinAPI_GetRawInputBufferLength WinAPI_GetRawInputData WinAPI_GetRawInputDeviceInfo WinAPI_GetRegionData WinAPI_GetRegisteredRawInputDevices WinAPI_GetRegKeyNameByHandle WinAPI_GetRgnBox WinAPI_GetROP2 WinAPI_GetRValue WinAPI_GetSaveFileName WinAPI_GetShellWindow WinAPI_GetStartupInfo WinAPI_GetStdHandle WinAPI_GetStockObject WinAPI_GetStretchBltMode WinAPI_GetString WinAPI_GetSysColor WinAPI_GetSysColorBrush WinAPI_GetSystemDefaultLangID WinAPI_GetSystemDefaultLCID WinAPI_GetSystemDefaultUILanguage WinAPI_GetSystemDEPPolicy WinAPI_GetSystemInfo WinAPI_GetSystemMetrics WinAPI_GetSystemPowerStatus WinAPI_GetSystemTimes WinAPI_GetSystemWow64Directory WinAPI_GetTabbedTextExtent WinAPI_GetTempFileName WinAPI_GetTextAlign WinAPI_GetTextCharacterExtra WinAPI_GetTextColor WinAPI_GetTextExtentPoint32 WinAPI_GetTextFace WinAPI_GetTextMetrics WinAPI_GetThemeAppProperties WinAPI_GetThemeBackgroundContentRect WinAPI_GetThemeBackgroundExtent WinAPI_GetThemeBackgroundRegion WinAPI_GetThemeBitmap WinAPI_GetThemeBool WinAPI_GetThemeColor WinAPI_GetThemeDocumentationProperty WinAPI_GetThemeEnumValue WinAPI_GetThemeFilename WinAPI_GetThemeFont WinAPI_GetThemeInt WinAPI_GetThemeMargins WinAPI_GetThemeMetric WinAPI_GetThemePartSize WinAPI_GetThemePosition WinAPI_GetThemePropertyOrigin WinAPI_GetThemeRect WinAPI_GetThemeString WinAPI_GetThemeSysBool WinAPI_GetThemeSysColor WinAPI_GetThemeSysColorBrush WinAPI_GetThemeSysFont WinAPI_GetThemeSysInt WinAPI_GetThemeSysSize WinAPI_GetThemeSysString WinAPI_GetThemeTextExtent WinAPI_GetThemeTextMetrics WinAPI_GetThemeTransitionDuration WinAPI_GetThreadDesktop WinAPI_GetThreadErrorMode WinAPI_GetThreadLocale WinAPI_GetThreadUILanguage WinAPI_GetTickCount WinAPI_GetTickCount64 WinAPI_GetTimeFormat WinAPI_GetTopWindow WinAPI_GetUDFColorMode WinAPI_GetUpdateRect WinAPI_GetUpdateRgn WinAPI_GetUserDefaultLangID WinAPI_GetUserDefaultLCID WinAPI_GetUserDefaultUILanguage WinAPI_GetUserGeoID WinAPI_GetUserObjectInformation WinAPI_GetVersion WinAPI_GetVersionEx WinAPI_GetVolumeInformation WinAPI_GetVolumeInformationByHandle WinAPI_GetVolumeNameForVolumeMountPoint WinAPI_GetWindow WinAPI_GetWindowDC WinAPI_GetWindowDisplayAffinity WinAPI_GetWindowExt WinAPI_GetWindowFileName WinAPI_GetWindowHeight WinAPI_GetWindowInfo WinAPI_GetWindowLong WinAPI_GetWindowOrg WinAPI_GetWindowPlacement WinAPI_GetWindowRect WinAPI_GetWindowRgn WinAPI_GetWindowRgnBox WinAPI_GetWindowSubclass WinAPI_GetWindowText WinAPI_GetWindowTheme WinAPI_GetWindowThreadProcessId WinAPI_GetWindowWidth WinAPI_GetWorkArea WinAPI_GetWorldTransform WinAPI_GetXYFromPoint WinAPI_GlobalMemoryStatus WinAPI_GradientFill WinAPI_GUIDFromString WinAPI_GUIDFromStringEx WinAPI_HashData WinAPI_HashString WinAPI_HiByte WinAPI_HideCaret WinAPI_HiDWord WinAPI_HiWord WinAPI_InflateRect WinAPI_InitMUILanguage WinAPI_InProcess WinAPI_IntersectClipRect WinAPI_IntersectRect WinAPI_IntToDWord WinAPI_IntToFloat WinAPI_InvalidateRect WinAPI_InvalidateRgn WinAPI_InvertANDBitmap WinAPI_InvertColor WinAPI_InvertRect WinAPI_InvertRgn WinAPI_IOCTL WinAPI_IsAlphaBitmap WinAPI_IsBadCodePtr WinAPI_IsBadReadPtr WinAPI_IsBadStringPtr WinAPI_IsBadWritePtr WinAPI_IsChild WinAPI_IsClassName WinAPI_IsDoorOpen WinAPI_IsElevated WinAPI_IsHungAppWindow WinAPI_IsIconic WinAPI_IsInternetConnected WinAPI_IsLoadKBLayout WinAPI_IsMemory WinAPI_IsNameInExpression WinAPI_IsNetworkAlive WinAPI_IsPathShared WinAPI_IsProcessInJob WinAPI_IsProcessorFeaturePresent WinAPI_IsRectEmpty WinAPI_IsThemeActive WinAPI_IsThemeBackgroundPartiallyTransparent WinAPI_IsThemePartDefined WinAPI_IsValidLocale WinAPI_IsWindow WinAPI_IsWindowEnabled WinAPI_IsWindowUnicode WinAPI_IsWindowVisible WinAPI_IsWow64Process WinAPI_IsWritable WinAPI_IsZoomed WinAPI_Keybd_Event WinAPI_KillTimer WinAPI_LineDDA WinAPI_LineTo WinAPI_LoadBitmap WinAPI_LoadCursor WinAPI_LoadCursorFromFile WinAPI_LoadIcon WinAPI_LoadIconMetric WinAPI_LoadIconWithScaleDown WinAPI_LoadImage WinAPI_LoadIndirectString WinAPI_LoadKeyboardLayout WinAPI_LoadLibrary WinAPI_LoadLibraryEx WinAPI_LoadMedia WinAPI_LoadResource WinAPI_LoadShell32Icon WinAPI_LoadString WinAPI_LoadStringEx WinAPI_LoByte WinAPI_LocalFree WinAPI_LockDevice WinAPI_LockFile WinAPI_LockResource WinAPI_LockWindowUpdate WinAPI_LockWorkStation WinAPI_LoDWord WinAPI_LongMid WinAPI_LookupIconIdFromDirectoryEx WinAPI_LoWord WinAPI_LPtoDP WinAPI_MAKELANGID WinAPI_MAKELCID WinAPI_MakeLong WinAPI_MakeQWord WinAPI_MakeWord WinAPI_MapViewOfFile WinAPI_MapVirtualKey WinAPI_MaskBlt WinAPI_MessageBeep WinAPI_MessageBoxCheck WinAPI_MessageBoxIndirect WinAPI_MirrorIcon WinAPI_ModifyWorldTransform WinAPI_MonitorFromPoint WinAPI_MonitorFromRect WinAPI_MonitorFromWindow WinAPI_Mouse_Event WinAPI_MoveFileEx WinAPI_MoveMemory WinAPI_MoveTo WinAPI_MoveToEx WinAPI_MoveWindow WinAPI_MsgBox WinAPI_MulDiv WinAPI_MultiByteToWideChar WinAPI_MultiByteToWideCharEx WinAPI_NtStatusToDosError WinAPI_OemToChar WinAPI_OffsetClipRgn WinAPI_OffsetPoints WinAPI_OffsetRect WinAPI_OffsetRgn WinAPI_OffsetWindowOrg WinAPI_OpenDesktop WinAPI_OpenFileById WinAPI_OpenFileDlg WinAPI_OpenFileMapping WinAPI_OpenIcon WinAPI_OpenInputDesktop WinAPI_OpenJobObject WinAPI_OpenMutex WinAPI_OpenProcess WinAPI_OpenProcessToken WinAPI_OpenSemaphore WinAPI_OpenThemeData WinAPI_OpenWindowStation WinAPI_PageSetupDlg WinAPI_PaintDesktop WinAPI_PaintRgn WinAPI_ParseURL WinAPI_ParseUserName WinAPI_PatBlt WinAPI_PathAddBackslash WinAPI_PathAddExtension WinAPI_PathAppend WinAPI_PathBuildRoot WinAPI_PathCanonicalize WinAPI_PathCommonPrefix WinAPI_PathCompactPath WinAPI_PathCompactPathEx WinAPI_PathCreateFromUrl WinAPI_PathFindExtension WinAPI_PathFindFileName WinAPI_PathFindNextComponent WinAPI_PathFindOnPath WinAPI_PathGetArgs WinAPI_PathGetCharType WinAPI_PathGetDriveNumber WinAPI_PathIsContentType WinAPI_PathIsDirectory WinAPI_PathIsDirectoryEmpty WinAPI_PathIsExe WinAPI_PathIsFileSpec WinAPI_PathIsLFNFileSpec WinAPI_PathIsRelative WinAPI_PathIsRoot WinAPI_PathIsSameRoot WinAPI_PathIsSystemFolder WinAPI_PathIsUNC WinAPI_PathIsUNCServer WinAPI_PathIsUNCServerShare WinAPI_PathMakeSystemFolder WinAPI_PathMatchSpec WinAPI_PathParseIconLocation WinAPI_PathRelativePathTo WinAPI_PathRemoveArgs WinAPI_PathRemoveBackslash WinAPI_PathRemoveExtension WinAPI_PathRemoveFileSpec WinAPI_PathRenameExtension WinAPI_PathSearchAndQualify WinAPI_PathSkipRoot WinAPI_PathStripPath WinAPI_PathStripToRoot WinAPI_PathToRegion WinAPI_PathUndecorate WinAPI_PathUnExpandEnvStrings WinAPI_PathUnmakeSystemFolder WinAPI_PathUnquoteSpaces WinAPI_PathYetAnotherMakeUniqueName WinAPI_PickIconDlg WinAPI_PlayEnhMetaFile WinAPI_PlaySound WinAPI_PlgBlt WinAPI_PointFromRect WinAPI_PolyBezier WinAPI_PolyBezierTo WinAPI_PolyDraw WinAPI_Polygon WinAPI_PostMessage WinAPI_PrimaryLangId WinAPI_PrintDlg WinAPI_PrintDlgEx WinAPI_PrintWindow WinAPI_ProgIDFromCLSID WinAPI_PtInRect WinAPI_PtInRectEx WinAPI_PtInRegion WinAPI_PtVisible WinAPI_QueryDosDevice WinAPI_QueryInformationJobObject WinAPI_QueryPerformanceCounter WinAPI_QueryPerformanceFrequency WinAPI_RadialGradientFill WinAPI_ReadDirectoryChanges WinAPI_ReadFile WinAPI_ReadProcessMemory WinAPI_Rectangle WinAPI_RectInRegion WinAPI_RectIsEmpty WinAPI_RectVisible WinAPI_RedrawWindow WinAPI_RegCloseKey WinAPI_RegConnectRegistry WinAPI_RegCopyTree WinAPI_RegCopyTreeEx WinAPI_RegCreateKey WinAPI_RegDeleteEmptyKey WinAPI_RegDeleteKey WinAPI_RegDeleteKeyValue WinAPI_RegDeleteTree WinAPI_RegDeleteTreeEx WinAPI_RegDeleteValue WinAPI_RegDisableReflectionKey WinAPI_RegDuplicateHKey WinAPI_RegEnableReflectionKey WinAPI_RegEnumKey WinAPI_RegEnumValue WinAPI_RegFlushKey WinAPI_RegisterApplicationRestart WinAPI_RegisterClass WinAPI_RegisterClassEx WinAPI_RegisterHotKey WinAPI_RegisterPowerSettingNotification WinAPI_RegisterRawInputDevices WinAPI_RegisterShellHookWindow WinAPI_RegisterWindowMessage WinAPI_RegLoadMUIString WinAPI_RegNotifyChangeKeyValue WinAPI_RegOpenKey WinAPI_RegQueryInfoKey WinAPI_RegQueryLastWriteTime WinAPI_RegQueryMultipleValues WinAPI_RegQueryReflectionKey WinAPI_RegQueryValue WinAPI_RegRestoreKey WinAPI_RegSaveKey WinAPI_RegSetValue WinAPI_ReleaseCapture WinAPI_ReleaseDC WinAPI_ReleaseMutex WinAPI_ReleaseSemaphore WinAPI_ReleaseStream WinAPI_RemoveClipboardFormatListener WinAPI_RemoveDirectory WinAPI_RemoveFontMemResourceEx WinAPI_RemoveFontResourceEx WinAPI_RemoveWindowSubclass WinAPI_ReOpenFile WinAPI_ReplaceFile WinAPI_ReplaceTextDlg WinAPI_ResetEvent WinAPI_RestartDlg WinAPI_RestoreDC WinAPI_RGB WinAPI_RotatePoints WinAPI_RoundRect WinAPI_SaveDC WinAPI_SaveFileDlg WinAPI_SaveHBITMAPToFile WinAPI_SaveHICONToFile WinAPI_ScaleWindowExt WinAPI_ScreenToClient WinAPI_SearchPath WinAPI_SelectClipPath WinAPI_SelectClipRgn WinAPI_SelectObject WinAPI_SendMessageTimeout WinAPI_SetActiveWindow WinAPI_SetArcDirection WinAPI_SetBitmapBits WinAPI_SetBitmapDimensionEx WinAPI_SetBkColor WinAPI_SetBkMode WinAPI_SetBoundsRect WinAPI_SetBrushOrg WinAPI_SetCapture WinAPI_SetCaretBlinkTime WinAPI_SetCaretPos WinAPI_SetClassLongEx WinAPI_SetColorAdjustment WinAPI_SetCompression WinAPI_SetCurrentDirectory WinAPI_SetCurrentProcessExplicitAppUserModelID WinAPI_SetCursor WinAPI_SetDCBrushColor WinAPI_SetDCPenColor WinAPI_SetDefaultPrinter WinAPI_SetDeviceGammaRamp WinAPI_SetDIBColorTable WinAPI_SetDIBits WinAPI_SetDIBitsToDevice WinAPI_SetDllDirectory WinAPI_SetEndOfFile WinAPI_SetEnhMetaFileBits WinAPI_SetErrorMode WinAPI_SetEvent WinAPI_SetFileAttributes WinAPI_SetFileInformationByHandleEx WinAPI_SetFilePointer WinAPI_SetFilePointerEx WinAPI_SetFileShortName WinAPI_SetFileValidData WinAPI_SetFocus WinAPI_SetFont WinAPI_SetForegroundWindow WinAPI_SetFRBuffer WinAPI_SetGraphicsMode WinAPI_SetHandleInformation WinAPI_SetInformationJobObject WinAPI_SetKeyboardLayout WinAPI_SetKeyboardState WinAPI_SetLastError WinAPI_SetLayeredWindowAttributes WinAPI_SetLocaleInfo WinAPI_SetMapMode WinAPI_SetMessageExtraInfo WinAPI_SetParent WinAPI_SetPixel WinAPI_SetPolyFillMode WinAPI_SetPriorityClass WinAPI_SetProcessAffinityMask WinAPI_SetProcessShutdownParameters WinAPI_SetProcessWindowStation WinAPI_SetRectRgn WinAPI_SetROP2 WinAPI_SetSearchPathMode WinAPI_SetStretchBltMode WinAPI_SetSysColors WinAPI_SetSystemCursor WinAPI_SetTextAlign WinAPI_SetTextCharacterExtra WinAPI_SetTextColor WinAPI_SetTextJustification WinAPI_SetThemeAppProperties WinAPI_SetThreadDesktop WinAPI_SetThreadErrorMode WinAPI_SetThreadExecutionState WinAPI_SetThreadLocale WinAPI_SetThreadUILanguage WinAPI_SetTimer WinAPI_SetUDFColorMode WinAPI_SetUserGeoID WinAPI_SetUserObjectInformation WinAPI_SetVolumeMountPoint WinAPI_SetWindowDisplayAffinity WinAPI_SetWindowExt WinAPI_SetWindowLong WinAPI_SetWindowOrg WinAPI_SetWindowPlacement WinAPI_SetWindowPos WinAPI_SetWindowRgn WinAPI_SetWindowsHookEx WinAPI_SetWindowSubclass WinAPI_SetWindowText WinAPI_SetWindowTheme WinAPI_SetWinEventHook WinAPI_SetWorldTransform WinAPI_SfcIsFileProtected WinAPI_SfcIsKeyProtected WinAPI_ShellAboutDlg WinAPI_ShellAddToRecentDocs WinAPI_ShellChangeNotify WinAPI_ShellChangeNotifyDeregister WinAPI_ShellChangeNotifyRegister WinAPI_ShellCreateDirectory WinAPI_ShellEmptyRecycleBin WinAPI_ShellExecute WinAPI_ShellExecuteEx WinAPI_ShellExtractAssociatedIcon WinAPI_ShellExtractIcon WinAPI_ShellFileOperation WinAPI_ShellFlushSFCache WinAPI_ShellGetFileInfo WinAPI_ShellGetIconOverlayIndex WinAPI_ShellGetImageList WinAPI_ShellGetKnownFolderIDList WinAPI_ShellGetKnownFolderPath WinAPI_ShellGetLocalizedName WinAPI_ShellGetPathFromIDList WinAPI_ShellGetSetFolderCustomSettings WinAPI_ShellGetSettings WinAPI_ShellGetSpecialFolderLocation WinAPI_ShellGetSpecialFolderPath WinAPI_ShellGetStockIconInfo WinAPI_ShellILCreateFromPath WinAPI_ShellNotifyIcon WinAPI_ShellNotifyIconGetRect WinAPI_ShellObjectProperties WinAPI_ShellOpenFolderAndSelectItems WinAPI_ShellOpenWithDlg WinAPI_ShellQueryRecycleBin WinAPI_ShellQueryUserNotificationState WinAPI_ShellRemoveLocalizedName WinAPI_ShellRestricted WinAPI_ShellSetKnownFolderPath WinAPI_ShellSetLocalizedName WinAPI_ShellSetSettings WinAPI_ShellStartNetConnectionDlg WinAPI_ShellUpdateImage WinAPI_ShellUserAuthenticationDlg WinAPI_ShellUserAuthenticationDlgEx WinAPI_ShortToWord WinAPI_ShowCaret WinAPI_ShowCursor WinAPI_ShowError WinAPI_ShowLastError WinAPI_ShowMsg WinAPI_ShowOwnedPopups WinAPI_ShowWindow WinAPI_ShutdownBlockReasonCreate WinAPI_ShutdownBlockReasonDestroy WinAPI_ShutdownBlockReasonQuery WinAPI_SizeOfResource WinAPI_StretchBlt WinAPI_StretchDIBits WinAPI_StrFormatByteSize WinAPI_StrFormatByteSizeEx WinAPI_StrFormatKBSize WinAPI_StrFromTimeInterval WinAPI_StringFromGUID WinAPI_StringLenA WinAPI_StringLenW WinAPI_StrLen WinAPI_StrokeAndFillPath WinAPI_StrokePath WinAPI_StructToArray WinAPI_SubLangId WinAPI_SubtractRect WinAPI_SwapDWord WinAPI_SwapQWord WinAPI_SwapWord WinAPI_SwitchColor WinAPI_SwitchDesktop WinAPI_SwitchToThisWindow WinAPI_SystemParametersInfo WinAPI_TabbedTextOut WinAPI_TerminateJobObject WinAPI_TerminateProcess WinAPI_TextOut WinAPI_TileWindows WinAPI_TrackMouseEvent WinAPI_TransparentBlt WinAPI_TwipsPerPixelX WinAPI_TwipsPerPixelY WinAPI_UnhookWindowsHookEx WinAPI_UnhookWinEvent WinAPI_UnionRect WinAPI_UnionStruct WinAPI_UniqueHardwareID WinAPI_UnloadKeyboardLayout WinAPI_UnlockFile WinAPI_UnmapViewOfFile WinAPI_UnregisterApplicationRestart WinAPI_UnregisterClass WinAPI_UnregisterHotKey WinAPI_UnregisterPowerSettingNotification WinAPI_UpdateLayeredWindow WinAPI_UpdateLayeredWindowEx WinAPI_UpdateLayeredWindowIndirect WinAPI_UpdateResource WinAPI_UpdateWindow WinAPI_UrlApplyScheme WinAPI_UrlCanonicalize WinAPI_UrlCombine WinAPI_UrlCompare WinAPI_UrlCreateFromPath WinAPI_UrlFixup WinAPI_UrlGetPart WinAPI_UrlHash WinAPI_UrlIs WinAPI_UserHandleGrantAccess WinAPI_ValidateRect WinAPI_ValidateRgn WinAPI_VerQueryRoot WinAPI_VerQueryValue WinAPI_VerQueryValueEx WinAPI_WaitForInputIdle WinAPI_WaitForMultipleObjects WinAPI_WaitForSingleObject WinAPI_WideCharToMultiByte WinAPI_WidenPath WinAPI_WindowFromDC WinAPI_WindowFromPoint WinAPI_WordToShort WinAPI_Wow64EnableWow64FsRedirection WinAPI_WriteConsole WinAPI_WriteFile WinAPI_WriteProcessMemory WinAPI_ZeroMemory WinNet_AddConnection WinNet_AddConnection2 WinNet_AddConnection3 WinNet_CancelConnection WinNet_CancelConnection2 WinNet_CloseEnum WinNet_ConnectionDialog WinNet_ConnectionDialog1 WinNet_DisconnectDialog WinNet_DisconnectDialog1 WinNet_EnumResource WinNet_GetConnection WinNet_GetConnectionPerformance WinNet_GetLastError WinNet_GetNetworkInformation WinNet_GetProviderName WinNet_GetResourceInformation WinNet_GetResourceParent WinNet_GetUniversalName WinNet_GetUser WinNet_OpenEnum WinNet_RestoreConnection WinNet_UseConnection Word_Create Word_DocAdd Word_DocAttach Word_DocClose Word_DocExport Word_DocFind Word_DocFindReplace Word_DocGet Word_DocLinkAdd Word_DocLinkGet Word_DocOpen Word_DocPictureAdd Word_DocPrint Word_DocRangeSet Word_DocSave Word_DocSaveAs Word_DocTableRead Word_DocTableWrite Word_Quit",
            literal: "True False And Null Not Or"
        },
        c: [t, r, i, n, {
            cN: "meta",
            b: "#",
            e: "$",
            k: {
                "meta-keyword": "include include-once NoTrayIcon OnAutoItStartRegister RequireAdmin pragma Au3Stripper_Ignore_Funcs Au3Stripper_Ignore_Variables Au3Stripper_Off Au3Stripper_On Au3Stripper_Parameters AutoIt3Wrapper_Add_Constants AutoIt3Wrapper_Au3Check_Parameters AutoIt3Wrapper_Au3Check_Stop_OnWarning AutoIt3Wrapper_Aut2Exe AutoIt3Wrapper_AutoIt3 AutoIt3Wrapper_AutoIt3Dir AutoIt3Wrapper_Change2CUI AutoIt3Wrapper_Compile_Both AutoIt3Wrapper_Compression AutoIt3Wrapper_EndIf AutoIt3Wrapper_Icon AutoIt3Wrapper_If_Compile AutoIt3Wrapper_If_Run AutoIt3Wrapper_Jump_To_First_Error AutoIt3Wrapper_OutFile AutoIt3Wrapper_OutFile_Type AutoIt3Wrapper_OutFile_X64 AutoIt3Wrapper_PlugIn_Funcs AutoIt3Wrapper_Res_Comment Autoit3Wrapper_Res_Compatibility AutoIt3Wrapper_Res_Description AutoIt3Wrapper_Res_Field AutoIt3Wrapper_Res_File_Add AutoIt3Wrapper_Res_FileVersion AutoIt3Wrapper_Res_FileVersion_AutoIncrement AutoIt3Wrapper_Res_Icon_Add AutoIt3Wrapper_Res_Language AutoIt3Wrapper_Res_LegalCopyright AutoIt3Wrapper_Res_ProductVersion AutoIt3Wrapper_Res_requestedExecutionLevel AutoIt3Wrapper_Res_SaveSource AutoIt3Wrapper_Run_After AutoIt3Wrapper_Run_Au3Check AutoIt3Wrapper_Run_Au3Stripper AutoIt3Wrapper_Run_Before AutoIt3Wrapper_Run_Debug_Mode AutoIt3Wrapper_Run_SciTE_Minimized AutoIt3Wrapper_Run_SciTE_OutputPane_Minimized AutoIt3Wrapper_Run_Tidy AutoIt3Wrapper_ShowProgress AutoIt3Wrapper_Testing AutoIt3Wrapper_Tidy_Stop_OnError AutoIt3Wrapper_UPX_Parameters AutoIt3Wrapper_UseUPX AutoIt3Wrapper_UseX64 AutoIt3Wrapper_Version AutoIt3Wrapper_Versioning AutoIt3Wrapper_Versioning_Parameters Tidy_Off Tidy_On Tidy_Parameters EndRegion Region"
            },
            c: [{
                b: /\\\n/,
                r: 0
            }, {
                bK: "include",
                k: {
                    "meta-keyword": "include"
                },
                e: "$",
                c: [i, {
                    cN: "meta-string",
                    v: [{
                        b: "<",
                        e: ">"
                    }, {
                        b: /"/,
                        e: /"/,
                        c: [{
                            b: /""/,
                            r: 0
                        }]
                    }, {
                        b: /'/,
                        e: /'/,
                        c: [{
                            b: /''/,
                            r: 0
                        }]
                    }]
                }]
            }, i, t]
        }, {
            cN: "symbol",
            b: "@[A-z0-9_]+"
        }, {
            cN: "function",
            bK: "Func",
            e: "$",
            i: "\\$|\\[|%",
            c: [e.UTM, {
                cN: "params",
                b: "\\(",
                e: "\\)",
                c: [r, i, n]
            }]
        }]
    }
}),
hljs.registerLanguage("r", function(e) {
    var t = "([a-zA-Z]|\\.[a-zA-Z.])[a-zA-Z0-9._]*";
    return {
        c: [e.HCM, {
            b: t,
            l: t,
            k: {
                keyword: "function if in break next repeat else for return switch while try tryCatch stop warning require library attach detach source setMethod setGeneric setGroupGeneric setClass ...",
                literal: "NULL NA TRUE FALSE T F Inf NaN NA_integer_|10 NA_real_|10 NA_character_|10 NA_complex_|10"
            },
            r: 0
        }, {
            cN: "number",
            b: "0[xX][0-9a-fA-F]+[Li]?\\b",
            r: 0
        }, {
            cN: "number",
            b: "\\d+(?:[eE][+\\-]?\\d*)?L\\b",
            r: 0
        }, {
            cN: "number",
            b: "\\d+\\.(?!\\d)(?:i\\b)?",
            r: 0
        }, {
            cN: "number",
            b: "\\d+(?:\\.\\d*)?(?:[eE][+\\-]?\\d*)?i?\\b",
            r: 0
        }, {
            cN: "number",
            b: "\\.\\d+(?:[eE][+\\-]?\\d*)?i?\\b",
            r: 0
        }, {
            b: "`",
            e: "`",
            r: 0
        }, {
            cN: "string",
            c: [e.BE],
            v: [{
                b: '"',
                e: '"'
            }, {
                b: "'",
                e: "'"
            }]
        }]
    }
}),
hljs.registerLanguage("scheme", function(e) {
    var t = "[^\\(\\)\\[\\]\\{\\}\",'`;#|\\\\\\s]+"
      , r = "(\\-|\\+)?\\d+([./]\\d+)?"
      , i = {
        "builtin-name": "case-lambda call/cc class define-class exit-handler field import inherit init-field interface let*-values let-values let/ec mixin opt-lambda override protect provide public rename require require-for-syntax syntax syntax-case syntax-error unit/sig unless when with-syntax and begin call-with-current-continuation call-with-input-file call-with-output-file case cond define define-syntax delay do dynamic-wind else for-each if lambda let let* let-syntax letrec letrec-syntax map or syntax-rules ' * + , ,@ - ... / ; < <= = => > >= ` abs acos angle append apply asin assoc assq assv atan boolean? caar cadr call-with-input-file call-with-output-file call-with-values car cdddar cddddr cdr ceiling char->integer char-alphabetic? char-ci<=? char-ci<? char-ci=? char-ci>=? char-ci>? char-downcase char-lower-case? char-numeric? char-ready? char-upcase char-upper-case? char-whitespace? char<=? char<? char=? char>=? char>? char? close-input-port close-output-port complex? cons cos current-input-port current-output-port denominator display eof-object? eq? equal? eqv? eval even? exact->inexact exact? exp expt floor force gcd imag-part inexact->exact inexact? input-port? integer->char integer? interaction-environment lcm length list list->string list->vector list-ref list-tail list? load log magnitude make-polar make-rectangular make-string make-vector max member memq memv min modulo negative? newline not null-environment null? number->string number? numerator odd? open-input-file open-output-file output-port? pair? peek-char port? positive? procedure? quasiquote quote quotient rational? rationalize read read-char real-part real? remainder reverse round scheme-report-environment set! set-car! set-cdr! sin sqrt string string->list string->number string->symbol string-append string-ci<=? string-ci<? string-ci=? string-ci>=? string-ci>? string-copy string-fill! string-length string-ref string-set! string<=? string<? string=? string>=? string>? string? substring symbol->string symbol? tan transcript-off transcript-on truncate values vector vector->list vector-fill! vector-length vector-ref vector-set! with-input-from-file with-output-to-file write write-char zero?"
    }
      , n = {
        cN: "meta",
        b: "^#!",
        e: "$"
    }
      , a = {
        cN: "literal",
        b: "(#t|#f|#\\\\" + t + "|#\\\\.)"
    }
      , o = {
        cN: "number",
        v: [{
            b: r,
            r: 0
        }, {
            b: "(\\-|\\+)?\\d+([./]\\d+)?[+\\-](\\-|\\+)?\\d+([./]\\d+)?i",
            r: 0
        }, {
            b: "#b[0-1]+(/[0-1]+)?"
        }, {
            b: "#o[0-7]+(/[0-7]+)?"
        }, {
            b: "#x[0-9a-f]+(/[0-9a-f]+)?"
        }]
    }
      , s = e.QSM
      , l = [e.C(";", "$", {
        r: 0
    }), e.C("#\\|", "\\|#")]
      , c = {
        b: t,
        r: 0
    }
      , d = {
        cN: "symbol",
        b: "'" + t
    }
      , u = {
        eW: !0,
        r: 0
    }
      , p = {
        v: [{
            b: "\\(",
            e: "\\)"
        }, {
            b: "\\[",
            e: "\\]"
        }],
        c: [{
            cN: "name",
            b: t,
            l: t,
            k: i
        }, u]
    };
    return u.c = [a, o, s, c, d, p].concat(l),
    {
        i: /\S/,
        c: [n, o, s, d, p].concat(l)
    }
}),
hljs.registerLanguage("ruby", function(e) {
    var t = "[a-zA-Z_]\\w*[!?=]?|[-+~]\\@|<<|>>|=~|===?|<=>|[<>]=?|\\*\\*|[-/+%^&*~`|]|\\[\\]=?"
      , r = "and false then defined module in return redo if BEGIN retry end for true self when next until do begin unless END rescue nil else break undef not super class case require yield alias while ensure elsif or include attr_reader attr_writer attr_accessor"
      , i = {
        cN: "doctag",
        b: "@[A-Za-z]+"
    }
      , n = {
        b: "#<",
        e: ">"
    }
      , a = [e.C("#", "$", {
        c: [i]
    }), e.C("^\\=begin", "^\\=end", {
        c: [i],
        r: 10
    }), e.C("^__END__", "\\n$")]
      , o = {
        cN: "subst",
        b: "#\\{",
        e: "}",
        k: r
    }
      , s = {
        cN: "string",
        c: [e.BE, o],
        v: [{
            b: /'/,
            e: /'/
        }, {
            b: /"/,
            e: /"/
        }, {
            b: /`/,
            e: /`/
        }, {
            b: "%[qQwWx]?\\(",
            e: "\\)"
        }, {
            b: "%[qQwWx]?\\[",
            e: "\\]"
        }, {
            b: "%[qQwWx]?{",
            e: "}"
        }, {
            b: "%[qQwWx]?<",
            e: ">"
        }, {
            b: "%[qQwWx]?/",
            e: "/"
        }, {
            b: "%[qQwWx]?%",
            e: "%"
        }, {
            b: "%[qQwWx]?-",
            e: "-"
        }, {
            b: "%[qQwWx]?\\|",
            e: "\\|"
        }, {
            b: /\B\?(\\\d{1,3}|\\x[A-Fa-f0-9]{1,2}|\\u[A-Fa-f0-9]{4}|\\?\S)\b/
        }]
    }
      , l = {
        cN: "params",
        b: "\\(",
        e: "\\)",
        endsParent: !0,
        k: r
    }
      , c = [s, n, {
        cN: "class",
        bK: "class module",
        e: "$|;",
        i: /=/,
        c: [e.inherit(e.TM, {
            b: "[A-Za-z_]\\w*(::\\w+)*(\\?|\\!)?"
        }), {
            b: "<\\s*",
            c: [{
                b: "(" + e.IR + "::)?" + e.IR
            }]
        }].concat(a)
    }, {
        cN: "function",
        bK: "def",
        e: "$|;",
        c: [e.inherit(e.TM, {
            b: t
        }), l].concat(a)
    }, {
        cN: "symbol",
        b: e.UIR + "(\\!|\\?)?:",
        r: 0
    }, {
        cN: "symbol",
        b: ":",
        c: [s, {
            b: t
        }],
        r: 0
    }, {
        cN: "number",
        b: "(\\b0[0-7_]+)|(\\b0x[0-9a-fA-F_]+)|(\\b[1-9][0-9_]*(\\.[0-9_]+)?)|[0_]\\b",
        r: 0
    }, {
        b: "(\\$\\W)|((\\$|\\@\\@?)(\\w+))"
    }, {
        b: "(" + e.RSR + ")\\s*",
        c: [n, {
            cN: "regexp",
            c: [e.BE, o],
            i: /\n/,
            v: [{
                b: "/",
                e: "/[a-z]*"
            }, {
                b: "%r{",
                e: "}[a-z]*"
            }, {
                b: "%r\\(",
                e: "\\)[a-z]*"
            }, {
                b: "%r!",
                e: "![a-z]*"
            }, {
                b: "%r\\[",
                e: "\\][a-z]*"
            }]
        }].concat(a),
        r: 0
    }].concat(a);
    o.c = c,
    l.c = c;
    var d = [{
        b: /^\s*=>/,
        starts: {
            e: "$",
            c: c
        }
    }, {
        cN: "meta",
        b: "^([>?]>|[\\w#]+\\(\\w+\\):\\d+:\\d+>|(\\w+-)?\\d+\\.\\d+\\.\\d(p\\d+)?[^>]+>)",
        starts: {
            e: "$",
            c: c
        }
    }];
    return {
        aliases: ["rb", "gemspec", "podspec", "thor", "irb"],
        k: r,
        i: /\/\*/,
        c: a.concat(d).concat(c)
    }
}),
hljs.registerLanguage("coffeescript", function(e) {
    var t = {
        keyword: "in if for while finally new do return else break catch instanceof throw try this switch continue typeof delete debugger super then unless until loop of by when and or is isnt not",
        literal: "true false null undefined yes no on off",
        built_in: "npm require console print module global window document"
    }
      , r = "[A-Za-z$_][0-9A-Za-z$_]*"
      , i = {
        cN: "subst",
        b: /#\{/,
        e: /}/,
        k: t
    }
      , n = [e.BNM, e.inherit(e.CNM, {
        starts: {
            e: "(\\s*/)?",
            r: 0
        }
    }), {
        cN: "string",
        v: [{
            b: /'''/,
            e: /'''/,
            c: [e.BE]
        }, {
            b: /'/,
            e: /'/,
            c: [e.BE]
        }, {
            b: /"""/,
            e: /"""/,
            c: [e.BE, i]
        }, {
            b: /"/,
            e: /"/,
            c: [e.BE, i]
        }]
    }, {
        cN: "regexp",
        v: [{
            b: "///",
            e: "///",
            c: [i, e.HCM]
        }, {
            b: "//[gim]*",
            r: 0
        }, {
            b: /\/(?![ *])(\\\/|.)*?\/[gim]*(?=\W|$)/
        }]
    }, {
        b: "@" + r
    }, {
        b: "`",
        e: "`",
        eB: !0,
        eE: !0,
        sL: "javascript"
    }];
    i.c = n;
    var a = e.inherit(e.TM, {
        b: r
    })
      , o = "(\\(.*\\))?\\s*\\B[-=]>"
      , s = {
        cN: "params",
        b: "\\([^\\(]",
        rB: !0,
        c: [{
            b: /\(/,
            e: /\)/,
            k: t,
            c: ["self"].concat(n)
        }]
    };
    return {
        aliases: ["coffee", "cson", "iced"],
        k: t,
        i: /\/\*/,
        c: n.concat([e.C("###", "###"), e.HCM, {
            cN: "function",
            b: "^\\s*" + r + "\\s*=\\s*" + o,
            e: "[-=]>",
            rB: !0,
            c: [a, s]
        }, {
            b: /[:\(,=]\s*/,
            r: 0,
            c: [{
                cN: "function",
                b: o,
                e: "[-=]>",
                rB: !0,
                c: [s]
            }]
        }, {
            cN: "class",
            bK: "class",
            e: "$",
            i: /[:="\[\]]/,
            c: [{
                bK: "extends",
                eW: !0,
                i: /[:="\[\]]/,
                c: [a]
            }, a]
        }, {
            b: r + ":",
            e: ":",
            rB: !0,
            rE: !0,
            r: 0
        }])
    }
}),
hljs.registerLanguage("hsp", function(e) {
    return {
        cI: !0,
        k: "goto gosub return break repeat loop continue wait await dim sdim foreach dimtype dup dupptr end stop newmod delmod mref run exgoto on mcall assert logmes newlab resume yield onexit onerror onkey onclick oncmd exist delete mkdir chdir dirlist bload bsave bcopy memfile if else poke wpoke lpoke getstr chdpm memexpand memcpy memset notesel noteadd notedel noteload notesave randomize noteunsel noteget split strrep setease button chgdisp exec dialog mmload mmplay mmstop mci pset pget syscolor mes print title pos circle cls font sysfont objsize picload color palcolor palette redraw width gsel gcopy gzoom gmode bmpsave hsvcolor getkey listbox chkbox combox input mesbox buffer screen bgscr mouse objsel groll line clrobj boxf objprm objmode stick grect grotate gsquare gradf objimage objskip objenable celload celdiv celput newcom querycom delcom cnvstow comres axobj winobj sendmsg comevent comevarg sarrayconv callfunc cnvwtos comevdisp libptr system hspstat hspver stat cnt err strsize looplev sublev iparam wparam lparam refstr refdval int rnd strlen length length2 length3 length4 vartype gettime peek wpeek lpeek varptr varuse noteinfo instr abs limit getease str strmid strf getpath strtrim sin cos tan atan sqrt double absf expf logf limitf powf geteasef mousex mousey mousew hwnd hinstance hdc ginfo objinfo dirinfo sysinfo thismod __hspver__ __hsp30__ __date__ __time__ __line__ __file__ _debug __hspdef__ and or xor not screen_normal screen_palette screen_hide screen_fixedsize screen_tool screen_frame gmode_gdi gmode_mem gmode_rgb0 gmode_alpha gmode_rgb0alpha gmode_add gmode_sub gmode_pixela ginfo_mx ginfo_my ginfo_act ginfo_sel ginfo_wx1 ginfo_wy1 ginfo_wx2 ginfo_wy2 ginfo_vx ginfo_vy ginfo_sizex ginfo_sizey ginfo_winx ginfo_winy ginfo_mesx ginfo_mesy ginfo_r ginfo_g ginfo_b ginfo_paluse ginfo_dispx ginfo_dispy ginfo_cx ginfo_cy ginfo_intid ginfo_newid ginfo_sx ginfo_sy objinfo_mode objinfo_bmscr objinfo_hwnd notemax notesize dir_cur dir_exe dir_win dir_sys dir_cmdline dir_desktop dir_mydoc dir_tv font_normal font_bold font_italic font_underline font_strikeout font_antialias objmode_normal objmode_guifont objmode_usefont gsquare_grad msgothic msmincho do until while wend for next _break _continue switch case default swbreak swend ddim ldim alloc m_pi rad2deg deg2rad ease_linear ease_quad_in ease_quad_out ease_quad_inout ease_cubic_in ease_cubic_out ease_cubic_inout ease_quartic_in ease_quartic_out ease_quartic_inout ease_bounce_in ease_bounce_out ease_bounce_inout ease_shake_in ease_shake_out ease_shake_inout ease_loop",
        c: [e.CLCM, e.CBCM, e.QSM, e.ASM, {
            cN: "string",
            b: '{"',
            e: '"}',
            c: [e.BE]
        }, e.C(";", "$"), {
            cN: "meta",
            b: "#",
            e: "$",
            k: {
                "meta-keyword": "addion cfunc cmd cmpopt comfunc const defcfunc deffunc define else endif enum epack func global if ifdef ifndef include modcfunc modfunc modinit modterm module pack packopt regcmd runtime undef usecom uselib"
            },
            c: [e.inherit(e.QSM, {
                cN: "meta-string"
            }), e.NM, e.CNM, e.CLCM, e.CBCM]
        }, {
            cN: "symbol",
            b: "^\\*(\\w+|@)"
        }, e.NM, e.CNM]
    }
}),
hljs.registerLanguage("vbscript-html", function(e) {
    return {
        sL: "xml",
        c: [{
            b: "<%",
            e: "%>",
            sL: "vbscript"
        }]
    }
}),
hljs.registerLanguage("mel", function(e) {
    return {
        k: "int float string vector matrix if else switch case default while do for in break continue global proc return about abs addAttr addAttributeEditorNodeHelp addDynamic addNewShelfTab addPP addPanelCategory addPrefixToName advanceToNextDrivenKey affectedNet affects aimConstraint air alias aliasAttr align alignCtx alignCurve alignSurface allViewFit ambientLight angle angleBetween animCone animCurveEditor animDisplay animView annotate appendStringArray applicationName applyAttrPreset applyTake arcLenDimContext arcLengthDimension arclen arrayMapper art3dPaintCtx artAttrCtx artAttrPaintVertexCtx artAttrSkinPaintCtx artAttrTool artBuildPaintMenu artFluidAttrCtx artPuttyCtx artSelectCtx artSetPaintCtx artUserPaintCtx assignCommand assignInputDevice assignViewportFactories attachCurve attachDeviceAttr attachSurface attrColorSliderGrp attrCompatibility attrControlGrp attrEnumOptionMenu attrEnumOptionMenuGrp attrFieldGrp attrFieldSliderGrp attrNavigationControlGrp attrPresetEditWin attributeExists attributeInfo attributeMenu attributeQuery autoKeyframe autoPlace bakeClip bakeFluidShading bakePartialHistory bakeResults bakeSimulation basename basenameEx batchRender bessel bevel bevelPlus binMembership bindSkin blend2 blendShape blendShapeEditor blendShapePanel blendTwoAttr blindDataType boneLattice boundary boxDollyCtx boxZoomCtx bufferCurve buildBookmarkMenu buildKeyframeMenu button buttonManip CBG cacheFile cacheFileCombine cacheFileMerge cacheFileTrack camera cameraView canCreateManip canvas capitalizeString catch catchQuiet ceil changeSubdivComponentDisplayLevel changeSubdivRegion channelBox character characterMap characterOutlineEditor characterize chdir checkBox checkBoxGrp checkDefaultRenderGlobals choice circle circularFillet clamp clear clearCache clip clipEditor clipEditorCurrentTimeCtx clipSchedule clipSchedulerOutliner clipTrimBefore closeCurve closeSurface cluster cmdFileOutput cmdScrollFieldExecuter cmdScrollFieldReporter cmdShell coarsenSubdivSelectionList collision color colorAtPoint colorEditor colorIndex colorIndexSliderGrp colorSliderButtonGrp colorSliderGrp columnLayout commandEcho commandLine commandPort compactHairSystem componentEditor compositingInterop computePolysetVolume condition cone confirmDialog connectAttr connectControl connectDynamic connectJoint connectionInfo constrain constrainValue constructionHistory container containsMultibyte contextInfo control convertFromOldLayers convertIffToPsd convertLightmap convertSolidTx convertTessellation convertUnit copyArray copyFlexor copyKey copySkinWeights cos cpButton cpCache cpClothSet cpCollision cpConstraint cpConvClothToMesh cpForces cpGetSolverAttr cpPanel cpProperty cpRigidCollisionFilter cpSeam cpSetEdit cpSetSolverAttr cpSolver cpSolverTypes cpTool cpUpdateClothUVs createDisplayLayer createDrawCtx createEditor createLayeredPsdFile createMotionField createNewShelf createNode createRenderLayer createSubdivRegion cross crossProduct ctxAbort ctxCompletion ctxEditMode ctxTraverse currentCtx currentTime currentTimeCtx currentUnit curve curveAddPtCtx curveCVCtx curveEPCtx curveEditorCtx curveIntersect curveMoveEPCtx curveOnSurface curveSketchCtx cutKey cycleCheck cylinder dagPose date defaultLightListCheckBox defaultNavigation defineDataServer defineVirtualDevice deformer deg_to_rad delete deleteAttr deleteShadingGroupsAndMaterials deleteShelfTab deleteUI deleteUnusedBrushes delrandstr detachCurve detachDeviceAttr detachSurface deviceEditor devicePanel dgInfo dgdirty dgeval dgtimer dimWhen directKeyCtx directionalLight dirmap dirname disable disconnectAttr disconnectJoint diskCache displacementToPoly displayAffected displayColor displayCull displayLevelOfDetail displayPref displayRGBColor displaySmoothness displayStats displayString displaySurface distanceDimContext distanceDimension doBlur dolly dollyCtx dopeSheetEditor dot dotProduct doubleProfileBirailSurface drag dragAttrContext draggerContext dropoffLocator duplicate duplicateCurve duplicateSurface dynCache dynControl dynExport dynExpression dynGlobals dynPaintEditor dynParticleCtx dynPref dynRelEdPanel dynRelEditor dynamicLoad editAttrLimits editDisplayLayerGlobals editDisplayLayerMembers editRenderLayerAdjustment editRenderLayerGlobals editRenderLayerMembers editor editorTemplate effector emit emitter enableDevice encodeString endString endsWith env equivalent equivalentTol erf error eval evalDeferred evalEcho event exactWorldBoundingBox exclusiveLightCheckBox exec executeForEachObject exists exp expression expressionEditorListen extendCurve extendSurface extrude fcheck fclose feof fflush fgetline fgetword file fileBrowserDialog fileDialog fileExtension fileInfo filetest filletCurve filter filterCurve filterExpand filterStudioImport findAllIntersections findAnimCurves findKeyframe findMenuItem findRelatedSkinCluster finder firstParentOf fitBspline flexor floatEq floatField floatFieldGrp floatScrollBar floatSlider floatSlider2 floatSliderButtonGrp floatSliderGrp floor flow fluidCacheInfo fluidEmitter fluidVoxelInfo flushUndo fmod fontDialog fopen formLayout format fprint frameLayout fread freeFormFillet frewind fromNativePath fwrite gamma gauss geometryConstraint getApplicationVersionAsFloat getAttr getClassification getDefaultBrush getFileList getFluidAttr getInputDeviceRange getMayaPanelTypes getModifiers getPanel getParticleAttr getPluginResource getenv getpid glRender glRenderEditor globalStitch gmatch goal gotoBindPose grabColor gradientControl gradientControlNoAttr graphDollyCtx graphSelectContext graphTrackCtx gravity grid gridLayout group groupObjectsByName HfAddAttractorToAS HfAssignAS HfBuildEqualMap HfBuildFurFiles HfBuildFurImages HfCancelAFR HfConnectASToHF HfCreateAttractor HfDeleteAS HfEditAS HfPerformCreateAS HfRemoveAttractorFromAS HfSelectAttached HfSelectAttractors HfUnAssignAS hardenPointCurve hardware hardwareRenderPanel headsUpDisplay headsUpMessage help helpLine hermite hide hilite hitTest hotBox hotkey hotkeyCheck hsv_to_rgb hudButton hudSlider hudSliderButton hwReflectionMap hwRender hwRenderLoad hyperGraph hyperPanel hyperShade hypot iconTextButton iconTextCheckBox iconTextRadioButton iconTextRadioCollection iconTextScrollList iconTextStaticLabel ikHandle ikHandleCtx ikHandleDisplayScale ikSolver ikSplineHandleCtx ikSystem ikSystemInfo ikfkDisplayMethod illustratorCurves image imfPlugins inheritTransform insertJoint insertJointCtx insertKeyCtx insertKnotCurve insertKnotSurface instance instanceable instancer intField intFieldGrp intScrollBar intSlider intSliderGrp interToUI internalVar intersect iprEngine isAnimCurve isConnected isDirty isParentOf isSameObject isTrue isValidObjectName isValidString isValidUiName isolateSelect itemFilter itemFilterAttr itemFilterRender itemFilterType joint jointCluster jointCtx jointDisplayScale jointLattice keyTangent keyframe keyframeOutliner keyframeRegionCurrentTimeCtx keyframeRegionDirectKeyCtx keyframeRegionDollyCtx keyframeRegionInsertKeyCtx keyframeRegionMoveKeyCtx keyframeRegionScaleKeyCtx keyframeRegionSelectKeyCtx keyframeRegionSetKeyCtx keyframeRegionTrackCtx keyframeStats lassoContext lattice latticeDeformKeyCtx launch launchImageEditor layerButton layeredShaderPort layeredTexturePort layout layoutDialog lightList lightListEditor lightListPanel lightlink lineIntersection linearPrecision linstep listAnimatable listAttr listCameras listConnections listDeviceAttachments listHistory listInputDeviceAxes listInputDeviceButtons listInputDevices listMenuAnnotation listNodeTypes listPanelCategories listRelatives listSets listTransforms listUnselected listerEditor loadFluid loadNewShelf loadPlugin loadPluginLanguageResources loadPrefObjects localizedPanelLabel lockNode loft log longNameOf lookThru ls lsThroughFilter lsType lsUI Mayatomr mag makeIdentity makeLive makePaintable makeRoll makeSingleSurface makeTubeOn makebot manipMoveContext manipMoveLimitsCtx manipOptions manipRotateContext manipRotateLimitsCtx manipScaleContext manipScaleLimitsCtx marker match max memory menu menuBarLayout menuEditor menuItem menuItemToShelf menuSet menuSetPref messageLine min minimizeApp mirrorJoint modelCurrentTimeCtx modelEditor modelPanel mouse movIn movOut move moveIKtoFK moveKeyCtx moveVertexAlongDirection multiProfileBirailSurface mute nParticle nameCommand nameField namespace namespaceInfo newPanelItems newton nodeCast nodeIconButton nodeOutliner nodePreset nodeType noise nonLinear normalConstraint normalize nurbsBoolean nurbsCopyUVSet nurbsCube nurbsEditUV nurbsPlane nurbsSelect nurbsSquare nurbsToPoly nurbsToPolygonsPref nurbsToSubdiv nurbsToSubdivPref nurbsUVSet nurbsViewDirectionVector objExists objectCenter objectLayer objectType objectTypeUI obsoleteProc oceanNurbsPreviewPlane offsetCurve offsetCurveOnSurface offsetSurface openGLExtension openMayaPref optionMenu optionMenuGrp optionVar orbit orbitCtx orientConstraint outlinerEditor outlinerPanel overrideModifier paintEffectsDisplay pairBlend palettePort paneLayout panel panelConfiguration panelHistory paramDimContext paramDimension paramLocator parent parentConstraint particle particleExists particleInstancer particleRenderInfo partition pasteKey pathAnimation pause pclose percent performanceOptions pfxstrokes pickWalk picture pixelMove planarSrf plane play playbackOptions playblast plugAttr plugNode pluginInfo pluginResourceUtil pointConstraint pointCurveConstraint pointLight pointMatrixMult pointOnCurve pointOnSurface pointPosition poleVectorConstraint polyAppend polyAppendFacetCtx polyAppendVertex polyAutoProjection polyAverageNormal polyAverageVertex polyBevel polyBlendColor polyBlindData polyBoolOp polyBridgeEdge polyCacheMonitor polyCheck polyChipOff polyClipboard polyCloseBorder polyCollapseEdge polyCollapseFacet polyColorBlindData polyColorDel polyColorPerVertex polyColorSet polyCompare polyCone polyCopyUV polyCrease polyCreaseCtx polyCreateFacet polyCreateFacetCtx polyCube polyCut polyCutCtx polyCylinder polyCylindricalProjection polyDelEdge polyDelFacet polyDelVertex polyDuplicateAndConnect polyDuplicateEdge polyEditUV polyEditUVShell polyEvaluate polyExtrudeEdge polyExtrudeFacet polyExtrudeVertex polyFlipEdge polyFlipUV polyForceUV polyGeoSampler polyHelix polyInfo polyInstallAction polyLayoutUV polyListComponentConversion polyMapCut polyMapDel polyMapSew polyMapSewMove polyMergeEdge polyMergeEdgeCtx polyMergeFacet polyMergeFacetCtx polyMergeUV polyMergeVertex polyMirrorFace polyMoveEdge polyMoveFacet polyMoveFacetUV polyMoveUV polyMoveVertex polyNormal polyNormalPerVertex polyNormalizeUV polyOptUvs polyOptions polyOutput polyPipe polyPlanarProjection polyPlane polyPlatonicSolid polyPoke polyPrimitive polyPrism polyProjection polyPyramid polyQuad polyQueryBlindData polyReduce polySelect polySelectConstraint polySelectConstraintMonitor polySelectCtx polySelectEditCtx polySeparate polySetToFaceNormal polySewEdge polyShortestPathCtx polySmooth polySoftEdge polySphere polySphericalProjection polySplit polySplitCtx polySplitEdge polySplitRing polySplitVertex polyStraightenUVBorder polySubdivideEdge polySubdivideFacet polyToSubdiv polyTorus polyTransfer polyTriangulate polyUVSet polyUnite polyWedgeFace popen popupMenu pose pow preloadRefEd print progressBar progressWindow projFileViewer projectCurve projectTangent projectionContext projectionManip promptDialog propModCtx propMove psdChannelOutliner psdEditTextureFile psdExport psdTextureFile putenv pwd python querySubdiv quit rad_to_deg radial radioButton radioButtonGrp radioCollection radioMenuItemCollection rampColorPort rand randomizeFollicles randstate rangeControl readTake rebuildCurve rebuildSurface recordAttr recordDevice redo reference referenceEdit referenceQuery refineSubdivSelectionList refresh refreshAE registerPluginResource rehash reloadImage removeJoint removeMultiInstance removePanelCategory rename renameAttr renameSelectionList renameUI render renderGlobalsNode renderInfo renderLayerButton renderLayerParent renderLayerPostProcess renderLayerUnparent renderManip renderPartition renderQualityNode renderSettings renderThumbnailUpdate renderWindowEditor renderWindowSelectContext renderer reorder reorderDeformers requires reroot resampleFluid resetAE resetPfxToPolyCamera resetTool resolutionNode retarget reverseCurve reverseSurface revolve rgb_to_hsv rigidBody rigidSolver roll rollCtx rootOf rot rotate rotationInterpolation roundConstantRadius rowColumnLayout rowLayout runTimeCommand runup sampleImage saveAllShelves saveAttrPreset saveFluid saveImage saveInitialState saveMenu savePrefObjects savePrefs saveShelf saveToolSettings scale scaleBrushBrightness scaleComponents scaleConstraint scaleKey scaleKeyCtx sceneEditor sceneUIReplacement scmh scriptCtx scriptEditorInfo scriptJob scriptNode scriptTable scriptToShelf scriptedPanel scriptedPanelType scrollField scrollLayout sculpt searchPathArray seed selLoadSettings select selectContext selectCurveCV selectKey selectKeyCtx selectKeyframeRegionCtx selectMode selectPref selectPriority selectType selectedNodes selectionConnection separator setAttr setAttrEnumResource setAttrMapping setAttrNiceNameResource setConstraintRestPosition setDefaultShadingGroup setDrivenKeyframe setDynamic setEditCtx setEditor setFluidAttr setFocus setInfinity setInputDeviceMapping setKeyCtx setKeyPath setKeyframe setKeyframeBlendshapeTargetWts setMenuMode setNodeNiceNameResource setNodeTypeFlag setParent setParticleAttr setPfxToPolyCamera setPluginResource setProject setStampDensity setStartupMessage setState setToolTo setUITemplate setXformManip sets shadingConnection shadingGeometryRelCtx shadingLightRelCtx shadingNetworkCompare shadingNode shapeCompare shelfButton shelfLayout shelfTabLayout shellField shortNameOf showHelp showHidden showManipCtx showSelectionInTitle showShadingGroupAttrEditor showWindow sign simplify sin singleProfileBirailSurface size sizeBytes skinCluster skinPercent smoothCurve smoothTangentSurface smoothstep snap2to2 snapKey snapMode snapTogetherCtx snapshot soft softMod softModCtx sort sound soundControl source spaceLocator sphere sphrand spotLight spotLightPreviewPort spreadSheetEditor spring sqrt squareSurface srtContext stackTrace startString startsWith stitchAndExplodeShell stitchSurface stitchSurfacePoints strcmp stringArrayCatenate stringArrayContains stringArrayCount stringArrayInsertAtIndex stringArrayIntersector stringArrayRemove stringArrayRemoveAtIndex stringArrayRemoveDuplicates stringArrayRemoveExact stringArrayToString stringToStringArray strip stripPrefixFromName stroke subdAutoProjection subdCleanTopology subdCollapse subdDuplicateAndConnect subdEditUV subdListComponentConversion subdMapCut subdMapSewMove subdMatchTopology subdMirror subdToBlind subdToPoly subdTransferUVsToCache subdiv subdivCrease subdivDisplaySmoothness substitute substituteAllString substituteGeometry substring surface surfaceSampler surfaceShaderList swatchDisplayPort switchTable symbolButton symbolCheckBox sysFile system tabLayout tan tangentConstraint texLatticeDeformContext texManipContext texMoveContext texMoveUVShellContext texRotateContext texScaleContext texSelectContext texSelectShortestPathCtx texSmudgeUVContext texWinToolCtx text textCurves textField textFieldButtonGrp textFieldGrp textManip textScrollList textToShelf textureDisplacePlane textureHairColor texturePlacementContext textureWindow threadCount threePointArcCtx timeControl timePort timerX toNativePath toggle toggleAxis toggleWindowVisibility tokenize tokenizeList tolerance tolower toolButton toolCollection toolDropped toolHasOptions toolPropertyWindow torus toupper trace track trackCtx transferAttributes transformCompare transformLimits translator trim trunc truncateFluidCache truncateHairCache tumble tumbleCtx turbulence twoPointArcCtx uiRes uiTemplate unassignInputDevice undo undoInfo ungroup uniform unit unloadPlugin untangleUV untitledFileName untrim upAxis updateAE userCtx uvLink uvSnapshot validateShelfName vectorize view2dToolCtx viewCamera viewClipPlane viewFit viewHeadOn viewLookAt viewManip viewPlace viewSet visor volumeAxis vortex waitCursor warning webBrowser webBrowserPrefs whatIs window windowPref wire wireContext workspace wrinkle wrinkleContext writeTake xbmLangPathList xform",
        i: "</",
        c: [e.CNM, e.ASM, e.QSM, {
            cN: "string",
            b: "`",
            e: "`",
            c: [e.BE]
        }, {
            b: "[\\$\\%\\@](\\^\\w\\b|#\\w+|[^\\s\\w{]|{\\w+}|\\w+)"
        }, e.CLCM, e.CBCM]
    }
}),
hljs.registerLanguage("arduino", function(e) {
    var t = {
        cN: "string",
        v: [e.inherit(e.QSM, {
            b: '((u8?|U)|L)?"'
        }), {
            b: '(u8?|U)?R"',
            e: '"',
            c: [e.BE]
        }, {
            b: "'\\\\?.",
            e: "'",
            i: "."
        }]
    };
    return {
        k: {
            function: "setup loop while catch for if do goto try switch case else default break continue return",
            keyword: "boolean byte word string String array int float private char export virtual operator sizeof uint8_t uint16_t uint32_t uint64_t int8_t int16_t int32_t int64_t dynamic_cast typedef const_cast const struct static_cast union namespace unsigned long volatile static protected bool template mutable public friend auto void enum extern using class asm typeid short reinterpret_cast double register explicit signed typename this inline delete alignof constexpr decltype noexcept static_assert thread_local restrict _Bool complex _Complex _Imaginary atomic_bool atomic_char atomic_schar atomic_uchar atomic_short atomic_ushort atomic_int atomic_uint atomic_long atomic_ulong atomic_llong atomic_ullong",
            built_in: "KeyboardController MouseController SoftwareSerial EthernetServer EthernetClient LiquidCrystal RobotControl GSMVoiceCall EthernetUDP EsploraTFT HttpClient RobotMotor WiFiClient GSMScanner FileSystem Scheduler GSMServer YunClient YunServer IPAddress GSMClient GSMModem Keyboard Ethernet Console GSMBand Esplora Stepper Process WiFiUDP GSM_SMS Mailbox USBHost Firmata PImage Client Server GSMPIN FileIO Bridge Serial EEPROM Stream Mouse Audio Servo File Task GPRS WiFi Wire TFT GSM SPI SD runShellCommandAsynchronously analogWriteResolution retrieveCallingNumber printFirmwareVersion analogReadResolution sendDigitalPortPair noListenOnLocalhost readJoystickButton setFirmwareVersion readJoystickSwitch scrollDisplayRight getVoiceCallStatus scrollDisplayLeft writeMicroseconds delayMicroseconds beginTransmission getSignalStrength runAsynchronously getAsynchronously listenOnLocalhost getCurrentCarrier readAccelerometer messageAvailable sendDigitalPorts lineFollowConfig countryNameWrite runShellCommand readStringUntil rewindDirectory readTemperature setClockDivider readLightSensor endTransmission analogReference detachInterrupt countryNameRead attachInterrupt encryptionType readBytesUntil robotNameWrite readMicrophone robotNameRead cityNameWrite userNameWrite readJoystickY readJoystickX mouseReleased openNextFile scanNetworks noInterrupts digitalWrite beginSpeaker mousePressed isActionDone mouseDragged displayLogos noAutoscroll addParameter remoteNumber getModifiers keyboardRead userNameRead waitContinue processInput parseCommand printVersion readNetworks writeMessage blinkVersion cityNameRead readMessage setDataMode parsePacket isListening setBitOrder beginPacket isDirectory motorsWrite drawCompass digitalRead clearScreen serialEvent rightToLeft setTextSize leftToRight requestFrom keyReleased compassRead analogWrite interrupts WiFiServer disconnect playMelody parseFloat autoscroll getPINUsed setPINUsed setTimeout sendAnalog readSlider analogRead beginWrite createChar motorsStop keyPressed tempoWrite readButton subnetMask debugPrint macAddress writeGreen randomSeed attachGPRS readString sendString remotePort releaseAll mouseMoved background getXChange getYChange answerCall getResult voiceCall endPacket constrain getSocket writeJSON getButton available connected findUntil readBytes exitValue readGreen writeBlue startLoop IPAddress isPressed sendSysex pauseMode gatewayIP setCursor getOemKey tuneWrite noDisplay loadImage switchPIN onRequest onReceive changePIN playFile noBuffer parseInt overflow checkPIN knobRead beginTFT bitClear updateIR bitWrite position writeRGB highByte writeRed setSpeed readBlue noStroke remoteIP transfer shutdown hangCall beginSMS endWrite attached maintain noCursor checkReg checkPUK shiftOut isValid shiftIn pulseIn connect println localIP pinMode getIMEI display noBlink process getBand running beginSD drawBMP lowByte setBand release bitRead prepare pointTo readRed setMode noFill remove listen stroke detach attach noTone exists buffer height bitSet circle config cursor random IRread setDNS endSMS getKey micros millis begin print write ready flush width isPIN blink clear press mkdir rmdir close point yield image BSSID click delay read text move peek beep rect line open seek fill size turn stop home find step tone sqrt RSSI SSID end bit tan cos sin pow map abs max min get run put",
            symbol: "DIGITAL_MESSAGE FIRMATA_STRING ANALOG_MESSAGE REPORT_DIGITAL REPORT_ANALOG INPUT_PULLUP SET_PIN_MODE INTERNAL2V56 SYSTEM_RESET LED_BUILTIN INTERNAL1V1 SYSEX_START INTERNAL EXTERNAL DEFAULT OUTPUT INPUT HIGH LOW"
        },
        c: [{
            cN: "meta",
            b: "#",
            e: "$",
            k: {
                "meta-keyword": "if else elif endif define undef warning error line pragma ifdef ifndef"
            },
            c: [{
                b: /\\\n/,
                r: 0
            }, {
                bK: "include",
                e: "$",
                k: {
                    "meta-keyword": "include"
                },
                c: [e.inherit(t, {
                    cN: "meta-string"
                }), {
                    cN: "meta-string",
                    b: "<",
                    e: ">",
                    i: "\\n"
                }]
            }, t, e.CLCM, e.CBCM]
        }, e.CLCM, e.CBCM, e.ASM, e.QSM, e.CNM]
    }
}),
hljs.registerLanguage("prolog", function(e) {
    var t = {
        b: /[a-z][A-Za-z0-9_]*/,
        r: 0
    }
      , r = {
        cN: "symbol",
        v: [{
            b: /[A-Z][a-zA-Z0-9_]*/
        }, {
            b: /_[A-Za-z0-9_]*/
        }],
        r: 0
    }
      , i = {
        b: /\(/,
        e: /\)/,
        r: 0
    }
      , n = {
        b: /\[/,
        e: /\]/
    }
      , a = {
        cN: "comment",
        b: /%/,
        e: /$/,
        c: [e.PWM]
    }
      , o = {
        cN: "string",
        b: /`/,
        e: /`/,
        c: [e.BE]
    }
      , s = {
        cN: "string",
        b: /0\'(\\\'|.)/
    }
      , l = {
        cN: "string",
        b: /0\'\\s/
    }
      , c = {
        b: /:-/
    }
      , d = [t, r, i, c, n, a, e.CBCM, e.QSM, e.ASM, o, s, l, e.CNM];
    return i.c = d,
    n.c = d,
    {
        c: d.concat([{
            b: /\.$/
        }])
    }
}),
hljs.registerLanguage("http", function(e) {
    var t = "HTTP/[0-9\\.]+";
    return {
        aliases: ["https"],
        i: "\\S",
        c: [{
            b: "^" + t,
            e: "$",
            c: [{
                cN: "number",
                b: "\\b\\d{3}\\b"
            }]
        }, {
            b: "^[A-Z]+ (.*?) " + t + "$",
            rB: !0,
            e: "$",
            c: [{
                cN: "string",
                b: " ",
                e: " ",
                eB: !0,
                eE: !0
            }, {
                b: t
            }, {
                cN: "keyword",
                b: "[A-Z]+"
            }]
        }, {
            cN: "attribute",
            b: "^\\w",
            e: ": ",
            eE: !0,
            i: "\\n|\\s|=",
            starts: {
                e: "$",
                r: 0
            }
        }, {
            b: "\\n\\n",
            starts: {
                sL: [],
                eW: !0
            }
        }]
    }
}),
hljs.registerLanguage("pf", function(e) {
    var t = {
        cN: "variable",
        b: /\$[\w\d#@][\w\d_]*/
    }
      , r = {
        cN: "variable",
        b: /</,
        e: />/
    };
    return {
        aliases: ["pf.conf"],
        l: /[a-z0-9_<>-]+/,
        k: {
            built_in: "block match pass load anchor|5 antispoof|10 set table",
            keyword: "in out log quick on rdomain inet inet6 proto from port os to routeallow-opts divert-packet divert-reply divert-to flags group icmp-typeicmp6-type label once probability recieved-on rtable prio queuetos tag tagged user keep fragment for os dropaf-to|10 binat-to|10 nat-to|10 rdr-to|10 bitmask least-stats random round-robinsource-hash static-portdup-to reply-to route-toparent bandwidth default min max qlimitblock-policy debug fingerprints hostid limit loginterface optimizationreassemble ruleset-optimization basic none profile skip state-defaultsstate-policy timeoutconst counters persistno modulate synproxy state|5 floating if-bound no-sync pflow|10 sloppysource-track global rule max-src-nodes max-src-states max-src-connmax-src-conn-rate overload flushscrub|5 max-mss min-ttl no-df|10 random-id",
            literal: "all any no-route self urpf-failed egress|5 unknown"
        },
        c: [e.HCM, e.NM, e.QSM, t, r]
    }
}),
hljs.registerLanguage("dust", function(e) {
    return {
        aliases: ["dst"],
        cI: !0,
        sL: "xml",
        c: [{
            cN: "template-tag",
            b: /\{[#\/]/,
            e: /\}/,
            i: /;/,
            c: [{
                cN: "name",
                b: /[a-zA-Z\.-]+/,
                starts: {
                    eW: !0,
                    r: 0,
                    c: [e.QSM]
                }
            }]
        }, {
            cN: "template-variable",
            b: /\{/,
            e: /\}/,
            i: /;/,
            k: "if eq ne lt lte gt gte select default math sep"
        }]
    }
}),
hljs.registerLanguage("smali", function(e) {
    var t = ["add", "and", "cmp", "cmpg", "cmpl", "const", "div", "double", "float", "goto", "if", "int", "long", "move", "mul", "neg", "new", "nop", "not", "or", "rem", "return", "shl", "shr", "sput", "sub", "throw", "ushr", "xor"]
      , r = ["aget", "aput", "array", "check", "execute", "fill", "filled", "goto/16", "goto/32", "iget", "instance", "invoke", "iput", "monitor", "packed", "sget", "sparse"]
      , i = ["transient", "constructor", "abstract", "final", "synthetic", "public", "private", "protected", "static", "bridge", "system"];
    return {
        aliases: ["smali"],
        c: [{
            cN: "string",
            b: '"',
            e: '"',
            r: 0
        }, e.C("#", "$", {
            r: 0
        }), {
            cN: "keyword",
            v: [{
                b: "\\s*\\.end\\s[a-zA-Z0-9]*"
            }, {
                b: "^[ ]*\\.[a-zA-Z]*",
                r: 0
            }, {
                b: "\\s:[a-zA-Z_0-9]*",
                r: 0
            }, {
                b: "\\s(" + i.join("|") + ")"
            }]
        }, {
            cN: "built_in",
            v: [{
                b: "\\s(" + t.join("|") + ")\\s"
            }, {
                b: "\\s(" + t.join("|") + ")((\\-|/)[a-zA-Z0-9]+)+\\s",
                r: 10
            }, {
                b: "\\s(" + r.join("|") + ")((\\-|/)[a-zA-Z0-9]+)*\\s",
                r: 10
            }]
        }, {
            cN: "class",
            b: "L[^(;:\n]*;",
            r: 0
        }, {
            b: "[vp][0-9]+"
        }]
    }
}),
hljs.registerLanguage("gradle", function(e) {
    return {
        cI: !0,
        k: {
            keyword: "task project allprojects subprojects artifacts buildscript configurations dependencies repositories sourceSets description delete from into include exclude source classpath destinationDir includes options sourceCompatibility targetCompatibility group flatDir doLast doFirst flatten todir fromdir ant def abstract break case catch continue default do else extends final finally for if implements instanceof native new private protected public return static switch synchronized throw throws transient try volatile while strictfp package import false null super this true antlrtask checkstyle codenarc copy boolean byte char class double float int interface long short void compile runTime file fileTree abs any append asList asWritable call collect compareTo count div dump each eachByte eachFile eachLine every find findAll flatten getAt getErr getIn getOut getText grep immutable inject inspect intersect invokeMethods isCase join leftShift minus multiply newInputStream newOutputStream newPrintWriter newReader newWriter next plus pop power previous print println push putAt read readBytes readLines reverse reverseEach round size sort splitEachLine step subMap times toInteger toList tokenize upto waitForOrKill withPrintWriter withReader withStream withWriter withWriterAppend write writeLine"
        },
        c: [e.CLCM, e.CBCM, e.ASM, e.QSM, e.NM, e.RM]
    }
}),
hljs.registerLanguage("processing", function(e) {
    return {
        k: {
            keyword: "BufferedReader PVector PFont PImage PGraphics HashMap boolean byte char color double float int long String Array FloatDict FloatList IntDict IntList JSONArray JSONObject Object StringDict StringList Table TableRow XML false synchronized int abstract float private char boolean static null if const for true while long throw strictfp finally protected import native final return void enum else break transient new catch instanceof byte super volatile case assert short package default double public try this switch continue throws protected public private",
            literal: "P2D P3D HALF_PI PI QUARTER_PI TAU TWO_PI",
            title: "setup draw",
            built_in: "displayHeight displayWidth mouseY mouseX mousePressed pmouseX pmouseY key keyCode pixels focused frameCount frameRate height width size createGraphics beginDraw createShape loadShape PShape arc ellipse line point quad rect triangle bezier bezierDetail bezierPoint bezierTangent curve curveDetail curvePoint curveTangent curveTightness shape shapeMode beginContour beginShape bezierVertex curveVertex endContour endShape quadraticVertex vertex ellipseMode noSmooth rectMode smooth strokeCap strokeJoin strokeWeight mouseClicked mouseDragged mouseMoved mousePressed mouseReleased mouseWheel keyPressed keyPressedkeyReleased keyTyped print println save saveFrame day hour millis minute month second year background clear colorMode fill noFill noStroke stroke alpha blue brightness color green hue lerpColor red saturation modelX modelY modelZ screenX screenY screenZ ambient emissive shininess specular add createImage beginCamera camera endCamera frustum ortho perspective printCamera printProjection cursor frameRate noCursor exit loop noLoop popStyle pushStyle redraw binary boolean byte char float hex int str unbinary unhex join match matchAll nf nfc nfp nfs split splitTokens trim append arrayCopy concat expand reverse shorten sort splice subset box sphere sphereDetail createInput createReader loadBytes loadJSONArray loadJSONObject loadStrings loadTable loadXML open parseXML saveTable selectFolder selectInput beginRaw beginRecord createOutput createWriter endRaw endRecord PrintWritersaveBytes saveJSONArray saveJSONObject saveStream saveStrings saveXML selectOutput popMatrix printMatrix pushMatrix resetMatrix rotate rotateX rotateY rotateZ scale shearX shearY translate ambientLight directionalLight lightFalloff lights lightSpecular noLights normal pointLight spotLight image imageMode loadImage noTint requestImage tint texture textureMode textureWrap blend copy filter get loadPixels set updatePixels blendMode loadShader PShaderresetShader shader createFont loadFont text textFont textAlign textLeading textMode textSize textWidth textAscent textDescent abs ceil constrain dist exp floor lerp log mag map max min norm pow round sq sqrt acos asin atan atan2 cos degrees radians sin tan noise noiseDetail noiseSeed random randomGaussian randomSeed"
        },
        c: [e.CLCM, e.CBCM, e.ASM, e.QSM, e.CNM]
    }
}),
hljs.registerLanguage("elm", function(e) {
    var t = {
        v: [e.C("--", "$"), e.C("{-", "-}", {
            c: ["self"]
        })]
    }
      , r = {
        cN: "type",
        b: "\\b[A-Z][\\w']*",
        r: 0
    }
      , i = {
        b: "\\(",
        e: "\\)",
        i: '"',
        c: [{
            cN: "type",
            b: "\\b[A-Z][\\w]*(\\((\\.\\.|,|\\w+)\\))?"
        }, t]
    };
    return {
        k: "let in if then else case of where module import exposing type alias as infix infixl infixr port",
        c: [{
            bK: "module",
            e: "where",
            k: "module where",
            c: [i, t],
            i: "\\W\\.|;"
        }, {
            b: "import",
            e: "$",
            k: "import as exposing",
            c: [i, t],
            i: "\\W\\.|;"
        }, {
            b: "type",
            e: "$",
            k: "type alias",
            c: [r, i, {
                b: "{",
                e: "}",
                c: i.c
            }, t]
        }, {
            bK: "infix infixl infixr",
            e: "$",
            c: [e.CNM, t]
        }, {
            b: "port",
            e: "$",
            k: "port",
            c: [t]
        }, e.QSM, e.CNM, r, e.inherit(e.TM, {
            b: "^[_a-z][\\w']*"
        }), t, {
            b: "->|<-"
        }]
    }
}),
hljs.registerLanguage("monkey", function(e) {
    var t = {
        cN: "number",
        r: 0,
        v: [{
            b: "[$][a-fA-F0-9]+"
        }, e.NM]
    };
    return {
        cI: !0,
        k: {
            keyword: "public private property continue exit extern new try catch eachin not abstract final select case default const local global field end if then else elseif endif while wend repeat until forever for to step next return module inline throw import",
            built_in: "DebugLog DebugStop Error Print ACos ACosr ASin ASinr ATan ATan2 ATan2r ATanr Abs Abs Ceil Clamp Clamp Cos Cosr Exp Floor Log Max Max Min Min Pow Sgn Sgn Sin Sinr Sqrt Tan Tanr Seed PI HALFPI TWOPI",
            literal: "true false null and or shl shr mod"
        },
        i: /\/\*/,
        c: [e.C("#rem", "#end"), e.C("'", "$", {
            r: 0
        }), {
            cN: "function",
            bK: "function method",
            e: "[(=:]|$",
            i: /\n/,
            c: [e.UTM]
        }, {
            cN: "class",
            bK: "class interface",
            e: "$",
            c: [{
                bK: "extends implements"
            }, e.UTM]
        }, {
            cN: "built_in",
            b: "\\b(self|super)\\b"
        }, {
            cN: "meta",
            b: "\\s*#",
            e: "$",
            k: {
                "meta-keyword": "if else elseif endif end then"
            }
        }, {
            cN: "meta",
            b: "^\\s*strict\\b"
        }, {
            bK: "alias",
            e: "=",
            c: [e.UTM]
        }, e.QSM, t]
    }
}),
hljs.registerLanguage("mizar", function(e) {
    return {
        k: "environ vocabularies notations constructors definitions registrations theorems schemes requirements begin end definition registration cluster existence pred func defpred deffunc theorem proof let take assume then thus hence ex for st holds consider reconsider such that and in provided of as from be being by means equals implies iff redefine define now not or attr is mode suppose per cases set thesis contradiction scheme reserve struct correctness compatibility coherence symmetry assymetry reflexivity irreflexivity connectedness uniqueness commutativity idempotence involutiveness projectivity",
        c: [e.C("::", "$")]
    }
}),
hljs.registerLanguage("matlab", function(e) {
    var t = [e.CNM, {
        cN: "string",
        b: "'",
        e: "'",
        c: [e.BE, {
            b: "''"
        }]
    }]
      , r = {
        r: 0,
        c: [{
            b: /'['\.]*/
        }]
    };
    return {
        k: {
            keyword: "break case catch classdef continue else elseif end enumerated events for function global if methods otherwise parfor persistent properties return spmd switch try while",
            built_in: "sin sind sinh asin asind asinh cos cosd cosh acos acosd acosh tan tand tanh atan atand atan2 atanh sec secd sech asec asecd asech csc cscd csch acsc acscd acsch cot cotd coth acot acotd acoth hypot exp expm1 log log1p log10 log2 pow2 realpow reallog realsqrt sqrt nthroot nextpow2 abs angle complex conj imag real unwrap isreal cplxpair fix floor ceil round mod rem sign airy besselj bessely besselh besseli besselk beta betainc betaln ellipj ellipke erf erfc erfcx erfinv expint gamma gammainc gammaln psi legendre cross dot factor isprime primes gcd lcm rat rats perms nchoosek factorial cart2sph cart2pol pol2cart sph2cart hsv2rgb rgb2hsv zeros ones eye repmat rand randn linspace logspace freqspace meshgrid accumarray size length ndims numel disp isempty isequal isequalwithequalnans cat reshape diag blkdiag tril triu fliplr flipud flipdim rot90 find sub2ind ind2sub bsxfun ndgrid permute ipermute shiftdim circshift squeeze isscalar isvector ans eps realmax realmin pi i inf nan isnan isinf isfinite j why compan gallery hadamard hankel hilb invhilb magic pascal rosser toeplitz vander wilkinson"
        },
        i: '(//|"|#|/\\*|\\s+/\\w+)',
        c: [{
            cN: "function",
            bK: "function",
            e: "$",
            c: [e.UTM, {
                cN: "params",
                v: [{
                    b: "\\(",
                    e: "\\)"
                }, {
                    b: "\\[",
                    e: "\\]"
                }]
            }]
        }, {
            b: /[a-zA-Z_][a-zA-Z_0-9]*'['\.]*/,
            rB: !0,
            r: 0,
            c: [{
                b: /[a-zA-Z_][a-zA-Z_0-9]*/,
                r: 0
            }, r.c[0]]
        }, {
            b: "\\[",
            e: "\\]",
            c: t,
            r: 0,
            starts: r
        }, {
            b: "\\{",
            e: /}/,
            c: t,
            r: 0,
            starts: r
        }, {
            b: /\)/,
            r: 0,
            starts: r
        }, e.C("^\\s*\\%\\{\\s*$", "^\\s*\\%\\}\\s*$"), e.C("\\%", "$")].concat(t)
    }
}),
hljs.registerLanguage("xl", function(e) {
    var t = {
        keyword: "if then else do while until for loop import with is as where when by data constant integer real text name boolean symbol infix prefix postfix block tree",
        literal: "true false nil",
        built_in: "in mod rem and or xor not abs sign floor ceil sqrt sin cos tan asin acos atan exp expm1 log log2 log10 log1p pi at text_length text_range text_find text_replace contains page slide basic_slide title_slide title subtitle fade_in fade_out fade_at clear_color color line_color line_width texture_wrap texture_transform texture scale_?x scale_?y scale_?z? translate_?x translate_?y translate_?z? rotate_?x rotate_?y rotate_?z? rectangle circle ellipse sphere path line_to move_to quad_to curve_to theme background contents locally time mouse_?x mouse_?y mouse_buttons ObjectLoader Animate MovieCredits Slides Filters Shading Materials LensFlare Mapping VLCAudioVideo StereoDecoder PointCloud NetworkAccess RemoteControl RegExp ChromaKey Snowfall NodeJS Speech Charts"
    }
      , r = {
        cN: "string",
        b: '"',
        e: '"',
        i: "\\n"
    }
      , i = {
        cN: "string",
        b: "'",
        e: "'",
        i: "\\n"
    }
      , n = {
        cN: "string",
        b: "<<",
        e: ">>"
    }
      , a = {
        cN: "number",
        b: "[0-9]+#[0-9A-Z_]+(\\.[0-9-A-Z_]+)?#?([Ee][+-]?[0-9]+)?"
    }
      , o = {
        bK: "import",
        e: "$",
        k: t,
        c: [r]
    }
      , s = {
        cN: "function",
        b: /[a-z][^\n]*->/,
        rB: !0,
        e: /->/,
        c: [e.inherit(e.TM, {
            starts: {
                eW: !0,
                k: t
            }
        })]
    };
    return {
        aliases: ["tao"],
        l: /[a-zA-Z][a-zA-Z0-9_?]*/,
        k: t,
        c: [e.CLCM, e.CBCM, r, i, n, s, o, a, e.NM]
    }
}),
hljs.registerLanguage("sqf", function(e) {
    var t = ["!", "-", "+", "!=", "%", "&&", "*", "/", "=", "==", ">", ">=", "<", "<=", "or", "plus", "^", ":", ">>", "abs", "accTime", "acos", "action", "actionKeys", "actionKeysImages", "actionKeysNames", "actionKeysNamesArray", "actionName", "activateAddons", "activatedAddons", "activateKey", "addAction", "addBackpack", "addBackpackCargo", "addBackpackCargoGlobal", "addBackpackGlobal", "addCamShake", "addCuratorAddons", "addCuratorCameraArea", "addCuratorEditableObjects", "addCuratorEditingArea", "addCuratorPoints", "addEditorObject", "addEventHandler", "addGoggles", "addGroupIcon", "addHandgunItem", "addHeadgear", "addItem", "addItemCargo", "addItemCargoGlobal", "addItemPool", "addItemToBackpack", "addItemToUniform", "addItemToVest", "addLiveStats", "addMagazine", "addMagazine array", "addMagazineAmmoCargo", "addMagazineCargo", "addMagazineCargoGlobal", "addMagazineGlobal", "addMagazinePool", "addMagazines", "addMagazineTurret", "addMenu", "addMenuItem", "addMissionEventHandler", "addMPEventHandler", "addMusicEventHandler", "addPrimaryWeaponItem", "addPublicVariableEventHandler", "addRating", "addResources", "addScore", "addScoreSide", "addSecondaryWeaponItem", "addSwitchableUnit", "addTeamMember", "addToRemainsCollector", "addUniform", "addVehicle", "addVest", "addWaypoint", "addWeapon", "addWeaponCargo", "addWeaponCargoGlobal", "addWeaponGlobal", "addWeaponPool", "addWeaponTurret", "agent", "agents", "AGLToASL", "aimedAtTarget", "aimPos", "airDensityRTD", "airportSide", "AISFinishHeal", "alive", "allControls", "allCurators", "allDead", "allDeadMen", "allDisplays", "allGroups", "allMapMarkers", "allMines", "allMissionObjects", "allow3DMode", "allowCrewInImmobile", "allowCuratorLogicIgnoreAreas", "allowDamage", "allowDammage", "allowFileOperations", "allowFleeing", "allowGetIn", "allPlayers", "allSites", "allTurrets", "allUnits", "allUnitsUAV", "allVariables", "ammo", "and", "animate", "animateDoor", "animationPhase", "animationState", "append", "armoryPoints", "arrayIntersect", "asin", "ASLToAGL", "ASLToATL", "assert", "assignAsCargo", "assignAsCargoIndex", "assignAsCommander", "assignAsDriver", "assignAsGunner", "assignAsTurret", "assignCurator", "assignedCargo", "assignedCommander", "assignedDriver", "assignedGunner", "assignedItems", "assignedTarget", "assignedTeam", "assignedVehicle", "assignedVehicleRole", "assignItem", "assignTeam", "assignToAirport", "atan", "atan2", "atg", "ATLToASL", "attachedObject", "attachedObjects", "attachedTo", "attachObject", "attachTo", "attackEnabled", "backpack", "backpackCargo", "backpackContainer", "backpackItems", "backpackMagazines", "backpackSpaceFor", "behaviour", "benchmark", "binocular", "blufor", "boundingBox", "boundingBoxReal", "boundingCenter", "breakOut", "breakTo", "briefingName", "buildingExit", "buildingPos", "buttonAction", "buttonSetAction", "cadetMode", "call", "callExtension", "camCommand", "camCommit", "camCommitPrepared", "camCommitted", "camConstuctionSetParams", "camCreate", "camDestroy", "cameraEffect", "cameraEffectEnableHUD", "cameraInterest", "cameraOn", "cameraView", "campaignConfigFile", "camPreload", "camPreloaded", "camPrepareBank", "camPrepareDir", "camPrepareDive", "camPrepareFocus", "camPrepareFov", "camPrepareFovRange", "camPreparePos", "camPrepareRelPos", "camPrepareTarget", "camSetBank", "camSetDir", "camSetDive", "camSetFocus", "camSetFov", "camSetFovRange", "camSetPos", "camSetRelPos", "camSetTarget", "camTarget", "camUseNVG", "canAdd", "canAddItemToBackpack", "canAddItemToUniform", "canAddItemToVest", "cancelSimpleTaskDestination", "canFire", "canMove", "canSlingLoad", "canStand", "canUnloadInCombat", "captive", "captiveNum", "case", "catch", "cbChecked", "cbSetChecked", "ceil", "cheatsEnabled", "checkAIFeature", "civilian", "className", "clearAllItemsFromBackpack", "clearBackpackCargo", "clearBackpackCargoGlobal", "clearGroupIcons", "clearItemCargo", "clearItemCargoGlobal", "clearItemPool", "clearMagazineCargo", "clearMagazineCargoGlobal", "clearMagazinePool", "clearOverlay", "clearRadio", "clearWeaponCargo", "clearWeaponCargoGlobal", "clearWeaponPool", "closeDialog", "closeDisplay", "closeOverlay", "collapseObjectTree", "combatMode", "commandArtilleryFire", "commandChat", "commander", "commandFire", "commandFollow", "commandFSM", "commandGetOut", "commandingMenu", "commandMove", "commandRadio", "commandStop", "commandTarget", "commandWatch", "comment", "commitOverlay", "compile", "compileFinal", "completedFSM", "composeText", "configClasses", "configFile", "configHierarchy", "configName", "configProperties", "configSourceMod", "configSourceModList", "connectTerminalToUAV", "controlNull", "controlsGroupCtrl", "copyFromClipboard", "copyToClipboard", "copyWaypoints", "cos", "count", "countEnemy", "countFriendly", "countSide", "countType", "countUnknown", "createAgent", "createCenter", "createDialog", "createDiaryLink", "createDiaryRecord", "createDiarySubject", "createDisplay", "createGearDialog", "createGroup", "createGuardedPoint", "createLocation", "createMarker", "createMarkerLocal", "createMenu", "createMine", "createMissionDisplay", "createSimpleTask", "createSite", "createSoundSource", "createTask", "createTeam", "createTrigger", "createUnit", "createUnit array", "createVehicle", "createVehicle array", "createVehicleCrew", "createVehicleLocal", "crew", "ctrlActivate", "ctrlAddEventHandler", "ctrlAutoScrollDelay", "ctrlAutoScrollRewind", "ctrlAutoScrollSpeed", "ctrlChecked", "ctrlClassName", "ctrlCommit", "ctrlCommitted", "ctrlCreate", "ctrlDelete", "ctrlEnable", "ctrlEnabled", "ctrlFade", "ctrlHTMLLoaded", "ctrlIDC", "ctrlIDD", "ctrlMapAnimAdd", "ctrlMapAnimClear", "ctrlMapAnimCommit", "ctrlMapAnimDone", "ctrlMapCursor", "ctrlMapMouseOver", "ctrlMapScale", "ctrlMapScreenToWorld", "ctrlMapWorldToScreen", "ctrlModel", "ctrlModelDirAndUp", "ctrlModelScale", "ctrlParent", "ctrlPosition", "ctrlRemoveAllEventHandlers", "ctrlRemoveEventHandler", "ctrlScale", "ctrlSetActiveColor", "ctrlSetAutoScrollDelay", "ctrlSetAutoScrollRewind", "ctrlSetAutoScrollSpeed", "ctrlSetBackgroundColor", "ctrlSetChecked", "ctrlSetEventHandler", "ctrlSetFade", "ctrlSetFocus", "ctrlSetFont", "ctrlSetFontH1", "ctrlSetFontH1B", "ctrlSetFontH2", "ctrlSetFontH2B", "ctrlSetFontH3", "ctrlSetFontH3B", "ctrlSetFontH4", "ctrlSetFontH4B", "ctrlSetFontH5", "ctrlSetFontH5B", "ctrlSetFontH6", "ctrlSetFontH6B", "ctrlSetFontHeight", "ctrlSetFontHeightH1", "ctrlSetFontHeightH2", "ctrlSetFontHeightH3", "ctrlSetFontHeightH4", "ctrlSetFontHeightH5", "ctrlSetFontHeightH6", "ctrlSetFontP", "ctrlSetFontPB", "ctrlSetForegroundColor", "ctrlSetModel", "ctrlSetModelDirAndUp", "ctrlSetModelScale", "ctrlSetPosition", "ctrlSetScale", "ctrlSetStructuredText", "ctrlSetText", "ctrlSetTextColor", "ctrlSetTooltip", "ctrlSetTooltipColorBox", "ctrlSetTooltipColorShade", "ctrlSetTooltipColorText", "ctrlShow", "ctrlShown", "ctrlText", "ctrlTextHeight", "ctrlType", "ctrlVisible", "curatorAddons", "curatorCamera", "curatorCameraArea", "curatorCameraAreaCeiling", "curatorCoef", "curatorEditableObjects", "curatorEditingArea", "curatorEditingAreaType", "curatorMouseOver", "curatorPoints", "curatorRegisteredObjects", "curatorSelected", "curatorWaypointCost", "currentChannel", "currentCommand", "currentMagazine", "currentMagazineDetail", "currentMagazineDetailTurret", "currentMagazineTurret", "currentMuzzle", "currentNamespace", "currentTask", "currentTasks", "currentThrowable", "currentVisionMode", "currentWaypoint", "currentWeapon", "currentWeaponMode", "currentWeaponTurret", "currentZeroing", "cursorTarget", "customChat", "customRadio", "cutFadeOut", "cutObj", "cutRsc", "cutText", "damage", "date", "dateToNumber", "daytime", "deActivateKey", "debriefingText", "debugFSM", "debugLog", "default", "deg", "deleteAt", "deleteCenter", "deleteCollection", "deleteEditorObject", "deleteGroup", "deleteIdentity", "deleteLocation", "deleteMarker", "deleteMarkerLocal", "deleteRange", "deleteResources", "deleteSite", "deleteStatus", "deleteTeam", "deleteVehicle", "deleteVehicleCrew", "deleteWaypoint", "detach", "detectedMines", "diag activeMissionFSMs", "diag activeSQFScripts", "diag activeSQSScripts", "diag captureFrame", "diag captureSlowFrame", "diag fps", "diag fpsMin", "diag frameNo", "diag log", "diag logSlowFrame", "diag tickTime", "dialog", "diarySubjectExists", "didJIP", "didJIPOwner", "difficulty", "difficultyEnabled", "difficultyEnabledRTD", "direction", "directSay", "disableAI", "disableCollisionWith", "disableConversation", "disableDebriefingStats", "disableSerialization", "disableTIEquipment", "disableUAVConnectability", "disableUserInput", "displayAddEventHandler", "displayCtrl", "displayNull", "displayRemoveAllEventHandlers", "displayRemoveEventHandler", "displaySetEventHandler", "dissolveTeam", "distance", "distance2D", "distanceSqr", "distributionRegion", "do", "doArtilleryFire", "doFire", "doFollow", "doFSM", "doGetOut", "doMove", "doorPhase", "doStop", "doTarget", "doWatch", "drawArrow", "drawEllipse", "drawIcon", "drawIcon3D", "drawLine", "drawLine3D", "drawLink", "drawLocation", "drawRectangle", "driver", "drop", "east", "echo", "editObject", "editorSetEventHandler", "effectiveCommander", "else", "emptyPositions", "enableAI", "enableAIFeature", "enableAttack", "enableCamShake", "enableCaustics", "enableCollisionWith", "enableCopilot", "enableDebriefingStats", "enableDiagLegend", "enableEndDialog", "enableEngineArtillery", "enableEnvironment", "enableFatigue", "enableGunLights", "enableIRLasers", "enableMimics", "enablePersonTurret", "enableRadio", "enableReload", "enableRopeAttach", "enableSatNormalOnDetail", "enableSaving", "enableSentences", "enableSimulation", "enableSimulationGlobal", "enableTeamSwitch", "enableUAVConnectability", "enableUAVWaypoints", "endLoadingScreen", "endMission", "engineOn", "enginesIsOnRTD", "enginesRpmRTD", "enginesTorqueRTD", "entities", "estimatedEndServerTime", "estimatedTimeLeft", "evalObjectArgument", "everyBackpack", "everyContainer", "exec", "execEditorScript", "execFSM", "execVM", "exit", "exitWith", "exp", "expectedDestination", "eyeDirection", "eyePos", "face", "faction", "fadeMusic", "fadeRadio", "fadeSound", "fadeSpeech", "failMission", "false", "fillWeaponsFromPool", "find", "findCover", "findDisplay", "findEditorObject", "findEmptyPosition", "findEmptyPositionReady", "findNearestEnemy", "finishMissionInit", "finite", "fire", "fireAtTarget", "firstBackpack", "flag", "flagOwner", "fleeing", "floor", "flyInHeight", "fog", "fogForecast", "fogParams", "for", "forceAddUniform", "forceEnd", "forceMap", "forceRespawn", "forceSpeed", "forceWalk", "forceWeaponFire", "forceWeatherChange", "forEach", "forEachMember", "forEachMemberAgent", "forEachMemberTeam", "format", "formation", "formationDirection", "formationLeader", "formationMembers", "formationPosition", "formationTask", "formatText", "formLeader", "freeLook", "from", "fromEditor", "fuel", "fullCrew", "gearSlotAmmoCount", "gearSlotData", "getAllHitPointsDamage", "getAmmoCargo", "getArray", "getArtilleryAmmo", "getArtilleryComputerSettings", "getArtilleryETA", "getAssignedCuratorLogic", "getAssignedCuratorUnit", "getBackpackCargo", "getBleedingRemaining", "getBurningValue", "getCargoIndex", "getCenterOfMass", "getClientState", "getConnectedUAV", "getDammage", "getDescription", "getDir", "getDirVisual", "getDLCs", "getEditorCamera", "getEditorMode", "getEditorObjectScope", "getElevationOffset", "getFatigue", "getFriend", "getFSMVariable", "getFuelCargo", "getGroupIcon", "getGroupIconParams", "getGroupIcons", "getHideFrom", "getHit", "getHitIndex", "getHitPointDamage", "getItemCargo", "getMagazineCargo", "getMarkerColor", "getMarkerPos", "getMarkerSize", "getMarkerType", "getMass", "getModelInfo", "getNumber", "getObjectArgument", "getObjectChildren", "getObjectDLC", "getObjectMaterials", "getObjectProxy", "getObjectTextures", "getObjectType", "getObjectViewDistance", "getOxygenRemaining", "getPersonUsedDLCs", "getPlayerChannel", "getPlayerUID", "getPos", "getPosASL", "getPosASLVisual", "getPosASLW", "getPosATL", "getPosATLVisual", "getPosVisual", "getPosWorld", "getRepairCargo", "getResolution", "getShadowDistance", "getSlingLoad", "getSpeed", "getSuppression", "getTerrainHeightASL", "getText", "getVariable", "getWeaponCargo", "getWPPos", "glanceAt", "globalChat", "globalRadio", "goggles", "goto", "group", "groupChat", "groupFromNetId", "groupIconSelectable", "groupIconsVisible", "groupId", "groupOwner", "groupRadio", "groupSelectedUnits", "groupSelectUnit", "grpNull", "gunner", "gusts", "halt", "handgunItems", "handgunMagazine", "handgunWeapon", "handsHit", "hasInterface", "hasWeapon", "hcAllGroups", "hcGroupParams", "hcLeader", "hcRemoveAllGroups", "hcRemoveGroup", "hcSelected", "hcSelectGroup", "hcSetGroup", "hcShowBar", "hcShownBar", "headgear", "hideBody", "hideObject", "hideObjectGlobal", "hint", "hintC", "hintCadet", "hintSilent", "hmd", "hostMission", "htmlLoad", "HUDMovementLevels", "humidity", "if", "image", "importAllGroups", "importance", "in", "incapacitatedState", "independent", "inflame", "inflamed", "inGameUISetEventHandler", "inheritsFrom", "initAmbientLife", "inputAction", "inRangeOfArtillery", "insertEditorObject", "intersect", "isAbleToBreathe", "isAgent", "isArray", "isAutoHoverOn", "isAutonomous", "isAutotest", "isBleeding", "isBurning", "isClass", "isCollisionLightOn", "isCopilotEnabled", "isDedicated", "isDLCAvailable", "isEngineOn", "isEqualTo", "isFlashlightOn", "isFlatEmpty", "isForcedWalk", "isFormationLeader", "isHidden", "isInRemainsCollector", "isInstructorFigureEnabled", "isIRLaserOn", "isKeyActive", "isKindOf", "isLightOn", "isLocalized", "isManualFire", "isMarkedForCollection", "isMultiplayer", "isNil", "isNull", "isNumber", "isObjectHidden", "isObjectRTD", "isOnRoad", "isPipEnabled", "isPlayer", "isRealTime", "isServer", "isShowing3DIcons", "isSteamMission", "isStreamFriendlyUIEnabled", "isText", "isTouchingGround", "isTurnedOut", "isTutHintsEnabled", "isUAVConnectable", "isUAVConnected", "isUniformAllowed", "isWalking", "isWeaponDeployed", "isWeaponRested", "itemCargo", "items", "itemsWithMagazines", "join", "joinAs", "joinAsSilent", "joinSilent", "joinString", "kbAddDatabase", "kbAddDatabaseTargets", "kbAddTopic", "kbHasTopic", "kbReact", "kbRemoveTopic", "kbTell", "kbWasSaid", "keyImage", "keyName", "knowsAbout", "land", "landAt", "landResult", "language", "laserTarget", "lbAdd", "lbClear", "lbColor", "lbCurSel", "lbData", "lbDelete", "lbIsSelected", "lbPicture", "lbSelection", "lbSetColor", "lbSetCurSel", "lbSetData", "lbSetPicture", "lbSetPictureColor", "lbSetPictureColorDisabled", "lbSetPictureColorSelected", "lbSetSelectColor", "lbSetSelectColorRight", "lbSetSelected", "lbSetTooltip", "lbSetValue", "lbSize", "lbSort", "lbSortByValue", "lbText", "lbValue", "leader", "leaderboardDeInit", "leaderboardGetRows", "leaderboardInit", "leaveVehicle", "libraryCredits", "libraryDisclaimers", "lifeState", "lightAttachObject", "lightDetachObject", "lightIsOn", "lightnings", "limitSpeed", "linearConversion", "lineBreak", "lineIntersects", "lineIntersectsObjs", "lineIntersectsSurfaces", "lineIntersectsWith", "linkItem", "list", "listObjects", "ln", "lnbAddArray", "lnbAddColumn", "lnbAddRow", "lnbClear", "lnbColor", "lnbCurSelRow", "lnbData", "lnbDeleteColumn", "lnbDeleteRow", "lnbGetColumnsPosition", "lnbPicture", "lnbSetColor", "lnbSetColumnsPos", "lnbSetCurSelRow", "lnbSetData", "lnbSetPicture", "lnbSetText", "lnbSetValue", "lnbSize", "lnbText", "lnbValue", "load", "loadAbs", "loadBackpack", "loadFile", "loadGame", "loadIdentity", "loadMagazine", "loadOverlay", "loadStatus", "loadUniform", "loadVest", "local", "localize", "locationNull", "locationPosition", "lock", "lockCameraTo", "lockCargo", "lockDriver", "locked", "lockedCargo", "lockedDriver", "lockedTurret", "lockTurret", "lockWP", "log", "logEntities", "lookAt", "lookAtPos", "magazineCargo", "magazines", "magazinesAllTurrets", "magazinesAmmo", "magazinesAmmoCargo", "magazinesAmmoFull", "magazinesDetail", "magazinesDetailBackpack", "magazinesDetailUniform", "magazinesDetailVest", "magazinesTurret", "magazineTurretAmmo", "mapAnimAdd", "mapAnimClear", "mapAnimCommit", "mapAnimDone", "mapCenterOnCamera", "mapGridPosition", "markAsFinishedOnSteam", "markerAlpha", "markerBrush", "markerColor", "markerDir", "markerPos", "markerShape", "markerSize", "markerText", "markerType", "max", "members", "min", "mineActive", "mineDetectedBy", "missionConfigFile", "missionName", "missionNamespace", "missionStart", "mod", "modelToWorld", "modelToWorldVisual", "moonIntensity", "morale", "move", "moveInAny", "moveInCargo", "moveInCommander", "moveInDriver", "moveInGunner", "moveInTurret", "moveObjectToEnd", "moveOut", "moveTime", "moveTo", "moveToCompleted", "moveToFailed", "musicVolume", "name", "name location", "nameSound", "nearEntities", "nearestBuilding", "nearestLocation", "nearestLocations", "nearestLocationWithDubbing", "nearestObject", "nearestObjects", "nearObjects", "nearObjectsReady", "nearRoads", "nearSupplies", "nearTargets", "needReload", "netId", "netObjNull", "newOverlay", "nextMenuItemIndex", "nextWeatherChange", "nil", "nMenuItems", "not", "numberToDate", "objectCurators", "objectFromNetId", "objectParent", "objNull", "objStatus", "onBriefingGroup", "onBriefingNotes", "onBriefingPlan", "onBriefingTeamSwitch", "onCommandModeChanged", "onDoubleClick", "onEachFrame", "onGroupIconClick", "onGroupIconOverEnter", "onGroupIconOverLeave", "onHCGroupSelectionChanged", "onMapSingleClick", "onPlayerConnected", "onPlayerDisconnected", "onPreloadFinished", "onPreloadStarted", "onShowNewObject", "onTeamSwitch", "openCuratorInterface", "openMap", "openYoutubeVideo", "opfor", "or", "orderGetIn", "overcast", "overcastForecast", "owner", "param", "params", "parseNumber", "parseText", "parsingNamespace", "particlesQuality", "pi", "pickWeaponPool", "pitch", "playableSlotsNumber", "playableUnits", "playAction", "playActionNow", "player", "playerRespawnTime", "playerSide", "playersNumber", "playGesture", "playMission", "playMove", "playMoveNow", "playMusic", "playScriptedMission", "playSound", "playSound3D", "position", "positionCameraToWorld", "posScreenToWorld", "posWorldToScreen", "ppEffectAdjust", "ppEffectCommit", "ppEffectCommitted", "ppEffectCreate", "ppEffectDestroy", "ppEffectEnable", "ppEffectForceInNVG", "precision", "preloadCamera", "preloadObject", "preloadSound", "preloadTitleObj", "preloadTitleRsc", "preprocessFile", "preprocessFileLineNumbers", "primaryWeapon", "primaryWeaponItems", "primaryWeaponMagazine", "priority", "private", "processDiaryLink", "productVersion", "profileName", "profileNamespace", "profileNameSteam", "progressLoadingScreen", "progressPosition", "progressSetPosition", "publicVariable", "publicVariableClient", "publicVariableServer", "pushBack", "putWeaponPool", "queryItemsPool", "queryMagazinePool", "queryWeaponPool", "rad", "radioChannelAdd", "radioChannelCreate", "radioChannelRemove", "radioChannelSetCallSign", "radioChannelSetLabel", "radioVolume", "rain", "rainbow", "random", "rank", "rankId", "rating", "rectangular", "registeredTasks", "registerTask", "reload", "reloadEnabled", "remoteControl", "remoteExec", "remoteExecCall", "removeAction", "removeAllActions", "removeAllAssignedItems", "removeAllContainers", "removeAllCuratorAddons", "removeAllCuratorCameraAreas", "removeAllCuratorEditingAreas", "removeAllEventHandlers", "removeAllHandgunItems", "removeAllItems", "removeAllItemsWithMagazines", "removeAllMissionEventHandlers", "removeAllMPEventHandlers", "removeAllMusicEventHandlers", "removeAllPrimaryWeaponItems", "removeAllWeapons", "removeBackpack", "removeBackpackGlobal", "removeCuratorAddons", "removeCuratorCameraArea", "removeCuratorEditableObjects", "removeCuratorEditingArea", "removeDrawIcon", "removeDrawLinks", "removeEventHandler", "removeFromRemainsCollector", "removeGoggles", "removeGroupIcon", "removeHandgunItem", "removeHeadgear", "removeItem", "removeItemFromBackpack", "removeItemFromUniform", "removeItemFromVest", "removeItems", "removeMagazine", "removeMagazineGlobal", "removeMagazines", "removeMagazinesTurret", "removeMagazineTurret", "removeMenuItem", "removeMissionEventHandler", "removeMPEventHandler", "removeMusicEventHandler", "removePrimaryWeaponItem", "removeSecondaryWeaponItem", "removeSimpleTask", "removeSwitchableUnit", "removeTeamMember", "removeUniform", "removeVest", "removeWeapon", "removeWeaponGlobal", "removeWeaponTurret", "requiredVersion", "resetCamShake", "resetSubgroupDirection", "resistance", "resize", "resources", "respawnVehicle", "restartEditorCamera", "reveal", "revealMine", "reverse", "reversedMouseY", "roadsConnectedTo", "roleDescription", "ropeAttachedObjects", "ropeAttachedTo", "ropeAttachEnabled", "ropeAttachTo", "ropeCreate", "ropeCut", "ropeEndPosition", "ropeLength", "ropes", "ropeUnwind", "ropeUnwound", "rotorsForcesRTD", "rotorsRpmRTD", "round", "runInitScript", "safeZoneH", "safeZoneW", "safeZoneWAbs", "safeZoneX", "safeZoneXAbs", "safeZoneY", "saveGame", "saveIdentity", "saveJoysticks", "saveOverlay", "saveProfileNamespace", "saveStatus", "saveVar", "savingEnabled", "say", "say2D", "say3D", "scopeName", "score", "scoreSide", "screenToWorld", "scriptDone", "scriptName", "scriptNull", "scudState", "secondaryWeapon", "secondaryWeaponItems", "secondaryWeaponMagazine", "select", "selectBestPlaces", "selectDiarySubject", "selectedEditorObjects", "selectEditorObject", "selectionPosition", "selectLeader", "selectNoPlayer", "selectPlayer", "selectWeapon", "selectWeaponTurret", "sendAUMessage", "sendSimpleCommand", "sendTask", "sendTaskResult", "sendUDPMessage", "serverCommand", "serverCommandAvailable", "serverCommandExecutable", "serverName", "serverTime", "set", "setAccTime", "setAirportSide", "setAmmo", "setAmmoCargo", "setAperture", "setApertureNew", "setArmoryPoints", "setAttributes", "setAutonomous", "setBehaviour", "setBleedingRemaining", "setCameraInterest", "setCamShakeDefParams", "setCamShakeParams", "setCamUseTi", "setCaptive", "setCenterOfMass", "setCollisionLight", "setCombatMode", "setCompassOscillation", "setCuratorCameraAreaCeiling", "setCuratorCoef", "setCuratorEditingAreaType", "setCuratorWaypointCost", "setCurrentChannel", "setCurrentTask", "setCurrentWaypoint", "setDamage", "setDammage", "setDate", "setDebriefingText", "setDefaultCamera", "setDestination", "setDetailMapBlendPars", "setDir", "setDirection", "setDrawIcon", "setDropInterval", "setEditorMode", "setEditorObjectScope", "setEffectCondition", "setFace", "setFaceAnimation", "setFatigue", "setFlagOwner", "setFlagSide", "setFlagTexture", "setFog", "setFog array", "setFormation", "setFormationTask", "setFormDir", "setFriend", "setFromEditor", "setFSMVariable", "setFuel", "setFuelCargo", "setGroupIcon", "setGroupIconParams", "setGroupIconsSelectable", "setGroupIconsVisible", "setGroupId", "setGroupIdGlobal", "setGroupOwner", "setGusts", "setHideBehind", "setHit", "setHitIndex", "setHitPointDamage", "setHorizonParallaxCoef", "setHUDMovementLevels", "setIdentity", "setImportance", "setLeader", "setLightAmbient", "setLightAttenuation", "setLightBrightness", "setLightColor", "setLightDayLight", "setLightFlareMaxDistance", "setLightFlareSize", "setLightIntensity", "setLightnings", "setLightUseFlare", "setLocalWindParams", "setMagazineTurretAmmo", "setMarkerAlpha", "setMarkerAlphaLocal", "setMarkerBrush", "setMarkerBrushLocal", "setMarkerColor", "setMarkerColorLocal", "setMarkerDir", "setMarkerDirLocal", "setMarkerPos", "setMarkerPosLocal", "setMarkerShape", "setMarkerShapeLocal", "setMarkerSize", "setMarkerSizeLocal", "setMarkerText", "setMarkerTextLocal", "setMarkerType", "setMarkerTypeLocal", "setMass", "setMimic", "setMousePosition", "setMusicEffect", "setMusicEventHandler", "setName", "setNameSound", "setObjectArguments", "setObjectMaterial", "setObjectProxy", "setObjectTexture", "setObjectTextureGlobal", "setObjectViewDistance", "setOvercast", "setOwner", "setOxygenRemaining", "setParticleCircle", "setParticleClass", "setParticleFire", "setParticleParams", "setParticleRandom", "setPilotLight", "setPiPEffect", "setPitch", "setPlayable", "setPlayerRespawnTime", "setPos", "setPosASL", "setPosASL2", "setPosASLW", "setPosATL", "setPosition", "setPosWorld", "setRadioMsg", "setRain", "setRainbow", "setRandomLip", "setRank", "setRectangular", "setRepairCargo", "setShadowDistance", "setSide", "setSimpleTaskDescription", "setSimpleTaskDestination", "setSimpleTaskTarget", "setSimulWeatherLayers", "setSize", "setSkill", "setSkill array", "setSlingLoad", "setSoundEffect", "setSpeaker", "setSpeech", "setSpeedMode", "setStatValue", "setSuppression", "setSystemOfUnits", "setTargetAge", "setTaskResult", "setTaskState", "setTerrainGrid", "setText", "setTimeMultiplier", "setTitleEffect", "setTriggerActivation", "setTriggerArea", "setTriggerStatements", "setTriggerText", "setTriggerTimeout", "setTriggerType", "setType", "setUnconscious", "setUnitAbility", "setUnitPos", "setUnitPosWeak", "setUnitRank", "setUnitRecoilCoefficient", "setUnloadInCombat", "setUserActionText", "setVariable", "setVectorDir", "setVectorDirAndUp", "setVectorUp", "setVehicleAmmo", "setVehicleAmmoDef", "setVehicleArmor", "setVehicleId", "setVehicleLock", "setVehiclePosition", "setVehicleTiPars", "setVehicleVarName", "setVelocity", "setVelocityTransformation", "setViewDistance", "setVisibleIfTreeCollapsed", "setWaves", "setWaypointBehaviour", "setWaypointCombatMode", "setWaypointCompletionRadius", "setWaypointDescription", "setWaypointFormation", "setWaypointHousePosition", "setWaypointLoiterRadius", "setWaypointLoiterType", "setWaypointName", "setWaypointPosition", "setWaypointScript", "setWaypointSpeed", "setWaypointStatements", "setWaypointTimeout", "setWaypointType", "setWaypointVisible", "setWeaponReloadingTime", "setWind", "setWindDir", "setWindForce", "setWindStr", "setWPPos", "show3DIcons", "showChat", "showCinemaBorder", "showCommandingMenu", "showCompass", "showCuratorCompass", "showGPS", "showHUD", "showLegend", "showMap", "shownArtilleryComputer", "shownChat", "shownCompass", "shownCuratorCompass", "showNewEditorObject", "shownGPS", "shownHUD", "shownMap", "shownPad", "shownRadio", "shownUAVFeed", "shownWarrant", "shownWatch", "showPad", "showRadio", "showSubtitles", "showUAVFeed", "showWarrant", "showWatch", "showWaypoint", "side", "sideChat", "sideEnemy", "sideFriendly", "sideLogic", "sideRadio", "sideUnknown", "simpleTasks", "simulationEnabled", "simulCloudDensity", "simulCloudOcclusion", "simulInClouds", "simulWeatherSync", "sin", "size", "sizeOf", "skill", "skillFinal", "skipTime", "sleep", "sliderPosition", "sliderRange", "sliderSetPosition", "sliderSetRange", "sliderSetSpeed", "sliderSpeed", "slingLoadAssistantShown", "soldierMagazines", "someAmmo", "sort", "soundVolume", "spawn", "speaker", "speed", "speedMode", "splitString", "sqrt", "squadParams", "stance", "startLoadingScreen", "step", "stop", "stopped", "str", "sunOrMoon", "supportInfo", "suppressFor", "surfaceIsWater", "surfaceNormal", "surfaceType", "swimInDepth", "switch", "switchableUnits", "switchAction", "switchCamera", "switchGesture", "switchLight", "switchMove", "synchronizedObjects", "synchronizedTriggers", "synchronizedWaypoints", "synchronizeObjectsAdd", "synchronizeObjectsRemove", "synchronizeTrigger", "synchronizeWaypoint", "synchronizeWaypoint trigger", "systemChat", "systemOfUnits", "tan", "targetKnowledge", "targetsAggregate", "targetsQuery", "taskChildren", "taskCompleted", "taskDescription", "taskDestination", "taskHint", "taskNull", "taskParent", "taskResult", "taskState", "teamMember", "teamMemberNull", "teamName", "teams", "teamSwitch", "teamSwitchEnabled", "teamType", "terminate", "terrainIntersect", "terrainIntersectASL", "text", "text location", "textLog", "textLogFormat", "tg", "then", "throw", "time", "timeMultiplier", "titleCut", "titleFadeOut", "titleObj", "titleRsc", "titleText", "to", "toArray", "toLower", "toString", "toUpper", "triggerActivated", "triggerActivation", "triggerArea", "triggerAttachedVehicle", "triggerAttachObject", "triggerAttachVehicle", "triggerStatements", "triggerText", "triggerTimeout", "triggerTimeoutCurrent", "triggerType", "true", "try", "turretLocal", "turretOwner", "turretUnit", "tvAdd", "tvClear", "tvCollapse", "tvCount", "tvCurSel", "tvData", "tvDelete", "tvExpand", "tvPicture", "tvSetCurSel", "tvSetData", "tvSetPicture", "tvSetPictureColor", "tvSetTooltip", "tvSetValue", "tvSort", "tvSortByValue", "tvText", "tvValue", "type", "typeName", "typeOf", "UAVControl", "uiNamespace", "uiSleep", "unassignCurator", "unassignItem", "unassignTeam", "unassignVehicle", "underwater", "uniform", "uniformContainer", "uniformItems", "uniformMagazines", "unitAddons", "unitBackpack", "unitPos", "unitReady", "unitRecoilCoefficient", "units", "unitsBelowHeight", "unlinkItem", "unlockAchievement", "unregisterTask", "updateDrawIcon", "updateMenuItem", "updateObjectTree", "useAudioTimeForMoves", "vectorAdd", "vectorCos", "vectorCrossProduct", "vectorDiff", "vectorDir", "vectorDirVisual", "vectorDistance", "vectorDistanceSqr", "vectorDotProduct", "vectorFromTo", "vectorMagnitude", "vectorMagnitudeSqr", "vectorMultiply", "vectorNormalized", "vectorUp", "vectorUpVisual", "vehicle", "vehicleChat", "vehicleRadio", "vehicles", "vehicleVarName", "velocity", "velocityModelSpace", "verifySignature", "vest", "vestContainer", "vestItems", "vestMagazines", "viewDistance", "visibleCompass", "visibleGPS", "visibleMap", "visiblePosition", "visiblePositionASL", "visibleWatch", "waitUntil", "waves", "waypointAttachedObject", "waypointAttachedVehicle", "waypointAttachObject", "waypointAttachVehicle", "waypointBehaviour", "waypointCombatMode", "waypointCompletionRadius", "waypointDescription", "waypointFormation", "waypointHousePosition", "waypointLoiterRadius", "waypointLoiterType", "waypointName", "waypointPosition", "waypoints", "waypointScript", "waypointsEnabledUAV", "waypointShow", "waypointSpeed", "waypointStatements", "waypointTimeout", "waypointTimeoutCurrent", "waypointType", "waypointVisible", "weaponAccessories", "weaponCargo", "weaponDirection", "weaponLowered", "weapons", "weaponsItems", "weaponsItemsCargo", "weaponState", "weaponsTurret", "weightRTD", "west", "WFSideText", "while", "wind", "windDir", "windStr", "wingsForcesRTD", "with", "worldName", "worldSize", "worldToModel", "worldToModelVisual", "worldToScreen"]
      , r = ["case", "catch", "default", "do", "else", "exit", "exitWith|5", "for", "forEach", "from", "if", "switch", "then", "throw", "to", "try", "while", "with"]
      , i = ["!", "-", "+", "!=", "%", "&&", "*", "/", "=", "==", ">", ">=", "<", "<=", "^", ":", ">>"]
      , n = ["_forEachIndex|10", "_this|10", "_x|10"]
      , a = ["true", "false", "nil"]
      , o = t.filter(function(e) {
        return -1 == r.indexOf(e) && -1 == a.indexOf(e) && -1 == i.indexOf(e)
    });
    o = o.concat(n);
    var s = {
        cN: "string",
        r: 0,
        v: [{
            b: '"',
            e: '"',
            c: [{
                b: '""'
            }]
        }, {
            b: "'",
            e: "'",
            c: [{
                b: "''"
            }]
        }]
    }
      , l = {
        cN: "number",
        b: e.NR,
        r: 0
    }
      , c = {
        cN: "string",
        v: [e.QSM, {
            b: "'\\\\?.",
            e: "'",
            i: "."
        }]
    }
      , d = {
        cN: "meta",
        b: "#",
        e: "$",
        k: {
            "meta-keyword": "if else elif endif define undef warning error line pragma ifdef ifndef"
        },
        c: [{
            b: /\\\n/,
            r: 0
        }, {
            bK: "include",
            e: "$",
            k: {
                "meta-keyword": "include"
            },
            c: [c, {
                cN: "meta-string",
                b: "<",
                e: ">",
                i: "\\n"
            }]
        }, c, l, e.CLCM, e.CBCM]
    };
    return {
        aliases: ["sqf"],
        cI: !0,
        k: {
            keyword: r.join(" "),
            built_in: o.join(" "),
            literal: a.join(" ")
        },
        c: [e.CLCM, e.CBCM, l, s, d]
    }
}),
hljs.registerLanguage("lua", function(e) {
    var t = "\\[=*\\["
      , r = "\\]=*\\]"
      , i = {
        b: t,
        e: r,
        c: ["self"]
    }
      , n = [e.C("--(?!" + t + ")", "$"), e.C("--" + t, r, {
        c: [i],
        r: 10
    })];
    return {
        l: e.UIR,
        k: {
            keyword: "and break do else elseif end false for if in local nil not or repeat return then true until while",
            built_in: "_G _VERSION assert collectgarbage dofile error getfenv getmetatable ipairs load loadfile loadstring module next pairs pcall print rawequal rawget rawset require select setfenv setmetatable tonumber tostring type unpack xpcall coroutine debug io math os package string table"
        },
        c: n.concat([{
            cN: "function",
            bK: "function",
            e: "\\)",
            c: [e.inherit(e.TM, {
                b: "([_a-zA-Z]\\w*\\.)*([_a-zA-Z]\\w*:)?[_a-zA-Z]\\w*"
            }), {
                cN: "params",
                b: "\\(",
                eW: !0,
                c: n
            }].concat(n)
        }, e.CNM, e.ASM, e.QSM, {
            cN: "string",
            b: t,
            e: r,
            c: [i],
            r: 5
        }])
    }
}),
hljs.registerLanguage("stylus", function(e) {
    var t = {
        cN: "variable",
        b: "\\$" + e.IR
    }
      , r = {
        cN: "number",
        b: "#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})"
    }
      , i = ["charset", "css", "debug", "extend", "font-face", "for", "import", "include", "media", "mixin", "page", "warn", "while"]
      , n = ["after", "before", "first-letter", "first-line", "active", "first-child", "focus", "hover", "lang", "link", "visited"]
      , a = ["a", "abbr", "address", "article", "aside", "audio", "b", "blockquote", "body", "button", "canvas", "caption", "cite", "code", "dd", "del", "details", "dfn", "div", "dl", "dt", "em", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "header", "hgroup", "html", "i", "iframe", "img", "input", "ins", "kbd", "label", "legend", "li", "mark", "menu", "nav", "object", "ol", "p", "q", "quote", "samp", "section", "span", "strong", "summary", "sup", "table", "tbody", "td", "textarea", "tfoot", "th", "thead", "time", "tr", "ul", "var", "video"]
      , o = "[\\.\\s\\n\\[\\:,]"
      , s = ["align-content", "align-items", "align-self", "animation", "animation-delay", "animation-direction", "animation-duration", "animation-fill-mode", "animation-iteration-count", "animation-name", "animation-play-state", "animation-timing-function", "auto", "backface-visibility", "background", "background-attachment", "background-clip", "background-color", "background-image", "background-origin", "background-position", "background-repeat", "background-size", "border", "border-bottom", "border-bottom-color", "border-bottom-left-radius", "border-bottom-right-radius", "border-bottom-style", "border-bottom-width", "border-collapse", "border-color", "border-image", "border-image-outset", "border-image-repeat", "border-image-slice", "border-image-source", "border-image-width", "border-left", "border-left-color", "border-left-style", "border-left-width", "border-radius", "border-right", "border-right-color", "border-right-style", "border-right-width", "border-spacing", "border-style", "border-top", "border-top-color", "border-top-left-radius", "border-top-right-radius", "border-top-style", "border-top-width", "border-width", "bottom", "box-decoration-break", "box-shadow", "box-sizing", "break-after", "break-before", "break-inside", "caption-side", "clear", "clip", "clip-path", "color", "column-count", "column-fill", "column-gap", "column-rule", "column-rule-color", "column-rule-style", "column-rule-width", "column-span", "column-width", "columns", "content", "counter-increment", "counter-reset", "cursor", "direction", "display", "empty-cells", "filter", "flex", "flex-basis", "flex-direction", "flex-flow", "flex-grow", "flex-shrink", "flex-wrap", "float", "font", "font-family", "font-feature-settings", "font-kerning", "font-language-override", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-variant", "font-variant-ligatures", "font-weight", "height", "hyphens", "icon", "image-orientation", "image-rendering", "image-resolution", "ime-mode", "inherit", "initial", "justify-content", "left", "letter-spacing", "line-height", "list-style", "list-style-image", "list-style-position", "list-style-type", "margin", "margin-bottom", "margin-left", "margin-right", "margin-top", "marks", "mask", "max-height", "max-width", "min-height", "min-width", "nav-down", "nav-index", "nav-left", "nav-right", "nav-up", "none", "normal", "object-fit", "object-position", "opacity", "order", "orphans", "outline", "outline-color", "outline-offset", "outline-style", "outline-width", "overflow", "overflow-wrap", "overflow-x", "overflow-y", "padding", "padding-bottom", "padding-left", "padding-right", "padding-top", "page-break-after", "page-break-before", "page-break-inside", "perspective", "perspective-origin", "pointer-events", "position", "quotes", "resize", "right", "tab-size", "table-layout", "text-align", "text-align-last", "text-decoration", "text-decoration-color", "text-decoration-line", "text-decoration-style", "text-indent", "text-overflow", "text-rendering", "text-shadow", "text-transform", "text-underline-position", "top", "transform", "transform-origin", "transform-style", "transition", "transition-delay", "transition-duration", "transition-property", "transition-timing-function", "unicode-bidi", "vertical-align", "visibility", "white-space", "widows", "width", "word-break", "word-spacing", "word-wrap", "z-index"];
    return {
        aliases: ["styl"],
        cI: !1,
        i: "(" + ["\\{", "\\}", "\\?", "(\\bReturn\\b)", "(\\bEnd\\b)", "(\\bend\\b)", ";", "#\\s", "\\*\\s", "===\\s", "\\|", "%"].join("|") + ")",
        k: "if else for in",
        c: [e.QSM, e.ASM, e.CLCM, e.CBCM, r, {
            b: "\\.[a-zA-Z][a-zA-Z0-9_-]*" + o,
            rB: !0,
            c: [{
                cN: "selector-class",
                b: "\\.[a-zA-Z][a-zA-Z0-9_-]*"
            }]
        }, {
            b: "\\#[a-zA-Z][a-zA-Z0-9_-]*" + o,
            rB: !0,
            c: [{
                cN: "selector-id",
                b: "\\#[a-zA-Z][a-zA-Z0-9_-]*"
            }]
        }, {
            b: "\\b(" + a.join("|") + ")" + o,
            rB: !0,
            c: [{
                cN: "selector-tag",
                b: "\\b[a-zA-Z][a-zA-Z0-9_-]*"
            }]
        }, {
            b: "&?:?:\\b(" + n.join("|") + ")" + o
        }, {
            b: "@(" + i.join("|") + ")\\b"
        }, t, e.CSSNM, e.NM, {
            cN: "function",
            b: "^[a-zA-Z][a-zA-Z0-9_-]*\\(.*\\)",
            i: "[\\n]",
            rB: !0,
            c: [{
                cN: "title",
                b: "\\b[a-zA-Z][a-zA-Z0-9_-]*"
            }, {
                cN: "params",
                b: /\(/,
                e: /\)/,
                c: [r, t, e.ASM, e.CSSNM, e.NM, e.QSM]
            }]
        }, {
            cN: "attribute",
            b: "\\b(" + s.reverse().join("|") + ")\\b"
        }]
    }
}),
hljs.registerLanguage("diff", function(e) {
    return {
        aliases: ["patch"],
        c: [{
            cN: "meta",
            r: 10,
            v: [{
                b: /^@@ +\-\d+,\d+ +\+\d+,\d+ +@@$/
            }, {
                b: /^\*\*\* +\d+,\d+ +\*\*\*\*$/
            }, {
                b: /^\-\-\- +\d+,\d+ +\-\-\-\-$/
            }]
        }, {
            cN: "comment",
            v: [{
                b: /Index: /,
                e: /$/
            }, {
                b: /=====/,
                e: /=====$/
            }, {
                b: /^\-\-\-/,
                e: /$/
            }, {
                b: /^\*{3} /,
                e: /$/
            }, {
                b: /^\+\+\+/,
                e: /$/
            }, {
                b: /\*{5}/,
                e: /\*{5}$/
            }]
        }, {
            cN: "addition",
            b: "^\\+",
            e: "$"
        }, {
            cN: "deletion",
            b: "^\\-",
            e: "$"
        }, {
            cN: "addition",
            b: "^\\!",
            e: "$"
        }]
    }
}),
hljs.registerLanguage("stan", function(e) {
    return {
        c: [e.HCM, e.CLCM, e.CBCM, {
            b: e.UIR,
            l: e.UIR,
            k: {
                name: "for in while repeat until if then else",
                symbol: "bernoulli bernoulli_logit binomial binomial_logit beta_binomial hypergeometric categorical categorical_logit ordered_logistic neg_binomial neg_binomial_2 neg_binomial_2_log poisson poisson_log multinomial normal exp_mod_normal skew_normal student_t cauchy double_exponential logistic gumbel lognormal chi_square inv_chi_square scaled_inv_chi_square exponential inv_gamma weibull frechet rayleigh wiener pareto pareto_type_2 von_mises uniform multi_normal multi_normal_prec multi_normal_cholesky multi_gp multi_gp_cholesky multi_student_t gaussian_dlm_obs dirichlet lkj_corr lkj_corr_cholesky wishart inv_wishart",
                "selector-tag": "int real vector simplex unit_vector ordered positive_ordered row_vector matrix cholesky_factor_corr cholesky_factor_cov corr_matrix cov_matrix",
                title: "functions model data parameters quantities transformed generated",
                literal: "true false"
            },
            r: 0
        }, {
            cN: "number",
            b: "0[xX][0-9a-fA-F]+[Li]?\\b",
            r: 0
        }, {
            cN: "number",
            b: "0[xX][0-9a-fA-F]+[Li]?\\b",
            r: 0
        }, {
            cN: "number",
            b: "\\d+(?:[eE][+\\-]?\\d*)?L\\b",
            r: 0
        }, {
            cN: "number",
            b: "\\d+\\.(?!\\d)(?:i\\b)?",
            r: 0
        }, {
            cN: "number",
            b: "\\d+(?:\\.\\d*)?(?:[eE][+\\-]?\\d*)?i?\\b",
            r: 0
        }, {
            cN: "number",
            b: "\\.\\d+(?:[eE][+\\-]?\\d*)?i?\\b",
            r: 0
        }]
    }
}),
hljs.registerLanguage("d", function(e) {
    var t = {
        keyword: "abstract alias align asm assert auto body break byte case cast catch class const continue debug default delete deprecated do else enum export extern final finally for foreach foreach_reverse|10 goto if immutable import in inout int interface invariant is lazy macro mixin module new nothrow out override package pragma private protected public pure ref return scope shared static struct super switch synchronized template this throw try typedef typeid typeof union unittest version void volatile while with __FILE__ __LINE__ __gshared|10 __thread __traits __DATE__ __EOF__ __TIME__ __TIMESTAMP__ __VENDOR__ __VERSION__",
        built_in: "bool cdouble cent cfloat char creal dchar delegate double dstring float function idouble ifloat ireal long real short string ubyte ucent uint ulong ushort wchar wstring",
        literal: "false null true"
    }
      , r = "(0|[1-9][\\d_]*)"
      , i = "(" + r + "|0[bB][01_]+|0[xX]([\\da-fA-F][\\da-fA-F_]*|_[\\da-fA-F][\\da-fA-F_]*))"
      , n = "\\\\(['\"\\?\\\\abfnrtv]|u[\\dA-Fa-f]{4}|[0-7]{1,3}|x[\\dA-Fa-f]{2}|U[\\dA-Fa-f]{8})|&[a-zA-Z\\d]{2,};"
      , a = {
        cN: "number",
        b: "\\b" + i + "(L|u|U|Lu|LU|uL|UL)?",
        r: 0
    }
      , o = {
        cN: "number",
        b: "\\b(((0[xX](([\\da-fA-F][\\da-fA-F_]*|_[\\da-fA-F][\\da-fA-F_]*)\\.([\\da-fA-F][\\da-fA-F_]*|_[\\da-fA-F][\\da-fA-F_]*)|\\.?([\\da-fA-F][\\da-fA-F_]*|_[\\da-fA-F][\\da-fA-F_]*))[pP][+-]?(0|[1-9][\\d_]*|\\d[\\d_]*|[\\d_]+?\\d))|((0|[1-9][\\d_]*|\\d[\\d_]*|[\\d_]+?\\d)(\\.\\d*|([eE][+-]?(0|[1-9][\\d_]*|\\d[\\d_]*|[\\d_]+?\\d)))|\\d+\\.(0|[1-9][\\d_]*|\\d[\\d_]*|[\\d_]+?\\d)(0|[1-9][\\d_]*|\\d[\\d_]*|[\\d_]+?\\d)|\\.(0|[1-9][\\d_]*)([eE][+-]?(0|[1-9][\\d_]*|\\d[\\d_]*|[\\d_]+?\\d))?))([fF]|L|i|[fF]i|Li)?|" + i + "(i|[fF]i|Li))",
        r: 0
    }
      , s = {
        cN: "string",
        b: "'(" + n + "|.)",
        e: "'",
        i: "."
    }
      , l = {
        b: n,
        r: 0
    }
      , c = {
        cN: "string",
        b: '"',
        c: [l],
        e: '"[cwd]?'
    }
      , d = {
        cN: "string",
        b: '[rq]"',
        e: '"[cwd]?',
        r: 5
    }
      , u = {
        cN: "string",
        b: "`",
        e: "`[cwd]?"
    }
      , p = {
        cN: "string",
        b: 'x"[\\da-fA-F\\s\\n\\r]*"[cwd]?',
        r: 10
    }
      , m = {
        cN: "string",
        b: 'q"\\{',
        e: '\\}"'
    }
      , h = {
        cN: "meta",
        b: "^#!",
        e: "$",
        r: 5
    }
      , g = {
        cN: "meta",
        b: "#(line)",
        e: "$",
        r: 5
    }
      , _ = {
        cN: "keyword",
        b: "@[a-zA-Z_][a-zA-Z_\\d]*"
    }
      , f = e.C("\\/\\+", "\\+\\/", {
        c: ["self"],
        r: 10
    });
    return {
        l: e.UIR,
        k: t,
        c: [e.CLCM, e.CBCM, f, p, c, d, u, m, o, a, s, h, g, _]
    }
}),
hljs.registerLanguage("tex", function(e) {
    var t = {
        cN: "tag",
        b: /\\/,
        r: 0,
        c: [{
            cN: "name",
            v: [{
                b: /[a-zA-Zа-яА-я]+[*]?/
            }, {
                b: /[^a-zA-Zа-яА-я0-9]/
            }],
            starts: {
                eW: !0,
                r: 0,
                c: [{
                    cN: "string",
                    v: [{
                        b: /\[/,
                        e: /\]/
                    }, {
                        b: /\{/,
                        e: /\}/
                    }]
                }, {
                    b: /\s*=\s*/,
                    eW: !0,
                    r: 0,
                    c: [{
                        cN: "number",
                        b: /-?\d*\.?\d+(pt|pc|mm|cm|in|dd|cc|ex|em)?/
                    }]
                }]
            }
        }]
    };
    return {
        c: [t, {
            cN: "formula",
            c: [t],
            r: 0,
            v: [{
                b: /\$\$/,
                e: /\$\$/
            }, {
                b: /\$/,
                e: /\$/
            }]
        }, e.C("%", "$", {
            r: 0
        })]
    }
}),
hljs.registerLanguage("puppet", function(e) {
    var t = {
        keyword: "and case default else elsif false if in import enherits node or true undef unless main settings $string ",
        literal: "alias audit before loglevel noop require subscribe tag owner ensure group mode name|0 changes context force incl lens load_path onlyif provider returns root show_diff type_check en_address ip_address realname command environment hour monute month monthday special target weekday creates cwd ogoutput refresh refreshonly tries try_sleep umask backup checksum content ctime force ignore links mtime purge recurse recurselimit replace selinux_ignore_defaults selrange selrole seltype seluser source souirce_permissions sourceselect validate_cmd validate_replacement allowdupe attribute_membership auth_membership forcelocal gid ia_load_module members system host_aliases ip allowed_trunk_vlans description device_url duplex encapsulation etherchannel native_vlan speed principals allow_root auth_class auth_type authenticate_user k_of_n mechanisms rule session_owner shared options device fstype enable hasrestart directory present absent link atboot blockdevice device dump pass remounts poller_tag use message withpath adminfile allow_virtual allowcdrom category configfiles flavor install_options instance package_settings platform responsefile status uninstall_options vendor unless_system_user unless_uid binary control flags hasstatus manifest pattern restart running start stop allowdupe auths expiry gid groups home iterations key_membership keys managehome membership password password_max_age password_min_age profile_membership profiles project purge_ssh_keys role_membership roles salt shell uid baseurl cost descr enabled enablegroups exclude failovermethod gpgcheck gpgkey http_caching include includepkgs keepalive metadata_expire metalink mirrorlist priority protect proxy proxy_password proxy_username repo_gpgcheck s3_enabled skip_if_unavailable sslcacert sslclientcert sslclientkey sslverify mounted",
        built_in: "architecture augeasversion blockdevices boardmanufacturer boardproductname boardserialnumber cfkey dhcp_servers domain ec2_ ec2_userdata facterversion filesystems ldom fqdn gid hardwareisa hardwaremodel hostname id|0 interfaces ipaddress ipaddress_ ipaddress6 ipaddress6_ iphostnumber is_virtual kernel kernelmajversion kernelrelease kernelversion kernelrelease kernelversion lsbdistcodename lsbdistdescription lsbdistid lsbdistrelease lsbmajdistrelease lsbminordistrelease lsbrelease macaddress macaddress_ macosx_buildversion macosx_productname macosx_productversion macosx_productverson_major macosx_productversion_minor manufacturer memoryfree memorysize netmask metmask_ network_ operatingsystem operatingsystemmajrelease operatingsystemrelease osfamily partitions path physicalprocessorcount processor processorcount productname ps puppetversion rubysitedir rubyversion selinux selinux_config_mode selinux_config_policy selinux_current_mode selinux_current_mode selinux_enforced selinux_policyversion serialnumber sp_ sshdsakey sshecdsakey sshrsakey swapencrypted swapfree swapsize timezone type uniqueid uptime uptime_days uptime_hours uptime_seconds uuid virtual vlans xendomains zfs_version zonenae zones zpool_version"
    }
      , r = e.C("#", "$")
      , i = "([A-Za-z_]|::)(\\w|::)*"
      , n = e.inherit(e.TM, {
        b: i
    })
      , a = {
        cN: "variable",
        b: "\\$" + i
    }
      , o = {
        cN: "string",
        c: [e.BE, a],
        v: [{
            b: /'/,
            e: /'/
        }, {
            b: /"/,
            e: /"/
        }]
    };
    return {
        aliases: ["pp"],
        c: [r, a, o, {
            bK: "class",
            e: "\\{|;",
            i: /=/,
            c: [n, r]
        }, {
            bK: "define",
            e: /\{/,
            c: [{
                cN: "section",
                b: e.IR,
                endsParent: !0
            }]
        }, {
            b: e.IR + "\\s+\\{",
            rB: !0,
            e: /\S/,
            c: [{
                cN: "keyword",
                b: e.IR
            }, {
                b: /\{/,
                e: /\}/,
                k: t,
                r: 0,
                c: [o, r, {
                    b: "[a-zA-Z_]+\\s*=>",
                    rB: !0,
                    e: "=>",
                    c: [{
                        cN: "attr",
                        b: e.IR
                    }]
                }, {
                    cN: "number",
                    b: "(\\b0[0-7_]+)|(\\b0x[0-9a-fA-F_]+)|(\\b[1-9][0-9_]*(\\.[0-9_]+)?)|[0_]\\b",
                    r: 0
                }, a]
            }],
            r: 0
        }]
    }
}),
hljs.registerLanguage("json", function(e) {
    var t = {
        literal: "true false null"
    }
      , r = [e.QSM, e.CNM]
      , i = {
        e: ",",
        eW: !0,
        eE: !0,
        c: r,
        k: t
    }
      , n = {
        b: "{",
        e: "}",
        c: [{
            cN: "attr",
            b: '\\s*"',
            e: '"\\s*:\\s*',
            eB: !0,
            eE: !0,
            c: [e.BE],
            i: "\\n",
            starts: i
        }],
        i: "\\S"
    }
      , a = {
        b: "\\[",
        e: "\\]",
        c: [e.inherit(i)],
        i: "\\S"
    };
    return r.splice(r.length, 0, n, a),
    {
        c: r,
        k: t,
        i: "\\S"
    }
}),
hljs.registerLanguage("julia", function(e) {
    var t = {
        keyword: "in abstract baremodule begin bitstype break catch ccall const continue do else elseif end export finally for function global if immutable import importall let local macro module quote return try type typealias using while",
        literal: "true false ARGS CPU_CORES C_NULL DL_LOAD_PATH DevNull ENDIAN_BOM ENV I|0 Inf Inf16 Inf32 InsertionSort JULIA_HOME LOAD_PATH MS_ASYNC MS_INVALIDATE MS_SYNC MergeSort NaN NaN16 NaN32 OS_NAME QuickSort RTLD_DEEPBIND RTLD_FIRST RTLD_GLOBAL RTLD_LAZY RTLD_LOCAL RTLD_NODELETE RTLD_NOLOAD RTLD_NOW RoundDown RoundFromZero RoundNearest RoundToZero RoundUp STDERR STDIN STDOUT VERSION WORD_SIZE catalan cglobal e|0 eu|0 eulergamma golden im nothing pi γ π φ Inf64 NaN64 RoundNearestTiesAway RoundNearestTiesUp ",
        built_in: "ANY ASCIIString AbstractArray AbstractRNG AbstractSparseArray Any ArgumentError Array Associative Base64Pipe Bidiagonal BigFloat BigInt BitArray BitMatrix BitVector Bool BoundsError Box CFILE Cchar Cdouble Cfloat Char CharString Cint Clong Clonglong ClusterManager Cmd Coff_t Colon Complex Complex128 Complex32 Complex64 Condition Cptrdiff_t Cshort Csize_t Cssize_t Cuchar Cuint Culong Culonglong Cushort Cwchar_t DArray DataType DenseArray Diagonal Dict DimensionMismatch DirectIndexString Display DivideError DomainError EOFError EachLine Enumerate ErrorException Exception Expr Factorization FileMonitor FileOffset Filter Float16 Float32 Float64 FloatRange FloatingPoint Function GetfieldNode GotoNode Hermitian IO IOBuffer IOStream IPv4 IPv6 InexactError Int Int128 Int16 Int32 Int64 Int8 IntSet Integer InterruptException IntrinsicFunction KeyError LabelNode LambdaStaticData LineNumberNode LoadError LocalProcess MIME MathConst MemoryError MersenneTwister Method MethodError MethodTable Module NTuple NewvarNode Nothing Number ObjectIdDict OrdinalRange OverflowError ParseError PollingFileWatcher ProcessExitedException ProcessGroup Ptr QuoteNode Range Range1 Ranges Rational RawFD Real Regex RegexMatch RemoteRef RepString RevString RopeString RoundingMode Set SharedArray Signed SparseMatrixCSC StackOverflowError Stat StatStruct StepRange String SubArray SubString SymTridiagonal Symbol SymbolNode Symmetric SystemError Task TextDisplay Timer TmStruct TopNode Triangular Tridiagonal Type TypeConstructor TypeError TypeName TypeVar UTF16String UTF32String UTF8String UdpSocket Uint Uint128 Uint16 Uint32 Uint64 Uint8 UndefRefError UndefVarError UniformScaling UnionType UnitRange Unsigned Vararg VersionNumber WString WeakKeyDict WeakRef Woodbury Zip AbstractChannel AbstractFloat AbstractString AssertionError Base64DecodePipe Base64EncodePipe BufferStream CapturedException CartesianIndex CartesianRange Channel Cintmax_t CompositeException Cstring Cuintmax_t Cwstring Date DateTime Dims Enum GenSym GlobalRef HTML InitError InvalidStateException Irrational LinSpace LowerTriangular NullException Nullable OutOfMemoryError Pair PartialQuickSort Pipe RandomDevice ReadOnlyMemoryError ReentrantLock Ref RemoteException SegmentationFault SerializationState SimpleVector TCPSocket Text Tuple UDPSocket UInt UInt128 UInt16 UInt32 UInt64 UInt8 UnicodeError Union UpperTriangular Val Void WorkerConfig AbstractMatrix AbstractSparseMatrix AbstractSparseVector AbstractVecOrMat AbstractVector DenseMatrix DenseVecOrMat DenseVector Matrix SharedMatrix SharedVector StridedArray StridedMatrix StridedVecOrMat StridedVector VecOrMat Vector "
    }
      , r = "[A-Za-z_\\u00A1-\\uFFFF][A-Za-z_0-9\\u00A1-\\uFFFF]*"
      , i = {
        l: r,
        k: t,
        i: /<\//
    }
      , n = {
        cN: "type",
        b: /::/
    }
      , a = {
        cN: "type",
        b: /<:/
    }
      , o = {
        cN: "number",
        b: /(\b0x[\d_]*(\.[\d_]*)?|0x\.\d[\d_]*)p[-+]?\d+|\b0[box][a-fA-F0-9][a-fA-F0-9_]*|(\b\d[\d_]*(\.[\d_]*)?|\.\d[\d_]*)([eEfF][-+]?\d+)?/,
        r: 0
    }
      , s = {
        cN: "string",
        b: /'(.|\\[xXuU][a-zA-Z0-9]+)'/
    }
      , l = {
        cN: "subst",
        b: /\$\(/,
        e: /\)/,
        k: t
    }
      , c = {
        cN: "variable",
        b: "\\$" + r
    }
      , d = {
        cN: "string",
        c: [e.BE, l, c],
        v: [{
            b: /\w*"""/,
            e: /"""\w*/,
            r: 10
        }, {
            b: /\w*"/,
            e: /"\w*/
        }]
    }
      , u = {
        cN: "string",
        c: [e.BE, l, c],
        b: "`",
        e: "`"
    }
      , p = {
        cN: "meta",
        b: "@" + r
    }
      , m = {
        cN: "comment",
        v: [{
            b: "#=",
            e: "=#",
            r: 10
        }, {
            b: "#",
            e: "$"
        }]
    };
    return i.c = [o, s, n, a, d, u, p, m, e.HCM],
    l.c = i.c,
    i
}),
hljs.registerLanguage("typescript", function(e) {
    var t = {
        keyword: "in if for while finally var new function do return void else break catch instanceof with throw case default try this switch continue typeof delete let yield const class public private protected get set super static implements enum export import declare type namespace abstract",
        literal: "true false null undefined NaN Infinity",
        built_in: "eval isFinite isNaN parseFloat parseInt decodeURI decodeURIComponent encodeURI encodeURIComponent escape unescape Object Function Boolean Error EvalError InternalError RangeError ReferenceError StopIteration SyntaxError TypeError URIError Number Math Date String RegExp Array Float32Array Float64Array Int16Array Int32Array Int8Array Uint16Array Uint32Array Uint8Array Uint8ClampedArray ArrayBuffer DataView JSON Intl arguments require module console window document any number boolean string void"
    };
    return {
        aliases: ["ts"],
        k: t,
        c: [{
            cN: "meta",
            b: /^\s*['"]use strict['"]/
        }, e.ASM, e.QSM, {
            cN: "string",
            b: "`",
            e: "`",
            c: [e.BE, {
                cN: "subst",
                b: "\\$\\{",
                e: "\\}"
            }]
        }, e.CLCM, e.CBCM, {
            cN: "number",
            v: [{
                b: "\\b(0[bB][01]+)"
            }, {
                b: "\\b(0[oO][0-7]+)"
            }, {
                b: e.CNR
            }],
            r: 0
        }, {
            b: "(" + e.RSR + "|\\b(case|return|throw)\\b)\\s*",
            k: "return throw case",
            c: [e.CLCM, e.CBCM, e.RM],
            r: 0
        }, {
            cN: "function",
            b: "function",
            e: /[\{;]/,
            eE: !0,
            k: t,
            c: ["self", e.inherit(e.TM, {
                b: /[A-Za-z$_][0-9A-Za-z$_]*/
            }), {
                cN: "params",
                b: /\(/,
                e: /\)/,
                eB: !0,
                eE: !0,
                k: t,
                c: [e.CLCM, e.CBCM],
                i: /["'\(]/
            }],
            i: /\[|%/,
            r: 0
        }, {
            bK: "constructor",
            e: /\{/,
            eE: !0
        }, {
            bK: "module",
            e: /\{/,
            eE: !0
        }, {
            bK: "interface",
            e: /\{/,
            eE: !0,
            k: "interface extends"
        }, {
            b: /\$[(.]/
        }, {
            b: "\\." + e.IR,
            r: 0
        }]
    }
}),
hljs.registerLanguage("fix", function(e) {
    return {
        c: [{
            b: /[^\u2401\u0001]+/,
            e: /[\u2401\u0001]/,
            eE: !0,
            rB: !0,
            rE: !1,
            c: [{
                b: /([^\u2401\u0001=]+)/,
                e: /=([^\u2401\u0001=]+)/,
                rE: !0,
                rB: !1,
                cN: "attr"
            }, {
                b: /=/,
                e: /([\u2401\u0001])/,
                eE: !0,
                eB: !0,
                cN: "string"
            }]
        }],
        cI: !0
    }
}),
hljs.registerLanguage("django", function(e) {
    var t = {
        b: /\|[A-Za-z]+:?/,
        k: {
            name: "truncatewords removetags linebreaksbr yesno get_digit timesince random striptags filesizeformat escape linebreaks length_is ljust rjust cut urlize fix_ampersands title floatformat capfirst pprint divisibleby add make_list unordered_list urlencode timeuntil urlizetrunc wordcount stringformat linenumbers slice date dictsort dictsortreversed default_if_none pluralize lower join center default truncatewords_html upper length phone2numeric wordwrap time addslashes slugify first escapejs force_escape iriencode last safe safeseq truncatechars localize unlocalize localtime utc timezone"
        },
        c: [e.QSM, e.ASM]
    };
    return {
        aliases: ["jinja"],
        cI: !0,
        sL: "xml",
        c: [e.C(/\{%\s*comment\s*%}/, /\{%\s*endcomment\s*%}/), e.C(/\{#/, /#}/), {
            cN: "template-tag",
            b: /\{%/,
            e: /%}/,
            c: [{
                cN: "name",
                b: /\w+/,
                k: {
                    name: "comment endcomment load templatetag ifchanged endifchanged if endif firstof for endfor ifnotequal endifnotequal widthratio extends include spaceless endspaceless regroup ifequal endifequal ssi now with cycle url filter endfilter debug block endblock else autoescape endautoescape csrf_token empty elif endwith static trans blocktrans endblocktrans get_static_prefix get_media_prefix plural get_current_language language get_available_languages get_current_language_bidi get_language_info get_language_info_list localize endlocalize localtime endlocaltime timezone endtimezone get_current_timezone verbatim"
                },
                starts: {
                    eW: !0,
                    k: "in by as",
                    c: [t],
                    r: 0
                }
            }]
        }, {
            cN: "template-variable",
            b: /\{\{/,
            e: /}}/,
            c: [t]
        }]
    }
}),
hljs.registerLanguage("cmake", function(e) {
    return {
        aliases: ["cmake.in"],
        cI: !0,
        k: {
            keyword: "add_custom_command add_custom_target add_definitions add_dependencies add_executable add_library add_subdirectory add_test aux_source_directory break build_command cmake_minimum_required cmake_policy configure_file create_test_sourcelist define_property else elseif enable_language enable_testing endforeach endfunction endif endmacro endwhile execute_process export find_file find_library find_package find_path find_program fltk_wrap_ui foreach function get_cmake_property get_directory_property get_filename_component get_property get_source_file_property get_target_property get_test_property if include include_directories include_external_msproject include_regular_expression install link_directories load_cache load_command macro mark_as_advanced message option output_required_files project qt_wrap_cpp qt_wrap_ui remove_definitions return separate_arguments set set_directory_properties set_property set_source_files_properties set_target_properties set_tests_properties site_name source_group string target_link_libraries try_compile try_run unset variable_watch while build_name exec_program export_library_dependencies install_files install_programs install_targets link_libraries make_directory remove subdir_depends subdirs use_mangled_mesa utility_source variable_requires write_file qt5_use_modules qt5_use_package qt5_wrap_cpp on off true false and or equal less greater strless strgreater strequal matches"
        },
        c: [{
            cN: "variable",
            b: "\\${",
            e: "}"
        }, e.HCM, e.QSM, e.NM]
    }
}),
hljs.registerLanguage("x86asm", function(e) {
    return {
        cI: !0,
        l: "[.%]?" + e.IR,
        k: {
            keyword: "lock rep repe repz repne repnz xaquire xrelease bnd nobnd aaa aad aam aas adc add and arpl bb0_reset bb1_reset bound bsf bsr bswap bt btc btr bts call cbw cdq cdqe clc cld cli clts cmc cmp cmpsb cmpsd cmpsq cmpsw cmpxchg cmpxchg486 cmpxchg8b cmpxchg16b cpuid cpu_read cpu_write cqo cwd cwde daa das dec div dmint emms enter equ f2xm1 fabs fadd faddp fbld fbstp fchs fclex fcmovb fcmovbe fcmove fcmovnb fcmovnbe fcmovne fcmovnu fcmovu fcom fcomi fcomip fcomp fcompp fcos fdecstp fdisi fdiv fdivp fdivr fdivrp femms feni ffree ffreep fiadd ficom ficomp fidiv fidivr fild fimul fincstp finit fist fistp fisttp fisub fisubr fld fld1 fldcw fldenv fldl2e fldl2t fldlg2 fldln2 fldpi fldz fmul fmulp fnclex fndisi fneni fninit fnop fnsave fnstcw fnstenv fnstsw fpatan fprem fprem1 fptan frndint frstor fsave fscale fsetpm fsin fsincos fsqrt fst fstcw fstenv fstp fstsw fsub fsubp fsubr fsubrp ftst fucom fucomi fucomip fucomp fucompp fxam fxch fxtract fyl2x fyl2xp1 hlt ibts icebp idiv imul in inc incbin insb insd insw int int01 int1 int03 int3 into invd invpcid invlpg invlpga iret iretd iretq iretw jcxz jecxz jrcxz jmp jmpe lahf lar lds lea leave les lfence lfs lgdt lgs lidt lldt lmsw loadall loadall286 lodsb lodsd lodsq lodsw loop loope loopne loopnz loopz lsl lss ltr mfence monitor mov movd movq movsb movsd movsq movsw movsx movsxd movzx mul mwait neg nop not or out outsb outsd outsw packssdw packsswb packuswb paddb paddd paddsb paddsiw paddsw paddusb paddusw paddw pand pandn pause paveb pavgusb pcmpeqb pcmpeqd pcmpeqw pcmpgtb pcmpgtd pcmpgtw pdistib pf2id pfacc pfadd pfcmpeq pfcmpge pfcmpgt pfmax pfmin pfmul pfrcp pfrcpit1 pfrcpit2 pfrsqit1 pfrsqrt pfsub pfsubr pi2fd pmachriw pmaddwd pmagw pmulhriw pmulhrwa pmulhrwc pmulhw pmullw pmvgezb pmvlzb pmvnzb pmvzb pop popa popad popaw popf popfd popfq popfw por prefetch prefetchw pslld psllq psllw psrad psraw psrld psrlq psrlw psubb psubd psubsb psubsiw psubsw psubusb psubusw psubw punpckhbw punpckhdq punpckhwd punpcklbw punpckldq punpcklwd push pusha pushad pushaw pushf pushfd pushfq pushfw pxor rcl rcr rdshr rdmsr rdpmc rdtsc rdtscp ret retf retn rol ror rdm rsdc rsldt rsm rsts sahf sal salc sar sbb scasb scasd scasq scasw sfence sgdt shl shld shr shrd sidt sldt skinit smi smint smintold smsw stc std sti stosb stosd stosq stosw str sub svdc svldt svts swapgs syscall sysenter sysexit sysret test ud0 ud1 ud2b ud2 ud2a umov verr verw fwait wbinvd wrshr wrmsr xadd xbts xchg xlatb xlat xor cmove cmovz cmovne cmovnz cmova cmovnbe cmovae cmovnb cmovb cmovnae cmovbe cmovna cmovg cmovnle cmovge cmovnl cmovl cmovnge cmovle cmovng cmovc cmovnc cmovo cmovno cmovs cmovns cmovp cmovpe cmovnp cmovpo je jz jne jnz ja jnbe jae jnb jb jnae jbe jna jg jnle jge jnl jl jnge jle jng jc jnc jo jno js jns jpo jnp jpe jp sete setz setne setnz seta setnbe setae setnb setnc setb setnae setcset setbe setna setg setnle setge setnl setl setnge setle setng sets setns seto setno setpe setp setpo setnp addps addss andnps andps cmpeqps cmpeqss cmpleps cmpless cmpltps cmpltss cmpneqps cmpneqss cmpnleps cmpnless cmpnltps cmpnltss cmpordps cmpordss cmpunordps cmpunordss cmpps cmpss comiss cvtpi2ps cvtps2pi cvtsi2ss cvtss2si cvttps2pi cvttss2si divps divss ldmxcsr maxps maxss minps minss movaps movhps movlhps movlps movhlps movmskps movntps movss movups mulps mulss orps rcpps rcpss rsqrtps rsqrtss shufps sqrtps sqrtss stmxcsr subps subss ucomiss unpckhps unpcklps xorps fxrstor fxrstor64 fxsave fxsave64 xgetbv xsetbv xsave xsave64 xsaveopt xsaveopt64 xrstor xrstor64 prefetchnta prefetcht0 prefetcht1 prefetcht2 maskmovq movntq pavgb pavgw pextrw pinsrw pmaxsw pmaxub pminsw pminub pmovmskb pmulhuw psadbw pshufw pf2iw pfnacc pfpnacc pi2fw pswapd maskmovdqu clflush movntdq movnti movntpd movdqa movdqu movdq2q movq2dq paddq pmuludq pshufd pshufhw pshuflw pslldq psrldq psubq punpckhqdq punpcklqdq addpd addsd andnpd andpd cmpeqpd cmpeqsd cmplepd cmplesd cmpltpd cmpltsd cmpneqpd cmpneqsd cmpnlepd cmpnlesd cmpnltpd cmpnltsd cmpordpd cmpordsd cmpunordpd cmpunordsd cmppd comisd cvtdq2pd cvtdq2ps cvtpd2dq cvtpd2pi cvtpd2ps cvtpi2pd cvtps2dq cvtps2pd cvtsd2si cvtsd2ss cvtsi2sd cvtss2sd cvttpd2pi cvttpd2dq cvttps2dq cvttsd2si divpd divsd maxpd maxsd minpd minsd movapd movhpd movlpd movmskpd movupd mulpd mulsd orpd shufpd sqrtpd sqrtsd subpd subsd ucomisd unpckhpd unpcklpd xorpd addsubpd addsubps haddpd haddps hsubpd hsubps lddqu movddup movshdup movsldup clgi stgi vmcall vmclear vmfunc vmlaunch vmload vmmcall vmptrld vmptrst vmread vmresume vmrun vmsave vmwrite vmxoff vmxon invept invvpid pabsb pabsw pabsd palignr phaddw phaddd phaddsw phsubw phsubd phsubsw pmaddubsw pmulhrsw pshufb psignb psignw psignd extrq insertq movntsd movntss lzcnt blendpd blendps blendvpd blendvps dppd dpps extractps insertps movntdqa mpsadbw packusdw pblendvb pblendw pcmpeqq pextrb pextrd pextrq phminposuw pinsrb pinsrd pinsrq pmaxsb pmaxsd pmaxud pmaxuw pminsb pminsd pminud pminuw pmovsxbw pmovsxbd pmovsxbq pmovsxwd pmovsxwq pmovsxdq pmovzxbw pmovzxbd pmovzxbq pmovzxwd pmovzxwq pmovzxdq pmuldq pmulld ptest roundpd roundps roundsd roundss crc32 pcmpestri pcmpestrm pcmpistri pcmpistrm pcmpgtq popcnt getsec pfrcpv pfrsqrtv movbe aesenc aesenclast aesdec aesdeclast aesimc aeskeygenassist vaesenc vaesenclast vaesdec vaesdeclast vaesimc vaeskeygenassist vaddpd vaddps vaddsd vaddss vaddsubpd vaddsubps vandpd vandps vandnpd vandnps vblendpd vblendps vblendvpd vblendvps vbroadcastss vbroadcastsd vbroadcastf128 vcmpeq_ospd vcmpeqpd vcmplt_ospd vcmpltpd vcmple_ospd vcmplepd vcmpunord_qpd vcmpunordpd vcmpneq_uqpd vcmpneqpd vcmpnlt_uspd vcmpnltpd vcmpnle_uspd vcmpnlepd vcmpord_qpd vcmpordpd vcmpeq_uqpd vcmpnge_uspd vcmpngepd vcmpngt_uspd vcmpngtpd vcmpfalse_oqpd vcmpfalsepd vcmpneq_oqpd vcmpge_ospd vcmpgepd vcmpgt_ospd vcmpgtpd vcmptrue_uqpd vcmptruepd vcmplt_oqpd vcmple_oqpd vcmpunord_spd vcmpneq_uspd vcmpnlt_uqpd vcmpnle_uqpd vcmpord_spd vcmpeq_uspd vcmpnge_uqpd vcmpngt_uqpd vcmpfalse_ospd vcmpneq_ospd vcmpge_oqpd vcmpgt_oqpd vcmptrue_uspd vcmppd vcmpeq_osps vcmpeqps vcmplt_osps vcmpltps vcmple_osps vcmpleps vcmpunord_qps vcmpunordps vcmpneq_uqps vcmpneqps vcmpnlt_usps vcmpnltps vcmpnle_usps vcmpnleps vcmpord_qps vcmpordps vcmpeq_uqps vcmpnge_usps vcmpngeps vcmpngt_usps vcmpngtps vcmpfalse_oqps vcmpfalseps vcmpneq_oqps vcmpge_osps vcmpgeps vcmpgt_osps vcmpgtps vcmptrue_uqps vcmptrueps vcmplt_oqps vcmple_oqps vcmpunord_sps vcmpneq_usps vcmpnlt_uqps vcmpnle_uqps vcmpord_sps vcmpeq_usps vcmpnge_uqps vcmpngt_uqps vcmpfalse_osps vcmpneq_osps vcmpge_oqps vcmpgt_oqps vcmptrue_usps vcmpps vcmpeq_ossd vcmpeqsd vcmplt_ossd vcmpltsd vcmple_ossd vcmplesd vcmpunord_qsd vcmpunordsd vcmpneq_uqsd vcmpneqsd vcmpnlt_ussd vcmpnltsd vcmpnle_ussd vcmpnlesd vcmpord_qsd vcmpordsd vcmpeq_uqsd vcmpnge_ussd vcmpngesd vcmpngt_ussd vcmpngtsd vcmpfalse_oqsd vcmpfalsesd vcmpneq_oqsd vcmpge_ossd vcmpgesd vcmpgt_ossd vcmpgtsd vcmptrue_uqsd vcmptruesd vcmplt_oqsd vcmple_oqsd vcmpunord_ssd vcmpneq_ussd vcmpnlt_uqsd vcmpnle_uqsd vcmpord_ssd vcmpeq_ussd vcmpnge_uqsd vcmpngt_uqsd vcmpfalse_ossd vcmpneq_ossd vcmpge_oqsd vcmpgt_oqsd vcmptrue_ussd vcmpsd vcmpeq_osss vcmpeqss vcmplt_osss vcmpltss vcmple_osss vcmpless vcmpunord_qss vcmpunordss vcmpneq_uqss vcmpneqss vcmpnlt_usss vcmpnltss vcmpnle_usss vcmpnless vcmpord_qss vcmpordss vcmpeq_uqss vcmpnge_usss vcmpngess vcmpngt_usss vcmpngtss vcmpfalse_oqss vcmpfalsess vcmpneq_oqss vcmpge_osss vcmpgess vcmpgt_osss vcmpgtss vcmptrue_uqss vcmptruess vcmplt_oqss vcmple_oqss vcmpunord_sss vcmpneq_usss vcmpnlt_uqss vcmpnle_uqss vcmpord_sss vcmpeq_usss vcmpnge_uqss vcmpngt_uqss vcmpfalse_osss vcmpneq_osss vcmpge_oqss vcmpgt_oqss vcmptrue_usss vcmpss vcomisd vcomiss vcvtdq2pd vcvtdq2ps vcvtpd2dq vcvtpd2ps vcvtps2dq vcvtps2pd vcvtsd2si vcvtsd2ss vcvtsi2sd vcvtsi2ss vcvtss2sd vcvtss2si vcvttpd2dq vcvttps2dq vcvttsd2si vcvttss2si vdivpd vdivps vdivsd vdivss vdppd vdpps vextractf128 vextractps vhaddpd vhaddps vhsubpd vhsubps vinsertf128 vinsertps vlddqu vldqqu vldmxcsr vmaskmovdqu vmaskmovps vmaskmovpd vmaxpd vmaxps vmaxsd vmaxss vminpd vminps vminsd vminss vmovapd vmovaps vmovd vmovq vmovddup vmovdqa vmovqqa vmovdqu vmovqqu vmovhlps vmovhpd vmovhps vmovlhps vmovlpd vmovlps vmovmskpd vmovmskps vmovntdq vmovntqq vmovntdqa vmovntpd vmovntps vmovsd vmovshdup vmovsldup vmovss vmovupd vmovups vmpsadbw vmulpd vmulps vmulsd vmulss vorpd vorps vpabsb vpabsw vpabsd vpacksswb vpackssdw vpackuswb vpackusdw vpaddb vpaddw vpaddd vpaddq vpaddsb vpaddsw vpaddusb vpaddusw vpalignr vpand vpandn vpavgb vpavgw vpblendvb vpblendw vpcmpestri vpcmpestrm vpcmpistri vpcmpistrm vpcmpeqb vpcmpeqw vpcmpeqd vpcmpeqq vpcmpgtb vpcmpgtw vpcmpgtd vpcmpgtq vpermilpd vpermilps vperm2f128 vpextrb vpextrw vpextrd vpextrq vphaddw vphaddd vphaddsw vphminposuw vphsubw vphsubd vphsubsw vpinsrb vpinsrw vpinsrd vpinsrq vpmaddwd vpmaddubsw vpmaxsb vpmaxsw vpmaxsd vpmaxub vpmaxuw vpmaxud vpminsb vpminsw vpminsd vpminub vpminuw vpminud vpmovmskb vpmovsxbw vpmovsxbd vpmovsxbq vpmovsxwd vpmovsxwq vpmovsxdq vpmovzxbw vpmovzxbd vpmovzxbq vpmovzxwd vpmovzxwq vpmovzxdq vpmulhuw vpmulhrsw vpmulhw vpmullw vpmulld vpmuludq vpmuldq vpor vpsadbw vpshufb vpshufd vpshufhw vpshuflw vpsignb vpsignw vpsignd vpslldq vpsrldq vpsllw vpslld vpsllq vpsraw vpsrad vpsrlw vpsrld vpsrlq vptest vpsubb vpsubw vpsubd vpsubq vpsubsb vpsubsw vpsubusb vpsubusw vpunpckhbw vpunpckhwd vpunpckhdq vpunpckhqdq vpunpcklbw vpunpcklwd vpunpckldq vpunpcklqdq vpxor vrcpps vrcpss vrsqrtps vrsqrtss vroundpd vroundps vroundsd vroundss vshufpd vshufps vsqrtpd vsqrtps vsqrtsd vsqrtss vstmxcsr vsubpd vsubps vsubsd vsubss vtestps vtestpd vucomisd vucomiss vunpckhpd vunpckhps vunpcklpd vunpcklps vxorpd vxorps vzeroall vzeroupper pclmullqlqdq pclmulhqlqdq pclmullqhqdq pclmulhqhqdq pclmulqdq vpclmullqlqdq vpclmulhqlqdq vpclmullqhqdq vpclmulhqhqdq vpclmulqdq vfmadd132ps vfmadd132pd vfmadd312ps vfmadd312pd vfmadd213ps vfmadd213pd vfmadd123ps vfmadd123pd vfmadd231ps vfmadd231pd vfmadd321ps vfmadd321pd vfmaddsub132ps vfmaddsub132pd vfmaddsub312ps vfmaddsub312pd vfmaddsub213ps vfmaddsub213pd vfmaddsub123ps vfmaddsub123pd vfmaddsub231ps vfmaddsub231pd vfmaddsub321ps vfmaddsub321pd vfmsub132ps vfmsub132pd vfmsub312ps vfmsub312pd vfmsub213ps vfmsub213pd vfmsub123ps vfmsub123pd vfmsub231ps vfmsub231pd vfmsub321ps vfmsub321pd vfmsubadd132ps vfmsubadd132pd vfmsubadd312ps vfmsubadd312pd vfmsubadd213ps vfmsubadd213pd vfmsubadd123ps vfmsubadd123pd vfmsubadd231ps vfmsubadd231pd vfmsubadd321ps vfmsubadd321pd vfnmadd132ps vfnmadd132pd vfnmadd312ps vfnmadd312pd vfnmadd213ps vfnmadd213pd vfnmadd123ps vfnmadd123pd vfnmadd231ps vfnmadd231pd vfnmadd321ps vfnmadd321pd vfnmsub132ps vfnmsub132pd vfnmsub312ps vfnmsub312pd vfnmsub213ps vfnmsub213pd vfnmsub123ps vfnmsub123pd vfnmsub231ps vfnmsub231pd vfnmsub321ps vfnmsub321pd vfmadd132ss vfmadd132sd vfmadd312ss vfmadd312sd vfmadd213ss vfmadd213sd vfmadd123ss vfmadd123sd vfmadd231ss vfmadd231sd vfmadd321ss vfmadd321sd vfmsub132ss vfmsub132sd vfmsub312ss vfmsub312sd vfmsub213ss vfmsub213sd vfmsub123ss vfmsub123sd vfmsub231ss vfmsub231sd vfmsub321ss vfmsub321sd vfnmadd132ss vfnmadd132sd vfnmadd312ss vfnmadd312sd vfnmadd213ss vfnmadd213sd vfnmadd123ss vfnmadd123sd vfnmadd231ss vfnmadd231sd vfnmadd321ss vfnmadd321sd vfnmsub132ss vfnmsub132sd vfnmsub312ss vfnmsub312sd vfnmsub213ss vfnmsub213sd vfnmsub123ss vfnmsub123sd vfnmsub231ss vfnmsub231sd vfnmsub321ss vfnmsub321sd rdfsbase rdgsbase rdrand wrfsbase wrgsbase vcvtph2ps vcvtps2ph adcx adox rdseed clac stac xstore xcryptecb xcryptcbc xcryptctr xcryptcfb xcryptofb montmul xsha1 xsha256 llwpcb slwpcb lwpval lwpins vfmaddpd vfmaddps vfmaddsd vfmaddss vfmaddsubpd vfmaddsubps vfmsubaddpd vfmsubaddps vfmsubpd vfmsubps vfmsubsd vfmsubss vfnmaddpd vfnmaddps vfnmaddsd vfnmaddss vfnmsubpd vfnmsubps vfnmsubsd vfnmsubss vfrczpd vfrczps vfrczsd vfrczss vpcmov vpcomb vpcomd vpcomq vpcomub vpcomud vpcomuq vpcomuw vpcomw vphaddbd vphaddbq vphaddbw vphadddq vphaddubd vphaddubq vphaddubw vphaddudq vphadduwd vphadduwq vphaddwd vphaddwq vphsubbw vphsubdq vphsubwd vpmacsdd vpmacsdqh vpmacsdql vpmacssdd vpmacssdqh vpmacssdql vpmacsswd vpmacssww vpmacswd vpmacsww vpmadcsswd vpmadcswd vpperm vprotb vprotd vprotq vprotw vpshab vpshad vpshaq vpshaw vpshlb vpshld vpshlq vpshlw vbroadcasti128 vpblendd vpbroadcastb vpbroadcastw vpbroadcastd vpbroadcastq vpermd vpermpd vpermps vpermq vperm2i128 vextracti128 vinserti128 vpmaskmovd vpmaskmovq vpsllvd vpsllvq vpsravd vpsrlvd vpsrlvq vgatherdpd vgatherqpd vgatherdps vgatherqps vpgatherdd vpgatherqd vpgatherdq vpgatherqq xabort xbegin xend xtest andn bextr blci blcic blsi blsic blcfill blsfill blcmsk blsmsk blsr blcs bzhi mulx pdep pext rorx sarx shlx shrx tzcnt tzmsk t1mskc valignd valignq vblendmpd vblendmps vbroadcastf32x4 vbroadcastf64x4 vbroadcasti32x4 vbroadcasti64x4 vcompresspd vcompressps vcvtpd2udq vcvtps2udq vcvtsd2usi vcvtss2usi vcvttpd2udq vcvttps2udq vcvttsd2usi vcvttss2usi vcvtudq2pd vcvtudq2ps vcvtusi2sd vcvtusi2ss vexpandpd vexpandps vextractf32x4 vextractf64x4 vextracti32x4 vextracti64x4 vfixupimmpd vfixupimmps vfixupimmsd vfixupimmss vgetexppd vgetexpps vgetexpsd vgetexpss vgetmantpd vgetmantps vgetmantsd vgetmantss vinsertf32x4 vinsertf64x4 vinserti32x4 vinserti64x4 vmovdqa32 vmovdqa64 vmovdqu32 vmovdqu64 vpabsq vpandd vpandnd vpandnq vpandq vpblendmd vpblendmq vpcmpltd vpcmpled vpcmpneqd vpcmpnltd vpcmpnled vpcmpd vpcmpltq vpcmpleq vpcmpneqq vpcmpnltq vpcmpnleq vpcmpq vpcmpequd vpcmpltud vpcmpleud vpcmpnequd vpcmpnltud vpcmpnleud vpcmpud vpcmpequq vpcmpltuq vpcmpleuq vpcmpnequq vpcmpnltuq vpcmpnleuq vpcmpuq vpcompressd vpcompressq vpermi2d vpermi2pd vpermi2ps vpermi2q vpermt2d vpermt2pd vpermt2ps vpermt2q vpexpandd vpexpandq vpmaxsq vpmaxuq vpminsq vpminuq vpmovdb vpmovdw vpmovqb vpmovqd vpmovqw vpmovsdb vpmovsdw vpmovsqb vpmovsqd vpmovsqw vpmovusdb vpmovusdw vpmovusqb vpmovusqd vpmovusqw vpord vporq vprold vprolq vprolvd vprolvq vprord vprorq vprorvd vprorvq vpscatterdd vpscatterdq vpscatterqd vpscatterqq vpsraq vpsravq vpternlogd vpternlogq vptestmd vptestmq vptestnmd vptestnmq vpxord vpxorq vrcp14pd vrcp14ps vrcp14sd vrcp14ss vrndscalepd vrndscaleps vrndscalesd vrndscaless vrsqrt14pd vrsqrt14ps vrsqrt14sd vrsqrt14ss vscalefpd vscalefps vscalefsd vscalefss vscatterdpd vscatterdps vscatterqpd vscatterqps vshuff32x4 vshuff64x2 vshufi32x4 vshufi64x2 kandnw kandw kmovw knotw kortestw korw kshiftlw kshiftrw kunpckbw kxnorw kxorw vpbroadcastmb2q vpbroadcastmw2d vpconflictd vpconflictq vplzcntd vplzcntq vexp2pd vexp2ps vrcp28pd vrcp28ps vrcp28sd vrcp28ss vrsqrt28pd vrsqrt28ps vrsqrt28sd vrsqrt28ss vgatherpf0dpd vgatherpf0dps vgatherpf0qpd vgatherpf0qps vgatherpf1dpd vgatherpf1dps vgatherpf1qpd vgatherpf1qps vscatterpf0dpd vscatterpf0dps vscatterpf0qpd vscatterpf0qps vscatterpf1dpd vscatterpf1dps vscatterpf1qpd vscatterpf1qps prefetchwt1 bndmk bndcl bndcu bndcn bndmov bndldx bndstx sha1rnds4 sha1nexte sha1msg1 sha1msg2 sha256rnds2 sha256msg1 sha256msg2 hint_nop0 hint_nop1 hint_nop2 hint_nop3 hint_nop4 hint_nop5 hint_nop6 hint_nop7 hint_nop8 hint_nop9 hint_nop10 hint_nop11 hint_nop12 hint_nop13 hint_nop14 hint_nop15 hint_nop16 hint_nop17 hint_nop18 hint_nop19 hint_nop20 hint_nop21 hint_nop22 hint_nop23 hint_nop24 hint_nop25 hint_nop26 hint_nop27 hint_nop28 hint_nop29 hint_nop30 hint_nop31 hint_nop32 hint_nop33 hint_nop34 hint_nop35 hint_nop36 hint_nop37 hint_nop38 hint_nop39 hint_nop40 hint_nop41 hint_nop42 hint_nop43 hint_nop44 hint_nop45 hint_nop46 hint_nop47 hint_nop48 hint_nop49 hint_nop50 hint_nop51 hint_nop52 hint_nop53 hint_nop54 hint_nop55 hint_nop56 hint_nop57 hint_nop58 hint_nop59 hint_nop60 hint_nop61 hint_nop62 hint_nop63",
            built_in: "ip eip rip al ah bl bh cl ch dl dh sil dil bpl spl r8b r9b r10b r11b r12b r13b r14b r15b ax bx cx dx si di bp sp r8w r9w r10w r11w r12w r13w r14w r15w eax ebx ecx edx esi edi ebp esp eip r8d r9d r10d r11d r12d r13d r14d r15d rax rbx rcx rdx rsi rdi rbp rsp r8 r9 r10 r11 r12 r13 r14 r15 cs ds es fs gs ss st st0 st1 st2 st3 st4 st5 st6 st7 mm0 mm1 mm2 mm3 mm4 mm5 mm6 mm7 xmm0  xmm1  xmm2  xmm3  xmm4  xmm5  xmm6  xmm7  xmm8  xmm9 xmm10  xmm11 xmm12 xmm13 xmm14 xmm15 xmm16 xmm17 xmm18 xmm19 xmm20 xmm21 xmm22 xmm23 xmm24 xmm25 xmm26 xmm27 xmm28 xmm29 xmm30 xmm31 ymm0  ymm1  ymm2  ymm3  ymm4  ymm5  ymm6  ymm7  ymm8  ymm9 ymm10  ymm11 ymm12 ymm13 ymm14 ymm15 ymm16 ymm17 ymm18 ymm19 ymm20 ymm21 ymm22 ymm23 ymm24 ymm25 ymm26 ymm27 ymm28 ymm29 ymm30 ymm31 zmm0  zmm1  zmm2  zmm3  zmm4  zmm5  zmm6  zmm7  zmm8  zmm9 zmm10  zmm11 zmm12 zmm13 zmm14 zmm15 zmm16 zmm17 zmm18 zmm19 zmm20 zmm21 zmm22 zmm23 zmm24 zmm25 zmm26 zmm27 zmm28 zmm29 zmm30 zmm31 k0 k1 k2 k3 k4 k5 k6 k7 bnd0 bnd1 bnd2 bnd3 cr0 cr1 cr2 cr3 cr4 cr8 dr0 dr1 dr2 dr3 dr8 tr3 tr4 tr5 tr6 tr7 r0 r1 r2 r3 r4 r5 r6 r7 r0b r1b r2b r3b r4b r5b r6b r7b r0w r1w r2w r3w r4w r5w r6w r7w r0d r1d r2d r3d r4d r5d r6d r7d r0h r1h r2h r3h r0l r1l r2l r3l r4l r5l r6l r7l r8l r9l r10l r11l r12l r13l r14l r15l db dw dd dq dt ddq do dy dz resb resw resd resq rest resdq reso resy resz incbin equ times byte word dword qword nosplit rel abs seg wrt strict near far a32 ptr",
            meta: "%define %xdefine %+ %undef %defstr %deftok %assign %strcat %strlen %substr %rotate %elif %else %endif %if %ifmacro %ifctx %ifidn %ifidni %ifid %ifnum %ifstr %iftoken %ifempty %ifenv %error %warning %fatal %rep %endrep %include %push %pop %repl %pathsearch %depend %use %arg %stacksize %local %line %comment %endcomment .nolist __FILE__ __LINE__ __SECT__  __BITS__ __OUTPUT_FORMAT__ __DATE__ __TIME__ __DATE_NUM__ __TIME_NUM__ __UTC_DATE__ __UTC_TIME__ __UTC_DATE_NUM__ __UTC_TIME_NUM__  __PASS__ struc endstruc istruc at iend align alignb sectalign daz nodaz up down zero default option assume public bits use16 use32 use64 default section segment absolute extern global common cpu float __utf16__ __utf16le__ __utf16be__ __utf32__ __utf32le__ __utf32be__ __float8__ __float16__ __float32__ __float64__ __float80m__ __float80e__ __float128l__ __float128h__ __Infinity__ __QNaN__ __SNaN__ Inf NaN QNaN SNaN float8 float16 float32 float64 float80m float80e float128l float128h __FLOAT_DAZ__ __FLOAT_ROUND__ __FLOAT__"
        },
        c: [e.C(";", "$", {
            r: 0
        }), {
            cN: "number",
            v: [{
                b: "\\b(?:([0-9][0-9_]*)?\\.[0-9_]*(?:[eE][+-]?[0-9_]+)?|(0[Xx])?[0-9][0-9_]*\\.?[0-9_]*(?:[pP](?:[+-]?[0-9_]+)?)?)\\b",
                r: 0
            }, {
                b: "\\$[0-9][0-9A-Fa-f]*",
                r: 0
            }, {
                b: "\\b(?:[0-9A-Fa-f][0-9A-Fa-f_]*[Hh]|[0-9][0-9_]*[DdTt]?|[0-7][0-7_]*[QqOo]|[0-1][0-1_]*[BbYy])\\b"
            }, {
                b: "\\b(?:0[Xx][0-9A-Fa-f_]+|0[DdTt][0-9_]+|0[QqOo][0-7_]+|0[BbYy][0-1_]+)\\b"
            }]
        }, e.QSM, {
            cN: "string",
            v: [{
                b: "'",
                e: "[^\\\\]'"
            }, {
                b: "`",
                e: "[^\\\\]`"
            }, {
                b: "\\.[A-Za-z0-9]+"
            }],
            r: 0
        }, {
            cN: "symbol",
            v: [{
                b: "^\\s*[A-Za-z._?][A-Za-z0-9_$#@~.?]*(:|\\s+label)"
            }, {
                b: "^\\s*%%[A-Za-z0-9_$#@~.?]*:"
            }],
            r: 0
        }, {
            cN: "subst",
            b: "%[0-9]+",
            r: 0
        }, {
            cN: "subst",
            b: "%!S+",
            r: 0
        }]
    }
}),
hljs.registerLanguage("clojure", function(e) {
    var t = {
        "builtin-name": "def defonce cond apply if-not if-let if not not= = < > <= >= == + / * - rem quot neg? pos? delay? symbol? keyword? true? false? integer? empty? coll? list? set? ifn? fn? associative? sequential? sorted? counted? reversible? number? decimal? class? distinct? isa? float? rational? reduced? ratio? odd? even? char? seq? vector? string? map? nil? contains? zero? instance? not-every? not-any? libspec? -> ->> .. . inc compare do dotimes mapcat take remove take-while drop letfn drop-last take-last drop-while while intern condp case reduced cycle split-at split-with repeat replicate iterate range merge zipmap declare line-seq sort comparator sort-by dorun doall nthnext nthrest partition eval doseq await await-for let agent atom send send-off release-pending-sends add-watch mapv filterv remove-watch agent-error restart-agent set-error-handler error-handler set-error-mode! error-mode shutdown-agents quote var fn loop recur throw try monitor-enter monitor-exit defmacro defn defn- macroexpand macroexpand-1 for dosync and or when when-not when-let comp juxt partial sequence memoize constantly complement identity assert peek pop doto proxy defstruct first rest cons defprotocol cast coll deftype defrecord last butlast sigs reify second ffirst fnext nfirst nnext defmulti defmethod meta with-meta ns in-ns create-ns import refer keys select-keys vals key val rseq name namespace promise into transient persistent! conj! assoc! dissoc! pop! disj! use class type num float double short byte boolean bigint biginteger bigdec print-method print-dup throw-if printf format load compile get-in update-in pr pr-on newline flush read slurp read-line subvec with-open memfn time re-find re-groups rand-int rand mod locking assert-valid-fdecl alias resolve ref deref refset swap! reset! set-validator! compare-and-set! alter-meta! reset-meta! commute get-validator alter ref-set ref-history-count ref-min-history ref-max-history ensure sync io! new next conj set! to-array future future-call into-array aset gen-class reduce map filter find empty hash-map hash-set sorted-map sorted-map-by sorted-set sorted-set-by vec vector seq flatten reverse assoc dissoc list disj get union difference intersection extend extend-type extend-protocol int nth delay count concat chunk chunk-buffer chunk-append chunk-first chunk-rest max min dec unchecked-inc-int unchecked-inc unchecked-dec-inc unchecked-dec unchecked-negate unchecked-add-int unchecked-add unchecked-subtract-int unchecked-subtract chunk-next chunk-cons chunked-seq? prn vary-meta lazy-seq spread list* str find-keyword keyword symbol gensym force rationalize"
    }
      , r = "a-zA-Z_\\-!.?+*=<>&#'"
      , i = "[" + r + "][" + r + "0-9/;:]*"
      , n = {
        b: i,
        r: 0
    }
      , a = {
        cN: "number",
        b: "[-+]?\\d+(\\.\\d+)?",
        r: 0
    }
      , o = e.inherit(e.QSM, {
        i: null
    })
      , s = e.C(";", "$", {
        r: 0
    })
      , l = {
        cN: "literal",
        b: /\b(true|false|nil)\b/
    }
      , c = {
        b: "[\\[\\{]",
        e: "[\\]\\}]"
    }
      , d = {
        cN: "comment",
        b: "\\^" + i
    }
      , u = e.C("\\^\\{", "\\}")
      , p = {
        cN: "symbol",
        b: "[:]" + i
    }
      , m = {
        b: "\\(",
        e: "\\)"
    }
      , h = {
        eW: !0,
        r: 0
    }
      , g = {
        k: t,
        l: i,
        cN: "name",
        b: i,
        starts: h
    }
      , _ = [m, o, d, u, s, p, c, a, l, n];
    return m.c = [e.C("comment", ""), g, h],
    h.c = _,
    c.c = _,
    {
        aliases: ["clj"],
        i: /\S/,
        c: [m, o, d, u, s, p, c, a, l]
    }
}),
hljs.registerLanguage("armasm", function(e) {
    return {
        cI: !0,
        aliases: ["arm"],
        l: "\\.?" + e.IR,
        k: {
            meta: ".2byte .4byte .align .ascii .asciz .balign .byte .code .data .else .end .endif .endm .endr .equ .err .exitm .extern .global .hword .if .ifdef .ifndef .include .irp .long .macro .rept .req .section .set .skip .space .text .word .arm .thumb .code16 .code32 .force_thumb .thumb_func .ltorg ALIAS ALIGN ARM AREA ASSERT ATTR CN CODE CODE16 CODE32 COMMON CP DATA DCB DCD DCDU DCDO DCFD DCFDU DCI DCQ DCQU DCW DCWU DN ELIF ELSE END ENDFUNC ENDIF ENDP ENTRY EQU EXPORT EXPORTAS EXTERN FIELD FILL FUNCTION GBLA GBLL GBLS GET GLOBAL IF IMPORT INCBIN INCLUDE INFO KEEP LCLA LCLL LCLS LTORG MACRO MAP MEND MEXIT NOFP OPT PRESERVE8 PROC QN READONLY RELOC REQUIRE REQUIRE8 RLIST FN ROUT SETA SETL SETS SN SPACE SUBT THUMB THUMBX TTL WHILE WEND ",
            built_in: "r0 r1 r2 r3 r4 r5 r6 r7 r8 r9 r10 r11 r12 r13 r14 r15 pc lr sp ip sl sb fp a1 a2 a3 a4 v1 v2 v3 v4 v5 v6 v7 v8 f0 f1 f2 f3 f4 f5 f6 f7 p0 p1 p2 p3 p4 p5 p6 p7 p8 p9 p10 p11 p12 p13 p14 p15 c0 c1 c2 c3 c4 c5 c6 c7 c8 c9 c10 c11 c12 c13 c14 c15 q0 q1 q2 q3 q4 q5 q6 q7 q8 q9 q10 q11 q12 q13 q14 q15 cpsr_c cpsr_x cpsr_s cpsr_f cpsr_cx cpsr_cxs cpsr_xs cpsr_xsf cpsr_sf cpsr_cxsf spsr_c spsr_x spsr_s spsr_f spsr_cx spsr_cxs spsr_xs spsr_xsf spsr_sf spsr_cxsf s0 s1 s2 s3 s4 s5 s6 s7 s8 s9 s10 s11 s12 s13 s14 s15 s16 s17 s18 s19 s20 s21 s22 s23 s24 s25 s26 s27 s28 s29 s30 s31 d0 d1 d2 d3 d4 d5 d6 d7 d8 d9 d10 d11 d12 d13 d14 d15 d16 d17 d18 d19 d20 d21 d22 d23 d24 d25 d26 d27 d28 d29 d30 d31 {PC} {VAR} {TRUE} {FALSE} {OPT} {CONFIG} {ENDIAN} {CODESIZE} {CPU} {FPU} {ARCHITECTURE} {PCSTOREOFFSET} {ARMASM_VERSION} {INTER} {ROPI} {RWPI} {SWST} {NOSWST} . @"
        },
        c: [{
            cN: "keyword",
            b: "\\b(adc|(qd?|sh?|u[qh]?)?add(8|16)?|usada?8|(q|sh?|u[qh]?)?(as|sa)x|and|adrl?|sbc|rs[bc]|asr|b[lx]?|blx|bxj|cbn?z|tb[bh]|bic|bfc|bfi|[su]bfx|bkpt|cdp2?|clz|clrex|cmp|cmn|cpsi[ed]|cps|setend|dbg|dmb|dsb|eor|isb|it[te]{0,3}|lsl|lsr|ror|rrx|ldm(([id][ab])|f[ds])?|ldr((s|ex)?[bhd])?|movt?|mvn|mra|mar|mul|[us]mull|smul[bwt][bt]|smu[as]d|smmul|smmla|mla|umlaal|smlal?([wbt][bt]|d)|mls|smlsl?[ds]|smc|svc|sev|mia([bt]{2}|ph)?|mrr?c2?|mcrr2?|mrs|msr|orr|orn|pkh(tb|bt)|rbit|rev(16|sh)?|sel|[su]sat(16)?|nop|pop|push|rfe([id][ab])?|stm([id][ab])?|str(ex)?[bhd]?|(qd?)?sub|(sh?|q|u[qh]?)?sub(8|16)|[su]xt(a?h|a?b(16)?)|srs([id][ab])?|swpb?|swi|smi|tst|teq|wfe|wfi|yield)(eq|ne|cs|cc|mi|pl|vs|vc|hi|ls|ge|lt|gt|le|al|hs|lo)?[sptrx]?",
            e: "\\s"
        }, e.C("[;@]", "$", {
            r: 0
        }), e.CBCM, e.QSM, {
            cN: "string",
            b: "'",
            e: "[^\\\\]'",
            r: 0
        }, {
            cN: "title",
            b: "\\|",
            e: "\\|",
            i: "\\n",
            r: 0
        }, {
            cN: "number",
            v: [{
                b: "[#$=]?0x[0-9a-f]+"
            }, {
                b: "[#$=]?0b[01]+"
            }, {
                b: "[#$=]\\d+"
            }, {
                b: "\\b\\d+"
            }],
            r: 0
        }, {
            cN: "symbol",
            v: [{
                b: "^[a-z_\\.\\$][a-z0-9_\\.\\$]+"
            }, {
                b: "^\\s*[a-z_\\.\\$][a-z0-9_\\.\\$]+:"
            }, {
                b: "[=#]\\w+"
            }],
            r: 0
        }]
    }
}),
hljs.registerLanguage("elixir", function(e) {
    var t = "[a-zA-Z_][a-zA-Z0-9_]*(\\!|\\?)?"
      , r = "and false then defined module in return redo retry end for true self when next until do begin unless nil break not case cond alias while ensure or include use alias fn quote"
      , i = {
        cN: "subst",
        b: "#\\{",
        e: "}",
        l: t,
        k: r
    }
      , n = {
        cN: "string",
        c: [e.BE, i],
        v: [{
            b: /'/,
            e: /'/
        }, {
            b: /"/,
            e: /"/
        }]
    }
      , a = {
        cN: "function",
        bK: "def defp defmacro",
        e: /\B\b/,
        c: [e.inherit(e.TM, {
            b: t,
            endsParent: !0
        })]
    }
      , o = e.inherit(a, {
        cN: "class",
        bK: "defmodule defrecord",
        e: /\bdo\b|$|;/
    })
      , s = [n, e.HCM, o, a, {
        cN: "symbol",
        b: ":",
        c: [n, {
            b: "[a-zA-Z_]\\w*[!?=]?|[-+~]\\@|<<|>>|=~|===?|<=>|[<>]=?|\\*\\*|[-/+%^&*~`|]|\\[\\]=?"
        }],
        r: 0
    }, {
        cN: "symbol",
        b: t + ":",
        r: 0
    }, {
        cN: "number",
        b: "(\\b0[0-7_]+)|(\\b0x[0-9a-fA-F_]+)|(\\b[1-9][0-9_]*(\\.[0-9_]+)?)|[0_]\\b",
        r: 0
    }, {
        cN: "variable",
        b: "(\\$\\W)|((\\$|\\@\\@?)(\\w+))"
    }, {
        b: "->"
    }, {
        b: "(" + e.RSR + ")\\s*",
        c: [e.HCM, {
            cN: "regexp",
            i: "\\n",
            c: [e.BE, i],
            v: [{
                b: "/",
                e: "/[a-z]*"
            }, {
                b: "%r\\[",
                e: "\\][a-z]*"
            }]
        }],
        r: 0
    }];
    return i.c = s,
    {
        l: t,
        k: r,
        c: s
    }
}),
hljs.registerLanguage("autohotkey", function(e) {
    var t = {
        b: /`[\s\S]/
    };
    return {
        cI: !0,
        k: {
            keyword: "Break Continue Else Gosub If Loop Return While",
            literal: "A|0 true false NOT AND OR",
            built_in: "ComSpec Clipboard ClipboardAll ErrorLevel"
        },
        c: [{
            cN: "built_in",
            b: "A_[a-zA-Z0-9]+"
        }, t, e.inherit(e.QSM, {
            c: [t]
        }), e.C(";", "$", {
            r: 0
        }), {
            cN: "number",
            b: e.NR,
            r: 0
        }, {
            cN: "variable",
            b: "%",
            e: "%",
            i: "\\n",
            c: [t]
        }, {
            cN: "symbol",
            c: [t],
            v: [{
                b: '^[^\\n";]+::(?!=)'
            }, {
                b: '^[^\\n";]+:(?!=)',
                r: 0
            }]
        }, {
            b: ",\\s*,"
        }]
    }
}),
hljs.registerLanguage("parser3", function(e) {
    var t = e.C("{", "}", {
        c: ["self"]
    });
    return {
        sL: "xml",
        r: 0,
        c: [e.C("^#", "$"), e.C("\\^rem{", "}", {
            r: 10,
            c: [t]
        }), {
            cN: "meta",
            b: "^@(?:BASE|USE|CLASS|OPTIONS)$",
            r: 10
        }, {
            cN: "title",
            b: "@[\\w\\-]+\\[[\\w^;\\-]*\\](?:\\[[\\w^;\\-]*\\])?(?:.*)$"
        }, {
            cN: "variable",
            b: "\\$\\{?[\\w\\-\\.\\:]+\\}?"
        }, {
            cN: "keyword",
            b: "\\^[\\w\\-\\.\\:]+"
        }, {
            cN: "number",
            b: "\\^#[0-9a-fA-F]+"
        }, e.CNM]
    }
}),
hljs.registerLanguage("objectivec", function(e) {
    var t = {
        cN: "built_in",
        b: "(AV|CA|CF|CG|CI|MK|MP|NS|UI|XC)\\w+"
    }
      , r = {
        keyword: "int float while char export sizeof typedef const struct for union unsigned long volatile static bool mutable if do return goto void enum else break extern asm case short default double register explicit signed typename this switch continue wchar_t inline readonly assign readwrite self @synchronized id typeof nonatomic super unichar IBOutlet IBAction strong weak copy in out inout bycopy byref oneway __strong __weak __block __autoreleasing @private @protected @public @try @property @end @throw @catch @finally @autoreleasepool @synthesize @dynamic @selector @optional @required",
        literal: "false true FALSE TRUE nil YES NO NULL",
        built_in: "BOOL dispatch_once_t dispatch_queue_t dispatch_sync dispatch_async dispatch_once"
    }
      , i = /[a-zA-Z@][a-zA-Z0-9_]*/
      , n = "@interface @class @protocol @implementation";
    return {
        aliases: ["mm", "objc", "obj-c"],
        k: r,
        l: i,
        i: "</",
        c: [t, e.CLCM, e.CBCM, e.CNM, e.QSM, {
            cN: "string",
            v: [{
                b: '@"',
                e: '"',
                i: "\\n",
                c: [e.BE]
            }, {
                b: "'",
                e: "[^\\\\]'",
                i: "[^\\\\][^']"
            }]
        }, {
            cN: "meta",
            b: "#",
            e: "$",
            c: [{
                cN: "meta-string",
                v: [{
                    b: '"',
                    e: '"'
                }, {
                    b: "<",
                    e: ">"
                }]
            }]
        }, {
            cN: "class",
            b: "(" + n.split(" ").join("|") + ")\\b",
            e: "({|$)",
            eE: !0,
            k: n,
            l: i,
            c: [e.UTM]
        }, {
            b: "\\." + e.UIR,
            r: 0
        }]
    }
}),
hljs.registerLanguage("smalltalk", function(e) {
    var t = "[a-z][a-zA-Z0-9_]*"
      , r = {
        cN: "string",
        b: "\\$.{1}"
    }
      , i = {
        cN: "symbol",
        b: "#" + e.UIR
    };
    return {
        aliases: ["st"],
        k: "self super nil true false thisContext",
        c: [e.C('"', '"'), e.ASM, {
            cN: "type",
            b: "\\b[A-Z][A-Za-z0-9_]*",
            r: 0
        }, {
            b: t + ":",
            r: 0
        }, e.CNM, i, r, {
            b: "\\|[ ]*" + t + "([ ]+" + t + ")*[ ]*\\|",
            rB: !0,
            e: /\|/,
            i: /\S/,
            c: [{
                b: "(\\|[ ]*)?" + t
            }]
        }, {
            b: "\\#\\(",
            e: "\\)",
            c: [e.ASM, r, e.CNM, i]
        }]
    }
}),
hljs.registerLanguage("applescript", function(e) {
    var t = e.inherit(e.QSM, {
        i: ""
    })
      , r = {
        cN: "params",
        b: "\\(",
        e: "\\)",
        c: ["self", e.CNM, t]
    }
      , i = e.C("--", "$")
      , n = e.C("\\(\\*", "\\*\\)", {
        c: ["self", i]
    })
      , a = [i, n, e.HCM];
    return {
        aliases: ["osascript"],
        k: {
            keyword: "about above after against and around as at back before beginning behind below beneath beside between but by considering contain contains continue copy div does eighth else end equal equals error every exit fifth first for fourth from front get given global if ignoring in into is it its last local me middle mod my ninth not of on onto or over prop property put ref reference repeat returning script second set seventh since sixth some tell tenth that the|0 then third through thru timeout times to transaction try until where while whose with without",
            literal: "AppleScript false linefeed return pi quote result space tab true",
            built_in: "alias application boolean class constant date file integer list number real record string text activate beep count delay launch log offset read round run say summarize write character characters contents day frontmost id item length month name paragraph paragraphs rest reverse running time version weekday word words year"
        },
        c: [t, e.CNM, {
            cN: "built_in",
            b: "\\b(clipboard info|the clipboard|info for|list (disks|folder)|mount volume|path to|(close|open for) access|(get|set) eof|current date|do shell script|get volume settings|random number|set volume|system attribute|system info|time to GMT|(load|run|store) script|scripting components|ASCII (character|number)|localized string|choose (application|color|file|file name|folder|from list|remote application|URL)|display (alert|dialog))\\b|^\\s*return\\b"
        }, {
            cN: "literal",
            b: "\\b(text item delimiters|current application|missing value)\\b"
        }, {
            cN: "keyword",
            b: "\\b(apart from|aside from|instead of|out of|greater than|isn't|(doesn't|does not) (equal|come before|come after|contain)|(greater|less) than( or equal)?|(starts?|ends|begins?) with|contained by|comes (before|after)|a (ref|reference)|POSIX file|POSIX path|(date|time) string|quoted form)\\b"
        }, {
            bK: "on",
            i: "[${=;\\n]",
            c: [e.UTM, r]
        }].concat(a),
        i: "//|->|=>|\\[\\["
    }
}),
hljs.registerLanguage("ocaml", function(e) {
    return {
        aliases: ["ml"],
        k: {
            keyword: "and as assert asr begin class constraint do done downto else end exception external for fun function functor if in include inherit! inherit initializer land lazy let lor lsl lsr lxor match method!|10 method mod module mutable new object of open! open or private rec sig struct then to try type val! val virtual when while with parser value",
            built_in: "array bool bytes char exn|5 float int int32 int64 list lazy_t|5 nativeint|5 string unit in_channel out_channel ref",
            literal: "true false"
        },
        i: /\/\/|>>/,
        l: "[a-z_]\\w*!?",
        c: [{
            cN: "literal",
            b: "\\[(\\|\\|)?\\]|\\(\\)",
            r: 0
        }, e.C("\\(\\*", "\\*\\)", {
            c: ["self"]
        }), {
            cN: "symbol",
            b: "'[A-Za-z_](?!')[\\w']*"
        }, {
            cN: "type",
            b: "`[A-Z][\\w']*"
        }, {
            cN: "type",
            b: "\\b[A-Z][\\w']*",
            r: 0
        }, {
            b: "[a-z_]\\w*'[\\w']*",
            r: 0
        }, e.inherit(e.ASM, {
            cN: "string",
            r: 0
        }), e.inherit(e.QSM, {
            i: null
        }), {
            cN: "number",
            b: "\\b(0[xX][a-fA-F0-9_]+[Lln]?|0[oO][0-7_]+[Lln]?|0[bB][01_]+[Lln]?|[0-9][0-9_]*([Lln]|(\\.[0-9_]*)?([eE][-+]?[0-9_]+)?)?)",
            r: 0
        }, {
            b: /[-=]>/
        }]
    }
}),
hljs.registerLanguage("groovy", function(e) {
    return {
        k: {
            literal: "true false null",
            keyword: "byte short char int long boolean float double void def as in assert trait super this abstract static volatile transient public private protected synchronized final class interface enum if else for while switch case break default continue throw throws try catch finally implements extends new import package return instanceof"
        },
        c: [e.C("/\\*\\*", "\\*/", {
            r: 0,
            c: [{
                b: /\w+@/,
                r: 0
            }, {
                cN: "doctag",
                b: "@[A-Za-z]+"
            }]
        }), e.CLCM, e.CBCM, {
            cN: "string",
            b: '"""',
            e: '"""'
        }, {
            cN: "string",
            b: "'''",
            e: "'''"
        }, {
            cN: "string",
            b: "\\$/",
            e: "/\\$",
            r: 10
        }, e.ASM, {
            cN: "regexp",
            b: /~?\/[^\/\n]+\//,
            c: [e.BE]
        }, e.QSM, {
            cN: "meta",
            b: "^#!/usr/bin/env",
            e: "$",
            i: "\n"
        }, e.BNM, {
            cN: "class",
            bK: "class interface trait enum",
            e: "{",
            i: ":",
            c: [{
                bK: "extends implements"
            }, e.UTM]
        }, e.CNM, {
            cN: "meta",
            b: "@[A-Za-z]+"
        }, {
            cN: "string",
            b: /[^\?]{0}[A-Za-z0-9_$]+ *:/
        }, {
            b: /\?/,
            e: /\:/
        }, {
            cN: "symbol",
            b: "^\\s*[A-Za-z0-9_$]+:",
            r: 0
        }],
        i: /#|<\//
    }
}),
hljs.registerLanguage("brainfuck", function(e) {
    var t = {
        cN: "literal",
        b: "[\\+\\-]",
        r: 0
    };
    return {
        aliases: ["bf"],
        c: [e.C("[^\\[\\]\\.,\\+\\-<> \r\n]", "[\\[\\]\\.,\\+\\-<> \r\n]", {
            rE: !0,
            r: 0
        }), {
            cN: "title",
            b: "[\\[\\]]",
            r: 0
        }, {
            cN: "string",
            b: "[\\.,]",
            r: 0
        }, {
            b: /\+\+|\-\-/,
            rB: !0,
            c: [t]
        }, t]
    }
}),
hljs.registerLanguage("step21", function(e) {
    return {
        aliases: ["p21", "step", "stp"],
        cI: !0,
        l: "[A-Z_][A-Z0-9_.]*",
        k: {
            keyword: "HEADER ENDSEC DATA"
        },
        c: [{
            cN: "meta",
            b: "ISO-10303-21;",
            r: 10
        }, {
            cN: "meta",
            b: "END-ISO-10303-21;",
            r: 10
        }, e.CLCM, e.CBCM, e.C("/\\*\\*!", "\\*/"), e.CNM, e.inherit(e.ASM, {
            i: null
        }), e.inherit(e.QSM, {
            i: null
        }), {
            cN: "string",
            b: "'",
            e: "'"
        }, {
            cN: "symbol",
            v: [{
                b: "#",
                e: "\\d+",
                i: "\\W"
            }]
        }]
    }
}),
hljs.registerLanguage("haskell", function(e) {
    var t = {
        v: [e.C("--", "$"), e.C("{-", "-}", {
            c: ["self"]
        })]
    }
      , r = {
        cN: "meta",
        b: "{-#",
        e: "#-}"
    }
      , i = {
        cN: "meta",
        b: "^#",
        e: "$"
    }
      , n = {
        cN: "type",
        b: "\\b[A-Z][\\w']*",
        r: 0
    }
      , a = {
        b: "\\(",
        e: "\\)",
        i: '"',
        c: [r, i, {
            cN: "type",
            b: "\\b[A-Z][\\w]*(\\((\\.\\.|,|\\w+)\\))?"
        }, e.inherit(e.TM, {
            b: "[_a-z][\\w']*"
        }), t]
    };
    return {
        aliases: ["hs"],
        k: "let in if then else case of where do module import hiding qualified type data newtype deriving class instance as default infix infixl infixr foreign export ccall stdcall cplusplus jvm dotnet safe unsafe family forall mdo proc rec",
        c: [{
            bK: "module",
            e: "where",
            k: "module where",
            c: [a, t],
            i: "\\W\\.|;"
        }, {
            b: "\\bimport\\b",
            e: "$",
            k: "import qualified as hiding",
            c: [a, t],
            i: "\\W\\.|;"
        }, {
            cN: "class",
            b: "^(\\s*)?(class|instance)\\b",
            e: "where",
            k: "class family instance where",
            c: [n, a, t]
        }, {
            cN: "class",
            b: "\\b(data|(new)?type)\\b",
            e: "$",
            k: "data family type newtype deriving",
            c: [r, n, a, {
                b: "{",
                e: "}",
                c: a.c
            }, t]
        }, {
            bK: "default",
            e: "$",
            c: [n, a, t]
        }, {
            bK: "infix infixl infixr",
            e: "$",
            c: [e.CNM, t]
        }, {
            b: "\\bforeign\\b",
            e: "$",
            k: "foreign import export ccall stdcall cplusplus jvm dotnet safe unsafe",
            c: [n, e.QSM, t]
        }, {
            cN: "meta",
            b: "#!\\/usr\\/bin\\/env runhaskell",
            e: "$"
        }, r, i, e.QSM, e.CNM, n, e.inherit(e.TM, {
            b: "^[_a-z][\\w']*"
        }), t, {
            b: "->|<-"
        }]
    }
}),
hljs.registerLanguage("nginx", function(e) {
    var t = {
        cN: "variable",
        v: [{
            b: /\$\d+/
        }, {
            b: /\$\{/,
            e: /}/
        }, {
            b: "[\\$\\@]" + e.UIR
        }]
    }
      , r = {
        eW: !0,
        l: "[a-z/_]+",
        k: {
            literal: "on off yes no true false none blocked debug info notice warn error crit select break last permanent redirect kqueue rtsig epoll poll /dev/poll"
        },
        r: 0,
        i: "=>",
        c: [e.HCM, {
            cN: "string",
            c: [e.BE, t],
            v: [{
                b: /"/,
                e: /"/
            }, {
                b: /'/,
                e: /'/
            }]
        }, {
            b: "([a-z]+):/",
            e: "\\s",
            eW: !0,
            eE: !0,
            c: [t]
        }, {
            cN: "regexp",
            c: [e.BE, t],
            v: [{
                b: "\\s\\^",
                e: "\\s|{|;",
                rE: !0
            }, {
                b: "~\\*?\\s+",
                e: "\\s|{|;",
                rE: !0
            }, {
                b: "\\*(\\.[a-z\\-]+)+"
            }, {
                b: "([a-z\\-]+\\.)+\\*"
            }]
        }, {
            cN: "number",
            b: "\\b\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}(:\\d{1,5})?\\b"
        }, {
            cN: "number",
            b: "\\b\\d+[kKmMgGdshdwy]*\\b",
            r: 0
        }, t]
    };
    return {
        aliases: ["nginxconf"],
        c: [e.HCM, {
            b: e.UIR + "\\s+{",
            rB: !0,
            e: "{",
            c: [{
                cN: "section",
                b: e.UIR
            }],
            r: 0
        }, {
            b: e.UIR + "\\s",
            e: ";|{",
            rB: !0,
            c: [{
                cN: "attribute",
                b: e.UIR,
                starts: r
            }],
            r: 0
        }],
        i: "[^\\s\\}]"
    }
}),
hljs.registerLanguage("crystal", function(e) {
    function t(e, t) {
        var r = [{
            b: e,
            e: t
        }];
        return r[0].c = r,
        r
    }
    var r = "(_[uif](8|16|32|64))?"
      , i = "[a-zA-Z_]\\w*[!?=]?|[-+~]\\@|<<|>>|=~|===?|<=>|[<>]=?|\\*\\*|[-/+%^&*~`|]|\\[\\][=?]?"
      , n = {
        keyword: "abstract alias as asm begin break case class def do else elsif end ensure enum extend for fun if ifdef include instance_sizeof is_a? lib macro module next of out pointerof private protected rescue responds_to? return require self sizeof struct super then type typeof union unless until when while with yield __DIR__ __FILE__ __LINE__",
        literal: "false nil true"
    }
      , a = {
        cN: "subst",
        b: "#{",
        e: "}",
        k: n
    }
      , o = {
        cN: "template-variable",
        v: [{
            b: "\\{\\{",
            e: "\\}\\}"
        }, {
            b: "\\{%",
            e: "%\\}"
        }],
        k: n,
        r: 10
    }
      , s = {
        cN: "string",
        c: [e.BE, a],
        v: [{
            b: /'/,
            e: /'/
        }, {
            b: /"/,
            e: /"/
        }, {
            b: /`/,
            e: /`/
        }, {
            b: "%w?\\(",
            e: "\\)",
            c: t("\\(", "\\)")
        }, {
            b: "%w?\\[",
            e: "\\]",
            c: t("\\[", "\\]")
        }, {
            b: "%w?{",
            e: "}",
            c: t("{", "}")
        }, {
            b: "%w?<",
            e: ">",
            c: t("<", ">")
        }, {
            b: "%w?/",
            e: "/"
        }, {
            b: "%w?%",
            e: "%"
        }, {
            b: "%w?-",
            e: "-"
        }, {
            b: "%w?\\|",
            e: "\\|"
        }],
        r: 0
    }
      , l = {
        b: "(!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~)\\s*",
        c: [{
            cN: "regexp",
            c: [e.BE, a],
            v: [{
                b: "/",
                e: "/[a-z]*"
            }, {
                b: "%r\\(",
                e: "\\)",
                c: t("\\(", "\\)")
            }, {
                b: "%r\\[",
                e: "\\]",
                c: t("\\[", "\\]")
            }, {
                b: "%r{",
                e: "}",
                c: t("{", "}")
            }, {
                b: "%r<",
                e: ">",
                c: t("<", ">")
            }, {
                b: "%r/",
                e: "/"
            }, {
                b: "%r%",
                e: "%"
            }, {
                b: "%r-",
                e: "-"
            }, {
                b: "%r\\|",
                e: "\\|"
            }]
        }],
        r: 0
    }
      , c = {
        cN: "regexp",
        c: [e.BE, a],
        v: [{
            b: "%r\\(",
            e: "\\)",
            c: t("\\(", "\\)")
        }, {
            b: "%r\\[",
            e: "\\]",
            c: t("\\[", "\\]")
        }, {
            b: "%r{",
            e: "}",
            c: t("{", "}")
        }, {
            b: "%r<",
            e: ">",
            c: t("<", ">")
        }, {
            b: "%r/",
            e: "/"
        }, {
            b: "%r%",
            e: "%"
        }, {
            b: "%r-",
            e: "-"
        }, {
            b: "%r\\|",
            e: "\\|"
        }],
        r: 0
    }
      , d = {
        cN: "meta",
        b: "@\\[",
        e: "\\]",
        r: 5
    }
      , u = [o, s, l, c, d, e.HCM, {
        cN: "class",
        bK: "class module struct",
        e: "$|;",
        i: /=/,
        c: [e.HCM, e.inherit(e.TM, {
            b: "[A-Za-z_]\\w*(::\\w+)*(\\?|\\!)?"
        }), {
            b: "<"
        }]
    }, {
        cN: "class",
        bK: "lib enum union",
        e: "$|;",
        i: /=/,
        c: [e.HCM, e.inherit(e.TM, {
            b: "[A-Za-z_]\\w*(::\\w+)*(\\?|\\!)?"
        })],
        r: 10
    }, {
        cN: "function",
        bK: "def",
        e: /\B\b/,
        c: [e.inherit(e.TM, {
            b: i,
            endsParent: !0
        })]
    }, {
        cN: "function",
        bK: "fun macro",
        e: /\B\b/,
        c: [e.inherit(e.TM, {
            b: i,
            endsParent: !0
        })],
        r: 5
    }, {
        cN: "symbol",
        b: e.UIR + "(\\!|\\?)?:",
        r: 0
    }, {
        cN: "symbol",
        b: ":",
        c: [s, {
            b: i
        }],
        r: 0
    }, {
        cN: "number",
        v: [{
            b: "\\b0b([01_]*[01])" + r
        }, {
            b: "\\b0o([0-7_]*[0-7])" + r
        }, {
            b: "\\b0x([A-Fa-f0-9_]*[A-Fa-f0-9])" + r
        }, {
            b: "\\b(([0-9][0-9_]*[0-9]|[0-9])(\\.[0-9_]*[0-9])?([eE][+-]?[0-9_]*[0-9])?)" + r
        }],
        r: 0
    }];
    return a.c = u,
    d.c = u,
    o.c = u.slice(1),
    {
        aliases: ["cr"],
        l: "[a-zA-Z_]\\w*[!?=]?",
        k: n,
        c: u
    }
}),
hljs.registerLanguage("haml", function(e) {
    return {
        cI: !0,
        c: [{
            cN: "meta",
            b: "^!!!( (5|1\\.1|Strict|Frameset|Basic|Mobile|RDFa|XML\\b.*))?$",
            r: 10
        }, e.C("^\\s*(!=#|=#|-#|/).*$", !1, {
            r: 0
        }), {
            b: "^\\s*(-|=|!=)(?!#)",
            starts: {
                e: "\\n",
                sL: "ruby"
            }
        }, {
            cN: "tag",
            b: "^\\s*%",
            c: [{
                cN: "selector-tag",
                b: "\\w+"
            }, {
                cN: "selector-id",
                b: "#[\\w-]+"
            }, {
                cN: "selector-class",
                b: "\\.[\\w-]+"
            }, {
                b: "{\\s*",
                e: "\\s*}",
                c: [{
                    b: ":\\w+\\s*=>",
                    e: ",\\s+",
                    rB: !0,
                    eW: !0,
                    c: [{
                        cN: "attr",
                        b: ":\\w+"
                    }, e.ASM, e.QSM, {
                        b: "\\w+",
                        r: 0
                    }]
                }]
            }, {
                b: "\\(\\s*",
                e: "\\s*\\)",
                eE: !0,
                c: [{
                    b: "\\w+\\s*=",
                    e: "\\s+",
                    rB: !0,
                    eW: !0,
                    c: [{
                        cN: "attr",
                        b: "\\w+",
                        r: 0
                    }, e.ASM, e.QSM, {
                        b: "\\w+",
                        r: 0
                    }]
                }]
            }]
        }, {
            b: "^\\s*[=~]\\s*"
        }, {
            b: "#{",
            starts: {
                e: "}",
                sL: "ruby"
            }
        }]
    }
}),
hljs.registerLanguage("q", function(e) {
    return {
        aliases: ["k", "kdb"],
        k: {
            keyword: "do while select delete by update from",
            literal: "0b 1b",
            built_in: "neg not null string reciprocal floor ceiling signum mod xbar xlog and or each scan over prior mmu lsq inv md5 ltime gtime count first var dev med cov cor all any rand sums prds mins maxs fills deltas ratios avgs differ prev next rank reverse iasc idesc asc desc msum mcount mavg mdev xrank mmin mmax xprev rotate distinct group where flip type key til get value attr cut set upsert raze union inter except cross sv vs sublist enlist read0 read1 hopen hclose hdel hsym hcount peach system ltrim rtrim trim lower upper ssr view tables views cols xcols keys xkey xcol xasc xdesc fkeys meta lj aj aj0 ij pj asof uj ww wj wj1 fby xgroup ungroup ej save load rsave rload show csv parse eval min max avg wavg wsum sin cos tan sum",
            type: "`float `double int `timestamp `timespan `datetime `time `boolean `symbol `char `byte `short `long `real `month `date `minute `second `guid"
        },
        l: /(`?)[A-Za-z0-9_]+\b/,
        c: [e.CLCM, e.QSM, e.CNM]
    }
}),
hljs.registerLanguage("verilog", function(e) {
    return {
        aliases: ["v"],
        cI: !1,
        k: {
            keyword: "always and assign begin buf bufif0 bufif1 case casex casez cmos deassign default defparam disable edge else end endcase endfunction endmodule endprimitive endspecify endtable endtask event for force forever fork function if ifnone initial inout input join macromodule module nand negedge nmos nor not notif0 notif1 or output parameter pmos posedge primitive pulldown pullup rcmos release repeat rnmos rpmos rtran rtranif0 rtranif1 specify specparam table task timescale tran tranif0 tranif1 wait while xnor xor highz0 highz1 integer large medium pull0 pull1 real realtime reg scalared signed small strong0 strong1 supply0 supply0 supply1 supply1 time tri tri0 tri1 triand trior trireg vectored wand weak0 weak1 wire wor"
        },
        c: [e.CBCM, e.CLCM, e.QSM, {
            cN: "number",
            b: "(\\b((\\d'(b|h|o|d|B|H|O|D))[0-9xzXZa-fA-F_]+))|(\\B(('(b|h|o|d|B|H|O|D))[0-9xzXZa-fA-F_]+))|(\\b([0-9xzXZ_])+)",
            c: [e.BE],
            r: 0
        }, {
            cN: "variable",
            b: "#\\((?!parameter).+\\)"
        }]
    }
}),
hljs.registerLanguage("erlang", function(e) {
    var t = "[a-z'][a-zA-Z0-9_']*"
      , r = "(" + t + ":" + t + "|" + t + ")"
      , i = {
        keyword: "after and andalso|10 band begin bnot bor bsl bzr bxor case catch cond div end fun if let not of orelse|10 query receive rem try when xor",
        literal: "false true"
    }
      , n = e.C("%", "$")
      , a = {
        cN: "number",
        b: "\\b(\\d+#[a-fA-F0-9]+|\\d+(\\.\\d+)?([eE][-+]?\\d+)?)",
        r: 0
    }
      , o = {
        b: "fun\\s+" + t + "/\\d+"
    }
      , s = {
        b: r + "\\(",
        e: "\\)",
        rB: !0,
        r: 0,
        c: [{
            b: r,
            r: 0
        }, {
            b: "\\(",
            e: "\\)",
            eW: !0,
            rE: !0,
            r: 0
        }]
    }
      , l = {
        b: "{",
        e: "}",
        r: 0
    }
      , c = {
        b: "\\b_([A-Z][A-Za-z0-9_]*)?",
        r: 0
    }
      , d = {
        b: "[A-Z][a-zA-Z0-9_]*",
        r: 0
    }
      , u = {
        b: "#" + e.UIR,
        r: 0,
        rB: !0,
        c: [{
            b: "#" + e.UIR,
            r: 0
        }, {
            b: "{",
            e: "}",
            r: 0
        }]
    }
      , p = {
        bK: "fun receive if try case",
        e: "end",
        k: i
    };
    p.c = [n, o, e.inherit(e.ASM, {
        cN: ""
    }), p, s, e.QSM, a, l, c, d, u];
    var m = [n, o, p, s, e.QSM, a, l, c, d, u];
    s.c[1].c = m,
    l.c = m,
    u.c[1].c = m;
    var h = {
        cN: "params",
        b: "\\(",
        e: "\\)",
        c: m
    };
    return {
        aliases: ["erl"],
        k: i,
        i: "(</|\\*=|\\+=|-=|/\\*|\\*/|\\(\\*|\\*\\))",
        c: [{
            cN: "function",
            b: "^" + t + "\\s*\\(",
            e: "->",
            rB: !0,
            i: "\\(|#|//|/\\*|\\\\|:|;",
            c: [h, e.inherit(e.TM, {
                b: t
            })],
            starts: {
                e: ";|\\.",
                k: i,
                c: m
            }
        }, n, {
            b: "^-",
            e: "\\.",
            r: 0,
            eE: !0,
            rB: !0,
            l: "-" + e.IR,
            k: "-module -record -undef -export -ifdef -ifndef -author -copyright -doc -vsn -import -include -include_lib -compile -define -else -endif -file -behaviour -behavior -spec",
            c: [h]
        }, a, e.QSM, u, c, d, l, {
            b: /\.$/
        }]
    }
}),
hljs.registerLanguage("accesslog", function(e) {
    return {
        c: [{
            cN: "number",
            b: "\\b\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}(:\\d{1,5})?\\b"
        }, {
            cN: "number",
            b: "\\b\\d+\\b",
            r: 0
        }, {
            cN: "string",
            b: '"(GET|POST|HEAD|PUT|DELETE|CONNECT|OPTIONS|PATCH|TRACE)',
            e: '"',
            k: "GET POST HEAD PUT DELETE CONNECT OPTIONS PATCH TRACE",
            i: "\\n",
            r: 10
        }, {
            cN: "string",
            b: /\[/,
            e: /\]/,
            i: "\\n"
        }, {
            cN: "string",
            b: '"',
            e: '"',
            i: "\\n"
        }]
    }
}),
hljs.registerLanguage("less", function(e) {
    var t = "[\\w-]+"
      , r = "(" + t + "|@{" + t + "})"
      , i = []
      , n = []
      , a = function(e) {
        return {
            cN: "string",
            b: "~?" + e + ".*?" + e
        }
    }
      , o = function(e, t, r) {
        return {
            cN: e,
            b: t,
            r: r
        }
    }
      , s = {
        b: "\\(",
        e: "\\)",
        c: n,
        r: 0
    };
    n.push(e.CLCM, e.CBCM, a("'"), a('"'), e.CSSNM, {
        b: "(url|data-uri)\\(",
        starts: {
            cN: "string",
            e: "[\\)\\n]",
            eE: !0
        }
    }, o("number", "#[0-9A-Fa-f]+\\b"), s, o("variable", "@@?" + t, 10), o("variable", "@{" + t + "}"), o("built_in", "~?`[^`]*?`"), {
        cN: "attribute",
        b: t + "\\s*:",
        e: ":",
        rB: !0,
        eE: !0
    }, {
        cN: "meta",
        b: "!important"
    });
    var l = n.concat({
        b: "{",
        e: "}",
        c: i
    })
      , c = {
        bK: "when",
        eW: !0,
        c: [{
            bK: "and not"
        }].concat(n)
    }
      , d = {
        cN: "attribute",
        b: r,
        e: ":",
        eE: !0,
        c: [e.CLCM, e.CBCM],
        i: /\S/,
        starts: {
            e: "[;}]",
            rE: !0,
            c: n,
            i: "[<=$]"
        }
    }
      , u = {
        cN: "keyword",
        b: "@(import|media|charset|font-face|(-[a-z]+-)?keyframes|supports|document|namespace|page|viewport|host)\\b",
        starts: {
            e: "[;{}]",
            rE: !0,
            c: n,
            r: 0
        }
    }
      , p = {
        cN: "variable",
        v: [{
            b: "@" + t + "\\s*:",
            r: 15
        }, {
            b: "@" + t
        }],
        starts: {
            e: "[;}]",
            rE: !0,
            c: l
        }
    }
      , m = {
        v: [{
            b: "[\\.#:&\\[]",
            e: "[;{}]"
        }, {
            b: r + "[^;]*{",
            e: "{"
        }],
        rB: !0,
        rE: !0,
        i: "[<='$\"]",
        c: [e.CLCM, e.CBCM, c, o("keyword", "all\\b"), o("variable", "@{" + t + "}"), o("selector-tag", r + "%?", 0), o("selector-id", "#" + r), o("selector-class", "\\." + r, 0), o("selector-tag", "&", 0), {
            cN: "selector-attr",
            b: "\\[",
            e: "\\]"
        }, {
            b: "\\(",
            e: "\\)",
            c: l
        }, {
            b: "!important"
        }]
    };
    return i.push(e.CLCM, e.CBCM, u, p, m, d),
    {
        cI: !0,
        i: "[=>'/<($\"]",
        c: i
    }
}),
hljs.registerLanguage("tcl", function(e) {
    return {
        aliases: ["tk"],
        k: "after append apply array auto_execok auto_import auto_load auto_mkindex auto_mkindex_old auto_qualify auto_reset bgerror binary break catch cd chan clock close concat continue dde dict encoding eof error eval exec exit expr fblocked fconfigure fcopy file fileevent filename flush for foreach format gets glob global history http if incr info interp join lappend|10 lassign|10 lindex|10 linsert|10 list llength|10 load lrange|10 lrepeat|10 lreplace|10 lreverse|10 lsearch|10 lset|10 lsort|10 mathfunc mathop memory msgcat namespace open package parray pid pkg::create pkg_mkIndex platform platform::shell proc puts pwd read refchan regexp registry regsub|10 rename return safe scan seek set socket source split string subst switch tcl_endOfWord tcl_findLibrary tcl_startOfNextWord tcl_startOfPreviousWord tcl_wordBreakAfter tcl_wordBreakBefore tcltest tclvars tell time tm trace unknown unload unset update uplevel upvar variable vwait while",
        c: [e.C(";[ \\t]*#", "$"), e.C("^[ \\t]*#", "$"), {
            bK: "proc",
            e: "[\\{]",
            eE: !0,
            c: [{
                cN: "title",
                b: "[ \\t\\n\\r]+(::)?[a-zA-Z_]((::)?[a-zA-Z0-9_])*",
                e: "[ \\t\\n\\r]",
                eW: !0,
                eE: !0
            }]
        }, {
            eE: !0,
            v: [{
                b: "\\$(\\{)?(::)?[a-zA-Z_]((::)?[a-zA-Z0-9_])*\\(([a-zA-Z0-9_])*\\)",
                e: "[^a-zA-Z0-9_\\}\\$]"
            }, {
                b: "\\$(\\{)?(::)?[a-zA-Z_]((::)?[a-zA-Z0-9_])*",
                e: "(\\))?[^a-zA-Z0-9_\\}\\$]"
            }]
        }, {
            cN: "string",
            c: [e.BE],
            v: [e.inherit(e.ASM, {
                i: null
            }), e.inherit(e.QSM, {
                i: null
            })]
        }, {
            cN: "number",
            v: [e.BNM, e.CNM]
        }]
    }
}),
hljs.registerLanguage("erlang-repl", function(e) {
    return {
        k: {
            built_in: "spawn spawn_link self",
            keyword: "after and andalso|10 band begin bnot bor bsl bsr bxor case catch cond div end fun if let not of or orelse|10 query receive rem try when xor"
        },
        c: [{
            cN: "meta",
            b: "^[0-9]+> ",
            r: 10
        }, e.C("%", "$"), {
            cN: "number",
            b: "\\b(\\d+#[a-fA-F0-9]+|\\d+(\\.\\d+)?([eE][-+]?\\d+)?)",
            r: 0
        }, e.ASM, e.QSM, {
            b: "\\?(::)?([A-Z]\\w*(::)?)+"
        }, {
            b: "->"
        }, {
            b: "ok"
        }, {
            b: "!"
        }, {
            b: "(\\b[a-z'][a-zA-Z0-9_']*:[a-z'][a-zA-Z0-9_']*)|(\\b[a-z'][a-zA-Z0-9_']*)",
            r: 0
        }, {
            b: "[A-Z][a-zA-Z0-9_']*",
            r: 0
        }]
    }
}),
hljs.registerLanguage("makefile", function(e) {
    var t = {
        cN: "variable",
        b: /\$\(/,
        e: /\)/,
        c: [e.BE]
    };
    return {
        aliases: ["mk", "mak"],
        c: [e.HCM, {
            b: /^\w+\s*\W*=/,
            rB: !0,
            r: 0,
            starts: {
                e: /\s*\W*=/,
                eE: !0,
                starts: {
                    e: /$/,
                    r: 0,
                    c: [t]
                }
            }
        }, {
            cN: "section",
            b: /^[\w]+:\s*$/
        }, {
            cN: "meta",
            b: /^\.PHONY:/,
            e: /$/,
            k: {
                "meta-keyword": ".PHONY"
            },
            l: /[\.\w]+/
        }, {
            b: /^\t+/,
            e: /$/,
            r: 0,
            c: [e.QSM, t]
        }]
    }
}),
hljs.registerLanguage("delphi", function(e) {
    var t = "exports register file shl array record property for mod while set ally label uses raise not stored class safecall var interface or private static exit index inherited to else stdcall override shr asm far resourcestring finalization packed virtual out and protected library do xorwrite goto near function end div overload object unit begin string on inline repeat until destructor write message program with read initialization except default nil if case cdecl in downto threadvar of try pascal const external constructor type public then implementation finally published procedure"
      , r = [e.CLCM, e.C(/\{/, /\}/, {
        r: 0
    }), e.C(/\(\*/, /\*\)/, {
        r: 10
    })]
      , i = {
        cN: "string",
        b: /'/,
        e: /'/,
        c: [{
            b: /''/
        }]
    }
      , n = {
        cN: "string",
        b: /(#\d+)+/
    }
      , a = {
        b: e.IR + "\\s*=\\s*class\\s*\\(",
        rB: !0,
        c: [e.TM]
    }
      , o = {
        cN: "function",
        bK: "function constructor destructor procedure",
        e: /[:;]/,
        k: "function constructor|10 destructor|10 procedure|10",
        c: [e.TM, {
            cN: "params",
            b: /\(/,
            e: /\)/,
            k: t,
            c: [i, n]
        }].concat(r)
    };
    return {
        cI: !0,
        k: t,
        i: /"|\$[G-Zg-z]|\/\*|<\/|\|/,
        c: [i, n, e.NM, a, o].concat(r)
    }
}),
hljs.registerLanguage("javascript", function(e) {
    return {
        aliases: ["js"],
        k: {
            keyword: "in of if for while finally var new function do return void else break catch instanceof with throw case default try this switch continue typeof delete let yield const export super debugger as async await import from as",
            literal: "true false null undefined NaN Infinity",
            built_in: "eval isFinite isNaN parseFloat parseInt decodeURI decodeURIComponent encodeURI encodeURIComponent escape unescape Object Function Boolean Error EvalError InternalError RangeError ReferenceError StopIteration SyntaxError TypeError URIError Number Math Date String RegExp Array Float32Array Float64Array Int16Array Int32Array Int8Array Uint16Array Uint32Array Uint8Array Uint8ClampedArray ArrayBuffer DataView JSON Intl arguments require module console window document Symbol Set Map WeakSet WeakMap Proxy Reflect Promise"
        },
        c: [{
            cN: "meta",
            r: 10,
            b: /^\s*['"]use (strict|asm)['"]/
        }, {
            cN: "meta",
            b: /^#!/,
            e: /$/
        }, e.ASM, e.QSM, {
            cN: "string",
            b: "`",
            e: "`",
            c: [e.BE, {
                cN: "subst",
                b: "\\$\\{",
                e: "\\}"
            }]
        }, e.CLCM, e.CBCM, {
            cN: "number",
            v: [{
                b: "\\b(0[bB][01]+)"
            }, {
                b: "\\b(0[oO][0-7]+)"
            }, {
                b: e.CNR
            }],
            r: 0
        }, {
            b: "(" + e.RSR + "|\\b(case|return|throw)\\b)\\s*",
            k: "return throw case",
            c: [e.CLCM, e.CBCM, e.RM, {
                b: /</,
                e: />\s*[);\]]/,
                r: 0,
                sL: "xml"
            }],
            r: 0
        }, {
            cN: "function",
            bK: "function",
            e: /\{/,
            eE: !0,
            c: [e.inherit(e.TM, {
                b: /[A-Za-z$_][0-9A-Za-z$_]*/
            }), {
                cN: "params",
                b: /\(/,
                e: /\)/,
                eB: !0,
                eE: !0,
                c: [e.CLCM, e.CBCM]
            }],
            i: /\[|%/
        }, {
            b: /\$[(.]/
        }, {
            b: "\\." + e.IR,
            r: 0
        }, {
            cN: "class",
            bK: "class",
            e: /[{;=]/,
            eE: !0,
            i: /[:"\[\]]/,
            c: [{
                bK: "extends"
            }, e.UTM]
        }, {
            bK: "constructor",
            e: /\{/,
            eE: !0
        }],
        i: /#(?!!)/
    }
}),
hljs.registerLanguage("actionscript", function(e) {
    var t = {
        cN: "rest_arg",
        b: "[.]{3}",
        e: "[a-zA-Z_$][a-zA-Z0-9_$]*",
        r: 10
    };
    return {
        aliases: ["as"],
        k: {
            keyword: "as break case catch class const continue default delete do dynamic each else extends final finally for function get if implements import in include instanceof interface internal is namespace native new override package private protected public return set static super switch this throw try typeof use var void while with",
            literal: "true false null undefined"
        },
        c: [e.ASM, e.QSM, e.CLCM, e.CBCM, e.CNM, {
            cN: "class",
            bK: "package",
            e: "{",
            c: [e.TM]
        }, {
            cN: "class",
            bK: "class interface",
            e: "{",
            eE: !0,
            c: [{
                bK: "extends implements"
            }, e.TM]
        }, {
            cN: "meta",
            bK: "import include",
            e: ";",
            k: {
                "meta-keyword": "import include"
            }
        }, {
            cN: "function",
            bK: "function",
            e: "[{;]",
            eE: !0,
            i: "\\S",
            c: [e.TM, {
                cN: "params",
                b: "\\(",
                e: "\\)",
                c: [e.ASM, e.QSM, e.CLCM, e.CBCM, t]
            }, {
                b: ":\\s*([*]|[a-zA-Z_$][a-zA-Z0-9_$]*)"
            }]
        }],
        i: /#/
    }
}),
hljs.registerLanguage("scss", function(e) {
    var t = {
        cN: "variable",
        b: "(\\$[a-zA-Z-][a-zA-Z0-9_-]*)\\b"
    }
      , r = {
        cN: "number",
        b: "#[0-9A-Fa-f]+"
    };
    return e.CSSNM,
    e.QSM,
    e.ASM,
    e.CBCM,
    {
        cI: !0,
        i: "[=/|']",
        c: [e.CLCM, e.CBCM, {
            cN: "selector-id",
            b: "\\#[A-Za-z0-9_-]+",
            r: 0
        }, {
            cN: "selector-class",
            b: "\\.[A-Za-z0-9_-]+",
            r: 0
        }, {
            cN: "selector-attr",
            b: "\\[",
            e: "\\]",
            i: "$"
        }, {
            cN: "selector-tag",
            b: "\\b(a|abbr|acronym|address|area|article|aside|audio|b|base|big|blockquote|body|br|button|canvas|caption|cite|code|col|colgroup|command|datalist|dd|del|details|dfn|div|dl|dt|em|embed|fieldset|figcaption|figure|footer|form|frame|frameset|(h[1-6])|head|header|hgroup|hr|html|i|iframe|img|input|ins|kbd|keygen|label|legend|li|link|map|mark|meta|meter|nav|noframes|noscript|object|ol|optgroup|option|output|p|param|pre|progress|q|rp|rt|ruby|samp|script|section|select|small|span|strike|strong|style|sub|sup|table|tbody|td|textarea|tfoot|th|thead|time|title|tr|tt|ul|var|video)\\b",
            r: 0
        }, {
            b: ":(visited|valid|root|right|required|read-write|read-only|out-range|optional|only-of-type|only-child|nth-of-type|nth-last-of-type|nth-last-child|nth-child|not|link|left|last-of-type|last-child|lang|invalid|indeterminate|in-range|hover|focus|first-of-type|first-line|first-letter|first-child|first|enabled|empty|disabled|default|checked|before|after|active)"
        }, {
            b: "::(after|before|choices|first-letter|first-line|repeat-index|repeat-item|selection|value)"
        }, t, {
            cN: "attribute",
            b: "\\b(z-index|word-wrap|word-spacing|word-break|width|widows|white-space|visibility|vertical-align|unicode-bidi|transition-timing-function|transition-property|transition-duration|transition-delay|transition|transform-style|transform-origin|transform|top|text-underline-position|text-transform|text-shadow|text-rendering|text-overflow|text-indent|text-decoration-style|text-decoration-line|text-decoration-color|text-decoration|text-align-last|text-align|tab-size|table-layout|right|resize|quotes|position|pointer-events|perspective-origin|perspective|page-break-inside|page-break-before|page-break-after|padding-top|padding-right|padding-left|padding-bottom|padding|overflow-y|overflow-x|overflow-wrap|overflow|outline-width|outline-style|outline-offset|outline-color|outline|orphans|order|opacity|object-position|object-fit|normal|none|nav-up|nav-right|nav-left|nav-index|nav-down|min-width|min-height|max-width|max-height|mask|marks|margin-top|margin-right|margin-left|margin-bottom|margin|list-style-type|list-style-position|list-style-image|list-style|line-height|letter-spacing|left|justify-content|initial|inherit|ime-mode|image-orientation|image-resolution|image-rendering|icon|hyphens|height|font-weight|font-variant-ligatures|font-variant|font-style|font-stretch|font-size-adjust|font-size|font-language-override|font-kerning|font-feature-settings|font-family|font|float|flex-wrap|flex-shrink|flex-grow|flex-flow|flex-direction|flex-basis|flex|filter|empty-cells|display|direction|cursor|counter-reset|counter-increment|content|column-width|column-span|column-rule-width|column-rule-style|column-rule-color|column-rule|column-gap|column-fill|column-count|columns|color|clip-path|clip|clear|caption-side|break-inside|break-before|break-after|box-sizing|box-shadow|box-decoration-break|bottom|border-width|border-top-width|border-top-style|border-top-right-radius|border-top-left-radius|border-top-color|border-top|border-style|border-spacing|border-right-width|border-right-style|border-right-color|border-right|border-radius|border-left-width|border-left-style|border-left-color|border-left|border-image-width|border-image-source|border-image-slice|border-image-repeat|border-image-outset|border-image|border-color|border-collapse|border-bottom-width|border-bottom-style|border-bottom-right-radius|border-bottom-left-radius|border-bottom-color|border-bottom|border|background-size|background-repeat|background-position|background-origin|background-image|background-color|background-clip|background-attachment|background-blend-mode|background|backface-visibility|auto|animation-timing-function|animation-play-state|animation-name|animation-iteration-count|animation-fill-mode|animation-duration|animation-direction|animation-delay|animation|align-self|align-items|align-content)\\b",
            i: "[^\\s]"
        }, {
            b: "\\b(whitespace|wait|w-resize|visible|vertical-text|vertical-ideographic|uppercase|upper-roman|upper-alpha|underline|transparent|top|thin|thick|text|text-top|text-bottom|tb-rl|table-header-group|table-footer-group|sw-resize|super|strict|static|square|solid|small-caps|separate|se-resize|scroll|s-resize|rtl|row-resize|ridge|right|repeat|repeat-y|repeat-x|relative|progress|pointer|overline|outside|outset|oblique|nowrap|not-allowed|normal|none|nw-resize|no-repeat|no-drop|newspaper|ne-resize|n-resize|move|middle|medium|ltr|lr-tb|lowercase|lower-roman|lower-alpha|loose|list-item|line|line-through|line-edge|lighter|left|keep-all|justify|italic|inter-word|inter-ideograph|inside|inset|inline|inline-block|inherit|inactive|ideograph-space|ideograph-parenthesis|ideograph-numeric|ideograph-alpha|horizontal|hidden|help|hand|groove|fixed|ellipsis|e-resize|double|dotted|distribute|distribute-space|distribute-letter|distribute-all-lines|disc|disabled|default|decimal|dashed|crosshair|collapse|col-resize|circle|char|center|capitalize|break-word|break-all|bottom|both|bolder|bold|block|bidi-override|below|baseline|auto|always|all-scroll|absolute|table|table-cell)\\b"
        }, {
            b: ":",
            e: ";",
            c: [t, r, e.CSSNM, e.QSM, e.ASM, {
                cN: "meta",
                b: "!important"
            }]
        }, {
            b: "@",
            e: "[{;]",
            k: "mixin include extend for if else each while charset import debug media page content font-face namespace warn",
            c: [t, e.QSM, e.ASM, r, e.CSSNM, {
                b: "\\s[A-Za-z0-9_.-]+",
                r: 0
            }]
        }]
    }
}),
hljs.registerLanguage("fortran", function(e) {
    var t = {
        cN: "params",
        b: "\\(",
        e: "\\)"
    };
    return {
        cI: !0,
        aliases: ["f90", "f95"],
        k: {
            literal: ".False. .True.",
            keyword: "kind do while private call intrinsic where elsewhere type endtype endmodule endselect endinterface end enddo endif if forall endforall only contains default return stop then public subroutine|10 function program .and. .or. .not. .le. .eq. .ge. .gt. .lt. goto save else use module select case access blank direct exist file fmt form formatted iostat name named nextrec number opened rec recl sequential status unformatted unit continue format pause cycle exit c_null_char c_alert c_backspace c_form_feed flush wait decimal round iomsg synchronous nopass non_overridable pass protected volatile abstract extends import non_intrinsic value deferred generic final enumerator class associate bind enum c_int c_short c_long c_long_long c_signed_char c_size_t c_int8_t c_int16_t c_int32_t c_int64_t c_int_least8_t c_int_least16_t c_int_least32_t c_int_least64_t c_int_fast8_t c_int_fast16_t c_int_fast32_t c_int_fast64_t c_intmax_t C_intptr_t c_float c_double c_long_double c_float_complex c_double_complex c_long_double_complex c_bool c_char c_null_ptr c_null_funptr c_new_line c_carriage_return c_horizontal_tab c_vertical_tab iso_c_binding c_loc c_funloc c_associated  c_f_pointer c_ptr c_funptr iso_fortran_env character_storage_size error_unit file_storage_size input_unit iostat_end iostat_eor numeric_storage_size output_unit c_f_procpointer ieee_arithmetic ieee_support_underflow_control ieee_get_underflow_mode ieee_set_underflow_mode newunit contiguous recursive pad position action delim readwrite eor advance nml interface procedure namelist include sequence elemental pure integer real character complex logical dimension allocatable|10 parameter external implicit|10 none double precision assign intent optional pointer target in out common equivalence data",
            built_in: "alog alog10 amax0 amax1 amin0 amin1 amod cabs ccos cexp clog csin csqrt dabs dacos dasin datan datan2 dcos dcosh ddim dexp dint dlog dlog10 dmax1 dmin1 dmod dnint dsign dsin dsinh dsqrt dtan dtanh float iabs idim idint idnint ifix isign max0 max1 min0 min1 sngl algama cdabs cdcos cdexp cdlog cdsin cdsqrt cqabs cqcos cqexp cqlog cqsin cqsqrt dcmplx dconjg derf derfc dfloat dgamma dimag dlgama iqint qabs qacos qasin qatan qatan2 qcmplx qconjg qcos qcosh qdim qerf qerfc qexp qgamma qimag qlgama qlog qlog10 qmax1 qmin1 qmod qnint qsign qsin qsinh qsqrt qtan qtanh abs acos aimag aint anint asin atan atan2 char cmplx conjg cos cosh exp ichar index int log log10 max min nint sign sin sinh sqrt tan tanh print write dim lge lgt lle llt mod nullify allocate deallocate adjustl adjustr all allocated any associated bit_size btest ceiling count cshift date_and_time digits dot_product eoshift epsilon exponent floor fraction huge iand ibclr ibits ibset ieor ior ishft ishftc lbound len_trim matmul maxexponent maxloc maxval merge minexponent minloc minval modulo mvbits nearest pack present product radix random_number random_seed range repeat reshape rrspacing scale scan selected_int_kind selected_real_kind set_exponent shape size spacing spread sum system_clock tiny transpose trim ubound unpack verify achar iachar transfer dble entry dprod cpu_time command_argument_count get_command get_command_argument get_environment_variable is_iostat_end ieee_arithmetic ieee_support_underflow_control ieee_get_underflow_mode ieee_set_underflow_mode is_iostat_eor move_alloc new_line selected_char_kind same_type_as extends_type_ofacosh asinh atanh bessel_j0 bessel_j1 bessel_jn bessel_y0 bessel_y1 bessel_yn erf erfc erfc_scaled gamma log_gamma hypot norm2 atomic_define atomic_ref execute_command_line leadz trailz storage_size merge_bits bge bgt ble blt dshiftl dshiftr findloc iall iany iparity image_index lcobound ucobound maskl maskr num_images parity popcnt poppar shifta shiftl shiftr this_image"
        },
        i: /\/\*/,
        c: [e.inherit(e.ASM, {
            cN: "string",
            r: 0
        }), e.inherit(e.QSM, {
            cN: "string",
            r: 0
        }), {
            cN: "function",
            bK: "subroutine function program",
            i: "[${=\\n]",
            c: [e.UTM, t]
        }, e.C("!", "$", {
            r: 0
        }), {
            cN: "number",
            b: "(?=\\b|\\+|\\-|\\.)(?=\\.\\d|\\d)(?:\\d+)?(?:\\.?\\d*)(?:[de][+-]?\\d+)?\\b\\.?",
            r: 0
        }]
    }
}),
hljs.registerLanguage("cal", function(e) {
    var t = "div mod in and or not xor asserterror begin case do downto else end exit for if of repeat then to until while with var"
      , r = [e.CLCM, e.C(/\{/, /\}/, {
        r: 0
    }), e.C(/\(\*/, /\*\)/, {
        r: 10
    })]
      , i = {
        cN: "string",
        b: /'/,
        e: /'/,
        c: [{
            b: /''/
        }]
    }
      , n = {
        cN: "string",
        b: /(#\d+)+/
    }
      , a = {
        cN: "number",
        b: "\\b\\d+(\\.\\d+)?(DT|D|T)",
        r: 0
    }
      , o = {
        cN: "string",
        b: '"',
        e: '"'
    }
      , s = {
        cN: "function",
        bK: "procedure",
        e: /[:;]/,
        k: "procedure|10",
        c: [e.TM, {
            cN: "params",
            b: /\(/,
            e: /\)/,
            k: t,
            c: [i, n]
        }].concat(r)
    }
      , l = {
        cN: "class",
        b: "OBJECT (Table|Form|Report|Dataport|Codeunit|XMLport|MenuSuite|Page|Query) (\\d+) ([^\\r\\n]+)",
        rB: !0,
        c: [e.TM, s]
    };
    return {
        cI: !0,
        k: {
            keyword: t,
            literal: "false true"
        },
        i: /\/\*/,
        c: [i, n, a, o, e.NM, l, s]
    }
}),
hljs.registerLanguage("css", function(e) {
    var t = {
        b: /[A-Z\_\.\-]+\s*:/,
        rB: !0,
        e: ";",
        eW: !0,
        c: [{
            cN: "attribute",
            b: /\S/,
            e: ":",
            eE: !0,
            starts: {
                eW: !0,
                eE: !0,
                c: [{
                    b: /[\w-]+\s*\(/,
                    rB: !0,
                    c: [{
                        cN: "built_in",
                        b: /[\w-]+/
                    }]
                }, e.CSSNM, e.QSM, e.ASM, e.CBCM, {
                    cN: "number",
                    b: "#[0-9A-Fa-f]+"
                }, {
                    cN: "meta",
                    b: "!important"
                }]
            }
        }]
    };
    return {
        cI: !0,
        i: /[=\/|'\$]/,
        c: [e.CBCM, {
            cN: "selector-id",
            b: /#[A-Za-z0-9_-]+/
        }, {
            cN: "selector-class",
            b: /\.[A-Za-z0-9_-]+/
        }, {
            cN: "selector-attr",
            b: /\[/,
            e: /\]/,
            i: "$"
        }, {
            cN: "selector-pseudo",
            b: /:(:)?[a-zA-Z0-9\_\-\+\(\)"'.]+/
        }, {
            b: "@(font-face|page)",
            l: "[a-z-]+",
            k: "font-face page"
        }, {
            b: "@",
            e: "[{;]",
            c: [{
                cN: "keyword",
                b: /\S+/
            }, {
                b: /\s/,
                eW: !0,
                eE: !0,
                r: 0,
                c: [e.ASM, e.QSM, e.CSSNM]
            }]
        }, {
            cN: "selector-tag",
            b: "[a-zA-Z-][a-zA-Z0-9_-]*",
            r: 0
        }, {
            b: "{",
            e: "}",
            i: /\S/,
            c: [e.CBCM, t]
        }]
    }
}),
hljs.registerLanguage("nsis", function(e) {
    var t = {
        cN: "variable",
        b: "\\$(ADMINTOOLS|APPDATA|CDBURN_AREA|CMDLINE|COMMONFILES32|COMMONFILES64|COMMONFILES|COOKIES|DESKTOP|DOCUMENTS|EXEDIR|EXEFILE|EXEPATH|FAVORITES|FONTS|HISTORY|HWNDPARENT|INSTDIR|INTERNET_CACHE|LANGUAGE|LOCALAPPDATA|MUSIC|NETHOOD|OUTDIR|PICTURES|PLUGINSDIR|PRINTHOOD|PROFILE|PROGRAMFILES32|PROGRAMFILES64|PROGRAMFILES|QUICKLAUNCH|RECENT|RESOURCES_LOCALIZED|RESOURCES|SENDTO|SMPROGRAMS|SMSTARTUP|STARTMENU|SYSDIR|TEMP|TEMPLATES|VIDEOS|WINDIR)"
    }
      , r = {
        cN: "variable",
        b: "\\$+{[a-zA-Z0-9_]+}"
    }
      , i = {
        cN: "variable",
        b: "\\$+[a-zA-Z0-9_]+",
        i: "\\(\\){}"
    }
      , n = {
        cN: "variable",
        b: "\\$+\\([a-zA-Z0-9_]+\\)"
    }
      , a = {
        cN: "built_in",
        b: "(ARCHIVE|FILE_ATTRIBUTE_ARCHIVE|FILE_ATTRIBUTE_NORMAL|FILE_ATTRIBUTE_OFFLINE|FILE_ATTRIBUTE_READONLY|FILE_ATTRIBUTE_SYSTEM|FILE_ATTRIBUTE_TEMPORARY|HKCR|HKCU|HKDD|HKEY_CLASSES_ROOT|HKEY_CURRENT_CONFIG|HKEY_CURRENT_USER|HKEY_DYN_DATA|HKEY_LOCAL_MACHINE|HKEY_PERFORMANCE_DATA|HKEY_USERS|HKLM|HKPD|HKU|IDABORT|IDCANCEL|IDIGNORE|IDNO|IDOK|IDRETRY|IDYES|MB_ABORTRETRYIGNORE|MB_DEFBUTTON1|MB_DEFBUTTON2|MB_DEFBUTTON3|MB_DEFBUTTON4|MB_ICONEXCLAMATION|MB_ICONINFORMATION|MB_ICONQUESTION|MB_ICONSTOP|MB_OK|MB_OKCANCEL|MB_RETRYCANCEL|MB_RIGHT|MB_RTLREADING|MB_SETFOREGROUND|MB_TOPMOST|MB_USERICON|MB_YESNO|NORMAL|OFFLINE|READONLY|SHCTX|SHELL_CONTEXT|SYSTEM|TEMPORARY)"
    }
      , o = {
        cN: "keyword",
        b: "\\!(addincludedir|addplugindir|appendfile|cd|define|delfile|echo|else|endif|error|execute|finalize|getdllversionsystem|ifdef|ifmacrodef|ifmacrondef|ifndef|if|include|insertmacro|macroend|macro|makensis|packhdr|searchparse|searchreplace|tempfile|undef|verbose|warning)"
    };
    return {
        cI: !1,
        k: {
            keyword: "Abort AddBrandingImage AddSize AllowRootDirInstall AllowSkipFiles AutoCloseWindow BGFont BGGradient BrandingText BringToFront Call CallInstDLL Caption ChangeUI CheckBitmap ClearErrors CompletedText ComponentText CopyFiles CRCCheck CreateDirectory CreateFont CreateShortCut Delete DeleteINISec DeleteINIStr DeleteRegKey DeleteRegValue DetailPrint DetailsButtonText DirText DirVar DirVerify EnableWindow EnumRegKey EnumRegValue Exch Exec ExecShell ExecWait ExpandEnvStrings File FileBufSize FileClose FileErrorText FileOpen FileRead FileReadByte FileReadUTF16LE FileReadWord FileSeek FileWrite FileWriteByte FileWriteUTF16LE FileWriteWord FindClose FindFirst FindNext FindWindow FlushINI FunctionEnd GetCurInstType GetCurrentAddress GetDlgItem GetDLLVersion GetDLLVersionLocal GetErrorLevel GetFileTime GetFileTimeLocal GetFullPathName GetFunctionAddress GetInstDirError GetLabelAddress GetTempFileName Goto HideWindow Icon IfAbort IfErrors IfFileExists IfRebootFlag IfSilent InitPluginsDir InstallButtonText InstallColors InstallDir InstallDirRegKey InstProgressFlags InstType InstTypeGetText InstTypeSetText IntCmp IntCmpU IntFmt IntOp IsWindow LangString LicenseBkColor LicenseData LicenseForceSelection LicenseLangString LicenseText LoadLanguageFile LockWindow LogSet LogText ManifestDPIAware ManifestSupportedOS MessageBox MiscButtonText Name Nop OutFile Page PageCallbacks PageExEnd Pop Push Quit ReadEnvStr ReadINIStr ReadRegDWORD ReadRegStr Reboot RegDLL Rename RequestExecutionLevel ReserveFile Return RMDir SearchPath SectionEnd SectionGetFlags SectionGetInstTypes SectionGetSize SectionGetText SectionGroupEnd SectionIn SectionSetFlags SectionSetInstTypes SectionSetSize SectionSetText SendMessage SetAutoClose SetBrandingImage SetCompress SetCompressor SetCompressorDictSize SetCtlColors SetCurInstType SetDatablockOptimize SetDateSave SetDetailsPrint SetDetailsView SetErrorLevel SetErrors SetFileAttributes SetFont SetOutPath SetOverwrite SetPluginUnload SetRebootFlag SetRegView SetShellVarContext SetSilent ShowInstDetails ShowUninstDetails ShowWindow SilentInstall SilentUnInstall Sleep SpaceTexts StrCmp StrCmpS StrCpy StrLen SubCaption SubSectionEnd Unicode UninstallButtonText UninstallCaption UninstallIcon UninstallSubCaption UninstallText UninstPage UnRegDLL Var VIAddVersionKey VIFileVersion VIProductVersion WindowIcon WriteINIStr WriteRegBin WriteRegDWORD WriteRegExpandStr WriteRegStr WriteUninstaller XPStyle",
            literal: "admin all auto both colored current false force hide highest lastused leave listonly none normal notset off on open print show silent silentlog smooth textonly true user "
        },
        c: [e.HCM, e.CBCM, {
            cN: "string",
            b: '"',
            e: '"',
            i: "\\n",
            c: [{
                b: "\\$(\\\\(n|r|t)|\\$)"
            }, t, r, i, n]
        }, e.C(";", "$", {
            r: 0
        }), {
            cN: "function",
            bK: "Function PageEx Section SectionGroup SubSection",
            e: "$"
        }, o, r, i, n, a, e.NM, {
            b: e.IR + "::" + e.IR
        }]
    }
}),
hljs.registerLanguage("vbscript", function(e) {
    return {
        aliases: ["vbs"],
        cI: !0,
        k: {
            keyword: "call class const dim do loop erase execute executeglobal exit for each next function if then else on error option explicit new private property let get public randomize redim rem select case set stop sub while wend with end to elseif is or xor and not class_initialize class_terminate default preserve in me byval byref step resume goto",
            built_in: "lcase month vartype instrrev ubound setlocale getobject rgb getref string weekdayname rnd dateadd monthname now day minute isarray cbool round formatcurrency conversions csng timevalue second year space abs clng timeserial fixs len asc isempty maths dateserial atn timer isobject filter weekday datevalue ccur isdate instr datediff formatdatetime replace isnull right sgn array snumeric log cdbl hex chr lbound msgbox ucase getlocale cos cdate cbyte rtrim join hour oct typename trim strcomp int createobject loadpicture tan formatnumber mid scriptenginebuildversion scriptengine split scriptengineminorversion cint sin datepart ltrim sqr scriptenginemajorversion time derived eval date formatpercent exp inputbox left ascw chrw regexp server response request cstr err",
            literal: "true false null nothing empty"
        },
        i: "//",
        c: [e.inherit(e.QSM, {
            c: [{
                b: '""'
            }]
        }), e.C(/'/, /$/, {
            r: 0
        }), e.CNM]
    }
}),
hljs.registerLanguage("rib", function(e) {
    return {
        k: "ArchiveRecord AreaLightSource Atmosphere Attribute AttributeBegin AttributeEnd Basis Begin Blobby Bound Clipping ClippingPlane Color ColorSamples ConcatTransform Cone CoordinateSystem CoordSysTransform CropWindow Curves Cylinder DepthOfField Detail DetailRange Disk Displacement Display End ErrorHandler Exposure Exterior Format FrameAspectRatio FrameBegin FrameEnd GeneralPolygon GeometricApproximation Geometry Hider Hyperboloid Identity Illuminate Imager Interior LightSource MakeCubeFaceEnvironment MakeLatLongEnvironment MakeShadow MakeTexture Matte MotionBegin MotionEnd NuPatch ObjectBegin ObjectEnd ObjectInstance Opacity Option Orientation Paraboloid Patch PatchMesh Perspective PixelFilter PixelSamples PixelVariance Points PointsGeneralPolygons PointsPolygons Polygon Procedural Projection Quantize ReadArchive RelativeDetail ReverseOrientation Rotate Scale ScreenWindow ShadingInterpolation ShadingRate Shutter Sides Skew SolidBegin SolidEnd Sphere SubdivisionMesh Surface TextureCoordinates Torus Transform TransformBegin TransformEnd TransformPoints Translate TrimCurve WorldBegin WorldEnd",
        i: "</",
        c: [e.HCM, e.CNM, e.ASM, e.QSM]
    }
}),
hljs.registerLanguage("kotlin", function(e) {
    var t = "val var get set class trait object open private protected public final enum if else do while for when break continue throw try catch finally import package is as in return fun override default companion reified inline volatile transient native Byte Short Char Int Long Boolean Float Double Void Unit Nothing";
    return {
        k: {
            keyword: t,
            literal: "true false null"
        },
        c: [e.C("/\\*\\*", "\\*/", {
            r: 0,
            c: [{
                cN: "doctag",
                b: "@[A-Za-z]+"
            }]
        }), e.CLCM, e.CBCM, {
            cN: "type",
            b: /</,
            e: />/,
            rB: !0,
            eE: !1,
            r: 0
        }, {
            cN: "function",
            bK: "fun",
            e: "[(]|$",
            rB: !0,
            eE: !0,
            k: t,
            i: /fun\s+(<.*>)?[^\s\(]+(\s+[^\s\(]+)\s*=/,
            r: 5,
            c: [{
                b: e.UIR + "\\s*\\(",
                rB: !0,
                r: 0,
                c: [e.UTM]
            }, {
                cN: "type",
                b: /</,
                e: />/,
                k: "reified",
                r: 0
            }, {
                cN: "params",
                b: /\(/,
                e: /\)/,
                k: t,
                r: 0,
                i: /\([^\(,\s:]+,/,
                c: [{
                    cN: "type",
                    b: /:\s*/,
                    e: /\s*[=\)]/,
                    eB: !0,
                    rE: !0,
                    r: 0
                }]
            }, e.CLCM, e.CBCM]
        }, {
            cN: "class",
            bK: "class trait",
            e: /[:\{(]|$/,
            eE: !0,
            i: "extends implements",
            c: [e.UTM, {
                cN: "type",
                b: /</,
                e: />/,
                eB: !0,
                eE: !0,
                r: 0
            }, {
                cN: "type",
                b: /[,:]\s*/,
                e: /[<\(,]|$/,
                eB: !0,
                rE: !0
            }]
        }, {
            cN: "variable",
            bK: "var val",
            e: /\s*[=:$]/,
            eE: !0
        }, e.QSM, {
            cN: "meta",
            b: "^#!/usr/bin/env",
            e: "$",
            i: "\n"
        }, e.CNM]
    }
}),
hljs.registerLanguage("bash", function(e) {
    var t = {
        cN: "variable",
        v: [{
            b: /\$[\w\d#@][\w\d_]*/
        }, {
            b: /\$\{(.*?)}/
        }]
    }
      , r = {
        cN: "string",
        b: /"/,
        e: /"/,
        c: [e.BE, t, {
            cN: "variable",
            b: /\$\(/,
            e: /\)/,
            c: [e.BE]
        }]
    }
      , i = {
        cN: "string",
        b: /'/,
        e: /'/
    };
    return {
        aliases: ["sh", "zsh"],
        l: /-?[a-z\.]+/,
        k: {
            keyword: "if then else elif fi for while in do done case esac function",
            literal: "true false",
            built_in: "break cd continue eval exec exit export getopts hash pwd readonly return shift test times trap umask unset alias bind builtin caller command declare echo enable help let local logout mapfile printf read readarray source type typeset ulimit unalias set shopt autoload bg bindkey bye cap chdir clone comparguments compcall compctl compdescribe compfiles compgroups compquote comptags comptry compvalues dirs disable disown echotc echoti emulate fc fg float functions getcap getln history integer jobs kill limit log noglob popd print pushd pushln rehash sched setcap setopt stat suspend ttyctl unfunction unhash unlimit unsetopt vared wait whence where which zcompile zformat zftp zle zmodload zparseopts zprof zpty zregexparse zsocket zstyle ztcp",
            _: "-ne -eq -lt -gt -f -d -e -s -l -a"
        },
        c: [{
            cN: "meta",
            b: /^#![^\n]+sh\s*$/,
            r: 10
        }, {
            cN: "function",
            b: /\w[\w\d_]*\s*\(\s*\)\s*\{/,
            rB: !0,
            c: [e.inherit(e.TM, {
                b: /\w[\w\d_]*/
            })],
            r: 0
        }, e.HCM, r, i, t]
    }
}),
hljs.registerLanguage("powershell", function(e) {
    var t = {
        b: "`[\\s\\S]",
        r: 0
    }
      , r = {
        cN: "variable",
        v: [{
            b: /\$[\w\d][\w\d_:]*/
        }]
    }
      , i = {
        cN: "literal",
        b: /\$(null|true|false)\b/
    }
      , n = {
        cN: "string",
        b: /"/,
        e: /"/,
        c: [t, r, {
            cN: "variable",
            b: /\$[A-z]/,
            e: /[^A-z]/
        }]
    }
      , a = {
        cN: "string",
        b: /'/,
        e: /'/
    };
    return {
        aliases: ["ps"],
        l: /-?[A-z\.\-]+/,
        cI: !0,
        k: {
            keyword: "if else foreach return function do while until elseif begin for trap data dynamicparam end break throw param continue finally in switch exit filter try process catch",
            built_in: "Add-Content Add-History Add-Member Add-PSSnapin Clear-Content Clear-Item Clear-Item Property Clear-Variable Compare-Object ConvertFrom-SecureString Convert-Path ConvertTo-Html ConvertTo-SecureString Copy-Item Copy-ItemProperty Export-Alias Export-Clixml Export-Console Export-Csv ForEach-Object Format-Custom Format-List Format-Table Format-Wide Get-Acl Get-Alias Get-AuthenticodeSignature Get-ChildItem Get-Command Get-Content Get-Credential Get-Culture Get-Date Get-EventLog Get-ExecutionPolicy Get-Help Get-History Get-Host Get-Item Get-ItemProperty Get-Location Get-Member Get-PfxCertificate Get-Process Get-PSDrive Get-PSProvider Get-PSSnapin Get-Service Get-TraceSource Get-UICulture Get-Unique Get-Variable Get-WmiObject Group-Object Import-Alias Import-Clixml Import-Csv Invoke-Expression Invoke-History Invoke-Item Join-Path Measure-Command Measure-Object Move-Item Move-ItemProperty New-Alias New-Item New-ItemProperty New-Object New-PSDrive New-Service New-TimeSpan New-Variable Out-Default Out-File Out-Host Out-Null Out-Printer Out-String Pop-Location Push-Location Read-Host Remove-Item Remove-ItemProperty Remove-PSDrive Remove-PSSnapin Remove-Variable Rename-Item Rename-ItemProperty Resolve-Path Restart-Service Resume-Service Select-Object Select-String Set-Acl Set-Alias Set-AuthenticodeSignature Set-Content Set-Date Set-ExecutionPolicy Set-Item Set-ItemProperty Set-Location Set-PSDebug Set-Service Set-TraceSource Set-Variable Sort-Object Split-Path Start-Service Start-Sleep Start-Transcript Stop-Process Stop-Service Stop-Transcript Suspend-Service Tee-Object Test-Path Trace-Command Update-FormatData Update-TypeData Where-Object Write-Debug Write-Error Write-Host Write-Output Write-Progress Write-Verbose Write-Warning",
            nomarkup: "-ne -eq -lt -gt -ge -le -not -like -notlike -match -notmatch -contains -notcontains -in -notin -replace"
        },
        c: [e.HCM, e.NM, n, a, i, r]
    }
}),
hljs.registerLanguage("irpf90", function(e) {
    var t = {
        cN: "params",
        b: "\\(",
        e: "\\)"
    };
    return {
        cI: !0,
        k: {
            literal: ".False. .True.",
            keyword: "kind do while private call intrinsic where elsewhere type endtype endmodule endselect endinterface end enddo endif if forall endforall only contains default return stop then public subroutine|10 function program .and. .or. .not. .le. .eq. .ge. .gt. .lt. goto save else use module select case access blank direct exist file fmt form formatted iostat name named nextrec number opened rec recl sequential status unformatted unit continue format pause cycle exit c_null_char c_alert c_backspace c_form_feed flush wait decimal round iomsg synchronous nopass non_overridable pass protected volatile abstract extends import non_intrinsic value deferred generic final enumerator class associate bind enum c_int c_short c_long c_long_long c_signed_char c_size_t c_int8_t c_int16_t c_int32_t c_int64_t c_int_least8_t c_int_least16_t c_int_least32_t c_int_least64_t c_int_fast8_t c_int_fast16_t c_int_fast32_t c_int_fast64_t c_intmax_t C_intptr_t c_float c_double c_long_double c_float_complex c_double_complex c_long_double_complex c_bool c_char c_null_ptr c_null_funptr c_new_line c_carriage_return c_horizontal_tab c_vertical_tab iso_c_binding c_loc c_funloc c_associated  c_f_pointer c_ptr c_funptr iso_fortran_env character_storage_size error_unit file_storage_size input_unit iostat_end iostat_eor numeric_storage_size output_unit c_f_procpointer ieee_arithmetic ieee_support_underflow_control ieee_get_underflow_mode ieee_set_underflow_mode newunit contiguous recursive pad position action delim readwrite eor advance nml interface procedure namelist include sequence elemental pure integer real character complex logical dimension allocatable|10 parameter external implicit|10 none double precision assign intent optional pointer target in out common equivalence data begin_provider &begin_provider end_provider begin_shell end_shell begin_template end_template subst assert touch soft_touch provide no_dep free irp_if irp_else irp_endif irp_write irp_read",
            built_in: "alog alog10 amax0 amax1 amin0 amin1 amod cabs ccos cexp clog csin csqrt dabs dacos dasin datan datan2 dcos dcosh ddim dexp dint dlog dlog10 dmax1 dmin1 dmod dnint dsign dsin dsinh dsqrt dtan dtanh float iabs idim idint idnint ifix isign max0 max1 min0 min1 sngl algama cdabs cdcos cdexp cdlog cdsin cdsqrt cqabs cqcos cqexp cqlog cqsin cqsqrt dcmplx dconjg derf derfc dfloat dgamma dimag dlgama iqint qabs qacos qasin qatan qatan2 qcmplx qconjg qcos qcosh qdim qerf qerfc qexp qgamma qimag qlgama qlog qlog10 qmax1 qmin1 qmod qnint qsign qsin qsinh qsqrt qtan qtanh abs acos aimag aint anint asin atan atan2 char cmplx conjg cos cosh exp ichar index int log log10 max min nint sign sin sinh sqrt tan tanh print write dim lge lgt lle llt mod nullify allocate deallocate adjustl adjustr all allocated any associated bit_size btest ceiling count cshift date_and_time digits dot_product eoshift epsilon exponent floor fraction huge iand ibclr ibits ibset ieor ior ishft ishftc lbound len_trim matmul maxexponent maxloc maxval merge minexponent minloc minval modulo mvbits nearest pack present product radix random_number random_seed range repeat reshape rrspacing scale scan selected_int_kind selected_real_kind set_exponent shape size spacing spread sum system_clock tiny transpose trim ubound unpack verify achar iachar transfer dble entry dprod cpu_time command_argument_count get_command get_command_argument get_environment_variable is_iostat_end ieee_arithmetic ieee_support_underflow_control ieee_get_underflow_mode ieee_set_underflow_mode is_iostat_eor move_alloc new_line selected_char_kind same_type_as extends_type_ofacosh asinh atanh bessel_j0 bessel_j1 bessel_jn bessel_y0 bessel_y1 bessel_yn erf erfc erfc_scaled gamma log_gamma hypot norm2 atomic_define atomic_ref execute_command_line leadz trailz storage_size merge_bits bge bgt ble blt dshiftl dshiftr findloc iall iany iparity image_index lcobound ucobound maskl maskr num_images parity popcnt poppar shifta shiftl shiftr this_image IRP_ALIGN irp_here"
        },
        i: /\/\*/,
        c: [e.inherit(e.ASM, {
            cN: "string",
            r: 0
        }), e.inherit(e.QSM, {
            cN: "string",
            r: 0
        }), {
            cN: "function",
            bK: "subroutine function program",
            i: "[${=\\n]",
            c: [e.UTM, t]
        }, e.C("!", "$", {
            r: 0
        }), e.C("begin_doc", "end_doc", {
            r: 10
        }), {
            cN: "number",
            b: "(?=\\b|\\+|\\-|\\.)(?=\\.\\d|\\d)(?:\\d+)?(?:\\.?\\d*)(?:[de][+-]?\\d+)?\\b\\.?",
            r: 0
        }]
    }
}),
hljs.registerLanguage("zephir", function(e) {
    var t = {
        cN: "string",
        c: [e.BE],
        v: [{
            b: 'b"',
            e: '"'
        }, {
            b: "b'",
            e: "'"
        }, e.inherit(e.ASM, {
            i: null
        }), e.inherit(e.QSM, {
            i: null
        })]
    }
      , r = {
        v: [e.BNM, e.CNM]
    };
    return {
        aliases: ["zep"],
        cI: !0,
        k: "and include_once list abstract global private echo interface as static endswitch array null if endwhile or const for endforeach self var let while isset public protected exit foreach throw elseif include __FILE__ empty require_once do xor return parent clone use __CLASS__ __LINE__ else break print eval new catch __METHOD__ case exception default die require __FUNCTION__ enddeclare final try switch continue endfor endif declare unset true false trait goto instanceof insteadof __DIR__ __NAMESPACE__ yield finally int uint long ulong char uchar double float bool boolean stringlikely unlikely",
        c: [e.CLCM, e.HCM, e.C("/\\*", "\\*/", {
            c: [{
                cN: "doctag",
                b: "@[A-Za-z]+"
            }]
        }), e.C("__halt_compiler.+?;", !1, {
            eW: !0,
            k: "__halt_compiler",
            l: e.UIR
        }), {
            cN: "string",
            b: "<<<['\"]?\\w+['\"]?$",
            e: "^\\w+;",
            c: [e.BE]
        }, {
            b: /(::|->)+[a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*/
        }, {
            cN: "function",
            bK: "function",
            e: /[;{]/,
            eE: !0,
            i: "\\$|\\[|%",
            c: [e.UTM, {
                cN: "params",
                b: "\\(",
                e: "\\)",
                c: ["self", e.CBCM, t, r]
            }]
        }, {
            cN: "class",
            bK: "class interface",
            e: "{",
            eE: !0,
            i: /[:\(\$"]/,
            c: [{
                bK: "extends implements"
            }, e.UTM]
        }, {
            bK: "namespace",
            e: ";",
            i: /[\.']/,
            c: [e.UTM]
        }, {
            bK: "use",
            e: ";",
            c: [e.UTM]
        }, {
            b: "=>"
        }, t, r]
    }
}),
hljs.registerLanguage("xml", function(e) {
    var t = {
        b: /<\?(php)?(?!\w)/,
        e: /\?>/,
        sL: "php"
    }
      , r = {
        eW: !0,
        i: /</,
        r: 0,
        c: [t, {
            cN: "attr",
            b: "[A-Za-z0-9\\._:-]+",
            r: 0
        }, {
            b: "=",
            r: 0,
            c: [{
                cN: "string",
                c: [t],
                v: [{
                    b: /"/,
                    e: /"/
                }, {
                    b: /'/,
                    e: /'/
                }, {
                    b: /[^\s\/>]+/
                }]
            }]
        }]
    };
    return {
        aliases: ["html", "xhtml", "rss", "atom", "xsl", "plist"],
        cI: !0,
        c: [{
            cN: "meta",
            b: "<!DOCTYPE",
            e: ">",
            r: 10,
            c: [{
                b: "\\[",
                e: "\\]"
            }]
        }, e.C("\x3c!--", "--\x3e", {
            r: 10
        }), {
            b: "<\\!\\[CDATA\\[",
            e: "\\]\\]>",
            r: 10
        }, {
            cN: "tag",
            b: "<style(?=\\s|>|$)",
            e: ">",
            k: {
                name: "style"
            },
            c: [r],
            starts: {
                e: "</style>",
                rE: !0,
                sL: ["css", "xml"]
            }
        }, {
            cN: "tag",
            b: "<script(?=\\s|>|$)",
            e: ">",
            k: {
                name: "script"
            },
            c: [r],
            starts: {
                e: "<\/script>",
                rE: !0,
                sL: ["actionscript", "javascript", "handlebars", "xml"]
            }
        }, t, {
            cN: "meta",
            b: /<\?\w+/,
            e: /\?>/,
            r: 10
        }, {
            cN: "tag",
            b: "</?",
            e: "/?>",
            c: [{
                cN: "name",
                b: /[^\/><\s]+/,
                r: 0
            }, r]
        }]
    }
}),
hljs.registerLanguage("lisp", function(e) {
    var t = "[a-zA-Z_\\-\\+\\*\\/\\<\\=\\>\\&\\#][a-zA-Z0-9_\\-\\+\\*\\/\\<\\=\\>\\&\\#!]*"
      , r = "\\|[^]*?\\|"
      , i = "(\\-|\\+)?\\d+(\\.\\d+|\\/\\d+)?((d|e|f|l|s|D|E|F|L|S)(\\+|\\-)?\\d+)?"
      , n = {
        cN: "meta",
        b: "^#!",
        e: "$"
    }
      , a = {
        cN: "literal",
        b: "\\b(t{1}|nil)\\b"
    }
      , o = {
        cN: "number",
        v: [{
            b: i,
            r: 0
        }, {
            b: "#(b|B)[0-1]+(/[0-1]+)?"
        }, {
            b: "#(o|O)[0-7]+(/[0-7]+)?"
        }, {
            b: "#(x|X)[0-9a-fA-F]+(/[0-9a-fA-F]+)?"
        }, {
            b: "#(c|C)\\(" + i + " +" + i,
            e: "\\)"
        }]
    }
      , s = e.inherit(e.QSM, {
        i: null
    })
      , l = e.C(";", "$", {
        r: 0
    })
      , c = {
        b: "\\*",
        e: "\\*"
    }
      , d = {
        cN: "symbol",
        b: "[:&]" + t
    }
      , u = {
        b: t,
        r: 0
    }
      , p = {
        b: r
    }
      , m = {
        b: "\\(",
        e: "\\)",
        c: ["self", a, s, o, u]
    }
      , h = {
        c: [o, s, c, d, m, u],
        v: [{
            b: "['`]\\(",
            e: "\\)"
        }, {
            b: "\\(quote ",
            e: "\\)",
            k: {
                name: "quote"
            }
        }, {
            b: "'" + r
        }]
    }
      , g = {
        v: [{
            b: "'" + t
        }, {
            b: "#'" + t + "(::" + t + ")*"
        }]
    }
      , _ = {
        b: "\\(\\s*",
        e: "\\)"
    }
      , f = {
        eW: !0,
        r: 0
    };
    return _.c = [{
        cN: "name",
        v: [{
            b: t
        }, {
            b: r
        }]
    }, f],
    f.c = [h, g, _, a, o, s, l, c, d, p, u],
    {
        i: /\S/,
        c: [o, n, a, s, l, h, g, _, u]
    }
}),
hljs.registerLanguage("nix", function(e) {
    var t = {
        keyword: "rec with let in inherit assert if else then",
        literal: "true false or and null",
        built_in: "import abort baseNameOf dirOf isNull builtins map removeAttrs throw toString derivation"
    }
      , r = {
        cN: "subst",
        b: /\$\{/,
        e: /}/,
        k: t
    }
      , i = {
        b: /[a-zA-Z0-9-_]+(\s*=)/,
        rB: !0,
        r: 0,
        c: [{
            cN: "attr",
            b: /\S+/
        }]
    }
      , n = {
        cN: "string",
        c: [r],
        v: [{
            b: "''",
            e: "''"
        }, {
            b: '"',
            e: '"'
        }]
    }
      , a = [e.NM, e.HCM, e.CBCM, n, i];
    return r.c = a,
    {
        aliases: ["nixos"],
        k: t,
        c: a
    }
}),
hljs.registerLanguage("openscad", function(e) {
    var t = {
        cN: "keyword",
        b: "\\$(f[asn]|t|vp[rtd]|children)"
    }
      , r = {
        cN: "literal",
        b: "false|true|PI|undef"
    }
      , i = {
        cN: "number",
        b: "\\b\\d+(\\.\\d+)?(e-?\\d+)?",
        r: 0
    }
      , n = e.inherit(e.QSM, {
        i: null
    })
      , a = {
        cN: "meta",
        k: {
            "meta-keyword": "include use"
        },
        b: "include|use <",
        e: ">"
    }
      , o = {
        cN: "params",
        b: "\\(",
        e: "\\)",
        c: ["self", i, n, t, r]
    }
      , s = {
        b: "[*!#%]",
        r: 0
    }
      , l = {
        cN: "function",
        bK: "module function",
        e: "\\=|\\{",
        c: [o, e.UTM]
    };
    return {
        aliases: ["scad"],
        k: {
            keyword: "function module include use for intersection_for if else \\%",
            literal: "false true PI undef",
            built_in: "circle square polygon text sphere cube cylinder polyhedron translate rotate scale resize mirror multmatrix color offset hull minkowski union difference intersection abs sign sin cos tan acos asin atan atan2 floor round ceil ln log pow sqrt exp rands min max concat lookup str chr search version version_num norm cross parent_module echo import import_dxf dxf_linear_extrude linear_extrude rotate_extrude surface projection render children dxf_cross dxf_dim let assign"
        },
        c: [e.CLCM, e.CBCM, i, a, n, t, s, l]
    }
}),
hljs.registerLanguage("scala", function(e) {
    var t = {
        cN: "meta",
        b: "@[A-Za-z]+"
    }
      , r = {
        cN: "subst",
        v: [{
            b: "\\$[A-Za-z0-9_]+"
        }, {
            b: "\\${",
            e: "}"
        }]
    }
      , i = {
        cN: "string",
        v: [{
            b: '"',
            e: '"',
            i: "\\n",
            c: [e.BE]
        }, {
            b: '"""',
            e: '"""',
            r: 10
        }, {
            b: '[a-z]+"',
            e: '"',
            i: "\\n",
            c: [e.BE, r]
        }, {
            cN: "string",
            b: '[a-z]+"""',
            e: '"""',
            c: [r],
            r: 10
        }]
    }
      , n = {
        cN: "symbol",
        b: "'\\w[\\w\\d_]*(?!')"
    }
      , a = {
        cN: "type",
        b: "\\b[A-Z][A-Za-z0-9_]*",
        r: 0
    }
      , o = {
        cN: "title",
        b: /[^0-9\n\t "'(),.`{}\[\]:;][^\n\t "'(),.`{}\[\]:;]+|[^0-9\n\t "'(),.`{}\[\]:;=]/,
        r: 0
    }
      , s = {
        cN: "class",
        bK: "class object trait type",
        e: /[:={\[\n;]/,
        eE: !0,
        c: [{
            bK: "extends with",
            r: 10
        }, {
            b: /\[/,
            e: /\]/,
            eB: !0,
            eE: !0,
            r: 0,
            c: [a]
        }, {
            cN: "params",
            b: /\(/,
            e: /\)/,
            eB: !0,
            eE: !0,
            r: 0,
            c: [a]
        }, o]
    }
      , l = {
        cN: "function",
        bK: "def",
        e: /[:={\[(\n;]/,
        eE: !0,
        c: [o]
    };
    return {
        k: {
            literal: "true false null",
            keyword: "type yield lazy override def with val var sealed abstract private trait object if forSome for while throw finally protected extends import final return else break new catch super class case package default try this match continue throws implicit"
        },
        c: [e.CLCM, e.CBCM, i, n, a, l, s, e.CNM, t]
    }
}),
hljs.registerLanguage("php", function(e) {
    var t = {
        b: "\\$+[a-zA-Z_-ÿ][a-zA-Z0-9_-ÿ]*"
    }
      , r = {
        cN: "meta",
        b: /<\?(php)?|\?>/
    }
      , i = {
        cN: "string",
        c: [e.BE, r],
        v: [{
            b: 'b"',
            e: '"'
        }, {
            b: "b'",
            e: "'"
        }, e.inherit(e.ASM, {
            i: null
        }), e.inherit(e.QSM, {
            i: null
        })]
    }
      , n = {
        v: [e.BNM, e.CNM]
    };
    return {
        aliases: ["php3", "php4", "php5", "php6"],
        cI: !0,
        k: "and include_once list abstract global private echo interface as static endswitch array null if endwhile or const for endforeach self var while isset public protected exit foreach throw elseif include __FILE__ empty require_once do xor return parent clone use __CLASS__ __LINE__ else break print eval new catch __METHOD__ case exception default die require __FUNCTION__ enddeclare final try switch continue endfor endif declare unset true false trait goto instanceof insteadof __DIR__ __NAMESPACE__ yield finally",
        c: [e.CLCM, e.HCM, e.C("/\\*", "\\*/", {
            c: [{
                cN: "doctag",
                b: "@[A-Za-z]+"
            }, r]
        }), e.C("__halt_compiler.+?;", !1, {
            eW: !0,
            k: "__halt_compiler",
            l: e.UIR
        }), {
            cN: "string",
            b: /<<<['"]?\w+['"]?$/,
            e: /^\w+;?$/,
            c: [e.BE, {
                cN: "subst",
                v: [{
                    b: /\$\w+/
                }, {
                    b: /\{\$/,
                    e: /\}/
                }]
            }]
        }, r, t, {
            b: /(::|->)+[a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*/
        }, {
            cN: "function",
            bK: "function",
            e: /[;{]/,
            eE: !0,
            i: "\\$|\\[|%",
            c: [e.UTM, {
                cN: "params",
                b: "\\(",
                e: "\\)",
                c: ["self", t, e.CBCM, i, n]
            }]
        }, {
            cN: "class",
            bK: "class interface",
            e: "{",
            eE: !0,
            i: /[:\(\$"]/,
            c: [{
                bK: "extends implements"
            }, e.UTM]
        }, {
            bK: "namespace",
            e: ";",
            i: /[\.']/,
            c: [e.UTM]
        }, {
            bK: "use",
            e: ";",
            c: [e.UTM]
        }, {
            b: "=>"
        }, i, n]
    }
}),
hljs.registerLanguage("tp", function(e) {
    var t = {
        cN: "number",
        b: "[1-9][0-9]*",
        r: 0
    }
      , r = {
        cN: "symbol",
        b: ":[^\\]]+"
    };
    return {
        k: {
            keyword: "ABORT ACC ADJUST AND AP_LD BREAK CALL CNT COL CONDITION CONFIG DA DB DIV DETECT ELSE END ENDFOR ERR_NUM ERROR_PROG FINE FOR GP GUARD INC IF JMP LINEAR_MAX_SPEED LOCK MOD MONITOR OFFSET Offset OR OVERRIDE PAUSE PREG PTH RT_LD RUN SELECT SKIP Skip TA TB TO TOOL_OFFSET Tool_Offset UF UT UFRAME_NUM UTOOL_NUM UNLOCK WAIT X Y Z W P R STRLEN SUBSTR FINDSTR VOFFSET PROG ATTR MN POS",
            literal: "ON OFF max_speed LPOS JPOS ENABLE DISABLE START STOP RESET"
        },
        c: [{
            cN: "built_in",
            b: "(AR|P|PAYLOAD|PR|R|SR|RSR|LBL|VR|UALM|MESSAGE|UTOOL|UFRAME|TIMER|    TIMER_OVERFLOW|JOINT_MAX_SPEED|RESUME_PROG|DIAG_REC)\\[",
            e: "\\]",
            c: ["self", t, r]
        }, {
            cN: "built_in",
            b: "(AI|AO|DI|DO|F|RI|RO|UI|UO|GI|GO|SI|SO)\\[",
            e: "\\]",
            c: ["self", t, e.QSM, r]
        }, {
            cN: "keyword",
            b: "/(PROG|ATTR|MN|POS|END)\\b"
        }, {
            cN: "keyword",
            b: "(CALL|RUN|POINT_LOGIC|LBL)\\b"
        }, {
            cN: "keyword",
            b: "\\b(ACC|CNT|Skip|Offset|PSPD|RT_LD|AP_LD|Tool_Offset)"
        }, {
            cN: "number",
            b: "\\d+(sec|msec|mm/sec|cm/min|inch/min|deg/sec|mm|in|cm)?\\b",
            r: 0
        }, e.C("//", "[;$]"), e.C("!", "[;$]"), e.C("--eg:", "$"), e.QSM, {
            cN: "string",
            b: "'",
            e: "'"
        }, e.CNM, {
            cN: "variable",
            b: "\\$[A-Za-z0-9_]+"
        }]
    }
}),
hljs.registerLanguage("vbnet", function(e) {
    return {
        aliases: ["vb"],
        cI: !0,
        k: {
            keyword: "addhandler addressof alias and andalso aggregate ansi as assembly auto binary by byref byval call case catch class compare const continue custom declare default delegate dim distinct do each equals else elseif end enum erase error event exit explicit finally for friend from function get global goto group handles if implements imports in inherits interface into is isfalse isnot istrue join key let lib like loop me mid mod module mustinherit mustoverride mybase myclass namespace narrowing new next not notinheritable notoverridable of off on operator option optional or order orelse overloads overridable overrides paramarray partial preserve private property protected public raiseevent readonly redim rem removehandler resume return select set shadows shared skip static step stop structure strict sub synclock take text then throw to try unicode until using when where while widening with withevents writeonly xor",
            built_in: "boolean byte cbool cbyte cchar cdate cdec cdbl char cint clng cobj csbyte cshort csng cstr ctype date decimal directcast double gettype getxmlnamespace iif integer long object sbyte short single string trycast typeof uinteger ulong ushort",
            literal: "true false nothing"
        },
        i: "//|{|}|endif|gosub|variant|wend",
        c: [e.inherit(e.QSM, {
            c: [{
                b: '""'
            }]
        }), e.C("'", "$", {
            rB: !0,
            c: [{
                cN: "doctag",
                b: "'''|\x3c!--|--\x3e",
                c: [e.PWM]
            }, {
                cN: "doctag",
                b: "</?",
                e: ">",
                c: [e.PWM]
            }]
        }), e.CNM, {
            cN: "meta",
            b: "#",
            e: "$",
            k: {
                "meta-keyword": "if else elseif end region externalsource"
            }
        }]
    }
}),
hljs.registerLanguage("mipsasm", function(e) {
    return {
        cI: !0,
        aliases: ["mips"],
        l: "\\.?" + e.IR,
        k: {
            meta: ".2byte .4byte .align .ascii .asciz .balign .byte .code .data .else .end .endif .endm .endr .equ .err .exitm .extern .global .hword .if .ifdef .ifndef .include .irp .long .macro .rept .req .section .set .skip .space .text .word .ltorg ",
            built_in: "$0 $1 $2 $3 $4 $5 $6 $7 $8 $9 $10 $11 $12 $13 $14 $15 $16 $17 $18 $19 $20 $21 $22 $23 $24 $25 $26 $27 $28 $29 $30 $31 zero at v0 v1 a0 a1 a2 a3 a4 a5 a6 a7 t0 t1 t2 t3 t4 t5 t6 t7 t8 t9 s0 s1 s2 s3 s4 s5 s6 s7 s8 k0 k1 gp sp fp ra $f0 $f1 $f2 $f2 $f4 $f5 $f6 $f7 $f8 $f9 $f10 $f11 $f12 $f13 $f14 $f15 $f16 $f17 $f18 $f19 $f20 $f21 $f22 $f23 $f24 $f25 $f26 $f27 $f28 $f29 $f30 $f31 Context Random EntryLo0 EntryLo1 Context PageMask Wired EntryHi HWREna BadVAddr Count Compare SR IntCtl SRSCtl SRSMap Cause EPC PRId EBase Config Config1 Config2 Config3 LLAddr Debug DEPC DESAVE CacheErr ECC ErrorEPC TagLo DataLo TagHi DataHi WatchLo WatchHi PerfCtl PerfCnt "
        },
        c: [{
            cN: "keyword",
            b: "\\b(addi?u?|andi?|b(al)?|beql?|bgez(al)?l?|bgtzl?|blezl?|bltz(al)?l?|bnel?|cl[oz]|divu?|ext|ins|j(al)?|jalr(.hb)?|jr(.hb)?|lbu?|lhu?|ll|lui|lw[lr]?|maddu?|mfhi|mflo|movn|movz|msubu?|mthi|mtlo|mul|multu?|nop|nor|ori?|rotrv?|sb|sc|se[bh]|sh|sllv?|slti?u?|srav?|srlv?|subu?|sw[lr]?|xori?|wsbh|abs.[sd]|add.[sd]|alnv.ps|bc1[ft]l?|c.(s?f|un|u?eq|[ou]lt|[ou]le|ngle?|seq|l[et]|ng[et]).[sd]|(ceil|floor|round|trunc).[lw].[sd]|cfc1|cvt.d.[lsw]|cvt.l.[dsw]|cvt.ps.s|cvt.s.[dlw]|cvt.s.p[lu]|cvt.w.[dls]|div.[ds]|ldx?c1|luxc1|lwx?c1|madd.[sd]|mfc1|mov[fntz]?.[ds]|msub.[sd]|mth?c1|mul.[ds]|neg.[ds]|nmadd.[ds]|nmsub.[ds]|p[lu][lu].ps|recip.fmt|r?sqrt.[ds]|sdx?c1|sub.[ds]|suxc1|swx?c1|break|cache|d?eret|[de]i|ehb|mfc0|mtc0|pause|prefx?|rdhwr|rdpgpr|sdbbp|ssnop|synci?|syscall|teqi?|tgei?u?|tlb(p|r|w[ir])|tlti?u?|tnei?|wait|wrpgpr)",
            e: "\\s"
        }, e.C("[;#]", "$"), e.CBCM, e.QSM, {
            cN: "string",
            b: "'",
            e: "[^\\\\]'",
            r: 0
        }, {
            cN: "title",
            b: "\\|",
            e: "\\|",
            i: "\\n",
            r: 0
        }, {
            cN: "number",
            v: [{
                b: "0x[0-9a-f]+"
            }, {
                b: "\\b-?\\d+"
            }],
            r: 0
        }, {
            cN: "symbol",
            v: [{
                b: "^\\s*[a-z_\\.\\$][a-z0-9_\\.\\$]+:"
            }, {
                b: "^\\s*[0-9]+:"
            }, {
                b: "[0-9]+[bf]"
            }],
            r: 0
        }],
        i: "/"
    }
}),
hljs.registerLanguage("thrift", function(e) {
    var t = "bool byte i16 i32 i64 double string binary";
    return {
        k: {
            keyword: "namespace const typedef struct enum service exception void oneway set list map required optional",
            built_in: t,
            literal: "true false"
        },
        c: [e.QSM, e.NM, e.CLCM, e.CBCM, {
            cN: "class",
            bK: "struct enum service exception",
            e: /\{/,
            i: /\n/,
            c: [e.inherit(e.TM, {
                starts: {
                    eW: !0,
                    eE: !0
                }
            })]
        }, {
            b: "\\b(set|list|map)\\s*<",
            e: ">",
            k: t,
            c: ["self"]
        }]
    }
}),
hljs.registerLanguage("gherkin", function(e) {
    return {
        aliases: ["feature"],
        k: "Feature Background Ability Business Need Scenario Scenarios Scenario Outline Scenario Template Examples Given And Then But When",
        c: [{
            cN: "keyword",
            b: "\\*"
        }, {
            cN: "meta",
            b: "@[^@\\s]+"
        }, {
            b: "\\|",
            e: "\\|\\w*$",
            c: [{
                cN: "string",
                b: "[^|]+"
            }]
        }, {
            cN: "variable",
            b: "<",
            e: ">"
        }, e.HCM, {
            cN: "string",
            b: '"""',
            e: '"""'
        }, e.QSM]
    }
}),
hljs.registerLanguage("dart", function(e) {
    var t = {
        cN: "subst",
        b: "\\$\\{",
        e: "}",
        k: "true false null this is new super"
    }
      , r = {
        cN: "string",
        v: [{
            b: "r'''",
            e: "'''"
        }, {
            b: 'r"""',
            e: '"""'
        }, {
            b: "r'",
            e: "'",
            i: "\\n"
        }, {
            b: 'r"',
            e: '"',
            i: "\\n"
        }, {
            b: "'''",
            e: "'''",
            c: [e.BE, t]
        }, {
            b: '"""',
            e: '"""',
            c: [e.BE, t]
        }, {
            b: "'",
            e: "'",
            i: "\\n",
            c: [e.BE, t]
        }, {
            b: '"',
            e: '"',
            i: "\\n",
            c: [e.BE, t]
        }]
    };
    return t.c = [e.CNM, r],
    {
        k: {
            keyword: "assert break case catch class const continue default do else enum extends false final finally for if in is new null rethrow return super switch this throw true try var void while with abstract as dynamic export external factory get implements import library operator part set static typedef",
            built_in: "print Comparable DateTime Duration Function Iterable Iterator List Map Match Null Object Pattern RegExp Set Stopwatch String StringBuffer StringSink Symbol Type Uri bool double int num document window querySelector querySelectorAll Element ElementList"
        },
        c: [r, e.C("/\\*\\*", "\\*/", {
            sL: "markdown"
        }), e.C("///", "$", {
            sL: "markdown"
        }), e.CLCM, e.CBCM, {
            cN: "class",
            bK: "class interface",
            e: "{",
            eE: !0,
            c: [{
                bK: "extends implements"
            }, e.UTM]
        }, e.CNM, {
            cN: "meta",
            b: "@[A-Za-z]+"
        }, {
            b: "=>"
        }]
    }
}),
hljs.registerLanguage("cos", function(e) {
    var t = {
        cN: "string",
        v: [{
            b: '"',
            e: '"',
            c: [{
                b: '""',
                r: 0
            }]
        }]
    }
      , r = {
        cN: "number",
        b: "\\b(\\d+(\\.\\d*)?|\\.\\d+)",
        r: 0
    };
    return {
        cI: !0,
        aliases: ["cos", "cls"],
        k: {
            keyword: ["property", "parameter", "class", "classmethod", "clientmethod", "extends", "as", "break", "catch", "close", "continue", "do", "d", "else", "elseif", "for", "goto", "halt", "hang", "h", "if", "job", "j", "kill", "k", "lock", "l", "merge", "new", "open", "quit", "q", "read", "r", "return", "set", "s", "tcommit", "throw", "trollback", "try", "tstart", "use", "view", "while", "write", "w", "xecute", "x", "zkill", "znspace", "zn", "ztrap", "zwrite", "zw", "zzdump", "zzwrite", "print", "zbreak", "zinsert", "zload", "zprint", "zremove", "zsave", "zzprint", "mv", "mvcall", "mvcrt", "mvdim", "mvprint", "zquit", "zsync", "ascii"].join(" ")
        },
        c: [r, t, e.CLCM, e.CBCM, {
            cN: "comment",
            b: /;/,
            e: "$",
            r: 0
        }, {
            cN: "built_in",
            b: /(?:\$\$?|\.\.)\^?[a-zA-Z]+/
        }, {
            cN: "built_in",
            b: /\$\$\$[a-zA-Z]+/
        }, {
            cN: "built_in",
            b: /%[a-z]+(?:\.[a-z]+)*/
        }, {
            cN: "symbol",
            b: /\^%?[a-zA-Z][\w]*/
        }, {
            cN: "keyword",
            b: /##class|##super|#define|#dim/
        }, {
            b: /&sql\(/,
            e: /\)/,
            eB: !0,
            eE: !0,
            sL: "sql"
        }, {
            b: /&(js|jscript|javascript)</,
            e: />/,
            eB: !0,
            eE: !0,
            sL: "javascript"
        }, {
            b: /&html<\s*</,
            e: />\s*>/,
            sL: "xml"
        }]
    }
}),
hljs.registerLanguage("1c", function(e) {
    var t = "[a-zA-Zа-яА-Я][a-zA-Z0-9_а-яА-Я]*"
      , r = {
        b: '""'
    }
      , i = {
        cN: "string",
        b: '"',
        e: '"|$',
        c: [r]
    }
      , n = {
        cN: "string",
        b: "\\|",
        e: '"|$',
        c: [r]
    };
    return {
        cI: !0,
        l: t,
        k: {
            keyword: "возврат дата для если и или иначе иначеесли исключение конецесли конецпопытки конецпроцедуры конецфункции конеццикла константа не перейти перем перечисление по пока попытка прервать продолжить процедура строка тогда фс функция цикл число экспорт",
            built_in: "ansitooem oemtoansi ввестивидсубконто ввестидату ввестизначение ввестиперечисление ввестипериод ввестиплансчетов ввестистроку ввестичисло вопрос восстановитьзначение врег выбранныйплансчетов вызватьисключение датагод датамесяц датачисло добавитьмесяц завершитьработусистемы заголовоксистемы записьжурналарегистрации запуститьприложение зафиксироватьтранзакцию значениевстроку значениевстрокувнутр значениевфайл значениеизстроки значениеизстрокивнутр значениеизфайла имякомпьютера имяпользователя каталогвременныхфайлов каталогиб каталогпользователя каталогпрограммы кодсимв командасистемы конгода конецпериодаби конецрассчитанногопериодаби конецстандартногоинтервала конквартала конмесяца коннедели лев лог лог10 макс максимальноеколичествосубконто мин монопольныйрежим названиеинтерфейса названиенабораправ назначитьвид назначитьсчет найти найтипомеченныенаудаление найтиссылки началопериодаби началостандартногоинтервала начатьтранзакцию начгода начквартала начмесяца начнедели номерднягода номерднянедели номернеделигода нрег обработкаожидания окр описаниеошибки основнойжурналрасчетов основнойплансчетов основнойязык открытьформу открытьформумодально отменитьтранзакцию очиститьокносообщений периодстр полноеимяпользователя получитьвремята получитьдатута получитьдокументта получитьзначенияотбора получитьпозициюта получитьпустоезначение получитьта прав праводоступа предупреждение префиксавтонумерации пустаястрока пустоезначение рабочаядаттьпустоезначение рабочаядата разделительстраниц разделительстрок разм разобратьпозициюдокумента рассчитатьрегистрына рассчитатьрегистрыпо сигнал симв символтабуляции создатьобъект сокрл сокрлп сокрп сообщить состояние сохранитьзначение сред статусвозврата стрдлина стрзаменить стрколичествострок стрполучитьстроку  стрчисловхождений сформироватьпозициюдокумента счетпокоду текущаядата текущеевремя типзначения типзначениястр удалитьобъекты установитьтана установитьтапо фиксшаблон формат цел шаблон"
        },
        c: [e.CLCM, e.NM, i, n, {
            cN: "function",
            b: "(процедура|функция)",
            e: "$",
            l: t,
            k: "процедура функция",
            c: [{
                b: "экспорт",
                eW: !0,
                l: t,
                k: "экспорт",
                c: [e.CLCM]
            }, {
                cN: "params",
                b: "\\(",
                e: "\\)",
                l: t,
                k: "знач",
                c: [i, n]
            }, e.CLCM, e.inherit(e.TM, {
                b: t
            })]
        }, {
            cN: "meta",
            b: "#",
            e: "$"
        }, {
            cN: "number",
            b: "'\\d{2}\\.\\d{2}\\.(\\d{2}|\\d{4})'"
        }]
    }
}),
hljs.registerLanguage("glsl", function(e) {
    return {
        k: {
            keyword: "break continue discard do else for if return whileattribute binding buffer ccw centroid centroid varying coherent column_major const cw depth_any depth_greater depth_less depth_unchanged early_fragment_tests equal_spacing flat fractional_even_spacing fractional_odd_spacing highp in index inout invariant invocations isolines layout line_strip lines lines_adjacency local_size_x local_size_y local_size_z location lowp max_vertices mediump noperspective offset origin_upper_left out packed patch pixel_center_integer point_mode points precise precision quads r11f_g11f_b10f r16 r16_snorm r16f r16i r16ui r32f r32i r32ui r8 r8_snorm r8i r8ui readonly restrict rg16 rg16_snorm rg16f rg16i rg16ui rg32f rg32i rg32ui rg8 rg8_snorm rg8i rg8ui rgb10_a2 rgb10_a2ui rgba16 rgba16_snorm rgba16f rgba16i rgba16ui rgba32f rgba32i rgba32ui rgba8 rgba8_snorm rgba8i rgba8ui row_major sample shared smooth std140 std430 stream triangle_strip triangles triangles_adjacency uniform varying vertices volatile writeonly",
            type: "atomic_uint bool bvec2 bvec3 bvec4 dmat2 dmat2x2 dmat2x3 dmat2x4 dmat3 dmat3x2 dmat3x3 dmat3x4 dmat4 dmat4x2 dmat4x3 dmat4x4 double dvec2 dvec3 dvec4 float iimage1D iimage1DArray iimage2D iimage2DArray iimage2DMS iimage2DMSArray iimage2DRect iimage3D iimageBufferiimageCube iimageCubeArray image1D image1DArray image2D image2DArray image2DMS image2DMSArray image2DRect image3D imageBuffer imageCube imageCubeArray int isampler1D isampler1DArray isampler2D isampler2DArray isampler2DMS isampler2DMSArray isampler2DRect isampler3D isamplerBuffer isamplerCube isamplerCubeArray ivec2 ivec3 ivec4 mat2 mat2x2 mat2x3 mat2x4 mat3 mat3x2 mat3x3 mat3x4 mat4 mat4x2 mat4x3 mat4x4 sampler1D sampler1DArray sampler1DArrayShadow sampler1DShadow sampler2D sampler2DArray sampler2DArrayShadow sampler2DMS sampler2DMSArray sampler2DRect sampler2DRectShadow sampler2DShadow sampler3D samplerBuffer samplerCube samplerCubeArray samplerCubeArrayShadow samplerCubeShadow image1D uimage1DArray uimage2D uimage2DArray uimage2DMS uimage2DMSArray uimage2DRect uimage3D uimageBuffer uimageCube uimageCubeArray uint usampler1D usampler1DArray usampler2D usampler2DArray usampler2DMS usampler2DMSArray usampler2DRect usampler3D samplerBuffer usamplerCube usamplerCubeArray uvec2 uvec3 uvec4 vec2 vec3 vec4 void",
            built_in: "gl_MaxAtomicCounterBindings gl_MaxAtomicCounterBufferSize gl_MaxClipDistances gl_MaxClipPlanes gl_MaxCombinedAtomicCounterBuffers gl_MaxCombinedAtomicCounters gl_MaxCombinedImageUniforms gl_MaxCombinedImageUnitsAndFragmentOutputs gl_MaxCombinedTextureImageUnits gl_MaxComputeAtomicCounterBuffers gl_MaxComputeAtomicCounters gl_MaxComputeImageUniforms gl_MaxComputeTextureImageUnits gl_MaxComputeUniformComponents gl_MaxComputeWorkGroupCount gl_MaxComputeWorkGroupSize gl_MaxDrawBuffers gl_MaxFragmentAtomicCounterBuffers gl_MaxFragmentAtomicCounters gl_MaxFragmentImageUniforms gl_MaxFragmentInputComponents gl_MaxFragmentInputVectors gl_MaxFragmentUniformComponents gl_MaxFragmentUniformVectors gl_MaxGeometryAtomicCounterBuffers gl_MaxGeometryAtomicCounters gl_MaxGeometryImageUniforms gl_MaxGeometryInputComponents gl_MaxGeometryOutputComponents gl_MaxGeometryOutputVertices gl_MaxGeometryTextureImageUnits gl_MaxGeometryTotalOutputComponents gl_MaxGeometryUniformComponents gl_MaxGeometryVaryingComponents gl_MaxImageSamples gl_MaxImageUnits gl_MaxLights gl_MaxPatchVertices gl_MaxProgramTexelOffset gl_MaxTessControlAtomicCounterBuffers gl_MaxTessControlAtomicCounters gl_MaxTessControlImageUniforms gl_MaxTessControlInputComponents gl_MaxTessControlOutputComponents gl_MaxTessControlTextureImageUnits gl_MaxTessControlTotalOutputComponents gl_MaxTessControlUniformComponents gl_MaxTessEvaluationAtomicCounterBuffers gl_MaxTessEvaluationAtomicCounters gl_MaxTessEvaluationImageUniforms gl_MaxTessEvaluationInputComponents gl_MaxTessEvaluationOutputComponents gl_MaxTessEvaluationTextureImageUnits gl_MaxTessEvaluationUniformComponents gl_MaxTessGenLevel gl_MaxTessPatchComponents gl_MaxTextureCoords gl_MaxTextureImageUnits gl_MaxTextureUnits gl_MaxVaryingComponents gl_MaxVaryingFloats gl_MaxVaryingVectors gl_MaxVertexAtomicCounterBuffers gl_MaxVertexAtomicCounters gl_MaxVertexAttribs gl_MaxVertexImageUniforms gl_MaxVertexOutputComponents gl_MaxVertexOutputVectors gl_MaxVertexTextureImageUnits gl_MaxVertexUniformComponents gl_MaxVertexUniformVectors gl_MaxViewports gl_MinProgramTexelOffset gl_BackColor gl_BackLightModelProduct gl_BackLightProduct gl_BackMaterial gl_BackSecondaryColor gl_ClipDistance gl_ClipPlane gl_ClipVertex gl_Color gl_DepthRange gl_EyePlaneQ gl_EyePlaneR gl_EyePlaneS gl_EyePlaneT gl_Fog gl_FogCoord gl_FogFragCoord gl_FragColor gl_FragCoord gl_FragData gl_FragDepth gl_FrontColor gl_FrontFacing gl_FrontLightModelProduct gl_FrontLightProduct gl_FrontMaterial gl_FrontSecondaryColor gl_GlobalInvocationID gl_InstanceID gl_InvocationID gl_Layer gl_LightModel gl_LightSource gl_LocalInvocationID gl_LocalInvocationIndex gl_ModelViewMatrix gl_ModelViewMatrixInverse gl_ModelViewMatrixInverseTranspose gl_ModelViewMatrixTranspose gl_ModelViewProjectionMatrix gl_ModelViewProjectionMatrixInverse gl_ModelViewProjectionMatrixInverseTranspose gl_ModelViewProjectionMatrixTranspose gl_MultiTexCoord0 gl_MultiTexCoord1 gl_MultiTexCoord2 gl_MultiTexCoord3 gl_MultiTexCoord4 gl_MultiTexCoord5 gl_MultiTexCoord6 gl_MultiTexCoord7 gl_Normal gl_NormalMatrix gl_NormalScale gl_NumSamples gl_NumWorkGroups gl_ObjectPlaneQ gl_ObjectPlaneR gl_ObjectPlaneS gl_ObjectPlaneT gl_PatchVerticesIn gl_Point gl_PointCoord gl_PointSize gl_Position gl_PrimitiveID gl_PrimitiveIDIn gl_ProjectionMatrix gl_ProjectionMatrixInverse gl_ProjectionMatrixInverseTranspose gl_ProjectionMatrixTranspose gl_SampleID gl_SampleMask gl_SampleMaskIn gl_SamplePosition gl_SecondaryColor gl_TessCoord gl_TessLevelInner gl_TessLevelOuter gl_TexCoord gl_TextureEnvColor gl_TextureMatrix gl_TextureMatrixInverse gl_TextureMatrixInverseTranspose gl_TextureMatrixTranspose gl_Vertex gl_VertexID gl_ViewportIndex gl_WorkGroupID gl_WorkGroupSize gl_in gl_out EmitStreamVertex EmitVertex EndPrimitive EndStreamPrimitive abs acos acosh all any asin asinh atan atanh atomicAdd atomicAnd atomicCompSwap atomicCounter atomicCounterDecrement atomicCounterIncrement atomicExchange atomicMax atomicMin atomicOr atomicXor barrier bitCount bitfieldExtract bitfieldInsert bitfieldReverse ceil clamp cos cosh cross dFdx dFdy degrees determinant distance dot equal exp exp2 faceforward findLSB findMSB floatBitsToInt floatBitsToUint floor fma fract frexp ftransform fwidth greaterThan greaterThanEqual groupMemoryBarrier imageAtomicAdd imageAtomicAnd imageAtomicCompSwap imageAtomicExchange imageAtomicMax imageAtomicMin imageAtomicOr imageAtomicXor imageLoad imageSize imageStore imulExtended intBitsToFloat interpolateAtCentroid interpolateAtOffset interpolateAtSample inverse inversesqrt isinf isnan ldexp length lessThan lessThanEqual log log2 matrixCompMult max memoryBarrier memoryBarrierAtomicCounter memoryBarrierBuffer memoryBarrierImage memoryBarrierShared min mix mod modf noise1 noise2 noise3 noise4 normalize not notEqual outerProduct packDouble2x32 packHalf2x16 packSnorm2x16 packSnorm4x8 packUnorm2x16 packUnorm4x8 pow radians reflect refract round roundEven shadow1D shadow1DLod shadow1DProj shadow1DProjLod shadow2D shadow2DLod shadow2DProj shadow2DProjLod sign sin sinh smoothstep sqrt step tan tanh texelFetch texelFetchOffset texture texture1D texture1DLod texture1DProj texture1DProjLod texture2D texture2DLod texture2DProj texture2DProjLod texture3D texture3DLod texture3DProj texture3DProjLod textureCube textureCubeLod textureGather textureGatherOffset textureGatherOffsets textureGrad textureGradOffset textureLod textureLodOffset textureOffset textureProj textureProjGrad textureProjGradOffset textureProjLod textureProjLodOffset textureProjOffset textureQueryLevels textureQueryLod textureSize transpose trunc uaddCarry uintBitsToFloat umulExtended unpackDouble2x32 unpackHalf2x16 unpackSnorm2x16 unpackSnorm4x8 unpackUnorm2x16 unpackUnorm4x8 usubBorrow",
            literal: "true false"
        },
        i: '"',
        c: [e.CLCM, e.CBCM, e.CNM, {
            cN: "meta",
            b: "#",
            e: "$"
        }]
    }
}),
hljs.registerLanguage("crmsh", function(e) {
    var t = "group clone ms master location colocation order fencing_topology rsc_ticket acl_target acl_group user role tag xml";
    return {
        aliases: ["crm", "pcmk"],
        cI: !0,
        k: {
            keyword: "params meta operations op rule attributes utilization read write deny defined not_defined in_range date spec in ref reference attribute type xpath version and or lt gt tag lte gte eq ne \\ number string",
            literal: "Master Started Slave Stopped start promote demote stop monitor true false"
        },
        c: [e.HCM, {
            bK: "node",
            starts: {
                e: "\\s*([\\w_-]+:)?",
                starts: {
                    cN: "title",
                    e: "\\s*[\\$\\w_][\\w_-]*"
                }
            }
        }, {
            bK: "primitive rsc_template",
            starts: {
                cN: "title",
                e: "\\s*[\\$\\w_][\\w_-]*",
                starts: {
                    e: "\\s*@?[\\w_][\\w_\\.:-]*"
                }
            }
        }, {
            b: "\\b(" + t.split(" ").join("|") + ")\\s+",
            k: t,
            starts: {
                cN: "title",
                e: "[\\$\\w_][\\w_-]*"
            }
        }, {
            bK: "property rsc_defaults op_defaults",
            starts: {
                cN: "title",
                e: "\\s*([\\w_-]+:)?"
            }
        }, e.QSM, {
            cN: "meta",
            b: "(ocf|systemd|service|lsb):[\\w_:-]+",
            r: 0
        }, {
            cN: "number",
            b: "\\b\\d+(\\.\\d+)?(ms|s|h|m)?",
            r: 0
        }, {
            cN: "literal",
            b: "[-]?(infinity|inf)",
            r: 0
        }, {
            cN: "attr",
            b: /([A-Za-z\$_\#][\w_-]+)=/,
            r: 0
        }, {
            cN: "tag",
            b: "</?",
            e: "/?>",
            r: 0
        }]
    }
}),
hljs.registerLanguage("mercury", function(e) {
    var t = {
        keyword: "module use_module import_module include_module end_module initialise mutable initialize finalize finalise interface implementation pred mode func type inst solver any_pred any_func is semidet det nondet multi erroneous failure cc_nondet cc_multi typeclass instance where pragma promise external trace atomic or_else require_complete_switch require_det require_semidet require_multi require_nondet require_cc_multi require_cc_nondet require_erroneous require_failure",
        meta: "inline no_inline type_spec source_file fact_table obsolete memo loop_check minimal_model terminates does_not_terminate check_termination promise_equivalent_clauses foreign_proc foreign_decl foreign_code foreign_type foreign_import_module foreign_export_enum foreign_export foreign_enum may_call_mercury will_not_call_mercury thread_safe not_thread_safe maybe_thread_safe promise_pure promise_semipure tabled_for_io local untrailed trailed attach_to_io_state can_pass_as_mercury_type stable will_not_throw_exception may_modify_trail will_not_modify_trail may_duplicate may_not_duplicate affects_liveness does_not_affect_liveness doesnt_affect_liveness no_sharing unknown_sharing sharing",
        built_in: "some all not if then else true fail false try catch catch_any semidet_true semidet_false semidet_fail impure_true impure semipure"
    }
      , r = e.C("%", "$")
      , i = {
        cN: "number",
        b: "0'.\\|0[box][0-9a-fA-F]*"
    }
      , n = e.inherit(e.ASM, {
        r: 0
    })
      , a = e.inherit(e.QSM, {
        r: 0
    })
      , o = {
        cN: "subst",
        b: "\\\\[abfnrtv]\\|\\\\x[0-9a-fA-F]*\\\\\\|%[-+# *.0-9]*[dioxXucsfeEgGp]",
        r: 0
    };
    return a.c.push(o),
    {
        aliases: ["m", "moo"],
        k: t,
        c: [{
            cN: "built_in",
            v: [{
                b: "<=>"
            }, {
                b: "<=",
                r: 0
            }, {
                b: "=>",
                r: 0
            }, {
                b: "/\\\\"
            }, {
                b: "\\\\/"
            }]
        }, {
            cN: "built_in",
            v: [{
                b: ":-\\|--\x3e"
            }, {
                b: "=",
                r: 0
            }]
        }, r, e.CBCM, i, e.NM, n, a, {
            b: /:-/
        }]
    }
}),
hljs.registerLanguage("haxe", function(e) {
    return {
        aliases: ["hx"],
        k: {
            keyword: "break callback case cast catch class continue default do dynamic else enum extends extern for function here if implements import in inline interface never new override package private public return static super switch this throw trace try typedef untyped using var while",
            literal: "true false null"
        },
        c: [e.ASM, e.QSM, e.CLCM, e.CBCM, e.CNM, {
            cN: "class",
            bK: "class interface",
            e: "{",
            eE: !0,
            c: [{
                bK: "extends implements"
            }, e.TM]
        }, {
            cN: "meta",
            b: "#",
            e: "$",
            k: {
                "meta-keyword": "if else elseif end error"
            }
        }, {
            cN: "function",
            bK: "function",
            e: "[{;]",
            eE: !0,
            i: "\\S",
            c: [e.TM, {
                cN: "params",
                b: "\\(",
                e: "\\)",
                c: [e.ASM, e.QSM, e.CLCM, e.CBCM]
            }, {
                b: ":\\s*([*]|[a-zA-Z_$][a-zA-Z0-9_$]*)"
            }]
        }]
    }
}),
hljs.registerLanguage("dockerfile", function(e) {
    return {
        aliases: ["docker"],
        cI: !0,
        k: "from maintainer cmd expose add copy entrypoint volume user workdir onbuild run env label",
        c: [e.HCM, {
            k: "run cmd entrypoint volume add copy workdir onbuild label",
            b: /^ *(onbuild +)?(run|cmd|entrypoint|volume|add|copy|workdir|label) +/,
            starts: {
                e: /[^\\]\n/,
                sL: "bash"
            }
        }, {
            k: "from maintainer expose env user onbuild",
            b: /^ *(onbuild +)?(from|maintainer|expose|env|user|onbuild) +/,
            e: /[^\\]\n/,
            c: [e.ASM, e.QSM, e.NM, e.HCM]
        }]
    }
}),
hljs.registerLanguage("vhdl", function(e) {
    return {
        cI: !0,
        k: {
            keyword: "abs access after alias all and architecture array assert attribute begin block body buffer bus case component configuration constant context cover disconnect downto default else elsif end entity exit fairness file for force function generate generic group guarded if impure in inertial inout is label library linkage literal loop map mod nand new next nor not null of on open or others out package port postponed procedure process property protected pure range record register reject release rem report restrict restrict_guarantee return rol ror select sequence severity shared signal sla sll sra srl strong subtype then to transport type unaffected units until use variable vmode vprop vunit wait when while with xnor xor",
            built_in: "boolean bit character severity_level integer time delay_length natural positive string bit_vector file_open_kind file_open_status std_ulogic std_ulogic_vector std_logic std_logic_vector unsigned signed boolean_vector integer_vector real_vector time_vector"
        },
        i: "{",
        c: [e.CBCM, e.C("--", "$"), e.QSM, {
            cN: "number",
            b: "\\b(\\d(_|\\d)*#\\w+(\\.\\w+)?#([eE][-+]?\\d(_|\\d)*)?|\\d(_|\\d)*(\\.\\d(_|\\d)*)?([eE][-+]?\\d(_|\\d)*)?)",
            r: 0
        }, {
            cN: "literal",
            b: "'(U|X|0|1|Z|W|L|H|-)'",
            c: [e.BE]
        }, {
            cN: "symbol",
            b: "'[A-Za-z](_?[A-Za-z0-9])*",
            c: [e.BE]
        }]
    }
}),
hljs.registerLanguage("cpp", function(e) {
    var t = {
        cN: "keyword",
        b: "\\b[a-z\\d_]*_t\\b"
    }
      , r = {
        cN: "string",
        v: [e.inherit(e.QSM, {
            b: '((u8?|U)|L)?"'
        }), {
            b: '(u8?|U)?R"',
            e: '"',
            c: [e.BE]
        }, {
            b: "'\\\\?.",
            e: "'",
            i: "."
        }]
    }
      , i = {
        cN: "number",
        v: [{
            b: "\\b(\\d+(\\.\\d*)?|\\.\\d+)(u|U|l|L|ul|UL|f|F)"
        }, {
            b: e.CNR
        }],
        r: 0
    }
      , n = {
        cN: "meta",
        b: "#",
        e: "$",
        k: {
            "meta-keyword": "if else elif endif define undef warning error line pragma ifdef ifndef"
        },
        c: [{
            b: /\\\n/,
            r: 0
        }, {
            bK: "include",
            e: "$",
            k: {
                "meta-keyword": "include"
            },
            c: [e.inherit(r, {
                cN: "meta-string"
            }), {
                cN: "meta-string",
                b: "<",
                e: ">",
                i: "\\n"
            }]
        }, r, e.CLCM, e.CBCM]
    }
      , a = e.IR + "\\s*\\("
      , o = {
        keyword: "int float while private char catch export virtual operator sizeof dynamic_cast|10 typedef const_cast|10 const struct for static_cast|10 union namespace unsigned long volatile static protected bool template mutable if public friend do goto auto void enum else break extern using class asm case typeid short reinterpret_cast|10 default double register explicit signed typename try this switch continue inline delete alignof constexpr decltype noexcept static_assert thread_local restrict _Bool complex _Complex _Imaginary atomic_bool atomic_char atomic_schar atomic_uchar atomic_short atomic_ushort atomic_int atomic_uint atomic_long atomic_ulong atomic_llong atomic_ullong",
        built_in: "std string cin cout cerr clog stdin stdout stderr stringstream istringstream ostringstream auto_ptr deque list queue stack vector map set bitset multiset multimap unordered_set unordered_map unordered_multiset unordered_multimap array shared_ptr abort abs acos asin atan2 atan calloc ceil cosh cos exit exp fabs floor fmod fprintf fputs free frexp fscanf isalnum isalpha iscntrl isdigit isgraph islower isprint ispunct isspace isupper isxdigit tolower toupper labs ldexp log10 log malloc realloc memchr memcmp memcpy memset modf pow printf putchar puts scanf sinh sin snprintf sprintf sqrt sscanf strcat strchr strcmp strcpy strcspn strlen strncat strncmp strncpy strpbrk strrchr strspn strstr tanh tan vfprintf vprintf vsprintf endl initializer_list unique_ptr",
        literal: "true false nullptr NULL"
    };
    return {
        aliases: ["c", "cc", "h", "c++", "h++", "hpp"],
        k: o,
        i: "</",
        c: [t, e.CLCM, e.CBCM, i, r, n, {
            b: "\\b(deque|list|queue|stack|vector|map|set|bitset|multiset|multimap|unordered_map|unordered_set|unordered_multiset|unordered_multimap|array)\\s*<",
            e: ">",
            k: o,
            c: ["self", t]
        }, {
            b: e.IR + "::",
            k: o
        }, {
            bK: "new throw return else",
            r: 0
        }, {
            cN: "function",
            b: "(" + e.IR + "[\\*&\\s]+)+" + a,
            rB: !0,
            e: /[{;=]/,
            eE: !0,
            k: o,
            i: /[^\w\s\*&]/,
            c: [{
                b: a,
                rB: !0,
                c: [e.TM],
                r: 0
            }, {
                cN: "params",
                b: /\(/,
                e: /\)/,
                k: o,
                r: 0,
                c: [e.CLCM, e.CBCM, r, i]
            }, e.CLCM, e.CBCM, n]
        }]
    }
}),
hljs.registerLanguage("lasso", function(e) {
    var t = "[a-zA-Z_][a-zA-Z0-9_.]*"
      , r = "<\\?(lasso(script)?|=)"
      , i = "\\]|\\?>"
      , n = {
        literal: "true false none minimal full all void bw nbw ew new cn ncn lt lte gt gte eq neq rx nrx ft",
        built_in: "array date decimal duration integer map pair string tag xml null boolean bytes keyword list locale queue set stack staticarray local var variable global data self inherited currentcapture givenblock",
        keyword: "error_code error_msg error_pop error_push error_reset cache database_names database_schemanames database_tablenames define_tag define_type email_batch encode_set html_comment handle handle_error header if inline iterate ljax_target link link_currentaction link_currentgroup link_currentrecord link_detail link_firstgroup link_firstrecord link_lastgroup link_lastrecord link_nextgroup link_nextrecord link_prevgroup link_prevrecord log loop namespace_using output_none portal private protect records referer referrer repeating resultset rows search_args search_arguments select sort_args sort_arguments thread_atomic value_list while abort case else if_empty if_false if_null if_true loop_abort loop_continue loop_count params params_up return return_value run_children soap_definetag soap_lastrequest soap_lastresponse tag_name ascending average by define descending do equals frozen group handle_failure import in into join let match max min on order parent protected provide public require returnhome skip split_thread sum take thread to trait type where with yield yieldhome and or not"
    }
      , a = e.C("\x3c!--", "--\x3e", {
        r: 0
    })
      , o = {
        cN: "meta",
        b: "\\[noprocess\\]",
        starts: {
            e: "\\[/noprocess\\]",
            rE: !0,
            c: [a]
        }
    }
      , s = {
        cN: "meta",
        b: "\\[/noprocess|" + r
    }
      , l = {
        cN: "symbol",
        b: "'" + t + "'"
    }
      , c = [e.C("/\\*\\*!", "\\*/"), e.CLCM, e.CBCM, e.inherit(e.CNM, {
        b: e.CNR + "|(infinity|nan)\\b"
    }), e.inherit(e.ASM, {
        i: null
    }), e.inherit(e.QSM, {
        i: null
    }), {
        cN: "string",
        b: "`",
        e: "`"
    }, {
        v: [{
            b: "[#$]" + t
        }, {
            b: "#",
            e: "\\d+",
            i: "\\W"
        }]
    }, {
        cN: "type",
        b: "::\\s*",
        e: t,
        i: "\\W"
    }, {
        cN: "attr",
        v: [{
            b: "-(?!infinity)" + e.UIR,
            r: 0
        }, {
            b: "(\\.\\.\\.)"
        }]
    }, {
        b: /(->|\.\.?)\s*/,
        r: 0,
        c: [l]
    }, {
        cN: "class",
        bK: "define",
        rE: !0,
        e: "\\(|=>",
        c: [e.inherit(e.TM, {
            b: e.UIR + "(=(?!>))?"
        })]
    }];
    return {
        aliases: ["ls", "lassoscript"],
        cI: !0,
        l: t + "|&[lg]t;",
        k: n,
        c: [{
            cN: "meta",
            b: i,
            r: 0,
            starts: {
                e: "\\[|" + r,
                rE: !0,
                r: 0,
                c: [a]
            }
        }, o, s, {
            cN: "meta",
            b: "\\[no_square_brackets",
            starts: {
                e: "\\[/no_square_brackets\\]",
                l: t + "|&[lg]t;",
                k: n,
                c: [{
                    cN: "meta",
                    b: i,
                    r: 0,
                    starts: {
                        e: "\\[noprocess\\]|" + r,
                        rE: !0,
                        c: [a]
                    }
                }, o, s].concat(c)
            }
        }, {
            cN: "meta",
            b: "\\[",
            r: 0
        }, {
            cN: "meta",
            b: "^#!.+lasso9\\b",
            r: 10
        }].concat(c)
    }
}),
hljs.registerLanguage("python", function(e) {
    var t = {
        cN: "meta",
        b: /^(>>>|\.\.\.) /
    }
      , r = {
        cN: "string",
        c: [e.BE],
        v: [{
            b: /(u|b)?r?'''/,
            e: /'''/,
            c: [t],
            r: 10
        }, {
            b: /(u|b)?r?"""/,
            e: /"""/,
            c: [t],
            r: 10
        }, {
            b: /(u|r|ur)'/,
            e: /'/,
            r: 10
        }, {
            b: /(u|r|ur)"/,
            e: /"/,
            r: 10
        }, {
            b: /(b|br)'/,
            e: /'/
        }, {
            b: /(b|br)"/,
            e: /"/
        }, e.ASM, e.QSM]
    }
      , i = {
        cN: "number",
        r: 0,
        v: [{
            b: e.BNR + "[lLjJ]?"
        }, {
            b: "\\b(0o[0-7]+)[lLjJ]?"
        }, {
            b: e.CNR + "[lLjJ]?"
        }]
    }
      , n = {
        cN: "params",
        b: /\(/,
        e: /\)/,
        c: ["self", t, i, r]
    };
    return {
        aliases: ["py", "gyp"],
        k: {
            keyword: "and elif is global as in if from raise for except finally print import pass return exec else break not with class assert yield try while continue del or def lambda async await nonlocal|10 None True False",
            built_in: "Ellipsis NotImplemented"
        },
        i: /(<\/|->|\?)/,
        c: [t, i, r, e.HCM, {
            v: [{
                cN: "function",
                bK: "def",
                r: 10
            }, {
                cN: "class",
                bK: "class"
            }],
            e: /:/,
            i: /[${=;\n,]/,
            c: [e.UTM, n, {
                b: /->/,
                eW: !0,
                k: "None"
            }]
        }, {
            cN: "meta",
            b: /^[\t ]*@/,
            e: /$/
        }, {
            b: /\b(print|exec)\(/
        }]
    }
}),
hljs.registerLanguage("mojolicious", function(e) {
    return {
        sL: "xml",
        c: [{
            cN: "meta",
            b: "^__(END|DATA)__$"
        }, {
            b: "^\\s*%{1,2}={0,2}",
            e: "$",
            sL: "perl"
        }, {
            b: "<%{1,2}={0,2}",
            e: "={0,1}%>",
            sL: "perl",
            eB: !0,
            eE: !0
        }]
    }
}),
hljs.registerLanguage("rsl", function(e) {
    return {
        k: {
            keyword: "float color point normal vector matrix while for if do return else break extern continue",
            built_in: "abs acos ambient area asin atan atmosphere attribute calculatenormal ceil cellnoise clamp comp concat cos degrees depth Deriv diffuse distance Du Dv environment exp faceforward filterstep floor format fresnel incident length lightsource log match max min mod noise normalize ntransform opposite option phong pnoise pow printf ptlined radians random reflect refract renderinfo round setcomp setxcomp setycomp setzcomp shadow sign sin smoothstep specular specularbrdf spline sqrt step tan texture textureinfo trace transform vtransform xcomp ycomp zcomp"
        },
        i: "</",
        c: [e.CLCM, e.CBCM, e.QSM, e.ASM, e.CNM, {
            cN: "meta",
            b: "#",
            e: "$"
        }, {
            cN: "class",
            bK: "surface displacement light volume imager",
            e: "\\("
        }, {
            bK: "illuminate illuminance gather",
            e: "\\("
        }]
    }
}),
hljs.registerLanguage("markdown", function(e) {
    return {
        aliases: ["md", "mkdown", "mkd"],
        c: [{
            cN: "section",
            v: [{
                b: "^#{1,6}",
                e: "$"
            }, {
                b: "^.+?\\n[=-]{2,}$"
            }]
        }, {
            b: "<",
            e: ">",
            sL: "xml",
            r: 0
        }, {
            cN: "bullet",
            b: "^([*+-]|(\\d+\\.))\\s+"
        }, {
            cN: "strong",
            b: "[*_]{2}.+?[*_]{2}"
        }, {
            cN: "emphasis",
            v: [{
                b: "\\*.+?\\*"
            }, {
                b: "_.+?_",
                r: 0
            }]
        }, {
            cN: "quote",
            b: "^>\\s+",
            e: "$"
        }, {
            cN: "code",
            v: [{
                b: "`.+?`"
            }, {
                b: "^( {4}|\t)",
                e: "$",
                r: 0
            }]
        }, {
            b: "^[-\\*]{3,}",
            e: "$"
        }, {
            b: "\\[.+?\\][\\(\\[].*?[\\)\\]]",
            rB: !0,
            c: [{
                cN: "string",
                b: "\\[",
                e: "\\]",
                eB: !0,
                rE: !0,
                r: 0
            }, {
                cN: "link",
                b: "\\]\\(",
                e: "\\)",
                eB: !0,
                eE: !0
            }, {
                cN: "symbol",
                b: "\\]\\[",
                e: "\\]",
                eB: !0,
                eE: !0
            }],
            r: 10
        }, {
            b: "^\\[.+\\]:",
            rB: !0,
            c: [{
                cN: "symbol",
                b: "\\[",
                e: "\\]:",
                eB: !0,
                eE: !0,
                starts: {
                    cN: "link",
                    e: "$"
                }
            }]
        }]
    }
}),
hljs.registerLanguage("livescript", function(e) {
    var t = {
        keyword: "in if for while finally new do return else break catch instanceof throw try this switch continue typeof delete debugger case default function var with then unless until loop of by when and or is isnt not it that otherwise from to til fallthrough super case default function var void const let enum export import native __hasProp __extends __slice __bind __indexOf",
        literal: "true false null undefined yes no on off it that void",
        built_in: "npm require console print module global window document"
    }
      , r = "[A-Za-z$_](?:-[0-9A-Za-z$_]|[0-9A-Za-z$_])*"
      , i = e.inherit(e.TM, {
        b: r
    })
      , n = {
        cN: "subst",
        b: /#\{/,
        e: /}/,
        k: t
    }
      , a = {
        cN: "subst",
        b: /#[A-Za-z$_]/,
        e: /(?:\-[0-9A-Za-z$_]|[0-9A-Za-z$_])*/,
        k: t
    }
      , o = [e.BNM, {
        cN: "number",
        b: "(\\b0[xX][a-fA-F0-9_]+)|(\\b\\d(\\d|_\\d)*(\\.(\\d(\\d|_\\d)*)?)?(_*[eE]([-+]\\d(_\\d|\\d)*)?)?[_a-z]*)",
        r: 0,
        starts: {
            e: "(\\s*/)?",
            r: 0
        }
    }, {
        cN: "string",
        v: [{
            b: /'''/,
            e: /'''/,
            c: [e.BE]
        }, {
            b: /'/,
            e: /'/,
            c: [e.BE]
        }, {
            b: /"""/,
            e: /"""/,
            c: [e.BE, n, a]
        }, {
            b: /"/,
            e: /"/,
            c: [e.BE, n, a]
        }, {
            b: /\\/,
            e: /(\s|$)/,
            eE: !0
        }]
    }, {
        cN: "regexp",
        v: [{
            b: "//",
            e: "//[gim]*",
            c: [n, e.HCM]
        }, {
            b: /\/(?![ *])(\\\/|.)*?\/[gim]*(?=\W|$)/
        }]
    }, {
        b: "@" + r
    }, {
        b: "``",
        e: "``",
        eB: !0,
        eE: !0,
        sL: "javascript"
    }];
    n.c = o;
    var s = {
        cN: "params",
        b: "\\(",
        rB: !0,
        c: [{
            b: /\(/,
            e: /\)/,
            k: t,
            c: ["self"].concat(o)
        }]
    };
    return {
        aliases: ["ls"],
        k: t,
        i: /\/\*/,
        c: o.concat([e.C("\\/\\*", "\\*\\/"), e.HCM, {
            cN: "function",
            c: [i, s],
            rB: !0,
            v: [{
                b: "(" + r + "\\s*(?:=|:=)\\s*)?(\\(.*\\))?\\s*\\B\\->\\*?",
                e: "\\->\\*?"
            }, {
                b: "(" + r + "\\s*(?:=|:=)\\s*)?!?(\\(.*\\))?\\s*\\B[-~]{1,2}>\\*?",
                e: "[-~]{1,2}>\\*?"
            }, {
                b: "(" + r + "\\s*(?:=|:=)\\s*)?(\\(.*\\))?\\s*\\B!?[-~]{1,2}>\\*?",
                e: "!?[-~]{1,2}>\\*?"
            }]
        }, {
            cN: "class",
            bK: "class",
            e: "$",
            i: /[:="\[\]]/,
            c: [{
                bK: "extends",
                eW: !0,
                i: /[:="\[\]]/,
                c: [i]
            }, i]
        }, {
            b: r + ":",
            e: ":",
            rB: !0,
            rE: !0,
            r: 0
        }])
    }
}),
hljs.registerLanguage("handlebars", function(e) {
    var t = {
        "builtin-name": "each in with if else unless bindattr action collection debugger log outlet template unbound view yield"
    };
    return {
        aliases: ["hbs", "html.hbs", "html.handlebars"],
        cI: !0,
        sL: "xml",
        c: [e.C("{{!(--)?", "(--)?}}"), {
            cN: "template-tag",
            b: /\{\{[#\/]/,
            e: /\}\}/,
            c: [{
                cN: "name",
                b: /[a-zA-Z\.-]+/,
                k: t,
                starts: {
                    eW: !0,
                    r: 0,
                    c: [e.QSM]
                }
            }]
        }, {
            cN: "template-variable",
            b: /\{\{/,
            e: /\}\}/,
            k: t
        }]
    }
}),
hljs.registerLanguage("avrasm", function(e) {
    return {
        cI: !0,
        l: "\\.?" + e.IR,
        k: {
            keyword: "adc add adiw and andi asr bclr bld brbc brbs brcc brcs break breq brge brhc brhs brid brie brlo brlt brmi brne brpl brsh brtc brts brvc brvs bset bst call cbi cbr clc clh cli cln clr cls clt clv clz com cp cpc cpi cpse dec eicall eijmp elpm eor fmul fmuls fmulsu icall ijmp in inc jmp ld ldd ldi lds lpm lsl lsr mov movw mul muls mulsu neg nop or ori out pop push rcall ret reti rjmp rol ror sbc sbr sbrc sbrs sec seh sbi sbci sbic sbis sbiw sei sen ser ses set sev sez sleep spm st std sts sub subi swap tst wdr",
            built_in: "r0 r1 r2 r3 r4 r5 r6 r7 r8 r9 r10 r11 r12 r13 r14 r15 r16 r17 r18 r19 r20 r21 r22 r23 r24 r25 r26 r27 r28 r29 r30 r31 x|0 xh xl y|0 yh yl z|0 zh zl ucsr1c udr1 ucsr1a ucsr1b ubrr1l ubrr1h ucsr0c ubrr0h tccr3c tccr3a tccr3b tcnt3h tcnt3l ocr3ah ocr3al ocr3bh ocr3bl ocr3ch ocr3cl icr3h icr3l etimsk etifr tccr1c ocr1ch ocr1cl twcr twdr twar twsr twbr osccal xmcra xmcrb eicra spmcsr spmcr portg ddrg ping portf ddrf sreg sph spl xdiv rampz eicrb eimsk gimsk gicr eifr gifr timsk tifr mcucr mcucsr tccr0 tcnt0 ocr0 assr tccr1a tccr1b tcnt1h tcnt1l ocr1ah ocr1al ocr1bh ocr1bl icr1h icr1l tccr2 tcnt2 ocr2 ocdr wdtcr sfior eearh eearl eedr eecr porta ddra pina portb ddrb pinb portc ddrc pinc portd ddrd pind spdr spsr spcr udr0 ucsr0a ucsr0b ubrr0l acsr admux adcsr adch adcl porte ddre pine pinf",
            meta: ".byte .cseg .db .def .device .dseg .dw .endmacro .equ .eseg .exit .include .list .listmac .macro .nolist .org .set"
        },
        c: [e.CBCM, e.C(";", "$", {
            r: 0
        }), e.CNM, e.BNM, {
            cN: "number",
            b: "\\b(\\$[a-zA-Z0-9]+|0o[0-7]+)"
        }, e.QSM, {
            cN: "string",
            b: "'",
            e: "[^\\\\]'",
            i: "[^\\\\][^']"
        }, {
            cN: "symbol",
            b: "^[A-Za-z0-9_.$]+:"
        }, {
            cN: "meta",
            b: "#",
            e: "$"
        }, {
            cN: "subst",
            b: "@[0-9]+"
        }]
    }
}),
hljs.registerLanguage("roboconf", function(e) {
    var t = "[a-zA-Z-_][^\\n{]+\\{"
      , r = {
        cN: "attribute",
        b: /[a-zA-Z-_]+/,
        e: /\s*:/,
        eE: !0,
        starts: {
            e: ";",
            r: 0,
            c: [{
                cN: "variable",
                b: /\.[a-zA-Z-_]+/
            }, {
                cN: "keyword",
                b: /\(optional\)/
            }]
        }
    };
    return {
        aliases: ["graph", "instances"],
        cI: !0,
        k: "import",
        c: [{
            b: "^facet " + t,
            e: "}",
            k: "facet",
            c: [r, e.HCM]
        }, {
            b: "^\\s*instance of " + t,
            e: "}",
            k: "name count channels instance-data instance-state instance of",
            i: /\S/,
            c: ["self", r, e.HCM]
        }, {
            b: "^" + t,
            e: "}",
            c: [r, e.HCM]
        }, e.HCM]
    }
}),
hljs.registerLanguage("clojure-repl", function(e) {
    return {
        c: [{
            cN: "meta",
            b: /^([\w.-]+|\s*#_)=>/,
            starts: {
                e: /$/,
                sL: "clojure"
            }
        }]
    }
}),
hljs.registerLanguage("dos", function(e) {
    var t = e.C(/@?rem\b/, /$/, {
        r: 10
    });
    return {
        aliases: ["bat", "cmd"],
        cI: !0,
        i: /\/\*/,
        k: {
            keyword: "if else goto for in do call exit not exist errorlevel defined equ neq lss leq gtr geq",
            built_in: "prn nul lpt3 lpt2 lpt1 con com4 com3 com2 com1 aux shift cd dir echo setlocal endlocal set pause copy append assoc at attrib break cacls cd chcp chdir chkdsk chkntfs cls cmd color comp compact convert date dir diskcomp diskcopy doskey erase fs find findstr format ftype graftabl help keyb label md mkdir mode more move path pause print popd pushd promt rd recover rem rename replace restore rmdir shiftsort start subst time title tree type ver verify vol ping net ipconfig taskkill xcopy ren del"
        },
        c: [{
            cN: "variable",
            b: /%%[^ ]|%[^ ]+?%|![^ ]+?!/
        }, {
            cN: "function",
            b: {
                cN: "symbol",
                b: "^\\s*[A-Za-z._?][A-Za-z0-9_$#@~.?]*(:|\\s+label)",
                r: 0
            }.b,
            e: "goto:eof",
            c: [e.inherit(e.TM, {
                b: "([_a-zA-Z]\\w*\\.)*([_a-zA-Z]\\w*:)?[_a-zA-Z]\\w*"
            }), t]
        }, {
            cN: "number",
            b: "\\b\\d+",
            r: 0
        }, t]
    }
}),
hljs.registerLanguage("nimrod", function(e) {
    return {
        aliases: ["nim"],
        k: {
            keyword: "addr and as asm bind block break|0 case|0 cast const|0 continue|0 converter discard distinct|10 div do elif else|0 end|0 enum|0 except export finally for from generic if|0 import|0 in include|0 interface is isnot|10 iterator|10 let|0 macro method|10 mixin mod nil not notin|10 object|0 of or out proc|10 ptr raise ref|10 return shl shr static template try|0 tuple type|0 using|0 var|0 when while|0 with without xor yield",
            literal: "shared guarded stdin stdout stderr result|10 true false"
        },
        c: [{
            cN: "meta",
            b: /{\./,
            e: /\.}/,
            r: 10
        }, {
            cN: "string",
            b: /[a-zA-Z]\w*"/,
            e: /"/,
            c: [{
                b: /""/
            }]
        }, {
            cN: "string",
            b: /([a-zA-Z]\w*)?"""/,
            e: /"""/
        }, e.QSM, {
            cN: "type",
            b: /\b[A-Z]\w+\b/,
            r: 0
        }, {
            cN: "built_in",
            b: /\b(int|int8|int16|int32|int64|uint|uint8|uint16|uint32|uint64|float|float32|float64|bool|char|string|cstring|pointer|expr|stmt|void|auto|any|range|array|openarray|varargs|seq|set|clong|culong|cchar|cschar|cshort|cint|csize|clonglong|cfloat|cdouble|clongdouble|cuchar|cushort|cuint|culonglong|cstringarray|semistatic)\b/
        }, {
            cN: "number",
            r: 0,
            v: [{
                b: /\b(0[xX][0-9a-fA-F][_0-9a-fA-F]*)('?[iIuU](8|16|32|64))?/
            }, {
                b: /\b(0o[0-7][_0-7]*)('?[iIuUfF](8|16|32|64))?/
            }, {
                b: /\b(0(b|B)[01][_01]*)('?[iIuUfF](8|16|32|64))?/
            }, {
                b: /\b(\d[_\d]*)('?[iIuUfF](8|16|32|64))?/
            }]
        }, e.HCM]
    }
}),
hljs.registerLanguage("go", function(e) {
    return {
        aliases: ["golang"],
        k: {
            keyword: "break default func interface select case map struct chan else goto package switch const fallthrough if range type continue for import return var go defer bool byte complex64 complex128 float32 float64 int8 int16 int32 int64 string uint8 uint16 uint32 uint64 int uint uintptr rune",
            literal: "true false iota nil",
            built_in: "append cap close complex copy imag len make new panic print println real recover delete"
        },
        i: "</",
        c: [e.CLCM, e.CBCM, e.QSM, {
            cN: "string",
            b: "'",
            e: "[^\\\\]'"
        }, {
            cN: "string",
            b: "`",
            e: "`"
        }, {
            cN: "number",
            b: e.CNR + "[dflsi]?",
            r: 0
        }, e.CNM]
    }
}),
hljs.registerLanguage("dns", function(e) {
    return {
        aliases: ["bind", "zone"],
        k: {
            keyword: "IN A AAAA AFSDB APL CAA CDNSKEY CDS CERT CNAME DHCID DLV DNAME DNSKEY DS HIP IPSECKEY KEY KX LOC MX NAPTR NS NSEC NSEC3 NSEC3PARAM PTR RRSIG RP SIG SOA SRV SSHFP TA TKEY TLSA TSIG TXT"
        },
        c: [e.C(";", "$"), {
            cN: "meta",
            b: /^\$(TTL|GENERATE|INCLUDE|ORIGIN)\b/
        }, {
            cN: "number",
            b: "((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(\\.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(\\.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(\\.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(\\.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(\\.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(\\.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(\\.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3}))|:)))\\b"
        }, {
            cN: "number",
            b: "((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]).){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\\b"
        }, e.inherit(e.NM, {
            b: /\b\d+[dhwm]?/
        })]
    }
}),
hljs.registerLanguage("axapta", function(e) {
    return {
        k: "false int abstract private char boolean static null if for true while long throw finally protected final return void enum else break new catch byte super case short default double public try this switch continue reverse firstfast firstonly forupdate nofetch sum avg minof maxof count order group by asc desc index hint like dispaly edit client server ttsbegin ttscommit str real date container anytype common div mod",
        c: [e.CLCM, e.CBCM, e.ASM, e.QSM, e.CNM, {
            cN: "meta",
            b: "#",
            e: "$"
        }, {
            cN: "class",
            bK: "class interface",
            e: "{",
            eE: !0,
            i: ":",
            c: [{
                bK: "extends implements"
            }, e.UTM]
        }]
    }
}),
hljs.registerLanguage("erb", function(e) {
    return {
        sL: "xml",
        c: [e.C("<%#", "%>"), {
            b: "<%[%=-]?",
            e: "[%-]?%>",
            sL: "ruby",
            eB: !0,
            eE: !0
        }]
    }
}),
hljs.registerLanguage("xquery", function(e) {
    var t = {
        b: /\$[a-zA-Z0-9\-]+/,
        r: 5
    }
      , r = {
        cN: "number",
        b: "(\\b0[0-7_]+)|(\\b0x[0-9a-fA-F_]+)|(\\b[1-9][0-9_]*(\\.[0-9_]+)?)|[0_]\\b",
        r: 0
    }
      , i = {
        cN: "string",
        v: [{
            b: /"/,
            e: /"/,
            c: [{
                b: /""/,
                r: 0
            }]
        }, {
            b: /'/,
            e: /'/,
            c: [{
                b: /''/,
                r: 0
            }]
        }]
    }
      , n = {
        cN: "meta",
        b: "%\\w+"
    }
      , a = {
        cN: "comment",
        b: "\\(:",
        e: ":\\)",
        r: 10,
        c: [{
            cN: "doctag",
            b: "@\\w+"
        }]
    }
      , o = {
        b: "{",
        e: "}"
    }
      , s = [t, i, r, a, n, o];
    return o.c = s,
    {
        aliases: ["xpath", "xq"],
        cI: !1,
        l: /[a-zA-Z\$][a-zA-Z0-9_:\-]*/,
        i: /(proc)|(abstract)|(extends)|(until)|(#)/,
        k: {
            keyword: "for let if while then else return where group by xquery encoding versionmodule namespace boundary-space preserve strip default collation base-uri orderingcopy-namespaces order declare import schema namespace function option in allowing emptyat tumbling window sliding window start when only end when previous next stable ascendingdescending empty greatest least some every satisfies switch case typeswitch try catch andor to union intersect instance of treat as castable cast map array delete insert intoreplace value rename copy modify update",
            literal: "false true xs:string xs:integer element item xs:date xs:datetime xs:float xs:double xs:decimal QName xs:anyURI xs:long xs:int xs:short xs:byte attribute"
        },
        c: s
    }
}),
hljs.registerLanguage("dts", function(e) {
    var t = {
        cN: "string",
        v: [e.inherit(e.QSM, {
            b: '((u8?|U)|L)?"'
        }), {
            b: '(u8?|U)?R"',
            e: '"',
            c: [e.BE]
        }, {
            b: "'\\\\?.",
            e: "'",
            i: "."
        }]
    }
      , r = {
        cN: "number",
        v: [{
            b: "\\b(\\d+(\\.\\d*)?|\\.\\d+)(u|U|l|L|ul|UL|f|F)"
        }, {
            b: e.CNR
        }],
        r: 0
    }
      , i = {
        cN: "meta",
        b: "#",
        e: "$",
        k: {
            "meta-keyword": "if else elif endif define undef ifdef ifndef"
        },
        c: [{
            b: /\\\n/,
            r: 0
        }, {
            bK: "include",
            e: "$",
            k: {
                "meta-keyword": "include"
            },
            c: [e.inherit(t, {
                cN: "meta-string"
            }), {
                cN: "meta-string",
                b: "<",
                e: ">",
                i: "\\n"
            }]
        }, t, e.CLCM, e.CBCM]
    }
      , n = {
        cN: "variable",
        b: "\\&[a-z\\d_]*\\b"
    }
      , a = {
        cN: "meta-keyword",
        b: "/[a-z][a-z\\d-]*/"
    }
      , o = {
        cN: "symbol",
        b: "^\\s*[a-zA-Z_][a-zA-Z\\d_]*:"
    }
      , s = {
        cN: "params",
        b: "<",
        e: ">",
        c: [r, n]
    }
      , l = {
        cN: "class",
        b: /[a-zA-Z_][a-zA-Z\d_@]*\s{/,
        e: /[{;=]/,
        rB: !0,
        eE: !0
    };
    return {
        k: "",
        c: [{
            cN: "class",
            b: "/\\s*{",
            e: "};",
            r: 10,
            c: [n, a, o, l, s, e.CLCM, e.CBCM, r, t]
        }, n, a, o, l, s, e.CLCM, e.CBCM, r, t, i, {
            b: e.IR + "::",
            k: ""
        }]
    }
}),
hljs.registerLanguage("apache", function(e) {
    var t = {
        cN: "number",
        b: "[\\$%]\\d+"
    };
    return {
        aliases: ["apacheconf"],
        cI: !0,
        c: [e.HCM, {
            cN: "section",
            b: "</?",
            e: ">"
        }, {
            cN: "attribute",
            b: /\w+/,
            r: 0,
            k: {
                nomarkup: "order deny allow setenv rewriterule rewriteengine rewritecond documentroot sethandler errordocument loadmodule options header listen serverroot servername"
            },
            starts: {
                e: /$/,
                r: 0,
                k: {
                    literal: "on off all"
                },
                c: [{
                    cN: "meta",
                    b: "\\s\\[",
                    e: "\\]$"
                }, {
                    cN: "variable",
                    b: "[\\$%]\\{",
                    e: "\\}",
                    c: ["self", t]
                }, t, e.QSM]
            }
        }],
        i: /\S/
    }
}),
hljs.registerLanguage("ruleslanguage", function(e) {
    return {
        k: {
            keyword: "BILL_PERIOD BILL_START BILL_STOP RS_EFFECTIVE_START RS_EFFECTIVE_STOP RS_JURIS_CODE RS_OPCO_CODE INTDADDATTRIBUTE|5 INTDADDVMSG|5 INTDBLOCKOP|5 INTDBLOCKOPNA|5 INTDCLOSE|5 INTDCOUNT|5 INTDCOUNTSTATUSCODE|5 INTDCREATEMASK|5 INTDCREATEDAYMASK|5 INTDCREATEFACTORMASK|5 INTDCREATEHANDLE|5 INTDCREATEOVERRIDEDAYMASK|5 INTDCREATEOVERRIDEMASK|5 INTDCREATESTATUSCODEMASK|5 INTDCREATETOUPERIOD|5 INTDDELETE|5 INTDDIPTEST|5 INTDEXPORT|5 INTDGETERRORCODE|5 INTDGETERRORMESSAGE|5 INTDISEQUAL|5 INTDJOIN|5 INTDLOAD|5 INTDLOADACTUALCUT|5 INTDLOADDATES|5 INTDLOADHIST|5 INTDLOADLIST|5 INTDLOADLISTDATES|5 INTDLOADLISTENERGY|5 INTDLOADLISTHIST|5 INTDLOADRELATEDCHANNEL|5 INTDLOADSP|5 INTDLOADSTAGING|5 INTDLOADUOM|5 INTDLOADUOMDATES|5 INTDLOADUOMHIST|5 INTDLOADVERSION|5 INTDOPEN|5 INTDREADFIRST|5 INTDREADNEXT|5 INTDRECCOUNT|5 INTDRELEASE|5 INTDREPLACE|5 INTDROLLAVG|5 INTDROLLPEAK|5 INTDSCALAROP|5 INTDSCALE|5 INTDSETATTRIBUTE|5 INTDSETDSTPARTICIPANT|5 INTDSETSTRING|5 INTDSETVALUE|5 INTDSETVALUESTATUS|5 INTDSHIFTSTARTTIME|5 INTDSMOOTH|5 INTDSORT|5 INTDSPIKETEST|5 INTDSUBSET|5 INTDTOU|5 INTDTOURELEASE|5 INTDTOUVALUE|5 INTDUPDATESTATS|5 INTDVALUE|5 STDEV INTDDELETEEX|5 INTDLOADEXACTUAL|5 INTDLOADEXCUT|5 INTDLOADEXDATES|5 INTDLOADEX|5 INTDLOADEXRELATEDCHANNEL|5 INTDSAVEEX|5 MVLOAD|5 MVLOADACCT|5 MVLOADACCTDATES|5 MVLOADACCTHIST|5 MVLOADDATES|5 MVLOADHIST|5 MVLOADLIST|5 MVLOADLISTDATES|5 MVLOADLISTHIST|5 IF FOR NEXT DONE SELECT END CALL ABORT CLEAR CHANNEL FACTOR LIST NUMBER OVERRIDE SET WEEK DISTRIBUTIONNODE ELSE WHEN THEN OTHERWISE IENUM CSV INCLUDE LEAVE RIDER SAVE DELETE NOVALUE SECTION WARN SAVE_UPDATE DETERMINANT LABEL REPORT REVENUE EACH IN FROM TOTAL CHARGE BLOCK AND OR CSV_FILE RATE_CODE AUXILIARY_DEMAND UIDACCOUNT RS BILL_PERIOD_SELECT HOURS_PER_MONTH INTD_ERROR_STOP SEASON_SCHEDULE_NAME ACCOUNTFACTOR ARRAYUPPERBOUND CALLSTOREDPROC GETADOCONNECTION GETCONNECT GETDATASOURCE GETQUALIFIER GETUSERID HASVALUE LISTCOUNT LISTOP LISTUPDATE LISTVALUE PRORATEFACTOR RSPRORATE SETBINPATH SETDBMONITOR WQ_OPEN BILLINGHOURS DATE DATEFROMFLOAT DATETIMEFROMSTRING DATETIMETOSTRING DATETOFLOAT DAY DAYDIFF DAYNAME DBDATETIME HOUR MINUTE MONTH MONTHDIFF MONTHHOURS MONTHNAME ROUNDDATE SAMEWEEKDAYLASTYEAR SECOND WEEKDAY WEEKDIFF YEAR YEARDAY YEARSTR COMPSUM HISTCOUNT HISTMAX HISTMIN HISTMINNZ HISTVALUE MAXNRANGE MAXRANGE MINRANGE COMPIKVA COMPKVA COMPKVARFROMKQKW COMPLF IDATTR FLAG LF2KW LF2KWH MAXKW POWERFACTOR READING2USAGE AVGSEASON MAXSEASON MONTHLYMERGE SEASONVALUE SUMSEASON ACCTREADDATES ACCTTABLELOAD CONFIGADD CONFIGGET CREATEOBJECT CREATEREPORT EMAILCLIENT EXPBLKMDMUSAGE EXPMDMUSAGE EXPORT_USAGE FACTORINEFFECT GETUSERSPECIFIEDSTOP INEFFECT ISHOLIDAY RUNRATE SAVE_PROFILE SETREPORTTITLE USEREXIT WATFORRUNRATE TO TABLE ACOS ASIN ATAN ATAN2 BITAND CEIL COS COSECANT COSH COTANGENT DIVQUOT DIVREM EXP FABS FLOOR FMOD FREPM FREXPN LOG LOG10 MAX MAXN MIN MINNZ MODF POW ROUND ROUND2VALUE ROUNDINT SECANT SIN SINH SQROOT TAN TANH FLOAT2STRING FLOAT2STRINGNC INSTR LEFT LEN LTRIM MID RIGHT RTRIM STRING STRINGNC TOLOWER TOUPPER TRIM NUMDAYS READ_DATE STAGING",
            built_in: "IDENTIFIER OPTIONS XML_ELEMENT XML_OP XML_ELEMENT_OF DOMDOCCREATE DOMDOCLOADFILE DOMDOCLOADXML DOMDOCSAVEFILE DOMDOCGETROOT DOMDOCADDPI DOMNODEGETNAME DOMNODEGETTYPE DOMNODEGETVALUE DOMNODEGETCHILDCT DOMNODEGETFIRSTCHILD DOMNODEGETSIBLING DOMNODECREATECHILDELEMENT DOMNODESETATTRIBUTE DOMNODEGETCHILDELEMENTCT DOMNODEGETFIRSTCHILDELEMENT DOMNODEGETSIBLINGELEMENT DOMNODEGETATTRIBUTECT DOMNODEGETATTRIBUTEI DOMNODEGETATTRIBUTEBYNAME DOMNODEGETBYNAME"
        },
        c: [e.CLCM, e.CBCM, e.ASM, e.QSM, e.CNM, {
            cN: "literal",
            v: [{
                b: "#\\s+[a-zA-Z\\ \\.]*",
                r: 0
            }, {
                b: "#[a-zA-Z\\ \\.]+"
            }]
        }]
    }
}),
hljs.registerLanguage("java", function(e) {
    var t = e.UIR + "(<" + e.UIR + "(\\s*,\\s*" + e.UIR + ")*>)?"
      , r = "false synchronized int abstract float private char boolean static null if const for true while long strictfp finally protected import native final void enum else break transient catch instanceof byte super volatile case assert short package default double public try this switch continue throws protected public private"
      , i = {
        cN: "number",
        b: "\\b(0[bB]([01]+[01_]+[01]+|[01]+)|0[xX]([a-fA-F0-9]+[a-fA-F0-9_]+[a-fA-F0-9]+|[a-fA-F0-9]+)|(([\\d]+[\\d_]+[\\d]+|[\\d]+)(\\.([\\d]+[\\d_]+[\\d]+|[\\d]+))?|\\.([\\d]+[\\d_]+[\\d]+|[\\d]+))([eE][-+]?\\d+)?)[lLfF]?",
        r: 0
    };
    return {
        aliases: ["jsp"],
        k: r,
        i: /<\/|#/,
        c: [e.C("/\\*\\*", "\\*/", {
            r: 0,
            c: [{
                b: /\w+@/,
                r: 0
            }, {
                cN: "doctag",
                b: "@[A-Za-z]+"
            }]
        }), e.CLCM, e.CBCM, e.ASM, e.QSM, {
            cN: "class",
            bK: "class interface",
            e: /[{;=]/,
            eE: !0,
            k: "class interface",
            i: /[:"\[\]]/,
            c: [{
                bK: "extends implements"
            }, e.UTM]
        }, {
            bK: "new throw return else",
            r: 0
        }, {
            cN: "function",
            b: "(" + t + "\\s+)+" + e.UIR + "\\s*\\(",
            rB: !0,
            e: /[{;=]/,
            eE: !0,
            k: r,
            c: [{
                b: e.UIR + "\\s*\\(",
                rB: !0,
                r: 0,
                c: [e.UTM]
            }, {
                cN: "params",
                b: /\(/,
                e: /\)/,
                k: r,
                r: 0,
                c: [e.ASM, e.QSM, e.CNM, e.CBCM]
            }, e.CLCM, e.CBCM]
        }, i, {
            cN: "meta",
            b: "@[A-Za-z]+"
        }]
    }
}),
hljs.registerLanguage("gauss", function(e) {
    var t = {
        keyword: "and bool break|0 call callexe checkinterrupt clear clearg closeall cls comlog compile continue create debug declare delete disable dlibrary|10 dllcall do|0 dos ed edit else|0 elseif enable end endfor|10 endif|10 endp|10 endo|10 errorlog|10 errorlogat expr external fn for|0 format goto gosub|0 graph if|0 keyword let lib library line load loadarray loadexe loadf|10 loadk|10 loadm|10 loadp loads loadx local locate loopnextindex lprint lpwidth lshow matrix msym ndpclex new not open or output outwidth plot plotsym pop prcsn print printdos proc|10 push retp|10 return|0 rndcon rndmod rndmult rndseed run save saveall screen scroll setarray show sparse stop string struct system trace trap|10 threadfor|10 threadendfor|10 threadbegin|10 threadjoin|10 threadstat|10 threadend|10 until use while winprint",
        built_in: "abs acf aconcat aeye amax amean AmericanBinomCall AmericanBinomCall_Greeks AmericanBinomCall_ImpVol AmericanBinomPut AmericanBinomPut_Greeks AmericanBinomPut_ImpVol AmericanBSCall AmericanBSCall_Greeks AmericanBSCall_ImpVol AmericanBSPut AmericanBSPut_Greeks AmericanBSPut_ImpVol amin amult annotationGetDefaults annotationSetBkd annotationSetFont annotationSetLineColor annotationSetLineStyle annotationSetLineThickness annualTradingDays arccos arcsin areshape arrayalloc arrayindex arrayinit arraytomat asciiload asclabel astd astds asum atan atan2 atranspose axmargin balance band bandchol bandcholsol bandltsol bandrv bandsolpd bar base10 begwind besselj bessely beta box boxcox cdfBeta cdfBetaInv cdfBinomial cdfBinomialInv cdfBvn cdfBvn2 cdfBvn2e cdfCauchy cdfCauchyInv cdfChic cdfChii cdfChinc cdfChincInv cdfExp cdfExpInv cdfFc cdfFnc cdfFncInv cdfGam cdfGenPareto cdfHyperGeo cdfLaplace cdfLaplaceInv cdfLogistic cdfLogisticInv cdfmControlCreate cdfMvn cdfMvn2e cdfMvnce cdfMvne cdfMvt2e cdfMvtce cdfMvte cdfN cdfN2 cdfNc cdfNegBinomial cdfNegBinomialInv cdfNi cdfPoisson cdfPoissonInv cdfRayleigh cdfRayleighInv cdfTc cdfTci cdfTnc cdfTvn cdfWeibull cdfWeibullInv cdir ceil ChangeDir chdir chiBarSquare chol choldn cholsol cholup chrs close code cols colsf combinate combinated complex con cond conj cons ConScore contour conv convertsatostr convertstrtosa corrm corrms corrvc corrx corrxs cos cosh counts countwts crossprd crout croutp csrcol csrlin csvReadM csvReadSA cumprodc cumsumc curve cvtos datacreate datacreatecomplex datalist dataload dataloop dataopen datasave date datestr datestring datestrymd dayinyr dayofweek dbAddDatabase|10 dbClose|10 dbCommit|10 dbCreateQuery|10 dbExecQuery|10 dbGetConnectOptions|10 dbGetDatabaseName|10 dbGetDriverName|10 dbGetDrivers|10 dbGetHostName|10 dbGetLastErrorNum|10 dbGetLastErrorText|10 dbGetNumericalPrecPolicy|10 dbGetPassword|10 dbGetPort|10 dbGetTableHeaders|10 dbGetTables|10 dbGetUserName|10 dbHasFeature|10 dbIsDriverAvailable|10 dbIsOpen|10 dbIsOpenError|10 dbOpen|10 dbQueryBindValue|10 dbQueryClear|10 dbQueryCols|10 dbQueryExecPrepared|10 dbQueryFetchAllM|10 dbQueryFetchAllSA|10 dbQueryFetchOneM|10 dbQueryFetchOneSA|10 dbQueryFinish|10 dbQueryGetBoundValue|10 dbQueryGetBoundValues|10 dbQueryGetField|10 dbQueryGetLastErrorNum|10 dbQueryGetLastErrorText|10 dbQueryGetLastInsertID|10 dbQueryGetLastQuery|10 dbQueryGetPosition|10 dbQueryIsActive|10 dbQueryIsForwardOnly|10 dbQueryIsNull|10 dbQueryIsSelect|10 dbQueryIsValid|10 dbQueryPrepare|10 dbQueryRows|10 dbQuerySeek|10 dbQuerySeekFirst|10 dbQuerySeekLast|10 dbQuerySeekNext|10 dbQuerySeekPrevious|10 dbQuerySetForwardOnly|10 dbRemoveDatabase|10 dbRollback|10 dbSetConnectOptions|10 dbSetDatabaseName|10 dbSetHostName|10 dbSetNumericalPrecPolicy|10 dbSetPort|10 dbSetUserName|10 dbTransaction|10 DeleteFile delif delrows denseToSp denseToSpRE denToZero design det detl dfft dffti diag diagrv digamma doswin DOSWinCloseall DOSWinOpen dotfeq dotfeqmt dotfge dotfgemt dotfgt dotfgtmt dotfle dotflemt dotflt dotfltmt dotfne dotfnemt draw drop dsCreate dstat dstatmt dstatmtControlCreate dtdate dtday dttime dttodtv dttostr dttoutc dtvnormal dtvtodt dtvtoutc dummy dummybr dummydn eig eigh eighv eigv elapsedTradingDays endwind envget eof eqSolve eqSolvemt eqSolvemtControlCreate eqSolvemtOutCreate eqSolveset erf erfc erfccplx erfcplx error etdays ethsec etstr EuropeanBinomCall EuropeanBinomCall_Greeks EuropeanBinomCall_ImpVol EuropeanBinomPut EuropeanBinomPut_Greeks EuropeanBinomPut_ImpVol EuropeanBSCall EuropeanBSCall_Greeks EuropeanBSCall_ImpVol EuropeanBSPut EuropeanBSPut_Greeks EuropeanBSPut_ImpVol exctsmpl exec execbg exp extern eye fcheckerr fclearerr feq feqmt fflush fft ffti fftm fftmi fftn fge fgemt fgets fgetsa fgetsat fgetst fgt fgtmt fileinfo filesa fle flemt floor flt fltmt fmod fne fnemt fonts fopen formatcv formatnv fputs fputst fseek fstrerror ftell ftocv ftos ftostrC gamma gammacplx gammaii gausset gdaAppend gdaCreate gdaDStat gdaDStatMat gdaGetIndex gdaGetName gdaGetNames gdaGetOrders gdaGetType gdaGetTypes gdaGetVarInfo gdaIsCplx gdaLoad gdaPack gdaRead gdaReadByIndex gdaReadSome gdaReadSparse gdaReadStruct gdaReportVarInfo gdaSave gdaUpdate gdaUpdateAndPack gdaVars gdaWrite gdaWrite32 gdaWriteSome getarray getdims getf getGAUSShome getmatrix getmatrix4D getname getnamef getNextTradingDay getNextWeekDay getnr getorders getpath getPreviousTradingDay getPreviousWeekDay getRow getscalar3D getscalar4D getTrRow getwind glm gradcplx gradMT gradMTm gradMTT gradMTTm gradp graphprt graphset hasimag header headermt hess hessMT hessMTg hessMTgw hessMTm hessMTmw hessMTT hessMTTg hessMTTgw hessMTTm hessMTw hessp hist histf histp hsec imag indcv indexcat indices indices2 indicesf indicesfn indnv indsav indx integrate1d integrateControlCreate intgrat2 intgrat3 inthp1 inthp2 inthp3 inthp4 inthpControlCreate intquad1 intquad2 intquad3 intrleav intrleavsa intrsect intsimp inv invpd invswp iscplx iscplxf isden isinfnanmiss ismiss key keyav keyw lag lag1 lagn lapEighb lapEighi lapEighvb lapEighvi lapgEig lapgEigh lapgEighv lapgEigv lapgSchur lapgSvdcst lapgSvds lapgSvdst lapSvdcusv lapSvds lapSvdusv ldlp ldlsol linSolve listwise ln lncdfbvn lncdfbvn2 lncdfmvn lncdfn lncdfn2 lncdfnc lnfact lngammacplx lnpdfmvn lnpdfmvt lnpdfn lnpdft loadd loadstruct loadwind loess loessmt loessmtControlCreate log loglog logx logy lower lowmat lowmat1 ltrisol lu lusol machEpsilon make makevars makewind margin matalloc matinit mattoarray maxbytes maxc maxindc maxv maxvec mbesselei mbesselei0 mbesselei1 mbesseli mbesseli0 mbesseli1 meanc median mergeby mergevar minc minindc minv miss missex missrv moment momentd movingave movingaveExpwgt movingaveWgt nextindex nextn nextnevn nextwind ntos null null1 numCombinations ols olsmt olsmtControlCreate olsqr olsqr2 olsqrmt ones optn optnevn orth outtyp pacf packedToSp packr parse pause pdfCauchy pdfChi pdfExp pdfGenPareto pdfHyperGeo pdfLaplace pdfLogistic pdfn pdfPoisson pdfRayleigh pdfWeibull pi pinv pinvmt plotAddArrow plotAddBar plotAddBox plotAddHist plotAddHistF plotAddHistP plotAddPolar plotAddScatter plotAddShape plotAddTextbox plotAddTS plotAddXY plotArea plotBar plotBox plotClearLayout plotContour plotCustomLayout plotGetDefaults plotHist plotHistF plotHistP plotLayout plotLogLog plotLogX plotLogY plotOpenWindow plotPolar plotSave plotScatter plotSetAxesPen plotSetBar plotSetBarFill plotSetBarStacked plotSetBkdColor plotSetFill plotSetGrid plotSetLegend plotSetLineColor plotSetLineStyle plotSetLineSymbol plotSetLineThickness plotSetNewWindow plotSetTitle plotSetWhichYAxis plotSetXAxisShow plotSetXLabel plotSetXRange plotSetXTicInterval plotSetXTicLabel plotSetYAxisShow plotSetYLabel plotSetYRange plotSetZAxisShow plotSetZLabel plotSurface plotTS plotXY polar polychar polyeval polygamma polyint polymake polymat polymroot polymult polyroot pqgwin previousindex princomp printfm printfmt prodc psi putarray putf putvals pvCreate pvGetIndex pvGetParNames pvGetParVector pvLength pvList pvPack pvPacki pvPackm pvPackmi pvPacks pvPacksi pvPacksm pvPacksmi pvPutParVector pvTest pvUnpack QNewton QNewtonmt QNewtonmtControlCreate QNewtonmtOutCreate QNewtonSet QProg QProgmt QProgmtInCreate qqr qqre qqrep qr qre qrep qrsol qrtsol qtyr qtyre qtyrep quantile quantiled qyr qyre qyrep qz rank rankindx readr real reclassify reclassifyCuts recode recserar recsercp recserrc rerun rescale reshape rets rev rfft rffti rfftip rfftn rfftnp rfftp rndBernoulli rndBeta rndBinomial rndCauchy rndChiSquare rndCon rndCreateState rndExp rndGamma rndGeo rndGumbel rndHyperGeo rndi rndKMbeta rndKMgam rndKMi rndKMn rndKMnb rndKMp rndKMu rndKMvm rndLaplace rndLCbeta rndLCgam rndLCi rndLCn rndLCnb rndLCp rndLCu rndLCvm rndLogNorm rndMTu rndMVn rndMVt rndn rndnb rndNegBinomial rndp rndPoisson rndRayleigh rndStateSkip rndu rndvm rndWeibull rndWishart rotater round rows rowsf rref sampleData satostrC saved saveStruct savewind scale scale3d scalerr scalinfnanmiss scalmiss schtoc schur searchsourcepath seekr select selif seqa seqm setdif setdifsa setvars setvwrmode setwind shell shiftr sin singleindex sinh sleep solpd sortc sortcc sortd sorthc sorthcc sortind sortindc sortmc sortr sortrc spBiconjGradSol spChol spConjGradSol spCreate spDenseSubmat spDiagRvMat spEigv spEye spLDL spline spLU spNumNZE spOnes spreadSheetReadM spreadSheetReadSA spreadSheetWrite spScale spSubmat spToDense spTrTDense spTScalar spZeros sqpSolve sqpSolveMT sqpSolveMTControlCreate sqpSolveMTlagrangeCreate sqpSolveMToutCreate sqpSolveSet sqrt statements stdc stdsc stocv stof strcombine strindx strlen strput strrindx strsect strsplit strsplitPad strtodt strtof strtofcplx strtriml strtrimr strtrunc strtruncl strtruncpad strtruncr submat subscat substute subvec sumc sumr surface svd svd1 svd2 svdcusv svds svdusv sysstate tab tan tanh tempname threadBegin threadEnd threadEndFor threadFor threadJoin threadStat time timedt timestr timeutc title tkf2eps tkf2ps tocart todaydt toeplitz token topolar trapchk trigamma trimr trunc type typecv typef union unionsa uniqindx uniqindxsa unique uniquesa upmat upmat1 upper utctodt utctodtv utrisol vals varCovMS varCovXS varget vargetl varmall varmares varput varputl vartypef vcm vcms vcx vcxs vec vech vecr vector vget view viewxyz vlist vnamecv volume vput vread vtypecv wait waitc walkindex where window writer xlabel xlsGetSheetCount xlsGetSheetSize xlsGetSheetTypes xlsMakeRange xlsReadM xlsReadSA xlsWrite xlsWriteM xlsWriteSA xpnd xtics xy xyz ylabel ytics zeros zeta zlabel ztics",
        literal: "DB_AFTER_LAST_ROW DB_ALL_TABLES DB_BATCH_OPERATIONS DB_BEFORE_FIRST_ROW DB_BLOB DB_EVENT_NOTIFICATIONS DB_FINISH_QUERY DB_HIGH_PRECISION DB_LAST_INSERT_ID DB_LOW_PRECISION_DOUBLE DB_LOW_PRECISION_INT32 DB_LOW_PRECISION_INT64 DB_LOW_PRECISION_NUMBERS DB_MULTIPLE_RESULT_SETS DB_NAMED_PLACEHOLDERS DB_POSITIONAL_PLACEHOLDERS DB_PREPARED_QUERIES DB_QUERY_SIZE DB_SIMPLE_LOCKING DB_SYSTEM_TABLES DB_TABLES DB_TRANSACTIONS DB_UNICODE DB_VIEWS"
    }
      , r = {
        cN: "meta",
        b: "#",
        e: "$",
        k: {
            "meta-keyword": "define definecs|10 undef ifdef ifndef iflight ifdllcall ifmac ifos2win ifunix else endif lineson linesoff srcfile srcline"
        },
        c: [{
            b: /\\\n/,
            r: 0
        }, {
            bK: "include",
            e: "$",
            k: {
                "meta-keyword": "include"
            },
            c: [{
                cN: "meta-string",
                b: '"',
                e: '"',
                i: "\\n"
            }]
        }, e.CLCM, e.CBCM]
    }
      , i = e.UIR + "\\s*\\(?"
      , n = [{
        cN: "params",
        b: /\(/,
        e: /\)/,
        k: t,
        r: 0,
        c: [e.CNM, e.CLCM, e.CBCM]
    }];
    return {
        aliases: ["gss"],
        cI: !0,
        k: t,
        i: "(\\{[%#]|[%#]\\})",
        c: [e.CNM, e.CLCM, e.CBCM, e.C("@", "@"), r, {
            cN: "string",
            b: '"',
            e: '"',
            c: [e.BE]
        }, {
            cN: "function",
            bK: "proc keyword",
            e: ";",
            eE: !0,
            k: t,
            c: [{
                b: i,
                rB: !0,
                c: [e.UTM],
                r: 0
            }, e.CNM, e.CLCM, e.CBCM, r].concat(n)
        }, {
            cN: "function",
            bK: "fn",
            e: ";",
            eE: !0,
            k: t,
            c: [{
                b: i + e.IR + "\\)?\\s*\\=\\s*",
                rB: !0,
                c: [e.UTM],
                r: 0
            }, e.CNM, e.CLCM, e.CBCM].concat(n)
        }, {
            cN: "function",
            b: "\\bexternal (proc|keyword|fn)\\s+",
            e: ";",
            eE: !0,
            k: t,
            c: [{
                b: i,
                rB: !0,
                c: [e.UTM],
                r: 0
            }, e.CLCM, e.CBCM]
        }, {
            cN: "function",
            b: "\\bexternal (matrix|string|array|sparse matrix|struct " + e.IR + ")\\s+",
            e: ";",
            eE: !0,
            k: t,
            c: [e.CLCM, e.CBCM]
        }]
    }
}),
hljs.registerLanguage("vala", function(e) {
    return {
        k: {
            keyword: "char uchar unichar int uint long ulong short ushort int8 int16 int32 int64 uint8 uint16 uint32 uint64 float double bool struct enum string void weak unowned owned async signal static abstract interface override while do for foreach else switch case break default return try catch public private protected internal using new this get set const stdout stdin stderr var",
            built_in: "DBus GLib CCode Gee Object",
            literal: "false true null"
        },
        c: [{
            cN: "class",
            bK: "class interface delegate namespace",
            e: "{",
            eE: !0,
            i: "[^,:\\n\\s\\.]",
            c: [e.UTM]
        }, e.CLCM, e.CBCM, {
            cN: "string",
            b: '"""',
            e: '"""',
            r: 5
        }, e.ASM, e.QSM, e.CNM, {
            cN: "meta",
            b: "^#",
            e: "$",
            r: 2
        }]
    }
}),
hljs.registerLanguage("ini", function(e) {
    var t = {
        cN: "string",
        c: [e.BE],
        v: [{
            b: "'''",
            e: "'''",
            r: 10
        }, {
            b: '"""',
            e: '"""',
            r: 10
        }, {
            b: '"',
            e: '"'
        }, {
            b: "'",
            e: "'"
        }]
    };
    return {
        aliases: ["toml"],
        cI: !0,
        i: /\S/,
        c: [e.C(";", "$"), e.HCM, {
            cN: "section",
            b: /^\s*\[+/,
            e: /\]+/
        }, {
            b: /^[a-z0-9\[\]_-]+\s*=\s*/,
            e: "$",
            rB: !0,
            c: [{
                cN: "attr",
                b: /[a-z0-9\[\]_-]+/
            }, {
                b: /=/,
                eW: !0,
                r: 0,
                c: [{
                    cN: "literal",
                    b: /\bon|off|true|false|yes|no\b/
                }, {
                    cN: "variable",
                    v: [{
                        b: /\$[\w\d"][\w\d_]*/
                    }, {
                        b: /\$\{(.*?)}/
                    }]
                }, t, {
                    cN: "number",
                    b: /([\+\-]+)?[\d]+_[\d_]+/
                }, e.NM]
            }]
        }]
    }
}),
hljs.registerLanguage("ceylon", function(e) {
    var t = "assembly module package import alias class interface object given value assign void function new of extends satisfies abstracts in out return break continue throw assert dynamic if else switch case for while try catch finally then let this outer super is exists nonempty"
      , r = {
        cN: "subst",
        eB: !0,
        eE: !0,
        b: /``/,
        e: /``/,
        k: t,
        r: 10
    }
      , i = [{
        cN: "string",
        b: '"""',
        e: '"""',
        r: 10
    }, {
        cN: "string",
        b: '"',
        e: '"',
        c: [r]
    }, {
        cN: "string",
        b: "'",
        e: "'"
    }, {
        cN: "number",
        b: "#[0-9a-fA-F_]+|\\$[01_]+|[0-9_]+(?:\\.[0-9_](?:[eE][+-]?\\d+)?)?[kMGTPmunpf]?",
        r: 0
    }];
    return r.c = i,
    {
        k: {
            keyword: t + " shared abstract formal default actual variable late native deprecatedfinal sealed annotation suppressWarnings small",
            meta: "doc by license see throws tagged"
        },
        i: "\\$[^01]|#[^0-9a-fA-F]",
        c: [e.CLCM, e.C("/\\*", "\\*/", {
            c: ["self"]
        }), {
            cN: "meta",
            b: '@[a-z]\\w*(?:\\:"[^"]*")?'
        }].concat(i)
    }
}),
hljs.registerLanguage("sql", function(e) {
    var t = e.C("--", "$");
    return {
        cI: !0,
        i: /[<>{}*]/,
        c: [{
            bK: "begin end start commit rollback savepoint lock alter create drop rename call delete do handler insert load replace select truncate update set show pragma grant merge describe use explain help declare prepare execute deallocate release unlock purge reset change stop analyze cache flush optimize repair kill install uninstall checksum restore check backup revoke",
            e: /;/,
            eW: !0,
            k: {
                keyword: "abort abs absolute acc acce accep accept access accessed accessible account acos action activate add addtime admin administer advanced advise aes_decrypt aes_encrypt after agent aggregate ali alia alias allocate allow alter always analyze ancillary and any anydata anydataset anyschema anytype apply archive archived archivelog are as asc ascii asin assembly assertion associate asynchronous at atan atn2 attr attri attrib attribu attribut attribute attributes audit authenticated authentication authid authors auto autoallocate autodblink autoextend automatic availability avg backup badfile basicfile before begin beginning benchmark between bfile bfile_base big bigfile bin binary_double binary_float binlog bit_and bit_count bit_length bit_or bit_xor bitmap blob_base block blocksize body both bound buffer_cache buffer_pool build bulk by byte byteordermark bytes c cache caching call calling cancel capacity cascade cascaded case cast catalog category ceil ceiling chain change changed char_base char_length character_length characters characterset charindex charset charsetform charsetid check checksum checksum_agg child choose chr chunk class cleanup clear client clob clob_base clone close cluster_id cluster_probability cluster_set clustering coalesce coercibility col collate collation collect colu colum column column_value columns columns_updated comment commit compact compatibility compiled complete composite_limit compound compress compute concat concat_ws concurrent confirm conn connec connect connect_by_iscycle connect_by_isleaf connect_by_root connect_time connection consider consistent constant constraint constraints constructor container content contents context contributors controlfile conv convert convert_tz corr corr_k corr_s corresponding corruption cos cost count count_big counted covar_pop covar_samp cpu_per_call cpu_per_session crc32 create creation critical cross cube cume_dist curdate current current_date current_time current_timestamp current_user cursor curtime customdatum cycle d data database databases datafile datafiles datalength date_add date_cache date_format date_sub dateadd datediff datefromparts datename datepart datetime2fromparts day day_to_second dayname dayofmonth dayofweek dayofyear days db_role_change dbtimezone ddl deallocate declare decode decompose decrement decrypt deduplicate def defa defau defaul default defaults deferred defi defin define degrees delayed delegate delete delete_all delimited demand dense_rank depth dequeue des_decrypt des_encrypt des_key_file desc descr descri describ describe descriptor deterministic diagnostics difference dimension direct_load directory disable disable_all disallow disassociate discardfile disconnect diskgroup distinct distinctrow distribute distributed div do document domain dotnet double downgrade drop dumpfile duplicate duration e each edition editionable editions element ellipsis else elsif elt empty enable enable_all enclosed encode encoding encrypt end end-exec endian enforced engine engines enqueue enterprise entityescaping eomonth error errors escaped evalname evaluate event eventdata events except exception exceptions exchange exclude excluding execu execut execute exempt exists exit exp expire explain export export_set extended extent external external_1 external_2 externally extract f failed failed_login_attempts failover failure far fast feature_set feature_value fetch field fields file file_name_convert filesystem_like_logging final finish first first_value fixed flash_cache flashback floor flush following follows for forall force form forma format found found_rows freelist freelists freepools fresh from from_base64 from_days ftp full function g general generated get get_format get_lock getdate getutcdate global global_name globally go goto grant grants greatest group group_concat group_id grouping grouping_id groups gtid_subtract guarantee guard handler hash hashkeys having hea head headi headin heading heap help hex hierarchy high high_priority hosts hour http i id ident_current ident_incr ident_seed identified identity idle_time if ifnull ignore iif ilike ilm immediate import in include including increment index indexes indexing indextype indicator indices inet6_aton inet6_ntoa inet_aton inet_ntoa infile initial initialized initially initrans inmemory inner innodb input insert install instance instantiable instr interface interleaved intersect into invalidate invisible is is_free_lock is_ipv4 is_ipv4_compat is_not is_not_null is_used_lock isdate isnull isolation iterate java join json json_exists k keep keep_duplicates key keys kill l language large last last_day last_insert_id last_value lax lcase lead leading least leaves left len lenght length less level levels library like like2 like4 likec limit lines link list listagg little ln load load_file lob lobs local localtime localtimestamp locate locator lock locked log log10 log2 logfile logfiles logging logical logical_reads_per_call logoff logon logs long loop low low_priority lower lpad lrtrim ltrim m main make_set makedate maketime managed management manual map mapping mask master master_pos_wait match matched materialized max maxextents maximize maxinstances maxlen maxlogfiles maxloghistory maxlogmembers maxsize maxtrans md5 measures median medium member memcompress memory merge microsecond mid migration min minextents minimum mining minus minute minvalue missing mod mode model modification modify module monitoring month months mount move movement multiset mutex n name name_const names nan national native natural nav nchar nclob nested never new newline next nextval no no_write_to_binlog noarchivelog noaudit nobadfile nocheck nocompress nocopy nocycle nodelay nodiscardfile noentityescaping noguarantee nokeep nologfile nomapping nomaxvalue nominimize nominvalue nomonitoring none noneditionable nonschema noorder nopr nopro noprom nopromp noprompt norely noresetlogs noreverse normal norowdependencies noschemacheck noswitch not nothing notice notrim novalidate now nowait nth_value nullif nulls num numb numbe nvarchar nvarchar2 object ocicoll ocidate ocidatetime ociduration ociinterval ociloblocator ocinumber ociref ocirefcursor ocirowid ocistring ocitype oct octet_length of off offline offset oid oidindex old on online only opaque open operations operator optimal optimize option optionally or oracle oracle_date oradata ord ordaudio orddicom orddoc order ordimage ordinality ordvideo organization orlany orlvary out outer outfile outline output over overflow overriding p package pad parallel parallel_enable parameters parent parse partial partition partitions pascal passing password password_grace_time password_lock_time password_reuse_max password_reuse_time password_verify_function patch path patindex pctincrease pctthreshold pctused pctversion percent percent_rank percentile_cont percentile_disc performance period period_add period_diff permanent physical pi pipe pipelined pivot pluggable plugin policy position post_transaction pow power pragma prebuilt precedes preceding precision prediction prediction_cost prediction_details prediction_probability prediction_set prepare present preserve prior priority private private_sga privileges procedural procedure procedure_analyze processlist profiles project prompt protection public publishingservername purge quarter query quick quiesce quota quotename radians raise rand range rank raw read reads readsize rebuild record records recover recovery recursive recycle redo reduced ref reference referenced references referencing refresh regexp_like register regr_avgx regr_avgy regr_count regr_intercept regr_r2 regr_slope regr_sxx regr_sxy reject rekey relational relative relaylog release release_lock relies_on relocate rely rem remainder rename repair repeat replace replicate replication required reset resetlogs resize resource respect restore restricted result result_cache resumable resume retention return returning returns reuse reverse revoke right rlike role roles rollback rolling rollup round row row_count rowdependencies rowid rownum rows rtrim rules safe salt sample save savepoint sb1 sb2 sb4 scan schema schemacheck scn scope scroll sdo_georaster sdo_topo_geometry search sec_to_time second section securefile security seed segment select self sequence sequential serializable server servererror session session_user sessions_per_user set sets settings sha sha1 sha2 share shared shared_pool short show shrink shutdown si_averagecolor si_colorhistogram si_featurelist si_positionalcolor si_stillimage si_texture siblings sid sign sin size size_t sizes skip slave sleep smalldatetimefromparts smallfile snapshot some soname sort soundex source space sparse spfile split sql sql_big_result sql_buffer_result sql_cache sql_calc_found_rows sql_small_result sql_variant_property sqlcode sqldata sqlerror sqlname sqlstate sqrt square standalone standby start starting startup statement static statistics stats_binomial_test stats_crosstab stats_ks_test stats_mode stats_mw_test stats_one_way_anova stats_t_test_ stats_t_test_indep stats_t_test_one stats_t_test_paired stats_wsr_test status std stddev stddev_pop stddev_samp stdev stop storage store stored str str_to_date straight_join strcmp strict string struct stuff style subdate subpartition subpartitions substitutable substr substring subtime subtring_index subtype success sum suspend switch switchoffset switchover sync synchronous synonym sys sys_xmlagg sysasm sysaux sysdate sysdatetimeoffset sysdba sysoper system system_user sysutcdatetime t table tables tablespace tan tdo template temporary terminated tertiary_weights test than then thread through tier ties time time_format time_zone timediff timefromparts timeout timestamp timestampadd timestampdiff timezone_abbr timezone_minute timezone_region to to_base64 to_date to_days to_seconds todatetimeoffset trace tracking transaction transactional translate translation treat trigger trigger_nestlevel triggers trim truncate try_cast try_convert try_parse type ub1 ub2 ub4 ucase unarchived unbounded uncompress under undo unhex unicode uniform uninstall union unique unix_timestamp unknown unlimited unlock unpivot unrecoverable unsafe unsigned until untrusted unusable unused update updated upgrade upped upper upsert url urowid usable usage use use_stored_outlines user user_data user_resources users using utc_date utc_timestamp uuid uuid_short validate validate_password_strength validation valist value values var var_samp varcharc vari varia variab variabl variable variables variance varp varraw varrawc varray verify version versions view virtual visible void wait wallet warning warnings week weekday weekofyear wellformed when whene whenev wheneve whenever where while whitespace with within without work wrapped xdb xml xmlagg xmlattributes xmlcast xmlcolattval xmlelement xmlexists xmlforest xmlindex xmlnamespaces xmlpi xmlquery xmlroot xmlschema xmlserialize xmltable xmltype xor year year_to_month years yearweek",
                literal: "true false null",
                built_in: "array bigint binary bit blob boolean char character date dec decimal float int int8 integer interval number numeric real record serial serial8 smallint text varchar varying void"
            },
            c: [{
                cN: "string",
                b: "'",
                e: "'",
                c: [e.BE, {
                    b: "''"
                }]
            }, {
                cN: "string",
                b: '"',
                e: '"',
                c: [e.BE, {
                    b: '""'
                }]
            }, {
                cN: "string",
                b: "`",
                e: "`",
                c: [e.BE]
            }, e.CNM, e.CBCM, t]
        }, e.CBCM, t]
    }
}),
hljs.registerLanguage("stata", function(e) {
    return {
        aliases: ["do", "ado"],
        cI: !0,
        k: "if else in foreach for forv forva forval forvalu forvalue forvalues by bys bysort xi quietly qui capture about ac ac_7 acprplot acprplot_7 adjust ado adopath adoupdate alpha ameans an ano anov anova anova_estat anova_terms anovadef aorder ap app appe appen append arch arch_dr arch_estat arch_p archlm areg areg_p args arima arima_dr arima_estat arima_p as asmprobit asmprobit_estat asmprobit_lf asmprobit_mfx__dlg asmprobit_p ass asse asser assert avplot avplot_7 avplots avplots_7 bcskew0 bgodfrey binreg bip0_lf biplot bipp_lf bipr_lf bipr_p biprobit bitest bitesti bitowt blogit bmemsize boot bootsamp bootstrap bootstrap_8 boxco_l boxco_p boxcox boxcox_6 boxcox_p bprobit br break brier bro brow brows browse brr brrstat bs bs_7 bsampl_w bsample bsample_7 bsqreg bstat bstat_7 bstat_8 bstrap bstrap_7 ca ca_estat ca_p cabiplot camat canon canon_8 canon_8_p canon_estat canon_p cap caprojection capt captu captur capture cat cc cchart cchart_7 cci cd censobs_table centile cf char chdir checkdlgfiles checkestimationsample checkhlpfiles checksum chelp ci cii cl class classutil clear cli clis clist clo clog clog_lf clog_p clogi clogi_sw clogit clogit_lf clogit_p clogitp clogl_sw cloglog clonevar clslistarray cluster cluster_measures cluster_stop cluster_tree cluster_tree_8 clustermat cmdlog cnr cnre cnreg cnreg_p cnreg_sw cnsreg codebook collaps4 collapse colormult_nb colormult_nw compare compress conf confi confir confirm conren cons const constr constra constrai constrain constraint continue contract copy copyright copysource cor corc corr corr2data corr_anti corr_kmo corr_smc corre correl correla correlat correlate corrgram cou coun count cox cox_p cox_sw coxbase coxhaz coxvar cprplot cprplot_7 crc cret cretu cretur creturn cross cs cscript cscript_log csi ct ct_is ctset ctst_5 ctst_st cttost cumsp cumsp_7 cumul cusum cusum_7 cutil d datasig datasign datasigna datasignat datasignatu datasignatur datasignature datetof db dbeta de dec deco decod decode deff des desc descr descri describ describe destring dfbeta dfgls dfuller di di_g dir dirstats dis discard disp disp_res disp_s displ displa display distinct do doe doed doedi doedit dotplot dotplot_7 dprobit drawnorm drop ds ds_util dstdize duplicates durbina dwstat dydx e ed edi edit egen eivreg emdef en enc enco encod encode eq erase ereg ereg_lf ereg_p ereg_sw ereghet ereghet_glf ereghet_glf_sh ereghet_gp ereghet_ilf ereghet_ilf_sh ereghet_ip eret eretu eretur ereturn err erro error est est_cfexist est_cfname est_clickable est_expand est_hold est_table est_unhold est_unholdok estat estat_default estat_summ estat_vce_only esti estimates etodow etof etomdy ex exi exit expand expandcl fac fact facto factor factor_estat factor_p factor_pca_rotated factor_rotate factormat fcast fcast_compute fcast_graph fdades fdadesc fdadescr fdadescri fdadescrib fdadescribe fdasav fdasave fdause fh_st file open file read file close file filefilter fillin find_hlp_file findfile findit findit_7 fit fl fli flis flist for5_0 form forma format fpredict frac_154 frac_adj frac_chk frac_cox frac_ddp frac_dis frac_dv frac_in frac_mun frac_pp frac_pq frac_pv frac_wgt frac_xo fracgen fracplot fracplot_7 fracpoly fracpred fron_ex fron_hn fron_p fron_tn fron_tn2 frontier ftodate ftoe ftomdy ftowdate g gamhet_glf gamhet_gp gamhet_ilf gamhet_ip gamma gamma_d2 gamma_p gamma_sw gammahet gdi_hexagon gdi_spokes ge gen gene gener genera generat generate genrank genstd genvmean gettoken gl gladder gladder_7 glim_l01 glim_l02 glim_l03 glim_l04 glim_l05 glim_l06 glim_l07 glim_l08 glim_l09 glim_l10 glim_l11 glim_l12 glim_lf glim_mu glim_nw1 glim_nw2 glim_nw3 glim_p glim_v1 glim_v2 glim_v3 glim_v4 glim_v5 glim_v6 glim_v7 glm glm_6 glm_p glm_sw glmpred glo glob globa global glogit glogit_8 glogit_p gmeans gnbre_lf gnbreg gnbreg_5 gnbreg_p gomp_lf gompe_sw gomper_p gompertz gompertzhet gomphet_glf gomphet_glf_sh gomphet_gp gomphet_ilf gomphet_ilf_sh gomphet_ip gphdot gphpen gphprint gprefs gprobi_p gprobit gprobit_8 gr gr7 gr_copy gr_current gr_db gr_describe gr_dir gr_draw gr_draw_replay gr_drop gr_edit gr_editviewopts gr_example gr_example2 gr_export gr_print gr_qscheme gr_query gr_read gr_rename gr_replay gr_save gr_set gr_setscheme gr_table gr_undo gr_use graph graph7 grebar greigen greigen_7 greigen_8 grmeanby grmeanby_7 gs_fileinfo gs_filetype gs_graphinfo gs_stat gsort gwood h hadimvo hareg hausman haver he heck_d2 heckma_p heckman heckp_lf heckpr_p heckprob hel help hereg hetpr_lf hetpr_p hetprob hettest hexdump hilite hist hist_7 histogram hlogit hlu hmeans hotel hotelling hprobit hreg hsearch icd9 icd9_ff icd9p iis impute imtest inbase include inf infi infil infile infix inp inpu input ins insheet insp inspe inspec inspect integ inten intreg intreg_7 intreg_p intrg2_ll intrg_ll intrg_ll2 ipolate iqreg ir irf irf_create irfm iri is_svy is_svysum isid istdize ivprob_1_lf ivprob_lf ivprobit ivprobit_p ivreg ivreg_footnote ivtob_1_lf ivtob_lf ivtobit ivtobit_p jackknife jacknife jknife jknife_6 jknife_8 jkstat joinby kalarma1 kap kap_3 kapmeier kappa kapwgt kdensity kdensity_7 keep ksm ksmirnov ktau kwallis l la lab labe label labelbook ladder levels levelsof leverage lfit lfit_p li lincom line linktest lis list lloghet_glf lloghet_glf_sh lloghet_gp lloghet_ilf lloghet_ilf_sh lloghet_ip llogi_sw llogis_p llogist llogistic llogistichet lnorm_lf lnorm_sw lnorma_p lnormal lnormalhet lnormhet_glf lnormhet_glf_sh lnormhet_gp lnormhet_ilf lnormhet_ilf_sh lnormhet_ip lnskew0 loadingplot loc loca local log logi logis_lf logistic logistic_p logit logit_estat logit_p loglogs logrank loneway lookfor lookup lowess lowess_7 lpredict lrecomp lroc lroc_7 lrtest ls lsens lsens_7 lsens_x lstat ltable ltable_7 ltriang lv lvr2plot lvr2plot_7 m ma mac macr macro makecns man manova manova_estat manova_p manovatest mantel mark markin markout marksample mat mat_capp mat_order mat_put_rr mat_rapp mata mata_clear mata_describe mata_drop mata_matdescribe mata_matsave mata_matuse mata_memory mata_mlib mata_mosave mata_rename mata_which matalabel matcproc matlist matname matr matri matrix matrix_input__dlg matstrik mcc mcci md0_ md1_ md1debug_ md2_ md2debug_ mds mds_estat mds_p mdsconfig mdslong mdsmat mdsshepard mdytoe mdytof me_derd mean means median memory memsize meqparse mer merg merge mfp mfx mhelp mhodds minbound mixed_ll mixed_ll_reparm mkassert mkdir mkmat mkspline ml ml_5 ml_adjs ml_bhhhs ml_c_d ml_check ml_clear ml_cnt ml_debug ml_defd ml_e0 ml_e0_bfgs ml_e0_cycle ml_e0_dfp ml_e0i ml_e1 ml_e1_bfgs ml_e1_bhhh ml_e1_cycle ml_e1_dfp ml_e2 ml_e2_cycle ml_ebfg0 ml_ebfr0 ml_ebfr1 ml_ebh0q ml_ebhh0 ml_ebhr0 ml_ebr0i ml_ecr0i ml_edfp0 ml_edfr0 ml_edfr1 ml_edr0i ml_eds ml_eer0i ml_egr0i ml_elf ml_elf_bfgs ml_elf_bhhh ml_elf_cycle ml_elf_dfp ml_elfi ml_elfs ml_enr0i ml_enrr0 ml_erdu0 ml_erdu0_bfgs ml_erdu0_bhhh ml_erdu0_bhhhq ml_erdu0_cycle ml_erdu0_dfp ml_erdu0_nrbfgs ml_exde ml_footnote ml_geqnr ml_grad0 ml_graph ml_hbhhh ml_hd0 ml_hold ml_init ml_inv ml_log ml_max ml_mlout ml_mlout_8 ml_model ml_nb0 ml_opt ml_p ml_plot ml_query ml_rdgrd ml_repor ml_s_e ml_score ml_searc ml_technique ml_unhold mleval mlf_ mlmatbysum mlmatsum mlog mlogi mlogit mlogit_footnote mlogit_p mlopts mlsum mlvecsum mnl0_ mor more mov move mprobit mprobit_lf mprobit_p mrdu0_ mrdu1_ mvdecode mvencode mvreg mvreg_estat n nbreg nbreg_al nbreg_lf nbreg_p nbreg_sw nestreg net newey newey_7 newey_p news nl nl_7 nl_9 nl_9_p nl_p nl_p_7 nlcom nlcom_p nlexp2 nlexp2_7 nlexp2a nlexp2a_7 nlexp3 nlexp3_7 nlgom3 nlgom3_7 nlgom4 nlgom4_7 nlinit nllog3 nllog3_7 nllog4 nllog4_7 nlog_rd nlogit nlogit_p nlogitgen nlogittree nlpred no nobreak noi nois noisi noisil noisily note notes notes_dlg nptrend numlabel numlist odbc old_ver olo olog ologi ologi_sw ologit ologit_p ologitp on one onew onewa oneway op_colnm op_comp op_diff op_inv op_str opr opro oprob oprob_sw oprobi oprobi_p oprobit oprobitp opts_exclusive order orthog orthpoly ou out outf outfi outfil outfile outs outsh outshe outshee outsheet ovtest pac pac_7 palette parse parse_dissim pause pca pca_8 pca_display pca_estat pca_p pca_rotate pcamat pchart pchart_7 pchi pchi_7 pcorr pctile pentium pergram pergram_7 permute permute_8 personal peto_st pkcollapse pkcross pkequiv pkexamine pkexamine_7 pkshape pksumm pksumm_7 pl plo plot plugin pnorm pnorm_7 poisgof poiss_lf poiss_sw poisso_p poisson poisson_estat post postclose postfile postutil pperron pr prais prais_e prais_e2 prais_p predict predictnl preserve print pro prob probi probit probit_estat probit_p proc_time procoverlay procrustes procrustes_estat procrustes_p profiler prog progr progra program prop proportion prtest prtesti pwcorr pwd q\\s qby qbys qchi qchi_7 qladder qladder_7 qnorm qnorm_7 qqplot qqplot_7 qreg qreg_c qreg_p qreg_sw qu quadchk quantile quantile_7 que quer query range ranksum ratio rchart rchart_7 rcof recast reclink recode reg reg3 reg3_p regdw regr regre regre_p2 regres regres_p regress regress_estat regriv_p remap ren rena renam rename renpfix repeat replace report reshape restore ret retu retur return rm rmdir robvar roccomp roccomp_7 roccomp_8 rocf_lf rocfit rocfit_8 rocgold rocplot rocplot_7 roctab roctab_7 rolling rologit rologit_p rot rota rotat rotate rotatemat rreg rreg_p ru run runtest rvfplot rvfplot_7 rvpplot rvpplot_7 sa safesum sample sampsi sav save savedresults saveold sc sca scal scala scalar scatter scm_mine sco scob_lf scob_p scobi_sw scobit scor score scoreplot scoreplot_help scree screeplot screeplot_help sdtest sdtesti se search separate seperate serrbar serrbar_7 serset set set_defaults sfrancia sh she shel shell shewhart shewhart_7 signestimationsample signrank signtest simul simul_7 simulate simulate_8 sktest sleep slogit slogit_d2 slogit_p smooth snapspan so sor sort spearman spikeplot spikeplot_7 spikeplt spline_x split sqreg sqreg_p sret sretu sretur sreturn ssc st st_ct st_hc st_hcd st_hcd_sh st_is st_issys st_note st_promo st_set st_show st_smpl st_subid stack statsby statsby_8 stbase stci stci_7 stcox stcox_estat stcox_fr stcox_fr_ll stcox_p stcox_sw stcoxkm stcoxkm_7 stcstat stcurv stcurve stcurve_7 stdes stem stepwise stereg stfill stgen stir stjoin stmc stmh stphplot stphplot_7 stphtest stphtest_7 stptime strate strate_7 streg streg_sw streset sts sts_7 stset stsplit stsum sttocc sttoct stvary stweib su suest suest_8 sum summ summa summar summari summariz summarize sunflower sureg survcurv survsum svar svar_p svmat svy svy_disp svy_dreg svy_est svy_est_7 svy_estat svy_get svy_gnbreg_p svy_head svy_header svy_heckman_p svy_heckprob_p svy_intreg_p svy_ivreg_p svy_logistic_p svy_logit_p svy_mlogit_p svy_nbreg_p svy_ologit_p svy_oprobit_p svy_poisson_p svy_probit_p svy_regress_p svy_sub svy_sub_7 svy_x svy_x_7 svy_x_p svydes svydes_8 svygen svygnbreg svyheckman svyheckprob svyintreg svyintreg_7 svyintrg svyivreg svylc svylog_p svylogit svymarkout svymarkout_8 svymean svymlog svymlogit svynbreg svyolog svyologit svyoprob svyoprobit svyopts svypois svypois_7 svypoisson svyprobit svyprobt svyprop svyprop_7 svyratio svyreg svyreg_p svyregress svyset svyset_7 svyset_8 svytab svytab_7 svytest svytotal sw sw_8 swcnreg swcox swereg swilk swlogis swlogit swologit swoprbt swpois swprobit swqreg swtobit swweib symmetry symmi symplot symplot_7 syntax sysdescribe sysdir sysuse szroeter ta tab tab1 tab2 tab_or tabd tabdi tabdis tabdisp tabi table tabodds tabodds_7 tabstat tabu tabul tabula tabulat tabulate te tempfile tempname tempvar tes test testnl testparm teststd tetrachoric time_it timer tis tob tobi tobit tobit_p tobit_sw token tokeni tokeniz tokenize tostring total translate translator transmap treat_ll treatr_p treatreg trim trnb_cons trnb_mean trpoiss_d2 trunc_ll truncr_p truncreg tsappend tset tsfill tsline tsline_ex tsreport tsrevar tsrline tsset tssmooth tsunab ttest ttesti tut_chk tut_wait tutorial tw tware_st two twoway twoway__fpfit_serset twoway__function_gen twoway__histogram_gen twoway__ipoint_serset twoway__ipoints_serset twoway__kdensity_gen twoway__lfit_serset twoway__normgen_gen twoway__pci_serset twoway__qfit_serset twoway__scatteri_serset twoway__sunflower_gen twoway_ksm_serset ty typ type typeof u unab unabbrev unabcmd update us use uselabel var var_mkcompanion var_p varbasic varfcast vargranger varirf varirf_add varirf_cgraph varirf_create varirf_ctable varirf_describe varirf_dir varirf_drop varirf_erase varirf_graph varirf_ograph varirf_rename varirf_set varirf_table varlist varlmar varnorm varsoc varstable varstable_w varstable_w2 varwle vce vec vec_fevd vec_mkphi vec_p vec_p_w vecirf_create veclmar veclmar_w vecnorm vecnorm_w vecrank vecstable verinst vers versi versio version view viewsource vif vwls wdatetof webdescribe webseek webuse weib1_lf weib2_lf weib_lf weib_lf0 weibhet_glf weibhet_glf_sh weibhet_glfa weibhet_glfa_sh weibhet_gp weibhet_ilf weibhet_ilf_sh weibhet_ilfa weibhet_ilfa_sh weibhet_ip weibu_sw weibul_p weibull weibull_c weibull_s weibullhet wh whelp whi which whil while wilc_st wilcoxon win wind windo window winexec wntestb wntestb_7 wntestq xchart xchart_7 xcorr xcorr_7 xi xi_6 xmlsav xmlsave xmluse xpose xsh xshe xshel xshell xt_iis xt_tis xtab_p xtabond xtbin_p xtclog xtcloglog xtcloglog_8 xtcloglog_d2 xtcloglog_pa_p xtcloglog_re_p xtcnt_p xtcorr xtdata xtdes xtfront_p xtfrontier xtgee xtgee_elink xtgee_estat xtgee_makeivar xtgee_p xtgee_plink xtgls xtgls_p xthaus xthausman xtht_p xthtaylor xtile xtint_p xtintreg xtintreg_8 xtintreg_d2 xtintreg_p xtivp_1 xtivp_2 xtivreg xtline xtline_ex xtlogit xtlogit_8 xtlogit_d2 xtlogit_fe_p xtlogit_pa_p xtlogit_re_p xtmixed xtmixed_estat xtmixed_p xtnb_fe xtnb_lf xtnbreg xtnbreg_pa_p xtnbreg_refe_p xtpcse xtpcse_p xtpois xtpoisson xtpoisson_d2 xtpoisson_pa_p xtpoisson_refe_p xtpred xtprobit xtprobit_8 xtprobit_d2 xtprobit_re_p xtps_fe xtps_lf xtps_ren xtps_ren_8 xtrar_p xtrc xtrc_p xtrchh xtrefe_p xtreg xtreg_be xtreg_fe xtreg_ml xtreg_pa_p xtreg_re xtregar xtrere_p xtset xtsf_ll xtsf_llti xtsum xttab xttest0 xttobit xttobit_8 xttobit_p xttrans yx yxview__barlike_draw yxview_area_draw yxview_bar_draw yxview_dot_draw yxview_dropline_draw yxview_function_draw yxview_iarrow_draw yxview_ilabels_draw yxview_normal_draw yxview_pcarrow_draw yxview_pcbarrow_draw yxview_pccapsym_draw yxview_pcscatter_draw yxview_pcspike_draw yxview_rarea_draw yxview_rbar_draw yxview_rbarm_draw yxview_rcap_draw yxview_rcapsym_draw yxview_rconnected_draw yxview_rline_draw yxview_rscatter_draw yxview_rspike_draw yxview_spike_draw yxview_sunflower_draw zap_s zinb zinb_llf zinb_plf zip zip_llf zip_p zip_plf zt_ct_5 zt_hc_5 zt_hcd_5 zt_is_5 zt_iss_5 zt_sho_5 zt_smp_5 ztbase_5 ztcox_5 ztdes_5 ztereg_5 ztfill_5 ztgen_5 ztir_5 ztjoin_5 ztnb ztnb_p ztp ztp_p zts_5 ztset_5 ztspli_5 ztsum_5 zttoct_5 ztvary_5 ztweib_5",
        c: [{
            cN: "symbol",
            b: /`[a-zA-Z0-9_]+'/
        }, {
            cN: "variable",
            b: /\$\{?[a-zA-Z0-9_]+\}?/
        }, {
            cN: "string",
            v: [{
                b: '`"[^\r\n]*?"\''
            }, {
                b: '"[^\r\n"]*"'
            }]
        }, {
            cN: "built_in",
            v: [{
                b: "\\b(abs|acos|asin|atan|atan2|atanh|ceil|cloglog|comb|cos|digamma|exp|floor|invcloglog|invlogit|ln|lnfact|lnfactorial|lngamma|log|log10|max|min|mod|reldif|round|sign|sin|sqrt|sum|tan|tanh|trigamma|trunc|betaden|Binomial|binorm|binormal|chi2|chi2tail|dgammapda|dgammapdada|dgammapdadx|dgammapdx|dgammapdxdx|F|Fden|Ftail|gammaden|gammap|ibeta|invbinomial|invchi2|invchi2tail|invF|invFtail|invgammap|invibeta|invnchi2|invnFtail|invnibeta|invnorm|invnormal|invttail|nbetaden|nchi2|nFden|nFtail|nibeta|norm|normal|normalden|normd|npnchi2|tden|ttail|uniform|abbrev|char|index|indexnot|length|lower|ltrim|match|plural|proper|real|regexm|regexr|regexs|reverse|rtrim|string|strlen|strlower|strltrim|strmatch|strofreal|strpos|strproper|strreverse|strrtrim|strtrim|strupper|subinstr|subinword|substr|trim|upper|word|wordcount|_caller|autocode|byteorder|chop|clip|cond|e|epsdouble|epsfloat|group|inlist|inrange|irecode|matrix|maxbyte|maxdouble|maxfloat|maxint|maxlong|mi|minbyte|mindouble|minfloat|minint|minlong|missing|r|recode|replay|return|s|scalar|d|date|day|dow|doy|halfyear|mdy|month|quarter|week|year|d|daily|dofd|dofh|dofm|dofq|dofw|dofy|h|halfyearly|hofd|m|mofd|monthly|q|qofd|quarterly|tin|twithin|w|weekly|wofd|y|yearly|yh|ym|yofd|yq|yw|cholesky|colnumb|colsof|corr|det|diag|diag0cnt|el|get|hadamard|I|inv|invsym|issym|issymmetric|J|matmissing|matuniform|mreldif|nullmat|rownumb|rowsof|sweep|syminv|trace|vec|vecdiag)(?=\\(|$)"
            }]
        }, e.C("^[ \t]*\\*.*$", !1), e.CLCM, e.CBCM]
    }
}),
hljs.registerLanguage("rust", function(e) {
    var t = "([uif](8|16|32|64|size))?"
      , r = e.inherit(e.CBCM);
    r.c.push("self");
    var i = "Copy Send Sized Sync Drop Fn FnMut FnOnce drop Box ToOwned Clone PartialEq PartialOrd Eq Ord AsRef AsMut Into From Default Iterator Extend IntoIterator DoubleEndedIterator ExactSizeIterator Option Result SliceConcatExt String ToString Vec assert! assert_eq! bitflags! bytes! cfg! col! concat! concat_idents! debug_assert! debug_assert_eq! env! panic! file! format! format_args! include_bin! include_str! line! local_data_key! module_path! option_env! print! println! select! stringify! try! unimplemented! unreachable! vec! write! writeln!";
    return {
        aliases: ["rs"],
        k: {
            keyword: "alignof as be box break const continue crate do else enum extern false fn for if impl in let loop match mod mut offsetof once priv proc pub pure ref return self Self sizeof static struct super trait true type typeof unsafe unsized use virtual while where yield int i8 i16 i32 i64 uint u8 u32 u64 float f32 f64 str char bool",
            literal: "true false Some None Ok Err",
            built_in: i
        },
        l: e.IR + "!?",
        i: "</",
        c: [e.CLCM, r, e.inherit(e.QSM, {
            b: /b?"/,
            i: null
        }), {
            cN: "string",
            v: [{
                b: /r(#*)".*?"\1(?!#)/
            }, {
                b: /b?'\\?(x\w{2}|u\w{4}|U\w{8}|.)'/
            }]
        }, {
            cN: "symbol",
            b: /'[a-zA-Z_][a-zA-Z0-9_]*/
        }, {
            cN: "number",
            v: [{
                b: "\\b0b([01_]+)" + t
            }, {
                b: "\\b0o([0-7_]+)" + t
            }, {
                b: "\\b0x([A-Fa-f0-9_]+)" + t
            }, {
                b: "\\b(\\d[\\d_]*(\\.[0-9_]+)?([eE][+-]?[0-9_]+)?)" + t
            }],
            r: 0
        }, {
            cN: "function",
            bK: "fn",
            e: "(\\(|<)",
            eE: !0,
            c: [e.UTM]
        }, {
            cN: "meta",
            b: "#\\!?\\[",
            e: "\\]",
            c: [{
                cN: "meta-string",
                b: /"/,
                e: /"/
            }]
        }, {
            cN: "class",
            bK: "type",
            e: "(=|<)",
            c: [e.UTM],
            i: "\\S"
        }, {
            cN: "class",
            bK: "trait enum struct",
            e: "{",
            c: [e.inherit(e.UTM, {
                endsParent: !0
            })],
            i: "[\\w\\d]"
        }, {
            b: e.IR + "::",
            k: {
                built_in: i
            }
        }, {
            b: "->"
        }]
    }
}),
hljs.registerLanguage("gams", function(e) {
    return {
        aliases: ["gms"],
        cI: !0,
        k: "abort acronym acronyms alias all and assign binary card diag display else1 eps eq equation equations file files for1 free ge gt if inf integer le loop lt maximizing minimizing model models na ne negative no not option options or ord parameter parameters positive prod putpage puttl repeat sameas scalar scalars semicont semiint set1 sets smax smin solve sos1 sos2 sum system table then until using variable variables while1 xor yes",
        c: [{
            bK: "sets parameters variables equations",
            e: ";",
            c: [{
                b: "/",
                e: "/",
                c: [e.NM]
            }]
        }, {
            cN: "string",
            b: "\\*{3}",
            e: "\\*{3}"
        }, e.NM, {
            cN: "number",
            b: "\\$[a-zA-Z0-9]+"
        }]
    }
});
