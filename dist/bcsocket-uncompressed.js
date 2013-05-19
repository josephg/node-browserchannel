(function(){
function e(a) {
  throw a;
}
var h = void 0, l = !0, m = null, r = !1;
function s() {
  return function() {
  }
}
function t(a) {
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
var u, ca = ca || {}, w = this;
function da(a) {
  a = a.split(".");
  for(var b = w, c;c = a.shift();) {
    if(b[c] != m) {
      b = b[c]
    }else {
      return m
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
function x(a) {
  return"array" == fa(a)
}
function ga(a) {
  var b = fa(a);
  return"array" == b || "object" == b && "number" == typeof a.length
}
function z(a) {
  return"string" == typeof a
}
function ha(a) {
  return"function" == fa(a)
}
function A(a) {
  return a[ia] || (a[ia] = ++ja)
}
var ia = "closure_uid_" + (1E9 * Math.random() >>> 0), ja = 0;
function ka(a, b, c) {
  return a.call.apply(a.bind, arguments)
}
function la(a, b, c) {
  a || e(Error());
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
function B(a, b, c) {
  B = Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? ka : la;
  return B.apply(m, arguments)
}
var C = Date.now || function() {
  return+new Date
};
function D(a, b) {
  function c() {
  }
  c.prototype = b.prototype;
  a.qa = b.prototype;
  a.prototype = new c
}
;function ma(a, b) {
  for(var c = 1;c < arguments.length;c++) {
    var d = String(arguments[c]).replace(/\$/g, "$$$$");
    a = a.replace(/\%s/, d)
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
  return w.navigator ? w.navigator.userAgent : m
}
wa = va = ua = ta = r;
var ya;
if(ya = xa()) {
  var za = w.navigator;
  ta = 0 == ya.indexOf("Opera");
  ua = !ta && -1 != ya.indexOf("MSIE");
  va = !ta && -1 != ya.indexOf("WebKit");
  wa = !ta && !va && "Gecko" == za.product
}
var Aa = ta, E = ua, Ba = wa, F = va, Ca = w.navigator, Da = -1 != (Ca && Ca.platform || "").indexOf("Mac");
function Ea() {
  var a = w.document;
  return a ? a.documentMode : h
}
var Fa;
a: {
  var Ga = "", Ha;
  if(Aa && w.opera) {
    var Ia = w.opera.version, Ga = "function" == typeof Ia ? Ia() : Ia
  }else {
    if(Ba ? Ha = /rv\:([^\);]+)(\)|;)/ : E ? Ha = /MSIE\s+([^\);]+)(\)|;)/ : F && (Ha = /WebKit\/(\S+)/), Ha) {
      var Ja = Ha.exec(xa()), Ga = Ja ? Ja[1] : ""
    }
  }
  if(E) {
    var Ka = Ea();
    if(Ka > parseFloat(Ga)) {
      Fa = String(Ka);
      break a
    }
  }
  Fa = Ga
}
var La = {};
function G(a) {
  var b;
  if(!(b = La[a])) {
    b = 0;
    for(var c = String(Fa).replace(/^[\s\xa0]+|[\s\xa0]+$/g, "").split("."), d = String(a).replace(/^[\s\xa0]+|[\s\xa0]+$/g, "").split("."), f = Math.max(c.length, d.length), g = 0;0 == b && g < f;g++) {
      var k = c[g] || "", q = d[g] || "", n = RegExp("(\\d*)(\\D*)", "g"), y = RegExp("(\\d*)(\\D*)", "g");
      do {
        var p = n.exec(k) || ["", "", ""], v = y.exec(q) || ["", "", ""];
        if(0 == p[0].length && 0 == v[0].length) {
          break
        }
        b = ((0 == p[1].length ? 0 : parseInt(p[1], 10)) < (0 == v[1].length ? 0 : parseInt(v[1], 10)) ? -1 : (0 == p[1].length ? 0 : parseInt(p[1], 10)) > (0 == v[1].length ? 0 : parseInt(v[1], 10)) ? 1 : 0) || ((0 == p[2].length) < (0 == v[2].length) ? -1 : (0 == p[2].length) > (0 == v[2].length) ? 1 : 0) || (p[2] < v[2] ? -1 : p[2] > v[2] ? 1 : 0)
      }while(0 == b)
    }
    b = La[a] = 0 <= b
  }
  return b
}
var Ma = w.document, Na = !Ma || !E ? h : Ea() || ("CSS1Compat" == Ma.compatMode ? parseInt(Fa, 10) : 5);
function Oa(a) {
  Error.captureStackTrace ? Error.captureStackTrace(this, Oa) : this.stack = Error().stack || "";
  a && (this.message = String(a))
}
D(Oa, Error);
Oa.prototype.name = "CustomError";
function Pa(a, b) {
  b.unshift(a);
  Oa.call(this, ma.apply(m, b));
  b.shift();
  this.Ic = a
}
D(Pa, Oa);
Pa.prototype.name = "AssertionError";
function Qa(a, b) {
  e(new Pa("Failure" + (a ? ": " + a : ""), Array.prototype.slice.call(arguments, 1)))
}
;var Ra = RegExp("^(?:([^:/?#.]+):)?(?://(?:([^/?#]*)@)?([^/#?]*?)(?::([0-9]+))?(?=[/#?]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#(.*))?$");
function Sa(a) {
  var b = Ta, c;
  for(c in b) {
    a.call(h, b[c], c, b)
  }
}
function Ua(a) {
  var b = [], c = 0, d;
  for(d in a) {
    b[c++] = a[d]
  }
  return b
}
function Va(a) {
  var b = [], c = 0, d;
  for(d in a) {
    b[c++] = d
  }
  return b
}
var Wa = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");
function Xa(a, b) {
  for(var c, d, f = 1;f < arguments.length;f++) {
    d = arguments[f];
    for(c in d) {
      a[c] = d[c]
    }
    for(var g = 0;g < Wa.length;g++) {
      c = Wa[g], Object.prototype.hasOwnProperty.call(d, c) && (a[c] = d[c])
    }
  }
}
;var H = Array.prototype, Ya = H.indexOf ? function(a, b, c) {
  return H.indexOf.call(a, b, c)
} : function(a, b, c) {
  c = c == m ? 0 : 0 > c ? Math.max(0, a.length + c) : c;
  if(z(a)) {
    return!z(b) || 1 != b.length ? -1 : a.indexOf(b, c)
  }
  for(;c < a.length;c++) {
    if(c in a && a[c] === b) {
      return c
    }
  }
  return-1
}, Za = H.forEach ? function(a, b, c) {
  H.forEach.call(a, b, c)
} : function(a, b, c) {
  for(var d = a.length, f = z(a) ? a.split("") : a, g = 0;g < d;g++) {
    g in f && b.call(c, f[g], g, a)
  }
};
function $a(a) {
  return H.concat.apply(H, arguments)
}
function ab(a) {
  var b = a.length;
  if(0 < b) {
    for(var c = Array(b), d = 0;d < b;d++) {
      c[d] = a[d]
    }
    return c
  }
  return[]
}
;function bb(a) {
  if("function" == typeof a.M) {
    return a.M()
  }
  if(z(a)) {
    return a.split("")
  }
  if(ga(a)) {
    for(var b = [], c = a.length, d = 0;d < c;d++) {
      b.push(a[d])
    }
    return b
  }
  return Ua(a)
}
function cb(a, b, c) {
  if("function" == typeof a.forEach) {
    a.forEach(b, c)
  }else {
    if(ga(a) || z(a)) {
      Za(a, b, c)
    }else {
      var d;
      if("function" == typeof a.ja) {
        d = a.ja()
      }else {
        if("function" != typeof a.M) {
          if(ga(a) || z(a)) {
            d = [];
            for(var f = a.length, g = 0;g < f;g++) {
              d.push(g)
            }
          }else {
            d = Va(a)
          }
        }else {
          d = h
        }
      }
      for(var f = bb(a), g = f.length, k = 0;k < g;k++) {
        b.call(c, f[k], d && d[k], a)
      }
    }
  }
}
;function db(a, b) {
  this.N = {};
  this.j = [];
  var c = arguments.length;
  if(1 < c) {
    c % 2 && e(Error("Uneven number of arguments"));
    for(var d = 0;d < c;d += 2) {
      this.set(arguments[d], arguments[d + 1])
    }
  }else {
    if(a) {
      a instanceof db ? (c = a.ja(), d = a.M()) : (c = Va(a), d = Ua(a));
      for(var f = 0;f < c.length;f++) {
        this.set(c[f], d[f])
      }
    }
  }
}
u = db.prototype;
u.f = 0;
u.ac = 0;
u.M = function() {
  eb(this);
  for(var a = [], b = 0;b < this.j.length;b++) {
    a.push(this.N[this.j[b]])
  }
  return a
};
u.ja = function() {
  eb(this);
  return this.j.concat()
};
u.ha = function(a) {
  return fb(this.N, a)
};
u.remove = function(a) {
  return fb(this.N, a) ? (delete this.N[a], this.f--, this.ac++, this.j.length > 2 * this.f && eb(this), l) : r
};
function eb(a) {
  if(a.f != a.j.length) {
    for(var b = 0, c = 0;b < a.j.length;) {
      var d = a.j[b];
      fb(a.N, d) && (a.j[c++] = d);
      b++
    }
    a.j.length = c
  }
  if(a.f != a.j.length) {
    for(var f = {}, c = b = 0;b < a.j.length;) {
      d = a.j[b], fb(f, d) || (a.j[c++] = d, f[d] = 1), b++
    }
    a.j.length = c
  }
}
u.get = function(a, b) {
  return fb(this.N, a) ? this.N[a] : b
};
u.set = function(a, b) {
  fb(this.N, a) || (this.f++, this.j.push(a), this.ac++);
  this.N[a] = b
};
u.n = function() {
  return new db(this)
};
function fb(a, b) {
  return Object.prototype.hasOwnProperty.call(a, b)
}
;function I(a, b) {
  var c;
  if(a instanceof I) {
    this.C = b !== h ? b : a.C, gb(this, a.pa), c = a.$a, J(this), this.$a = h ? c ? decodeURIComponent(c) : "" : c, hb(this, a.ia), ib(this, a.Aa), jb(this, a.G), kb(this, a.Q.n()), c = a.La, J(this), this.La = h ? c ? decodeURIComponent(c) : "" : c
  }else {
    if(a && (c = String(a).match(Ra))) {
      this.C = !!b;
      gb(this, c[1] || "", l);
      var d = c[2] || "";
      J(this);
      this.$a = l ? d ? decodeURIComponent(d) : "" : d;
      hb(this, c[3] || "", l);
      ib(this, c[4]);
      jb(this, c[5] || "", l);
      kb(this, c[6] || "", l);
      c = c[7] || "";
      J(this);
      this.La = l ? c ? decodeURIComponent(c) : "" : c
    }else {
      this.C = !!b, this.Q = new lb(m, 0, this.C)
    }
  }
}
u = I.prototype;
u.pa = "";
u.$a = "";
u.ia = "";
u.Aa = m;
u.G = "";
u.La = "";
u.lc = r;
u.C = r;
u.toString = function() {
  var a = [], b = this.pa;
  b && a.push(mb(b, nb), ":");
  if(b = this.ia) {
    a.push("//");
    var c = this.$a;
    c && a.push(mb(c, nb), "@");
    a.push(encodeURIComponent(String(b)));
    b = this.Aa;
    b != m && a.push(":", String(b))
  }
  if(b = this.G) {
    this.ia && "/" != b.charAt(0) && a.push("/"), a.push(mb(b, "/" == b.charAt(0) ? ob : pb))
  }
  (b = this.Q.toString()) && a.push("?", b);
  (b = this.La) && a.push("#", mb(b, qb));
  return a.join("")
};
u.n = function() {
  return new I(this)
};
function gb(a, b, c) {
  J(a);
  a.pa = c ? b ? decodeURIComponent(b) : "" : b;
  a.pa && (a.pa = a.pa.replace(/:$/, ""))
}
function hb(a, b, c) {
  J(a);
  a.ia = c ? b ? decodeURIComponent(b) : "" : b
}
function ib(a, b) {
  J(a);
  b ? (b = Number(b), (isNaN(b) || 0 > b) && e(Error("Bad port number " + b)), a.Aa = b) : a.Aa = m
}
function jb(a, b, c) {
  J(a);
  a.G = c ? b ? decodeURIComponent(b) : "" : b
}
function kb(a, b, c) {
  J(a);
  b instanceof lb ? (a.Q = b, a.Q.pb(a.C)) : (c || (b = mb(b, rb)), a.Q = new lb(b, 0, a.C))
}
function K(a, b, c) {
  J(a);
  a.Q.set(b, c)
}
function sb(a, b, c) {
  J(a);
  x(c) || (c = [String(c)]);
  tb(a.Q, b, c)
}
function M(a) {
  J(a);
  K(a, "zx", Math.floor(2147483648 * Math.random()).toString(36) + Math.abs(Math.floor(2147483648 * Math.random()) ^ C()).toString(36));
  return a
}
function J(a) {
  a.lc && e(Error("Tried to modify a read-only Uri"))
}
u.pb = function(a) {
  this.C = a;
  this.Q && this.Q.pb(a);
  return this
};
function ub(a, b, c, d) {
  var f = new I(m, h);
  a && gb(f, a);
  b && hb(f, b);
  c && ib(f, c);
  d && jb(f, d);
  return f
}
function mb(a, b) {
  return z(a) ? encodeURI(a).replace(b, vb) : m
}
function vb(a) {
  a = a.charCodeAt(0);
  return"%" + (a >> 4 & 15).toString(16) + (a & 15).toString(16)
}
var nb = /[#\/\?@]/g, pb = /[\#\?:]/g, ob = /[\#\?]/g, rb = /[\#\?@]/g, qb = /#/g;
function lb(a, b, c) {
  this.B = a || m;
  this.C = !!c
}
function N(a) {
  if(!a.i && (a.i = new db, a.f = 0, a.B)) {
    for(var b = a.B.split("&"), c = 0;c < b.length;c++) {
      var d = b[c].indexOf("="), f = m, g = m;
      0 <= d ? (f = b[c].substring(0, d), g = b[c].substring(d + 1)) : f = b[c];
      f = decodeURIComponent(f.replace(/\+/g, " "));
      f = O(a, f);
      a.add(f, g ? decodeURIComponent(g.replace(/\+/g, " ")) : "")
    }
  }
}
u = lb.prototype;
u.i = m;
u.f = m;
u.add = function(a, b) {
  N(this);
  this.B = m;
  a = O(this, a);
  var c = this.i.get(a);
  c || this.i.set(a, c = []);
  c.push(b);
  this.f++;
  return this
};
u.remove = function(a) {
  N(this);
  a = O(this, a);
  return this.i.ha(a) ? (this.B = m, this.f -= this.i.get(a).length, this.i.remove(a)) : r
};
u.ha = function(a) {
  N(this);
  a = O(this, a);
  return this.i.ha(a)
};
u.ja = function() {
  N(this);
  for(var a = this.i.M(), b = this.i.ja(), c = [], d = 0;d < b.length;d++) {
    for(var f = a[d], g = 0;g < f.length;g++) {
      c.push(b[d])
    }
  }
  return c
};
u.M = function(a) {
  N(this);
  var b = [];
  if(a) {
    this.ha(a) && (b = $a(b, this.i.get(O(this, a))))
  }else {
    a = this.i.M();
    for(var c = 0;c < a.length;c++) {
      b = $a(b, a[c])
    }
  }
  return b
};
u.set = function(a, b) {
  N(this);
  this.B = m;
  a = O(this, a);
  this.ha(a) && (this.f -= this.i.get(a).length);
  this.i.set(a, [b]);
  this.f++;
  return this
};
u.get = function(a, b) {
  var c = a ? this.M(a) : [];
  return 0 < c.length ? String(c[0]) : b
};
function tb(a, b, c) {
  a.remove(b);
  0 < c.length && (a.B = m, a.i.set(O(a, b), ab(c)), a.f += c.length)
}
u.toString = function() {
  if(this.B) {
    return this.B
  }
  if(!this.i) {
    return""
  }
  for(var a = [], b = this.i.ja(), c = 0;c < b.length;c++) {
    for(var d = b[c], f = encodeURIComponent(String(d)), d = this.M(d), g = 0;g < d.length;g++) {
      var k = f;
      "" !== d[g] && (k += "=" + encodeURIComponent(String(d[g])));
      a.push(k)
    }
  }
  return this.B = a.join("&")
};
u.n = function() {
  var a = new lb;
  a.B = this.B;
  this.i && (a.i = this.i.n(), a.f = this.f);
  return a
};
function O(a, b) {
  var c = String(b);
  a.C && (c = c.toLowerCase());
  return c
}
u.pb = function(a) {
  a && !this.C && (N(this), this.B = m, cb(this.i, function(a, c) {
    var d = c.toLowerCase();
    c != d && (this.remove(c), tb(this, d, a))
  }, this));
  this.C = a
};
function wb() {
}
wb.prototype.Fa = m;
var xb;
function yb() {
}
D(yb, wb);
function zb(a) {
  return(a = Ab(a)) ? new ActiveXObject(a) : new XMLHttpRequest
}
function Bb(a) {
  var b = {};
  Ab(a) && (b[0] = l, b[1] = l);
  return b
}
function Ab(a) {
  if(!a.Fb && "undefined" == typeof XMLHttpRequest && "undefined" != typeof ActiveXObject) {
    for(var b = ["MSXML2.XMLHTTP.6.0", "MSXML2.XMLHTTP.3.0", "MSXML2.XMLHTTP", "Microsoft.XMLHTTP"], c = 0;c < b.length;c++) {
      var d = b[c];
      try {
        return new ActiveXObject(d), a.Fb = d
      }catch(f) {
      }
    }
    e(Error("Could not create ActiveXObject. ActiveX might be disabled, or MSXML might not be installed"))
  }
  return a.Fb
}
xb = new yb;
function P() {
  0 != Cb && (this.Fc = Error().stack, Db[A(this)] = this)
}
var Cb = 0, Db = {};
P.prototype.xb = r;
P.prototype.Ha = function() {
  if(!this.xb && (this.xb = l, this.u(), 0 != Cb)) {
    var a = A(this);
    delete Db[a]
  }
};
P.prototype.u = function() {
  if(this.Mb) {
    for(;this.Mb.length;) {
      this.Mb.shift()()
    }
  }
};
function Q(a, b) {
  this.type = a;
  this.currentTarget = this.target = b
}
u = Q.prototype;
u.u = s();
u.Ha = s();
u.ma = r;
u.defaultPrevented = r;
u.Va = l;
u.preventDefault = function() {
  this.defaultPrevented = l;
  this.Va = r
};
var Eb = 0;
function Fb() {
}
u = Fb.prototype;
u.key = 0;
u.da = r;
u.Ga = r;
u.Na = function(a, b, c, d, f, g) {
  ha(a) ? this.Hb = l : a && a.handleEvent && ha(a.handleEvent) ? this.Hb = r : e(Error("Invalid listener argument"));
  this.V = a;
  this.Tb = b;
  this.src = c;
  this.type = d;
  this.capture = !!f;
  this.kb = g;
  this.Ga = r;
  this.key = ++Eb;
  this.da = r
};
u.handleEvent = function(a) {
  return this.Hb ? this.V.call(this.kb || this.src, a) : this.V.handleEvent.call(this.V, a)
};
var Gb = !E || E && 9 <= Na, Hb = E && !G("9");
!F || G("528");
Ba && G("1.9b") || E && G("8") || Aa && G("9.5") || F && G("528");
Ba && !G("8") || E && G("9");
function Ib(a) {
  Ib[" "](a);
  return a
}
Ib[" "] = ea;
function Jb(a, b) {
  a && this.Na(a, b)
}
D(Jb, Q);
u = Jb.prototype;
u.target = m;
u.relatedTarget = m;
u.offsetX = 0;
u.offsetY = 0;
u.clientX = 0;
u.clientY = 0;
u.screenX = 0;
u.screenY = 0;
u.button = 0;
u.keyCode = 0;
u.charCode = 0;
u.ctrlKey = r;
u.altKey = r;
u.shiftKey = r;
u.metaKey = r;
u.xc = r;
u.yb = m;
u.Na = function(a, b) {
  var c = this.type = a.type;
  Q.call(this, c);
  this.target = a.target || a.srcElement;
  this.currentTarget = b;
  var d = a.relatedTarget;
  if(d) {
    if(Ba) {
      var f;
      a: {
        try {
          Ib(d.nodeName);
          f = l;
          break a
        }catch(g) {
        }
        f = r
      }
      f || (d = m)
    }
  }else {
    "mouseover" == c ? d = a.fromElement : "mouseout" == c && (d = a.toElement)
  }
  this.relatedTarget = d;
  this.offsetX = F || a.offsetX !== h ? a.offsetX : a.layerX;
  this.offsetY = F || a.offsetY !== h ? a.offsetY : a.layerY;
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
  this.xc = Da ? a.metaKey : a.ctrlKey;
  this.state = a.state;
  this.yb = a;
  a.defaultPrevented && this.preventDefault();
  delete this.ma
};
u.preventDefault = function() {
  Jb.qa.preventDefault.call(this);
  var a = this.yb;
  if(a.preventDefault) {
    a.preventDefault()
  }else {
    if(a.returnValue = r, Hb) {
      try {
        if(a.ctrlKey || 112 <= a.keyCode && 123 >= a.keyCode) {
          a.keyCode = -1
        }
      }catch(b) {
      }
    }
  }
};
u.u = s();
var Ta = {}, R = {}, S = {}, Kb = {};
function Lb(a, b, c, d, f) {
  if(x(b)) {
    for(var g = 0;g < b.length;g++) {
      Lb(a, b[g], c, d, f)
    }
    return m
  }
  a: {
    b || e(Error("Invalid event type"));
    d = !!d;
    var k = R;
    b in k || (k[b] = {f:0, t:0});
    k = k[b];
    d in k || (k[d] = {f:0, t:0}, k.f++);
    var k = k[d], g = A(a), q;
    k.t++;
    if(k[g]) {
      q = k[g];
      for(var n = 0;n < q.length;n++) {
        if(k = q[n], k.V == c && k.kb == f) {
          if(k.da) {
            break
          }
          q[n].Ga = r;
          a = q[n];
          break a
        }
      }
    }else {
      q = k[g] = [], k.f++
    }
    n = Mb();
    k = new Fb;
    k.Na(c, n, a, b, d, f);
    k.Ga = r;
    n.src = a;
    n.V = k;
    q.push(k);
    S[g] || (S[g] = []);
    S[g].push(k);
    a.addEventListener ? (a == w || !a.vb) && a.addEventListener(b, n, d) : a.attachEvent(b in Kb ? Kb[b] : Kb[b] = "on" + b, n);
    a = k
  }
  b = a.key;
  Ta[b] = a;
  return b
}
function Mb() {
  var a = Nb, b = Gb ? function(c) {
    return a.call(b.src, b.V, c)
  } : function(c) {
    c = a.call(b.src, b.V, c);
    if(!c) {
      return c
    }
  };
  return b
}
function Ob(a, b, c, d, f) {
  if(x(b)) {
    for(var g = 0;g < b.length;g++) {
      Ob(a, b[g], c, d, f)
    }
  }else {
    d = !!d;
    a: {
      g = R;
      if(b in g && (g = g[b], d in g && (g = g[d], a = A(a), g[a]))) {
        a = g[a];
        break a
      }
      a = m
    }
    if(a) {
      for(g = 0;g < a.length;g++) {
        if(a[g].V == c && a[g].capture == d && a[g].kb == f) {
          Pb(a[g].key);
          break
        }
      }
    }
  }
}
function Pb(a) {
  var b = Ta[a];
  if(!b || b.da) {
    return r
  }
  var c = b.src, d = b.type, f = b.Tb, g = b.capture;
  c.removeEventListener ? (c == w || !c.vb) && c.removeEventListener(d, f, g) : c.detachEvent && c.detachEvent(d in Kb ? Kb[d] : Kb[d] = "on" + d, f);
  c = A(c);
  if(S[c]) {
    var f = S[c], k = Ya(f, b);
    0 <= k && H.splice.call(f, k, 1);
    0 == f.length && delete S[c]
  }
  b.da = l;
  if(b = R[d][g][c]) {
    b.Lb = l, Qb(d, g, c, b)
  }
  delete Ta[a];
  return l
}
function Qb(a, b, c, d) {
  if(!d.Pa && d.Lb) {
    for(var f = 0, g = 0;f < d.length;f++) {
      d[f].da ? d[f].Tb.src = m : (f != g && (d[g] = d[f]), g++)
    }
    d.length = g;
    d.Lb = r;
    0 == g && (delete R[a][b][c], R[a][b].f--, 0 == R[a][b].f && (delete R[a][b], R[a].f--), 0 == R[a].f && delete R[a])
  }
}
function Rb(a) {
  var b = 0;
  if(a != m) {
    if(a = A(a), S[a]) {
      a = S[a];
      for(var c = a.length - 1;0 <= c;c--) {
        Pb(a[c].key), b++
      }
    }
  }else {
    Sa(function(a, c) {
      Pb(c);
      b++
    })
  }
}
function Sb(a, b, c, d, f) {
  var g = 1;
  b = A(b);
  if(a[b]) {
    var k = --a.t, q = a[b];
    q.Pa ? q.Pa++ : q.Pa = 1;
    try {
      for(var n = q.length, y = 0;y < n;y++) {
        var p = q[y];
        p && !p.da && (g &= Tb(p, f) !== r)
      }
    }finally {
      a.t = Math.max(k, a.t), q.Pa--, Qb(c, d, b, q)
    }
  }
  return Boolean(g)
}
function Tb(a, b) {
  a.Ga && Pb(a.key);
  return a.handleEvent(b)
}
function Nb(a, b) {
  if(a.da) {
    return l
  }
  var c = a.type, d = R;
  if(!(c in d)) {
    return l
  }
  var d = d[c], f, g;
  if(!Gb) {
    f = b || da("window.event");
    var k = l in d, q = r in d;
    if(k) {
      if(0 > f.keyCode || f.returnValue != h) {
        return l
      }
      a: {
        var n = r;
        if(0 == f.keyCode) {
          try {
            f.keyCode = -1;
            break a
          }catch(y) {
            n = l
          }
        }
        if(n || f.returnValue == h) {
          f.returnValue = l
        }
      }
    }
    n = new Jb;
    n.Na(f, this);
    f = l;
    try {
      if(k) {
        for(var p = [], v = n.currentTarget;v;v = v.parentNode) {
          p.push(v)
        }
        g = d[l];
        g.t = g.f;
        for(var L = p.length - 1;!n.ma && 0 <= L && g.t;L--) {
          n.currentTarget = p[L], f &= Sb(g, p[L], c, l, n)
        }
        if(q) {
          g = d[r];
          g.t = g.f;
          for(L = 0;!n.ma && L < p.length && g.t;L++) {
            n.currentTarget = p[L], f &= Sb(g, p[L], c, r, n)
          }
        }
      }else {
        f = Tb(a, n)
      }
    }finally {
      p && (p.length = 0)
    }
    return f
  }
  c = new Jb(b, this);
  return f = Tb(a, c)
}
;function Ub() {
  P.call(this)
}
D(Ub, P);
u = Ub.prototype;
u.vb = l;
u.ob = m;
u.addEventListener = function(a, b, c, d) {
  Lb(this, a, b, c, d)
};
u.removeEventListener = function(a, b, c, d) {
  Ob(this, a, b, c, d)
};
u.dispatchEvent = function(a) {
  var b = a.type || a, c = R;
  if(b in c) {
    if(z(a)) {
      a = new Q(a, this)
    }else {
      if(a instanceof Q) {
        a.target = a.target || this
      }else {
        var d = a;
        a = new Q(b, this);
        Xa(a, d)
      }
    }
    var d = 1, f, c = c[b], b = l in c, g;
    if(b) {
      f = [];
      for(g = this;g;g = g.ob) {
        f.push(g)
      }
      g = c[l];
      g.t = g.f;
      for(var k = f.length - 1;!a.ma && 0 <= k && g.t;k--) {
        a.currentTarget = f[k], d &= Sb(g, f[k], a.type, l, a) && a.Va != r
      }
    }
    if(r in c) {
      if(g = c[r], g.t = g.f, b) {
        for(k = 0;!a.ma && k < f.length && g.t;k++) {
          a.currentTarget = f[k], d &= Sb(g, f[k], a.type, r, a) && a.Va != r
        }
      }else {
        for(f = this;!a.ma && f && g.t;f = f.ob) {
          a.currentTarget = f, d &= Sb(g, f, a.type, r, a) && a.Va != r
        }
      }
    }
    a = Boolean(d)
  }else {
    a = l
  }
  return a
};
u.u = function() {
  Ub.qa.u.call(this);
  Rb(this);
  this.ob = m
};
function Vb(a, b) {
  P.call(this);
  this.ca = a || 1;
  this.Da = b || Wb;
  this.cb = B(this.Dc, this);
  this.nb = C()
}
D(Vb, Ub);
Vb.prototype.enabled = r;
var Wb = w;
u = Vb.prototype;
u.r = m;
u.setInterval = function(a) {
  this.ca = a;
  this.r && this.enabled ? (this.stop(), this.start()) : this.r && this.stop()
};
u.Dc = function() {
  if(this.enabled) {
    var a = C() - this.nb;
    0 < a && a < 0.8 * this.ca ? this.r = this.Da.setTimeout(this.cb, this.ca - a) : (this.dispatchEvent(Xb), this.enabled && (this.r = this.Da.setTimeout(this.cb, this.ca), this.nb = C()))
  }
};
u.start = function() {
  this.enabled = l;
  this.r || (this.r = this.Da.setTimeout(this.cb, this.ca), this.nb = C())
};
u.stop = function() {
  this.enabled = r;
  this.r && (this.Da.clearTimeout(this.r), this.r = m)
};
u.u = function() {
  Vb.qa.u.call(this);
  this.stop();
  delete this.Da
};
var Xb = "tick";
function Yb(a) {
  P.call(this);
  this.e = a;
  this.j = []
}
D(Yb, P);
var Zb = [];
function $b(a, b, c, d) {
  x(c) || (Zb[0] = c, c = Zb);
  for(var f = 0;f < c.length;f++) {
    var g = Lb(b, c[f], d || a, r, a.e || a);
    a.j.push(g)
  }
}
Yb.prototype.u = function() {
  Yb.qa.u.call(this);
  Za(this.j, Pb);
  this.j.length = 0
};
Yb.prototype.handleEvent = function() {
  e(Error("EventHandler.handleEvent not implemented"))
};
function ac(a, b, c) {
  P.call(this);
  this.mc = a;
  this.ca = b;
  this.e = c;
  this.gc = B(this.sc, this)
}
D(ac, P);
u = ac.prototype;
u.Wa = r;
u.Sb = 0;
u.r = m;
u.stop = function() {
  this.r && (Wb.clearTimeout(this.r), this.r = m, this.Wa = r)
};
u.u = function() {
  ac.qa.u.call(this);
  this.stop()
};
u.sc = function() {
  this.r = m;
  this.Wa && !this.Sb && (this.Wa = r, bc(this))
};
function bc(a) {
  var b;
  b = a.gc;
  var c = a.ca;
  ha(b) || (b && "function" == typeof b.handleEvent ? b = B(b.handleEvent, b) : e(Error("Invalid listener argument")));
  b = 2147483647 < c ? -1 : Wb.setTimeout(b, c || 0);
  a.r = b;
  a.mc.call(a.e)
}
;function T(a, b, c, d, f) {
  this.b = a;
  this.a = b;
  this.Y = c;
  this.A = d;
  this.Ba = f || 1;
  this.Ca = cc;
  this.ib = new Yb(this);
  this.Ra = new Vb;
  this.Ra.setInterval(dc)
}
u = T.prototype;
u.v = m;
u.I = r;
u.ta = m;
u.rb = m;
u.oa = m;
u.ra = m;
u.S = m;
u.w = m;
u.W = m;
u.l = m;
u.Ea = 0;
u.J = m;
u.sa = m;
u.p = m;
u.h = -1;
u.Wb = l;
u.$ = r;
u.na = 0;
u.Sa = m;
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
  return!E || E && 10 <= Na
}
u = T.prototype;
u.X = t("v");
u.setTimeout = t("Ca");
u.Zb = t("na");
function ic(a, b, c) {
  a.ra = 1;
  a.S = M(b.n());
  a.W = c;
  a.wb = l;
  jc(a, m)
}
function kc(a, b, c, d, f) {
  a.ra = 1;
  a.S = M(b.n());
  a.W = m;
  a.wb = c;
  f && (a.Wb = r);
  jc(a, d)
}
function jc(a, b) {
  a.oa = C();
  lc(a);
  a.w = a.S.n();
  sb(a.w, "t", a.Ba);
  a.Ea = 0;
  a.l = a.b.gb(a.b.Xa() ? b : m);
  0 < a.na && (a.Sa = new ac(B(a.cc, a, a.l), a.na));
  $b(a.ib, a.l, "readystatechange", a.zc);
  var c;
  if(a.v) {
    c = a.v;
    var d = {}, f;
    for(f in c) {
      d[f] = c[f]
    }
    c = d
  }else {
    c = {}
  }
  a.W ? (a.sa = "POST", c["Content-Type"] = "application/x-www-form-urlencoded", a.l.send(a.w, a.sa, a.W, c)) : (a.sa = "GET", a.Wb && !F && (c.Connection = "close"), a.l.send(a.w, a.sa, m, c));
  a.b.F(mc);
  if(d = a.W) {
    c = "";
    d = d.split("&");
    for(f = 0;f < d.length;f++) {
      var g = d[f].split("=");
      if(1 < g.length) {
        var k = g[0], g = g[1], q = k.split("_");
        c = 2 <= q.length && "type" == q[1] ? c + (k + "=" + g + "&") : c + (k + "=redacted&")
      }
    }
  }else {
    c = m
  }
  a.a.info("XMLHTTP REQ (" + a.A + ") [attempt " + a.Ba + "]: " + a.sa + "\n" + a.w + "\n" + c)
}
u.zc = function(a) {
  a = a.target;
  var b = this.Sa;
  b && 3 == U(a) ? (this.a.debug("Throttling readystatechange."), !b.r && !b.Sb ? bc(b) : b.Wa = l) : this.cc(a)
};
u.cc = function(a) {
  try {
    if(a == this.l) {
      a: {
        var b = U(this.l), c = this.l.ka, d = nc(this.l);
        if(!hc() || F && !G("420+")) {
          if(4 > b) {
            break a
          }
        }else {
          if(3 > b || 3 == b && !Aa && !oc(this.l)) {
            break a
          }
        }
        !this.$ && (4 == b && c != pc) && (c == qc || 0 >= d ? this.b.F(rc) : this.b.F(sc));
        tc(this);
        var f = nc(this.l);
        this.h = f;
        var g = oc(this.l);
        g || this.a.debug("No response text for uri " + this.w + " status " + f);
        this.I = 200 == f;
        this.a.info("XMLHTTP RESP (" + this.A + ") [ attempt " + this.Ba + "]: " + this.sa + "\n" + this.w + "\n" + b + " " + f);
        this.I ? (4 == b && uc(this), this.wb ? (vc(this, b, g), Aa && 3 == b && ($b(this.ib, this.Ra, Xb, this.yc), this.Ra.start())) : (wc(this.a, this.A, g, m), xc(this, g)), this.I && !this.$ && (4 == b ? this.b.la(this) : (this.I = r, lc(this)))) : (400 == f && 0 < g.indexOf("Unknown SID") ? (this.p = 3, V(yc), this.a.Z("XMLHTTP Unknown SID (" + this.A + ")")) : (this.p = 0, V(zc), this.a.Z("XMLHTTP Bad status " + f + " (" + this.A + ")")), uc(this), Ac(this))
      }
    }else {
      this.a.Z("Called back with an unexpected xmlhttp")
    }
  }catch(k) {
    this.a.debug("Failed call to OnXmlHttpReadyStateChanged_"), this.l && oc(this.l) ? Bc(this.a, k, "ResponseText: " + oc(this.l)) : Bc(this.a, k, "No response text")
  }finally {
  }
};
function vc(a, b, c) {
  for(var d = l;!a.$ && a.Ea < c.length;) {
    var f = Cc(a, c);
    if(f == gc) {
      4 == b && (a.p = 4, V(Dc), d = r);
      wc(a.a, a.A, m, "[Incomplete Response]");
      break
    }else {
      if(f == fc) {
        a.p = 4;
        V(Ec);
        wc(a.a, a.A, c, "[Invalid Chunk]");
        d = r;
        break
      }else {
        wc(a.a, a.A, f, m), xc(a, f)
      }
    }
  }
  4 == b && 0 == c.length && (a.p = 1, V(Fc), d = r);
  a.I = a.I && d;
  d || (wc(a.a, a.A, c, "[Invalid Chunked Response]"), uc(a), Ac(a))
}
u.yc = function() {
  var a = U(this.l), b = oc(this.l);
  this.Ea < b.length && (tc(this), vc(this, a, b), this.I && 4 != a && lc(this))
};
function Cc(a, b) {
  var c = a.Ea, d = b.indexOf("\n", c);
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
  var f = b.substr(d, c);
  a.Ea = d + c;
  return f
}
function Gc(a, b) {
  a.oa = C();
  lc(a);
  var c = b ? window.location.hostname : "";
  a.w = a.S.n();
  K(a.w, "DOMAIN", c);
  K(a.w, "t", a.Ba);
  try {
    a.J = new ActiveXObject("htmlfile")
  }catch(d) {
    a.a.H("ActiveX blocked");
    uc(a);
    a.p = 7;
    V(Hc);
    Ac(a);
    return
  }
  var f = "<html><body>";
  b && (f += '<script>document.domain="' + c + '"\x3c/script>');
  f += "</body></html>";
  a.J.open();
  a.J.write(f);
  a.J.close();
  a.J.parentWindow.m = B(a.vc, a);
  a.J.parentWindow.d = B(a.Rb, a, l);
  a.J.parentWindow.rpcClose = B(a.Rb, a, r);
  c = a.J.createElement("div");
  a.J.parentWindow.document.body.appendChild(c);
  c.innerHTML = '<iframe src="' + a.w + '"></iframe>';
  a.a.info("TRIDENT REQ (" + a.A + ") [ attempt " + a.Ba + "]: GET\n" + a.w);
  a.b.F(mc)
}
u.vc = function(a) {
  W(B(this.uc, this, a), 0)
};
u.uc = function(a) {
  if(!this.$) {
    var b = this.a;
    b.info("TRIDENT TEXT (" + this.A + "): " + Ic(b, a));
    tc(this);
    xc(this, a);
    lc(this)
  }
};
u.Rb = function(a) {
  W(B(this.tc, this, a), 0)
};
u.tc = function(a) {
  this.$ || (this.a.info("TRIDENT TEXT (" + this.A + "): " + a ? "success" : "failure"), uc(this), this.I = a, this.b.la(this), this.b.F(Jc))
};
u.kc = function() {
  tc(this);
  this.b.la(this)
};
u.cancel = function() {
  this.$ = l;
  uc(this)
};
function lc(a) {
  a.rb = C() + a.Ca;
  Kc(a, a.Ca)
}
function Kc(a, b) {
  a.ta != m && e(Error("WatchDog timer not null"));
  a.ta = W(B(a.wc, a), b)
}
function tc(a) {
  a.ta && (w.clearTimeout(a.ta), a.ta = m)
}
u.wc = function() {
  this.ta = m;
  var a = C();
  0 <= a - this.rb ? (this.I && this.a.H("Received watchdog timeout even though request loaded successfully"), this.a.info("TIMEOUT: " + this.w), 2 != this.ra && this.b.F(rc), uc(this), this.p = 2, V(Lc), Ac(this)) : (this.a.Z("WatchDog timer called too early"), Kc(this, this.rb - a))
};
function Ac(a) {
  !a.b.Gb() && !a.$ && a.b.la(a)
}
function uc(a) {
  tc(a);
  var b = a.Sa;
  b && "function" == typeof b.Ha && b.Ha();
  a.Sa = m;
  a.Ra.stop();
  b = a.ib;
  Za(b.j, Pb);
  b.j.length = 0;
  a.l && (b = a.l, a.l = m, b.abort(), b.Ha());
  a.J && (a.J = m)
}
u.Db = aa("p");
function xc(a, b) {
  try {
    a.b.Ob(a, b), a.b.F(Jc)
  }catch(c) {
    Bc(a.a, c, "Error in httprequest callback")
  }
}
;function Mc(a) {
  a = String(a);
  if(/^\s*$/.test(a) ? 0 : /^[\],:{}\s\u2028\u2029]*$/.test(a.replace(/\\["\\\/bfnrtu]/g, "@").replace(/"[^"\\\n\r\u2028\u2029\x00-\x08\x0a-\x1f]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:[\s\u2028\u2029]*\[)+/g, ""))) {
    try {
      return eval("(" + a + ")")
    }catch(b) {
    }
  }
  e(Error("Invalid JSON string: " + a))
}
function Nc(a) {
  return eval("(" + a + ")")
}
function Oc(a) {
  var b = [];
  Pc(new Qc(h), a, b);
  return b.join("")
}
function Qc(a) {
  this.Ua = a
}
function Pc(a, b, c) {
  switch(typeof b) {
    case "string":
      Rc(b, c);
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
      if(b == m) {
        c.push("null");
        break
      }
      if(x(b)) {
        var d = b.length;
        c.push("[");
        for(var f = "", g = 0;g < d;g++) {
          c.push(f), f = b[g], Pc(a, a.Ua ? a.Ua.call(b, String(g), f) : f, c), f = ","
        }
        c.push("]");
        break
      }
      c.push("{");
      d = "";
      for(g in b) {
        Object.prototype.hasOwnProperty.call(b, g) && (f = b[g], "function" != typeof f && (c.push(d), Rc(g, c), c.push(":"), Pc(a, a.Ua ? a.Ua.call(b, g, f) : f, c), d = ","))
      }
      c.push("}");
      break;
    case "function":
      break;
    default:
      e(Error("Unknown type: " + typeof b))
  }
}
var Sc = {'"':'\\"', "\\":"\\\\", "/":"\\/", "\b":"\\b", "\f":"\\f", "\n":"\\n", "\r":"\\r", "\t":"\\t", "\x0B":"\\u000b"}, Tc = /\uffff/.test("\uffff") ? /[\\\"\x00-\x1f\x7f-\uffff]/g : /[\\\"\x00-\x1f\x7f-\xff]/g;
function Rc(a, b) {
  b.push('"', a.replace(Tc, function(a) {
    if(a in Sc) {
      return Sc[a]
    }
    var b = a.charCodeAt(0), f = "\\u";
    16 > b ? f += "000" : 256 > b ? f += "00" : 4096 > b && (f += "0");
    return Sc[a] = f + b.toString(16)
  }), '"')
}
;function Uc(a) {
  return Vc(a || arguments.callee.caller, [])
}
function Vc(a, b) {
  var c = [];
  if(0 <= Ya(b, a)) {
    c.push("[...circular reference...]")
  }else {
    if(a && 50 > b.length) {
      c.push(Wc(a) + "(");
      for(var d = a.arguments, f = 0;f < d.length;f++) {
        0 < f && c.push(", ");
        var g;
        g = d[f];
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
            g = (g = Wc(g)) ? g : "[fn]";
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
        c.push(Vc(a.caller, b))
      }catch(k) {
        c.push("[exception trying to get caller]\n")
      }
    }else {
      a ? c.push("[...long stack...]") : c.push("[end]")
    }
  }
  return c.join("")
}
function Wc(a) {
  if(Xc[a]) {
    return Xc[a]
  }
  a = String(a);
  if(!Xc[a]) {
    var b = /function ([^\(]+)/.exec(a);
    Xc[a] = b ? b[1] : "[Anonymous]"
  }
  return Xc[a]
}
var Xc = {};
function Yc(a, b, c, d, f) {
  this.reset(a, b, c, d, f)
}
Yc.prototype.Bc = 0;
Yc.prototype.Ab = m;
Yc.prototype.zb = m;
var Zc = 0;
Yc.prototype.reset = function(a, b, c, d, f) {
  this.Bc = "number" == typeof f ? f : Zc++;
  this.Pc = d || C();
  this.ya = a;
  this.nc = b;
  this.Hc = c;
  delete this.Ab;
  delete this.zb
};
Yc.prototype.Xb = t("ya");
function $c(a) {
  this.oc = a
}
$c.prototype.Qa = m;
$c.prototype.ya = m;
$c.prototype.eb = m;
$c.prototype.Eb = m;
function ad(a, b) {
  this.name = a;
  this.value = b
}
ad.prototype.toString = aa("name");
var bd = new ad("SEVERE", 1E3), cd = new ad("WARNING", 900), dd = new ad("INFO", 800), ed = new ad("CONFIG", 700), fd = new ad("FINE", 500);
u = $c.prototype;
u.getParent = aa("Qa");
u.Xb = t("ya");
function gd(a) {
  if(a.ya) {
    return a.ya
  }
  if(a.Qa) {
    return gd(a.Qa)
  }
  Qa("Root logger has no level set.");
  return m
}
u.log = function(a, b, c) {
  if(a.value >= gd(this).value) {
    a = this.jc(a, b, c);
    b = "log:" + a.nc;
    w.console && (w.console.timeStamp ? w.console.timeStamp(b) : w.console.markTimeline && w.console.markTimeline(b));
    w.msWriteProfilerMark && w.msWriteProfilerMark(b);
    for(b = this;b;) {
      c = b;
      var d = a;
      if(c.Eb) {
        for(var f = 0, g = h;g = c.Eb[f];f++) {
          g(d)
        }
      }
      b = b.getParent()
    }
  }
};
u.jc = function(a, b, c) {
  var d = new Yc(a, String(b), this.oc);
  if(c) {
    d.Ab = c;
    var f;
    var g = arguments.callee.caller;
    try {
      var k;
      var q = da("window.location.href");
      if(z(c)) {
        k = {message:c, name:"Unknown error", lineNumber:"Not available", fileName:q, stack:"Not available"}
      }else {
        var n, y, p = r;
        try {
          n = c.lineNumber || c.Gc || "Not available"
        }catch(v) {
          n = "Not available", p = l
        }
        try {
          y = c.fileName || c.filename || c.sourceURL || w.$googDebugFname || q
        }catch(L) {
          y = "Not available", p = l
        }
        k = p || !c.lineNumber || !c.fileName || !c.stack ? {message:c.message, name:c.name, lineNumber:n, fileName:y, stack:c.stack || "Not available"} : c
      }
      f = "Message: " + na(k.message) + '\nUrl: <a href="view-source:' + k.fileName + '" target="_new">' + k.fileName + "</a>\nLine: " + k.lineNumber + "\n\nBrowser stack:\n" + na(k.stack + "-> ") + "[end]\n\nJS stack traversal:\n" + na(Uc(g) + "-> ")
    }catch(Yd) {
      f = "Exception trying to expose exception! You win, we lose. " + Yd
    }
    d.zb = f
  }
  return d
};
u.H = function(a, b) {
  this.log(bd, a, b)
};
u.Z = function(a, b) {
  this.log(cd, a, b)
};
u.info = function(a, b) {
  this.log(dd, a, b)
};
function X(a, b) {
  a.log(fd, b, h)
}
var hd = {}, id = m;
function jd(a) {
  id || (id = new $c(""), hd[""] = id, id.Xb(ed));
  var b;
  if(!(b = hd[a])) {
    b = new $c(a);
    var c = a.lastIndexOf("."), d = a.substr(c + 1), c = jd(a.substr(0, c));
    c.eb || (c.eb = {});
    c.eb[d] = b;
    b.Qa = c;
    hd[a] = b
  }
  return b
}
;function kd() {
  this.q = jd("goog.net.BrowserChannel")
}
function wc(a, b, c, d) {
  a.info("XMLHTTP TEXT (" + b + "): " + Ic(a, c) + (d ? " " + d : ""))
}
kd.prototype.debug = function(a) {
  this.info(a)
};
function Bc(a, b, c) {
  a.H((c || "Exception") + b)
}
kd.prototype.info = function(a) {
  this.q.info(a)
};
kd.prototype.Z = function(a) {
  this.q.Z(a)
};
kd.prototype.H = function(a) {
  this.q.H(a)
};
function Ic(a, b) {
  if(!b || b == ld) {
    return b
  }
  try {
    var c = Nc(b);
    if(c) {
      for(var d = 0;d < c.length;d++) {
        if(x(c[d])) {
          var f = c[d];
          if(!(2 > f.length)) {
            var g = f[1];
            if(x(g) && !(1 > g.length)) {
              var k = g[0];
              if("noop" != k && "stop" != k) {
                for(var q = 1;q < g.length;q++) {
                  g[q] = ""
                }
              }
            }
          }
        }
      }
    }
    return Oc(c)
  }catch(n) {
    return a.debug("Exception parsing expected JS array - probably was not JS"), b
  }
}
;function md(a, b) {
  this.Nc = new Qc(a);
  this.O = b ? Nc : Mc
}
md.prototype.parse = function(a) {
  return this.O(a)
};
var pc = 7, qc = 8;
function nd(a) {
  P.call(this);
  this.headers = new db;
  this.ua = a || m
}
D(nd, Ub);
nd.prototype.q = jd("goog.net.XhrIo");
var od = /^https?$/i;
u = nd.prototype;
u.R = r;
u.g = m;
u.ab = m;
u.Oa = "";
u.Ib = "";
u.ka = 0;
u.p = "";
u.hb = r;
u.Ma = r;
u.lb = r;
u.ba = r;
u.Za = 0;
u.ea = m;
u.Vb = "";
u.bc = r;
u.send = function(a, b, c, d) {
  this.g && e(Error("[goog.net.XhrIo] Object is active with another request=" + this.Oa + "; newUri=" + a));
  b = b ? b.toUpperCase() : "GET";
  this.Oa = a;
  this.p = "";
  this.ka = 0;
  this.Ib = b;
  this.hb = r;
  this.R = l;
  this.g = this.ua ? zb(this.ua) : zb(xb);
  this.ab = this.ua ? this.ua.Fa || (this.ua.Fa = Bb(this.ua)) : xb.Fa || (xb.Fa = Bb(xb));
  this.g.onreadystatechange = B(this.Nb, this);
  try {
    X(this.q, Y(this, "Opening Xhr")), this.lb = l, this.g.open(b, a, l), this.lb = r
  }catch(f) {
    X(this.q, Y(this, "Error opening Xhr: " + f.message));
    pd(this, f);
    return
  }
  a = c || "";
  var g = this.headers.n();
  d && cb(d, function(a, b) {
    g.set(b, a)
  });
  d = w.FormData && a instanceof w.FormData;
  "POST" == b && (!g.ha("Content-Type") && !d) && g.set("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
  cb(g, function(a, b) {
    this.g.setRequestHeader(b, a)
  }, this);
  this.Vb && (this.g.responseType = this.Vb);
  "withCredentials" in this.g && (this.g.withCredentials = this.bc);
  try {
    this.ea && (Wb.clearTimeout(this.ea), this.ea = m), 0 < this.Za && (X(this.q, Y(this, "Will abort after " + this.Za + "ms if incomplete")), this.ea = Wb.setTimeout(B(this.Ca, this), this.Za)), X(this.q, Y(this, "Sending request")), this.Ma = l, this.g.send(a), this.Ma = r
  }catch(k) {
    X(this.q, Y(this, "Send error: " + k.message)), pd(this, k)
  }
};
u.Ca = function() {
  "undefined" != typeof ca && this.g && (this.p = "Timed out after " + this.Za + "ms, aborting", this.ka = qc, X(this.q, Y(this, this.p)), this.dispatchEvent("timeout"), this.abort(qc))
};
function pd(a, b) {
  a.R = r;
  a.g && (a.ba = l, a.g.abort(), a.ba = r);
  a.p = b;
  a.ka = 5;
  qd(a);
  rd(a)
}
function qd(a) {
  a.hb || (a.hb = l, a.dispatchEvent("complete"), a.dispatchEvent("error"))
}
u.abort = function(a) {
  this.g && this.R && (X(this.q, Y(this, "Aborting")), this.R = r, this.ba = l, this.g.abort(), this.ba = r, this.ka = a || pc, this.dispatchEvent("complete"), this.dispatchEvent("abort"), rd(this))
};
u.u = function() {
  this.g && (this.R && (this.R = r, this.ba = l, this.g.abort(), this.ba = r), rd(this, l));
  nd.qa.u.call(this)
};
u.Nb = function() {
  !this.lb && !this.Ma && !this.ba ? this.rc() : sd(this)
};
u.rc = function() {
  sd(this)
};
function sd(a) {
  if(a.R && "undefined" != typeof ca) {
    if(a.ab[1] && 4 == U(a) && 2 == nc(a)) {
      X(a.q, Y(a, "Local request error detected and ignored"))
    }else {
      if(a.Ma && 4 == U(a)) {
        Wb.setTimeout(B(a.Nb, a), 0)
      }else {
        if(a.dispatchEvent("readystatechange"), 4 == U(a)) {
          X(a.q, Y(a, "Request complete"));
          a.R = r;
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
                  d = l;
                  break a;
                default:
                  d = r
              }
            }
            if(!(c = d)) {
              var f;
              if(f = 0 === b) {
                var g = String(a.Oa).match(Ra)[1] || m;
                if(!g && self.location) {
                  var k = self.location.protocol, g = k.substr(0, k.length - 1)
                }
                f = !od.test(g ? g.toLowerCase() : "")
              }
              c = f
            }
            if(c) {
              a.dispatchEvent("complete"), a.dispatchEvent("success")
            }else {
              a.ka = 6;
              var q;
              try {
                q = 2 < U(a) ? a.g.statusText : ""
              }catch(n) {
                X(a.q, "Can not get status: " + n.message), q = ""
              }
              a.p = q + " [" + nc(a) + "]";
              qd(a)
            }
          }finally {
            rd(a)
          }
        }
      }
    }
  }
}
function rd(a, b) {
  if(a.g) {
    var c = a.g, d = a.ab[0] ? ea : m;
    a.g = m;
    a.ab = m;
    a.ea && (Wb.clearTimeout(a.ea), a.ea = m);
    b || a.dispatchEvent("ready");
    try {
      c.onreadystatechange = d
    }catch(f) {
      a.q.H("Problem encountered resetting onreadystatechange: " + f.message)
    }
  }
}
u.isActive = function() {
  return!!this.g
};
function U(a) {
  return a.g ? a.g.readyState : 0
}
function nc(a) {
  try {
    return 2 < U(a) ? a.g.status : -1
  }catch(b) {
    return a.q.Z("Can not get status: " + b.message), -1
  }
}
function oc(a) {
  try {
    return a.g ? a.g.responseText : ""
  }catch(b) {
    return X(a.q, "Can not get responseText: " + b.message), ""
  }
}
u.Db = function() {
  return z(this.p) ? this.p : String(this.p)
};
function Y(a, b) {
  return b + " [" + a.Ib + " " + a.Oa + " " + nc(a) + "]"
}
;function td() {
  this.Ub = C()
}
new td;
td.prototype.set = t("Ub");
td.prototype.reset = function() {
  this.set(C())
};
td.prototype.get = aa("Ub");
function ud(a, b, c, d, f) {
  (new kd).debug("TestLoadImageWithRetries: " + f);
  if(0 == d) {
    c(r)
  }else {
    var g = f || 0;
    d--;
    vd(a, b, function(f) {
      f ? c(l) : w.setTimeout(function() {
        ud(a, b, c, d, g)
      }, g)
    })
  }
}
function vd(a, b, c) {
  function d(a, b) {
    return function() {
      try {
        f.debug("TestLoadImage: " + b), g.onload = m, g.onerror = m, g.onabort = m, g.ontimeout = m, w.clearTimeout(k), c(a)
      }catch(d) {
        Bc(f, d)
      }
    }
  }
  var f = new kd;
  f.debug("TestLoadImage: loading " + a);
  var g = new Image, k = m;
  g.onload = d(l, "loaded");
  g.onerror = d(r, "error");
  g.onabort = d(r, "abort");
  g.ontimeout = d(r, "timeout");
  k = w.setTimeout(function() {
    if(g.ontimeout) {
      g.ontimeout()
    }
  }, b);
  g.src = a
}
;function wd(a, b) {
  this.b = a;
  this.a = b;
  this.O = new md(m, l)
}
u = wd.prototype;
u.v = m;
u.z = m;
u.Ta = r;
u.$b = m;
u.Ja = m;
u.mb = m;
u.G = m;
u.c = m;
u.h = -1;
u.K = m;
u.va = m;
u.X = t("v");
u.Yb = t("O");
u.fb = function(a) {
  this.G = a;
  a = xd(this.b, this.G);
  V(yd);
  this.$b = C();
  var b = this.b.Bb;
  b != m ? (this.K = this.b.correctHostPrefix(b[0]), (this.va = b[1]) ? (this.c = 1, zd(this)) : (this.c = 2, Ad(this))) : (sb(a, "MODE", "init"), this.z = new T(this, this.a, h, h, h), this.z.X(this.v), kc(this.z, a, r, m, l), this.c = 0)
};
function zd(a) {
  var b = Bd(a.b, a.va, "/mail/images/cleardot.gif");
  M(b);
  ud(b.toString(), 5E3, B(a.hc, a), 3, 2E3);
  a.F(mc)
}
u.hc = function(a) {
  if(a) {
    this.c = 2, Ad(this)
  }else {
    V(Cd);
    var b = this.b;
    b.a.debug("Test Connection Blocked");
    b.h = b.T.h;
    Z(b, 9)
  }
  a && this.F(sc)
};
function Ad(a) {
  a.a.debug("TestConnection: starting stage 2");
  a.z = new T(a, a.a, h, h, h);
  a.z.X(a.v);
  var b = Dd(a.b, a.K, a.G);
  V(Ed);
  if(hc()) {
    sb(b, "TYPE", "xmlhttp"), kc(a.z, b, r, a.K, r)
  }else {
    sb(b, "TYPE", "html");
    var c = a.z;
    a = Boolean(a.K);
    c.ra = 3;
    c.S = M(b.n());
    Gc(c, a)
  }
}
u.gb = function(a) {
  return this.b.gb(a)
};
u.abort = function() {
  this.z && (this.z.cancel(), this.z = m);
  this.h = -1
};
u.Gb = ba(r);
u.Ob = function(a, b) {
  this.h = a.h;
  if(0 == this.c) {
    if(this.a.debug("TestConnection: Got data for stage 1"), b) {
      try {
        var c = this.O.parse(b)
      }catch(d) {
        Bc(this.a, d);
        Fd(this.b, this);
        return
      }
      this.K = this.b.correctHostPrefix(c[0]);
      this.va = c[1]
    }else {
      this.a.debug("TestConnection: Null responseText"), Fd(this.b, this)
    }
  }else {
    if(2 == this.c) {
      if(this.Ta) {
        V(Gd), this.mb = C()
      }else {
        if("11111" == b) {
          if(V(Hd), this.Ta = l, this.Ja = C(), c = this.Ja - this.$b, hc() || 500 > c) {
            this.h = 200, this.z.cancel(), this.a.debug("Test connection succeeded; using streaming connection"), V(Id), Jd(this.b, this, l)
          }
        }else {
          V(Kd), this.Ja = this.mb = C(), this.Ta = r
        }
      }
    }
  }
};
u.la = function() {
  this.h = this.z.h;
  if(this.z.I) {
    if(0 == this.c) {
      this.a.debug("TestConnection: request complete for initial check"), this.va ? (this.c = 1, zd(this)) : (this.c = 2, Ad(this))
    }else {
      if(2 == this.c) {
        this.a.debug("TestConnection: request complete for stage 2");
        var a = r;
        (a = hc() ? this.Ta : 200 > this.mb - this.Ja ? r : l) ? (this.a.debug("Test connection succeeded; using streaming connection"), V(Id), Jd(this.b, this, l)) : (this.a.debug("Test connection failed; not using streaming"), V(Ld), Jd(this.b, this, r))
      }
    }
  }else {
    this.a.debug("TestConnection: request failed, in state " + this.c), 0 == this.c ? V(Md) : 2 == this.c && V(Nd), Fd(this.b, this)
  }
};
u.Xa = function() {
  return this.b.Xa()
};
u.isActive = function() {
  return this.b.isActive()
};
u.F = function(a) {
  this.b.F(a)
};
function Od(a, b) {
  this.ub = a || m;
  this.c = Pd;
  this.s = [];
  this.P = [];
  this.a = new kd;
  this.O = new md(m, l);
  this.Bb = b || m
}
function Qd(a, b) {
  this.Kb = a;
  this.map = b;
  this.Ec = m
}
u = Od.prototype;
u.v = m;
u.wa = m;
u.o = m;
u.k = m;
u.G = m;
u.Ka = m;
u.tb = m;
u.K = m;
u.ec = l;
u.za = 0;
u.pc = 0;
u.Ia = r;
u.e = m;
u.D = m;
u.L = m;
u.aa = m;
u.T = m;
u.qb = m;
u.dc = l;
u.xa = -1;
u.Jb = -1;
u.h = -1;
u.U = 0;
u.fa = 0;
u.fc = 5E3;
u.Ac = 1E4;
u.jb = 2;
u.Cb = 2E4;
u.na = 0;
u.Ya = r;
u.ga = 8;
var Pd = 1, Rd = new Ub;
function Sd(a, b) {
  Q.call(this, "statevent", a);
  this.Oc = b
}
D(Sd, Q);
function Td(a, b, c, d) {
  Q.call(this, "timingevent", a);
  this.size = b;
  this.Mc = c;
  this.Lc = d
}
D(Td, Q);
var mc = 1, sc = 2, rc = 3, Jc = 4;
function Ud(a, b) {
  Q.call(this, "serverreachability", a);
  this.Kc = b
}
D(Ud, Q);
var yd = 3, Cd = 4, Ed = 5, Hd = 6, Gd = 7, Kd = 8, Md = 9, Nd = 10, Ld = 11, Id = 12, yc = 13, zc = 14, Dc = 15, Ec = 16, Fc = 17, Lc = 18, Hc = 22, ld = "y2f%";
u = Od.prototype;
u.fb = function(a, b, c, d, f) {
  this.a.debug("connect()");
  V(0);
  this.G = b;
  this.wa = c || {};
  d && f !== h && (this.wa.OSID = d, this.wa.OAID = f);
  this.a.debug("connectTest_()");
  Vd(this) && (this.T = new wd(this, this.a), this.T.X(this.v), this.T.Yb(this.O), this.T.fb(a))
};
u.disconnect = function() {
  this.a.debug("disconnect()");
  Wd(this);
  if(3 == this.c) {
    var a = this.za++, b = this.Ka.n();
    K(b, "SID", this.Y);
    K(b, "RID", a);
    K(b, "TYPE", "terminate");
    Xd(this, b);
    a = new T(this, this.a, this.Y, a, h);
    a.ra = 2;
    a.S = M(b.n());
    b = new Image;
    b.src = a.S;
    b.onload = b.onerror = B(a.kc, a);
    a.oa = C();
    lc(a)
  }
  Zd(this)
};
function Wd(a) {
  a.T && (a.T.abort(), a.T = m);
  a.k && (a.k.cancel(), a.k = m);
  a.L && (w.clearTimeout(a.L), a.L = m);
  $d(a);
  a.o && (a.o.cancel(), a.o = m);
  a.D && (w.clearTimeout(a.D), a.D = m)
}
u.X = t("v");
u.Zb = t("na");
u.Gb = function() {
  return 0 == this.c
};
u.Yb = t("O");
function ae(a) {
  !a.o && !a.D && (a.D = W(B(a.Qb, a), 0), a.U = 0)
}
u.Qb = function(a) {
  this.D = m;
  this.a.debug("startForwardChannel_");
  if(Vd(this)) {
    if(this.c == Pd) {
      if(a) {
        this.a.H("Not supposed to retry the open")
      }else {
        this.a.debug("open_()");
        this.za = Math.floor(1E5 * Math.random());
        a = this.za++;
        var b = new T(this, this.a, "", a, h);
        b.X(this.v);
        var c = be(this), d = this.Ka.n();
        K(d, "RID", a);
        this.ub && K(d, "CVER", this.ub);
        Xd(this, d);
        ic(b, d, c);
        this.o = b;
        this.c = 2
      }
    }else {
      3 == this.c && (a ? ce(this, a) : 0 == this.s.length ? this.a.debug("startForwardChannel_ returned: nothing to send") : this.o ? this.a.H("startForwardChannel_ returned: connection already in progress") : (ce(this), this.a.debug("startForwardChannel_ finished, sent request")))
    }
  }
};
function ce(a, b) {
  var c, d;
  b ? 6 < a.ga ? (a.s = a.P.concat(a.s), a.P.length = 0, c = a.za - 1, d = be(a)) : (c = b.A, d = b.W) : (c = a.za++, d = be(a));
  var f = a.Ka.n();
  K(f, "SID", a.Y);
  K(f, "RID", c);
  K(f, "AID", a.xa);
  Xd(a, f);
  c = new T(a, a.a, a.Y, c, a.U + 1);
  c.X(a.v);
  c.setTimeout(Math.round(0.5 * a.Cb) + Math.round(0.5 * a.Cb * Math.random()));
  a.o = c;
  ic(c, f, d)
}
function Xd(a, b) {
  if(a.e) {
    var c = a.e.getAdditionalParams(a);
    c && cb(c, function(a, c) {
      K(b, c, a)
    })
  }
}
function be(a) {
  var b = Math.min(a.s.length, 1E3), c = ["count=" + b], d;
  6 < a.ga && 0 < b ? (d = a.s[0].Kb, c.push("ofs=" + d)) : d = 0;
  for(var f = 0;f < b;f++) {
    var g = a.s[f].Kb, k = a.s[f].map, g = 6 >= a.ga ? f : g - d;
    try {
      cb(k, function(a, b) {
        c.push("req" + g + "_" + b + "=" + encodeURIComponent(a))
      })
    }catch(q) {
      c.push("req" + g + "_type=" + encodeURIComponent("_badmap")), a.e && a.e.badMapError(a, k)
    }
  }
  a.P = a.P.concat(a.s.splice(0, b));
  return c.join("&")
}
function de(a) {
  !a.k && !a.L && (a.sb = 1, a.L = W(B(a.Pb, a), 0), a.fa = 0)
}
function ee(a) {
  if(a.k || a.L) {
    return a.a.H("Request already in progress"), r
  }
  if(3 <= a.fa) {
    return r
  }
  a.a.debug("Going to retry GET");
  a.sb++;
  a.L = W(B(a.Pb, a), fe(a, a.fa));
  a.fa++;
  return l
}
u.Pb = function() {
  this.L = m;
  if(Vd(this)) {
    this.a.debug("Creating new HttpRequest");
    this.k = new T(this, this.a, this.Y, "rpc", this.sb);
    this.k.X(this.v);
    this.k.Zb(this.na);
    var a = this.tb.n();
    K(a, "RID", "rpc");
    K(a, "SID", this.Y);
    K(a, "CI", this.qb ? "0" : "1");
    K(a, "AID", this.xa);
    Xd(this, a);
    if(hc()) {
      K(a, "TYPE", "xmlhttp"), kc(this.k, a, l, this.K, r)
    }else {
      K(a, "TYPE", "html");
      var b = this.k, c = Boolean(this.K);
      b.ra = 3;
      b.S = M(a.n());
      Gc(b, c)
    }
    this.a.debug("New Request created")
  }
};
function Vd(a) {
  if(a.e) {
    var b = a.e.okToMakeRequest(a);
    if(0 != b) {
      return a.a.debug("Handler returned error code from okToMakeRequest"), Z(a, b), r
    }
  }
  return l
}
function Jd(a, b, c) {
  a.a.debug("Test Connection Finished");
  a.qb = a.dc && c;
  a.h = b.h;
  a.a.debug("connectChannel_()");
  a.ic(Pd, 0);
  a.Ka = xd(a, a.G);
  ae(a)
}
function Fd(a, b) {
  a.a.debug("Test Connection Failed");
  a.h = b.h;
  Z(a, 2)
}
u.Ob = function(a, b) {
  if(!(0 == this.c || this.k != a && this.o != a)) {
    if(this.h = a.h, this.o == a && 3 == this.c) {
      if(7 < this.ga) {
        var c;
        try {
          c = this.O.parse(b)
        }catch(d) {
          c = m
        }
        if(x(c) && 3 == c.length) {
          var f = c;
          if(0 == f[0]) {
            a: {
              if(this.a.debug("Server claims our backchannel is missing."), this.L) {
                this.a.debug("But we are currently starting the request.")
              }else {
                if(this.k) {
                  if(this.k.oa + 3E3 < this.o.oa) {
                    $d(this), this.k.cancel(), this.k = m
                  }else {
                    break a
                  }
                }else {
                  this.a.Z("We do not have a BackChannel established")
                }
                ee(this);
                V(19)
              }
            }
          }else {
            this.Jb = f[1], c = this.Jb - this.xa, 0 < c && (f = f[2], this.a.debug(f + " bytes (in " + c + " arrays) are outstanding on the BackChannel"), 37500 > f && (this.qb && 0 == this.fa) && !this.aa && (this.aa = W(B(this.qc, this), 6E3)))
          }
        }else {
          this.a.debug("Bad POST response data returned"), Z(this, 11)
        }
      }else {
        b != ld && (this.a.debug("Bad data returned - missing/invald magic cookie"), Z(this, 11))
      }
    }else {
      if(this.k == a && $d(this), !/^[\s\xa0]*$/.test(b)) {
        c = this.O.parse(b);
        for(var f = this.e && this.e.channelHandleMultipleArrays ? [] : m, g = 0;g < c.length;g++) {
          var k = c[g];
          this.xa = k[0];
          k = k[1];
          2 == this.c ? "c" == k[0] ? (this.Y = k[1], this.K = this.correctHostPrefix(k[2]), k = k[3], this.ga = k != m ? k : 6, this.c = 3, this.e && this.e.channelOpened(this), this.tb = Dd(this, this.K, this.G), de(this)) : "stop" == k[0] && Z(this, 7) : 3 == this.c && ("stop" == k[0] ? (f && f.length && (this.e.channelHandleMultipleArrays(this, f), f.length = 0), Z(this, 7)) : "noop" != k[0] && (f ? f.push(k) : this.e && this.e.channelHandleArray(this, k)), this.fa = 0)
        }
        f && f.length && this.e.channelHandleMultipleArrays(this, f)
      }
    }
  }
};
u.correctHostPrefix = function(a) {
  return this.ec ? this.e ? this.e.correctHostPrefix(a) : a : m
};
u.qc = function() {
  this.aa != m && (this.aa = m, this.k.cancel(), this.k = m, ee(this), V(20))
};
function $d(a) {
  a.aa != m && (w.clearTimeout(a.aa), a.aa = m)
}
u.la = function(a) {
  this.a.debug("Request complete");
  var b;
  if(this.k == a) {
    $d(this), this.k = m, b = 2
  }else {
    if(this.o == a) {
      this.o = m, b = 1
    }else {
      return
    }
  }
  this.h = a.h;
  if(0 != this.c) {
    if(a.I) {
      1 == b ? (b = C() - a.oa, Rd.dispatchEvent(new Td(Rd, a.W ? a.W.length : 0, b, this.U)), ae(this), this.P.length = 0) : de(this)
    }else {
      var c = a.Db();
      if(3 == c || 7 == c || 0 == c && 0 < this.h) {
        this.a.debug("Not retrying due to error type")
      }else {
        this.a.debug("Maybe retrying, last error: " + ec(c, this.h));
        var d;
        if(d = 1 == b) {
          this.o || this.D ? (this.a.H("Request already in progress"), d = r) : this.c == Pd || this.U >= (this.Ia ? 0 : this.jb) ? d = r : (this.a.debug("Going to retry POST"), this.D = W(B(this.Qb, this, a), fe(this, this.U)), this.U++, d = l)
        }
        if(d || 2 == b && ee(this)) {
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
function fe(a, b) {
  var c = a.fc + Math.floor(Math.random() * a.Ac);
  a.isActive() || (a.a.debug("Inactive channel"), c *= 2);
  return c * b
}
u.ic = function(a) {
  0 <= Ya(arguments, this.c) || e(Error("Unexpected channel state: " + this.c))
};
function Z(a, b) {
  a.a.info("Error code " + b);
  if(2 == b || 9 == b) {
    var c = m;
    a.e && (c = a.e.getNetworkTestImageUri(a));
    var d = B(a.Cc, a);
    c || (c = new I("//www.google.com/images/cleardot.gif"), M(c));
    vd(c.toString(), 1E4, d)
  }else {
    V(2)
  }
  ge(a, b)
}
u.Cc = function(a) {
  a ? (this.a.info("Successfully pinged google.com"), V(2)) : (this.a.info("Failed to ping google.com"), V(1), ge(this, 8))
};
function ge(a, b) {
  a.a.debug("HttpChannel: error - " + b);
  a.c = 0;
  a.e && a.e.channelError(a, b);
  Zd(a);
  Wd(a)
}
function Zd(a) {
  a.c = 0;
  a.h = -1;
  if(a.e) {
    if(0 == a.P.length && 0 == a.s.length) {
      a.e.channelClosed(a)
    }else {
      a.a.debug("Number of undelivered maps, pending: " + a.P.length + ", outgoing: " + a.s.length);
      var b = ab(a.P), c = ab(a.s);
      a.P.length = 0;
      a.s.length = 0;
      a.e.channelClosed(a, b, c)
    }
  }
}
function xd(a, b) {
  var c = Bd(a, m, b);
  a.a.debug("GetForwardChannelUri: " + c);
  return c
}
function Dd(a, b, c) {
  b = Bd(a, a.Xa() ? b : m, c);
  a.a.debug("GetBackChannelUri: " + b);
  return b
}
function Bd(a, b, c) {
  var d = c instanceof I ? c.n() : new I(c, h);
  if("" != d.ia) {
    b && hb(d, b + "." + d.ia), ib(d, d.Aa)
  }else {
    var f = window.location, d = ub(f.protocol, b ? b + "." + f.hostname : f.hostname, f.port, c)
  }
  a.wa && cb(a.wa, function(a, b) {
    K(d, b, a)
  });
  K(d, "VER", a.ga);
  Xd(a, d);
  return d
}
u.gb = function(a) {
  a && !this.Ya && e(Error("Can't create secondary domain capable XhrIo object."));
  a = new nd;
  a.bc = this.Ya;
  return a
};
u.isActive = function() {
  return!!this.e && this.e.isActive(this)
};
function W(a, b) {
  ha(a) || e(Error("Fn must not be null and must be a function"));
  return w.setTimeout(function() {
    a()
  }, b)
}
u.F = function(a) {
  Rd.dispatchEvent(new Ud(Rd, a))
};
function V(a) {
  Rd.dispatchEvent(new Sd(Rd, a))
}
u.Xa = function() {
  return this.Ya || !hc()
};
function he() {
}
u = he.prototype;
u.channelHandleMultipleArrays = m;
u.okToMakeRequest = ba(0);
u.channelOpened = s();
u.channelHandleArray = s();
u.channelError = s();
u.channelClosed = s();
u.getAdditionalParams = function() {
  return{}
};
u.getNetworkTestImageUri = ba(m);
u.isActive = ba(l);
u.badMapError = s();
u.correctHostPrefix = function(a) {
  return a
};
var $, ie, je = [].slice;
ie = {0:"Ok", 4:"User is logging out", 6:"Unknown session ID", 7:"Stopped by server", 8:"General network error", 2:"Request failed", 9:"Blocked by a network administrator", 5:"No data from server", 10:"Got bad data from the server", 11:"Got a bad response from the server"};
$ = function(a, b) {
  var c, d, f, g, k, q, n, y, p, v;
  y = this;
  a || (a = "channel");
  a.match(/:\/\//) && a.replace(/^ws/, "http");
  b || (b = {});
  if(x(b || "string" === typeof b)) {
    b = {}
  }
  q = b.reconnectTime || 3E3;
  v = function(a) {
    y.readyState = y.readyState = a
  };
  v(this.CLOSED);
  p = m;
  g = b.Jc;
  c = function() {
    var a, b;
    b = arguments[0];
    a = 2 <= arguments.length ? je.call(arguments, 1) : [];
    try {
      return"function" === typeof y[b] ? y[b].apply(y, a) : h
    }catch(c) {
      a = c, "undefined" !== typeof console && console !== m && console.error(a.stack), e(a)
    }
  };
  d = new he;
  d.channelOpened = function() {
    g = p;
    v($.OPEN);
    return c("onopen")
  };
  f = m;
  d.channelError = function(a, b) {
    var d;
    d = ie[b];
    f = b;
    v($.bb);
    try {
      return c("onerror", d, b)
    }catch(g) {
    }
  };
  n = m;
  d.channelClosed = function(a, d, g) {
    if(y.readyState !== $.CLOSED) {
      p = m;
      a = f ? ie[f] : "Closed";
      v($.CLOSED);
      try {
        c("onclose", a, d, g)
      }catch(ke) {
      }
      b.reconnect && (7 !== f && 0 !== f) && (d = 6 === f ? 0 : q, clearTimeout(n), n = setTimeout(k, d));
      return f = m
    }
  };
  d.channelHandleArray = function(a, b) {
    return c("onmessage", b)
  };
  k = function() {
    p && e(Error("Reconnect() called from invalid state"));
    v($.CONNECTING);
    c("onconnecting");
    clearTimeout(n);
    p = new Od(b.appVersion, g != m ? g.Bb : h);
    b.crossDomainXhr && (p.Ya = l);
    p.e = d;
    f = m;
    if(b.failFast) {
      var k = p;
      k.Ia = l;
      k.a.info("setFailFast: true");
      if((k.o || k.D) && k.U > (k.Ia ? 0 : k.jb)) {
        k.a.info("Retry count " + k.U + " > new maxRetries " + (k.Ia ? 0 : k.jb) + ". Fail immediately!"), k.o ? (k.o.cancel(), k.la(k.o)) : (w.clearTimeout(k.D), k.D = m, Z(k, 2))
      }
    }
    return p.fb("" + a + "/test", "" + a + "/bind", m, g != m ? g.Y : h, g != m ? g.xa : h)
  };
  this.open = function() {
    y.readyState !== y.CLOSED && e(Error("Already open"));
    return k()
  };
  this.close = function() {
    clearTimeout(n);
    f = 0;
    if(y.readyState !== $.CLOSED) {
      return v($.bb), p.disconnect()
    }
  };
  this.sendMap = function(a) {
    var b;
    ((b = y.readyState) === $.bb || b === $.CLOSED) && e(Error("Cannot send to a closed connection"));
    b = p;
    0 == b.c && e(Error("Invalid operation: sending map when state is closed"));
    1E3 == b.s.length && b.a.H("Already have 1000 queued maps upon queueing " + Oc(a));
    b.s.push(new Qd(b.pc++, a));
    (2 == b.c || 3 == b.c) && ae(b)
  };
  this.send = function(a) {
    return this.sendMap({JSON:Oc(a)})
  };
  k();
  return this
};
$.prototype.CONNECTING = $.CONNECTING = $.CONNECTING = 0;
$.prototype.OPEN = $.OPEN = $.OPEN = 1;
$.prototype.CLOSING = $.CLOSING = $.bb = 2;
$.prototype.CLOSED = $.CLOSED = $.CLOSED = 3;
("undefined" !== typeof exports && exports !== m ? exports : window).BCSocket = $;

})();
