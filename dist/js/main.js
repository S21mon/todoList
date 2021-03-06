function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function Button() {
  this.processDelete = function (element) {
    var lineNumber = 0;
    var countVisibleElements = 0;

    for (var i = 0; i < storage.getInstance().getList().children.length; i++) {
      if (storage.getInstance().getList().children[i] === element) {
        lineNumber = i;
      }

      if (!storage.getInstance().getList().children[i].classList.contains(INVISIBLE_ELEMENT_CLASS)) {
        countVisibleElements++;
      }
    }

    if (lineNumber % PAGE_SIZE === 0 && countVisibleElements === 1) {
      var remoteSection = new Section(null, lineNumber);
      remoteSection.removeSection();
    }

    element.remove();
    counters.getInstance().decreaseCounterCases();
  };

  this.processStatusChange = function (element, pressedButton) {
    switch (pressedButton.dataset.status) {
      case STATUS_IN_PROGRESS:
        pressedButton.textContent = TEXT_COMPLETED;
        pressedButton.dataset.status = STATUS_COMPLETED;
        element.querySelector(CONTENT_TASK_SELECTOR).classList.add(COMPELTED_TASK_CLASS);
        break;

      case STATUS_COMPLETED:
        pressedButton.textContent = TEXT_UNCOMPLETED;
        pressedButton.dataset.status = STATUS_IN_PROGRESS;
        element.querySelector(CONTENT_TASK_SELECTOR).classList.remove(COMPELTED_TASK_CLASS);
        break;
    }
  };
}

var PAGE_SIZE = 5;
var KEY_ENTER = 13;
var STATUS_COMPLETED = 'completed';
var STATUS_IN_PROGRESS = 'uncompleted';
var TEXT_UNCOMPLETED = 'Выполнить';
var TEXT_COMPLETED = 'Вернуть';
var TEXT_DELETE_BUTTON = 'Удалить';
var POSITION_SECTION_NUMBER = 3;
var CONTENT_TASK_SELECTOR = '.js-line-text';
var TASK_SELECTOR = '.js-line';
var STATUS_TASK_SELECTOR = '.js-line-status-btn';
var DELETE_TASK_SELECTOR = '.js-line-delete-btn';
var COMPELTED_TASK_CLASS = 'js-line-execute';
var TASK_CLASS = 'js-line';
var CONTENT_TASK_CLASS = 'js-line-text';
var DELETE_BUTTON_CLASS = 'js-line-delete-btn';
var STATUS_BUTTON_CLASS = 'js-line-status-btn';
var INVISIBLE_ELEMENT_CLASS = 'js-invisible-element';
var PAGINATION_BUTTON_CLASS = 'js-btn-pagination';
var SECTION_CLASS = 'js-section';
var SECTION_BUTTON_CLASS = 'js-section-button-';

function Counters() {
  this.instance;
  this.counterCases = 0;
  this.sectionsCounter = 1;

  this.getCounterCases = function () {
    return this.counterCases;
  };

  this.getSectionsCounter = function () {
    return this.sectionsCounter;
  };

  this.setCounterCases = function (number) {
    this.counterCases = number;
  };

  this.setSectionsCounter = function (number) {
    this.sectionsCounter = number;
  };

  this.increaseCounterCases = function () {
    this.counterCases++;
  };

  this.increaseSectionsCounter = function () {
    this.sectionsCounter++;
  };

  this.decreaseCounterCases = function () {
    this.counterCases--;
  };

  this.decreaseSectionsCounter = function () {
    this.sectionsCounter--;
  };

  this.getInstance = function () {
    return this.instance || (this.instance = this);
  };
}

function Filter(filter) {
  this.filter = filter;

  this.initFilters = function () {
    this.filter.addEventListener('click', function (event) {
      var _iterator = _createForOfIteratorHelper(storage.getInstance().getFilter().children),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          block = _step.value;
          var paintElement = new TodoRender(block);
          paintElement.removeColor();
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      paintElement.element = storage.getInstance().getSection();
      var unpaintElement = new TodoRender(event.target);

      if (event.target.classList.contains('js-btn-all')) {
        storage.getInstance().getCountFilterCases().length = 0;

        if (storage.getInstance().getSection().childElementCount !== 0) {
          paintElement.removeColor();
          var selectSection = new TodoRender(storage.getInstance().getSection().children[0]);
          selectSection.showNecessarySection();
        }

        unpaintElement.addColor();
      }

      if (event.target.classList.contains('js-btn-uncomplete') || event.target.classList.contains('js-btn-complete')) {
        paintElement.removeColor();
        storage.getInstance().getCountFilterCases().length = 0;
        cases = new TodoRender();
        unpaintElement.addColor();
        return event.target.classList.contains('js-btn-uncomplete') ? cases.showUncompleteCases() : cases.showCompleteCases();
      }
    });
  };
}

function List() {
  this.createCase = function () {
    var line = document.createElement('li');
    var textLine = document.createElement('span');
    var deleteBtn = document.createElement('button');
    var statusBtn = document.createElement('button');
    line.classList.add(TASK_CLASS);
    textLine.classList.add(CONTENT_TASK_CLASS);
    deleteBtn.classList.add(DELETE_BUTTON_CLASS);
    statusBtn.classList.add(STATUS_BUTTON_CLASS);
    statusBtn.dataset.status = STATUS_IN_PROGRESS;
    textLine.append(storage.getInstance().getCaseName().value);
    storage.getInstance().getList().appendChild(line).append(statusBtn, textLine, deleteBtn);
    storage.getInstance().getCaseName().value = '';
    document.querySelectorAll(STATUS_TASK_SELECTOR)[counters.getInstance().getCounterCases()].textContent = TEXT_UNCOMPLETED;
    document.querySelectorAll(DELETE_TASK_SELECTOR)[counters.getInstance().getCounterCases()].textContent = TEXT_DELETE_BUTTON;
    var task = new Task(line);
    task.initListElement();
    counters.getInstance().increaseCounterCases();

    if (storage.getInstance().getSection().childElementCount === 0 && counters.getInstance().getCounterCases() % PAGE_SIZE === 0) {
      var newSection = new Section();
      newSection.createNewSection();
    }
  };
}
/*! jQuery v3.5.1 | (c) JS Foundation and other contributors | jquery.org/license */


