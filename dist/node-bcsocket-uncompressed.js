(function(){
function e(a) {
  throw a;
}
var h = void 0, k = !0, l = null, p = !1;
function r() {
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
var u, ca = ca || {}, v = this;
function da(a) {
  a = a.split(".");
  for(var b = v, c;c = a.shift();) {
    if(b[c] != l) {
      b = b[c]
    }else {
      return l
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
function w(a) {
  return"array" == fa(a)
}
function ga(a) {
  var b = fa(a);
  return"array" == b || "object" == b && "number" == typeof a.length
}
function y(a) {
  return"string" == typeof a
}
function ha(a) {
  return"function" == fa(a)
}
function z(a) {
  return a[ia] || (a[ia] = ++ja)
}
var ia = "closure_uid_" + Math.floor(2147483648 * Math.random()).toString(36), ja = 0;
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
function A(a, b, c) {
  A = Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? ka : la;
  return A.apply(l, arguments)
}
var B = Date.now || function() {
  return+new Date
};
function C(a, b) {
  function c() {
  }
  c.prototype = b.prototype;
  a.pa = b.prototype;
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
  return v.navigator ? v.navigator.userAgent : l
}
wa = va = ua = ta = p;
var ya;
if(ya = xa()) {
  var Aa = v.navigator;
  ta = 0 == ya.indexOf("Opera");
  ua = !ta && -1 != ya.indexOf("MSIE");
  va = !ta && -1 != ya.indexOf("WebKit");
  wa = !ta && !va && "Gecko" == Aa.product
}
var Ba = ta, D = ua, Ca = wa, E = va, Da = v.navigator, Ea = -1 != (Da && Da.platform || "").indexOf("Mac");
function Fa() {
  var a = v.document;
  return a ? a.documentMode : h
}
var Ga;
a: {
  var Ha = "", Ia;
  if(Ba && v.opera) {
    var Ja = v.opera.version, Ha = "function" == typeof Ja ? Ja() : Ja
  }else {
    if(Ca ? Ia = /rv\:([^\);]+)(\)|;)/ : D ? Ia = /MSIE\s+([^\);]+)(\)|;)/ : E && (Ia = /WebKit\/(\S+)/), Ia) {
      var Ka = Ia.exec(xa()), Ha = Ka ? Ka[1] : ""
    }
  }
  if(D) {
    var La = Fa();
    if(La > parseFloat(Ha)) {
      Ga = String(La);
      break a
    }
  }
  Ga = Ha
}
var Ma = {};
function F(a) {
  var b;
  if(!(b = Ma[a])) {
    b = 0;
    for(var c = String(Ga).replace(/^[\s\xa0]+|[\s\xa0]+$/g, "").split("."), d = String(a).replace(/^[\s\xa0]+|[\s\xa0]+$/g, "").split("."), f = Math.max(c.length, d.length), g = 0;0 == b && g < f;g++) {
      var j = c[g] || "", n = d[g] || "", m = RegExp("(\\d*)(\\D*)", "g"), q = RegExp("(\\d*)(\\D*)", "g");
      do {
        var s = m.exec(j) || ["", "", ""], x = q.exec(n) || ["", "", ""];
        if(0 == s[0].length && 0 == x[0].length) {
          break
        }
        b = ((0 == s[1].length ? 0 : parseInt(s[1], 10)) < (0 == x[1].length ? 0 : parseInt(x[1], 10)) ? -1 : (0 == s[1].length ? 0 : parseInt(s[1], 10)) > (0 == x[1].length ? 0 : parseInt(x[1], 10)) ? 1 : 0) || ((0 == s[2].length) < (0 == x[2].length) ? -1 : (0 == s[2].length) > (0 == x[2].length) ? 1 : 0) || (s[2] < x[2] ? -1 : s[2] > x[2] ? 1 : 0)
      }while(0 == b)
    }
    b = Ma[a] = 0 <= b
  }
  return b
}
var Na = v.document, Oa = !Na || !D ? h : Fa() || ("CSS1Compat" == Na.compatMode ? parseInt(Ga, 10) : 5);
function Pa(a) {
  Error.captureStackTrace ? Error.captureStackTrace(this, Pa) : this.stack = Error().stack || "";
  a && (this.message = String(a))
}
C(Pa, Error);
Pa.prototype.name = "CustomError";
function Qa(a, b) {
  b.unshift(a);
  Pa.call(this, ma.apply(l, b));
  b.shift();
  this.Jc = a
}
C(Qa, Pa);
Qa.prototype.name = "AssertionError";
function Ra(a, b) {
  e(new Qa("Failure" + (a ? ": " + a : ""), Array.prototype.slice.call(arguments, 1)))
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
  for(var c, d, f = 1;f < arguments.length;f++) {
    d = arguments[f];
    for(c in d) {
      a[c] = d[c]
    }
    for(var g = 0;g < Va.length;g++) {
      c = Va[g], Object.prototype.hasOwnProperty.call(d, c) && (a[c] = d[c])
    }
  }
}
;var G = Array.prototype, Xa = G.indexOf ? function(a, b, c) {
  return G.indexOf.call(a, b, c)
} : function(a, b, c) {
  c = c == l ? 0 : 0 > c ? Math.max(0, a.length + c) : c;
  if(y(a)) {
    return!y(b) || 1 != b.length ? -1 : a.indexOf(b, c)
  }
  for(;c < a.length;c++) {
    if(c in a && a[c] === b) {
      return c
    }
  }
  return-1
}, Ya = G.forEach ? function(a, b, c) {
  G.forEach.call(a, b, c)
} : function(a, b, c) {
  for(var d = a.length, f = y(a) ? a.split("") : a, g = 0;g < d;g++) {
    g in f && b.call(c, f[g], g, a)
  }
};
function Za(a) {
  return G.concat.apply(G, arguments)
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
  if(y(a)) {
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
    if(ga(a) || y(a)) {
      Ya(a, b, c)
    }else {
      var d;
      if("function" == typeof a.ha) {
        d = a.ha()
      }else {
        if("function" != typeof a.L) {
          if(ga(a) || y(a)) {
            d = [];
            for(var f = a.length, g = 0;g < f;g++) {
              d.push(g)
            }
          }else {
            d = Ua(a)
          }
        }else {
          d = h
        }
      }
      for(var f = ab(a), g = f.length, j = 0;j < g;j++) {
        b.call(c, f[j], d && d[j], a)
      }
    }
  }
}
;function cb(a, b) {
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
      a instanceof cb ? (c = a.ha(), d = a.L()) : (c = Ua(a), d = Ta(a));
      for(var f = 0;f < c.length;f++) {
        this.set(c[f], d[f])
      }
    }
  }
}
u = cb.prototype;
u.f = 0;
u.bc = 0;
u.L = function() {
  db(this);
  for(var a = [], b = 0;b < this.j.length;b++) {
    a.push(this.N[this.j[b]])
  }
  return a
};
u.ha = function() {
  db(this);
  return this.j.concat()
};
u.fa = function(a) {
  return eb(this.N, a)
};
u.remove = function(a) {
  return eb(this.N, a) ? (delete this.N[a], this.f--, this.bc++, this.j.length > 2 * this.f && db(this), k) : p
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
    for(var f = {}, c = b = 0;b < a.j.length;) {
      d = a.j[b], eb(f, d) || (a.j[c++] = d, f[d] = 1), b++
    }
    a.j.length = c
  }
}
u.get = function(a, b) {
  return eb(this.N, a) ? this.N[a] : b
};
u.set = function(a, b) {
  eb(this.N, a) || (this.f++, this.j.push(a), this.bc++);
  this.N[a] = b
};
u.n = function() {
  return new cb(this)
};
function eb(a, b) {
  return Object.prototype.hasOwnProperty.call(a, b)
}
;function I(a, b) {
  var c;
  if(a instanceof I) {
    this.B = b !== h ? b : a.B, fb(this, a.oa), c = a.Za, J(this), this.Za = c, gb(this, a.ga), hb(this, a.za), ib(this, a.G), jb(this, a.Q.n()), c = a.La, J(this), this.La = c
  }else {
    if(a && (c = String(a).match(Sa))) {
      this.B = !!b;
      fb(this, c[1] || "", k);
      var d = c[2] || "";
      J(this);
      this.Za = d ? decodeURIComponent(d) : "";
      gb(this, c[3] || "", k);
      hb(this, c[4]);
      ib(this, c[5] || "", k);
      jb(this, c[6] || "", k);
      c = c[7] || "";
      J(this);
      this.La = c ? decodeURIComponent(c) : ""
    }else {
      this.B = !!b, this.Q = new kb(l, 0, this.B)
    }
  }
}
u = I.prototype;
u.oa = "";
u.Za = "";
u.ga = "";
u.za = l;
u.G = "";
u.La = "";
u.mc = p;
u.B = p;
u.toString = function() {
  var a = [], b = this.oa;
  b && a.push(lb(b, mb), ":");
  if(b = this.ga) {
    a.push("//");
    var c = this.Za;
    c && a.push(lb(c, mb), "@");
    a.push(encodeURIComponent(String(b)));
    b = this.za;
    b != l && a.push(":", String(b))
  }
  if(b = this.G) {
    this.ga && "/" != b.charAt(0) && a.push("/"), a.push(lb(b, "/" == b.charAt(0) ? nb : ob))
  }
  (b = this.Q.toString()) && a.push("?", b);
  (b = this.La) && a.push("#", lb(b, pb));
  return a.join("")
};
u.n = function() {
  return new I(this)
};
function fb(a, b, c) {
  J(a);
  a.oa = c ? b ? decodeURIComponent(b) : "" : b;
  a.oa && (a.oa = a.oa.replace(/:$/, ""))
}
function gb(a, b, c) {
  J(a);
  a.ga = c ? b ? decodeURIComponent(b) : "" : b
}
function hb(a, b) {
  J(a);
  b ? (b = Number(b), (isNaN(b) || 0 > b) && e(Error("Bad port number " + b)), a.za = b) : a.za = l
}
function ib(a, b, c) {
  J(a);
  a.G = c ? b ? decodeURIComponent(b) : "" : b
}
function jb(a, b, c) {
  J(a);
  b instanceof kb ? (a.Q = b, a.Q.ob(a.B)) : (c || (b = lb(b, qb)), a.Q = new kb(b, 0, a.B))
}
function K(a, b, c) {
  J(a);
  a.Q.set(b, c)
}
function rb(a, b, c) {
  J(a);
  w(c) || (c = [String(c)]);
  sb(a.Q, b, c)
}
function L(a) {
  J(a);
  K(a, "zx", Math.floor(2147483648 * Math.random()).toString(36) + Math.abs(Math.floor(2147483648 * Math.random()) ^ B()).toString(36));
  return a
}
function J(a) {
  a.mc && e(Error("Tried to modify a read-only Uri"))
}
u.ob = function(a) {
  this.B = a;
  this.Q && this.Q.ob(a);
  return this
};
function lb(a, b) {
  return y(a) ? encodeURI(a).replace(b, tb) : l
}
function tb(a) {
  a = a.charCodeAt(0);
  return"%" + (a >> 4 & 15).toString(16) + (a & 15).toString(16)
}
var mb = /[#\/\?@]/g, ob = /[\#\?:]/g, nb = /[\#\?]/g, qb = /[\#\?@]/g, pb = /#/g;
function kb(a, b, c) {
  this.A = a || l;
  this.B = !!c
}
function M(a) {
  if(!a.i && (a.i = new cb, a.f = 0, a.A)) {
    for(var b = a.A.split("&"), c = 0;c < b.length;c++) {
      var d = b[c].indexOf("="), f = l, g = l;
      0 <= d ? (f = b[c].substring(0, d), g = b[c].substring(d + 1)) : f = b[c];
      f = decodeURIComponent(f.replace(/\+/g, " "));
      f = N(a, f);
      a.add(f, g ? decodeURIComponent(g.replace(/\+/g, " ")) : "")
    }
  }
}
u = kb.prototype;
u.i = l;
u.f = l;
u.add = function(a, b) {
  M(this);
  this.A = l;
  a = N(this, a);
  var c = this.i.get(a);
  c || this.i.set(a, c = []);
  c.push(b);
  this.f++;
  return this
};
u.remove = function(a) {
  M(this);
  a = N(this, a);
  return this.i.fa(a) ? (this.A = l, this.f -= this.i.get(a).length, this.i.remove(a)) : p
};
u.fa = function(a) {
  M(this);
  a = N(this, a);
  return this.i.fa(a)
};
u.ha = function() {
  M(this);
  for(var a = this.i.L(), b = this.i.ha(), c = [], d = 0;d < b.length;d++) {
    for(var f = a[d], g = 0;g < f.length;g++) {
      c.push(b[d])
    }
  }
  return c
};
u.L = function(a) {
  M(this);
  var b = [];
  if(a) {
    this.fa(a) && (b = Za(b, this.i.get(N(this, a))))
  }else {
    a = this.i.L();
    for(var c = 0;c < a.length;c++) {
      b = Za(b, a[c])
    }
  }
  return b
};
u.set = function(a, b) {
  M(this);
  this.A = l;
  a = N(this, a);
  this.fa(a) && (this.f -= this.i.get(a).length);
  this.i.set(a, [b]);
  this.f++;
  return this
};
u.get = function(a, b) {
  var c = a ? this.L(a) : [];
  return 0 < c.length ? String(c[0]) : b
};
function sb(a, b, c) {
  a.remove(b);
  0 < c.length && (a.A = l, a.i.set(N(a, b), $a(c)), a.f += c.length)
}
u.toString = function() {
  if(this.A) {
    return this.A
  }
  if(!this.i) {
    return""
  }
  for(var a = [], b = this.i.ha(), c = 0;c < b.length;c++) {
    for(var d = b[c], f = encodeURIComponent(String(d)), d = this.L(d), g = 0;g < d.length;g++) {
      var j = f;
      "" !== d[g] && (j += "=" + encodeURIComponent(String(d[g])));
      a.push(j)
    }
  }
  return this.A = a.join("&")
};
u.n = function() {
  var a = new kb;
  a.A = this.A;
  this.i && (a.i = this.i.n(), a.f = this.f);
  return a
};
function N(a, b) {
  var c = String(b);
  a.B && (c = c.toLowerCase());
  return c
}
u.ob = function(a) {
  a && !this.B && (M(this), this.A = l, bb(this.i, function(a, c) {
    var d = c.toLowerCase();
    c != d && (this.remove(c), sb(this, d, a))
  }, this));
  this.B = a
};
function ub() {
}
ub.prototype.Ea = l;
var vb;
function wb() {
}
C(wb, ub);
function xb(a) {
  return(a = yb(a)) ? new ActiveXObject(a) : new XMLHttpRequest
}
function zb(a) {
  var b = {};
  yb(a) && (b[0] = k, b[1] = k);
  return b
}
function yb(a) {
  if(!a.Gb && "undefined" == typeof XMLHttpRequest && "undefined" != typeof ActiveXObject) {
    for(var b = ["MSXML2.XMLHTTP.6.0", "MSXML2.XMLHTTP.3.0", "MSXML2.XMLHTTP", "Microsoft.XMLHTTP"], c = 0;c < b.length;c++) {
      var d = b[c];
      try {
        return new ActiveXObject(d), a.Gb = d
      }catch(f) {
      }
    }
    e(Error("Could not create ActiveXObject. ActiveX might be disabled, or MSXML might not be installed"))
  }
  return a.Gb
}
vb = new wb;
function O() {
  0 != Ab && (this.Gc = Error().stack, Bb[z(this)] = this)
}
var Ab = 0, Bb = {};
O.prototype.zb = p;
O.prototype.Ha = function() {
  if(!this.zb && (this.zb = k, this.t(), 0 != Ab)) {
    var a = z(this);
    delete Bb[a]
  }
};
O.prototype.t = function() {
  this.ic && Cb.apply(l, this.ic);
  if(this.Nb) {
    for(;this.Nb.length;) {
      this.Nb.shift()()
    }
  }
};
function Db(a) {
  a && "function" == typeof a.Ha && a.Ha()
}
function Cb(a) {
  for(var b = 0, c = arguments.length;b < c;++b) {
    var d = arguments[b];
    ga(d) ? Cb.apply(l, d) : Db(d)
  }
}
;function P(a, b) {
  this.type = a;
  this.currentTarget = this.target = b
}
u = P.prototype;
u.t = r();
u.Ha = r();
u.ka = p;
u.defaultPrevented = p;
u.Va = k;
u.preventDefault = function() {
  this.defaultPrevented = k;
  this.Va = p
};
function Eb() {
}
var Fb = 0;
u = Eb.prototype;
u.key = 0;
u.ma = p;
u.Fa = p;
u.Na = function(a, b, c, d, f, g) {
  ha(a) ? this.Ib = k : a && a.handleEvent && ha(a.handleEvent) ? this.Ib = p : e(Error("Invalid listener argument"));
  this.xa = a;
  this.Ub = b;
  this.src = c;
  this.type = d;
  this.capture = !!f;
  this.jb = g;
  this.Fa = p;
  this.key = ++Fb;
  this.ma = p
};
u.handleEvent = function(a) {
  return this.Ib ? this.xa.call(this.jb || this.src, a) : this.xa.handleEvent.call(this.xa, a)
};
var Gb = !D || D && 9 <= Oa, Hb = D && !F("9");
!E || F("528");
Ca && F("1.9b") || D && F("8") || Ba && F("9.5") || E && F("528");
Ca && !F("8") || D && F("9");
function Ib(a) {
  Ib[" "](a);
  return a
}
Ib[" "] = ea;
function Jb(a, b) {
  a && this.Na(a, b)
}
C(Jb, P);
u = Jb.prototype;
u.target = l;
u.relatedTarget = l;
u.offsetX = 0;
u.offsetY = 0;
u.clientX = 0;
u.clientY = 0;
u.screenX = 0;
u.screenY = 0;
u.button = 0;
u.keyCode = 0;
u.charCode = 0;
u.ctrlKey = p;
u.altKey = p;
u.shiftKey = p;
u.metaKey = p;
u.yc = p;
u.Ab = l;
u.Na = function(a, b) {
  var c = this.type = a.type;
  P.call(this, c);
  this.target = a.target || a.srcElement;
  this.currentTarget = b;
  var d = a.relatedTarget;
  if(d) {
    if(Ca) {
      var f;
      a: {
        try {
          Ib(d.nodeName);
          f = k;
          break a
        }catch(g) {
        }
        f = p
      }
      f || (d = l)
    }
  }else {
    "mouseover" == c ? d = a.fromElement : "mouseout" == c && (d = a.toElement)
  }
  this.relatedTarget = d;
  this.offsetX = E || a.offsetX !== h ? a.offsetX : a.layerX;
  this.offsetY = E || a.offsetY !== h ? a.offsetY : a.layerY;
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
  this.Ab = a;
  a.defaultPrevented && this.preventDefault();
  delete this.ka
};
u.preventDefault = function() {
  Jb.pa.preventDefault.call(this);
  var a = this.Ab;
  if(a.preventDefault) {
    a.preventDefault()
  }else {
    if(a.returnValue = p, Hb) {
      try {
        if(a.ctrlKey || 112 <= a.keyCode && 123 >= a.keyCode) {
          a.keyCode = -1
        }
      }catch(b) {
      }
    }
  }
};
u.t = r();
var Q = {}, R = {}, S = {}, Kb = {};
function Lb(a, b, c, d, f) {
  if(w(b)) {
    for(var g = 0;g < b.length;g++) {
      Lb(a, b[g], c, d, f)
    }
    return l
  }
  a: {
    b || e(Error("Invalid event type"));
    d = !!d;
    var j = R;
    b in j || (j[b] = {f:0, C:0});
    j = j[b];
    d in j || (j[d] = {f:0, C:0}, j.f++);
    var j = j[d], g = z(a), n;
    j.C++;
    if(j[g]) {
      n = j[g];
      for(var m = 0;m < n.length;m++) {
        if(j = n[m], j.xa == c && j.jb == f) {
          if(j.ma) {
            break
          }
          n[m].Fa = p;
          a = n[m].key;
          break a
        }
      }
    }else {
      n = j[g] = [], j.f++
    }
    var q = Mb, s = Gb ? function(a) {
      return q.call(s.src, s.key, a)
    } : function(a) {
      a = q.call(s.src, s.key, a);
      if(!a) {
        return a
      }
    }, m = s;
    m.src = a;
    j = new Eb;
    j.Na(c, m, a, b, d, f);
    j.Fa = p;
    c = j.key;
    m.key = c;
    n.push(j);
    Q[c] = j;
    S[g] || (S[g] = []);
    S[g].push(j);
    a.addEventListener ? (a == v || !a.xb) && a.addEventListener(b, m, d) : a.attachEvent(b in Kb ? Kb[b] : Kb[b] = "on" + b, m);
    a = c
  }
  return a
}
function Nb(a, b, c, d, f) {
  if(w(b)) {
    for(var g = 0;g < b.length;g++) {
      Nb(a, b[g], c, d, f)
    }
  }else {
    d = !!d;
    a: {
      g = R;
      if(b in g && (g = g[b], d in g && (g = g[d], a = z(a), g[a]))) {
        a = g[a];
        break a
      }
      a = l
    }
    if(a) {
      for(g = 0;g < a.length;g++) {
        if(a[g].xa == c && a[g].capture == d && a[g].jb == f) {
          Ob(a[g].key);
          break
        }
      }
    }
  }
}
function Ob(a) {
  if(!Q[a]) {
    return p
  }
  var b = Q[a];
  if(b.ma) {
    return p
  }
  var c = b.src, d = b.type, f = b.Ub, g = b.capture;
  c.removeEventListener ? (c == v || !c.xb) && c.removeEventListener(d, f, g) : c.detachEvent && c.detachEvent(d in Kb ? Kb[d] : Kb[d] = "on" + d, f);
  c = z(c);
  if(S[c]) {
    var f = S[c], j = Xa(f, b);
    0 <= j && G.splice.call(f, j, 1);
    0 == f.length && delete S[c]
  }
  b.ma = k;
  if(b = R[d][g][c]) {
    b.Mb = k, Pb(d, g, c, b)
  }
  delete Q[a];
  return k
}
function Pb(a, b, c, d) {
  if(!d.Pa && d.Mb) {
    for(var f = 0, g = 0;f < d.length;f++) {
      d[f].ma ? d[f].Ub.src = l : (f != g && (d[g] = d[f]), g++)
    }
    d.length = g;
    d.Mb = p;
    0 == g && (delete R[a][b][c], R[a][b].f--, 0 == R[a][b].f && (delete R[a][b], R[a].f--), 0 == R[a].f && delete R[a])
  }
}
function Qb(a, b, c, d, f) {
  var g = 1;
  b = z(b);
  if(a[b]) {
    a.C--;
    a = a[b];
    a.Pa ? a.Pa++ : a.Pa = 1;
    try {
      for(var j = a.length, n = 0;n < j;n++) {
        var m = a[n];
        m && !m.ma && (g &= Rb(m, f) !== p)
      }
    }finally {
      a.Pa--, Pb(c, d, b, a)
    }
  }
  return Boolean(g)
}
function Rb(a, b) {
  a.Fa && Ob(a.key);
  return a.handleEvent(b)
}
function Mb(a, b) {
  if(!Q[a]) {
    return k
  }
  var c = Q[a], d = c.type, f = R;
  if(!(d in f)) {
    return k
  }
  var f = f[d], g, j;
  if(!Gb) {
    g = b || da("window.event");
    var n = k in f, m = p in f;
    if(n) {
      if(0 > g.keyCode || g.returnValue != h) {
        return k
      }
      a: {
        var q = p;
        if(0 == g.keyCode) {
          try {
            g.keyCode = -1;
            break a
          }catch(s) {
            q = k
          }
        }
        if(q || g.returnValue == h) {
          g.returnValue = k
        }
      }
    }
    q = new Jb;
    q.Na(g, this);
    g = k;
    try {
      if(n) {
        for(var x = [], za = q.currentTarget;za;za = za.parentNode) {
          x.push(za)
        }
        j = f[k];
        j.C = j.f;
        for(var H = x.length - 1;!q.ka && 0 <= H && j.C;H--) {
          q.currentTarget = x[H], g &= Qb(j, x[H], d, k, q)
        }
        if(m) {
          j = f[p];
          j.C = j.f;
          for(H = 0;!q.ka && H < x.length && j.C;H++) {
            q.currentTarget = x[H], g &= Qb(j, x[H], d, p, q)
          }
        }
      }else {
        g = Rb(c, q)
      }
    }finally {
      x && (x.length = 0)
    }
    return g
  }
  d = new Jb(b, this);
  return g = Rb(c, d)
}
;function Sb() {
  O.call(this)
}
C(Sb, O);
u = Sb.prototype;
u.xb = k;
u.nb = l;
u.addEventListener = function(a, b, c, d) {
  Lb(this, a, b, c, d)
};
u.removeEventListener = function(a, b, c, d) {
  Nb(this, a, b, c, d)
};
u.dispatchEvent = function(a) {
  var b = a.type || a, c = R;
  if(b in c) {
    if(y(a)) {
      a = new P(a, this)
    }else {
      if(a instanceof P) {
        a.target = a.target || this
      }else {
        var d = a;
        a = new P(b, this);
        Wa(a, d)
      }
    }
    var d = 1, f, c = c[b], b = k in c, g;
    if(b) {
      f = [];
      for(g = this;g;g = g.nb) {
        f.push(g)
      }
      g = c[k];
      g.C = g.f;
      for(var j = f.length - 1;!a.ka && 0 <= j && g.C;j--) {
        a.currentTarget = f[j], d &= Qb(g, f[j], a.type, k, a) && a.Va != p
      }
    }
    if(p in c) {
      if(g = c[p], g.C = g.f, b) {
        for(j = 0;!a.ka && j < f.length && g.C;j++) {
          a.currentTarget = f[j], d &= Qb(g, f[j], a.type, p, a) && a.Va != p
        }
      }else {
        for(f = this;!a.ka && f && g.C;f = f.nb) {
          a.currentTarget = f, d &= Qb(g, f, a.type, p, a) && a.Va != p
        }
      }
    }
    a = Boolean(d)
  }else {
    a = k
  }
  return a
};
u.t = function() {
  Sb.pa.t.call(this);
  var a = 0;
  if(this != l) {
    var b = z(this);
    if(S[b]) {
      for(var b = S[b], c = b.length - 1;0 <= c;c--) {
        Ob(b[c].key), a++
      }
    }
  }else {
    for(c in b = function(b, c) {
      Ob(c);
      a++
    }, Q) {
      b.call(h, 0, c)
    }
  }
  this.nb = l
};
function Tb(a, b) {
  O.call(this);
  this.ba = a || 1;
  this.Ca = b || Ub;
  this.cb = A(this.Ec, this);
  this.mb = B()
}
C(Tb, Sb);
Tb.prototype.enabled = p;
var Ub = v;
u = Tb.prototype;
u.r = l;
u.setInterval = function(a) {
  this.ba = a;
  this.r && this.enabled ? (this.stop(), this.start()) : this.r && this.stop()
};
u.Ec = function() {
  if(this.enabled) {
    var a = B() - this.mb;
    0 < a && a < 0.8 * this.ba ? this.r = this.Ca.setTimeout(this.cb, this.ba - a) : (this.dispatchEvent(Vb), this.enabled && (this.r = this.Ca.setTimeout(this.cb, this.ba), this.mb = B()))
  }
};
u.start = function() {
  this.enabled = k;
  this.r || (this.r = this.Ca.setTimeout(this.cb, this.ba), this.mb = B())
};
u.stop = function() {
  this.enabled = p;
  this.r && (this.Ca.clearTimeout(this.r), this.r = l)
};
u.t = function() {
  Tb.pa.t.call(this);
  this.stop();
  delete this.Ca
};
var Vb = "tick";
function Wb(a) {
  O.call(this);
  this.e = a;
  this.j = []
}
C(Wb, O);
var Xb = [];
function Yb(a, b, c, d) {
  w(c) || (Xb[0] = c, c = Xb);
  for(var f = 0;f < c.length;f++) {
    var g = Lb(b, c[f], d || a, p, a.e || a);
    a.j.push(g)
  }
}
Wb.prototype.t = function() {
  Wb.pa.t.call(this);
  Ya(this.j, Ob);
  this.j.length = 0
};
Wb.prototype.handleEvent = function() {
  e(Error("EventHandler.handleEvent not implemented"))
};
function Zb(a, b, c) {
  O.call(this);
  this.nc = a;
  this.ba = b;
  this.e = c;
  this.gc = A(this.tc, this)
}
C(Zb, O);
u = Zb.prototype;
u.Wa = p;
u.Tb = 0;
u.r = l;
u.stop = function() {
  this.r && (Ub.clearTimeout(this.r), this.r = l, this.Wa = p)
};
u.t = function() {
  Zb.pa.t.call(this);
  this.stop()
};
u.tc = function() {
  this.r = l;
  this.Wa && !this.Tb && (this.Wa = p, $b(this))
};
function $b(a) {
  var b;
  b = a.gc;
  var c = a.ba;
  ha(b) || (b && "function" == typeof b.handleEvent ? b = A(b.handleEvent, b) : e(Error("Invalid listener argument")));
  b = 2147483647 < c ? -1 : Ub.setTimeout(b, c || 0);
  a.r = b;
  a.nc.call(a.e)
}
;function T(a, b, c, d, f) {
  this.b = a;
  this.a = b;
  this.X = c;
  this.z = d;
  this.Aa = f || 1;
  this.Ba = ac;
  this.hb = new Wb(this);
  this.Ra = new Tb;
  this.Ra.setInterval(bc)
}
u = T.prototype;
u.u = l;
u.I = p;
u.sa = l;
u.rb = l;
u.na = l;
u.qa = l;
u.S = l;
u.v = l;
u.V = l;
u.l = l;
u.Da = 0;
u.J = l;
u.ra = l;
u.p = l;
u.h = -1;
u.Xb = k;
u.Z = p;
u.la = 0;
u.Sa = l;
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
  return!D || D && 10 <= Oa
}
u = T.prototype;
u.W = t("u");
u.setTimeout = t("Ba");
u.$b = t("la");
function gc(a, b, c) {
  a.qa = 1;
  a.S = L(b.n());
  a.V = c;
  a.yb = k;
  hc(a, l)
}
function ic(a, b, c, d, f) {
  a.qa = 1;
  a.S = L(b.n());
  a.V = l;
  a.yb = c;
  f && (a.Xb = p);
  hc(a, d)
}
function hc(a, b) {
  a.na = B();
  jc(a);
  a.v = a.S.n();
  rb(a.v, "t", a.Aa);
  a.Da = 0;
  a.l = a.b.Ga(a.b.Xa() ? b : l);
  0 < a.la && (a.Sa = new Zb(A(a.cc, a, a.l), a.la));
  Yb(a.hb, a.l, "readystatechange", a.Ac);
  var c;
  if(a.u) {
    c = a.u;
    var d = {}, f;
    for(f in c) {
      d[f] = c[f]
    }
    c = d
  }else {
    c = {}
  }
  a.V ? (a.ra = "POST", c["Content-Type"] = "application/x-www-form-urlencoded", a.l.send(a.v, a.ra, a.V, c)) : (a.ra = "GET", a.Xb && !E && (c.Connection = "close"), a.l.send(a.v, a.ra, l, c));
  a.b.F(kc);
  if(d = a.V) {
    c = "";
    d = d.split("&");
    for(f = 0;f < d.length;f++) {
      var g = d[f].split("=");
      if(1 < g.length) {
        var j = g[0], g = g[1], n = j.split("_");
        c = 2 <= n.length && "type" == n[1] ? c + (j + "=" + g + "&") : c + (j + "=redacted&")
      }
    }
  }else {
    c = l
  }
  a.a.info("XMLHTTP REQ (" + a.z + ") [attempt " + a.Aa + "]: " + a.ra + "\n" + a.v + "\n" + c)
}
u.Ac = function(a) {
  a = a.target;
  var b = this.Sa;
  b && 3 == U(a) ? (this.a.debug("Throttling readystatechange."), !b.r && !b.Tb ? $b(b) : b.Wa = k) : this.cc(a)
};
u.cc = function(a) {
  try {
    if(a == this.l) {
      a: {
        var b = U(this.l), c = this.l.ia, d = lc(this.l);
        if(!fc() || E && !F("420+")) {
          if(4 > b) {
            break a
          }
        }else {
          if(3 > b || 3 == b && !Ba && !mc(this.l)) {
            break a
          }
        }
        !this.Z && (4 == b && c != nc) && (c == oc || 0 >= d ? this.b.F(pc) : this.b.F(qc));
        rc(this);
        var f = lc(this.l);
        this.h = f;
        var g = mc(this.l);
        g || this.a.debug("No response text for uri " + this.v + " status " + f);
        this.I = 200 == f;
        this.a.info("XMLHTTP RESP (" + this.z + ") [ attempt " + this.Aa + "]: " + this.ra + "\n" + this.v + "\n" + b + " " + f);
        this.I ? (4 == b && sc(this), this.yb ? (tc(this, b, g), Ba && 3 == b && (Yb(this.hb, this.Ra, Vb, this.zc), this.Ra.start())) : (uc(this.a, this.z, g, l), vc(this, g)), this.I && !this.Z && (4 == b ? this.b.ja(this) : (this.I = p, jc(this)))) : (400 == f && 0 < g.indexOf("Unknown SID") ? (this.p = 3, V(wc), this.a.Y("XMLHTTP Unknown SID (" + this.z + ")")) : (this.p = 0, V(xc), this.a.Y("XMLHTTP Bad status " + f + " (" + this.z + ")")), sc(this), yc(this))
      }
    }else {
      this.a.Y("Called back with an unexpected xmlhttp")
    }
  }catch(j) {
    this.a.debug("Failed call to OnXmlHttpReadyStateChanged_"), this.l && mc(this.l) ? zc(this.a, j, "ResponseText: " + mc(this.l)) : zc(this.a, j, "No response text")
  }finally {
  }
};
function tc(a, b, c) {
  for(var d = k;!a.Z && a.Da < c.length;) {
    var f = Ac(a, c);
    if(f == ec) {
      4 == b && (a.p = 4, V(Bc), d = p);
      uc(a.a, a.z, l, "[Incomplete Response]");
      break
    }else {
      if(f == dc) {
        a.p = 4;
        V(Cc);
        uc(a.a, a.z, c, "[Invalid Chunk]");
        d = p;
        break
      }else {
        uc(a.a, a.z, f, l), vc(a, f)
      }
    }
  }
  4 == b && 0 == c.length && (a.p = 1, V(Dc), d = p);
  a.I = a.I && d;
  d || (uc(a.a, a.z, c, "[Invalid Chunked Response]"), sc(a), yc(a))
}
u.zc = function() {
  var a = U(this.l), b = mc(this.l);
  this.Da < b.length && (rc(this), tc(this, a, b), this.I && 4 != a && jc(this))
};
function Ac(a, b) {
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
  var f = b.substr(d, c);
  a.Da = d + c;
  return f
}
function Ec(a, b) {
  a.na = B();
  jc(a);
  var c = b ? window.location.hostname : "";
  a.v = a.S.n();
  K(a.v, "DOMAIN", c);
  K(a.v, "t", a.Aa);
  try {
    a.J = new ActiveXObject("htmlfile")
  }catch(d) {
    a.a.H("ActiveX blocked");
    sc(a);
    a.p = 7;
    V(Fc);
    yc(a);
    return
  }
  var f = "<html><body>";
  b && (f += '<script>document.domain="' + c + '"\x3c/script>');
  f += "</body></html>";
  a.J.open();
  a.J.write(f);
  a.J.close();
  a.J.parentWindow.m = A(a.wc, a);
  a.J.parentWindow.d = A(a.Sb, a, k);
  a.J.parentWindow.rpcClose = A(a.Sb, a, p);
  c = a.J.createElement("div");
  a.J.parentWindow.document.body.appendChild(c);
  c.innerHTML = '<iframe src="' + a.v + '"></iframe>';
  a.a.info("TRIDENT REQ (" + a.z + ") [ attempt " + a.Aa + "]: GET\n" + a.v);
  a.b.F(kc)
}
u.wc = function(a) {
  W(A(this.vc, this, a), 0)
};
u.vc = function(a) {
  if(!this.Z) {
    var b = this.a;
    b.info("TRIDENT TEXT (" + this.z + "): " + Gc(b, a));
    rc(this);
    vc(this, a);
    jc(this)
  }
};
u.Sb = function(a) {
  W(A(this.uc, this, a), 0)
};
u.uc = function(a) {
  this.Z || (this.a.info("TRIDENT TEXT (" + this.z + "): " + a ? "success" : "failure"), sc(this), this.I = a, this.b.ja(this), this.b.F(Hc))
};
u.lc = function() {
  rc(this);
  this.b.ja(this)
};
u.cancel = function() {
  this.Z = k;
  sc(this)
};
function jc(a) {
  a.rb = B() + a.Ba;
  Ic(a, a.Ba)
}
function Ic(a, b) {
  a.sa != l && e(Error("WatchDog timer not null"));
  a.sa = W(A(a.xc, a), b)
}
function rc(a) {
  a.sa && (v.clearTimeout(a.sa), a.sa = l)
}
u.xc = function() {
  this.sa = l;
  var a = B();
  0 <= a - this.rb ? (this.I && this.a.H("Received watchdog timeout even though request loaded successfully"), this.a.info("TIMEOUT: " + this.v), 2 != this.qa && this.b.F(pc), sc(this), this.p = 2, V(Jc), yc(this)) : (this.a.Y("WatchDog timer called too early"), Ic(this, this.rb - a))
};
function yc(a) {
  !a.b.Hb() && !a.Z && a.b.ja(a)
}
function sc(a) {
  rc(a);
  Db(a.Sa);
  a.Sa = l;
  a.Ra.stop();
  var b = a.hb;
  Ya(b.j, Ob);
  b.j.length = 0;
  a.l && (b = a.l, a.l = l, b.abort(), b.Ha());
  a.J && (a.J = l)
}
u.Eb = aa("p");
function vc(a, b) {
  try {
    a.b.Pb(a, b), a.b.F(Hc)
  }catch(c) {
    zc(a.a, c, "Error in httprequest callback")
  }
}
;function Kc(a) {
  a = String(a);
  if(/^\s*$/.test(a) ? 0 : /^[\],:{}\s\u2028\u2029]*$/.test(a.replace(/\\["\\\/bfnrtu]/g, "@").replace(/"[^"\\\n\r\u2028\u2029\x00-\x08\x0a-\x1f]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:[\s\u2028\u2029]*\[)+/g, ""))) {
    try {
      return eval("(" + a + ")")
    }catch(b) {
    }
  }
  e(Error("Invalid JSON string: " + a))
}
function Lc(a) {
  return eval("(" + a + ")")
}
function Mc(a) {
  var b = [];
  Nc(new Oc(h), a, b);
  return b.join("")
}
function Oc(a) {
  this.Ua = a
}
function Nc(a, b, c) {
  switch(typeof b) {
    case "string":
      Pc(b, c);
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
      if(b == l) {
        c.push("null");
        break
      }
      if(w(b)) {
        var d = b.length;
        c.push("[");
        for(var f = "", g = 0;g < d;g++) {
          c.push(f), f = b[g], Nc(a, a.Ua ? a.Ua.call(b, String(g), f) : f, c), f = ","
        }
        c.push("]");
        break
      }
      c.push("{");
      d = "";
      for(g in b) {
        Object.prototype.hasOwnProperty.call(b, g) && (f = b[g], "function" != typeof f && (c.push(d), Pc(g, c), c.push(":"), Nc(a, a.Ua ? a.Ua.call(b, g, f) : f, c), d = ","))
      }
      c.push("}");
      break;
    case "function":
      break;
    default:
      e(Error("Unknown type: " + typeof b))
  }
}
var Qc = {'"':'\\"', "\\":"\\\\", "/":"\\/", "\b":"\\b", "\f":"\\f", "\n":"\\n", "\r":"\\r", "\t":"\\t", "\x0B":"\\u000b"}, Rc = /\uffff/.test("\uffff") ? /[\\\"\x00-\x1f\x7f-\uffff]/g : /[\\\"\x00-\x1f\x7f-\xff]/g;
function Pc(a, b) {
  b.push('"', a.replace(Rc, function(a) {
    if(a in Qc) {
      return Qc[a]
    }
    var b = a.charCodeAt(0), f = "\\u";
    16 > b ? f += "000" : 256 > b ? f += "00" : 4096 > b && (f += "0");
    return Qc[a] = f + b.toString(16)
  }), '"')
}
;function Sc(a) {
  return Tc(a || arguments.callee.caller, [])
}
function Tc(a, b) {
  var c = [];
  if(0 <= Xa(b, a)) {
    c.push("[...circular reference...]")
  }else {
    if(a && 50 > b.length) {
      c.push(Uc(a) + "(");
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
            g = (g = Uc(g)) ? g : "[fn]";
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
        c.push(Tc(a.caller, b))
      }catch(j) {
        c.push("[exception trying to get caller]\n")
      }
    }else {
      a ? c.push("[...long stack...]") : c.push("[end]")
    }
  }
  return c.join("")
}
function Uc(a) {
  if(Vc[a]) {
    return Vc[a]
  }
  a = String(a);
  if(!Vc[a]) {
    var b = /function ([^\(]+)/.exec(a);
    Vc[a] = b ? b[1] : "[Anonymous]"
  }
  return Vc[a]
}
var Vc = {};
function Wc(a, b, c, d, f) {
  this.reset(a, b, c, d, f)
}
Wc.prototype.Cc = 0;
Wc.prototype.Cb = l;
Wc.prototype.Bb = l;
var Xc = 0;
Wc.prototype.reset = function(a, b, c, d, f) {
  this.Cc = "number" == typeof f ? f : Xc++;
  this.Qc = d || B();
  this.wa = a;
  this.oc = b;
  this.Ic = c;
  delete this.Cb;
  delete this.Bb
};
Wc.prototype.Yb = t("wa");
function Yc(a) {
  this.pc = a
}
Yc.prototype.Qa = l;
Yc.prototype.wa = l;
Yc.prototype.eb = l;
Yc.prototype.Fb = l;
function Zc(a, b) {
  this.name = a;
  this.value = b
}
Zc.prototype.toString = aa("name");
var $c = new Zc("SEVERE", 1E3), ad = new Zc("WARNING", 900), bd = new Zc("INFO", 800), cd = new Zc("CONFIG", 700), dd = new Zc("FINE", 500);
u = Yc.prototype;
u.getParent = aa("Qa");
u.Yb = t("wa");
function ed(a) {
  if(a.wa) {
    return a.wa
  }
  if(a.Qa) {
    return ed(a.Qa)
  }
  Ra("Root logger has no level set.");
  return l
}
u.log = function(a, b, c) {
  if(a.value >= ed(this).value) {
    a = this.kc(a, b, c);
    b = "log:" + a.oc;
    v.console && (v.console.timeStamp ? v.console.timeStamp(b) : v.console.markTimeline && v.console.markTimeline(b));
    v.msWriteProfilerMark && v.msWriteProfilerMark(b);
    for(b = this;b;) {
      c = b;
      var d = a;
      if(c.Fb) {
        for(var f = 0, g = h;g = c.Fb[f];f++) {
          g(d)
        }
      }
      b = b.getParent()
    }
  }
};
u.kc = function(a, b, c) {
  var d = new Wc(a, String(b), this.pc);
  if(c) {
    d.Cb = c;
    var f;
    var g = arguments.callee.caller;
    try {
      var j;
      var n = da("window.location.href");
      if(y(c)) {
        j = {message:c, name:"Unknown error", lineNumber:"Not available", fileName:n, stack:"Not available"}
      }else {
        var m, q, s = p;
        try {
          m = c.lineNumber || c.Hc || "Not available"
        }catch(x) {
          m = "Not available", s = k
        }
        try {
          q = c.fileName || c.filename || c.sourceURL || n
        }catch(za) {
          q = "Not available", s = k
        }
        j = s || !c.lineNumber || !c.fileName || !c.stack ? {message:c.message, name:c.name, lineNumber:m, fileName:q, stack:c.stack || "Not available"} : c
      }
      f = "Message: " + na(j.message) + '\nUrl: <a href="view-source:' + j.fileName + '" target="_new">' + j.fileName + "</a>\nLine: " + j.lineNumber + "\n\nBrowser stack:\n" + na(j.stack + "-> ") + "[end]\n\nJS stack traversal:\n" + na(Sc(g) + "-> ")
    }catch(H) {
      f = "Exception trying to expose exception! You win, we lose. " + H
    }
    d.Bb = f
  }
  return d
};
u.H = function(a, b) {
  this.log($c, a, b)
};
u.Y = function(a, b) {
  this.log(ad, a, b)
};
u.info = function(a, b) {
  this.log(bd, a, b)
};
function X(a, b) {
  a.log(dd, b, h)
}
var fd = {}, gd = l;
function hd(a) {
  gd || (gd = new Yc(""), fd[""] = gd, gd.Yb(cd));
  var b;
  if(!(b = fd[a])) {
    b = new Yc(a);
    var c = a.lastIndexOf("."), d = a.substr(c + 1), c = hd(a.substr(0, c));
    c.eb || (c.eb = {});
    c.eb[d] = b;
    b.Qa = c;
    fd[a] = b
  }
  return b
}
;function id() {
  this.q = hd("goog.net.BrowserChannel")
}
function uc(a, b, c, d) {
  a.info("XMLHTTP TEXT (" + b + "): " + Gc(a, c) + (d ? " " + d : ""))
}
id.prototype.debug = function(a) {
  this.info(a)
};
function zc(a, b, c) {
  a.H((c || "Exception") + b)
}
id.prototype.info = function(a) {
  this.q.info(a)
};
id.prototype.Y = function(a) {
  this.q.Y(a)
};
id.prototype.H = function(a) {
  this.q.H(a)
};
function Gc(a, b) {
  if(!b || b == jd) {
    return b
  }
  try {
    var c = Lc(b);
    if(c) {
      for(var d = 0;d < c.length;d++) {
        if(w(c[d])) {
          var f = c[d];
          if(!(2 > f.length)) {
            var g = f[1];
            if(w(g) && !(1 > g.length)) {
              var j = g[0];
              if("noop" != j && "stop" != j) {
                for(var n = 1;n < g.length;n++) {
                  g[n] = ""
                }
              }
            }
          }
        }
      }
    }
    return Mc(c)
  }catch(m) {
    return a.debug("Exception parsing expected JS array - probably was not JS"), b
  }
}
;function kd(a, b) {
  this.Oc = new Oc(a);
  this.O = b ? Lc : Kc
}
kd.prototype.parse = function(a) {
  return this.O(a)
};
var nc = 7, oc = 8;
function ld(a) {
  O.call(this);
  this.headers = new cb;
  this.ta = a || l
}
C(ld, Sb);
ld.prototype.q = hd("goog.net.XhrIo");
var md = /^https?$/i;
u = ld.prototype;
u.R = p;
u.g = l;
u.$a = l;
u.Oa = "";
u.Jb = "";
u.ia = 0;
u.p = "";
u.gb = p;
u.Ma = p;
u.kb = p;
u.aa = p;
u.Ya = 0;
u.ca = l;
u.Wb = "";
u.sb = p;
u.send = function(a, b, c, d) {
  this.g && e(Error("[goog.net.XhrIo] Object is active with another request=" + this.Oa + "; newUri=" + a));
  b = b ? b.toUpperCase() : "GET";
  this.Oa = a;
  this.p = "";
  this.ia = 0;
  this.Jb = b;
  this.gb = p;
  this.R = k;
  this.g = this.wb();
  this.$a = this.ta ? this.ta.Ea || (this.ta.Ea = zb(this.ta)) : vb.Ea || (vb.Ea = zb(vb));
  this.g.onreadystatechange = A(this.Ob, this);
  try {
    X(this.q, Y(this, "Opening Xhr")), this.kb = k, this.g.open(b, a, k), this.kb = p
  }catch(f) {
    X(this.q, Y(this, "Error opening Xhr: " + f.message));
    nd(this, f);
    return
  }
  a = c || "";
  var g = this.headers.n();
  d && bb(d, function(a, b) {
    g.set(b, a)
  });
  d = v.FormData && a instanceof v.FormData;
  "POST" == b && (!g.fa("Content-Type") && !d) && g.set("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
  bb(g, function(a, b) {
    this.g.setRequestHeader(b, a)
  }, this);
  this.Wb && (this.g.responseType = this.Wb);
  "withCredentials" in this.g && (this.g.withCredentials = this.sb);
  try {
    this.ca && (Ub.clearTimeout(this.ca), this.ca = l), 0 < this.Ya && (X(this.q, Y(this, "Will abort after " + this.Ya + "ms if incomplete")), this.ca = Ub.setTimeout(A(this.Ba, this), this.Ya)), X(this.q, Y(this, "Sending request")), this.Ma = k, this.g.send(a), this.Ma = p
  }catch(j) {
    X(this.q, Y(this, "Send error: " + j.message)), nd(this, j)
  }
};
u.wb = function() {
  return this.ta ? xb(this.ta) : xb(vb)
};
u.Ba = function() {
  "undefined" != typeof ca && this.g && (this.p = "Timed out after " + this.Ya + "ms, aborting", this.ia = oc, X(this.q, Y(this, this.p)), this.dispatchEvent("timeout"), this.abort(oc))
};
function nd(a, b) {
  a.R = p;
  a.g && (a.aa = k, a.g.abort(), a.aa = p);
  a.p = b;
  a.ia = 5;
  od(a);
  pd(a)
}
function od(a) {
  a.gb || (a.gb = k, a.dispatchEvent("complete"), a.dispatchEvent("error"))
}
u.abort = function(a) {
  this.g && this.R && (X(this.q, Y(this, "Aborting")), this.R = p, this.aa = k, this.g.abort(), this.aa = p, this.ia = a || nc, this.dispatchEvent("complete"), this.dispatchEvent("abort"), pd(this))
};
u.t = function() {
  this.g && (this.R && (this.R = p, this.aa = k, this.g.abort(), this.aa = p), pd(this, k));
  ld.pa.t.call(this)
};
u.Ob = function() {
  !this.kb && !this.Ma && !this.aa ? this.sc() : qd(this)
};
u.sc = function() {
  qd(this)
};
function qd(a) {
  if(a.R && "undefined" != typeof ca) {
    if(a.$a[1] && 4 == U(a) && 2 == lc(a)) {
      X(a.q, Y(a, "Local request error detected and ignored"))
    }else {
      if(a.Ma && 4 == U(a)) {
        Ub.setTimeout(A(a.Ob, a), 0)
      }else {
        if(a.dispatchEvent("readystatechange"), 4 == U(a)) {
          X(a.q, Y(a, "Request complete"));
          a.R = p;
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
                  d = k;
                  break a;
                default:
                  d = p
              }
            }
            if(!(c = d)) {
              var f;
              if(f = 0 === b) {
                var g = String(a.Oa).match(Sa)[1] || l;
                if(!g && self.location) {
                  var j = self.location.protocol, g = j.substr(0, j.length - 1)
                }
                f = !md.test(g ? g.toLowerCase() : "")
              }
              c = f
            }
            if(c) {
              a.dispatchEvent("complete"), a.dispatchEvent("success")
            }else {
              a.ia = 6;
              var n;
              try {
                n = 2 < U(a) ? a.g.statusText : ""
              }catch(m) {
                X(a.q, "Can not get status: " + m.message), n = ""
              }
              a.p = n + " [" + lc(a) + "]";
              od(a)
            }
          }finally {
            pd(a)
          }
        }
      }
    }
  }
}
function pd(a, b) {
  if(a.g) {
    var c = a.g, d = a.$a[0] ? ea : l;
    a.g = l;
    a.$a = l;
    a.ca && (Ub.clearTimeout(a.ca), a.ca = l);
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
function lc(a) {
  try {
    return 2 < U(a) ? a.g.status : -1
  }catch(b) {
    return a.q.Y("Can not get status: " + b.message), -1
  }
}
function mc(a) {
  try {
    return a.g ? a.g.responseText : ""
  }catch(b) {
    return X(a.q, "Can not get responseText: " + b.message), ""
  }
}
u.Eb = function() {
  return y(this.p) ? this.p : String(this.p)
};
function Y(a, b) {
  return b + " [" + a.Jb + " " + a.Oa + " " + lc(a) + "]"
}
;function rd() {
  this.Vb = B()
}
new rd;
rd.prototype.set = t("Vb");
rd.prototype.reset = function() {
  this.set(B())
};
rd.prototype.get = aa("Vb");
function sd(a, b, c, d, f) {
  (new id).debug("TestLoadImageWithRetries: " + f);
  if(0 == d) {
    c(p)
  }else {
    var g = f || 0;
    d--;
    td(a, b, function(f) {
      f ? c(k) : v.setTimeout(function() {
        sd(a, b, c, d, g)
      }, g)
    })
  }
}
function td(a, b, c) {
  var d = new id;
  d.debug("TestLoadImage: loading " + a);
  var f = new Image, g = l;
  createHandler = function(a, b) {
    return function() {
      try {
        d.debug("TestLoadImage: " + b), f.onload = l, f.onerror = l, f.onabort = l, f.ontimeout = l, v.clearTimeout(g), c(a)
      }catch(m) {
        zc(d, m)
      }
    }
  };
  f.onload = createHandler(k, "loaded");
  f.onerror = createHandler(p, "error");
  f.onabort = createHandler(p, "abort");
  f.ontimeout = createHandler(p, "timeout");
  g = v.setTimeout(function() {
    if(f.ontimeout) {
      f.ontimeout()
    }
  }, b);
  f.src = a
}
;function ud(a, b) {
  this.b = a;
  this.a = b;
  this.O = new kd(l, k)
}
u = ud.prototype;
u.u = l;
u.w = l;
u.Ta = p;
u.ac = l;
u.Ja = l;
u.lb = l;
u.G = l;
u.c = l;
u.h = -1;
u.M = l;
u.bb = l;
u.W = t("u");
u.Zb = t("O");
u.fb = function(a) {
  this.G = a;
  a = vd(this.b, this.G);
  V(wd);
  rb(a, "MODE", "init");
  this.w = new T(this, this.a, h, h, h);
  this.w.W(this.u);
  ic(this.w, a, p, l, k);
  this.c = 0;
  this.ac = B()
};
u.hc = function(a) {
  if(a) {
    this.c = 2, xd(this)
  }else {
    V(yd);
    var b = this.b;
    b.a.debug("Test Connection Blocked");
    b.h = b.T.h;
    Z(b, 9)
  }
  a && this.F(qc)
};
function xd(a) {
  a.a.debug("TestConnection: starting stage 2");
  a.w = new T(a, a.a, h, h, h);
  a.w.W(a.u);
  var b = zd(a.b, a.M, a.G);
  V(Ad);
  if(fc()) {
    rb(b, "TYPE", "xmlhttp"), ic(a.w, b, p, a.M, p)
  }else {
    rb(b, "TYPE", "html");
    var c = a.w;
    a = Boolean(a.M);
    c.qa = 3;
    c.S = L(b.n());
    Ec(c, a)
  }
}
u.Ga = function(a) {
  return this.b.Ga(a)
};
u.abort = function() {
  this.w && (this.w.cancel(), this.w = l);
  this.h = -1
};
u.Hb = ba(p);
u.Pb = function(a, b) {
  this.h = a.h;
  if(0 == this.c) {
    if(this.a.debug("TestConnection: Got data for stage 1"), b) {
      try {
        var c = this.O.parse(b)
      }catch(d) {
        zc(this.a, d);
        Bd(this.b, this);
        return
      }
      this.M = this.b.correctHostPrefix(c[0]);
      this.bb = c[1]
    }else {
      this.a.debug("TestConnection: Null responseText"), Bd(this.b, this)
    }
  }else {
    if(2 == this.c) {
      if(this.Ta) {
        V(Cd), this.lb = B()
      }else {
        if("11111" == b) {
          if(V(Dd), this.Ta = k, this.Ja = B(), c = this.Ja - this.ac, fc() || 500 > c) {
            this.h = 200, this.w.cancel(), this.a.debug("Test connection succeeded; using streaming connection"), V(Ed), Fd(this.b, this, k)
          }
        }else {
          V(Gd), this.Ja = this.lb = B(), this.Ta = p
        }
      }
    }
  }
};
u.ja = function() {
  this.h = this.w.h;
  if(this.w.I) {
    if(0 == this.c) {
      if(this.a.debug("TestConnection: request complete for initial check"), this.bb) {
        this.c = 1;
        var a = Hd(this.b, this.bb, "/mail/images/cleardot.gif");
        L(a);
        sd(a.toString(), 5E3, A(this.hc, this), 3, 2E3);
        this.F(kc)
      }else {
        this.c = 2, xd(this)
      }
    }else {
      2 == this.c && (this.a.debug("TestConnection: request complete for stage 2"), a = p, (a = fc() ? this.Ta : 200 > this.lb - this.Ja ? p : k) ? (this.a.debug("Test connection succeeded; using streaming connection"), V(Ed), Fd(this.b, this, k)) : (this.a.debug("Test connection failed; not using streaming"), V(Id), Fd(this.b, this, p)))
    }
  }else {
    this.a.debug("TestConnection: request failed, in state " + this.c), 0 == this.c ? V(Jd) : 2 == this.c && V(Kd), Bd(this.b, this)
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
function Ld(a) {
  this.vb = a || l;
  this.c = Md;
  this.s = [];
  this.P = [];
  this.a = new id;
  this.O = new kd(l, k)
}
function Nd(a, b) {
  this.Lb = a;
  this.map = b;
  this.Fc = l
}
u = Ld.prototype;
u.u = l;
u.ua = l;
u.o = l;
u.k = l;
u.G = l;
u.Ka = l;
u.ub = l;
u.M = l;
u.ec = k;
u.ya = 0;
u.qc = 0;
u.Ia = p;
u.e = l;
u.D = l;
u.K = l;
u.$ = l;
u.T = l;
u.qb = l;
u.dc = k;
u.va = -1;
u.Kb = -1;
u.h = -1;
u.U = 0;
u.da = 0;
u.fc = 5E3;
u.Bc = 1E4;
u.ib = 2;
u.Db = 2E4;
u.la = 0;
u.pb = p;
u.ea = 8;
var Md = 1, Od = new Sb;
function Pd(a, b) {
  P.call(this, "statevent", a);
  this.Pc = b
}
C(Pd, P);
function Qd(a, b, c, d) {
  P.call(this, "timingevent", a);
  this.size = b;
  this.Nc = c;
  this.Mc = d
}
C(Qd, P);
var kc = 1, qc = 2, pc = 3, Hc = 4;
function Rd(a, b) {
  P.call(this, "serverreachability", a);
  this.Lc = b
}
C(Rd, P);
var wd = 3, yd = 4, Ad = 5, Dd = 6, Cd = 7, Gd = 8, Jd = 9, Kd = 10, Id = 11, Ed = 12, wc = 13, xc = 14, Bc = 15, Cc = 16, Dc = 17, Jc = 18, Fc = 22, jd = "y2f%";
u = Ld.prototype;
u.fb = function(a, b, c, d, f) {
  this.a.debug("connect()");
  V(0);
  this.G = b;
  this.ua = c || {};
  d && f !== h && (this.ua.OSID = d, this.ua.OAID = f);
  this.a.debug("connectTest_()");
  Sd(this) && (this.T = new ud(this, this.a), this.T.W(this.u), this.T.Zb(this.O), this.T.fb(a))
};
u.disconnect = function() {
  this.a.debug("disconnect()");
  Td(this);
  if(3 == this.c) {
    var a = this.ya++, b = this.Ka.n();
    K(b, "SID", this.X);
    K(b, "RID", a);
    K(b, "TYPE", "terminate");
    Ud(this, b);
    a = new T(this, this.a, this.X, a, h);
    a.qa = 2;
    a.S = L(b.n());
    b = new Image;
    b.src = a.S;
    b.onload = b.onerror = A(a.lc, a);
    a.na = B();
    jc(a)
  }
  Vd(this)
};
function Td(a) {
  a.T && (a.T.abort(), a.T = l);
  a.k && (a.k.cancel(), a.k = l);
  a.K && (v.clearTimeout(a.K), a.K = l);
  Wd(a);
  a.o && (a.o.cancel(), a.o = l);
  a.D && (v.clearTimeout(a.D), a.D = l)
}
u.W = t("u");
u.$b = t("la");
u.Hb = function() {
  return 0 == this.c
};
u.Zb = t("O");
function Xd(a) {
  !a.o && !a.D && (a.D = W(A(a.Rb, a), 0), a.U = 0)
}
u.Rb = function(a) {
  this.D = l;
  this.a.debug("startForwardChannel_");
  if(Sd(this)) {
    if(this.c == Md) {
      if(a) {
        this.a.H("Not supposed to retry the open")
      }else {
        this.a.debug("open_()");
        this.ya = Math.floor(1E5 * Math.random());
        a = this.ya++;
        var b = new T(this, this.a, "", a, h);
        b.W(this.u);
        var c = Yd(this), d = this.Ka.n();
        K(d, "RID", a);
        this.vb && K(d, "CVER", this.vb);
        Ud(this, d);
        gc(b, d, c);
        this.o = b;
        this.c = 2
      }
    }else {
      3 == this.c && (a ? Zd(this, a) : 0 == this.s.length ? this.a.debug("startForwardChannel_ returned: nothing to send") : this.o ? this.a.H("startForwardChannel_ returned: connection already in progress") : (Zd(this), this.a.debug("startForwardChannel_ finished, sent request")))
    }
  }
};
function Zd(a, b) {
  var c, d;
  b ? 6 < a.ea ? (a.s = a.P.concat(a.s), a.P.length = 0, c = a.ya - 1, d = Yd(a)) : (c = b.z, d = b.V) : (c = a.ya++, d = Yd(a));
  var f = a.Ka.n();
  K(f, "SID", a.X);
  K(f, "RID", c);
  K(f, "AID", a.va);
  Ud(a, f);
  c = new T(a, a.a, a.X, c, a.U + 1);
  c.W(a.u);
  c.setTimeout(Math.round(0.5 * a.Db) + Math.round(0.5 * a.Db * Math.random()));
  a.o = c;
  gc(c, f, d)
}
function Ud(a, b) {
  if(a.e) {
    var c = a.e.getAdditionalParams(a);
    c && bb(c, function(a, c) {
      K(b, c, a)
    })
  }
}
function Yd(a) {
  var b = Math.min(a.s.length, 1E3), c = ["count=" + b], d;
  6 < a.ea && 0 < b ? (d = a.s[0].Lb, c.push("ofs=" + d)) : d = 0;
  for(var f = 0;f < b;f++) {
    var g = a.s[f].Lb, j = a.s[f].map, g = 6 >= a.ea ? f : g - d;
    try {
      bb(j, function(a, b) {
        c.push("req" + g + "_" + b + "=" + encodeURIComponent(a))
      })
    }catch(n) {
      c.push("req" + g + "_type=" + encodeURIComponent("_badmap")), a.e && a.e.badMapError(a, j)
    }
  }
  a.P = a.P.concat(a.s.splice(0, b));
  return c.join("&")
}
function $d(a) {
  !a.k && !a.K && (a.tb = 1, a.K = W(A(a.Qb, a), 0), a.da = 0)
}
function ae(a) {
  if(a.k || a.K) {
    return a.a.H("Request already in progress"), p
  }
  if(3 <= a.da) {
    return p
  }
  a.a.debug("Going to retry GET");
  a.tb++;
  a.K = W(A(a.Qb, a), be(a, a.da));
  a.da++;
  return k
}
u.Qb = function() {
  this.K = l;
  if(Sd(this)) {
    this.a.debug("Creating new HttpRequest");
    this.k = new T(this, this.a, this.X, "rpc", this.tb);
    this.k.W(this.u);
    this.k.$b(this.la);
    var a = this.ub.n();
    K(a, "RID", "rpc");
    K(a, "SID", this.X);
    K(a, "CI", this.qb ? "0" : "1");
    K(a, "AID", this.va);
    Ud(this, a);
    if(fc()) {
      K(a, "TYPE", "xmlhttp"), ic(this.k, a, k, this.M, p)
    }else {
      K(a, "TYPE", "html");
      var b = this.k, c = Boolean(this.M);
      b.qa = 3;
      b.S = L(a.n());
      Ec(b, c)
    }
    this.a.debug("New Request created")
  }
};
function Sd(a) {
  if(a.e) {
    var b = a.e.okToMakeRequest(a);
    if(0 != b) {
      return a.a.debug("Handler returned error code from okToMakeRequest"), Z(a, b), p
    }
  }
  return k
}
function Fd(a, b, c) {
  a.a.debug("Test Connection Finished");
  a.qb = a.dc && c;
  a.h = b.h;
  a.a.debug("connectChannel_()");
  a.jc(Md, 0);
  a.Ka = vd(a, a.G);
  Xd(a)
}
function Bd(a, b) {
  a.a.debug("Test Connection Failed");
  a.h = b.h;
  Z(a, 2)
}
u.Pb = function(a, b) {
  if(!(0 == this.c || this.k != a && this.o != a)) {
    if(this.h = a.h, this.o == a && 3 == this.c) {
      if(7 < this.ea) {
        var c;
        try {
          c = this.O.parse(b)
        }catch(d) {
          c = l
        }
        if(w(c) && 3 == c.length) {
          var f = c;
          if(0 == f[0]) {
            a: {
              if(this.a.debug("Server claims our backchannel is missing."), this.K) {
                this.a.debug("But we are currently starting the request.")
              }else {
                if(this.k) {
                  if(this.k.na + 3E3 < this.o.na) {
                    Wd(this), this.k.cancel(), this.k = l
                  }else {
                    break a
                  }
                }else {
                  this.a.Y("We do not have a BackChannel established")
                }
                ae(this);
                V(19)
              }
            }
          }else {
            this.Kb = f[1], c = this.Kb - this.va, 0 < c && (f = f[2], this.a.debug(f + " bytes (in " + c + " arrays) are outstanding on the BackChannel"), 37500 > f && (this.qb && 0 == this.da) && !this.$ && (this.$ = W(A(this.rc, this), 6E3)))
          }
        }else {
          this.a.debug("Bad POST response data returned"), Z(this, 11)
        }
      }else {
        b != jd && (this.a.debug("Bad data returned - missing/invald magic cookie"), Z(this, 11))
      }
    }else {
      if(this.k == a && Wd(this), !/^[\s\xa0]*$/.test(b)) {
        c = this.O.parse(b);
        for(var f = this.e && this.e.channelHandleMultipleArrays ? [] : l, g = 0;g < c.length;g++) {
          var j = c[g];
          this.va = j[0];
          j = j[1];
          2 == this.c ? "c" == j[0] ? (this.X = j[1], this.M = this.correctHostPrefix(j[2]), j = j[3], this.ea = j != l ? j : 6, this.c = 3, this.e && this.e.channelOpened(this), this.ub = zd(this, this.M, this.G), $d(this)) : "stop" == j[0] && Z(this, 7) : 3 == this.c && ("stop" == j[0] ? (f && f.length && (this.e.channelHandleMultipleArrays(this, f), f.length = 0), Z(this, 7)) : "noop" != j[0] && (f ? f.push(j) : this.e && this.e.channelHandleArray(this, j)), this.da = 0)
        }
        f && f.length && this.e.channelHandleMultipleArrays(this, f)
      }
    }
  }
};
u.correctHostPrefix = function(a) {
  return this.ec ? this.e ? this.e.correctHostPrefix(a) : a : l
};
u.rc = function() {
  this.$ != l && (this.$ = l, this.k.cancel(), this.k = l, ae(this), V(20))
};
function Wd(a) {
  a.$ != l && (v.clearTimeout(a.$), a.$ = l)
}
u.ja = function(a) {
  this.a.debug("Request complete");
  var b;
  if(this.k == a) {
    Wd(this), this.k = l, b = 2
  }else {
    if(this.o == a) {
      this.o = l, b = 1
    }else {
      return
    }
  }
  this.h = a.h;
  if(0 != this.c) {
    if(a.I) {
      1 == b ? (b = B() - a.na, Od.dispatchEvent(new Qd(Od, a.V ? a.V.length : 0, b, this.U)), Xd(this), this.P.length = 0) : $d(this)
    }else {
      var c = a.Eb();
      if(3 == c || 7 == c || 0 == c && 0 < this.h) {
        this.a.debug("Not retrying due to error type")
      }else {
        this.a.debug("Maybe retrying, last error: " + cc(c, this.h));
        var d;
        if(d = 1 == b) {
          this.o || this.D ? (this.a.H("Request already in progress"), d = p) : this.c == Md || this.U >= (this.Ia ? 0 : this.ib) ? d = p : (this.a.debug("Going to retry POST"), this.D = W(A(this.Rb, this, a), be(this, this.U)), this.U++, d = k)
        }
        if(d || 2 == b && ae(this)) {
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
function be(a, b) {
  var c = a.fc + Math.floor(Math.random() * a.Bc);
  a.isActive() || (a.a.debug("Inactive channel"), c *= 2);
  return c * b
}
u.jc = function(a) {
  0 <= Xa(arguments, this.c) || e(Error("Unexpected channel state: " + this.c))
};
function Z(a, b) {
  a.a.info("Error code " + b);
  if(2 == b || 9 == b) {
    var c = l;
    a.e && (c = a.e.getNetworkTestImageUri(a));
    var d = A(a.Dc, a);
    c || (c = new I("//www.google.com/images/cleardot.gif"), L(c));
    td(c.toString(), 1E4, d)
  }else {
    V(2)
  }
  ce(a, b)
}
u.Dc = function(a) {
  a ? (this.a.info("Successfully pinged google.com"), V(2)) : (this.a.info("Failed to ping google.com"), V(1), ce(this, 8))
};
function ce(a, b) {
  a.a.debug("HttpChannel: error - " + b);
  a.c = 0;
  a.e && a.e.channelError(a, b);
  Vd(a);
  Td(a)
}
function Vd(a) {
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
function vd(a, b) {
  var c = Hd(a, l, b);
  a.a.debug("GetForwardChannelUri: " + c);
  return c
}
function zd(a, b, c) {
  b = Hd(a, a.Xa() ? b : l, c);
  a.a.debug("GetBackChannelUri: " + b);
  return b
}
function Hd(a, b, c) {
  var d;
  d = c instanceof I ? c.n() : new I(c, h);
  if("" != d.ga) {
    b && gb(d, b + "." + d.ga), hb(d, d.za)
  }else {
    var f = window.location, g = f.protocol;
    b = b ? b + "." + f.hostname : f.hostname;
    var f = f.port, j = new I(l, h);
    g && fb(j, g);
    b && gb(j, b);
    f && hb(j, f);
    c && ib(j, c);
    d = j
  }
  a.ua && bb(a.ua, function(a, b) {
    K(d, b, a)
  });
  K(d, "VER", a.ea);
  Ud(a, d);
  return d
}
u.Ga = function(a) {
  a && !this.pb && e(Error("Can't create secondary domain capable XhrIo object."));
  a = new ld;
  a.sb = this.pb;
  return a
};
u.isActive = function() {
  return!!this.e && this.e.isActive(this)
};
function W(a, b) {
  ha(a) || e(Error("Fn must not be null and must be a function"));
  return v.setTimeout(function() {
    a()
  }, b)
}
u.F = function(a) {
  Od.dispatchEvent(new Rd(Od, a))
};
function V(a) {
  Od.dispatchEvent(new Pd(Od, a))
}
u.Xa = function() {
  return this.pb || !fc()
};
function de() {
}
u = de.prototype;
u.channelHandleMultipleArrays = l;
u.okToMakeRequest = ba(0);
u.channelOpened = r();
u.channelHandleArray = r();
u.channelError = r();
u.channelClosed = r();
u.getAdditionalParams = function() {
  return{}
};
u.getNetworkTestImageUri = ba(l);
u.isActive = ba(k);
u.badMapError = r();
u.correctHostPrefix = function(a) {
  return a
};
var $, ee;
ee = {"0":"Ok", 4:"User is logging out", 6:"Unknown session ID", 7:"Stopped by server", 8:"General network error", 2:"Request failed", 9:"Blocked by a network administrator", 5:"No data from server", 10:"Got bad data from the server", 11:"Got a bad response from the server"};
$ = function(a, b) {
  var c, d, f, g, j, n, m, q, s;
  m = this;
  a || (a = "channel");
  a.match(/:\/\//) && a.replace(/^ws/, "http");
  b || (b = {});
  if(w(b || "string" === typeof b)) {
    b = {}
  }
  j = b.reconnectTime || 3E3;
  s = function(a) {
    m.readyState = m.readyState = a
  };
  s(this.CLOSED);
  q = l;
  f = b.Kc;
  c = new de;
  c.channelOpened = function() {
    f = q;
    s($.OPEN);
    return"function" === typeof m.onopen ? m.onopen() : h
  };
  d = l;
  c.channelError = function(a, b) {
    var c;
    c = ee[b];
    d = b;
    s($.ab);
    return"function" === typeof m.onerror ? m.onerror(c, b) : h
  };
  n = l;
  c.channelClosed = function(a, c, f) {
    if(m.readyState !== $.CLOSED) {
      q = l;
      a = d ? ee[d] : "Closed";
      s($.CLOSED);
      try {
        if("function" === typeof m.onclose) {
          m.onclose(a, c, f)
        }
      }catch(he) {
        "undefined" !== typeof console && console !== l && console.error(he.stack)
      }
      b.reconnect && (7 !== d && 0 !== d) && (c = 6 === d ? 0 : j, clearTimeout(n), n = setTimeout(g, c));
      return d = l
    }
  };
  c.channelHandleArray = function(a, b) {
    try {
      return"function" === typeof m.onmessage ? m.onmessage(b) : h
    }catch(c) {
      "undefined" !== typeof console && console !== l && console.error(c.stack), e(c)
    }
  };
  g = function() {
    q && e(Error("Reconnect() called from invalid state"));
    s($.CONNECTING);
    if("function" === typeof m.onconnecting) {
      m.onconnecting()
    }
    clearTimeout(n);
    q = new Ld(b.appVersion);
    q.e = c;
    d = l;
    if(b.failFast) {
      var g = q;
      g.Ia = k;
      g.a.info("setFailFast: true");
      if((g.o || g.D) && g.U > (g.Ia ? 0 : g.ib)) {
        g.a.info("Retry count " + g.U + " > new maxRetries " + (g.Ia ? 0 : g.ib) + ". Fail immediately!"), g.o ? (g.o.cancel(), g.ja(g.o)) : (v.clearTimeout(g.D), g.D = l, Z(g, 2))
      }
    }
    return q.fb("" + a + "/test", "" + a + "/bind", l, f != l ? f.X : h, f != l ? f.va : h)
  };
  this.open = function() {
    m.readyState !== m.CLOSED && e(Error("Already open"));
    return g()
  };
  this.close = function() {
    clearTimeout(n);
    d = 0;
    if(m.readyState !== $.CLOSED) {
      return s($.ab), q.disconnect()
    }
  };
  this.sendMap = function(a) {
    var b;
    ((b = m.readyState) === $.ab || b === $.CLOSED) && e(Error("Cannot send to a closed connection"));
    b = q;
    0 == b.c && e(Error("Invalid operation: sending map when state is closed"));
    1E3 == b.s.length && b.a.H("Already have 1000 queued maps upon queueing " + Mc(a));
    b.s.push(new Nd(b.qc++, a));
    (2 == b.c || 3 == b.c) && Xd(b)
  };
  this.send = function(a) {
    return this.sendMap({JSON:Mc(a)})
  };
  g();
  return this
};
$.prototype.CONNECTING = $.CONNECTING = $.CONNECTING = 0;
$.prototype.OPEN = $.OPEN = $.OPEN = 1;
$.prototype.CLOSING = $.CLOSING = $.ab = 2;
$.prototype.CLOSED = $.CLOSED = $.CLOSED = 3;
("undefined" !== typeof exports && exports !== l ? exports : window).BCSocket = $;
var Image, XMLHttpRequest, fe, ge, window;
fe = require("request");
Image = function() {
  var a = this;
  this.__defineSetter__("src", function(b) {
    b = b.toString();
    b.match(/^\/\//) && (b = "http:" + b);
    return fe(b, function(b) {
      return b != l ? "function" === typeof a.onerror ? a.onerror() : h : "function" === typeof a.onload ? a.onload() : h
    })
  });
  return this
};
XMLHttpRequest = require("../XMLHttpRequest").XMLHttpRequest;
Ld.prototype.Ga = function() {
  var a;
  a = new ld;
  a.wb = function() {
    return new XMLHttpRequest
  };
  a.sb = k;
  return a
};
v = window = {setTimeout:setTimeout, clearTimeout:clearTimeout, setInterval:setInterval, clearInterval:clearInterval, location:l, navigator:{userAgent:"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_2) AppleWebKit/535.1 (KHTML, like Gecko) Chrome/14.0.835.202 Safari/535.1"}};
ge = require("url");
exports.setDefaultLocation = function(a) {
  "string" === typeof a && (a = ge.parse(a));
  return window.location = a
};

})();
