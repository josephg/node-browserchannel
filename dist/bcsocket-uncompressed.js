(function(){
function f(a) {
  throw a;
}
var h = void 0, j = !0, k = null, n = !1;
function p() {
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
function w(a) {
  return"string" == typeof a
}
function ha(a) {
  return"function" == fa(a)
}
function x(a) {
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
function y(a, b, c) {
  y = Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? ka : la;
  return y.apply(k, arguments)
}
var z = Date.now || function() {
  return+new Date
};
function A(a, b) {
  function c() {
  }
  c.prototype = b.prototype;
  a.na = b.prototype;
  a.prototype = new c
}
;function ma(a, b) {
  for(var c = 1;c < arguments.length;c++) {
    var d = ("" + arguments[c]).replace(/\$/g, "$$$$"), a = a.replace(/\%s/, d)
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
var ta, ua, va, xa;
function ya() {
  return u.navigator ? u.navigator.userAgent : k
}
xa = va = ua = ta = n;
var za;
if(za = ya()) {
  var Aa = u.navigator;
  ta = 0 == za.indexOf("Opera");
  ua = !ta && -1 != za.indexOf("MSIE");
  va = !ta && -1 != za.indexOf("WebKit");
  xa = !ta && !va && "Gecko" == Aa.product
}
var Ba = ta, B = ua, Ca = xa, C = va;
function Da() {
  var a = u.document;
  return a ? a.documentMode : h
}
var Ea;
a: {
  var Fa = "", Ga;
  if(Ba && u.opera) {
    var Ha = u.opera.version, Fa = "function" == typeof Ha ? Ha() : Ha
  }else {
    if(Ca ? Ga = /rv\:([^\);]+)(\)|;)/ : B ? Ga = /MSIE\s+([^\);]+)(\)|;)/ : C && (Ga = /WebKit\/(\S+)/), Ga) {
      var Ia = Ga.exec(ya()), Fa = Ia ? Ia[1] : ""
    }
  }
  if(B) {
    var Ja = Da();
    if(Ja > parseFloat(Fa)) {
      Ea = "" + Ja;
      break a
    }
  }
  Ea = Fa
}
var Ka = {};
function D(a) {
  var b;
  if(!(b = Ka[a])) {
    b = 0;
    for(var c = ("" + Ea).replace(/^[\s\xa0]+|[\s\xa0]+$/g, "").split("."), d = ("" + a).replace(/^[\s\xa0]+|[\s\xa0]+$/g, "").split("."), e = Math.max(c.length, d.length), g = 0;0 == b && g < e;g++) {
      var i = c[g] || "", l = d[g] || "", o = RegExp("(\\d*)(\\D*)", "g"), m = RegExp("(\\d*)(\\D*)", "g");
      do {
        var r = o.exec(i) || ["", "", ""], q = m.exec(l) || ["", "", ""];
        if(0 == r[0].length && 0 == q[0].length) {
          break
        }
        b = ((0 == r[1].length ? 0 : parseInt(r[1], 10)) < (0 == q[1].length ? 0 : parseInt(q[1], 10)) ? -1 : (0 == r[1].length ? 0 : parseInt(r[1], 10)) > (0 == q[1].length ? 0 : parseInt(q[1], 10)) ? 1 : 0) || ((0 == r[2].length) < (0 == q[2].length) ? -1 : (0 == r[2].length) > (0 == q[2].length) ? 1 : 0) || (r[2] < q[2] ? -1 : r[2] > q[2] ? 1 : 0)
      }while(0 == b)
    }
    b = Ka[a] = 0 <= b
  }
  return b
}
var La = u.document, Ma = !La || !B ? h : Da() || ("CSS1Compat" == La.compatMode ? parseInt(Ea, 10) : 5);
function Na(a) {
  Error.captureStackTrace ? Error.captureStackTrace(this, Na) : this.stack = Error().stack || "";
  a && (this.message = "" + a)
}
A(Na, Error);
Na.prototype.name = "CustomError";
function Oa(a, b) {
  b.unshift(a);
  Na.call(this, ma.apply(k, b));
  b.shift()
}
A(Oa, Na);
Oa.prototype.name = "AssertionError";
function Pa(a, b) {
  f(new Oa("Failure" + (a ? ": " + a : ""), Array.prototype.slice.call(arguments, 1)))
}
;var Qa = RegExp("^(?:([^:/?#.]+):)?(?://(?:([^/?#]*)@)?([^/#?]*?)(?::([0-9]+))?(?=[/#?]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#(.*))?$");
function Ra(a) {
  var b = E, c;
  for(c in b) {
    a.call(h, b[c], c, b)
  }
}
function Sa(a) {
  var b = [], c = 0, d;
  for(d in a) {
    b[c++] = a[d]
  }
  return b
}
function Ta(a) {
  var b = [], c = 0, d;
  for(d in a) {
    b[c++] = d
  }
  return b
}
var Ua = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");
function Va(a, b) {
  for(var c, d, e = 1;e < arguments.length;e++) {
    d = arguments[e];
    for(c in d) {
      a[c] = d[c]
    }
    for(var g = 0;g < Ua.length;g++) {
      c = Ua[g], Object.prototype.hasOwnProperty.call(d, c) && (a[c] = d[c])
    }
  }
}
;var G = Array.prototype, Wa = G.indexOf ? function(a, b, c) {
  return G.indexOf.call(a, b, c)
} : function(a, b, c) {
  c = c == k ? 0 : 0 > c ? Math.max(0, a.length + c) : c;
  if(w(a)) {
    return!w(b) || 1 != b.length ? -1 : a.indexOf(b, c)
  }
  for(;c < a.length;c++) {
    if(c in a && a[c] === b) {
      return c
    }
  }
  return-1
}, Xa = G.forEach ? function(a, b, c) {
  G.forEach.call(a, b, c)
} : function(a, b, c) {
  for(var d = a.length, e = w(a) ? a.split("") : a, g = 0;g < d;g++) {
    g in e && b.call(c, e[g], g, a)
  }
};
function Ya(a) {
  return G.concat.apply(G, arguments)
}
function Za(a) {
  var b = a.length;
  if(0 < b) {
    for(var c = Array(b), d = 0;d < b;d++) {
      c[d] = a[d]
    }
    return c
  }
  return[]
}
;function $a(a) {
  if("function" == typeof a.L) {
    return a.L()
  }
  if(w(a)) {
    return a.split("")
  }
  if(ga(a)) {
    for(var b = [], c = a.length, d = 0;d < c;d++) {
      b.push(a[d])
    }
    return b
  }
  return Sa(a)
}
function ab(a, b, c) {
  if("function" == typeof a.forEach) {
    a.forEach(b, c)
  }else {
    if(ga(a) || w(a)) {
      Xa(a, b, c)
    }else {
      var d;
      if("function" == typeof a.ga) {
        d = a.ga()
      }else {
        if("function" != typeof a.L) {
          if(ga(a) || w(a)) {
            d = [];
            for(var e = a.length, g = 0;g < e;g++) {
              d.push(g)
            }
          }else {
            d = Ta(a)
          }
        }else {
          d = h
        }
      }
      for(var e = $a(a), g = e.length, i = 0;i < g;i++) {
        b.call(c, e[i], d && d[i], a)
      }
    }
  }
}
;function bb(a, b) {
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
      a instanceof bb ? (c = a.ga(), d = a.L()) : (c = Ta(a), d = Sa(a));
      for(var e = 0;e < c.length;e++) {
        this.set(c[e], d[e])
      }
    }
  }
}
t = bb.prototype;
t.f = 0;
t.L = function() {
  cb(this);
  for(var a = [], b = 0;b < this.j.length;b++) {
    a.push(this.N[this.j[b]])
  }
  return a
};
t.ga = function() {
  cb(this);
  return this.j.concat()
};
t.ea = function(a) {
  return db(this.N, a)
};
t.remove = function(a) {
  return db(this.N, a) ? (delete this.N[a], this.f--, this.j.length > 2 * this.f && cb(this), j) : n
};
function cb(a) {
  if(a.f != a.j.length) {
    for(var b = 0, c = 0;b < a.j.length;) {
      var d = a.j[b];
      db(a.N, d) && (a.j[c++] = d);
      b++
    }
    a.j.length = c
  }
  if(a.f != a.j.length) {
    for(var e = {}, c = b = 0;b < a.j.length;) {
      d = a.j[b], db(e, d) || (a.j[c++] = d, e[d] = 1), b++
    }
    a.j.length = c
  }
}
t.get = function(a, b) {
  return db(this.N, a) ? this.N[a] : b
};
t.set = function(a, b) {
  db(this.N, a) || (this.f++, this.j.push(a));
  this.N[a] = b
};
t.n = function() {
  return new bb(this)
};
function db(a, b) {
  return Object.prototype.hasOwnProperty.call(a, b)
}
;function H(a, b) {
  var c;
  if(a instanceof H) {
    this.A = b !== h ? b : a.A, eb(this, a.ma), c = a.Ya, I(this), this.Ya = c, fb(this, a.fa), gb(this, a.ya), hb(this, a.G), ib(this, a.Q.n()), c = a.Ja, I(this), this.Ja = c
  }else {
    if(a && (c = ("" + a).match(Qa))) {
      this.A = !!b;
      eb(this, c[1] || "", j);
      var d = c[2] || "";
      I(this);
      this.Ya = d ? decodeURIComponent(d) : "";
      fb(this, c[3] || "", j);
      gb(this, c[4]);
      hb(this, c[5] || "", j);
      ib(this, c[6] || "", j);
      c = c[7] || "";
      I(this);
      this.Ja = c ? decodeURIComponent(c) : ""
    }else {
      this.A = !!b, this.Q = new jb(k, 0, this.A)
    }
  }
}
t = H.prototype;
t.ma = "";
t.Ya = "";
t.fa = "";
t.ya = k;
t.G = "";
t.Ja = "";
t.kc = n;
t.A = n;
t.toString = function() {
  var a = [], b = this.ma;
  b && a.push(kb(b, lb), ":");
  if(b = this.fa) {
    a.push("//");
    var c = this.Ya;
    c && a.push(kb(c, lb), "@");
    a.push(encodeURIComponent("" + b));
    b = this.ya;
    b != k && a.push(":", "" + b)
  }
  if(b = this.G) {
    this.fa && "/" != b.charAt(0) && a.push("/"), a.push(kb(b, "/" == b.charAt(0) ? mb : nb))
  }
  (b = this.Q.toString()) && a.push("?", b);
  (b = this.Ja) && a.push("#", kb(b, ob));
  return a.join("")
};
t.n = function() {
  return new H(this)
};
function eb(a, b, c) {
  I(a);
  a.ma = c ? b ? decodeURIComponent(b) : "" : b;
  a.ma && (a.ma = a.ma.replace(/:$/, ""))
}
function fb(a, b, c) {
  I(a);
  a.fa = c ? b ? decodeURIComponent(b) : "" : b
}
function gb(a, b) {
  I(a);
  b ? (b = Number(b), (isNaN(b) || 0 > b) && f(Error("Bad port number " + b)), a.ya = b) : a.ya = k
}
function hb(a, b, c) {
  I(a);
  a.G = c ? b ? decodeURIComponent(b) : "" : b
}
function ib(a, b, c) {
  I(a);
  b instanceof jb ? (a.Q = b, a.Q.ob(a.A)) : (c || (b = kb(b, pb)), a.Q = new jb(b, 0, a.A))
}
function J(a, b, c) {
  I(a);
  a.Q.set(b, c)
}
function qb(a, b, c) {
  I(a);
  v(c) || (c = ["" + c]);
  rb(a.Q, b, c)
}
function K(a) {
  I(a);
  J(a, "zx", Math.floor(2147483648 * Math.random()).toString(36) + Math.abs(Math.floor(2147483648 * Math.random()) ^ z()).toString(36));
  return a
}
function I(a) {
  a.kc && f(Error("Tried to modify a read-only Uri"))
}
t.ob = function(a) {
  this.A = a;
  this.Q && this.Q.ob(a);
  return this
};
function sb(a, b, c, d) {
  var e = new H(k, h);
  a && eb(e, a);
  b && fb(e, b);
  c && gb(e, c);
  d && hb(e, d);
  return e
}
function kb(a, b) {
  return w(a) ? encodeURI(a).replace(b, tb) : k
}
function tb(a) {
  a = a.charCodeAt(0);
  return"%" + (a >> 4 & 15).toString(16) + (a & 15).toString(16)
}
var lb = /[#\/\?@]/g, nb = /[\#\?:]/g, mb = /[\#\?]/g, pb = /[\#\?@]/g, ob = /#/g;
function jb(a, b, c) {
  this.z = a || k;
  this.A = !!c
}
function L(a) {
  if(!a.i && (a.i = new bb, a.f = 0, a.z)) {
    for(var b = a.z.split("&"), c = 0;c < b.length;c++) {
      var d = b[c].indexOf("="), e = k, g = k;
      0 <= d ? (e = b[c].substring(0, d), g = b[c].substring(d + 1)) : e = b[c];
      e = decodeURIComponent(e.replace(/\+/g, " "));
      e = M(a, e);
      a.add(e, g ? decodeURIComponent(g.replace(/\+/g, " ")) : "")
    }
  }
}
t = jb.prototype;
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
    this.ea(a) && (b = Ya(b, this.i.get(M(this, a))))
  }else {
    for(var a = this.i.L(), c = 0;c < a.length;c++) {
      b = Ya(b, a[c])
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
  return 0 < c.length ? "" + c[0] : b
};
function rb(a, b, c) {
  a.remove(b);
  0 < c.length && (a.z = k, a.i.set(M(a, b), Za(c)), a.f += c.length)
}
t.toString = function() {
  if(this.z) {
    return this.z
  }
  if(!this.i) {
    return""
  }
  for(var a = [], b = this.i.ga(), c = 0;c < b.length;c++) {
    for(var d = b[c], e = encodeURIComponent("" + d), d = this.L(d), g = 0;g < d.length;g++) {
      var i = e;
      "" !== d[g] && (i += "=" + encodeURIComponent("" + d[g]));
      a.push(i)
    }
  }
  return this.z = a.join("&")
};
t.n = function() {
  var a = new jb;
  a.z = this.z;
  this.i && (a.i = this.i.n(), a.f = this.f);
  return a
};
function M(a, b) {
  var c = "" + b;
  a.A && (c = c.toLowerCase());
  return c
}
t.ob = function(a) {
  a && !this.A && (L(this), this.z = k, ab(this.i, function(a, c) {
    var d = c.toLowerCase();
    c != d && (this.remove(c), rb(this, d, a))
  }, this));
  this.A = a
};
function ub() {
}
ub.prototype.Ea = k;
var vb;
function wb() {
}
A(wb, ub);
function xb(a) {
  return(a = yb(a)) ? new ActiveXObject(a) : new XMLHttpRequest
}
function zb(a) {
  var b = {};
  yb(a) && (b[0] = j, b[1] = j);
  return b
}
function yb(a) {
  if(!a.Eb && "undefined" == typeof XMLHttpRequest && "undefined" != typeof ActiveXObject) {
    for(var b = ["MSXML2.XMLHTTP.6.0", "MSXML2.XMLHTTP.3.0", "MSXML2.XMLHTTP", "Microsoft.XMLHTTP"], c = 0;c < b.length;c++) {
      var d = b[c];
      try {
        return new ActiveXObject(d), a.Eb = d
      }catch(e) {
      }
    }
    f(Error("Could not create ActiveXObject. ActiveX might be disabled, or MSXML might not be installed"))
  }
  return a.Eb
}
vb = new wb;
function Ab() {
}
var Bb = 0;
t = Ab.prototype;
t.key = 0;
t.la = n;
t.tb = n;
t.La = function(a, b, c, d, e, g) {
  ha(a) ? this.Gb = j : a && a.handleEvent && ha(a.handleEvent) ? this.Gb = n : f(Error("Invalid listener argument"));
  this.wa = a;
  this.Sb = b;
  this.src = c;
  this.type = d;
  this.capture = !!e;
  this.jb = g;
  this.tb = n;
  this.key = ++Bb;
  this.la = n
};
t.handleEvent = function(a) {
  return this.Gb ? this.wa.call(this.jb || this.src, a) : this.wa.handleEvent.call(this.wa, a)
};
var Cb = !B || B && 9 <= Ma, Db = B && !D("9");
!C || D("528");
Ca && D("1.9b") || B && D("8") || Ba && D("9.5") || C && D("528");
Ca && !D("8") || B && D("9");
function N() {
  0 != Eb && (Fb[x(this)] = this)
}
var Eb = 0, Fb = {};
N.prototype.xb = n;
N.prototype.Fa = function() {
  if(!this.xb && (this.xb = j, this.t(), 0 != Eb)) {
    var a = x(this);
    delete Fb[a]
  }
};
N.prototype.t = function() {
  this.gc && Gb.apply(k, this.gc);
  if(this.Lb) {
    for(;this.Lb.length;) {
      this.Lb.shift()()
    }
  }
};
function Hb(a) {
  a && "function" == typeof a.Fa && a.Fa()
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
t.t = p();
t.Fa = p();
t.ja = n;
t.defaultPrevented = n;
t.Ta = j;
t.preventDefault = function() {
  this.defaultPrevented = j;
  this.Ta = n
};
function Ib(a) {
  Ib[" "](a);
  return a
}
Ib[" "] = ea;
function Jb(a, b) {
  a && this.La(a, b)
}
A(Jb, O);
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
t.yb = k;
t.La = function(a, b) {
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
  this.offsetX = C || a.offsetX !== h ? a.offsetX : a.layerX;
  this.offsetY = C || a.offsetY !== h ? a.offsetY : a.layerY;
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
  this.state = a.state;
  this.yb = a;
  a.defaultPrevented && this.preventDefault();
  delete this.ja
};
t.preventDefault = function() {
  Jb.na.preventDefault.call(this);
  var a = this.yb;
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
t.t = p();
var Kb = {}, P = {}, E = {}, Lb = {};
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
    var i = i[d], l = x(a), o;
    i.B++;
    if(i[l]) {
      o = i[l];
      for(g = 0;g < o.length;g++) {
        if(i = o[g], i.wa == c && i.jb == e) {
          if(i.la) {
            break
          }
          return o[g].key
        }
      }
    }else {
      o = i[l] = [], i.f++
    }
    g = Nb();
    g.src = a;
    i = new Ab;
    i.La(c, g, a, b, d, e);
    c = i.key;
    g.key = c;
    o.push(i);
    Kb[c] = i;
    E[l] || (E[l] = []);
    E[l].push(i);
    a.addEventListener ? (a == u || !a.vb) && a.addEventListener(b, g, d) : a.attachEvent(b in Lb ? Lb[b] : Lb[b] = "on" + b, g);
    return c
  }
  f(Error("Invalid event type"))
}
function Nb() {
  var a = Ob, b = Cb ? function(c) {
    return a.call(b.src, b.key, c)
  } : function(c) {
    c = a.call(b.src, b.key, c);
    if(!c) {
      return c
    }
  };
  return b
}
function Pb(a, b, c, d, e) {
  if(v(b)) {
    for(var g = 0;g < b.length;g++) {
      Pb(a, b[g], c, d, e)
    }
  }else {
    d = !!d;
    a: {
      g = P;
      if(b in g && (g = g[b], d in g && (g = g[d], a = x(a), g[a]))) {
        a = g[a];
        break a
      }
      a = k
    }
    if(a) {
      for(g = 0;g < a.length;g++) {
        if(a[g].wa == c && a[g].capture == d && a[g].jb == e) {
          Qb(a[g].key);
          break
        }
      }
    }
  }
}
function Qb(a) {
  if(!Kb[a]) {
    return n
  }
  var b = Kb[a];
  if(b.la) {
    return n
  }
  var c = b.src, d = b.type, e = b.Sb, g = b.capture;
  c.removeEventListener ? (c == u || !c.vb) && c.removeEventListener(d, e, g) : c.detachEvent && c.detachEvent(d in Lb ? Lb[d] : Lb[d] = "on" + d, e);
  c = x(c);
  if(E[c]) {
    var e = E[c], i = Wa(e, b);
    0 <= i && G.splice.call(e, i, 1);
    0 == e.length && delete E[c]
  }
  b.la = j;
  if(b = P[d][g][c]) {
    b.Kb = j, Rb(d, g, c, b)
  }
  delete Kb[a];
  return j
}
function Rb(a, b, c, d) {
  if(!d.Na && d.Kb) {
    for(var e = 0, g = 0;e < d.length;e++) {
      d[e].la ? d[e].Sb.src = k : (e != g && (d[g] = d[e]), g++)
    }
    d.length = g;
    d.Kb = n;
    0 == g && (delete P[a][b][c], P[a][b].f--, 0 == P[a][b].f && (delete P[a][b], P[a].f--), 0 == P[a].f && delete P[a])
  }
}
function Sb(a) {
  var b, c = 0, d = b == k;
  b = !!b;
  if(a == k) {
    Ra(function(a) {
      for(var e = a.length - 1;0 <= e;e--) {
        var g = a[e];
        if(d || b == g.capture) {
          Qb(g.key), c++
        }
      }
    })
  }else {
    if(a = x(a), E[a]) {
      for(var a = E[a], e = a.length - 1;0 <= e;e--) {
        var g = a[e];
        if(d || b == g.capture) {
          Qb(g.key), c++
        }
      }
    }
  }
}
function Tb(a, b, c, d, e) {
  var g = 1, b = x(b);
  if(a[b]) {
    a.B--;
    a = a[b];
    a.Na ? a.Na++ : a.Na = 1;
    try {
      for(var i = a.length, l = 0;l < i;l++) {
        var o = a[l];
        o && !o.la && (g &= Ub(o, e) !== n)
      }
    }finally {
      a.Na--, Rb(c, d, b, a)
    }
  }
  return Boolean(g)
}
function Ub(a, b) {
  a.tb && Qb(a.key);
  return a.handleEvent(b)
}
function Ob(a, b) {
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
    var l = j in e, o = n in e;
    if(l) {
      if(0 > g.keyCode || g.returnValue != h) {
        return j
      }
      a: {
        var m = n;
        if(0 == g.keyCode) {
          try {
            g.keyCode = -1;
            break a
          }catch(r) {
            m = j
          }
        }
        if(m || g.returnValue == h) {
          g.returnValue = j
        }
      }
    }
    m = new Jb;
    m.La(g, this);
    g = j;
    try {
      if(l) {
        for(var q = [], wa = m.currentTarget;wa;wa = wa.parentNode) {
          q.push(wa)
        }
        i = e[j];
        i.B = i.f;
        for(var F = q.length - 1;!m.ja && 0 <= F && i.B;F--) {
          m.currentTarget = q[F], g &= Tb(i, q[F], d, j, m)
        }
        if(o) {
          i = e[n];
          i.B = i.f;
          for(F = 0;!m.ja && F < q.length && i.B;F++) {
            m.currentTarget = q[F], g &= Tb(i, q[F], d, n, m)
          }
        }
      }else {
        g = Ub(c, m)
      }
    }finally {
      q && (q.length = 0)
    }
    return g
  }
  d = new Jb(b, this);
  return g = Ub(c, d)
}
;function Vb() {
  N.call(this)
}
A(Vb, N);
t = Vb.prototype;
t.vb = j;
t.nb = k;
t.addEventListener = function(a, b, c, d) {
  Mb(this, a, b, c, d)
};
t.removeEventListener = function(a, b, c, d) {
  Pb(this, a, b, c, d)
};
t.dispatchEvent = function(a) {
  var b = a.type || a, c = P;
  if(b in c) {
    if(w(a)) {
      a = new O(a, this)
    }else {
      if(a instanceof O) {
        a.target = a.target || this
      }else {
        var d = a, a = new O(b, this);
        Va(a, d)
      }
    }
    var d = 1, e, c = c[b], b = j in c, g;
    if(b) {
      e = [];
      for(g = this;g;g = g.nb) {
        e.push(g)
      }
      g = c[j];
      g.B = g.f;
      for(var i = e.length - 1;!a.ja && 0 <= i && g.B;i--) {
        a.currentTarget = e[i], d &= Tb(g, e[i], a.type, j, a) && a.Ta != n
      }
    }
    if(n in c) {
      if(g = c[n], g.B = g.f, b) {
        for(i = 0;!a.ja && i < e.length && g.B;i++) {
          a.currentTarget = e[i], d &= Tb(g, e[i], a.type, n, a) && a.Ta != n
        }
      }else {
        for(e = this;!a.ja && e && g.B;e = e.nb) {
          a.currentTarget = e, d &= Tb(g, e, a.type, n, a) && a.Ta != n
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
  Vb.na.t.call(this);
  Sb(this);
  this.nb = k
};
function Wb(a, b) {
  N.call(this);
  this.aa = a || 1;
  this.Ca = b || Q;
  this.bb = y(this.Ac, this);
  this.mb = z()
}
A(Wb, Vb);
Wb.prototype.enabled = n;
var Q = u.window;
t = Wb.prototype;
t.r = k;
t.setInterval = function(a) {
  this.aa = a;
  this.r && this.enabled ? (this.stop(), this.start()) : this.r && this.stop()
};
t.Ac = function() {
  if(this.enabled) {
    var a = z() - this.mb;
    0 < a && a < 0.8 * this.aa ? this.r = this.Ca.setTimeout(this.bb, this.aa - a) : (this.dispatchEvent(Xb), this.enabled && (this.r = this.Ca.setTimeout(this.bb, this.aa), this.mb = z()))
  }
};
t.start = function() {
  this.enabled = j;
  this.r || (this.r = this.Ca.setTimeout(this.bb, this.aa), this.mb = z())
};
t.stop = function() {
  this.enabled = n;
  this.r && (this.Ca.clearTimeout(this.r), this.r = k)
};
t.t = function() {
  Wb.na.t.call(this);
  this.stop();
  delete this.Ca
};
var Xb = "tick";
function Yb(a) {
  N.call(this);
  this.e = a;
  this.j = []
}
A(Yb, N);
var Zb = [];
function $b(a, b, c, d) {
  v(c) || (Zb[0] = c, c = Zb);
  for(var e = 0;e < c.length;e++) {
    a.j.push(Mb(b, c[e], d || a, n, a.e || a))
  }
}
Yb.prototype.t = function() {
  Yb.na.t.call(this);
  Xa(this.j, Qb);
  this.j.length = 0
};
Yb.prototype.handleEvent = function() {
  f(Error("EventHandler.handleEvent not implemented"))
};
function ac(a, b, c) {
  N.call(this);
  this.lc = a;
  this.aa = b;
  this.e = c;
  this.ec = y(this.rc, this)
}
A(ac, N);
t = ac.prototype;
t.Ua = n;
t.Rb = 0;
t.r = k;
t.stop = function() {
  this.r && (Q.clearTimeout(this.r), this.r = k, this.Ua = n)
};
t.t = function() {
  ac.na.t.call(this);
  this.stop()
};
t.rc = function() {
  this.r = k;
  this.Ua && !this.Rb && (this.Ua = n, bc(this))
};
function bc(a) {
  var b;
  b = a.ec;
  var c = a.aa;
  ha(b) || (b && "function" == typeof b.handleEvent ? b = y(b.handleEvent, b) : f(Error("Invalid listener argument")));
  b = 2147483647 < c ? -1 : Q.setTimeout(b, c || 0);
  a.r = b;
  a.lc.call(a.e)
}
;function R(a, b, c, d, e) {
  this.b = a;
  this.a = b;
  this.W = c;
  this.C = d;
  this.Aa = e || 1;
  this.Ba = cc;
  this.hb = new Yb(this);
  this.Pa = new Wb;
  this.Pa.setInterval(dc)
}
t = R.prototype;
t.u = k;
t.I = n;
t.ra = k;
t.qb = k;
t.za = k;
t.oa = k;
t.S = k;
t.v = k;
t.U = k;
t.l = k;
t.Da = 0;
t.J = k;
t.pa = k;
t.q = k;
t.h = -1;
t.Vb = j;
t.X = n;
t.ka = 0;
t.Qa = k;
var cc = 45E3, dc = 250;
function ec(a, b) {
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
var fc = {}, gc = {};
function hc() {
  return!B || B && 10 <= Ma
}
t = R.prototype;
t.V = s("u");
t.setTimeout = s("Ba");
t.Yb = s("ka");
function ic(a, b, c) {
  a.oa = 1;
  a.S = K(b.n());
  a.U = c;
  a.wb = j;
  jc(a, k)
}
function kc(a, b, c, d, e) {
  a.oa = 1;
  a.S = K(b.n());
  a.U = k;
  a.wb = c;
  e && (a.Vb = n);
  jc(a, d)
}
function jc(a, b) {
  a.za = z();
  lc(a);
  a.v = a.S.n();
  qb(a.v, "t", a.Aa);
  a.Da = 0;
  a.l = a.b.fb(a.b.Va() ? b : k);
  0 < a.ka && (a.Qa = new ac(y(a.ac, a, a.l), a.ka));
  $b(a.hb, a.l, "readystatechange", a.xc);
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
  a.U ? (a.pa = "POST", c["Content-Type"] = "application/x-www-form-urlencoded", a.l.send(a.v, a.pa, a.U, c)) : (a.pa = "GET", a.Vb && !C && (c.Connection = "close"), a.l.send(a.v, a.pa, k, c));
  a.b.F(mc);
  if(d = a.U) {
    c = "";
    d = d.split("&");
    for(e = 0;e < d.length;e++) {
      var g = d[e].split("=");
      if(1 < g.length) {
        var i = g[0], g = g[1], l = i.split("_");
        c = 2 <= l.length && "type" == l[1] ? c + (i + "=" + g + "&") : c + (i + "=redacted&")
      }
    }
  }else {
    c = k
  }
  a.a.info("XMLHTTP REQ (" + a.C + ") [attempt " + a.Aa + "]: " + a.pa + "\n" + a.v + "\n" + c)
}
t.xc = function(a) {
  var a = a.target, b = this.Qa;
  b && 3 == S(a) ? (this.a.debug("Throttling readystatechange."), !b.r && !b.Rb ? bc(b) : b.Ua = j) : this.ac(a)
};
t.ac = function(a) {
  try {
    if(a == this.l) {
      a: {
        var b = S(this.l), c = this.l.ha, d = nc(this.l);
        if(!hc() || C && !D("420+")) {
          if(4 > b) {
            break a
          }
        }else {
          if(3 > b || 3 == b && !Ba && !oc(this.l)) {
            break a
          }
        }
        !this.X && (4 == b && c != pc) && (c == qc || 0 >= d ? this.b.F(rc) : this.b.F(sc));
        tc(this);
        var e = nc(this.l);
        this.h = e;
        var g = oc(this.l);
        g || this.a.debug("No response text for uri " + this.v + " status " + e);
        this.I = 200 == e;
        this.a.info("XMLHTTP RESP (" + this.C + ") [ attempt " + this.Aa + "]: " + this.pa + "\n" + this.v + "\n" + b + " " + e);
        if(this.I) {
          if(4 == b && T(this), this.wb ? (uc(this, b, g), Ba && 3 == b && ($b(this.hb, this.Pa, Xb, this.wc), this.Pa.start())) : (vc(this.a, this.C, g, k), wc(this, g)), this.I && !this.X) {
            4 == b ? this.b.ia(this) : (this.I = n, lc(this))
          }
        }else {
          this.q = 400 == e && 0 < g.indexOf("Unknown SID") ? 3 : 0, U(), vc(this.a, this.C, g), T(this), xc(this)
        }
      }
    }else {
      this.a.qa("Called back with an unexpected xmlhttp")
    }
  }catch(i) {
    this.a.debug("Failed call to OnXmlHttpReadyStateChanged_"), this.l && oc(this.l) ? yc(this.a, i, "ResponseText: " + oc(this.l)) : yc(this.a, i, "No response text")
  }finally {
  }
};
function uc(a, b, c) {
  for(var d = j;!a.X && a.Da < c.length;) {
    var e = zc(a, c);
    if(e == gc) {
      4 == b && (a.q = 4, U(), d = n);
      vc(a.a, a.C, k, "[Incomplete Response]");
      break
    }else {
      if(e == fc) {
        a.q = 4;
        U();
        vc(a.a, a.C, c, "[Invalid Chunk]");
        d = n;
        break
      }else {
        vc(a.a, a.C, e, k), wc(a, e)
      }
    }
  }
  4 == b && 0 == c.length && (a.q = 1, U(), d = n);
  a.I = a.I && d;
  d || (vc(a.a, a.C, c, "[Invalid Chunked Response]"), T(a), xc(a))
}
t.wc = function() {
  var a = S(this.l), b = oc(this.l);
  this.Da < b.length && (tc(this), uc(this, a, b), this.I && 4 != a && lc(this))
};
function zc(a, b) {
  var c = a.Da, d = b.indexOf("\n", c);
  if(-1 == d) {
    return gc
  }
  c = Number(b.substring(c, d));
  if(isNaN(c)) {
    return fc
  }
  d += 1;
  if(d + c > b.length) {
    return gc
  }
  var e = b.substr(d, c);
  a.Da = d + c;
  return e
}
function Ac(a, b) {
  a.za = z();
  lc(a);
  var c = b ? window.location.hostname : "";
  a.v = a.S.n();
  J(a.v, "DOMAIN", c);
  J(a.v, "t", a.Aa);
  try {
    a.J = new ActiveXObject("htmlfile")
  }catch(d) {
    a.a.H("ActiveX blocked");
    T(a);
    a.q = 7;
    U();
    xc(a);
    return
  }
  var e = "<html><body>";
  b && (e += '<script>document.domain="' + c + '"<\/script>');
  e += "</body></html>";
  a.J.open();
  a.J.write(e);
  a.J.close();
  a.J.parentWindow.m = y(a.uc, a);
  a.J.parentWindow.d = y(a.Qb, a, j);
  a.J.parentWindow.rpcClose = y(a.Qb, a, n);
  c = a.J.createElement("div");
  a.J.parentWindow.document.body.appendChild(c);
  c.innerHTML = '<iframe src="' + a.v + '"></iframe>';
  a.a.info("TRIDENT REQ (" + a.C + ") [ attempt " + a.Aa + "]: GET\n" + a.v);
  a.b.F(mc)
}
t.uc = function(a) {
  V(y(this.tc, this, a), 0)
};
t.tc = function(a) {
  if(!this.X) {
    var b = this.a;
    b.info("TRIDENT TEXT (" + this.C + "): " + Bc(b, a));
    tc(this);
    wc(this, a);
    lc(this)
  }
};
t.Qb = function(a) {
  V(y(this.sc, this, a), 0)
};
t.sc = function(a) {
  this.X || (this.a.info("TRIDENT TEXT (" + this.C + "): " + a ? "success" : "failure"), T(this), this.I = a, this.b.ia(this), this.b.F(Cc))
};
t.jc = function() {
  tc(this);
  this.b.ia(this)
};
t.cancel = function() {
  this.X = j;
  T(this)
};
function lc(a) {
  a.qb = z() + a.Ba;
  Dc(a, a.Ba)
}
function Dc(a, b) {
  a.ra != k && f(Error("WatchDog timer not null"));
  a.ra = V(y(a.vc, a), b)
}
function tc(a) {
  a.ra && (u.clearTimeout(a.ra), a.ra = k)
}
t.vc = function() {
  this.ra = k;
  var a = z();
  0 <= a - this.qb ? (this.I && this.a.H("Received watchdog timeout even though request loaded successfully"), this.a.info("TIMEOUT: " + this.v), 2 != this.oa && this.b.F(rc), T(this), this.q = 2, U(), xc(this)) : (this.a.qa("WatchDog timer called too early"), Dc(this, this.qb - a))
};
function xc(a) {
  !a.b.Fb() && !a.X && a.b.ia(a)
}
function T(a) {
  tc(a);
  Hb(a.Qa);
  a.Qa = k;
  a.Pa.stop();
  var b = a.hb;
  Xa(b.j, Qb);
  b.j.length = 0;
  a.l && (b = a.l, a.l = k, b.abort(), b.Fa());
  a.J && (a.J = k)
}
t.Cb = aa("q");
function wc(a, b) {
  try {
    a.b.Nb(a, b), a.b.F(Cc)
  }catch(c) {
    yc(a.a, c, "Error in httprequest callback")
  }
}
;function Ec(a) {
  a = "" + a;
  if(/^\s*$/.test(a) ? 0 : /^[\],:{}\s\u2028\u2029]*$/.test(a.replace(/\\["\\\/bfnrtu]/g, "@").replace(/"[^"\\\n\r\u2028\u2029\x00-\x08\x0a-\x1f]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:[\s\u2028\u2029]*\[)+/g, ""))) {
    try {
      return eval("(" + a + ")")
    }catch(b) {
    }
  }
  f(Error("Invalid JSON string: " + a))
}
function Fc(a) {
  return eval("(" + a + ")")
}
function Gc(a) {
  var b = [];
  Hc(new Ic, a, b);
  return b.join("")
}
function Ic() {
  this.Sa = h
}
function Hc(a, b, c) {
  switch(typeof b) {
    case "string":
      Jc(b, c);
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
          c.push(e), e = b[g], Hc(a, a.Sa ? a.Sa.call(b, "" + g, e) : e, c), e = ","
        }
        c.push("]");
        break
      }
      c.push("{");
      d = "";
      for(g in b) {
        Object.prototype.hasOwnProperty.call(b, g) && (e = b[g], "function" != typeof e && (c.push(d), Jc(g, c), c.push(":"), Hc(a, a.Sa ? a.Sa.call(b, g, e) : e, c), d = ","))
      }
      c.push("}");
      break;
    case "function":
      break;
    default:
      f(Error("Unknown type: " + typeof b))
  }
}
var Kc = {'"':'\\"', "\\":"\\\\", "/":"\\/", "\u0008":"\\b", "\u000c":"\\f", "\n":"\\n", "\r":"\\r", "\t":"\\t", "\x0B":"\\u000b"}, Lc = /\uffff/.test("\uffff") ? /[\\\"\x00-\x1f\x7f-\uffff]/g : /[\\\"\x00-\x1f\x7f-\xff]/g;
function Jc(a, b) {
  b.push('"', a.replace(Lc, function(a) {
    if(a in Kc) {
      return Kc[a]
    }
    var b = a.charCodeAt(0), e = "\\u";
    16 > b ? e += "000" : 256 > b ? e += "00" : 4096 > b && (e += "0");
    return Kc[a] = e + b.toString(16)
  }), '"')
}
;function Mc(a) {
  return Nc(a || arguments.callee.caller, [])
}
function Nc(a, b) {
  var c = [];
  if(0 <= Wa(b, a)) {
    c.push("[...circular reference...]")
  }else {
    if(a && 50 > b.length) {
      c.push(Oc(a) + "(");
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
            g = "" + g;
            break;
          case "boolean":
            g = g ? "true" : "false";
            break;
          case "function":
            g = (g = Oc(g)) ? g : "[fn]";
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
        c.push(Nc(a.caller, b))
      }catch(i) {
        c.push("[exception trying to get caller]\n")
      }
    }else {
      a ? c.push("[...long stack...]") : c.push("[end]")
    }
  }
  return c.join("")
}
function Oc(a) {
  if(Pc[a]) {
    return Pc[a]
  }
  a = "" + a;
  if(!Pc[a]) {
    var b = /function ([^\(]+)/.exec(a);
    Pc[a] = b ? b[1] : "[Anonymous]"
  }
  return Pc[a]
}
var Pc = {};
function Qc(a, b, c, d, e) {
  this.reset(a, b, c, d, e)
}
Qc.prototype.Ab = k;
Qc.prototype.zb = k;
var Rc = 0;
Qc.prototype.reset = function(a, b, c, d, e) {
  "number" == typeof e || Rc++;
  d || z();
  this.va = a;
  this.mc = b;
  delete this.Ab;
  delete this.zb
};
Qc.prototype.Wb = s("va");
function W(a) {
  this.nc = a
}
W.prototype.Oa = k;
W.prototype.va = k;
W.prototype.cb = k;
W.prototype.Db = k;
function Sc(a, b) {
  this.name = a;
  this.value = b
}
Sc.prototype.toString = aa("name");
var Tc = new Sc("SEVERE", 1E3), Uc = new Sc("WARNING", 900), Vc = new Sc("INFO", 800), Wc = new Sc("CONFIG", 700), Xc = new Sc("FINE", 500);
t = W.prototype;
t.getParent = aa("Oa");
t.Wb = s("va");
function Yc(a) {
  if(a.va) {
    return a.va
  }
  if(a.Oa) {
    return Yc(a.Oa)
  }
  Pa("Root logger has no level set.");
  return k
}
t.log = function(a, b, c) {
  if(a.value >= Yc(this).value) {
    a = this.ic(a, b, c);
    b = "log:" + a.mc;
    u.console && (u.console.timeStamp ? u.console.timeStamp(b) : u.console.markTimeline && u.console.markTimeline(b));
    u.msWriteProfilerMark && u.msWriteProfilerMark(b);
    for(b = this;b;) {
      var c = b, d = a;
      if(c.Db) {
        for(var e = 0, g = h;g = c.Db[e];e++) {
          g(d)
        }
      }
      b = b.getParent()
    }
  }
};
t.ic = function(a, b, c) {
  var d = new Qc(a, "" + b, this.nc);
  if(c) {
    d.Ab = c;
    var e;
    var g = arguments.callee.caller;
    try {
      var i;
      var l = da("window.location.href");
      if(w(c)) {
        i = {message:c, name:"Unknown error", lineNumber:"Not available", fileName:l, stack:"Not available"}
      }else {
        var o, m, r = n;
        try {
          o = c.lineNumber || c.Bc || "Not available"
        }catch(q) {
          o = "Not available", r = j
        }
        try {
          m = c.fileName || c.filename || c.sourceURL || l
        }catch(wa) {
          m = "Not available", r = j
        }
        i = r || !c.lineNumber || !c.fileName || !c.stack ? {message:c.message, name:c.name, lineNumber:o, fileName:m, stack:c.stack || "Not available"} : c
      }
      e = "Message: " + na(i.message) + '\nUrl: <a href="view-source:' + i.fileName + '" target="_new">' + i.fileName + "</a>\nLine: " + i.lineNumber + "\n\nBrowser stack:\n" + na(i.stack + "-> ") + "[end]\n\nJS stack traversal:\n" + na(Mc(g) + "-> ")
    }catch(F) {
      e = "Exception trying to expose exception! You win, we lose. " + F
    }
    d.zb = e
  }
  return d
};
t.H = function(a, b) {
  this.log(Tc, a, b)
};
t.qa = function(a, b) {
  this.log(Uc, a, b)
};
t.info = function(a, b) {
  this.log(Vc, a, b)
};
function X(a, b) {
  a.log(Xc, b, h)
}
var Zc = {}, $c = k;
function ad(a) {
  $c || ($c = new W(""), Zc[""] = $c, $c.Wb(Wc));
  var b;
  if(!(b = Zc[a])) {
    b = new W(a);
    var c = a.lastIndexOf("."), d = a.substr(c + 1), c = ad(a.substr(0, c));
    c.cb || (c.cb = {});
    c.cb[d] = b;
    b.Oa = c;
    Zc[a] = b
  }
  return b
}
;function bd() {
  this.p = ad("goog.net.BrowserChannel")
}
function vc(a, b, c, d) {
  a.info("XMLHTTP TEXT (" + b + "): " + Bc(a, c) + (d ? " " + d : ""))
}
bd.prototype.debug = function(a) {
  this.info(a)
};
function yc(a, b, c) {
  a.H((c || "Exception") + b)
}
bd.prototype.info = function(a) {
  this.p.info(a)
};
bd.prototype.qa = function(a) {
  this.p.qa(a)
};
bd.prototype.H = function(a) {
  this.p.H(a)
};
function Bc(a, b) {
  if(!b || b == cd) {
    return b
  }
  try {
    var c = Fc(b);
    if(c) {
      for(var d = 0;d < c.length;d++) {
        if(v(c[d])) {
          var e = c[d];
          if(!(2 > e.length)) {
            var g = e[1];
            if(v(g) && !(1 > g.length)) {
              var i = g[0];
              if("noop" != i && "stop" != i) {
                for(var l = 1;l < g.length;l++) {
                  g[l] = ""
                }
              }
            }
          }
        }
      }
    }
    return Gc(c)
  }catch(o) {
    return a.debug("Exception parsing expected JS array - probably was not JS"), b
  }
}
;function dd(a, b) {
  this.O = b ? Fc : Ec
}
dd.prototype.parse = function(a) {
  return this.O(a)
};
var pc = 7, qc = 8;
function ed(a) {
  N.call(this);
  this.headers = new bb;
  this.sa = a || k
}
A(ed, Vb);
ed.prototype.p = ad("goog.net.XhrIo");
var fd = /^https?$/i;
t = ed.prototype;
t.R = n;
t.g = k;
t.Za = k;
t.Ma = "";
t.Hb = "";
t.ha = 0;
t.q = "";
t.gb = n;
t.Ka = n;
t.kb = n;
t.$ = n;
t.Xa = 0;
t.ba = k;
t.Ub = "";
t.$b = n;
t.send = function(a, b, c, d) {
  this.g && f(Error("[goog.net.XhrIo] Object is active with another request=" + this.Ma + "; newUri=" + a));
  b = b ? b.toUpperCase() : "GET";
  this.Ma = a;
  this.q = "";
  this.ha = 0;
  this.Hb = b;
  this.gb = n;
  this.R = j;
  this.g = this.sa ? xb(this.sa) : xb(vb);
  this.Za = this.sa ? this.sa.Ea || (this.sa.Ea = zb(this.sa)) : vb.Ea || (vb.Ea = zb(vb));
  this.g.onreadystatechange = y(this.Mb, this);
  try {
    X(this.p, Y(this, "Opening Xhr")), this.kb = j, this.g.open(b, a, j), this.kb = n
  }catch(e) {
    X(this.p, Y(this, "Error opening Xhr: " + e.message));
    gd(this, e);
    return
  }
  var a = c || "", g = this.headers.n();
  d && ab(d, function(a, b) {
    g.set(b, a)
  });
  d = u.FormData && a instanceof u.FormData;
  "POST" == b && (!g.ea("Content-Type") && !d) && g.set("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
  ab(g, function(a, b) {
    this.g.setRequestHeader(b, a)
  }, this);
  this.Ub && (this.g.responseType = this.Ub);
  "withCredentials" in this.g && (this.g.withCredentials = this.$b);
  try {
    this.ba && (Q.clearTimeout(this.ba), this.ba = k), 0 < this.Xa && (X(this.p, Y(this, "Will abort after " + this.Xa + "ms if incomplete")), this.ba = Q.setTimeout(y(this.Ba, this), this.Xa)), X(this.p, Y(this, "Sending request")), this.Ka = j, this.g.send(a), this.Ka = n
  }catch(i) {
    X(this.p, Y(this, "Send error: " + i.message)), gd(this, i)
  }
};
t.Ba = function() {
  "undefined" != typeof ca && this.g && (this.q = "Timed out after " + this.Xa + "ms, aborting", this.ha = qc, X(this.p, Y(this, this.q)), this.dispatchEvent("timeout"), this.abort(qc))
};
function gd(a, b) {
  a.R = n;
  a.g && (a.$ = j, a.g.abort(), a.$ = n);
  a.q = b;
  a.ha = 5;
  hd(a);
  id(a)
}
function hd(a) {
  a.gb || (a.gb = j, a.dispatchEvent("complete"), a.dispatchEvent("error"))
}
t.abort = function(a) {
  this.g && this.R && (X(this.p, Y(this, "Aborting")), this.R = n, this.$ = j, this.g.abort(), this.$ = n, this.ha = a || pc, this.dispatchEvent("complete"), this.dispatchEvent("abort"), id(this))
};
t.t = function() {
  this.g && (this.R && (this.R = n, this.$ = j, this.g.abort(), this.$ = n), id(this, j));
  ed.na.t.call(this)
};
t.Mb = function() {
  !this.kb && !this.Ka && !this.$ ? this.qc() : jd(this)
};
t.qc = function() {
  jd(this)
};
function jd(a) {
  if(a.R && "undefined" != typeof ca) {
    if(a.Za[1] && 4 == S(a) && 2 == nc(a)) {
      X(a.p, Y(a, "Local request error detected and ignored"))
    }else {
      if(a.Ka && 4 == S(a)) {
        Q.setTimeout(y(a.Mb, a), 0)
      }else {
        if(a.dispatchEvent("readystatechange"), 4 == S(a)) {
          X(a.p, Y(a, "Request complete"));
          a.R = n;
          try {
            var b = nc(a), c, d;
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
                var g = ("" + a.Ma).match(Qa)[1] || k;
                if(!g && self.location) {
                  var i = self.location.protocol, g = i.substr(0, i.length - 1)
                }
                e = !fd.test(g ? g.toLowerCase() : "")
              }
              c = e
            }
            if(c) {
              a.dispatchEvent("complete"), a.dispatchEvent("success")
            }else {
              a.ha = 6;
              var l;
              try {
                l = 2 < S(a) ? a.g.statusText : ""
              }catch(o) {
                X(a.p, "Can not get status: " + o.message), l = ""
              }
              a.q = l + " [" + nc(a) + "]";
              hd(a)
            }
          }finally {
            id(a)
          }
        }
      }
    }
  }
}
function id(a, b) {
  if(a.g) {
    var c = a.g, d = a.Za[0] ? ea : k;
    a.g = k;
    a.Za = k;
    a.ba && (Q.clearTimeout(a.ba), a.ba = k);
    b || a.dispatchEvent("ready");
    try {
      c.onreadystatechange = d
    }catch(e) {
      a.p.H("Problem encountered resetting onreadystatechange: " + e.message)
    }
  }
}
t.isActive = function() {
  return!!this.g
};
function S(a) {
  return a.g ? a.g.readyState : 0
}
function nc(a) {
  try {
    return 2 < S(a) ? a.g.status : -1
  }catch(b) {
    return a.p.qa("Can not get status: " + b.message), -1
  }
}
function oc(a) {
  try {
    return a.g ? a.g.responseText : ""
  }catch(b) {
    return X(a.p, "Can not get responseText: " + b.message), ""
  }
}
t.Cb = function() {
  return w(this.q) ? this.q : "" + this.q
};
function Y(a, b) {
  return b + " [" + a.Hb + " " + a.Ma + " " + nc(a) + "]"
}
;function kd() {
  this.Tb = z()
}
new kd;
kd.prototype.set = s("Tb");
kd.prototype.reset = function() {
  this.set(z())
};
kd.prototype.get = aa("Tb");
function ld(a, b, c, d, e) {
  (new bd).debug("TestLoadImageWithRetries: " + e);
  if(0 == d) {
    c(n)
  }else {
    var g = e || 0;
    d--;
    md(a, b, function(e) {
      e ? c(j) : u.setTimeout(function() {
        ld(a, b, c, d, g)
      }, g)
    })
  }
}
function md(a, b, c) {
  var d = new bd;
  d.debug("TestLoadImage: loading " + a);
  var e = new Image, g = k;
  createHandler = function(a, b) {
    return function() {
      try {
        d.debug("TestLoadImage: " + b), e.onload = k, e.onerror = k, e.onabort = k, e.ontimeout = k, u.clearTimeout(g), c(a)
      }catch(o) {
        yc(d, o)
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
;function nd(a, b) {
  this.b = a;
  this.a = b;
  this.O = new dd(0, j)
}
t = nd.prototype;
t.u = k;
t.w = k;
t.Ra = n;
t.Zb = k;
t.Ha = k;
t.lb = k;
t.G = k;
t.c = k;
t.h = -1;
t.M = k;
t.ab = k;
t.V = s("u");
t.Xb = s("O");
t.eb = function(a) {
  this.G = a;
  a = od(this.b, this.G);
  U();
  qb(a, "MODE", "init");
  this.w = new R(this, this.a, h, h, h);
  this.w.V(this.u);
  kc(this.w, a, n, k, j);
  this.c = 0;
  this.Zb = z()
};
t.fc = function(a) {
  if(a) {
    this.c = 2, pd(this)
  }else {
    U();
    var b = this.b;
    b.a.debug("Test Connection Blocked");
    b.h = b.T.h;
    Z(b, 9)
  }
  a && this.F(sc)
};
function pd(a) {
  a.a.debug("TestConnection: starting stage 2");
  a.w = new R(a, a.a, h, h, h);
  a.w.V(a.u);
  var b = qd(a.b, a.M, a.G);
  U();
  if(hc()) {
    qb(b, "TYPE", "xmlhttp"), kc(a.w, b, n, a.M, n)
  }else {
    qb(b, "TYPE", "html");
    var c = a.w, a = Boolean(a.M);
    c.oa = 3;
    c.S = K(b.n());
    Ac(c, a)
  }
}
t.fb = function(a) {
  return this.b.fb(a)
};
t.abort = function() {
  this.w && (this.w.cancel(), this.w = k);
  this.h = -1
};
t.Fb = ba(n);
t.Nb = function(a, b) {
  this.h = a.h;
  if(0 == this.c) {
    if(this.a.debug("TestConnection: Got data for stage 1"), b) {
      try {
        var c = this.O.parse(b)
      }catch(d) {
        yc(this.a, d);
        rd(this.b, this);
        return
      }
      this.M = this.b.correctHostPrefix(c[0]);
      this.ab = c[1]
    }else {
      this.a.debug("TestConnection: Null responseText"), rd(this.b, this)
    }
  }else {
    if(2 == this.c) {
      if(this.Ra) {
        U(), this.lb = z()
      }else {
        if("11111" == b) {
          if(U(), this.Ra = j, this.Ha = z(), c = this.Ha - this.Zb, hc() || 500 > c) {
            this.h = 200, this.w.cancel(), this.a.debug("Test connection succeeded; using streaming connection"), U(), sd(this.b, this, j)
          }
        }else {
          U(), this.Ha = this.lb = z(), this.Ra = n
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
        var a = td(this.b, this.ab, "/mail/images/cleardot.gif");
        K(a);
        ld(a.toString(), 5E3, y(this.fc, this), 3, 2E3);
        this.F(mc)
      }else {
        this.c = 2, pd(this)
      }
    }else {
      2 == this.c && (this.a.debug("TestConnection: request complete for stage 2"), a = n, (a = hc() ? this.Ra : 200 > this.lb - this.Ha ? n : j) ? (this.a.debug("Test connection succeeded; using streaming connection"), U(), sd(this.b, this, j)) : (this.a.debug("Test connection failed; not using streaming"), U(), sd(this.b, this, n)))
    }
  }else {
    this.a.debug("TestConnection: request failed, in state " + this.c), 0 == this.c ? U() : 2 == this.c && U(), rd(this.b, this)
  }
};
t.Va = function() {
  return this.b.Va()
};
t.isActive = function() {
  return this.b.isActive()
};
t.F = function(a) {
  this.b.F(a)
};
function ud(a) {
  this.ub = a || k;
  this.c = vd;
  this.s = [];
  this.P = [];
  this.a = new bd;
  this.O = new dd(0, j)
}
function wd(a, b) {
  this.Jb = a;
  this.map = b
}
t = ud.prototype;
t.u = k;
t.ta = k;
t.o = k;
t.k = k;
t.G = k;
t.Ia = k;
t.sb = k;
t.M = k;
t.cc = j;
t.xa = 0;
t.oc = 0;
t.Ga = n;
t.e = k;
t.D = k;
t.K = k;
t.Y = k;
t.T = k;
t.pb = k;
t.bc = j;
t.ua = -1;
t.Ib = -1;
t.h = -1;
t.Z = 0;
t.ca = 0;
t.dc = 5E3;
t.yc = 1E4;
t.ib = 2;
t.Bb = 2E4;
t.ka = 0;
t.Wa = n;
t.da = 8;
var vd = 1, xd = new Vb;
function yd(a) {
  O.call(this, "statevent", a)
}
A(yd, O);
function zd(a, b) {
  O.call(this, "timingevent", a);
  this.size = b
}
A(zd, O);
var mc = 1, sc = 2, rc = 3, Cc = 4;
function Ad(a) {
  O.call(this, "serverreachability", a)
}
A(Ad, O);
var cd = "y2f%";
t = ud.prototype;
t.eb = function(a, b, c, d, e) {
  this.a.debug("connect()");
  U();
  this.G = b;
  this.ta = c || {};
  d && e !== h && (this.ta.OSID = d, this.ta.OAID = e);
  this.a.debug("connectTest_()");
  Bd(this) && (this.T = new nd(this, this.a), this.T.V(this.u), this.T.Xb(this.O), this.T.eb(a))
};
function Cd(a) {
  a.T && (a.T.abort(), a.T = k);
  a.k && (a.k.cancel(), a.k = k);
  a.K && (u.clearTimeout(a.K), a.K = k);
  Dd(a);
  a.o && (a.o.cancel(), a.o = k);
  a.D && (u.clearTimeout(a.D), a.D = k)
}
t.V = s("u");
t.Yb = s("ka");
t.Fb = function() {
  return 0 == this.c
};
t.Xb = s("O");
function Ed(a) {
  !a.o && !a.D && (a.D = V(y(a.Pb, a), 0), a.Z = 0)
}
t.Pb = function(a) {
  this.D = k;
  this.a.debug("startForwardChannel_");
  if(Bd(this)) {
    if(this.c == vd) {
      if(a) {
        this.a.H("Not supposed to retry the open")
      }else {
        this.a.debug("open_()");
        this.xa = Math.floor(1E5 * Math.random());
        var a = this.xa++, b = new R(this, this.a, "", a, h);
        b.V(this.u);
        var c = Fd(this), d = this.Ia.n();
        J(d, "RID", a);
        this.ub && J(d, "CVER", this.ub);
        Gd(this, d);
        ic(b, d, c);
        this.o = b;
        this.c = 2
      }
    }else {
      3 == this.c && (a ? Hd(this, a) : 0 == this.s.length ? this.a.debug("startForwardChannel_ returned: nothing to send") : this.o ? this.a.H("startForwardChannel_ returned: connection already in progress") : (Hd(this), this.a.debug("startForwardChannel_ finished, sent request")))
    }
  }
};
function Hd(a, b) {
  var c, d;
  b ? 6 < a.da ? (a.s = a.P.concat(a.s), a.P.length = 0, c = a.xa - 1, d = Fd(a)) : (c = b.C, d = b.U) : (c = a.xa++, d = Fd(a));
  var e = a.Ia.n();
  J(e, "SID", a.W);
  J(e, "RID", c);
  J(e, "AID", a.ua);
  Gd(a, e);
  c = new R(a, a.a, a.W, c, a.Z + 1);
  c.V(a.u);
  c.setTimeout(Math.round(0.5 * a.Bb) + Math.round(0.5 * a.Bb * Math.random()));
  a.o = c;
  ic(c, e, d)
}
function Gd(a, b) {
  if(a.e) {
    var c = a.e.getAdditionalParams(a);
    c && ab(c, function(a, c) {
      J(b, c, a)
    })
  }
}
function Fd(a) {
  var b = Math.min(a.s.length, 1E3), c = ["count=" + b], d;
  6 < a.da && 0 < b ? (d = a.s[0].Jb, c.push("ofs=" + d)) : d = 0;
  for(var e = 0;e < b;e++) {
    var g = a.s[e].Jb, i = a.s[e].map, g = 6 >= a.da ? e : g - d;
    try {
      ab(i, function(a, b) {
        c.push("req" + g + "_" + b + "=" + encodeURIComponent(a))
      })
    }catch(l) {
      c.push("req" + g + "_type=" + encodeURIComponent("_badmap")), a.e && a.e.badMapError(a, i)
    }
  }
  a.P = a.P.concat(a.s.splice(0, b));
  return c.join("&")
}
function Id(a) {
  !a.k && !a.K && (a.rb = 1, a.K = V(y(a.Ob, a), 0), a.ca = 0)
}
function Jd(a) {
  if(a.k || a.K) {
    return a.a.H("Request already in progress"), n
  }
  if(3 <= a.ca) {
    return n
  }
  a.a.debug("Going to retry GET");
  a.rb++;
  a.K = V(y(a.Ob, a), Kd(a, a.ca));
  a.ca++;
  return j
}
t.Ob = function() {
  this.K = k;
  if(Bd(this)) {
    this.a.debug("Creating new HttpRequest");
    this.k = new R(this, this.a, this.W, "rpc", this.rb);
    this.k.V(this.u);
    this.k.Yb(this.ka);
    var a = this.sb.n();
    J(a, "RID", "rpc");
    J(a, "SID", this.W);
    J(a, "CI", this.pb ? "0" : "1");
    J(a, "AID", this.ua);
    Gd(this, a);
    if(hc()) {
      J(a, "TYPE", "xmlhttp"), kc(this.k, a, j, this.M, n)
    }else {
      J(a, "TYPE", "html");
      var b = this.k, c = Boolean(this.M);
      b.oa = 3;
      b.S = K(a.n());
      Ac(b, c)
    }
    this.a.debug("New Request created")
  }
};
function Bd(a) {
  if(a.e) {
    var b = a.e.okToMakeRequest(a);
    if(0 != b) {
      return a.a.debug("Handler returned error code from okToMakeRequest"), Z(a, b), n
    }
  }
  return j
}
function sd(a, b, c) {
  a.a.debug("Test Connection Finished");
  a.pb = a.bc && c;
  a.h = b.h;
  a.a.debug("connectChannel_()");
  a.hc(vd, 0);
  a.Ia = od(a, a.G);
  Ed(a)
}
function rd(a, b) {
  a.a.debug("Test Connection Failed");
  a.h = b.h;
  Z(a, 2)
}
t.Nb = function(a, b) {
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
                  if(this.k.za + 3E3 < this.o.za) {
                    Dd(this), this.k.cancel(), this.k = k
                  }else {
                    break a
                  }
                }else {
                  this.a.qa("We do not have a BackChannel established")
                }
                Jd(this);
                U()
              }
            }
          }else {
            this.Ib = e[1], c = this.Ib - this.ua, 0 < c && (e = e[2], this.a.debug(e + " bytes (in " + c + " arrays) are outstanding on the BackChannel"), 37500 > e && (this.pb && 0 == this.ca) && !this.Y && (this.Y = V(y(this.pc, this), 6E3)))
          }
        }else {
          this.a.debug("Bad POST response data returned"), Z(this, 11)
        }
      }else {
        b != cd && (this.a.debug("Bad data returned - missing/invald magic cookie"), Z(this, 11))
      }
    }else {
      if(this.k == a && Dd(this), !/^[\s\xa0]*$/.test(b)) {
        c = this.O.parse(b);
        for(var e = this.e && this.e.channelHandleMultipleArrays ? [] : k, g = 0;g < c.length;g++) {
          var i = c[g];
          this.ua = i[0];
          i = i[1];
          2 == this.c ? "c" == i[0] ? (this.W = i[1], this.M = this.correctHostPrefix(i[2]), i = i[3], this.da = i != k ? i : 6, this.c = 3, this.e && this.e.channelOpened(this), this.sb = qd(this, this.M, this.G), Id(this)) : "stop" == i[0] && Z(this, 7) : 3 == this.c && ("stop" == i[0] ? (e && e.length && (this.e.channelHandleMultipleArrays(this, e), e.length = 0), Z(this, 7)) : "noop" != i[0] && (e ? e.push(i) : this.e && this.e.channelHandleArray(this, i)), this.ca = 0)
        }
        e && e.length && this.e.channelHandleMultipleArrays(this, e)
      }
    }
  }
};
t.correctHostPrefix = function(a) {
  return this.cc ? this.e ? this.e.correctHostPrefix(a) : a : k
};
t.pc = function() {
  this.Y != k && (this.Y = k, this.k.cancel(), this.k = k, Jd(this), U())
};
function Dd(a) {
  a.Y != k && (u.clearTimeout(a.Y), a.Y = k)
}
t.ia = function(a) {
  this.a.debug("Request complete");
  var b;
  if(this.k == a) {
    Dd(this), this.k = k, b = 2
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
      1 == b ? (z(), xd.dispatchEvent(new zd(xd, a.U ? a.U.length : 0)), Ed(this), this.P.length = 0) : Id(this)
    }else {
      var c = a.Cb();
      if(3 == c || 7 == c || 0 == c && 0 < this.h) {
        this.a.debug("Not retrying due to error type")
      }else {
        this.a.debug("Maybe retrying, last error: " + ec(c, this.h));
        var d;
        if(d = 1 == b) {
          this.o || this.D ? (this.a.H("Request already in progress"), d = n) : this.c == vd || this.Z >= (this.Ga ? 0 : this.ib) ? d = n : (this.a.debug("Going to retry POST"), this.D = V(y(this.Pb, this, a), Kd(this, this.Z)), this.Z++, d = j)
        }
        if(d || 2 == b && Jd(this)) {
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
function Kd(a, b) {
  var c = a.dc + Math.floor(Math.random() * a.yc);
  a.isActive() || (a.a.debug("Inactive channel"), c *= 2);
  return c * b
}
t.hc = function(a) {
  0 <= Wa(arguments, this.c) || f(Error("Unexpected channel state: " + this.c))
};
function Z(a, b) {
  a.a.info("Error code " + b);
  if(2 == b || 9 == b) {
    var c = k;
    a.e && (c = a.e.getNetworkTestImageUri(a));
    var d = y(a.zc, a);
    c || (c = new H("//www.google.com/images/cleardot.gif"), K(c));
    md(c.toString(), 1E4, d)
  }else {
    U()
  }
  Ld(a, b)
}
t.zc = function(a) {
  a ? (this.a.info("Successfully pinged google.com"), U()) : (this.a.info("Failed to ping google.com"), U(), Ld(this, 8))
};
function Ld(a, b) {
  a.a.debug("HttpChannel: error - " + b);
  a.c = 0;
  a.e && a.e.channelError(a, b);
  Md(a);
  Cd(a)
}
function Md(a) {
  a.c = 0;
  a.h = -1;
  if(a.e) {
    if(0 == a.P.length && 0 == a.s.length) {
      a.e.channelClosed(a)
    }else {
      a.a.debug("Number of undelivered maps, pending: " + a.P.length + ", outgoing: " + a.s.length);
      var b = Za(a.P), c = Za(a.s);
      a.P.length = 0;
      a.s.length = 0;
      a.e.channelClosed(a, b, c)
    }
  }
}
function od(a, b) {
  var c = td(a, k, b);
  a.a.debug("GetForwardChannelUri: " + c);
  return c
}
function qd(a, b, c) {
  b = td(a, a.Va() ? b : k, c);
  a.a.debug("GetBackChannelUri: " + b);
  return b
}
function td(a, b, c) {
  var d = c instanceof H ? c.n() : new H(c, h);
  if("" != d.fa) {
    b && fb(d, b + "." + d.fa), gb(d, d.ya)
  }else {
    var e = window.location, d = sb(e.protocol, b ? b + "." + e.hostname : e.hostname, e.port, c)
  }
  a.ta && ab(a.ta, function(a, b) {
    J(d, b, a)
  });
  J(d, "VER", a.da);
  Gd(a, d);
  return d
}
t.fb = function(a) {
  a && !this.Wa && f(Error("Can't create secondary domain capable XhrIo object."));
  a = new ed;
  a.$b = this.Wa;
  return a
};
t.isActive = function() {
  return!!this.e && this.e.isActive(this)
};
function V(a, b) {
  ha(a) || f(Error("Fn must not be null and must be a function"));
  return u.setTimeout(function() {
    a()
  }, b)
}
t.F = function() {
  xd.dispatchEvent(new Ad(xd))
};
function U() {
  xd.dispatchEvent(new yd(xd))
}
t.Va = function() {
  return this.Wa || !hc()
};
function Nd() {
}
t = Nd.prototype;
t.channelHandleMultipleArrays = k;
t.okToMakeRequest = ba(0);
t.channelOpened = p();
t.channelHandleArray = p();
t.channelError = p();
t.channelClosed = p();
t.getAdditionalParams = function() {
  return{}
};
t.getNetworkTestImageUri = ba(k);
t.isActive = ba(j);
t.badMapError = p();
t.correctHostPrefix = function(a) {
  return a
};
var $, Od, Pd = [].slice;
Od = {"0":"Ok", 4:"User is logging out", 6:"Unknown session ID", 7:"Stopped by server", 8:"General network error", 2:"Request failed", 9:"Blocked by a network administrator", 5:"No data from server", 10:"Got bad data from the server", 11:"Got a bad response from the server"};
$ = function(a, b) {
  var c, d, e, g, i, l, o, m, r, q;
  m = this;
  a || (a = "channel");
  a.match(/:\/\//) && a.replace(/^ws/, "http");
  b || (b = {});
  if(v(b || "string" === typeof b)) {
    b = {}
  }
  l = b.reconnectTime || 3E3;
  q = function(a) {
    m.readyState = m.readyState = a
  };
  q(this.CLOSED);
  r = k;
  g = b.Cc;
  c = function() {
    var a, b;
    b = arguments[0];
    a = 2 <= arguments.length ? Pd.call(arguments, 1) : [];
    try {
      return"function" === typeof m[b] ? m[b].apply(m, a) : h
    }catch(c) {
      a = c, "undefined" !== typeof console && console !== k && console.error(a.stack), f(a)
    }
  };
  d = new Nd;
  d.channelOpened = function() {
    g = r;
    q($.OPEN);
    return c("onopen")
  };
  e = k;
  d.channelError = function(a, b) {
    var d;
    d = Od[b];
    e = b;
    q($.$a);
    return c("onerror", d, b)
  };
  o = k;
  d.channelClosed = function(a, d, g) {
    if(m.readyState !== $.CLOSED) {
      r = k;
      a = e ? Od[e] : "Closed";
      q($.CLOSED);
      try {
        c("onclose", a, d, g)
      }catch(Qd) {
      }
      b.reconnect && (7 !== e && 0 !== e) && (d = 6 === e ? 0 : l, clearTimeout(o), o = setTimeout(i, d));
      return e = k
    }
  };
  d.channelHandleArray = function(a, b) {
    return c("onmessage", b)
  };
  i = function() {
    r && f(Error("Reconnect() called from invalid state"));
    q($.CONNECTING);
    c("onconnecting");
    clearTimeout(o);
    r = new ud(b.appVersion);
    r.Wa = j;
    r.e = d;
    e = k;
    if(b.failFast) {
      var i = r;
      i.Ga = j;
      i.a.info("setFailFast: true");
      if((i.o || i.D) && i.Z > (i.Ga ? 0 : i.ib)) {
        i.a.info("Retry count " + i.Z + " > new maxRetries " + (i.Ga ? 0 : i.ib) + ". Fail immediately!"), i.o ? (i.o.cancel(), i.ia(i.o)) : (u.clearTimeout(i.D), i.D = k, Z(i, 2))
      }
    }
    return r.eb("" + a + "/test", "" + a + "/bind", k, g != k ? g.W : h, g != k ? g.ua : h)
  };
  this.open = function() {
    m.readyState !== m.CLOSED && f(Error("Already open"));
    return i()
  };
  this.close = function() {
    clearTimeout(o);
    e = 0;
    if(m.readyState !== $.CLOSED) {
      q($.$a);
      var a = r;
      a.a.debug("disconnect()");
      Cd(a);
      if(3 == a.c) {
        var b = a.xa++, c = a.Ia.n();
        J(c, "SID", a.W);
        J(c, "RID", b);
        J(c, "TYPE", "terminate");
        Gd(a, c);
        b = new R(a, a.a, a.W, b, h);
        b.oa = 2;
        b.S = K(c.n());
        c = new Image;
        c.src = b.S;
        c.onload = c.onerror = y(b.jc, b);
        b.za = z();
        lc(b)
      }
      Md(a)
    }
  };
  this.sendMap = function(a) {
    var b;
    ((b = m.readyState) === $.$a || b === $.CLOSED) && f(Error("Cannot send to a closed connection"));
    b = r;
    0 == b.c && f(Error("Invalid operation: sending map when state is closed"));
    1E3 == b.s.length && b.a.H("Already have 1000 queued maps upon queueing " + Gc(a));
    b.s.push(new wd(b.oc++, a));
    (2 == b.c || 3 == b.c) && Ed(b)
  };
  this.send = function(a) {
    return this.sendMap({JSON:Gc(a)})
  };
  i();
  return this
};
$.prototype.CONNECTING = $.CONNECTING = $.CONNECTING = 0;
$.prototype.OPEN = $.OPEN = $.OPEN = 1;
$.prototype.CLOSING = $.CLOSING = $.$a = 2;
$.prototype.CLOSED = $.CLOSED = $.CLOSED = 3;
("undefined" !== typeof exports && exports !== k ? exports : window).BCSocket = $;

})();