!function (e, t) {
  "use strict";

  "object" == (typeof module === "undefined" ? "undefined" : _typeof(module)) && "object" == _typeof(module.exports) ? module.exports = e.document ? t(e, !0) : function (e) {
    if (!e.document) throw new Error("jQuery requires a window with a document");
    return t(e);
  } : t(e);
}("undefined" != typeof window ? window : this, function (C, e) {
  "use strict";

  var t = [],
      r = Object.getPrototypeOf,
      s = t.slice,
      g = t.flat ? function (e) {
    return t.flat.call(e);
  } : function (e) {
    return t.concat.apply([], e);
  },
      u = t.push,
      i = t.indexOf,
      n = {},
      o = n.toString,
      v = n.hasOwnProperty,
      a = v.toString,
      l = a.call(Object),
      y = {},
      m = function m(e) {
    return "function" == typeof e && "number" != typeof e.nodeType;
  },
      x = function x(e) {
    return null != e && e === e.window;
  },
      E = C.document,
      c = {
    type: !0,
    src: !0,
    nonce: !0,
    noModule: !0
  };

  function b(e, t, n) {
    var r,
        i,
        o = (n = n || E).createElement("script");
    if (o.text = e, t) for (r in c) {
      (i = t[r] || t.getAttribute && t.getAttribute(r)) && o.setAttribute(r, i);
    }
    n.head.appendChild(o).parentNode.removeChild(o);
  }

  function w(e) {
    return null == e ? e + "" : "object" == _typeof(e) || "function" == typeof e ? n[o.call(e)] || "object" : _typeof(e);
  }

  var f = "3.5.1",
      S = function S(e, t) {
    return new S.fn.init(e, t);
  };

  function p(e) {
    var t = !!e && "length" in e && e.length,
        n = w(e);
    return !m(e) && !x(e) && ("array" === n || 0 === t || "number" == typeof t && 0 < t && t - 1 in e);
  }

  S.fn = S.prototype = {
    jquery: f,
    constructor: S,
    length: 0,
    toArray: function toArray() {
      return s.call(this);
    },
    get: function get(e) {
      return null == e ? s.call(this) : e < 0 ? this[e + this.length] : this[e];
    },
    pushStack: function pushStack(e) {
      var t = S.merge(this.constructor(), e);
      return t.prevObject = this, t;
    },
    each: function each(e) {
      return S.each(this, e);
    },
    map: function map(n) {
      return this.pushStack(S.map(this, function (e, t) {
        return n.call(e, t, e);
      }));
    },
    slice: function slice() {
      return this.pushStack(s.apply(this, arguments));
    },
    first: function first() {
      return this.eq(0);
    },
    last: function last() {
      return this.eq(-1);
    },
    even: function even() {
      return this.pushStack(S.grep(this, function (e, t) {
        return (t + 1) % 2;
      }));
    },
    odd: function odd() {
      return this.pushStack(S.grep(this, function (e, t) {
        return t % 2;
      }));
    },
    eq: function eq(e) {
      var t = this.length,
          n = +e + (e < 0 ? t : 0);
      return this.pushStack(0 <= n && n < t ? [this[n]] : []);
    },
    end: function end() {
      return this.prevObject || this.constructor();
    },
    push: u,
    sort: t.sort,
    splice: t.splice
  }, S.extend = S.fn.extend = function () {
    var e,
        t,
        n,
        r,
        i,
        o,
        a = arguments[0] || {},
        s = 1,
        u = arguments.length,
        l = !1;

    for ("boolean" == typeof a && (l = a, a = arguments[s] || {}, s++), "object" == _typeof(a) || m(a) || (a = {}), s === u && (a = this, s--); s < u; s++) {
      if (null != (e = arguments[s])) for (t in e) {
        r = e[t], "__proto__" !== t && a !== r && (l && r && (S.isPlainObject(r) || (i = Array.isArray(r))) ? (n = a[t], o = i && !Array.isArray(n) ? [] : i || S.isPlainObject(n) ? n : {}, i = !1, a[t] = S.extend(l, o, r)) : void 0 !== r && (a[t] = r));
      }
    }

    return a;
  }, S.extend({
    expando: "jQuery" + (f + Math.random()).replace(/\D/g, ""),
    isReady: !0,
    error: function error(e) {
      throw new Error(e);
    },
    noop: function noop() {},
    isPlainObject: function isPlainObject(e) {
      var t, n;
      return !(!e || "[object Object]" !== o.call(e)) && (!(t = r(e)) || "function" == typeof (n = v.call(t, "constructor") && t.constructor) && a.call(n) === l);
    },
    isEmptyObject: function isEmptyObject(e) {
      var t;

      for (t in e) {
        return !1;
      }

      return !0;
    },
    globalEval: function globalEval(e, t, n) {
      b(e, {
        nonce: t && t.nonce
      }, n);
    },
    each: function each(e, t) {
      var n,
          r = 0;

      if (p(e)) {
        for (n = e.length; r < n; r++) {
          if (!1 === t.call(e[r], r, e[r])) break;
        }
      } else for (r in e) {
        if (!1 === t.call(e[r], r, e[r])) break;
      }

      return e;
    },
    makeArray: function makeArray(e, t) {
      var n = t || [];
      return null != e && (p(Object(e)) ? S.merge(n, "string" == typeof e ? [e] : e) : u.call(n, e)), n;
    },
    inArray: function inArray(e, t, n) {
      return null == t ? -1 : i.call(t, e, n);
    },
    merge: function merge(e, t) {
      for (var n = +t.length, r = 0, i = e.length; r < n; r++) {
        e[i++] = t[r];
      }

      return e.length = i, e;
    },
    grep: function grep(e, t, n) {
      for (var r = [], i = 0, o = e.length, a = !n; i < o; i++) {
        !t(e[i], i) !== a && r.push(e[i]);
      }

      return r;
    },
    map: function map(e, t, n) {
      var r,
          i,
          o = 0,
          a = [];
      if (p(e)) for (r = e.length; o < r; o++) {
        null != (i = t(e[o], o, n)) && a.push(i);
      } else for (o in e) {
        null != (i = t(e[o], o, n)) && a.push(i);
      }
      return g(a);
    },
    guid: 1,
    support: y
  }), "function" == typeof Symbol && (S.fn[Symbol.iterator] = t[Symbol.iterator]), S.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function (e, t) {
    n["[object " + t + "]"] = t.toLowerCase();
  });

  var d = function (n) {
    var e,
        d,
        b,
        o,
        i,
        h,
        f,
        g,
        w,
        u,
        l,
        T,
        C,
        a,
        E,
        v,
        s,
        c,
        y,
        S = "sizzle" + 1 * new Date(),
        p = n.document,
        k = 0,
        r = 0,
        m = ue(),
        x = ue(),
        A = ue(),
        N = ue(),
        D = function D(e, t) {
      return e === t && (l = !0), 0;
    },
        j = {}.hasOwnProperty,
        t = [],
        q = t.pop,
        L = t.push,
        H = t.push,
        O = t.slice,
        P = function P(e, t) {
      for (var n = 0, r = e.length; n < r; n++) {
        if (e[n] === t) return n;
      }

      return -1;
    },
        R = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
        M = "[\\x20\\t\\r\\n\\f]",
        I = "(?:\\\\[\\da-fA-F]{1,6}" + M + "?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+",
        W = "\\[" + M + "*(" + I + ")(?:" + M + "*([*^$|!~]?=)" + M + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + I + "))|)" + M + "*\\]",
        F = ":(" + I + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + W + ")*)|.*)\\)|)",
        B = new RegExp(M + "+", "g"),
        $ = new RegExp("^" + M + "+|((?:^|[^\\\\])(?:\\\\.)*)" + M + "+$", "g"),
        _ = new RegExp("^" + M + "*," + M + "*"),
        z = new RegExp("^" + M + "*([>+~]|" + M + ")" + M + "*"),
        U = new RegExp(M + "|>"),
        X = new RegExp(F),
        V = new RegExp("^" + I + "$"),
        G = {
      ID: new RegExp("^#(" + I + ")"),
      CLASS: new RegExp("^\\.(" + I + ")"),
      TAG: new RegExp("^(" + I + "|[*])"),
      ATTR: new RegExp("^" + W),
      PSEUDO: new RegExp("^" + F),
      CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + M + "*(even|odd|(([+-]|)(\\d*)n|)" + M + "*(?:([+-]|)" + M + "*(\\d+)|))" + M + "*\\)|)", "i"),
      bool: new RegExp("^(?:" + R + ")$", "i"),
      needsContext: new RegExp("^" + M + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + M + "*((?:-\\d)?\\d*)" + M + "*\\)|)(?=[^-]|$)", "i")
    },
        Y = /HTML$/i,
        Q = /^(?:input|select|textarea|button)$/i,
        J = /^h\d$/i,
        K = /^[^{]+\{\s*\[native \w/,
        Z = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
        ee = /[+~]/,
        te = new RegExp("\\\\[\\da-fA-F]{1,6}" + M + "?|\\\\([^\\r\\n\\f])", "g"),
        ne = function ne(e, t) {
      var n = "0x" + e.slice(1) - 65536;
      return t || (n < 0 ? String.fromCharCode(n + 65536) : String.fromCharCode(n >> 10 | 55296, 1023 & n | 56320));
    },
        re = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
        ie = function ie(e, t) {
      return t ? "\0" === e ? "\uFFFD" : e.slice(0, -1) + "\\" + e.charCodeAt(e.length - 1).toString(16) + " " : "\\" + e;
    },
        oe = function oe() {
      T();
    },
        ae = be(function (e) {
      return !0 === e.disabled && "fieldset" === e.nodeName.toLowerCase();
    }, {
      dir: "parentNode",
      next: "legend"
    });

    try {
      H.apply(t = O.call(p.childNodes), p.childNodes), t[p.childNodes.length].nodeType;
    } catch (e) {
      H = {
        apply: t.length ? function (e, t) {
          L.apply(e, O.call(t));
        } : function (e, t) {
          var n = e.length,
              r = 0;

          while (e[n++] = t[r++]) {
            ;
          }

          e.length = n - 1;
        }
      };
    }

    function se(t, e, n, r) {
      var i,
          o,
          a,
          s,
          u,
          l,
          c,
          f = e && e.ownerDocument,
          p = e ? e.nodeType : 9;
      if (n = n || [], "string" != typeof t || !t || 1 !== p && 9 !== p && 11 !== p) return n;

      if (!r && (T(e), e = e || C, E)) {
        if (11 !== p && (u = Z.exec(t))) if (i = u[1]) {
          if (9 === p) {
            if (!(a = e.getElementById(i))) return n;
            if (a.id === i) return n.push(a), n;
          } else if (f && (a = f.getElementById(i)) && y(e, a) && a.id === i) return n.push(a), n;
        } else {
          if (u[2]) return H.apply(n, e.getElementsByTagName(t)), n;
          if ((i = u[3]) && d.getElementsByClassName && e.getElementsByClassName) return H.apply(n, e.getElementsByClassName(i)), n;
        }

        if (d.qsa && !N[t + " "] && (!v || !v.test(t)) && (1 !== p || "object" !== e.nodeName.toLowerCase())) {
          if (c = t, f = e, 1 === p && (U.test(t) || z.test(t))) {
            (f = ee.test(t) && ye(e.parentNode) || e) === e && d.scope || ((s = e.getAttribute("id")) ? s = s.replace(re, ie) : e.setAttribute("id", s = S)), o = (l = h(t)).length;

            while (o--) {
              l[o] = (s ? "#" + s : ":scope") + " " + xe(l[o]);
            }

            c = l.join(",");
          }

          try {
            return H.apply(n, f.querySelectorAll(c)), n;
          } catch (e) {
            N(t, !0);
          } finally {
            s === S && e.removeAttribute("id");
          }
        }
      }

      return g(t.replace($, "$1"), e, n, r);
    }

    function ue() {
      var r = [];
      return function e(t, n) {
        return r.push(t + " ") > b.cacheLength && delete e[r.shift()], e[t + " "] = n;
      };
    }

    function le(e) {
      return e[S] = !0, e;
    }

    function ce(e) {
      var t = C.createElement("fieldset");

      try {
        return !!e(t);
      } catch (e) {
        return !1;
      } finally {
        t.parentNode && t.parentNode.removeChild(t), t = null;
      }
    }

    function fe(e, t) {
      var n = e.split("|"),
          r = n.length;

      while (r--) {
        b.attrHandle[n[r]] = t;
      }
    }

    function pe(e, t) {
      var n = t && e,
          r = n && 1 === e.nodeType && 1 === t.nodeType && e.sourceIndex - t.sourceIndex;
      if (r) return r;
      if (n) while (n = n.nextSibling) {
        if (n === t) return -1;
      }
      return e ? 1 : -1;
    }

    function de(t) {
      return function (e) {
        return "input" === e.nodeName.toLowerCase() && e.type === t;
      };
    }

    function he(n) {
      return function (e) {
        var t = e.nodeName.toLowerCase();
        return ("input" === t || "button" === t) && e.type === n;
      };
    }

    function ge(t) {
      return function (e) {
        return "form" in e ? e.parentNode && !1 === e.disabled ? "label" in e ? "label" in e.parentNode ? e.parentNode.disabled === t : e.disabled === t : e.isDisabled === t || e.isDisabled !== !t && ae(e) === t : e.disabled === t : "label" in e && e.disabled === t;
      };
    }

    function ve(a) {
      return le(function (o) {
        return o = +o, le(function (e, t) {
          var n,
              r = a([], e.length, o),
              i = r.length;

          while (i--) {
            e[n = r[i]] && (e[n] = !(t[n] = e[n]));
          }
        });
      });
    }

    function ye(e) {
      return e && "undefined" != typeof e.getElementsByTagName && e;
    }

    for (e in d = se.support = {}, i = se.isXML = function (e) {
      var t = e.namespaceURI,
          n = (e.ownerDocument || e).documentElement;
      return !Y.test(t || n && n.nodeName || "HTML");
    }, T = se.setDocument = function (e) {
      var t,
          n,
          r = e ? e.ownerDocument || e : p;
      return r != C && 9 === r.nodeType && r.documentElement && (a = (C = r).documentElement, E = !i(C), p != C && (n = C.defaultView) && n.top !== n && (n.addEventListener ? n.addEventListener("unload", oe, !1) : n.attachEvent && n.attachEvent("onunload", oe)), d.scope = ce(function (e) {
        return a.appendChild(e).appendChild(C.createElement("div")), "undefined" != typeof e.querySelectorAll && !e.querySelectorAll(":scope fieldset div").length;
      }), d.attributes = ce(function (e) {
        return e.className = "i", !e.getAttribute("className");
      }), d.getElementsByTagName = ce(function (e) {
        return e.appendChild(C.createComment("")), !e.getElementsByTagName("*").length;
      }), d.getElementsByClassName = K.test(C.getElementsByClassName), d.getById = ce(function (e) {
        return a.appendChild(e).id = S, !C.getElementsByName || !C.getElementsByName(S).length;
      }), d.getById ? (b.filter.ID = function (e) {
        var t = e.replace(te, ne);
        return function (e) {
          return e.getAttribute("id") === t;
        };
      }, b.find.ID = function (e, t) {
        if ("undefined" != typeof t.getElementById && E) {
          var n = t.getElementById(e);
          return n ? [n] : [];
        }
      }) : (b.filter.ID = function (e) {
        var n = e.replace(te, ne);
        return function (e) {
          var t = "undefined" != typeof e.getAttributeNode && e.getAttributeNode("id");
          return t && t.value === n;
        };
      }, b.find.ID = function (e, t) {
        if ("undefined" != typeof t.getElementById && E) {
          var n,
              r,
              i,
              o = t.getElementById(e);

          if (o) {
            if ((n = o.getAttributeNode("id")) && n.value === e) return [o];
            i = t.getElementsByName(e), r = 0;

            while (o = i[r++]) {
              if ((n = o.getAttributeNode("id")) && n.value === e) return [o];
            }
          }

          return [];
        }
      }), b.find.TAG = d.getElementsByTagName ? function (e, t) {
        return "undefined" != typeof t.getElementsByTagName ? t.getElementsByTagName(e) : d.qsa ? t.querySelectorAll(e) : void 0;
      } : function (e, t) {
        var n,
            r = [],
            i = 0,
            o = t.getElementsByTagName(e);

        if ("*" === e) {
          while (n = o[i++]) {
            1 === n.nodeType && r.push(n);
          }

          return r;
        }

        return o;
      }, b.find.CLASS = d.getElementsByClassName && function (e, t) {
        if ("undefined" != typeof t.getElementsByClassName && E) return t.getElementsByClassName(e);
      }, s = [], v = [], (d.qsa = K.test(C.querySelectorAll)) && (ce(function (e) {
        var t;
        a.appendChild(e).innerHTML = "<a id='" + S + "'></a><select id='" + S + "-\r\\' msallowcapture=''><option selected=''></option></select>", e.querySelectorAll("[msallowcapture^='']").length && v.push("[*^$]=" + M + "*(?:''|\"\")"), e.querySelectorAll("[selected]").length || v.push("\\[" + M + "*(?:value|" + R + ")"), e.querySelectorAll("[id~=" + S + "-]").length || v.push("~="), (t = C.createElement("input")).setAttribute("name", ""), e.appendChild(t), e.querySelectorAll("[name='']").length || v.push("\\[" + M + "*name" + M + "*=" + M + "*(?:''|\"\")"), e.querySelectorAll(":checked").length || v.push(":checked"), e.querySelectorAll("a#" + S + "+*").length || v.push(".#.+[+~]"), e.querySelectorAll("\\\f"), v.push("[\\r\\n\\f]");
      }), ce(function (e) {
        e.innerHTML = "<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";
        var t = C.createElement("input");
        t.setAttribute("type", "hidden"), e.appendChild(t).setAttribute("name", "D"), e.querySelectorAll("[name=d]").length && v.push("name" + M + "*[*^$|!~]?="), 2 !== e.querySelectorAll(":enabled").length && v.push(":enabled", ":disabled"), a.appendChild(e).disabled = !0, 2 !== e.querySelectorAll(":disabled").length && v.push(":enabled", ":disabled"), e.querySelectorAll("*,:x"), v.push(",.*:");
      })), (d.matchesSelector = K.test(c = a.matches || a.webkitMatchesSelector || a.mozMatchesSelector || a.oMatchesSelector || a.msMatchesSelector)) && ce(function (e) {
        d.disconnectedMatch = c.call(e, "*"), c.call(e, "[s!='']:x"), s.push("!=", F);
      }), v = v.length && new RegExp(v.join("|")), s = s.length && new RegExp(s.join("|")), t = K.test(a.compareDocumentPosition), y = t || K.test(a.contains) ? function (e, t) {
        var n = 9 === e.nodeType ? e.documentElement : e,
            r = t && t.parentNode;
        return e === r || !(!r || 1 !== r.nodeType || !(n.contains ? n.contains(r) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(r)));
      } : function (e, t) {
        if (t) while (t = t.parentNode) {
          if (t === e) return !0;
        }
        return !1;
      }, D = t ? function (e, t) {
        if (e === t) return l = !0, 0;
        var n = !e.compareDocumentPosition - !t.compareDocumentPosition;
        return n || (1 & (n = (e.ownerDocument || e) == (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1) || !d.sortDetached && t.compareDocumentPosition(e) === n ? e == C || e.ownerDocument == p && y(p, e) ? -1 : t == C || t.ownerDocument == p && y(p, t) ? 1 : u ? P(u, e) - P(u, t) : 0 : 4 & n ? -1 : 1);
      } : function (e, t) {
        if (e === t) return l = !0, 0;
        var n,
            r = 0,
            i = e.parentNode,
            o = t.parentNode,
            a = [e],
            s = [t];
        if (!i || !o) return e == C ? -1 : t == C ? 1 : i ? -1 : o ? 1 : u ? P(u, e) - P(u, t) : 0;
        if (i === o) return pe(e, t);
        n = e;

        while (n = n.parentNode) {
          a.unshift(n);
        }

        n = t;

        while (n = n.parentNode) {
          s.unshift(n);
        }

        while (a[r] === s[r]) {
          r++;
        }

        return r ? pe(a[r], s[r]) : a[r] == p ? -1 : s[r] == p ? 1 : 0;
      }), C;
    }, se.matches = function (e, t) {
      return se(e, null, null, t);
    }, se.matchesSelector = function (e, t) {
      if (T(e), d.matchesSelector && E && !N[t + " "] && (!s || !s.test(t)) && (!v || !v.test(t))) try {
        var n = c.call(e, t);
        if (n || d.disconnectedMatch || e.document && 11 !== e.document.nodeType) return n;
      } catch (e) {
        N(t, !0);
      }
      return 0 < se(t, C, null, [e]).length;
    }, se.contains = function (e, t) {
      return (e.ownerDocument || e) != C && T(e), y(e, t);
    }, se.attr = function (e, t) {
      (e.ownerDocument || e) != C && T(e);
      var n = b.attrHandle[t.toLowerCase()],
          r = n && j.call(b.attrHandle, t.toLowerCase()) ? n(e, t, !E) : void 0;
      return void 0 !== r ? r : d.attributes || !E ? e.getAttribute(t) : (r = e.getAttributeNode(t)) && r.specified ? r.value : null;
    }, se.escape = function (e) {
      return (e + "").replace(re, ie);
    }, se.error = function (e) {
      throw new Error("Syntax error, unrecognized expression: " + e);
    }, se.uniqueSort = function (e) {
      var t,
          n = [],
          r = 0,
          i = 0;

      if (l = !d.detectDuplicates, u = !d.sortStable && e.slice(0), e.sort(D), l) {
        while (t = e[i++]) {
          t === e[i] && (r = n.push(i));
        }

        while (r--) {
          e.splice(n[r], 1);
        }
      }

      return u = null, e;
    }, o = se.getText = function (e) {
      var t,
          n = "",
          r = 0,
          i = e.nodeType;

      if (i) {
        if (1 === i || 9 === i || 11 === i) {
          if ("string" == typeof e.textContent) return e.textContent;

          for (e = e.firstChild; e; e = e.nextSibling) {
            n += o(e);
          }
        } else if (3 === i || 4 === i) return e.nodeValue;
      } else while (t = e[r++]) {
        n += o(t);
      }

      return n;
    }, (b = se.selectors = {
      cacheLength: 50,
      createPseudo: le,
      match: G,
      attrHandle: {},
      find: {},
      relative: {
        ">": {
          dir: "parentNode",
          first: !0
        },
        " ": {
          dir: "parentNode"
        },
        "+": {
          dir: "previousSibling",
          first: !0
        },
        "~": {
          dir: "previousSibling"
        }
      },
      preFilter: {
        ATTR: function ATTR(e) {
          return e[1] = e[1].replace(te, ne), e[3] = (e[3] || e[4] || e[5] || "").replace(te, ne), "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4);
        },
        CHILD: function CHILD(e) {
          return e[1] = e[1].toLowerCase(), "nth" === e[1].slice(0, 3) ? (e[3] || se.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && se.error(e[0]), e;
        },
        PSEUDO: function PSEUDO(e) {
          var t,
              n = !e[6] && e[2];
          return G.CHILD.test(e[0]) ? null : (e[3] ? e[2] = e[4] || e[5] || "" : n && X.test(n) && (t = h(n, !0)) && (t = n.indexOf(")", n.length - t) - n.length) && (e[0] = e[0].slice(0, t), e[2] = n.slice(0, t)), e.slice(0, 3));
        }
      },
      filter: {
        TAG: function TAG(e) {
          var t = e.replace(te, ne).toLowerCase();
          return "*" === e ? function () {
            return !0;
          } : function (e) {
            return e.nodeName && e.nodeName.toLowerCase() === t;
          };
        },
        CLASS: function CLASS(e) {
          var t = m[e + " "];
          return t || (t = new RegExp("(^|" + M + ")" + e + "(" + M + "|$)")) && m(e, function (e) {
            return t.test("string" == typeof e.className && e.className || "undefined" != typeof e.getAttribute && e.getAttribute("class") || "");
          });
        },
        ATTR: function ATTR(n, r, i) {
          return function (e) {
            var t = se.attr(e, n);
            return null == t ? "!=" === r : !r || (t += "", "=" === r ? t === i : "!=" === r ? t !== i : "^=" === r ? i && 0 === t.indexOf(i) : "*=" === r ? i && -1 < t.indexOf(i) : "$=" === r ? i && t.slice(-i.length) === i : "~=" === r ? -1 < (" " + t.replace(B, " ") + " ").indexOf(i) : "|=" === r && (t === i || t.slice(0, i.length + 1) === i + "-"));
          };
        },
        CHILD: function CHILD(h, e, t, g, v) {
          var y = "nth" !== h.slice(0, 3),
              m = "last" !== h.slice(-4),
              x = "of-type" === e;
          return 1 === g && 0 === v ? function (e) {
            return !!e.parentNode;
          } : function (e, t, n) {
            var r,
                i,
                o,
                a,
                s,
                u,
                l = y !== m ? "nextSibling" : "previousSibling",
                c = e.parentNode,
                f = x && e.nodeName.toLowerCase(),
                p = !n && !x,
                d = !1;

            if (c) {
              if (y) {
                while (l) {
                  a = e;

                  while (a = a[l]) {
                    if (x ? a.nodeName.toLowerCase() === f : 1 === a.nodeType) return !1;
                  }

                  u = l = "only" === h && !u && "nextSibling";
                }

                return !0;
              }

              if (u = [m ? c.firstChild : c.lastChild], m && p) {
                d = (s = (r = (i = (o = (a = c)[S] || (a[S] = {}))[a.uniqueID] || (o[a.uniqueID] = {}))[h] || [])[0] === k && r[1]) && r[2], a = s && c.childNodes[s];

                while (a = ++s && a && a[l] || (d = s = 0) || u.pop()) {
                  if (1 === a.nodeType && ++d && a === e) {
                    i[h] = [k, s, d];
                    break;
                  }
                }
              } else if (p && (d = s = (r = (i = (o = (a = e)[S] || (a[S] = {}))[a.uniqueID] || (o[a.uniqueID] = {}))[h] || [])[0] === k && r[1]), !1 === d) while (a = ++s && a && a[l] || (d = s = 0) || u.pop()) {
                if ((x ? a.nodeName.toLowerCase() === f : 1 === a.nodeType) && ++d && (p && ((i = (o = a[S] || (a[S] = {}))[a.uniqueID] || (o[a.uniqueID] = {}))[h] = [k, d]), a === e)) break;
              }

              return (d -= v) === g || d % g == 0 && 0 <= d / g;
            }
          };
        },
        PSEUDO: function PSEUDO(e, o) {
          var t,
              a = b.pseudos[e] || b.setFilters[e.toLowerCase()] || se.error("unsupported pseudo: " + e);
          return a[S] ? a(o) : 1 < a.length ? (t = [e, e, "", o], b.setFilters.hasOwnProperty(e.toLowerCase()) ? le(function (e, t) {
            var n,
                r = a(e, o),
                i = r.length;

            while (i--) {
              e[n = P(e, r[i])] = !(t[n] = r[i]);
            }
          }) : function (e) {
            return a(e, 0, t);
          }) : a;
        }
      },
      pseudos: {
        not: le(function (e) {
          var r = [],
              i = [],
              s = f(e.replace($, "$1"));
          return s[S] ? le(function (e, t, n, r) {
            var i,
                o = s(e, null, r, []),
                a = e.length;

            while (a--) {
              (i = o[a]) && (e[a] = !(t[a] = i));
            }
          }) : function (e, t, n) {
            return r[0] = e, s(r, null, n, i), r[0] = null, !i.pop();
          };
        }),
        has: le(function (t) {
          return function (e) {
            return 0 < se(t, e).length;
          };
        }),
        contains: le(function (t) {
          return t = t.replace(te, ne), function (e) {
            return -1 < (e.textContent || o(e)).indexOf(t);
          };
        }),
        lang: le(function (n) {
          return V.test(n || "") || se.error("unsupported lang: " + n), n = n.replace(te, ne).toLowerCase(), function (e) {
            var t;

            do {
              if (t = E ? e.lang : e.getAttribute("xml:lang") || e.getAttribute("lang")) return (t = t.toLowerCase()) === n || 0 === t.indexOf(n + "-");
            } while ((e = e.parentNode) && 1 === e.nodeType);

            return !1;
          };
        }),
        target: function target(e) {
          var t = n.location && n.location.hash;
          return t && t.slice(1) === e.id;
        },
        root: function root(e) {
          return e === a;
        },
        focus: function focus(e) {
          return e === C.activeElement && (!C.hasFocus || C.hasFocus()) && !!(e.type || e.href || ~e.tabIndex);
        },
        enabled: ge(!1),
        disabled: ge(!0),
        checked: function checked(e) {
          var t = e.nodeName.toLowerCase();
          return "input" === t && !!e.checked || "option" === t && !!e.selected;
        },
        selected: function selected(e) {
          return e.parentNode && e.parentNode.selectedIndex, !0 === e.selected;
        },
        empty: function empty(e) {
          for (e = e.firstChild; e; e = e.nextSibling) {
            if (e.nodeType < 6) return !1;
          }

          return !0;
        },
        parent: function parent(e) {
          return !b.pseudos.empty(e);
        },
        header: function header(e) {
          return J.test(e.nodeName);
        },
        input: function input(e) {
          return Q.test(e.nodeName);
        },
        button: function button(e) {
          var t = e.nodeName.toLowerCase();
          return "input" === t && "button" === e.type || "button" === t;
        },
        text: function text(e) {
          var t;
          return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || "text" === t.toLowerCase());
        },
        first: ve(function () {
          return [0];
        }),
        last: ve(function (e, t) {
          return [t - 1];
        }),
        eq: ve(function (e, t, n) {
          return [n < 0 ? n + t : n];
        }),
        even: ve(function (e, t) {
          for (var n = 0; n < t; n += 2) {
            e.push(n);
          }

          return e;
        }),
        odd: ve(function (e, t) {
          for (var n = 1; n < t; n += 2) {
            e.push(n);
          }

          return e;
        }),
        lt: ve(function (e, t, n) {
          for (var r = n < 0 ? n + t : t < n ? t : n; 0 <= --r;) {
            e.push(r);
          }

          return e;
        }),
        gt: ve(function (e, t, n) {
          for (var r = n < 0 ? n + t : n; ++r < t;) {
            e.push(r);
          }

          return e;
        })
      }
    }).pseudos.nth = b.pseudos.eq, {
      radio: !0,
      checkbox: !0,
      file: !0,
      password: !0,
      image: !0
    }) {
      b.pseudos[e] = de(e);
    }

    for (e in {
      submit: !0,
      reset: !0
    }) {
      b.pseudos[e] = he(e);
    }

    function me() {}

    function xe(e) {
      for (var t = 0, n = e.length, r = ""; t < n; t++) {
        r += e[t].value;
      }

      return r;
    }

    function be(s, e, t) {
      var u = e.dir,
          l = e.next,
          c = l || u,
          f = t && "parentNode" === c,
          p = r++;
      return e.first ? function (e, t, n) {
        while (e = e[u]) {
          if (1 === e.nodeType || f) return s(e, t, n);
        }

        return !1;
      } : function (e, t, n) {
        var r,
            i,
            o,
            a = [k, p];

        if (n) {
          while (e = e[u]) {
            if ((1 === e.nodeType || f) && s(e, t, n)) return !0;
          }
        } else while (e = e[u]) {
          if (1 === e.nodeType || f) if (i = (o = e[S] || (e[S] = {}))[e.uniqueID] || (o[e.uniqueID] = {}), l && l === e.nodeName.toLowerCase()) e = e[u] || e;else {
            if ((r = i[c]) && r[0] === k && r[1] === p) return a[2] = r[2];
            if ((i[c] = a)[2] = s(e, t, n)) return !0;
          }
        }

        return !1;
      };
    }

    function we(i) {
      return 1 < i.length ? function (e, t, n) {
        var r = i.length;

        while (r--) {
          if (!i[r](e, t, n)) return !1;
        }

        return !0;
      } : i[0];
    }

    function Te(e, t, n, r, i) {
      for (var o, a = [], s = 0, u = e.length, l = null != t; s < u; s++) {
        (o = e[s]) && (n && !n(o, r, i) || (a.push(o), l && t.push(s)));
      }

      return a;
    }

    function Ce(d, h, g, v, y, e) {
      return v && !v[S] && (v = Ce(v)), y && !y[S] && (y = Ce(y, e)), le(function (e, t, n, r) {
        var i,
            o,
            a,
            s = [],
            u = [],
            l = t.length,
            c = e || function (e, t, n) {
          for (var r = 0, i = t.length; r < i; r++) {
            se(e, t[r], n);
          }

          return n;
        }(h || "*", n.nodeType ? [n] : n, []),
            f = !d || !e && h ? c : Te(c, s, d, n, r),
            p = g ? y || (e ? d : l || v) ? [] : t : f;

        if (g && g(f, p, n, r), v) {
          i = Te(p, u), v(i, [], n, r), o = i.length;

          while (o--) {
            (a = i[o]) && (p[u[o]] = !(f[u[o]] = a));
          }
        }

        if (e) {
          if (y || d) {
            if (y) {
              i = [], o = p.length;

              while (o--) {
                (a = p[o]) && i.push(f[o] = a);
              }

              y(null, p = [], i, r);
            }

            o = p.length;

            while (o--) {
              (a = p[o]) && -1 < (i = y ? P(e, a) : s[o]) && (e[i] = !(t[i] = a));
            }
          }
        } else p = Te(p === t ? p.splice(l, p.length) : p), y ? y(null, t, p, r) : H.apply(t, p);
      });
    }

    function Ee(e) {
      for (var i, t, n, r = e.length, o = b.relative[e[0].type], a = o || b.relative[" "], s = o ? 1 : 0, u = be(function (e) {
        return e === i;
      }, a, !0), l = be(function (e) {
        return -1 < P(i, e);
      }, a, !0), c = [function (e, t, n) {
        var r = !o && (n || t !== w) || ((i = t).nodeType ? u(e, t, n) : l(e, t, n));
        return i = null, r;
      }]; s < r; s++) {
        if (t = b.relative[e[s].type]) c = [be(we(c), t)];else {
          if ((t = b.filter[e[s].type].apply(null, e[s].matches))[S]) {
            for (n = ++s; n < r; n++) {
              if (b.relative[e[n].type]) break;
            }

            return Ce(1 < s && we(c), 1 < s && xe(e.slice(0, s - 1).concat({
              value: " " === e[s - 2].type ? "*" : ""
            })).replace($, "$1"), t, s < n && Ee(e.slice(s, n)), n < r && Ee(e = e.slice(n)), n < r && xe(e));
          }

          c.push(t);
        }
      }

      return we(c);
    }

    return me.prototype = b.filters = b.pseudos, b.setFilters = new me(), h = se.tokenize = function (e, t) {
      var n,
          r,
          i,
          o,
          a,
          s,
          u,
          l = x[e + " "];
      if (l) return t ? 0 : l.slice(0);
      a = e, s = [], u = b.preFilter;

      while (a) {
        for (o in n && !(r = _.exec(a)) || (r && (a = a.slice(r[0].length) || a), s.push(i = [])), n = !1, (r = z.exec(a)) && (n = r.shift(), i.push({
          value: n,
          type: r[0].replace($, " ")
        }), a = a.slice(n.length)), b.filter) {
          !(r = G[o].exec(a)) || u[o] && !(r = u[o](r)) || (n = r.shift(), i.push({
            value: n,
            type: o,
            matches: r
          }), a = a.slice(n.length));
        }

        if (!n) break;
      }

      return t ? a.length : a ? se.error(e) : x(e, s).slice(0);
    }, f = se.compile = function (e, t) {
      var n,
          v,
          y,
          m,
          x,
          r,
          i = [],
          o = [],
          a = A[e + " "];

      if (!a) {
        t || (t = h(e)), n = t.length;

        while (n--) {
          (a = Ee(t[n]))[S] ? i.push(a) : o.push(a);
        }

        (a = A(e, (v = o, m = 0 < (y = i).length, x = 0 < v.length, r = function r(e, t, n, _r2, i) {
          var o,
              a,
              s,
              u = 0,
              l = "0",
              c = e && [],
              f = [],
              p = w,
              d = e || x && b.find.TAG("*", i),
              h = k += null == p ? 1 : Math.random() || .1,
              g = d.length;

          for (i && (w = t == C || t || i); l !== g && null != (o = d[l]); l++) {
            if (x && o) {
              a = 0, t || o.ownerDocument == C || (T(o), n = !E);

              while (s = v[a++]) {
                if (s(o, t || C, n)) {
                  _r2.push(o);

                  break;
                }
              }

              i && (k = h);
            }

            m && ((o = !s && o) && u--, e && c.push(o));
          }

          if (u += l, m && l !== u) {
            a = 0;

            while (s = y[a++]) {
              s(c, f, t, n);
            }

            if (e) {
              if (0 < u) while (l--) {
                c[l] || f[l] || (f[l] = q.call(_r2));
              }
              f = Te(f);
            }

            H.apply(_r2, f), i && !e && 0 < f.length && 1 < u + y.length && se.uniqueSort(_r2);
          }

          return i && (k = h, w = p), c;
        }, m ? le(r) : r))).selector = e;
      }

      return a;
    }, g = se.select = function (e, t, n, r) {
      var i,
          o,
          a,
          s,
          u,
          l = "function" == typeof e && e,
          c = !r && h(e = l.selector || e);

      if (n = n || [], 1 === c.length) {
        if (2 < (o = c[0] = c[0].slice(0)).length && "ID" === (a = o[0]).type && 9 === t.nodeType && E && b.relative[o[1].type]) {
          if (!(t = (b.find.ID(a.matches[0].replace(te, ne), t) || [])[0])) return n;
          l && (t = t.parentNode), e = e.slice(o.shift().value.length);
        }

        i = G.needsContext.test(e) ? 0 : o.length;

        while (i--) {
          if (a = o[i], b.relative[s = a.type]) break;

          if ((u = b.find[s]) && (r = u(a.matches[0].replace(te, ne), ee.test(o[0].type) && ye(t.parentNode) || t))) {
            if (o.splice(i, 1), !(e = r.length && xe(o))) return H.apply(n, r), n;
            break;
          }
        }
      }

      return (l || f(e, c))(r, t, !E, n, !t || ee.test(e) && ye(t.parentNode) || t), n;
    }, d.sortStable = S.split("").sort(D).join("") === S, d.detectDuplicates = !!l, T(), d.sortDetached = ce(function (e) {
      return 1 & e.compareDocumentPosition(C.createElement("fieldset"));
    }), ce(function (e) {
      return e.innerHTML = "<a href='#'></a>", "#" === e.firstChild.getAttribute("href");
    }) || fe("type|href|height|width", function (e, t, n) {
      if (!n) return e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2);
    }), d.attributes && ce(function (e) {
      return e.innerHTML = "<input/>", e.firstChild.setAttribute("value", ""), "" === e.firstChild.getAttribute("value");
    }) || fe("value", function (e, t, n) {
      if (!n && "input" === e.nodeName.toLowerCase()) return e.defaultValue;
    }), ce(function (e) {
      return null == e.getAttribute("disabled");
    }) || fe(R, function (e, t, n) {
      var r;
      if (!n) return !0 === e[t] ? t.toLowerCase() : (r = e.getAttributeNode(t)) && r.specified ? r.value : null;
    }), se;
  }(C);

  S.find = d, S.expr = d.selectors, S.expr[":"] = S.expr.pseudos, S.uniqueSort = S.unique = d.uniqueSort, S.text = d.getText, S.isXMLDoc = d.isXML, S.contains = d.contains, S.escapeSelector = d.escape;

  var h = function h(e, t, n) {
    var r = [],
        i = void 0 !== n;

    while ((e = e[t]) && 9 !== e.nodeType) {
      if (1 === e.nodeType) {
        if (i && S(e).is(n)) break;
        r.push(e);
      }
    }

    return r;
  },
      T = function T(e, t) {
    for (var n = []; e; e = e.nextSibling) {
      1 === e.nodeType && e !== t && n.push(e);
    }

    return n;
  },
      k = S.expr.match.needsContext;

  function A(e, t) {
    return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase();
  }

  var N = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;

  function D(e, n, r) {
    return m(n) ? S.grep(e, function (e, t) {
      return !!n.call(e, t, e) !== r;
    }) : n.nodeType ? S.grep(e, function (e) {
      return e === n !== r;
    }) : "string" != typeof n ? S.grep(e, function (e) {
      return -1 < i.call(n, e) !== r;
    }) : S.filter(n, e, r);
  }

  S.filter = function (e, t, n) {
    var r = t[0];
    return n && (e = ":not(" + e + ")"), 1 === t.length && 1 === r.nodeType ? S.find.matchesSelector(r, e) ? [r] : [] : S.find.matches(e, S.grep(t, function (e) {
      return 1 === e.nodeType;
    }));
  }, S.fn.extend({
    find: function find(e) {
      var t,
          n,
          r = this.length,
          i = this;
      if ("string" != typeof e) return this.pushStack(S(e).filter(function () {
        for (t = 0; t < r; t++) {
          if (S.contains(i[t], this)) return !0;
        }
      }));

      for (n = this.pushStack([]), t = 0; t < r; t++) {
        S.find(e, i[t], n);
      }

      return 1 < r ? S.uniqueSort(n) : n;
    },
    filter: function filter(e) {
      return this.pushStack(D(this, e || [], !1));
    },
    not: function not(e) {
      return this.pushStack(D(this, e || [], !0));
    },
    is: function is(e) {
      return !!D(this, "string" == typeof e && k.test(e) ? S(e) : e || [], !1).length;
    }
  });
  var j,
      q = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;
  (S.fn.init = function (e, t, n) {
    var r, i;
    if (!e) return this;

    if (n = n || j, "string" == typeof e) {
      if (!(r = "<" === e[0] && ">" === e[e.length - 1] && 3 <= e.length ? [null, e, null] : q.exec(e)) || !r[1] && t) return !t || t.jquery ? (t || n).find(e) : this.constructor(t).find(e);

      if (r[1]) {
        if (t = t instanceof S ? t[0] : t, S.merge(this, S.parseHTML(r[1], t && t.nodeType ? t.ownerDocument || t : E, !0)), N.test(r[1]) && S.isPlainObject(t)) for (r in t) {
          m(this[r]) ? this[r](t[r]) : this.attr(r, t[r]);
        }
        return this;
      }

      return (i = E.getElementById(r[2])) && (this[0] = i, this.length = 1), this;
    }

    return e.nodeType ? (this[0] = e, this.length = 1, this) : m(e) ? void 0 !== n.ready ? n.ready(e) : e(S) : S.makeArray(e, this);
  }).prototype = S.fn, j = S(E);
  var L = /^(?:parents|prev(?:Until|All))/,
      H = {
    children: !0,
    contents: !0,
    next: !0,
    prev: !0
  };

  function O(e, t) {
    while ((e = e[t]) && 1 !== e.nodeType) {
      ;
    }

    return e;
  }

  S.fn.extend({
    has: function has(e) {
      var t = S(e, this),
          n = t.length;
      return this.filter(function () {
        for (var e = 0; e < n; e++) {
          if (S.contains(this, t[e])) return !0;
        }
      });
    },
    closest: function closest(e, t) {
      var n,
          r = 0,
          i = this.length,
          o = [],
          a = "string" != typeof e && S(e);
      if (!k.test(e)) for (; r < i; r++) {
        for (n = this[r]; n && n !== t; n = n.parentNode) {
          if (n.nodeType < 11 && (a ? -1 < a.index(n) : 1 === n.nodeType && S.find.matchesSelector(n, e))) {
            o.push(n);
            break;
          }
        }
      }
      return this.pushStack(1 < o.length ? S.uniqueSort(o) : o);
    },
    index: function index(e) {
      return e ? "string" == typeof e ? i.call(S(e), this[0]) : i.call(this, e.jquery ? e[0] : e) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
    },
    add: function add(e, t) {
      return this.pushStack(S.uniqueSort(S.merge(this.get(), S(e, t))));
    },
    addBack: function addBack(e) {
      return this.add(null == e ? this.prevObject : this.prevObject.filter(e));
    }
  }), S.each({
    parent: function parent(e) {
      var t = e.parentNode;
      return t && 11 !== t.nodeType ? t : null;
    },
    parents: function parents(e) {
      return h(e, "parentNode");
    },
    parentsUntil: function parentsUntil(e, t, n) {
      return h(e, "parentNode", n);
    },
    next: function next(e) {
      return O(e, "nextSibling");
    },
    prev: function prev(e) {
      return O(e, "previousSibling");
    },
    nextAll: function nextAll(e) {
      return h(e, "nextSibling");
    },
    prevAll: function prevAll(e) {
      return h(e, "previousSibling");
    },
    nextUntil: function nextUntil(e, t, n) {
      return h(e, "nextSibling", n);
    },
    prevUntil: function prevUntil(e, t, n) {
      return h(e, "previousSibling", n);
    },
    siblings: function siblings(e) {
      return T((e.parentNode || {}).firstChild, e);
    },
    children: function children(e) {
      return T(e.firstChild);
    },
    contents: function contents(e) {
      return null != e.contentDocument && r(e.contentDocument) ? e.contentDocument : (A(e, "template") && (e = e.content || e), S.merge([], e.childNodes));
    }
  }, function (r, i) {
    S.fn[r] = function (e, t) {
      var n = S.map(this, i, e);
      return "Until" !== r.slice(-5) && (t = e), t && "string" == typeof t && (n = S.filter(t, n)), 1 < this.length && (H[r] || S.uniqueSort(n), L.test(r) && n.reverse()), this.pushStack(n);
    };
  });
  var P = /[^\x20\t\r\n\f]+/g;

  function R(e) {
    return e;
  }

  function M(e) {
    throw e;
  }

  function I(e, t, n, r) {
    var i;

    try {
      e && m(i = e.promise) ? i.call(e).done(t).fail(n) : e && m(i = e.then) ? i.call(e, t, n) : t.apply(void 0, [e].slice(r));
    } catch (e) {
      n.apply(void 0, [e]);
    }
  }

  S.Callbacks = function (r) {
    var e, n;
    r = "string" == typeof r ? (e = r, n = {}, S.each(e.match(P) || [], function (e, t) {
      n[t] = !0;
    }), n) : S.extend({}, r);

    var i,
        t,
        o,
        a,
        s = [],
        u = [],
        l = -1,
        c = function c() {
      for (a = a || r.once, o = i = !0; u.length; l = -1) {
        t = u.shift();

        while (++l < s.length) {
          !1 === s[l].apply(t[0], t[1]) && r.stopOnFalse && (l = s.length, t = !1);
        }
      }

      r.memory || (t = !1), i = !1, a && (s = t ? [] : "");
    },
        f = {
      add: function add() {
        return s && (t && !i && (l = s.length - 1, u.push(t)), function n(e) {
          S.each(e, function (e, t) {
            m(t) ? r.unique && f.has(t) || s.push(t) : t && t.length && "string" !== w(t) && n(t);
          });
        }(arguments), t && !i && c()), this;
      },
      remove: function remove() {
        return S.each(arguments, function (e, t) {
          var n;

          while (-1 < (n = S.inArray(t, s, n))) {
            s.splice(n, 1), n <= l && l--;
          }
        }), this;
      },
      has: function has(e) {
        return e ? -1 < S.inArray(e, s) : 0 < s.length;
      },
      empty: function empty() {
        return s && (s = []), this;
      },
      disable: function disable() {
        return a = u = [], s = t = "", this;
      },
      disabled: function disabled() {
        return !s;
      },
      lock: function lock() {
        return a = u = [], t || i || (s = t = ""), this;
      },
      locked: function locked() {
        return !!a;
      },
      fireWith: function fireWith(e, t) {
        return a || (t = [e, (t = t || []).slice ? t.slice() : t], u.push(t), i || c()), this;
      },
      fire: function fire() {
        return f.fireWith(this, arguments), this;
      },
      fired: function fired() {
        return !!o;
      }
    };

    return f;
  }, S.extend({
    Deferred: function Deferred(e) {
      var o = [["notify", "progress", S.Callbacks("memory"), S.Callbacks("memory"), 2], ["resolve", "done", S.Callbacks("once memory"), S.Callbacks("once memory"), 0, "resolved"], ["reject", "fail", S.Callbacks("once memory"), S.Callbacks("once memory"), 1, "rejected"]],
          i = "pending",
          a = {
        state: function state() {
          return i;
        },
        always: function always() {
          return s.done(arguments).fail(arguments), this;
        },
        "catch": function _catch(e) {
          return a.then(null, e);
        },
        pipe: function pipe() {
          var i = arguments;
          return S.Deferred(function (r) {
            S.each(o, function (e, t) {
              var n = m(i[t[4]]) && i[t[4]];
              s[t[1]](function () {
                var e = n && n.apply(this, arguments);
                e && m(e.promise) ? e.promise().progress(r.notify).done(r.resolve).fail(r.reject) : r[t[0] + "With"](this, n ? [e] : arguments);
              });
            }), i = null;
          }).promise();
        },
        then: function then(t, n, r) {
          var u = 0;

          function l(i, o, a, s) {
            return function () {
              var n = this,
                  r = arguments,
                  e = function e() {
                var e, t;

                if (!(i < u)) {
                  if ((e = a.apply(n, r)) === o.promise()) throw new TypeError("Thenable self-resolution");
                  t = e && ("object" == _typeof(e) || "function" == typeof e) && e.then, m(t) ? s ? t.call(e, l(u, o, R, s), l(u, o, M, s)) : (u++, t.call(e, l(u, o, R, s), l(u, o, M, s), l(u, o, R, o.notifyWith))) : (a !== R && (n = void 0, r = [e]), (s || o.resolveWith)(n, r));
                }
              },
                  t = s ? e : function () {
                try {
                  e();
                } catch (e) {
                  S.Deferred.exceptionHook && S.Deferred.exceptionHook(e, t.stackTrace), u <= i + 1 && (a !== M && (n = void 0, r = [e]), o.rejectWith(n, r));
                }
              };

              i ? t() : (S.Deferred.getStackHook && (t.stackTrace = S.Deferred.getStackHook()), C.setTimeout(t));
            };
          }

          return S.Deferred(function (e) {
            o[0][3].add(l(0, e, m(r) ? r : R, e.notifyWith)), o[1][3].add(l(0, e, m(t) ? t : R)), o[2][3].add(l(0, e, m(n) ? n : M));
          }).promise();
        },
        promise: function promise(e) {
          return null != e ? S.extend(e, a) : a;
        }
      },
          s = {};
      return S.each(o, function (e, t) {
        var n = t[2],
            r = t[5];
        a[t[1]] = n.add, r && n.add(function () {
          i = r;
        }, o[3 - e][2].disable, o[3 - e][3].disable, o[0][2].lock, o[0][3].lock), n.add(t[3].fire), s[t[0]] = function () {
          return s[t[0] + "With"](this === s ? void 0 : this, arguments), this;
        }, s[t[0] + "With"] = n.fireWith;
      }), a.promise(s), e && e.call(s, s), s;
    },
    when: function when(e) {
      var n = arguments.length,
          t = n,
          r = Array(t),
          i = s.call(arguments),
          o = S.Deferred(),
          a = function a(t) {
        return function (e) {
          r[t] = this, i[t] = 1 < arguments.length ? s.call(arguments) : e, --n || o.resolveWith(r, i);
        };
      };

      if (n <= 1 && (I(e, o.done(a(t)).resolve, o.reject, !n), "pending" === o.state() || m(i[t] && i[t].then))) return o.then();

      while (t--) {
        I(i[t], a(t), o.reject);
      }

      return o.promise();
    }
  });
  var W = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
  S.Deferred.exceptionHook = function (e, t) {
    C.console && C.console.warn && e && W.test(e.name) && C.console.warn("jQuery.Deferred exception: " + e.message, e.stack, t);
  }, S.readyException = function (e) {
    C.setTimeout(function () {
      throw e;
    });
  };
  var F = S.Deferred();

  function B() {
    E.removeEventListener("DOMContentLoaded", B), C.removeEventListener("load", B), S.ready();
  }

  S.fn.ready = function (e) {
    return F.then(e)["catch"](function (e) {
      S.readyException(e);
    }), this;
  }, S.extend({
    isReady: !1,
    readyWait: 1,
    ready: function ready(e) {
      (!0 === e ? --S.readyWait : S.isReady) || (S.isReady = !0) !== e && 0 < --S.readyWait || F.resolveWith(E, [S]);
    }
  }), S.ready.then = F.then, "complete" === E.readyState || "loading" !== E.readyState && !E.documentElement.doScroll ? C.setTimeout(S.ready) : (E.addEventListener("DOMContentLoaded", B), C.addEventListener("load", B));

  var $ = function $(e, t, n, r, i, o, a) {
    var s = 0,
        u = e.length,
        l = null == n;
    if ("object" === w(n)) for (s in i = !0, n) {
      $(e, t, s, n[s], !0, o, a);
    } else if (void 0 !== r && (i = !0, m(r) || (a = !0), l && (a ? (t.call(e, r), t = null) : (l = t, t = function t(e, _t2, n) {
      return l.call(S(e), n);
    })), t)) for (; s < u; s++) {
      t(e[s], n, a ? r : r.call(e[s], s, t(e[s], n)));
    }
    return i ? e : l ? t.call(e) : u ? t(e[0], n) : o;
  },
      _ = /^-ms-/,
      z = /-([a-z])/g;

  function U(e, t) {
    return t.toUpperCase();
  }

  function X(e) {
    return e.replace(_, "ms-").replace(z, U);
  }

  var V = function V(e) {
    return 1 === e.nodeType || 9 === e.nodeType || !+e.nodeType;
  };

  function G() {
    this.expando = S.expando + G.uid++;
  }

  G.uid = 1, G.prototype = {
    cache: function cache(e) {
      var t = e[this.expando];
      return t || (t = {}, V(e) && (e.nodeType ? e[this.expando] = t : Object.defineProperty(e, this.expando, {
        value: t,
        configurable: !0
      }))), t;
    },
    set: function set(e, t, n) {
      var r,
          i = this.cache(e);
      if ("string" == typeof t) i[X(t)] = n;else for (r in t) {
        i[X(r)] = t[r];
      }
      return i;
    },
    get: function get(e, t) {
      return void 0 === t ? this.cache(e) : e[this.expando] && e[this.expando][X(t)];
    },
    access: function access(e, t, n) {
      return void 0 === t || t && "string" == typeof t && void 0 === n ? this.get(e, t) : (this.set(e, t, n), void 0 !== n ? n : t);
    },
    remove: function remove(e, t) {
      var n,
          r = e[this.expando];

      if (void 0 !== r) {
        if (void 0 !== t) {
          n = (t = Array.isArray(t) ? t.map(X) : (t = X(t)) in r ? [t] : t.match(P) || []).length;

          while (n--) {
            delete r[t[n]];
          }
        }

        (void 0 === t || S.isEmptyObject(r)) && (e.nodeType ? e[this.expando] = void 0 : delete e[this.expando]);
      }
    },
    hasData: function hasData(e) {
      var t = e[this.expando];
      return void 0 !== t && !S.isEmptyObject(t);
    }
  };
  var Y = new G(),
      Q = new G(),
      J = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
      K = /[A-Z]/g;

  function Z(e, t, n) {
    var r, i;
    if (void 0 === n && 1 === e.nodeType) if (r = "data-" + t.replace(K, "-$&").toLowerCase(), "string" == typeof (n = e.getAttribute(r))) {
      try {
        n = "true" === (i = n) || "false" !== i && ("null" === i ? null : i === +i + "" ? +i : J.test(i) ? JSON.parse(i) : i);
      } catch (e) {}

      Q.set(e, t, n);
    } else n = void 0;
    return n;
  }

  S.extend({
    hasData: function hasData(e) {
      return Q.hasData(e) || Y.hasData(e);
    },
    data: function data(e, t, n) {
      return Q.access(e, t, n);
    },
    removeData: function removeData(e, t) {
      Q.remove(e, t);
    },
    _data: function _data(e, t, n) {
      return Y.access(e, t, n);
    },
    _removeData: function _removeData(e, t) {
      Y.remove(e, t);
    }
  }), S.fn.extend({
    data: function data(n, e) {
      var t,
          r,
          i,
          o = this[0],
          a = o && o.attributes;

      if (void 0 === n) {
        if (this.length && (i = Q.get(o), 1 === o.nodeType && !Y.get(o, "hasDataAttrs"))) {
          t = a.length;

          while (t--) {
            a[t] && 0 === (r = a[t].name).indexOf("data-") && (r = X(r.slice(5)), Z(o, r, i[r]));
          }

          Y.set(o, "hasDataAttrs", !0);
        }

        return i;
      }

      return "object" == _typeof(n) ? this.each(function () {
        Q.set(this, n);
      }) : $(this, function (e) {
        var t;
        if (o && void 0 === e) return void 0 !== (t = Q.get(o, n)) ? t : void 0 !== (t = Z(o, n)) ? t : void 0;
        this.each(function () {
          Q.set(this, n, e);
        });
      }, null, e, 1 < arguments.length, null, !0);
    },
    removeData: function removeData(e) {
      return this.each(function () {
        Q.remove(this, e);
      });
    }
  }), S.extend({
    queue: function queue(e, t, n) {
      var r;
      if (e) return t = (t || "fx") + "queue", r = Y.get(e, t), n && (!r || Array.isArray(n) ? r = Y.access(e, t, S.makeArray(n)) : r.push(n)), r || [];
    },
    dequeue: function dequeue(e, t) {
      t = t || "fx";

      var n = S.queue(e, t),
          r = n.length,
          i = n.shift(),
          o = S._queueHooks(e, t);

      "inprogress" === i && (i = n.shift(), r--), i && ("fx" === t && n.unshift("inprogress"), delete o.stop, i.call(e, function () {
        S.dequeue(e, t);
      }, o)), !r && o && o.empty.fire();
    },
    _queueHooks: function _queueHooks(e, t) {
      var n = t + "queueHooks";
      return Y.get(e, n) || Y.access(e, n, {
        empty: S.Callbacks("once memory").add(function () {
          Y.remove(e, [t + "queue", n]);
        })
      });
    }
  }), S.fn.extend({
    queue: function queue(t, n) {
      var e = 2;
      return "string" != typeof t && (n = t, t = "fx", e--), arguments.length < e ? S.queue(this[0], t) : void 0 === n ? this : this.each(function () {
        var e = S.queue(this, t, n);
        S._queueHooks(this, t), "fx" === t && "inprogress" !== e[0] && S.dequeue(this, t);
      });
    },
    dequeue: function dequeue(e) {
      return this.each(function () {
        S.dequeue(this, e);
      });
    },
    clearQueue: function clearQueue(e) {
      return this.queue(e || "fx", []);
    },
    promise: function promise(e, t) {
      var n,
          r = 1,
          i = S.Deferred(),
          o = this,
          a = this.length,
          s = function s() {
        --r || i.resolveWith(o, [o]);
      };

      "string" != typeof e && (t = e, e = void 0), e = e || "fx";

      while (a--) {
        (n = Y.get(o[a], e + "queueHooks")) && n.empty && (r++, n.empty.add(s));
      }

      return s(), i.promise(t);
    }
  });

  var ee = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
      te = new RegExp("^(?:([+-])=|)(" + ee + ")([a-z%]*)$", "i"),
      ne = ["Top", "Right", "Bottom", "Left"],
      re = E.documentElement,
      ie = function ie(e) {
    return S.contains(e.ownerDocument, e);
  },
      oe = {
    composed: !0
  };

  re.getRootNode && (ie = function ie(e) {
    return S.contains(e.ownerDocument, e) || e.getRootNode(oe) === e.ownerDocument;
  });

  var ae = function ae(e, t) {
    return "none" === (e = t || e).style.display || "" === e.style.display && ie(e) && "none" === S.css(e, "display");
  };

  function se(e, t, n, r) {
    var i,
        o,
        a = 20,
        s = r ? function () {
      return r.cur();
    } : function () {
      return S.css(e, t, "");
    },
        u = s(),
        l = n && n[3] || (S.cssNumber[t] ? "" : "px"),
        c = e.nodeType && (S.cssNumber[t] || "px" !== l && +u) && te.exec(S.css(e, t));

    if (c && c[3] !== l) {
      u /= 2, l = l || c[3], c = +u || 1;

      while (a--) {
        S.style(e, t, c + l), (1 - o) * (1 - (o = s() / u || .5)) <= 0 && (a = 0), c /= o;
      }

      c *= 2, S.style(e, t, c + l), n = n || [];
    }

    return n && (c = +c || +u || 0, i = n[1] ? c + (n[1] + 1) * n[2] : +n[2], r && (r.unit = l, r.start = c, r.end = i)), i;
  }

  var ue = {};

  function le(e, t) {
    for (var n, r, i, o, a, s, u, l = [], c = 0, f = e.length; c < f; c++) {
      (r = e[c]).style && (n = r.style.display, t ? ("none" === n && (l[c] = Y.get(r, "display") || null, l[c] || (r.style.display = "")), "" === r.style.display && ae(r) && (l[c] = (u = a = o = void 0, a = (i = r).ownerDocument, s = i.nodeName, (u = ue[s]) || (o = a.body.appendChild(a.createElement(s)), u = S.css(o, "display"), o.parentNode.removeChild(o), "none" === u && (u = "block"), ue[s] = u)))) : "none" !== n && (l[c] = "none", Y.set(r, "display", n)));
    }

    for (c = 0; c < f; c++) {
      null != l[c] && (e[c].style.display = l[c]);
    }

    return e;
  }

  S.fn.extend({
    show: function show() {
      return le(this, !0);
    },
    hide: function hide() {
      return le(this);
    },
    toggle: function toggle(e) {
      return "boolean" == typeof e ? e ? this.show() : this.hide() : this.each(function () {
        ae(this) ? S(this).show() : S(this).hide();
      });
    }
  });
  var ce,
      fe,
      pe = /^(?:checkbox|radio)$/i,
      de = /<([a-z][^\/\0>\x20\t\r\n\f]*)/i,
      he = /^$|^module$|\/(?:java|ecma)script/i;
  ce = E.createDocumentFragment().appendChild(E.createElement("div")), (fe = E.createElement("input")).setAttribute("type", "radio"), fe.setAttribute("checked", "checked"), fe.setAttribute("name", "t"), ce.appendChild(fe), y.checkClone = ce.cloneNode(!0).cloneNode(!0).lastChild.checked, ce.innerHTML = "<textarea>x</textarea>", y.noCloneChecked = !!ce.cloneNode(!0).lastChild.defaultValue, ce.innerHTML = "<option></option>", y.option = !!ce.lastChild;
  var ge = {
    thead: [1, "<table>", "</table>"],
    col: [2, "<table><colgroup>", "</colgroup></table>"],
    tr: [2, "<table><tbody>", "</tbody></table>"],
    td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
    _default: [0, "", ""]
  };

  function ve(e, t) {
    var n;
    return n = "undefined" != typeof e.getElementsByTagName ? e.getElementsByTagName(t || "*") : "undefined" != typeof e.querySelectorAll ? e.querySelectorAll(t || "*") : [], void 0 === t || t && A(e, t) ? S.merge([e], n) : n;
  }

  function ye(e, t) {
    for (var n = 0, r = e.length; n < r; n++) {
      Y.set(e[n], "globalEval", !t || Y.get(t[n], "globalEval"));
    }
  }

  ge.tbody = ge.tfoot = ge.colgroup = ge.caption = ge.thead, ge.th = ge.td, y.option || (ge.optgroup = ge.option = [1, "<select multiple='multiple'>", "</select>"]);
  var me = /<|&#?\w+;/;

  function xe(e, t, n, r, i) {
    for (var o, a, s, u, l, c, f = t.createDocumentFragment(), p = [], d = 0, h = e.length; d < h; d++) {
      if ((o = e[d]) || 0 === o) if ("object" === w(o)) S.merge(p, o.nodeType ? [o] : o);else if (me.test(o)) {
        a = a || f.appendChild(t.createElement("div")), s = (de.exec(o) || ["", ""])[1].toLowerCase(), u = ge[s] || ge._default, a.innerHTML = u[1] + S.htmlPrefilter(o) + u[2], c = u[0];

        while (c--) {
          a = a.lastChild;
        }

        S.merge(p, a.childNodes), (a = f.firstChild).textContent = "";
      } else p.push(t.createTextNode(o));
    }

    f.textContent = "", d = 0;

    while (o = p[d++]) {
      if (r && -1 < S.inArray(o, r)) i && i.push(o);else if (l = ie(o), a = ve(f.appendChild(o), "script"), l && ye(a), n) {
        c = 0;

        while (o = a[c++]) {
          he.test(o.type || "") && n.push(o);
        }
      }
    }

    return f;
  }

  var be = /^key/,
      we = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
      Te = /^([^.]*)(?:\.(.+)|)/;

  function Ce() {
    return !0;
  }

  function Ee() {
    return !1;
  }

  function Se(e, t) {
    return e === function () {
      try {
        return E.activeElement;
      } catch (e) {}
    }() == ("focus" === t);
  }

  function ke(e, t, n, r, i, o) {
    var a, s;

    if ("object" == _typeof(t)) {
      for (s in "string" != typeof n && (r = r || n, n = void 0), t) {
        ke(e, s, n, r, t[s], o);
      }

      return e;
    }

    if (null == r && null == i ? (i = n, r = n = void 0) : null == i && ("string" == typeof n ? (i = r, r = void 0) : (i = r, r = n, n = void 0)), !1 === i) i = Ee;else if (!i) return e;
    return 1 === o && (a = i, (i = function i(e) {
      return S().off(e), a.apply(this, arguments);
    }).guid = a.guid || (a.guid = S.guid++)), e.each(function () {
      S.event.add(this, t, i, r, n);
    });
  }

  function Ae(e, i, o) {
    o ? (Y.set(e, i, !1), S.event.add(e, i, {
      namespace: !1,
      handler: function handler(e) {
        var t,
            n,
            r = Y.get(this, i);

        if (1 & e.isTrigger && this[i]) {
          if (r.length) (S.event.special[i] || {}).delegateType && e.stopPropagation();else if (r = s.call(arguments), Y.set(this, i, r), t = o(this, i), this[i](), r !== (n = Y.get(this, i)) || t ? Y.set(this, i, !1) : n = {}, r !== n) return e.stopImmediatePropagation(), e.preventDefault(), n.value;
        } else r.length && (Y.set(this, i, {
          value: S.event.trigger(S.extend(r[0], S.Event.prototype), r.slice(1), this)
        }), e.stopImmediatePropagation());
      }
    })) : void 0 === Y.get(e, i) && S.event.add(e, i, Ce);
  }

  S.event = {
    global: {},
    add: function add(t, e, n, r, i) {
      var o,
          a,
          s,
          u,
          l,
          c,
          f,
          p,
          d,
          h,
          g,
          v = Y.get(t);

      if (V(t)) {
        n.handler && (n = (o = n).handler, i = o.selector), i && S.find.matchesSelector(re, i), n.guid || (n.guid = S.guid++), (u = v.events) || (u = v.events = Object.create(null)), (a = v.handle) || (a = v.handle = function (e) {
          return "undefined" != typeof S && S.event.triggered !== e.type ? S.event.dispatch.apply(t, arguments) : void 0;
        }), l = (e = (e || "").match(P) || [""]).length;

        while (l--) {
          d = g = (s = Te.exec(e[l]) || [])[1], h = (s[2] || "").split(".").sort(), d && (f = S.event.special[d] || {}, d = (i ? f.delegateType : f.bindType) || d, f = S.event.special[d] || {}, c = S.extend({
            type: d,
            origType: g,
            data: r,
            handler: n,
            guid: n.guid,
            selector: i,
            needsContext: i && S.expr.match.needsContext.test(i),
            namespace: h.join(".")
          }, o), (p = u[d]) || ((p = u[d] = []).delegateCount = 0, f.setup && !1 !== f.setup.call(t, r, h, a) || t.addEventListener && t.addEventListener(d, a)), f.add && (f.add.call(t, c), c.handler.guid || (c.handler.guid = n.guid)), i ? p.splice(p.delegateCount++, 0, c) : p.push(c), S.event.global[d] = !0);
        }
      }
    },
    remove: function remove(e, t, n, r, i) {
      var o,
          a,
          s,
          u,
          l,
          c,
          f,
          p,
          d,
          h,
          g,
          v = Y.hasData(e) && Y.get(e);

      if (v && (u = v.events)) {
        l = (t = (t || "").match(P) || [""]).length;

        while (l--) {
          if (d = g = (s = Te.exec(t[l]) || [])[1], h = (s[2] || "").split(".").sort(), d) {
            f = S.event.special[d] || {}, p = u[d = (r ? f.delegateType : f.bindType) || d] || [], s = s[2] && new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)"), a = o = p.length;

            while (o--) {
              c = p[o], !i && g !== c.origType || n && n.guid !== c.guid || s && !s.test(c.namespace) || r && r !== c.selector && ("**" !== r || !c.selector) || (p.splice(o, 1), c.selector && p.delegateCount--, f.remove && f.remove.call(e, c));
            }

            a && !p.length && (f.teardown && !1 !== f.teardown.call(e, h, v.handle) || S.removeEvent(e, d, v.handle), delete u[d]);
          } else for (d in u) {
            S.event.remove(e, d + t[l], n, r, !0);
          }
        }

        S.isEmptyObject(u) && Y.remove(e, "handle events");
      }
    },
    dispatch: function dispatch(e) {
      var t,
          n,
          r,
          i,
          o,
          a,
          s = new Array(arguments.length),
          u = S.event.fix(e),
          l = (Y.get(this, "events") || Object.create(null))[u.type] || [],
          c = S.event.special[u.type] || {};

      for (s[0] = u, t = 1; t < arguments.length; t++) {
        s[t] = arguments[t];
      }

      if (u.delegateTarget = this, !c.preDispatch || !1 !== c.preDispatch.call(this, u)) {
        a = S.event.handlers.call(this, u, l), t = 0;

        while ((i = a[t++]) && !u.isPropagationStopped()) {
          u.currentTarget = i.elem, n = 0;

          while ((o = i.handlers[n++]) && !u.isImmediatePropagationStopped()) {
            u.rnamespace && !1 !== o.namespace && !u.rnamespace.test(o.namespace) || (u.handleObj = o, u.data = o.data, void 0 !== (r = ((S.event.special[o.origType] || {}).handle || o.handler).apply(i.elem, s)) && !1 === (u.result = r) && (u.preventDefault(), u.stopPropagation()));
          }
        }

        return c.postDispatch && c.postDispatch.call(this, u), u.result;
      }
    },
    handlers: function handlers(e, t) {
      var n,
          r,
          i,
          o,
          a,
          s = [],
          u = t.delegateCount,
          l = e.target;
      if (u && l.nodeType && !("click" === e.type && 1 <= e.button)) for (; l !== this; l = l.parentNode || this) {
        if (1 === l.nodeType && ("click" !== e.type || !0 !== l.disabled)) {
          for (o = [], a = {}, n = 0; n < u; n++) {
            void 0 === a[i = (r = t[n]).selector + " "] && (a[i] = r.needsContext ? -1 < S(i, this).index(l) : S.find(i, this, null, [l]).length), a[i] && o.push(r);
          }

          o.length && s.push({
            elem: l,
            handlers: o
          });
        }
      }
      return l = this, u < t.length && s.push({
        elem: l,
        handlers: t.slice(u)
      }), s;
    },
    addProp: function addProp(t, e) {
      Object.defineProperty(S.Event.prototype, t, {
        enumerable: !0,
        configurable: !0,
        get: m(e) ? function () {
          if (this.originalEvent) return e(this.originalEvent);
        } : function () {
          if (this.originalEvent) return this.originalEvent[t];
        },
        set: function set(e) {
          Object.defineProperty(this, t, {
            enumerable: !0,
            configurable: !0,
            writable: !0,
            value: e
          });
        }
      });
    },
    fix: function fix(e) {
      return e[S.expando] ? e : new S.Event(e);
    },
    special: {
      load: {
        noBubble: !0
      },
      click: {
        setup: function setup(e) {
          var t = this || e;
          return pe.test(t.type) && t.click && A(t, "input") && Ae(t, "click", Ce), !1;
        },
        trigger: function trigger(e) {
          var t = this || e;
          return pe.test(t.type) && t.click && A(t, "input") && Ae(t, "click"), !0;
        },
        _default: function _default(e) {
          var t = e.target;
          return pe.test(t.type) && t.click && A(t, "input") && Y.get(t, "click") || A(t, "a");
        }
      },
      beforeunload: {
        postDispatch: function postDispatch(e) {
          void 0 !== e.result && e.originalEvent && (e.originalEvent.returnValue = e.result);
        }
      }
    }
  }, S.removeEvent = function (e, t, n) {
    e.removeEventListener && e.removeEventListener(t, n);
  }, S.Event = function (e, t) {
    if (!(this instanceof S.Event)) return new S.Event(e, t);
    e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || void 0 === e.defaultPrevented && !1 === e.returnValue ? Ce : Ee, this.target = e.target && 3 === e.target.nodeType ? e.target.parentNode : e.target, this.currentTarget = e.currentTarget, this.relatedTarget = e.relatedTarget) : this.type = e, t && S.extend(this, t), this.timeStamp = e && e.timeStamp || Date.now(), this[S.expando] = !0;
  }, S.Event.prototype = {
    constructor: S.Event,
    isDefaultPrevented: Ee,
    isPropagationStopped: Ee,
    isImmediatePropagationStopped: Ee,
    isSimulated: !1,
    preventDefault: function preventDefault() {
      var e = this.originalEvent;
      this.isDefaultPrevented = Ce, e && !this.isSimulated && e.preventDefault();
    },
    stopPropagation: function stopPropagation() {
      var e = this.originalEvent;
      this.isPropagationStopped = Ce, e && !this.isSimulated && e.stopPropagation();
    },
    stopImmediatePropagation: function stopImmediatePropagation() {
      var e = this.originalEvent;
      this.isImmediatePropagationStopped = Ce, e && !this.isSimulated && e.stopImmediatePropagation(), this.stopPropagation();
    }
  }, S.each({
    altKey: !0,
    bubbles: !0,
    cancelable: !0,
    changedTouches: !0,
    ctrlKey: !0,
    detail: !0,
    eventPhase: !0,
    metaKey: !0,
    pageX: !0,
    pageY: !0,
    shiftKey: !0,
    view: !0,
    "char": !0,
    code: !0,
    charCode: !0,
    key: !0,
    keyCode: !0,
    button: !0,
    buttons: !0,
    clientX: !0,
    clientY: !0,
    offsetX: !0,
    offsetY: !0,
    pointerId: !0,
    pointerType: !0,
    screenX: !0,
    screenY: !0,
    targetTouches: !0,
    toElement: !0,
    touches: !0,
    which: function which(e) {
      var t = e.button;
      return null == e.which && be.test(e.type) ? null != e.charCode ? e.charCode : e.keyCode : !e.which && void 0 !== t && we.test(e.type) ? 1 & t ? 1 : 2 & t ? 3 : 4 & t ? 2 : 0 : e.which;
    }
  }, S.event.addProp), S.each({
    focus: "focusin",
    blur: "focusout"
  }, function (e, t) {
    S.event.special[e] = {
      setup: function setup() {
        return Ae(this, e, Se), !1;
      },
      trigger: function trigger() {
        return Ae(this, e), !0;
      },
      delegateType: t
    };
  }), S.each({
    mouseenter: "mouseover",
    mouseleave: "mouseout",
    pointerenter: "pointerover",
    pointerleave: "pointerout"
  }, function (e, i) {
    S.event.special[e] = {
      delegateType: i,
      bindType: i,
      handle: function handle(e) {
        var t,
            n = e.relatedTarget,
            r = e.handleObj;
        return n && (n === this || S.contains(this, n)) || (e.type = r.origType, t = r.handler.apply(this, arguments), e.type = i), t;
      }
    };
  }), S.fn.extend({
    on: function on(e, t, n, r) {
      return ke(this, e, t, n, r);
    },
    one: function one(e, t, n, r) {
      return ke(this, e, t, n, r, 1);
    },
    off: function off(e, t, n) {
      var r, i;
      if (e && e.preventDefault && e.handleObj) return r = e.handleObj, S(e.delegateTarget).off(r.namespace ? r.origType + "." + r.namespace : r.origType, r.selector, r.handler), this;

      if ("object" == _typeof(e)) {
        for (i in e) {
          this.off(i, t, e[i]);
        }

        return this;
      }

      return !1 !== t && "function" != typeof t || (n = t, t = void 0), !1 === n && (n = Ee), this.each(function () {
        S.event.remove(this, e, n, t);
      });
    }
  });
  var Ne = /<script|<style|<link/i,
      De = /checked\s*(?:[^=]|=\s*.checked.)/i,
      je = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

  function qe(e, t) {
    return A(e, "table") && A(11 !== t.nodeType ? t : t.firstChild, "tr") && S(e).children("tbody")[0] || e;
  }

  function Le(e) {
    return e.type = (null !== e.getAttribute("type")) + "/" + e.type, e;
  }

  function He(e) {
    return "true/" === (e.type || "").slice(0, 5) ? e.type = e.type.slice(5) : e.removeAttribute("type"), e;
  }

  function Oe(e, t) {
    var n, r, i, o, a, s;

    if (1 === t.nodeType) {
      if (Y.hasData(e) && (s = Y.get(e).events)) for (i in Y.remove(t, "handle events"), s) {
        for (n = 0, r = s[i].length; n < r; n++) {
          S.event.add(t, i, s[i][n]);
        }
      }
      Q.hasData(e) && (o = Q.access(e), a = S.extend({}, o), Q.set(t, a));
    }
  }

  function Pe(n, r, i, o) {
    r = g(r);
    var e,
        t,
        a,
        s,
        u,
        l,
        c = 0,
        f = n.length,
        p = f - 1,
        d = r[0],
        h = m(d);
    if (h || 1 < f && "string" == typeof d && !y.checkClone && De.test(d)) return n.each(function (e) {
      var t = n.eq(e);
      h && (r[0] = d.call(this, e, t.html())), Pe(t, r, i, o);
    });

    if (f && (t = (e = xe(r, n[0].ownerDocument, !1, n, o)).firstChild, 1 === e.childNodes.length && (e = t), t || o)) {
      for (s = (a = S.map(ve(e, "script"), Le)).length; c < f; c++) {
        u = e, c !== p && (u = S.clone(u, !0, !0), s && S.merge(a, ve(u, "script"))), i.call(n[c], u, c);
      }

      if (s) for (l = a[a.length - 1].ownerDocument, S.map(a, He), c = 0; c < s; c++) {
        u = a[c], he.test(u.type || "") && !Y.access(u, "globalEval") && S.contains(l, u) && (u.src && "module" !== (u.type || "").toLowerCase() ? S._evalUrl && !u.noModule && S._evalUrl(u.src, {
          nonce: u.nonce || u.getAttribute("nonce")
        }, l) : b(u.textContent.replace(je, ""), u, l));
      }
    }

    return n;
  }

  function Re(e, t, n) {
    for (var r, i = t ? S.filter(t, e) : e, o = 0; null != (r = i[o]); o++) {
      n || 1 !== r.nodeType || S.cleanData(ve(r)), r.parentNode && (n && ie(r) && ye(ve(r, "script")), r.parentNode.removeChild(r));
    }

    return e;
  }

  S.extend({
    htmlPrefilter: function htmlPrefilter(e) {
      return e;
    },
    clone: function clone(e, t, n) {
      var r,
          i,
          o,
          a,
          s,
          u,
          l,
          c = e.cloneNode(!0),
          f = ie(e);
      if (!(y.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || S.isXMLDoc(e))) for (a = ve(c), r = 0, i = (o = ve(e)).length; r < i; r++) {
        s = o[r], u = a[r], void 0, "input" === (l = u.nodeName.toLowerCase()) && pe.test(s.type) ? u.checked = s.checked : "input" !== l && "textarea" !== l || (u.defaultValue = s.defaultValue);
      }
      if (t) if (n) for (o = o || ve(e), a = a || ve(c), r = 0, i = o.length; r < i; r++) {
        Oe(o[r], a[r]);
      } else Oe(e, c);
      return 0 < (a = ve(c, "script")).length && ye(a, !f && ve(e, "script")), c;
    },
    cleanData: function cleanData(e) {
      for (var t, n, r, i = S.event.special, o = 0; void 0 !== (n = e[o]); o++) {
        if (V(n)) {
          if (t = n[Y.expando]) {
            if (t.events) for (r in t.events) {
              i[r] ? S.event.remove(n, r) : S.removeEvent(n, r, t.handle);
            }
            n[Y.expando] = void 0;
          }

          n[Q.expando] && (n[Q.expando] = void 0);
        }
      }
    }
  }), S.fn.extend({
    detach: function detach(e) {
      return Re(this, e, !0);
    },
    remove: function remove(e) {
      return Re(this, e);
    },
    text: function text(e) {
      return $(this, function (e) {
        return void 0 === e ? S.text(this) : this.empty().each(function () {
          1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || (this.textContent = e);
        });
      }, null, e, arguments.length);
    },
    append: function append() {
      return Pe(this, arguments, function (e) {
        1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || qe(this, e).appendChild(e);
      });
    },
    prepend: function prepend() {
      return Pe(this, arguments, function (e) {
        if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
          var t = qe(this, e);
          t.insertBefore(e, t.firstChild);
        }
      });
    },
    before: function before() {
      return Pe(this, arguments, function (e) {
        this.parentNode && this.parentNode.insertBefore(e, this);
      });
    },
    after: function after() {
      return Pe(this, arguments, function (e) {
        this.parentNode && this.parentNode.insertBefore(e, this.nextSibling);
      });
    },
    empty: function empty() {
      for (var e, t = 0; null != (e = this[t]); t++) {
        1 === e.nodeType && (S.cleanData(ve(e, !1)), e.textContent = "");
      }

      return this;
    },
    clone: function clone(e, t) {
      return e = null != e && e, t = null == t ? e : t, this.map(function () {
        return S.clone(this, e, t);
      });
    },
    html: function html(e) {
      return $(this, function (e) {
        var t = this[0] || {},
            n = 0,
            r = this.length;
        if (void 0 === e && 1 === t.nodeType) return t.innerHTML;

        if ("string" == typeof e && !Ne.test(e) && !ge[(de.exec(e) || ["", ""])[1].toLowerCase()]) {
          e = S.htmlPrefilter(e);

          try {
            for (; n < r; n++) {
              1 === (t = this[n] || {}).nodeType && (S.cleanData(ve(t, !1)), t.innerHTML = e);
            }

            t = 0;
          } catch (e) {}
        }

        t && this.empty().append(e);
      }, null, e, arguments.length);
    },
    replaceWith: function replaceWith() {
      var n = [];
      return Pe(this, arguments, function (e) {
        var t = this.parentNode;
        S.inArray(this, n) < 0 && (S.cleanData(ve(this)), t && t.replaceChild(e, this));
      }, n);
    }
  }), S.each({
    appendTo: "append",
    prependTo: "prepend",
    insertBefore: "before",
    insertAfter: "after",
    replaceAll: "replaceWith"
  }, function (e, a) {
    S.fn[e] = function (e) {
      for (var t, n = [], r = S(e), i = r.length - 1, o = 0; o <= i; o++) {
        t = o === i ? this : this.clone(!0), S(r[o])[a](t), u.apply(n, t.get());
      }

      return this.pushStack(n);
    };
  });

  var Me = new RegExp("^(" + ee + ")(?!px)[a-z%]+$", "i"),
      Ie = function Ie(e) {
    var t = e.ownerDocument.defaultView;
    return t && t.opener || (t = C), t.getComputedStyle(e);
  },
      We = function We(e, t, n) {
    var r,
        i,
        o = {};

    for (i in t) {
      o[i] = e.style[i], e.style[i] = t[i];
    }

    for (i in r = n.call(e), t) {
      e.style[i] = o[i];
    }

    return r;
  },
      Fe = new RegExp(ne.join("|"), "i");

  function Be(e, t, n) {
    var r,
        i,
        o,
        a,
        s = e.style;
    return (n = n || Ie(e)) && ("" !== (a = n.getPropertyValue(t) || n[t]) || ie(e) || (a = S.style(e, t)), !y.pixelBoxStyles() && Me.test(a) && Fe.test(t) && (r = s.width, i = s.minWidth, o = s.maxWidth, s.minWidth = s.maxWidth = s.width = a, a = n.width, s.width = r, s.minWidth = i, s.maxWidth = o)), void 0 !== a ? a + "" : a;
  }

  function $e(e, t) {
    return {
      get: function get() {
        if (!e()) return (this.get = t).apply(this, arguments);
        delete this.get;
      }
    };
  }

  !function () {
    function e() {
      if (l) {
        u.style.cssText = "position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0", l.style.cssText = "position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%", re.appendChild(u).appendChild(l);
        var e = C.getComputedStyle(l);
        n = "1%" !== e.top, s = 12 === t(e.marginLeft), l.style.right = "60%", o = 36 === t(e.right), r = 36 === t(e.width), l.style.position = "absolute", i = 12 === t(l.offsetWidth / 3), re.removeChild(u), l = null;
      }
    }

    function t(e) {
      return Math.round(parseFloat(e));
    }

    var n,
        r,
        i,
        o,
        a,
        s,
        u = E.createElement("div"),
        l = E.createElement("div");
    l.style && (l.style.backgroundClip = "content-box", l.cloneNode(!0).style.backgroundClip = "", y.clearCloneStyle = "content-box" === l.style.backgroundClip, S.extend(y, {
      boxSizingReliable: function boxSizingReliable() {
        return e(), r;
      },
      pixelBoxStyles: function pixelBoxStyles() {
        return e(), o;
      },
      pixelPosition: function pixelPosition() {
        return e(), n;
      },
      reliableMarginLeft: function reliableMarginLeft() {
        return e(), s;
      },
      scrollboxSize: function scrollboxSize() {
        return e(), i;
      },
      reliableTrDimensions: function reliableTrDimensions() {
        var e, t, n, r;
        return null == a && (e = E.createElement("table"), t = E.createElement("tr"), n = E.createElement("div"), e.style.cssText = "position:absolute;left:-11111px", t.style.height = "1px", n.style.height = "9px", re.appendChild(e).appendChild(t).appendChild(n), r = C.getComputedStyle(t), a = 3 < parseInt(r.height), re.removeChild(e)), a;
      }
    }));
  }();
  var _e = ["Webkit", "Moz", "ms"],
      ze = E.createElement("div").style,
      Ue = {};

  function Xe(e) {
    var t = S.cssProps[e] || Ue[e];
    return t || (e in ze ? e : Ue[e] = function (e) {
      var t = e[0].toUpperCase() + e.slice(1),
          n = _e.length;

      while (n--) {
        if ((e = _e[n] + t) in ze) return e;
      }
    }(e) || e);
  }

  var Ve = /^(none|table(?!-c[ea]).+)/,
      Ge = /^--/,
      Ye = {
    position: "absolute",
    visibility: "hidden",
    display: "block"
  },
      Qe = {
    letterSpacing: "0",
    fontWeight: "400"
  };

  function Je(e, t, n) {
    var r = te.exec(t);
    return r ? Math.max(0, r[2] - (n || 0)) + (r[3] || "px") : t;
  }

  function Ke(e, t, n, r, i, o) {
    var a = "width" === t ? 1 : 0,
        s = 0,
        u = 0;
    if (n === (r ? "border" : "content")) return 0;

    for (; a < 4; a += 2) {
      "margin" === n && (u += S.css(e, n + ne[a], !0, i)), r ? ("content" === n && (u -= S.css(e, "padding" + ne[a], !0, i)), "margin" !== n && (u -= S.css(e, "border" + ne[a] + "Width", !0, i))) : (u += S.css(e, "padding" + ne[a], !0, i), "padding" !== n ? u += S.css(e, "border" + ne[a] + "Width", !0, i) : s += S.css(e, "border" + ne[a] + "Width", !0, i));
    }

    return !r && 0 <= o && (u += Math.max(0, Math.ceil(e["offset" + t[0].toUpperCase() + t.slice(1)] - o - u - s - .5)) || 0), u;
  }

  function Ze(e, t, n) {
    var r = Ie(e),
        i = (!y.boxSizingReliable() || n) && "border-box" === S.css(e, "boxSizing", !1, r),
        o = i,
        a = Be(e, t, r),
        s = "offset" + t[0].toUpperCase() + t.slice(1);

    if (Me.test(a)) {
      if (!n) return a;
      a = "auto";
    }

    return (!y.boxSizingReliable() && i || !y.reliableTrDimensions() && A(e, "tr") || "auto" === a || !parseFloat(a) && "inline" === S.css(e, "display", !1, r)) && e.getClientRects().length && (i = "border-box" === S.css(e, "boxSizing", !1, r), (o = s in e) && (a = e[s])), (a = parseFloat(a) || 0) + Ke(e, t, n || (i ? "border" : "content"), o, r, a) + "px";
  }

  function et(e, t, n, r, i) {
    return new et.prototype.init(e, t, n, r, i);
  }

  S.extend({
    cssHooks: {
      opacity: {
        get: function get(e, t) {
          if (t) {
            var n = Be(e, "opacity");
            return "" === n ? "1" : n;
          }
        }
      }
    },
    cssNumber: {
      animationIterationCount: !0,
      columnCount: !0,
      fillOpacity: !0,
      flexGrow: !0,
      flexShrink: !0,
      fontWeight: !0,
      gridArea: !0,
      gridColumn: !0,
      gridColumnEnd: !0,
      gridColumnStart: !0,
      gridRow: !0,
      gridRowEnd: !0,
      gridRowStart: !0,
      lineHeight: !0,
      opacity: !0,
      order: !0,
      orphans: !0,
      widows: !0,
      zIndex: !0,
      zoom: !0
    },
    cssProps: {},
    style: function style(e, t, n, r) {
      if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
        var i,
            o,
            a,
            s = X(t),
            u = Ge.test(t),
            l = e.style;
        if (u || (t = Xe(s)), a = S.cssHooks[t] || S.cssHooks[s], void 0 === n) return a && "get" in a && void 0 !== (i = a.get(e, !1, r)) ? i : l[t];
        "string" === (o = _typeof(n)) && (i = te.exec(n)) && i[1] && (n = se(e, t, i), o = "number"), null != n && n == n && ("number" !== o || u || (n += i && i[3] || (S.cssNumber[s] ? "" : "px")), y.clearCloneStyle || "" !== n || 0 !== t.indexOf("background") || (l[t] = "inherit"), a && "set" in a && void 0 === (n = a.set(e, n, r)) || (u ? l.setProperty(t, n) : l[t] = n));
      }
    },
    css: function css(e, t, n, r) {
      var i,
          o,
          a,
          s = X(t);
      return Ge.test(t) || (t = Xe(s)), (a = S.cssHooks[t] || S.cssHooks[s]) && "get" in a && (i = a.get(e, !0, n)), void 0 === i && (i = Be(e, t, r)), "normal" === i && t in Qe && (i = Qe[t]), "" === n || n ? (o = parseFloat(i), !0 === n || isFinite(o) ? o || 0 : i) : i;
    }
  }), S.each(["height", "width"], function (e, u) {
    S.cssHooks[u] = {
      get: function get(e, t, n) {
        if (t) return !Ve.test(S.css(e, "display")) || e.getClientRects().length && e.getBoundingClientRect().width ? Ze(e, u, n) : We(e, Ye, function () {
          return Ze(e, u, n);
        });
      },
      set: function set(e, t, n) {
        var r,
            i = Ie(e),
            o = !y.scrollboxSize() && "absolute" === i.position,
            a = (o || n) && "border-box" === S.css(e, "boxSizing", !1, i),
            s = n ? Ke(e, u, n, a, i) : 0;
        return a && o && (s -= Math.ceil(e["offset" + u[0].toUpperCase() + u.slice(1)] - parseFloat(i[u]) - Ke(e, u, "border", !1, i) - .5)), s && (r = te.exec(t)) && "px" !== (r[3] || "px") && (e.style[u] = t, t = S.css(e, u)), Je(0, t, s);
      }
    };
  }), S.cssHooks.marginLeft = $e(y.reliableMarginLeft, function (e, t) {
    if (t) return (parseFloat(Be(e, "marginLeft")) || e.getBoundingClientRect().left - We(e, {
      marginLeft: 0
    }, function () {
      return e.getBoundingClientRect().left;
    })) + "px";
  }), S.each({
    margin: "",
    padding: "",
    border: "Width"
  }, function (i, o) {
    S.cssHooks[i + o] = {
      expand: function expand(e) {
        for (var t = 0, n = {}, r = "string" == typeof e ? e.split(" ") : [e]; t < 4; t++) {
          n[i + ne[t] + o] = r[t] || r[t - 2] || r[0];
        }

        return n;
      }
    }, "margin" !== i && (S.cssHooks[i + o].set = Je);
  }), S.fn.extend({
    css: function css(e, t) {
      return $(this, function (e, t, n) {
        var r,
            i,
            o = {},
            a = 0;

        if (Array.isArray(t)) {
          for (r = Ie(e), i = t.length; a < i; a++) {
            o[t[a]] = S.css(e, t[a], !1, r);
          }

          return o;
        }

        return void 0 !== n ? S.style(e, t, n) : S.css(e, t);
      }, e, t, 1 < arguments.length);
    }
  }), ((S.Tween = et).prototype = {
    constructor: et,
    init: function init(e, t, n, r, i, o) {
      this.elem = e, this.prop = n, this.easing = i || S.easing._default, this.options = t, this.start = this.now = this.cur(), this.end = r, this.unit = o || (S.cssNumber[n] ? "" : "px");
    },
    cur: function cur() {
      var e = et.propHooks[this.prop];
      return e && e.get ? e.get(this) : et.propHooks._default.get(this);
    },
    run: function run(e) {
      var t,
          n = et.propHooks[this.prop];
      return this.options.duration ? this.pos = t = S.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : this.pos = t = e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : et.propHooks._default.set(this), this;
    }
  }).init.prototype = et.prototype, (et.propHooks = {
    _default: {
      get: function get(e) {
        var t;
        return 1 !== e.elem.nodeType || null != e.elem[e.prop] && null == e.elem.style[e.prop] ? e.elem[e.prop] : (t = S.css(e.elem, e.prop, "")) && "auto" !== t ? t : 0;
      },
      set: function set(e) {
        S.fx.step[e.prop] ? S.fx.step[e.prop](e) : 1 !== e.elem.nodeType || !S.cssHooks[e.prop] && null == e.elem.style[Xe(e.prop)] ? e.elem[e.prop] = e.now : S.style(e.elem, e.prop, e.now + e.unit);
      }
    }
  }).scrollTop = et.propHooks.scrollLeft = {
    set: function set(e) {
      e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now);
    }
  }, S.easing = {
    linear: function linear(e) {
      return e;
    },
    swing: function swing(e) {
      return .5 - Math.cos(e * Math.PI) / 2;
    },
    _default: "swing"
  }, S.fx = et.prototype.init, S.fx.step = {};
  var tt,
      nt,
      rt,
      it,
      ot = /^(?:toggle|show|hide)$/,
      at = /queueHooks$/;

  function st() {
    nt && (!1 === E.hidden && C.requestAnimationFrame ? C.requestAnimationFrame(st) : C.setTimeout(st, S.fx.interval), S.fx.tick());
  }

  function ut() {
    return C.setTimeout(function () {
      tt = void 0;
    }), tt = Date.now();
  }

  function lt(e, t) {
    var n,
        r = 0,
        i = {
      height: e
    };

    for (t = t ? 1 : 0; r < 4; r += 2 - t) {
      i["margin" + (n = ne[r])] = i["padding" + n] = e;
    }

    return t && (i.opacity = i.width = e), i;
  }

  function ct(e, t, n) {
    for (var r, i = (ft.tweeners[t] || []).concat(ft.tweeners["*"]), o = 0, a = i.length; o < a; o++) {
      if (r = i[o].call(n, t, e)) return r;
    }
  }

  function ft(o, e, t) {
    var n,
        a,
        r = 0,
        i = ft.prefilters.length,
        s = S.Deferred().always(function () {
      delete u.elem;
    }),
        u = function u() {
      if (a) return !1;

      for (var e = tt || ut(), t = Math.max(0, l.startTime + l.duration - e), n = 1 - (t / l.duration || 0), r = 0, i = l.tweens.length; r < i; r++) {
        l.tweens[r].run(n);
      }

      return s.notifyWith(o, [l, n, t]), n < 1 && i ? t : (i || s.notifyWith(o, [l, 1, 0]), s.resolveWith(o, [l]), !1);
    },
        l = s.promise({
      elem: o,
      props: S.extend({}, e),
      opts: S.extend(!0, {
        specialEasing: {},
        easing: S.easing._default
      }, t),
      originalProperties: e,
      originalOptions: t,
      startTime: tt || ut(),
      duration: t.duration,
      tweens: [],
      createTween: function createTween(e, t) {
        var n = S.Tween(o, l.opts, e, t, l.opts.specialEasing[e] || l.opts.easing);
        return l.tweens.push(n), n;
      },
      stop: function stop(e) {
        var t = 0,
            n = e ? l.tweens.length : 0;
        if (a) return this;

        for (a = !0; t < n; t++) {
          l.tweens[t].run(1);
        }

        return e ? (s.notifyWith(o, [l, 1, 0]), s.resolveWith(o, [l, e])) : s.rejectWith(o, [l, e]), this;
      }
    }),
        c = l.props;

    for (!function (e, t) {
      var n, r, i, o, a;

      for (n in e) {
        if (i = t[r = X(n)], o = e[n], Array.isArray(o) && (i = o[1], o = e[n] = o[0]), n !== r && (e[r] = o, delete e[n]), (a = S.cssHooks[r]) && ("expand" in a)) for (n in o = a.expand(o), delete e[r], o) {
          (n in e) || (e[n] = o[n], t[n] = i);
        } else t[r] = i;
      }
    }(c, l.opts.specialEasing); r < i; r++) {
      if (n = ft.prefilters[r].call(l, o, c, l.opts)) return m(n.stop) && (S._queueHooks(l.elem, l.opts.queue).stop = n.stop.bind(n)), n;
    }

    return S.map(c, ct, l), m(l.opts.start) && l.opts.start.call(o, l), l.progress(l.opts.progress).done(l.opts.done, l.opts.complete).fail(l.opts.fail).always(l.opts.always), S.fx.timer(S.extend(u, {
      elem: o,
      anim: l,
      queue: l.opts.queue
    })), l;
  }

  S.Animation = S.extend(ft, {
    tweeners: {
      "*": [function (e, t) {
        var n = this.createTween(e, t);
        return se(n.elem, e, te.exec(t), n), n;
      }]
    },
    tweener: function tweener(e, t) {
      m(e) ? (t = e, e = ["*"]) : e = e.match(P);

      for (var n, r = 0, i = e.length; r < i; r++) {
        n = e[r], ft.tweeners[n] = ft.tweeners[n] || [], ft.tweeners[n].unshift(t);
      }
    },
    prefilters: [function (e, t, n) {
      var r,
          i,
          o,
          a,
          s,
          u,
          l,
          c,
          f = "width" in t || "height" in t,
          p = this,
          d = {},
          h = e.style,
          g = e.nodeType && ae(e),
          v = Y.get(e, "fxshow");

      for (r in n.queue || (null == (a = S._queueHooks(e, "fx")).unqueued && (a.unqueued = 0, s = a.empty.fire, a.empty.fire = function () {
        a.unqueued || s();
      }), a.unqueued++, p.always(function () {
        p.always(function () {
          a.unqueued--, S.queue(e, "fx").length || a.empty.fire();
        });
      })), t) {
        if (i = t[r], ot.test(i)) {
          if (delete t[r], o = o || "toggle" === i, i === (g ? "hide" : "show")) {
            if ("show" !== i || !v || void 0 === v[r]) continue;
            g = !0;
          }

          d[r] = v && v[r] || S.style(e, r);
        }
      }

      if ((u = !S.isEmptyObject(t)) || !S.isEmptyObject(d)) for (r in f && 1 === e.nodeType && (n.overflow = [h.overflow, h.overflowX, h.overflowY], null == (l = v && v.display) && (l = Y.get(e, "display")), "none" === (c = S.css(e, "display")) && (l ? c = l : (le([e], !0), l = e.style.display || l, c = S.css(e, "display"), le([e]))), ("inline" === c || "inline-block" === c && null != l) && "none" === S.css(e, "float") && (u || (p.done(function () {
        h.display = l;
      }), null == l && (c = h.display, l = "none" === c ? "" : c)), h.display = "inline-block")), n.overflow && (h.overflow = "hidden", p.always(function () {
        h.overflow = n.overflow[0], h.overflowX = n.overflow[1], h.overflowY = n.overflow[2];
      })), u = !1, d) {
        u || (v ? "hidden" in v && (g = v.hidden) : v = Y.access(e, "fxshow", {
          display: l
        }), o && (v.hidden = !g), g && le([e], !0), p.done(function () {
          for (r in g || le([e]), Y.remove(e, "fxshow"), d) {
            S.style(e, r, d[r]);
          }
        })), u = ct(g ? v[r] : 0, r, p), r in v || (v[r] = u.start, g && (u.end = u.start, u.start = 0));
      }
    }],
    prefilter: function prefilter(e, t) {
      t ? ft.prefilters.unshift(e) : ft.prefilters.push(e);
    }
  }), S.speed = function (e, t, n) {
    var r = e && "object" == _typeof(e) ? S.extend({}, e) : {
      complete: n || !n && t || m(e) && e,
      duration: e,
      easing: n && t || t && !m(t) && t
    };
    return S.fx.off ? r.duration = 0 : "number" != typeof r.duration && (r.duration in S.fx.speeds ? r.duration = S.fx.speeds[r.duration] : r.duration = S.fx.speeds._default), null != r.queue && !0 !== r.queue || (r.queue = "fx"), r.old = r.complete, r.complete = function () {
      m(r.old) && r.old.call(this), r.queue && S.dequeue(this, r.queue);
    }, r;
  }, S.fn.extend({
    fadeTo: function fadeTo(e, t, n, r) {
      return this.filter(ae).css("opacity", 0).show().end().animate({
        opacity: t
      }, e, n, r);
    },
    animate: function animate(t, e, n, r) {
      var i = S.isEmptyObject(t),
          o = S.speed(e, n, r),
          a = function a() {
        var e = ft(this, S.extend({}, t), o);
        (i || Y.get(this, "finish")) && e.stop(!0);
      };

      return a.finish = a, i || !1 === o.queue ? this.each(a) : this.queue(o.queue, a);
    },
    stop: function stop(i, e, o) {
      var a = function a(e) {
        var t = e.stop;
        delete e.stop, t(o);
      };

      return "string" != typeof i && (o = e, e = i, i = void 0), e && this.queue(i || "fx", []), this.each(function () {
        var e = !0,
            t = null != i && i + "queueHooks",
            n = S.timers,
            r = Y.get(this);
        if (t) r[t] && r[t].stop && a(r[t]);else for (t in r) {
          r[t] && r[t].stop && at.test(t) && a(r[t]);
        }

        for (t = n.length; t--;) {
          n[t].elem !== this || null != i && n[t].queue !== i || (n[t].anim.stop(o), e = !1, n.splice(t, 1));
        }

        !e && o || S.dequeue(this, i);
      });
    },
    finish: function finish(a) {
      return !1 !== a && (a = a || "fx"), this.each(function () {
        var e,
            t = Y.get(this),
            n = t[a + "queue"],
            r = t[a + "queueHooks"],
            i = S.timers,
            o = n ? n.length : 0;

        for (t.finish = !0, S.queue(this, a, []), r && r.stop && r.stop.call(this, !0), e = i.length; e--;) {
          i[e].elem === this && i[e].queue === a && (i[e].anim.stop(!0), i.splice(e, 1));
        }

        for (e = 0; e < o; e++) {
          n[e] && n[e].finish && n[e].finish.call(this);
        }

        delete t.finish;
      });
    }
  }), S.each(["toggle", "show", "hide"], function (e, r) {
    var i = S.fn[r];

    S.fn[r] = function (e, t, n) {
      return null == e || "boolean" == typeof e ? i.apply(this, arguments) : this.animate(lt(r, !0), e, t, n);
    };
  }), S.each({
    slideDown: lt("show"),
    slideUp: lt("hide"),
    slideToggle: lt("toggle"),
    fadeIn: {
      opacity: "show"
    },
    fadeOut: {
      opacity: "hide"
    },
    fadeToggle: {
      opacity: "toggle"
    }
  }, function (e, r) {
    S.fn[e] = function (e, t, n) {
      return this.animate(r, e, t, n);
    };
  }), S.timers = [], S.fx.tick = function () {
    var e,
        t = 0,
        n = S.timers;

    for (tt = Date.now(); t < n.length; t++) {
      (e = n[t])() || n[t] !== e || n.splice(t--, 1);
    }

    n.length || S.fx.stop(), tt = void 0;
  }, S.fx.timer = function (e) {
    S.timers.push(e), S.fx.start();
  }, S.fx.interval = 13, S.fx.start = function () {
    nt || (nt = !0, st());
  }, S.fx.stop = function () {
    nt = null;
  }, S.fx.speeds = {
    slow: 600,
    fast: 200,
    _default: 400
  }, S.fn.delay = function (r, e) {
    return r = S.fx && S.fx.speeds[r] || r, e = e || "fx", this.queue(e, function (e, t) {
      var n = C.setTimeout(e, r);

      t.stop = function () {
        C.clearTimeout(n);
      };
    });
  }, rt = E.createElement("input"), it = E.createElement("select").appendChild(E.createElement("option")), rt.type = "checkbox", y.checkOn = "" !== rt.value, y.optSelected = it.selected, (rt = E.createElement("input")).value = "t", rt.type = "radio", y.radioValue = "t" === rt.value;
  var pt,
      dt = S.expr.attrHandle;
  S.fn.extend({
    attr: function attr(e, t) {
      return $(this, S.attr, e, t, 1 < arguments.length);
    },
    removeAttr: function removeAttr(e) {
      return this.each(function () {
        S.removeAttr(this, e);
      });
    }
  }), S.extend({
    attr: function attr(e, t, n) {
      var r,
          i,
          o = e.nodeType;
      if (3 !== o && 8 !== o && 2 !== o) return "undefined" == typeof e.getAttribute ? S.prop(e, t, n) : (1 === o && S.isXMLDoc(e) || (i = S.attrHooks[t.toLowerCase()] || (S.expr.match.bool.test(t) ? pt : void 0)), void 0 !== n ? null === n ? void S.removeAttr(e, t) : i && "set" in i && void 0 !== (r = i.set(e, n, t)) ? r : (e.setAttribute(t, n + ""), n) : i && "get" in i && null !== (r = i.get(e, t)) ? r : null == (r = S.find.attr(e, t)) ? void 0 : r);
    },
    attrHooks: {
      type: {
        set: function set(e, t) {
          if (!y.radioValue && "radio" === t && A(e, "input")) {
            var n = e.value;
            return e.setAttribute("type", t), n && (e.value = n), t;
          }
        }
      }
    },
    removeAttr: function removeAttr(e, t) {
      var n,
          r = 0,
          i = t && t.match(P);
      if (i && 1 === e.nodeType) while (n = i[r++]) {
        e.removeAttribute(n);
      }
    }
  }), pt = {
    set: function set(e, t, n) {
      return !1 === t ? S.removeAttr(e, n) : e.setAttribute(n, n), n;
    }
  }, S.each(S.expr.match.bool.source.match(/\w+/g), function (e, t) {
    var a = dt[t] || S.find.attr;

    dt[t] = function (e, t, n) {
      var r,
          i,
          o = t.toLowerCase();
      return n || (i = dt[o], dt[o] = r, r = null != a(e, t, n) ? o : null, dt[o] = i), r;
    };
  });
  var ht = /^(?:input|select|textarea|button)$/i,
      gt = /^(?:a|area)$/i;

  function vt(e) {
    return (e.match(P) || []).join(" ");
  }

  function yt(e) {
    return e.getAttribute && e.getAttribute("class") || "";
  }

  function mt(e) {
    return Array.isArray(e) ? e : "string" == typeof e && e.match(P) || [];
  }

  S.fn.extend({
    prop: function prop(e, t) {
      return $(this, S.prop, e, t, 1 < arguments.length);
    },
    removeProp: function removeProp(e) {
      return this.each(function () {
        delete this[S.propFix[e] || e];
      });
    }
  }), S.extend({
    prop: function prop(e, t, n) {
      var r,
          i,
          o = e.nodeType;
      if (3 !== o && 8 !== o && 2 !== o) return 1 === o && S.isXMLDoc(e) || (t = S.propFix[t] || t, i = S.propHooks[t]), void 0 !== n ? i && "set" in i && void 0 !== (r = i.set(e, n, t)) ? r : e[t] = n : i && "get" in i && null !== (r = i.get(e, t)) ? r : e[t];
    },
    propHooks: {
      tabIndex: {
        get: function get(e) {
          var t = S.find.attr(e, "tabindex");
          return t ? parseInt(t, 10) : ht.test(e.nodeName) || gt.test(e.nodeName) && e.href ? 0 : -1;
        }
      }
    },
    propFix: {
      "for": "htmlFor",
      "class": "className"
    }
  }), y.optSelected || (S.propHooks.selected = {
    get: function get(e) {
      var t = e.parentNode;
      return t && t.parentNode && t.parentNode.selectedIndex, null;
    },
    set: function set(e) {
      var t = e.parentNode;
      t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex);
    }
  }), S.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function () {
    S.propFix[this.toLowerCase()] = this;
  }), S.fn.extend({
    addClass: function addClass(t) {
      var e,
          n,
          r,
          i,
          o,
          a,
          s,
          u = 0;
      if (m(t)) return this.each(function (e) {
        S(this).addClass(t.call(this, e, yt(this)));
      });
      if ((e = mt(t)).length) while (n = this[u++]) {
        if (i = yt(n), r = 1 === n.nodeType && " " + vt(i) + " ") {
          a = 0;

          while (o = e[a++]) {
            r.indexOf(" " + o + " ") < 0 && (r += o + " ");
          }

          i !== (s = vt(r)) && n.setAttribute("class", s);
        }
      }
      return this;
    },
    removeClass: function removeClass(t) {
      var e,
          n,
          r,
          i,
          o,
          a,
          s,
          u = 0;
      if (m(t)) return this.each(function (e) {
        S(this).removeClass(t.call(this, e, yt(this)));
      });
      if (!arguments.length) return this.attr("class", "");
      if ((e = mt(t)).length) while (n = this[u++]) {
        if (i = yt(n), r = 1 === n.nodeType && " " + vt(i) + " ") {
          a = 0;

          while (o = e[a++]) {
            while (-1 < r.indexOf(" " + o + " ")) {
              r = r.replace(" " + o + " ", " ");
            }
          }

          i !== (s = vt(r)) && n.setAttribute("class", s);
        }
      }
      return this;
    },
    toggleClass: function toggleClass(i, t) {
      var o = _typeof(i),
          a = "string" === o || Array.isArray(i);

      return "boolean" == typeof t && a ? t ? this.addClass(i) : this.removeClass(i) : m(i) ? this.each(function (e) {
        S(this).toggleClass(i.call(this, e, yt(this), t), t);
      }) : this.each(function () {
        var e, t, n, r;

        if (a) {
          t = 0, n = S(this), r = mt(i);

          while (e = r[t++]) {
            n.hasClass(e) ? n.removeClass(e) : n.addClass(e);
          }
        } else void 0 !== i && "boolean" !== o || ((e = yt(this)) && Y.set(this, "__className__", e), this.setAttribute && this.setAttribute("class", e || !1 === i ? "" : Y.get(this, "__className__") || ""));
      });
    },
    hasClass: function hasClass(e) {
      var t,
          n,
          r = 0;
      t = " " + e + " ";

      while (n = this[r++]) {
        if (1 === n.nodeType && -1 < (" " + vt(yt(n)) + " ").indexOf(t)) return !0;
      }

      return !1;
    }
  });
  var xt = /\r/g;
  S.fn.extend({
    val: function val(n) {
      var r,
          e,
          i,
          t = this[0];
      return arguments.length ? (i = m(n), this.each(function (e) {
        var t;
        1 === this.nodeType && (null == (t = i ? n.call(this, e, S(this).val()) : n) ? t = "" : "number" == typeof t ? t += "" : Array.isArray(t) && (t = S.map(t, function (e) {
          return null == e ? "" : e + "";
        })), (r = S.valHooks[this.type] || S.valHooks[this.nodeName.toLowerCase()]) && "set" in r && void 0 !== r.set(this, t, "value") || (this.value = t));
      })) : t ? (r = S.valHooks[t.type] || S.valHooks[t.nodeName.toLowerCase()]) && "get" in r && void 0 !== (e = r.get(t, "value")) ? e : "string" == typeof (e = t.value) ? e.replace(xt, "") : null == e ? "" : e : void 0;
    }
  }), S.extend({
    valHooks: {
      option: {
        get: function get(e) {
          var t = S.find.attr(e, "value");
          return null != t ? t : vt(S.text(e));
        }
      },
      select: {
        get: function get(e) {
          var t,
              n,
              r,
              i = e.options,
              o = e.selectedIndex,
              a = "select-one" === e.type,
              s = a ? null : [],
              u = a ? o + 1 : i.length;

          for (r = o < 0 ? u : a ? o : 0; r < u; r++) {
            if (((n = i[r]).selected || r === o) && !n.disabled && (!n.parentNode.disabled || !A(n.parentNode, "optgroup"))) {
              if (t = S(n).val(), a) return t;
              s.push(t);
            }
          }

          return s;
        },
        set: function set(e, t) {
          var n,
              r,
              i = e.options,
              o = S.makeArray(t),
              a = i.length;

          while (a--) {
            ((r = i[a]).selected = -1 < S.inArray(S.valHooks.option.get(r), o)) && (n = !0);
          }

          return n || (e.selectedIndex = -1), o;
        }
      }
    }
  }), S.each(["radio", "checkbox"], function () {
    S.valHooks[this] = {
      set: function set(e, t) {
        if (Array.isArray(t)) return e.checked = -1 < S.inArray(S(e).val(), t);
      }
    }, y.checkOn || (S.valHooks[this].get = function (e) {
      return null === e.getAttribute("value") ? "on" : e.value;
    });
  }), y.focusin = "onfocusin" in C;

  var bt = /^(?:focusinfocus|focusoutblur)$/,
      wt = function wt(e) {
    e.stopPropagation();
  };

  S.extend(S.event, {
    trigger: function trigger(e, t, n, r) {
      var i,
          o,
          a,
          s,
          u,
          l,
          c,
          f,
          p = [n || E],
          d = v.call(e, "type") ? e.type : e,
          h = v.call(e, "namespace") ? e.namespace.split(".") : [];

      if (o = f = a = n = n || E, 3 !== n.nodeType && 8 !== n.nodeType && !bt.test(d + S.event.triggered) && (-1 < d.indexOf(".") && (d = (h = d.split(".")).shift(), h.sort()), u = d.indexOf(":") < 0 && "on" + d, (e = e[S.expando] ? e : new S.Event(d, "object" == _typeof(e) && e)).isTrigger = r ? 2 : 3, e.namespace = h.join("."), e.rnamespace = e.namespace ? new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, e.result = void 0, e.target || (e.target = n), t = null == t ? [e] : S.makeArray(t, [e]), c = S.event.special[d] || {}, r || !c.trigger || !1 !== c.trigger.apply(n, t))) {
        if (!r && !c.noBubble && !x(n)) {
          for (s = c.delegateType || d, bt.test(s + d) || (o = o.parentNode); o; o = o.parentNode) {
            p.push(o), a = o;
          }

          a === (n.ownerDocument || E) && p.push(a.defaultView || a.parentWindow || C);
        }

        i = 0;

        while ((o = p[i++]) && !e.isPropagationStopped()) {
          f = o, e.type = 1 < i ? s : c.bindType || d, (l = (Y.get(o, "events") || Object.create(null))[e.type] && Y.get(o, "handle")) && l.apply(o, t), (l = u && o[u]) && l.apply && V(o) && (e.result = l.apply(o, t), !1 === e.result && e.preventDefault());
        }

        return e.type = d, r || e.isDefaultPrevented() || c._default && !1 !== c._default.apply(p.pop(), t) || !V(n) || u && m(n[d]) && !x(n) && ((a = n[u]) && (n[u] = null), S.event.triggered = d, e.isPropagationStopped() && f.addEventListener(d, wt), n[d](), e.isPropagationStopped() && f.removeEventListener(d, wt), S.event.triggered = void 0, a && (n[u] = a)), e.result;
      }
    },
    simulate: function simulate(e, t, n) {
      var r = S.extend(new S.Event(), n, {
        type: e,
        isSimulated: !0
      });
      S.event.trigger(r, null, t);
    }
  }), S.fn.extend({
    trigger: function trigger(e, t) {
      return this.each(function () {
        S.event.trigger(e, t, this);
      });
    },
    triggerHandler: function triggerHandler(e, t) {
      var n = this[0];
      if (n) return S.event.trigger(e, t, n, !0);
    }
  }), y.focusin || S.each({
    focus: "focusin",
    blur: "focusout"
  }, function (n, r) {
    var i = function i(e) {
      S.event.simulate(r, e.target, S.event.fix(e));
    };

    S.event.special[r] = {
      setup: function setup() {
        var e = this.ownerDocument || this.document || this,
            t = Y.access(e, r);
        t || e.addEventListener(n, i, !0), Y.access(e, r, (t || 0) + 1);
      },
      teardown: function teardown() {
        var e = this.ownerDocument || this.document || this,
            t = Y.access(e, r) - 1;
        t ? Y.access(e, r, t) : (e.removeEventListener(n, i, !0), Y.remove(e, r));
      }
    };
  });
  var Tt = C.location,
      Ct = {
    guid: Date.now()
  },
      Et = /\?/;

  S.parseXML = function (e) {
    var t;
    if (!e || "string" != typeof e) return null;

    try {
      t = new C.DOMParser().parseFromString(e, "text/xml");
    } catch (e) {
      t = void 0;
    }

    return t && !t.getElementsByTagName("parsererror").length || S.error("Invalid XML: " + e), t;
  };

  var St = /\[\]$/,
      kt = /\r?\n/g,
      At = /^(?:submit|button|image|reset|file)$/i,
      Nt = /^(?:input|select|textarea|keygen)/i;

  function Dt(n, e, r, i) {
    var t;
    if (Array.isArray(e)) S.each(e, function (e, t) {
      r || St.test(n) ? i(n, t) : Dt(n + "[" + ("object" == _typeof(t) && null != t ? e : "") + "]", t, r, i);
    });else if (r || "object" !== w(e)) i(n, e);else for (t in e) {
      Dt(n + "[" + t + "]", e[t], r, i);
    }
  }

  S.param = function (e, t) {
    var n,
        r = [],
        i = function i(e, t) {
      var n = m(t) ? t() : t;
      r[r.length] = encodeURIComponent(e) + "=" + encodeURIComponent(null == n ? "" : n);
    };

    if (null == e) return "";
    if (Array.isArray(e) || e.jquery && !S.isPlainObject(e)) S.each(e, function () {
      i(this.name, this.value);
    });else for (n in e) {
      Dt(n, e[n], t, i);
    }
    return r.join("&");
  }, S.fn.extend({
    serialize: function serialize() {
      return S.param(this.serializeArray());
    },
    serializeArray: function serializeArray() {
      return this.map(function () {
        var e = S.prop(this, "elements");
        return e ? S.makeArray(e) : this;
      }).filter(function () {
        var e = this.type;
        return this.name && !S(this).is(":disabled") && Nt.test(this.nodeName) && !At.test(e) && (this.checked || !pe.test(e));
      }).map(function (e, t) {
        var n = S(this).val();
        return null == n ? null : Array.isArray(n) ? S.map(n, function (e) {
          return {
            name: t.name,
            value: e.replace(kt, "\r\n")
          };
        }) : {
          name: t.name,
          value: n.replace(kt, "\r\n")
        };
      }).get();
    }
  });
  var jt = /%20/g,
      qt = /#.*$/,
      Lt = /([?&])_=[^&]*/,
      Ht = /^(.*?):[ \t]*([^\r\n]*)$/gm,
      Ot = /^(?:GET|HEAD)$/,
      Pt = /^\/\//,
      Rt = {},
      Mt = {},
      It = "*/".concat("*"),
      Wt = E.createElement("a");

  function Ft(o) {
    return function (e, t) {
      "string" != typeof e && (t = e, e = "*");
      var n,
          r = 0,
          i = e.toLowerCase().match(P) || [];
      if (m(t)) while (n = i[r++]) {
        "+" === n[0] ? (n = n.slice(1) || "*", (o[n] = o[n] || []).unshift(t)) : (o[n] = o[n] || []).push(t);
      }
    };
  }

  function Bt(t, i, o, a) {
    var s = {},
        u = t === Mt;

    function l(e) {
      var r;
      return s[e] = !0, S.each(t[e] || [], function (e, t) {
        var n = t(i, o, a);
        return "string" != typeof n || u || s[n] ? u ? !(r = n) : void 0 : (i.dataTypes.unshift(n), l(n), !1);
      }), r;
    }

    return l(i.dataTypes[0]) || !s["*"] && l("*");
  }

  function $t(e, t) {
    var n,
        r,
        i = S.ajaxSettings.flatOptions || {};

    for (n in t) {
      void 0 !== t[n] && ((i[n] ? e : r || (r = {}))[n] = t[n]);
    }

    return r && S.extend(!0, e, r), e;
  }

  Wt.href = Tt.href, S.extend({
    active: 0,
    lastModified: {},
    etag: {},
    ajaxSettings: {
      url: Tt.href,
      type: "GET",
      isLocal: /^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(Tt.protocol),
      global: !0,
      processData: !0,
      async: !0,
      contentType: "application/x-www-form-urlencoded; charset=UTF-8",
      accepts: {
        "*": It,
        text: "text/plain",
        html: "text/html",
        xml: "application/xml, text/xml",
        json: "application/json, text/javascript"
      },
      contents: {
        xml: /\bxml\b/,
        html: /\bhtml/,
        json: /\bjson\b/
      },
      responseFields: {
        xml: "responseXML",
        text: "responseText",
        json: "responseJSON"
      },
      converters: {
        "* text": String,
        "text html": !0,
        "text json": JSON.parse,
        "text xml": S.parseXML
      },
      flatOptions: {
        url: !0,
        context: !0
      }
    },
    ajaxSetup: function ajaxSetup(e, t) {
      return t ? $t($t(e, S.ajaxSettings), t) : $t(S.ajaxSettings, e);
    },
    ajaxPrefilter: Ft(Rt),
    ajaxTransport: Ft(Mt),
    ajax: function ajax(e, t) {
      "object" == _typeof(e) && (t = e, e = void 0), t = t || {};
      var c,
          f,
          p,
          n,
          d,
          r,
          h,
          g,
          i,
          o,
          v = S.ajaxSetup({}, t),
          y = v.context || v,
          m = v.context && (y.nodeType || y.jquery) ? S(y) : S.event,
          x = S.Deferred(),
          b = S.Callbacks("once memory"),
          w = v.statusCode || {},
          a = {},
          s = {},
          u = "canceled",
          T = {
        readyState: 0,
        getResponseHeader: function getResponseHeader(e) {
          var t;

          if (h) {
            if (!n) {
              n = {};

              while (t = Ht.exec(p)) {
                n[t[1].toLowerCase() + " "] = (n[t[1].toLowerCase() + " "] || []).concat(t[2]);
              }
            }

            t = n[e.toLowerCase() + " "];
          }

          return null == t ? null : t.join(", ");
        },
        getAllResponseHeaders: function getAllResponseHeaders() {
          return h ? p : null;
        },
        setRequestHeader: function setRequestHeader(e, t) {
          return null == h && (e = s[e.toLowerCase()] = s[e.toLowerCase()] || e, a[e] = t), this;
        },
        overrideMimeType: function overrideMimeType(e) {
          return null == h && (v.mimeType = e), this;
        },
        statusCode: function statusCode(e) {
          var t;
          if (e) if (h) T.always(e[T.status]);else for (t in e) {
            w[t] = [w[t], e[t]];
          }
          return this;
        },
        abort: function abort(e) {
          var t = e || u;
          return c && c.abort(t), l(0, t), this;
        }
      };

      if (x.promise(T), v.url = ((e || v.url || Tt.href) + "").replace(Pt, Tt.protocol + "//"), v.type = t.method || t.type || v.method || v.type, v.dataTypes = (v.dataType || "*").toLowerCase().match(P) || [""], null == v.crossDomain) {
        r = E.createElement("a");

        try {
          r.href = v.url, r.href = r.href, v.crossDomain = Wt.protocol + "//" + Wt.host != r.protocol + "//" + r.host;
        } catch (e) {
          v.crossDomain = !0;
        }
      }

      if (v.data && v.processData && "string" != typeof v.data && (v.data = S.param(v.data, v.traditional)), Bt(Rt, v, t, T), h) return T;

      for (i in (g = S.event && v.global) && 0 == S.active++ && S.event.trigger("ajaxStart"), v.type = v.type.toUpperCase(), v.hasContent = !Ot.test(v.type), f = v.url.replace(qt, ""), v.hasContent ? v.data && v.processData && 0 === (v.contentType || "").indexOf("application/x-www-form-urlencoded") && (v.data = v.data.replace(jt, "+")) : (o = v.url.slice(f.length), v.data && (v.processData || "string" == typeof v.data) && (f += (Et.test(f) ? "&" : "?") + v.data, delete v.data), !1 === v.cache && (f = f.replace(Lt, "$1"), o = (Et.test(f) ? "&" : "?") + "_=" + Ct.guid++ + o), v.url = f + o), v.ifModified && (S.lastModified[f] && T.setRequestHeader("If-Modified-Since", S.lastModified[f]), S.etag[f] && T.setRequestHeader("If-None-Match", S.etag[f])), (v.data && v.hasContent && !1 !== v.contentType || t.contentType) && T.setRequestHeader("Content-Type", v.contentType), T.setRequestHeader("Accept", v.dataTypes[0] && v.accepts[v.dataTypes[0]] ? v.accepts[v.dataTypes[0]] + ("*" !== v.dataTypes[0] ? ", " + It + "; q=0.01" : "") : v.accepts["*"]), v.headers) {
        T.setRequestHeader(i, v.headers[i]);
      }

      if (v.beforeSend && (!1 === v.beforeSend.call(y, T, v) || h)) return T.abort();

      if (u = "abort", b.add(v.complete), T.done(v.success), T.fail(v.error), c = Bt(Mt, v, t, T)) {
        if (T.readyState = 1, g && m.trigger("ajaxSend", [T, v]), h) return T;
        v.async && 0 < v.timeout && (d = C.setTimeout(function () {
          T.abort("timeout");
        }, v.timeout));

        try {
          h = !1, c.send(a, l);
        } catch (e) {
          if (h) throw e;
          l(-1, e);
        }
      } else l(-1, "No Transport");

      function l(e, t, n, r) {
        var i,
            o,
            a,
            s,
            u,
            l = t;
        h || (h = !0, d && C.clearTimeout(d), c = void 0, p = r || "", T.readyState = 0 < e ? 4 : 0, i = 200 <= e && e < 300 || 304 === e, n && (s = function (e, t, n) {
          var r,
              i,
              o,
              a,
              s = e.contents,
              u = e.dataTypes;

          while ("*" === u[0]) {
            u.shift(), void 0 === r && (r = e.mimeType || t.getResponseHeader("Content-Type"));
          }

          if (r) for (i in s) {
            if (s[i] && s[i].test(r)) {
              u.unshift(i);
              break;
            }
          }
          if (u[0] in n) o = u[0];else {
            for (i in n) {
              if (!u[0] || e.converters[i + " " + u[0]]) {
                o = i;
                break;
              }

              a || (a = i);
            }

            o = o || a;
          }
          if (o) return o !== u[0] && u.unshift(o), n[o];
        }(v, T, n)), !i && -1 < S.inArray("script", v.dataTypes) && (v.converters["text script"] = function () {}), s = function (e, t, n, r) {
          var i,
              o,
              a,
              s,
              u,
              l = {},
              c = e.dataTypes.slice();
          if (c[1]) for (a in e.converters) {
            l[a.toLowerCase()] = e.converters[a];
          }
          o = c.shift();

          while (o) {
            if (e.responseFields[o] && (n[e.responseFields[o]] = t), !u && r && e.dataFilter && (t = e.dataFilter(t, e.dataType)), u = o, o = c.shift()) if ("*" === o) o = u;else if ("*" !== u && u !== o) {
              if (!(a = l[u + " " + o] || l["* " + o])) for (i in l) {
                if ((s = i.split(" "))[1] === o && (a = l[u + " " + s[0]] || l["* " + s[0]])) {
                  !0 === a ? a = l[i] : !0 !== l[i] && (o = s[0], c.unshift(s[1]));
                  break;
                }
              }
              if (!0 !== a) if (a && e["throws"]) t = a(t);else try {
                t = a(t);
              } catch (e) {
                return {
                  state: "parsererror",
                  error: a ? e : "No conversion from " + u + " to " + o
                };
              }
            }
          }

          return {
            state: "success",
            data: t
          };
        }(v, s, T, i), i ? (v.ifModified && ((u = T.getResponseHeader("Last-Modified")) && (S.lastModified[f] = u), (u = T.getResponseHeader("etag")) && (S.etag[f] = u)), 204 === e || "HEAD" === v.type ? l = "nocontent" : 304 === e ? l = "notmodified" : (l = s.state, o = s.data, i = !(a = s.error))) : (a = l, !e && l || (l = "error", e < 0 && (e = 0))), T.status = e, T.statusText = (t || l) + "", i ? x.resolveWith(y, [o, l, T]) : x.rejectWith(y, [T, l, a]), T.statusCode(w), w = void 0, g && m.trigger(i ? "ajaxSuccess" : "ajaxError", [T, v, i ? o : a]), b.fireWith(y, [T, l]), g && (m.trigger("ajaxComplete", [T, v]), --S.active || S.event.trigger("ajaxStop")));
      }

      return T;
    },
    getJSON: function getJSON(e, t, n) {
      return S.get(e, t, n, "json");
    },
    getScript: function getScript(e, t) {
      return S.get(e, void 0, t, "script");
    }
  }), S.each(["get", "post"], function (e, i) {
    S[i] = function (e, t, n, r) {
      return m(t) && (r = r || n, n = t, t = void 0), S.ajax(S.extend({
        url: e,
        type: i,
        dataType: r,
        data: t,
        success: n
      }, S.isPlainObject(e) && e));
    };
  }), S.ajaxPrefilter(function (e) {
    var t;

    for (t in e.headers) {
      "content-type" === t.toLowerCase() && (e.contentType = e.headers[t] || "");
    }
  }), S._evalUrl = function (e, t, n) {
    return S.ajax({
      url: e,
      type: "GET",
      dataType: "script",
      cache: !0,
      async: !1,
      global: !1,
      converters: {
        "text script": function textScript() {}
      },
      dataFilter: function dataFilter(e) {
        S.globalEval(e, t, n);
      }
    });
  }, S.fn.extend({
    wrapAll: function wrapAll(e) {
      var t;
      return this[0] && (m(e) && (e = e.call(this[0])), t = S(e, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && t.insertBefore(this[0]), t.map(function () {
        var e = this;

        while (e.firstElementChild) {
          e = e.firstElementChild;
        }

        return e;
      }).append(this)), this;
    },
    wrapInner: function wrapInner(n) {
      return m(n) ? this.each(function (e) {
        S(this).wrapInner(n.call(this, e));
      }) : this.each(function () {
        var e = S(this),
            t = e.contents();
        t.length ? t.wrapAll(n) : e.append(n);
      });
    },
    wrap: function wrap(t) {
      var n = m(t);
      return this.each(function (e) {
        S(this).wrapAll(n ? t.call(this, e) : t);
      });
    },
    unwrap: function unwrap(e) {
      return this.parent(e).not("body").each(function () {
        S(this).replaceWith(this.childNodes);
      }), this;
    }
  }), S.expr.pseudos.hidden = function (e) {
    return !S.expr.pseudos.visible(e);
  }, S.expr.pseudos.visible = function (e) {
    return !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length);
  }, S.ajaxSettings.xhr = function () {
    try {
      return new C.XMLHttpRequest();
    } catch (e) {}
  };
  var _t = {
    0: 200,
    1223: 204
  },
      zt = S.ajaxSettings.xhr();
  y.cors = !!zt && "withCredentials" in zt, y.ajax = zt = !!zt, S.ajaxTransport(function (i) {
    var _o2, a;

    if (y.cors || zt && !i.crossDomain) return {
      send: function send(e, t) {
        var n,
            r = i.xhr();
        if (r.open(i.type, i.url, i.async, i.username, i.password), i.xhrFields) for (n in i.xhrFields) {
          r[n] = i.xhrFields[n];
        }

        for (n in i.mimeType && r.overrideMimeType && r.overrideMimeType(i.mimeType), i.crossDomain || e["X-Requested-With"] || (e["X-Requested-With"] = "XMLHttpRequest"), e) {
          r.setRequestHeader(n, e[n]);
        }

        _o2 = function o(e) {
          return function () {
            _o2 && (_o2 = a = r.onload = r.onerror = r.onabort = r.ontimeout = r.onreadystatechange = null, "abort" === e ? r.abort() : "error" === e ? "number" != typeof r.status ? t(0, "error") : t(r.status, r.statusText) : t(_t[r.status] || r.status, r.statusText, "text" !== (r.responseType || "text") || "string" != typeof r.responseText ? {
              binary: r.response
            } : {
              text: r.responseText
            }, r.getAllResponseHeaders()));
          };
        }, r.onload = _o2(), a = r.onerror = r.ontimeout = _o2("error"), void 0 !== r.onabort ? r.onabort = a : r.onreadystatechange = function () {
          4 === r.readyState && C.setTimeout(function () {
            _o2 && a();
          });
        }, _o2 = _o2("abort");

        try {
          r.send(i.hasContent && i.data || null);
        } catch (e) {
          if (_o2) throw e;
        }
      },
      abort: function abort() {
        _o2 && _o2();
      }
    };
  }), S.ajaxPrefilter(function (e) {
    e.crossDomain && (e.contents.script = !1);
  }), S.ajaxSetup({
    accepts: {
      script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
    },
    contents: {
      script: /\b(?:java|ecma)script\b/
    },
    converters: {
      "text script": function textScript(e) {
        return S.globalEval(e), e;
      }
    }
  }), S.ajaxPrefilter("script", function (e) {
    void 0 === e.cache && (e.cache = !1), e.crossDomain && (e.type = "GET");
  }), S.ajaxTransport("script", function (n) {
    var r, _i2;

    if (n.crossDomain || n.scriptAttrs) return {
      send: function send(e, t) {
        r = S("<script>").attr(n.scriptAttrs || {}).prop({
          charset: n.scriptCharset,
          src: n.url
        }).on("load error", _i2 = function i(e) {
          r.remove(), _i2 = null, e && t("error" === e.type ? 404 : 200, e.type);
        }), E.head.appendChild(r[0]);
      },
      abort: function abort() {
        _i2 && _i2();
      }
    };
  });
  var Ut,
      Xt = [],
      Vt = /(=)\?(?=&|$)|\?\?/;
  S.ajaxSetup({
    jsonp: "callback",
    jsonpCallback: function jsonpCallback() {
      var e = Xt.pop() || S.expando + "_" + Ct.guid++;
      return this[e] = !0, e;
    }
  }), S.ajaxPrefilter("json jsonp", function (e, t, n) {
    var r,
        i,
        o,
        a = !1 !== e.jsonp && (Vt.test(e.url) ? "url" : "string" == typeof e.data && 0 === (e.contentType || "").indexOf("application/x-www-form-urlencoded") && Vt.test(e.data) && "data");
    if (a || "jsonp" === e.dataTypes[0]) return r = e.jsonpCallback = m(e.jsonpCallback) ? e.jsonpCallback() : e.jsonpCallback, a ? e[a] = e[a].replace(Vt, "$1" + r) : !1 !== e.jsonp && (e.url += (Et.test(e.url) ? "&" : "?") + e.jsonp + "=" + r), e.converters["script json"] = function () {
      return o || S.error(r + " was not called"), o[0];
    }, e.dataTypes[0] = "json", i = C[r], C[r] = function () {
      o = arguments;
    }, n.always(function () {
      void 0 === i ? S(C).removeProp(r) : C[r] = i, e[r] && (e.jsonpCallback = t.jsonpCallback, Xt.push(r)), o && m(i) && i(o[0]), o = i = void 0;
    }), "script";
  }), y.createHTMLDocument = ((Ut = E.implementation.createHTMLDocument("").body).innerHTML = "<form></form><form></form>", 2 === Ut.childNodes.length), S.parseHTML = function (e, t, n) {
    return "string" != typeof e ? [] : ("boolean" == typeof t && (n = t, t = !1), t || (y.createHTMLDocument ? ((r = (t = E.implementation.createHTMLDocument("")).createElement("base")).href = E.location.href, t.head.appendChild(r)) : t = E), o = !n && [], (i = N.exec(e)) ? [t.createElement(i[1])] : (i = xe([e], t, o), o && o.length && S(o).remove(), S.merge([], i.childNodes)));
    var r, i, o;
  }, S.fn.load = function (e, t, n) {
    var r,
        i,
        o,
        a = this,
        s = e.indexOf(" ");
    return -1 < s && (r = vt(e.slice(s)), e = e.slice(0, s)), m(t) ? (n = t, t = void 0) : t && "object" == _typeof(t) && (i = "POST"), 0 < a.length && S.ajax({
      url: e,
      type: i || "GET",
      dataType: "html",
      data: t
    }).done(function (e) {
      o = arguments, a.html(r ? S("<div>").append(S.parseHTML(e)).find(r) : e);
    }).always(n && function (e, t) {
      a.each(function () {
        n.apply(this, o || [e.responseText, t, e]);
      });
    }), this;
  }, S.expr.pseudos.animated = function (t) {
    return S.grep(S.timers, function (e) {
      return t === e.elem;
    }).length;
  }, S.offset = {
    setOffset: function setOffset(e, t, n) {
      var r,
          i,
          o,
          a,
          s,
          u,
          l = S.css(e, "position"),
          c = S(e),
          f = {};
      "static" === l && (e.style.position = "relative"), s = c.offset(), o = S.css(e, "top"), u = S.css(e, "left"), ("absolute" === l || "fixed" === l) && -1 < (o + u).indexOf("auto") ? (a = (r = c.position()).top, i = r.left) : (a = parseFloat(o) || 0, i = parseFloat(u) || 0), m(t) && (t = t.call(e, n, S.extend({}, s))), null != t.top && (f.top = t.top - s.top + a), null != t.left && (f.left = t.left - s.left + i), "using" in t ? t.using.call(e, f) : ("number" == typeof f.top && (f.top += "px"), "number" == typeof f.left && (f.left += "px"), c.css(f));
    }
  }, S.fn.extend({
    offset: function offset(t) {
      if (arguments.length) return void 0 === t ? this : this.each(function (e) {
        S.offset.setOffset(this, t, e);
      });
      var e,
          n,
          r = this[0];
      return r ? r.getClientRects().length ? (e = r.getBoundingClientRect(), n = r.ownerDocument.defaultView, {
        top: e.top + n.pageYOffset,
        left: e.left + n.pageXOffset
      }) : {
        top: 0,
        left: 0
      } : void 0;
    },
    position: function position() {
      if (this[0]) {
        var e,
            t,
            n,
            r = this[0],
            i = {
          top: 0,
          left: 0
        };
        if ("fixed" === S.css(r, "position")) t = r.getBoundingClientRect();else {
          t = this.offset(), n = r.ownerDocument, e = r.offsetParent || n.documentElement;

          while (e && (e === n.body || e === n.documentElement) && "static" === S.css(e, "position")) {
            e = e.parentNode;
          }

          e && e !== r && 1 === e.nodeType && ((i = S(e).offset()).top += S.css(e, "borderTopWidth", !0), i.left += S.css(e, "borderLeftWidth", !0));
        }
        return {
          top: t.top - i.top - S.css(r, "marginTop", !0),
          left: t.left - i.left - S.css(r, "marginLeft", !0)
        };
      }
    },
    offsetParent: function offsetParent() {
      return this.map(function () {
        var e = this.offsetParent;

        while (e && "static" === S.css(e, "position")) {
          e = e.offsetParent;
        }

        return e || re;
      });
    }
  }), S.each({
    scrollLeft: "pageXOffset",
    scrollTop: "pageYOffset"
  }, function (t, i) {
    var o = "pageYOffset" === i;

    S.fn[t] = function (e) {
      return $(this, function (e, t, n) {
        var r;
        if (x(e) ? r = e : 9 === e.nodeType && (r = e.defaultView), void 0 === n) return r ? r[i] : e[t];
        r ? r.scrollTo(o ? r.pageXOffset : n, o ? n : r.pageYOffset) : e[t] = n;
      }, t, e, arguments.length);
    };
  }), S.each(["top", "left"], function (e, n) {
    S.cssHooks[n] = $e(y.pixelPosition, function (e, t) {
      if (t) return t = Be(e, n), Me.test(t) ? S(e).position()[n] + "px" : t;
    });
  }), S.each({
    Height: "height",
    Width: "width"
  }, function (a, s) {
    S.each({
      padding: "inner" + a,
      content: s,
      "": "outer" + a
    }, function (r, o) {
      S.fn[o] = function (e, t) {
        var n = arguments.length && (r || "boolean" != typeof e),
            i = r || (!0 === e || !0 === t ? "margin" : "border");
        return $(this, function (e, t, n) {
          var r;
          return x(e) ? 0 === o.indexOf("outer") ? e["inner" + a] : e.document.documentElement["client" + a] : 9 === e.nodeType ? (r = e.documentElement, Math.max(e.body["scroll" + a], r["scroll" + a], e.body["offset" + a], r["offset" + a], r["client" + a])) : void 0 === n ? S.css(e, t, i) : S.style(e, t, n, i);
        }, s, n ? e : void 0, n);
      };
    });
  }), S.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (e, t) {
    S.fn[t] = function (e) {
      return this.on(t, e);
    };
  }), S.fn.extend({
    bind: function bind(e, t, n) {
      return this.on(e, null, t, n);
    },
    unbind: function unbind(e, t) {
      return this.off(e, null, t);
    },
    delegate: function delegate(e, t, n, r) {
      return this.on(t, e, n, r);
    },
    undelegate: function undelegate(e, t, n) {
      return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n);
    },
    hover: function hover(e, t) {
      return this.mouseenter(e).mouseleave(t || e);
    }
  }), S.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "), function (e, n) {
    S.fn[n] = function (e, t) {
      return 0 < arguments.length ? this.on(n, null, e, t) : this.trigger(n);
    };
  });
  var Gt = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
  S.proxy = function (e, t) {
    var n, r, i;
    if ("string" == typeof t && (n = e[t], t = e, e = n), m(e)) return r = s.call(arguments, 2), (i = function i() {
      return e.apply(t || this, r.concat(s.call(arguments)));
    }).guid = e.guid = e.guid || S.guid++, i;
  }, S.holdReady = function (e) {
    e ? S.readyWait++ : S.ready(!0);
  }, S.isArray = Array.isArray, S.parseJSON = JSON.parse, S.nodeName = A, S.isFunction = m, S.isWindow = x, S.camelCase = X, S.type = w, S.now = Date.now, S.isNumeric = function (e) {
    var t = S.type(e);
    return ("number" === t || "string" === t) && !isNaN(e - parseFloat(e));
  }, S.trim = function (e) {
    return null == e ? "" : (e + "").replace(Gt, "");
  }, "function" == typeof define && define.amd && define("jquery", [], function () {
    return S;
  });
  var Yt = C.jQuery,
      Qt = C.$;
  return S.noConflict = function (e) {
    return C.$ === S && (C.$ = Qt), e && C.jQuery === S && (C.jQuery = Yt), S;
  }, "undefined" == typeof e && (C.jQuery = C.$ = S), S;
});
/**
 * @license
 * Lodash <https://lodash.com/>
 * Copyright OpenJS Foundation and other contributors <https://openjsf.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

(function () {
  function n(n, t, r) {
    switch (r.length) {
      case 0:
        return n.call(t);

      case 1:
        return n.call(t, r[0]);

      case 2:
        return n.call(t, r[0], r[1]);

      case 3:
        return n.call(t, r[0], r[1], r[2]);
    }

    return n.apply(t, r);
  }

  function t(n, t, r, e) {
    for (var u = -1, i = null == n ? 0 : n.length; ++u < i;) {
      var o = n[u];
      t(e, o, r(o), n);
    }

    return e;
  }

  function r(n, t) {
    for (var r = -1, e = null == n ? 0 : n.length; ++r < e && t(n[r], r, n) !== !1;) {
      ;
    }

    return n;
  }

  function e(n, t) {
    for (var r = null == n ? 0 : n.length; r-- && t(n[r], r, n) !== !1;) {
      ;
    }

    return n;
  }

  function u(n, t) {
    for (var r = -1, e = null == n ? 0 : n.length; ++r < e;) {
      if (!t(n[r], r, n)) return !1;
    }

    return !0;
  }

  function i(n, t) {
    for (var r = -1, e = null == n ? 0 : n.length, u = 0, i = []; ++r < e;) {
      var o = n[r];
      t(o, r, n) && (i[u++] = o);
    }

    return i;
  }

  function o(n, t) {
    return !!(null == n ? 0 : n.length) && y(n, t, 0) > -1;
  }

  function f(n, t, r) {
    for (var e = -1, u = null == n ? 0 : n.length; ++e < u;) {
      if (r(t, n[e])) return !0;
    }

    return !1;
  }

  function c(n, t) {
    for (var r = -1, e = null == n ? 0 : n.length, u = Array(e); ++r < e;) {
      u[r] = t(n[r], r, n);
    }

    return u;
  }

  function a(n, t) {
    for (var r = -1, e = t.length, u = n.length; ++r < e;) {
      n[u + r] = t[r];
    }

    return n;
  }

  function l(n, t, r, e) {
    var u = -1,
        i = null == n ? 0 : n.length;

    for (e && i && (r = n[++u]); ++u < i;) {
      r = t(r, n[u], u, n);
    }

    return r;
  }

  function s(n, t, r, e) {
    var u = null == n ? 0 : n.length;

    for (e && u && (r = n[--u]); u--;) {
      r = t(r, n[u], u, n);
    }

    return r;
  }

  function h(n, t) {
    for (var r = -1, e = null == n ? 0 : n.length; ++r < e;) {
      if (t(n[r], r, n)) return !0;
    }

    return !1;
  }

  function p(n) {
    return n.split("");
  }

  function _(n) {
    return n.match(Bt) || [];
  }

  function v(n, t, r) {
    var e;
    return r(n, function (n, r, u) {
      if (t(n, r, u)) return e = r, !1;
    }), e;
  }

  function g(n, t, r, e) {
    for (var u = n.length, i = r + (e ? 1 : -1); e ? i-- : ++i < u;) {
      if (t(n[i], i, n)) return i;
    }

    return -1;
  }

  function y(n, t, r) {
    return t === t ? q(n, t, r) : g(n, b, r);
  }

  function d(n, t, r, e) {
    for (var u = r - 1, i = n.length; ++u < i;) {
      if (e(n[u], t)) return u;
    }

    return -1;
  }

  function b(n) {
    return n !== n;
  }

  function w(n, t) {
    var r = null == n ? 0 : n.length;
    return r ? k(n, t) / r : Sn;
  }

  function m(n) {
    return function (t) {
      return null == t ? Y : t[n];
    };
  }

  function x(n) {
    return function (t) {
      return null == n ? Y : n[t];
    };
  }

  function j(n, t, r, e, u) {
    return u(n, function (n, u, i) {
      r = e ? (e = !1, n) : t(r, n, u, i);
    }), r;
  }

  function A(n, t) {
    var r = n.length;

    for (n.sort(t); r--;) {
      n[r] = n[r].value;
    }

    return n;
  }

  function k(n, t) {
    for (var r, e = -1, u = n.length; ++e < u;) {
      var i = t(n[e]);
      i !== Y && (r = r === Y ? i : r + i);
    }

    return r;
  }

  function O(n, t) {
    for (var r = -1, e = Array(n); ++r < n;) {
      e[r] = t(r);
    }

    return e;
  }

  function I(n, t) {
    return c(t, function (t) {
      return [t, n[t]];
    });
  }

  function R(n) {
    return function (t) {
      return n(t);
    };
  }

  function z(n, t) {
    return c(t, function (t) {
      return n[t];
    });
  }

  function E(n, t) {
    return n.has(t);
  }

  function S(n, t) {
    for (var r = -1, e = n.length; ++r < e && y(t, n[r], 0) > -1;) {
      ;
    }

    return r;
  }

  function W(n, t) {
    for (var r = n.length; r-- && y(t, n[r], 0) > -1;) {
      ;
    }

    return r;
  }

  function L(n, t) {
    for (var r = n.length, e = 0; r--;) {
      n[r] === t && ++e;
    }

    return e;
  }

  function C(n) {
    return "\\" + Gr[n];
  }

  function U(n, t) {
    return null == n ? Y : n[t];
  }

  function B(n) {
    return Dr.test(n);
  }

  function T(n) {
    return Mr.test(n);
  }

  function $(n) {
    for (var t, r = []; !(t = n.next()).done;) {
      r.push(t.value);
    }

    return r;
  }

  function D(n) {
    var t = -1,
        r = Array(n.size);
    return n.forEach(function (n, e) {
      r[++t] = [e, n];
    }), r;
  }

  function M(n, t) {
    return function (r) {
      return n(t(r));
    };
  }

  function F(n, t) {
    for (var r = -1, e = n.length, u = 0, i = []; ++r < e;) {
      var o = n[r];
      o !== t && o !== un || (n[r] = un, i[u++] = r);
    }

    return i;
  }

  function N(n) {
    var t = -1,
        r = Array(n.size);
    return n.forEach(function (n) {
      r[++t] = n;
    }), r;
  }

  function P(n) {
    var t = -1,
        r = Array(n.size);
    return n.forEach(function (n) {
      r[++t] = [n, n];
    }), r;
  }

  function q(n, t, r) {
    for (var e = r - 1, u = n.length; ++e < u;) {
      if (n[e] === t) return e;
    }

    return -1;
  }

  function Z(n, t, r) {
    for (var e = r + 1; e--;) {
      if (n[e] === t) return e;
    }

    return e;
  }

  function K(n) {
    return B(n) ? G(n) : se(n);
  }

  function V(n) {
    return B(n) ? H(n) : p(n);
  }

  function G(n) {
    for (var t = Tr.lastIndex = 0; Tr.test(n);) {
      ++t;
    }

    return t;
  }

  function H(n) {
    return n.match(Tr) || [];
  }

  function J(n) {
    return n.match($r) || [];
  }

  var Y,
      Q = "4.17.20",
      X = 200,
      nn = "Unsupported core-js use. Try https://npms.io/search?q=ponyfill.",
      tn = "Expected a function",
      rn = "__lodash_hash_undefined__",
      en = 500,
      un = "__lodash_placeholder__",
      on = 1,
      fn = 2,
      cn = 4,
      an = 1,
      ln = 2,
      sn = 1,
      hn = 2,
      pn = 4,
      _n = 8,
      vn = 16,
      gn = 32,
      yn = 64,
      dn = 128,
      bn = 256,
      wn = 512,
      mn = 30,
      xn = "...",
      jn = 800,
      An = 16,
      kn = 1,
      On = 2,
      In = 3,
      Rn = 1 / 0,
      zn = 9007199254740991,
      En = 1.7976931348623157e308,
      Sn = NaN,
      Wn = 4294967295,
      Ln = Wn - 1,
      Cn = Wn >>> 1,
      Un = [["ary", dn], ["bind", sn], ["bindKey", hn], ["curry", _n], ["curryRight", vn], ["flip", wn], ["partial", gn], ["partialRight", yn], ["rearg", bn]],
      Bn = "[object Arguments]",
      Tn = "[object Array]",
      $n = "[object AsyncFunction]",
      Dn = "[object Boolean]",
      Mn = "[object Date]",
      Fn = "[object DOMException]",
      Nn = "[object Error]",
      Pn = "[object Function]",
      qn = "[object GeneratorFunction]",
      Zn = "[object Map]",
      Kn = "[object Number]",
      Vn = "[object Null]",
      Gn = "[object Object]",
      Hn = "[object Promise]",
      Jn = "[object Proxy]",
      Yn = "[object RegExp]",
      Qn = "[object Set]",
      Xn = "[object String]",
      nt = "[object Symbol]",
      tt = "[object Undefined]",
      rt = "[object WeakMap]",
      et = "[object WeakSet]",
      ut = "[object ArrayBuffer]",
      it = "[object DataView]",
      ot = "[object Float32Array]",
      ft = "[object Float64Array]",
      ct = "[object Int8Array]",
      at = "[object Int16Array]",
      lt = "[object Int32Array]",
      st = "[object Uint8Array]",
      ht = "[object Uint8ClampedArray]",
      pt = "[object Uint16Array]",
      _t = "[object Uint32Array]",
      vt = /\b__p \+= '';/g,
      gt = /\b(__p \+=) '' \+/g,
      yt = /(__e\(.*?\)|\b__t\)) \+\n'';/g,
      dt = /&(?:amp|lt|gt|quot|#39);/g,
      bt = /[&<>"']/g,
      wt = RegExp(dt.source),
      mt = RegExp(bt.source),
      xt = /<%-([\s\S]+?)%>/g,
      jt = /<%([\s\S]+?)%>/g,
      At = /<%=([\s\S]+?)%>/g,
      kt = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
      Ot = /^\w*$/,
      It = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,
      Rt = /[\\^$.*+?()[\]{}|]/g,
      zt = RegExp(Rt.source),
      Et = /^\s+|\s+$/g,
      St = /^\s+/,
      Wt = /\s+$/,
      Lt = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/,
      Ct = /\{\n\/\* \[wrapped with (.+)\] \*/,
      Ut = /,? & /,
      Bt = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g,
      Tt = /\\(\\)?/g,
      $t = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g,
      Dt = /\w*$/,
      Mt = /^[-+]0x[0-9a-f]+$/i,
      Ft = /^0b[01]+$/i,
      Nt = /^\[object .+?Constructor\]$/,
      Pt = /^0o[0-7]+$/i,
      qt = /^(?:0|[1-9]\d*)$/,
      Zt = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g,
      Kt = /($^)/,
      Vt = /['\n\r\u2028\u2029\\]/g,
      Gt = "\\ud800-\\udfff",
      Ht = "\\u0300-\\u036f",
      Jt = "\\ufe20-\\ufe2f",
      Yt = "\\u20d0-\\u20ff",
      Qt = Ht + Jt + Yt,
      Xt = "\\u2700-\\u27bf",
      nr = "a-z\\xdf-\\xf6\\xf8-\\xff",
      tr = "\\xac\\xb1\\xd7\\xf7",
      rr = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf",
      er = "\\u2000-\\u206f",
      ur = " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000",
      ir = "A-Z\\xc0-\\xd6\\xd8-\\xde",
      or = "\\ufe0e\\ufe0f",
      fr = tr + rr + er + ur,
      cr = "['\u2019]",
      ar = "[" + Gt + "]",
      lr = "[" + fr + "]",
      sr = "[" + Qt + "]",
      hr = "\\d+",
      pr = "[" + Xt + "]",
      _r = "[" + nr + "]",
      vr = "[^" + Gt + fr + hr + Xt + nr + ir + "]",
      gr = "\\ud83c[\\udffb-\\udfff]",
      yr = "(?:" + sr + "|" + gr + ")",
      dr = "[^" + Gt + "]",
      br = "(?:\\ud83c[\\udde6-\\uddff]){2}",
      wr = "[\\ud800-\\udbff][\\udc00-\\udfff]",
      mr = "[" + ir + "]",
      xr = "\\u200d",
      jr = "(?:" + _r + "|" + vr + ")",
      Ar = "(?:" + mr + "|" + vr + ")",
      kr = "(?:" + cr + "(?:d|ll|m|re|s|t|ve))?",
      Or = "(?:" + cr + "(?:D|LL|M|RE|S|T|VE))?",
      Ir = yr + "?",
      Rr = "[" + or + "]?",
      zr = "(?:" + xr + "(?:" + [dr, br, wr].join("|") + ")" + Rr + Ir + ")*",
      Er = "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])",
      Sr = "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])",
      Wr = Rr + Ir + zr,
      Lr = "(?:" + [pr, br, wr].join("|") + ")" + Wr,
      Cr = "(?:" + [dr + sr + "?", sr, br, wr, ar].join("|") + ")",
      Ur = RegExp(cr, "g"),
      Br = RegExp(sr, "g"),
      Tr = RegExp(gr + "(?=" + gr + ")|" + Cr + Wr, "g"),
      $r = RegExp([mr + "?" + _r + "+" + kr + "(?=" + [lr, mr, "$"].join("|") + ")", Ar + "+" + Or + "(?=" + [lr, mr + jr, "$"].join("|") + ")", mr + "?" + jr + "+" + kr, mr + "+" + Or, Sr, Er, hr, Lr].join("|"), "g"),
      Dr = RegExp("[" + xr + Gt + Qt + or + "]"),
      Mr = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/,
      Fr = ["Array", "Buffer", "DataView", "Date", "Error", "Float32Array", "Float64Array", "Function", "Int8Array", "Int16Array", "Int32Array", "Map", "Math", "Object", "Promise", "RegExp", "Set", "String", "Symbol", "TypeError", "Uint8Array", "Uint8ClampedArray", "Uint16Array", "Uint32Array", "WeakMap", "_", "clearTimeout", "isFinite", "parseInt", "setTimeout"],
      Nr = -1,
      Pr = {};

  Pr[ot] = Pr[ft] = Pr[ct] = Pr[at] = Pr[lt] = Pr[st] = Pr[ht] = Pr[pt] = Pr[_t] = !0, Pr[Bn] = Pr[Tn] = Pr[ut] = Pr[Dn] = Pr[it] = Pr[Mn] = Pr[Nn] = Pr[Pn] = Pr[Zn] = Pr[Kn] = Pr[Gn] = Pr[Yn] = Pr[Qn] = Pr[Xn] = Pr[rt] = !1;
  var qr = {};
  qr[Bn] = qr[Tn] = qr[ut] = qr[it] = qr[Dn] = qr[Mn] = qr[ot] = qr[ft] = qr[ct] = qr[at] = qr[lt] = qr[Zn] = qr[Kn] = qr[Gn] = qr[Yn] = qr[Qn] = qr[Xn] = qr[nt] = qr[st] = qr[ht] = qr[pt] = qr[_t] = !0, qr[Nn] = qr[Pn] = qr[rt] = !1;

  var Zr = {
    "\xc0": "A",
    "\xc1": "A",
    "\xc2": "A",
    "\xc3": "A",
    "\xc4": "A",
    "\xc5": "A",
    "\xe0": "a",
    "\xe1": "a",
    "\xe2": "a",
    "\xe3": "a",
    "\xe4": "a",
    "\xe5": "a",
    "\xc7": "C",
    "\xe7": "c",
    "\xd0": "D",
    "\xf0": "d",
    "\xc8": "E",
    "\xc9": "E",
    "\xca": "E",
    "\xcb": "E",
    "\xe8": "e",
    "\xe9": "e",
    "\xea": "e",
    "\xeb": "e",
    "\xcc": "I",
    "\xcd": "I",
    "\xce": "I",
    "\xcf": "I",
    "\xec": "i",
    "\xed": "i",
    "\xee": "i",
    "\xef": "i",
    "\xd1": "N",
    "\xf1": "n",
    "\xd2": "O",
    "\xd3": "O",
    "\xd4": "O",
    "\xd5": "O",
    "\xd6": "O",
    "\xd8": "O",
    "\xf2": "o",
    "\xf3": "o",
    "\xf4": "o",
    "\xf5": "o",
    "\xf6": "o",
    "\xf8": "o",
    "\xd9": "U",
    "\xda": "U",
    "\xdb": "U",
    "\xdc": "U",
    "\xf9": "u",
    "\xfa": "u",
    "\xfb": "u",
    "\xfc": "u",
    "\xdd": "Y",
    "\xfd": "y",
    "\xff": "y",
    "\xc6": "Ae",
    "\xe6": "ae",
    "\xde": "Th",
    "\xfe": "th",
    "\xdf": "ss",
    "\u0100": "A",
    "\u0102": "A",
    "\u0104": "A",
    "\u0101": "a",
    "\u0103": "a",
    "\u0105": "a",
    "\u0106": "C",
    "\u0108": "C",
    "\u010A": "C",
    "\u010C": "C",
    "\u0107": "c",
    "\u0109": "c",
    "\u010B": "c",
    "\u010D": "c",
    "\u010E": "D",
    "\u0110": "D",
    "\u010F": "d",
    "\u0111": "d",
    "\u0112": "E",
    "\u0114": "E",
    "\u0116": "E",
    "\u0118": "E",
    "\u011A": "E",
    "\u0113": "e",
    "\u0115": "e",
    "\u0117": "e",
    "\u0119": "e",
    "\u011B": "e",
    "\u011C": "G",
    "\u011E": "G",
    "\u0120": "G",
    "\u0122": "G",
    "\u011D": "g",
    "\u011F": "g",
    "\u0121": "g",
    "\u0123": "g",
    "\u0124": "H",
    "\u0126": "H",
    "\u0125": "h",
    "\u0127": "h",
    "\u0128": "I",
    "\u012A": "I",
    "\u012C": "I",
    "\u012E": "I",
    "\u0130": "I",
    "\u0129": "i",
    "\u012B": "i",
    "\u012D": "i",
    "\u012F": "i",
    "\u0131": "i",
    "\u0134": "J",
    "\u0135": "j",
    "\u0136": "K",
    "\u0137": "k",
    "\u0138": "k",
    "\u0139": "L",
    "\u013B": "L",
    "\u013D": "L",
    "\u013F": "L",
    "\u0141": "L",
    "\u013A": "l",
    "\u013C": "l",
    "\u013E": "l",
    "\u0140": "l",
    "\u0142": "l",
    "\u0143": "N",
    "\u0145": "N",
    "\u0147": "N",
    "\u014A": "N",
    "\u0144": "n",
    "\u0146": "n",
    "\u0148": "n",
    "\u014B": "n",
    "\u014C": "O",
    "\u014E": "O",
    "\u0150": "O",
    "\u014D": "o",
    "\u014F": "o",
    "\u0151": "o",
    "\u0154": "R",
    "\u0156": "R",
    "\u0158": "R",
    "\u0155": "r",
    "\u0157": "r",
    "\u0159": "r",
    "\u015A": "S",
    "\u015C": "S",
    "\u015E": "S",
    "\u0160": "S",
    "\u015B": "s",
    "\u015D": "s",
    "\u015F": "s",
    "\u0161": "s",
    "\u0162": "T",
    "\u0164": "T",
    "\u0166": "T",
    "\u0163": "t",
    "\u0165": "t",
    "\u0167": "t",
    "\u0168": "U",
    "\u016A": "U",
    "\u016C": "U",
    "\u016E": "U",
    "\u0170": "U",
    "\u0172": "U",
    "\u0169": "u",
    "\u016B": "u",
    "\u016D": "u",
    "\u016F": "u",
    "\u0171": "u",
    "\u0173": "u",
    "\u0174": "W",
    "\u0175": "w",
    "\u0176": "Y",
    "\u0177": "y",
    "\u0178": "Y",
    "\u0179": "Z",
    "\u017B": "Z",
    "\u017D": "Z",
    "\u017A": "z",
    "\u017C": "z",
    "\u017E": "z",
    "\u0132": "IJ",
    "\u0133": "ij",
    "\u0152": "Oe",
    "\u0153": "oe",
    "\u0149": "'n",
    "\u017F": "s"
  },
      Kr = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  },
      Vr = {
    "&amp;": "&",
    "&lt;": "<",
    "&gt;": ">",
    "&quot;": '"',
    "&#39;": "'"
  },
      Gr = {
    "\\": "\\",
    "'": "'",
    "\n": "n",
    "\r": "r",
    "\u2028": "u2028",
    "\u2029": "u2029"
  },
      Hr = parseFloat,
      Jr = parseInt,
      Yr = "object" == (typeof global === "undefined" ? "undefined" : _typeof(global)) && global && global.Object === Object && global,
      Qr = "object" == (typeof self === "undefined" ? "undefined" : _typeof(self)) && self && self.Object === Object && self,
      Xr = Yr || Qr || Function("return this")(),
      ne = "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) && exports && !exports.nodeType && exports,
      te = ne && "object" == (typeof module === "undefined" ? "undefined" : _typeof(module)) && module && !module.nodeType && module,
      re = te && te.exports === ne,
      ee = re && Yr.process,
      ue = function () {
    try {
      var n = te && te.require && te.require("util").types;

      return n ? n : ee && ee.binding && ee.binding("util");
    } catch (n) {}
  }(),
      ie = ue && ue.isArrayBuffer,
      oe = ue && ue.isDate,
      fe = ue && ue.isMap,
      ce = ue && ue.isRegExp,
      ae = ue && ue.isSet,
      le = ue && ue.isTypedArray,
      se = m("length"),
      he = x(Zr),
      pe = x(Kr),
      _e = x(Vr),
      ve = function p(x) {
    function q(n) {
      if (oc(n) && !yh(n) && !(n instanceof Bt)) {
        if (n instanceof H) return n;
        if (yl.call(n, "__wrapped__")) return to(n);
      }

      return new H(n);
    }

    function G() {}

    function H(n, t) {
      this.__wrapped__ = n, this.__actions__ = [], this.__chain__ = !!t, this.__index__ = 0, this.__values__ = Y;
    }

    function Bt(n) {
      this.__wrapped__ = n, this.__actions__ = [], this.__dir__ = 1, this.__filtered__ = !1, this.__iteratees__ = [], this.__takeCount__ = Wn, this.__views__ = [];
    }

    function Gt() {
      var n = new Bt(this.__wrapped__);
      return n.__actions__ = Uu(this.__actions__), n.__dir__ = this.__dir__, n.__filtered__ = this.__filtered__, n.__iteratees__ = Uu(this.__iteratees__), n.__takeCount__ = this.__takeCount__, n.__views__ = Uu(this.__views__), n;
    }

    function Ht() {
      if (this.__filtered__) {
        var n = new Bt(this);
        n.__dir__ = -1, n.__filtered__ = !0;
      } else n = this.clone(), n.__dir__ *= -1;

      return n;
    }

    function Jt() {
      var n = this.__wrapped__.value(),
          t = this.__dir__,
          r = yh(n),
          e = t < 0,
          u = r ? n.length : 0,
          i = Ai(0, u, this.__views__),
          o = i.start,
          f = i.end,
          c = f - o,
          a = e ? f : o - 1,
          l = this.__iteratees__,
          s = l.length,
          h = 0,
          p = Vl(c, this.__takeCount__);

      if (!r || !e && u == c && p == c) return du(n, this.__actions__);
      var _ = [];

      n: for (; c-- && h < p;) {
        a += t;

        for (var v = -1, g = n[a]; ++v < s;) {
          var y = l[v],
              d = y.iteratee,
              b = y.type,
              w = d(g);
          if (b == On) g = w;else if (!w) {
            if (b == kn) continue n;
            break n;
          }
        }

        _[h++] = g;
      }

      return _;
    }

    function Yt(n) {
      var t = -1,
          r = null == n ? 0 : n.length;

      for (this.clear(); ++t < r;) {
        var e = n[t];
        this.set(e[0], e[1]);
      }
    }

    function Qt() {
      this.__data__ = es ? es(null) : {}, this.size = 0;
    }

    function Xt(n) {
      var t = this.has(n) && delete this.__data__[n];
      return this.size -= t ? 1 : 0, t;
    }

    function nr(n) {
      var t = this.__data__;

      if (es) {
        var r = t[n];
        return r === rn ? Y : r;
      }

      return yl.call(t, n) ? t[n] : Y;
    }

    function tr(n) {
      var t = this.__data__;
      return es ? t[n] !== Y : yl.call(t, n);
    }

    function rr(n, t) {
      var r = this.__data__;
      return this.size += this.has(n) ? 0 : 1, r[n] = es && t === Y ? rn : t, this;
    }

    function er(n) {
      var t = -1,
          r = null == n ? 0 : n.length;

      for (this.clear(); ++t < r;) {
        var e = n[t];
        this.set(e[0], e[1]);
      }
    }

    function ur() {
      this.__data__ = [], this.size = 0;
    }

    function ir(n) {
      var t = this.__data__,
          r = Er(t, n);
      return !(r < 0) && (r == t.length - 1 ? t.pop() : Sl.call(t, r, 1), --this.size, !0);
    }

    function or(n) {
      var t = this.__data__,
          r = Er(t, n);
      return r < 0 ? Y : t[r][1];
    }

    function fr(n) {
      return Er(this.__data__, n) > -1;
    }

    function cr(n, t) {
      var r = this.__data__,
          e = Er(r, n);
      return e < 0 ? (++this.size, r.push([n, t])) : r[e][1] = t, this;
    }

    function ar(n) {
      var t = -1,
          r = null == n ? 0 : n.length;

      for (this.clear(); ++t < r;) {
        var e = n[t];
        this.set(e[0], e[1]);
      }
    }

    function lr() {
      this.size = 0, this.__data__ = {
        hash: new Yt(),
        map: new (Xl || er)(),
        string: new Yt()
      };
    }

    function sr(n) {
      var t = wi(this, n)["delete"](n);
      return this.size -= t ? 1 : 0, t;
    }

    function hr(n) {
      return wi(this, n).get(n);
    }

    function pr(n) {
      return wi(this, n).has(n);
    }

    function _r(n, t) {
      var r = wi(this, n),
          e = r.size;
      return r.set(n, t), this.size += r.size == e ? 0 : 1, this;
    }

    function vr(n) {
      var t = -1,
          r = null == n ? 0 : n.length;

      for (this.__data__ = new ar(); ++t < r;) {
        this.add(n[t]);
      }
    }

    function gr(n) {
      return this.__data__.set(n, rn), this;
    }

    function yr(n) {
      return this.__data__.has(n);
    }

    function dr(n) {
      this.size = (this.__data__ = new er(n)).size;
    }

    function br() {
      this.__data__ = new er(), this.size = 0;
    }

    function wr(n) {
      var t = this.__data__,
          r = t["delete"](n);
      return this.size = t.size, r;
    }

    function mr(n) {
      return this.__data__.get(n);
    }

    function xr(n) {
      return this.__data__.has(n);
    }

    function jr(n, t) {
      var r = this.__data__;

      if (r instanceof er) {
        var e = r.__data__;
        if (!Xl || e.length < X - 1) return e.push([n, t]), this.size = ++r.size, this;
        r = this.__data__ = new ar(e);
      }

      return r.set(n, t), this.size = r.size, this;
    }

    function Ar(n, t) {
      var r = yh(n),
          e = !r && gh(n),
          u = !r && !e && bh(n),
          i = !r && !e && !u && Ah(n),
          o = r || e || u || i,
          f = o ? O(n.length, ll) : [],
          c = f.length;

      for (var a in n) {
        !t && !yl.call(n, a) || o && ("length" == a || u && ("offset" == a || "parent" == a) || i && ("buffer" == a || "byteLength" == a || "byteOffset" == a) || Wi(a, c)) || f.push(a);
      }

      return f;
    }

    function kr(n) {
      var t = n.length;
      return t ? n[Xe(0, t - 1)] : Y;
    }

    function Or(n, t) {
      return Yi(Uu(n), $r(t, 0, n.length));
    }

    function Ir(n) {
      return Yi(Uu(n));
    }

    function Rr(n, t, r) {
      (r === Y || Kf(n[t], r)) && (r !== Y || t in n) || Cr(n, t, r);
    }

    function zr(n, t, r) {
      var e = n[t];
      yl.call(n, t) && Kf(e, r) && (r !== Y || t in n) || Cr(n, t, r);
    }

    function Er(n, t) {
      for (var r = n.length; r--;) {
        if (Kf(n[r][0], t)) return r;
      }

      return -1;
    }

    function Sr(n, t, r, e) {
      return vs(n, function (n, u, i) {
        t(e, n, r(n), i);
      }), e;
    }

    function Wr(n, t) {
      return n && Bu(t, Fc(t), n);
    }

    function Lr(n, t) {
      return n && Bu(t, Nc(t), n);
    }

    function Cr(n, t, r) {
      "__proto__" == t && Ul ? Ul(n, t, {
        configurable: !0,
        enumerable: !0,
        value: r,
        writable: !0
      }) : n[t] = r;
    }

    function Tr(n, t) {
      for (var r = -1, e = t.length, u = el(e), i = null == n; ++r < e;) {
        u[r] = i ? Y : $c(n, t[r]);
      }

      return u;
    }

    function $r(n, t, r) {
      return n === n && (r !== Y && (n = n <= r ? n : r), t !== Y && (n = n >= t ? n : t)), n;
    }

    function Dr(n, t, e, u, i, o) {
      var f,
          c = t & on,
          a = t & fn,
          l = t & cn;
      if (e && (f = i ? e(n, u, i, o) : e(n)), f !== Y) return f;
      if (!ic(n)) return n;
      var s = yh(n);

      if (s) {
        if (f = Ii(n), !c) return Uu(n, f);
      } else {
        var h = Is(n),
            p = h == Pn || h == qn;
        if (bh(n)) return ku(n, c);

        if (h == Gn || h == Bn || p && !i) {
          if (f = a || p ? {} : Ri(n), !c) return a ? $u(n, Lr(f, n)) : Tu(n, Wr(f, n));
        } else {
          if (!qr[h]) return i ? n : {};
          f = zi(n, h, c);
        }
      }

      o || (o = new dr());

      var _ = o.get(n);

      if (_) return _;
      o.set(n, f), jh(n) ? n.forEach(function (r) {
        f.add(Dr(r, t, e, r, n, o));
      }) : mh(n) && n.forEach(function (r, u) {
        f.set(u, Dr(r, t, e, u, n, o));
      });
      var v = l ? a ? gi : vi : a ? Nc : Fc,
          g = s ? Y : v(n);
      return r(g || n, function (r, u) {
        g && (u = r, r = n[u]), zr(f, u, Dr(r, t, e, u, n, o));
      }), f;
    }

    function Mr(n) {
      var t = Fc(n);
      return function (r) {
        return Zr(r, n, t);
      };
    }

    function Zr(n, t, r) {
      var e = r.length;
      if (null == n) return !e;

      for (n = cl(n); e--;) {
        var u = r[e],
            i = t[u],
            o = n[u];
        if (o === Y && !(u in n) || !i(o)) return !1;
      }

      return !0;
    }

    function Kr(n, t, r) {
      if ("function" != typeof n) throw new sl(tn);
      return Es(function () {
        n.apply(Y, r);
      }, t);
    }

    function Vr(n, t, r, e) {
      var u = -1,
          i = o,
          a = !0,
          l = n.length,
          s = [],
          h = t.length;
      if (!l) return s;
      r && (t = c(t, R(r))), e ? (i = f, a = !1) : t.length >= X && (i = E, a = !1, t = new vr(t));

      n: for (; ++u < l;) {
        var p = n[u],
            _ = null == r ? p : r(p);

        if (p = e || 0 !== p ? p : 0, a && _ === _) {
          for (var v = h; v--;) {
            if (t[v] === _) continue n;
          }

          s.push(p);
        } else i(t, _, e) || s.push(p);
      }

      return s;
    }

    function Gr(n, t) {
      var r = !0;
      return vs(n, function (n, e, u) {
        return r = !!t(n, e, u);
      }), r;
    }

    function Yr(n, t, r) {
      for (var e = -1, u = n.length; ++e < u;) {
        var i = n[e],
            o = t(i);
        if (null != o && (f === Y ? o === o && !yc(o) : r(o, f))) var f = o,
            c = i;
      }

      return c;
    }

    function Qr(n, t, r, e) {
      var u = n.length;

      for (r = jc(r), r < 0 && (r = -r > u ? 0 : u + r), e = e === Y || e > u ? u : jc(e), e < 0 && (e += u), e = r > e ? 0 : Ac(e); r < e;) {
        n[r++] = t;
      }

      return n;
    }

    function ne(n, t) {
      var r = [];
      return vs(n, function (n, e, u) {
        t(n, e, u) && r.push(n);
      }), r;
    }

    function te(n, t, r, e, u) {
      var i = -1,
          o = n.length;

      for (r || (r = Si), u || (u = []); ++i < o;) {
        var f = n[i];
        t > 0 && r(f) ? t > 1 ? te(f, t - 1, r, e, u) : a(u, f) : e || (u[u.length] = f);
      }

      return u;
    }

    function ee(n, t) {
      return n && ys(n, t, Fc);
    }

    function ue(n, t) {
      return n && ds(n, t, Fc);
    }

    function se(n, t) {
      return i(t, function (t) {
        return rc(n[t]);
      });
    }

    function ve(n, t) {
      t = ju(t, n);

      for (var r = 0, e = t.length; null != n && r < e;) {
        n = n[Qi(t[r++])];
      }

      return r && r == e ? n : Y;
    }

    function ye(n, t, r) {
      var e = t(n);
      return yh(n) ? e : a(e, r(n));
    }

    function de(n) {
      return null == n ? n === Y ? tt : Vn : Cl && Cl in cl(n) ? ji(n) : qi(n);
    }

    function be(n, t) {
      return n > t;
    }

    function we(n, t) {
      return null != n && yl.call(n, t);
    }

    function me(n, t) {
      return null != n && t in cl(n);
    }

    function xe(n, t, r) {
      return n >= Vl(t, r) && n < Kl(t, r);
    }

    function je(n, t, r) {
      for (var e = r ? f : o, u = n[0].length, i = n.length, a = i, l = el(i), s = 1 / 0, h = []; a--;) {
        var p = n[a];
        a && t && (p = c(p, R(t))), s = Vl(p.length, s), l[a] = !r && (t || u >= 120 && p.length >= 120) ? new vr(a && p) : Y;
      }

      p = n[0];

      var _ = -1,
          v = l[0];

      n: for (; ++_ < u && h.length < s;) {
        var g = p[_],
            y = t ? t(g) : g;

        if (g = r || 0 !== g ? g : 0, !(v ? E(v, y) : e(h, y, r))) {
          for (a = i; --a;) {
            var d = l[a];
            if (!(d ? E(d, y) : e(n[a], y, r))) continue n;
          }

          v && v.push(y), h.push(g);
        }
      }

      return h;
    }

    function Ae(n, t, r, e) {
      return ee(n, function (n, u, i) {
        t(e, r(n), u, i);
      }), e;
    }

    function ke(t, r, e) {
      r = ju(r, t), t = Ki(t, r);
      var u = null == t ? t : t[Qi(mo(r))];
      return null == u ? Y : n(u, t, e);
    }

    function Oe(n) {
      return oc(n) && de(n) == Bn;
    }

    function Ie(n) {
      return oc(n) && de(n) == ut;
    }

    function Re(n) {
      return oc(n) && de(n) == Mn;
    }

    function ze(n, t, r, e, u) {
      return n === t || (null == n || null == t || !oc(n) && !oc(t) ? n !== n && t !== t : Ee(n, t, r, e, ze, u));
    }

    function Ee(n, t, r, e, u, i) {
      var o = yh(n),
          f = yh(t),
          c = o ? Tn : Is(n),
          a = f ? Tn : Is(t);
      c = c == Bn ? Gn : c, a = a == Bn ? Gn : a;
      var l = c == Gn,
          s = a == Gn,
          h = c == a;

      if (h && bh(n)) {
        if (!bh(t)) return !1;
        o = !0, l = !1;
      }

      if (h && !l) return i || (i = new dr()), o || Ah(n) ? si(n, t, r, e, u, i) : hi(n, t, c, r, e, u, i);

      if (!(r & an)) {
        var p = l && yl.call(n, "__wrapped__"),
            _ = s && yl.call(t, "__wrapped__");

        if (p || _) {
          var v = p ? n.value() : n,
              g = _ ? t.value() : t;
          return i || (i = new dr()), u(v, g, r, e, i);
        }
      }

      return !!h && (i || (i = new dr()), pi(n, t, r, e, u, i));
    }

    function Se(n) {
      return oc(n) && Is(n) == Zn;
    }

    function We(n, t, r, e) {
      var u = r.length,
          i = u,
          o = !e;
      if (null == n) return !i;

      for (n = cl(n); u--;) {
        var f = r[u];
        if (o && f[2] ? f[1] !== n[f[0]] : !(f[0] in n)) return !1;
      }

      for (; ++u < i;) {
        f = r[u];
        var c = f[0],
            a = n[c],
            l = f[1];

        if (o && f[2]) {
          if (a === Y && !(c in n)) return !1;
        } else {
          var s = new dr();
          if (e) var h = e(a, l, c, n, t, s);
          if (!(h === Y ? ze(l, a, an | ln, e, s) : h)) return !1;
        }
      }

      return !0;
    }

    function Le(n) {
      return !(!ic(n) || Ti(n)) && (rc(n) ? jl : Nt).test(Xi(n));
    }

    function Ce(n) {
      return oc(n) && de(n) == Yn;
    }

    function Ue(n) {
      return oc(n) && Is(n) == Qn;
    }

    function Be(n) {
      return oc(n) && uc(n.length) && !!Pr[de(n)];
    }

    function Te(n) {
      return "function" == typeof n ? n : null == n ? Sa : "object" == _typeof(n) ? yh(n) ? Pe(n[0], n[1]) : Ne(n) : Da(n);
    }

    function $e(n) {
      if (!$i(n)) return Zl(n);
      var t = [];

      for (var r in cl(n)) {
        yl.call(n, r) && "constructor" != r && t.push(r);
      }

      return t;
    }

    function De(n) {
      if (!ic(n)) return Pi(n);
      var t = $i(n),
          r = [];

      for (var e in n) {
        ("constructor" != e || !t && yl.call(n, e)) && r.push(e);
      }

      return r;
    }

    function Me(n, t) {
      return n < t;
    }

    function Fe(n, t) {
      var r = -1,
          e = Vf(n) ? el(n.length) : [];
      return vs(n, function (n, u, i) {
        e[++r] = t(n, u, i);
      }), e;
    }

    function Ne(n) {
      var t = mi(n);
      return 1 == t.length && t[0][2] ? Mi(t[0][0], t[0][1]) : function (r) {
        return r === n || We(r, n, t);
      };
    }

    function Pe(n, t) {
      return Ci(n) && Di(t) ? Mi(Qi(n), t) : function (r) {
        var e = $c(r, n);
        return e === Y && e === t ? Mc(r, n) : ze(t, e, an | ln);
      };
    }

    function qe(n, t, r, e, u) {
      n !== t && ys(t, function (i, o) {
        if (u || (u = new dr()), ic(i)) Ze(n, t, o, r, qe, e, u);else {
          var f = e ? e(Gi(n, o), i, o + "", n, t, u) : Y;
          f === Y && (f = i), Rr(n, o, f);
        }
      }, Nc);
    }

    function Ze(n, t, r, e, u, i, o) {
      var f = Gi(n, r),
          c = Gi(t, r),
          a = o.get(c);
      if (a) return Rr(n, r, a), Y;
      var l = i ? i(f, c, r + "", n, t, o) : Y,
          s = l === Y;

      if (s) {
        var h = yh(c),
            p = !h && bh(c),
            _ = !h && !p && Ah(c);

        l = c, h || p || _ ? yh(f) ? l = f : Gf(f) ? l = Uu(f) : p ? (s = !1, l = ku(c, !0)) : _ ? (s = !1, l = Eu(c, !0)) : l = [] : _c(c) || gh(c) ? (l = f, gh(f) ? l = Oc(f) : ic(f) && !rc(f) || (l = Ri(c))) : s = !1;
      }

      s && (o.set(c, l), u(l, c, e, i, o), o["delete"](c)), Rr(n, r, l);
    }

    function Ke(n, t) {
      var r = n.length;
      if (r) return t += t < 0 ? r : 0, Wi(t, r) ? n[t] : Y;
    }

    function Ve(n, t, r) {
      t = t.length ? c(t, function (n) {
        return yh(n) ? function (t) {
          return ve(t, 1 === n.length ? n[0] : n);
        } : n;
      }) : [Sa];
      var e = -1;
      return t = c(t, R(bi())), A(Fe(n, function (n, r, u) {
        return {
          criteria: c(t, function (t) {
            return t(n);
          }),
          index: ++e,
          value: n
        };
      }), function (n, t) {
        return Wu(n, t, r);
      });
    }

    function Ge(n, t) {
      return He(n, t, function (t, r) {
        return Mc(n, r);
      });
    }

    function He(n, t, r) {
      for (var e = -1, u = t.length, i = {}; ++e < u;) {
        var o = t[e],
            f = ve(n, o);
        r(f, o) && iu(i, ju(o, n), f);
      }

      return i;
    }

    function Je(n) {
      return function (t) {
        return ve(t, n);
      };
    }

    function Ye(n, t, r, e) {
      var u = e ? d : y,
          i = -1,
          o = t.length,
          f = n;

      for (n === t && (t = Uu(t)), r && (f = c(n, R(r))); ++i < o;) {
        for (var a = 0, l = t[i], s = r ? r(l) : l; (a = u(f, s, a, e)) > -1;) {
          f !== n && Sl.call(f, a, 1), Sl.call(n, a, 1);
        }
      }

      return n;
    }

    function Qe(n, t) {
      for (var r = n ? t.length : 0, e = r - 1; r--;) {
        var u = t[r];

        if (r == e || u !== i) {
          var i = u;
          Wi(u) ? Sl.call(n, u, 1) : vu(n, u);
        }
      }

      return n;
    }

    function Xe(n, t) {
      return n + Ml(Jl() * (t - n + 1));
    }

    function nu(n, t, r, e) {
      for (var u = -1, i = Kl(Dl((t - n) / (r || 1)), 0), o = el(i); i--;) {
        o[e ? i : ++u] = n, n += r;
      }

      return o;
    }

    function tu(n, t) {
      var r = "";
      if (!n || t < 1 || t > zn) return r;

      do {
        t % 2 && (r += n), t = Ml(t / 2), t && (n += n);
      } while (t);

      return r;
    }

    function ru(n, t) {
      return Ss(Zi(n, t, Sa), n + "");
    }

    function eu(n) {
      return kr(na(n));
    }

    function uu(n, t) {
      var r = na(n);
      return Yi(r, $r(t, 0, r.length));
    }

    function iu(n, t, r, e) {
      if (!ic(n)) return n;
      t = ju(t, n);

      for (var u = -1, i = t.length, o = i - 1, f = n; null != f && ++u < i;) {
        var c = Qi(t[u]),
            a = r;
        if ("__proto__" === c || "constructor" === c || "prototype" === c) return n;

        if (u != o) {
          var l = f[c];
          a = e ? e(l, c, f) : Y, a === Y && (a = ic(l) ? l : Wi(t[u + 1]) ? [] : {});
        }

        zr(f, c, a), f = f[c];
      }

      return n;
    }

    function ou(n) {
      return Yi(na(n));
    }

    function fu(n, t, r) {
      var e = -1,
          u = n.length;
      t < 0 && (t = -t > u ? 0 : u + t), r = r > u ? u : r, r < 0 && (r += u), u = t > r ? 0 : r - t >>> 0, t >>>= 0;

      for (var i = el(u); ++e < u;) {
        i[e] = n[e + t];
      }

      return i;
    }

    function cu(n, t) {
      var r;
      return vs(n, function (n, e, u) {
        return r = t(n, e, u), !r;
      }), !!r;
    }

    function au(n, t, r) {
      var e = 0,
          u = null == n ? e : n.length;

      if ("number" == typeof t && t === t && u <= Cn) {
        for (; e < u;) {
          var i = e + u >>> 1,
              o = n[i];
          null !== o && !yc(o) && (r ? o <= t : o < t) ? e = i + 1 : u = i;
        }

        return u;
      }

      return lu(n, t, Sa, r);
    }

    function lu(n, t, r, e) {
      var u = 0,
          i = null == n ? 0 : n.length;
      if (0 === i) return 0;
      t = r(t);

      for (var o = t !== t, f = null === t, c = yc(t), a = t === Y; u < i;) {
        var l = Ml((u + i) / 2),
            s = r(n[l]),
            h = s !== Y,
            p = null === s,
            _ = s === s,
            v = yc(s);

        if (o) var g = e || _;else g = a ? _ && (e || h) : f ? _ && h && (e || !p) : c ? _ && h && !p && (e || !v) : !p && !v && (e ? s <= t : s < t);
        g ? u = l + 1 : i = l;
      }

      return Vl(i, Ln);
    }

    function su(n, t) {
      for (var r = -1, e = n.length, u = 0, i = []; ++r < e;) {
        var o = n[r],
            f = t ? t(o) : o;

        if (!r || !Kf(f, c)) {
          var c = f;
          i[u++] = 0 === o ? 0 : o;
        }
      }

      return i;
    }

    function hu(n) {
      return "number" == typeof n ? n : yc(n) ? Sn : +n;
    }

    function pu(n) {
      if ("string" == typeof n) return n;
      if (yh(n)) return c(n, pu) + "";
      if (yc(n)) return ps ? ps.call(n) : "";
      var t = n + "";
      return "0" == t && 1 / n == -Rn ? "-0" : t;
    }

    function _u(n, t, r) {
      var e = -1,
          u = o,
          i = n.length,
          c = !0,
          a = [],
          l = a;
      if (r) c = !1, u = f;else if (i >= X) {
        var s = t ? null : js(n);
        if (s) return N(s);
        c = !1, u = E, l = new vr();
      } else l = t ? [] : a;

      n: for (; ++e < i;) {
        var h = n[e],
            p = t ? t(h) : h;

        if (h = r || 0 !== h ? h : 0, c && p === p) {
          for (var _ = l.length; _--;) {
            if (l[_] === p) continue n;
          }

          t && l.push(p), a.push(h);
        } else u(l, p, r) || (l !== a && l.push(p), a.push(h));
      }

      return a;
    }

    function vu(n, t) {
      return t = ju(t, n), n = Ki(n, t), null == n || delete n[Qi(mo(t))];
    }

    function gu(n, t, r, e) {
      return iu(n, t, r(ve(n, t)), e);
    }

    function yu(n, t, r, e) {
      for (var u = n.length, i = e ? u : -1; (e ? i-- : ++i < u) && t(n[i], i, n);) {
        ;
      }

      return r ? fu(n, e ? 0 : i, e ? i + 1 : u) : fu(n, e ? i + 1 : 0, e ? u : i);
    }

    function du(n, t) {
      var r = n;
      return r instanceof Bt && (r = r.value()), l(t, function (n, t) {
        return t.func.apply(t.thisArg, a([n], t.args));
      }, r);
    }

    function bu(n, t, r) {
      var e = n.length;
      if (e < 2) return e ? _u(n[0]) : [];

      for (var u = -1, i = el(e); ++u < e;) {
        for (var o = n[u], f = -1; ++f < e;) {
          f != u && (i[u] = Vr(i[u] || o, n[f], t, r));
        }
      }

      return _u(te(i, 1), t, r);
    }

    function wu(n, t, r) {
      for (var e = -1, u = n.length, i = t.length, o = {}; ++e < u;) {
        r(o, n[e], e < i ? t[e] : Y);
      }

      return o;
    }

    function mu(n) {
      return Gf(n) ? n : [];
    }

    function xu(n) {
      return "function" == typeof n ? n : Sa;
    }

    function ju(n, t) {
      return yh(n) ? n : Ci(n, t) ? [n] : Ws(Rc(n));
    }

    function Au(n, t, r) {
      var e = n.length;
      return r = r === Y ? e : r, !t && r >= e ? n : fu(n, t, r);
    }

    function ku(n, t) {
      if (t) return n.slice();
      var r = n.length,
          e = Il ? Il(r) : new n.constructor(r);
      return n.copy(e), e;
    }

    function Ou(n) {
      var t = new n.constructor(n.byteLength);
      return new Ol(t).set(new Ol(n)), t;
    }

    function Iu(n, t) {
      return new n.constructor(t ? Ou(n.buffer) : n.buffer, n.byteOffset, n.byteLength);
    }

    function Ru(n) {
      var t = new n.constructor(n.source, Dt.exec(n));
      return t.lastIndex = n.lastIndex, t;
    }

    function zu(n) {
      return hs ? cl(hs.call(n)) : {};
    }

    function Eu(n, t) {
      return new n.constructor(t ? Ou(n.buffer) : n.buffer, n.byteOffset, n.length);
    }

    function Su(n, t) {
      if (n !== t) {
        var r = n !== Y,
            e = null === n,
            u = n === n,
            i = yc(n),
            o = t !== Y,
            f = null === t,
            c = t === t,
            a = yc(t);
        if (!f && !a && !i && n > t || i && o && c && !f && !a || e && o && c || !r && c || !u) return 1;
        if (!e && !i && !a && n < t || a && r && u && !e && !i || f && r && u || !o && u || !c) return -1;
      }

      return 0;
    }

    function Wu(n, t, r) {
      for (var e = -1, u = n.criteria, i = t.criteria, o = u.length, f = r.length; ++e < o;) {
        var c = Su(u[e], i[e]);

        if (c) {
          if (e >= f) return c;
          return c * ("desc" == r[e] ? -1 : 1);
        }
      }

      return n.index - t.index;
    }

    function Lu(n, t, r, e) {
      for (var u = -1, i = n.length, o = r.length, f = -1, c = t.length, a = Kl(i - o, 0), l = el(c + a), s = !e; ++f < c;) {
        l[f] = t[f];
      }

      for (; ++u < o;) {
        (s || u < i) && (l[r[u]] = n[u]);
      }

      for (; a--;) {
        l[f++] = n[u++];
      }

      return l;
    }

    function Cu(n, t, r, e) {
      for (var u = -1, i = n.length, o = -1, f = r.length, c = -1, a = t.length, l = Kl(i - f, 0), s = el(l + a), h = !e; ++u < l;) {
        s[u] = n[u];
      }

      for (var p = u; ++c < a;) {
        s[p + c] = t[c];
      }

      for (; ++o < f;) {
        (h || u < i) && (s[p + r[o]] = n[u++]);
      }

      return s;
    }

    function Uu(n, t) {
      var r = -1,
          e = n.length;

      for (t || (t = el(e)); ++r < e;) {
        t[r] = n[r];
      }

      return t;
    }

    function Bu(n, t, r, e) {
      var u = !r;
      r || (r = {});

      for (var i = -1, o = t.length; ++i < o;) {
        var f = t[i],
            c = e ? e(r[f], n[f], f, r, n) : Y;
        c === Y && (c = n[f]), u ? Cr(r, f, c) : zr(r, f, c);
      }

      return r;
    }

    function Tu(n, t) {
      return Bu(n, ks(n), t);
    }

    function $u(n, t) {
      return Bu(n, Os(n), t);
    }

    function Du(n, r) {
      return function (e, u) {
        var i = yh(e) ? t : Sr,
            o = r ? r() : {};
        return i(e, n, bi(u, 2), o);
      };
    }

    function Mu(n) {
      return ru(function (t, r) {
        var e = -1,
            u = r.length,
            i = u > 1 ? r[u - 1] : Y,
            o = u > 2 ? r[2] : Y;

        for (i = n.length > 3 && "function" == typeof i ? (u--, i) : Y, o && Li(r[0], r[1], o) && (i = u < 3 ? Y : i, u = 1), t = cl(t); ++e < u;) {
          var f = r[e];
          f && n(t, f, e, i);
        }

        return t;
      });
    }

    function Fu(n, t) {
      return function (r, e) {
        if (null == r) return r;
        if (!Vf(r)) return n(r, e);

        for (var u = r.length, i = t ? u : -1, o = cl(r); (t ? i-- : ++i < u) && e(o[i], i, o) !== !1;) {
          ;
        }

        return r;
      };
    }

    function Nu(n) {
      return function (t, r, e) {
        for (var u = -1, i = cl(t), o = e(t), f = o.length; f--;) {
          var c = o[n ? f : ++u];
          if (r(i[c], c, i) === !1) break;
        }

        return t;
      };
    }

    function Pu(n, t, r) {
      function e() {
        return (this && this !== Xr && this instanceof e ? i : n).apply(u ? r : this, arguments);
      }

      var u = t & sn,
          i = Ku(n);
      return e;
    }

    function qu(n) {
      return function (t) {
        t = Rc(t);
        var r = B(t) ? V(t) : Y,
            e = r ? r[0] : t.charAt(0),
            u = r ? Au(r, 1).join("") : t.slice(1);
        return e[n]() + u;
      };
    }

    function Zu(n) {
      return function (t) {
        return l(Oa(oa(t).replace(Ur, "")), n, "");
      };
    }

    function Ku(n) {
      return function () {
        var t = arguments;

        switch (t.length) {
          case 0:
            return new n();

          case 1:
            return new n(t[0]);

          case 2:
            return new n(t[0], t[1]);

          case 3:
            return new n(t[0], t[1], t[2]);

          case 4:
            return new n(t[0], t[1], t[2], t[3]);

          case 5:
            return new n(t[0], t[1], t[2], t[3], t[4]);

          case 6:
            return new n(t[0], t[1], t[2], t[3], t[4], t[5]);

          case 7:
            return new n(t[0], t[1], t[2], t[3], t[4], t[5], t[6]);
        }

        var r = _s(n.prototype),
            e = n.apply(r, t);

        return ic(e) ? e : r;
      };
    }

    function Vu(t, r, e) {
      function u() {
        for (var o = arguments.length, f = el(o), c = o, a = di(u); c--;) {
          f[c] = arguments[c];
        }

        var l = o < 3 && f[0] !== a && f[o - 1] !== a ? [] : F(f, a);
        return o -= l.length, o < e ? ui(t, r, Ju, u.placeholder, Y, f, l, Y, Y, e - o) : n(this && this !== Xr && this instanceof u ? i : t, this, f);
      }

      var i = Ku(t);
      return u;
    }

    function Gu(n) {
      return function (t, r, e) {
        var u = cl(t);

        if (!Vf(t)) {
          var i = bi(r, 3);
          t = Fc(t), r = function r(n) {
            return i(u[n], n, u);
          };
        }

        var o = n(t, r, e);
        return o > -1 ? u[i ? t[o] : o] : Y;
      };
    }

    function Hu(n) {
      return _i(function (t) {
        var r = t.length,
            e = r,
            u = H.prototype.thru;

        for (n && t.reverse(); e--;) {
          var i = t[e];
          if ("function" != typeof i) throw new sl(tn);
          if (u && !o && "wrapper" == yi(i)) var o = new H([], !0);
        }

        for (e = o ? e : r; ++e < r;) {
          i = t[e];
          var f = yi(i),
              c = "wrapper" == f ? As(i) : Y;
          o = c && Bi(c[0]) && c[1] == (dn | _n | gn | bn) && !c[4].length && 1 == c[9] ? o[yi(c[0])].apply(o, c[3]) : 1 == i.length && Bi(i) ? o[f]() : o.thru(i);
        }

        return function () {
          var n = arguments,
              e = n[0];
          if (o && 1 == n.length && yh(e)) return o.plant(e).value();

          for (var u = 0, i = r ? t[u].apply(this, n) : e; ++u < r;) {
            i = t[u].call(this, i);
          }

          return i;
        };
      });
    }

    function Ju(n, t, r, e, u, i, o, f, c, a) {
      function l() {
        for (var y = arguments.length, d = el(y), b = y; b--;) {
          d[b] = arguments[b];
        }

        if (_) var w = di(l),
            m = L(d, w);

        if (e && (d = Lu(d, e, u, _)), i && (d = Cu(d, i, o, _)), y -= m, _ && y < a) {
          return ui(n, t, Ju, l.placeholder, r, d, F(d, w), f, c, a - y);
        }

        var x = h ? r : this,
            j = p ? x[n] : n;
        return y = d.length, f ? d = Vi(d, f) : v && y > 1 && d.reverse(), s && c < y && (d.length = c), this && this !== Xr && this instanceof l && (j = g || Ku(j)), j.apply(x, d);
      }

      var s = t & dn,
          h = t & sn,
          p = t & hn,
          _ = t & (_n | vn),
          v = t & wn,
          g = p ? Y : Ku(n);

      return l;
    }

    function Yu(n, t) {
      return function (r, e) {
        return Ae(r, n, t(e), {});
      };
    }

    function Qu(n, t) {
      return function (r, e) {
        var u;
        if (r === Y && e === Y) return t;

        if (r !== Y && (u = r), e !== Y) {
          if (u === Y) return e;
          "string" == typeof r || "string" == typeof e ? (r = pu(r), e = pu(e)) : (r = hu(r), e = hu(e)), u = n(r, e);
        }

        return u;
      };
    }

    function Xu(t) {
      return _i(function (r) {
        return r = c(r, R(bi())), ru(function (e) {
          var u = this;
          return t(r, function (t) {
            return n(t, u, e);
          });
        });
      });
    }

    function ni(n, t) {
      t = t === Y ? " " : pu(t);
      var r = t.length;
      if (r < 2) return r ? tu(t, n) : t;
      var e = tu(t, Dl(n / K(t)));
      return B(t) ? Au(V(e), 0, n).join("") : e.slice(0, n);
    }

    function ti(t, r, e, u) {
      function i() {
        for (var r = -1, c = arguments.length, a = -1, l = u.length, s = el(l + c), h = this && this !== Xr && this instanceof i ? f : t; ++a < l;) {
          s[a] = u[a];
        }

        for (; c--;) {
          s[a++] = arguments[++r];
        }

        return n(h, o ? e : this, s);
      }

      var o = r & sn,
          f = Ku(t);
      return i;
    }

    function ri(n) {
      return function (t, r, e) {
        return e && "number" != typeof e && Li(t, r, e) && (r = e = Y), t = xc(t), r === Y ? (r = t, t = 0) : r = xc(r), e = e === Y ? t < r ? 1 : -1 : xc(e), nu(t, r, e, n);
      };
    }

    function ei(n) {
      return function (t, r) {
        return "string" == typeof t && "string" == typeof r || (t = kc(t), r = kc(r)), n(t, r);
      };
    }

    function ui(n, t, r, e, u, i, o, f, c, a) {
      var l = t & _n,
          s = l ? o : Y,
          h = l ? Y : o,
          p = l ? i : Y,
          _ = l ? Y : i;

      t |= l ? gn : yn, t &= ~(l ? yn : gn), t & pn || (t &= ~(sn | hn));
      var v = [n, t, u, p, s, _, h, f, c, a],
          g = r.apply(Y, v);
      return Bi(n) && zs(g, v), g.placeholder = e, Hi(g, n, t);
    }

    function ii(n) {
      var t = fl[n];
      return function (n, r) {
        if (n = kc(n), r = null == r ? 0 : Vl(jc(r), 292), r && Pl(n)) {
          var e = (Rc(n) + "e").split("e");
          return e = (Rc(t(e[0] + "e" + (+e[1] + r))) + "e").split("e"), +(e[0] + "e" + (+e[1] - r));
        }

        return t(n);
      };
    }

    function oi(n) {
      return function (t) {
        var r = Is(t);
        return r == Zn ? D(t) : r == Qn ? P(t) : I(t, n(t));
      };
    }

    function fi(n, t, r, e, u, i, o, f) {
      var c = t & hn;
      if (!c && "function" != typeof n) throw new sl(tn);
      var a = e ? e.length : 0;

      if (a || (t &= ~(gn | yn), e = u = Y), o = o === Y ? o : Kl(jc(o), 0), f = f === Y ? f : jc(f), a -= u ? u.length : 0, t & yn) {
        var l = e,
            s = u;
        e = u = Y;
      }

      var h = c ? Y : As(n),
          p = [n, t, r, e, u, l, s, i, o, f];
      if (h && Ni(p, h), n = p[0], t = p[1], r = p[2], e = p[3], u = p[4], f = p[9] = p[9] === Y ? c ? 0 : n.length : Kl(p[9] - a, 0), !f && t & (_n | vn) && (t &= ~(_n | vn)), t && t != sn) _ = t == _n || t == vn ? Vu(n, t, f) : t != gn && t != (sn | gn) || u.length ? Ju.apply(Y, p) : ti(n, t, r, e);else var _ = Pu(n, t, r);
      return Hi((h ? bs : zs)(_, p), n, t);
    }

    function ci(n, t, r, e) {
      return n === Y || Kf(n, _l[r]) && !yl.call(e, r) ? t : n;
    }

    function ai(n, t, r, e, u, i) {
      return ic(n) && ic(t) && (i.set(t, n), qe(n, t, Y, ai, i), i["delete"](t)), n;
    }

    function li(n) {
      return _c(n) ? Y : n;
    }

    function si(n, t, r, e, u, i) {
      var o = r & an,
          f = n.length,
          c = t.length;
      if (f != c && !(o && c > f)) return !1;
      var a = i.get(n),
          l = i.get(t);
      if (a && l) return a == t && l == n;

      var s = -1,
          p = !0,
          _ = r & ln ? new vr() : Y;

      for (i.set(n, t), i.set(t, n); ++s < f;) {
        var v = n[s],
            g = t[s];
        if (e) var y = o ? e(g, v, s, t, n, i) : e(v, g, s, n, t, i);

        if (y !== Y) {
          if (y) continue;
          p = !1;
          break;
        }

        if (_) {
          if (!h(t, function (n, t) {
            if (!E(_, t) && (v === n || u(v, n, r, e, i))) return _.push(t);
          })) {
            p = !1;
            break;
          }
        } else if (v !== g && !u(v, g, r, e, i)) {
          p = !1;
          break;
        }
      }

      return i["delete"](n), i["delete"](t), p;
    }

    function hi(n, t, r, e, u, i, o) {
      switch (r) {
        case it:
          if (n.byteLength != t.byteLength || n.byteOffset != t.byteOffset) return !1;
          n = n.buffer, t = t.buffer;

        case ut:
          return !(n.byteLength != t.byteLength || !i(new Ol(n), new Ol(t)));

        case Dn:
        case Mn:
        case Kn:
          return Kf(+n, +t);

        case Nn:
          return n.name == t.name && n.message == t.message;

        case Yn:
        case Xn:
          return n == t + "";

        case Zn:
          var f = D;

        case Qn:
          var c = e & an;
          if (f || (f = N), n.size != t.size && !c) return !1;
          var a = o.get(n);
          if (a) return a == t;
          e |= ln, o.set(n, t);
          var l = si(f(n), f(t), e, u, i, o);
          return o["delete"](n), l;

        case nt:
          if (hs) return hs.call(n) == hs.call(t);
      }

      return !1;
    }

    function pi(n, t, r, e, u, i) {
      var o = r & an,
          f = vi(n),
          c = f.length;
      if (c != vi(t).length && !o) return !1;

      for (var a = c; a--;) {
        var l = f[a];
        if (!(o ? l in t : yl.call(t, l))) return !1;
      }

      var s = i.get(n),
          h = i.get(t);
      if (s && h) return s == t && h == n;
      var p = !0;
      i.set(n, t), i.set(t, n);

      for (var _ = o; ++a < c;) {
        l = f[a];
        var v = n[l],
            g = t[l];
        if (e) var y = o ? e(g, v, l, t, n, i) : e(v, g, l, n, t, i);

        if (!(y === Y ? v === g || u(v, g, r, e, i) : y)) {
          p = !1;
          break;
        }

        _ || (_ = "constructor" == l);
      }

      if (p && !_) {
        var d = n.constructor,
            b = t.constructor;
        d != b && "constructor" in n && "constructor" in t && !("function" == typeof d && d instanceof d && "function" == typeof b && b instanceof b) && (p = !1);
      }

      return i["delete"](n), i["delete"](t), p;
    }

    function _i(n) {
      return Ss(Zi(n, Y, ho), n + "");
    }

    function vi(n) {
      return ye(n, Fc, ks);
    }

    function gi(n) {
      return ye(n, Nc, Os);
    }

    function yi(n) {
      for (var t = n.name + "", r = is[t], e = yl.call(is, t) ? r.length : 0; e--;) {
        var u = r[e],
            i = u.func;
        if (null == i || i == n) return u.name;
      }

      return t;
    }

    function di(n) {
      return (yl.call(q, "placeholder") ? q : n).placeholder;
    }

    function bi() {
      var n = q.iteratee || Wa;
      return n = n === Wa ? Te : n, arguments.length ? n(arguments[0], arguments[1]) : n;
    }

    function wi(n, t) {
      var r = n.__data__;
      return Ui(t) ? r["string" == typeof t ? "string" : "hash"] : r.map;
    }

    function mi(n) {
      for (var t = Fc(n), r = t.length; r--;) {
        var e = t[r],
            u = n[e];
        t[r] = [e, u, Di(u)];
      }

      return t;
    }

    function xi(n, t) {
      var r = U(n, t);
      return Le(r) ? r : Y;
    }

    function ji(n) {
      var t = yl.call(n, Cl),
          r = n[Cl];

      try {
        n[Cl] = Y;
        var e = !0;
      } catch (n) {}

      var u = wl.call(n);
      return e && (t ? n[Cl] = r : delete n[Cl]), u;
    }

    function Ai(n, t, r) {
      for (var e = -1, u = r.length; ++e < u;) {
        var i = r[e],
            o = i.size;

        switch (i.type) {
          case "drop":
            n += o;
            break;

          case "dropRight":
            t -= o;
            break;

          case "take":
            t = Vl(t, n + o);
            break;

          case "takeRight":
            n = Kl(n, t - o);
        }
      }

      return {
        start: n,
        end: t
      };
    }

    function ki(n) {
      var t = n.match(Ct);
      return t ? t[1].split(Ut) : [];
    }

    function Oi(n, t, r) {
      t = ju(t, n);

      for (var e = -1, u = t.length, i = !1; ++e < u;) {
        var o = Qi(t[e]);
        if (!(i = null != n && r(n, o))) break;
        n = n[o];
      }

      return i || ++e != u ? i : (u = null == n ? 0 : n.length, !!u && uc(u) && Wi(o, u) && (yh(n) || gh(n)));
    }

    function Ii(n) {
      var t = n.length,
          r = new n.constructor(t);
      return t && "string" == typeof n[0] && yl.call(n, "index") && (r.index = n.index, r.input = n.input), r;
    }

    function Ri(n) {
      return "function" != typeof n.constructor || $i(n) ? {} : _s(Rl(n));
    }

    function zi(n, t, r) {
      var e = n.constructor;

      switch (t) {
        case ut:
          return Ou(n);

        case Dn:
        case Mn:
          return new e(+n);

        case it:
          return Iu(n, r);

        case ot:
        case ft:
        case ct:
        case at:
        case lt:
        case st:
        case ht:
        case pt:
        case _t:
          return Eu(n, r);

        case Zn:
          return new e();

        case Kn:
        case Xn:
          return new e(n);

        case Yn:
          return Ru(n);

        case Qn:
          return new e();

        case nt:
          return zu(n);
      }
    }

    function Ei(n, t) {
      var r = t.length;
      if (!r) return n;
      var e = r - 1;
      return t[e] = (r > 1 ? "& " : "") + t[e], t = t.join(r > 2 ? ", " : " "), n.replace(Lt, "{\n/* [wrapped with " + t + "] */\n");
    }

    function Si(n) {
      return yh(n) || gh(n) || !!(Wl && n && n[Wl]);
    }

    function Wi(n, t) {
      var r = _typeof(n);

      return t = null == t ? zn : t, !!t && ("number" == r || "symbol" != r && qt.test(n)) && n > -1 && n % 1 == 0 && n < t;
    }

    function Li(n, t, r) {
      if (!ic(r)) return !1;

      var e = _typeof(t);

      return !!("number" == e ? Vf(r) && Wi(t, r.length) : "string" == e && t in r) && Kf(r[t], n);
    }

    function Ci(n, t) {
      if (yh(n)) return !1;

      var r = _typeof(n);

      return !("number" != r && "symbol" != r && "boolean" != r && null != n && !yc(n)) || Ot.test(n) || !kt.test(n) || null != t && n in cl(t);
    }

    function Ui(n) {
      var t = _typeof(n);

      return "string" == t || "number" == t || "symbol" == t || "boolean" == t ? "__proto__" !== n : null === n;
    }

    function Bi(n) {
      var t = yi(n),
          r = q[t];
      if ("function" != typeof r || !(t in Bt.prototype)) return !1;
      if (n === r) return !0;
      var e = As(r);
      return !!e && n === e[0];
    }

    function Ti(n) {
      return !!bl && bl in n;
    }

    function $i(n) {
      var t = n && n.constructor;
      return n === ("function" == typeof t && t.prototype || _l);
    }

    function Di(n) {
      return n === n && !ic(n);
    }

    function Mi(n, t) {
      return function (r) {
        return null != r && r[n] === t && (t !== Y || n in cl(r));
      };
    }

    function Fi(n) {
      var t = Wf(n, function (n) {
        return r.size === en && r.clear(), n;
      }),
          r = t.cache;
      return t;
    }

    function Ni(n, t) {
      var r = n[1],
          e = t[1],
          u = r | e,
          i = u < (sn | hn | dn),
          o = e == dn && r == _n || e == dn && r == bn && n[7].length <= t[8] || e == (dn | bn) && t[7].length <= t[8] && r == _n;
      if (!i && !o) return n;
      e & sn && (n[2] = t[2], u |= r & sn ? 0 : pn);
      var f = t[3];

      if (f) {
        var c = n[3];
        n[3] = c ? Lu(c, f, t[4]) : f, n[4] = c ? F(n[3], un) : t[4];
      }

      return f = t[5], f && (c = n[5], n[5] = c ? Cu(c, f, t[6]) : f, n[6] = c ? F(n[5], un) : t[6]), f = t[7], f && (n[7] = f), e & dn && (n[8] = null == n[8] ? t[8] : Vl(n[8], t[8])), null == n[9] && (n[9] = t[9]), n[0] = t[0], n[1] = u, n;
    }

    function Pi(n) {
      var t = [];
      if (null != n) for (var r in cl(n)) {
        t.push(r);
      }
      return t;
    }

    function qi(n) {
      return wl.call(n);
    }

    function Zi(t, r, e) {
      return r = Kl(r === Y ? t.length - 1 : r, 0), function () {
        for (var u = arguments, i = -1, o = Kl(u.length - r, 0), f = el(o); ++i < o;) {
          f[i] = u[r + i];
        }

        i = -1;

        for (var c = el(r + 1); ++i < r;) {
          c[i] = u[i];
        }

        return c[r] = e(f), n(t, this, c);
      };
    }

    function Ki(n, t) {
      return t.length < 2 ? n : ve(n, fu(t, 0, -1));
    }

    function Vi(n, t) {
      for (var r = n.length, e = Vl(t.length, r), u = Uu(n); e--;) {
        var i = t[e];
        n[e] = Wi(i, r) ? u[i] : Y;
      }

      return n;
    }

    function Gi(n, t) {
      if (("constructor" !== t || "function" != typeof n[t]) && "__proto__" != t) return n[t];
    }

    function Hi(n, t, r) {
      var e = t + "";
      return Ss(n, Ei(e, no(ki(e), r)));
    }

    function Ji(n) {
      var t = 0,
          r = 0;
      return function () {
        var e = Gl(),
            u = An - (e - r);

        if (r = e, u > 0) {
          if (++t >= jn) return arguments[0];
        } else t = 0;

        return n.apply(Y, arguments);
      };
    }

    function Yi(n, t) {
      var r = -1,
          e = n.length,
          u = e - 1;

      for (t = t === Y ? e : t; ++r < t;) {
        var i = Xe(r, u),
            o = n[i];
        n[i] = n[r], n[r] = o;
      }

      return n.length = t, n;
    }

    function Qi(n) {
      if ("string" == typeof n || yc(n)) return n;
      var t = n + "";
      return "0" == t && 1 / n == -Rn ? "-0" : t;
    }

    function Xi(n) {
      if (null != n) {
        try {
          return gl.call(n);
        } catch (n) {}

        try {
          return n + "";
        } catch (n) {}
      }

      return "";
    }

    function no(n, t) {
      return r(Un, function (r) {
        var e = "_." + r[0];
        t & r[1] && !o(n, e) && n.push(e);
      }), n.sort();
    }

    function to(n) {
      if (n instanceof Bt) return n.clone();
      var t = new H(n.__wrapped__, n.__chain__);
      return t.__actions__ = Uu(n.__actions__), t.__index__ = n.__index__, t.__values__ = n.__values__, t;
    }

    function ro(n, t, r) {
      t = (r ? Li(n, t, r) : t === Y) ? 1 : Kl(jc(t), 0);
      var e = null == n ? 0 : n.length;
      if (!e || t < 1) return [];

      for (var u = 0, i = 0, o = el(Dl(e / t)); u < e;) {
        o[i++] = fu(n, u, u += t);
      }

      return o;
    }

    function eo(n) {
      for (var t = -1, r = null == n ? 0 : n.length, e = 0, u = []; ++t < r;) {
        var i = n[t];
        i && (u[e++] = i);
      }

      return u;
    }

    function uo() {
      var n = arguments.length;
      if (!n) return [];

      for (var t = el(n - 1), r = arguments[0], e = n; e--;) {
        t[e - 1] = arguments[e];
      }

      return a(yh(r) ? Uu(r) : [r], te(t, 1));
    }

    function io(n, t, r) {
      var e = null == n ? 0 : n.length;
      return e ? (t = r || t === Y ? 1 : jc(t), fu(n, t < 0 ? 0 : t, e)) : [];
    }

    function oo(n, t, r) {
      var e = null == n ? 0 : n.length;
      return e ? (t = r || t === Y ? 1 : jc(t), t = e - t, fu(n, 0, t < 0 ? 0 : t)) : [];
    }

    function fo(n, t) {
      return n && n.length ? yu(n, bi(t, 3), !0, !0) : [];
    }

    function co(n, t) {
      return n && n.length ? yu(n, bi(t, 3), !0) : [];
    }

    function ao(n, t, r, e) {
      var u = null == n ? 0 : n.length;
      return u ? (r && "number" != typeof r && Li(n, t, r) && (r = 0, e = u), Qr(n, t, r, e)) : [];
    }

    function lo(n, t, r) {
      var e = null == n ? 0 : n.length;
      if (!e) return -1;
      var u = null == r ? 0 : jc(r);
      return u < 0 && (u = Kl(e + u, 0)), g(n, bi(t, 3), u);
    }

    function so(n, t, r) {
      var e = null == n ? 0 : n.length;
      if (!e) return -1;
      var u = e - 1;
      return r !== Y && (u = jc(r), u = r < 0 ? Kl(e + u, 0) : Vl(u, e - 1)), g(n, bi(t, 3), u, !0);
    }

    function ho(n) {
      return (null == n ? 0 : n.length) ? te(n, 1) : [];
    }

    function po(n) {
      return (null == n ? 0 : n.length) ? te(n, Rn) : [];
    }

    function _o(n, t) {
      return (null == n ? 0 : n.length) ? (t = t === Y ? 1 : jc(t), te(n, t)) : [];
    }

    function vo(n) {
      for (var t = -1, r = null == n ? 0 : n.length, e = {}; ++t < r;) {
        var u = n[t];
        e[u[0]] = u[1];
      }

      return e;
    }

    function go(n) {
      return n && n.length ? n[0] : Y;
    }

    function yo(n, t, r) {
      var e = null == n ? 0 : n.length;
      if (!e) return -1;
      var u = null == r ? 0 : jc(r);
      return u < 0 && (u = Kl(e + u, 0)), y(n, t, u);
    }

    function bo(n) {
      return (null == n ? 0 : n.length) ? fu(n, 0, -1) : [];
    }

    function wo(n, t) {
      return null == n ? "" : ql.call(n, t);
    }

    function mo(n) {
      var t = null == n ? 0 : n.length;
      return t ? n[t - 1] : Y;
    }

    function xo(n, t, r) {
      var e = null == n ? 0 : n.length;
      if (!e) return -1;
      var u = e;
      return r !== Y && (u = jc(r), u = u < 0 ? Kl(e + u, 0) : Vl(u, e - 1)), t === t ? Z(n, t, u) : g(n, b, u, !0);
    }

    function jo(n, t) {
      return n && n.length ? Ke(n, jc(t)) : Y;
    }

    function Ao(n, t) {
      return n && n.length && t && t.length ? Ye(n, t) : n;
    }

    function ko(n, t, r) {
      return n && n.length && t && t.length ? Ye(n, t, bi(r, 2)) : n;
    }

    function Oo(n, t, r) {
      return n && n.length && t && t.length ? Ye(n, t, Y, r) : n;
    }

    function Io(n, t) {
      var r = [];
      if (!n || !n.length) return r;
      var e = -1,
          u = [],
          i = n.length;

      for (t = bi(t, 3); ++e < i;) {
        var o = n[e];
        t(o, e, n) && (r.push(o), u.push(e));
      }

      return Qe(n, u), r;
    }

    function Ro(n) {
      return null == n ? n : Yl.call(n);
    }

    function zo(n, t, r) {
      var e = null == n ? 0 : n.length;
      return e ? (r && "number" != typeof r && Li(n, t, r) ? (t = 0, r = e) : (t = null == t ? 0 : jc(t), r = r === Y ? e : jc(r)), fu(n, t, r)) : [];
    }

    function Eo(n, t) {
      return au(n, t);
    }

    function So(n, t, r) {
      return lu(n, t, bi(r, 2));
    }

    function Wo(n, t) {
      var r = null == n ? 0 : n.length;

      if (r) {
        var e = au(n, t);
        if (e < r && Kf(n[e], t)) return e;
      }

      return -1;
    }

    function Lo(n, t) {
      return au(n, t, !0);
    }

    function Co(n, t, r) {
      return lu(n, t, bi(r, 2), !0);
    }

    function Uo(n, t) {
      if (null == n ? 0 : n.length) {
        var r = au(n, t, !0) - 1;
        if (Kf(n[r], t)) return r;
      }

      return -1;
    }

    function Bo(n) {
      return n && n.length ? su(n) : [];
    }

    function To(n, t) {
      return n && n.length ? su(n, bi(t, 2)) : [];
    }

    function $o(n) {
      var t = null == n ? 0 : n.length;
      return t ? fu(n, 1, t) : [];
    }

    function Do(n, t, r) {
      return n && n.length ? (t = r || t === Y ? 1 : jc(t), fu(n, 0, t < 0 ? 0 : t)) : [];
    }

    function Mo(n, t, r) {
      var e = null == n ? 0 : n.length;
      return e ? (t = r || t === Y ? 1 : jc(t), t = e - t, fu(n, t < 0 ? 0 : t, e)) : [];
    }

    function Fo(n, t) {
      return n && n.length ? yu(n, bi(t, 3), !1, !0) : [];
    }

    function No(n, t) {
      return n && n.length ? yu(n, bi(t, 3)) : [];
    }

    function Po(n) {
      return n && n.length ? _u(n) : [];
    }

    function qo(n, t) {
      return n && n.length ? _u(n, bi(t, 2)) : [];
    }

    function Zo(n, t) {
      return t = "function" == typeof t ? t : Y, n && n.length ? _u(n, Y, t) : [];
    }

    function Ko(n) {
      if (!n || !n.length) return [];
      var t = 0;
      return n = i(n, function (n) {
        if (Gf(n)) return t = Kl(n.length, t), !0;
      }), O(t, function (t) {
        return c(n, m(t));
      });
    }

    function Vo(t, r) {
      if (!t || !t.length) return [];
      var e = Ko(t);
      return null == r ? e : c(e, function (t) {
        return n(r, Y, t);
      });
    }

    function Go(n, t) {
      return wu(n || [], t || [], zr);
    }

    function Ho(n, t) {
      return wu(n || [], t || [], iu);
    }

    function Jo(n) {
      var t = q(n);
      return t.__chain__ = !0, t;
    }

    function Yo(n, t) {
      return t(n), n;
    }

    function Qo(n, t) {
      return t(n);
    }

    function Xo() {
      return Jo(this);
    }

    function nf() {
      return new H(this.value(), this.__chain__);
    }

    function tf() {
      this.__values__ === Y && (this.__values__ = mc(this.value()));
      var n = this.__index__ >= this.__values__.length;
      return {
        done: n,
        value: n ? Y : this.__values__[this.__index__++]
      };
    }

    function rf() {
      return this;
    }

    function ef(n) {
      for (var t, r = this; r instanceof G;) {
        var e = to(r);
        e.__index__ = 0, e.__values__ = Y, t ? u.__wrapped__ = e : t = e;
        var u = e;
        r = r.__wrapped__;
      }

      return u.__wrapped__ = n, t;
    }

    function uf() {
      var n = this.__wrapped__;

      if (n instanceof Bt) {
        var t = n;
        return this.__actions__.length && (t = new Bt(this)), t = t.reverse(), t.__actions__.push({
          func: Qo,
          args: [Ro],
          thisArg: Y
        }), new H(t, this.__chain__);
      }

      return this.thru(Ro);
    }

    function of() {
      return du(this.__wrapped__, this.__actions__);
    }

    function ff(n, t, r) {
      var e = yh(n) ? u : Gr;
      return r && Li(n, t, r) && (t = Y), e(n, bi(t, 3));
    }

    function cf(n, t) {
      return (yh(n) ? i : ne)(n, bi(t, 3));
    }

    function af(n, t) {
      return te(vf(n, t), 1);
    }

    function lf(n, t) {
      return te(vf(n, t), Rn);
    }

    function sf(n, t, r) {
      return r = r === Y ? 1 : jc(r), te(vf(n, t), r);
    }

    function hf(n, t) {
      return (yh(n) ? r : vs)(n, bi(t, 3));
    }

    function pf(n, t) {
      return (yh(n) ? e : gs)(n, bi(t, 3));
    }

    function _f(n, t, r, e) {
      n = Vf(n) ? n : na(n), r = r && !e ? jc(r) : 0;
      var u = n.length;
      return r < 0 && (r = Kl(u + r, 0)), gc(n) ? r <= u && n.indexOf(t, r) > -1 : !!u && y(n, t, r) > -1;
    }

    function vf(n, t) {
      return (yh(n) ? c : Fe)(n, bi(t, 3));
    }

    function gf(n, t, r, e) {
      return null == n ? [] : (yh(t) || (t = null == t ? [] : [t]), r = e ? Y : r, yh(r) || (r = null == r ? [] : [r]), Ve(n, t, r));
    }

    function yf(n, t, r) {
      var e = yh(n) ? l : j,
          u = arguments.length < 3;
      return e(n, bi(t, 4), r, u, vs);
    }

    function df(n, t, r) {
      var e = yh(n) ? s : j,
          u = arguments.length < 3;
      return e(n, bi(t, 4), r, u, gs);
    }

    function bf(n, t) {
      return (yh(n) ? i : ne)(n, Lf(bi(t, 3)));
    }

    function wf(n) {
      return (yh(n) ? kr : eu)(n);
    }

    function mf(n, t, r) {
      return t = (r ? Li(n, t, r) : t === Y) ? 1 : jc(t), (yh(n) ? Or : uu)(n, t);
    }

    function xf(n) {
      return (yh(n) ? Ir : ou)(n);
    }

    function jf(n) {
      if (null == n) return 0;
      if (Vf(n)) return gc(n) ? K(n) : n.length;
      var t = Is(n);
      return t == Zn || t == Qn ? n.size : $e(n).length;
    }

    function Af(n, t, r) {
      var e = yh(n) ? h : cu;
      return r && Li(n, t, r) && (t = Y), e(n, bi(t, 3));
    }

    function kf(n, t) {
      if ("function" != typeof t) throw new sl(tn);
      return n = jc(n), function () {
        if (--n < 1) return t.apply(this, arguments);
      };
    }

    function Of(n, t, r) {
      return t = r ? Y : t, t = n && null == t ? n.length : t, fi(n, dn, Y, Y, Y, Y, t);
    }

    function If(n, t) {
      var r;
      if ("function" != typeof t) throw new sl(tn);
      return n = jc(n), function () {
        return --n > 0 && (r = t.apply(this, arguments)), n <= 1 && (t = Y), r;
      };
    }

    function Rf(n, t, r) {
      t = r ? Y : t;
      var e = fi(n, _n, Y, Y, Y, Y, Y, t);
      return e.placeholder = Rf.placeholder, e;
    }

    function zf(n, t, r) {
      t = r ? Y : t;
      var e = fi(n, vn, Y, Y, Y, Y, Y, t);
      return e.placeholder = zf.placeholder, e;
    }

    function Ef(n, t, r) {
      function e(t) {
        var r = h,
            e = p;
        return h = p = Y, d = t, v = n.apply(e, r);
      }

      function u(n) {
        return d = n, g = Es(f, t), b ? e(n) : v;
      }

      function i(n) {
        var r = n - y,
            e = n - d,
            u = t - r;
        return w ? Vl(u, _ - e) : u;
      }

      function o(n) {
        var r = n - y,
            e = n - d;
        return y === Y || r >= t || r < 0 || w && e >= _;
      }

      function f() {
        var n = ih();
        return o(n) ? c(n) : (g = Es(f, i(n)), Y);
      }

      function c(n) {
        return g = Y, m && h ? e(n) : (h = p = Y, v);
      }

      function a() {
        g !== Y && xs(g), d = 0, h = y = p = g = Y;
      }

      function l() {
        return g === Y ? v : c(ih());
      }

      function s() {
        var n = ih(),
            r = o(n);

        if (h = arguments, p = this, y = n, r) {
          if (g === Y) return u(y);
          if (w) return xs(g), g = Es(f, t), e(y);
        }

        return g === Y && (g = Es(f, t)), v;
      }

      var h,
          p,
          _,
          v,
          g,
          y,
          d = 0,
          b = !1,
          w = !1,
          m = !0;

      if ("function" != typeof n) throw new sl(tn);
      return t = kc(t) || 0, ic(r) && (b = !!r.leading, w = "maxWait" in r, _ = w ? Kl(kc(r.maxWait) || 0, t) : _, m = "trailing" in r ? !!r.trailing : m), s.cancel = a, s.flush = l, s;
    }

    function Sf(n) {
      return fi(n, wn);
    }

    function Wf(n, t) {
      if ("function" != typeof n || null != t && "function" != typeof t) throw new sl(tn);

      var r = function r() {
        var e = arguments,
            u = t ? t.apply(this, e) : e[0],
            i = r.cache;
        if (i.has(u)) return i.get(u);
        var o = n.apply(this, e);
        return r.cache = i.set(u, o) || i, o;
      };

      return r.cache = new (Wf.Cache || ar)(), r;
    }

    function Lf(n) {
      if ("function" != typeof n) throw new sl(tn);
      return function () {
        var t = arguments;

        switch (t.length) {
          case 0:
            return !n.call(this);

          case 1:
            return !n.call(this, t[0]);

          case 2:
            return !n.call(this, t[0], t[1]);

          case 3:
            return !n.call(this, t[0], t[1], t[2]);
        }

        return !n.apply(this, t);
      };
    }

    function Cf(n) {
      return If(2, n);
    }

    function Uf(n, t) {
      if ("function" != typeof n) throw new sl(tn);
      return t = t === Y ? t : jc(t), ru(n, t);
    }

    function Bf(t, r) {
      if ("function" != typeof t) throw new sl(tn);
      return r = null == r ? 0 : Kl(jc(r), 0), ru(function (e) {
        var u = e[r],
            i = Au(e, 0, r);
        return u && a(i, u), n(t, this, i);
      });
    }

    function Tf(n, t, r) {
      var e = !0,
          u = !0;
      if ("function" != typeof n) throw new sl(tn);
      return ic(r) && (e = "leading" in r ? !!r.leading : e, u = "trailing" in r ? !!r.trailing : u), Ef(n, t, {
        leading: e,
        maxWait: t,
        trailing: u
      });
    }

    function $f(n) {
      return Of(n, 1);
    }

    function Df(n, t) {
      return sh(xu(t), n);
    }

    function Mf() {
      if (!arguments.length) return [];
      var n = arguments[0];
      return yh(n) ? n : [n];
    }

    function Ff(n) {
      return Dr(n, cn);
    }

    function Nf(n, t) {
      return t = "function" == typeof t ? t : Y, Dr(n, cn, t);
    }

    function Pf(n) {
      return Dr(n, on | cn);
    }

    function qf(n, t) {
      return t = "function" == typeof t ? t : Y, Dr(n, on | cn, t);
    }

    function Zf(n, t) {
      return null == t || Zr(n, t, Fc(t));
    }

    function Kf(n, t) {
      return n === t || n !== n && t !== t;
    }

    function Vf(n) {
      return null != n && uc(n.length) && !rc(n);
    }

    function Gf(n) {
      return oc(n) && Vf(n);
    }

    function Hf(n) {
      return n === !0 || n === !1 || oc(n) && de(n) == Dn;
    }

    function Jf(n) {
      return oc(n) && 1 === n.nodeType && !_c(n);
    }

    function Yf(n) {
      if (null == n) return !0;
      if (Vf(n) && (yh(n) || "string" == typeof n || "function" == typeof n.splice || bh(n) || Ah(n) || gh(n))) return !n.length;
      var t = Is(n);
      if (t == Zn || t == Qn) return !n.size;
      if ($i(n)) return !$e(n).length;

      for (var r in n) {
        if (yl.call(n, r)) return !1;
      }

      return !0;
    }

    function Qf(n, t) {
      return ze(n, t);
    }

    function Xf(n, t, r) {
      r = "function" == typeof r ? r : Y;
      var e = r ? r(n, t) : Y;
      return e === Y ? ze(n, t, Y, r) : !!e;
    }

    function nc(n) {
      if (!oc(n)) return !1;
      var t = de(n);
      return t == Nn || t == Fn || "string" == typeof n.message && "string" == typeof n.name && !_c(n);
    }

    function tc(n) {
      return "number" == typeof n && Pl(n);
    }

    function rc(n) {
      if (!ic(n)) return !1;
      var t = de(n);
      return t == Pn || t == qn || t == $n || t == Jn;
    }

    function ec(n) {
      return "number" == typeof n && n == jc(n);
    }

    function uc(n) {
      return "number" == typeof n && n > -1 && n % 1 == 0 && n <= zn;
    }

    function ic(n) {
      var t = _typeof(n);

      return null != n && ("object" == t || "function" == t);
    }

    function oc(n) {
      return null != n && "object" == _typeof(n);
    }

    function fc(n, t) {
      return n === t || We(n, t, mi(t));
    }

    function cc(n, t, r) {
      return r = "function" == typeof r ? r : Y, We(n, t, mi(t), r);
    }

    function ac(n) {
      return pc(n) && n != +n;
    }

    function lc(n) {
      if (Rs(n)) throw new il(nn);
      return Le(n);
    }

    function sc(n) {
      return null === n;
    }

    function hc(n) {
      return null == n;
    }

    function pc(n) {
      return "number" == typeof n || oc(n) && de(n) == Kn;
    }

    function _c(n) {
      if (!oc(n) || de(n) != Gn) return !1;
      var t = Rl(n);
      if (null === t) return !0;
      var r = yl.call(t, "constructor") && t.constructor;
      return "function" == typeof r && r instanceof r && gl.call(r) == ml;
    }

    function vc(n) {
      return ec(n) && n >= -zn && n <= zn;
    }

    function gc(n) {
      return "string" == typeof n || !yh(n) && oc(n) && de(n) == Xn;
    }

    function yc(n) {
      return "symbol" == _typeof(n) || oc(n) && de(n) == nt;
    }

    function dc(n) {
      return n === Y;
    }

    function bc(n) {
      return oc(n) && Is(n) == rt;
    }

    function wc(n) {
      return oc(n) && de(n) == et;
    }

    function mc(n) {
      if (!n) return [];
      if (Vf(n)) return gc(n) ? V(n) : Uu(n);
      if (Ll && n[Ll]) return $(n[Ll]());
      var t = Is(n);
      return (t == Zn ? D : t == Qn ? N : na)(n);
    }

    function xc(n) {
      if (!n) return 0 === n ? n : 0;

      if (n = kc(n), n === Rn || n === -Rn) {
        return (n < 0 ? -1 : 1) * En;
      }

      return n === n ? n : 0;
    }

    function jc(n) {
      var t = xc(n),
          r = t % 1;
      return t === t ? r ? t - r : t : 0;
    }

    function Ac(n) {
      return n ? $r(jc(n), 0, Wn) : 0;
    }

    function kc(n) {
      if ("number" == typeof n) return n;
      if (yc(n)) return Sn;

      if (ic(n)) {
        var t = "function" == typeof n.valueOf ? n.valueOf() : n;
        n = ic(t) ? t + "" : t;
      }

      if ("string" != typeof n) return 0 === n ? n : +n;
      n = n.replace(Et, "");
      var r = Ft.test(n);
      return r || Pt.test(n) ? Jr(n.slice(2), r ? 2 : 8) : Mt.test(n) ? Sn : +n;
    }

    function Oc(n) {
      return Bu(n, Nc(n));
    }

    function Ic(n) {
      return n ? $r(jc(n), -zn, zn) : 0 === n ? n : 0;
    }

    function Rc(n) {
      return null == n ? "" : pu(n);
    }

    function zc(n, t) {
      var r = _s(n);

      return null == t ? r : Wr(r, t);
    }

    function Ec(n, t) {
      return v(n, bi(t, 3), ee);
    }

    function Sc(n, t) {
      return v(n, bi(t, 3), ue);
    }

    function Wc(n, t) {
      return null == n ? n : ys(n, bi(t, 3), Nc);
    }

    function Lc(n, t) {
      return null == n ? n : ds(n, bi(t, 3), Nc);
    }

    function Cc(n, t) {
      return n && ee(n, bi(t, 3));
    }

    function Uc(n, t) {
      return n && ue(n, bi(t, 3));
    }

    function Bc(n) {
      return null == n ? [] : se(n, Fc(n));
    }

    function Tc(n) {
      return null == n ? [] : se(n, Nc(n));
    }

    function $c(n, t, r) {
      var e = null == n ? Y : ve(n, t);
      return e === Y ? r : e;
    }

    function Dc(n, t) {
      return null != n && Oi(n, t, we);
    }

    function Mc(n, t) {
      return null != n && Oi(n, t, me);
    }

    function Fc(n) {
      return Vf(n) ? Ar(n) : $e(n);
    }

    function Nc(n) {
      return Vf(n) ? Ar(n, !0) : De(n);
    }

    function Pc(n, t) {
      var r = {};
      return t = bi(t, 3), ee(n, function (n, e, u) {
        Cr(r, t(n, e, u), n);
      }), r;
    }

    function qc(n, t) {
      var r = {};
      return t = bi(t, 3), ee(n, function (n, e, u) {
        Cr(r, e, t(n, e, u));
      }), r;
    }

    function Zc(n, t) {
      return Kc(n, Lf(bi(t)));
    }

    function Kc(n, t) {
      if (null == n) return {};
      var r = c(gi(n), function (n) {
        return [n];
      });
      return t = bi(t), He(n, r, function (n, r) {
        return t(n, r[0]);
      });
    }

    function Vc(n, t, r) {
      t = ju(t, n);
      var e = -1,
          u = t.length;

      for (u || (u = 1, n = Y); ++e < u;) {
        var i = null == n ? Y : n[Qi(t[e])];
        i === Y && (e = u, i = r), n = rc(i) ? i.call(n) : i;
      }

      return n;
    }

    function Gc(n, t, r) {
      return null == n ? n : iu(n, t, r);
    }

    function Hc(n, t, r, e) {
      return e = "function" == typeof e ? e : Y, null == n ? n : iu(n, t, r, e);
    }

    function Jc(n, t, e) {
      var u = yh(n),
          i = u || bh(n) || Ah(n);

      if (t = bi(t, 4), null == e) {
        var o = n && n.constructor;
        e = i ? u ? new o() : [] : ic(n) && rc(o) ? _s(Rl(n)) : {};
      }

      return (i ? r : ee)(n, function (n, r, u) {
        return t(e, n, r, u);
      }), e;
    }

    function Yc(n, t) {
      return null == n || vu(n, t);
    }

    function Qc(n, t, r) {
      return null == n ? n : gu(n, t, xu(r));
    }

    function Xc(n, t, r, e) {
      return e = "function" == typeof e ? e : Y, null == n ? n : gu(n, t, xu(r), e);
    }

    function na(n) {
      return null == n ? [] : z(n, Fc(n));
    }

    function ta(n) {
      return null == n ? [] : z(n, Nc(n));
    }

    function ra(n, t, r) {
      return r === Y && (r = t, t = Y), r !== Y && (r = kc(r), r = r === r ? r : 0), t !== Y && (t = kc(t), t = t === t ? t : 0), $r(kc(n), t, r);
    }

    function ea(n, t, r) {
      return t = xc(t), r === Y ? (r = t, t = 0) : r = xc(r), n = kc(n), xe(n, t, r);
    }

    function ua(n, t, r) {
      if (r && "boolean" != typeof r && Li(n, t, r) && (t = r = Y), r === Y && ("boolean" == typeof t ? (r = t, t = Y) : "boolean" == typeof n && (r = n, n = Y)), n === Y && t === Y ? (n = 0, t = 1) : (n = xc(n), t === Y ? (t = n, n = 0) : t = xc(t)), n > t) {
        var e = n;
        n = t, t = e;
      }

      if (r || n % 1 || t % 1) {
        var u = Jl();
        return Vl(n + u * (t - n + Hr("1e-" + ((u + "").length - 1))), t);
      }

      return Xe(n, t);
    }

    function ia(n) {
      return Jh(Rc(n).toLowerCase());
    }

    function oa(n) {
      return n = Rc(n), n && n.replace(Zt, he).replace(Br, "");
    }

    function fa(n, t, r) {
      n = Rc(n), t = pu(t);
      var e = n.length;
      r = r === Y ? e : $r(jc(r), 0, e);
      var u = r;
      return r -= t.length, r >= 0 && n.slice(r, u) == t;
    }

    function ca(n) {
      return n = Rc(n), n && mt.test(n) ? n.replace(bt, pe) : n;
    }

    function aa(n) {
      return n = Rc(n), n && zt.test(n) ? n.replace(Rt, "\\$&") : n;
    }

    function la(n, t, r) {
      n = Rc(n), t = jc(t);
      var e = t ? K(n) : 0;
      if (!t || e >= t) return n;
      var u = (t - e) / 2;
      return ni(Ml(u), r) + n + ni(Dl(u), r);
    }

    function sa(n, t, r) {
      n = Rc(n), t = jc(t);
      var e = t ? K(n) : 0;
      return t && e < t ? n + ni(t - e, r) : n;
    }

    function ha(n, t, r) {
      n = Rc(n), t = jc(t);
      var e = t ? K(n) : 0;
      return t && e < t ? ni(t - e, r) + n : n;
    }

    function pa(n, t, r) {
      return r || null == t ? t = 0 : t && (t = +t), Hl(Rc(n).replace(St, ""), t || 0);
    }

    function _a(n, t, r) {
      return t = (r ? Li(n, t, r) : t === Y) ? 1 : jc(t), tu(Rc(n), t);
    }

    function va() {
      var n = arguments,
          t = Rc(n[0]);
      return n.length < 3 ? t : t.replace(n[1], n[2]);
    }

    function ga(n, t, r) {
      return r && "number" != typeof r && Li(n, t, r) && (t = r = Y), (r = r === Y ? Wn : r >>> 0) ? (n = Rc(n), n && ("string" == typeof t || null != t && !xh(t)) && (t = pu(t), !t && B(n)) ? Au(V(n), 0, r) : n.split(t, r)) : [];
    }

    function ya(n, t, r) {
      return n = Rc(n), r = null == r ? 0 : $r(jc(r), 0, n.length), t = pu(t), n.slice(r, r + t.length) == t;
    }

    function da(n, t, r) {
      var e = q.templateSettings;
      r && Li(n, t, r) && (t = Y), n = Rc(n), t = zh({}, t, e, ci);
      var u,
          i,
          o = zh({}, t.imports, e.imports, ci),
          f = Fc(o),
          c = z(o, f),
          a = 0,
          l = t.interpolate || Kt,
          s = "__p += '",
          h = al((t.escape || Kt).source + "|" + l.source + "|" + (l === At ? $t : Kt).source + "|" + (t.evaluate || Kt).source + "|$", "g"),
          p = "//# sourceURL=" + (yl.call(t, "sourceURL") ? (t.sourceURL + "").replace(/\s/g, " ") : "lodash.templateSources[" + ++Nr + "]") + "\n";
      n.replace(h, function (t, r, e, o, f, c) {
        return e || (e = o), s += n.slice(a, c).replace(Vt, C), r && (u = !0, s += "' +\n__e(" + r + ") +\n'"), f && (i = !0, s += "';\n" + f + ";\n__p += '"), e && (s += "' +\n((__t = (" + e + ")) == null ? '' : __t) +\n'"), a = c + t.length, t;
      }), s += "';\n";

      var _ = yl.call(t, "variable") && t.variable;

      _ || (s = "with (obj) {\n" + s + "\n}\n"), s = (i ? s.replace(vt, "") : s).replace(gt, "$1").replace(yt, "$1;"), s = "function(" + (_ || "obj") + ") {\n" + (_ ? "" : "obj || (obj = {});\n") + "var __t, __p = ''" + (u ? ", __e = _.escape" : "") + (i ? ", __j = Array.prototype.join;\nfunction print() { __p += __j.call(arguments, '') }\n" : ";\n") + s + "return __p\n}";
      var v = Yh(function () {
        return ol(f, p + "return " + s).apply(Y, c);
      });
      if (v.source = s, nc(v)) throw v;
      return v;
    }

    function ba(n) {
      return Rc(n).toLowerCase();
    }

    function wa(n) {
      return Rc(n).toUpperCase();
    }

    function ma(n, t, r) {
      if (n = Rc(n), n && (r || t === Y)) return n.replace(Et, "");
      if (!n || !(t = pu(t))) return n;
      var e = V(n),
          u = V(t);
      return Au(e, S(e, u), W(e, u) + 1).join("");
    }

    function xa(n, t, r) {
      if (n = Rc(n), n && (r || t === Y)) return n.replace(Wt, "");
      if (!n || !(t = pu(t))) return n;
      var e = V(n);
      return Au(e, 0, W(e, V(t)) + 1).join("");
    }

    function ja(n, t, r) {
      if (n = Rc(n), n && (r || t === Y)) return n.replace(St, "");
      if (!n || !(t = pu(t))) return n;
      var e = V(n);
      return Au(e, S(e, V(t))).join("");
    }

    function Aa(n, t) {
      var r = mn,
          e = xn;

      if (ic(t)) {
        var u = "separator" in t ? t.separator : u;
        r = "length" in t ? jc(t.length) : r, e = "omission" in t ? pu(t.omission) : e;
      }

      n = Rc(n);
      var i = n.length;

      if (B(n)) {
        var o = V(n);
        i = o.length;
      }

      if (r >= i) return n;
      var f = r - K(e);
      if (f < 1) return e;
      var c = o ? Au(o, 0, f).join("") : n.slice(0, f);
      if (u === Y) return c + e;

      if (o && (f += c.length - f), xh(u)) {
        if (n.slice(f).search(u)) {
          var a,
              l = c;

          for (u.global || (u = al(u.source, Rc(Dt.exec(u)) + "g")), u.lastIndex = 0; a = u.exec(l);) {
            var s = a.index;
          }

          c = c.slice(0, s === Y ? f : s);
        }
      } else if (n.indexOf(pu(u), f) != f) {
        var h = c.lastIndexOf(u);
        h > -1 && (c = c.slice(0, h));
      }

      return c + e;
    }

    function ka(n) {
      return n = Rc(n), n && wt.test(n) ? n.replace(dt, _e) : n;
    }

    function Oa(n, t, r) {
      return n = Rc(n), t = r ? Y : t, t === Y ? T(n) ? J(n) : _(n) : n.match(t) || [];
    }

    function Ia(t) {
      var r = null == t ? 0 : t.length,
          e = bi();
      return t = r ? c(t, function (n) {
        if ("function" != typeof n[1]) throw new sl(tn);
        return [e(n[0]), n[1]];
      }) : [], ru(function (e) {
        for (var u = -1; ++u < r;) {
          var i = t[u];
          if (n(i[0], this, e)) return n(i[1], this, e);
        }
      });
    }

    function Ra(n) {
      return Mr(Dr(n, on));
    }

    function za(n) {
      return function () {
        return n;
      };
    }

    function Ea(n, t) {
      return null == n || n !== n ? t : n;
    }

    function Sa(n) {
      return n;
    }

    function Wa(n) {
      return Te("function" == typeof n ? n : Dr(n, on));
    }

    function La(n) {
      return Ne(Dr(n, on));
    }

    function Ca(n, t) {
      return Pe(n, Dr(t, on));
    }

    function Ua(n, t, e) {
      var u = Fc(t),
          i = se(t, u);
      null != e || ic(t) && (i.length || !u.length) || (e = t, t = n, n = this, i = se(t, Fc(t)));
      var o = !(ic(e) && "chain" in e && !e.chain),
          f = rc(n);
      return r(i, function (r) {
        var e = t[r];
        n[r] = e, f && (n.prototype[r] = function () {
          var t = this.__chain__;

          if (o || t) {
            var r = n(this.__wrapped__);
            return (r.__actions__ = Uu(this.__actions__)).push({
              func: e,
              args: arguments,
              thisArg: n
            }), r.__chain__ = t, r;
          }

          return e.apply(n, a([this.value()], arguments));
        });
      }), n;
    }

    function Ba() {
      return Xr._ === this && (Xr._ = xl), this;
    }

    function Ta() {}

    function $a(n) {
      return n = jc(n), ru(function (t) {
        return Ke(t, n);
      });
    }

    function Da(n) {
      return Ci(n) ? m(Qi(n)) : Je(n);
    }

    function Ma(n) {
      return function (t) {
        return null == n ? Y : ve(n, t);
      };
    }

    function Fa() {
      return [];
    }

    function Na() {
      return !1;
    }

    function Pa() {
      return {};
    }

    function qa() {
      return "";
    }

    function Za() {
      return !0;
    }

    function Ka(n, t) {
      if (n = jc(n), n < 1 || n > zn) return [];
      var r = Wn,
          e = Vl(n, Wn);
      t = bi(t), n -= Wn;

      for (var u = O(e, t); ++r < n;) {
        t(r);
      }

      return u;
    }

    function Va(n) {
      return yh(n) ? c(n, Qi) : yc(n) ? [n] : Uu(Ws(Rc(n)));
    }

    function Ga(n) {
      var t = ++dl;
      return Rc(n) + t;
    }

    function Ha(n) {
      return n && n.length ? Yr(n, Sa, be) : Y;
    }

    function Ja(n, t) {
      return n && n.length ? Yr(n, bi(t, 2), be) : Y;
    }

    function Ya(n) {
      return w(n, Sa);
    }

    function Qa(n, t) {
      return w(n, bi(t, 2));
    }

    function Xa(n) {
      return n && n.length ? Yr(n, Sa, Me) : Y;
    }

    function nl(n, t) {
      return n && n.length ? Yr(n, bi(t, 2), Me) : Y;
    }

    function tl(n) {
      return n && n.length ? k(n, Sa) : 0;
    }

    function rl(n, t) {
      return n && n.length ? k(n, bi(t, 2)) : 0;
    }

    x = null == x ? Xr : ge.defaults(Xr.Object(), x, ge.pick(Xr, Fr));

    var el = x.Array,
        ul = x.Date,
        il = x.Error,
        ol = x.Function,
        fl = x.Math,
        cl = x.Object,
        al = x.RegExp,
        ll = x.String,
        sl = x.TypeError,
        hl = el.prototype,
        pl = ol.prototype,
        _l = cl.prototype,
        vl = x["__core-js_shared__"],
        gl = pl.toString,
        yl = _l.hasOwnProperty,
        dl = 0,
        bl = function () {
      var n = /[^.]+$/.exec(vl && vl.keys && vl.keys.IE_PROTO || "");
      return n ? "Symbol(src)_1." + n : "";
    }(),
        wl = _l.toString,
        ml = gl.call(cl),
        xl = Xr._,
        jl = al("^" + gl.call(yl).replace(Rt, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"),
        Al = re ? x.Buffer : Y,
        kl = x.Symbol,
        Ol = x.Uint8Array,
        Il = Al ? Al.allocUnsafe : Y,
        Rl = M(cl.getPrototypeOf, cl),
        zl = cl.create,
        El = _l.propertyIsEnumerable,
        Sl = hl.splice,
        Wl = kl ? kl.isConcatSpreadable : Y,
        Ll = kl ? kl.iterator : Y,
        Cl = kl ? kl.toStringTag : Y,
        Ul = function () {
      try {
        var n = xi(cl, "defineProperty");
        return n({}, "", {}), n;
      } catch (n) {}
    }(),
        Bl = x.clearTimeout !== Xr.clearTimeout && x.clearTimeout,
        Tl = ul && ul.now !== Xr.Date.now && ul.now,
        $l = x.setTimeout !== Xr.setTimeout && x.setTimeout,
        Dl = fl.ceil,
        Ml = fl.floor,
        Fl = cl.getOwnPropertySymbols,
        Nl = Al ? Al.isBuffer : Y,
        Pl = x.isFinite,
        ql = hl.join,
        Zl = M(cl.keys, cl),
        Kl = fl.max,
        Vl = fl.min,
        Gl = ul.now,
        Hl = x.parseInt,
        Jl = fl.random,
        Yl = hl.reverse,
        Ql = xi(x, "DataView"),
        Xl = xi(x, "Map"),
        ns = xi(x, "Promise"),
        ts = xi(x, "Set"),
        rs = xi(x, "WeakMap"),
        es = xi(cl, "create"),
        us = rs && new rs(),
        is = {},
        os = Xi(Ql),
        fs = Xi(Xl),
        cs = Xi(ns),
        as = Xi(ts),
        ls = Xi(rs),
        ss = kl ? kl.prototype : Y,
        hs = ss ? ss.valueOf : Y,
        ps = ss ? ss.toString : Y,
        _s = function () {
      function n() {}

      return function (t) {
        if (!ic(t)) return {};
        if (zl) return zl(t);
        n.prototype = t;
        var r = new n();
        return n.prototype = Y, r;
      };
    }();

    q.templateSettings = {
      escape: xt,
      evaluate: jt,
      interpolate: At,
      variable: "",
      imports: {
        _: q
      }
    }, q.prototype = G.prototype, q.prototype.constructor = q, H.prototype = _s(G.prototype), H.prototype.constructor = H, Bt.prototype = _s(G.prototype), Bt.prototype.constructor = Bt, Yt.prototype.clear = Qt, Yt.prototype["delete"] = Xt, Yt.prototype.get = nr, Yt.prototype.has = tr, Yt.prototype.set = rr, er.prototype.clear = ur, er.prototype["delete"] = ir, er.prototype.get = or, er.prototype.has = fr, er.prototype.set = cr, ar.prototype.clear = lr, ar.prototype["delete"] = sr, ar.prototype.get = hr, ar.prototype.has = pr, ar.prototype.set = _r, vr.prototype.add = vr.prototype.push = gr, vr.prototype.has = yr, dr.prototype.clear = br, dr.prototype["delete"] = wr, dr.prototype.get = mr, dr.prototype.has = xr, dr.prototype.set = jr;

    var vs = Fu(ee),
        gs = Fu(ue, !0),
        ys = Nu(),
        ds = Nu(!0),
        bs = us ? function (n, t) {
      return us.set(n, t), n;
    } : Sa,
        ws = Ul ? function (n, t) {
      return Ul(n, "toString", {
        configurable: !0,
        enumerable: !1,
        value: za(t),
        writable: !0
      });
    } : Sa,
        ms = ru,
        xs = Bl || function (n) {
      return Xr.clearTimeout(n);
    },
        js = ts && 1 / N(new ts([, -0]))[1] == Rn ? function (n) {
      return new ts(n);
    } : Ta,
        As = us ? function (n) {
      return us.get(n);
    } : Ta,
        ks = Fl ? function (n) {
      return null == n ? [] : (n = cl(n), i(Fl(n), function (t) {
        return El.call(n, t);
      }));
    } : Fa,
        Os = Fl ? function (n) {
      for (var t = []; n;) {
        a(t, ks(n)), n = Rl(n);
      }

      return t;
    } : Fa,
        Is = de;

    (Ql && Is(new Ql(new ArrayBuffer(1))) != it || Xl && Is(new Xl()) != Zn || ns && Is(ns.resolve()) != Hn || ts && Is(new ts()) != Qn || rs && Is(new rs()) != rt) && (Is = function Is(n) {
      var t = de(n),
          r = t == Gn ? n.constructor : Y,
          e = r ? Xi(r) : "";
      if (e) switch (e) {
        case os:
          return it;

        case fs:
          return Zn;

        case cs:
          return Hn;

        case as:
          return Qn;

        case ls:
          return rt;
      }
      return t;
    });

    var Rs = vl ? rc : Na,
        zs = Ji(bs),
        Es = $l || function (n, t) {
      return Xr.setTimeout(n, t);
    },
        Ss = Ji(ws),
        Ws = Fi(function (n) {
      var t = [];
      return 46 === n.charCodeAt(0) && t.push(""), n.replace(It, function (n, r, e, u) {
        t.push(e ? u.replace(Tt, "$1") : r || n);
      }), t;
    }),
        Ls = ru(function (n, t) {
      return Gf(n) ? Vr(n, te(t, 1, Gf, !0)) : [];
    }),
        Cs = ru(function (n, t) {
      var r = mo(t);
      return Gf(r) && (r = Y), Gf(n) ? Vr(n, te(t, 1, Gf, !0), bi(r, 2)) : [];
    }),
        Us = ru(function (n, t) {
      var r = mo(t);
      return Gf(r) && (r = Y), Gf(n) ? Vr(n, te(t, 1, Gf, !0), Y, r) : [];
    }),
        Bs = ru(function (n) {
      var t = c(n, mu);
      return t.length && t[0] === n[0] ? je(t) : [];
    }),
        Ts = ru(function (n) {
      var t = mo(n),
          r = c(n, mu);
      return t === mo(r) ? t = Y : r.pop(), r.length && r[0] === n[0] ? je(r, bi(t, 2)) : [];
    }),
        $s = ru(function (n) {
      var t = mo(n),
          r = c(n, mu);
      return t = "function" == typeof t ? t : Y, t && r.pop(), r.length && r[0] === n[0] ? je(r, Y, t) : [];
    }),
        Ds = ru(Ao),
        Ms = _i(function (n, t) {
      var r = null == n ? 0 : n.length,
          e = Tr(n, t);
      return Qe(n, c(t, function (n) {
        return Wi(n, r) ? +n : n;
      }).sort(Su)), e;
    }),
        Fs = ru(function (n) {
      return _u(te(n, 1, Gf, !0));
    }),
        Ns = ru(function (n) {
      var t = mo(n);
      return Gf(t) && (t = Y), _u(te(n, 1, Gf, !0), bi(t, 2));
    }),
        Ps = ru(function (n) {
      var t = mo(n);
      return t = "function" == typeof t ? t : Y, _u(te(n, 1, Gf, !0), Y, t);
    }),
        qs = ru(function (n, t) {
      return Gf(n) ? Vr(n, t) : [];
    }),
        Zs = ru(function (n) {
      return bu(i(n, Gf));
    }),
        Ks = ru(function (n) {
      var t = mo(n);
      return Gf(t) && (t = Y), bu(i(n, Gf), bi(t, 2));
    }),
        Vs = ru(function (n) {
      var t = mo(n);
      return t = "function" == typeof t ? t : Y, bu(i(n, Gf), Y, t);
    }),
        Gs = ru(Ko),
        Hs = ru(function (n) {
      var t = n.length,
          r = t > 1 ? n[t - 1] : Y;
      return r = "function" == typeof r ? (n.pop(), r) : Y, Vo(n, r);
    }),
        Js = _i(function (n) {
      var t = n.length,
          r = t ? n[0] : 0,
          e = this.__wrapped__,
          u = function u(t) {
        return Tr(t, n);
      };

      return !(t > 1 || this.__actions__.length) && e instanceof Bt && Wi(r) ? (e = e.slice(r, +r + (t ? 1 : 0)), e.__actions__.push({
        func: Qo,
        args: [u],
        thisArg: Y
      }), new H(e, this.__chain__).thru(function (n) {
        return t && !n.length && n.push(Y), n;
      })) : this.thru(u);
    }),
        Ys = Du(function (n, t, r) {
      yl.call(n, r) ? ++n[r] : Cr(n, r, 1);
    }),
        Qs = Gu(lo),
        Xs = Gu(so),
        nh = Du(function (n, t, r) {
      yl.call(n, r) ? n[r].push(t) : Cr(n, r, [t]);
    }),
        th = ru(function (t, r, e) {
      var u = -1,
          i = "function" == typeof r,
          o = Vf(t) ? el(t.length) : [];
      return vs(t, function (t) {
        o[++u] = i ? n(r, t, e) : ke(t, r, e);
      }), o;
    }),
        rh = Du(function (n, t, r) {
      Cr(n, r, t);
    }),
        eh = Du(function (n, t, r) {
      n[r ? 0 : 1].push(t);
    }, function () {
      return [[], []];
    }),
        uh = ru(function (n, t) {
      if (null == n) return [];
      var r = t.length;
      return r > 1 && Li(n, t[0], t[1]) ? t = [] : r > 2 && Li(t[0], t[1], t[2]) && (t = [t[0]]), Ve(n, te(t, 1), []);
    }),
        ih = Tl || function () {
      return Xr.Date.now();
    },
        oh = ru(function (n, t, r) {
      var e = sn;

      if (r.length) {
        var u = F(r, di(oh));
        e |= gn;
      }

      return fi(n, e, t, r, u);
    }),
        fh = ru(function (n, t, r) {
      var e = sn | hn;

      if (r.length) {
        var u = F(r, di(fh));
        e |= gn;
      }

      return fi(t, e, n, r, u);
    }),
        ch = ru(function (n, t) {
      return Kr(n, 1, t);
    }),
        ah = ru(function (n, t, r) {
      return Kr(n, kc(t) || 0, r);
    });

    Wf.Cache = ar;

    var lh = ms(function (t, r) {
      r = 1 == r.length && yh(r[0]) ? c(r[0], R(bi())) : c(te(r, 1), R(bi()));
      var e = r.length;
      return ru(function (u) {
        for (var i = -1, o = Vl(u.length, e); ++i < o;) {
          u[i] = r[i].call(this, u[i]);
        }

        return n(t, this, u);
      });
    }),
        sh = ru(function (n, t) {
      return fi(n, gn, Y, t, F(t, di(sh)));
    }),
        hh = ru(function (n, t) {
      return fi(n, yn, Y, t, F(t, di(hh)));
    }),
        ph = _i(function (n, t) {
      return fi(n, bn, Y, Y, Y, t);
    }),
        _h = ei(be),
        vh = ei(function (n, t) {
      return n >= t;
    }),
        gh = Oe(function () {
      return arguments;
    }()) ? Oe : function (n) {
      return oc(n) && yl.call(n, "callee") && !El.call(n, "callee");
    },
        yh = el.isArray,
        dh = ie ? R(ie) : Ie,
        bh = Nl || Na,
        wh = oe ? R(oe) : Re,
        mh = fe ? R(fe) : Se,
        xh = ce ? R(ce) : Ce,
        jh = ae ? R(ae) : Ue,
        Ah = le ? R(le) : Be,
        kh = ei(Me),
        Oh = ei(function (n, t) {
      return n <= t;
    }),
        Ih = Mu(function (n, t) {
      if ($i(t) || Vf(t)) return Bu(t, Fc(t), n), Y;

      for (var r in t) {
        yl.call(t, r) && zr(n, r, t[r]);
      }
    }),
        Rh = Mu(function (n, t) {
      Bu(t, Nc(t), n);
    }),
        zh = Mu(function (n, t, r, e) {
      Bu(t, Nc(t), n, e);
    }),
        Eh = Mu(function (n, t, r, e) {
      Bu(t, Fc(t), n, e);
    }),
        Sh = _i(Tr),
        Wh = ru(function (n, t) {
      n = cl(n);
      var r = -1,
          e = t.length,
          u = e > 2 ? t[2] : Y;

      for (u && Li(t[0], t[1], u) && (e = 1); ++r < e;) {
        for (var i = t[r], o = Nc(i), f = -1, c = o.length; ++f < c;) {
          var a = o[f],
              l = n[a];
          (l === Y || Kf(l, _l[a]) && !yl.call(n, a)) && (n[a] = i[a]);
        }
      }

      return n;
    }),
        Lh = ru(function (t) {
      return t.push(Y, ai), n($h, Y, t);
    }),
        Ch = Yu(function (n, t, r) {
      null != t && "function" != typeof t.toString && (t = wl.call(t)), n[t] = r;
    }, za(Sa)),
        Uh = Yu(function (n, t, r) {
      null != t && "function" != typeof t.toString && (t = wl.call(t)), yl.call(n, t) ? n[t].push(r) : n[t] = [r];
    }, bi),
        Bh = ru(ke),
        Th = Mu(function (n, t, r) {
      qe(n, t, r);
    }),
        $h = Mu(function (n, t, r, e) {
      qe(n, t, r, e);
    }),
        Dh = _i(function (n, t) {
      var r = {};
      if (null == n) return r;
      var e = !1;
      t = c(t, function (t) {
        return t = ju(t, n), e || (e = t.length > 1), t;
      }), Bu(n, gi(n), r), e && (r = Dr(r, on | fn | cn, li));

      for (var u = t.length; u--;) {
        vu(r, t[u]);
      }

      return r;
    }),
        Mh = _i(function (n, t) {
      return null == n ? {} : Ge(n, t);
    }),
        Fh = oi(Fc),
        Nh = oi(Nc),
        Ph = Zu(function (n, t, r) {
      return t = t.toLowerCase(), n + (r ? ia(t) : t);
    }),
        qh = Zu(function (n, t, r) {
      return n + (r ? "-" : "") + t.toLowerCase();
    }),
        Zh = Zu(function (n, t, r) {
      return n + (r ? " " : "") + t.toLowerCase();
    }),
        Kh = qu("toLowerCase"),
        Vh = Zu(function (n, t, r) {
      return n + (r ? "_" : "") + t.toLowerCase();
    }),
        Gh = Zu(function (n, t, r) {
      return n + (r ? " " : "") + Jh(t);
    }),
        Hh = Zu(function (n, t, r) {
      return n + (r ? " " : "") + t.toUpperCase();
    }),
        Jh = qu("toUpperCase"),
        Yh = ru(function (t, r) {
      try {
        return n(t, Y, r);
      } catch (n) {
        return nc(n) ? n : new il(n);
      }
    }),
        Qh = _i(function (n, t) {
      return r(t, function (t) {
        t = Qi(t), Cr(n, t, oh(n[t], n));
      }), n;
    }),
        Xh = Hu(),
        np = Hu(!0),
        tp = ru(function (n, t) {
      return function (r) {
        return ke(r, n, t);
      };
    }),
        rp = ru(function (n, t) {
      return function (r) {
        return ke(n, r, t);
      };
    }),
        ep = Xu(c),
        up = Xu(u),
        ip = Xu(h),
        op = ri(),
        fp = ri(!0),
        cp = Qu(function (n, t) {
      return n + t;
    }, 0),
        ap = ii("ceil"),
        lp = Qu(function (n, t) {
      return n / t;
    }, 1),
        sp = ii("floor"),
        hp = Qu(function (n, t) {
      return n * t;
    }, 1),
        pp = ii("round"),
        _p = Qu(function (n, t) {
      return n - t;
    }, 0);

    return q.after = kf, q.ary = Of, q.assign = Ih, q.assignIn = Rh, q.assignInWith = zh, q.assignWith = Eh, q.at = Sh, q.before = If, q.bind = oh, q.bindAll = Qh, q.bindKey = fh, q.castArray = Mf, q.chain = Jo, q.chunk = ro, q.compact = eo, q.concat = uo, q.cond = Ia, q.conforms = Ra, q.constant = za, q.countBy = Ys, q.create = zc, q.curry = Rf, q.curryRight = zf, q.debounce = Ef, q.defaults = Wh, q.defaultsDeep = Lh, q.defer = ch, q.delay = ah, q.difference = Ls, q.differenceBy = Cs, q.differenceWith = Us, q.drop = io, q.dropRight = oo, q.dropRightWhile = fo, q.dropWhile = co, q.fill = ao, q.filter = cf, q.flatMap = af, q.flatMapDeep = lf, q.flatMapDepth = sf, q.flatten = ho, q.flattenDeep = po, q.flattenDepth = _o, q.flip = Sf, q.flow = Xh, q.flowRight = np, q.fromPairs = vo, q.functions = Bc, q.functionsIn = Tc, q.groupBy = nh, q.initial = bo, q.intersection = Bs, q.intersectionBy = Ts, q.intersectionWith = $s, q.invert = Ch, q.invertBy = Uh, q.invokeMap = th, q.iteratee = Wa, q.keyBy = rh, q.keys = Fc, q.keysIn = Nc, q.map = vf, q.mapKeys = Pc, q.mapValues = qc, q.matches = La, q.matchesProperty = Ca, q.memoize = Wf, q.merge = Th, q.mergeWith = $h, q.method = tp, q.methodOf = rp, q.mixin = Ua, q.negate = Lf, q.nthArg = $a, q.omit = Dh, q.omitBy = Zc, q.once = Cf, q.orderBy = gf, q.over = ep, q.overArgs = lh, q.overEvery = up, q.overSome = ip, q.partial = sh, q.partialRight = hh, q.partition = eh, q.pick = Mh, q.pickBy = Kc, q.property = Da, q.propertyOf = Ma, q.pull = Ds, q.pullAll = Ao, q.pullAllBy = ko, q.pullAllWith = Oo, q.pullAt = Ms, q.range = op, q.rangeRight = fp, q.rearg = ph, q.reject = bf, q.remove = Io, q.rest = Uf, q.reverse = Ro, q.sampleSize = mf, q.set = Gc, q.setWith = Hc, q.shuffle = xf, q.slice = zo, q.sortBy = uh, q.sortedUniq = Bo, q.sortedUniqBy = To, q.split = ga, q.spread = Bf, q.tail = $o, q.take = Do, q.takeRight = Mo, q.takeRightWhile = Fo, q.takeWhile = No, q.tap = Yo, q.throttle = Tf, q.thru = Qo, q.toArray = mc, q.toPairs = Fh, q.toPairsIn = Nh, q.toPath = Va, q.toPlainObject = Oc, q.transform = Jc, q.unary = $f, q.union = Fs, q.unionBy = Ns, q.unionWith = Ps, q.uniq = Po, q.uniqBy = qo, q.uniqWith = Zo, q.unset = Yc, q.unzip = Ko, q.unzipWith = Vo, q.update = Qc, q.updateWith = Xc, q.values = na, q.valuesIn = ta, q.without = qs, q.words = Oa, q.wrap = Df, q.xor = Zs, q.xorBy = Ks, q.xorWith = Vs, q.zip = Gs, q.zipObject = Go, q.zipObjectDeep = Ho, q.zipWith = Hs, q.entries = Fh, q.entriesIn = Nh, q.extend = Rh, q.extendWith = zh, Ua(q, q), q.add = cp, q.attempt = Yh, q.camelCase = Ph, q.capitalize = ia, q.ceil = ap, q.clamp = ra, q.clone = Ff, q.cloneDeep = Pf, q.cloneDeepWith = qf, q.cloneWith = Nf, q.conformsTo = Zf, q.deburr = oa, q.defaultTo = Ea, q.divide = lp, q.endsWith = fa, q.eq = Kf, q.escape = ca, q.escapeRegExp = aa, q.every = ff, q.find = Qs, q.findIndex = lo, q.findKey = Ec, q.findLast = Xs, q.findLastIndex = so, q.findLastKey = Sc, q.floor = sp, q.forEach = hf, q.forEachRight = pf, q.forIn = Wc, q.forInRight = Lc, q.forOwn = Cc, q.forOwnRight = Uc, q.get = $c, q.gt = _h, q.gte = vh, q.has = Dc, q.hasIn = Mc, q.head = go, q.identity = Sa, q.includes = _f, q.indexOf = yo, q.inRange = ea, q.invoke = Bh, q.isArguments = gh, q.isArray = yh, q.isArrayBuffer = dh, q.isArrayLike = Vf, q.isArrayLikeObject = Gf, q.isBoolean = Hf, q.isBuffer = bh, q.isDate = wh, q.isElement = Jf, q.isEmpty = Yf, q.isEqual = Qf, q.isEqualWith = Xf, q.isError = nc, q.isFinite = tc, q.isFunction = rc, q.isInteger = ec, q.isLength = uc, q.isMap = mh, q.isMatch = fc, q.isMatchWith = cc, q.isNaN = ac, q.isNative = lc, q.isNil = hc, q.isNull = sc, q.isNumber = pc, q.isObject = ic, q.isObjectLike = oc, q.isPlainObject = _c, q.isRegExp = xh, q.isSafeInteger = vc, q.isSet = jh, q.isString = gc, q.isSymbol = yc, q.isTypedArray = Ah, q.isUndefined = dc, q.isWeakMap = bc, q.isWeakSet = wc, q.join = wo, q.kebabCase = qh, q.last = mo, q.lastIndexOf = xo, q.lowerCase = Zh, q.lowerFirst = Kh, q.lt = kh, q.lte = Oh, q.max = Ha, q.maxBy = Ja, q.mean = Ya, q.meanBy = Qa, q.min = Xa, q.minBy = nl, q.stubArray = Fa, q.stubFalse = Na, q.stubObject = Pa, q.stubString = qa, q.stubTrue = Za, q.multiply = hp, q.nth = jo, q.noConflict = Ba, q.noop = Ta, q.now = ih, q.pad = la, q.padEnd = sa, q.padStart = ha, q.parseInt = pa, q.random = ua, q.reduce = yf, q.reduceRight = df, q.repeat = _a, q.replace = va, q.result = Vc, q.round = pp, q.runInContext = p, q.sample = wf, q.size = jf, q.snakeCase = Vh, q.some = Af, q.sortedIndex = Eo, q.sortedIndexBy = So, q.sortedIndexOf = Wo, q.sortedLastIndex = Lo, q.sortedLastIndexBy = Co, q.sortedLastIndexOf = Uo, q.startCase = Gh, q.startsWith = ya, q.subtract = _p, q.sum = tl, q.sumBy = rl, q.template = da, q.times = Ka, q.toFinite = xc, q.toInteger = jc, q.toLength = Ac, q.toLower = ba, q.toNumber = kc, q.toSafeInteger = Ic, q.toString = Rc, q.toUpper = wa, q.trim = ma, q.trimEnd = xa, q.trimStart = ja, q.truncate = Aa, q.unescape = ka, q.uniqueId = Ga, q.upperCase = Hh, q.upperFirst = Jh, q.each = hf, q.eachRight = pf, q.first = go, Ua(q, function () {
      var n = {};
      return ee(q, function (t, r) {
        yl.call(q.prototype, r) || (n[r] = t);
      }), n;
    }(), {
      chain: !1
    }), q.VERSION = Q, r(["bind", "bindKey", "curry", "curryRight", "partial", "partialRight"], function (n) {
      q[n].placeholder = q;
    }), r(["drop", "take"], function (n, t) {
      Bt.prototype[n] = function (r) {
        r = r === Y ? 1 : Kl(jc(r), 0);
        var e = this.__filtered__ && !t ? new Bt(this) : this.clone();
        return e.__filtered__ ? e.__takeCount__ = Vl(r, e.__takeCount__) : e.__views__.push({
          size: Vl(r, Wn),
          type: n + (e.__dir__ < 0 ? "Right" : "")
        }), e;
      }, Bt.prototype[n + "Right"] = function (t) {
        return this.reverse()[n](t).reverse();
      };
    }), r(["filter", "map", "takeWhile"], function (n, t) {
      var r = t + 1,
          e = r == kn || r == In;

      Bt.prototype[n] = function (n) {
        var t = this.clone();
        return t.__iteratees__.push({
          iteratee: bi(n, 3),
          type: r
        }), t.__filtered__ = t.__filtered__ || e, t;
      };
    }), r(["head", "last"], function (n, t) {
      var r = "take" + (t ? "Right" : "");

      Bt.prototype[n] = function () {
        return this[r](1).value()[0];
      };
    }), r(["initial", "tail"], function (n, t) {
      var r = "drop" + (t ? "" : "Right");

      Bt.prototype[n] = function () {
        return this.__filtered__ ? new Bt(this) : this[r](1);
      };
    }), Bt.prototype.compact = function () {
      return this.filter(Sa);
    }, Bt.prototype.find = function (n) {
      return this.filter(n).head();
    }, Bt.prototype.findLast = function (n) {
      return this.reverse().find(n);
    }, Bt.prototype.invokeMap = ru(function (n, t) {
      return "function" == typeof n ? new Bt(this) : this.map(function (r) {
        return ke(r, n, t);
      });
    }), Bt.prototype.reject = function (n) {
      return this.filter(Lf(bi(n)));
    }, Bt.prototype.slice = function (n, t) {
      n = jc(n);
      var r = this;
      return r.__filtered__ && (n > 0 || t < 0) ? new Bt(r) : (n < 0 ? r = r.takeRight(-n) : n && (r = r.drop(n)), t !== Y && (t = jc(t), r = t < 0 ? r.dropRight(-t) : r.take(t - n)), r);
    }, Bt.prototype.takeRightWhile = function (n) {
      return this.reverse().takeWhile(n).reverse();
    }, Bt.prototype.toArray = function () {
      return this.take(Wn);
    }, ee(Bt.prototype, function (n, t) {
      var r = /^(?:filter|find|map|reject)|While$/.test(t),
          e = /^(?:head|last)$/.test(t),
          u = q[e ? "take" + ("last" == t ? "Right" : "") : t],
          i = e || /^find/.test(t);
      u && (q.prototype[t] = function () {
        var t = this.__wrapped__,
            o = e ? [1] : arguments,
            f = t instanceof Bt,
            c = o[0],
            l = f || yh(t),
            s = function s(n) {
          var t = u.apply(q, a([n], o));
          return e && h ? t[0] : t;
        };

        l && r && "function" == typeof c && 1 != c.length && (f = l = !1);

        var h = this.__chain__,
            p = !!this.__actions__.length,
            _ = i && !h,
            v = f && !p;

        if (!i && l) {
          t = v ? t : new Bt(this);
          var g = n.apply(t, o);
          return g.__actions__.push({
            func: Qo,
            args: [s],
            thisArg: Y
          }), new H(g, h);
        }

        return _ && v ? n.apply(this, o) : (g = this.thru(s), _ ? e ? g.value()[0] : g.value() : g);
      });
    }), r(["pop", "push", "shift", "sort", "splice", "unshift"], function (n) {
      var t = hl[n],
          r = /^(?:push|sort|unshift)$/.test(n) ? "tap" : "thru",
          e = /^(?:pop|shift)$/.test(n);

      q.prototype[n] = function () {
        var n = arguments;

        if (e && !this.__chain__) {
          var u = this.value();
          return t.apply(yh(u) ? u : [], n);
        }

        return this[r](function (r) {
          return t.apply(yh(r) ? r : [], n);
        });
      };
    }), ee(Bt.prototype, function (n, t) {
      var r = q[t];

      if (r) {
        var e = r.name + "";
        yl.call(is, e) || (is[e] = []), is[e].push({
          name: t,
          func: r
        });
      }
    }), is[Ju(Y, hn).name] = [{
      name: "wrapper",
      func: Y
    }], Bt.prototype.clone = Gt, Bt.prototype.reverse = Ht, Bt.prototype.value = Jt, q.prototype.at = Js, q.prototype.chain = Xo, q.prototype.commit = nf, q.prototype.next = tf, q.prototype.plant = ef, q.prototype.reverse = uf, q.prototype.toJSON = q.prototype.valueOf = q.prototype.value = of, q.prototype.first = q.prototype.head, Ll && (q.prototype[Ll] = rf), q;
  },
      ge = ve();

  "function" == typeof define && "object" == _typeof(define.amd) && define.amd ? (Xr._ = ge, define(function () {
    return ge;
  })) : te ? ((te.exports = ge)._ = ge, ne._ = ge) : Xr._ = ge;
}).call(this);
var storage = new Storage();
storage.getInstance().getFilter().querySelector('.js-btn-all').classList.add(PAGINATION_BUTTON_CLASS);
var counters = new Counters();
var tasksList = new TodoList();
tasksList.load();
var form = new TodoForm(storage.getInstance().getCaseButton(), storage.getInstance().getCaseName());
form.initAdding();
form.initAddingOnInput();
var casesFilter = new Filter(storage.getInstance().getFilter());
casesFilter.initFilters();

