(function(){
var f, aa = aa || {}, l = this;
function ba(a) {
  a = a.split(".");
  for (var b = l, c;c = a.shift();) {
    if (null != b[c]) {
      b = b[c];
    } else {
      return null;
    }
  }
  return b;
}
function ca() {
}
function da(a) {
  var b = typeof a;
  if ("object" == b) {
    if (a) {
      if (a instanceof Array) {
        return "array";
      }
      if (a instanceof Object) {
        return b;
      }
      var c = Object.prototype.toString.call(a);
      if ("[object Window]" == c) {
        return "object";
      }
      if ("[object Array]" == c || "number" == typeof a.length && "undefined" != typeof a.splice && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("splice")) {
        return "array";
      }
      if ("[object Function]" == c || "undefined" != typeof a.call && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("call")) {
        return "function";
      }
    } else {
      return "null";
    }
  } else {
    if ("function" == b && "undefined" == typeof a.call) {
      return "object";
    }
  }
  return b;
}
function m(a) {
  return "array" == da(a);
}
function ea(a) {
  var b = da(a);
  return "array" == b || "object" == b && "number" == typeof a.length;
}
function n(a) {
  return "string" == typeof a;
}
function fa(a) {
  return "function" == da(a);
}
var ga = "closure_uid_" + (1E9 * Math.random() >>> 0), ha = 0;
function ia(a, b, c) {
  return a.call.apply(a.bind, arguments);
}
function ja(a, b, c) {
  if (!a) {
    throw Error();
  }
  if (2 < arguments.length) {
    var d = Array.prototype.slice.call(arguments, 2);
    return function() {
      var c = Array.prototype.slice.call(arguments);
      Array.prototype.unshift.apply(c, d);
      return a.apply(b, c);
    };
  }
  return function() {
    return a.apply(b, arguments);
  };
}
function p(a, b, c) {
  p = Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? ia : ja;
  return p.apply(null, arguments);
}
var q = Date.now || function() {
  return+new Date;
};
function s(a, b) {
  function c() {
  }
  c.prototype = b.prototype;
  a.pa = b.prototype;
  a.prototype = new c;
  a.Ic = function(a, c, g) {
    var h = Array.prototype.slice.call(arguments, 2);
    return b.prototype[c].apply(a, h);
  };
}
;function ka(a, b) {
  for (var c = a.split("%s"), d = "", e = Array.prototype.slice.call(arguments, 1);e.length && 1 < c.length;) {
    d += c.shift() + e.shift();
  }
  return d + c.join("%s");
}
function la(a) {
  if (!ma.test(a)) {
    return a;
  }
  -1 != a.indexOf("&") && (a = a.replace(na, "&amp;"));
  -1 != a.indexOf("<") && (a = a.replace(oa, "&lt;"));
  -1 != a.indexOf(">") && (a = a.replace(pa, "&gt;"));
  -1 != a.indexOf('"') && (a = a.replace(qa, "&quot;"));
  -1 != a.indexOf("'") && (a = a.replace(ra, "&#39;"));
  return a;
}
var na = /&/g, oa = /</g, pa = />/g, qa = /"/g, ra = /'/g, ma = /[&<>"']/;
function sa() {
  return Math.floor(2147483648 * Math.random()).toString(36) + Math.abs(Math.floor(2147483648 * Math.random()) ^ q()).toString(36);
}
function ta(a, b) {
  return a < b ? -1 : a > b ? 1 : 0;
}
;var x, ua, va, wa;
function xa() {
  return l.navigator ? l.navigator.userAgent : null;
}
wa = va = ua = x = !1;
var ya;
if (ya = xa()) {
  var za = l.navigator;
  x = 0 == ya.lastIndexOf("Opera", 0);
  ua = !x && (-1 != ya.indexOf("MSIE") || -1 != ya.indexOf("Trident"));
  va = !x && -1 != ya.indexOf("WebKit");
  wa = !x && !va && !ua && "Gecko" == za.product;
}
var Aa = x, y = ua, Ba = wa, z = va;
function Ca() {
  var a = l.document;
  return a ? a.documentMode : void 0;
}
var Da;
a: {
  var Ea = "", Fa;
  if (Aa && l.opera) {
    var Ga = l.opera.version, Ea = "function" == typeof Ga ? Ga() : Ga
  } else {
    if (Ba ? Fa = /rv\:([^\);]+)(\)|;)/ : y ? Fa = /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/ : z && (Fa = /WebKit\/(\S+)/), Fa) {
      var Ha = Fa.exec(xa()), Ea = Ha ? Ha[1] : ""
    }
  }
  if (y) {
    var Ia = Ca();
    if (Ia > parseFloat(Ea)) {
      Da = String(Ia);
      break a;
    }
  }
  Da = Ea;
}
var Ja = {};
function A(a) {
  var b;
  if (!(b = Ja[a])) {
    b = 0;
    for (var c = String(Da).replace(/^[\s\xa0]+|[\s\xa0]+$/g, "").split("."), d = String(a).replace(/^[\s\xa0]+|[\s\xa0]+$/g, "").split("."), e = Math.max(c.length, d.length), g = 0;0 == b && g < e;g++) {
      var h = c[g] || "", k = d[g] || "", u = RegExp("(\\d*)(\\D*)", "g"), K = RegExp("(\\d*)(\\D*)", "g");
      do {
        var v = u.exec(h) || ["", "", ""], r = K.exec(k) || ["", "", ""];
        if (0 == v[0].length && 0 == r[0].length) {
          break;
        }
        b = ta(0 == v[1].length ? 0 : parseInt(v[1], 10), 0 == r[1].length ? 0 : parseInt(r[1], 10)) || ta(0 == v[2].length, 0 == r[2].length) || ta(v[2], r[2]);
      } while (0 == b);
    }
    b = Ja[a] = 0 <= b;
  }
  return b;
}
var Ka = l.document, Ma = Ka && y ? Ca() || ("CSS1Compat" == Ka.compatMode ? parseInt(Da, 10) : 5) : void 0;
function Na(a) {
  Error.captureStackTrace ? Error.captureStackTrace(this, Na) : this.stack = Error().stack || "";
  a && (this.message = String(a));
}
s(Na, Error);
Na.prototype.name = "CustomError";
function Oa(a, b) {
  b.unshift(a);
  Na.call(this, ka.apply(null, b));
  b.shift();
}
s(Oa, Na);
Oa.prototype.name = "AssertionError";
function Pa(a, b) {
  throw new Oa("Failure" + (a ? ": " + a : ""), Array.prototype.slice.call(arguments, 1));
}
;var Qa = RegExp("^(?:([^:/?#.]+):)?(?://(?:([^/?#]*)@)?([^/#?]*?)(?::([0-9]+))?(?=[/#?]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#(.*))?$");
function Ra(a) {
  if (Sa) {
    Sa = !1;
    var b = l.location;
    if (b) {
      var c = b.href;
      if (c && (c = (c = Ra(c)[3] || null) && decodeURIComponent(c)) && c != b.hostname) {
        throw Sa = !0, Error();
      }
    }
  }
  return a.match(Qa);
}
var Sa = z;
function Ta(a) {
  var b = [], c = 0, d;
  for (d in a) {
    b[c++] = a[d];
  }
  return b;
}
function Ua(a) {
  var b = [], c = 0, d;
  for (d in a) {
    b[c++] = d;
  }
  return b;
}
var Va = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");
function Wa(a, b) {
  for (var c, d, e = 1;e < arguments.length;e++) {
    d = arguments[e];
    for (c in d) {
      a[c] = d[c];
    }
    for (var g = 0;g < Va.length;g++) {
      c = Va[g], Object.prototype.hasOwnProperty.call(d, c) && (a[c] = d[c]);
    }
  }
}
;var B = Array.prototype, Xa = B.indexOf ? function(a, b, c) {
  return B.indexOf.call(a, b, c);
} : function(a, b, c) {
  c = null == c ? 0 : 0 > c ? Math.max(0, a.length + c) : c;
  if (n(a)) {
    return n(b) && 1 == b.length ? a.indexOf(b, c) : -1;
  }
  for (;c < a.length;c++) {
    if (c in a && a[c] === b) {
      return c;
    }
  }
  return-1;
}, Ya = B.forEach ? function(a, b, c) {
  B.forEach.call(a, b, c);
} : function(a, b, c) {
  for (var d = a.length, e = n(a) ? a.split("") : a, g = 0;g < d;g++) {
    g in e && b.call(c, e[g], g, a);
  }
};
function Za(a) {
  var b;
  a: {
    b = $a;
    for (var c = a.length, d = n(a) ? a.split("") : a, e = 0;e < c;e++) {
      if (e in d && b.call(void 0, d[e], e, a)) {
        b = e;
        break a;
      }
    }
    b = -1;
  }
  return 0 > b ? null : n(a) ? a.charAt(b) : a[b];
}
function ab(a) {
  return B.concat.apply(B, arguments);
}
function bb(a) {
  var b = a.length;
  if (0 < b) {
    for (var c = Array(b), d = 0;d < b;d++) {
      c[d] = a[d];
    }
    return c;
  }
  return[];
}
;function cb(a, b) {
  this.O = {};
  this.j = [];
  this.o = 0;
  var c = arguments.length;
  if (1 < c) {
    if (c % 2) {
      throw Error("Uneven number of arguments");
    }
    for (var d = 0;d < c;d += 2) {
      this.set(arguments[d], arguments[d + 1]);
    }
  } else {
    if (a) {
      a instanceof cb ? (c = a.ca(), d = a.N()) : (c = Ua(a), d = Ta(a));
      for (var e = 0;e < c.length;e++) {
        this.set(c[e], d[e]);
      }
    }
  }
}
f = cb.prototype;
f.N = function() {
  db(this);
  for (var a = [], b = 0;b < this.j.length;b++) {
    a.push(this.O[this.j[b]]);
  }
  return a;
};
f.ca = function() {
  db(this);
  return this.j.concat();
};
f.wa = function(a) {
  return C(this.O, a);
};
f.remove = function(a) {
  return C(this.O, a) ? (delete this.O[a], this.o--, this.j.length > 2 * this.o && db(this), !0) : !1;
};
function db(a) {
  if (a.o != a.j.length) {
    for (var b = 0, c = 0;b < a.j.length;) {
      var d = a.j[b];
      C(a.O, d) && (a.j[c++] = d);
      b++;
    }
    a.j.length = c;
  }
  if (a.o != a.j.length) {
    for (var e = {}, c = b = 0;b < a.j.length;) {
      d = a.j[b], C(e, d) || (a.j[c++] = d, e[d] = 1), b++;
    }
    a.j.length = c;
  }
}
f.get = function(a, b) {
  return C(this.O, a) ? this.O[a] : b;
};
f.set = function(a, b) {
  C(this.O, a) || (this.o++, this.j.push(a));
  this.O[a] = b;
};
f.n = function() {
  return new cb(this);
};
function C(a, b) {
  return Object.prototype.hasOwnProperty.call(a, b);
}
;function eb(a) {
  if ("function" == typeof a.N) {
    return a.N();
  }
  if (n(a)) {
    return a.split("");
  }
  if (ea(a)) {
    for (var b = [], c = a.length, d = 0;d < c;d++) {
      b.push(a[d]);
    }
    return b;
  }
  return Ta(a);
}
function D(a, b, c) {
  if ("function" == typeof a.forEach) {
    a.forEach(b, c);
  } else {
    if (ea(a) || n(a)) {
      Ya(a, b, c);
    } else {
      var d;
      if ("function" == typeof a.ca) {
        d = a.ca();
      } else {
        if ("function" != typeof a.N) {
          if (ea(a) || n(a)) {
            d = [];
            for (var e = a.length, g = 0;g < e;g++) {
              d.push(g);
            }
          } else {
            d = Ua(a);
          }
        } else {
          d = void 0;
        }
      }
      for (var e = eb(a), g = e.length, h = 0;h < g;h++) {
        b.call(c, e[h], d && d[h], a);
      }
    }
  }
}
;function E(a, b) {
  var c;
  if (a instanceof E) {
    this.D = void 0 !== b ? b : a.D, fb(this, a.oa), c = a.fb, F(this), this.fb = c, gb(this, a.ja), hb(this, a.Ca), ib(this, a.I), jb(this, a.R.n()), c = a.Oa, F(this), this.Oa = c;
  } else {
    if (a && (c = Ra(String(a)))) {
      this.D = !!b;
      fb(this, c[1] || "", !0);
      var d = c[2] || "";
      F(this);
      this.fb = d ? decodeURIComponent(d) : "";
      gb(this, c[3] || "", !0);
      hb(this, c[4]);
      ib(this, c[5] || "", !0);
      jb(this, c[6] || "", !0);
      c = c[7] || "";
      F(this);
      this.Oa = c ? decodeURIComponent(c) : "";
    } else {
      this.D = !!b, this.R = new kb(null, 0, this.D);
    }
  }
}
f = E.prototype;
f.oa = "";
f.fb = "";
f.ja = "";
f.Ca = null;
f.I = "";
f.Oa = "";
f.pc = !1;
f.D = !1;
f.toString = function() {
  var a = [], b = this.oa;
  b && a.push(lb(b, mb), ":");
  if (b = this.ja) {
    a.push("//");
    var c = this.fb;
    c && a.push(lb(c, mb), "@");
    a.push(encodeURIComponent(String(b)));
    b = this.Ca;
    null != b && a.push(":", String(b));
  }
  if (b = this.I) {
    this.ja && "/" != b.charAt(0) && a.push("/"), a.push(lb(b, "/" == b.charAt(0) ? nb : ob));
  }
  (b = this.R.toString()) && a.push("?", b);
  (b = this.Oa) && a.push("#", lb(b, pb));
  return a.join("");
};
f.n = function() {
  return new E(this);
};
function fb(a, b, c) {
  F(a);
  a.oa = c ? b ? decodeURIComponent(b) : "" : b;
  a.oa && (a.oa = a.oa.replace(/:$/, ""));
}
function gb(a, b, c) {
  F(a);
  a.ja = c ? b ? decodeURIComponent(b) : "" : b;
}
function hb(a, b) {
  F(a);
  if (b) {
    b = Number(b);
    if (isNaN(b) || 0 > b) {
      throw Error("Bad port number " + b);
    }
    a.Ca = b;
  } else {
    a.Ca = null;
  }
}
function ib(a, b, c) {
  F(a);
  a.I = c ? b ? decodeURIComponent(b) : "" : b;
}
function jb(a, b, c) {
  F(a);
  b instanceof kb ? (a.R = b, a.R.ub(a.D)) : (c || (b = lb(b, qb)), a.R = new kb(b, 0, a.D));
}
function G(a, b, c) {
  F(a);
  a.R.set(b, c);
}
function rb(a, b, c) {
  F(a);
  m(c) || (c = [String(c)]);
  sb(a.R, b, c);
}
function H(a) {
  F(a);
  G(a, "zx", sa());
  return a;
}
function F(a) {
  if (a.pc) {
    throw Error("Tried to modify a read-only Uri");
  }
}
f.ub = function(a) {
  this.D = a;
  this.R && this.R.ub(a);
  return this;
};
function tb(a) {
  return a instanceof E ? a.n() : new E(a, void 0);
}
function ub(a, b, c, d) {
  var e = new E(null, void 0);
  a && fb(e, a);
  b && gb(e, b);
  c && hb(e, c);
  d && ib(e, d);
  return e;
}
function lb(a, b) {
  return n(a) ? encodeURI(a).replace(b, vb) : null;
}
function vb(a) {
  a = a.charCodeAt(0);
  return "%" + (a >> 4 & 15).toString(16) + (a & 15).toString(16);
}
var mb = /[#\/\?@]/g, ob = /[\#\?:]/g, nb = /[\#\?]/g, qb = /[\#\?@]/g, pb = /#/g;
function kb(a, b, c) {
  this.C = a || null;
  this.D = !!c;
}
function I(a) {
  if (!a.h && (a.h = new cb, a.o = 0, a.C)) {
    for (var b = a.C.split("&"), c = 0;c < b.length;c++) {
      var d = b[c].indexOf("="), e = null, g = null;
      0 <= d ? (e = b[c].substring(0, d), g = b[c].substring(d + 1)) : e = b[c];
      e = decodeURIComponent(e.replace(/\+/g, " "));
      e = J(a, e);
      a.add(e, g ? decodeURIComponent(g.replace(/\+/g, " ")) : "");
    }
  }
}
f = kb.prototype;
f.h = null;
f.o = null;
f.add = function(a, b) {
  I(this);
  this.C = null;
  a = J(this, a);
  var c = this.h.get(a);
  c || this.h.set(a, c = []);
  c.push(b);
  this.o++;
  return this;
};
f.remove = function(a) {
  I(this);
  a = J(this, a);
  return this.h.wa(a) ? (this.C = null, this.o -= this.h.get(a).length, this.h.remove(a)) : !1;
};
f.wa = function(a) {
  I(this);
  a = J(this, a);
  return this.h.wa(a);
};
f.ca = function() {
  I(this);
  for (var a = this.h.N(), b = this.h.ca(), c = [], d = 0;d < b.length;d++) {
    for (var e = a[d], g = 0;g < e.length;g++) {
      c.push(b[d]);
    }
  }
  return c;
};
f.N = function(a) {
  I(this);
  var b = [];
  if (n(a)) {
    this.wa(a) && (b = ab(b, this.h.get(J(this, a))));
  } else {
    a = this.h.N();
    for (var c = 0;c < a.length;c++) {
      b = ab(b, a[c]);
    }
  }
  return b;
};
f.set = function(a, b) {
  I(this);
  this.C = null;
  a = J(this, a);
  this.wa(a) && (this.o -= this.h.get(a).length);
  this.h.set(a, [b]);
  this.o++;
  return this;
};
f.get = function(a, b) {
  var c = a ? this.N(a) : [];
  return 0 < c.length ? String(c[0]) : b;
};
function sb(a, b, c) {
  a.remove(b);
  0 < c.length && (a.C = null, a.h.set(J(a, b), bb(c)), a.o += c.length);
}
f.toString = function() {
  if (this.C) {
    return this.C;
  }
  if (!this.h) {
    return "";
  }
  for (var a = [], b = this.h.ca(), c = 0;c < b.length;c++) {
    for (var d = b[c], e = encodeURIComponent(String(d)), d = this.N(d), g = 0;g < d.length;g++) {
      var h = e;
      "" !== d[g] && (h += "=" + encodeURIComponent(String(d[g])));
      a.push(h);
    }
  }
  return this.C = a.join("&");
};
f.n = function() {
  var a = new kb;
  a.C = this.C;
  this.h && (a.h = this.h.n(), a.o = this.o);
  return a;
};
function J(a, b) {
  var c = String(b);
  a.D && (c = c.toLowerCase());
  return c;
}
f.ub = function(a) {
  a && !this.D && (I(this), this.C = null, D(this.h, function(a, c) {
    var d = c.toLowerCase();
    c != d && (this.remove(c), sb(this, d, a));
  }, this));
  this.D = a;
};
function wb(a) {
  a = String(a);
  if (/^\s*$/.test(a) ? 0 : /^[\],:{}\s\u2028\u2029]*$/.test(a.replace(/\\["\\\/bfnrtu]/g, "@").replace(/"[^"\\\n\r\u2028\u2029\x00-\x08\x0a-\x1f]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:[\s\u2028\u2029]*\[)+/g, ""))) {
    try {
      return eval("(" + a + ")");
    } catch (b) {
    }
  }
  throw Error("Invalid JSON string: " + a);
}
function xb(a) {
  return eval("(" + a + ")");
}
function yb(a) {
  var b = [];
  zb(new Ab, a, b);
  return b.join("");
}
function Ab() {
  this.Za = void 0;
}
function zb(a, b, c) {
  switch(typeof b) {
    case "string":
      Bb(b, c);
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
      if (null == b) {
        c.push("null");
        break;
      }
      if (m(b)) {
        var d = b.length;
        c.push("[");
        for (var e = "", g = 0;g < d;g++) {
          c.push(e), e = b[g], zb(a, a.Za ? a.Za.call(b, String(g), e) : e, c), e = ",";
        }
        c.push("]");
        break;
      }
      c.push("{");
      d = "";
      for (g in b) {
        Object.prototype.hasOwnProperty.call(b, g) && (e = b[g], "function" != typeof e && (c.push(d), Bb(g, c), c.push(":"), zb(a, a.Za ? a.Za.call(b, g, e) : e, c), d = ","));
      }
      c.push("}");
      break;
    case "function":
      break;
    default:
      throw Error("Unknown type: " + typeof b);;
  }
}
var Cb = {'"':'\\"', "\\":"\\\\", "/":"\\/", "\b":"\\b", "\f":"\\f", "\n":"\\n", "\r":"\\r", "\t":"\\t", "\x0B":"\\u000b"}, Db = /\uffff/.test("\uffff") ? /[\\\"\x00-\x1f\x7f-\uffff]/g : /[\\\"\x00-\x1f\x7f-\xff]/g;
function Bb(a, b) {
  b.push('"', a.replace(Db, function(a) {
    if (a in Cb) {
      return Cb[a];
    }
    var b = a.charCodeAt(0), e = "\\u";
    16 > b ? e += "000" : 256 > b ? e += "00" : 4096 > b && (e += "0");
    return Cb[a] = e + b.toString(16);
  }), '"');
}
;function Eb(a) {
  return Fb(a || arguments.callee.caller, []);
}
function Fb(a, b) {
  var c = [];
  if (0 <= Xa(b, a)) {
    c.push("[...circular reference...]");
  } else {
    if (a && 50 > b.length) {
      c.push(Gb(a) + "(");
      for (var d = a.arguments, e = 0;e < d.length;e++) {
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
            g = (g = Gb(g)) ? g : "[fn]";
            break;
          default:
            g = typeof g;
        }
        40 < g.length && (g = g.substr(0, 40) + "...");
        c.push(g);
      }
      b.push(a);
      c.push(")\n");
      try {
        c.push(Fb(a.caller, b));
      } catch (h) {
        c.push("[exception trying to get caller]\n");
      }
    } else {
      a ? c.push("[...long stack...]") : c.push("[end]");
    }
  }
  return c.join("");
}
function Gb(a) {
  if (Hb[a]) {
    return Hb[a];
  }
  a = String(a);
  if (!Hb[a]) {
    var b = /function ([^\(]+)/.exec(a);
    Hb[a] = b ? b[1] : "[Anonymous]";
  }
  return Hb[a];
}
var Hb = {};
function Ib(a, b, c, d, e) {
  this.reset(a, b, c, d, e);
}
Ib.prototype.Gb = null;
Ib.prototype.Fb = null;
var Jb = 0;
Ib.prototype.reset = function(a, b, c, d, e) {
  "number" == typeof e || Jb++;
  d || q();
  this.Aa = a;
  this.rc = b;
  delete this.Gb;
  delete this.Fb;
};
Ib.prototype.ac = function(a) {
  this.Aa = a;
};
function L(a) {
  this.sc = a;
}
L.prototype.Ta = null;
L.prototype.Aa = null;
L.prototype.kb = null;
L.prototype.Kb = null;
function Kb(a, b) {
  this.name = a;
  this.value = b;
}
Kb.prototype.toString = function() {
  return this.name;
};
var Lb = new Kb("SEVERE", 1E3), Mb = new Kb("WARNING", 900), Nb = new Kb("INFO", 800), Ob = new Kb("CONFIG", 700), Pb = new Kb("FINE", 500);
f = L.prototype;
f.getParent = function() {
  return this.Ta;
};
f.ac = function(a) {
  this.Aa = a;
};
function Qb(a) {
  if (a.Aa) {
    return a.Aa;
  }
  if (a.Ta) {
    return Qb(a.Ta);
  }
  Pa("Root logger has no level set.");
  return null;
}
f.log = function(a, b, c) {
  if (a.value >= Qb(this).value) {
    for (fa(b) && (b = b()), a = this.nc(a, b, c), b = "log:" + a.rc, l.console && (l.console.timeStamp ? l.console.timeStamp(b) : l.console.markTimeline && l.console.markTimeline(b)), l.msWriteProfilerMark && l.msWriteProfilerMark(b), b = this;b;) {
      c = b;
      var d = a;
      if (c.Kb) {
        for (var e = 0, g = void 0;g = c.Kb[e];e++) {
          g(d);
        }
      }
      b = b.getParent();
    }
  }
};
f.nc = function(a, b, c) {
  var d = new Ib(a, String(b), this.sc);
  if (c) {
    d.Gb = c;
    var e;
    var g = arguments.callee.caller;
    try {
      var h;
      var k = ba("window.location.href");
      if (n(c)) {
        h = {message:c, name:"Unknown error", lineNumber:"Not available", fileName:k, stack:"Not available"};
      } else {
        var u, K, v = !1;
        try {
          u = c.lineNumber || c.Jc || "Not available";
        } catch (r) {
          u = "Not available", v = !0;
        }
        try {
          K = c.fileName || c.filename || c.sourceURL || l.$googDebugFname || k;
        } catch (La) {
          K = "Not available", v = !0;
        }
        h = !v && c.lineNumber && c.fileName && c.stack && c.message && c.name ? c : {message:c.message || "Not available", name:c.name || "UnknownError", lineNumber:u, fileName:K, stack:c.stack || "Not available"};
      }
      e = "Message: " + la(h.message) + '\nUrl: <a href="view-source:' + h.fileName + '" target="_new">' + h.fileName + "</a>\nLine: " + h.lineNumber + "\n\nBrowser stack:\n" + la(h.stack + "-> ") + "[end]\n\nJS stack traversal:\n" + la(Eb(g) + "-> ");
    } catch (w) {
      e = "Exception trying to expose exception! You win, we lose. " + w;
    }
    d.Fb = e;
  }
  return d;
};
f.J = function(a, b) {
  this.log(Lb, a, b);
};
f.Z = function(a, b) {
  this.log(Mb, a, b);
};
f.info = function(a, b) {
  this.log(Nb, a, b);
};
var Rb = {}, Sb = null;
function Tb(a) {
  Sb || (Sb = new L(""), Rb[""] = Sb, Sb.ac(Ob));
  var b;
  if (!(b = Rb[a])) {
    b = new L(a);
    var c = a.lastIndexOf("."), d = a.substr(c + 1), c = Tb(a.substr(0, c));
    c.kb || (c.kb = {});
    c.kb[d] = b;
    b.Ta = c;
    Rb[a] = b;
  }
  return b;
}
;function M(a, b) {
  a && a.log(Pb, b, void 0);
}
;function N() {
  this.r = Tb("goog.net.BrowserChannel");
}
function Ub(a, b, c, d) {
  a.info("XMLHTTP TEXT (" + b + "): " + Vb(a, c) + (d ? " " + d : ""));
}
N.prototype.debug = function(a) {
  this.info(a);
};
function Wb(a, b, c) {
  a.J((c || "Exception") + b);
}
N.prototype.info = function(a) {
  var b = this.r;
  b && b.info(a, void 0);
};
N.prototype.Z = function(a) {
  var b = this.r;
  b && b.Z(a, void 0);
};
N.prototype.J = function(a) {
  var b = this.r;
  b && b.J(a, void 0);
};
function Vb(a, b) {
  if (!b || b == Xb) {
    return b;
  }
  try {
    var c = xb(b);
    if (c) {
      for (var d = 0;d < c.length;d++) {
        if (m(c[d])) {
          var e = c[d];
          if (!(2 > e.length)) {
            var g = e[1];
            if (m(g) && !(1 > g.length)) {
              var h = g[0];
              if ("noop" != h && "stop" != h) {
                for (var k = 1;k < g.length;k++) {
                  g[k] = "";
                }
              }
            }
          }
        }
      }
    }
    return yb(c);
  } catch (u) {
    return a.debug("Exception parsing expected JS array - probably was not JS"), b;
  }
}
;function Yb(a, b) {
  this.P = b ? xb : wb;
}
Yb.prototype.parse = function(a) {
  return this.P(a);
};
function O() {
  0 != Zb && ($b[this[ga] || (this[ga] = ++ha)] = this);
}
var Zb = 0, $b = {};
O.prototype.mb = !1;
O.prototype.Ka = function() {
  if (!this.mb && (this.mb = !0, this.u(), 0 != Zb)) {
    var a = this[ga] || (this[ga] = ++ha);
    delete $b[a];
  }
};
O.prototype.u = function() {
  if (this.Qb) {
    for (;this.Qb.length;) {
      this.Qb.shift()();
    }
  }
};
var ac = "closure_listenable_" + (1E6 * Math.random() | 0);
function bc(a) {
  try {
    return!(!a || !a[ac]);
  } catch (b) {
    return!1;
  }
}
var cc = 0;
function dc(a, b, c, d, e) {
  this.fa = a;
  this.Va = null;
  this.src = b;
  this.type = c;
  this.capture = !!d;
  this.Pa = e;
  this.key = ++cc;
  this.na = this.Ia = !1;
}
function ec(a) {
  a.na = !0;
  a.fa = null;
  a.Va = null;
  a.src = null;
  a.Pa = null;
}
;function P(a) {
  this.src = a;
  this.s = {};
  this.Ga = 0;
}
P.prototype.add = function(a, b, c, d, e) {
  var g = this.s[a];
  g || (g = this.s[a] = [], this.Ga++);
  var h = fc(g, b, d, e);
  -1 < h ? (a = g[h], c || (a.Ia = !1)) : (a = new dc(b, this.src, a, !!d, e), a.Ia = c, g.push(a));
  return a;
};
P.prototype.remove = function(a, b, c, d) {
  if (!(a in this.s)) {
    return!1;
  }
  var e = this.s[a];
  b = fc(e, b, c, d);
  return-1 < b ? (ec(e[b]), B.splice.call(e, b, 1), 0 == e.length && (delete this.s[a], this.Ga--), !0) : !1;
};
function gc(a, b) {
  var c = b.type;
  if (!(c in a.s)) {
    return!1;
  }
  var d = a.s[c], e = Xa(d, b), g;
  (g = 0 <= e) && B.splice.call(d, e, 1);
  g && (ec(b), 0 == a.s[c].length && (delete a.s[c], a.Ga--));
  return g;
}
P.prototype.Ya = function(a) {
  var b = 0, c;
  for (c in this.s) {
    if (!a || c == a) {
      for (var d = this.s[c], e = 0;e < d.length;e++) {
        ++b, ec(d[e]);
      }
      delete this.s[c];
      this.Ga--;
    }
  }
  return b;
};
P.prototype.ya = function(a, b, c, d) {
  a = this.s[a];
  var e = -1;
  a && (e = fc(a, b, c, d));
  return-1 < e ? a[e] : null;
};
function fc(a, b, c, d) {
  for (var e = 0;e < a.length;++e) {
    var g = a[e];
    if (!g.na && g.fa == b && g.capture == !!c && g.Pa == d) {
      return e;
    }
  }
  return-1;
}
;var hc = !y || y && 9 <= Ma, ic = y && !A("9");
!z || A("528");
Ba && A("1.9b") || y && A("8") || Aa && A("9.5") || z && A("528");
Ba && !A("8") || y && A("9");
function Q(a, b) {
  this.type = a;
  this.currentTarget = this.target = b;
}
f = Q.prototype;
f.u = function() {
};
f.Ka = function() {
};
f.ga = !1;
f.defaultPrevented = !1;
f.Zb = !0;
f.preventDefault = function() {
  this.defaultPrevented = !0;
  this.Zb = !1;
};
function jc(a) {
  jc[" "](a);
  return a;
}
jc[" "] = ca;
function kc(a, b) {
  Q.call(this, a ? a.type : "");
  this.relatedTarget = this.currentTarget = this.target = null;
  this.charCode = this.keyCode = this.button = this.screenY = this.screenX = this.clientY = this.clientX = this.offsetY = this.offsetX = 0;
  this.metaKey = this.shiftKey = this.altKey = this.ctrlKey = !1;
  this.Eb = this.state = null;
  if (a) {
    var c = this.type = a.type;
    this.target = a.target || a.srcElement;
    this.currentTarget = b;
    var d = a.relatedTarget;
    if (d) {
      if (Ba) {
        var e;
        a: {
          try {
            jc(d.nodeName);
            e = !0;
            break a;
          } catch (g) {
          }
          e = !1;
        }
        e || (d = null);
      }
    } else {
      "mouseover" == c ? d = a.fromElement : "mouseout" == c && (d = a.toElement);
    }
    this.relatedTarget = d;
    this.offsetX = z || void 0 !== a.offsetX ? a.offsetX : a.layerX;
    this.offsetY = z || void 0 !== a.offsetY ? a.offsetY : a.layerY;
    this.clientX = void 0 !== a.clientX ? a.clientX : a.pageX;
    this.clientY = void 0 !== a.clientY ? a.clientY : a.pageY;
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
    this.Eb = a;
    a.defaultPrevented && this.preventDefault();
    delete this.ga;
  }
}
s(kc, Q);
kc.prototype.preventDefault = function() {
  kc.pa.preventDefault.call(this);
  var a = this.Eb;
  if (a.preventDefault) {
    a.preventDefault();
  } else {
    if (a.returnValue = !1, ic) {
      try {
        if (a.ctrlKey || 112 <= a.keyCode && 123 >= a.keyCode) {
          a.keyCode = -1;
        }
      } catch (b) {
      }
    }
  }
};
kc.prototype.u = function() {
};
var lc = "closure_lm_" + (1E6 * Math.random() | 0), mc = {}, nc = 0;
function oc(a, b, c, d, e) {
  if (m(b)) {
    for (var g = 0;g < b.length;g++) {
      oc(a, b[g], c, d, e);
    }
    return null;
  }
  c = pc(c);
  if (bc(a)) {
    a = a.Sa(b, c, d, e);
  } else {
    if (!b) {
      throw Error("Invalid event type");
    }
    var g = !!d, h = qc(a);
    h || (a[lc] = h = new P(a));
    c = h.add(b, c, !1, d, e);
    c.Va || (d = rc(), c.Va = d, d.src = a, d.fa = c, a.addEventListener ? a.addEventListener(b, d, g) : a.attachEvent(b in mc ? mc[b] : mc[b] = "on" + b, d), nc++);
    a = c;
  }
  return a;
}
function rc() {
  var a = sc, b = hc ? function(c) {
    return a.call(b.src, b.fa, c);
  } : function(c) {
    c = a.call(b.src, b.fa, c);
    if (!c) {
      return c;
    }
  };
  return b;
}
function tc(a, b, c, d, e) {
  if (m(b)) {
    for (var g = 0;g < b.length;g++) {
      tc(a, b[g], c, d, e);
    }
  } else {
    c = pc(c), bc(a) ? a.vb(b, c, d, e) : a && (a = qc(a)) && (b = a.ya(b, c, !!d, e)) && uc(b);
  }
}
function uc(a) {
  if ("number" == typeof a || !a || a.na) {
    return!1;
  }
  var b = a.src;
  if (bc(b)) {
    return gc(b.W, a);
  }
  var c = a.type, d = a.Va;
  b.removeEventListener ? b.removeEventListener(c, d, a.capture) : b.detachEvent && b.detachEvent(c in mc ? mc[c] : mc[c] = "on" + c, d);
  nc--;
  (c = qc(b)) ? (gc(c, a), 0 == c.Ga && (c.src = null, b[lc] = null)) : ec(a);
  return!0;
}
function vc(a, b, c, d) {
  var e = 1;
  if (a = qc(a)) {
    if (b = a.s[b]) {
      for (b = bb(b), a = 0;a < b.length;a++) {
        var g = b[a];
        g && g.capture == c && !g.na && (e &= !1 !== wc(g, d));
      }
    }
  }
  return Boolean(e);
}
function wc(a, b) {
  var c = a.fa, d = a.Pa || a.src;
  a.Ia && uc(a);
  return c.call(d, b);
}
function sc(a, b) {
  if (a.na) {
    return!0;
  }
  if (!hc) {
    var c = b || ba("window.event"), d = new kc(c, this), e = !0;
    if (!(0 > c.keyCode || void 0 != c.returnValue)) {
      a: {
        var g = !1;
        if (0 == c.keyCode) {
          try {
            c.keyCode = -1;
            break a;
          } catch (h) {
            g = !0;
          }
        }
        if (g || void 0 == c.returnValue) {
          c.returnValue = !0;
        }
      }
      c = [];
      for (g = d.currentTarget;g;g = g.parentNode) {
        c.push(g);
      }
      for (var g = a.type, k = c.length - 1;!d.ga && 0 <= k;k--) {
        d.currentTarget = c[k], e &= vc(c[k], g, !0, d);
      }
      for (k = 0;!d.ga && k < c.length;k++) {
        d.currentTarget = c[k], e &= vc(c[k], g, !1, d);
      }
    }
    return e;
  }
  return wc(a, new kc(b, this));
}
function qc(a) {
  a = a[lc];
  return a instanceof P ? a : null;
}
var xc = "__closure_events_fn_" + (1E9 * Math.random() >>> 0);
function pc(a) {
  return fa(a) ? a : a[xc] || (a[xc] = function(b) {
    return a.handleEvent(b);
  });
}
;function R() {
  O.call(this);
  this.W = new P(this);
  this.gc = this;
}
s(R, O);
R.prototype[ac] = !0;
f = R.prototype;
f.tb = null;
f.addEventListener = function(a, b, c, d) {
  oc(this, a, b, c, d);
};
f.removeEventListener = function(a, b, c, d) {
  tc(this, a, b, c, d);
};
f.dispatchEvent = function(a) {
  var b, c = this.tb;
  if (c) {
    for (b = [];c;c = c.tb) {
      b.push(c);
    }
  }
  var c = this.gc, d = a.type || a;
  if (n(a)) {
    a = new Q(a, c);
  } else {
    if (a instanceof Q) {
      a.target = a.target || c;
    } else {
      var e = a;
      a = new Q(d, c);
      Wa(a, e);
    }
  }
  var e = !0, g;
  if (b) {
    for (var h = b.length - 1;!a.ga && 0 <= h;h--) {
      g = a.currentTarget = b[h], e = yc(g, d, !0, a) && e;
    }
  }
  a.ga || (g = a.currentTarget = c, e = yc(g, d, !0, a) && e, a.ga || (e = yc(g, d, !1, a) && e));
  if (b) {
    for (h = 0;!a.ga && h < b.length;h++) {
      g = a.currentTarget = b[h], e = yc(g, d, !1, a) && e;
    }
  }
  return e;
};
f.u = function() {
  R.pa.u.call(this);
  this.W && this.W.Ya(void 0);
  this.tb = null;
};
f.Sa = function(a, b, c, d) {
  return this.W.add(String(a), b, !1, c, d);
};
f.vb = function(a, b, c, d) {
  return this.W.remove(String(a), b, c, d);
};
function yc(a, b, c, d) {
  b = a.W.s[String(b)];
  if (!b) {
    return!0;
  }
  b = bb(b);
  for (var e = !0, g = 0;g < b.length;++g) {
    var h = b[g];
    if (h && !h.na && h.capture == c) {
      var k = h.fa, u = h.Pa || h.src;
      h.Ia && gc(a.W, h);
      e = !1 !== k.call(u, d) && e;
    }
  }
  return e && !1 != d.Zb;
}
f.ya = function(a, b, c, d) {
  return this.W.ya(String(a), b, c, d);
};
function zc(a, b) {
  R.call(this);
  this.ea = a || 1;
  this.ra = b || Ac;
  this.jb = p(this.Hc, this);
  this.sb = q();
}
s(zc, R);
zc.prototype.enabled = !1;
var Ac = l;
f = zc.prototype;
f.l = null;
f.setInterval = function(a) {
  this.ea = a;
  this.l && this.enabled ? (this.stop(), this.start()) : this.l && this.stop();
};
f.Hc = function() {
  if (this.enabled) {
    var a = q() - this.sb;
    0 < a && a < 0.8 * this.ea ? this.l = this.ra.setTimeout(this.jb, this.ea - a) : (this.l && (this.ra.clearTimeout(this.l), this.l = null), this.dispatchEvent(Bc), this.enabled && (this.l = this.ra.setTimeout(this.jb, this.ea), this.sb = q()));
  }
};
f.start = function() {
  this.enabled = !0;
  this.l || (this.l = this.ra.setTimeout(this.jb, this.ea), this.sb = q());
};
f.stop = function() {
  this.enabled = !1;
  this.l && (this.ra.clearTimeout(this.l), this.l = null);
};
f.u = function() {
  zc.pa.u.call(this);
  this.stop();
  delete this.ra;
};
var Bc = "tick";
function Cc(a, b, c) {
  if (fa(a)) {
    c && (a = p(a, c));
  } else {
    if (a && "function" == typeof a.handleEvent) {
      a = p(a.handleEvent, a);
    } else {
      throw Error("Invalid listener argument");
    }
  }
  return 2147483647 < b ? -1 : Ac.setTimeout(a, b || 0);
}
;function Dc() {
}
Dc.prototype.Ab = null;
function Ec(a) {
  var b;
  (b = a.Ab) || (b = {}, Fc(a) && (b[0] = !0, b[1] = !0), b = a.Ab = b);
  return b;
}
;var Gc;
function Hc() {
}
s(Hc, Dc);
function Ic(a) {
  return(a = Fc(a)) ? new ActiveXObject(a) : new XMLHttpRequest;
}
function Fc(a) {
  if (!a.Lb && "undefined" == typeof XMLHttpRequest && "undefined" != typeof ActiveXObject) {
    for (var b = ["MSXML2.XMLHTTP.6.0", "MSXML2.XMLHTTP.3.0", "MSXML2.XMLHTTP", "Microsoft.XMLHTTP"], c = 0;c < b.length;c++) {
      var d = b[c];
      try {
        return new ActiveXObject(d), a.Lb = d;
      } catch (e) {
      }
    }
    throw Error("Could not create ActiveXObject. ActiveX might be disabled, or MSXML might not be installed");
  }
  return a.Lb;
}
Gc = new Hc;
function Jc(a) {
  R.call(this);
  this.headers = new cb;
  this.hb = a || null;
  this.T = !1;
  this.gb = this.f = null;
  this.Nb = this.Ra = "";
  this.ka = 0;
  this.q = "";
  this.da = this.qb = this.Qa = this.nb = !1;
  this.Fa = 0;
  this.cb = null;
  this.Yb = Kc;
  this.eb = this.ec = !1;
}
s(Jc, R);
var Kc = "";
Jc.prototype.r = Tb("goog.net.XhrIo");
var Lc = /^https?$/i, Mc = ["POST", "PUT"];
f = Jc.prototype;
f.send = function(a, b, c, d) {
  if (this.f) {
    throw Error("[goog.net.XhrIo] Object is active with another request=" + this.Ra + "; newUri=" + a);
  }
  b = b ? b.toUpperCase() : "GET";
  this.Ra = a;
  this.q = "";
  this.ka = 0;
  this.Nb = b;
  this.nb = !1;
  this.T = !0;
  this.f = this.Cb();
  this.gb = this.hb ? Ec(this.hb) : Ec(Gc);
  this.f.onreadystatechange = p(this.Rb, this);
  try {
    M(this.r, S(this, "Opening Xhr")), this.qb = !0, this.f.open(b, a, !0), this.qb = !1;
  } catch (e) {
    M(this.r, S(this, "Error opening Xhr: " + e.message));
    Nc(this, e);
    return;
  }
  a = c || "";
  var g = this.headers.n();
  d && D(d, function(a, b) {
    g.set(b, a);
  });
  d = Za(g.ca());
  c = l.FormData && a instanceof l.FormData;
  !(0 <= Xa(Mc, b)) || d || c || g.set("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
  D(g, function(a, b) {
    this.f.setRequestHeader(b, a);
  }, this);
  this.Yb && (this.f.responseType = this.Yb);
  "withCredentials" in this.f && (this.f.withCredentials = this.ec);
  try {
    Oc(this), 0 < this.Fa && (this.eb = Pc(this.f), M(this.r, S(this, "Will abort after " + this.Fa + "ms if incomplete, xhr2 " + this.eb)), this.eb ? (this.f.timeout = this.Fa, this.f.ontimeout = p(this.qa, this)) : this.cb = Cc(this.qa, this.Fa, this)), M(this.r, S(this, "Sending request")), this.Qa = !0, this.f.send(a), this.Qa = !1;
  } catch (h) {
    M(this.r, S(this, "Send error: " + h.message)), Nc(this, h);
  }
};
function Pc(a) {
  return y && A(9) && "number" == typeof a.timeout && void 0 !== a.ontimeout;
}
function $a(a) {
  return "content-type" == a.toLowerCase();
}
f.Cb = function() {
  return this.hb ? Ic(this.hb) : Ic(Gc);
};
f.qa = function() {
  "undefined" != typeof aa && this.f && (this.q = "Timed out after " + this.Fa + "ms, aborting", this.ka = 8, M(this.r, S(this, this.q)), this.dispatchEvent("timeout"), this.abort(8));
};
function Nc(a, b) {
  a.T = !1;
  a.f && (a.da = !0, a.f.abort(), a.da = !1);
  a.q = b;
  a.ka = 5;
  Qc(a);
  Rc(a);
}
function Qc(a) {
  a.nb || (a.nb = !0, a.dispatchEvent("complete"), a.dispatchEvent("error"));
}
f.abort = function(a) {
  this.f && this.T && (M(this.r, S(this, "Aborting")), this.T = !1, this.da = !0, this.f.abort(), this.da = !1, this.ka = a || 7, this.dispatchEvent("complete"), this.dispatchEvent("abort"), Rc(this));
};
f.u = function() {
  this.f && (this.T && (this.T = !1, this.da = !0, this.f.abort(), this.da = !1), Rc(this, !0));
  Jc.pa.u.call(this);
};
f.Rb = function() {
  this.mb || (this.qb || this.Qa || this.da ? Sc(this) : this.vc());
};
f.vc = function() {
  Sc(this);
};
function Sc(a) {
  if (a.T && "undefined" != typeof aa) {
    if (a.gb[1] && 4 == T(a) && 2 == Tc(a)) {
      M(a.r, S(a, "Local request error detected and ignored"));
    } else {
      if (a.Qa && 4 == T(a)) {
        Cc(a.Rb, 0, a);
      } else {
        if (a.dispatchEvent("readystatechange"), 4 == T(a)) {
          M(a.r, S(a, "Request complete"));
          a.T = !1;
          try {
            var b = Tc(a), c, d;
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
                  d = !0;
                  break a;
                default:
                  d = !1;
              }
            }
            if (!(c = d)) {
              var e;
              if (e = 0 === b) {
                var g = Ra(String(a.Ra))[1] || null;
                if (!g && self.location) {
                  var h = self.location.protocol, g = h.substr(0, h.length - 1)
                }
                e = !Lc.test(g ? g.toLowerCase() : "");
              }
              c = e;
            }
            if (c) {
              a.dispatchEvent("complete"), a.dispatchEvent("success");
            } else {
              a.ka = 6;
              var k;
              try {
                k = 2 < T(a) ? a.f.statusText : "";
              } catch (u) {
                M(a.r, "Can not get status: " + u.message), k = "";
              }
              a.q = k + " [" + Tc(a) + "]";
              Qc(a);
            }
          } finally {
            Rc(a);
          }
        }
      }
    }
  }
}
function Rc(a, b) {
  if (a.f) {
    Oc(a);
    var c = a.f, d = a.gb[0] ? ca : null;
    a.f = null;
    a.gb = null;
    b || a.dispatchEvent("ready");
    try {
      c.onreadystatechange = d;
    } catch (e) {
      (c = a.r) && c.J("Problem encountered resetting onreadystatechange: " + e.message, void 0);
    }
  }
}
function Oc(a) {
  a.f && a.eb && (a.f.ontimeout = null);
  "number" == typeof a.cb && (Ac.clearTimeout(a.cb), a.cb = null);
}
f.isActive = function() {
  return!!this.f;
};
function T(a) {
  return a.f ? a.f.readyState : 0;
}
function Tc(a) {
  try {
    return 2 < T(a) ? a.f.status : -1;
  } catch (b) {
    return(a = a.r) && a.Z("Can not get status: " + b.message, void 0), -1;
  }
}
function Uc(a) {
  try {
    return a.f ? a.f.responseText : "";
  } catch (b) {
    return M(a.r, "Can not get responseText: " + b.message), "";
  }
}
f.Jb = function() {
  return n(this.q) ? this.q : String(this.q);
};
function S(a, b) {
  return b + " [" + a.Nb + " " + a.Ra + " " + Tc(a) + "]";
}
;function Vc() {
  this.Xb = q();
}
new Vc;
Vc.prototype.set = function(a) {
  this.Xb = a;
};
Vc.prototype.reset = function() {
  this.set(q());
};
Vc.prototype.get = function() {
  return this.Xb;
};
function Wc(a) {
  O.call(this);
  this.e = a;
  this.j = {};
}
s(Wc, O);
var Xc = [];
f = Wc.prototype;
f.Sa = function(a, b, c, d) {
  m(b) || (Xc[0] = b, b = Xc);
  for (var e = 0;e < b.length;e++) {
    var g = oc(a, b[e], c || this.handleEvent, d || !1, this.e || this);
    if (!g) {
      break;
    }
    this.j[g.key] = g;
  }
  return this;
};
f.vb = function(a, b, c, d, e) {
  if (m(b)) {
    for (var g = 0;g < b.length;g++) {
      this.vb(a, b[g], c, d, e);
    }
  } else {
    c = c || this.handleEvent, e = e || this.e || this, c = pc(c), d = !!d, b = bc(a) ? a.ya(b, c, d, e) : a ? (a = qc(a)) ? a.ya(b, c, d, e) : null : null, b && (uc(b), delete this.j[b.key]);
  }
  return this;
};
f.Ya = function() {
  var a = this.j, b = uc, c;
  for (c in a) {
    b.call(void 0, a[c], c, a);
  }
  this.j = {};
};
f.u = function() {
  Wc.pa.u.call(this);
  this.Ya();
};
f.handleEvent = function() {
  throw Error("EventHandler.handleEvent not implemented");
};
function Yc(a, b, c) {
  O.call(this);
  this.qc = a;
  this.ea = b;
  this.e = c;
  this.kc = p(this.wc, this);
}
s(Yc, O);
f = Yc.prototype;
f.$a = !1;
f.Wb = 0;
f.l = null;
f.stop = function() {
  this.l && (Ac.clearTimeout(this.l), this.l = null, this.$a = !1);
};
f.u = function() {
  Yc.pa.u.call(this);
  this.stop();
};
f.wc = function() {
  this.l = null;
  this.$a && !this.Wb && (this.$a = !1, Zc(this));
};
function Zc(a) {
  a.l = Cc(a.kc, a.ea);
  a.qc.call(a.e);
}
;function U(a, b, c, d, e) {
  this.b = a;
  this.a = b;
  this.Y = c;
  this.B = d;
  this.Ea = e || 1;
  this.qa = $c;
  this.ob = new Wc(this);
  this.Ua = new zc;
  this.Ua.setInterval(ad);
}
f = U.prototype;
f.v = null;
f.F = !1;
f.ua = null;
f.xb = null;
f.Da = null;
f.sa = null;
f.U = null;
f.w = null;
f.X = null;
f.k = null;
f.Ha = 0;
f.K = null;
f.ta = null;
f.q = null;
f.g = -1;
f.$b = !0;
f.$ = !1;
f.ma = 0;
f.Wa = null;
var $c = 45E3, ad = 250;
function bd(a, b) {
  switch(a) {
    case 0:
      return "Non-200 return code (" + b + ")";
    case 1:
      return "XMLHTTP failure (no data)";
    case 2:
      return "HttpConnection timeout";
    default:
      return "Unknown error";
  }
}
var cd = {}, ed = {};
function fd() {
  return!y || y && 10 <= Ma;
}
f = U.prototype;
f.S = function(a) {
  this.v = a;
};
f.setTimeout = function(a) {
  this.qa = a;
};
f.cc = function(a) {
  this.ma = a;
};
function gd(a, b, c) {
  a.sa = 1;
  a.U = H(b.n());
  a.X = c;
  a.Db = !0;
  hd(a, null);
}
function id(a, b, c, d, e) {
  a.sa = 1;
  a.U = H(b.n());
  a.X = null;
  a.Db = c;
  e && (a.$b = !1);
  hd(a, d);
}
function hd(a, b) {
  a.Da = q();
  jd(a);
  a.w = a.U.n();
  rb(a.w, "t", a.Ea);
  a.Ha = 0;
  a.k = a.b.Ja(a.b.ab() ? b : null);
  0 < a.ma && (a.Wa = new Yc(p(a.fc, a, a.k), a.ma));
  a.ob.Sa(a.k, "readystatechange", a.Cc);
  var c;
  if (a.v) {
    c = a.v;
    var d = {}, e;
    for (e in c) {
      d[e] = c[e];
    }
    c = d;
  } else {
    c = {};
  }
  a.X ? (a.ta = "POST", c["Content-Type"] = "application/x-www-form-urlencoded", a.k.send(a.w, a.ta, a.X, c)) : (a.ta = "GET", a.$b && !z && (c.Connection = "close"), a.k.send(a.w, a.ta, null, c));
  a.b.H(kd);
  if (d = a.X) {
    for (c = "", d = d.split("&"), e = 0;e < d.length;e++) {
      var g = d[e].split("=");
      if (1 < g.length) {
        var h = g[0], g = g[1], k = h.split("_");
        c = 2 <= k.length && "type" == k[1] ? c + (h + "=" + g + "&") : c + (h + "=redacted&");
      }
    }
  } else {
    c = null;
  }
  a.a.info("XMLHTTP REQ (" + a.B + ") [attempt " + a.Ea + "]: " + a.ta + "\n" + a.w + "\n" + c);
}
f.Cc = function(a) {
  a = a.target;
  var b = this.Wa;
  b && 3 == T(a) ? (this.a.debug("Throttling readystatechange."), b.l || b.Wb ? b.$a = !0 : Zc(b)) : this.fc(a);
};
f.fc = function(a) {
  try {
    if (a == this.k) {
      a: {
        var b = T(this.k), c = this.k.ka, d = Tc(this.k);
        if (!fd() || z && !A("420+")) {
          if (4 > b) {
            break a;
          }
        } else {
          if (3 > b || 3 == b && !Aa && !Uc(this.k)) {
            break a;
          }
        }
        this.$ || 4 != b || 7 == c || (8 == c || 0 >= d ? this.b.H(ld) : this.b.H(md));
        nd(this);
        var e = Tc(this.k);
        this.g = e;
        var g = Uc(this.k);
        g || this.a.debug("No response text for uri " + this.w + " status " + e);
        this.F = 200 == e;
        this.a.info("XMLHTTP RESP (" + this.B + ") [ attempt " + this.Ea + "]: " + this.ta + "\n" + this.w + "\n" + b + " " + e);
        this.F ? (4 == b && V(this), this.Db ? (od(this, b, g), Aa && this.F && 3 == b && (this.ob.Sa(this.Ua, Bc, this.Bc), this.Ua.start())) : (Ub(this.a, this.B, g, null), pd(this, g)), this.F && !this.$ && (4 == b ? this.b.la(this) : (this.F = !1, jd(this)))) : (400 == e && 0 < g.indexOf("Unknown SID") ? (this.q = 3, W(), this.a.Z("XMLHTTP Unknown SID (" + this.B + ")")) : (this.q = 0, W(), this.a.Z("XMLHTTP Bad status " + e + " (" + this.B + ")")), V(this), qd(this));
      }
    } else {
      this.a.Z("Called back with an unexpected xmlhttp");
    }
  } catch (h) {
    this.a.debug("Failed call to OnXmlHttpReadyStateChanged_"), this.k && Uc(this.k) ? Wb(this.a, h, "ResponseText: " + Uc(this.k)) : Wb(this.a, h, "No response text");
  } finally {
  }
};
function od(a, b, c) {
  for (var d = !0;!a.$ && a.Ha < c.length;) {
    var e = rd(a, c);
    if (e == ed) {
      4 == b && (a.q = 4, W(), d = !1);
      Ub(a.a, a.B, null, "[Incomplete Response]");
      break;
    } else {
      if (e == cd) {
        a.q = 4;
        W();
        Ub(a.a, a.B, c, "[Invalid Chunk]");
        d = !1;
        break;
      } else {
        Ub(a.a, a.B, e, null), pd(a, e);
      }
    }
  }
  4 == b && 0 == c.length && (a.q = 1, W(), d = !1);
  a.F = a.F && d;
  d || (Ub(a.a, a.B, c, "[Invalid Chunked Response]"), V(a), qd(a));
}
f.Bc = function() {
  var a = T(this.k), b = Uc(this.k);
  this.Ha < b.length && (nd(this), od(this, a, b), this.F && 4 != a && jd(this));
};
function rd(a, b) {
  var c = a.Ha, d = b.indexOf("\n", c);
  if (-1 == d) {
    return ed;
  }
  c = Number(b.substring(c, d));
  if (isNaN(c)) {
    return cd;
  }
  d += 1;
  if (d + c > b.length) {
    return ed;
  }
  var e = b.substr(d, c);
  a.Ha = d + c;
  return e;
}
function sd(a, b) {
  a.Da = q();
  jd(a);
  var c = b ? window.location.hostname : "";
  a.w = a.U.n();
  G(a.w, "DOMAIN", c);
  G(a.w, "t", a.Ea);
  try {
    a.K = new ActiveXObject("htmlfile");
  } catch (d) {
    a.a.J("ActiveX blocked");
    V(a);
    a.q = 7;
    W();
    qd(a);
    return;
  }
  var e = "<html><body>";
  b && (e += '<script>document.domain="' + c + '"\x3c/script>');
  e += "</body></html>";
  a.K.open();
  a.K.write(e);
  a.K.close();
  a.K.parentWindow.m = p(a.zc, a);
  a.K.parentWindow.d = p(a.Vb, a, !0);
  a.K.parentWindow.rpcClose = p(a.Vb, a, !1);
  c = a.K.createElement("div");
  a.K.parentWindow.document.body.appendChild(c);
  c.innerHTML = '<iframe src="' + a.w + '"></iframe>';
  a.a.info("TRIDENT REQ (" + a.B + ") [ attempt " + a.Ea + "]: GET\n" + a.w);
  a.b.H(kd);
}
f.zc = function(a) {
  Y(p(this.yc, this, a), 0);
};
f.yc = function(a) {
  if (!this.$) {
    var b = this.a;
    b.info("TRIDENT TEXT (" + this.B + "): " + Vb(b, a));
    nd(this);
    pd(this, a);
    jd(this);
  }
};
f.Vb = function(a) {
  Y(p(this.xc, this, a), 0);
};
f.xc = function(a) {
  this.$ || (this.a.info("TRIDENT TEXT (" + this.B + "): " + a ? "success" : "failure"), V(this), this.F = a, this.b.la(this), this.b.H(td));
};
f.oc = function() {
  nd(this);
  this.b.la(this);
};
f.cancel = function() {
  this.$ = !0;
  V(this);
};
function jd(a) {
  a.xb = q() + a.qa;
  ud(a, a.qa);
}
function ud(a, b) {
  if (null != a.ua) {
    throw Error("WatchDog timer not null");
  }
  a.ua = Y(p(a.Ac, a), b);
}
function nd(a) {
  a.ua && (l.clearTimeout(a.ua), a.ua = null);
}
f.Ac = function() {
  this.ua = null;
  var a = q();
  0 <= a - this.xb ? (this.F && this.a.J("Received watchdog timeout even though request loaded successfully"), this.a.info("TIMEOUT: " + this.w), 2 != this.sa && this.b.H(ld), V(this), this.q = 2, W(), qd(this)) : (this.a.Z("WatchDog timer called too early"), ud(this, this.xb - a));
};
function qd(a) {
  a.b.Mb() || a.$ || a.b.la(a);
}
function V(a) {
  nd(a);
  var b = a.Wa;
  b && "function" == typeof b.Ka && b.Ka();
  a.Wa = null;
  a.Ua.stop();
  a.ob.Ya();
  a.k && (b = a.k, a.k = null, b.abort(), b.Ka());
  a.K && (a.K = null);
}
f.Jb = function() {
  return this.q;
};
function pd(a, b) {
  try {
    a.b.Sb(a, b), a.b.H(td);
  } catch (c) {
    Wb(a.a, c, "Error in httprequest callback");
  }
}
;function vd(a, b, c, d, e) {
  (new N).debug("TestLoadImageWithRetries: " + e);
  if (0 == d) {
    c(!1);
  } else {
    var g = e || 0;
    d--;
    wd(a, b, function(e) {
      e ? c(!0) : l.setTimeout(function() {
        vd(a, b, c, d, g);
      }, g);
    });
  }
}
function wd(a, b, c) {
  function d(a, b) {
    return function() {
      try {
        e.debug("TestLoadImage: " + b), g.onload = null, g.onerror = null, g.onabort = null, g.ontimeout = null, l.clearTimeout(h), c(a);
      } catch (d) {
        Wb(e, d);
      }
    };
  }
  var e = new N;
  e.debug("TestLoadImage: loading " + a);
  var g = new Image, h = null;
  g.onload = d(!0, "loaded");
  g.onerror = d(!1, "error");
  g.onabort = d(!1, "abort");
  g.ontimeout = d(!1, "timeout");
  h = l.setTimeout(function() {
    if (g.ontimeout) {
      g.ontimeout();
    }
  }, b);
  g.src = a;
}
;function xd(a, b) {
  this.b = a;
  this.a = b;
  this.P = new Yb(0, !0);
}
f = xd.prototype;
f.v = null;
f.A = null;
f.Xa = !1;
f.dc = null;
f.Ma = null;
f.rb = null;
f.I = null;
f.c = null;
f.g = -1;
f.L = null;
f.va = null;
f.S = function(a) {
  this.v = a;
};
f.bc = function(a) {
  this.P = a;
};
f.lb = function(a) {
  this.I = a;
  a = yd(this.b, this.I);
  W();
  this.dc = q();
  var b = this.b.Hb;
  null != b ? (this.L = this.b.correctHostPrefix(b[0]), (this.va = b[1]) ? (this.c = 1, zd(this)) : (this.c = 2, Ad(this))) : (rb(a, "MODE", "init"), this.A = new U(this, this.a, void 0, void 0, void 0), this.A.S(this.v), id(this.A, a, !1, null, !0), this.c = 0);
};
function zd(a) {
  var b = Bd(a.b, a.va, "/mail/images/cleardot.gif");
  H(b);
  vd(b.toString(), 5E3, p(a.lc, a), 3, 2E3);
  a.H(kd);
}
f.lc = function(a) {
  if (a) {
    this.c = 2, Ad(this);
  } else {
    W();
    var b = this.b;
    b.a.debug("Test Connection Blocked");
    b.g = b.V.g;
    Z(b, 9);
  }
  a && this.H(md);
};
function Ad(a) {
  a.a.debug("TestConnection: starting stage 2");
  var b = a.b.Ec;
  if (null != b) {
    a.a.debug("TestConnection: skipping stage 2, precomputed result is " + b ? "Buffered" : "Unbuffered"), W(), b ? (W(), Cd(a.b, a, !1)) : (W(), Cd(a.b, a, !0));
  } else {
    if (a.A = new U(a, a.a, void 0, void 0, void 0), a.A.S(a.v), b = Dd(a.b, a.L, a.I), W(), fd()) {
      rb(b, "TYPE", "xmlhttp"), id(a.A, b, !1, a.L, !1);
    } else {
      rb(b, "TYPE", "html");
      var c = a.A;
      a = Boolean(a.L);
      c.sa = 3;
      c.U = H(b.n());
      sd(c, a);
    }
  }
}
f.Ja = function(a) {
  return this.b.Ja(a);
};
f.abort = function() {
  this.A && (this.A.cancel(), this.A = null);
  this.g = -1;
};
f.Mb = function() {
  return!1;
};
f.Sb = function(a, b) {
  this.g = a.g;
  if (0 == this.c) {
    if (this.a.debug("TestConnection: Got data for stage 1"), b) {
      try {
        var c = this.P.parse(b);
      } catch (d) {
        Wb(this.a, d);
        Ed(this.b, this);
        return;
      }
      this.L = this.b.correctHostPrefix(c[0]);
      this.va = c[1];
    } else {
      this.a.debug("TestConnection: Null responseText"), Ed(this.b, this);
    }
  } else {
    if (2 == this.c) {
      if (this.Xa) {
        W(), this.rb = q();
      } else {
        if ("11111" == b) {
          if (W(), this.Xa = !0, this.Ma = q(), c = this.Ma - this.dc, fd() || 500 > c) {
            this.g = 200, this.A.cancel(), this.a.debug("Test connection succeeded; using streaming connection"), W(), Cd(this.b, this, !0);
          }
        } else {
          W(), this.Ma = this.rb = q(), this.Xa = !1;
        }
      }
    }
  }
};
f.la = function() {
  this.g = this.A.g;
  if (!this.A.F) {
    this.a.debug("TestConnection: request failed, in state " + this.c), 0 == this.c ? W() : 2 == this.c && W(), Ed(this.b, this);
  } else {
    if (0 == this.c) {
      this.a.debug("TestConnection: request complete for initial check"), this.va ? (this.c = 1, zd(this)) : (this.c = 2, Ad(this));
    } else {
      if (2 == this.c) {
        this.a.debug("TestConnection: request complete for stage 2");
        var a = !1;
        (a = fd() ? this.Xa : 200 > this.rb - this.Ma ? !1 : !0) ? (this.a.debug("Test connection succeeded; using streaming connection"), W(), Cd(this.b, this, !0)) : (this.a.debug("Test connection failed; not using streaming"), W(), Cd(this.b, this, !1));
      }
    }
  }
};
f.ab = function() {
  return this.b.ab();
};
f.isActive = function() {
  return this.b.isActive();
};
f.H = function(a) {
  this.b.H(a);
};
function Fd(a, b, c) {
  this.Bb = a || null;
  this.c = Gd;
  this.t = [];
  this.Q = [];
  this.a = new N;
  this.P = new Yb(0, !0);
  this.Hb = b || null;
  this.Ec = null != c ? c : null;
}
function Hd(a, b) {
  this.Pb = a;
  this.map = b;
}
f = Fd.prototype;
f.v = null;
f.xa = null;
f.p = null;
f.i = null;
f.I = null;
f.Na = null;
f.zb = null;
f.L = null;
f.ic = !0;
f.Ba = 0;
f.tc = 0;
f.La = !1;
f.e = null;
f.G = null;
f.M = null;
f.aa = null;
f.V = null;
f.wb = null;
f.hc = !0;
f.za = -1;
f.Ob = -1;
f.g = -1;
f.ba = 0;
f.ha = 0;
f.jc = 5E3;
f.Dc = 1E4;
f.pb = 2;
f.Ib = 2E4;
f.ma = 0;
f.bb = !1;
f.ia = 8;
var Gd = 1, Id = new R;
function Jd(a) {
  Q.call(this, "statevent", a);
}
s(Jd, Q);
function Kd(a, b) {
  Q.call(this, "timingevent", a);
  this.size = b;
}
s(Kd, Q);
var kd = 1, md = 2, ld = 3, td = 4;
function Ld(a) {
  Q.call(this, "serverreachability", a);
}
s(Ld, Q);
var Xb = "y2f%";
f = Fd.prototype;
f.lb = function(a, b, c, d, e) {
  this.a.debug("connect()");
  W();
  this.I = b;
  this.xa = c || {};
  d && void 0 !== e && (this.xa.OSID = d, this.xa.OAID = e);
  this.a.debug("connectTest_()");
  Md(this) && (this.V = new xd(this, this.a), this.V.S(this.v), this.V.bc(this.P), this.V.lb(a));
};
f.disconnect = function() {
  this.a.debug("disconnect()");
  Nd(this);
  if (3 == this.c) {
    var a = this.Ba++, b = this.Na.n();
    G(b, "SID", this.Y);
    G(b, "RID", a);
    G(b, "TYPE", "terminate");
    Od(this, b);
    a = new U(this, this.a, this.Y, a, void 0);
    a.sa = 2;
    a.U = H(b.n());
    b = new Image;
    b.src = a.U;
    b.onload = b.onerror = p(a.oc, a);
    a.Da = q();
    jd(a);
  }
  Pd(this);
};
function Nd(a) {
  a.V && (a.V.abort(), a.V = null);
  a.i && (a.i.cancel(), a.i = null);
  a.M && (l.clearTimeout(a.M), a.M = null);
  Qd(a);
  a.p && (a.p.cancel(), a.p = null);
  a.G && (l.clearTimeout(a.G), a.G = null);
}
f.S = function(a) {
  this.v = a;
};
f.cc = function(a) {
  this.ma = a;
};
f.Mb = function() {
  return 0 == this.c;
};
f.bc = function(a) {
  this.P = a;
};
function Rd(a) {
  a.p || a.G || (a.G = Y(p(a.Ub, a), 0), a.ba = 0);
}
f.Ub = function(a) {
  this.G = null;
  this.a.debug("startForwardChannel_");
  if (Md(this)) {
    if (this.c == Gd) {
      if (a) {
        this.a.J("Not supposed to retry the open");
      } else {
        this.a.debug("open_()");
        this.Ba = Math.floor(1E5 * Math.random());
        a = this.Ba++;
        var b = new U(this, this.a, "", a, void 0);
        b.S(this.v);
        var c = Sd(this), d = this.Na.n();
        G(d, "RID", a);
        this.Bb && G(d, "CVER", this.Bb);
        Od(this, d);
        gd(b, d, c);
        this.p = b;
        this.c = 2;
      }
    } else {
      3 == this.c && (a ? Td(this, a) : 0 == this.t.length ? this.a.debug("startForwardChannel_ returned: nothing to send") : this.p ? this.a.J("startForwardChannel_ returned: connection already in progress") : (Td(this), this.a.debug("startForwardChannel_ finished, sent request")));
    }
  }
};
function Td(a, b) {
  var c, d;
  b ? 6 < a.ia ? (a.t = a.Q.concat(a.t), a.Q.length = 0, c = a.Ba - 1, d = Sd(a)) : (c = b.B, d = b.X) : (c = a.Ba++, d = Sd(a));
  var e = a.Na.n();
  G(e, "SID", a.Y);
  G(e, "RID", c);
  G(e, "AID", a.za);
  Od(a, e);
  c = new U(a, a.a, a.Y, c, a.ba + 1);
  c.S(a.v);
  c.setTimeout(Math.round(0.5 * a.Ib) + Math.round(0.5 * a.Ib * Math.random()));
  a.p = c;
  gd(c, e, d);
}
function Od(a, b) {
  if (a.e) {
    var c = a.e.getAdditionalParams(a);
    c && D(c, function(a, c) {
      G(b, c, a);
    });
  }
}
function Sd(a) {
  var b = Math.min(a.t.length, 1E3), c = ["count=" + b], d;
  6 < a.ia && 0 < b ? (d = a.t[0].Pb, c.push("ofs=" + d)) : d = 0;
  for (var e = 0;e < b;e++) {
    var g = a.t[e].Pb, h = a.t[e].map, g = 6 >= a.ia ? e : g - d;
    try {
      D(h, function(a, b) {
        c.push("req" + g + "_" + b + "=" + encodeURIComponent(a));
      });
    } catch (k) {
      c.push("req" + g + "_type=" + encodeURIComponent("_badmap")), a.e && a.e.badMapError(a, h);
    }
  }
  a.Q = a.Q.concat(a.t.splice(0, b));
  return c.join("&");
}
function Ud(a) {
  a.i || a.M || (a.yb = 1, a.M = Y(p(a.Tb, a), 0), a.ha = 0);
}
function Vd(a) {
  if (a.i || a.M) {
    return a.a.J("Request already in progress"), !1;
  }
  if (3 <= a.ha) {
    return!1;
  }
  a.a.debug("Going to retry GET");
  a.yb++;
  a.M = Y(p(a.Tb, a), Wd(a, a.ha));
  a.ha++;
  return!0;
}
f.Tb = function() {
  this.M = null;
  if (Md(this)) {
    this.a.debug("Creating new HttpRequest");
    this.i = new U(this, this.a, this.Y, "rpc", this.yb);
    this.i.S(this.v);
    this.i.cc(this.ma);
    var a = this.zb.n();
    G(a, "RID", "rpc");
    G(a, "SID", this.Y);
    G(a, "CI", this.wb ? "0" : "1");
    G(a, "AID", this.za);
    Od(this, a);
    if (fd()) {
      G(a, "TYPE", "xmlhttp"), id(this.i, a, !0, this.L, !1);
    } else {
      G(a, "TYPE", "html");
      var b = this.i, c = Boolean(this.L);
      b.sa = 3;
      b.U = H(a.n());
      sd(b, c);
    }
    this.a.debug("New Request created");
  }
};
function Md(a) {
  if (a.e) {
    var b = a.e.okToMakeRequest(a);
    if (0 != b) {
      return a.a.debug("Handler returned error code from okToMakeRequest"), Z(a, b), !1;
    }
  }
  return!0;
}
function Cd(a, b, c) {
  a.a.debug("Test Connection Finished");
  a.wb = a.hc && c;
  a.g = b.g;
  a.a.debug("connectChannel_()");
  a.mc(Gd, 0);
  a.Na = yd(a, a.I);
  Rd(a);
}
function Ed(a, b) {
  a.a.debug("Test Connection Failed");
  a.g = b.g;
  Z(a, 2);
}
f.Sb = function(a, b) {
  if (0 != this.c && (this.i == a || this.p == a)) {
    if (this.g = a.g, this.p == a && 3 == this.c) {
      if (7 < this.ia) {
        var c;
        try {
          c = this.P.parse(b);
        } catch (d) {
          c = null;
        }
        if (m(c) && 3 == c.length) {
          var e = c;
          if (0 == e[0]) {
            a: {
              if (this.a.debug("Server claims our backchannel is missing."), this.M) {
                this.a.debug("But we are currently starting the request.");
              } else {
                if (this.i) {
                  if (this.i.Da + 3E3 < this.p.Da) {
                    Qd(this), this.i.cancel(), this.i = null;
                  } else {
                    break a;
                  }
                } else {
                  this.a.Z("We do not have a BackChannel established");
                }
                Vd(this);
                W();
              }
            }
          } else {
            this.Ob = e[1], c = this.Ob - this.za, 0 < c && (e = e[2], this.a.debug(e + " bytes (in " + c + " arrays) are outstanding on the BackChannel"), 37500 > e && this.wb && 0 == this.ha && !this.aa && (this.aa = Y(p(this.uc, this), 6E3)));
          }
        } else {
          this.a.debug("Bad POST response data returned"), Z(this, 11);
        }
      } else {
        b != Xb && (this.a.debug("Bad data returned - missing/invald magic cookie"), Z(this, 11));
      }
    } else {
      if (this.i == a && Qd(this), !/^[\s\xa0]*$/.test(b)) {
        c = this.P.parse(b);
        for (var e = this.e && this.e.channelHandleMultipleArrays ? [] : null, g = 0;g < c.length;g++) {
          var h = c[g];
          this.za = h[0];
          h = h[1];
          2 == this.c ? "c" == h[0] ? (this.Y = h[1], this.L = this.correctHostPrefix(h[2]), h = h[3], this.ia = null != h ? h : 6, this.c = 3, this.e && this.e.channelOpened(this), this.zb = Dd(this, this.L, this.I), Ud(this)) : "stop" == h[0] && Z(this, 7) : 3 == this.c && ("stop" == h[0] ? (e && 0 != e.length && (this.e.channelHandleMultipleArrays(this, e), e.length = 0), Z(this, 7)) : "noop" != h[0] && (e ? e.push(h) : this.e && this.e.channelHandleArray(this, h)), this.ha = 0);
        }
        e && 0 != e.length && this.e.channelHandleMultipleArrays(this, e);
      }
    }
  }
};
f.correctHostPrefix = function(a) {
  return this.ic ? this.e ? this.e.correctHostPrefix(a) : a : null;
};
f.uc = function() {
  null != this.aa && (this.aa = null, this.i.cancel(), this.i = null, Vd(this), W());
};
function Qd(a) {
  null != a.aa && (l.clearTimeout(a.aa), a.aa = null);
}
f.la = function(a) {
  this.a.debug("Request complete");
  var b;
  if (this.i == a) {
    Qd(this), this.i = null, b = 2;
  } else {
    if (this.p == a) {
      this.p = null, b = 1;
    } else {
      return;
    }
  }
  this.g = a.g;
  if (0 != this.c) {
    if (a.F) {
      1 == b ? (q(), Id.dispatchEvent(new Kd(Id, a.X ? a.X.length : 0)), Rd(this), this.Q.length = 0) : Ud(this);
    } else {
      var c = a.Jb();
      if (3 == c || 7 == c || 0 == c && 0 < this.g) {
        this.a.debug("Not retrying due to error type");
      } else {
        this.a.debug("Maybe retrying, last error: " + bd(c, this.g));
        var d;
        if (d = 1 == b) {
          this.p || this.G ? (this.a.J("Request already in progress"), d = !1) : this.c == Gd || this.ba >= (this.La ? 0 : this.pb) ? d = !1 : (this.a.debug("Going to retry POST"), this.G = Y(p(this.Ub, this, a), Wd(this, this.ba)), this.ba++, d = !0);
        }
        if (d || 2 == b && Vd(this)) {
          return;
        }
        this.a.debug("Exceeded max number of retries");
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
          Z(this, 2);
      }
    }
  }
};
function Wd(a, b) {
  var c = a.jc + Math.floor(Math.random() * a.Dc);
  a.isActive() || (a.a.debug("Inactive channel"), c *= 2);
  return c * b;
}
f.mc = function(a) {
  if (!(0 <= Xa(arguments, this.c))) {
    throw Error("Unexpected channel state: " + this.c);
  }
};
function Z(a, b) {
  a.a.info("Error code " + b);
  if (2 == b || 9 == b) {
    var c = null;
    a.e && (c = a.e.getNetworkTestImageUri(a));
    var d = p(a.Gc, a);
    c || (c = new E("//www.google.com/images/cleardot.gif"), H(c));
    wd(c.toString(), 1E4, d);
  } else {
    W();
  }
  Xd(a, b);
}
f.Gc = function(a) {
  a ? (this.a.info("Successfully pinged google.com"), W()) : (this.a.info("Failed to ping google.com"), W(), Xd(this, 8));
};
function Xd(a, b) {
  a.a.debug("HttpChannel: error - " + b);
  a.c = 0;
  a.e && a.e.channelError(a, b);
  Pd(a);
  Nd(a);
}
function Pd(a) {
  a.c = 0;
  a.g = -1;
  if (a.e) {
    if (0 == a.Q.length && 0 == a.t.length) {
      a.e.channelClosed(a);
    } else {
      a.a.debug("Number of undelivered maps, pending: " + a.Q.length + ", outgoing: " + a.t.length);
      var b = bb(a.Q), c = bb(a.t);
      a.Q.length = 0;
      a.t.length = 0;
      a.e.channelClosed(a, b, c);
    }
  }
}
function yd(a, b) {
  var c = Bd(a, null, b);
  a.a.debug("GetForwardChannelUri: " + c);
  return c;
}
function Dd(a, b, c) {
  b = Bd(a, a.ab() ? b : null, c);
  a.a.debug("GetBackChannelUri: " + b);
  return b;
}
function Bd(a, b, c) {
  var d = tb(c);
  if ("" != d.ja) {
    b && gb(d, b + "." + d.ja), hb(d, d.Ca);
  } else {
    var e = window.location, d = ub(e.protocol, b ? b + "." + e.hostname : e.hostname, e.port, c)
  }
  a.xa && D(a.xa, function(a, b) {
    G(d, b, a);
  });
  G(d, "VER", a.ia);
  Od(a, d);
  return d;
}
f.Ja = function(a) {
  if (a && !this.bb) {
    throw Error("Can't create secondary domain capable XhrIo object.");
  }
  a = new Jc;
  a.ec = this.bb;
  return a;
};
f.isActive = function() {
  return!!this.e && this.e.isActive(this);
};
function Y(a, b) {
  if (!fa(a)) {
    throw Error("Fn must not be null and must be a function");
  }
  return l.setTimeout(function() {
    a();
  }, b);
}
f.H = function() {
  Id.dispatchEvent(new Ld(Id));
};
function W() {
  Id.dispatchEvent(new Jd(Id));
}
f.ab = function() {
  return this.bb || !fd();
};
function Yd() {
}
f = Yd.prototype;
f.channelHandleMultipleArrays = null;
f.okToMakeRequest = function() {
  return 0;
};
f.channelOpened = function() {
};
f.channelHandleArray = function() {
};
f.channelError = function() {
};
f.channelClosed = function() {
};
f.getAdditionalParams = function() {
  return{};
};
f.getNetworkTestImageUri = function() {
  return null;
};
f.isActive = function() {
  return!0;
};
f.badMapError = function() {
};
f.correctHostPrefix = function(a) {
  return a;
};
var $, Zd;
Zd = {0:"Ok", 4:"User is logging out", 6:"Unknown session ID", 7:"Stopped by server", 8:"General network error", 2:"Request failed", 9:"Blocked by a network administrator", 5:"No data from server", 10:"Got bad data from the server", 11:"Got a bad response from the server"};
$ = function(a, b) {
  var c, d, e, g, h, k, u, K, v, r, La, w, X, dd;
  if (!(this instanceof $)) {
    return new $(a, b);
  }
  r = this;
  a || (a = "channel");
  a.match(/:\/\//) && a.replace(/^ws/, "http");
  b || (b = {});
  m(b || "string" === typeof b) && (b = {});
  K = b.reconnectTime || 3E3;
  c = b.extraHeaders || null;
  d = b.extraParams || null;
  null !== b.affinity && (d || (d = {}), b.affinityParam || (b.affinityParam = "a"), this.affinity = b.affinity || sa(), d[b.affinityParam] = this.affinity);
  X = function(a) {
    r.readyState = r.readyState = a;
  };
  X(this.CLOSED);
  w = null;
  k = null != (dd = b.prev) ? dd.Fc : void 0;
  e = function(a, b, c, d, e) {
    try {
      return "function" === typeof r[a] ? r[a](c, d, e) : void 0;
    } catch (g) {
      throw "undefined" !== typeof console && null !== console && console.error(g.stack), g;
    }
  };
  g = new Yd;
  g.channelOpened = function() {
    k = w;
    X($.OPEN);
    return e("onopen");
  };
  h = null;
  g.channelError = function(a, b) {
    var c;
    c = Zd[b];
    h = b;
    r.readyState !== $.CLOSED && X($.ib);
    return e("onerror", 0, c, b);
  };
  v = null;
  g.channelClosed = function(a, c, d) {
    var g;
    if (r.readyState !== $.CLOSED) {
      return w = null, a = h ? Zd[h] : "Closed", X($.CLOSED), b.reconnect && 7 !== h && 0 !== h && (g = 6 === h ? 0 : K, clearTimeout(v), v = setTimeout(u, g)), e("onclose", 0, a, c, d), h = null;
    }
  };
  g.channelHandleArray = function(a, b) {
    return e("onmessage", 0, {type:"message", data:b});
  };
  u = function() {
    if (w) {
      throw Error("Reconnect() called from invalid state");
    }
    X($.CONNECTING);
    e("onconnecting");
    clearTimeout(v);
    r.Fc = w = new Fd(b.appVersion, null != k ? k.Hb : void 0);
    b.crossDomainXhr && (w.bb = !0);
    w.e = g;
    c && w.S(c);
    h = null;
    if (b.failFast) {
      var t = w;
      t.La = !0;
      t.a.info("setFailFast: true");
      (t.p || t.G) && t.ba > (t.La ? 0 : t.pb) && (t.a.info("Retry count " + t.ba + " > new maxRetries " + (t.La ? 0 : t.pb) + ". Fail immediately!"), t.p ? (t.p.cancel(), t.la(t.p)) : (l.clearTimeout(t.G), t.G = null, Z(t, 2)));
    }
    return w.lb("" + a + "/test", "" + a + "/bind", d, null != k ? k.Y : void 0, null != k ? k.za : void 0);
  };
  this.open = function() {
    if (r.readyState !== r.CLOSED) {
      throw Error("Already open");
    }
    return u();
  };
  this.close = function() {
    clearTimeout(v);
    h = 0;
    if (r.readyState !== $.CLOSED) {
      return X($.ib), w.disconnect();
    }
  };
  this.sendMap = La = function(a) {
    var b;
    if ((b = r.readyState) !== $.ib && b !== $.CLOSED) {
      b = w;
      if (0 == b.c) {
        throw Error("Invalid operation: sending map when state is closed");
      }
      1E3 == b.t.length && b.a.J("Already have 1000 queued maps upon queueing " + yb(a));
      b.t.push(new Hd(b.tc++, a));
      2 != b.c && 3 != b.c || Rd(b);
    }
  };
  this.send = function(a) {
    return "string" === typeof a ? La({_S:a}) : La({JSON:yb(a)});
  };
  u();
};
$.prototype.canSendWhileConnecting = $.canSendWhileConnecting = !0;
$.prototype.canSendJSON = $.canSendJSON = !0;
$.prototype.CONNECTING = $.CONNECTING = $.CONNECTING = 0;
$.prototype.OPEN = $.OPEN = $.OPEN = 1;
$.prototype.CLOSING = $.CLOSING = $.ib = 2;
$.prototype.CLOSED = $.CLOSED = $.CLOSED = 3;
("undefined" !== typeof exports && null !== exports ? exports : window).BCSocket = $;
var Image, XMLHttpRequest, $d, ae, window;
$d = require("request");
Image = function() {
  this.__defineSetter__("src", function(a) {
    return function(b) {
      b = b.toString();
      b.match(/^\/\//) && (b = "http:" + b);
      return $d(b, function(b) {
        return null != b ? "function" === typeof a.onerror ? a.onerror() : void 0 : "function" === typeof a.onload ? a.onload() : void 0;
      });
    };
  }(this));
  return this;
};
XMLHttpRequest = require("../XMLHttpRequest").XMLHttpRequest;
Fd.prototype.Ja = function() {
  var a;
  a = new Jc;
  a.Cb = function() {
    return new XMLHttpRequest;
  };
  return a;
};
l = window = {setTimeout:setTimeout, clearTimeout:clearTimeout, setInterval:setInterval, clearInterval:clearInterval, console:console, location:null, navigator:{userAgent:"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_2) AppleWebKit/535.1 (KHTML, like Gecko) Chrome/14.0.835.202 Safari/535.1"}};
ae = require("url");
exports.setDefaultLocation = function(a) {
  "string" === typeof a && (a = ae.parse(a));
  return window.location = a;
};

})();
