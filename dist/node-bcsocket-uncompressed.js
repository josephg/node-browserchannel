(function(){
function f(a) {
  throw a;
}
var h = void 0, j = !0, k = null, n = !1;
function q() {
  return function() {
  }
}
function s(a) {
  return function(b) {
    this[a] = b
  }
}
function aa(a) {
  return function() {
    return this[a]
  }
}
function ba(a) {
  return function() {
    return a
  }
}
var t, ca = ca || {}, u = this;
function da(a) {
  for(var a = a.split("."), b = u, c;c = a.shift();) {
    if(b[c] != k) {
      b = b[c]
    }else {
      return k
    }
  }
  return b
}
function ea() {
}
function fa(a) {
  var b = typeof a;
  if("object" == b) {
    if(a) {
      if(a instanceof Array) {
        return"array"
      }
      if(a instanceof Object) {
        return b
      }
      var c = Object.prototype.toString.call(a);
      if("[object Window]" == c) {
        return"object"
      }
      if("[object Array]" == c || "number" == typeof a.length && "undefined" != typeof a.splice && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("splice")) {
        return"array"
      }
      if("[object Function]" == c || "undefined" != typeof a.call && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("call")) {
        return"function"
      }
    }else {
      return"null"
    }
  }else {
    if("function" == b && "undefined" == typeof a.call) {
      return"object"
    }
  }
  return b
}
function v(a) {
  return"array" == fa(a)
}
function ga(a) {
  var b = fa(a);
  return"array" == b || "object" == b && "number" == typeof a.length
}
function x(a) {
  return"string" == typeof a
}
function ha(a) {
  return"function" == fa(a)
}
function y(a) {
  return a[ia] || (a[ia] = ++ja)
}
var ia = "closure_uid_" + Math.floor(2147483648 * Math.random()).toString(36), ja = 0;
function ka(a, b, c) {
  return a.call.apply(a.bind, arguments)
}
function la(a, b, c) {
  a || f(Error());
  if(2 < arguments.length) {
    var d = Array.prototype.slice.call(arguments, 2);
    return function() {
      var c = Array.prototype.slice.call(arguments);
      Array.prototype.unshift.apply(c, d);
      return a.apply(b, c)
    }
  }
  return function() {
    return a.apply(b, arguments)
  }
}
function z(a, b, c) {
  z = Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? ka : la;
  return z.apply(k, arguments)
}
var A = Date.now || function() {
  return+new Date
};
function B(a, b) {
  function c() {
  }
  c.prototype = b.prototype;
  a.oa = b.prototype;
  a.prototype = new c
}
;function ma(a, b) {
  for(var c = 1;c < arguments.length;c++) {
    var d = String(arguments[c]).replace(/\$/g, "$$$$"), a = a.replace(/\%s/, d)
  }
  return a
}
function na(a) {
  if(!oa.test(a)) {
    return a
  }
  -1 != a.indexOf("&") && (a = a.replace(pa, "&amp;"));
  -1 != a.indexOf("<") && (a = a.replace(qa, "&lt;"));
  -1 != a.indexOf(">") && (a = a.replace(ra, "&gt;"));
  -1 != a.indexOf('"') && (a = a.replace(sa, "&quot;"));
  return a
}
var pa = /&/g, qa = /</g, ra = />/g, sa = /\"/g, oa = /[&<>\"]/;
var ta, ua, va, wa;
function xa() {
  return u.navigator ? u.navigator.userAgent : k
}
wa = va = ua = ta = n;
var ya;
if(ya = xa()) {
  var Aa = u.navigator;
  ta = 0 == ya.indexOf("Opera");
  ua = !ta && -1 != ya.indexOf("MSIE");
  va = !ta && -1 != ya.indexOf("WebKit");
  wa = !ta && !va && "Gecko" == Aa.product
}
var Ba = ta, C = ua, Ca = wa, D = va, Da = u.navigator, Ea = -1 != (Da && Da.platform || "").indexOf("Mac");
function Fa() {
  var a = u.document;
  return a ? a.documentMode : h
}
var Ga;
a: {
  var Ha = "", Ia;
  if(Ba && u.opera) {
    var Ja = u.opera.version, Ha = "function" == typeof Ja ? Ja() : Ja
  }else {
    if(Ca ? Ia = /rv\:([^\);]+)(\)|;)/ : C ? Ia = /MSIE\s+([^\);]+)(\)|;)/ : D && (Ia = /WebKit\/(\S+)/), Ia) {
      var Ka = Ia.exec(xa()), Ha = Ka ? Ka[1] : ""
    }
  }
  if(C) {
    var La = Fa();
    if(La > parseFloat(Ha)) {
      Ga = String(La);
      break a
    }
  }
  Ga = Ha
}
var Ma = {};
function E(a) {
  var b;
  if(!(b = Ma[a])) {
    b = 0;
    for(var c = String(Ga).replace(/^[\s\xa0]+|[\s\xa0]+$/g, "").split("."), d = String(a).replace(/^[\s\xa0]+|[\s\xa0]+$/g, "").split("."), e = Math.max(c.length, d.length), g = 0;0 == b && g < e;g++) {
      var i = c[g] || "", m = d[g] || "", l = RegExp("(\\d*)(\\D*)", "g"), p = RegExp("(\\d*)(\\D*)", "g");
      do {
        var r = l.exec(i) || ["", "", ""], w = p.exec(m) || ["", "", ""];
        if(0 == r[0].length && 0 == w[0].length) {
          break
        }
        b = ((0 == r[1].length ? 0 : parseInt(r[1], 10)) < (0 == w[1].length ? 0 : parseInt(w[1], 10)) ? -1 : (0 == r[1].length ? 0 : parseInt(r[1], 10)) > (0 == w[1].length ? 0 : parseInt(w[1], 10)) ? 1 : 0) || ((0 == r[2].length) < (0 == w[2].length) ? -1 : (0 == r[2].length) > (0 == w[2].length) ? 1 : 0) || (r[2] < w[2] ? -1 : r[2] > w[2] ? 1 : 0)
      }while(0 == b)
    }
    b = Ma[a] = 0 <= b
  }
  return b
}
var Na = u.document, Oa = !Na || !C ? h : Fa() || ("CSS1Compat" == Na.compatMode ? parseInt(Ga, 10) : 5);
function Pa(a) {
  Error.captureStackTrace ? Error.captureStackTrace(this, Pa) : this.stack = Error().stack || "";
  a && (this.message = String(a))
}
B(Pa, Error);
Pa.prototype.name = "CustomError";
function Qa(a, b) {
  b.unshift(a);
  Pa.call(this, ma.apply(k, b));
  b.shift();
  this.Jc = a
}
B(Qa, Pa);
Qa.prototype.name = "AssertionError";
function Ra(a, b) {
  f(new Qa("Failure" + (a ? ": " + a : ""), Array.prototype.slice.call(arguments, 1)))
}
;var Sa = RegExp("^(?:([^:/?#.]+):)?(?://(?:([^/?#]*)@)?([^/#?]*?)(?::([0-9]+))?(?=[/#?]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#(.*))?$");
function Ta(a) {
  var b = [], c = 0, d;
  for(d in a) {
    b[c++] = a[d]
  }
  return b
}
function Ua(a) {
  var b = [], c = 0, d;
  for(d in a) {
    b[c++] = d
  }
  return b
}
var Va = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");
function Wa(a, b) {
  for(var c, d, e = 1;e < arguments.length;e++) {
    d = arguments[e];
    for(c in d) {
      a[c] = d[c]
    }
    for(var g = 0;g < Va.length;g++) {
      c = Va[g], Object.prototype.hasOwnProperty.call(d, c) && (a[c] = d[c])
    }
  }
}
;var F = Array.prototype, Xa = F.indexOf ? function(a, b, c) {
  return F.indexOf.call(a, b, c)
} : function(a, b, c) {
  c = c == k ? 0 : 0 > c ? Math.max(0, a.length + c) : c;
  if(x(a)) {
    return!x(b) || 1 != b.length ? -1 : a.indexOf(b, c)
  }
  for(;c < a.length;c++) {
    if(c in a && a[c] === b) {
      return c
    }
  }
  return-1
}, Ya = F.forEach ? function(a, b, c) {
  F.forEach.call(a, b, c)
} : function(a, b, c) {
  for(var d = a.length, e = x(a) ? a.split("") : a, g = 0;g < d;g++) {
    g in e && b.call(c, e[g], g, a)
  }
};
function Za(a) {
  return F.concat.apply(F, arguments)
}
function $a(a) {
  var b = a.length;
  if(0 < b) {
    for(var c = Array(b), d = 0;d < b;d++) {
      c[d] = a[d]
    }
    return c
  }
  return[]
}
;function ab(a) {
  if("function" == typeof a.L) {
    return a.L()
  }
  if(x(a)) {
    return a.split("")
  }
  if(ga(a)) {
    for(var b = [], c = a.length, d = 0;d < c;d++) {
      b.push(a[d])
    }
    return b
  }
  return Ta(a)
}
function bb(a, b, c) {
  if("function" == typeof a.forEach) {
    a.forEach(b, c)
  }else {
    if(ga(a) || x(a)) {
      Ya(a, b, c)
    }else {
      var d;
      if("function" == typeof a.ga) {
        d = a.ga()
      }else {
        if("function" != typeof a.L) {
          if(ga(a) || x(a)) {
            d = [];
            for(var e = a.length, g = 0;g < e;g++) {
              d.push(g)
            }
          }else {
            d = Ua(a)
          }
        }else {
          d = h
        }
      }
      for(var e = ab(a), g = e.length, i = 0;i < g;i++) {
        b.call(c, e[i], d && d[i], a)
      }
    }
  }
}
;function cb(a, b) {
  this.N = {};
  this.j = [];
  var c = arguments.length;
  if(1 < c) {
    c % 2 && f(Error("Uneven number of arguments"));
    for(var d = 0;d < c;d += 2) {
      this.set(arguments[d], arguments[d + 1])
    }
  }else {
    if(a) {
      a instanceof cb ? (c = a.ga(), d = a.L()) : (c = Ua(a), d = Ta(a));
      for(var e = 0;e < c.length;e++) {
        this.set(c[e], d[e])
      }
    }
  }
}
t = cb.prototype;
t.f = 0;
t.ac = 0;
t.L = function() {
  db(this);
  for(var a = [], b = 0;b < this.j.length;b++) {
    a.push(this.N[this.j[b]])
  }
  return a
};
t.ga = function() {
  db(this);
  return this.j.concat()
};
t.ea = function(a) {
  return eb(this.N, a)
};
t.remove = function(a) {
  return eb(this.N, a) ? (delete this.N[a], this.f--, this.ac++, this.j.length > 2 * this.f && db(this), j) : n
};
function db(a) {
  if(a.f != a.j.length) {
    for(var b = 0, c = 0;b < a.j.length;) {
      var d = a.j[b];
      eb(a.N, d) && (a.j[c++] = d);
      b++
    }
    a.j.length = c
  }
  if(a.f != a.j.length) {
    for(var e = {}, c = b = 0;b < a.j.length;) {
      d = a.j[b], eb(e, d) || (a.j[c++] = d, e[d] = 1), b++
    }
    a.j.length = c
  }
}
t.get = function(a, b) {
  return eb(this.N, a) ? this.N[a] : b
};
t.set = function(a, b) {
  eb(this.N, a) || (this.f++, this.j.push(a), this.ac++);
  this.N[a] = b
};
t.n = function() {
  return new cb(this)
};
function eb(a, b) {
  return Object.prototype.hasOwnProperty.call(a, b)
}
;function H(a, b) {
  var c;
  if(a instanceof H) {
    this.A = b !== h ? b : a.A, fb(this, a.na), c = a.Ya, I(this), this.Ya = c, gb(this, a.fa), hb(this, a.za), ib(this, a.G), jb(this, a.Q.n()), c = a.Ka, I(this), this.Ka = c
  }else {
    if(a && (c = String(a).match(Sa))) {
      this.A = !!b;
      fb(this, c[1] || "", j);
      var d = c[2] || "";
      I(this);
      this.Ya = d ? decodeURIComponent(d) : "";
      gb(this, c[3] || "", j);
      hb(this, c[4]);
      ib(this, c[5] || "", j);
      jb(this, c[6] || "", j);
      c = c[7] || "";
      I(this);
      this.Ka = c ? decodeURIComponent(c) : ""
    }else {
      this.A = !!b, this.Q = new kb(k, 0, this.A)
    }
  }
}
t = H.prototype;
t.na = "";
t.Ya = "";
t.fa = "";
t.za = k;
t.G = "";
t.Ka = "";
t.mc = n;
t.A = n;
t.toString = function() {
  var a = [], b = this.na;
  b && a.push(lb(b, mb), ":");
  if(b = this.fa) {
    a.push("//");
    var c = this.Ya;
    c && a.push(lb(c, mb), "@");
    a.push(encodeURIComponent(String(b)));
    b = this.za;
    b != k && a.push(":", String(b))
  }
  if(b = this.G) {
    this.fa && "/" != b.charAt(0) && a.push("/"), a.push(lb(b, "/" == b.charAt(0) ? nb : ob))
  }
  (b = this.Q.toString()) && a.push("?", b);
  (b = this.Ka) && a.push("#", lb(b, pb));
  return a.join("")
};
t.n = function() {
  return new H(this)
};
function fb(a, b, c) {
  I(a);
  a.na = c ? b ? decodeURIComponent(b) : "" : b;
  a.na && (a.na = a.na.replace(/:$/, ""))
}
function gb(a, b, c) {
  I(a);
  a.fa = c ? b ? decodeURIComponent(b) : "" : b
}
function hb(a, b) {
  I(a);
  b ? (b = Number(b), (isNaN(b) || 0 > b) && f(Error("Bad port number " + b)), a.za = b) : a.za = k
}
function ib(a, b, c) {
  I(a);
  a.G = c ? b ? decodeURIComponent(b) : "" : b
}
function jb(a, b, c) {
  I(a);
  b instanceof kb ? (a.Q = b, a.Q.nb(a.A)) : (c || (b = lb(b, qb)), a.Q = new kb(b, 0, a.A))
}
function J(a, b, c) {
  I(a);
  a.Q.set(b, c)
}
function rb(a, b, c) {
  I(a);
  v(c) || (c = [String(c)]);
  sb(a.Q, b, c)
}
function K(a) {
  I(a);
  J(a, "zx", Math.floor(2147483648 * Math.random()).toString(36) + Math.abs(Math.floor(2147483648 * Math.random()) ^ A()).toString(36));
  return a
}
function I(a) {
  a.mc && f(Error("Tried to modify a read-only Uri"))
}
t.nb = function(a) {
  this.A = a;
  this.Q && this.Q.nb(a);
  return this
};
function lb(a, b) {
  return x(a) ? encodeURI(a).replace(b, tb) : k
}
function tb(a) {
  a = a.charCodeAt(0);
  return"%" + (a >> 4 & 15).toString(16) + (a & 15).toString(16)
}
var mb = /[#\/\?@]/g, ob = /[\#\?:]/g, nb = /[\#\?]/g, qb = /[\#\?@]/g, pb = /#/g;
function kb(a, b, c) {
  this.z = a || k;
  this.A = !!c
}
function L(a) {
  if(!a.i && (a.i = new cb, a.f = 0, a.z)) {
    for(var b = a.z.split("&"), c = 0;c < b.length;c++) {
      var d = b[c].indexOf("="), e = k, g = k;
      0 <= d ? (e = b[c].substring(0, d), g = b[c].substring(d + 1)) : e = b[c];
      e = decodeURIComponent(e.replace(/\+/g, " "));
      e = M(a, e);
      a.add(e, g ? decodeURIComponent(g.replace(/\+/g, " ")) : "")
    }
  }
}
t = kb.prototype;
t.i = k;
t.f = k;
t.add = function(a, b) {
  L(this);
  this.z = k;
  var a = M(this, a), c = this.i.get(a);
  c || this.i.set(a, c = []);
  c.push(b);
  this.f++;
  return this
};
t.remove = function(a) {
  L(this);
  a = M(this, a);
  return this.i.ea(a) ? (this.z = k, this.f -= this.i.get(a).length, this.i.remove(a)) : n
};
t.ea = function(a) {
  L(this);
  a = M(this, a);
  return this.i.ea(a)
};
t.ga = function() {
  L(this);
  for(var a = this.i.L(), b = this.i.ga(), c = [], d = 0;d < b.length;d++) {
    for(var e = a[d], g = 0;g < e.length;g++) {
      c.push(b[d])
    }
  }
  return c
};
t.L = function(a) {
  L(this);
  var b = [];
  if(a) {
    this.ea(a) && (b = Za(b, this.i.get(M(this, a))))
  }else {
    for(var a = this.i.L(), c = 0;c < a.length;c++) {
      b = Za(b, a[c])
    }
  }
  return b
};
t.set = function(a, b) {
  L(this);
  this.z = k;
  a = M(this, a);
  this.ea(a) && (this.f -= this.i.get(a).length);
  this.i.set(a, [b]);
  this.f++;
  return this
};
t.get = function(a, b) {
  var c = a ? this.L(a) : [];
  return 0 < c.length ? String(c[0]) : b
};
function sb(a, b, c) {
  a.remove(b);
  0 < c.length && (a.z = k, a.i.set(M(a, b), $a(c)), a.f += c.length)
}
t.toString = function() {
  if(this.z) {
    return this.z
  }
  if(!this.i) {
    return""
  }
  for(var a = [], b = this.i.ga(), c = 0;c < b.length;c++) {
    for(var d = b[c], e = encodeURIComponent(String(d)), d = this.L(d), g = 0;g < d.length;g++) {
      var i = e;
      "" !== d[g] && (i += "=" + encodeURIComponent(String(d[g])));
      a.push(i)
    }
  }
  return this.z = a.join("&")
};
t.n = function() {
  var a = new kb;
  a.z = this.z;
  this.i && (a.i = this.i.n(), a.f = this.f);
  return a
};
function M(a, b) {
  var c = String(b);
  a.A && (c = c.toLowerCase());
  return c
}
t.nb = function(a) {
  a && !this.A && (L(this), this.z = k, bb(this.i, function(a, c) {
    var d = c.toLowerCase();
    c != d && (this.remove(c), sb(this, d, a))
  }, this));
  this.A = a
};
function ub() {
}
ub.prototype.Ea = k;
var vb;
function wb() {
}
B(wb, ub);
function xb(a) {
  return(a = yb(a)) ? new ActiveXObject(a) : new XMLHttpRequest
}
function zb(a) {
  var b = {};
  yb(a) && (b[0] = j, b[1] = j);
  return b
}
function yb(a) {
  if(!a.Fb && "undefined" == typeof XMLHttpRequest && "undefined" != typeof ActiveXObject) {
    for(var b = ["MSXML2.XMLHTTP.6.0", "MSXML2.XMLHTTP.3.0", "MSXML2.XMLHTTP", "Microsoft.XMLHTTP"], c = 0;c < b.length;c++) {
      var d = b[c];
      try {
        return new ActiveXObject(d), a.Fb = d
      }catch(e) {
      }
    }
    f(Error("Could not create ActiveXObject. ActiveX might be disabled, or MSXML might not be installed"))
  }
  return a.Fb
}
vb = new wb;
function Ab() {
}
var Bb = 0;
t = Ab.prototype;
t.key = 0;
t.la = n;
t.tb = n;
t.Ma = function(a, b, c, d, e, g) {
  ha(a) ? this.Hb = j : a && a.handleEvent && ha(a.handleEvent) ? this.Hb = n : f(Error("Invalid listener argument"));
  this.xa = a;
  this.Tb = b;
  this.src = c;
  this.type = d;
  this.capture = !!e;
  this.ib = g;
  this.tb = n;
  this.key = ++Bb;
  this.la = n
};
t.handleEvent = function(a) {
  return this.Hb ? this.xa.call(this.ib || this.src, a) : this.xa.handleEvent.call(this.xa, a)
};
var Cb = !C || C && 9 <= Oa, Db = C && !E("9");
!D || E("528");
Ca && E("1.9b") || C && E("8") || Ba && E("9.5") || D && E("528");
Ca && !E("8") || C && E("9");
function N() {
  0 != Eb && (this.Gc = Error().stack, Fb[y(this)] = this)
}
var Eb = 0, Fb = {};
N.prototype.yb = n;
N.prototype.Ga = function() {
  if(!this.yb && (this.yb = j, this.t(), 0 != Eb)) {
    var a = y(this);
    delete Fb[a]
  }
};
N.prototype.t = function() {
  this.ic && Gb.apply(k, this.ic);
  if(this.Mb) {
    for(;this.Mb.length;) {
      this.Mb.shift()()
    }
  }
};
function Hb(a) {
  a && "function" == typeof a.Ga && a.Ga()
}
function Gb(a) {
  for(var b = 0, c = arguments.length;b < c;++b) {
    var d = arguments[b];
    ga(d) ? Gb.apply(k, d) : Hb(d)
  }
}
;function O(a, b) {
  this.type = a;
  this.currentTarget = this.target = b
}
t = O.prototype;
t.t = q();
t.Ga = q();
t.ja = n;
t.defaultPrevented = n;
t.Ua = j;
t.preventDefault = function() {
  this.defaultPrevented = j;
  this.Ua = n
};
function Ib(a) {
  Ib[" "](a);
  return a
}
Ib[" "] = ea;
function Jb(a, b) {
  a && this.Ma(a, b)
}
B(Jb, O);
t = Jb.prototype;
t.target = k;
t.relatedTarget = k;
t.offsetX = 0;
t.offsetY = 0;
t.clientX = 0;
t.clientY = 0;
t.screenX = 0;
t.screenY = 0;
t.button = 0;
t.keyCode = 0;
t.charCode = 0;
t.ctrlKey = n;
t.altKey = n;
t.shiftKey = n;
t.metaKey = n;
t.yc = n;
t.zb = k;
t.Ma = function(a, b) {
  var c = this.type = a.type;
  O.call(this, c);
  this.target = a.target || a.srcElement;
  this.currentTarget = b;
  var d = a.relatedTarget;
  if(d) {
    if(Ca) {
      var e;
      a: {
        try {
          Ib(d.nodeName);
          e = j;
          break a
        }catch(g) {
        }
        e = n
      }
      e || (d = k)
    }
  }else {
    "mouseover" == c ? d = a.fromElement : "mouseout" == c && (d = a.toElement)
  }
  this.relatedTarget = d;
  this.offsetX = D || a.offsetX !== h ? a.offsetX : a.layerX;
  this.offsetY = D || a.offsetY !== h ? a.offsetY : a.layerY;
  this.clientX = a.clientX !== h ? a.clientX : a.pageX;
  this.clientY = a.clientY !== h ? a.clientY : a.pageY;
  this.screenX = a.screenX || 0;
  this.screenY = a.screenY || 0;
  this.button = a.button;
  this.keyCode = a.keyCode || 0;
  this.charCode = a.charCode || ("keypress" == c ? a.keyCode : 0);
  this.ctrlKey = a.ctrlKey;
  this.altKey = a.altKey;
  this.shiftKey = a.shiftKey;
  this.metaKey = a.metaKey;
  this.yc = Ea ? a.metaKey : a.ctrlKey;
  this.state = a.state;
  this.zb = a;
  a.defaultPrevented && this.preventDefault();
  delete this.ja
};
t.preventDefault = function() {
  Jb.oa.preventDefault.call(this);
  var a = this.zb;
  if(a.preventDefault) {
    a.preventDefault()
  }else {
    if(a.returnValue = n, Db) {
      try {
        if(a.ctrlKey || 112 <= a.keyCode && 123 >= a.keyCode) {
          a.keyCode = -1
        }
      }catch(b) {
      }
    }
  }
};
t.t = q();
var Kb = {}, P = {}, Q = {}, Lb = {};
function Mb(a, b, c, d, e) {
  if(b) {
    if(v(b)) {
      for(var g = 0;g < b.length;g++) {
        Mb(a, b[g], c, d, e)
      }
      return k
    }
    var d = !!d, i = P;
    b in i || (i[b] = {f:0, B:0});
    i = i[b];
    d in i || (i[d] = {f:0, B:0}, i.f++);
    var i = i[d], m = y(a), l;
    i.B++;
    if(i[m]) {
      l = i[m];
      for(g = 0;g < l.length;g++) {
        if(i = l[g], i.xa == c && i.ib == e) {
          if(i.la) {
            break
          }
          return l[g].key
        }
      }
    }else {
      l = i[m] = [], i.f++
    }
    var p = Nb, r = Cb ? function(a) {
      return p.call(r.src, r.key, a)
    } : function(a) {
      a = p.call(r.src, r.key, a);
      if(!a) {
        return a
      }
    }, g = r;
    g.src = a;
    i = new Ab;
    i.Ma(c, g, a, b, d, e);
    c = i.key;
    g.key = c;
    l.push(i);
    Kb[c] = i;
    Q[m] || (Q[m] = []);
    Q[m].push(i);
    a.addEventListener ? (a == u || !a.wb) && a.addEventListener(b, g, d) : a.attachEvent(b in Lb ? Lb[b] : Lb[b] = "on" + b, g);
    return c
  }
  f(Error("Invalid event type"))
}
function Ob(a, b, c, d, e) {
  if(v(b)) {
    for(var g = 0;g < b.length;g++) {
      Ob(a, b[g], c, d, e)
    }
  }else {
    d = !!d;
    a: {
      g = P;
      if(b in g && (g = g[b], d in g && (g = g[d], a = y(a), g[a]))) {
        a = g[a];
        break a
      }
      a = k
    }
    if(a) {
      for(g = 0;g < a.length;g++) {
        if(a[g].xa == c && a[g].capture == d && a[g].ib == e) {
          Pb(a[g].key);
          break
        }
      }
    }
  }
}
function Pb(a) {
  if(!Kb[a]) {
    return n
  }
  var b = Kb[a];
  if(b.la) {
    return n
  }
  var c = b.src, d = b.type, e = b.Tb, g = b.capture;
  c.removeEventListener ? (c == u || !c.wb) && c.removeEventListener(d, e, g) : c.detachEvent && c.detachEvent(d in Lb ? Lb[d] : Lb[d] = "on" + d, e);
  c = y(c);
  if(Q[c]) {
    var e = Q[c], i = Xa(e, b);
    0 <= i && F.splice.call(e, i, 1);
    0 == e.length && delete Q[c]
  }
  b.la = j;
  if(b = P[d][g][c]) {
    b.Lb = j, Qb(d, g, c, b)
  }
  delete Kb[a];
  return j
}
function Qb(a, b, c, d) {
  if(!d.Oa && d.Lb) {
    for(var e = 0, g = 0;e < d.length;e++) {
      d[e].la ? d[e].Tb.src = k : (e != g && (d[g] = d[e]), g++)
    }
    d.length = g;
    d.Lb = n;
    0 == g && (delete P[a][b][c], P[a][b].f--, 0 == P[a][b].f && (delete P[a][b], P[a].f--), 0 == P[a].f && delete P[a])
  }
}
function Rb(a, b, c, d, e) {
  var g = 1, b = y(b);
  if(a[b]) {
    a.B--;
    a = a[b];
    a.Oa ? a.Oa++ : a.Oa = 1;
    try {
      for(var i = a.length, m = 0;m < i;m++) {
        var l = a[m];
        l && !l.la && (g &= Sb(l, e) !== n)
      }
    }finally {
      a.Oa--, Qb(c, d, b, a)
    }
  }
  return Boolean(g)
}
function Sb(a, b) {
  a.tb && Pb(a.key);
  return a.handleEvent(b)
}
function Nb(a, b) {
  if(!Kb[a]) {
    return j
  }
  var c = Kb[a], d = c.type, e = P;
  if(!(d in e)) {
    return j
  }
  var e = e[d], g, i;
  if(!Cb) {
    g = b || da("window.event");
    var m = j in e, l = n in e;
    if(m) {
      if(0 > g.keyCode || g.returnValue != h) {
        return j
      }
      a: {
        var p = n;
        if(0 == g.keyCode) {
          try {
            g.keyCode = -1;
            break a
          }catch(r) {
            p = j
          }
        }
        if(p || g.returnValue == h) {
          g.returnValue = j
        }
      }
    }
    p = new Jb;
    p.Ma(g, this);
    g = j;
    try {
      if(m) {
        for(var w = [], za = p.currentTarget;za;za = za.parentNode) {
          w.push(za)
        }
        i = e[j];
        i.B = i.f;
        for(var G = w.length - 1;!p.ja && 0 <= G && i.B;G--) {
          p.currentTarget = w[G], g &= Rb(i, w[G], d, j, p)
        }
        if(l) {
          i = e[n];
          i.B = i.f;
          for(G = 0;!p.ja && G < w.length && i.B;G++) {
            p.currentTarget = w[G], g &= Rb(i, w[G], d, n, p)
          }
        }
      }else {
        g = Sb(c, p)
      }
    }finally {
      w && (w.length = 0)
    }
    return g
  }
  d = new Jb(b, this);
  return g = Sb(c, d)
}
;function Tb() {
  N.call(this)
}
B(Tb, N);
t = Tb.prototype;
t.wb = j;
t.mb = k;
t.addEventListener = function(a, b, c, d) {
  Mb(this, a, b, c, d)
};
t.removeEventListener = function(a, b, c, d) {
  Ob(this, a, b, c, d)
};
t.dispatchEvent = function(a) {
  var b = a.type || a, c = P;
  if(b in c) {
    if(x(a)) {
      a = new O(a, this)
    }else {
      if(a instanceof O) {
        a.target = a.target || this
      }else {
        var d = a, a = new O(b, this);
        Wa(a, d)
      }
    }
    var d = 1, e, c = c[b], b = j in c, g;
    if(b) {
      e = [];
      for(g = this;g;g = g.mb) {
        e.push(g)
      }
      g = c[j];
      g.B = g.f;
      for(var i = e.length - 1;!a.ja && 0 <= i && g.B;i--) {
        a.currentTarget = e[i], d &= Rb(g, e[i], a.type, j, a) && a.Ua != n
      }
    }
    if(n in c) {
      if(g = c[n], g.B = g.f, b) {
        for(i = 0;!a.ja && i < e.length && g.B;i++) {
          a.currentTarget = e[i], d &= Rb(g, e[i], a.type, n, a) && a.Ua != n
        }
      }else {
        for(e = this;!a.ja && e && g.B;e = e.mb) {
          a.currentTarget = e, d &= Rb(g, e, a.type, n, a) && a.Ua != n
        }
      }
    }
    a = Boolean(d)
  }else {
    a = j
  }
  return a
};
t.t = function() {
  Tb.oa.t.call(this);
  var a, b = 0, c = a == k;
  a = !!a;
  if(this == k) {
    var d = function(d) {
      for(var e = d.length - 1;0 <= e;e--) {
        var g = d[e];
        if(c || a == g.capture) {
          Pb(g.key), b++
        }
      }
    }, e;
    for(e in Q) {
      d.call(h, Q[e])
    }
  }else {
    if(d = y(this), Q[d]) {
      d = Q[d];
      for(e = d.length - 1;0 <= e;e--) {
        var g = d[e];
        if(c || a == g.capture) {
          Pb(g.key), b++
        }
      }
    }
  }
  this.mb = k
};
function Ub(a, b) {
  N.call(this);
  this.aa = a || 1;
  this.Ca = b || R;
  this.bb = z(this.Ec, this);
  this.lb = A()
}
B(Ub, Tb);
Ub.prototype.enabled = n;
var R = u.window;
t = Ub.prototype;
t.r = k;
t.setInterval = function(a) {
  this.aa = a;
  this.r && this.enabled ? (this.stop(), this.start()) : this.r && this.stop()
};
t.Ec = function() {
  if(this.enabled) {
    var a = A() - this.lb;
    0 < a && a < 0.8 * this.aa ? this.r = this.Ca.setTimeout(this.bb, this.aa - a) : (this.dispatchEvent(Vb), this.enabled && (this.r = this.Ca.setTimeout(this.bb, this.aa), this.lb = A()))
  }
};
t.start = function() {
  this.enabled = j;
  this.r || (this.r = this.Ca.setTimeout(this.bb, this.aa), this.lb = A())
};
t.stop = function() {
  this.enabled = n;
  this.r && (this.Ca.clearTimeout(this.r), this.r = k)
};
t.t = function() {
  Ub.oa.t.call(this);
  this.stop();
  delete this.Ca
};
var Vb = "tick";
function Wb(a) {
  N.call(this);
  this.e = a;
  this.j = []
}
B(Wb, N);
var Xb = [];
function Yb(a, b, c, d) {
  v(c) || (Xb[0] = c, c = Xb);
  for(var e = 0;e < c.length;e++) {
    var g = Mb(b, c[e], d || a, n, a.e || a);
    a.j.push(g)
  }
}
Wb.prototype.t = function() {
  Wb.oa.t.call(this);
  Ya(this.j, Pb);
  this.j.length = 0
};
Wb.prototype.handleEvent = function() {
  f(Error("EventHandler.handleEvent not implemented"))
};
function Zb(a, b, c) {
  N.call(this);
  this.nc = a;
  this.aa = b;
  this.e = c;
  this.gc = z(this.tc, this)
}
B(Zb, N);
t = Zb.prototype;
t.Va = n;
t.Sb = 0;
t.r = k;
t.stop = function() {
  this.r && (R.clearTimeout(this.r), this.r = k, this.Va = n)
};
t.t = function() {
  Zb.oa.t.call(this);
  this.stop()
};
t.tc = function() {
  this.r = k;
  this.Va && !this.Sb && (this.Va = n, $b(this))
};
function $b(a) {
  var b;
  b = a.gc;
  var c = a.aa;
  ha(b) || (b && "function" == typeof b.handleEvent ? b = z(b.handleEvent, b) : f(Error("Invalid listener argument")));
  b = 2147483647 < c ? -1 : R.setTimeout(b, c || 0);
  a.r = b;
  a.nc.call(a.e)
}
;function S(a, b, c, d, e) {
  this.b = a;
  this.a = b;
  this.X = c;
  this.C = d;
  this.Aa = e || 1;
  this.Ba = ac;
  this.gb = new Wb(this);
  this.Qa = new Ub;
  this.Qa.setInterval(bc)
}
t = S.prototype;
t.u = k;
t.I = n;
t.sa = k;
t.qb = k;
t.ma = k;
t.pa = k;
t.S = k;
t.v = k;
t.V = k;
t.l = k;
t.Da = 0;
t.J = k;
t.qa = k;
t.p = k;
t.h = -1;
t.Wb = j;
t.Y = n;
t.ka = 0;
t.Ra = k;
var ac = 45E3, bc = 250;
function cc(a, b) {
  switch(a) {
    case 0:
      return"Non-200 return code (" + b + ")";
    case 1:
      return"XMLHTTP failure (no data)";
    case 2:
      return"HttpConnection timeout";
    default:
      return"Unknown error"
  }
}
var dc = {}, ec = {};
function fc() {
  return!C || C && 10 <= Oa
}
t = S.prototype;
t.W = s("u");
t.setTimeout = s("Ba");
t.Zb = s("ka");
function gc(a, b, c) {
  a.pa = 1;
  a.S = K(b.n());
  a.V = c;
  a.xb = j;
  hc(a, k)
}
function ic(a, b, c, d, e) {
  a.pa = 1;
  a.S = K(b.n());
  a.V = k;
  a.xb = c;
  e && (a.Wb = n);
  hc(a, d)
}
function hc(a, b) {
  a.ma = A();
  jc(a);
  a.v = a.S.n();
  rb(a.v, "t", a.Aa);
  a.Da = 0;
  a.l = a.b.Fa(a.b.Wa() ? b : k);
  0 < a.ka && (a.Ra = new Zb(z(a.cc, a, a.l), a.ka));
  Yb(a.gb, a.l, "readystatechange", a.Ac);
  var c;
  if(a.u) {
    c = a.u;
    var d = {}, e;
    for(e in c) {
      d[e] = c[e]
    }
    c = d
  }else {
    c = {}
  }
  a.V ? (a.qa = "POST", c["Content-Type"] = "application/x-www-form-urlencoded", a.l.send(a.v, a.qa, a.V, c)) : (a.qa = "GET", a.Wb && !D && (c.Connection = "close"), a.l.send(a.v, a.qa, k, c));
  a.b.F(kc);
  if(d = a.V) {
    c = "";
    d = d.split("&");
    for(e = 0;e < d.length;e++) {
      var g = d[e].split("=");
      if(1 < g.length) {
        var i = g[0], g = g[1], m = i.split("_");
        c = 2 <= m.length && "type" == m[1] ? c + (i + "=" + g + "&") : c + (i + "=redacted&")
      }
    }
  }else {
    c = k
  }
  a.a.info("XMLHTTP REQ (" + a.C + ") [attempt " + a.Aa + "]: " + a.qa + "\n" + a.v + "\n" + c)
}
t.Ac = function(a) {
  var a = a.target, b = this.Ra;
  b && 3 == T(a) ? (this.a.debug("Throttling readystatechange."), !b.r && !b.Sb ? $b(b) : b.Va = j) : this.cc(a)
};
t.cc = function(a) {
  try {
    if(a == this.l) {
      a: {
        var b = T(this.l), c = this.l.ha, d = lc(this.l);
        if(!fc() || D && !E("420+")) {
          if(4 > b) {
            break a
          }
        }else {
          if(3 > b || 3 == b && !Ba && !mc(this.l)) {
            break a
          }
        }
        !this.Y && (4 == b && c != nc) && (c == oc || 0 >= d ? this.b.F(pc) : this.b.F(qc));
        rc(this);
        var e = lc(this.l);
        this.h = e;
        var g = mc(this.l);
        g || this.a.debug("No response text for uri " + this.v + " status " + e);
        this.I = 200 == e;
        this.a.info("XMLHTTP RESP (" + this.C + ") [ attempt " + this.Aa + "]: " + this.qa + "\n" + this.v + "\n" + b + " " + e);
        this.I ? (4 == b && U(this), this.xb ? (sc(this, b, g), Ba && 3 == b && (Yb(this.gb, this.Qa, Vb, this.zc), this.Qa.start())) : (tc(this.a, this.C, g, k), uc(this, g)), this.I && !this.Y && (4 == b ? this.b.ia(this) : (this.I = n, jc(this)))) : (400 == e && 0 < g.indexOf("Unknown SID") ? (this.p = 3, V(vc)) : (this.p = 0, V(wc)), tc(this.a, this.C, g), U(this), xc(this))
      }
    }else {
      this.a.ra("Called back with an unexpected xmlhttp")
    }
  }catch(i) {
    this.a.debug("Failed call to OnXmlHttpReadyStateChanged_"), this.l && mc(this.l) ? yc(this.a, i, "ResponseText: " + mc(this.l)) : yc(this.a, i, "No response text")
  }finally {
  }
};
function sc(a, b, c) {
  for(var d = j;!a.Y && a.Da < c.length;) {
    var e = zc(a, c);
    if(e == ec) {
      4 == b && (a.p = 4, V(Ac), d = n);
      tc(a.a, a.C, k, "[Incomplete Response]");
      break
    }else {
      if(e == dc) {
        a.p = 4;
        V(Bc);
        tc(a.a, a.C, c, "[Invalid Chunk]");
        d = n;
        break
      }else {
        tc(a.a, a.C, e, k), uc(a, e)
      }
    }
  }
  4 == b && 0 == c.length && (a.p = 1, V(Cc), d = n);
  a.I = a.I && d;
  d || (tc(a.a, a.C, c, "[Invalid Chunked Response]"), U(a), xc(a))
}
t.zc = function() {
  var a = T(this.l), b = mc(this.l);
  this.Da < b.length && (rc(this), sc(this, a, b), this.I && 4 != a && jc(this))
};
function zc(a, b) {
  var c = a.Da, d = b.indexOf("\n", c);
  if(-1 == d) {
    return ec
  }
  c = Number(b.substring(c, d));
  if(isNaN(c)) {
    return dc
  }
  d += 1;
  if(d + c > b.length) {
    return ec
  }
  var e = b.substr(d, c);
  a.Da = d + c;
  return e
}
function Dc(a, b) {
  a.ma = A();
  jc(a);
  var c = b ? window.location.hostname : "";
  a.v = a.S.n();
  J(a.v, "DOMAIN", c);
  J(a.v, "t", a.Aa);
  try {
    a.J = new ActiveXObject("htmlfile")
  }catch(d) {
    a.a.H("ActiveX blocked");
    U(a);
    a.p = 7;
    V(Ec);
    xc(a);
    return
  }
  var e = "<html><body>";
  b && (e += '<script>document.domain="' + c + '"<\/script>');
  e += "</body></html>";
  a.J.open();
  a.J.write(e);
  a.J.close();
  a.J.parentWindow.m = z(a.wc, a);
  a.J.parentWindow.d = z(a.Rb, a, j);
  a.J.parentWindow.rpcClose = z(a.Rb, a, n);
  c = a.J.createElement("div");
  a.J.parentWindow.document.body.appendChild(c);
  c.innerHTML = '<iframe src="' + a.v + '"></iframe>';
  a.a.info("TRIDENT REQ (" + a.C + ") [ attempt " + a.Aa + "]: GET\n" + a.v);
  a.b.F(kc)
}
t.wc = function(a) {
  W(z(this.vc, this, a), 0)
};
t.vc = function(a) {
  if(!this.Y) {
    var b = this.a;
    b.info("TRIDENT TEXT (" + this.C + "): " + Fc(b, a));
    rc(this);
    uc(this, a);
    jc(this)
  }
};
t.Rb = function(a) {
  W(z(this.uc, this, a), 0)
};
t.uc = function(a) {
  this.Y || (this.a.info("TRIDENT TEXT (" + this.C + "): " + a ? "success" : "failure"), U(this), this.I = a, this.b.ia(this), this.b.F(Gc))
};
t.lc = function() {
  rc(this);
  this.b.ia(this)
};
t.cancel = function() {
  this.Y = j;
  U(this)
};
function jc(a) {
  a.qb = A() + a.Ba;
  Hc(a, a.Ba)
}
function Hc(a, b) {
  a.sa != k && f(Error("WatchDog timer not null"));
  a.sa = W(z(a.xc, a), b)
}
function rc(a) {
  a.sa && (u.clearTimeout(a.sa), a.sa = k)
}
t.xc = function() {
  this.sa = k;
  var a = A();
  0 <= a - this.qb ? (this.I && this.a.H("Received watchdog timeout even though request loaded successfully"), this.a.info("TIMEOUT: " + this.v), 2 != this.pa && this.b.F(pc), U(this), this.p = 2, V(Ic), xc(this)) : (this.a.ra("WatchDog timer called too early"), Hc(this, this.qb - a))
};
function xc(a) {
  !a.b.Gb() && !a.Y && a.b.ia(a)
}
function U(a) {
  rc(a);
  Hb(a.Ra);
  a.Ra = k;
  a.Qa.stop();
  var b = a.gb;
  Ya(b.j, Pb);
  b.j.length = 0;
  a.l && (b = a.l, a.l = k, b.abort(), b.Ga());
  a.J && (a.J = k)
}
t.Db = aa("p");
function uc(a, b) {
  try {
    a.b.Ob(a, b), a.b.F(Gc)
  }catch(c) {
    yc(a.a, c, "Error in httprequest callback")
  }
}
;function Jc(a) {
  a = String(a);
  if(/^\s*$/.test(a) ? 0 : /^[\],:{}\s\u2028\u2029]*$/.test(a.replace(/\\["\\\/bfnrtu]/g, "@").replace(/"[^"\\\n\r\u2028\u2029\x00-\x08\x0a-\x1f]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:[\s\u2028\u2029]*\[)+/g, ""))) {
    try {
      return eval("(" + a + ")")
    }catch(b) {
    }
  }
  f(Error("Invalid JSON string: " + a))
}
function Kc(a) {
  return eval("(" + a + ")")
}
function Lc(a) {
  var b = [];
  Mc(new Nc(h), a, b);
  return b.join("")
}
function Nc(a) {
  this.Ta = a
}
function Mc(a, b, c) {
  switch(typeof b) {
    case "string":
      Oc(b, c);
      break;
    case "number":
      c.push(isFinite(b) && !isNaN(b) ? b : "null");
      break;
    case "boolean":
      c.push(b);
      break;
    case "undefined":
      c.push("null");
      break;
    case "object":
      if(b == k) {
        c.push("null");
        break
      }
      if(v(b)) {
        var d = b.length;
        c.push("[");
        for(var e = "", g = 0;g < d;g++) {
          c.push(e), e = b[g], Mc(a, a.Ta ? a.Ta.call(b, String(g), e) : e, c), e = ","
        }
        c.push("]");
        break
      }
      c.push("{");
      d = "";
      for(g in b) {
        Object.prototype.hasOwnProperty.call(b, g) && (e = b[g], "function" != typeof e && (c.push(d), Oc(g, c), c.push(":"), Mc(a, a.Ta ? a.Ta.call(b, g, e) : e, c), d = ","))
      }
      c.push("}");
      break;
    case "function":
      break;
    default:
      f(Error("Unknown type: " + typeof b))
  }
}
var Pc = {'"':'\\"', "\\":"\\\\", "/":"\\/", "\b":"\\b", "\f":"\\f", "\n":"\\n", "\r":"\\r", "\t":"\\t", "\x0B":"\\u000b"}, Qc = /\uffff/.test("\uffff") ? /[\\\"\x00-\x1f\x7f-\uffff]/g : /[\\\"\x00-\x1f\x7f-\xff]/g;
function Oc(a, b) {
  b.push('"', a.replace(Qc, function(a) {
    if(a in Pc) {
      return Pc[a]
    }
    var b = a.charCodeAt(0), e = "\\u";
    16 > b ? e += "000" : 256 > b ? e += "00" : 4096 > b && (e += "0");
    return Pc[a] = e + b.toString(16)
  }), '"')
}
;function Rc(a) {
  return Sc(a || arguments.callee.caller, [])
}
function Sc(a, b) {
  var c = [];
  if(0 <= Xa(b, a)) {
    c.push("[...circular reference...]")
  }else {
    if(a && 50 > b.length) {
      c.push(Tc(a) + "(");
      for(var d = a.arguments, e = 0;e < d.length;e++) {
        0 < e && c.push(", ");
        var g;
        g = d[e];
        switch(typeof g) {
          case "object":
            g = g ? "object" : "null";
            break;
          case "string":
            break;
          case "number":
            g = String(g);
            break;
          case "boolean":
            g = g ? "true" : "false";
            break;
          case "function":
            g = (g = Tc(g)) ? g : "[fn]";
            break;
          default:
            g = typeof g
        }
        40 < g.length && (g = g.substr(0, 40) + "...");
        c.push(g)
      }
      b.push(a);
      c.push(")\n");
      try {
        c.push(Sc(a.caller, b))
      }catch(i) {
        c.push("[exception trying to get caller]\n")
      }
    }else {
      a ? c.push("[...long stack...]") : c.push("[end]")
    }
  }
  return c.join("")
}
function Tc(a) {
  if(Uc[a]) {
    return Uc[a]
  }
  a = String(a);
  if(!Uc[a]) {
    var b = /function ([^\(]+)/.exec(a);
    Uc[a] = b ? b[1] : "[Anonymous]"
  }
  return Uc[a]
}
var Uc = {};
function Vc(a, b, c, d, e) {
  this.reset(a, b, c, d, e)
}
Vc.prototype.Cc = 0;
Vc.prototype.Bb = k;
Vc.prototype.Ab = k;
var Wc = 0;
Vc.prototype.reset = function(a, b, c, d, e) {
  this.Cc = "number" == typeof e ? e : Wc++;
  this.Qc = d || A();
  this.wa = a;
  this.oc = b;
  this.Ic = c;
  delete this.Bb;
  delete this.Ab
};
Vc.prototype.Xb = s("wa");
function Xc(a) {
  this.pc = a
}
Xc.prototype.Pa = k;
Xc.prototype.wa = k;
Xc.prototype.cb = k;
Xc.prototype.Eb = k;
function Yc(a, b) {
  this.name = a;
  this.value = b
}
Yc.prototype.toString = aa("name");
var Zc = new Yc("SEVERE", 1E3), $c = new Yc("WARNING", 900), ad = new Yc("INFO", 800), bd = new Yc("CONFIG", 700), cd = new Yc("FINE", 500);
t = Xc.prototype;
t.getParent = aa("Pa");
t.Xb = s("wa");
function dd(a) {
  if(a.wa) {
    return a.wa
  }
  if(a.Pa) {
    return dd(a.Pa)
  }
  Ra("Root logger has no level set.");
  return k
}
t.log = function(a, b, c) {
  if(a.value >= dd(this).value) {
    a = this.kc(a, b, c);
    b = "log:" + a.oc;
    u.console && (u.console.timeStamp ? u.console.timeStamp(b) : u.console.markTimeline && u.console.markTimeline(b));
    u.msWriteProfilerMark && u.msWriteProfilerMark(b);
    for(b = this;b;) {
      var c = b, d = a;
      if(c.Eb) {
        for(var e = 0, g = h;g = c.Eb[e];e++) {
          g(d)
        }
      }
      b = b.getParent()
    }
  }
};
t.kc = function(a, b, c) {
  var d = new Vc(a, String(b), this.pc);
  if(c) {
    d.Bb = c;
    var e;
    var g = arguments.callee.caller;
    try {
      var i;
      var m = da("window.location.href");
      if(x(c)) {
        i = {message:c, name:"Unknown error", lineNumber:"Not available", fileName:m, stack:"Not available"}
      }else {
        var l, p, r = n;
        try {
          l = c.lineNumber || c.Hc || "Not available"
        }catch(w) {
          l = "Not available", r = j
        }
        try {
          p = c.fileName || c.filename || c.sourceURL || m
        }catch(za) {
          p = "Not available", r = j
        }
        i = r || !c.lineNumber || !c.fileName || !c.stack ? {message:c.message, name:c.name, lineNumber:l, fileName:p, stack:c.stack || "Not available"} : c
      }
      e = "Message: " + na(i.message) + '\nUrl: <a href="view-source:' + i.fileName + '" target="_new">' + i.fileName + "</a>\nLine: " + i.lineNumber + "\n\nBrowser stack:\n" + na(i.stack + "-> ") + "[end]\n\nJS stack traversal:\n" + na(Rc(g) + "-> ")
    }catch(G) {
      e = "Exception trying to expose exception! You win, we lose. " + G
    }
    d.Ab = e
  }
  return d
};
t.H = function(a, b) {
  this.log(Zc, a, b)
};
t.ra = function(a, b) {
  this.log($c, a, b)
};
t.info = function(a, b) {
  this.log(ad, a, b)
};
function X(a, b) {
  a.log(cd, b, h)
}
var ed = {}, fd = k;
function gd(a) {
  fd || (fd = new Xc(""), ed[""] = fd, fd.Xb(bd));
  var b;
  if(!(b = ed[a])) {
    b = new Xc(a);
    var c = a.lastIndexOf("."), d = a.substr(c + 1), c = gd(a.substr(0, c));
    c.cb || (c.cb = {});
    c.cb[d] = b;
    b.Pa = c;
    ed[a] = b
  }
  return b
}
;function hd() {
  this.q = gd("goog.net.BrowserChannel")
}
function tc(a, b, c, d) {
  a.info("XMLHTTP TEXT (" + b + "): " + Fc(a, c) + (d ? " " + d : ""))
}
hd.prototype.debug = function(a) {
  this.info(a)
};
function yc(a, b, c) {
  a.H((c || "Exception") + b)
}
hd.prototype.info = function(a) {
  this.q.info(a)
};
hd.prototype.ra = function(a) {
  this.q.ra(a)
};
hd.prototype.H = function(a) {
  this.q.H(a)
};
function Fc(a, b) {
  if(!b || b == id) {
    return b
  }
  try {
    var c = Kc(b);
    if(c) {
      for(var d = 0;d < c.length;d++) {
        if(v(c[d])) {
          var e = c[d];
          if(!(2 > e.length)) {
            var g = e[1];
            if(v(g) && !(1 > g.length)) {
              var i = g[0];
              if("noop" != i && "stop" != i) {
                for(var m = 1;m < g.length;m++) {
                  g[m] = ""
                }
              }
            }
          }
        }
      }
    }
    return Lc(c)
  }catch(l) {
    return a.debug("Exception parsing expected JS array - probably was not JS"), b
  }
}
;function jd(a, b) {
  this.Oc = new Nc(a);
  this.O = b ? Kc : Jc
}
jd.prototype.parse = function(a) {
  return this.O(a)
};
var nc = 7, oc = 8;
function kd(a) {
  N.call(this);
  this.headers = new cb;
  this.ta = a || k
}
B(kd, Tb);
kd.prototype.q = gd("goog.net.XhrIo");
var ld = /^https?$/i;
t = kd.prototype;
t.R = n;
t.g = k;
t.Za = k;
t.Na = "";
t.Ib = "";
t.ha = 0;
t.p = "";
t.fb = n;
t.La = n;
t.jb = n;
t.$ = n;
t.Xa = 0;
t.ba = k;
t.Vb = "";
t.bc = n;
t.send = function(a, b, c, d) {
  this.g && f(Error("[goog.net.XhrIo] Object is active with another request=" + this.Na + "; newUri=" + a));
  b = b ? b.toUpperCase() : "GET";
  this.Na = a;
  this.p = "";
  this.ha = 0;
  this.Ib = b;
  this.fb = n;
  this.R = j;
  this.g = this.vb();
  this.Za = this.ta ? this.ta.Ea || (this.ta.Ea = zb(this.ta)) : vb.Ea || (vb.Ea = zb(vb));
  this.g.onreadystatechange = z(this.Nb, this);
  try {
    X(this.q, Y(this, "Opening Xhr")), this.jb = j, this.g.open(b, a, j), this.jb = n
  }catch(e) {
    X(this.q, Y(this, "Error opening Xhr: " + e.message));
    md(this, e);
    return
  }
  var a = c || "", g = this.headers.n();
  d && bb(d, function(a, b) {
    g.set(b, a)
  });
  d = u.FormData && a instanceof u.FormData;
  "POST" == b && (!g.ea("Content-Type") && !d) && g.set("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
  bb(g, function(a, b) {
    this.g.setRequestHeader(b, a)
  }, this);
  this.Vb && (this.g.responseType = this.Vb);
  "withCredentials" in this.g && (this.g.withCredentials = this.bc);
  try {
    this.ba && (R.clearTimeout(this.ba), this.ba = k), 0 < this.Xa && (X(this.q, Y(this, "Will abort after " + this.Xa + "ms if incomplete")), this.ba = R.setTimeout(z(this.Ba, this), this.Xa)), X(this.q, Y(this, "Sending request")), this.La = j, this.g.send(a), this.La = n
  }catch(i) {
    X(this.q, Y(this, "Send error: " + i.message)), md(this, i)
  }
};
t.vb = function() {
  return this.ta ? xb(this.ta) : xb(vb)
};
t.Ba = function() {
  "undefined" != typeof ca && this.g && (this.p = "Timed out after " + this.Xa + "ms, aborting", this.ha = oc, X(this.q, Y(this, this.p)), this.dispatchEvent("timeout"), this.abort(oc))
};
function md(a, b) {
  a.R = n;
  a.g && (a.$ = j, a.g.abort(), a.$ = n);
  a.p = b;
  a.ha = 5;
  nd(a);
  od(a)
}
function nd(a) {
  a.fb || (a.fb = j, a.dispatchEvent("complete"), a.dispatchEvent("error"))
}
t.abort = function(a) {
  this.g && this.R && (X(this.q, Y(this, "Aborting")), this.R = n, this.$ = j, this.g.abort(), this.$ = n, this.ha = a || nc, this.dispatchEvent("complete"), this.dispatchEvent("abort"), od(this))
};
t.t = function() {
  this.g && (this.R && (this.R = n, this.$ = j, this.g.abort(), this.$ = n), od(this, j));
  kd.oa.t.call(this)
};
t.Nb = function() {
  !this.jb && !this.La && !this.$ ? this.sc() : pd(this)
};
t.sc = function() {
  pd(this)
};
function pd(a) {
  if(a.R && "undefined" != typeof ca) {
    if(a.Za[1] && 4 == T(a) && 2 == lc(a)) {
      X(a.q, Y(a, "Local request error detected and ignored"))
    }else {
      if(a.La && 4 == T(a)) {
        R.setTimeout(z(a.Nb, a), 0)
      }else {
        if(a.dispatchEvent("readystatechange"), 4 == T(a)) {
          X(a.q, Y(a, "Request complete"));
          a.R = n;
          try {
            var b = lc(a), c, d;
            a: {
              switch(b) {
                case 200:
                ;
                case 201:
                ;
                case 202:
                ;
                case 204:
                ;
                case 206:
                ;
                case 304:
                ;
                case 1223:
                  d = j;
                  break a;
                default:
                  d = n
              }
            }
            if(!(c = d)) {
              var e;
              if(e = 0 === b) {
                var g = String(a.Na).match(Sa)[1] || k;
                if(!g && self.location) {
                  var i = self.location.protocol, g = i.substr(0, i.length - 1)
                }
                e = !ld.test(g ? g.toLowerCase() : "")
              }
              c = e
            }
            if(c) {
              a.dispatchEvent("complete"), a.dispatchEvent("success")
            }else {
              a.ha = 6;
              var m;
              try {
                m = 2 < T(a) ? a.g.statusText : ""
              }catch(l) {
                X(a.q, "Can not get status: " + l.message), m = ""
              }
              a.p = m + " [" + lc(a) + "]";
              nd(a)
            }
          }finally {
            od(a)
          }
        }
      }
    }
  }
}
function od(a, b) {
  if(a.g) {
    var c = a.g, d = a.Za[0] ? ea : k;
    a.g = k;
    a.Za = k;
    a.ba && (R.clearTimeout(a.ba), a.ba = k);
    b || a.dispatchEvent("ready");
    try {
      c.onreadystatechange = d
    }catch(e) {
      a.q.H("Problem encountered resetting onreadystatechange: " + e.message)
    }
  }
}
t.isActive = function() {
  return!!this.g
};
function T(a) {
  return a.g ? a.g.readyState : 0
}
function lc(a) {
  try {
    return 2 < T(a) ? a.g.status : -1
  }catch(b) {
    return a.q.ra("Can not get status: " + b.message), -1
  }
}
function mc(a) {
  try {
    return a.g ? a.g.responseText : ""
  }catch(b) {
    return X(a.q, "Can not get responseText: " + b.message), ""
  }
}
t.Db = function() {
  return x(this.p) ? this.p : String(this.p)
};
function Y(a, b) {
  return b + " [" + a.Ib + " " + a.Na + " " + lc(a) + "]"
}
;function qd() {
  this.Ub = A()
}
new qd;
qd.prototype.set = s("Ub");
qd.prototype.reset = function() {
  this.set(A())
};
qd.prototype.get = aa("Ub");
function rd(a, b, c, d, e) {
  (new hd).debug("TestLoadImageWithRetries: " + e);
  if(0 == d) {
    c(n)
  }else {
    var g = e || 0;
    d--;
    sd(a, b, function(e) {
      e ? c(j) : u.setTimeout(function() {
        rd(a, b, c, d, g)
      }, g)
    })
  }
}
function sd(a, b, c) {
  var d = new hd;
  d.debug("TestLoadImage: loading " + a);
  var e = new Image, g = k;
  createHandler = function(a, b) {
    return function() {
      try {
        d.debug("TestLoadImage: " + b), e.onload = k, e.onerror = k, e.onabort = k, e.ontimeout = k, u.clearTimeout(g), c(a)
      }catch(l) {
        yc(d, l)
      }
    }
  };
  e.onload = createHandler(j, "loaded");
  e.onerror = createHandler(n, "error");
  e.onabort = createHandler(n, "abort");
  e.ontimeout = createHandler(n, "timeout");
  g = u.setTimeout(function() {
    if(e.ontimeout) {
      e.ontimeout()
    }
  }, b);
  e.src = a
}
;function td(a, b) {
  this.b = a;
  this.a = b;
  this.O = new jd(k, j)
}
t = td.prototype;
t.u = k;
t.w = k;
t.Sa = n;
t.$b = k;
t.Ia = k;
t.kb = k;
t.G = k;
t.c = k;
t.h = -1;
t.M = k;
t.ab = k;
t.W = s("u");
t.Yb = s("O");
t.eb = function(a) {
  this.G = a;
  a = ud(this.b, this.G);
  V(vd);
  rb(a, "MODE", "init");
  this.w = new S(this, this.a, h, h, h);
  this.w.W(this.u);
  ic(this.w, a, n, k, j);
  this.c = 0;
  this.$b = A()
};
t.hc = function(a) {
  if(a) {
    this.c = 2, wd(this)
  }else {
    V(xd);
    var b = this.b;
    b.a.debug("Test Connection Blocked");
    b.h = b.T.h;
    Z(b, 9)
  }
  a && this.F(qc)
};
function wd(a) {
  a.a.debug("TestConnection: starting stage 2");
  a.w = new S(a, a.a, h, h, h);
  a.w.W(a.u);
  var b = yd(a.b, a.M, a.G);
  V(zd);
  if(fc()) {
    rb(b, "TYPE", "xmlhttp"), ic(a.w, b, n, a.M, n)
  }else {
    rb(b, "TYPE", "html");
    var c = a.w, a = Boolean(a.M);
    c.pa = 3;
    c.S = K(b.n());
    Dc(c, a)
  }
}
t.Fa = function(a) {
  return this.b.Fa(a)
};
t.abort = function() {
  this.w && (this.w.cancel(), this.w = k);
  this.h = -1
};
t.Gb = ba(n);
t.Ob = function(a, b) {
  this.h = a.h;
  if(0 == this.c) {
    if(this.a.debug("TestConnection: Got data for stage 1"), b) {
      try {
        var c = this.O.parse(b)
      }catch(d) {
        yc(this.a, d);
        Ad(this.b, this);
        return
      }
      this.M = this.b.correctHostPrefix(c[0]);
      this.ab = c[1]
    }else {
      this.a.debug("TestConnection: Null responseText"), Ad(this.b, this)
    }
  }else {
    if(2 == this.c) {
      if(this.Sa) {
        V(Bd), this.kb = A()
      }else {
        if("11111" == b) {
          if(V(Cd), this.Sa = j, this.Ia = A(), c = this.Ia - this.$b, fc() || 500 > c) {
            this.h = 200, this.w.cancel(), this.a.debug("Test connection succeeded; using streaming connection"), V(Dd), Ed(this.b, this, j)
          }
        }else {
          V(Fd), this.Ia = this.kb = A(), this.Sa = n
        }
      }
    }
  }
};
t.ia = function() {
  this.h = this.w.h;
  if(this.w.I) {
    if(0 == this.c) {
      if(this.a.debug("TestConnection: request complete for initial check"), this.ab) {
        this.c = 1;
        var a = Gd(this.b, this.ab, "/mail/images/cleardot.gif");
        K(a);
        rd(a.toString(), 5E3, z(this.hc, this), 3, 2E3);
        this.F(kc)
      }else {
        this.c = 2, wd(this)
      }
    }else {
      2 == this.c && (this.a.debug("TestConnection: request complete for stage 2"), a = n, (a = fc() ? this.Sa : 200 > this.kb - this.Ia ? n : j) ? (this.a.debug("Test connection succeeded; using streaming connection"), V(Dd), Ed(this.b, this, j)) : (this.a.debug("Test connection failed; not using streaming"), V(Hd), Ed(this.b, this, n)))
    }
  }else {
    this.a.debug("TestConnection: request failed, in state " + this.c), 0 == this.c ? V(Id) : 2 == this.c && V(Jd), Ad(this.b, this)
  }
};
t.Wa = function() {
  return this.b.Wa()
};
t.isActive = function() {
  return this.b.isActive()
};
t.F = function(a) {
  this.b.F(a)
};
function Kd(a) {
  this.ub = a || k;
  this.c = Ld;
  this.s = [];
  this.P = [];
  this.a = new hd;
  this.O = new jd(k, j)
}
function Md(a, b) {
  this.Kb = a;
  this.map = b;
  this.Fc = k
}
t = Kd.prototype;
t.u = k;
t.ua = k;
t.o = k;
t.k = k;
t.G = k;
t.Ja = k;
t.sb = k;
t.M = k;
t.ec = j;
t.ya = 0;
t.qc = 0;
t.Ha = n;
t.e = k;
t.D = k;
t.K = k;
t.Z = k;
t.T = k;
t.pb = k;
t.dc = j;
t.va = -1;
t.Jb = -1;
t.h = -1;
t.U = 0;
t.ca = 0;
t.fc = 5E3;
t.Bc = 1E4;
t.hb = 2;
t.Cb = 2E4;
t.ka = 0;
t.ob = n;
t.da = 8;
var Ld = 1, Nd = new Tb;
function Od(a, b) {
  O.call(this, "statevent", a);
  this.Pc = b
}
B(Od, O);
function Pd(a, b, c, d) {
  O.call(this, "timingevent", a);
  this.size = b;
  this.Nc = c;
  this.Mc = d
}
B(Pd, O);
var kc = 1, qc = 2, pc = 3, Gc = 4;
function Qd(a, b) {
  O.call(this, "serverreachability", a);
  this.Lc = b
}
B(Qd, O);
var vd = 3, xd = 4, zd = 5, Cd = 6, Bd = 7, Fd = 8, Id = 9, Jd = 10, Hd = 11, Dd = 12, vc = 13, wc = 14, Ac = 15, Bc = 16, Cc = 17, Ic = 18, Ec = 22, id = "y2f%";
t = Kd.prototype;
t.eb = function(a, b, c, d, e) {
  this.a.debug("connect()");
  V(0);
  this.G = b;
  this.ua = c || {};
  d && e !== h && (this.ua.OSID = d, this.ua.OAID = e);
  this.a.debug("connectTest_()");
  Rd(this) && (this.T = new td(this, this.a), this.T.W(this.u), this.T.Yb(this.O), this.T.eb(a))
};
function Sd(a) {
  a.T && (a.T.abort(), a.T = k);
  a.k && (a.k.cancel(), a.k = k);
  a.K && (u.clearTimeout(a.K), a.K = k);
  Td(a);
  a.o && (a.o.cancel(), a.o = k);
  a.D && (u.clearTimeout(a.D), a.D = k)
}
t.W = s("u");
t.Zb = s("ka");
t.Gb = function() {
  return 0 == this.c
};
t.Yb = s("O");
function Ud(a) {
  !a.o && !a.D && (a.D = W(z(a.Qb, a), 0), a.U = 0)
}
t.Qb = function(a) {
  this.D = k;
  this.a.debug("startForwardChannel_");
  if(Rd(this)) {
    if(this.c == Ld) {
      if(a) {
        this.a.H("Not supposed to retry the open")
      }else {
        this.a.debug("open_()");
        this.ya = Math.floor(1E5 * Math.random());
        var a = this.ya++, b = new S(this, this.a, "", a, h);
        b.W(this.u);
        var c = Vd(this), d = this.Ja.n();
        J(d, "RID", a);
        this.ub && J(d, "CVER", this.ub);
        Wd(this, d);
        gc(b, d, c);
        this.o = b;
        this.c = 2
      }
    }else {
      3 == this.c && (a ? Xd(this, a) : 0 == this.s.length ? this.a.debug("startForwardChannel_ returned: nothing to send") : this.o ? this.a.H("startForwardChannel_ returned: connection already in progress") : (Xd(this), this.a.debug("startForwardChannel_ finished, sent request")))
    }
  }
};
function Xd(a, b) {
  var c, d;
  b ? 6 < a.da ? (a.s = a.P.concat(a.s), a.P.length = 0, c = a.ya - 1, d = Vd(a)) : (c = b.C, d = b.V) : (c = a.ya++, d = Vd(a));
  var e = a.Ja.n();
  J(e, "SID", a.X);
  J(e, "RID", c);
  J(e, "AID", a.va);
  Wd(a, e);
  c = new S(a, a.a, a.X, c, a.U + 1);
  c.W(a.u);
  c.setTimeout(Math.round(0.5 * a.Cb) + Math.round(0.5 * a.Cb * Math.random()));
  a.o = c;
  gc(c, e, d)
}
function Wd(a, b) {
  if(a.e) {
    var c = a.e.getAdditionalParams(a);
    c && bb(c, function(a, c) {
      J(b, c, a)
    })
  }
}
function Vd(a) {
  var b = Math.min(a.s.length, 1E3), c = ["count=" + b], d;
  6 < a.da && 0 < b ? (d = a.s[0].Kb, c.push("ofs=" + d)) : d = 0;
  for(var e = 0;e < b;e++) {
    var g = a.s[e].Kb, i = a.s[e].map, g = 6 >= a.da ? e : g - d;
    try {
      bb(i, function(a, b) {
        c.push("req" + g + "_" + b + "=" + encodeURIComponent(a))
      })
    }catch(m) {
      c.push("req" + g + "_type=" + encodeURIComponent("_badmap")), a.e && a.e.badMapError(a, i)
    }
  }
  a.P = a.P.concat(a.s.splice(0, b));
  return c.join("&")
}
function Yd(a) {
  !a.k && !a.K && (a.rb = 1, a.K = W(z(a.Pb, a), 0), a.ca = 0)
}
function Zd(a) {
  if(a.k || a.K) {
    return a.a.H("Request already in progress"), n
  }
  if(3 <= a.ca) {
    return n
  }
  a.a.debug("Going to retry GET");
  a.rb++;
  a.K = W(z(a.Pb, a), $d(a, a.ca));
  a.ca++;
  return j
}
t.Pb = function() {
  this.K = k;
  if(Rd(this)) {
    this.a.debug("Creating new HttpRequest");
    this.k = new S(this, this.a, this.X, "rpc", this.rb);
    this.k.W(this.u);
    this.k.Zb(this.ka);
    var a = this.sb.n();
    J(a, "RID", "rpc");
    J(a, "SID", this.X);
    J(a, "CI", this.pb ? "0" : "1");
    J(a, "AID", this.va);
    Wd(this, a);
    if(fc()) {
      J(a, "TYPE", "xmlhttp"), ic(this.k, a, j, this.M, n)
    }else {
      J(a, "TYPE", "html");
      var b = this.k, c = Boolean(this.M);
      b.pa = 3;
      b.S = K(a.n());
      Dc(b, c)
    }
    this.a.debug("New Request created")
  }
};
function Rd(a) {
  if(a.e) {
    var b = a.e.okToMakeRequest(a);
    if(0 != b) {
      return a.a.debug("Handler returned error code from okToMakeRequest"), Z(a, b), n
    }
  }
  return j
}
function Ed(a, b, c) {
  a.a.debug("Test Connection Finished");
  a.pb = a.dc && c;
  a.h = b.h;
  a.a.debug("connectChannel_()");
  a.jc(Ld, 0);
  a.Ja = ud(a, a.G);
  Ud(a)
}
function Ad(a, b) {
  a.a.debug("Test Connection Failed");
  a.h = b.h;
  Z(a, 2)
}
t.Ob = function(a, b) {
  if(!(0 == this.c || this.k != a && this.o != a)) {
    if(this.h = a.h, this.o == a && 3 == this.c) {
      if(7 < this.da) {
        var c;
        try {
          c = this.O.parse(b)
        }catch(d) {
          c = k
        }
        if(v(c) && 3 == c.length) {
          var e = c;
          if(0 == e[0]) {
            a: {
              if(this.a.debug("Server claims our backchannel is missing."), this.K) {
                this.a.debug("But we are currently starting the request.")
              }else {
                if(this.k) {
                  if(this.k.ma + 3E3 < this.o.ma) {
                    Td(this), this.k.cancel(), this.k = k
                  }else {
                    break a
                  }
                }else {
                  this.a.ra("We do not have a BackChannel established")
                }
                Zd(this);
                V(19)
              }
            }
          }else {
            this.Jb = e[1], c = this.Jb - this.va, 0 < c && (e = e[2], this.a.debug(e + " bytes (in " + c + " arrays) are outstanding on the BackChannel"), 37500 > e && (this.pb && 0 == this.ca) && !this.Z && (this.Z = W(z(this.rc, this), 6E3)))
          }
        }else {
          this.a.debug("Bad POST response data returned"), Z(this, 11)
        }
      }else {
        b != id && (this.a.debug("Bad data returned - missing/invald magic cookie"), Z(this, 11))
      }
    }else {
      if(this.k == a && Td(this), !/^[\s\xa0]*$/.test(b)) {
        c = this.O.parse(b);
        for(var e = this.e && this.e.channelHandleMultipleArrays ? [] : k, g = 0;g < c.length;g++) {
          var i = c[g];
          this.va = i[0];
          i = i[1];
          2 == this.c ? "c" == i[0] ? (this.X = i[1], this.M = this.correctHostPrefix(i[2]), i = i[3], this.da = i != k ? i : 6, this.c = 3, this.e && this.e.channelOpened(this), this.sb = yd(this, this.M, this.G), Yd(this)) : "stop" == i[0] && Z(this, 7) : 3 == this.c && ("stop" == i[0] ? (e && e.length && (this.e.channelHandleMultipleArrays(this, e), e.length = 0), Z(this, 7)) : "noop" != i[0] && (e ? e.push(i) : this.e && this.e.channelHandleArray(this, i)), this.ca = 0)
        }
        e && e.length && this.e.channelHandleMultipleArrays(this, e)
      }
    }
  }
};
t.correctHostPrefix = function(a) {
  return this.ec ? this.e ? this.e.correctHostPrefix(a) : a : k
};
t.rc = function() {
  this.Z != k && (this.Z = k, this.k.cancel(), this.k = k, Zd(this), V(20))
};
function Td(a) {
  a.Z != k && (u.clearTimeout(a.Z), a.Z = k)
}
t.ia = function(a) {
  this.a.debug("Request complete");
  var b;
  if(this.k == a) {
    Td(this), this.k = k, b = 2
  }else {
    if(this.o == a) {
      this.o = k, b = 1
    }else {
      return
    }
  }
  this.h = a.h;
  if(0 != this.c) {
    if(a.I) {
      1 == b ? (b = A() - a.ma, Nd.dispatchEvent(new Pd(Nd, a.V ? a.V.length : 0, b, this.U)), Ud(this), this.P.length = 0) : Yd(this)
    }else {
      var c = a.Db();
      if(3 == c || 7 == c || 0 == c && 0 < this.h) {
        this.a.debug("Not retrying due to error type")
      }else {
        this.a.debug("Maybe retrying, last error: " + cc(c, this.h));
        var d;
        if(d = 1 == b) {
          this.o || this.D ? (this.a.H("Request already in progress"), d = n) : this.c == Ld || this.U >= (this.Ha ? 0 : this.hb) ? d = n : (this.a.debug("Going to retry POST"), this.D = W(z(this.Qb, this, a), $d(this, this.U)), this.U++, d = j)
        }
        if(d || 2 == b && Zd(this)) {
          return
        }
        this.a.debug("Exceeded max number of retries")
      }
      this.a.debug("Error: HTTP request failed");
      switch(c) {
        case 1:
          Z(this, 5);
          break;
        case 4:
          Z(this, 10);
          break;
        case 3:
          Z(this, 6);
          break;
        case 7:
          Z(this, 12);
          break;
        default:
          Z(this, 2)
      }
    }
  }
};
function $d(a, b) {
  var c = a.fc + Math.floor(Math.random() * a.Bc);
  a.isActive() || (a.a.debug("Inactive channel"), c *= 2);
  return c * b
}
t.jc = function(a) {
  0 <= Xa(arguments, this.c) || f(Error("Unexpected channel state: " + this.c))
};
function Z(a, b) {
  a.a.info("Error code " + b);
  if(2 == b || 9 == b) {
    var c = k;
    a.e && (c = a.e.getNetworkTestImageUri(a));
    var d = z(a.Dc, a);
    c || (c = new H("//www.google.com/images/cleardot.gif"), K(c));
    sd(c.toString(), 1E4, d)
  }else {
    V(2)
  }
  ae(a, b)
}
t.Dc = function(a) {
  a ? (this.a.info("Successfully pinged google.com"), V(2)) : (this.a.info("Failed to ping google.com"), V(1), ae(this, 8))
};
function ae(a, b) {
  a.a.debug("HttpChannel: error - " + b);
  a.c = 0;
  a.e && a.e.channelError(a, b);
  be(a);
  Sd(a)
}
function be(a) {
  a.c = 0;
  a.h = -1;
  if(a.e) {
    if(0 == a.P.length && 0 == a.s.length) {
      a.e.channelClosed(a)
    }else {
      a.a.debug("Number of undelivered maps, pending: " + a.P.length + ", outgoing: " + a.s.length);
      var b = $a(a.P), c = $a(a.s);
      a.P.length = 0;
      a.s.length = 0;
      a.e.channelClosed(a, b, c)
    }
  }
}
function ud(a, b) {
  var c = Gd(a, k, b);
  a.a.debug("GetForwardChannelUri: " + c);
  return c
}
function yd(a, b, c) {
  b = Gd(a, a.Wa() ? b : k, c);
  a.a.debug("GetBackChannelUri: " + b);
  return b
}
function Gd(a, b, c) {
  var d;
  d = c instanceof H ? c.n() : new H(c, h);
  if("" != d.fa) {
    b && gb(d, b + "." + d.fa), hb(d, d.za)
  }else {
    var e = window.location, g = e.protocol, b = b ? b + "." + e.hostname : e.hostname, e = e.port, i = new H(k, h);
    g && fb(i, g);
    b && gb(i, b);
    e && hb(i, e);
    c && ib(i, c);
    d = i
  }
  a.ua && bb(a.ua, function(a, b) {
    J(d, b, a)
  });
  J(d, "VER", a.da);
  Wd(a, d);
  return d
}
t.Fa = function(a) {
  a && !this.ob && f(Error("Can't create secondary domain capable XhrIo object."));
  a = new kd;
  a.bc = this.ob;
  return a
};
t.isActive = function() {
  return!!this.e && this.e.isActive(this)
};
function W(a, b) {
  ha(a) || f(Error("Fn must not be null and must be a function"));
  return u.setTimeout(function() {
    a()
  }, b)
}
t.F = function(a) {
  Nd.dispatchEvent(new Qd(Nd, a))
};
function V(a) {
  Nd.dispatchEvent(new Od(Nd, a))
}
t.Wa = function() {
  return this.ob || !fc()
};
function ce() {
}
t = ce.prototype;
t.channelHandleMultipleArrays = k;
t.okToMakeRequest = ba(0);
t.channelOpened = q();
t.channelHandleArray = q();
t.channelError = q();
t.channelClosed = q();
t.getAdditionalParams = function() {
  return{}
};
t.getNetworkTestImageUri = ba(k);
t.isActive = ba(j);
t.badMapError = q();
t.correctHostPrefix = function(a) {
  return a
};
var $, de;
de = {"0":"Ok", 4:"User is logging out", 6:"Unknown session ID", 7:"Stopped by server", 8:"General network error", 2:"Request failed", 9:"Blocked by a network administrator", 5:"No data from server", 10:"Got bad data from the server", 11:"Got a bad response from the server"};
$ = function(a, b) {
  var c, d, e, g, i, m, l, p, r;
  l = this;
  a || (a = "channel");
  a.match(/:\/\//) && a.replace(/^ws/, "http");
  b || (b = {});
  if(v(b || "string" === typeof b)) {
    b = {}
  }
  i = b.reconnectTime || 3E3;
  r = function(a) {
    l.readyState = l.readyState = a
  };
  r(this.CLOSED);
  p = k;
  e = b.Kc;
  c = new ce;
  c.channelOpened = function() {
    e = p;
    r($.OPEN);
    return"function" === typeof l.onopen ? l.onopen() : h
  };
  d = k;
  c.channelError = function(a, b) {
    var c;
    c = de[b];
    d = b;
    r($.$a);
    return"function" === typeof l.onerror ? l.onerror(c, b) : h
  };
  m = k;
  c.channelClosed = function(a, c, e) {
    if(l.readyState !== $.CLOSED) {
      p = k;
      a = d ? de[d] : "Closed";
      r($.CLOSED);
      try {
        if("function" === typeof l.onclose) {
          l.onclose(a, c, e)
        }
      }catch(ge) {
        "undefined" !== typeof console && console !== k && console.error(ge.stack)
      }
      b.reconnect && (7 !== d && 0 !== d) && (c = 6 === d ? 0 : i, clearTimeout(m), m = setTimeout(g, c));
      return d = k
    }
  };
  c.channelHandleArray = function(a, b) {
    try {
      return"function" === typeof l.onmessage ? l.onmessage(b) : h
    }catch(c) {
      "undefined" !== typeof console && console !== k && console.error(c.stack), f(c)
    }
  };
  g = function() {
    p && f(Error("Reconnect() called from invalid state"));
    r($.CONNECTING);
    if("function" === typeof l.onconnecting) {
      l.onconnecting()
    }
    clearTimeout(m);
    p = new Kd(b.appVersion);
    p.e = c;
    d = k;
    if(b.failFast) {
      var g = p;
      g.Ha = j;
      g.a.info("setFailFast: true");
      if((g.o || g.D) && g.U > (g.Ha ? 0 : g.hb)) {
        g.a.info("Retry count " + g.U + " > new maxRetries " + (g.Ha ? 0 : g.hb) + ". Fail immediately!"), g.o ? (g.o.cancel(), g.ia(g.o)) : (u.clearTimeout(g.D), g.D = k, Z(g, 2))
      }
    }
    return p.eb("" + a + "/test", "" + a + "/bind", k, e != k ? e.X : h, e != k ? e.va : h)
  };
  this.open = function() {
    l.readyState !== l.CLOSED && f(Error("Already open"));
    return g()
  };
  this.close = function() {
    clearTimeout(m);
    d = 0;
    if(l.readyState !== $.CLOSED) {
      r($.$a);
      var a = p;
      a.a.debug("disconnect()");
      Sd(a);
      if(3 == a.c) {
        var b = a.ya++, c = a.Ja.n();
        J(c, "SID", a.X);
        J(c, "RID", b);
        J(c, "TYPE", "terminate");
        Wd(a, c);
        b = new S(a, a.a, a.X, b, h);
        b.pa = 2;
        b.S = K(c.n());
        c = new Image;
        c.src = b.S;
        c.onload = c.onerror = z(b.lc, b);
        b.ma = A();
        jc(b)
      }
      be(a)
    }
  };
  this.sendMap = function(a) {
    var b;
    ((b = l.readyState) === $.$a || b === $.CLOSED) && f(Error("Cannot send to a closed connection"));
    b = p;
    0 == b.c && f(Error("Invalid operation: sending map when state is closed"));
    1E3 == b.s.length && b.a.H("Already have 1000 queued maps upon queueing " + Lc(a));
    b.s.push(new Md(b.qc++, a));
    (2 == b.c || 3 == b.c) && Ud(b)
  };
  this.send = function(a) {
    return this.sendMap({JSON:Lc(a)})
  };
  g();
  return this
};
$.prototype.CONNECTING = $.CONNECTING = $.CONNECTING = 0;
$.prototype.OPEN = $.OPEN = $.OPEN = 1;
$.prototype.CLOSING = $.CLOSING = $.$a = 2;
$.prototype.CLOSED = $.CLOSED = $.CLOSED = 3;
("undefined" !== typeof exports && exports !== k ? exports : window).BCSocket = $;
var Image, XMLHttpRequest, ee, fe, window;
ee = require("request");
Image = function() {
  var a = this;
  this.__defineSetter__("src", function(b) {
    b = b.toString();
    b.match(/^\/\//) && (b = "http:" + b);
    return ee(b, function(b) {
      return b != k ? "function" === typeof a.onerror ? a.onerror() : h : "function" === typeof a.onload ? a.onload() : h
    })
  });
  return this
};
XMLHttpRequest = require("../XMLHttpRequest").XMLHttpRequest;
Kd.prototype.Fa = function() {
  var a;
  a = new kd;
  a.vb = function() {
    return new XMLHttpRequest
  };
  return a
};
u = window = {setTimeout:setTimeout, clearTimeout:clearTimeout, setInterval:setInterval, clearInterval:clearInterval, location:k, navigator:{userAgent:"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_2) AppleWebKit/535.1 (KHTML, like Gecko) Chrome/14.0.835.202 Safari/535.1"}};
fe = require("url");
exports.setDefaultLocation = function(a) {
  "string" === typeof a && (a = fe.parse(a));
  return window.location = a
};

})();