function Pager(section) {
  this.currentSection = section;

  this.initSection = function () {
    var _this = this;

    this.currentSection.addEventListener('click', function (event) {
      var countBefore = storage.getInstance().getSection().childElementCount;
      var prevElement = _this.currentSection.previousElementSibling;
      var selectSection = new TodoRender(_this.currentSection);
      selectSection.showNecessarySection();
      var countAfter = storage.getInstance().getSection().childElementCount;
      var paintElement = new TodoRender(storage.getInstance().getSection());
      paintElement.removeColor();
      var unpaintElement = new TodoRender();
      unpaintElement.element = countBefore === countAfter ? _this.currentSection : prevElement;
      unpaintElement.addColor();
    });
  };
}

function Section() {
  var element = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var number = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  this.element = element;
  this.number = number;

  this.createNewSection = function () {
    var paintElement = new TodoRender(storage.getInstance().getSection());
    paintElement.removeColor();
    var sectionButton = document.createElement('button');
    sectionButton.classList.add(SECTION_CLASS);
    sectionButton.classList.add(SECTION_BUTTON_CLASS + counters.getInstance().getSectionsCounter());
    sectionButton.textContent = counters.getInstance().getSectionsCounter();
    storage.getInstance().getSection().appendChild(sectionButton);
    var page = new Pager(sectionButton);
    page.initSection();
    var unpaintElement = new TodoRender(page.currentSection);
    unpaintElement.addColor();
    counters.getInstance().increaseSectionsCounter();
  };

  this.goOtherSection = function () {
    for (var i = 0; i < storage.getInstance().getList().childElementCount; i++) {
      storage.getInstance().getList().children[i].classList.add(INVISIBLE_ELEMENT_CLASS);
    }
  };

  this.removeSection = function () {
    var visibleSection = 0;
    var currentSection = 1 + this.number / PAGE_SIZE;

    for (var i = 0; i < storage.getInstance().getSection().childElementCount; i++) {
      var classesSection = storage.getInstance().getSection().children[i].className.split(' ');
      var sectionNumber = classesSection[1].split('-')[POSITION_SECTION_NUMBER];

      if (+sectionNumber === currentSection) {
        visibleSection = storage.getInstance().getSection().children[i].previousElementSibling || storage.getInstance().getSection().children[i].nextElementSibling;
        storage.getInstance().getSection().children[i].remove();

        if (i < storage.getInstance().getSection().childElementCount) {
          var newOrder = new Section(null, i);
          newOrder.changeOrderSection();
        }
      }
    }

    if (storage.getInstance().getSection().childElementCount !== 0) {
      var selectSection = new TodoRender(visibleSection);
      selectSection.showNecessarySection();
    }

    counters.getInstance().decreaseSectionsCounter();

    if (counters.getInstance().getSectionsCounter() <= 0) {
      counters.getInstance().setSectionsCounter(1);
    }
  };

  this.changeOrderSection = function () {
    for (var i = this.number; i < storage.getInstance().getSection().childElementCount; i++) {
      var classesSection = storage.getInstance().getSection().children[i].className.split(' ');
      var infoSection = classesSection[1].split('-');
      var newNumber = infoSection[POSITION_SECTION_NUMBER] - 1;
      infoSection[POSITION_SECTION_NUMBER] = newNumber;
      storage.getInstance().getSection().children[i].classList.remove(classesSection[1]);
      storage.getInstance().getSection().children[i].classList.add(infoSection.join('-'));
      storage.getInstance().getSection().children[i].textContent = newNumber;
    }
  };
}

