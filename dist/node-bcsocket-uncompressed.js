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
var r = Date.now || function() {
  return+new Date;
};
function s(a, b) {
  function c() {
  }
  c.prototype = b.prototype;
  a.pa = b.prototype;
  a.prototype = new c;
  a.Jc = function(a, c, g) {
    return b.prototype[c].apply(a, Array.prototype.slice.call(arguments, 2));
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
  -1 != a.indexOf("&") && (a = a.replace(oa, "&amp;"));
  -1 != a.indexOf("<") && (a = a.replace(pa, "&lt;"));
  -1 != a.indexOf(">") && (a = a.replace(qa, "&gt;"));
  -1 != a.indexOf('"') && (a = a.replace(ra, "&quot;"));
  -1 != a.indexOf("'") && (a = a.replace(sa, "&#39;"));
  return a;
}
var oa = /&/g, pa = /</g, qa = />/g, ra = /"/g, sa = /'/g, ma = /[&<>"']/;
function ta() {
  return Math.floor(2147483648 * Math.random()).toString(36) + Math.abs(Math.floor(2147483648 * Math.random()) ^ r()).toString(36);
}
function ua(a, b) {
  return a < b ? -1 : a > b ? 1 : 0;
}
;var w, va, wa, xa;
function ya() {
  return l.navigator ? l.navigator.userAgent : null;
}
xa = wa = va = w = !1;
var za;
if (za = ya()) {
  var Aa = l.navigator;
  w = 0 == za.lastIndexOf("Opera", 0);
  va = !w && (-1 != za.indexOf("MSIE") || -1 != za.indexOf("Trident"));
  wa = !w && -1 != za.indexOf("WebKit");
  xa = !w && !wa && !va && "Gecko" == Aa.product;
}
var Ba = w, x = va, Ca = xa, y = wa;
function Da() {
  var a = l.document;
  return a ? a.documentMode : void 0;
}
var Ea;
a: {
  var Fa = "", Ga;
  if (Ba && l.opera) {
    var Ha = l.opera.version, Fa = "function" == typeof Ha ? Ha() : Ha
  } else {
    if (Ca ? Ga = /rv\:([^\);]+)(\)|;)/ : x ? Ga = /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/ : y && (Ga = /WebKit\/(\S+)/), Ga) {
      var Ia = Ga.exec(ya()), Fa = Ia ? Ia[1] : ""
    }
  }
  if (x) {
    var Ja = Da();
    if (Ja > parseFloat(Fa)) {
      Ea = String(Ja);
      break a;
    }
  }
  Ea = Fa;
}
var Ka = {};
function z(a) {
  var b;
  if (!(b = Ka[a])) {
    b = 0;
    for (var c = String(Ea).replace(/^[\s\xa0]+|[\s\xa0]+$/g, "").split("."), d = String(a).replace(/^[\s\xa0]+|[\s\xa0]+$/g, "").split("."), e = Math.max(c.length, d.length), g = 0;0 == b && g < e;g++) {
      var h = c[g] || "", k = d[g] || "", u = RegExp("(\\d*)(\\D*)", "g"), t = RegExp("(\\d*)(\\D*)", "g");
      do {
        var q = u.exec(h) || ["", "", ""], v = t.exec(k) || ["", "", ""];
        if (0 == q[0].length && 0 == v[0].length) {
          break;
        }
        b = ua(0 == q[1].length ? 0 : parseInt(q[1], 10), 0 == v[1].length ? 0 : parseInt(v[1], 10)) || ua(0 == q[2].length, 0 == v[2].length) || ua(q[2], v[2]);
      } while (0 == b);
    }
    b = Ka[a] = 0 <= b;
  }
  return b;
}
var La = l.document, Ma = La && x ? Da() || ("CSS1Compat" == La.compatMode ? parseInt(Ea, 10) : 5) : void 0;
function Na(a) {
  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, Na);
  } else {
    var b = Error().stack;
    b && (this.stack = b);
  }
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
var Sa = y;
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
;var A = Array.prototype, Xa = A.indexOf ? function(a, b, c) {
  return A.indexOf.call(a, b, c);
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
}, Ya = A.forEach ? function(a, b, c) {
  A.forEach.call(a, b, c);
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
  return A.concat.apply(A, arguments);
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
      a instanceof cb ? (c = a.ba(), d = a.N()) : (c = Ua(a), d = Ta(a));
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
f.ba = function() {
  db(this);
  return this.j.concat();
};
f.wa = function(a) {
  return B(this.O, a);
};
f.remove = function(a) {
  return B(this.O, a) ? (delete this.O[a], this.o--, this.j.length > 2 * this.o && db(this), !0) : !1;
};
function db(a) {
  if (a.o != a.j.length) {
    for (var b = 0, c = 0;b < a.j.length;) {
      var d = a.j[b];
      B(a.O, d) && (a.j[c++] = d);
      b++;
    }
    a.j.length = c;
  }
  if (a.o != a.j.length) {
    for (var e = {}, c = b = 0;b < a.j.length;) {
      d = a.j[b], B(e, d) || (a.j[c++] = d, e[d] = 1), b++;
    }
    a.j.length = c;
  }
}
f.get = function(a, b) {
  return B(this.O, a) ? this.O[a] : b;
};
f.set = function(a, b) {
  B(this.O, a) || (this.o++, this.j.push(a));
  this.O[a] = b;
};
f.n = function() {
  return new cb(this);
};
function B(a, b) {
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
function C(a, b, c) {
  if ("function" == typeof a.forEach) {
    a.forEach(b, c);
  } else {
    if (ea(a) || n(a)) {
      Ya(a, b, c);
    } else {
      var d;
      if ("function" == typeof a.ba) {
        d = a.ba();
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
;function D(a, b) {
  var c;
  if (a instanceof D) {
    this.D = void 0 !== b ? b : a.D, fb(this, a.oa), c = a.hb, E(this), this.hb = c, gb(this, a.ia), hb(this, a.Da), ib(this, a.I), jb(this, a.R.n()), c = a.Qa, E(this), this.Qa = c;
  } else {
    if (a && (c = Ra(String(a)))) {
      this.D = !!b;
      fb(this, c[1] || "", !0);
      var d = c[2] || "";
      E(this);
      this.hb = d ? decodeURIComponent(d) : "";
      gb(this, c[3] || "", !0);
      hb(this, c[4]);
      ib(this, c[5] || "", !0);
      jb(this, c[6] || "", !0);
      c = c[7] || "";
      E(this);
      this.Qa = c ? decodeURIComponent(c) : "";
    } else {
      this.D = !!b, this.R = new kb(null, 0, this.D);
    }
  }
}
f = D.prototype;
f.oa = "";
f.hb = "";
f.ia = "";
f.Da = null;
f.I = "";
f.Qa = "";
f.rc = !1;
f.D = !1;
f.toString = function() {
  var a = [], b = this.oa;
  b && a.push(lb(b, nb), ":");
  if (b = this.ia) {
    a.push("//");
    var c = this.hb;
    c && a.push(lb(c, nb), "@");
    a.push(encodeURIComponent(String(b)));
    b = this.Da;
    null != b && a.push(":", String(b));
  }
  if (b = this.I) {
    this.ia && "/" != b.charAt(0) && a.push("/"), a.push(lb(b, "/" == b.charAt(0) ? ob : pb));
  }
  (b = this.R.toString()) && a.push("?", b);
  (b = this.Qa) && a.push("#", lb(b, qb));
  return a.join("");
};
f.n = function() {
  return new D(this);
};
function fb(a, b, c) {
  E(a);
  a.oa = c ? b ? decodeURIComponent(b) : "" : b;
  a.oa && (a.oa = a.oa.replace(/:$/, ""));
}
function gb(a, b, c) {
  E(a);
  a.ia = c ? b ? decodeURIComponent(b) : "" : b;
}
function hb(a, b) {
  E(a);
  if (b) {
    b = Number(b);
    if (isNaN(b) || 0 > b) {
      throw Error("Bad port number " + b);
    }
    a.Da = b;
  } else {
    a.Da = null;
  }
}
function ib(a, b, c) {
  E(a);
  a.I = c ? b ? decodeURIComponent(b) : "" : b;
}
function jb(a, b, c) {
  E(a);
  b instanceof kb ? (a.R = b, a.R.wb(a.D)) : (c || (b = lb(b, rb)), a.R = new kb(b, 0, a.D));
}
function F(a, b, c) {
  E(a);
  a.R.set(b, c);
}
function sb(a, b, c) {
  E(a);
  m(c) || (c = [String(c)]);
  tb(a.R, b, c);
}
function G(a) {
  E(a);
  F(a, "zx", ta());
  return a;
}
function E(a) {
  if (a.rc) {
    throw Error("Tried to modify a read-only Uri");
  }
}
f.wb = function(a) {
  this.D = a;
  this.R && this.R.wb(a);
  return this;
};
function ub(a) {
  return a instanceof D ? a.n() : new D(a, void 0);
}
function vb(a, b, c, d) {
  var e = new D(null, void 0);
  a && fb(e, a);
  b && gb(e, b);
  c && hb(e, c);
  d && ib(e, d);
  return e;
}
function lb(a, b) {
  return n(a) ? encodeURI(a).replace(b, wb) : null;
}
function wb(a) {
  a = a.charCodeAt(0);
  return "%" + (a >> 4 & 15).toString(16) + (a & 15).toString(16);
}
var nb = /[#\/\?@]/g, pb = /[\#\?:]/g, ob = /[\#\?]/g, rb = /[\#\?@]/g, qb = /#/g;
function kb(a, b, c) {
  this.C = a || null;
  this.D = !!c;
}
function H(a) {
  if (!a.h && (a.h = new cb, a.o = 0, a.C)) {
    for (var b = a.C.split("&"), c = 0;c < b.length;c++) {
      var d = b[c].indexOf("="), e = null, g = null;
      0 <= d ? (e = b[c].substring(0, d), g = b[c].substring(d + 1)) : e = b[c];
      e = decodeURIComponent(e.replace(/\+/g, " "));
      e = I(a, e);
      a.add(e, g ? decodeURIComponent(g.replace(/\+/g, " ")) : "");
    }
  }
}
f = kb.prototype;
f.h = null;
f.o = null;
f.add = function(a, b) {
  H(this);
  this.C = null;
  a = I(this, a);
  var c = this.h.get(a);
  c || this.h.set(a, c = []);
  c.push(b);
  this.o++;
  return this;
};
f.remove = function(a) {
  H(this);
  a = I(this, a);
  return this.h.wa(a) ? (this.C = null, this.o -= this.h.get(a).length, this.h.remove(a)) : !1;
};
f.wa = function(a) {
  H(this);
  a = I(this, a);
  return this.h.wa(a);
};
f.ba = function() {
  H(this);
  for (var a = this.h.N(), b = this.h.ba(), c = [], d = 0;d < b.length;d++) {
    for (var e = a[d], g = 0;g < e.length;g++) {
      c.push(b[d]);
    }
  }
  return c;
};
f.N = function(a) {
  H(this);
  var b = [];
  if (n(a)) {
    this.wa(a) && (b = ab(b, this.h.get(I(this, a))));
  } else {
    a = this.h.N();
    for (var c = 0;c < a.length;c++) {
      b = ab(b, a[c]);
    }
  }
  return b;
};
f.set = function(a, b) {
  H(this);
  this.C = null;
  a = I(this, a);
  this.wa(a) && (this.o -= this.h.get(a).length);
  this.h.set(a, [b]);
  this.o++;
  return this;
};
f.get = function(a, b) {
  var c = a ? this.N(a) : [];
  return 0 < c.length ? String(c[0]) : b;
};
function tb(a, b, c) {
  a.remove(b);
  0 < c.length && (a.C = null, a.h.set(I(a, b), bb(c)), a.o += c.length);
}
f.toString = function() {
  if (this.C) {
    return this.C;
  }
  if (!this.h) {
    return "";
  }
  for (var a = [], b = this.h.ba(), c = 0;c < b.length;c++) {
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
function I(a, b) {
  var c = String(b);
  a.D && (c = c.toLowerCase());
  return c;
}
f.wb = function(a) {
  a && !this.D && (H(this), this.C = null, C(this.h, function(a, c) {
    var d = c.toLowerCase();
    c != d && (this.remove(c), tb(this, d, a));
  }, this));
  this.D = a;
};
function xb(a) {
  a = String(a);
  if (/^\s*$/.test(a) ? 0 : /^[\],:{}\s\u2028\u2029]*$/.test(a.replace(/\\["\\\/bfnrtu]/g, "@").replace(/"[^"\\\n\r\u2028\u2029\x00-\x08\x0a-\x1f]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:[\s\u2028\u2029]*\[)+/g, ""))) {
    try {
      return eval("(" + a + ")");
    } catch (b) {
    }
  }
  throw Error("Invalid JSON string: " + a);
}
function yb(a) {
  return eval("(" + a + ")");
}
function zb(a) {
  var b = [];
  Ab(new Bb, a, b);
  return b.join("");
}
function Bb() {
  this.ab = void 0;
}
function Ab(a, b, c) {
  switch(typeof b) {
    case "string":
      Cb(b, c);
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
          c.push(e), e = b[g], Ab(a, a.ab ? a.ab.call(b, String(g), e) : e, c), e = ",";
        }
        c.push("]");
        break;
      }
      c.push("{");
      d = "";
      for (g in b) {
        Object.prototype.hasOwnProperty.call(b, g) && (e = b[g], "function" != typeof e && (c.push(d), Cb(g, c), c.push(":"), Ab(a, a.ab ? a.ab.call(b, g, e) : e, c), d = ","));
      }
      c.push("}");
      break;
    case "function":
      break;
    default:
      throw Error("Unknown type: " + typeof b);;
  }
}
var Db = {'"':'\\"', "\\":"\\\\", "/":"\\/", "\b":"\\b", "\f":"\\f", "\n":"\\n", "\r":"\\r", "\t":"\\t", "\x0B":"\\u000b"}, Eb = /\uffff/.test("\uffff") ? /[\\\"\x00-\x1f\x7f-\uffff]/g : /[\\\"\x00-\x1f\x7f-\xff]/g;
function Cb(a, b) {
  b.push('"', a.replace(Eb, function(a) {
    if (a in Db) {
      return Db[a];
    }
    var b = a.charCodeAt(0), e = "\\u";
    16 > b ? e += "000" : 256 > b ? e += "00" : 4096 > b && (e += "0");
    return Db[a] = e + b.toString(16);
  }), '"');
}
;function Fb(a) {
  return Gb(a || arguments.callee.caller, []);
}
function Gb(a, b) {
  var c = [];
  if (0 <= Xa(b, a)) {
    c.push("[...circular reference...]");
  } else {
    if (a && 50 > b.length) {
      c.push(Hb(a) + "(");
      for (var d = a.arguments, e = 0;d && e < d.length;e++) {
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
            g = (g = Hb(g)) ? g : "[fn]";
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
        c.push(Gb(a.caller, b));
      } catch (h) {
        c.push("[exception trying to get caller]\n");
      }
    } else {
      a ? c.push("[...long stack...]") : c.push("[end]");
    }
  }
  return c.join("");
}
function Hb(a) {
  if (Ib[a]) {
    return Ib[a];
  }
  a = String(a);
  if (!Ib[a]) {
    var b = /function ([^\(]+)/.exec(a);
    Ib[a] = b ? b[1] : "[Anonymous]";
  }
  return Ib[a];
}
var Ib = {};
function Jb(a, b, c, d, e) {
  this.reset(a, b, c, d, e);
}
Jb.prototype.Ib = null;
Jb.prototype.Hb = null;
var Kb = 0;
Jb.prototype.reset = function(a, b, c, d, e) {
  "number" == typeof e || Kb++;
  d || r();
  this.Ba = a;
  this.tc = b;
  delete this.Ib;
  delete this.Hb;
};
Jb.prototype.cc = function(a) {
  this.Ba = a;
};
function Lb(a) {
  this.uc = a;
  this.Mb = this.mb = this.Ba = this.Va = null;
}
function J(a, b) {
  this.name = a;
  this.value = b;
}
J.prototype.toString = function() {
  return this.name;
};
var Mb = new J("SEVERE", 1E3), Nb = new J("WARNING", 900), Ob = new J("INFO", 800), Pb = new J("CONFIG", 700), Qb = new J("FINE", 500);
f = Lb.prototype;
f.getParent = function() {
  return this.Va;
};
f.cc = function(a) {
  this.Ba = a;
};
function Rb(a) {
  if (a.Ba) {
    return a.Ba;
  }
  if (a.Va) {
    return Rb(a.Va);
  }
  Pa("Root logger has no level set.");
  return null;
}
f.log = function(a, b, c) {
  if (a.value >= Rb(this).value) {
    for (fa(b) && (b = b()), a = this.pc(a, b, c), b = "log:" + a.tc, l.console && (l.console.timeStamp ? l.console.timeStamp(b) : l.console.markTimeline && l.console.markTimeline(b)), l.msWriteProfilerMark && l.msWriteProfilerMark(b), b = this;b;) {
      c = b;
      var d = a;
      if (c.Mb) {
        for (var e = 0, g = void 0;g = c.Mb[e];e++) {
          g(d);
        }
      }
      b = b.getParent();
    }
  }
};
f.pc = function(a, b, c) {
  var d = new Jb(a, String(b), this.uc);
  if (c) {
    d.Ib = c;
    var e;
    var g = arguments.callee.caller;
    try {
      var h;
      var k = ba("window.location.href");
      if (n(c)) {
        h = {message:c, name:"Unknown error", lineNumber:"Not available", fileName:k, stack:"Not available"};
      } else {
        var u, t, q = !1;
        try {
          u = c.lineNumber || c.Kc || "Not available";
        } catch (v) {
          u = "Not available", q = !0;
        }
        try {
          t = c.fileName || c.filename || c.sourceURL || l.$googDebugFname || k;
        } catch (mb) {
          t = "Not available", q = !0;
        }
        h = !q && c.lineNumber && c.fileName && c.stack && c.message && c.name ? c : {message:c.message || "Not available", name:c.name || "UnknownError", lineNumber:u, fileName:t, stack:c.stack || "Not available"};
      }
      e = "Message: " + la(h.message) + '\nUrl: <a href="view-source:' + h.fileName + '" target="_new">' + h.fileName + "</a>\nLine: " + h.lineNumber + "\n\nBrowser stack:\n" + la(h.stack + "-> ") + "[end]\n\nJS stack traversal:\n" + la(Fb(g) + "-> ");
    } catch (na) {
      e = "Exception trying to expose exception! You win, we lose. " + na;
    }
    d.Hb = e;
  }
  return d;
};
f.J = function(a, b) {
  this.log(Mb, a, b);
};
f.fa = function(a, b) {
  this.log(Nb, a, b);
};
f.info = function(a, b) {
  this.log(Ob, a, b);
};
var Sb = {}, Tb = null;
function Ub(a) {
  Tb || (Tb = new Lb(""), Sb[""] = Tb, Tb.cc(Pb));
  var b;
  if (!(b = Sb[a])) {
    b = new Lb(a);
    var c = a.lastIndexOf("."), d = a.substr(c + 1), c = Ub(a.substr(0, c));
    c.mb || (c.mb = {});
    c.mb[d] = b;
    b.Va = c;
    Sb[a] = b;
  }
  return b;
}
;function K(a, b) {
  a && a.log(Qb, b, void 0);
}
;function L() {
  this.r = Ub("goog.net.BrowserChannel");
}
function Vb(a, b, c, d) {
  a.info("XMLHTTP TEXT (" + b + "): " + Wb(a, c) + (d ? " " + d : ""));
}
L.prototype.debug = function(a) {
  this.info(a);
};
function Xb(a, b, c) {
  a.J((c || "Exception") + b);
}
L.prototype.info = function(a) {
  var b = this.r;
  b && b.info(a, void 0);
};
L.prototype.fa = function(a) {
  var b = this.r;
  b && b.fa(a, void 0);
};
L.prototype.J = function(a) {
  var b = this.r;
  b && b.J(a, void 0);
};
function Wb(a, b) {
  if (!b || b == Yb) {
    return b;
  }
  try {
    var c = yb(b);
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
    return zb(c);
  } catch (u) {
    return a.debug("Exception parsing expected JS array - probably was not JS"), b;
  }
}
;function Zb(a, b) {
  this.P = b ? yb : xb;
}
Zb.prototype.parse = function(a) {
  return this.P(a);
};
function M() {
  0 != $b && (ac[this[ga] || (this[ga] = ++ha)] = this);
}
var $b = 0, ac = {};
M.prototype.ob = !1;
M.prototype.Ma = function() {
  if (!this.ob && (this.ob = !0, this.u(), 0 != $b)) {
    var a = this[ga] || (this[ga] = ++ha);
    delete ac[a];
  }
};
M.prototype.u = function() {
  if (this.Sb) {
    for (;this.Sb.length;) {
      this.Sb.shift()();
    }
  }
};
var bc = "closure_listenable_" + (1E6 * Math.random() | 0);
function cc(a) {
  try {
    return!(!a || !a[bc]);
  } catch (b) {
    return!1;
  }
}
var dc = 0;
function ec(a, b, c, d, e) {
  this.ea = a;
  this.Xa = null;
  this.src = b;
  this.type = c;
  this.Ka = !!d;
  this.Ra = e;
  this.key = ++dc;
  this.na = this.Ja = !1;
}
function fc(a) {
  a.na = !0;
  a.ea = null;
  a.Xa = null;
  a.src = null;
  a.Ra = null;
}
;function N(a) {
  this.src = a;
  this.s = {};
  this.Ha = 0;
}
N.prototype.add = function(a, b, c, d, e) {
  var g = this.s[a];
  g || (g = this.s[a] = [], this.Ha++);
  var h = gc(g, b, d, e);
  -1 < h ? (a = g[h], c || (a.Ja = !1)) : (a = new ec(b, this.src, a, !!d, e), a.Ja = c, g.push(a));
  return a;
};
N.prototype.remove = function(a, b, c, d) {
  if (!(a in this.s)) {
    return!1;
  }
  var e = this.s[a];
  b = gc(e, b, c, d);
  return-1 < b ? (fc(e[b]), A.splice.call(e, b, 1), 0 == e.length && (delete this.s[a], this.Ha--), !0) : !1;
};
function hc(a, b) {
  var c = b.type;
  if (!(c in a.s)) {
    return!1;
  }
  var d = a.s[c], e = Xa(d, b), g;
  (g = 0 <= e) && A.splice.call(d, e, 1);
  g && (fc(b), 0 == a.s[c].length && (delete a.s[c], a.Ha--));
  return g;
}
N.prototype.$a = function(a) {
  var b = 0, c;
  for (c in this.s) {
    if (!a || c == a) {
      for (var d = this.s[c], e = 0;e < d.length;e++) {
        ++b, fc(d[e]);
      }
      delete this.s[c];
      this.Ha--;
    }
  }
  return b;
};
N.prototype.za = function(a, b, c, d) {
  a = this.s[a];
  var e = -1;
  a && (e = gc(a, b, c, d));
  return-1 < e ? a[e] : null;
};
function gc(a, b, c, d) {
  for (var e = 0;e < a.length;++e) {
    var g = a[e];
    if (!g.na && g.ea == b && g.Ka == !!c && g.Ra == d) {
      return e;
    }
  }
  return-1;
}
;var ic = !x || x && 9 <= Ma, jc = x && !z("9");
!y || z("528");
Ca && z("1.9b") || x && z("8") || Ba && z("9.5") || y && z("528");
Ca && !z("8") || x && z("9");
function O(a, b) {
  this.type = a;
  this.currentTarget = this.target = b;
  this.defaultPrevented = this.la = !1;
  this.ac = !0;
}
O.prototype.u = function() {
};
O.prototype.Ma = function() {
};
O.prototype.preventDefault = function() {
  this.defaultPrevented = !0;
  this.ac = !1;
};
function kc(a) {
  kc[" "](a);
  return a;
}
kc[" "] = ca;
function P(a, b) {
  O.call(this, a ? a.type : "");
  this.relatedTarget = this.currentTarget = this.target = null;
  this.charCode = this.keyCode = this.button = this.screenY = this.screenX = this.clientY = this.clientX = this.offsetY = this.offsetX = 0;
  this.metaKey = this.shiftKey = this.altKey = this.ctrlKey = !1;
  this.Gb = this.state = null;
  if (a) {
    var c = this.type = a.type;
    this.target = a.target || a.srcElement;
    this.currentTarget = b;
    var d = a.relatedTarget;
    if (d) {
      if (Ca) {
        var e;
        a: {
          try {
            kc(d.nodeName);
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
    this.offsetX = y || void 0 !== a.offsetX ? a.offsetX : a.layerX;
    this.offsetY = y || void 0 !== a.offsetY ? a.offsetY : a.layerY;
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
    this.Gb = a;
    a.defaultPrevented && this.preventDefault();
  }
}
s(P, O);
P.prototype.preventDefault = function() {
  P.pa.preventDefault.call(this);
  var a = this.Gb;
  if (a.preventDefault) {
    a.preventDefault();
  } else {
    if (a.returnValue = !1, jc) {
      try {
        if (a.ctrlKey || 112 <= a.keyCode && 123 >= a.keyCode) {
          a.keyCode = -1;
        }
      } catch (b) {
      }
    }
  }
};
P.prototype.u = function() {
};
var lc = "closure_lm_" + (1E6 * Math.random() | 0), Q = {}, mc = 0;
function nc(a, b, c, d, e) {
  if (m(b)) {
    for (var g = 0;g < b.length;g++) {
      nc(a, b[g], c, d, e);
    }
    return null;
  }
  c = oc(c);
  if (cc(a)) {
    a = a.Ua(b, c, d, e);
  } else {
    if (!b) {
      throw Error("Invalid event type");
    }
    var g = !!d, h = pc(a);
    h || (a[lc] = h = new N(a));
    c = h.add(b, c, !1, d, e);
    c.Xa || (d = qc(), c.Xa = d, d.src = a, d.ea = c, a.addEventListener ? a.addEventListener(b, d, g) : a.attachEvent(b in Q ? Q[b] : Q[b] = "on" + b, d), mc++);
    a = c;
  }
  return a;
}
function qc() {
  var a = rc, b = ic ? function(c) {
    return a.call(b.src, b.ea, c);
  } : function(c) {
    c = a.call(b.src, b.ea, c);
    if (!c) {
      return c;
    }
  };
  return b;
}
function sc(a, b, c, d, e) {
  if (m(b)) {
    for (var g = 0;g < b.length;g++) {
      sc(a, b[g], c, d, e);
    }
  } else {
    c = oc(c), cc(a) ? a.xb(b, c, d, e) : a && (a = pc(a)) && (b = a.za(b, c, !!d, e)) && tc(b);
  }
}
function tc(a) {
  if ("number" == typeof a || !a || a.na) {
    return!1;
  }
  var b = a.src;
  if (cc(b)) {
    return hc(b.V, a);
  }
  var c = a.type, d = a.Xa;
  b.removeEventListener ? b.removeEventListener(c, d, a.Ka) : b.detachEvent && b.detachEvent(c in Q ? Q[c] : Q[c] = "on" + c, d);
  mc--;
  (c = pc(b)) ? (hc(c, a), 0 == c.Ha && (c.src = null, b[lc] = null)) : fc(a);
  return!0;
}
function uc(a, b, c, d) {
  var e = 1;
  if (a = pc(a)) {
    if (b = a.s[b]) {
      for (b = bb(b), a = 0;a < b.length;a++) {
        var g = b[a];
        g && g.Ka == c && !g.na && (e &= !1 !== vc(g, d));
      }
    }
  }
  return Boolean(e);
}
function vc(a, b) {
  var c = a.ea, d = a.Ra || a.src;
  a.Ja && tc(a);
  return c.call(d, b);
}
function rc(a, b) {
  if (a.na) {
    return!0;
  }
  if (!ic) {
    var c = b || ba("window.event"), d = new P(c, this), e = !0;
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
      for (var g = a.type, k = c.length - 1;!d.la && 0 <= k;k--) {
        d.currentTarget = c[k], e &= uc(c[k], g, !0, d);
      }
      for (k = 0;!d.la && k < c.length;k++) {
        d.currentTarget = c[k], e &= uc(c[k], g, !1, d);
      }
    }
    return e;
  }
  return vc(a, new P(b, this));
}
function pc(a) {
  a = a[lc];
  return a instanceof N ? a : null;
}
var wc = "__closure_events_fn_" + (1E9 * Math.random() >>> 0);
function oc(a) {
  return fa(a) ? a : a[wc] || (a[wc] = function(b) {
    return a.handleEvent(b);
  });
}
;function R() {
  M.call(this);
  this.V = new N(this);
  this.ic = this;
}
s(R, M);
R.prototype[bc] = !0;
f = R.prototype;
f.vb = null;
f.addEventListener = function(a, b, c, d) {
  nc(this, a, b, c, d);
};
f.removeEventListener = function(a, b, c, d) {
  sc(this, a, b, c, d);
};
f.dispatchEvent = function(a) {
  var b, c = this.vb;
  if (c) {
    for (b = [];c;c = c.vb) {
      b.push(c);
    }
  }
  var c = this.ic, d = a.type || a;
  if (n(a)) {
    a = new O(a, c);
  } else {
    if (a instanceof O) {
      a.target = a.target || c;
    } else {
      var e = a;
      a = new O(d, c);
      Wa(a, e);
    }
  }
  var e = !0, g;
  if (b) {
    for (var h = b.length - 1;!a.la && 0 <= h;h--) {
      g = a.currentTarget = b[h], e = xc(g, d, !0, a) && e;
    }
  }
  a.la || (g = a.currentTarget = c, e = xc(g, d, !0, a) && e, a.la || (e = xc(g, d, !1, a) && e));
  if (b) {
    for (h = 0;!a.la && h < b.length;h++) {
      g = a.currentTarget = b[h], e = xc(g, d, !1, a) && e;
    }
  }
  return e;
};
f.u = function() {
  R.pa.u.call(this);
  this.V && this.V.$a(void 0);
  this.vb = null;
};
f.Ua = function(a, b, c, d) {
  return this.V.add(String(a), b, !1, c, d);
};
f.xb = function(a, b, c, d) {
  return this.V.remove(String(a), b, c, d);
};
function xc(a, b, c, d) {
  b = a.V.s[String(b)];
  if (!b) {
    return!0;
  }
  b = bb(b);
  for (var e = !0, g = 0;g < b.length;++g) {
    var h = b[g];
    if (h && !h.na && h.Ka == c) {
      var k = h.ea, u = h.Ra || h.src;
      h.Ja && hc(a.V, h);
      e = !1 !== k.call(u, d) && e;
    }
  }
  return e && !1 != d.ac;
}
f.za = function(a, b, c, d) {
  return this.V.za(String(a), b, c, d);
};
function yc(a, b) {
  R.call(this);
  this.da = a || 1;
  this.ra = b || zc;
  this.lb = p(this.Ic, this);
  this.ub = r();
}
s(yc, R);
yc.prototype.xa = !1;
var zc = l;
f = yc.prototype;
f.l = null;
f.setInterval = function(a) {
  this.da = a;
  this.l && this.xa ? (this.stop(), this.start()) : this.l && this.stop();
};
f.Ic = function() {
  if (this.xa) {
    var a = r() - this.ub;
    0 < a && a < 0.8 * this.da ? this.l = this.ra.setTimeout(this.lb, this.da - a) : (this.l && (this.ra.clearTimeout(this.l), this.l = null), this.dispatchEvent(Ac), this.xa && (this.l = this.ra.setTimeout(this.lb, this.da), this.ub = r()));
  }
};
f.start = function() {
  this.xa = !0;
  this.l || (this.l = this.ra.setTimeout(this.lb, this.da), this.ub = r());
};
f.stop = function() {
  this.xa = !1;
  this.l && (this.ra.clearTimeout(this.l), this.l = null);
};
f.u = function() {
  yc.pa.u.call(this);
  this.stop();
  delete this.ra;
};
var Ac = "tick";
function Bc(a, b, c) {
  if (fa(a)) {
    c && (a = p(a, c));
  } else {
    if (a && "function" == typeof a.handleEvent) {
      a = p(a.handleEvent, a);
    } else {
      throw Error("Invalid listener argument");
    }
  }
  return 2147483647 < b ? -1 : zc.setTimeout(a, b || 0);
}
;function Cc() {
}
Cc.prototype.Cb = null;
function Dc(a) {
  var b;
  (b = a.Cb) || (b = {}, Ec(a) && (b[0] = !0, b[1] = !0), b = a.Cb = b);
  return b;
}
;var Fc;
function Gc() {
}
s(Gc, Cc);
function Hc(a) {
  return(a = Ec(a)) ? new ActiveXObject(a) : new XMLHttpRequest;
}
function Ec(a) {
  if (!a.Nb && "undefined" == typeof XMLHttpRequest && "undefined" != typeof ActiveXObject) {
    for (var b = ["MSXML2.XMLHTTP.6.0", "MSXML2.XMLHTTP.3.0", "MSXML2.XMLHTTP", "Microsoft.XMLHTTP"], c = 0;c < b.length;c++) {
      var d = b[c];
      try {
        return new ActiveXObject(d), a.Nb = d;
      } catch (e) {
      }
    }
    throw Error("Could not create ActiveXObject. ActiveX might be disabled, or MSXML might not be installed");
  }
  return a.Nb;
}
Fc = new Gc;
function S(a) {
  R.call(this);
  this.headers = new cb;
  this.jb = a || null;
  this.S = !1;
  this.ib = this.f = null;
  this.Pb = this.Ta = "";
  this.ja = 0;
  this.q = "";
  this.ca = this.sb = this.Sa = this.pb = !1;
  this.Ga = 0;
  this.fb = null;
  this.$b = Ic;
  this.gb = this.gc = !1;
}
s(S, R);
var Ic = "";
S.prototype.r = Ub("goog.net.XhrIo");
var Jc = /^https?$/i, Kc = ["POST", "PUT"];
f = S.prototype;
f.send = function(a, b, c, d) {
  if (this.f) {
    throw Error("[goog.net.XhrIo] Object is active with another request=" + this.Ta + "; newUri=" + a);
  }
  b = b ? b.toUpperCase() : "GET";
  this.Ta = a;
  this.q = "";
  this.ja = 0;
  this.Pb = b;
  this.pb = !1;
  this.S = !0;
  this.f = this.Eb();
  this.ib = this.jb ? Dc(this.jb) : Dc(Fc);
  this.f.onreadystatechange = p(this.Tb, this);
  try {
    K(this.r, T(this, "Opening Xhr")), this.sb = !0, this.f.open(b, String(a), !0), this.sb = !1;
  } catch (e) {
    K(this.r, T(this, "Error opening Xhr: " + e.message));
    Lc(this, e);
    return;
  }
  a = c || "";
  var g = this.headers.n();
  d && C(d, function(a, b) {
    g.set(b, a);
  });
  d = Za(g.ba());
  c = l.FormData && a instanceof l.FormData;
  !(0 <= Xa(Kc, b)) || d || c || g.set("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
  C(g, function(a, b) {
    this.f.setRequestHeader(b, a);
  }, this);
  this.$b && (this.f.responseType = this.$b);
  "withCredentials" in this.f && (this.f.withCredentials = this.gc);
  try {
    Mc(this), 0 < this.Ga && (this.gb = Nc(this.f), K(this.r, T(this, "Will abort after " + this.Ga + "ms if incomplete, xhr2 " + this.gb)), this.gb ? (this.f.timeout = this.Ga, this.f.ontimeout = p(this.qa, this)) : this.fb = Bc(this.qa, this.Ga, this)), K(this.r, T(this, "Sending request")), this.Sa = !0, this.f.send(a), this.Sa = !1;
  } catch (h) {
    K(this.r, T(this, "Send error: " + h.message)), Lc(this, h);
  }
};
function Nc(a) {
  return x && z(9) && "number" == typeof a.timeout && void 0 !== a.ontimeout;
}
function $a(a) {
  return "content-type" == a.toLowerCase();
}
f.Eb = function() {
  return this.jb ? Hc(this.jb) : Hc(Fc);
};
f.qa = function() {
  "undefined" != typeof aa && this.f && (this.q = "Timed out after " + this.Ga + "ms, aborting", this.ja = 8, K(this.r, T(this, this.q)), this.dispatchEvent("timeout"), this.abort(8));
};
function Lc(a, b) {
  a.S = !1;
  a.f && (a.ca = !0, a.f.abort(), a.ca = !1);
  a.q = b;
  a.ja = 5;
  Oc(a);
  Pc(a);
}
function Oc(a) {
  a.pb || (a.pb = !0, a.dispatchEvent("complete"), a.dispatchEvent("error"));
}
f.abort = function(a) {
  this.f && this.S && (K(this.r, T(this, "Aborting")), this.S = !1, this.ca = !0, this.f.abort(), this.ca = !1, this.ja = a || 7, this.dispatchEvent("complete"), this.dispatchEvent("abort"), Pc(this));
};
f.u = function() {
  this.f && (this.S && (this.S = !1, this.ca = !0, this.f.abort(), this.ca = !1), Pc(this, !0));
  S.pa.u.call(this);
};
f.Tb = function() {
  this.ob || (this.sb || this.Sa || this.ca ? Qc(this) : this.xc());
};
f.xc = function() {
  Qc(this);
};
function Qc(a) {
  if (a.S && "undefined" != typeof aa) {
    if (a.ib[1] && 4 == U(a) && 2 == Rc(a)) {
      K(a.r, T(a, "Local request error detected and ignored"));
    } else {
      if (a.Sa && 4 == U(a)) {
        Bc(a.Tb, 0, a);
      } else {
        if (a.dispatchEvent("readystatechange"), 4 == U(a)) {
          K(a.r, T(a, "Request complete"));
          a.S = !1;
          try {
            var b = Rc(a), c, d;
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
                var g = Ra(String(a.Ta))[1] || null;
                if (!g && self.location) {
                  var h = self.location.protocol, g = h.substr(0, h.length - 1)
                }
                e = !Jc.test(g ? g.toLowerCase() : "");
              }
              c = e;
            }
            if (c) {
              a.dispatchEvent("complete"), a.dispatchEvent("success");
            } else {
              a.ja = 6;
              var k;
              try {
                k = 2 < U(a) ? a.f.statusText : "";
              } catch (u) {
                K(a.r, "Can not get status: " + u.message), k = "";
              }
              a.q = k + " [" + Rc(a) + "]";
              Oc(a);
            }
          } finally {
            Pc(a);
          }
        }
      }
    }
  }
}
function Pc(a, b) {
  if (a.f) {
    Mc(a);
    var c = a.f, d = a.ib[0] ? ca : null;
    a.f = null;
    a.ib = null;
    b || a.dispatchEvent("ready");
    try {
      c.onreadystatechange = d;
    } catch (e) {
      (c = a.r) && c.J("Problem encountered resetting onreadystatechange: " + e.message, void 0);
    }
  }
}
function Mc(a) {
  a.f && a.gb && (a.f.ontimeout = null);
  "number" == typeof a.fb && (zc.clearTimeout(a.fb), a.fb = null);
}
f.isActive = function() {
  return!!this.f;
};
function U(a) {
  return a.f ? a.f.readyState : 0;
}
function Rc(a) {
  try {
    return 2 < U(a) ? a.f.status : -1;
  } catch (b) {
    return-1;
  }
}
function Sc(a) {
  try {
    return a.f ? a.f.responseText : "";
  } catch (b) {
    return K(a.r, "Can not get responseText: " + b.message), "";
  }
}
f.Lb = function() {
  return n(this.q) ? this.q : String(this.q);
};
function T(a, b) {
  return b + " [" + a.Pb + " " + a.Ta + " " + Rc(a) + "]";
}
;function Tc() {
  this.Zb = r();
}
new Tc;
Tc.prototype.set = function(a) {
  this.Zb = a;
};
Tc.prototype.reset = function() {
  this.set(r());
};
Tc.prototype.get = function() {
  return this.Zb;
};
function Uc(a) {
  M.call(this);
  this.e = a;
  this.j = {};
}
s(Uc, M);
var Vc = [];
f = Uc.prototype;
f.Ua = function(a, b, c, d) {
  m(b) || (Vc[0] = b, b = Vc);
  for (var e = 0;e < b.length;e++) {
    var g = nc(a, b[e], c || this.handleEvent, d || !1, this.e || this);
    if (!g) {
      break;
    }
    this.j[g.key] = g;
  }
  return this;
};
f.xb = function(a, b, c, d, e) {
  if (m(b)) {
    for (var g = 0;g < b.length;g++) {
      this.xb(a, b[g], c, d, e);
    }
  } else {
    c = c || this.handleEvent, e = e || this.e || this, c = oc(c), d = !!d, b = cc(a) ? a.za(b, c, d, e) : a ? (a = pc(a)) ? a.za(b, c, d, e) : null : null, b && (tc(b), delete this.j[b.key]);
  }
  return this;
};
f.$a = function() {
  var a = this.j, b = tc, c;
  for (c in a) {
    b.call(void 0, a[c], c, a);
  }
  this.j = {};
};
f.u = function() {
  Uc.pa.u.call(this);
  this.$a();
};
f.handleEvent = function() {
  throw Error("EventHandler.handleEvent not implemented");
};
function Wc(a, b, c) {
  M.call(this);
  this.sc = a;
  this.da = b;
  this.e = c;
  this.mc = p(this.yc, this);
}
s(Wc, M);
f = Wc.prototype;
f.bb = !1;
f.Yb = 0;
f.l = null;
f.stop = function() {
  this.l && (zc.clearTimeout(this.l), this.l = null, this.bb = !1);
};
f.u = function() {
  Wc.pa.u.call(this);
  this.stop();
};
f.yc = function() {
  this.l = null;
  this.bb && !this.Yb && (this.bb = !1, Xc(this));
};
function Xc(a) {
  a.l = Bc(a.mc, a.da);
  a.sc.call(a.e);
}
;function V(a, b, c, d, e) {
  this.b = a;
  this.a = b;
  this.Y = c;
  this.B = d;
  this.Fa = e || 1;
  this.qa = Yc;
  this.qb = new Uc(this);
  this.Wa = new yc;
  this.Wa.setInterval(Zc);
}
f = V.prototype;
f.v = null;
f.F = !1;
f.ua = null;
f.zb = null;
f.Ea = null;
f.sa = null;
f.T = null;
f.w = null;
f.W = null;
f.k = null;
f.Ia = 0;
f.K = null;
f.ta = null;
f.q = null;
f.g = -1;
f.bc = !0;
f.Z = !1;
f.ma = 0;
f.Ya = null;
var Yc = 45E3, Zc = 250;
function $c(a, b) {
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
var ad = {}, cd = {};
function dd() {
  return!x || x && 10 <= Ma;
}
f = V.prototype;
f.X = function(a) {
  this.v = a;
};
f.setTimeout = function(a) {
  this.qa = a;
};
f.ec = function(a) {
  this.ma = a;
};
function ed(a, b, c) {
  a.sa = 1;
  a.T = G(b.n());
  a.W = c;
  a.Fb = !0;
  fd(a, null);
}
function gd(a, b, c, d, e) {
  a.sa = 1;
  a.T = G(b.n());
  a.W = null;
  a.Fb = c;
  e && (a.bc = !1);
  fd(a, d);
}
function fd(a, b) {
  a.Ea = r();
  hd(a);
  a.w = a.T.n();
  sb(a.w, "t", a.Fa);
  a.Ia = 0;
  a.k = a.b.La(a.b.cb() ? b : null);
  0 < a.ma && (a.Ya = new Wc(p(a.hc, a, a.k), a.ma));
  a.qb.Ua(a.k, "readystatechange", a.Ec);
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
  a.W ? (a.ta = "POST", c["Content-Type"] = "application/x-www-form-urlencoded", a.k.send(a.w, a.ta, a.W, c)) : (a.ta = "GET", a.bc && !y && (c.Connection = "close"), a.k.send(a.w, a.ta, null, c));
  a.b.H(id);
  if (d = a.W) {
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
  a.a.info("XMLHTTP REQ (" + a.B + ") [attempt " + a.Fa + "]: " + a.ta + "\n" + a.w + "\n" + c);
}
f.Ec = function(a) {
  a = a.target;
  var b = this.Ya;
  b && 3 == U(a) ? (this.a.debug("Throttling readystatechange."), b.l || b.Yb ? b.bb = !0 : Xc(b)) : this.hc(a);
};
f.hc = function(a) {
  try {
    if (a == this.k) {
      a: {
        var b = U(this.k), c = this.k.ja, d = Rc(this.k);
        if (!dd() || y && !z("420+")) {
          if (4 > b) {
            break a;
          }
        } else {
          if (3 > b || 3 == b && !Ba && !Sc(this.k)) {
            break a;
          }
        }
        this.Z || 4 != b || 7 == c || (8 == c || 0 >= d ? this.b.H(jd) : this.b.H(kd));
        ld(this);
        var e = Rc(this.k);
        this.g = e;
        var g = Sc(this.k);
        g || this.a.debug("No response text for uri " + this.w + " status " + e);
        this.F = 200 == e;
        this.a.info("XMLHTTP RESP (" + this.B + ") [ attempt " + this.Fa + "]: " + this.ta + "\n" + this.w + "\n" + b + " " + e);
        this.F ? (4 == b && W(this), this.Fb ? (md(this, b, g), Ba && this.F && 3 == b && (this.qb.Ua(this.Wa, Ac, this.Dc), this.Wa.start())) : (Vb(this.a, this.B, g, null), nd(this, g)), this.F && !this.Z && (4 == b ? this.b.ka(this) : (this.F = !1, hd(this)))) : (400 == e && 0 < g.indexOf("Unknown SID") ? (this.q = 3, X(), this.a.fa("XMLHTTP Unknown SID (" + this.B + ")")) : (this.q = 0, X(), this.a.fa("XMLHTTP Bad status " + e + " (" + this.B + ")")), W(this), od(this));
      }
    } else {
      this.a.fa("Called back with an unexpected xmlhttp");
    }
  } catch (h) {
    this.a.debug("Failed call to OnXmlHttpReadyStateChanged_"), this.k && Sc(this.k) ? Xb(this.a, h, "ResponseText: " + Sc(this.k)) : Xb(this.a, h, "No response text");
  } finally {
  }
};
function md(a, b, c) {
  for (var d = !0;!a.Z && a.Ia < c.length;) {
    var e = pd(a, c);
    if (e == cd) {
      4 == b && (a.q = 4, X(), d = !1);
      Vb(a.a, a.B, null, "[Incomplete Response]");
      break;
    } else {
      if (e == ad) {
        a.q = 4;
        X();
        Vb(a.a, a.B, c, "[Invalid Chunk]");
        d = !1;
        break;
      } else {
        Vb(a.a, a.B, e, null), nd(a, e);
      }
    }
  }
  4 == b && 0 == c.length && (a.q = 1, X(), d = !1);
  a.F = a.F && d;
  d || (Vb(a.a, a.B, c, "[Invalid Chunked Response]"), W(a), od(a));
}
f.Dc = function() {
  var a = U(this.k), b = Sc(this.k);
  this.Ia < b.length && (ld(this), md(this, a, b), this.F && 4 != a && hd(this));
};
function pd(a, b) {
  var c = a.Ia, d = b.indexOf("\n", c);
  if (-1 == d) {
    return cd;
  }
  c = Number(b.substring(c, d));
  if (isNaN(c)) {
    return ad;
  }
  d += 1;
  if (d + c > b.length) {
    return cd;
  }
  var e = b.substr(d, c);
  a.Ia = d + c;
  return e;
}
function qd(a, b) {
  a.Ea = r();
  hd(a);
  var c = b ? window.location.hostname : "";
  a.w = a.T.n();
  F(a.w, "DOMAIN", c);
  F(a.w, "t", a.Fa);
  try {
    a.K = new ActiveXObject("htmlfile");
  } catch (d) {
    a.a.J("ActiveX blocked");
    W(a);
    a.q = 7;
    X();
    od(a);
    return;
  }
  var e = "<html><body>";
  b && (e += '<script>document.domain="' + c + '"\x3c/script>');
  e += "</body></html>";
  a.K.open();
  a.K.write(e);
  a.K.close();
  a.K.parentWindow.m = p(a.Bc, a);
  a.K.parentWindow.d = p(a.Xb, a, !0);
  a.K.parentWindow.rpcClose = p(a.Xb, a, !1);
  c = a.K.createElement("div");
  a.K.parentWindow.document.body.appendChild(c);
  c.innerHTML = '<iframe src="' + a.w + '"></iframe>';
  a.a.info("TRIDENT REQ (" + a.B + ") [ attempt " + a.Fa + "]: GET\n" + a.w);
  a.b.H(id);
}
f.Bc = function(a) {
  Y(p(this.Ac, this, a), 0);
};
f.Ac = function(a) {
  if (!this.Z) {
    var b = this.a;
    b.info("TRIDENT TEXT (" + this.B + "): " + Wb(b, a));
    ld(this);
    nd(this, a);
    hd(this);
  }
};
f.Xb = function(a) {
  Y(p(this.zc, this, a), 0);
};
f.zc = function(a) {
  this.Z || (this.a.info("TRIDENT TEXT (" + this.B + "): " + a ? "success" : "failure"), W(this), this.F = a, this.b.ka(this), this.b.H(rd));
};
f.qc = function() {
  ld(this);
  this.b.ka(this);
};
f.cancel = function() {
  this.Z = !0;
  W(this);
};
function hd(a) {
  a.zb = r() + a.qa;
  sd(a, a.qa);
}
function sd(a, b) {
  if (null != a.ua) {
    throw Error("WatchDog timer not null");
  }
  a.ua = Y(p(a.Cc, a), b);
}
function ld(a) {
  a.ua && (l.clearTimeout(a.ua), a.ua = null);
}
f.Cc = function() {
  this.ua = null;
  var a = r();
  0 <= a - this.zb ? (this.F && this.a.J("Received watchdog timeout even though request loaded successfully"), this.a.info("TIMEOUT: " + this.w), 2 != this.sa && this.b.H(jd), W(this), this.q = 2, X(), od(this)) : (this.a.fa("WatchDog timer called too early"), sd(this, this.zb - a));
};
function od(a) {
  a.b.Ob() || a.Z || a.b.ka(a);
}
function W(a) {
  ld(a);
  var b = a.Ya;
  b && "function" == typeof b.Ma && b.Ma();
  a.Ya = null;
  a.Wa.stop();
  a.qb.$a();
  a.k && (b = a.k, a.k = null, b.abort(), b.Ma());
  a.K && (a.K = null);
}
f.Lb = function() {
  return this.q;
};
function nd(a, b) {
  try {
    a.b.Ub(a, b), a.b.H(rd);
  } catch (c) {
    Xb(a.a, c, "Error in httprequest callback");
  }
}
;function td(a, b, c, d, e) {
  (new L).debug("TestLoadImageWithRetries: " + e);
  if (0 == d) {
    c(!1);
  } else {
    var g = e || 0;
    d--;
    ud(a, b, function(e) {
      e ? c(!0) : l.setTimeout(function() {
        td(a, b, c, d, g);
      }, g);
    });
  }
}
function ud(a, b, c) {
  function d(a, b) {
    return function() {
      try {
        e.debug("TestLoadImage: " + b), g.onload = null, g.onerror = null, g.onabort = null, g.ontimeout = null, l.clearTimeout(h), c(a);
      } catch (d) {
        Xb(e, d);
      }
    };
  }
  var e = new L;
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
;function vd(a, b) {
  this.b = a;
  this.a = b;
  this.P = new Zb(0, !0);
}
f = vd.prototype;
f.v = null;
f.A = null;
f.Za = !1;
f.fc = null;
f.Oa = null;
f.tb = null;
f.I = null;
f.c = null;
f.g = -1;
f.L = null;
f.va = null;
f.X = function(a) {
  this.v = a;
};
f.dc = function(a) {
  this.P = a;
};
f.nb = function(a) {
  this.I = a;
  a = wd(this.b, this.I);
  X();
  this.fc = r();
  var b = this.b.Jb;
  null != b ? (this.L = this.b.correctHostPrefix(b[0]), (this.va = b[1]) ? (this.c = 1, xd(this)) : (this.c = 2, yd(this))) : (sb(a, "MODE", "init"), this.A = new V(this, this.a, void 0, void 0, void 0), this.A.X(this.v), gd(this.A, a, !1, null, !0), this.c = 0);
};
function xd(a) {
  var b = zd(a.b, a.va, "/mail/images/cleardot.gif");
  G(b);
  td(b.toString(), 5E3, p(a.nc, a), 3, 2E3);
  a.H(id);
}
f.nc = function(a) {
  if (a) {
    this.c = 2, yd(this);
  } else {
    X();
    var b = this.b;
    b.a.debug("Test Connection Blocked");
    b.g = b.U.g;
    Z(b, 9);
  }
  a && this.H(kd);
};
function yd(a) {
  a.a.debug("TestConnection: starting stage 2");
  var b = a.b.Gc;
  if (null != b) {
    a.a.debug("TestConnection: skipping stage 2, precomputed result is " + b ? "Buffered" : "Unbuffered"), X(), b ? (X(), Ad(a.b, a, !1)) : (X(), Ad(a.b, a, !0));
  } else {
    if (a.A = new V(a, a.a, void 0, void 0, void 0), a.A.X(a.v), b = Bd(a.b, a.L, a.I), X(), dd()) {
      sb(b, "TYPE", "xmlhttp"), gd(a.A, b, !1, a.L, !1);
    } else {
      sb(b, "TYPE", "html");
      var c = a.A;
      a = Boolean(a.L);
      c.sa = 3;
      c.T = G(b.n());
      qd(c, a);
    }
  }
}
f.La = function(a) {
  return this.b.La(a);
};
f.abort = function() {
  this.A && (this.A.cancel(), this.A = null);
  this.g = -1;
};
f.Ob = function() {
  return!1;
};
f.Ub = function(a, b) {
  this.g = a.g;
  if (0 == this.c) {
    if (this.a.debug("TestConnection: Got data for stage 1"), b) {
      try {
        var c = this.P.parse(b);
      } catch (d) {
        Xb(this.a, d);
        Cd(this.b, this);
        return;
      }
      this.L = this.b.correctHostPrefix(c[0]);
      this.va = c[1];
    } else {
      this.a.debug("TestConnection: Null responseText"), Cd(this.b, this);
    }
  } else {
    if (2 == this.c) {
      if (this.Za) {
        X(), this.tb = r();
      } else {
        if ("11111" == b) {
          if (X(), this.Za = !0, this.Oa = r(), c = this.Oa - this.fc, dd() || 500 > c) {
            this.g = 200, this.A.cancel(), this.a.debug("Test connection succeeded; using streaming connection"), X(), Ad(this.b, this, !0);
          }
        } else {
          X(), this.Oa = this.tb = r(), this.Za = !1;
        }
      }
    }
  }
};
f.ka = function() {
  this.g = this.A.g;
  if (!this.A.F) {
    this.a.debug("TestConnection: request failed, in state " + this.c), 0 == this.c ? X() : 2 == this.c && X(), Cd(this.b, this);
  } else {
    if (0 == this.c) {
      this.a.debug("TestConnection: request complete for initial check"), this.va ? (this.c = 1, xd(this)) : (this.c = 2, yd(this));
    } else {
      if (2 == this.c) {
        this.a.debug("TestConnection: request complete for stage 2");
        var a = !1;
        (a = dd() ? this.Za : 200 > this.tb - this.Oa ? !1 : !0) ? (this.a.debug("Test connection succeeded; using streaming connection"), X(), Ad(this.b, this, !0)) : (this.a.debug("Test connection failed; not using streaming"), X(), Ad(this.b, this, !1));
      }
    }
  }
};
f.cb = function() {
  return this.b.cb();
};
f.isActive = function() {
  return this.b.isActive();
};
f.H = function(a) {
  this.b.H(a);
};
function Dd(a, b, c) {
  this.Db = a || null;
  this.c = Ed;
  this.t = [];
  this.Q = [];
  this.a = new L;
  this.P = new Zb(0, !0);
  this.Jb = b || null;
  this.Gc = null != c ? c : null;
}
function Fd(a, b) {
  this.Rb = a;
  this.map = b;
}
f = Dd.prototype;
f.v = null;
f.ya = null;
f.p = null;
f.i = null;
f.I = null;
f.Pa = null;
f.Bb = null;
f.L = null;
f.kc = !0;
f.Ca = 0;
f.vc = 0;
f.Na = !1;
f.e = null;
f.G = null;
f.M = null;
f.$ = null;
f.U = null;
f.yb = null;
f.jc = !0;
f.Aa = -1;
f.Qb = -1;
f.g = -1;
f.aa = 0;
f.ga = 0;
f.lc = 5E3;
f.Fc = 1E4;
f.rb = 2;
f.Kb = 2E4;
f.ma = 0;
f.eb = !1;
f.ha = 8;
var Ed = 1, Gd = new R;
function Hd(a) {
  O.call(this, "statevent", a);
}
s(Hd, O);
function Id(a, b) {
  O.call(this, "timingevent", a);
  this.size = b;
}
s(Id, O);
var id = 1, kd = 2, jd = 3, rd = 4;
function Jd(a) {
  O.call(this, "serverreachability", a);
}
s(Jd, O);
var Yb = "y2f%";
f = Dd.prototype;
f.nb = function(a, b, c, d, e) {
  this.a.debug("connect()");
  X();
  this.I = b;
  this.ya = c || {};
  d && void 0 !== e && (this.ya.OSID = d, this.ya.OAID = e);
  this.a.debug("connectTest_()");
  Kd(this) && (this.U = new vd(this, this.a), this.U.X(this.v), this.U.dc(this.P), this.U.nb(a));
};
f.disconnect = function() {
  this.a.debug("disconnect()");
  Ld(this);
  if (3 == this.c) {
    var a = this.Ca++, b = this.Pa.n();
    F(b, "SID", this.Y);
    F(b, "RID", a);
    F(b, "TYPE", "terminate");
    Md(this, b);
    a = new V(this, this.a, this.Y, a, void 0);
    a.sa = 2;
    a.T = G(b.n());
    b = new Image;
    b.src = a.T;
    b.onload = b.onerror = p(a.qc, a);
    a.Ea = r();
    hd(a);
  }
  Nd(this);
};
function Ld(a) {
  a.U && (a.U.abort(), a.U = null);
  a.i && (a.i.cancel(), a.i = null);
  a.M && (l.clearTimeout(a.M), a.M = null);
  Od(a);
  a.p && (a.p.cancel(), a.p = null);
  a.G && (l.clearTimeout(a.G), a.G = null);
}
f.X = function(a) {
  this.v = a;
};
f.ec = function(a) {
  this.ma = a;
};
f.Ob = function() {
  return 0 == this.c;
};
f.dc = function(a) {
  this.P = a;
};
function Pd(a) {
  a.p || a.G || (a.G = Y(p(a.Wb, a), 0), a.aa = 0);
}
f.Wb = function(a) {
  this.G = null;
  this.a.debug("startForwardChannel_");
  if (Kd(this)) {
    if (this.c == Ed) {
      if (a) {
        this.a.J("Not supposed to retry the open");
      } else {
        this.a.debug("open_()");
        this.Ca = Math.floor(1E5 * Math.random());
        a = this.Ca++;
        var b = new V(this, this.a, "", a, void 0);
        b.X(this.v);
        var c = Qd(this), d = this.Pa.n();
        F(d, "RID", a);
        this.Db && F(d, "CVER", this.Db);
        Md(this, d);
        ed(b, d, c);
        this.p = b;
        this.c = 2;
      }
    } else {
      3 == this.c && (a ? Rd(this, a) : 0 == this.t.length ? this.a.debug("startForwardChannel_ returned: nothing to send") : this.p ? this.a.J("startForwardChannel_ returned: connection already in progress") : (Rd(this), this.a.debug("startForwardChannel_ finished, sent request")));
    }
  }
};
function Rd(a, b) {
  var c, d;
  b ? 6 < a.ha ? (a.t = a.Q.concat(a.t), a.Q.length = 0, c = a.Ca - 1, d = Qd(a)) : (c = b.B, d = b.W) : (c = a.Ca++, d = Qd(a));
  var e = a.Pa.n();
  F(e, "SID", a.Y);
  F(e, "RID", c);
  F(e, "AID", a.Aa);
  Md(a, e);
  c = new V(a, a.a, a.Y, c, a.aa + 1);
  c.X(a.v);
  c.setTimeout(Math.round(0.5 * a.Kb) + Math.round(0.5 * a.Kb * Math.random()));
  a.p = c;
  ed(c, e, d);
}
function Md(a, b) {
  if (a.e) {
    var c = a.e.getAdditionalParams(a);
    c && C(c, function(a, c) {
      F(b, c, a);
    });
  }
}
function Qd(a) {
  var b = Math.min(a.t.length, 1E3), c = ["count=" + b], d;
  6 < a.ha && 0 < b ? (d = a.t[0].Rb, c.push("ofs=" + d)) : d = 0;
  for (var e = 0;e < b;e++) {
    var g = a.t[e].Rb, h = a.t[e].map, g = 6 >= a.ha ? e : g - d;
    try {
      C(h, function(a, b) {
        c.push("req" + g + "_" + b + "=" + encodeURIComponent(a));
      });
    } catch (k) {
      c.push("req" + g + "_type=" + encodeURIComponent("_badmap")), a.e && a.e.badMapError(a, h);
    }
  }
  a.Q = a.Q.concat(a.t.splice(0, b));
  return c.join("&");
}
function Sd(a) {
  a.i || a.M || (a.Ab = 1, a.M = Y(p(a.Vb, a), 0), a.ga = 0);
}
function Td(a) {
  if (a.i || a.M) {
    return a.a.J("Request already in progress"), !1;
  }
  if (3 <= a.ga) {
    return!1;
  }
  a.a.debug("Going to retry GET");
  a.Ab++;
  a.M = Y(p(a.Vb, a), Ud(a, a.ga));
  a.ga++;
  return!0;
}
f.Vb = function() {
  this.M = null;
  if (Kd(this)) {
    this.a.debug("Creating new HttpRequest");
    this.i = new V(this, this.a, this.Y, "rpc", this.Ab);
    this.i.X(this.v);
    this.i.ec(this.ma);
    var a = this.Bb.n();
    F(a, "RID", "rpc");
    F(a, "SID", this.Y);
    F(a, "CI", this.yb ? "0" : "1");
    F(a, "AID", this.Aa);
    Md(this, a);
    if (dd()) {
      F(a, "TYPE", "xmlhttp"), gd(this.i, a, !0, this.L, !1);
    } else {
      F(a, "TYPE", "html");
      var b = this.i, c = Boolean(this.L);
      b.sa = 3;
      b.T = G(a.n());
      qd(b, c);
    }
    this.a.debug("New Request created");
  }
};
function Kd(a) {
  if (a.e) {
    var b = a.e.okToMakeRequest(a);
    if (0 != b) {
      return a.a.debug("Handler returned error code from okToMakeRequest"), Z(a, b), !1;
    }
  }
  return!0;
}
function Ad(a, b, c) {
  a.a.debug("Test Connection Finished");
  a.yb = a.jc && c;
  a.g = b.g;
  a.a.debug("connectChannel_()");
  a.oc(Ed, 0);
  a.Pa = wd(a, a.I);
  Pd(a);
}
function Cd(a, b) {
  a.a.debug("Test Connection Failed");
  a.g = b.g;
  Z(a, 2);
}
f.Ub = function(a, b) {
  if (0 != this.c && (this.i == a || this.p == a)) {
    if (this.g = a.g, this.p == a && 3 == this.c) {
      if (7 < this.ha) {
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
                  if (this.i.Ea + 3E3 < this.p.Ea) {
                    Od(this), this.i.cancel(), this.i = null;
                  } else {
                    break a;
                  }
                } else {
                  this.a.fa("We do not have a BackChannel established");
                }
                Td(this);
                X();
              }
            }
          } else {
            this.Qb = e[1], c = this.Qb - this.Aa, 0 < c && (e = e[2], this.a.debug(e + " bytes (in " + c + " arrays) are outstanding on the BackChannel"), 37500 > e && this.yb && 0 == this.ga && !this.$ && (this.$ = Y(p(this.wc, this), 6E3)));
          }
        } else {
          this.a.debug("Bad POST response data returned"), Z(this, 11);
        }
      } else {
        b != Yb && (this.a.debug("Bad data returned - missing/invald magic cookie"), Z(this, 11));
      }
    } else {
      if (this.i == a && Od(this), !/^[\s\xa0]*$/.test(b)) {
        c = this.P.parse(b);
        for (var e = this.e && this.e.channelHandleMultipleArrays ? [] : null, g = 0;g < c.length;g++) {
          var h = c[g];
          this.Aa = h[0];
          h = h[1];
          2 == this.c ? "c" == h[0] ? (this.Y = h[1], this.L = this.correctHostPrefix(h[2]), h = h[3], this.ha = null != h ? h : 6, this.c = 3, this.e && this.e.channelOpened(this), this.Bb = Bd(this, this.L, this.I), Sd(this)) : "stop" == h[0] && Z(this, 7) : 3 == this.c && ("stop" == h[0] ? (e && 0 != e.length && (this.e.channelHandleMultipleArrays(this, e), e.length = 0), Z(this, 7)) : "noop" != h[0] && (e ? e.push(h) : this.e && this.e.channelHandleArray(this, h)), this.ga = 0);
        }
        e && 0 != e.length && this.e.channelHandleMultipleArrays(this, e);
      }
    }
  }
};
f.correctHostPrefix = function(a) {
  return this.kc ? this.e ? this.e.correctHostPrefix(a) : a : null;
};
f.wc = function() {
  null != this.$ && (this.$ = null, this.i.cancel(), this.i = null, Td(this), X());
};
function Od(a) {
  null != a.$ && (l.clearTimeout(a.$), a.$ = null);
}
f.ka = function(a) {
  this.a.debug("Request complete");
  var b;
  if (this.i == a) {
    Od(this), this.i = null, b = 2;
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
      1 == b ? (r(), Gd.dispatchEvent(new Id(Gd, a.W ? a.W.length : 0)), Pd(this), this.Q.length = 0) : Sd(this);
    } else {
      var c = a.Lb();
      if (3 == c || 7 == c || 0 == c && 0 < this.g) {
        this.a.debug("Not retrying due to error type");
      } else {
        this.a.debug("Maybe retrying, last error: " + $c(c, this.g));
        var d;
        if (d = 1 == b) {
          this.p || this.G ? (this.a.J("Request already in progress"), d = !1) : this.c == Ed || this.aa >= (this.Na ? 0 : this.rb) ? d = !1 : (this.a.debug("Going to retry POST"), this.G = Y(p(this.Wb, this, a), Ud(this, this.aa)), this.aa++, d = !0);
        }
        if (d || 2 == b && Td(this)) {
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
function Ud(a, b) {
  var c = a.lc + Math.floor(Math.random() * a.Fc);
  a.isActive() || (a.a.debug("Inactive channel"), c *= 2);
  return c * b;
}
f.oc = function(a) {
  if (!(0 <= Xa(arguments, this.c))) {
    throw Error("Unexpected channel state: " + this.c);
  }
};
function Z(a, b) {
  a.a.info("Error code " + b);
  if (2 == b || 9 == b) {
    var c = null;
    a.e && (c = a.e.getNetworkTestImageUri(a));
    var d = p(a.Hc, a);
    c || (c = new D("//www.google.com/images/cleardot.gif"), G(c));
    ud(c.toString(), 1E4, d);
  } else {
    X();
  }
  Vd(a, b);
}
f.Hc = function(a) {
  a ? (this.a.info("Successfully pinged google.com"), X()) : (this.a.info("Failed to ping google.com"), X(), Vd(this, 8));
};
function Vd(a, b) {
  a.a.debug("HttpChannel: error - " + b);
  a.c = 0;
  a.e && a.e.channelError(a, b);
  Nd(a);
  Ld(a);
}
function Nd(a) {
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
function wd(a, b) {
  var c = zd(a, null, b);
  a.a.debug("GetForwardChannelUri: " + c);
  return c;
}
function Bd(a, b, c) {
  b = zd(a, a.cb() ? b : null, c);
  a.a.debug("GetBackChannelUri: " + b);
  return b;
}
function zd(a, b, c) {
  var d = ub(c);
  if ("" != d.ia) {
    b && gb(d, b + "." + d.ia), hb(d, d.Da);
  } else {
    var e = window.location, d = vb(e.protocol, b ? b + "." + e.hostname : e.hostname, e.port, c)
  }
  a.ya && C(a.ya, function(a, b) {
    F(d, b, a);
  });
  F(d, "VER", a.ha);
  Md(a, d);
  return d;
}
f.La = function(a) {
  if (a && !this.eb) {
    throw Error("Can't create secondary domain capable XhrIo object.");
  }
  a = new S;
  a.gc = this.eb;
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
  Gd.dispatchEvent(new Jd(Gd));
};
function X() {
  Gd.dispatchEvent(new Hd(Gd));
}
f.cb = function() {
  return this.eb || !dd();
};
function Wd() {
}
f = Wd.prototype;
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
var $, Xd, Yd = [].slice;
Xd = {0:"Ok", 4:"User is logging out", 6:"Unknown session ID", 7:"Stopped by server", 8:"General network error", 2:"Request failed", 9:"Blocked by a network administrator", 5:"No data from server", 10:"Got bad data from the server", 11:"Got a bad response from the server"};
$ = function(a, b) {
  var c, d, e, g, h, k, u, t, q, v, mb, na, bd;
  t = this;
  a || (a = "channel");
  a.match(/:\/\//) && a.replace(/^ws/, "http");
  b || (b = {});
  m(b || "string" === typeof b) && (b = {});
  k = b.reconnectTime || 3E3;
  null != (bd = b.affinity) && bd.disabled || (b.extraParams || (b.extraParams = {}), b.affinity || (b.affinity = {}), (mb = b.affinity).get || (mb.get = "a"), (na = b.affinity).id || (na.id = ta()), this.affinity = b.affinity.id, b.extraParams[b.affinity.get] = this.affinity);
  v = function(a) {
    t.readyState = t.readyState = a;
  };
  v(this.CLOSED);
  q = null;
  g = b.Lc;
  c = function() {
    var a, b;
    b = arguments[0];
    a = 2 <= arguments.length ? Yd.call(arguments, 1) : [];
    try {
      return "function" === typeof t[b] ? t[b].apply(t, a) : void 0;
    } catch (c) {
      throw a = c, "undefined" !== typeof console && null !== console && console.error(a.stack), a;
    }
  };
  d = new Wd;
  d.channelOpened = function() {
    g = q;
    v($.OPEN);
    return c("onopen");
  };
  e = null;
  d.channelError = function(a, b) {
    var d;
    d = Xd[b];
    e = b;
    v($.kb);
    try {
      return c("onerror", d, b);
    } catch (g) {
    }
  };
  u = null;
  d.channelClosed = function(a, d, g) {
    if (t.readyState !== $.CLOSED) {
      q = null;
      a = e ? Xd[e] : "Closed";
      v($.CLOSED);
      try {
        c("onclose", a, d, g);
      } catch (na) {
      }
      b.reconnect && 7 !== e && 0 !== e && (d = 6 === e ? 0 : k, clearTimeout(u), u = setTimeout(h, d));
      return e = null;
    }
  };
  d.channelHandleArray = function(a, b) {
    return c("onmessage", b);
  };
  h = function() {
    if (q) {
      throw Error("Reconnect() called from invalid state");
    }
    v($.CONNECTING);
    c("onconnecting");
    clearTimeout(u);
    q = new Dd(b.appVersion, null != g ? g.Jb : void 0);
    b.crossDomainXhr && (q.eb = !0);
    q.e = d;
    e = null;
    if (b.failFast) {
      var h = q;
      h.Na = !0;
      h.a.info("setFailFast: true");
      (h.p || h.G) && h.aa > (h.Na ? 0 : h.rb) && (h.a.info("Retry count " + h.aa + " > new maxRetries " + (h.Na ? 0 : h.rb) + ". Fail immediately!"), h.p ? (h.p.cancel(), h.ka(h.p)) : (l.clearTimeout(h.G), h.G = null, Z(h, 2)));
    }
    return q.nb("" + a + "/test", "" + a + "/bind", b.extraParams, null != g ? g.Y : void 0, null != g ? g.Aa : void 0);
  };
  this.open = function() {
    if (t.readyState !== t.CLOSED) {
      throw Error("Already open");
    }
    return h();
  };
  this.close = function() {
    clearTimeout(u);
    e = 0;
    if (t.readyState !== $.CLOSED) {
      return v($.kb), q.disconnect();
    }
  };
  this.sendMap = function(a) {
    var b;
    if ((b = t.readyState) === $.kb || b === $.CLOSED) {
      throw Error("Cannot send to a closed connection");
    }
    b = q;
    if (0 == b.c) {
      throw Error("Invalid operation: sending map when state is closed");
    }
    1E3 == b.t.length && b.a.J("Already have 1000 queued maps upon queueing " + zb(a));
    b.t.push(new Fd(b.vc++, a));
    2 != b.c && 3 != b.c || Pd(b);
  };
  this.send = function(a) {
    return this.sendMap({JSON:zb(a)});
  };
  h();
  return this;
};
$.prototype.CONNECTING = $.CONNECTING = $.CONNECTING = 0;
$.prototype.OPEN = $.OPEN = $.OPEN = 1;
$.prototype.CLOSING = $.CLOSING = $.kb = 2;
$.prototype.CLOSED = $.CLOSED = $.CLOSED = 3;
("undefined" !== typeof exports && null !== exports ? exports : window).BCSocket = $;
var Image, XMLHttpRequest, Zd, $d, window;
Zd = require("request");
Image = function() {
  this.__defineSetter__("src", function(a) {
    return function(b) {
      b = b.toString();
      b.match(/^\/\//) && (b = "http:" + b);
      return Zd(b, function(b) {
        return null != b ? "function" === typeof a.onerror ? a.onerror() : void 0 : "function" === typeof a.onload ? a.onload() : void 0;
      });
    };
  }(this));
  return this;
};
XMLHttpRequest = require("../XMLHttpRequest").XMLHttpRequest;
Dd.prototype.La = function() {
  var a;
  a = new S;
  a.Eb = function() {
    return new XMLHttpRequest;
  };
  return a;
};
l = window = {setTimeout:setTimeout, clearTimeout:clearTimeout, setInterval:setInterval, clearInterval:clearInterval, console:console, location:null, navigator:{userAgent:"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_2) AppleWebKit/535.1 (KHTML, like Gecko) Chrome/14.0.835.202 Safari/535.1"}};
$d = require("url");
exports.setDefaultLocation = function(a) {
  "string" === typeof a && (a = $d.parse(a));
  return window.location = a;
};

})();
