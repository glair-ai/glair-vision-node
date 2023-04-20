/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const O = window,
  X =
    O.ShadowRoot &&
    (O.ShadyCSS === void 0 || O.ShadyCSS.nativeShadow) &&
    "adoptedStyleSheets" in Document.prototype &&
    "replace" in CSSStyleSheet.prototype,
  at = Symbol(),
  q = /* @__PURE__ */ new WeakMap();
let ut = class {
  constructor(t, e, r) {
    if (((this._$cssResult$ = !0), r !== at))
      throw Error(
        "CSSResult is not constructable. Use `unsafeCSS` or `css` instead."
      );
    (this.cssText = t), (this.t = e);
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (X && t === void 0) {
      const r = e !== void 0 && e.length === 1;
      r && (t = q.get(e)),
        t === void 0 &&
          ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText),
          r && q.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const lt = (o) => new ut(typeof o == "string" ? o : o + "", void 0, at),
  vt = (o, t) => {
    X
      ? (o.adoptedStyleSheets = t.map((e) =>
          e instanceof CSSStyleSheet ? e : e.styleSheet
        ))
      : t.forEach((e) => {
          const r = document.createElement("style"),
            i = O.litNonce;
          i !== void 0 && r.setAttribute("nonce", i),
            (r.textContent = e.cssText),
            o.appendChild(r);
        });
  },
  K = X
    ? (o) => o
    : (o) =>
        o instanceof CSSStyleSheet
          ? ((t) => {
              let e = "";
              for (const r of t.cssRules) e += r.cssText;
              return lt(e);
            })(o)
          : o;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var T;
const B = window,
  G = B.trustedTypes,
  gt = G ? G.emptyScript : "",
  F = B.reactiveElementPolyfillSupport,
  V = {
    toAttribute(o, t) {
      switch (t) {
        case Boolean:
          o = o ? gt : null;
          break;
        case Object:
        case Array:
          o = o == null ? o : JSON.stringify(o);
      }
      return o;
    },
    fromAttribute(o, t) {
      let e = o;
      switch (t) {
        case Boolean:
          e = o !== null;
          break;
        case Number:
          e = o === null ? null : Number(o);
          break;
        case Object:
        case Array:
          try {
            e = JSON.parse(o);
          } catch {
            e = null;
          }
      }
      return e;
    },
  },
  dt = (o, t) => t !== o && (t == t || o == o),
  H = {
    attribute: !0,
    type: String,
    converter: V,
    reflect: !1,
    hasChanged: dt,
  };
let b = class extends HTMLElement {
  constructor() {
    super(),
      (this._$Ei = /* @__PURE__ */ new Map()),
      (this.isUpdatePending = !1),
      (this.hasUpdated = !1),
      (this._$El = null),
      this.u();
  }
  static addInitializer(t) {
    var e;
    this.finalize(),
      ((e = this.h) !== null && e !== void 0 ? e : (this.h = [])).push(t);
  }
  static get observedAttributes() {
    this.finalize();
    const t = [];
    return (
      this.elementProperties.forEach((e, r) => {
        const i = this._$Ep(r, e);
        i !== void 0 && (this._$Ev.set(i, r), t.push(i));
      }),
      t
    );
  }
  static createProperty(t, e = H) {
    if (
      (e.state && (e.attribute = !1),
      this.finalize(),
      this.elementProperties.set(t, e),
      !e.noAccessor && !this.prototype.hasOwnProperty(t))
    ) {
      const r = typeof t == "symbol" ? Symbol() : "__" + t,
        i = this.getPropertyDescriptor(t, r, e);
      i !== void 0 && Object.defineProperty(this.prototype, t, i);
    }
  }
  static getPropertyDescriptor(t, e, r) {
    return {
      get() {
        return this[e];
      },
      set(i) {
        const s = this[t];
        (this[e] = i), this.requestUpdate(t, s, r);
      },
      configurable: !0,
      enumerable: !0,
    };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) || H;
  }
  static finalize() {
    if (this.hasOwnProperty("finalized")) return !1;
    this.finalized = !0;
    const t = Object.getPrototypeOf(this);
    if (
      (t.finalize(),
      t.h !== void 0 && (this.h = [...t.h]),
      (this.elementProperties = new Map(t.elementProperties)),
      (this._$Ev = /* @__PURE__ */ new Map()),
      this.hasOwnProperty("properties"))
    ) {
      const e = this.properties,
        r = [
          ...Object.getOwnPropertyNames(e),
          ...Object.getOwnPropertySymbols(e),
        ];
      for (const i of r) this.createProperty(i, e[i]);
    }
    return (this.elementStyles = this.finalizeStyles(this.styles)), !0;
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const r = new Set(t.flat(1 / 0).reverse());
      for (const i of r) e.unshift(K(i));
    } else t !== void 0 && e.push(K(t));
    return e;
  }
  static _$Ep(t, e) {
    const r = e.attribute;
    return r === !1
      ? void 0
      : typeof r == "string"
      ? r
      : typeof t == "string"
      ? t.toLowerCase()
      : void 0;
  }
  u() {
    var t;
    (this._$E_ = new Promise((e) => (this.enableUpdating = e))),
      (this._$AL = /* @__PURE__ */ new Map()),
      this._$Eg(),
      this.requestUpdate(),
      (t = this.constructor.h) === null ||
        t === void 0 ||
        t.forEach((e) => e(this));
  }
  addController(t) {
    var e, r;
    ((e = this._$ES) !== null && e !== void 0 ? e : (this._$ES = [])).push(t),
      this.renderRoot !== void 0 &&
        this.isConnected &&
        ((r = t.hostConnected) === null || r === void 0 || r.call(t));
  }
  removeController(t) {
    var e;
    (e = this._$ES) === null ||
      e === void 0 ||
      e.splice(this._$ES.indexOf(t) >>> 0, 1);
  }
  _$Eg() {
    this.constructor.elementProperties.forEach((t, e) => {
      this.hasOwnProperty(e) && (this._$Ei.set(e, this[e]), delete this[e]);
    });
  }
  createRenderRoot() {
    var t;
    const e =
      (t = this.shadowRoot) !== null && t !== void 0
        ? t
        : this.attachShadow(this.constructor.shadowRootOptions);
    return vt(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    var t;
    this.renderRoot === void 0 && (this.renderRoot = this.createRenderRoot()),
      this.enableUpdating(!0),
      (t = this._$ES) === null ||
        t === void 0 ||
        t.forEach((e) => {
          var r;
          return (r = e.hostConnected) === null || r === void 0
            ? void 0
            : r.call(e);
        });
  }
  enableUpdating(t) {}
  disconnectedCallback() {
    var t;
    (t = this._$ES) === null ||
      t === void 0 ||
      t.forEach((e) => {
        var r;
        return (r = e.hostDisconnected) === null || r === void 0
          ? void 0
          : r.call(e);
      });
  }
  attributeChangedCallback(t, e, r) {
    this._$AK(t, r);
  }
  _$EO(t, e, r = H) {
    var i;
    const s = this.constructor._$Ep(t, r);
    if (s !== void 0 && r.reflect === !0) {
      const n = (
        ((i = r.converter) === null || i === void 0
          ? void 0
          : i.toAttribute) !== void 0
          ? r.converter
          : V
      ).toAttribute(e, r.type);
      (this._$El = t),
        n == null ? this.removeAttribute(s) : this.setAttribute(s, n),
        (this._$El = null);
    }
  }
  _$AK(t, e) {
    var r;
    const i = this.constructor,
      s = i._$Ev.get(t);
    if (s !== void 0 && this._$El !== s) {
      const n = i.getPropertyOptions(s),
        d =
          typeof n.converter == "function"
            ? { fromAttribute: n.converter }
            : ((r = n.converter) === null || r === void 0
                ? void 0
                : r.fromAttribute) !== void 0
            ? n.converter
            : V;
      (this._$El = s),
        (this[s] = d.fromAttribute(e, n.type)),
        (this._$El = null);
    }
  }
  requestUpdate(t, e, r) {
    let i = !0;
    t !== void 0 &&
      (((r = r || this.constructor.getPropertyOptions(t)).hasChanged || dt)(
        this[t],
        e
      )
        ? (this._$AL.has(t) || this._$AL.set(t, e),
          r.reflect === !0 &&
            this._$El !== t &&
            (this._$EC === void 0 && (this._$EC = /* @__PURE__ */ new Map()),
            this._$EC.set(t, r)))
        : (i = !1)),
      !this.isUpdatePending && i && (this._$E_ = this._$Ej());
  }
  async _$Ej() {
    this.isUpdatePending = !0;
    try {
      await this._$E_;
    } catch (e) {
      Promise.reject(e);
    }
    const t = this.scheduleUpdate();
    return t != null && (await t), !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var t;
    if (!this.isUpdatePending) return;
    this.hasUpdated,
      this._$Ei &&
        (this._$Ei.forEach((i, s) => (this[s] = i)), (this._$Ei = void 0));
    let e = !1;
    const r = this._$AL;
    try {
      (e = this.shouldUpdate(r)),
        e
          ? (this.willUpdate(r),
            (t = this._$ES) === null ||
              t === void 0 ||
              t.forEach((i) => {
                var s;
                return (s = i.hostUpdate) === null || s === void 0
                  ? void 0
                  : s.call(i);
              }),
            this.update(r))
          : this._$Ek();
    } catch (i) {
      throw ((e = !1), this._$Ek(), i);
    }
    e && this._$AE(r);
  }
  willUpdate(t) {}
  _$AE(t) {
    var e;
    (e = this._$ES) === null ||
      e === void 0 ||
      e.forEach((r) => {
        var i;
        return (i = r.hostUpdated) === null || i === void 0
          ? void 0
          : i.call(r);
      }),
      this.hasUpdated || ((this.hasUpdated = !0), this.firstUpdated(t)),
      this.updated(t);
  }
  _$Ek() {
    (this._$AL = /* @__PURE__ */ new Map()), (this.isUpdatePending = !1);
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$E_;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    this._$EC !== void 0 &&
      (this._$EC.forEach((e, r) => this._$EO(r, this[r], e)),
      (this._$EC = void 0)),
      this._$Ek();
  }
  updated(t) {}
  firstUpdated(t) {}
};
(b.finalized = !0),
  (b.elementProperties = /* @__PURE__ */ new Map()),
  (b.elementStyles = []),
  (b.shadowRootOptions = { mode: "open" }),
  F == null || F({ ReactiveElement: b }),
  ((T = B.reactiveElementVersions) !== null && T !== void 0
    ? T
    : (B.reactiveElementVersions = [])
  ).push("1.6.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var j;
const N = window,
  $ = N.trustedTypes,
  Z = $ ? $.createPolicy("lit-html", { createHTML: (o) => o }) : void 0,
  f = `lit$${(Math.random() + "").slice(9)}$`,
  ht = "?" + f,
  ft = `<${ht}>`,
  x = document,
  C = (o = "") => x.createComment(o),
  S = (o) => o === null || (typeof o != "object" && typeof o != "function"),
  ct = Array.isArray,
  mt = (o) =>
    ct(o) || typeof (o == null ? void 0 : o[Symbol.iterator]) == "function",
  A = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,
  tt = /-->/g,
  et = />/g,
  m = RegExp(
    `>|[ 	
\f\r](?:([^\\s"'>=/]+)([ 	
\f\r]*=[ 	
\f\r]*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,
    "g"
  ),
  rt = /'/g,
  it = /"/g,
  pt = /^(?:script|style|textarea|title)$/i,
  bt =
    (o) =>
    (t, ...e) => ({ _$litType$: o, strings: t, values: e }),
  J = bt(1),
  _ = Symbol.for("lit-noChange"),
  p = Symbol.for("lit-nothing"),
  ot = /* @__PURE__ */ new WeakMap(),
  y = x.createTreeWalker(x, 129, null, !1),
  yt = (o, t) => {
    const e = o.length - 1,
      r = [];
    let i,
      s = t === 2 ? "<svg>" : "",
      n = A;
    for (let a = 0; a < e; a++) {
      const l = o[a];
      let v,
        h,
        c = -1,
        w = 0;
      for (; w < l.length && ((n.lastIndex = w), (h = n.exec(l)), h !== null); )
        (w = n.lastIndex),
          n === A
            ? h[1] === "!--"
              ? (n = tt)
              : h[1] !== void 0
              ? (n = et)
              : h[2] !== void 0
              ? (pt.test(h[2]) && (i = RegExp("</" + h[2], "g")), (n = m))
              : h[3] !== void 0 && (n = m)
            : n === m
            ? h[0] === ">"
              ? ((n = i ?? A), (c = -1))
              : h[1] === void 0
              ? (c = -2)
              : ((c = n.lastIndex - h[2].length),
                (v = h[1]),
                (n = h[3] === void 0 ? m : h[3] === '"' ? it : rt))
            : n === it || n === rt
            ? (n = m)
            : n === tt || n === et
            ? (n = A)
            : ((n = m), (i = void 0));
      const P = n === m && o[a + 1].startsWith("/>") ? " " : "";
      s +=
        n === A
          ? l + ft
          : c >= 0
          ? (r.push(v), l.slice(0, c) + "$lit$" + l.slice(c) + f + P)
          : l + f + (c === -2 ? (r.push(void 0), a) : P);
    }
    const d = s + (o[e] || "<?>") + (t === 2 ? "</svg>" : "");
    if (!Array.isArray(o) || !o.hasOwnProperty("raw"))
      throw Error("invalid template strings array");
    return [Z !== void 0 ? Z.createHTML(d) : d, r];
  };
class U {
  constructor({ strings: t, _$litType$: e }, r) {
    let i;
    this.parts = [];
    let s = 0,
      n = 0;
    const d = t.length - 1,
      a = this.parts,
      [l, v] = yt(t, e);
    if (
      ((this.el = U.createElement(l, r)),
      (y.currentNode = this.el.content),
      e === 2)
    ) {
      const h = this.el.content,
        c = h.firstChild;
      c.remove(), h.append(...c.childNodes);
    }
    for (; (i = y.nextNode()) !== null && a.length < d; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) {
          const h = [];
          for (const c of i.getAttributeNames())
            if (c.endsWith("$lit$") || c.startsWith(f)) {
              const w = v[n++];
              if ((h.push(c), w !== void 0)) {
                const P = i.getAttribute(w.toLowerCase() + "$lit$").split(f),
                  Q = /([.?@])?(.*)/.exec(w);
                a.push({
                  type: 1,
                  index: s,
                  name: Q[2],
                  strings: P,
                  ctor:
                    Q[1] === "."
                      ? xt
                      : Q[1] === "?"
                      ? Et
                      : Q[1] === "@"
                      ? At
                      : z,
                });
              } else a.push({ type: 6, index: s });
            }
          for (const c of h) i.removeAttribute(c);
        }
        if (pt.test(i.tagName)) {
          const h = i.textContent.split(f),
            c = h.length - 1;
          if (c > 0) {
            i.textContent = $ ? $.emptyScript : "";
            for (let w = 0; w < c; w++)
              i.append(h[w], C()),
                y.nextNode(),
                a.push({ type: 2, index: ++s });
            i.append(h[c], C());
          }
        }
      } else if (i.nodeType === 8)
        if (i.data === ht) a.push({ type: 2, index: s });
        else {
          let h = -1;
          for (; (h = i.data.indexOf(f, h + 1)) !== -1; )
            a.push({ type: 7, index: s }), (h += f.length - 1);
        }
      s++;
    }
  }
  static createElement(t, e) {
    const r = x.createElement("template");
    return (r.innerHTML = t), r;
  }
}
function E(o, t, e = o, r) {
  var i, s, n, d;
  if (t === _) return t;
  let a =
    r !== void 0
      ? (i = e._$Co) === null || i === void 0
        ? void 0
        : i[r]
      : e._$Cl;
  const l = S(t) ? void 0 : t._$litDirective$;
  return (
    (a == null ? void 0 : a.constructor) !== l &&
      ((s = a == null ? void 0 : a._$AO) === null ||
        s === void 0 ||
        s.call(a, !1),
      l === void 0 ? (a = void 0) : ((a = new l(o)), a._$AT(o, e, r)),
      r !== void 0
        ? (((n = (d = e)._$Co) !== null && n !== void 0 ? n : (d._$Co = []))[
            r
          ] = a)
        : (e._$Cl = a)),
    a !== void 0 && (t = E(o, a._$AS(o, t.values), a, r)),
    t
  );
}
class $t {
  constructor(t, e) {
    (this.u = []), (this._$AN = void 0), (this._$AD = t), (this._$AM = e);
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  v(t) {
    var e;
    const {
        el: { content: r },
        parts: i,
      } = this._$AD,
      s = (
        (e = t == null ? void 0 : t.creationScope) !== null && e !== void 0
          ? e
          : x
      ).importNode(r, !0);
    y.currentNode = s;
    let n = y.nextNode(),
      d = 0,
      a = 0,
      l = i[0];
    for (; l !== void 0; ) {
      if (d === l.index) {
        let v;
        l.type === 2
          ? (v = new R(n, n.nextSibling, this, t))
          : l.type === 1
          ? (v = new l.ctor(n, l.name, l.strings, this, t))
          : l.type === 6 && (v = new kt(n, this, t)),
          this.u.push(v),
          (l = i[++a]);
      }
      d !== (l == null ? void 0 : l.index) && ((n = y.nextNode()), d++);
    }
    return s;
  }
  p(t) {
    let e = 0;
    for (const r of this.u)
      r !== void 0 &&
        (r.strings !== void 0
          ? (r._$AI(t, r, e), (e += r.strings.length - 2))
          : r._$AI(t[e])),
        e++;
  }
}
class R {
  constructor(t, e, r, i) {
    var s;
    (this.type = 2),
      (this._$AH = p),
      (this._$AN = void 0),
      (this._$AA = t),
      (this._$AB = e),
      (this._$AM = r),
      (this.options = i),
      (this._$Cm =
        (s = i == null ? void 0 : i.isConnected) === null || s === void 0 || s);
  }
  get _$AU() {
    var t, e;
    return (e = (t = this._$AM) === null || t === void 0 ? void 0 : t._$AU) !==
      null && e !== void 0
      ? e
      : this._$Cm;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const e = this._$AM;
    return e !== void 0 && t.nodeType === 11 && (t = e.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, e = this) {
    (t = E(this, t, e)),
      S(t)
        ? t === p || t == null || t === ""
          ? (this._$AH !== p && this._$AR(), (this._$AH = p))
          : t !== this._$AH && t !== _ && this.g(t)
        : t._$litType$ !== void 0
        ? this.$(t)
        : t.nodeType !== void 0
        ? this.T(t)
        : mt(t)
        ? this.k(t)
        : this.g(t);
  }
  O(t, e = this._$AB) {
    return this._$AA.parentNode.insertBefore(t, e);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), (this._$AH = this.O(t)));
  }
  g(t) {
    this._$AH !== p && S(this._$AH)
      ? (this._$AA.nextSibling.data = t)
      : this.T(x.createTextNode(t)),
      (this._$AH = t);
  }
  $(t) {
    var e;
    const { values: r, _$litType$: i } = t,
      s =
        typeof i == "number"
          ? this._$AC(t)
          : (i.el === void 0 && (i.el = U.createElement(i.h, this.options)), i);
    if (((e = this._$AH) === null || e === void 0 ? void 0 : e._$AD) === s)
      this._$AH.p(r);
    else {
      const n = new $t(s, this),
        d = n.v(this.options);
      n.p(r), this.T(d), (this._$AH = n);
    }
  }
  _$AC(t) {
    let e = ot.get(t.strings);
    return e === void 0 && ot.set(t.strings, (e = new U(t))), e;
  }
  k(t) {
    ct(this._$AH) || ((this._$AH = []), this._$AR());
    const e = this._$AH;
    let r,
      i = 0;
    for (const s of t)
      i === e.length
        ? e.push((r = new R(this.O(C()), this.O(C()), this, this.options)))
        : (r = e[i]),
        r._$AI(s),
        i++;
    i < e.length && (this._$AR(r && r._$AB.nextSibling, i), (e.length = i));
  }
  _$AR(t = this._$AA.nextSibling, e) {
    var r;
    for (
      (r = this._$AP) === null || r === void 0 || r.call(this, !1, !0, e);
      t && t !== this._$AB;

    ) {
      const i = t.nextSibling;
      t.remove(), (t = i);
    }
  }
  setConnected(t) {
    var e;
    this._$AM === void 0 &&
      ((this._$Cm = t),
      (e = this._$AP) === null || e === void 0 || e.call(this, t));
  }
}
class z {
  constructor(t, e, r, i, s) {
    (this.type = 1),
      (this._$AH = p),
      (this._$AN = void 0),
      (this.element = t),
      (this.name = e),
      (this._$AM = i),
      (this.options = s),
      r.length > 2 || r[0] !== "" || r[1] !== ""
        ? ((this._$AH = Array(r.length - 1).fill(new String())),
          (this.strings = r))
        : (this._$AH = p);
  }
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t, e = this, r, i) {
    const s = this.strings;
    let n = !1;
    if (s === void 0)
      (t = E(this, t, e, 0)),
        (n = !S(t) || (t !== this._$AH && t !== _)),
        n && (this._$AH = t);
    else {
      const d = t;
      let a, l;
      for (t = s[0], a = 0; a < s.length - 1; a++)
        (l = E(this, d[r + a], e, a)),
          l === _ && (l = this._$AH[a]),
          n || (n = !S(l) || l !== this._$AH[a]),
          l === p ? (t = p) : t !== p && (t += (l ?? "") + s[a + 1]),
          (this._$AH[a] = l);
    }
    n && !i && this.j(t);
  }
  j(t) {
    t === p
      ? this.element.removeAttribute(this.name)
      : this.element.setAttribute(this.name, t ?? "");
  }
}
class xt extends z {
  constructor() {
    super(...arguments), (this.type = 3);
  }
  j(t) {
    this.element[this.name] = t === p ? void 0 : t;
  }
}
const _t = $ ? $.emptyScript : "";
class Et extends z {
  constructor() {
    super(...arguments), (this.type = 4);
  }
  j(t) {
    t && t !== p
      ? this.element.setAttribute(this.name, _t)
      : this.element.removeAttribute(this.name);
  }
}
class At extends z {
  constructor(t, e, r, i, s) {
    super(t, e, r, i, s), (this.type = 5);
  }
  _$AI(t, e = this) {
    var r;
    if ((t = (r = E(this, t, e, 0)) !== null && r !== void 0 ? r : p) === _)
      return;
    const i = this._$AH,
      s =
        (t === p && i !== p) ||
        t.capture !== i.capture ||
        t.once !== i.once ||
        t.passive !== i.passive,
      n = t !== p && (i === p || s);
    s && this.element.removeEventListener(this.name, this, i),
      n && this.element.addEventListener(this.name, this, t),
      (this._$AH = t);
  }
  handleEvent(t) {
    var e, r;
    typeof this._$AH == "function"
      ? this._$AH.call(
          (r =
            (e = this.options) === null || e === void 0 ? void 0 : e.host) !==
            null && r !== void 0
            ? r
            : this.element,
          t
        )
      : this._$AH.handleEvent(t);
  }
}
class kt {
  constructor(t, e, r) {
    (this.element = t),
      (this.type = 6),
      (this._$AN = void 0),
      (this._$AM = e),
      (this.options = r);
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    E(this, t);
  }
}
const st = N.litHtmlPolyfillSupport;
st == null || st(U, R),
  ((j = N.litHtmlVersions) !== null && j !== void 0
    ? j
    : (N.litHtmlVersions = [])
  ).push("2.6.1");
const Ct = (o, t, e) => {
  var r, i;
  const s =
    (r = e == null ? void 0 : e.renderBefore) !== null && r !== void 0 ? r : t;
  let n = s._$litPart$;
  if (n === void 0) {
    const d =
      (i = e == null ? void 0 : e.renderBefore) !== null && i !== void 0
        ? i
        : null;
    s._$litPart$ = n = new R(t.insertBefore(C(), d), d, void 0, e ?? {});
  }
  return n._$AI(o), n;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var L, D;
class k extends b {
  constructor() {
    super(...arguments),
      (this.renderOptions = { host: this }),
      (this._$Do = void 0);
  }
  createRenderRoot() {
    var t, e;
    const r = super.createRenderRoot();
    return (
      ((t = (e = this.renderOptions).renderBefore) !== null && t !== void 0) ||
        (e.renderBefore = r.firstChild),
      r
    );
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected),
      super.update(t),
      (this._$Do = Ct(e, this.renderRoot, this.renderOptions));
  }
  connectedCallback() {
    var t;
    super.connectedCallback(),
      (t = this._$Do) === null || t === void 0 || t.setConnected(!0);
  }
  disconnectedCallback() {
    var t;
    super.disconnectedCallback(),
      (t = this._$Do) === null || t === void 0 || t.setConnected(!1);
  }
  render() {
    return _;
  }
}
(k.finalized = !0),
  (k._$litElement$ = !0),
  (L = globalThis.litElementHydrateSupport) === null ||
    L === void 0 ||
    L.call(globalThis, { LitElement: k });
const nt = globalThis.litElementPolyfillSupport;
nt == null || nt({ LitElement: k });
((D = globalThis.litElementVersions) !== null && D !== void 0
  ? D
  : (globalThis.litElementVersions = [])
).push("3.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const St = (o) => (t) =>
  typeof t == "function"
    ? ((e, r) => (customElements.define(e, r), r))(o, t)
    : ((e, r) => {
        const { kind: i, elements: s } = r;
        return {
          kind: i,
          elements: s,
          finisher(n) {
            customElements.define(e, n);
          },
        };
      })(o, t);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ut = (o, t) =>
  t.kind === "method" && t.descriptor && !("value" in t.descriptor)
    ? {
        ...t,
        finisher(e) {
          e.createProperty(t.key, o);
        },
      }
    : {
        kind: "field",
        key: Symbol(),
        placement: "own",
        descriptor: {},
        originalKey: t.key,
        initializer() {
          typeof t.initializer == "function" &&
            (this[t.key] = t.initializer.call(this));
        },
        finisher(e) {
          e.createProperty(t.key, o);
        },
      };
function M(o) {
  return (t, e) =>
    e !== void 0
      ? ((r, i, s) => {
          i.constructor.createProperty(s, r);
        })(o, t, e)
      : Ut(o, t);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function W(o) {
  return M({ ...o, state: !0 });
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Rt =
  ({ finisher: o, descriptor: t }) =>
  (e, r) => {
    var i;
    if (r === void 0) {
      const s = (i = e.originalKey) !== null && i !== void 0 ? i : e.key,
        n =
          t != null
            ? {
                kind: "method",
                placement: "prototype",
                key: s,
                descriptor: t(e.key),
              }
            : { ...e, key: s };
      return (
        o != null &&
          (n.finisher = function (d) {
            o(d, s);
          }),
        n
      );
    }
    {
      const s = e.constructor;
      t !== void 0 && Object.defineProperty(e, r, t(r)), o == null || o(s, r);
    }
  };
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function Mt(o, t) {
  return Rt({
    descriptor: (e) => {
      const r = {
        get() {
          var i, s;
          return (s =
            (i = this.renderRoot) === null || i === void 0
              ? void 0
              : i.querySelector(o)) !== null && s !== void 0
            ? s
            : null;
        },
        enumerable: !0,
        configurable: !0,
      };
      if (t) {
        const i = typeof e == "symbol" ? Symbol() : "__" + e;
        r.get = function () {
          var s, n;
          return (
            this[i] === void 0 &&
              (this[i] =
                (n =
                  (s = this.renderRoot) === null || s === void 0
                    ? void 0
                    : s.querySelector(o)) !== null && n !== void 0
                  ? n
                  : null),
            this[i]
          );
        };
      }
      return r;
    },
  });
}
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var Y;
((Y = window.HTMLSlotElement) === null || Y === void 0
  ? void 0
  : Y.prototype.assignedElements) != null;
const I =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGIAAABiCAYAAACrpQYOAAABBklEQVR4Ae3TUQ2EQBTAwH2XE4wvdKFj8UBI6MeMhaaz974Wn/stEoSIECJCiAghIoSIECJCiAghIoSIECJCiIj/euaYmXPxGkdECBEhRIQQEUJECBEhRIQQEUJECBEhRIQQEUJECBEhRIQQEUJECBEhRIQQEUJECBEhRIQQEUJECBEhRIQQEUJECBEhRIQQEUJECBEhRIQQEUJECBEhRIQQEUJECBEhRIQQEUJECBEhRIQQEUJECBEhRIQQEUJECBEhRIQQEUJECBEhRIQQEUJECBEhRIQQEUJECBEhRIQQEUJECBEhRIQQEUJECBEhRIQQEUJECBEhRIQQEUJECBEhRIQQETcExQXG6zjxjAAAAABJRU5ErkJggg==",
  Pt = `*,:before,:after{box-sizing:border-box;border-width:0;border-style:solid;border-color:#e5e7eb}:before,:after{--tw-content: ""}html{line-height:1.5;-webkit-text-size-adjust:100%;-moz-tab-size:4;-o-tab-size:4;tab-size:4;font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol,"Noto Color Emoji";font-feature-settings:normal}body{margin:0;line-height:inherit}hr{height:0;color:inherit;border-top-width:1px}abbr:where([title]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;text-decoration:inherit}b,strong{font-weight:bolder}code,kbd,samp,pre{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace;font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}table{text-indent:0;border-color:inherit;border-collapse:collapse}button,input,optgroup,select,textarea{font-family:inherit;font-size:100%;font-weight:inherit;line-height:inherit;color:inherit;margin:0;padding:0}button,select{text-transform:none}button,[type=button],[type=reset],[type=submit]{-webkit-appearance:button;background-color:transparent;background-image:none}:-moz-focusring{outline:auto}:-moz-ui-invalid{box-shadow:none}progress{vertical-align:baseline}::-webkit-inner-spin-button,::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}summary{display:list-item}blockquote,dl,dd,h1,h2,h3,h4,h5,h6,hr,figure,p,pre{margin:0}fieldset{margin:0;padding:0}legend{padding:0}ol,ul,menu{list-style:none;margin:0;padding:0}textarea{resize:vertical}input::-moz-placeholder,textarea::-moz-placeholder{opacity:1;color:#9ca3af}input::placeholder,textarea::placeholder{opacity:1;color:#9ca3af}button,[role=button]{cursor:pointer}:disabled{cursor:default}img,svg,video,canvas,audio,iframe,embed,object{display:block;vertical-align:middle}img,video{max-width:100%;height:auto}[hidden]{display:none}*,:before,:after{--tw-border-spacing-x: 0;--tw-border-spacing-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: }::backdrop{--tw-border-spacing-x: 0;--tw-border-spacing-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: }.btn-primary{border-radius:.5rem;border-width:2px;--tw-border-opacity: 1;border-color:rgb(0 0 0 / var(--tw-border-opacity));padding:.5rem 1rem;font-weight:600;--tw-text-opacity: 1;color:rgb(0 0 0 / var(--tw-text-opacity));--tw-shadow: 0 4px 6px -1px rgb(0 0 0 / .1), 0 2px 4px -2px rgb(0 0 0 / .1);--tw-shadow-colored: 0 4px 6px -1px var(--tw-shadow-color), 0 2px 4px -2px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow)}.btn-primary:hover{--tw-bg-opacity: 1;background-color:rgb(107 114 128 / var(--tw-bg-opacity))}.btn-primary:focus{outline:2px solid transparent;outline-offset:2px;--tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow, 0 0 #0000);--tw-ring-color: rgb(96 165 250 / var(--tw-ring-opacity));--tw-ring-opacity: .75}.btn{border-radius:.5rem;border-width:2px;--tw-border-opacity: 1;border-color:rgb(0 0 0 / var(--tw-border-opacity));padding:.5rem 1rem;font-weight:600;--tw-text-opacity: 1;color:rgb(0 0 0 / var(--tw-text-opacity));--tw-shadow: 0 4px 6px -1px rgb(0 0 0 / .1), 0 2px 4px -2px rgb(0 0 0 / .1);--tw-shadow-colored: 0 4px 6px -1px var(--tw-shadow-color), 0 2px 4px -2px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow)}.btn:hover{--tw-bg-opacity: 1;background-color:rgb(107 114 128 / var(--tw-bg-opacity))}.btn:focus{outline:2px solid transparent;outline-offset:2px;--tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow, 0 0 #0000);--tw-ring-color: rgb(96 165 250 / var(--tw-ring-opacity));--tw-ring-opacity: .75}.btn{display:inline-flex;width:100%;max-width:200px;justify-content:center}.static{position:static}.fixed{position:fixed}.absolute{position:absolute}.relative{position:relative}.bottom-12{bottom:3rem}.left-12{left:3rem}.left-\\[50\\%\\]{left:50%}.right-12{right:3rem}.top-12{top:3rem}.top-\\[50\\%\\]{top:50%}.my-4{margin-top:1rem;margin-bottom:1rem}.inline{display:inline}.flex{display:flex}.inline-flex{display:inline-flex}.w-\\[300px\\]{width:300px}.w-full{width:100%}.max-w-\\[200px\\]{max-width:200px}.translate-x-\\[-50\\%\\]{--tw-translate-x: -50%;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.translate-y-\\[-50\\%\\]{--tw-translate-y: -50%;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.-rotate-90{--tw-rotate: -90deg;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.rotate-180{--tw-rotate: 180deg;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.rotate-90{--tw-rotate: 90deg;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.transform{transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.flex-col{flex-direction:column}.items-end{align-items:flex-end}.rounded-lg{border-radius:.5rem}.rounded-sm{border-radius:.125rem}.border{border-width:1px}.border-2{border-width:2px}.border-black{--tw-border-opacity: 1;border-color:rgb(0 0 0 / var(--tw-border-opacity))}.bg-gray-200{--tw-bg-opacity: 1;background-color:rgb(229 231 235 / var(--tw-bg-opacity))}.bg-white{--tw-bg-opacity: 1;background-color:rgb(255 255 255 / var(--tw-bg-opacity))}.object-cover{-o-object-fit:cover;object-fit:cover}.px-4{padding-left:1rem;padding-right:1rem}.px-8{padding-left:2rem;padding-right:2rem}.py-2{padding-top:.5rem;padding-bottom:.5rem}.py-4{padding-top:1rem;padding-bottom:1rem}.text-\\[20px\\]{font-size:20px}.font-semibold{font-weight:600}.text-\\[\\#009CDE\\]{--tw-text-opacity: 1;color:rgb(0 156 222 / var(--tw-text-opacity))}.text-black{--tw-text-opacity: 1;color:rgb(0 0 0 / var(--tw-text-opacity))}.shadow-md{--tw-shadow: 0 4px 6px -1px rgb(0 0 0 / .1), 0 2px 4px -2px rgb(0 0 0 / .1);--tw-shadow-colored: 0 4px 6px -1px var(--tw-shadow-color), 0 2px 4px -2px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow)}.invert{--tw-invert: invert(100%);filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}.loading-dots div{animation-timing-function:cubic-bezier(0,1,1,0)}.loading-dots div:nth-child(1){left:8px;animation:loading-dots1 .6s infinite}.loading-dots div:nth-child(2){left:8px;animation:loading-dots2 .6s infinite}.loading-dots div:nth-child(3){left:32px;animation:loading-dots2 .6s infinite}.loading-dots div:nth-child(4){left:56px;animation:loading-dots3 .6s infinite}@keyframes loading-dots1{0%{transform:scale(0)}to{transform:scale(1)}}@keyframes loading-dots3{0%{transform:scale(1)}to{transform:scale(0)}}@keyframes loading-dots2{0%{transform:translate(0)}to{transform:translate(24px)}}.hover\\:bg-gray-500:hover{--tw-bg-opacity: 1;background-color:rgb(107 114 128 / var(--tw-bg-opacity))}.focus\\:outline-none:focus{outline:2px solid transparent;outline-offset:2px}.focus\\:ring-2:focus{--tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow, 0 0 #0000)}.focus\\:ring-blue-400:focus{--tw-ring-opacity: 1;--tw-ring-color: rgb(96 165 250 / var(--tw-ring-opacity))}
`,
  Qt = lt(Pt);
class wt extends k {
  dispatch(t, e) {
    this.dispatchEvent(
      new CustomEvent(t, {
        detail: e,
        composed: !0,
        bubbles: !0,
      })
    );
  }
}
wt.styles = [Qt];
function It(o) {
  const t = Ot(o);
  return t && t.toDataURL("image/jpeg", 0.92);
}
function Ot(o) {
  const { ref: t, width: e = 480, height: r = 480, mirrored: i = !1 } = o;
  let s = e,
    n = r,
    d = document.createElement("canvas");
  (d.width = s), (d.height = n);
  let a = d.getContext("2d");
  return (
    a &&
      d &&
      (i && (a.translate(d.width, 0), a.scale(-1, 1)),
      a.drawImage(t, 0, 0, d.width, d.height),
      o.mirrored && (a.scale(-1, 1), a.translate(-d.width, 0))),
    d
  );
}
var Bt = Object.defineProperty,
  Nt = Object.getOwnPropertyDescriptor,
  g = (o, t, e, r) => {
    for (
      var i = r > 1 ? void 0 : r ? Nt(t, e) : t, s = o.length - 1, n;
      s >= 0;
      s--
    )
      (n = o[s]) && (i = (r ? n(t, e, i) : n(i)) || i);
    return r && i && Bt(t, e, i), i;
  };
let u = class extends wt {
  constructor() {
    super(...arguments),
      (this.width = 480),
      (this.height = 480),
      (this.facingMode = "user"),
      (this.mirrored = !1),
      (this._isUserMedia = !1),
      (this._stream = null),
      (this._isMounted = !0);
  }
  async connectedCallback() {
    super.connectedCallback(), await this.requestUserMedia();
  }
  async disconnectedCallback() {
    super.disconnectedCallback(), (this._isMounted = !1), this.stopStream();
  }
  async requestUserMedia() {
    try {
      const o = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: this.facingMode },
      });
      (this._stream = o),
        (this.videoEl.srcObject = o),
        (this._isUserMedia = !0),
        this._isMounted || this.stopStream();
    } catch (o) {
      console.log("Error occured", o);
    }
  }
  stopStream() {
    var o;
    (o = this._stream) == null ||
      o.getTracks().forEach((t) => {
        var e;
        (e = this._stream) == null || e.removeTrack(t), t.stop();
      });
  }
  async screenshot() {
    return It({
      ref: this.videoEl,
      width: this.width,
      height: this.height,
      mirrored: this.mirrored,
    });
  }
  // https://stackoverflow.com/questions/4000818/scale-html5-video-and-break-aspect-ratio-to-fill-whole-site
  render() {
    return J`
      <div class="relative bg-gray-200">
        <video
          autoplay
          muted
          playsinline
          class="object-cover"
          style="width: ${this.width}px; height: ${
      this.height
    }px; transform: scaleX(${this.mirrored ? "-1" : "1"});"
        ></video>
        ${this.userMediaError()} ${this.userMedia()}
      </div>
    `;
  }
  userMediaError() {
    return J`
      <div style="${this._isUserMedia ? "display: none" : "display: revert"}">
        <slot name="user-media-error">
          <div
            class="absolute top-[50%] left-[50%] flex w-[300px] translate-y-[-50%] translate-x-[-50%] flex-col rounded-sm border bg-white py-4 px-8"
          >
            <p class="text-[20px]">Camera blocked</p>
            <p class="my-4">
              Please allow camera access in your browser settings and try again.
            </p>
            <div class="flex flex-col items-end">
              <button
                type="button"
                class="text-md text-[#009CDE]"
                .onclick=${() => location.reload()}
              >
                Try Again
              </button>
            </div>
          </div>
        </slot>
      </div>
    `;
  }
  userMedia() {
    return J`
      <div style="${this._isUserMedia ? "display: revert" : "display: none"}">
        <slot name="user-media">
          <img
            src=${I}
            alt="overlay"
            width="50"
            class="absolute top-12 left-12"
          />
          <img
            src=${I}
            alt="overlay"
            width="50"
            class="absolute bottom-12 left-12 -rotate-90"
          />
          <img
            src=${I}
            alt="overlay"
            width="50"
            class="absolute top-12 right-12 rotate-90"
          />
          <img
            src=${I}
            alt="overlay"
            width="50"
            class="absolute bottom-12 right-12 rotate-180"
          />
        </slot>
      </div>
    `;
  }
};
g([Mt("video")], u.prototype, "videoEl", 2);
g([M({ type: Number })], u.prototype, "width", 2);
g([M({ type: Number })], u.prototype, "height", 2);
g([M({ type: String })], u.prototype, "facingMode", 2);
g([M({ type: Boolean })], u.prototype, "mirrored", 2);
g([W()], u.prototype, "_isUserMedia", 2);
g([W()], u.prototype, "_stream", 2);
g([W()], u.prototype, "_isMounted", 2);
u = g([St("glair-webcam")], u);
export { u as Webcam };