function Storage() {
  this.instance;
  this.сase = document.querySelector('.js-case');
  this.caseName = document.querySelector('.js-case-text');
  this.caseButton = document.querySelector('.js-case-btn');
  this.filter = document.querySelector('.filtration');
  this.list = document.querySelector('.js-list');
  this.section = document.querySelector('.js-sections');
  this.countFilterCases = [];
  this.infoCases = [];

  this.getCase = function () {
    return this.сase;
  };

  this.getCaseName = function () {
    return this.caseName;
  };

  this.getCaseButton = function () {
    return this.caseButton;
  };

  this.getFilter = function () {
    return this.filter;
  };

  this.getList = function () {
    return this.list;
  };

  this.getSection = function () {
    return this.section;
  };

  this.getCountFilterCases = function () {
    return this.countFilterCases;
  };

  this.getInfoCases = function () {
    return this.infoCases;
  };

  this.getInstance = function () {
    return this.instance || (this.instance = this);
  };
}

function Task(task) {
  this["case"] = task;

  this.initListElement = function () {
    var _this2 = this;

    this["case"].addEventListener('click', function (event) {
      var tasksList = new TodoList();
      var button = new Button();

      if (event.target.classList.contains(DELETE_BUTTON_CLASS)) {
        button.processDelete(_this2["case"]);
      }

      if (event.target.classList.contains(STATUS_BUTTON_CLASS)) {
        button.processStatusChange(_this2["case"], event.target);
      }

      tasksList.update();
      tasksList.save();
    });
  };
}

