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
  -1 != a.indexOf("&") && (a = a.replace(na, "&amp;"));
  -1 != a.indexOf("<") && (a = a.replace(oa, "&lt;"));
  -1 != a.indexOf(">") && (a = a.replace(pa, "&gt;"));
  -1 != a.indexOf('"') && (a = a.replace(qa, "&quot;"));
  -1 != a.indexOf("'") && (a = a.replace(ra, "&#39;"));
  return a;
}
var na = /&/g, oa = /</g, pa = />/g, qa = /"/g, ra = /'/g, ma = /[&<>"']/;
function sa(a, b) {
  return a < b ? -1 : a > b ? 1 : 0;
}
;var w, ta, ua, va;
function wa() {
  return l.navigator ? l.navigator.userAgent : null;
}
va = ua = ta = w = !1;
var xa;
if (xa = wa()) {
  var ya = l.navigator;
  w = 0 == xa.lastIndexOf("Opera", 0);
  ta = !w && (-1 != xa.indexOf("MSIE") || -1 != xa.indexOf("Trident"));
  ua = !w && -1 != xa.indexOf("WebKit");
  va = !w && !ua && !ta && "Gecko" == ya.product;
}
var za = w, x = ta, Aa = va, y = ua;
function Ba() {
  var a = l.document;
  return a ? a.documentMode : void 0;
}
var Ca;
a: {
  var Da = "", Ea;
  if (za && l.opera) {
    var Fa = l.opera.version, Da = "function" == typeof Fa ? Fa() : Fa
  } else {
    if (Aa ? Ea = /rv\:([^\);]+)(\)|;)/ : x ? Ea = /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/ : y && (Ea = /WebKit\/(\S+)/), Ea) {
      var Ga = Ea.exec(wa()), Da = Ga ? Ga[1] : ""
    }
  }
  if (x) {
    var Ha = Ba();
    if (Ha > parseFloat(Da)) {
      Ca = String(Ha);
      break a;
    }
  }
  Ca = Da;
}
var Ia = {};
function z(a) {
  var b;
  if (!(b = Ia[a])) {
    b = 0;
    for (var c = String(Ca).replace(/^[\s\xa0]+|[\s\xa0]+$/g, "").split("."), d = String(a).replace(/^[\s\xa0]+|[\s\xa0]+$/g, "").split("."), e = Math.max(c.length, d.length), g = 0;0 == b && g < e;g++) {
      var h = c[g] || "", k = d[g] || "", u = RegExp("(\\d*)(\\D*)", "g"), t = RegExp("(\\d*)(\\D*)", "g");
      do {
        var q = u.exec(h) || ["", "", ""], v = t.exec(k) || ["", "", ""];
        if (0 == q[0].length && 0 == v[0].length) {
          break;
        }
        b = sa(0 == q[1].length ? 0 : parseInt(q[1], 10), 0 == v[1].length ? 0 : parseInt(v[1], 10)) || sa(0 == q[2].length, 0 == v[2].length) || sa(q[2], v[2]);
      } while (0 == b);
    }
    b = Ia[a] = 0 <= b;
  }
  return b;
}
var Ja = l.document, Ka = Ja && x ? Ba() || ("CSS1Compat" == Ja.compatMode ? parseInt(Ca, 10) : 5) : void 0;
function La(a) {
  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, La);
  } else {
    var b = Error().stack;
    b && (this.stack = b);
  }
  a && (this.message = String(a));
}
s(La, Error);
La.prototype.name = "CustomError";
function Ma(a, b) {
  b.unshift(a);
  La.call(this, ka.apply(null, b));
  b.shift();
}
s(Ma, La);
Ma.prototype.name = "AssertionError";
function Na(a, b) {
  throw new Ma("Failure" + (a ? ": " + a : ""), Array.prototype.slice.call(arguments, 1));
}
;var Oa = RegExp("^(?:([^:/?#.]+):)?(?://(?:([^/?#]*)@)?([^/#?]*?)(?::([0-9]+))?(?=[/#?]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#(.*))?$");
function Pa(a) {
  if (Qa) {
    Qa = !1;
    var b = l.location;
    if (b) {
      var c = b.href;
      if (c && (c = (c = Pa(c)[3] || null) && decodeURIComponent(c)) && c != b.hostname) {
        throw Qa = !0, Error();
      }
    }
  }
  return a.match(Oa);
}
var Qa = y;
function Ra(a) {
  var b = [], c = 0, d;
  for (d in a) {
    b[c++] = a[d];
  }
  return b;
}
function Sa(a) {
  var b = [], c = 0, d;
  for (d in a) {
    b[c++] = d;
  }
  return b;
}
var Ta = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");
function Ua(a, b) {
  for (var c, d, e = 1;e < arguments.length;e++) {
    d = arguments[e];
    for (c in d) {
      a[c] = d[c];
    }
    for (var g = 0;g < Ta.length;g++) {
      c = Ta[g], Object.prototype.hasOwnProperty.call(d, c) && (a[c] = d[c]);
    }
  }
}
;var A = Array.prototype, Va = A.indexOf ? function(a, b, c) {
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
}, Wa = A.forEach ? function(a, b, c) {
  A.forEach.call(a, b, c);
} : function(a, b, c) {
  for (var d = a.length, e = n(a) ? a.split("") : a, g = 0;g < d;g++) {
    g in e && b.call(c, e[g], g, a);
  }
};
function Xa(a) {
  var b;
  a: {
    b = Ya;
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
function Za(a) {
  return A.concat.apply(A, arguments);
}
function $a(a) {
  var b = a.length;
  if (0 < b) {
    for (var c = Array(b), d = 0;d < b;d++) {
      c[d] = a[d];
    }
    return c;
  }
  return[];
}
;function ab(a, b) {
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
      a instanceof ab ? (c = a.ba(), d = a.N()) : (c = Sa(a), d = Ra(a));
      for (var e = 0;e < c.length;e++) {
        this.set(c[e], d[e]);
      }
    }
  }
}
f = ab.prototype;
f.N = function() {
  bb(this);
  for (var a = [], b = 0;b < this.j.length;b++) {
    a.push(this.O[this.j[b]]);
  }
  return a;
};
f.ba = function() {
  bb(this);
  return this.j.concat();
};
f.wa = function(a) {
  return B(this.O, a);
};
f.remove = function(a) {
  return B(this.O, a) ? (delete this.O[a], this.o--, this.j.length > 2 * this.o && bb(this), !0) : !1;
};
function bb(a) {
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
  return new ab(this);
};
function B(a, b) {
  return Object.prototype.hasOwnProperty.call(a, b);
}
;function cb(a) {
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
  return Ra(a);
}
function C(a, b, c) {
  if ("function" == typeof a.forEach) {
    a.forEach(b, c);
  } else {
    if (ea(a) || n(a)) {
      Wa(a, b, c);
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
            d = Sa(a);
          }
        } else {
          d = void 0;
        }
      }
      for (var e = cb(a), g = e.length, h = 0;h < g;h++) {
        b.call(c, e[h], d && d[h], a);
      }
    }
  }
}
;function D(a, b) {
  var c;
  if (a instanceof D) {
    this.D = void 0 !== b ? b : a.D, db(this, a.oa), c = a.hb, E(this), this.hb = c, eb(this, a.ia), fb(this, a.Da), gb(this, a.I), hb(this, a.R.n()), c = a.Qa, E(this), this.Qa = c;
  } else {
    if (a && (c = Pa(String(a)))) {
      this.D = !!b;
      db(this, c[1] || "", !0);
      var d = c[2] || "";
      E(this);
      this.hb = d ? decodeURIComponent(d) : "";
      eb(this, c[3] || "", !0);
      fb(this, c[4]);
      gb(this, c[5] || "", !0);
      hb(this, c[6] || "", !0);
      c = c[7] || "";
      E(this);
      this.Qa = c ? decodeURIComponent(c) : "";
    } else {
      this.D = !!b, this.R = new ib(null, 0, this.D);
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
  b && a.push(jb(b, kb), ":");
  if (b = this.ia) {
    a.push("//");
    var c = this.hb;
    c && a.push(jb(c, kb), "@");
    a.push(encodeURIComponent(String(b)));
    b = this.Da;
    null != b && a.push(":", String(b));
  }
  if (b = this.I) {
    this.ia && "/" != b.charAt(0) && a.push("/"), a.push(jb(b, "/" == b.charAt(0) ? lb : mb));
  }
  (b = this.R.toString()) && a.push("?", b);
  (b = this.Qa) && a.push("#", jb(b, nb));
  return a.join("");
};
f.n = function() {
  return new D(this);
};
function db(a, b, c) {
  E(a);
  a.oa = c ? b ? decodeURIComponent(b) : "" : b;
  a.oa && (a.oa = a.oa.replace(/:$/, ""));
}
function eb(a, b, c) {
  E(a);
  a.ia = c ? b ? decodeURIComponent(b) : "" : b;
}
function fb(a, b) {
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
function gb(a, b, c) {
  E(a);
  a.I = c ? b ? decodeURIComponent(b) : "" : b;
}
function hb(a, b, c) {
  E(a);
  b instanceof ib ? (a.R = b, a.R.wb(a.D)) : (c || (b = jb(b, ob)), a.R = new ib(b, 0, a.D));
}
function F(a, b, c) {
  E(a);
  a.R.set(b, c);
}
function pb(a, b, c) {
  E(a);
  m(c) || (c = [String(c)]);
  qb(a.R, b, c);
}
function G(a) {
  E(a);
  F(a, "zx", Math.floor(2147483648 * Math.random()).toString(36) + Math.abs(Math.floor(2147483648 * Math.random()) ^ r()).toString(36));
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
function rb(a) {
  return a instanceof D ? a.n() : new D(a, void 0);
}
function sb(a, b, c, d) {
  var e = new D(null, void 0);
  a && db(e, a);
  b && eb(e, b);
  c && fb(e, c);
  d && gb(e, d);
  return e;
}
function jb(a, b) {
  return n(a) ? encodeURI(a).replace(b, tb) : null;
}
function tb(a) {
  a = a.charCodeAt(0);
  return "%" + (a >> 4 & 15).toString(16) + (a & 15).toString(16);
}
var kb = /[#\/\?@]/g, mb = /[\#\?:]/g, lb = /[\#\?]/g, ob = /[\#\?@]/g, nb = /#/g;
function ib(a, b, c) {
  this.C = a || null;
  this.D = !!c;
}
function H(a) {
  if (!a.h && (a.h = new ab, a.o = 0, a.C)) {
    for (var b = a.C.split("&"), c = 0;c < b.length;c++) {
      var d = b[c].indexOf("="), e = null, g = null;
      0 <= d ? (e = b[c].substring(0, d), g = b[c].substring(d + 1)) : e = b[c];
      e = decodeURIComponent(e.replace(/\+/g, " "));
      e = I(a, e);
      a.add(e, g ? decodeURIComponent(g.replace(/\+/g, " ")) : "");
    }
  }
}
f = ib.prototype;
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
    this.wa(a) && (b = Za(b, this.h.get(I(this, a))));
  } else {
    a = this.h.N();
    for (var c = 0;c < a.length;c++) {
      b = Za(b, a[c]);
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
function qb(a, b, c) {
  a.remove(b);
  0 < c.length && (a.C = null, a.h.set(I(a, b), $a(c)), a.o += c.length);
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
  var a = new ib;
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
    c != d && (this.remove(c), qb(this, d, a));
  }, this));
  this.D = a;
};
function ub(a) {
  a = String(a);
  if (/^\s*$/.test(a) ? 0 : /^[\],:{}\s\u2028\u2029]*$/.test(a.replace(/\\["\\\/bfnrtu]/g, "@").replace(/"[^"\\\n\r\u2028\u2029\x00-\x08\x0a-\x1f]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:[\s\u2028\u2029]*\[)+/g, ""))) {
    try {
      return eval("(" + a + ")");
    } catch (b) {
    }
  }
  throw Error("Invalid JSON string: " + a);
}
function vb(a) {
  return eval("(" + a + ")");
}
function wb(a) {
  var b = [];
  xb(new yb, a, b);
  return b.join("");
}
function yb() {
  this.ab = void 0;
}
function xb(a, b, c) {
  switch(typeof b) {
    case "string":
      zb(b, c);
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
          c.push(e), e = b[g], xb(a, a.ab ? a.ab.call(b, String(g), e) : e, c), e = ",";
        }
        c.push("]");
        break;
      }
      c.push("{");
      d = "";
      for (g in b) {
        Object.prototype.hasOwnProperty.call(b, g) && (e = b[g], "function" != typeof e && (c.push(d), zb(g, c), c.push(":"), xb(a, a.ab ? a.ab.call(b, g, e) : e, c), d = ","));
      }
      c.push("}");
      break;
    case "function":
      break;
    default:
      throw Error("Unknown type: " + typeof b);;
  }
}
var Ab = {'"':'\\"', "\\":"\\\\", "/":"\\/", "\b":"\\b", "\f":"\\f", "\n":"\\n", "\r":"\\r", "\t":"\\t", "\x0B":"\\u000b"}, Bb = /\uffff/.test("\uffff") ? /[\\\"\x00-\x1f\x7f-\uffff]/g : /[\\\"\x00-\x1f\x7f-\xff]/g;
function zb(a, b) {
  b.push('"', a.replace(Bb, function(a) {
    if (a in Ab) {
      return Ab[a];
    }
    var b = a.charCodeAt(0), e = "\\u";
    16 > b ? e += "000" : 256 > b ? e += "00" : 4096 > b && (e += "0");
    return Ab[a] = e + b.toString(16);
  }), '"');
}
;function Cb(a) {
  return Db(a || arguments.callee.caller, []);
}
function Db(a, b) {
  var c = [];
  if (0 <= Va(b, a)) {
    c.push("[...circular reference...]");
  } else {
    if (a && 50 > b.length) {
      c.push(Eb(a) + "(");
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
            g = (g = Eb(g)) ? g : "[fn]";
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
        c.push(Db(a.caller, b));
      } catch (h) {
        c.push("[exception trying to get caller]\n");
      }
    } else {
      a ? c.push("[...long stack...]") : c.push("[end]");
    }
  }
  return c.join("");
}
function Eb(a) {
  if (Fb[a]) {
    return Fb[a];
  }
  a = String(a);
  if (!Fb[a]) {
    var b = /function ([^\(]+)/.exec(a);
    Fb[a] = b ? b[1] : "[Anonymous]";
  }
  return Fb[a];
}
var Fb = {};
function Gb(a, b, c, d, e) {
  this.reset(a, b, c, d, e);
}
Gb.prototype.Ib = null;
Gb.prototype.Hb = null;
var Hb = 0;
Gb.prototype.reset = function(a, b, c, d, e) {
  "number" == typeof e || Hb++;
  d || r();
  this.Ba = a;
  this.tc = b;
  delete this.Ib;
  delete this.Hb;
};
Gb.prototype.cc = function(a) {
  this.Ba = a;
};
function Ib(a) {
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
var Jb = new J("SEVERE", 1E3), Kb = new J("WARNING", 900), Lb = new J("INFO", 800), Mb = new J("CONFIG", 700), Nb = new J("FINE", 500);
f = Ib.prototype;
f.getParent = function() {
  return this.Va;
};
f.cc = function(a) {
  this.Ba = a;
};
function Ob(a) {
  if (a.Ba) {
    return a.Ba;
  }
  if (a.Va) {
    return Ob(a.Va);
  }
  Na("Root logger has no level set.");
  return null;
}
f.log = function(a, b, c) {
  if (a.value >= Ob(this).value) {
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
  var d = new Gb(a, String(b), this.uc);
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
        } catch (Yd) {
          t = "Not available", q = !0;
        }
        h = !q && c.lineNumber && c.fileName && c.stack && c.message && c.name ? c : {message:c.message || "Not available", name:c.name || "UnknownError", lineNumber:u, fileName:t, stack:c.stack || "Not available"};
      }
      e = "Message: " + la(h.message) + '\nUrl: <a href="view-source:' + h.fileName + '" target="_new">' + h.fileName + "</a>\nLine: " + h.lineNumber + "\n\nBrowser stack:\n" + la(h.stack + "-> ") + "[end]\n\nJS stack traversal:\n" + la(Cb(g) + "-> ");
    } catch (Id) {
      e = "Exception trying to expose exception! You win, we lose. " + Id;
    }
    d.Hb = e;
  }
  return d;
};
f.J = function(a, b) {
  this.log(Jb, a, b);
};
f.fa = function(a, b) {
  this.log(Kb, a, b);
};
f.info = function(a, b) {
  this.log(Lb, a, b);
};
var Pb = {}, Qb = null;
function Rb(a) {
  Qb || (Qb = new Ib(""), Pb[""] = Qb, Qb.cc(Mb));
  var b;
  if (!(b = Pb[a])) {
    b = new Ib(a);
    var c = a.lastIndexOf("."), d = a.substr(c + 1), c = Rb(a.substr(0, c));
    c.mb || (c.mb = {});
    c.mb[d] = b;
    b.Va = c;
    Pb[a] = b;
  }
  return b;
}
;function K(a, b) {
  a && a.log(Nb, b, void 0);
}
;function L() {
  this.r = Rb("goog.net.BrowserChannel");
}
function Sb(a, b, c, d) {
  a.info("XMLHTTP TEXT (" + b + "): " + Tb(a, c) + (d ? " " + d : ""));
}
L.prototype.debug = function(a) {
  this.info(a);
};
function Ub(a, b, c) {
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
function Tb(a, b) {
  if (!b || b == Vb) {
    return b;
  }
  try {
    var c = vb(b);
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
    return wb(c);
  } catch (u) {
    return a.debug("Exception parsing expected JS array - probably was not JS"), b;
  }
}
;function Wb(a, b) {
  this.P = b ? vb : ub;
}
Wb.prototype.parse = function(a) {
  return this.P(a);
};
function M() {
  0 != Xb && (Yb[this[ga] || (this[ga] = ++ha)] = this);
}
var Xb = 0, Yb = {};
M.prototype.ob = !1;
M.prototype.Ma = function() {
  if (!this.ob && (this.ob = !0, this.u(), 0 != Xb)) {
    var a = this[ga] || (this[ga] = ++ha);
    delete Yb[a];
  }
};
M.prototype.u = function() {
  if (this.Sb) {
    for (;this.Sb.length;) {
      this.Sb.shift()();
    }
  }
};
var Zb = "closure_listenable_" + (1E6 * Math.random() | 0);
function $b(a) {
  try {
    return!(!a || !a[Zb]);
  } catch (b) {
    return!1;
  }
}
var ac = 0;
function bc(a, b, c, d, e) {
  this.ea = a;
  this.Xa = null;
  this.src = b;
  this.type = c;
  this.Ka = !!d;
  this.Ra = e;
  this.key = ++ac;
  this.na = this.Ja = !1;
}
function cc(a) {
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
  var h = dc(g, b, d, e);
  -1 < h ? (a = g[h], c || (a.Ja = !1)) : (a = new bc(b, this.src, a, !!d, e), a.Ja = c, g.push(a));
  return a;
};
N.prototype.remove = function(a, b, c, d) {
  if (!(a in this.s)) {
    return!1;
  }
  var e = this.s[a];
  b = dc(e, b, c, d);
  return-1 < b ? (cc(e[b]), A.splice.call(e, b, 1), 0 == e.length && (delete this.s[a], this.Ha--), !0) : !1;
};
function ec(a, b) {
  var c = b.type;
  if (!(c in a.s)) {
    return!1;
  }
  var d = a.s[c], e = Va(d, b), g;
  (g = 0 <= e) && A.splice.call(d, e, 1);
  g && (cc(b), 0 == a.s[c].length && (delete a.s[c], a.Ha--));
  return g;
}
N.prototype.$a = function(a) {
  var b = 0, c;
  for (c in this.s) {
    if (!a || c == a) {
      for (var d = this.s[c], e = 0;e < d.length;e++) {
        ++b, cc(d[e]);
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
  a && (e = dc(a, b, c, d));
  return-1 < e ? a[e] : null;
};
function dc(a, b, c, d) {
  for (var e = 0;e < a.length;++e) {
    var g = a[e];
    if (!g.na && g.ea == b && g.Ka == !!c && g.Ra == d) {
      return e;
    }
  }
  return-1;
}
;var fc = !x || x && 9 <= Ka, gc = x && !z("9");
!y || z("528");
Aa && z("1.9b") || x && z("8") || za && z("9.5") || y && z("528");
Aa && !z("8") || x && z("9");
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
function hc(a) {
  hc[" "](a);
  return a;
}
hc[" "] = ca;
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
      if (Aa) {
        var e;
        a: {
          try {
            hc(d.nodeName);
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
    if (a.returnValue = !1, gc) {
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
var ic = "closure_lm_" + (1E6 * Math.random() | 0), Q = {}, jc = 0;
function kc(a, b, c, d, e) {
  if (m(b)) {
    for (var g = 0;g < b.length;g++) {
      kc(a, b[g], c, d, e);
    }
    return null;
  }
  c = lc(c);
  if ($b(a)) {
    a = a.Ua(b, c, d, e);
  } else {
    if (!b) {
      throw Error("Invalid event type");
    }
    var g = !!d, h = mc(a);
    h || (a[ic] = h = new N(a));
    c = h.add(b, c, !1, d, e);
    c.Xa || (d = nc(), c.Xa = d, d.src = a, d.ea = c, a.addEventListener ? a.addEventListener(b, d, g) : a.attachEvent(b in Q ? Q[b] : Q[b] = "on" + b, d), jc++);
    a = c;
  }
  return a;
}
function nc() {
  var a = oc, b = fc ? function(c) {
    return a.call(b.src, b.ea, c);
  } : function(c) {
    c = a.call(b.src, b.ea, c);
    if (!c) {
      return c;
    }
  };
  return b;
}
function pc(a, b, c, d, e) {
  if (m(b)) {
    for (var g = 0;g < b.length;g++) {
      pc(a, b[g], c, d, e);
    }
  } else {
    c = lc(c), $b(a) ? a.xb(b, c, d, e) : a && (a = mc(a)) && (b = a.za(b, c, !!d, e)) && qc(b);
  }
}
function qc(a) {
  if ("number" == typeof a || !a || a.na) {
    return!1;
  }
  var b = a.src;
  if ($b(b)) {
    return ec(b.V, a);
  }
  var c = a.type, d = a.Xa;
  b.removeEventListener ? b.removeEventListener(c, d, a.Ka) : b.detachEvent && b.detachEvent(c in Q ? Q[c] : Q[c] = "on" + c, d);
  jc--;
  (c = mc(b)) ? (ec(c, a), 0 == c.Ha && (c.src = null, b[ic] = null)) : cc(a);
  return!0;
}
function rc(a, b, c, d) {
  var e = 1;
  if (a = mc(a)) {
    if (b = a.s[b]) {
      for (b = $a(b), a = 0;a < b.length;a++) {
        var g = b[a];
        g && g.Ka == c && !g.na && (e &= !1 !== sc(g, d));
      }
    }
  }
  return Boolean(e);
}
function sc(a, b) {
  var c = a.ea, d = a.Ra || a.src;
  a.Ja && qc(a);
  return c.call(d, b);
}
function oc(a, b) {
  if (a.na) {
    return!0;
  }
  if (!fc) {
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
        d.currentTarget = c[k], e &= rc(c[k], g, !0, d);
      }
      for (k = 0;!d.la && k < c.length;k++) {
        d.currentTarget = c[k], e &= rc(c[k], g, !1, d);
      }
    }
    return e;
  }
  return sc(a, new P(b, this));
}
function mc(a) {
  a = a[ic];
  return a instanceof N ? a : null;
}
var tc = "__closure_events_fn_" + (1E9 * Math.random() >>> 0);
function lc(a) {
  return fa(a) ? a : a[tc] || (a[tc] = function(b) {
    return a.handleEvent(b);
  });
}
;function R() {
  M.call(this);
  this.V = new N(this);
  this.ic = this;
}
s(R, M);
R.prototype[Zb] = !0;
f = R.prototype;
f.vb = null;
f.addEventListener = function(a, b, c, d) {
  kc(this, a, b, c, d);
};
f.removeEventListener = function(a, b, c, d) {
  pc(this, a, b, c, d);
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
      Ua(a, e);
    }
  }
  var e = !0, g;
  if (b) {
    for (var h = b.length - 1;!a.la && 0 <= h;h--) {
      g = a.currentTarget = b[h], e = uc(g, d, !0, a) && e;
    }
  }
  a.la || (g = a.currentTarget = c, e = uc(g, d, !0, a) && e, a.la || (e = uc(g, d, !1, a) && e));
  if (b) {
    for (h = 0;!a.la && h < b.length;h++) {
      g = a.currentTarget = b[h], e = uc(g, d, !1, a) && e;
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
function uc(a, b, c, d) {
  b = a.V.s[String(b)];
  if (!b) {
    return!0;
  }
  b = $a(b);
  for (var e = !0, g = 0;g < b.length;++g) {
    var h = b[g];
    if (h && !h.na && h.Ka == c) {
      var k = h.ea, u = h.Ra || h.src;
      h.Ja && ec(a.V, h);
      e = !1 !== k.call(u, d) && e;
    }
  }
  return e && !1 != d.ac;
}
f.za = function(a, b, c, d) {
  return this.V.za(String(a), b, c, d);
};
function vc(a, b) {
  R.call(this);
  this.da = a || 1;
  this.ra = b || wc;
  this.lb = p(this.Ic, this);
  this.ub = r();
}
s(vc, R);
vc.prototype.xa = !1;
var wc = l;
f = vc.prototype;
f.l = null;
f.setInterval = function(a) {
  this.da = a;
  this.l && this.xa ? (this.stop(), this.start()) : this.l && this.stop();
};
f.Ic = function() {
  if (this.xa) {
    var a = r() - this.ub;
    0 < a && a < 0.8 * this.da ? this.l = this.ra.setTimeout(this.lb, this.da - a) : (this.l && (this.ra.clearTimeout(this.l), this.l = null), this.dispatchEvent(xc), this.xa && (this.l = this.ra.setTimeout(this.lb, this.da), this.ub = r()));
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
  vc.pa.u.call(this);
  this.stop();
  delete this.ra;
};
var xc = "tick";
function yc(a, b, c) {
  if (fa(a)) {
    c && (a = p(a, c));
  } else {
    if (a && "function" == typeof a.handleEvent) {
      a = p(a.handleEvent, a);
    } else {
      throw Error("Invalid listener argument");
    }
  }
  return 2147483647 < b ? -1 : wc.setTimeout(a, b || 0);
}
;function zc() {
}
zc.prototype.Cb = null;
function Ac(a) {
  var b;
  (b = a.Cb) || (b = {}, Bc(a) && (b[0] = !0, b[1] = !0), b = a.Cb = b);
  return b;
}
;var Cc;
function Dc() {
}
s(Dc, zc);
function Ec(a) {
  return(a = Bc(a)) ? new ActiveXObject(a) : new XMLHttpRequest;
}
function Bc(a) {
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
Cc = new Dc;
function S(a) {
  R.call(this);
  this.headers = new ab;
  this.jb = a || null;
  this.S = !1;
  this.ib = this.f = null;
  this.Pb = this.Ta = "";
  this.ja = 0;
  this.q = "";
  this.ca = this.sb = this.Sa = this.pb = !1;
  this.Ga = 0;
  this.fb = null;
  this.$b = Fc;
  this.gb = this.gc = !1;
}
s(S, R);
var Fc = "";
S.prototype.r = Rb("goog.net.XhrIo");
var Gc = /^https?$/i, Hc = ["POST", "PUT"];
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
  this.ib = this.jb ? Ac(this.jb) : Ac(Cc);
  this.f.onreadystatechange = p(this.Tb, this);
  try {
    K(this.r, T(this, "Opening Xhr")), this.sb = !0, this.f.open(b, String(a), !0), this.sb = !1;
  } catch (e) {
    K(this.r, T(this, "Error opening Xhr: " + e.message));
    Ic(this, e);
    return;
  }
  a = c || "";
  var g = this.headers.n();
  d && C(d, function(a, b) {
    g.set(b, a);
  });
  d = Xa(g.ba());
  c = l.FormData && a instanceof l.FormData;
  !(0 <= Va(Hc, b)) || d || c || g.set("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
  C(g, function(a, b) {
    this.f.setRequestHeader(b, a);
  }, this);
  this.$b && (this.f.responseType = this.$b);
  "withCredentials" in this.f && (this.f.withCredentials = this.gc);
  try {
    Jc(this), 0 < this.Ga && (this.gb = Kc(this.f), K(this.r, T(this, "Will abort after " + this.Ga + "ms if incomplete, xhr2 " + this.gb)), this.gb ? (this.f.timeout = this.Ga, this.f.ontimeout = p(this.qa, this)) : this.fb = yc(this.qa, this.Ga, this)), K(this.r, T(this, "Sending request")), this.Sa = !0, this.f.send(a), this.Sa = !1;
  } catch (h) {
    K(this.r, T(this, "Send error: " + h.message)), Ic(this, h);
  }
};
function Kc(a) {
  return x && z(9) && "number" == typeof a.timeout && void 0 !== a.ontimeout;
}
function Ya(a) {
  return "content-type" == a.toLowerCase();
}
f.Eb = function() {
  return this.jb ? Ec(this.jb) : Ec(Cc);
};
f.qa = function() {
  "undefined" != typeof aa && this.f && (this.q = "Timed out after " + this.Ga + "ms, aborting", this.ja = 8, K(this.r, T(this, this.q)), this.dispatchEvent("timeout"), this.abort(8));
};
function Ic(a, b) {
  a.S = !1;
  a.f && (a.ca = !0, a.f.abort(), a.ca = !1);
  a.q = b;
  a.ja = 5;
  Lc(a);
  Mc(a);
}
function Lc(a) {
  a.pb || (a.pb = !0, a.dispatchEvent("complete"), a.dispatchEvent("error"));
}
f.abort = function(a) {
  this.f && this.S && (K(this.r, T(this, "Aborting")), this.S = !1, this.ca = !0, this.f.abort(), this.ca = !1, this.ja = a || 7, this.dispatchEvent("complete"), this.dispatchEvent("abort"), Mc(this));
};
f.u = function() {
  this.f && (this.S && (this.S = !1, this.ca = !0, this.f.abort(), this.ca = !1), Mc(this, !0));
  S.pa.u.call(this);
};
f.Tb = function() {
  this.ob || (this.sb || this.Sa || this.ca ? Nc(this) : this.xc());
};
f.xc = function() {
  Nc(this);
};
function Nc(a) {
  if (a.S && "undefined" != typeof aa) {
    if (a.ib[1] && 4 == U(a) && 2 == Oc(a)) {
      K(a.r, T(a, "Local request error detected and ignored"));
    } else {
      if (a.Sa && 4 == U(a)) {
        yc(a.Tb, 0, a);
      } else {
        if (a.dispatchEvent("readystatechange"), 4 == U(a)) {
          K(a.r, T(a, "Request complete"));
          a.S = !1;
          try {
            var b = Oc(a), c, d;
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
                var g = Pa(String(a.Ta))[1] || null;
                if (!g && self.location) {
                  var h = self.location.protocol, g = h.substr(0, h.length - 1)
                }
                e = !Gc.test(g ? g.toLowerCase() : "");
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
              a.q = k + " [" + Oc(a) + "]";
              Lc(a);
            }
          } finally {
            Mc(a);
          }
        }
      }
    }
  }
}
function Mc(a, b) {
  if (a.f) {
    Jc(a);
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
function Jc(a) {
  a.f && a.gb && (a.f.ontimeout = null);
  "number" == typeof a.fb && (wc.clearTimeout(a.fb), a.fb = null);
}
f.isActive = function() {
  return!!this.f;
};
function U(a) {
  return a.f ? a.f.readyState : 0;
}
function Oc(a) {
  try {
    return 2 < U(a) ? a.f.status : -1;
  } catch (b) {
    return-1;
  }
}
function Pc(a) {
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
  return b + " [" + a.Pb + " " + a.Ta + " " + Oc(a) + "]";
}
;function Qc() {
  this.Zb = r();
}
new Qc;
Qc.prototype.set = function(a) {
  this.Zb = a;
};
Qc.prototype.reset = function() {
  this.set(r());
};
Qc.prototype.get = function() {
  return this.Zb;
};
function Rc(a) {
  M.call(this);
  this.e = a;
  this.j = {};
}
s(Rc, M);
var Sc = [];
f = Rc.prototype;
f.Ua = function(a, b, c, d) {
  m(b) || (Sc[0] = b, b = Sc);
  for (var e = 0;e < b.length;e++) {
    var g = kc(a, b[e], c || this.handleEvent, d || !1, this.e || this);
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
    c = c || this.handleEvent, e = e || this.e || this, c = lc(c), d = !!d, b = $b(a) ? a.za(b, c, d, e) : a ? (a = mc(a)) ? a.za(b, c, d, e) : null : null, b && (qc(b), delete this.j[b.key]);
  }
  return this;
};
f.$a = function() {
  var a = this.j, b = qc, c;
  for (c in a) {
    b.call(void 0, a[c], c, a);
  }
  this.j = {};
};
f.u = function() {
  Rc.pa.u.call(this);
  this.$a();
};
f.handleEvent = function() {
  throw Error("EventHandler.handleEvent not implemented");
};
function Tc(a, b, c) {
  M.call(this);
  this.sc = a;
  this.da = b;
  this.e = c;
  this.mc = p(this.yc, this);
}
s(Tc, M);
f = Tc.prototype;
f.bb = !1;
f.Yb = 0;
f.l = null;
f.stop = function() {
  this.l && (wc.clearTimeout(this.l), this.l = null, this.bb = !1);
};
f.u = function() {
  Tc.pa.u.call(this);
  this.stop();
};
f.yc = function() {
  this.l = null;
  this.bb && !this.Yb && (this.bb = !1, Uc(this));
};
function Uc(a) {
  a.l = yc(a.mc, a.da);
  a.sc.call(a.e);
}
;function V(a, b, c, d, e) {
  this.b = a;
  this.a = b;
  this.Y = c;
  this.B = d;
  this.Fa = e || 1;
  this.qa = Vc;
  this.qb = new Rc(this);
  this.Wa = new vc;
  this.Wa.setInterval(Wc);
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
var Vc = 45E3, Wc = 250;
function Xc(a, b) {
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
var Yc = {}, Zc = {};
function $c() {
  return!x || x && 10 <= Ka;
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
function ad(a, b, c) {
  a.sa = 1;
  a.T = G(b.n());
  a.W = c;
  a.Fb = !0;
  bd(a, null);
}
function cd(a, b, c, d, e) {
  a.sa = 1;
  a.T = G(b.n());
  a.W = null;
  a.Fb = c;
  e && (a.bc = !1);
  bd(a, d);
}
function bd(a, b) {
  a.Ea = r();
  dd(a);
  a.w = a.T.n();
  pb(a.w, "t", a.Fa);
  a.Ia = 0;
  a.k = a.b.La(a.b.cb() ? b : null);
  0 < a.ma && (a.Ya = new Tc(p(a.hc, a, a.k), a.ma));
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
  a.b.H(ed);
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
  b && 3 == U(a) ? (this.a.debug("Throttling readystatechange."), b.l || b.Yb ? b.bb = !0 : Uc(b)) : this.hc(a);
};
f.hc = function(a) {
  try {
    if (a == this.k) {
      a: {
        var b = U(this.k), c = this.k.ja, d = Oc(this.k);
        if (!$c() || y && !z("420+")) {
          if (4 > b) {
            break a;
          }
        } else {
          if (3 > b || 3 == b && !za && !Pc(this.k)) {
            break a;
          }
        }
        this.Z || 4 != b || 7 == c || (8 == c || 0 >= d ? this.b.H(fd) : this.b.H(gd));
        hd(this);
        var e = Oc(this.k);
        this.g = e;
        var g = Pc(this.k);
        g || this.a.debug("No response text for uri " + this.w + " status " + e);
        this.F = 200 == e;
        this.a.info("XMLHTTP RESP (" + this.B + ") [ attempt " + this.Fa + "]: " + this.ta + "\n" + this.w + "\n" + b + " " + e);
        this.F ? (4 == b && W(this), this.Fb ? (id(this, b, g), za && this.F && 3 == b && (this.qb.Ua(this.Wa, xc, this.Dc), this.Wa.start())) : (Sb(this.a, this.B, g, null), jd(this, g)), this.F && !this.Z && (4 == b ? this.b.ka(this) : (this.F = !1, dd(this)))) : (400 == e && 0 < g.indexOf("Unknown SID") ? (this.q = 3, X(), this.a.fa("XMLHTTP Unknown SID (" + this.B + ")")) : (this.q = 0, X(), this.a.fa("XMLHTTP Bad status " + e + " (" + this.B + ")")), W(this), kd(this));
      }
    } else {
      this.a.fa("Called back with an unexpected xmlhttp");
    }
  } catch (h) {
    this.a.debug("Failed call to OnXmlHttpReadyStateChanged_"), this.k && Pc(this.k) ? Ub(this.a, h, "ResponseText: " + Pc(this.k)) : Ub(this.a, h, "No response text");
  } finally {
  }
};
function id(a, b, c) {
  for (var d = !0;!a.Z && a.Ia < c.length;) {
    var e = ld(a, c);
    if (e == Zc) {
      4 == b && (a.q = 4, X(), d = !1);
      Sb(a.a, a.B, null, "[Incomplete Response]");
      break;
    } else {
      if (e == Yc) {
        a.q = 4;
        X();
        Sb(a.a, a.B, c, "[Invalid Chunk]");
        d = !1;
        break;
      } else {
        Sb(a.a, a.B, e, null), jd(a, e);
      }
    }
  }
  4 == b && 0 == c.length && (a.q = 1, X(), d = !1);
  a.F = a.F && d;
  d || (Sb(a.a, a.B, c, "[Invalid Chunked Response]"), W(a), kd(a));
}
f.Dc = function() {
  var a = U(this.k), b = Pc(this.k);
  this.Ia < b.length && (hd(this), id(this, a, b), this.F && 4 != a && dd(this));
};
function ld(a, b) {
  var c = a.Ia, d = b.indexOf("\n", c);
  if (-1 == d) {
    return Zc;
  }
  c = Number(b.substring(c, d));
  if (isNaN(c)) {
    return Yc;
  }
  d += 1;
  if (d + c > b.length) {
    return Zc;
  }
  var e = b.substr(d, c);
  a.Ia = d + c;
  return e;
}
function md(a, b) {
  a.Ea = r();
  dd(a);
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
    kd(a);
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
  a.b.H(ed);
}
f.Bc = function(a) {
  Y(p(this.Ac, this, a), 0);
};
f.Ac = function(a) {
  if (!this.Z) {
    var b = this.a;
    b.info("TRIDENT TEXT (" + this.B + "): " + Tb(b, a));
    hd(this);
    jd(this, a);
    dd(this);
  }
};
f.Xb = function(a) {
  Y(p(this.zc, this, a), 0);
};
f.zc = function(a) {
  this.Z || (this.a.info("TRIDENT TEXT (" + this.B + "): " + a ? "success" : "failure"), W(this), this.F = a, this.b.ka(this), this.b.H(nd));
};
f.qc = function() {
  hd(this);
  this.b.ka(this);
};
f.cancel = function() {
  this.Z = !0;
  W(this);
};
function dd(a) {
  a.zb = r() + a.qa;
  od(a, a.qa);
}
function od(a, b) {
  if (null != a.ua) {
    throw Error("WatchDog timer not null");
  }
  a.ua = Y(p(a.Cc, a), b);
}
function hd(a) {
  a.ua && (l.clearTimeout(a.ua), a.ua = null);
}
f.Cc = function() {
  this.ua = null;
  var a = r();
  0 <= a - this.zb ? (this.F && this.a.J("Received watchdog timeout even though request loaded successfully"), this.a.info("TIMEOUT: " + this.w), 2 != this.sa && this.b.H(fd), W(this), this.q = 2, X(), kd(this)) : (this.a.fa("WatchDog timer called too early"), od(this, this.zb - a));
};
function kd(a) {
  a.b.Ob() || a.Z || a.b.ka(a);
}
function W(a) {
  hd(a);
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
function jd(a, b) {
  try {
    a.b.Ub(a, b), a.b.H(nd);
  } catch (c) {
    Ub(a.a, c, "Error in httprequest callback");
  }
}
;function pd(a, b, c, d, e) {
  (new L).debug("TestLoadImageWithRetries: " + e);
  if (0 == d) {
    c(!1);
  } else {
    var g = e || 0;
    d--;
    qd(a, b, function(e) {
      e ? c(!0) : l.setTimeout(function() {
        pd(a, b, c, d, g);
      }, g);
    });
  }
}
function qd(a, b, c) {
  function d(a, b) {
    return function() {
      try {
        e.debug("TestLoadImage: " + b), g.onload = null, g.onerror = null, g.onabort = null, g.ontimeout = null, l.clearTimeout(h), c(a);
      } catch (d) {
        Ub(e, d);
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
;function rd(a, b) {
  this.b = a;
  this.a = b;
  this.P = new Wb(0, !0);
}
f = rd.prototype;
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
  a = sd(this.b, this.I);
  X();
  this.fc = r();
  var b = this.b.Jb;
  null != b ? (this.L = this.b.correctHostPrefix(b[0]), (this.va = b[1]) ? (this.c = 1, td(this)) : (this.c = 2, ud(this))) : (pb(a, "MODE", "init"), this.A = new V(this, this.a, void 0, void 0, void 0), this.A.X(this.v), cd(this.A, a, !1, null, !0), this.c = 0);
};
function td(a) {
  var b = vd(a.b, a.va, "/mail/images/cleardot.gif");
  G(b);
  pd(b.toString(), 5E3, p(a.nc, a), 3, 2E3);
  a.H(ed);
}
f.nc = function(a) {
  if (a) {
    this.c = 2, ud(this);
  } else {
    X();
    var b = this.b;
    b.a.debug("Test Connection Blocked");
    b.g = b.U.g;
    Z(b, 9);
  }
  a && this.H(gd);
};
function ud(a) {
  a.a.debug("TestConnection: starting stage 2");
  var b = a.b.Gc;
  if (null != b) {
    a.a.debug("TestConnection: skipping stage 2, precomputed result is " + b ? "Buffered" : "Unbuffered"), X(), b ? (X(), wd(a.b, a, !1)) : (X(), wd(a.b, a, !0));
  } else {
    if (a.A = new V(a, a.a, void 0, void 0, void 0), a.A.X(a.v), b = xd(a.b, a.L, a.I), X(), $c()) {
      pb(b, "TYPE", "xmlhttp"), cd(a.A, b, !1, a.L, !1);
    } else {
      pb(b, "TYPE", "html");
      var c = a.A;
      a = Boolean(a.L);
      c.sa = 3;
      c.T = G(b.n());
      md(c, a);
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
        Ub(this.a, d);
        yd(this.b, this);
        return;
      }
      this.L = this.b.correctHostPrefix(c[0]);
      this.va = c[1];
    } else {
      this.a.debug("TestConnection: Null responseText"), yd(this.b, this);
    }
  } else {
    if (2 == this.c) {
      if (this.Za) {
        X(), this.tb = r();
      } else {
        if ("11111" == b) {
          if (X(), this.Za = !0, this.Oa = r(), c = this.Oa - this.fc, $c() || 500 > c) {
            this.g = 200, this.A.cancel(), this.a.debug("Test connection succeeded; using streaming connection"), X(), wd(this.b, this, !0);
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
    this.a.debug("TestConnection: request failed, in state " + this.c), 0 == this.c ? X() : 2 == this.c && X(), yd(this.b, this);
  } else {
    if (0 == this.c) {
      this.a.debug("TestConnection: request complete for initial check"), this.va ? (this.c = 1, td(this)) : (this.c = 2, ud(this));
    } else {
      if (2 == this.c) {
        this.a.debug("TestConnection: request complete for stage 2");
        var a = !1;
        (a = $c() ? this.Za : 200 > this.tb - this.Oa ? !1 : !0) ? (this.a.debug("Test connection succeeded; using streaming connection"), X(), wd(this.b, this, !0)) : (this.a.debug("Test connection failed; not using streaming"), X(), wd(this.b, this, !1));
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
function zd(a, b, c) {
  this.Db = a || null;
  this.c = Ad;
  this.t = [];
  this.Q = [];
  this.a = new L;
  this.P = new Wb(0, !0);
  this.Jb = b || null;
  this.Gc = null != c ? c : null;
}
function Bd(a, b) {
  this.Rb = a;
  this.map = b;
}
f = zd.prototype;
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
var Ad = 1, Cd = new R;
function Dd(a) {
  O.call(this, "statevent", a);
}
s(Dd, O);
function Ed(a, b) {
  O.call(this, "timingevent", a);
  this.size = b;
}
s(Ed, O);
var ed = 1, gd = 2, fd = 3, nd = 4;
function Fd(a) {
  O.call(this, "serverreachability", a);
}
s(Fd, O);
var Vb = "y2f%";
f = zd.prototype;
f.nb = function(a, b, c, d, e) {
  this.a.debug("connect()");
  X();
  this.I = b;
  this.ya = c || {};
  d && void 0 !== e && (this.ya.OSID = d, this.ya.OAID = e);
  this.a.debug("connectTest_()");
  Gd(this) && (this.U = new rd(this, this.a), this.U.X(this.v), this.U.dc(this.P), this.U.nb(a));
};
f.disconnect = function() {
  this.a.debug("disconnect()");
  Hd(this);
  if (3 == this.c) {
    var a = this.Ca++, b = this.Pa.n();
    F(b, "SID", this.Y);
    F(b, "RID", a);
    F(b, "TYPE", "terminate");
    Jd(this, b);
    a = new V(this, this.a, this.Y, a, void 0);
    a.sa = 2;
    a.T = G(b.n());
    b = new Image;
    b.src = a.T;
    b.onload = b.onerror = p(a.qc, a);
    a.Ea = r();
    dd(a);
  }
  Kd(this);
};
function Hd(a) {
  a.U && (a.U.abort(), a.U = null);
  a.i && (a.i.cancel(), a.i = null);
  a.M && (l.clearTimeout(a.M), a.M = null);
  Ld(a);
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
function Md(a) {
  a.p || a.G || (a.G = Y(p(a.Wb, a), 0), a.aa = 0);
}
f.Wb = function(a) {
  this.G = null;
  this.a.debug("startForwardChannel_");
  if (Gd(this)) {
    if (this.c == Ad) {
      if (a) {
        this.a.J("Not supposed to retry the open");
      } else {
        this.a.debug("open_()");
        this.Ca = Math.floor(1E5 * Math.random());
        a = this.Ca++;
        var b = new V(this, this.a, "", a, void 0);
        b.X(this.v);
        var c = Nd(this), d = this.Pa.n();
        F(d, "RID", a);
        this.Db && F(d, "CVER", this.Db);
        Jd(this, d);
        ad(b, d, c);
        this.p = b;
        this.c = 2;
      }
    } else {
      3 == this.c && (a ? Od(this, a) : 0 == this.t.length ? this.a.debug("startForwardChannel_ returned: nothing to send") : this.p ? this.a.J("startForwardChannel_ returned: connection already in progress") : (Od(this), this.a.debug("startForwardChannel_ finished, sent request")));
    }
  }
};
function Od(a, b) {
  var c, d;
  b ? 6 < a.ha ? (a.t = a.Q.concat(a.t), a.Q.length = 0, c = a.Ca - 1, d = Nd(a)) : (c = b.B, d = b.W) : (c = a.Ca++, d = Nd(a));
  var e = a.Pa.n();
  F(e, "SID", a.Y);
  F(e, "RID", c);
  F(e, "AID", a.Aa);
  Jd(a, e);
  c = new V(a, a.a, a.Y, c, a.aa + 1);
  c.X(a.v);
  c.setTimeout(Math.round(0.5 * a.Kb) + Math.round(0.5 * a.Kb * Math.random()));
  a.p = c;
  ad(c, e, d);
}
function Jd(a, b) {
  if (a.e) {
    var c = a.e.getAdditionalParams(a);
    c && C(c, function(a, c) {
      F(b, c, a);
    });
  }
}
function Nd(a) {
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
function Pd(a) {
  a.i || a.M || (a.Ab = 1, a.M = Y(p(a.Vb, a), 0), a.ga = 0);
}
function Qd(a) {
  if (a.i || a.M) {
    return a.a.J("Request already in progress"), !1;
  }
  if (3 <= a.ga) {
    return!1;
  }
  a.a.debug("Going to retry GET");
  a.Ab++;
  a.M = Y(p(a.Vb, a), Rd(a, a.ga));
  a.ga++;
  return!0;
}
f.Vb = function() {
  this.M = null;
  if (Gd(this)) {
    this.a.debug("Creating new HttpRequest");
    this.i = new V(this, this.a, this.Y, "rpc", this.Ab);
    this.i.X(this.v);
    this.i.ec(this.ma);
    var a = this.Bb.n();
    F(a, "RID", "rpc");
    F(a, "SID", this.Y);
    F(a, "CI", this.yb ? "0" : "1");
    F(a, "AID", this.Aa);
    Jd(this, a);
    if ($c()) {
      F(a, "TYPE", "xmlhttp"), cd(this.i, a, !0, this.L, !1);
    } else {
      F(a, "TYPE", "html");
      var b = this.i, c = Boolean(this.L);
      b.sa = 3;
      b.T = G(a.n());
      md(b, c);
    }
    this.a.debug("New Request created");
  }
};
function Gd(a) {
  if (a.e) {
    var b = a.e.okToMakeRequest(a);
    if (0 != b) {
      return a.a.debug("Handler returned error code from okToMakeRequest"), Z(a, b), !1;
    }
  }
  return!0;
}
function wd(a, b, c) {
  a.a.debug("Test Connection Finished");
  a.yb = a.jc && c;
  a.g = b.g;
  a.a.debug("connectChannel_()");
  a.oc(Ad, 0);
  a.Pa = sd(a, a.I);
  Md(a);
}
function yd(a, b) {
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
                    Ld(this), this.i.cancel(), this.i = null;
                  } else {
                    break a;
                  }
                } else {
                  this.a.fa("We do not have a BackChannel established");
                }
                Qd(this);
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
        b != Vb && (this.a.debug("Bad data returned - missing/invald magic cookie"), Z(this, 11));
      }
    } else {
      if (this.i == a && Ld(this), !/^[\s\xa0]*$/.test(b)) {
        c = this.P.parse(b);
        for (var e = this.e && this.e.channelHandleMultipleArrays ? [] : null, g = 0;g < c.length;g++) {
          var h = c[g];
          this.Aa = h[0];
          h = h[1];
          2 == this.c ? "c" == h[0] ? (this.Y = h[1], this.L = this.correctHostPrefix(h[2]), h = h[3], this.ha = null != h ? h : 6, this.c = 3, this.e && this.e.channelOpened(this), this.Bb = xd(this, this.L, this.I), Pd(this)) : "stop" == h[0] && Z(this, 7) : 3 == this.c && ("stop" == h[0] ? (e && 0 != e.length && (this.e.channelHandleMultipleArrays(this, e), e.length = 0), Z(this, 7)) : "noop" != h[0] && (e ? e.push(h) : this.e && this.e.channelHandleArray(this, h)), this.ga = 0);
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
  null != this.$ && (this.$ = null, this.i.cancel(), this.i = null, Qd(this), X());
};
function Ld(a) {
  null != a.$ && (l.clearTimeout(a.$), a.$ = null);
}
f.ka = function(a) {
  this.a.debug("Request complete");
  var b;
  if (this.i == a) {
    Ld(this), this.i = null, b = 2;
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
      1 == b ? (r(), Cd.dispatchEvent(new Ed(Cd, a.W ? a.W.length : 0)), Md(this), this.Q.length = 0) : Pd(this);
    } else {
      var c = a.Lb();
      if (3 == c || 7 == c || 0 == c && 0 < this.g) {
        this.a.debug("Not retrying due to error type");
      } else {
        this.a.debug("Maybe retrying, last error: " + Xc(c, this.g));
        var d;
        if (d = 1 == b) {
          this.p || this.G ? (this.a.J("Request already in progress"), d = !1) : this.c == Ad || this.aa >= (this.Na ? 0 : this.rb) ? d = !1 : (this.a.debug("Going to retry POST"), this.G = Y(p(this.Wb, this, a), Rd(this, this.aa)), this.aa++, d = !0);
        }
        if (d || 2 == b && Qd(this)) {
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
function Rd(a, b) {
  var c = a.lc + Math.floor(Math.random() * a.Fc);
  a.isActive() || (a.a.debug("Inactive channel"), c *= 2);
  return c * b;
}
f.oc = function(a) {
  if (!(0 <= Va(arguments, this.c))) {
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
    qd(c.toString(), 1E4, d);
  } else {
    X();
  }
  Sd(a, b);
}
f.Hc = function(a) {
  a ? (this.a.info("Successfully pinged google.com"), X()) : (this.a.info("Failed to ping google.com"), X(), Sd(this, 8));
};
function Sd(a, b) {
  a.a.debug("HttpChannel: error - " + b);
  a.c = 0;
  a.e && a.e.channelError(a, b);
  Kd(a);
  Hd(a);
}
function Kd(a) {
  a.c = 0;
  a.g = -1;
  if (a.e) {
    if (0 == a.Q.length && 0 == a.t.length) {
      a.e.channelClosed(a);
    } else {
      a.a.debug("Number of undelivered maps, pending: " + a.Q.length + ", outgoing: " + a.t.length);
      var b = $a(a.Q), c = $a(a.t);
      a.Q.length = 0;
      a.t.length = 0;
      a.e.channelClosed(a, b, c);
    }
  }
}
function sd(a, b) {
  var c = vd(a, null, b);
  a.a.debug("GetForwardChannelUri: " + c);
  return c;
}
function xd(a, b, c) {
  b = vd(a, a.cb() ? b : null, c);
  a.a.debug("GetBackChannelUri: " + b);
  return b;
}
function vd(a, b, c) {
  var d = rb(c);
  if ("" != d.ia) {
    b && eb(d, b + "." + d.ia), fb(d, d.Da);
  } else {
    var e = window.location, d = sb(e.protocol, b ? b + "." + e.hostname : e.hostname, e.port, c)
  }
  a.ya && C(a.ya, function(a, b) {
    F(d, b, a);
  });
  F(d, "VER", a.ha);
  Jd(a, d);
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
  Cd.dispatchEvent(new Fd(Cd));
};
function X() {
  Cd.dispatchEvent(new Dd(Cd));
}
f.cb = function() {
  return this.eb || !$c();
};
function Td() {
}
f = Td.prototype;
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
var $, Ud, Vd = [].slice;
Ud = {0:"Ok", 4:"User is logging out", 6:"Unknown session ID", 7:"Stopped by server", 8:"General network error", 2:"Request failed", 9:"Blocked by a network administrator", 5:"No data from server", 10:"Got bad data from the server", 11:"Got a bad response from the server"};
$ = function(a, b) {
  var c, d, e, g, h, k, u, t, q, v;
  t = this;
  a || (a = "channel");
  a.match(/:\/\//) && a.replace(/^ws/, "http");
  b || (b = {});
  m(b || "string" === typeof b) && (b = {});
  k = b.reconnectTime || 3E3;
  v = function(a) {
    t.readyState = t.readyState = a;
  };
  v(this.CLOSED);
  q = null;
  g = b.Lc;
  c = function() {
    var a, b;
    b = arguments[0];
    a = 2 <= arguments.length ? Vd.call(arguments, 1) : [];
    try {
      return "function" === typeof t[b] ? t[b].apply(t, a) : void 0;
    } catch (c) {
      throw a = c, "undefined" !== typeof console && null !== console && console.error(a.stack), a;
    }
  };
  d = new Td;
  d.channelOpened = function() {
    g = q;
    v($.OPEN);
    return c("onopen");
  };
  e = null;
  d.channelError = function(a, b) {
    var d;
    d = Ud[b];
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
      a = e ? Ud[e] : "Closed";
      v($.CLOSED);
      try {
        c("onclose", a, d, g);
      } catch (Zd) {
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
    q = new zd(b.appVersion, null != g ? g.Jb : void 0);
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
    1E3 == b.t.length && b.a.J("Already have 1000 queued maps upon queueing " + wb(a));
    b.t.push(new Bd(b.vc++, a));
    2 != b.c && 3 != b.c || Md(b);
  };
  this.send = function(a) {
    return this.sendMap({JSON:wb(a)});
  };
  h();
  return this;
};
$.prototype.CONNECTING = $.CONNECTING = $.CONNECTING = 0;
$.prototype.OPEN = $.OPEN = $.OPEN = 1;
$.prototype.CLOSING = $.CLOSING = $.kb = 2;
$.prototype.CLOSED = $.CLOSED = $.CLOSED = 3;
("undefined" !== typeof exports && null !== exports ? exports : window).BCSocket = $;
var Image, XMLHttpRequest, Wd, Xd, window;
Wd = require("request");
Image = function() {
  this.__defineSetter__("src", function(a) {
    return function(b) {
      b = b.toString();
      b.match(/^\/\//) && (b = "http:" + b);
      return Wd(b, function(b) {
        return null != b ? "function" === typeof a.onerror ? a.onerror() : void 0 : "function" === typeof a.onload ? a.onload() : void 0;
      });
    };
  }(this));
  return this;
};
XMLHttpRequest = require("../XMLHttpRequest").XMLHttpRequest;
zd.prototype.La = function() {
  var a;
  a = new S;
  a.Eb = function() {
    return new XMLHttpRequest;
  };
  return a;
};
l = window = {setTimeout:setTimeout, clearTimeout:clearTimeout, setInterval:setInterval, clearInterval:clearInterval, console:console, location:null, navigator:{userAgent:"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_2) AppleWebKit/535.1 (KHTML, like Gecko) Chrome/14.0.835.202 Safari/535.1"}};
Xd = require("url");
exports.setDefaultLocation = function(a) {
  "string" === typeof a && (a = Xd.parse(a));
  return window.location = a;
};

})();