function TodoForm(button, input) {
  this.button = button;
  this.inputText = input;
  this.tasksList = new TodoList();

  this.initAdding = function () {
    var _this3 = this;

    this.button.addEventListener('click', function (event) {
      if (event.target.classList.contains('js-case-btn')) {
        _this3.tasksList.entryInList();
      }
    });
  };

  this.initAddingOnInput = function () {
    var _this4 = this;

    this.inputText.addEventListener('keypress', function (keyPressed) {
      if (keyPressed.which === KEY_ENTER) {
        _this4.tasksList.entryInList();
      }
    });
  };
}

function TodoList() {
  this.entryInList = function () {
    this.checkCompleteness();
    this.save();
  };

  this.checkCompleteness = function () {
    var listCases = new List();

    if (this.checkCasesNumber()) {
      var newSection = new Section();
      newSection.goOtherSection();
      newSection.createNewSection();
    }

    listCases.createCase();
  };

  this.checkCasesNumber = function () {
    var countVisible = 0;

    for (var i = 0; i < storage.getInstance().getList().childElementCount; i++) {
      if (!storage.getInstance().getList().children[i].classList.contains(INVISIBLE_ELEMENT_CLASS)) {
        countVisible++;
      }
    }

    return storage.getInstance().getList().childElementCount !== 0 && countVisible === PAGE_SIZE;
  };

  this.save = function () {
    for (var i = 0; i < storage.getInstance().getList().childElementCount; i++) {
      var task = {
        "value": storage.getInstance().getList().children[i].querySelector(CONTENT_TASK_SELECTOR).textContent,
        "status": storage.getInstance().getList().children[i].querySelector(STATUS_TASK_SELECTOR).textContent
      };
      storage.getInstance().getInfoCases()[i] = JSON.stringify(task);
    }

    localStorage.setItem('todoList', '[' + storage.getInstance().getInfoCases() + ']');
  };

  this.update = function () {
    storage.getInstance().getInfoCases().length = 0;
    localStorage.removeItem('todoList');
  };

  this.load = function () {
    var data = localStorage.getItem('todoList');
    var tasks = JSON.parse(data);

    if (tasks) {
      for (var i = 0; i < tasks.length; i++) {
        storage.getInstance().getCaseName().value = tasks[i].value;
        this.checkCompleteness();
        storage.getInstance().getList().children[i].querySelector(STATUS_TASK_SELECTOR).textContent = tasks[i].status;

        if (storage.getInstance().getList().children[i].querySelector(STATUS_TASK_SELECTOR).textContent === TEXT_COMPLETED) {
          storage.getInstance().getList().children[i].querySelector(CONTENT_TASK_SELECTOR).classList.add(COMPELTED_TASK_CLASS);
          storage.getInstance().getList().children[i].querySelector(STATUS_TASK_SELECTOR).dataset.status = STATUS_COMPLETED;
        }
      }

      this.save();
    }
  };
}

function TodoRender() {
  var element = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var isSection = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  this.element = element;
  this.isSection = isSection;

  this.showUncompleteCases = function () {
    this.showSelectELements(document.querySelectorAll(STATUS_TASK_SELECTOR), STATUS_IN_PROGRESS);
  };

  this.showCompleteCases = function () {
    this.showSelectELements(document.querySelectorAll(STATUS_TASK_SELECTOR), STATUS_COMPLETED);
  };

  this.showNothing = function () {
    alert('Дел нет');
    var hiddenElement = new TodoRender(storage.getInstance().getList());
    hiddenElement.executeHidingAll();
    hiddenElement.element = storage.getInstance().getSection();
    hiddenElement.executeHidingAll();
  };

  this.executeHidingAll = function () {
    for (var i = 0; i < this.element.childElementCount; i++) {
      this.element.children[i].classList.add(INVISIBLE_ELEMENT_CLASS);
    }
  };

  this.removeColor = function () {
    for (var i = 0; i < this.element.childElementCount; i++) {
      this.element.children[i].classList.remove(PAGINATION_BUTTON_CLASS);
    }
  };

  this.addColor = function () {
    this.element.classList.add(PAGINATION_BUTTON_CLASS);
  };

  this.showAllListElements = function () {
    for (var i = 0; i < storage.getInstance().getList().childElementCount; i++) {
      storage.getInstance().getList().children[i].classList.remove(INVISIBLE_ELEMENT_CLASS);
    }

    if (this.isSection) {
      for (var i = 0; i < storage.getInstance().getSection().childElementCount; i++) {
        storage.getInstance().getSection().children[i].classList.remove(INVISIBLE_ELEMENT_CLASS);
      }
    }
  };

  this.showNecessarySection = function () {
    var unpaintElement = new TodoRender(this.element);
    unpaintElement.addColor();
    var hiddenCases = 0;
    var elementList = new TodoRender(storage.getInstance().getList());
    var emptyList = new TodoRender();
    var classesSection = this.element.className.split(' ');
    var sectionNumber = classesSection[1].split('-')[POSITION_SECTION_NUMBER];

    if (storage.getInstance().getCountFilterCases().length > 0) {
      emptyList.showAllListElements();
      elementList.executeHidingAll();
      var pages = Math.ceil(storage.getInstance().getCountFilterCases().length / PAGE_SIZE);

      for (var i = pages; i < storage.getInstance().getSection().childElementCount; i++) {
        storage.getInstance().getSection().children[i].classList.add(INVISIBLE_ELEMENT_CLASS);
      }

      for (var i = 0; i < storage.getInstance().getCountFilterCases().length; i++) {
        storage.getInstance().getCountFilterCases()[i].classList.remove(INVISIBLE_ELEMENT_CLASS);

        if (i < sectionNumber * PAGE_SIZE - PAGE_SIZE || i >= sectionNumber * PAGE_SIZE) {
          storage.getInstance().getCountFilterCases()[i].classList.add(INVISIBLE_ELEMENT_CLASS);
          hiddenCases++;
        }
      }
    } else {
      emptyList.isSection = true;
      emptyList.showAllListElements();

      for (var i = 0; i < storage.getInstance().getList().childElementCount; i++) {
        if (i < sectionNumber * PAGE_SIZE - PAGE_SIZE || i >= sectionNumber * PAGE_SIZE) {
          document.querySelectorAll(TASK_SELECTOR)[i].classList.add(INVISIBLE_ELEMENT_CLASS);
          hiddenCases++;
        }
      }

      if (storage.getInstance().getList().childElementCount - hiddenCases === 0) {
        var remoteSection = new Section(null, (sectionNumber - 1) * PAGE_SIZE);
        remoteSection.removeSection();
      }
    }
  };

  this.showSelectELements = function (element, status) {
    var emptyList = new TodoRender(null, true);
    emptyList.showAllListElements();

    for (var i = 0; i < storage.getInstance().getList().childElementCount; i++) {
      if (element[i].dataset.status === status) {
        storage.getInstance().getCountFilterCases().push(document.querySelectorAll(TASK_SELECTOR)[i]);
      }
    }

    var selectElements = new TodoRender();
    var selectSection = new TodoRender(storage.getInstance().getSection().children[0]);
    return storage.getInstance().getCountFilterCases().length !== 0 ? selectSection.showNecessarySection() : selectElements.showNothing();
  };
}