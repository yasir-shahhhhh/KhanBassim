import { r as T, j, c as dr, R as hr } from "./client-DCx-n2Z2.js";
const fr = T.lazy(() => import("./react-spline-CkwwXRmk.js"));
function pr({ scene: t, className: e }) {
  return /* @__PURE__ */ j.jsx(
    T.Suspense,
    {
      fallback: /* @__PURE__ */ j.jsx("div", { className: "w-full h-full flex items-center justify-center", children: /* @__PURE__ */ j.jsx("span", { className: "loader" }) }),
      children: /* @__PURE__ */ j.jsx(
        fr,
        {
          scene: t,
          className: e
        }
      )
    }
  );
}
function mi(t) {
  var e, n, s = "";
  if (typeof t == "string" || typeof t == "number") s += t;
  else if (typeof t == "object") if (Array.isArray(t)) {
    var i = t.length;
    for (e = 0; e < i; e++) t[e] && (n = mi(t[e])) && (s && (s += " "), s += n);
  } else for (n in t) t[n] && (s && (s += " "), s += n);
  return s;
}
function mr() {
  for (var t, e, n = 0, s = "", i = arguments.length; n < i; n++) (t = arguments[n]) && (e = mi(t)) && (s && (s += " "), s += e);
  return s;
}
const vn = "-", gr = (t) => {
  const e = vr(t), {
    conflictingClassGroups: n,
    conflictingClassGroupModifiers: s
  } = t;
  return {
    getClassGroupId: (o) => {
      const a = o.split(vn);
      return a[0] === "" && a.length !== 1 && a.shift(), gi(a, e) || yr(o);
    },
    getConflictingClassGroupIds: (o, a) => {
      const l = n[o] || [];
      return a && s[o] ? [...l, ...s[o]] : l;
    }
  };
}, gi = (t, e) => {
  var o;
  if (t.length === 0)
    return e.classGroupId;
  const n = t[0], s = e.nextPart.get(n), i = s ? gi(t.slice(1), s) : void 0;
  if (i)
    return i;
  if (e.validators.length === 0)
    return;
  const r = t.join(vn);
  return (o = e.validators.find(({
    validator: a
  }) => a(r))) == null ? void 0 : o.classGroupId;
}, Hn = /^\[(.+)\]$/, yr = (t) => {
  if (Hn.test(t)) {
    const e = Hn.exec(t)[1], n = e == null ? void 0 : e.substring(0, e.indexOf(":"));
    if (n)
      return "arbitrary.." + n;
  }
}, vr = (t) => {
  const {
    theme: e,
    prefix: n
  } = t, s = {
    nextPart: /* @__PURE__ */ new Map(),
    validators: []
  };
  return xr(Object.entries(t.classGroups), n).forEach(([r, o]) => {
    $e(o, s, r, e);
  }), s;
}, $e = (t, e, n, s) => {
  t.forEach((i) => {
    if (typeof i == "string") {
      const r = i === "" ? e : _n(e, i);
      r.classGroupId = n;
      return;
    }
    if (typeof i == "function") {
      if (br(i)) {
        $e(i(s), e, n, s);
        return;
      }
      e.validators.push({
        validator: i,
        classGroupId: n
      });
      return;
    }
    Object.entries(i).forEach(([r, o]) => {
      $e(o, _n(e, r), n, s);
    });
  });
}, _n = (t, e) => {
  let n = t;
  return e.split(vn).forEach((s) => {
    n.nextPart.has(s) || n.nextPart.set(s, {
      nextPart: /* @__PURE__ */ new Map(),
      validators: []
    }), n = n.nextPart.get(s);
  }), n;
}, br = (t) => t.isThemeGetter, xr = (t, e) => e ? t.map(([n, s]) => {
  const i = s.map((r) => typeof r == "string" ? e + r : typeof r == "object" ? Object.fromEntries(Object.entries(r).map(([o, a]) => [e + o, a])) : r);
  return [n, i];
}) : t, wr = (t) => {
  if (t < 1)
    return {
      get: () => {
      },
      set: () => {
      }
    };
  let e = 0, n = /* @__PURE__ */ new Map(), s = /* @__PURE__ */ new Map();
  const i = (r, o) => {
    n.set(r, o), e++, e > t && (e = 0, s = n, n = /* @__PURE__ */ new Map());
  };
  return {
    get(r) {
      let o = n.get(r);
      if (o !== void 0)
        return o;
      if ((o = s.get(r)) !== void 0)
        return i(r, o), o;
    },
    set(r, o) {
      n.has(r) ? n.set(r, o) : i(r, o);
    }
  };
}, yi = "!", Tr = (t) => {
  const {
    separator: e,
    experimentalParseClassName: n
  } = t, s = e.length === 1, i = e[0], r = e.length, o = (a) => {
    const l = [];
    let c = 0, u = 0, d;
    for (let g = 0; g < a.length; g++) {
      let y = a[g];
      if (c === 0) {
        if (y === i && (s || a.slice(g, g + r) === e)) {
          l.push(a.slice(u, g)), u = g + r;
          continue;
        }
        if (y === "/") {
          d = g;
          continue;
        }
      }
      y === "[" ? c++ : y === "]" && c--;
    }
    const h = l.length === 0 ? a : a.substring(u), f = h.startsWith(yi), p = f ? h.substring(1) : h, m = d && d > u ? d - u : void 0;
    return {
      modifiers: l,
      hasImportantModifier: f,
      baseClassName: p,
      maybePostfixModifierPosition: m
    };
  };
  return n ? (a) => n({
    className: a,
    parseClassName: o
  }) : o;
}, Sr = (t) => {
  if (t.length <= 1)
    return t;
  const e = [];
  let n = [];
  return t.forEach((s) => {
    s[0] === "[" ? (e.push(...n.sort(), s), n = []) : n.push(s);
  }), e.push(...n.sort()), e;
}, Pr = (t) => ({
  cache: wr(t.cacheSize),
  parseClassName: Tr(t),
  ...gr(t)
}), Ar = /\s+/, Cr = (t, e) => {
  const {
    parseClassName: n,
    getClassGroupId: s,
    getConflictingClassGroupIds: i
  } = e, r = [], o = t.trim().split(Ar);
  let a = "";
  for (let l = o.length - 1; l >= 0; l -= 1) {
    const c = o[l], {
      modifiers: u,
      hasImportantModifier: d,
      baseClassName: h,
      maybePostfixModifierPosition: f
    } = n(c);
    let p = !!f, m = s(p ? h.substring(0, f) : h);
    if (!m) {
      if (!p) {
        a = c + (a.length > 0 ? " " + a : a);
        continue;
      }
      if (m = s(h), !m) {
        a = c + (a.length > 0 ? " " + a : a);
        continue;
      }
      p = !1;
    }
    const g = Sr(u).join(":"), y = d ? g + yi : g, v = y + m;
    if (r.includes(v))
      continue;
    r.push(v);
    const b = i(m, p);
    for (let x = 0; x < b.length; ++x) {
      const S = b[x];
      r.push(y + S);
    }
    a = c + (a.length > 0 ? " " + a : a);
  }
  return a;
};
function Vr() {
  let t = 0, e, n, s = "";
  for (; t < arguments.length; )
    (e = arguments[t++]) && (n = vi(e)) && (s && (s += " "), s += n);
  return s;
}
const vi = (t) => {
  if (typeof t == "string")
    return t;
  let e, n = "";
  for (let s = 0; s < t.length; s++)
    t[s] && (e = vi(t[s])) && (n && (n += " "), n += e);
  return n;
};
function Mr(t, ...e) {
  let n, s, i, r = o;
  function o(l) {
    const c = e.reduce((u, d) => d(u), t());
    return n = Pr(c), s = n.cache.get, i = n.cache.set, r = a, a(l);
  }
  function a(l) {
    const c = s(l);
    if (c)
      return c;
    const u = Cr(l, n);
    return i(l, u), u;
  }
  return function() {
    return r(Vr.apply(null, arguments));
  };
}
const k = (t) => {
  const e = (n) => n[t] || [];
  return e.isThemeGetter = !0, e;
}, bi = /^\[(?:([a-z-]+):)?(.+)\]$/i, Er = /^\d+\/\d+$/, Dr = /* @__PURE__ */ new Set(["px", "full", "screen"]), Rr = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, kr = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, Lr = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/, Ir = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, Br = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, at = (t) => Et(t) || Dr.has(t) || Er.test(t), ut = (t) => Rt(t, "length", Gr), Et = (t) => !!t && !Number.isNaN(Number(t)), Ce = (t) => Rt(t, "number", Et), Bt = (t) => !!t && Number.isInteger(Number(t)), Fr = (t) => t.endsWith("%") && Et(t.slice(0, -1)), C = (t) => bi.test(t), dt = (t) => Rr.test(t), jr = /* @__PURE__ */ new Set(["length", "size", "percentage"]), Or = (t) => Rt(t, jr, xi), Nr = (t) => Rt(t, "position", xi), zr = /* @__PURE__ */ new Set(["image", "url"]), Ur = (t) => Rt(t, zr, Kr), Wr = (t) => Rt(t, "", $r), Ft = () => !0, Rt = (t, e, n) => {
  const s = bi.exec(t);
  return s ? s[1] ? typeof e == "string" ? s[1] === e : e.has(s[1]) : n(s[2]) : !1;
}, Gr = (t) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  kr.test(t) && !Lr.test(t)
), xi = () => !1, $r = (t) => Ir.test(t), Kr = (t) => Br.test(t), Hr = () => {
  const t = k("colors"), e = k("spacing"), n = k("blur"), s = k("brightness"), i = k("borderColor"), r = k("borderRadius"), o = k("borderSpacing"), a = k("borderWidth"), l = k("contrast"), c = k("grayscale"), u = k("hueRotate"), d = k("invert"), h = k("gap"), f = k("gradientColorStops"), p = k("gradientColorStopPositions"), m = k("inset"), g = k("margin"), y = k("opacity"), v = k("padding"), b = k("saturate"), x = k("scale"), S = k("sepia"), D = k("skew"), M = k("space"), A = k("translate"), B = () => ["auto", "contain", "none"], P = () => ["auto", "hidden", "clip", "visible", "scroll"], L = () => ["auto", C, e], V = () => [C, e], et = () => ["", at, ut], $ = () => ["auto", Et, C], Y = () => ["bottom", "center", "left", "left-bottom", "left-top", "right", "right-bottom", "right-top", "top"], K = () => ["solid", "dashed", "dotted", "double", "none"], Ae = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], F = () => ["start", "end", "center", "between", "around", "evenly", "stretch"], U = () => ["", "0", C], nt = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], G = () => [Et, C];
  return {
    cacheSize: 500,
    separator: ":",
    theme: {
      colors: [Ft],
      spacing: [at, ut],
      blur: ["none", "", dt, C],
      brightness: G(),
      borderColor: [t],
      borderRadius: ["none", "", "full", dt, C],
      borderSpacing: V(),
      borderWidth: et(),
      contrast: G(),
      grayscale: U(),
      hueRotate: G(),
      invert: U(),
      gap: V(),
      gradientColorStops: [t],
      gradientColorStopPositions: [Fr, ut],
      inset: L(),
      margin: L(),
      opacity: G(),
      padding: V(),
      saturate: G(),
      scale: G(),
      sepia: U(),
      skew: G(),
      space: V(),
      translate: V()
    },
    classGroups: {
      // Layout
      /**
       * Aspect Ratio
       * @see https://tailwindcss.com/docs/aspect-ratio
       */
      aspect: [{
        aspect: ["auto", "square", "video", C]
      }],
      /**
       * Container
       * @see https://tailwindcss.com/docs/container
       */
      container: ["container"],
      /**
       * Columns
       * @see https://tailwindcss.com/docs/columns
       */
      columns: [{
        columns: [dt]
      }],
      /**
       * Break After
       * @see https://tailwindcss.com/docs/break-after
       */
      "break-after": [{
        "break-after": nt()
      }],
      /**
       * Break Before
       * @see https://tailwindcss.com/docs/break-before
       */
      "break-before": [{
        "break-before": nt()
      }],
      /**
       * Break Inside
       * @see https://tailwindcss.com/docs/break-inside
       */
      "break-inside": [{
        "break-inside": ["auto", "avoid", "avoid-page", "avoid-column"]
      }],
      /**
       * Box Decoration Break
       * @see https://tailwindcss.com/docs/box-decoration-break
       */
      "box-decoration": [{
        "box-decoration": ["slice", "clone"]
      }],
      /**
       * Box Sizing
       * @see https://tailwindcss.com/docs/box-sizing
       */
      box: [{
        box: ["border", "content"]
      }],
      /**
       * Display
       * @see https://tailwindcss.com/docs/display
       */
      display: ["block", "inline-block", "inline", "flex", "inline-flex", "table", "inline-table", "table-caption", "table-cell", "table-column", "table-column-group", "table-footer-group", "table-header-group", "table-row-group", "table-row", "flow-root", "grid", "inline-grid", "contents", "list-item", "hidden"],
      /**
       * Floats
       * @see https://tailwindcss.com/docs/float
       */
      float: [{
        float: ["right", "left", "none", "start", "end"]
      }],
      /**
       * Clear
       * @see https://tailwindcss.com/docs/clear
       */
      clear: [{
        clear: ["left", "right", "both", "none", "start", "end"]
      }],
      /**
       * Isolation
       * @see https://tailwindcss.com/docs/isolation
       */
      isolation: ["isolate", "isolation-auto"],
      /**
       * Object Fit
       * @see https://tailwindcss.com/docs/object-fit
       */
      "object-fit": [{
        object: ["contain", "cover", "fill", "none", "scale-down"]
      }],
      /**
       * Object Position
       * @see https://tailwindcss.com/docs/object-position
       */
      "object-position": [{
        object: [...Y(), C]
      }],
      /**
       * Overflow
       * @see https://tailwindcss.com/docs/overflow
       */
      overflow: [{
        overflow: P()
      }],
      /**
       * Overflow X
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-x": [{
        "overflow-x": P()
      }],
      /**
       * Overflow Y
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-y": [{
        "overflow-y": P()
      }],
      /**
       * Overscroll Behavior
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      overscroll: [{
        overscroll: B()
      }],
      /**
       * Overscroll Behavior X
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-x": [{
        "overscroll-x": B()
      }],
      /**
       * Overscroll Behavior Y
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-y": [{
        "overscroll-y": B()
      }],
      /**
       * Position
       * @see https://tailwindcss.com/docs/position
       */
      position: ["static", "fixed", "absolute", "relative", "sticky"],
      /**
       * Top / Right / Bottom / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      inset: [{
        inset: [m]
      }],
      /**
       * Right / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-x": [{
        "inset-x": [m]
      }],
      /**
       * Top / Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-y": [{
        "inset-y": [m]
      }],
      /**
       * Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      start: [{
        start: [m]
      }],
      /**
       * End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      end: [{
        end: [m]
      }],
      /**
       * Top
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      top: [{
        top: [m]
      }],
      /**
       * Right
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      right: [{
        right: [m]
      }],
      /**
       * Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      bottom: [{
        bottom: [m]
      }],
      /**
       * Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      left: [{
        left: [m]
      }],
      /**
       * Visibility
       * @see https://tailwindcss.com/docs/visibility
       */
      visibility: ["visible", "invisible", "collapse"],
      /**
       * Z-Index
       * @see https://tailwindcss.com/docs/z-index
       */
      z: [{
        z: ["auto", Bt, C]
      }],
      // Flexbox and Grid
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: L()
      }],
      /**
       * Flex Direction
       * @see https://tailwindcss.com/docs/flex-direction
       */
      "flex-direction": [{
        flex: ["row", "row-reverse", "col", "col-reverse"]
      }],
      /**
       * Flex Wrap
       * @see https://tailwindcss.com/docs/flex-wrap
       */
      "flex-wrap": [{
        flex: ["wrap", "wrap-reverse", "nowrap"]
      }],
      /**
       * Flex
       * @see https://tailwindcss.com/docs/flex
       */
      flex: [{
        flex: ["1", "auto", "initial", "none", C]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: U()
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: U()
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: ["first", "last", "none", Bt, C]
      }],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      "grid-cols": [{
        "grid-cols": [Ft]
      }],
      /**
       * Grid Column Start / End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start-end": [{
        col: ["auto", {
          span: ["full", Bt, C]
        }, C]
      }],
      /**
       * Grid Column Start
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start": [{
        "col-start": $()
      }],
      /**
       * Grid Column End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-end": [{
        "col-end": $()
      }],
      /**
       * Grid Template Rows
       * @see https://tailwindcss.com/docs/grid-template-rows
       */
      "grid-rows": [{
        "grid-rows": [Ft]
      }],
      /**
       * Grid Row Start / End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start-end": [{
        row: ["auto", {
          span: [Bt, C]
        }, C]
      }],
      /**
       * Grid Row Start
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start": [{
        "row-start": $()
      }],
      /**
       * Grid Row End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-end": [{
        "row-end": $()
      }],
      /**
       * Grid Auto Flow
       * @see https://tailwindcss.com/docs/grid-auto-flow
       */
      "grid-flow": [{
        "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"]
      }],
      /**
       * Grid Auto Columns
       * @see https://tailwindcss.com/docs/grid-auto-columns
       */
      "auto-cols": [{
        "auto-cols": ["auto", "min", "max", "fr", C]
      }],
      /**
       * Grid Auto Rows
       * @see https://tailwindcss.com/docs/grid-auto-rows
       */
      "auto-rows": [{
        "auto-rows": ["auto", "min", "max", "fr", C]
      }],
      /**
       * Gap
       * @see https://tailwindcss.com/docs/gap
       */
      gap: [{
        gap: [h]
      }],
      /**
       * Gap X
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-x": [{
        "gap-x": [h]
      }],
      /**
       * Gap Y
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-y": [{
        "gap-y": [h]
      }],
      /**
       * Justify Content
       * @see https://tailwindcss.com/docs/justify-content
       */
      "justify-content": [{
        justify: ["normal", ...F()]
      }],
      /**
       * Justify Items
       * @see https://tailwindcss.com/docs/justify-items
       */
      "justify-items": [{
        "justify-items": ["start", "end", "center", "stretch"]
      }],
      /**
       * Justify Self
       * @see https://tailwindcss.com/docs/justify-self
       */
      "justify-self": [{
        "justify-self": ["auto", "start", "end", "center", "stretch"]
      }],
      /**
       * Align Content
       * @see https://tailwindcss.com/docs/align-content
       */
      "align-content": [{
        content: ["normal", ...F(), "baseline"]
      }],
      /**
       * Align Items
       * @see https://tailwindcss.com/docs/align-items
       */
      "align-items": [{
        items: ["start", "end", "center", "baseline", "stretch"]
      }],
      /**
       * Align Self
       * @see https://tailwindcss.com/docs/align-self
       */
      "align-self": [{
        self: ["auto", "start", "end", "center", "stretch", "baseline"]
      }],
      /**
       * Place Content
       * @see https://tailwindcss.com/docs/place-content
       */
      "place-content": [{
        "place-content": [...F(), "baseline"]
      }],
      /**
       * Place Items
       * @see https://tailwindcss.com/docs/place-items
       */
      "place-items": [{
        "place-items": ["start", "end", "center", "baseline", "stretch"]
      }],
      /**
       * Place Self
       * @see https://tailwindcss.com/docs/place-self
       */
      "place-self": [{
        "place-self": ["auto", "start", "end", "center", "stretch"]
      }],
      // Spacing
      /**
       * Padding
       * @see https://tailwindcss.com/docs/padding
       */
      p: [{
        p: [v]
      }],
      /**
       * Padding X
       * @see https://tailwindcss.com/docs/padding
       */
      px: [{
        px: [v]
      }],
      /**
       * Padding Y
       * @see https://tailwindcss.com/docs/padding
       */
      py: [{
        py: [v]
      }],
      /**
       * Padding Start
       * @see https://tailwindcss.com/docs/padding
       */
      ps: [{
        ps: [v]
      }],
      /**
       * Padding End
       * @see https://tailwindcss.com/docs/padding
       */
      pe: [{
        pe: [v]
      }],
      /**
       * Padding Top
       * @see https://tailwindcss.com/docs/padding
       */
      pt: [{
        pt: [v]
      }],
      /**
       * Padding Right
       * @see https://tailwindcss.com/docs/padding
       */
      pr: [{
        pr: [v]
      }],
      /**
       * Padding Bottom
       * @see https://tailwindcss.com/docs/padding
       */
      pb: [{
        pb: [v]
      }],
      /**
       * Padding Left
       * @see https://tailwindcss.com/docs/padding
       */
      pl: [{
        pl: [v]
      }],
      /**
       * Margin
       * @see https://tailwindcss.com/docs/margin
       */
      m: [{
        m: [g]
      }],
      /**
       * Margin X
       * @see https://tailwindcss.com/docs/margin
       */
      mx: [{
        mx: [g]
      }],
      /**
       * Margin Y
       * @see https://tailwindcss.com/docs/margin
       */
      my: [{
        my: [g]
      }],
      /**
       * Margin Start
       * @see https://tailwindcss.com/docs/margin
       */
      ms: [{
        ms: [g]
      }],
      /**
       * Margin End
       * @see https://tailwindcss.com/docs/margin
       */
      me: [{
        me: [g]
      }],
      /**
       * Margin Top
       * @see https://tailwindcss.com/docs/margin
       */
      mt: [{
        mt: [g]
      }],
      /**
       * Margin Right
       * @see https://tailwindcss.com/docs/margin
       */
      mr: [{
        mr: [g]
      }],
      /**
       * Margin Bottom
       * @see https://tailwindcss.com/docs/margin
       */
      mb: [{
        mb: [g]
      }],
      /**
       * Margin Left
       * @see https://tailwindcss.com/docs/margin
       */
      ml: [{
        ml: [g]
      }],
      /**
       * Space Between X
       * @see https://tailwindcss.com/docs/space
       */
      "space-x": [{
        "space-x": [M]
      }],
      /**
       * Space Between X Reverse
       * @see https://tailwindcss.com/docs/space
       */
      "space-x-reverse": ["space-x-reverse"],
      /**
       * Space Between Y
       * @see https://tailwindcss.com/docs/space
       */
      "space-y": [{
        "space-y": [M]
      }],
      /**
       * Space Between Y Reverse
       * @see https://tailwindcss.com/docs/space
       */
      "space-y-reverse": ["space-y-reverse"],
      // Sizing
      /**
       * Width
       * @see https://tailwindcss.com/docs/width
       */
      w: [{
        w: ["auto", "min", "max", "fit", "svw", "lvw", "dvw", C, e]
      }],
      /**
       * Min-Width
       * @see https://tailwindcss.com/docs/min-width
       */
      "min-w": [{
        "min-w": [C, e, "min", "max", "fit"]
      }],
      /**
       * Max-Width
       * @see https://tailwindcss.com/docs/max-width
       */
      "max-w": [{
        "max-w": [C, e, "none", "full", "min", "max", "fit", "prose", {
          screen: [dt]
        }, dt]
      }],
      /**
       * Height
       * @see https://tailwindcss.com/docs/height
       */
      h: [{
        h: [C, e, "auto", "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      /**
       * Min-Height
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-h": [{
        "min-h": [C, e, "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      /**
       * Max-Height
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-h": [{
        "max-h": [C, e, "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      /**
       * Size
       * @see https://tailwindcss.com/docs/size
       */
      size: [{
        size: [C, e, "auto", "min", "max", "fit"]
      }],
      // Typography
      /**
       * Font Size
       * @see https://tailwindcss.com/docs/font-size
       */
      "font-size": [{
        text: ["base", dt, ut]
      }],
      /**
       * Font Smoothing
       * @see https://tailwindcss.com/docs/font-smoothing
       */
      "font-smoothing": ["antialiased", "subpixel-antialiased"],
      /**
       * Font Style
       * @see https://tailwindcss.com/docs/font-style
       */
      "font-style": ["italic", "not-italic"],
      /**
       * Font Weight
       * @see https://tailwindcss.com/docs/font-weight
       */
      "font-weight": [{
        font: ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black", Ce]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [Ft]
      }],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-normal": ["normal-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-ordinal": ["ordinal"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-slashed-zero": ["slashed-zero"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-figure": ["lining-nums", "oldstyle-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-spacing": ["proportional-nums", "tabular-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
      /**
       * Letter Spacing
       * @see https://tailwindcss.com/docs/letter-spacing
       */
      tracking: [{
        tracking: ["tighter", "tight", "normal", "wide", "wider", "widest", C]
      }],
      /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */
      "line-clamp": [{
        "line-clamp": ["none", Et, Ce]
      }],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      leading: [{
        leading: ["none", "tight", "snug", "normal", "relaxed", "loose", at, C]
      }],
      /**
       * List Style Image
       * @see https://tailwindcss.com/docs/list-style-image
       */
      "list-image": [{
        "list-image": ["none", C]
      }],
      /**
       * List Style Type
       * @see https://tailwindcss.com/docs/list-style-type
       */
      "list-style-type": [{
        list: ["none", "disc", "decimal", C]
      }],
      /**
       * List Style Position
       * @see https://tailwindcss.com/docs/list-style-position
       */
      "list-style-position": [{
        list: ["inside", "outside"]
      }],
      /**
       * Placeholder Color
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/placeholder-color
       */
      "placeholder-color": [{
        placeholder: [t]
      }],
      /**
       * Placeholder Opacity
       * @see https://tailwindcss.com/docs/placeholder-opacity
       */
      "placeholder-opacity": [{
        "placeholder-opacity": [y]
      }],
      /**
       * Text Alignment
       * @see https://tailwindcss.com/docs/text-align
       */
      "text-alignment": [{
        text: ["left", "center", "right", "justify", "start", "end"]
      }],
      /**
       * Text Color
       * @see https://tailwindcss.com/docs/text-color
       */
      "text-color": [{
        text: [t]
      }],
      /**
       * Text Opacity
       * @see https://tailwindcss.com/docs/text-opacity
       */
      "text-opacity": [{
        "text-opacity": [y]
      }],
      /**
       * Text Decoration
       * @see https://tailwindcss.com/docs/text-decoration
       */
      "text-decoration": ["underline", "overline", "line-through", "no-underline"],
      /**
       * Text Decoration Style
       * @see https://tailwindcss.com/docs/text-decoration-style
       */
      "text-decoration-style": [{
        decoration: [...K(), "wavy"]
      }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      "text-decoration-thickness": [{
        decoration: ["auto", "from-font", at, ut]
      }],
      /**
       * Text Underline Offset
       * @see https://tailwindcss.com/docs/text-underline-offset
       */
      "underline-offset": [{
        "underline-offset": ["auto", at, C]
      }],
      /**
       * Text Decoration Color
       * @see https://tailwindcss.com/docs/text-decoration-color
       */
      "text-decoration-color": [{
        decoration: [t]
      }],
      /**
       * Text Transform
       * @see https://tailwindcss.com/docs/text-transform
       */
      "text-transform": ["uppercase", "lowercase", "capitalize", "normal-case"],
      /**
       * Text Overflow
       * @see https://tailwindcss.com/docs/text-overflow
       */
      "text-overflow": ["truncate", "text-ellipsis", "text-clip"],
      /**
       * Text Wrap
       * @see https://tailwindcss.com/docs/text-wrap
       */
      "text-wrap": [{
        text: ["wrap", "nowrap", "balance", "pretty"]
      }],
      /**
       * Text Indent
       * @see https://tailwindcss.com/docs/text-indent
       */
      indent: [{
        indent: V()
      }],
      /**
       * Vertical Alignment
       * @see https://tailwindcss.com/docs/vertical-align
       */
      "vertical-align": [{
        align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", C]
      }],
      /**
       * Whitespace
       * @see https://tailwindcss.com/docs/whitespace
       */
      whitespace: [{
        whitespace: ["normal", "nowrap", "pre", "pre-line", "pre-wrap", "break-spaces"]
      }],
      /**
       * Word Break
       * @see https://tailwindcss.com/docs/word-break
       */
      break: [{
        break: ["normal", "words", "all", "keep"]
      }],
      /**
       * Hyphens
       * @see https://tailwindcss.com/docs/hyphens
       */
      hyphens: [{
        hyphens: ["none", "manual", "auto"]
      }],
      /**
       * Content
       * @see https://tailwindcss.com/docs/content
       */
      content: [{
        content: ["none", C]
      }],
      // Backgrounds
      /**
       * Background Attachment
       * @see https://tailwindcss.com/docs/background-attachment
       */
      "bg-attachment": [{
        bg: ["fixed", "local", "scroll"]
      }],
      /**
       * Background Clip
       * @see https://tailwindcss.com/docs/background-clip
       */
      "bg-clip": [{
        "bg-clip": ["border", "padding", "content", "text"]
      }],
      /**
       * Background Opacity
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/background-opacity
       */
      "bg-opacity": [{
        "bg-opacity": [y]
      }],
      /**
       * Background Origin
       * @see https://tailwindcss.com/docs/background-origin
       */
      "bg-origin": [{
        "bg-origin": ["border", "padding", "content"]
      }],
      /**
       * Background Position
       * @see https://tailwindcss.com/docs/background-position
       */
      "bg-position": [{
        bg: [...Y(), Nr]
      }],
      /**
       * Background Repeat
       * @see https://tailwindcss.com/docs/background-repeat
       */
      "bg-repeat": [{
        bg: ["no-repeat", {
          repeat: ["", "x", "y", "round", "space"]
        }]
      }],
      /**
       * Background Size
       * @see https://tailwindcss.com/docs/background-size
       */
      "bg-size": [{
        bg: ["auto", "cover", "contain", Or]
      }],
      /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */
      "bg-image": [{
        bg: ["none", {
          "gradient-to": ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
        }, Ur]
      }],
      /**
       * Background Color
       * @see https://tailwindcss.com/docs/background-color
       */
      "bg-color": [{
        bg: [t]
      }],
      /**
       * Gradient Color Stops From Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from-pos": [{
        from: [p]
      }],
      /**
       * Gradient Color Stops Via Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via-pos": [{
        via: [p]
      }],
      /**
       * Gradient Color Stops To Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to-pos": [{
        to: [p]
      }],
      /**
       * Gradient Color Stops From
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from": [{
        from: [f]
      }],
      /**
       * Gradient Color Stops Via
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via": [{
        via: [f]
      }],
      /**
       * Gradient Color Stops To
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to": [{
        to: [f]
      }],
      // Borders
      /**
       * Border Radius
       * @see https://tailwindcss.com/docs/border-radius
       */
      rounded: [{
        rounded: [r]
      }],
      /**
       * Border Radius Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-s": [{
        "rounded-s": [r]
      }],
      /**
       * Border Radius End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-e": [{
        "rounded-e": [r]
      }],
      /**
       * Border Radius Top
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-t": [{
        "rounded-t": [r]
      }],
      /**
       * Border Radius Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-r": [{
        "rounded-r": [r]
      }],
      /**
       * Border Radius Bottom
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-b": [{
        "rounded-b": [r]
      }],
      /**
       * Border Radius Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-l": [{
        "rounded-l": [r]
      }],
      /**
       * Border Radius Start Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ss": [{
        "rounded-ss": [r]
      }],
      /**
       * Border Radius Start End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-se": [{
        "rounded-se": [r]
      }],
      /**
       * Border Radius End End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ee": [{
        "rounded-ee": [r]
      }],
      /**
       * Border Radius End Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-es": [{
        "rounded-es": [r]
      }],
      /**
       * Border Radius Top Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tl": [{
        "rounded-tl": [r]
      }],
      /**
       * Border Radius Top Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tr": [{
        "rounded-tr": [r]
      }],
      /**
       * Border Radius Bottom Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-br": [{
        "rounded-br": [r]
      }],
      /**
       * Border Radius Bottom Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-bl": [{
        "rounded-bl": [r]
      }],
      /**
       * Border Width
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w": [{
        border: [a]
      }],
      /**
       * Border Width X
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-x": [{
        "border-x": [a]
      }],
      /**
       * Border Width Y
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-y": [{
        "border-y": [a]
      }],
      /**
       * Border Width Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-s": [{
        "border-s": [a]
      }],
      /**
       * Border Width End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-e": [{
        "border-e": [a]
      }],
      /**
       * Border Width Top
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-t": [{
        "border-t": [a]
      }],
      /**
       * Border Width Right
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-r": [{
        "border-r": [a]
      }],
      /**
       * Border Width Bottom
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-b": [{
        "border-b": [a]
      }],
      /**
       * Border Width Left
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-l": [{
        "border-l": [a]
      }],
      /**
       * Border Opacity
       * @see https://tailwindcss.com/docs/border-opacity
       */
      "border-opacity": [{
        "border-opacity": [y]
      }],
      /**
       * Border Style
       * @see https://tailwindcss.com/docs/border-style
       */
      "border-style": [{
        border: [...K(), "hidden"]
      }],
      /**
       * Divide Width X
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-x": [{
        "divide-x": [a]
      }],
      /**
       * Divide Width X Reverse
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-x-reverse": ["divide-x-reverse"],
      /**
       * Divide Width Y
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-y": [{
        "divide-y": [a]
      }],
      /**
       * Divide Width Y Reverse
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-y-reverse": ["divide-y-reverse"],
      /**
       * Divide Opacity
       * @see https://tailwindcss.com/docs/divide-opacity
       */
      "divide-opacity": [{
        "divide-opacity": [y]
      }],
      /**
       * Divide Style
       * @see https://tailwindcss.com/docs/divide-style
       */
      "divide-style": [{
        divide: K()
      }],
      /**
       * Border Color
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color": [{
        border: [i]
      }],
      /**
       * Border Color X
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-x": [{
        "border-x": [i]
      }],
      /**
       * Border Color Y
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-y": [{
        "border-y": [i]
      }],
      /**
       * Border Color S
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-s": [{
        "border-s": [i]
      }],
      /**
       * Border Color E
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-e": [{
        "border-e": [i]
      }],
      /**
       * Border Color Top
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-t": [{
        "border-t": [i]
      }],
      /**
       * Border Color Right
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-r": [{
        "border-r": [i]
      }],
      /**
       * Border Color Bottom
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-b": [{
        "border-b": [i]
      }],
      /**
       * Border Color Left
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-l": [{
        "border-l": [i]
      }],
      /**
       * Divide Color
       * @see https://tailwindcss.com/docs/divide-color
       */
      "divide-color": [{
        divide: [i]
      }],
      /**
       * Outline Style
       * @see https://tailwindcss.com/docs/outline-style
       */
      "outline-style": [{
        outline: ["", ...K()]
      }],
      /**
       * Outline Offset
       * @see https://tailwindcss.com/docs/outline-offset
       */
      "outline-offset": [{
        "outline-offset": [at, C]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: [at, ut]
      }],
      /**
       * Outline Color
       * @see https://tailwindcss.com/docs/outline-color
       */
      "outline-color": [{
        outline: [t]
      }],
      /**
       * Ring Width
       * @see https://tailwindcss.com/docs/ring-width
       */
      "ring-w": [{
        ring: et()
      }],
      /**
       * Ring Width Inset
       * @see https://tailwindcss.com/docs/ring-width
       */
      "ring-w-inset": ["ring-inset"],
      /**
       * Ring Color
       * @see https://tailwindcss.com/docs/ring-color
       */
      "ring-color": [{
        ring: [t]
      }],
      /**
       * Ring Opacity
       * @see https://tailwindcss.com/docs/ring-opacity
       */
      "ring-opacity": [{
        "ring-opacity": [y]
      }],
      /**
       * Ring Offset Width
       * @see https://tailwindcss.com/docs/ring-offset-width
       */
      "ring-offset-w": [{
        "ring-offset": [at, ut]
      }],
      /**
       * Ring Offset Color
       * @see https://tailwindcss.com/docs/ring-offset-color
       */
      "ring-offset-color": [{
        "ring-offset": [t]
      }],
      // Effects
      /**
       * Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow
       */
      shadow: [{
        shadow: ["", "inner", "none", dt, Wr]
      }],
      /**
       * Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow-color
       */
      "shadow-color": [{
        shadow: [Ft]
      }],
      /**
       * Opacity
       * @see https://tailwindcss.com/docs/opacity
       */
      opacity: [{
        opacity: [y]
      }],
      /**
       * Mix Blend Mode
       * @see https://tailwindcss.com/docs/mix-blend-mode
       */
      "mix-blend": [{
        "mix-blend": [...Ae(), "plus-lighter", "plus-darker"]
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      "bg-blend": [{
        "bg-blend": Ae()
      }],
      // Filters
      /**
       * Filter
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/filter
       */
      filter: [{
        filter: ["", "none"]
      }],
      /**
       * Blur
       * @see https://tailwindcss.com/docs/blur
       */
      blur: [{
        blur: [n]
      }],
      /**
       * Brightness
       * @see https://tailwindcss.com/docs/brightness
       */
      brightness: [{
        brightness: [s]
      }],
      /**
       * Contrast
       * @see https://tailwindcss.com/docs/contrast
       */
      contrast: [{
        contrast: [l]
      }],
      /**
       * Drop Shadow
       * @see https://tailwindcss.com/docs/drop-shadow
       */
      "drop-shadow": [{
        "drop-shadow": ["", "none", dt, C]
      }],
      /**
       * Grayscale
       * @see https://tailwindcss.com/docs/grayscale
       */
      grayscale: [{
        grayscale: [c]
      }],
      /**
       * Hue Rotate
       * @see https://tailwindcss.com/docs/hue-rotate
       */
      "hue-rotate": [{
        "hue-rotate": [u]
      }],
      /**
       * Invert
       * @see https://tailwindcss.com/docs/invert
       */
      invert: [{
        invert: [d]
      }],
      /**
       * Saturate
       * @see https://tailwindcss.com/docs/saturate
       */
      saturate: [{
        saturate: [b]
      }],
      /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */
      sepia: [{
        sepia: [S]
      }],
      /**
       * Backdrop Filter
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/backdrop-filter
       */
      "backdrop-filter": [{
        "backdrop-filter": ["", "none"]
      }],
      /**
       * Backdrop Blur
       * @see https://tailwindcss.com/docs/backdrop-blur
       */
      "backdrop-blur": [{
        "backdrop-blur": [n]
      }],
      /**
       * Backdrop Brightness
       * @see https://tailwindcss.com/docs/backdrop-brightness
       */
      "backdrop-brightness": [{
        "backdrop-brightness": [s]
      }],
      /**
       * Backdrop Contrast
       * @see https://tailwindcss.com/docs/backdrop-contrast
       */
      "backdrop-contrast": [{
        "backdrop-contrast": [l]
      }],
      /**
       * Backdrop Grayscale
       * @see https://tailwindcss.com/docs/backdrop-grayscale
       */
      "backdrop-grayscale": [{
        "backdrop-grayscale": [c]
      }],
      /**
       * Backdrop Hue Rotate
       * @see https://tailwindcss.com/docs/backdrop-hue-rotate
       */
      "backdrop-hue-rotate": [{
        "backdrop-hue-rotate": [u]
      }],
      /**
       * Backdrop Invert
       * @see https://tailwindcss.com/docs/backdrop-invert
       */
      "backdrop-invert": [{
        "backdrop-invert": [d]
      }],
      /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */
      "backdrop-opacity": [{
        "backdrop-opacity": [y]
      }],
      /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */
      "backdrop-saturate": [{
        "backdrop-saturate": [b]
      }],
      /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */
      "backdrop-sepia": [{
        "backdrop-sepia": [S]
      }],
      // Tables
      /**
       * Border Collapse
       * @see https://tailwindcss.com/docs/border-collapse
       */
      "border-collapse": [{
        border: ["collapse", "separate"]
      }],
      /**
       * Border Spacing
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing": [{
        "border-spacing": [o]
      }],
      /**
       * Border Spacing X
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-x": [{
        "border-spacing-x": [o]
      }],
      /**
       * Border Spacing Y
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-y": [{
        "border-spacing-y": [o]
      }],
      /**
       * Table Layout
       * @see https://tailwindcss.com/docs/table-layout
       */
      "table-layout": [{
        table: ["auto", "fixed"]
      }],
      /**
       * Caption Side
       * @see https://tailwindcss.com/docs/caption-side
       */
      caption: [{
        caption: ["top", "bottom"]
      }],
      // Transitions and Animation
      /**
       * Tranisition Property
       * @see https://tailwindcss.com/docs/transition-property
       */
      transition: [{
        transition: ["none", "all", "", "colors", "opacity", "shadow", "transform", C]
      }],
      /**
       * Transition Duration
       * @see https://tailwindcss.com/docs/transition-duration
       */
      duration: [{
        duration: G()
      }],
      /**
       * Transition Timing Function
       * @see https://tailwindcss.com/docs/transition-timing-function
       */
      ease: [{
        ease: ["linear", "in", "out", "in-out", C]
      }],
      /**
       * Transition Delay
       * @see https://tailwindcss.com/docs/transition-delay
       */
      delay: [{
        delay: G()
      }],
      /**
       * Animation
       * @see https://tailwindcss.com/docs/animation
       */
      animate: [{
        animate: ["none", "spin", "ping", "pulse", "bounce", C]
      }],
      // Transforms
      /**
       * Transform
       * @see https://tailwindcss.com/docs/transform
       */
      transform: [{
        transform: ["", "gpu", "none"]
      }],
      /**
       * Scale
       * @see https://tailwindcss.com/docs/scale
       */
      scale: [{
        scale: [x]
      }],
      /**
       * Scale X
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-x": [{
        "scale-x": [x]
      }],
      /**
       * Scale Y
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-y": [{
        "scale-y": [x]
      }],
      /**
       * Rotate
       * @see https://tailwindcss.com/docs/rotate
       */
      rotate: [{
        rotate: [Bt, C]
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-x": [{
        "translate-x": [A]
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-y": [{
        "translate-y": [A]
      }],
      /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-x": [{
        "skew-x": [D]
      }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-y": [{
        "skew-y": [D]
      }],
      /**
       * Transform Origin
       * @see https://tailwindcss.com/docs/transform-origin
       */
      "transform-origin": [{
        origin: ["center", "top", "top-right", "right", "bottom-right", "bottom", "bottom-left", "left", "top-left", C]
      }],
      // Interactivity
      /**
       * Accent Color
       * @see https://tailwindcss.com/docs/accent-color
       */
      accent: [{
        accent: ["auto", t]
      }],
      /**
       * Appearance
       * @see https://tailwindcss.com/docs/appearance
       */
      appearance: [{
        appearance: ["none", "auto"]
      }],
      /**
       * Cursor
       * @see https://tailwindcss.com/docs/cursor
       */
      cursor: [{
        cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", C]
      }],
      /**
       * Caret Color
       * @see https://tailwindcss.com/docs/just-in-time-mode#caret-color-utilities
       */
      "caret-color": [{
        caret: [t]
      }],
      /**
       * Pointer Events
       * @see https://tailwindcss.com/docs/pointer-events
       */
      "pointer-events": [{
        "pointer-events": ["none", "auto"]
      }],
      /**
       * Resize
       * @see https://tailwindcss.com/docs/resize
       */
      resize: [{
        resize: ["none", "y", "x", ""]
      }],
      /**
       * Scroll Behavior
       * @see https://tailwindcss.com/docs/scroll-behavior
       */
      "scroll-behavior": [{
        scroll: ["auto", "smooth"]
      }],
      /**
       * Scroll Margin
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-m": [{
        "scroll-m": V()
      }],
      /**
       * Scroll Margin X
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mx": [{
        "scroll-mx": V()
      }],
      /**
       * Scroll Margin Y
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-my": [{
        "scroll-my": V()
      }],
      /**
       * Scroll Margin Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ms": [{
        "scroll-ms": V()
      }],
      /**
       * Scroll Margin End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-me": [{
        "scroll-me": V()
      }],
      /**
       * Scroll Margin Top
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mt": [{
        "scroll-mt": V()
      }],
      /**
       * Scroll Margin Right
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mr": [{
        "scroll-mr": V()
      }],
      /**
       * Scroll Margin Bottom
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mb": [{
        "scroll-mb": V()
      }],
      /**
       * Scroll Margin Left
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ml": [{
        "scroll-ml": V()
      }],
      /**
       * Scroll Padding
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-p": [{
        "scroll-p": V()
      }],
      /**
       * Scroll Padding X
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-px": [{
        "scroll-px": V()
      }],
      /**
       * Scroll Padding Y
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-py": [{
        "scroll-py": V()
      }],
      /**
       * Scroll Padding Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-ps": [{
        "scroll-ps": V()
      }],
      /**
       * Scroll Padding End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pe": [{
        "scroll-pe": V()
      }],
      /**
       * Scroll Padding Top
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pt": [{
        "scroll-pt": V()
      }],
      /**
       * Scroll Padding Right
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pr": [{
        "scroll-pr": V()
      }],
      /**
       * Scroll Padding Bottom
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pb": [{
        "scroll-pb": V()
      }],
      /**
       * Scroll Padding Left
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pl": [{
        "scroll-pl": V()
      }],
      /**
       * Scroll Snap Align
       * @see https://tailwindcss.com/docs/scroll-snap-align
       */
      "snap-align": [{
        snap: ["start", "end", "center", "align-none"]
      }],
      /**
       * Scroll Snap Stop
       * @see https://tailwindcss.com/docs/scroll-snap-stop
       */
      "snap-stop": [{
        snap: ["normal", "always"]
      }],
      /**
       * Scroll Snap Type
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-type": [{
        snap: ["none", "x", "y", "both"]
      }],
      /**
       * Scroll Snap Type Strictness
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-strictness": [{
        snap: ["mandatory", "proximity"]
      }],
      /**
       * Touch Action
       * @see https://tailwindcss.com/docs/touch-action
       */
      touch: [{
        touch: ["auto", "none", "manipulation"]
      }],
      /**
       * Touch Action X
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-x": [{
        "touch-pan": ["x", "left", "right"]
      }],
      /**
       * Touch Action Y
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-y": [{
        "touch-pan": ["y", "up", "down"]
      }],
      /**
       * Touch Action Pinch Zoom
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-pz": ["touch-pinch-zoom"],
      /**
       * User Select
       * @see https://tailwindcss.com/docs/user-select
       */
      select: [{
        select: ["none", "text", "all", "auto"]
      }],
      /**
       * Will Change
       * @see https://tailwindcss.com/docs/will-change
       */
      "will-change": [{
        "will-change": ["auto", "scroll", "contents", "transform", C]
      }],
      // SVG
      /**
       * Fill
       * @see https://tailwindcss.com/docs/fill
       */
      fill: [{
        fill: [t, "none"]
      }],
      /**
       * Stroke Width
       * @see https://tailwindcss.com/docs/stroke-width
       */
      "stroke-w": [{
        stroke: [at, ut, Ce]
      }],
      /**
       * Stroke
       * @see https://tailwindcss.com/docs/stroke
       */
      stroke: [{
        stroke: [t, "none"]
      }],
      // Accessibility
      /**
       * Screen Readers
       * @see https://tailwindcss.com/docs/screen-readers
       */
      sr: ["sr-only", "not-sr-only"],
      /**
       * Forced Color Adjust
       * @see https://tailwindcss.com/docs/forced-color-adjust
       */
      "forced-color-adjust": [{
        "forced-color-adjust": ["auto", "none"]
      }]
    },
    conflictingClassGroups: {
      overflow: ["overflow-x", "overflow-y"],
      overscroll: ["overscroll-x", "overscroll-y"],
      inset: ["inset-x", "inset-y", "start", "end", "top", "right", "bottom", "left"],
      "inset-x": ["right", "left"],
      "inset-y": ["top", "bottom"],
      flex: ["basis", "grow", "shrink"],
      gap: ["gap-x", "gap-y"],
      p: ["px", "py", "ps", "pe", "pt", "pr", "pb", "pl"],
      px: ["pr", "pl"],
      py: ["pt", "pb"],
      m: ["mx", "my", "ms", "me", "mt", "mr", "mb", "ml"],
      mx: ["mr", "ml"],
      my: ["mt", "mb"],
      size: ["w", "h"],
      "font-size": ["leading"],
      "fvn-normal": ["fvn-ordinal", "fvn-slashed-zero", "fvn-figure", "fvn-spacing", "fvn-fraction"],
      "fvn-ordinal": ["fvn-normal"],
      "fvn-slashed-zero": ["fvn-normal"],
      "fvn-figure": ["fvn-normal"],
      "fvn-spacing": ["fvn-normal"],
      "fvn-fraction": ["fvn-normal"],
      "line-clamp": ["display", "overflow"],
      rounded: ["rounded-s", "rounded-e", "rounded-t", "rounded-r", "rounded-b", "rounded-l", "rounded-ss", "rounded-se", "rounded-ee", "rounded-es", "rounded-tl", "rounded-tr", "rounded-br", "rounded-bl"],
      "rounded-s": ["rounded-ss", "rounded-es"],
      "rounded-e": ["rounded-se", "rounded-ee"],
      "rounded-t": ["rounded-tl", "rounded-tr"],
      "rounded-r": ["rounded-tr", "rounded-br"],
      "rounded-b": ["rounded-br", "rounded-bl"],
      "rounded-l": ["rounded-tl", "rounded-bl"],
      "border-spacing": ["border-spacing-x", "border-spacing-y"],
      "border-w": ["border-w-s", "border-w-e", "border-w-t", "border-w-r", "border-w-b", "border-w-l"],
      "border-w-x": ["border-w-r", "border-w-l"],
      "border-w-y": ["border-w-t", "border-w-b"],
      "border-color": ["border-color-s", "border-color-e", "border-color-t", "border-color-r", "border-color-b", "border-color-l"],
      "border-color-x": ["border-color-r", "border-color-l"],
      "border-color-y": ["border-color-t", "border-color-b"],
      "scroll-m": ["scroll-mx", "scroll-my", "scroll-ms", "scroll-me", "scroll-mt", "scroll-mr", "scroll-mb", "scroll-ml"],
      "scroll-mx": ["scroll-mr", "scroll-ml"],
      "scroll-my": ["scroll-mt", "scroll-mb"],
      "scroll-p": ["scroll-px", "scroll-py", "scroll-ps", "scroll-pe", "scroll-pt", "scroll-pr", "scroll-pb", "scroll-pl"],
      "scroll-px": ["scroll-pr", "scroll-pl"],
      "scroll-py": ["scroll-pt", "scroll-pb"],
      touch: ["touch-x", "touch-y", "touch-pz"],
      "touch-x": ["touch"],
      "touch-y": ["touch"],
      "touch-pz": ["touch"]
    },
    conflictingClassGroupModifiers: {
      "font-size": ["leading"]
    }
  };
}, _r = /* @__PURE__ */ Mr(Hr);
function Pt(...t) {
  return _r(mr(t));
}
const wi = T.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ j.jsx(
  "div",
  {
    ref: n,
    className: Pt(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      t
    ),
    ...e
  }
));
wi.displayName = "Card";
const Xr = T.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ j.jsx(
  "div",
  {
    ref: n,
    className: Pt("flex flex-col space-y-1.5 p-6", t),
    ...e
  }
));
Xr.displayName = "CardHeader";
const Yr = T.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ j.jsx(
  "h3",
  {
    ref: n,
    className: Pt(
      "text-2xl font-semibold leading-none tracking-tight",
      t
    ),
    ...e
  }
));
Yr.displayName = "CardTitle";
const qr = T.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ j.jsx(
  "p",
  {
    ref: n,
    className: Pt("text-sm text-muted-foreground", t),
    ...e
  }
));
qr.displayName = "CardDescription";
const Zr = T.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ j.jsx("div", { ref: n, className: Pt("p-6 pt-0", t), ...e }));
Zr.displayName = "CardContent";
const Jr = T.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ j.jsx(
  "div",
  {
    ref: n,
    className: Pt("flex items-center p-6 pt-0", t),
    ...e
  }
));
Jr.displayName = "CardFooter";
const Ti = T.createContext({});
function bn(t) {
  const e = T.useRef(null);
  return e.current === null && (e.current = t()), e.current;
}
const Qr = typeof window < "u", Si = Qr ? T.useLayoutEffect : T.useEffect, xn = /* @__PURE__ */ T.createContext(null);
function wn(t, e) {
  t.indexOf(e) === -1 && t.push(e);
}
function de(t, e) {
  const n = t.indexOf(e);
  n > -1 && t.splice(n, 1);
}
const rt = (t, e, n) => n > e ? e : n < t ? t : n;
function Xn(t, e) {
  return e ? `${t}. For more information and steps for solving, visit https://motion.dev/troubleshooting/${e}` : t;
}
let Yt = () => {
}, Tt = () => {
};
var pi;
typeof process < "u" && ((pi = process.env) == null ? void 0 : pi.NODE_ENV) !== "production" && (Yt = (t, e, n) => {
  !t && typeof console < "u" && console.warn(Xn(e, n));
}, Tt = (t, e, n) => {
  if (!t)
    throw new Error(Xn(e, n));
});
const pt = {}, Pi = (t) => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(t), Ai = (t) => typeof t == "object" && t !== null, Ci = (t) => /^0[^.\s]+$/u.test(t);
// @__NO_SIDE_EFFECTS__
function Vi(t) {
  let e;
  return () => (e === void 0 && (e = t()), e);
}
const Z = /* @__NO_SIDE_EFFECTS__ */ (t) => t, qt = (...t) => t.reduce((e, n) => (s) => n(e(s))), $t = /* @__NO_SIDE_EFFECTS__ */ (t, e, n) => {
  const s = e - t;
  return s ? (n - t) / s : 1;
};
class Tn {
  constructor() {
    this.subscriptions = [];
  }
  add(e) {
    return wn(this.subscriptions, e), () => de(this.subscriptions, e);
  }
  notify(e, n, s) {
    const i = this.subscriptions.length;
    if (i)
      if (i === 1)
        this.subscriptions[0](e, n, s);
      else
        for (let r = 0; r < i; r++) {
          const o = this.subscriptions[r];
          o && o(e, n, s);
        }
  }
  getSize() {
    return this.subscriptions.length;
  }
  clear() {
    this.subscriptions.length = 0;
  }
}
const X = /* @__NO_SIDE_EFFECTS__ */ (t) => t * 1e3, q = /* @__NO_SIDE_EFFECTS__ */ (t) => t / 1e3, Mi = /* @__NO_SIDE_EFFECTS__ */ (t, e) => e ? t * (1e3 / e) : 0, Ei = (t, e, n) => (((1 - 3 * n + 3 * e) * t + (3 * n - 6 * e)) * t + 3 * e) * t, ta = 1e-7, ea = 12;
function na(t, e, n, s, i) {
  let r, o, a = 0;
  do
    o = e + (n - e) / 2, r = Ei(o, s, i) - t, r > 0 ? n = o : e = o;
  while (Math.abs(r) > ta && ++a < ea);
  return o;
}
// @__NO_SIDE_EFFECTS__
function Zt(t, e, n, s) {
  if (t === e && n === s)
    return Z;
  const i = (r) => na(r, 0, 1, t, n);
  return (r) => r === 0 || r === 1 ? r : Ei(i(r), e, s);
}
const Di = /* @__NO_SIDE_EFFECTS__ */ (t) => (e) => e <= 0.5 ? t(2 * e) / 2 : (2 - t(2 * (1 - e))) / 2, Ri = /* @__NO_SIDE_EFFECTS__ */ (t) => (e) => 1 - t(1 - e), ki = /* @__PURE__ */ Zt(0.33, 1.53, 0.69, 0.99), Sn = /* @__PURE__ */ Ri(ki), Li = /* @__PURE__ */ Di(Sn), Ii = (t) => t >= 1 ? 1 : (t *= 2) < 1 ? 0.5 * Sn(t) : 0.5 * (2 - Math.pow(2, -10 * (t - 1))), Pn = (t) => 1 - Math.sin(Math.acos(t)), Bi = /* @__PURE__ */ Ri(Pn), Fi = /* @__PURE__ */ Di(Pn), sa = /* @__PURE__ */ Zt(0.42, 0, 1, 1), ia = /* @__PURE__ */ Zt(0, 0, 0.58, 1), ji = /* @__PURE__ */ Zt(0.42, 0, 0.58, 1), oa = /* @__NO_SIDE_EFFECTS__ */ (t) => Array.isArray(t) && typeof t[0] != "number", Oi = /* @__NO_SIDE_EFFECTS__ */ (t) => Array.isArray(t) && typeof t[0] == "number", Yn = {
  linear: Z,
  easeIn: sa,
  easeInOut: ji,
  easeOut: ia,
  circIn: Pn,
  circInOut: Fi,
  circOut: Bi,
  backIn: Sn,
  backInOut: Li,
  backOut: ki,
  anticipate: Ii
}, ra = (t) => typeof t == "string", qn = (t) => {
  if (/* @__PURE__ */ Oi(t)) {
    Tt(t.length === 4, "Cubic bezier arrays must contain four numerical values.", "cubic-bezier-length");
    const [e, n, s, i] = t;
    return /* @__PURE__ */ Zt(e, n, s, i);
  } else if (ra(t))
    return Tt(Yn[t] !== void 0, `Invalid easing type '${t}'`, "invalid-easing-type"), Yn[t];
  return t;
}, te = [
  "setup",
  // Compute
  "read",
  // Read
  "resolveKeyframes",
  // Write/Read/Write/Read
  "preUpdate",
  // Compute
  "update",
  // Compute
  "preRender",
  // Compute
  "render",
  // Write
  "postRender"
  // Compute
];
function aa(t) {
  let e = /* @__PURE__ */ new Set(), n = /* @__PURE__ */ new Set(), s = !1, i = !1;
  const r = /* @__PURE__ */ new WeakSet();
  let o = {
    delta: 0,
    timestamp: 0,
    isProcessing: !1
  };
  function a(c) {
    r.has(c) && (l.schedule(c), t()), c(o);
  }
  const l = {
    /**
     * Schedule a process to run on the next frame.
     */
    schedule: (c, u = !1, d = !1) => {
      const f = d && s ? e : n;
      return u && r.add(c), f.add(c), c;
    },
    /**
     * Cancel the provided callback from running on the next frame.
     */
    cancel: (c) => {
      n.delete(c), r.delete(c);
    },
    /**
     * Execute all schedule callbacks.
     */
    process: (c) => {
      if (o = c, s) {
        i = !0;
        return;
      }
      s = !0;
      const u = e;
      e = n, n = u, e.forEach(a), e.clear(), s = !1, i && (i = !1, l.process(c));
    }
  };
  return l;
}
const la = 40;
function Ni(t, e) {
  let n = !1, s = !0;
  const i = {
    delta: 0,
    timestamp: 0,
    isProcessing: !1
  }, r = () => n = !0, o = te.reduce((b, x) => (b[x] = aa(r), b), {}), { setup: a, read: l, resolveKeyframes: c, preUpdate: u, update: d, preRender: h, render: f, postRender: p } = o, m = () => {
    const b = pt.useManualTiming, x = b ? i.timestamp : performance.now();
    n = !1, b || (i.delta = s ? 1e3 / 60 : Math.max(Math.min(x - i.timestamp, la), 1)), i.timestamp = x, i.isProcessing = !0, a.process(i), l.process(i), c.process(i), u.process(i), d.process(i), h.process(i), f.process(i), p.process(i), i.isProcessing = !1, n && e && (s = !1, t(m));
  }, g = () => {
    n = !0, s = !0, i.isProcessing || t(m);
  };
  return { schedule: te.reduce((b, x) => {
    const S = o[x];
    return b[x] = (D, M = !1, A = !1) => (n || g(), S.schedule(D, M, A)), b;
  }, {}), cancel: (b) => {
    for (let x = 0; x < te.length; x++)
      o[te[x]].cancel(b);
  }, state: i, steps: o };
}
const { schedule: E, cancel: ct, state: W, steps: Ve } = /* @__PURE__ */ Ni(typeof requestAnimationFrame < "u" ? requestAnimationFrame : Z, !0);
let ie;
function ca() {
  ie = void 0;
}
const H = {
  now: () => (ie === void 0 && H.set(W.isProcessing || pt.useManualTiming ? W.timestamp : performance.now()), ie),
  set: (t) => {
    ie = t, queueMicrotask(ca);
  }
}, zi = (t) => (e) => typeof e == "string" && e.startsWith(t), Ui = /* @__PURE__ */ zi("--"), ua = /* @__PURE__ */ zi("var(--"), An = (t) => ua(t) ? da.test(t.split("/*")[0].trim()) : !1, da = /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu;
function Zn(t) {
  return typeof t != "string" ? !1 : t.split("/*")[0].includes("var(--");
}
const kt = {
  test: (t) => typeof t == "number",
  parse: parseFloat,
  transform: (t) => t
}, Kt = {
  ...kt,
  transform: (t) => rt(0, 1, t)
}, ee = {
  ...kt,
  default: 1
}, Nt = (t) => Math.round(t * 1e5) / 1e5, Cn = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu;
function ha(t) {
  return t == null;
}
const fa = /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu, Vn = (t, e) => (n) => !!(typeof n == "string" && fa.test(n) && n.startsWith(t) || e && !ha(n) && Object.prototype.hasOwnProperty.call(n, e)), Wi = (t, e, n) => (s) => {
  if (typeof s != "string")
    return s;
  const [i, r, o, a] = s.match(Cn);
  return {
    [t]: parseFloat(i),
    [e]: parseFloat(r),
    [n]: parseFloat(o),
    alpha: a !== void 0 ? parseFloat(a) : 1
  };
}, pa = (t) => rt(0, 255, t), Me = {
  ...kt,
  transform: (t) => Math.round(pa(t))
}, vt = {
  test: /* @__PURE__ */ Vn("rgb", "red"),
  parse: /* @__PURE__ */ Wi("red", "green", "blue"),
  transform: ({ red: t, green: e, blue: n, alpha: s = 1 }) => "rgba(" + Me.transform(t) + ", " + Me.transform(e) + ", " + Me.transform(n) + ", " + Nt(Kt.transform(s)) + ")"
};
function ma(t) {
  let e = "", n = "", s = "", i = "";
  return t.length > 5 ? (e = t.substring(1, 3), n = t.substring(3, 5), s = t.substring(5, 7), i = t.substring(7, 9)) : (e = t.substring(1, 2), n = t.substring(2, 3), s = t.substring(3, 4), i = t.substring(4, 5), e += e, n += n, s += s, i += i), {
    red: parseInt(e, 16),
    green: parseInt(n, 16),
    blue: parseInt(s, 16),
    alpha: i ? parseInt(i, 16) / 255 : 1
  };
}
const Ke = {
  test: /* @__PURE__ */ Vn("#"),
  parse: ma,
  transform: vt.transform
}, Jt = /* @__NO_SIDE_EFFECTS__ */ (t) => ({
  test: (e) => typeof e == "string" && e.endsWith(t) && e.split(" ").length === 1,
  parse: parseFloat,
  transform: (e) => `${e}${t}`
}), lt = /* @__PURE__ */ Jt("deg"), ot = /* @__PURE__ */ Jt("%"), w = /* @__PURE__ */ Jt("px"), ga = /* @__PURE__ */ Jt("vh"), ya = /* @__PURE__ */ Jt("vw"), Jn = {
  ...ot,
  parse: (t) => ot.parse(t) / 100,
  transform: (t) => ot.transform(t * 100)
}, Ct = {
  test: /* @__PURE__ */ Vn("hsl", "hue"),
  parse: /* @__PURE__ */ Wi("hue", "saturation", "lightness"),
  transform: ({ hue: t, saturation: e, lightness: n, alpha: s = 1 }) => "hsla(" + Math.round(t) + ", " + ot.transform(Nt(e)) + ", " + ot.transform(Nt(n)) + ", " + Nt(Kt.transform(s)) + ")"
}, O = {
  test: (t) => vt.test(t) || Ke.test(t) || Ct.test(t),
  parse: (t) => vt.test(t) ? vt.parse(t) : Ct.test(t) ? Ct.parse(t) : Ke.parse(t),
  transform: (t) => typeof t == "string" ? t : t.hasOwnProperty("red") ? vt.transform(t) : Ct.transform(t),
  getAnimatableNone: (t) => {
    const e = O.parse(t);
    return e.alpha = 0, O.transform(e);
  }
}, va = /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;
function ba(t) {
  var e, n;
  return isNaN(t) && typeof t == "string" && (((e = t.match(Cn)) == null ? void 0 : e.length) || 0) + (((n = t.match(va)) == null ? void 0 : n.length) || 0) > 0;
}
const Gi = "number", $i = "color", xa = "var", wa = "var(", Qn = "${}", Ta = /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
function Dt(t) {
  const e = t.toString(), n = [], s = {
    color: [],
    number: [],
    var: []
  }, i = [];
  let r = 0;
  const a = e.replace(Ta, (l) => (O.test(l) ? (s.color.push(r), i.push($i), n.push(O.parse(l))) : l.startsWith(wa) ? (s.var.push(r), i.push(xa), n.push(l)) : (s.number.push(r), i.push(Gi), n.push(parseFloat(l))), ++r, Qn)).split(Qn);
  return { values: n, split: a, indexes: s, types: i };
}
function Sa(t) {
  return Dt(t).values;
}
function Ki({ split: t, types: e }) {
  const n = t.length;
  return (s) => {
    let i = "";
    for (let r = 0; r < n; r++)
      if (i += t[r], s[r] !== void 0) {
        const o = e[r];
        o === Gi ? i += Nt(s[r]) : o === $i ? i += O.transform(s[r]) : i += s[r];
      }
    return i;
  };
}
function Pa(t) {
  return Ki(Dt(t));
}
const Aa = (t) => typeof t == "number" ? 0 : O.test(t) ? O.getAnimatableNone(t) : t, Ca = (t, e) => typeof t == "number" ? e != null && e.trim().endsWith("/") ? t : 0 : Aa(t);
function Va(t) {
  const e = Dt(t);
  return Ki(e)(e.values.map((s, i) => Ca(s, e.split[i])));
}
const tt = {
  test: ba,
  parse: Sa,
  createTransformer: Pa,
  getAnimatableNone: Va
};
function Ee(t, e, n) {
  return n < 0 && (n += 1), n > 1 && (n -= 1), n < 1 / 6 ? t + (e - t) * 6 * n : n < 1 / 2 ? e : n < 2 / 3 ? t + (e - t) * (2 / 3 - n) * 6 : t;
}
function Ma({ hue: t, saturation: e, lightness: n, alpha: s }) {
  t /= 360, e /= 100, n /= 100;
  let i = 0, r = 0, o = 0;
  if (!e)
    i = r = o = n;
  else {
    const a = n < 0.5 ? n * (1 + e) : n + e - n * e, l = 2 * n - a;
    i = Ee(l, a, t + 1 / 3), r = Ee(l, a, t), o = Ee(l, a, t - 1 / 3);
  }
  return {
    red: Math.round(i * 255),
    green: Math.round(r * 255),
    blue: Math.round(o * 255),
    alpha: s
  };
}
function he(t, e) {
  return (n) => n > 0 ? e : t;
}
const R = (t, e, n) => t + (e - t) * n, De = (t, e, n) => {
  const s = t * t, i = n * (e * e - s) + s;
  return i < 0 ? 0 : Math.sqrt(i);
}, Ea = [Ke, vt, Ct], Da = (t) => Ea.find((e) => e.test(t));
function ts(t) {
  const e = Da(t);
  if (Yt(!!e, `'${t}' is not an animatable color. Use the equivalent color code instead.`, "color-not-animatable"), !e)
    return !1;
  let n = e.parse(t);
  return e === Ct && (n = Ma(n)), n;
}
const es = (t, e) => {
  const n = ts(t), s = ts(e);
  if (!n || !s)
    return he(t, e);
  const i = { ...n };
  return (r) => (i.red = De(n.red, s.red, r), i.green = De(n.green, s.green, r), i.blue = De(n.blue, s.blue, r), i.alpha = R(n.alpha, s.alpha, r), vt.transform(i));
}, He = /* @__PURE__ */ new Set(["none", "hidden"]);
function Ra(t, e) {
  return He.has(t) ? (n) => n <= 0 ? t : e : (n) => n >= 1 ? e : t;
}
function ka(t, e) {
  return (n) => R(t, e, n);
}
function Mn(t) {
  return typeof t == "number" ? ka : typeof t == "string" ? An(t) ? he : O.test(t) ? es : Ba : Array.isArray(t) ? Hi : typeof t == "object" ? O.test(t) ? es : La : he;
}
function Hi(t, e) {
  const n = [...t], s = n.length, i = t.map((r, o) => Mn(r)(r, e[o]));
  return (r) => {
    for (let o = 0; o < s; o++)
      n[o] = i[o](r);
    return n;
  };
}
function La(t, e) {
  const n = { ...t, ...e }, s = {};
  for (const i in n)
    t[i] !== void 0 && e[i] !== void 0 && (s[i] = Mn(t[i])(t[i], e[i]));
  return (i) => {
    for (const r in s)
      n[r] = s[r](i);
    return n;
  };
}
function Ia(t, e) {
  const n = [], s = { color: 0, var: 0, number: 0 };
  for (let i = 0; i < e.values.length; i++) {
    const r = e.types[i], o = t.indexes[r][s[r]], a = t.values[o] ?? 0;
    n[i] = a, s[r]++;
  }
  return n;
}
const Ba = (t, e) => {
  const n = tt.createTransformer(e), s = Dt(t), i = Dt(e);
  return s.indexes.var.length === i.indexes.var.length && s.indexes.color.length === i.indexes.color.length && s.indexes.number.length >= i.indexes.number.length ? He.has(t) && !i.values.length || He.has(e) && !s.values.length ? Ra(t, e) : qt(Hi(Ia(s, i), i.values), n) : (Yt(!0, `Complex values '${t}' and '${e}' too different to mix. Ensure all colors are of the same type, and that each contains the same quantity of number and color values. Falling back to instant transition.`, "complex-values-different"), he(t, e));
};
function _i(t, e, n) {
  return typeof t == "number" && typeof e == "number" && typeof n == "number" ? R(t, e, n) : Mn(t)(t, e);
}
const Fa = (t) => {
  const e = ({ timestamp: n }) => t(n);
  return {
    start: (n = !0) => E.update(e, n),
    stop: () => ct(e),
    /**
     * If we're processing this frame we can use the
     * framelocked timestamp to keep things in sync.
     */
    now: () => W.isProcessing ? W.timestamp : H.now()
  };
}, Xi = (t, e, n = 10) => {
  let s = "";
  const i = Math.max(Math.round(e / n), 2);
  for (let r = 0; r < i; r++)
    s += Math.round(t(r / (i - 1)) * 1e4) / 1e4 + ", ";
  return `linear(${s.substring(0, s.length - 2)})`;
}, fe = 2e4;
function En(t) {
  let e = 0;
  const n = 50;
  let s = t.next(e);
  for (; !s.done && e < fe; )
    e += n, s = t.next(e);
  return e >= fe ? 1 / 0 : e;
}
function ja(t, e = 100, n) {
  const s = n({ ...t, keyframes: [0, e] }), i = Math.min(En(s), fe);
  return {
    type: "keyframes",
    ease: (r) => s.next(i * r).value / e,
    duration: /* @__PURE__ */ q(i)
  };
}
const I = {
  // Default spring physics
  stiffness: 100,
  damping: 10,
  mass: 1,
  velocity: 0,
  // Default duration/bounce-based options
  duration: 800,
  // in ms
  bounce: 0.3,
  visualDuration: 0.3,
  // in seconds
  // Rest thresholds
  restSpeed: {
    granular: 0.01,
    default: 2
  },
  restDelta: {
    granular: 5e-3,
    default: 0.5
  },
  // Limits
  minDuration: 0.01,
  // in seconds
  maxDuration: 10,
  // in seconds
  minDamping: 0.05,
  maxDamping: 1
};
function _e(t, e) {
  return t * Math.sqrt(1 - e * e);
}
const Oa = 12;
function Na(t, e, n) {
  let s = n;
  for (let i = 1; i < Oa; i++)
    s = s - t(s) / e(s);
  return s;
}
const Re = 1e-3;
function za({ duration: t = I.duration, bounce: e = I.bounce, velocity: n = I.velocity, mass: s = I.mass }) {
  let i, r;
  Yt(t <= /* @__PURE__ */ X(I.maxDuration), "Spring duration must be 10 seconds or less", "spring-duration-limit");
  let o = 1 - e;
  o = rt(I.minDamping, I.maxDamping, o), t = rt(I.minDuration, I.maxDuration, /* @__PURE__ */ q(t)), o < 1 ? (i = (c) => {
    const u = c * o, d = u * t, h = u - n, f = _e(c, o), p = Math.exp(-d);
    return Re - h / f * p;
  }, r = (c) => {
    const d = c * o * t, h = d * n + n, f = Math.pow(o, 2) * Math.pow(c, 2) * t, p = Math.exp(-d), m = _e(Math.pow(c, 2), o);
    return (-i(c) + Re > 0 ? -1 : 1) * ((h - f) * p) / m;
  }) : (i = (c) => {
    const u = Math.exp(-c * t), d = (c - n) * t + 1;
    return -Re + u * d;
  }, r = (c) => {
    const u = Math.exp(-c * t), d = (n - c) * (t * t);
    return u * d;
  });
  const a = 5 / t, l = Na(i, r, a);
  if (t = /* @__PURE__ */ X(t), isNaN(l))
    return {
      stiffness: I.stiffness,
      damping: I.damping,
      duration: t
    };
  {
    const c = Math.pow(l, 2) * s;
    return {
      stiffness: c,
      damping: o * 2 * Math.sqrt(s * c),
      duration: t
    };
  }
}
const Ua = ["duration", "bounce"], Wa = ["stiffness", "damping", "mass"];
function ns(t, e) {
  return e.some((n) => t[n] !== void 0);
}
function Ga(t) {
  let e = {
    velocity: I.velocity,
    stiffness: I.stiffness,
    damping: I.damping,
    mass: I.mass,
    isResolvedFromDuration: !1,
    ...t
  };
  if (!ns(t, Wa) && ns(t, Ua))
    if (e.velocity = 0, t.visualDuration) {
      const n = t.visualDuration, s = 2 * Math.PI / (n * 1.2), i = s * s, r = 2 * rt(0.05, 1, 1 - (t.bounce || 0)) * Math.sqrt(i);
      e = {
        ...e,
        mass: I.mass,
        stiffness: i,
        damping: r
      };
    } else {
      const n = za({ ...t, velocity: 0 });
      e = {
        ...e,
        ...n,
        mass: I.mass
      }, e.isResolvedFromDuration = !0;
    }
  return e;
}
function pe(t = I.visualDuration, e = I.bounce) {
  const n = typeof t != "object" ? {
    visualDuration: t,
    keyframes: [0, 1],
    bounce: e
  } : t;
  let { restSpeed: s, restDelta: i } = n;
  const r = n.keyframes[0], o = n.keyframes[n.keyframes.length - 1], a = { done: !1, value: r }, { stiffness: l, damping: c, mass: u, duration: d, velocity: h, isResolvedFromDuration: f } = Ga({
    ...n,
    velocity: -/* @__PURE__ */ q(n.velocity || 0)
  }), p = h || 0, m = c / (2 * Math.sqrt(l * u)), g = o - r, y = /* @__PURE__ */ q(Math.sqrt(l / u)), v = Math.abs(g) < 5;
  s || (s = v ? I.restSpeed.granular : I.restSpeed.default), i || (i = v ? I.restDelta.granular : I.restDelta.default);
  let b, x, S, D, M, A;
  if (m < 1)
    S = _e(y, m), D = (p + m * y * g) / S, b = (P) => {
      const L = Math.exp(-m * y * P);
      return o - L * (D * Math.sin(S * P) + g * Math.cos(S * P));
    }, M = m * y * D + g * S, A = m * y * g - D * S, x = (P) => Math.exp(-m * y * P) * (M * Math.sin(S * P) + A * Math.cos(S * P));
  else if (m === 1) {
    b = (L) => o - Math.exp(-y * L) * (g + (p + y * g) * L);
    const P = p + y * g;
    x = (L) => Math.exp(-y * L) * (y * P * L - p);
  } else {
    const P = y * Math.sqrt(m * m - 1);
    b = ($) => {
      const Y = Math.exp(-m * y * $), K = Math.min(P * $, 300);
      return o - Y * ((p + m * y * g) * Math.sinh(K) + P * g * Math.cosh(K)) / P;
    };
    const L = (p + m * y * g) / P, V = m * y * L - g * P, et = m * y * g - L * P;
    x = ($) => {
      const Y = Math.exp(-m * y * $), K = Math.min(P * $, 300);
      return Y * (V * Math.sinh(K) + et * Math.cosh(K));
    };
  }
  const B = {
    calculatedDuration: f && d || null,
    velocity: (P) => /* @__PURE__ */ X(x(P)),
    next: (P) => {
      if (!f && m < 1) {
        const V = Math.exp(-m * y * P), et = Math.sin(S * P), $ = Math.cos(S * P), Y = o - V * (D * et + g * $), K = /* @__PURE__ */ X(V * (M * et + A * $));
        return a.done = Math.abs(K) <= s && Math.abs(o - Y) <= i, a.value = a.done ? o : Y, a;
      }
      const L = b(P);
      if (f)
        a.done = P >= d;
      else {
        const V = /* @__PURE__ */ X(x(P));
        a.done = Math.abs(V) <= s && Math.abs(o - L) <= i;
      }
      return a.value = a.done ? o : L, a;
    },
    toString: () => {
      const P = Math.min(En(B), fe), L = Xi((V) => B.next(P * V).value, P, 30);
      return P + "ms " + L;
    },
    toTransition: () => {
    }
  };
  return B;
}
pe.applyToOptions = (t) => {
  const e = ja(t, 100, pe);
  return t.ease = e.ease, t.duration = /* @__PURE__ */ X(e.duration), t.type = "keyframes", t;
};
const $a = 5;
function Yi(t, e, n) {
  const s = Math.max(e - $a, 0);
  return /* @__PURE__ */ Mi(n - t(s), e - s);
}
function Xe({ keyframes: t, velocity: e = 0, power: n = 0.8, timeConstant: s = 325, bounceDamping: i = 10, bounceStiffness: r = 500, modifyTarget: o, min: a, max: l, restDelta: c = 0.5, restSpeed: u }) {
  const d = t[0], h = {
    done: !1,
    value: d
  }, f = (A) => a !== void 0 && A < a || l !== void 0 && A > l, p = (A) => a === void 0 ? l : l === void 0 || Math.abs(a - A) < Math.abs(l - A) ? a : l;
  let m = n * e;
  const g = d + m, y = o === void 0 ? g : o(g);
  y !== g && (m = y - d);
  const v = (A) => -m * Math.exp(-A / s), b = (A) => y + v(A), x = (A) => {
    const B = v(A), P = b(A);
    h.done = Math.abs(B) <= c, h.value = h.done ? y : P;
  };
  let S, D;
  const M = (A) => {
    f(h.value) && (S = A, D = pe({
      keyframes: [h.value, p(h.value)],
      velocity: Yi(b, A, h.value),
      // TODO: This should be passing * 1000
      damping: i,
      stiffness: r,
      restDelta: c,
      restSpeed: u
    }));
  };
  return M(0), {
    calculatedDuration: null,
    next: (A) => {
      let B = !1;
      return !D && S === void 0 && (B = !0, x(A), M(A)), S !== void 0 && A >= S ? D.next(A - S) : (!B && x(A), h);
    }
  };
}
function Ka(t, e, n) {
  const s = [], i = n || pt.mix || _i, r = t.length - 1;
  for (let o = 0; o < r; o++) {
    let a = i(t[o], t[o + 1]);
    if (e) {
      const l = Array.isArray(e) ? e[o] || Z : e;
      a = qt(l, a);
    }
    s.push(a);
  }
  return s;
}
function qi(t, e, { clamp: n = !0, ease: s, mixer: i } = {}) {
  const r = t.length;
  if (Tt(r === e.length, "Both input and output ranges must be the same length", "range-length"), r === 1)
    return () => e[0];
  if (r === 2 && e[0] === e[1])
    return () => e[1];
  const o = t[0] === t[1];
  t[0] > t[r - 1] && (t = [...t].reverse(), e = [...e].reverse());
  const a = Ka(e, s, i), l = a.length, c = (u) => {
    if (o && u < t[0])
      return e[0];
    let d = 0;
    if (l > 1)
      for (; d < t.length - 2 && !(u < t[d + 1]); d++)
        ;
    const h = /* @__PURE__ */ $t(t[d], t[d + 1], u);
    return a[d](h);
  };
  return n ? (u) => c(rt(t[0], t[r - 1], u)) : c;
}
function Ha(t, e) {
  const n = t[t.length - 1];
  for (let s = 1; s <= e; s++) {
    const i = /* @__PURE__ */ $t(0, e, s);
    t.push(R(n, 1, i));
  }
}
function _a(t) {
  const e = [0];
  return Ha(e, t.length - 1), e;
}
function Xa(t, e) {
  return t.map((n) => n * e);
}
function Ya(t, e) {
  return t.map(() => e || ji).splice(0, t.length - 1);
}
function zt({ duration: t = 300, keyframes: e, times: n, ease: s = "easeInOut" }) {
  const i = /* @__PURE__ */ oa(s) ? s.map(qn) : qn(s), r = {
    done: !1,
    value: e[0]
  }, o = Xa(
    // Only use the provided offsets if they're the correct length
    // TODO Maybe we should warn here if there's a length mismatch
    n && n.length === e.length ? n : _a(e),
    t
  ), a = qi(o, e, {
    ease: Array.isArray(i) ? i : Ya(e, i)
  });
  return {
    calculatedDuration: t,
    next: (l) => (r.value = a(l), r.done = l >= t, r)
  };
}
const qa = (t) => t !== null;
function xe(t, { repeat: e, repeatType: n = "loop" }, s, i = 1) {
  const r = t.filter(qa), a = i < 0 || e && n !== "loop" && e % 2 === 1 ? 0 : r.length - 1;
  return !a || s === void 0 ? r[a] : s;
}
const Za = {
  decay: Xe,
  inertia: Xe,
  tween: zt,
  keyframes: zt,
  spring: pe
};
function Zi(t) {
  typeof t.type == "string" && (t.type = Za[t.type]);
}
class Dn {
  constructor() {
    this.updateFinished();
  }
  get finished() {
    return this._finished;
  }
  updateFinished() {
    this._finished = new Promise((e) => {
      this.resolve = e;
    });
  }
  notifyFinished() {
    this.resolve();
  }
  /**
   * Allows the animation to be awaited.
   *
   * @deprecated Use `finished` instead.
   */
  then(e, n) {
    return this.finished.then(e, n);
  }
}
const Ja = (t) => t / 100;
class Ht extends Dn {
  constructor(e) {
    super(), this.state = "idle", this.startTime = null, this.isStopped = !1, this.currentTime = 0, this.holdTime = null, this.playbackSpeed = 1, this.delayState = {
      done: !1,
      value: void 0
    }, this.stop = () => {
      var s, i;
      const { motionValue: n } = this.options;
      n && n.updatedAt !== H.now() && this.tick(H.now()), this.isStopped = !0, this.state !== "idle" && (this.teardown(), (i = (s = this.options).onStop) == null || i.call(s));
    }, this.options = e, this.initAnimation(), this.play(), e.autoplay === !1 && this.pause();
  }
  initAnimation() {
    const { options: e } = this;
    Zi(e);
    const { type: n = zt, repeat: s = 0, repeatDelay: i = 0, repeatType: r, velocity: o = 0 } = e;
    let { keyframes: a } = e;
    const l = n || zt;
    l !== zt && typeof a[0] != "number" && (this.mixKeyframes = qt(Ja, _i(a[0], a[1])), a = [0, 100]);
    const c = l({ ...e, keyframes: a });
    r === "mirror" && (this.mirroredGenerator = l({
      ...e,
      keyframes: [...a].reverse(),
      velocity: -o
    })), c.calculatedDuration === null && (c.calculatedDuration = En(c));
    const { calculatedDuration: u } = c;
    this.calculatedDuration = u, this.resolvedDuration = u + i, this.totalDuration = this.resolvedDuration * (s + 1) - i, this.generator = c;
  }
  updateTime(e) {
    const n = Math.round(e - this.startTime) * this.playbackSpeed;
    this.holdTime !== null ? this.currentTime = this.holdTime : this.currentTime = n;
  }
  tick(e, n = !1) {
    const { generator: s, totalDuration: i, mixKeyframes: r, mirroredGenerator: o, resolvedDuration: a, calculatedDuration: l } = this;
    if (this.startTime === null)
      return s.next(0);
    const { delay: c = 0, keyframes: u, repeat: d, repeatType: h, repeatDelay: f, type: p, onUpdate: m, finalKeyframe: g } = this.options;
    this.speed > 0 ? this.startTime = Math.min(this.startTime, e) : this.speed < 0 && (this.startTime = Math.min(e - i / this.speed, this.startTime)), n ? this.currentTime = e : this.updateTime(e);
    const y = this.currentTime - c * (this.playbackSpeed >= 0 ? 1 : -1), v = this.playbackSpeed >= 0 ? y < 0 : y > i;
    this.currentTime = Math.max(y, 0), this.state === "finished" && this.holdTime === null && (this.currentTime = i);
    let b = this.currentTime, x = s;
    if (d) {
      const A = Math.min(this.currentTime, i) / a;
      let B = Math.floor(A), P = A % 1;
      !P && A >= 1 && (P = 1), P === 1 && B--, B = Math.min(B, d + 1), !!(B % 2) && (h === "reverse" ? (P = 1 - P, f && (P -= f / a)) : h === "mirror" && (x = o)), b = rt(0, 1, P) * a;
    }
    let S;
    v ? (this.delayState.value = u[0], S = this.delayState) : S = x.next(b), r && !v && (S.value = r(S.value));
    let { done: D } = S;
    !v && l !== null && (D = this.playbackSpeed >= 0 ? this.currentTime >= i : this.currentTime <= 0);
    const M = this.holdTime === null && (this.state === "finished" || this.state === "running" && D);
    return M && p !== Xe && (S.value = xe(u, this.options, g, this.speed)), m && m(S.value), M && this.finish(), S;
  }
  /**
   * Allows the returned animation to be awaited or promise-chained. Currently
   * resolves when the animation finishes at all but in a future update could/should
   * reject if its cancels.
   */
  then(e, n) {
    return this.finished.then(e, n);
  }
  get duration() {
    return /* @__PURE__ */ q(this.calculatedDuration);
  }
  get iterationDuration() {
    const { delay: e = 0 } = this.options || {};
    return this.duration + /* @__PURE__ */ q(e);
  }
  get time() {
    return /* @__PURE__ */ q(this.currentTime);
  }
  set time(e) {
    e = /* @__PURE__ */ X(e), this.currentTime = e, this.startTime === null || this.holdTime !== null || this.playbackSpeed === 0 ? this.holdTime = e : this.driver && (this.startTime = this.driver.now() - e / this.playbackSpeed), this.driver ? this.driver.start(!1) : (this.startTime = 0, this.state = "paused", this.holdTime = e, this.tick(e));
  }
  /**
   * Returns the generator's velocity at the current time in units/second.
   * Uses the analytical derivative when available (springs), avoiding
   * the MotionValue's frame-dependent velocity estimation.
   */
  getGeneratorVelocity() {
    const e = this.currentTime;
    if (e <= 0)
      return this.options.velocity || 0;
    if (this.generator.velocity)
      return this.generator.velocity(e);
    const n = this.generator.next(e).value;
    return Yi((s) => this.generator.next(s).value, e, n);
  }
  get speed() {
    return this.playbackSpeed;
  }
  set speed(e) {
    const n = this.playbackSpeed !== e;
    n && this.driver && this.updateTime(H.now()), this.playbackSpeed = e, n && this.driver && (this.time = /* @__PURE__ */ q(this.currentTime));
  }
  play() {
    var i, r;
    if (this.isStopped)
      return;
    const { driver: e = Fa, startTime: n } = this.options;
    this.driver || (this.driver = e((o) => this.tick(o))), (r = (i = this.options).onPlay) == null || r.call(i);
    const s = this.driver.now();
    this.state === "finished" ? (this.updateFinished(), this.startTime = s) : this.holdTime !== null ? this.startTime = s - this.holdTime : this.startTime || (this.startTime = n ?? s), this.state === "finished" && this.speed < 0 && (this.startTime += this.calculatedDuration), this.holdTime = null, this.state = "running", this.driver.start();
  }
  pause() {
    this.state = "paused", this.updateTime(H.now()), this.holdTime = this.currentTime;
  }
  complete() {
    this.state !== "running" && this.play(), this.state = "finished", this.holdTime = null;
  }
  finish() {
    var e, n;
    this.notifyFinished(), this.teardown(), this.state = "finished", (n = (e = this.options).onComplete) == null || n.call(e);
  }
  cancel() {
    var e, n;
    this.holdTime = null, this.startTime = 0, this.tick(0), this.teardown(), (n = (e = this.options).onCancel) == null || n.call(e);
  }
  teardown() {
    this.state = "idle", this.stopDriver(), this.startTime = this.holdTime = null;
  }
  stopDriver() {
    this.driver && (this.driver.stop(), this.driver = void 0);
  }
  sample(e) {
    return this.startTime = 0, this.tick(e, !0);
  }
  attachTimeline(e) {
    var n;
    return this.options.allowFlatten && (this.options.type = "keyframes", this.options.ease = "linear", this.initAnimation()), (n = this.driver) == null || n.stop(), e.observe(this);
  }
}
function Qa(t) {
  for (let e = 1; e < t.length; e++)
    t[e] ?? (t[e] = t[e - 1]);
}
const bt = (t) => t * 180 / Math.PI, Ye = (t) => {
  const e = bt(Math.atan2(t[1], t[0]));
  return qe(e);
}, tl = {
  x: 4,
  y: 5,
  translateX: 4,
  translateY: 5,
  scaleX: 0,
  scaleY: 3,
  scale: (t) => (Math.abs(t[0]) + Math.abs(t[3])) / 2,
  rotate: Ye,
  rotateZ: Ye,
  skewX: (t) => bt(Math.atan(t[1])),
  skewY: (t) => bt(Math.atan(t[2])),
  skew: (t) => (Math.abs(t[1]) + Math.abs(t[2])) / 2
}, qe = (t) => (t = t % 360, t < 0 && (t += 360), t), ss = Ye, is = (t) => Math.sqrt(t[0] * t[0] + t[1] * t[1]), os = (t) => Math.sqrt(t[4] * t[4] + t[5] * t[5]), el = {
  x: 12,
  y: 13,
  z: 14,
  translateX: 12,
  translateY: 13,
  translateZ: 14,
  scaleX: is,
  scaleY: os,
  scale: (t) => (is(t) + os(t)) / 2,
  rotateX: (t) => qe(bt(Math.atan2(t[6], t[5]))),
  rotateY: (t) => qe(bt(Math.atan2(-t[2], t[0]))),
  rotateZ: ss,
  rotate: ss,
  skewX: (t) => bt(Math.atan(t[4])),
  skewY: (t) => bt(Math.atan(t[1])),
  skew: (t) => (Math.abs(t[1]) + Math.abs(t[4])) / 2
};
function Ze(t) {
  return t.includes("scale") ? 1 : 0;
}
function Je(t, e) {
  if (!t || t === "none")
    return Ze(e);
  const n = t.match(/^matrix3d\(([-\d.e\s,]+)\)$/u);
  let s, i;
  if (n)
    s = el, i = n;
  else {
    const a = t.match(/^matrix\(([-\d.e\s,]+)\)$/u);
    s = tl, i = a;
  }
  if (!i)
    return Ze(e);
  const r = s[e], o = i[1].split(",").map(sl);
  return typeof r == "function" ? r(o) : o[r];
}
const nl = (t, e) => {
  const { transform: n = "none" } = getComputedStyle(t);
  return Je(n, e);
};
function sl(t) {
  return parseFloat(t.trim());
}
const Lt = [
  "transformPerspective",
  "x",
  "y",
  "z",
  "translateX",
  "translateY",
  "translateZ",
  "scale",
  "scaleX",
  "scaleY",
  "rotate",
  "rotateX",
  "rotateY",
  "rotateZ",
  "skew",
  "skewX",
  "skewY"
], It = /* @__PURE__ */ new Set([...Lt, "pathRotation"]), rs = (t) => t === kt || t === w, il = /* @__PURE__ */ new Set(["x", "y", "z"]), ol = Lt.filter((t) => !il.has(t));
function rl(t) {
  const e = [];
  return ol.forEach((n) => {
    const s = t.getValue(n);
    s !== void 0 && (e.push([n, s.get()]), s.set(n.startsWith("scale") ? 1 : 0));
  }), e;
}
const ft = {
  // Dimensions
  width: ({ x: t }, { paddingLeft: e = "0", paddingRight: n = "0", boxSizing: s }) => {
    const i = t.max - t.min;
    return s === "border-box" ? i : i - parseFloat(e) - parseFloat(n);
  },
  height: ({ y: t }, { paddingTop: e = "0", paddingBottom: n = "0", boxSizing: s }) => {
    const i = t.max - t.min;
    return s === "border-box" ? i : i - parseFloat(e) - parseFloat(n);
  },
  top: (t, { top: e }) => parseFloat(e),
  left: (t, { left: e }) => parseFloat(e),
  bottom: ({ y: t }, { top: e }) => parseFloat(e) + (t.max - t.min),
  right: ({ x: t }, { left: e }) => parseFloat(e) + (t.max - t.min),
  // Transform
  x: (t, { transform: e }) => Je(e, "x"),
  y: (t, { transform: e }) => Je(e, "y")
};
ft.translateX = ft.x;
ft.translateY = ft.y;
const xt = /* @__PURE__ */ new Set();
let Qe = !1, tn = !1, en = !1;
function Ji() {
  if (tn) {
    const t = Array.from(xt).filter((s) => s.needsMeasurement), e = new Set(t.map((s) => s.element)), n = /* @__PURE__ */ new Map();
    e.forEach((s) => {
      const i = rl(s);
      i.length && (n.set(s, i), s.render());
    }), t.forEach((s) => s.measureInitialState()), e.forEach((s) => {
      s.render();
      const i = n.get(s);
      i && i.forEach(([r, o]) => {
        var a;
        (a = s.getValue(r)) == null || a.set(o);
      });
    }), t.forEach((s) => s.measureEndState()), t.forEach((s) => {
      s.suspendedScrollY !== void 0 && window.scrollTo(0, s.suspendedScrollY);
    });
  }
  tn = !1, Qe = !1, xt.forEach((t) => t.complete(en)), xt.clear();
}
function Qi() {
  xt.forEach((t) => {
    t.readKeyframes(), t.needsMeasurement && (tn = !0);
  });
}
function al() {
  en = !0, Qi(), Ji(), en = !1;
}
class Rn {
  constructor(e, n, s, i, r, o = !1) {
    this.state = "pending", this.isAsync = !1, this.needsMeasurement = !1, this.unresolvedKeyframes = [...e], this.onComplete = n, this.name = s, this.motionValue = i, this.element = r, this.isAsync = o;
  }
  scheduleResolve() {
    this.state = "scheduled", this.isAsync ? (xt.add(this), Qe || (Qe = !0, E.read(Qi), E.resolveKeyframes(Ji))) : (this.readKeyframes(), this.complete());
  }
  readKeyframes() {
    const { unresolvedKeyframes: e, name: n, element: s, motionValue: i } = this;
    if (e[0] === null) {
      const r = i == null ? void 0 : i.get(), o = e[e.length - 1];
      if (r !== void 0)
        e[0] = r;
      else if (s && n) {
        const a = s.readValue(n, o);
        a != null && (e[0] = a);
      }
      e[0] === void 0 && (e[0] = o), i && r === void 0 && i.set(e[0]);
    }
    Qa(e);
  }
  setFinalKeyframe() {
  }
  measureInitialState() {
  }
  renderEndStyles() {
  }
  measureEndState() {
  }
  complete(e = !1) {
    this.state = "complete", this.onComplete(this.unresolvedKeyframes, this.finalKeyframe, e), xt.delete(this);
  }
  cancel() {
    this.state === "scheduled" && (xt.delete(this), this.state = "pending");
  }
  resume() {
    this.state === "pending" && this.scheduleResolve();
  }
}
const ll = (t) => t.startsWith("--");
function to(t, e, n) {
  ll(e) ? t.style.setProperty(e, n) : t.style[e] = n;
}
const cl = {};
function eo(t, e) {
  const n = /* @__PURE__ */ Vi(t);
  return () => cl[e] ?? n();
}
const ul = /* @__PURE__ */ eo(() => window.ScrollTimeline !== void 0, "scrollTimeline"), no = /* @__PURE__ */ eo(() => {
  try {
    document.createElement("div").animate({ opacity: 0 }, { easing: "linear(0, 1)" });
  } catch {
    return !1;
  }
  return !0;
}, "linearEasing"), Ot = ([t, e, n, s]) => `cubic-bezier(${t}, ${e}, ${n}, ${s})`, as = {
  linear: "linear",
  ease: "ease",
  easeIn: "ease-in",
  easeOut: "ease-out",
  easeInOut: "ease-in-out",
  circIn: /* @__PURE__ */ Ot([0, 0.65, 0.55, 1]),
  circOut: /* @__PURE__ */ Ot([0.55, 0, 1, 0.45]),
  backIn: /* @__PURE__ */ Ot([0.31, 0.01, 0.66, -0.59]),
  backOut: /* @__PURE__ */ Ot([0.33, 1.53, 0.69, 0.99])
};
function so(t, e) {
  if (t)
    return typeof t == "function" ? no() ? Xi(t, e) : "ease-out" : /* @__PURE__ */ Oi(t) ? Ot(t) : Array.isArray(t) ? t.map((n) => so(n, e) || as.easeOut) : as[t];
}
function dl(t, e, n, { delay: s = 0, duration: i = 300, repeat: r = 0, repeatType: o = "loop", ease: a = "easeOut", times: l } = {}, c = void 0) {
  const u = {
    [e]: n
  };
  l && (u.offset = l);
  const d = so(a, i);
  Array.isArray(d) && (u.easing = d);
  const h = {
    delay: s,
    duration: i,
    easing: Array.isArray(d) ? "linear" : d,
    fill: "both",
    iterations: r + 1,
    direction: o === "reverse" ? "alternate" : "normal"
  };
  return c && (h.pseudoElement = c), t.animate(u, h);
}
function io(t) {
  return typeof t == "function" && "applyToOptions" in t;
}
function hl({ type: t, ...e }) {
  return io(t) && no() ? t.applyToOptions(e) : (e.duration ?? (e.duration = 300), e.ease ?? (e.ease = "easeOut"), e);
}
class oo extends Dn {
  constructor(e) {
    if (super(), this.finishedTime = null, this.isStopped = !1, this.manualStartTime = null, !e)
      return;
    const { element: n, name: s, keyframes: i, pseudoElement: r, allowFlatten: o = !1, finalKeyframe: a, onComplete: l } = e;
    this.isPseudoElement = !!r, this.allowFlatten = o, this.options = e, Tt(typeof e.type != "string", `Mini animate() doesn't support "type" as a string.`, "mini-spring");
    const c = hl(e);
    this.animation = dl(n, s, i, c, r), c.autoplay === !1 && this.animation.pause(), this.animation.onfinish = () => {
      if (this.finishedTime = this.time, !r) {
        const u = xe(i, this.options, a, this.speed);
        this.updateMotionValue && this.updateMotionValue(u), to(n, s, u), this.animation.cancel();
      }
      l == null || l(), this.notifyFinished();
    };
  }
  play() {
    this.isStopped || (this.manualStartTime = null, this.animation.play(), this.state === "finished" && this.updateFinished());
  }
  pause() {
    this.animation.pause();
  }
  complete() {
    var e, n;
    (n = (e = this.animation).finish) == null || n.call(e);
  }
  cancel() {
    try {
      this.animation.cancel();
    } catch {
    }
  }
  stop() {
    if (this.isStopped)
      return;
    this.isStopped = !0;
    const { state: e } = this;
    e === "idle" || e === "finished" || (this.updateMotionValue ? this.updateMotionValue() : this.commitStyles(), this.isPseudoElement || this.cancel());
  }
  /**
   * WAAPI doesn't natively have any interruption capabilities.
   *
   * In this method, we commit styles back to the DOM before cancelling
   * the animation.
   *
   * This is designed to be overridden by NativeAnimationExtended, which
   * will create a renderless JS animation and sample it twice to calculate
   * its current value, "previous" value, and therefore allow
   * Motion to also correctly calculate velocity for any subsequent animation
   * while deferring the commit until the next animation frame.
   */
  commitStyles() {
    var n, s, i;
    const e = (n = this.options) == null ? void 0 : n.element;
    !this.isPseudoElement && (e != null && e.isConnected) && ((i = (s = this.animation).commitStyles) == null || i.call(s));
  }
  get duration() {
    var n, s;
    const e = ((s = (n = this.animation.effect) == null ? void 0 : n.getComputedTiming) == null ? void 0 : s.call(n).duration) || 0;
    return /* @__PURE__ */ q(Number(e));
  }
  get iterationDuration() {
    const { delay: e = 0 } = this.options || {};
    return this.duration + /* @__PURE__ */ q(e);
  }
  get time() {
    return /* @__PURE__ */ q(Number(this.animation.currentTime) || 0);
  }
  set time(e) {
    const n = this.finishedTime !== null;
    this.manualStartTime = null, this.finishedTime = null, this.animation.currentTime = /* @__PURE__ */ X(e), n && this.animation.pause();
  }
  /**
   * The playback speed of the animation.
   * 1 = normal speed, 2 = double speed, 0.5 = half speed.
   */
  get speed() {
    return this.animation.playbackRate;
  }
  set speed(e) {
    e < 0 && (this.finishedTime = null), this.animation.playbackRate = e;
  }
  get state() {
    return this.finishedTime !== null ? "finished" : this.animation.playState;
  }
  get startTime() {
    return this.manualStartTime ?? Number(this.animation.startTime);
  }
  set startTime(e) {
    this.manualStartTime = this.animation.startTime = e;
  }
  /**
   * Attaches a timeline to the animation, for instance the `ScrollTimeline`.
   */
  attachTimeline({ timeline: e, rangeStart: n, rangeEnd: s, observe: i }) {
    var r;
    return this.allowFlatten && ((r = this.animation.effect) == null || r.updateTiming({ easing: "linear" })), this.animation.onfinish = null, e && ul() ? (this.animation.timeline = e, n && (this.animation.rangeStart = n), s && (this.animation.rangeEnd = s), Z) : i(this);
  }
}
const ro = {
  anticipate: Ii,
  backInOut: Li,
  circInOut: Fi
};
function fl(t) {
  return t in ro;
}
function pl(t) {
  typeof t.ease == "string" && fl(t.ease) && (t.ease = ro[t.ease]);
}
const ke = 10;
class ml extends oo {
  constructor(e) {
    pl(e), Zi(e), super(e), e.startTime !== void 0 && e.autoplay !== !1 && (this.startTime = e.startTime), this.options = e;
  }
  /**
   * WAAPI doesn't natively have any interruption capabilities.
   *
   * Rather than read committed styles back out of the DOM, we can
   * create a renderless JS animation and sample it twice to calculate
   * its current value, "previous" value, and therefore allow
   * Motion to calculate velocity for any subsequent animation.
   */
  updateMotionValue(e) {
    const { motionValue: n, onUpdate: s, onComplete: i, element: r, ...o } = this.options;
    if (!n)
      return;
    if (e !== void 0) {
      n.set(e);
      return;
    }
    const a = new Ht({
      ...o,
      autoplay: !1
    }), l = Math.max(ke, H.now() - this.startTime), c = rt(0, ke, l - ke), u = a.sample(l).value, { name: d } = this.options;
    r && d && to(r, d, u), n.setWithVelocity(a.sample(Math.max(0, l - c)).value, u, c), a.stop();
  }
}
const ls = (t, e) => e === "zIndex" ? !1 : !!(typeof t == "number" || Array.isArray(t) || typeof t == "string" && // It's animatable if we have a string
(tt.test(t) || t === "0") && // And it contains numbers and/or colors
!t.startsWith("url("));
function gl(t) {
  const e = t[0];
  if (t.length === 1)
    return !0;
  for (let n = 0; n < t.length; n++)
    if (t[n] !== e)
      return !0;
}
function yl(t, e, n, s) {
  const i = t[0];
  if (i === null)
    return !1;
  if (e === "display" || e === "visibility")
    return !0;
  const r = t[t.length - 1], o = ls(i, e), a = ls(r, e);
  return Yt(o === a, `You are trying to animate ${e} from "${i}" to "${r}". "${o ? r : i}" is not an animatable value.`, "value-not-animatable"), !o || !a ? !1 : gl(t) || (n === "spring" || io(n)) && s;
}
function nn(t) {
  t.duration = 0, t.type = "keyframes";
}
const ao = /* @__PURE__ */ new Set([
  "opacity",
  "clipPath",
  "filter",
  "transform"
  // TODO: Can be accelerated but currently disabled until https://issues.chromium.org/issues/41491098 is resolved
  // or until we implement support for linear() easing.
  // "background-color"
]), vl = /^(?:oklch|oklab|lab|lch|color|color-mix|light-dark)\(/;
function bl(t) {
  for (let e = 0; e < t.length; e++)
    if (typeof t[e] == "string" && vl.test(t[e]))
      return !0;
  return !1;
}
const xl = /* @__PURE__ */ new Set([
  "color",
  "backgroundColor",
  "outlineColor",
  "fill",
  "stroke",
  "borderColor",
  "borderTopColor",
  "borderRightColor",
  "borderBottomColor",
  "borderLeftColor"
]), wl = /* @__PURE__ */ Vi(() => Object.hasOwnProperty.call(Element.prototype, "animate"));
function Tl(t) {
  var d;
  const { motionValue: e, name: n, repeatDelay: s, repeatType: i, damping: r, type: o, keyframes: a } = t;
  if (!(((d = e == null ? void 0 : e.owner) == null ? void 0 : d.current) instanceof HTMLElement))
    return !1;
  const { onUpdate: c, transformTemplate: u } = e.owner.getProps();
  return wl() && n && /**
   * Force WAAPI for color properties with browser-only color formats
   * (oklch, oklab, lab, lch, etc.) that the JS animation path can't parse.
   */
  (ao.has(n) || xl.has(n) && bl(a)) && (n !== "transform" || !u) && /**
   * If we're outputting values to onUpdate then we can't use WAAPI as there's
   * no way to read the value from WAAPI every frame.
   */
  !c && !s && i !== "mirror" && r !== 0 && o !== "inertia";
}
const Sl = 40;
class Pl extends Dn {
  constructor({ autoplay: e = !0, delay: n = 0, type: s = "keyframes", repeat: i = 0, repeatDelay: r = 0, repeatType: o = "loop", keyframes: a, name: l, motionValue: c, element: u, ...d }) {
    var p;
    super(), this.stop = () => {
      var m, g;
      this._animation && (this._animation.stop(), (m = this.stopTimeline) == null || m.call(this)), (g = this.keyframeResolver) == null || g.cancel();
    }, this.createdAt = H.now();
    const h = {
      autoplay: e,
      delay: n,
      type: s,
      repeat: i,
      repeatDelay: r,
      repeatType: o,
      name: l,
      motionValue: c,
      element: u,
      ...d
    }, f = (u == null ? void 0 : u.KeyframeResolver) || Rn;
    this.keyframeResolver = new f(a, (m, g, y) => this.onKeyframesResolved(m, g, h, !y), l, c, u), (p = this.keyframeResolver) == null || p.scheduleResolve();
  }
  onKeyframesResolved(e, n, s, i) {
    var y, v;
    this.keyframeResolver = void 0;
    const { name: r, type: o, velocity: a, delay: l, isHandoff: c, onUpdate: u } = s;
    this.resolvedAt = H.now();
    let d = !0;
    yl(e, r, o, a) || (d = !1, (pt.instantAnimations || !l) && (u == null || u(xe(e, s, n))), e[0] = e[e.length - 1], nn(s), s.repeat = 0);
    const f = {
      startTime: i ? this.resolvedAt ? this.resolvedAt - this.createdAt > Sl ? this.resolvedAt : this.createdAt : this.createdAt : void 0,
      finalKeyframe: n,
      ...s,
      keyframes: e
    }, p = d && !c && Tl(f), m = (v = (y = f.motionValue) == null ? void 0 : y.owner) == null ? void 0 : v.current;
    let g;
    if (p)
      try {
        g = new ml({
          ...f,
          element: m
        });
      } catch {
        g = new Ht(f);
      }
    else
      g = new Ht(f);
    g.finished.then(() => {
      this.notifyFinished();
    }).catch(Z), this.pendingTimeline && (this.stopTimeline = g.attachTimeline(this.pendingTimeline), this.pendingTimeline = void 0), this._animation = g;
  }
  get finished() {
    return this._animation ? this.animation.finished : this._finished;
  }
  then(e, n) {
    return this.finished.finally(e).then(() => {
    });
  }
  get animation() {
    var e;
    return this._animation || ((e = this.keyframeResolver) == null || e.resume(), al()), this._animation;
  }
  get duration() {
    return this.animation.duration;
  }
  get iterationDuration() {
    return this.animation.iterationDuration;
  }
  get time() {
    return this.animation.time;
  }
  set time(e) {
    this.animation.time = e;
  }
  get speed() {
    return this.animation.speed;
  }
  get state() {
    return this.animation.state;
  }
  set speed(e) {
    this.animation.speed = e;
  }
  get startTime() {
    return this.animation.startTime;
  }
  attachTimeline(e) {
    return this._animation ? this.stopTimeline = this.animation.attachTimeline(e) : this.pendingTimeline = e, () => this.stop();
  }
  play() {
    this.animation.play();
  }
  pause() {
    this.animation.pause();
  }
  complete() {
    this.animation.complete();
  }
  cancel() {
    var e;
    this._animation && this.animation.cancel(), (e = this.keyframeResolver) == null || e.cancel();
  }
}
function lo(t, e, n, s = 0, i = 1) {
  const r = Array.from(t).sort((c, u) => c.sortNodePosition(u)).indexOf(e), o = t.size, a = (o - 1) * s;
  return typeof n == "function" ? n(r, o) : i === 1 ? r * s : a - r * s;
}
const cs = 30, Al = (t) => !isNaN(parseFloat(t)), Ut = {
  current: void 0
};
class Cl {
  /**
   * @param init - The initiating value
   * @param config - Optional configuration options
   *
   * -  `transformer`: A function to transform incoming values with.
   */
  constructor(e, n = {}) {
    this.canTrackVelocity = null, this.events = {}, this.updateAndNotify = (s) => {
      var r;
      const i = H.now();
      if (this.updatedAt !== i && this.setPrevFrameValue(), this.prev = this.current, this.setCurrent(s), this.current !== this.prev && ((r = this.events.change) == null || r.notify(this.current), this.dependents))
        for (const o of this.dependents)
          o.dirty();
    }, this.hasAnimated = !1, this.setCurrent(e), this.owner = n.owner;
  }
  setCurrent(e) {
    this.current = e, this.updatedAt = H.now(), this.canTrackVelocity === null && e !== void 0 && (this.canTrackVelocity = Al(this.current));
  }
  setPrevFrameValue(e = this.current) {
    this.prevFrameValue = e, this.prevUpdatedAt = this.updatedAt;
  }
  /**
   * Adds a function that will be notified when the `MotionValue` is updated.
   *
   * It returns a function that, when called, will cancel the subscription.
   *
   * When calling `onChange` inside a React component, it should be wrapped with the
   * `useEffect` hook. As it returns an unsubscribe function, this should be returned
   * from the `useEffect` function to ensure you don't add duplicate subscribers..
   *
   * ```jsx
   * export const MyComponent = () => {
   *   const x = useMotionValue(0)
   *   const y = useMotionValue(0)
   *   const opacity = useMotionValue(1)
   *
   *   useEffect(() => {
   *     function updateOpacity() {
   *       const maxXY = Math.max(x.get(), y.get())
   *       const newOpacity = transform(maxXY, [0, 100], [1, 0])
   *       opacity.set(newOpacity)
   *     }
   *
   *     const unsubscribeX = x.on("change", updateOpacity)
   *     const unsubscribeY = y.on("change", updateOpacity)
   *
   *     return () => {
   *       unsubscribeX()
   *       unsubscribeY()
   *     }
   *   }, [])
   *
   *   return <motion.div style={{ x }} />
   * }
   * ```
   *
   * @param subscriber - A function that receives the latest value.
   * @returns A function that, when called, will cancel this subscription.
   *
   * @deprecated
   */
  onChange(e) {
    return this.on("change", e);
  }
  on(e, n) {
    this.events[e] || (this.events[e] = new Tn());
    const s = this.events[e].add(n);
    return e === "change" ? () => {
      s(), E.read(() => {
        this.events.change.getSize() || this.stop();
      });
    } : s;
  }
  clearListeners() {
    for (const e in this.events)
      this.events[e].clear();
  }
  /**
   * Attaches a passive effect to the `MotionValue`.
   */
  attach(e, n) {
    this.passiveEffect = e, this.stopPassiveEffect = n;
  }
  /**
   * Sets the state of the `MotionValue`.
   *
   * @remarks
   *
   * ```jsx
   * const x = useMotionValue(0)
   * x.set(10)
   * ```
   *
   * @param latest - Latest value to set.
   * @param render - Whether to notify render subscribers. Defaults to `true`
   *
   * @public
   */
  set(e) {
    this.passiveEffect ? this.passiveEffect(e, this.updateAndNotify) : this.updateAndNotify(e);
  }
  setWithVelocity(e, n, s) {
    this.set(n), this.prev = void 0, this.prevFrameValue = e, this.prevUpdatedAt = this.updatedAt - s;
  }
  /**
   * Set the state of the `MotionValue`, stopping any active animations,
   * effects, and resets velocity to `0`.
   */
  jump(e, n = !0) {
    this.updateAndNotify(e), this.prev = e, this.prevUpdatedAt = this.prevFrameValue = void 0, n && this.stop(), this.stopPassiveEffect && this.stopPassiveEffect();
  }
  dirty() {
    var e;
    (e = this.events.change) == null || e.notify(this.current);
  }
  addDependent(e) {
    this.dependents || (this.dependents = /* @__PURE__ */ new Set()), this.dependents.add(e);
  }
  removeDependent(e) {
    this.dependents && this.dependents.delete(e);
  }
  /**
   * Returns the latest state of `MotionValue`
   *
   * @returns - The latest state of `MotionValue`
   *
   * @public
   */
  get() {
    return Ut.current && Ut.current.push(this), this.current;
  }
  /**
   * @public
   */
  getPrevious() {
    return this.prev;
  }
  /**
   * Returns the latest velocity of `MotionValue`
   *
   * @returns - The latest velocity of `MotionValue`. Returns `0` if the state is non-numerical.
   *
   * @public
   */
  getVelocity() {
    const e = H.now();
    if (!this.canTrackVelocity || this.prevFrameValue === void 0 || e - this.updatedAt > cs)
      return 0;
    const n = Math.min(this.updatedAt - this.prevUpdatedAt, cs);
    return /* @__PURE__ */ Mi(parseFloat(this.current) - parseFloat(this.prevFrameValue), n);
  }
  /**
   * Registers a new animation to control this `MotionValue`. Only one
   * animation can drive a `MotionValue` at one time.
   *
   * ```jsx
   * value.start()
   * ```
   *
   * @param animation - A function that starts the provided animation
   */
  start(e) {
    return this.stop(), new Promise((n) => {
      this.hasAnimated = !0, this.animation = e(n), this.events.animationStart && this.events.animationStart.notify();
    }).then(() => {
      this.events.animationComplete && this.events.animationComplete.notify(), this.clearAnimation();
    });
  }
  /**
   * Stop the currently active animation.
   *
   * @public
   */
  stop() {
    this.animation && (this.animation.stop(), this.events.animationCancel && this.events.animationCancel.notify()), this.clearAnimation();
  }
  /**
   * Returns `true` if this value is currently animating.
   *
   * @public
   */
  isAnimating() {
    return !!this.animation;
  }
  clearAnimation() {
    delete this.animation;
  }
  /**
   * Destroy and clean up subscribers to this `MotionValue`.
   *
   * The `MotionValue` hooks like `useMotionValue` and `useTransform` automatically
   * handle the lifecycle of the returned `MotionValue`, so this method is only necessary if you've manually
   * created a `MotionValue` via the `motionValue` function.
   *
   * @public
   */
  destroy() {
    var e, n;
    (e = this.dependents) == null || e.clear(), (n = this.events.destroy) == null || n.notify(), this.clearListeners(), this.stop(), this.stopPassiveEffect && this.stopPassiveEffect();
  }
}
function St(t, e) {
  return new Cl(t, e);
}
function co(t, e) {
  if (t != null && t.inherit && e) {
    const { inherit: n, ...s } = t;
    return { ...e, ...s };
  }
  return t;
}
function kn(t, e) {
  const n = (t == null ? void 0 : t[e]) ?? (t == null ? void 0 : t.default) ?? t;
  return n !== t ? co(n, t) : n;
}
const Vl = {
  type: "spring",
  stiffness: 500,
  damping: 25,
  restSpeed: 10
}, Ml = (t) => ({
  type: "spring",
  stiffness: 550,
  damping: t === 0 ? 2 * Math.sqrt(550) : 30,
  restSpeed: 10
}), El = {
  type: "keyframes",
  duration: 0.8
}, Dl = {
  type: "keyframes",
  ease: [0.25, 0.1, 0.35, 1],
  duration: 0.3
}, Rl = (t, { keyframes: e }) => e.length > 2 ? El : It.has(t) ? t.startsWith("scale") ? Ml(e[1]) : Vl : Dl, kl = /* @__PURE__ */ new Set([
  "when",
  "delay",
  "delayChildren",
  "staggerChildren",
  "staggerDirection",
  "repeat",
  "repeatType",
  "repeatDelay",
  "from",
  "elapsed"
]);
function Ll(t) {
  for (const e in t)
    if (!kl.has(e))
      return !0;
  return !1;
}
const Ln = (t, e, n, s = {}, i, r) => (o) => {
  const a = kn(s, t) || {}, l = a.delay || s.delay || 0;
  let { elapsed: c = 0 } = s;
  c = c - /* @__PURE__ */ X(l);
  const u = {
    keyframes: Array.isArray(n) ? n : [null, n],
    ease: "easeOut",
    velocity: e.getVelocity(),
    ...a,
    delay: -c,
    onUpdate: (h) => {
      e.set(h), a.onUpdate && a.onUpdate(h);
    },
    onComplete: () => {
      o(), a.onComplete && a.onComplete();
    },
    name: t,
    motionValue: e,
    element: r ? void 0 : i
  };
  Ll(a) || Object.assign(u, Rl(t, u)), u.duration && (u.duration = /* @__PURE__ */ X(u.duration)), u.repeatDelay && (u.repeatDelay = /* @__PURE__ */ X(u.repeatDelay)), u.from !== void 0 && (u.keyframes[0] = u.from);
  let d = !1;
  if ((u.type === !1 || u.duration === 0 && !u.repeatDelay) && (nn(u), u.delay === 0 && (d = !0)), (pt.instantAnimations || pt.skipAnimations || i != null && i.shouldSkipAnimations || a.skipAnimations) && (d = !0, nn(u), u.delay = 0), u.allowFlatten = !a.type && !a.ease, d && !r && e.get() !== void 0) {
    const h = xe(u.keyframes, a);
    if (h !== void 0) {
      E.update(() => {
        u.onUpdate(h), u.onComplete();
      });
      return;
    }
  }
  return a.isSync ? new Ht(u) : new Pl(u);
}, Il = (
  // eslint-disable-next-line redos-detector/no-unsafe-regex -- false positive, as it can match a lot of words
  /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u
);
function Bl(t) {
  const e = Il.exec(t);
  if (!e)
    return [,];
  const [, n, s, i] = e;
  return [`--${n ?? s}`, i];
}
const Fl = 4;
function uo(t, e, n = 1) {
  Tt(n <= Fl, `Max CSS variable fallback depth detected in property "${t}". This may indicate a circular fallback dependency.`, "max-css-var-depth");
  const [s, i] = Bl(t);
  if (!s)
    return;
  const r = window.getComputedStyle(e).getPropertyValue(s);
  if (r) {
    const o = r.trim();
    return Pi(o) ? parseFloat(o) : o;
  }
  return An(i) ? uo(i, e, n + 1) : i;
}
function us(t) {
  const e = [{}, {}];
  return t == null || t.values.forEach((n, s) => {
    e[0][s] = n.get(), e[1][s] = n.getVelocity();
  }), e;
}
function In(t, e, n, s) {
  if (typeof e == "function") {
    const [i, r] = us(s);
    e = e(n !== void 0 ? n : t.custom, i, r);
  }
  if (typeof e == "string" && (e = t.variants && t.variants[e]), typeof e == "function") {
    const [i, r] = us(s);
    e = e(n !== void 0 ? n : t.custom, i, r);
  }
  return e;
}
function wt(t, e, n) {
  const s = t.getProps();
  return In(s, e, n !== void 0 ? n : s.custom, t);
}
const ho = /* @__PURE__ */ new Set([
  "width",
  "height",
  "top",
  "left",
  "right",
  "bottom",
  ...Lt
]), sn = (t) => Array.isArray(t);
function jl(t, e, n) {
  t.hasValue(e) ? t.getValue(e).set(n) : t.addValue(e, St(n));
}
function Ol(t) {
  return sn(t) ? t[t.length - 1] || 0 : t;
}
function Nl(t, e) {
  const n = wt(t, e);
  let { transitionEnd: s = {}, transition: i = {}, ...r } = n || {};
  r = { ...r, ...s };
  for (const o in r) {
    const a = Ol(r[o]);
    jl(t, o, a);
  }
}
const z = (t) => !!(t && t.getVelocity);
function zl(t) {
  return !!(z(t) && t.add);
}
function on(t, e) {
  const n = t.getValue("willChange");
  if (zl(n))
    return n.add(e);
  if (!n && pt.WillChange) {
    const s = new pt.WillChange("auto");
    t.addValue("willChange", s), s.add(e);
  }
}
function Bn(t) {
  return t.replace(/([A-Z])/g, (e) => `-${e.toLowerCase()}`);
}
const Ul = "framerAppearId", fo = "data-" + Bn(Ul);
function po(t) {
  return t.props[fo];
}
function Wl({ protectedKeys: t, needsAnimating: e }, n) {
  const s = t.hasOwnProperty(n) && e[n] !== !0;
  return e[n] = !1, s;
}
function mo(t, e, { delay: n = 0, transitionOverride: s, type: i } = {}) {
  let { transition: r, transitionEnd: o, ...a } = e;
  const l = t.getDefaultTransition();
  r = r ? co(r, l) : l;
  const c = r == null ? void 0 : r.reduceMotion, u = r == null ? void 0 : r.skipAnimations;
  s && (r = s);
  const d = [], h = i && t.animationState && t.animationState.getState()[i], f = r == null ? void 0 : r.path;
  f && f.animateVisualElement(t, a, r, n, d);
  for (const p in a) {
    const m = t.getValue(p, t.latestValues[p] ?? null), g = a[p];
    if (g === void 0 || h && Wl(h, p))
      continue;
    const y = {
      delay: n,
      ...kn(r || {}, p)
    };
    u && (y.skipAnimations = !0);
    const v = m.get();
    if (v !== void 0 && !m.isAnimating() && !Array.isArray(g) && g === v && !y.velocity) {
      E.update(() => m.set(g));
      continue;
    }
    let b = !1;
    if (window.MotionHandoffAnimation) {
      const D = po(t);
      if (D) {
        const M = window.MotionHandoffAnimation(D, p, E);
        M !== null && (y.startTime = M, b = !0);
      }
    }
    on(t, p);
    const x = c ?? t.shouldReduceMotion;
    m.start(Ln(p, m, g, x && ho.has(p) ? { type: !1 } : y, t, b));
    const S = m.animation;
    S && d.push(S);
  }
  if (o) {
    const p = () => E.update(() => {
      o && Nl(t, o);
    });
    d.length ? Promise.all(d).then(p) : p();
  }
  return d;
}
function rn(t, e, n = {}) {
  var l;
  const s = wt(t, e, n.type === "exit" ? (l = t.presenceContext) == null ? void 0 : l.custom : void 0);
  let { transition: i = t.getDefaultTransition() || {} } = s || {};
  n.transitionOverride && (i = n.transitionOverride);
  const r = s ? () => Promise.all(mo(t, s, n)) : () => Promise.resolve(), o = t.variantChildren && t.variantChildren.size ? (c = 0) => {
    const { delayChildren: u = 0, staggerChildren: d, staggerDirection: h } = i;
    return Gl(t, e, c, u, d, h, n);
  } : () => Promise.resolve(), { when: a } = i;
  if (a) {
    const [c, u] = a === "beforeChildren" ? [r, o] : [o, r];
    return c().then(() => u());
  } else
    return Promise.all([r(), o(n.delay)]);
}
function Gl(t, e, n = 0, s = 0, i = 0, r = 1, o) {
  const a = [];
  for (const l of t.variantChildren)
    l.notify("AnimationStart", e), a.push(rn(l, e, {
      ...o,
      delay: n + (typeof s == "function" ? 0 : s) + lo(t.variantChildren, l, s, i, r)
    }).then(() => l.notify("AnimationComplete", e)));
  return Promise.all(a);
}
function $l(t, e, n = {}) {
  t.notify("AnimationStart", e);
  let s;
  if (Array.isArray(e)) {
    const i = e.map((r) => rn(t, r, n));
    s = Promise.all(i);
  } else if (typeof e == "string")
    s = rn(t, e, n);
  else {
    const i = typeof e == "function" ? wt(t, e, n.custom) : e;
    s = Promise.all(mo(t, i, n));
  }
  return s.then(() => {
    t.notify("AnimationComplete", e);
  });
}
const Kl = {
  test: (t) => t === "auto",
  parse: (t) => t
}, go = (t) => (e) => e.test(t), yo = [kt, w, ot, lt, ya, ga, Kl], ds = (t) => yo.find(go(t));
function Hl(t) {
  return typeof t == "number" ? t === 0 : t !== null ? t === "none" || t === "0" || Ci(t) : !0;
}
const _l = /* @__PURE__ */ new Set(["brightness", "contrast", "saturate", "opacity"]);
function Xl(t) {
  const [e, n] = t.slice(0, -1).split("(");
  if (e === "drop-shadow")
    return t;
  const [s] = n.match(Cn) || [];
  if (!s)
    return t;
  const i = n.replace(s, "");
  let r = _l.has(e) ? 1 : 0;
  return s !== n && (r *= 100), e + "(" + r + i + ")";
}
const Yl = /\b([a-z-]*)\(.*?\)/gu, an = {
  ...tt,
  getAnimatableNone: (t) => {
    const e = t.match(Yl);
    return e ? e.map(Xl).join(" ") : t;
  }
}, ln = {
  ...tt,
  getAnimatableNone: (t) => {
    const e = tt.parse(t);
    return tt.createTransformer(t)(e.map((s) => typeof s == "number" ? 0 : typeof s == "object" ? { ...s, alpha: 1 } : s));
  }
}, hs = {
  ...kt,
  transform: Math.round
}, ql = {
  rotate: lt,
  /**
   * Internal channel for `transition.path` orientToPath. Composed onto
   * `rotate` at the transform-build sites so the user's `rotate` is
   * never read or overwritten. Not part of `transformPropOrder`.
   */
  pathRotation: lt,
  rotateX: lt,
  rotateY: lt,
  rotateZ: lt,
  scale: ee,
  scaleX: ee,
  scaleY: ee,
  scaleZ: ee,
  skew: lt,
  skewX: lt,
  skewY: lt,
  distance: w,
  translateX: w,
  translateY: w,
  translateZ: w,
  x: w,
  y: w,
  z: w,
  perspective: w,
  transformPerspective: w,
  opacity: Kt,
  originX: Jn,
  originY: Jn,
  originZ: w
}, me = {
  // Border props
  borderWidth: w,
  borderTopWidth: w,
  borderRightWidth: w,
  borderBottomWidth: w,
  borderLeftWidth: w,
  borderRadius: w,
  borderTopLeftRadius: w,
  borderTopRightRadius: w,
  borderBottomRightRadius: w,
  borderBottomLeftRadius: w,
  // Positioning props
  width: w,
  maxWidth: w,
  height: w,
  maxHeight: w,
  top: w,
  right: w,
  bottom: w,
  left: w,
  inset: w,
  insetBlock: w,
  insetBlockStart: w,
  insetBlockEnd: w,
  insetInline: w,
  insetInlineStart: w,
  insetInlineEnd: w,
  // Spacing props
  padding: w,
  paddingTop: w,
  paddingRight: w,
  paddingBottom: w,
  paddingLeft: w,
  paddingBlock: w,
  paddingBlockStart: w,
  paddingBlockEnd: w,
  paddingInline: w,
  paddingInlineStart: w,
  paddingInlineEnd: w,
  margin: w,
  marginTop: w,
  marginRight: w,
  marginBottom: w,
  marginLeft: w,
  marginBlock: w,
  marginBlockStart: w,
  marginBlockEnd: w,
  marginInline: w,
  marginInlineStart: w,
  marginInlineEnd: w,
  // Typography
  fontSize: w,
  // Misc
  backgroundPositionX: w,
  backgroundPositionY: w,
  ...ql,
  zIndex: hs,
  // SVG
  fillOpacity: Kt,
  strokeOpacity: Kt,
  numOctaves: hs
}, Zl = {
  ...me,
  // Color props
  color: O,
  backgroundColor: O,
  outlineColor: O,
  fill: O,
  stroke: O,
  // Border props
  borderColor: O,
  borderTopColor: O,
  borderRightColor: O,
  borderBottomColor: O,
  borderLeftColor: O,
  filter: an,
  WebkitFilter: an,
  mask: ln,
  WebkitMask: ln
}, vo = (t) => Zl[t], Jl = /* @__PURE__ */ new Set([an, ln]);
function bo(t, e) {
  let n = vo(t);
  return Jl.has(n) || (n = tt), n.getAnimatableNone ? n.getAnimatableNone(e) : void 0;
}
const Ql = /* @__PURE__ */ new Set(["auto", "none", "0"]);
function tc(t, e, n) {
  let s = 0, i;
  for (; s < t.length && !i; ) {
    const r = t[s];
    typeof r == "string" && !Ql.has(r) && Dt(r).values.length && (i = t[s]), s++;
  }
  if (i && n)
    for (const r of e)
      t[r] = bo(n, i);
}
class ec extends Rn {
  constructor(e, n, s, i, r) {
    super(e, n, s, i, r, !0);
  }
  readKeyframes() {
    const { unresolvedKeyframes: e, element: n, name: s } = this;
    if (!n || !n.current)
      return;
    super.readKeyframes();
    for (let u = 0; u < e.length; u++) {
      let d = e[u];
      if (typeof d == "string" && (d = d.trim(), An(d))) {
        const h = uo(d, n.current);
        h !== void 0 && (e[u] = h), u === e.length - 1 && (this.finalKeyframe = d);
      }
    }
    if (this.resolveNoneKeyframes(), !ho.has(s) || e.length !== 2)
      return;
    const [i, r] = e, o = ds(i), a = ds(r), l = Zn(i), c = Zn(r);
    if (l !== c && ft[s]) {
      this.needsMeasurement = !0;
      return;
    }
    if (o !== a)
      if (rs(o) && rs(a))
        for (let u = 0; u < e.length; u++) {
          const d = e[u];
          typeof d == "string" && (e[u] = parseFloat(d));
        }
      else ft[s] && (this.needsMeasurement = !0);
  }
  resolveNoneKeyframes() {
    const { unresolvedKeyframes: e, name: n } = this, s = [];
    for (let i = 0; i < e.length; i++)
      (e[i] === null || Hl(e[i])) && s.push(i);
    s.length && tc(e, s, n);
  }
  measureInitialState() {
    const { element: e, unresolvedKeyframes: n, name: s } = this;
    if (!e || !e.current)
      return;
    s === "height" && (this.suspendedScrollY = window.pageYOffset), this.measuredOrigin = ft[s](e.measureViewportBox(), window.getComputedStyle(e.current)), n[0] = this.measuredOrigin;
    const i = n[n.length - 1];
    i !== void 0 && e.getValue(s, i).jump(i, !1);
  }
  measureEndState() {
    var a;
    const { element: e, name: n, unresolvedKeyframes: s } = this;
    if (!e || !e.current)
      return;
    const i = e.getValue(n);
    i && i.jump(this.measuredOrigin, !1);
    const r = s.length - 1, o = s[r];
    s[r] = ft[n](e.measureViewportBox(), window.getComputedStyle(e.current)), o !== null && this.finalKeyframe === void 0 && (this.finalKeyframe = o), (a = this.removedTransforms) != null && a.length && this.removedTransforms.forEach(([l, c]) => {
      e.getValue(l).set(c);
    }), this.resolveNoneKeyframes();
  }
}
const Fn = [
  "borderTopLeftRadius",
  "borderTopRightRadius",
  "borderBottomRightRadius",
  "borderBottomLeftRadius"
];
function xo(t, e, n) {
  if (t == null)
    return [];
  if (t instanceof EventTarget)
    return [t];
  if (typeof t == "string") {
    let s = document;
    const i = (n == null ? void 0 : n[t]) ?? s.querySelectorAll(t);
    return i ? Array.from(i) : [];
  }
  return Array.from(t).filter((s) => s != null);
}
const cn = (t, e) => e && typeof t == "number" ? e.transform(t) : t;
function nc(t) {
  return Ai(t) && "offsetHeight" in t && !("ownerSVGElement" in t);
}
const { schedule: jn } = /* @__PURE__ */ Ni(queueMicrotask, !1), Q = {
  x: !1,
  y: !1
};
function wo() {
  return Q.x || Q.y;
}
function sc(t) {
  return t === "x" || t === "y" ? Q[t] ? null : (Q[t] = !0, () => {
    Q[t] = !1;
  }) : Q.x || Q.y ? null : (Q.x = Q.y = !0, () => {
    Q.x = Q.y = !1;
  });
}
function To(t, e) {
  const n = xo(t), s = new AbortController(), i = {
    passive: !0,
    ...e,
    signal: s.signal
  };
  return [n, i, () => s.abort()];
}
function ic(t) {
  return !(t.pointerType === "touch" || wo());
}
function oc(t, e, n = {}) {
  const [s, i, r] = To(t, n);
  return s.forEach((o) => {
    let a = !1, l = !1, c;
    const u = () => {
      o.removeEventListener("pointerleave", p);
    }, d = (g) => {
      c && (c(g), c = void 0), u();
    }, h = (g) => {
      a = !1, window.removeEventListener("pointerup", h), window.removeEventListener("pointercancel", h), l && (l = !1, d(g));
    }, f = () => {
      a = !0, window.addEventListener("pointerup", h, i), window.addEventListener("pointercancel", h, i);
    }, p = (g) => {
      if (g.pointerType !== "touch") {
        if (a) {
          l = !0;
          return;
        }
        d(g);
      }
    }, m = (g) => {
      if (!ic(g))
        return;
      l = !1;
      const y = e(o, g);
      typeof y == "function" && (c = y, o.addEventListener("pointerleave", p, i));
    };
    o.addEventListener("pointerenter", m, i), o.addEventListener("pointerdown", f, i);
  }), r;
}
const So = (t, e) => e ? t === e ? !0 : So(t, e.parentElement) : !1, On = (t) => t.pointerType === "mouse" ? typeof t.button != "number" || t.button <= 0 : t.isPrimary !== !1, rc = /* @__PURE__ */ new Set([
  "BUTTON",
  "INPUT",
  "SELECT",
  "TEXTAREA",
  "A"
]);
function ac(t) {
  return rc.has(t.tagName) || t.isContentEditable === !0;
}
const lc = /* @__PURE__ */ new Set(["INPUT", "SELECT", "TEXTAREA"]);
function cc(t) {
  return lc.has(t.tagName) || t.isContentEditable === !0;
}
const oe = /* @__PURE__ */ new WeakSet();
function fs(t) {
  return (e) => {
    e.key === "Enter" && t(e);
  };
}
function Le(t, e) {
  t.dispatchEvent(new PointerEvent("pointer" + e, { isPrimary: !0, bubbles: !0 }));
}
const uc = (t, e) => {
  const n = t.currentTarget;
  if (!n)
    return;
  const s = fs(() => {
    if (oe.has(n))
      return;
    Le(n, "down");
    const i = fs(() => {
      Le(n, "up");
    }), r = () => Le(n, "cancel");
    n.addEventListener("keyup", i, e), n.addEventListener("blur", r, e);
  });
  n.addEventListener("keydown", s, e), n.addEventListener("blur", () => n.removeEventListener("keydown", s), e);
};
function ps(t) {
  return On(t) && !wo();
}
const ms = /* @__PURE__ */ new WeakSet();
function dc(t, e, n = {}) {
  const [s, i, r] = To(t, n), o = (a) => {
    const l = a.currentTarget;
    if (!ps(a) || ms.has(a))
      return;
    oe.add(l), n.stopPropagation && ms.add(a);
    const c = e(l, a), u = { ...i, capture: !0 }, d = (p, m) => {
      window.removeEventListener("pointerup", h, u), window.removeEventListener("pointercancel", f, u), oe.has(l) && oe.delete(l), ps(p) && typeof c == "function" && c(p, { success: m });
    }, h = (p) => {
      d(p, l === window || l === document || n.useGlobalTarget || So(l, p.target));
    }, f = (p) => {
      d(p, !1);
    };
    window.addEventListener("pointerup", h, u), window.addEventListener("pointercancel", f, u);
  };
  return s.forEach((a) => {
    (n.useGlobalTarget ? window : a).addEventListener("pointerdown", o, i), nc(a) && (a.addEventListener("focus", (c) => uc(c, i)), !ac(a) && !a.hasAttribute("tabindex") && (a.tabIndex = 0));
  }), r;
}
function Nn(t) {
  return Ai(t) && "ownerSVGElement" in t;
}
const re = /* @__PURE__ */ new WeakMap();
let ht;
const Po = (t, e, n) => (s, i) => i && i[0] ? i[0][t + "Size"] : Nn(s) && "getBBox" in s ? s.getBBox()[e] : s[n], hc = /* @__PURE__ */ Po("inline", "width", "offsetWidth"), fc = /* @__PURE__ */ Po("block", "height", "offsetHeight");
function pc({ target: t, borderBoxSize: e }) {
  var n;
  (n = re.get(t)) == null || n.forEach((s) => {
    s(t, {
      get width() {
        return hc(t, e);
      },
      get height() {
        return fc(t, e);
      }
    });
  });
}
function mc(t) {
  t.forEach(pc);
}
function gc() {
  typeof ResizeObserver > "u" || (ht = new ResizeObserver(mc));
}
function yc(t, e) {
  ht || gc();
  const n = xo(t);
  return n.forEach((s) => {
    let i = re.get(s);
    i || (i = /* @__PURE__ */ new Set(), re.set(s, i)), i.add(e), ht == null || ht.observe(s);
  }), () => {
    n.forEach((s) => {
      const i = re.get(s);
      i == null || i.delete(e), i != null && i.size || ht == null || ht.unobserve(s);
    });
  };
}
const ae = /* @__PURE__ */ new Set();
let Vt;
function vc() {
  Vt = () => {
    const t = {
      get width() {
        return window.innerWidth;
      },
      get height() {
        return window.innerHeight;
      }
    };
    ae.forEach((e) => e(t));
  }, window.addEventListener("resize", Vt);
}
function bc(t) {
  return ae.add(t), Vt || vc(), () => {
    ae.delete(t), !ae.size && typeof Vt == "function" && (window.removeEventListener("resize", Vt), Vt = void 0);
  };
}
function gs(t, e) {
  return typeof t == "function" ? bc(t) : yc(t, e);
}
function xc(t) {
  return Nn(t) && t.tagName === "svg";
}
function wc(...t) {
  const e = !Array.isArray(t[0]), n = e ? 0 : -1, s = t[0 + n], i = t[1 + n], r = t[2 + n], o = t[3 + n], a = qi(i, r, o);
  return e ? a(s) : a;
}
function Tc(t, e, n = {}) {
  const s = t.get();
  let i = null, r = s, o;
  const a = typeof s == "string" ? s.replace(/[\d.-]/g, "") : void 0, l = () => {
    i && (i.stop(), i = null), t.animation = void 0;
  }, c = () => {
    const d = ys(t.get()), h = ys(r);
    if (d === h) {
      l();
      return;
    }
    const f = i ? i.getGeneratorVelocity() : t.getVelocity();
    l(), i = new Ht({
      keyframes: [d, h],
      velocity: f,
      // Default to spring if no type specified (matches useSpring behavior)
      type: "spring",
      restDelta: 1e-3,
      restSpeed: 0.01,
      ...n,
      onUpdate: o
    });
  }, u = () => {
    var d;
    c(), t.animation = i ?? void 0, (d = t.events.animationStart) == null || d.notify(), i == null || i.then(() => {
      var h;
      t.animation = void 0, (h = t.events.animationComplete) == null || h.notify();
    });
  };
  if (t.attach((d, h) => {
    r = d, o = (f) => h(Ie(f, a)), E.postRender(u);
  }, l), z(e)) {
    let d = n.skipInitialAnimation === !0;
    const h = e.on("change", (p) => {
      d ? (d = !1, t.jump(Ie(p, a), !1)) : t.set(Ie(p, a));
    }), f = t.on("destroy", h);
    return () => {
      h(), f();
    };
  }
  return l;
}
function Ie(t, e) {
  return e ? t + e : t;
}
function ys(t) {
  return typeof t == "number" ? t : parseFloat(t);
}
const Sc = [...yo, O, tt], Pc = (t) => Sc.find(go(t)), vs = () => ({
  translate: 0,
  scale: 1,
  origin: 0,
  originPoint: 0
}), Mt = () => ({
  x: vs(),
  y: vs()
}), bs = () => ({ min: 0, max: 0 }), N = () => ({
  x: bs(),
  y: bs()
}), Ac = /* @__PURE__ */ new WeakMap();
function we(t) {
  return t !== null && typeof t == "object" && typeof t.start == "function";
}
function _t(t) {
  return typeof t == "string" || Array.isArray(t);
}
const zn = [
  "animate",
  "whileInView",
  "whileFocus",
  "whileHover",
  "whileTap",
  "whileDrag",
  "exit"
], Un = ["initial", ...zn];
function Te(t) {
  return we(t.animate) || Un.some((e) => _t(t[e]));
}
function Ao(t) {
  return !!(Te(t) || t.variants);
}
function Cc(t, e, n) {
  for (const s in e) {
    const i = e[s], r = n[s];
    if (z(i))
      t.addValue(s, i);
    else if (z(r))
      t.addValue(s, St(i, { owner: t }));
    else if (r !== i)
      if (t.hasValue(s)) {
        const o = t.getValue(s);
        o.liveStyle === !0 ? o.jump(i) : o.hasAnimated || o.set(i);
      } else {
        const o = t.getStaticValue(s);
        t.addValue(s, St(o !== void 0 ? o : i, { owner: t }));
      }
  }
  for (const s in n)
    e[s] === void 0 && t.removeValue(s);
  return e;
}
const un = { current: null }, Co = { current: !1 }, Vc = typeof window < "u";
function Mc() {
  if (Co.current = !0, !!Vc)
    if (window.matchMedia) {
      const t = window.matchMedia("(prefers-reduced-motion)"), e = () => un.current = t.matches;
      t.addEventListener("change", e), e();
    } else
      un.current = !1;
}
const xs = [
  "AnimationStart",
  "AnimationComplete",
  "Update",
  "BeforeLayoutMeasure",
  "LayoutMeasure",
  "LayoutAnimationStart",
  "LayoutAnimationComplete"
];
let ge = {};
function Vo(t) {
  ge = t;
}
function Ec() {
  return ge;
}
class Dc {
  /**
   * This method takes React props and returns found MotionValues. For example, HTML
   * MotionValues will be found within the style prop, whereas for Three.js within attribute arrays.
   *
   * This isn't an abstract method as it needs calling in the constructor, but it is
   * intended to be one.
   */
  scrapeMotionValuesFromProps(e, n, s) {
    return {};
  }
  constructor({ parent: e, props: n, presenceContext: s, reducedMotionConfig: i, skipAnimations: r, blockInitialAnimation: o, visualState: a }, l = {}) {
    this.current = null, this.children = /* @__PURE__ */ new Set(), this.isVariantNode = !1, this.isControllingVariants = !1, this.shouldReduceMotion = null, this.shouldSkipAnimations = !1, this.values = /* @__PURE__ */ new Map(), this.KeyframeResolver = Rn, this.features = {}, this.valueSubscriptions = /* @__PURE__ */ new Map(), this.prevMotionValues = {}, this.hasBeenMounted = !1, this.events = {}, this.propEventSubscriptions = {}, this.notifyUpdate = () => this.notify("Update", this.latestValues), this.render = () => {
      this.current && (this.triggerBuild(), this.renderInstance(this.current, this.renderState, this.props.style, this.projection));
    }, this.renderScheduledAt = 0, this.scheduleRender = () => {
      const f = H.now();
      this.renderScheduledAt < f && (this.renderScheduledAt = f, E.render(this.render, !1, !0));
    };
    const { latestValues: c, renderState: u } = a;
    this.latestValues = c, this.baseTarget = { ...c }, this.initialValues = n.initial ? { ...c } : {}, this.renderState = u, this.parent = e, this.props = n, this.presenceContext = s, this.depth = e ? e.depth + 1 : 0, this.reducedMotionConfig = i, this.skipAnimationsConfig = r, this.options = l, this.blockInitialAnimation = !!o, this.isControllingVariants = Te(n), this.isVariantNode = Ao(n), this.isVariantNode && (this.variantChildren = /* @__PURE__ */ new Set()), this.manuallyAnimateOnMount = !!(e && e.current);
    const { willChange: d, ...h } = this.scrapeMotionValuesFromProps(n, {}, this);
    for (const f in h) {
      const p = h[f];
      c[f] !== void 0 && z(p) && p.set(c[f]);
    }
  }
  mount(e) {
    var n, s;
    if (this.hasBeenMounted)
      for (const i in this.initialValues)
        (n = this.values.get(i)) == null || n.jump(this.initialValues[i]), this.latestValues[i] = this.initialValues[i];
    this.current = e, Ac.set(e, this), this.projection && !this.projection.instance && this.projection.mount(e), this.parent && this.isVariantNode && !this.isControllingVariants && (this.removeFromVariantTree = this.parent.addVariantChild(this)), this.values.forEach((i, r) => this.bindToMotionValue(r, i)), this.reducedMotionConfig === "never" ? this.shouldReduceMotion = !1 : this.reducedMotionConfig === "always" ? this.shouldReduceMotion = !0 : (Co.current || Mc(), this.shouldReduceMotion = un.current), this.shouldSkipAnimations = this.skipAnimationsConfig ?? !1, (s = this.parent) == null || s.addChild(this), this.update(this.props, this.presenceContext), this.hasBeenMounted = !0;
  }
  unmount() {
    var e;
    this.projection && this.projection.unmount(), ct(this.notifyUpdate), ct(this.render), this.valueSubscriptions.forEach((n) => n()), this.valueSubscriptions.clear(), this.removeFromVariantTree && this.removeFromVariantTree(), (e = this.parent) == null || e.removeChild(this);
    for (const n in this.events)
      this.events[n].clear();
    for (const n in this.features) {
      const s = this.features[n];
      s && (s.unmount(), s.isMounted = !1);
    }
    this.current = null;
  }
  addChild(e) {
    this.children.add(e), this.enteringChildren ?? (this.enteringChildren = /* @__PURE__ */ new Set()), this.enteringChildren.add(e);
  }
  removeChild(e) {
    this.children.delete(e), this.enteringChildren && this.enteringChildren.delete(e);
  }
  bindToMotionValue(e, n) {
    if (this.valueSubscriptions.has(e) && this.valueSubscriptions.get(e)(), n.accelerate && ao.has(e) && this.current instanceof HTMLElement) {
      const { factory: o, keyframes: a, times: l, ease: c, duration: u } = n.accelerate, d = new oo({
        element: this.current,
        name: e,
        keyframes: a,
        times: l,
        ease: c,
        duration: /* @__PURE__ */ X(u)
      }), h = o(d);
      this.valueSubscriptions.set(e, () => {
        h(), d.cancel();
      });
      return;
    }
    const s = It.has(e);
    s && this.onBindTransform && this.onBindTransform();
    const i = n.on("change", (o) => {
      this.latestValues[e] = o, this.props.onUpdate && E.preRender(this.notifyUpdate), s && this.projection && (this.projection.isTransformDirty = !0), this.scheduleRender();
    });
    let r;
    typeof window < "u" && window.MotionCheckAppearSync && (r = window.MotionCheckAppearSync(this, e, n)), this.valueSubscriptions.set(e, () => {
      i(), r && r();
    });
  }
  sortNodePosition(e) {
    return !this.current || !this.sortInstanceNodePosition || this.type !== e.type ? 0 : this.sortInstanceNodePosition(this.current, e.current);
  }
  updateFeatures() {
    let e = "animation";
    for (e in ge) {
      const n = ge[e];
      if (!n)
        continue;
      const { isEnabled: s, Feature: i } = n;
      if (!this.features[e] && i && s(this.props) && (this.features[e] = new i(this)), this.features[e]) {
        const r = this.features[e];
        r.isMounted ? r.update() : (r.mount(), r.isMounted = !0);
      }
    }
  }
  triggerBuild() {
    this.build(this.renderState, this.latestValues, this.props);
  }
  /**
   * Measure the current viewport box with or without transforms.
   * Only measures axis-aligned boxes, rotate and skew must be manually
   * removed with a re-render to work.
   */
  measureViewportBox() {
    return this.current ? this.measureInstanceViewportBox(this.current, this.props) : N();
  }
  getStaticValue(e) {
    return this.latestValues[e];
  }
  setStaticValue(e, n) {
    this.latestValues[e] = n;
  }
  /**
   * Update the provided props. Ensure any newly-added motion values are
   * added to our map, old ones removed, and listeners updated.
   */
  update(e, n) {
    (e.transformTemplate || this.props.transformTemplate) && this.scheduleRender(), this.prevProps = this.props, this.props = e, this.prevPresenceContext = this.presenceContext, this.presenceContext = n;
    for (let s = 0; s < xs.length; s++) {
      const i = xs[s];
      this.propEventSubscriptions[i] && (this.propEventSubscriptions[i](), delete this.propEventSubscriptions[i]);
      const r = "on" + i, o = e[r];
      o && (this.propEventSubscriptions[i] = this.on(i, o));
    }
    this.prevMotionValues = Cc(this, this.scrapeMotionValuesFromProps(e, this.prevProps || {}, this), this.prevMotionValues), this.handleChildMotionValue && this.handleChildMotionValue();
  }
  getProps() {
    return this.props;
  }
  /**
   * Returns the variant definition with a given name.
   */
  getVariant(e) {
    return this.props.variants ? this.props.variants[e] : void 0;
  }
  /**
   * Returns the defined default transition on this component.
   */
  getDefaultTransition() {
    return this.props.transition;
  }
  getTransformPagePoint() {
    return this.props.transformPagePoint;
  }
  getClosestVariantNode() {
    return this.isVariantNode ? this : this.parent ? this.parent.getClosestVariantNode() : void 0;
  }
  /**
   * Add a child visual element to our set of children.
   */
  addVariantChild(e) {
    const n = this.getClosestVariantNode();
    if (n)
      return n.variantChildren && n.variantChildren.add(e), () => n.variantChildren.delete(e);
  }
  /**
   * Add a motion value and bind it to this visual element.
   */
  addValue(e, n) {
    const s = this.values.get(e);
    n !== s && (s && this.removeValue(e), this.bindToMotionValue(e, n), this.values.set(e, n), this.latestValues[e] = n.get());
  }
  /**
   * Remove a motion value and unbind any active subscriptions.
   */
  removeValue(e) {
    this.values.delete(e);
    const n = this.valueSubscriptions.get(e);
    n && (n(), this.valueSubscriptions.delete(e)), delete this.latestValues[e], this.removeValueFromRenderState(e, this.renderState);
  }
  /**
   * Check whether we have a motion value for this key
   */
  hasValue(e) {
    return this.values.has(e);
  }
  getValue(e, n) {
    if (this.props.values && this.props.values[e])
      return this.props.values[e];
    let s = this.values.get(e);
    return s === void 0 && n !== void 0 && (s = St(n === null ? void 0 : n, { owner: this }), this.addValue(e, s)), s;
  }
  /**
   * If we're trying to animate to a previously unencountered value,
   * we need to check for it in our state and as a last resort read it
   * directly from the instance (which might have performance implications).
   */
  readValue(e, n) {
    let s = this.latestValues[e] !== void 0 || !this.current ? this.latestValues[e] : this.getBaseTargetFromProps(this.props, e) ?? this.readValueFromInstance(this.current, e, this.options);
    return s != null && (typeof s == "string" && (Pi(s) || Ci(s)) ? s = parseFloat(s) : !Pc(s) && tt.test(n) && (s = bo(e, n)), this.setBaseTarget(e, z(s) ? s.get() : s)), z(s) ? s.get() : s;
  }
  /**
   * Set the base target to later animate back to. This is currently
   * only hydrated on creation and when we first read a value.
   */
  setBaseTarget(e, n) {
    this.baseTarget[e] = n;
  }
  /**
   * Find the base target for a value thats been removed from all animation
   * props.
   */
  getBaseTarget(e) {
    var r;
    const { initial: n } = this.props;
    let s;
    if (typeof n == "string" || typeof n == "object") {
      const o = In(this.props, n, (r = this.presenceContext) == null ? void 0 : r.custom);
      o && (s = o[e]);
    }
    if (n && s !== void 0)
      return s;
    const i = this.getBaseTargetFromProps(this.props, e);
    return i !== void 0 && !z(i) ? i : this.initialValues[e] !== void 0 && s === void 0 ? void 0 : this.baseTarget[e];
  }
  on(e, n) {
    return this.events[e] || (this.events[e] = new Tn()), this.events[e].add(n);
  }
  notify(e, ...n) {
    this.events[e] && this.events[e].notify(...n);
  }
  scheduleRenderMicrotask() {
    jn.render(this.render);
  }
}
class Mo extends Dc {
  constructor() {
    super(...arguments), this.KeyframeResolver = ec;
  }
  sortInstanceNodePosition(e, n) {
    return e.compareDocumentPosition(n) & 2 ? 1 : -1;
  }
  getBaseTargetFromProps(e, n) {
    const s = e.style;
    return s ? s[n] : void 0;
  }
  removeValueFromRenderState(e, { vars: n, style: s }) {
    delete n[e], delete s[e];
  }
  handleChildMotionValue() {
    this.childSubscription && (this.childSubscription(), delete this.childSubscription);
    const { children: e } = this.props;
    z(e) && (this.childSubscription = e.on("change", (n) => {
      this.current && (this.current.textContent = `${n}`);
    }));
  }
}
class mt {
  constructor(e) {
    this.isMounted = !1, this.node = e;
  }
  update() {
  }
}
function Eo({ top: t, left: e, right: n, bottom: s }) {
  return {
    x: { min: e, max: n },
    y: { min: t, max: s }
  };
}
function Rc({ x: t, y: e }) {
  return { top: e.min, right: t.max, bottom: e.max, left: t.min };
}
function kc(t, e) {
  if (!e)
    return t;
  const n = e({ x: t.left, y: t.top }), s = e({ x: t.right, y: t.bottom });
  return {
    top: n.y,
    left: n.x,
    bottom: s.y,
    right: s.x
  };
}
function Be(t) {
  return t === void 0 || t === 1;
}
function dn({ scale: t, scaleX: e, scaleY: n }) {
  return !Be(t) || !Be(e) || !Be(n);
}
function yt(t) {
  return dn(t) || Do(t) || t.z || t.rotate || t.rotateX || t.rotateY || t.skewX || t.skewY;
}
function Do(t) {
  return ws(t.x) || ws(t.y);
}
function ws(t) {
  return t && t !== "0%";
}
function ye(t, e, n) {
  const s = t - n, i = e * s;
  return n + i;
}
function Ts(t, e, n, s, i) {
  return i !== void 0 && (t = ye(t, i, s)), ye(t, n, s) + e;
}
function hn(t, e = 0, n = 1, s, i) {
  t.min = Ts(t.min, e, n, s, i), t.max = Ts(t.max, e, n, s, i);
}
function Ro(t, { x: e, y: n }) {
  hn(t.x, e.translate, e.scale, e.originPoint), hn(t.y, n.translate, n.scale, n.originPoint);
}
const Ss = 0.999999999999, Ps = 1.0000000000001;
function Lc(t, e, n, s = !1) {
  var a;
  const i = n.length;
  if (!i)
    return;
  e.x = e.y = 1;
  let r, o;
  for (let l = 0; l < i; l++) {
    r = n[l], o = r.projectionDelta;
    const { visualElement: c } = r.options;
    c && c.props.style && c.props.style.display === "contents" || (s && r.options.layoutScroll && r.scroll && r !== r.root && (it(t.x, -r.scroll.offset.x), it(t.y, -r.scroll.offset.y)), o && (e.x *= o.x.scale, e.y *= o.y.scale, Ro(t, o)), s && yt(r.latestValues) && le(t, r.latestValues, (a = r.layout) == null ? void 0 : a.layoutBox));
  }
  e.x < Ps && e.x > Ss && (e.x = 1), e.y < Ps && e.y > Ss && (e.y = 1);
}
function it(t, e) {
  t.min += e, t.max += e;
}
function As(t, e, n, s, i = 0.5) {
  const r = R(t.min, t.max, i);
  hn(t, e, n, r, s);
}
function Cs(t, e) {
  return typeof t == "string" ? parseFloat(t) / 100 * (e.max - e.min) : t;
}
function le(t, e, n) {
  const s = n ?? t;
  As(t.x, Cs(e.x, s.x), e.scaleX, e.scale, e.originX), As(t.y, Cs(e.y, s.y), e.scaleY, e.scale, e.originY);
}
function ko(t, e) {
  return Eo(kc(t.getBoundingClientRect(), e));
}
function Ic(t, e, n) {
  const s = ko(t, n), { scroll: i } = e;
  return i && (it(s.x, i.offset.x), it(s.y, i.offset.y)), s;
}
const Bc = {
  x: "translateX",
  y: "translateY",
  z: "translateZ",
  transformPerspective: "perspective"
}, Fc = Lt.length;
function jc(t, e, n) {
  let s = "", i = !0;
  for (let o = 0; o < Fc; o++) {
    const a = Lt[o], l = t[a];
    if (l === void 0)
      continue;
    let c = !0;
    if (typeof l == "number")
      c = l === (a.startsWith("scale") ? 1 : 0);
    else {
      const u = parseFloat(l);
      c = a.startsWith("scale") ? u === 1 : u === 0;
    }
    if (!c || n) {
      const u = cn(l, me[a]);
      if (!c) {
        i = !1;
        const d = Bc[a] || a;
        s += `${d}(${u}) `;
      }
      n && (e[a] = u);
    }
  }
  const r = t.pathRotation;
  return r && (i = !1, s += `rotate(${cn(r, me.pathRotation)}) `), s = s.trim(), n ? s = n(e, i ? "" : s) : i && (s = "none"), s;
}
function Wn(t, e, n) {
  const { style: s, vars: i, transformOrigin: r } = t;
  let o = !1, a = !1;
  for (const l in e) {
    const c = e[l];
    if (It.has(l)) {
      o = !0;
      continue;
    } else if (Ui(l)) {
      i[l] = c;
      continue;
    } else {
      const u = cn(c, me[l]);
      l.startsWith("origin") ? (a = !0, r[l] = u) : s[l] = u;
    }
  }
  if (e.transform || (o || n ? s.transform = jc(e, t.transform, n) : s.transform && (s.transform = "none")), a) {
    const { originX: l = "50%", originY: c = "50%", originZ: u = 0 } = r;
    s.transformOrigin = `${l} ${c} ${u}`;
  }
}
function Lo(t, { style: e, vars: n }, s, i) {
  const r = t.style;
  let o;
  for (o in e)
    r[o] = e[o];
  i == null || i.applyProjectionStyles(r, s);
  for (o in n)
    r.setProperty(o, n[o]);
}
function Vs(t, e) {
  return e.max === e.min ? 0 : t / (e.max - e.min) * 100;
}
const jt = {
  correct: (t, e) => {
    if (!e.target)
      return t;
    if (typeof t == "string")
      if (w.test(t))
        t = parseFloat(t);
      else
        return t;
    const n = Vs(t, e.target.x), s = Vs(t, e.target.y);
    return `${n}% ${s}%`;
  }
}, Oc = {
  correct: (t, { treeScale: e, projectionDelta: n }) => {
    const s = t, i = tt.parse(t);
    if (i.length > 5)
      return s;
    const r = tt.createTransformer(t), o = typeof i[0] != "number" ? 1 : 0, a = n.x.scale * e.x, l = n.y.scale * e.y;
    i[0 + o] /= a, i[1 + o] /= l;
    const c = R(a, l, 0.5);
    return typeof i[2 + o] == "number" && (i[2 + o] /= c), typeof i[3 + o] == "number" && (i[3 + o] /= c), r(i);
  }
}, fn = {
  borderRadius: {
    ...jt,
    applyTo: [...Fn]
  },
  borderTopLeftRadius: jt,
  borderTopRightRadius: jt,
  borderBottomLeftRadius: jt,
  borderBottomRightRadius: jt,
  boxShadow: Oc
};
function Io(t, { layout: e, layoutId: n }) {
  return It.has(t) || t.startsWith("origin") || (e || n !== void 0) && (!!fn[t] || t === "opacity");
}
function Gn(t, e, n) {
  var o;
  const s = t.style, i = e == null ? void 0 : e.style, r = {};
  if (!s)
    return r;
  for (const a in s)
    (z(s[a]) || i && z(i[a]) || Io(a, t) || ((o = n == null ? void 0 : n.getValue(a)) == null ? void 0 : o.liveStyle) !== void 0) && (r[a] = s[a]);
  return r;
}
function Nc(t) {
  return window.getComputedStyle(t);
}
class zc extends Mo {
  constructor() {
    super(...arguments), this.type = "html", this.renderInstance = Lo;
  }
  readValueFromInstance(e, n) {
    var s;
    if (It.has(n))
      return (s = this.projection) != null && s.isProjecting ? Ze(n) : nl(e, n);
    {
      const i = Nc(e), r = (Ui(n) ? i.getPropertyValue(n) : i[n]) || 0;
      return typeof r == "string" ? r.trim() : r;
    }
  }
  measureInstanceViewportBox(e, { transformPagePoint: n }) {
    return ko(e, n);
  }
  build(e, n, s) {
    Wn(e, n, s.transformTemplate);
  }
  scrapeMotionValuesFromProps(e, n, s) {
    return Gn(e, n, s);
  }
}
const Uc = {
  offset: "stroke-dashoffset",
  array: "stroke-dasharray"
}, Wc = {
  offset: "strokeDashoffset",
  array: "strokeDasharray"
};
function Gc(t, e, n = 1, s = 0, i = !0) {
  t.pathLength = 1;
  const r = i ? Uc : Wc;
  t[r.offset] = `${-s}`, t[r.array] = `${e} ${n}`;
}
const $c = [
  "offsetDistance",
  "offsetPath",
  "offsetRotate",
  "offsetAnchor"
];
function Bo(t, {
  attrX: e,
  attrY: n,
  attrScale: s,
  pathLength: i,
  pathSpacing: r = 1,
  pathOffset: o = 0,
  // This is object creation, which we try to avoid per-frame.
  ...a
}, l, c, u) {
  if (Wn(t, a, c), l) {
    t.style.viewBox && (t.attrs.viewBox = t.style.viewBox);
    return;
  }
  t.attrs = t.style, t.style = {};
  const { attrs: d, style: h } = t;
  d.transform && (h.transform = d.transform, delete d.transform), (h.transform || d.transformOrigin) && (h.transformOrigin = d.transformOrigin ?? "50% 50%", delete d.transformOrigin), h.transform && (h.transformBox = (u == null ? void 0 : u.transformBox) ?? "fill-box", delete d.transformBox);
  for (const f of $c)
    d[f] !== void 0 && (h[f] = d[f], delete d[f]);
  e !== void 0 && (d.x = e), n !== void 0 && (d.y = n), s !== void 0 && (d.scale = s), i !== void 0 && Gc(d, i, r, o, !1);
}
const Fo = /* @__PURE__ */ new Set([
  "baseFrequency",
  "diffuseConstant",
  "kernelMatrix",
  "kernelUnitLength",
  "keySplines",
  "keyTimes",
  "limitingConeAngle",
  "markerHeight",
  "markerWidth",
  "numOctaves",
  "targetX",
  "targetY",
  "surfaceScale",
  "specularConstant",
  "specularExponent",
  "stdDeviation",
  "tableValues",
  "viewBox",
  "gradientTransform",
  "pathLength",
  "startOffset",
  "textLength",
  "lengthAdjust"
]), jo = (t) => typeof t == "string" && t.toLowerCase() === "svg";
function Kc(t, e, n, s) {
  Lo(t, e, void 0, s);
  for (const i in e.attrs)
    t.setAttribute(Fo.has(i) ? i : Bn(i), e.attrs[i]);
}
function Oo(t, e, n) {
  const s = Gn(t, e, n);
  for (const i in t)
    if (z(t[i]) || z(e[i])) {
      const r = Lt.indexOf(i) !== -1 ? "attr" + i.charAt(0).toUpperCase() + i.substring(1) : i;
      s[r] = t[i];
    }
  return s;
}
class Hc extends Mo {
  constructor() {
    super(...arguments), this.type = "svg", this.isSVGTag = !1, this.measureInstanceViewportBox = N;
  }
  getBaseTargetFromProps(e, n) {
    return e[n];
  }
  readValueFromInstance(e, n) {
    if (It.has(n)) {
      const s = vo(n);
      return s && s.default || 0;
    }
    return n = Fo.has(n) ? n : Bn(n), e.getAttribute(n);
  }
  scrapeMotionValuesFromProps(e, n, s) {
    return Oo(e, n, s);
  }
  build(e, n, s) {
    Bo(e, n, this.isSVGTag, s.transformTemplate, s.style);
  }
  renderInstance(e, n, s, i) {
    Kc(e, n, s, i);
  }
  mount(e) {
    this.isSVGTag = jo(e.tagName), super.mount(e);
  }
}
const _c = Un.length;
function No(t) {
  if (!t)
    return;
  if (!t.isControllingVariants) {
    const n = t.parent ? No(t.parent) || {} : {};
    return t.props.initial !== void 0 && (n.initial = t.props.initial), n;
  }
  const e = {};
  for (let n = 0; n < _c; n++) {
    const s = Un[n], i = t.props[s];
    (_t(i) || i === !1) && (e[s] = i);
  }
  return e;
}
function zo(t, e) {
  if (!Array.isArray(e))
    return !1;
  const n = e.length;
  if (n !== t.length)
    return !1;
  for (let s = 0; s < n; s++)
    if (e[s] !== t[s])
      return !1;
  return !0;
}
const Xc = [...zn].reverse(), Yc = zn.length;
function qc(t) {
  return (e) => Promise.all(e.map(({ animation: n, options: s }) => $l(t, n, s)));
}
function Zc(t) {
  let e = qc(t), n = Ms(), s = !0, i = !1;
  const r = (c) => (u, d) => {
    var f;
    const h = wt(t, d, c === "exit" ? (f = t.presenceContext) == null ? void 0 : f.custom : void 0);
    if (h) {
      const { transition: p, transitionEnd: m, ...g } = h;
      u = { ...u, ...g, ...m };
    }
    return u;
  };
  function o(c) {
    e = c(t);
  }
  function a(c) {
    const { props: u } = t, d = No(t.parent) || {}, h = [], f = /* @__PURE__ */ new Set();
    let p = {}, m = 1 / 0;
    for (let y = 0; y < Yc; y++) {
      const v = Xc[y], b = n[v], x = u[v] !== void 0 ? u[v] : d[v], S = _t(x), D = v === c ? b.isActive : null;
      D === !1 && (m = y);
      let M = x === d[v] && x !== u[v] && S;
      if (M && (s || i) && t.manuallyAnimateOnMount && (M = !1), b.protectedKeys = { ...p }, // If it isn't active and hasn't *just* been set as inactive
      !b.isActive && D === null || // If we didn't and don't have any defined prop for this animation type
      !x && !b.prevProp || // Or if the prop doesn't define an animation
      we(x) || typeof x == "boolean")
        continue;
      if (v === "exit" && b.isActive && D !== !0) {
        b.prevResolvedValues && (p = {
          ...p,
          ...b.prevResolvedValues
        });
        continue;
      }
      const A = Jc(b.prevProp, x);
      let B = A || // If we're making this variant active, we want to always make it active
      v === c && b.isActive && !M && S || // If we removed a higher-priority variant (i is in reverse order)
      y > m && S, P = !1;
      const L = Array.isArray(x) ? x : [x];
      let V = L.reduce(r(v), {});
      D === !1 && (V = {});
      const { prevResolvedValues: et = {} } = b, $ = {
        ...et,
        ...V
      }, Y = (F) => {
        B = !0, f.has(F) && (P = !0, f.delete(F)), b.needsAnimating[F] = !0;
        const U = t.getValue(F);
        U && (U.liveStyle = !1);
      };
      for (const F in $) {
        const U = V[F], nt = et[F];
        if (p.hasOwnProperty(F))
          continue;
        let G = !1;
        sn(U) && sn(nt) ? G = !zo(U, nt) || A : G = U !== nt, G ? U != null ? Y(F) : f.add(F) : U !== void 0 && f.has(F) ? Y(F) : b.protectedKeys[F] = !0;
      }
      b.prevProp = x, b.prevResolvedValues = V, b.isActive && (p = { ...p, ...V }), (s || i) && t.blockInitialAnimation && (B = !1);
      const K = M && A;
      B && (!K || P) && h.push(...L.map((F) => {
        const U = { type: v };
        if (typeof F == "string" && (s || i) && !K && t.manuallyAnimateOnMount && t.parent) {
          const { parent: nt } = t, G = wt(nt, F);
          if (nt.enteringChildren && G) {
            const { delayChildren: ur } = G.transition || {};
            U.delay = lo(nt.enteringChildren, t, ur);
          }
        }
        return {
          animation: F,
          options: U
        };
      }));
    }
    if (f.size) {
      const y = {};
      if (typeof u.initial != "boolean") {
        const v = wt(t, Array.isArray(u.initial) ? u.initial[0] : u.initial);
        v && v.transition && (y.transition = v.transition);
      }
      f.forEach((v) => {
        const b = t.getBaseTarget(v), x = t.getValue(v);
        x && (x.liveStyle = !0), y[v] = b ?? null;
      }), h.push({ animation: y });
    }
    let g = !!h.length;
    return s && (u.initial === !1 || u.initial === u.animate) && !t.manuallyAnimateOnMount && (g = !1), s = !1, i = !1, g ? e(h) : Promise.resolve();
  }
  function l(c, u) {
    var h;
    if (n[c].isActive === u)
      return Promise.resolve();
    (h = t.variantChildren) == null || h.forEach((f) => {
      var p;
      return (p = f.animationState) == null ? void 0 : p.setActive(c, u);
    }), n[c].isActive = u;
    const d = a(c);
    for (const f in n)
      n[f].protectedKeys = {};
    return d;
  }
  return {
    animateChanges: a,
    setActive: l,
    setAnimateFunction: o,
    getState: () => n,
    reset: () => {
      n = Ms(), i = !0;
    }
  };
}
function Jc(t, e) {
  return typeof e == "string" ? e !== t : Array.isArray(e) ? !zo(e, t) : !1;
}
function gt(t = !1) {
  return {
    isActive: t,
    protectedKeys: {},
    needsAnimating: {},
    prevResolvedValues: {}
  };
}
function Ms() {
  return {
    animate: gt(!0),
    whileInView: gt(),
    whileHover: gt(),
    whileTap: gt(),
    whileDrag: gt(),
    whileFocus: gt(),
    exit: gt()
  };
}
function pn(t, e) {
  t.min = e.min, t.max = e.max;
}
function J(t, e) {
  pn(t.x, e.x), pn(t.y, e.y);
}
function Es(t, e) {
  t.translate = e.translate, t.scale = e.scale, t.originPoint = e.originPoint, t.origin = e.origin;
}
const Uo = 1e-4, Qc = 1 - Uo, tu = 1 + Uo, Wo = 0.01, eu = 0 - Wo, nu = 0 + Wo;
function _(t) {
  return t.max - t.min;
}
function su(t, e, n) {
  return Math.abs(t - e) <= n;
}
function Ds(t, e, n, s = 0.5) {
  t.origin = s, t.originPoint = R(e.min, e.max, t.origin), t.scale = _(n) / _(e), t.translate = R(n.min, n.max, t.origin) - t.originPoint, (t.scale >= Qc && t.scale <= tu || isNaN(t.scale)) && (t.scale = 1), (t.translate >= eu && t.translate <= nu || isNaN(t.translate)) && (t.translate = 0);
}
function Wt(t, e, n, s) {
  Ds(t.x, e.x, n.x, s ? s.originX : void 0), Ds(t.y, e.y, n.y, s ? s.originY : void 0);
}
function Rs(t, e, n, s = 0) {
  const i = s ? R(n.min, n.max, s) : n.min;
  t.min = i + e.min, t.max = t.min + _(e);
}
function iu(t, e, n, s) {
  Rs(t.x, e.x, n.x, s == null ? void 0 : s.x), Rs(t.y, e.y, n.y, s == null ? void 0 : s.y);
}
function ks(t, e, n, s = 0) {
  const i = s ? R(n.min, n.max, s) : n.min;
  t.min = e.min - i, t.max = t.min + _(e);
}
function ve(t, e, n, s) {
  ks(t.x, e.x, n.x, s == null ? void 0 : s.x), ks(t.y, e.y, n.y, s == null ? void 0 : s.y);
}
function Ls(t, e, n, s, i) {
  return t -= e, t = ye(t, 1 / n, s), i !== void 0 && (t = ye(t, 1 / i, s)), t;
}
function ou(t, e = 0, n = 1, s = 0.5, i, r = t, o = t) {
  if (ot.test(e) && (e = parseFloat(e), e = R(o.min, o.max, e / 100) - o.min), typeof e != "number")
    return;
  let a = R(r.min, r.max, s);
  t === r && (a -= e), t.min = Ls(t.min, e, n, a, i), t.max = Ls(t.max, e, n, a, i);
}
function Is(t, e, [n, s, i], r, o) {
  ou(t, e[n], e[s], e[i], e.scale, r, o);
}
const ru = ["x", "scaleX", "originX"], au = ["y", "scaleY", "originY"];
function Bs(t, e, n, s) {
  Is(t.x, e, ru, n ? n.x : void 0, s ? s.x : void 0), Is(t.y, e, au, n ? n.y : void 0, s ? s.y : void 0);
}
function Fs(t) {
  return t.translate === 0 && t.scale === 1;
}
function Go(t) {
  return Fs(t.x) && Fs(t.y);
}
function js(t, e) {
  return t.min === e.min && t.max === e.max;
}
function lu(t, e) {
  return js(t.x, e.x) && js(t.y, e.y);
}
function Os(t, e) {
  return Math.round(t.min) === Math.round(e.min) && Math.round(t.max) === Math.round(e.max);
}
function $o(t, e) {
  return Os(t.x, e.x) && Os(t.y, e.y);
}
function Ns(t) {
  return _(t.x) / _(t.y);
}
function zs(t, e) {
  return t.translate === e.translate && t.scale === e.scale && t.originPoint === e.originPoint;
}
function st(t) {
  return [t("x"), t("y")];
}
function cu(t, e, n) {
  let s = "";
  const i = t.x.translate / e.x, r = t.y.translate / e.y, o = (n == null ? void 0 : n.z) || 0;
  if ((i || r || o) && (s = `translate3d(${i}px, ${r}px, ${o}px) `), (e.x !== 1 || e.y !== 1) && (s += `scale(${1 / e.x}, ${1 / e.y}) `), n) {
    const { transformPerspective: c, rotate: u, pathRotation: d, rotateX: h, rotateY: f, skewX: p, skewY: m } = n;
    c && (s = `perspective(${c}px) ${s}`), u && (s += `rotate(${u}deg) `), d && (s += `rotate(${d}deg) `), h && (s += `rotateX(${h}deg) `), f && (s += `rotateY(${f}deg) `), p && (s += `skewX(${p}deg) `), m && (s += `skewY(${m}deg) `);
  }
  const a = t.x.scale * e.x, l = t.y.scale * e.y;
  return (a !== 1 || l !== 1) && (s += `scale(${a}, ${l})`), s || "none";
}
const uu = Fn.length, Us = (t) => typeof t == "string" ? parseFloat(t) : t, Ws = (t) => typeof t == "number" || w.test(t);
function du(t, e, n, s, i, r) {
  i ? (t.opacity = R(0, n.opacity ?? 1, hu(s)), t.opacityExit = R(e.opacity ?? 1, 0, fu(s))) : r && (t.opacity = R(e.opacity ?? 1, n.opacity ?? 1, s));
  for (let o = 0; o < uu; o++) {
    const a = Fn[o];
    let l = Gs(e, a), c = Gs(n, a);
    if (l === void 0 && c === void 0)
      continue;
    l || (l = 0), c || (c = 0), l === 0 || c === 0 || Ws(l) === Ws(c) ? (t[a] = Math.max(R(Us(l), Us(c), s), 0), (ot.test(c) || ot.test(l)) && (t[a] += "%")) : t[a] = c;
  }
  (e.rotate || n.rotate) && (t.rotate = R(e.rotate || 0, n.rotate || 0, s));
}
function Gs(t, e) {
  return t[e] !== void 0 ? t[e] : t.borderRadius;
}
const hu = /* @__PURE__ */ Ko(0, 0.5, Bi), fu = /* @__PURE__ */ Ko(0.5, 0.95, Z);
function Ko(t, e, n) {
  return (s) => s < t ? 0 : s > e ? 1 : n(/* @__PURE__ */ $t(t, e, s));
}
function pu(t, e, n) {
  const s = z(t) ? t : St(t);
  return s.start(Ln("", s, e, n)), s.animation;
}
function Xt(t, e, n, s = { passive: !0 }) {
  return t.addEventListener(e, n, s), () => t.removeEventListener(e, n, s);
}
const mu = (t, e) => t.depth - e.depth;
class gu {
  constructor() {
    this.children = [], this.isDirty = !1;
  }
  add(e) {
    wn(this.children, e), this.isDirty = !0;
  }
  remove(e) {
    de(this.children, e), this.isDirty = !0;
  }
  forEach(e) {
    this.isDirty && this.children.sort(mu), this.isDirty = !1, this.children.forEach(e);
  }
}
function yu(t, e) {
  const n = H.now(), s = ({ timestamp: i }) => {
    const r = i - n;
    r >= e && (ct(s), t(r - e));
  };
  return E.setup(s, !0), () => ct(s);
}
function ce(t) {
  return z(t) ? t.get() : t;
}
class vu {
  constructor() {
    this.members = [];
  }
  add(e) {
    wn(this.members, e);
    for (let n = this.members.length - 1; n >= 0; n--) {
      const s = this.members[n];
      if (s === e || s === this.lead || s === this.prevLead)
        continue;
      const i = s.instance;
      (!i || i.isConnected === !1) && !s.snapshot && (de(this.members, s), s.unmount());
    }
    e.scheduleRender();
  }
  remove(e) {
    if (de(this.members, e), e === this.prevLead && (this.prevLead = void 0), e === this.lead) {
      const n = this.members[this.members.length - 1];
      n && this.promote(n);
    }
  }
  relegate(e) {
    var n;
    for (let s = this.members.indexOf(e) - 1; s >= 0; s--) {
      const i = this.members[s];
      if (i.isPresent !== !1 && ((n = i.instance) == null ? void 0 : n.isConnected) !== !1)
        return this.promote(i), !0;
    }
    return !1;
  }
  promote(e, n) {
    var i;
    const s = this.lead;
    if (e !== s && (this.prevLead = s, this.lead = e, e.show(), s)) {
      s.updateSnapshot(), e.scheduleRender();
      const { layoutDependency: r } = s.options, { layoutDependency: o } = e.options;
      (r === void 0 || r !== o) && (e.resumeFrom = s, n && (s.preserveOpacity = !0), s.snapshot && (e.snapshot = s.snapshot, e.snapshot.latestValues = s.animationValues || s.latestValues), (i = e.root) != null && i.isUpdating && (e.isLayoutDirty = !0)), e.options.crossfade === !1 && s.hide();
    }
  }
  exitAnimationComplete() {
    this.members.forEach((e) => {
      var n, s, i, r, o;
      (s = (n = e.options).onExitComplete) == null || s.call(n), (o = (i = e.resumingFrom) == null ? void 0 : (r = i.options).onExitComplete) == null || o.call(r);
    });
  }
  scheduleRender() {
    this.members.forEach((e) => e.instance && e.scheduleRender(!1));
  }
  removeLeadSnapshot() {
    var e;
    (e = this.lead) != null && e.snapshot && (this.lead.snapshot = void 0);
  }
}
const ue = {
  /**
   * Global flag as to whether the tree has animated since the last time
   * we resized the window
   */
  hasAnimatedSinceResize: !0,
  /**
   * We set this to true once, on the first update. Any nodes added to the tree beyond that
   * update will be given a `data-projection-id` attribute.
   */
  hasEverUpdated: !1
}, Fe = ["", "X", "Y", "Z"], bu = 1e3;
let xu = 0;
function je(t, e, n, s) {
  const { latestValues: i } = e;
  i[t] && (n[t] = i[t], e.setStaticValue(t, 0), s && (s[t] = 0));
}
function Ho(t) {
  if (t.hasCheckedOptimisedAppear = !0, t.root === t)
    return;
  const { visualElement: e } = t.options;
  if (!e)
    return;
  const n = po(e);
  if (window.MotionHasOptimisedAnimation(n, "transform")) {
    const { layout: i, layoutId: r } = t.options;
    window.MotionCancelOptimisedAnimation(n, "transform", E, !(i || r));
  }
  const { parent: s } = t;
  s && !s.hasCheckedOptimisedAppear && Ho(s);
}
function _o({ attachResizeListener: t, defaultParent: e, measureScroll: n, checkIsScrollRoot: s, resetTransform: i }) {
  return class {
    constructor(o = {}, a = e == null ? void 0 : e()) {
      this.id = xu++, this.animationId = 0, this.animationCommitId = 0, this.children = /* @__PURE__ */ new Set(), this.options = {}, this.isTreeAnimating = !1, this.isAnimationBlocked = !1, this.isLayoutDirty = !1, this.isProjectionDirty = !1, this.isSharedProjectionDirty = !1, this.isTransformDirty = !1, this.updateManuallyBlocked = !1, this.updateBlockedByResize = !1, this.isUpdating = !1, this.isSVG = !1, this.needsReset = !1, this.shouldResetTransform = !1, this.hasCheckedOptimisedAppear = !1, this.treeScale = { x: 1, y: 1 }, this.eventHandlers = /* @__PURE__ */ new Map(), this.hasTreeAnimated = !1, this.layoutVersion = 0, this.updateScheduled = !1, this.scheduleUpdate = () => this.update(), this.projectionUpdateScheduled = !1, this.checkUpdateFailed = () => {
        this.isUpdating && (this.isUpdating = !1, this.clearAllSnapshots());
      }, this.updateProjection = () => {
        this.projectionUpdateScheduled = !1, this.nodes.forEach(Su), this.nodes.forEach(Eu), this.nodes.forEach(Du), this.nodes.forEach(Pu);
      }, this.resolvedRelativeTargetAt = 0, this.linkedParentVersion = 0, this.hasProjected = !1, this.isVisible = !0, this.animationProgress = 0, this.sharedNodes = /* @__PURE__ */ new Map(), this.latestValues = o, this.root = a ? a.root || a : this, this.path = a ? [...a.path, a] : [], this.parent = a, this.depth = a ? a.depth + 1 : 0;
      for (let l = 0; l < this.path.length; l++)
        this.path[l].shouldResetTransform = !0;
      this.root === this && (this.nodes = new gu());
    }
    addEventListener(o, a) {
      return this.eventHandlers.has(o) || this.eventHandlers.set(o, new Tn()), this.eventHandlers.get(o).add(a);
    }
    notifyListeners(o, ...a) {
      const l = this.eventHandlers.get(o);
      l && l.notify(...a);
    }
    hasListeners(o) {
      return this.eventHandlers.has(o);
    }
    /**
     * Lifecycles
     */
    mount(o) {
      if (this.instance)
        return;
      this.isSVG = Nn(o) && !xc(o), this.instance = o;
      const { layoutId: a, layout: l, visualElement: c } = this.options;
      if (c && !c.current && c.mount(o), this.root.nodes.add(this), this.parent && this.parent.children.add(this), this.root.hasTreeAnimated && (l || a) && (this.isLayoutDirty = !0), t) {
        let u, d = 0;
        const h = () => this.root.updateBlockedByResize = !1;
        E.read(() => {
          d = window.innerWidth;
        }), t(o, () => {
          const f = window.innerWidth;
          f !== d && (d = f, this.root.updateBlockedByResize = !0, u && u(), u = yu(h, 250), ue.hasAnimatedSinceResize && (ue.hasAnimatedSinceResize = !1, this.nodes.forEach(Hs)));
        });
      }
      a && this.root.registerSharedNode(a, this), this.options.animate !== !1 && c && (a || l) && this.addEventListener("didUpdate", ({ delta: u, hasLayoutChanged: d, hasRelativeLayoutChanged: h, layout: f }) => {
        if (this.isTreeAnimationBlocked()) {
          this.target = void 0, this.relativeTarget = void 0;
          return;
        }
        const p = this.options.transition || c.getDefaultTransition() || Bu, { onLayoutAnimationStart: m, onLayoutAnimationComplete: g } = c.getProps(), y = !this.targetLayout || !$o(this.targetLayout, f), v = !d && h;
        if (this.options.layoutRoot || this.resumeFrom || v || d && (y || !this.currentAnimation)) {
          this.resumeFrom && (this.resumingFrom = this.resumeFrom, this.resumingFrom.resumingFrom = void 0);
          const b = {
            ...kn(p, "layout"),
            onPlay: m,
            onComplete: g
          };
          (c.shouldReduceMotion || this.options.layoutRoot) && (b.delay = 0, b.type = !1), this.startAnimation(b), this.setAnimationOrigin(u, v, b.path);
        } else
          d || Hs(this), this.isLead() && this.options.onExitComplete && this.options.onExitComplete();
        this.targetLayout = f;
      });
    }
    unmount() {
      this.options.layoutId && this.willUpdate(), this.root.nodes.remove(this);
      const o = this.getStack();
      o && o.remove(this), this.parent && this.parent.children.delete(this), this.instance = void 0, this.eventHandlers.clear(), ct(this.updateProjection);
    }
    // only on the root
    blockUpdate() {
      this.updateManuallyBlocked = !0;
    }
    unblockUpdate() {
      this.updateManuallyBlocked = !1;
    }
    isUpdateBlocked() {
      return this.updateManuallyBlocked || this.updateBlockedByResize;
    }
    isTreeAnimationBlocked() {
      return this.isAnimationBlocked || this.parent && this.parent.isTreeAnimationBlocked() || !1;
    }
    // Note: currently only running on root node
    startUpdate() {
      this.isUpdateBlocked() || (this.isUpdating = !0, this.nodes && this.nodes.forEach(Ru), this.animationId++);
    }
    getTransformTemplate() {
      const { visualElement: o } = this.options;
      return o && o.getProps().transformTemplate;
    }
    willUpdate(o = !0) {
      if (this.root.hasTreeAnimated = !0, this.root.isUpdateBlocked()) {
        this.options.onExitComplete && this.options.onExitComplete();
        return;
      }
      if (window.MotionCancelOptimisedAnimation && !this.hasCheckedOptimisedAppear && Ho(this), !this.root.isUpdating && this.root.startUpdate(), this.isLayoutDirty)
        return;
      this.isLayoutDirty = !0;
      for (let u = 0; u < this.path.length; u++) {
        const d = this.path[u];
        d.shouldResetTransform = !0, (typeof d.latestValues.x == "string" || typeof d.latestValues.y == "string") && (d.isLayoutDirty = !0), d.updateScroll("snapshot"), d.options.layoutRoot && d.willUpdate(!1);
      }
      const { layoutId: a, layout: l } = this.options;
      if (a === void 0 && !l)
        return;
      const c = this.getTransformTemplate();
      this.prevTransformTemplateValue = c ? c(this.latestValues, "") : void 0, this.updateSnapshot(), o && this.notifyListeners("willUpdate");
    }
    update() {
      if (this.updateScheduled = !1, this.isUpdateBlocked()) {
        const l = this.updateBlockedByResize;
        this.unblockUpdate(), this.updateBlockedByResize = !1, this.clearAllSnapshots(), l && this.nodes.forEach(Cu), this.nodes.forEach($s);
        return;
      }
      if (this.animationId <= this.animationCommitId) {
        this.nodes.forEach(Ks);
        return;
      }
      this.animationCommitId = this.animationId, this.isUpdating ? (this.isUpdating = !1, this.nodes.forEach(Vu), this.nodes.forEach(Mu), this.nodes.forEach(wu), this.nodes.forEach(Tu)) : this.nodes.forEach(Ks), this.clearAllSnapshots();
      const a = H.now();
      W.delta = rt(0, 1e3 / 60, a - W.timestamp), W.timestamp = a, W.isProcessing = !0, Ve.update.process(W), Ve.preRender.process(W), Ve.render.process(W), W.isProcessing = !1;
    }
    didUpdate() {
      this.updateScheduled || (this.updateScheduled = !0, jn.read(this.scheduleUpdate));
    }
    clearAllSnapshots() {
      this.nodes.forEach(Au), this.sharedNodes.forEach(ku);
    }
    scheduleUpdateProjection() {
      this.projectionUpdateScheduled || (this.projectionUpdateScheduled = !0, E.preRender(this.updateProjection, !1, !0));
    }
    scheduleCheckAfterUnmount() {
      E.postRender(() => {
        this.isLayoutDirty ? this.root.didUpdate() : this.root.checkUpdateFailed();
      });
    }
    /**
     * Update measurements
     */
    updateSnapshot() {
      this.snapshot || !this.instance || (this.snapshot = this.measure(), this.snapshot && !_(this.snapshot.measuredBox.x) && !_(this.snapshot.measuredBox.y) && (this.snapshot = void 0));
    }
    updateLayout() {
      if (!this.instance || (this.updateScroll(), !(this.options.alwaysMeasureLayout && this.isLead()) && !this.isLayoutDirty))
        return;
      if (this.resumeFrom && !this.resumeFrom.instance)
        for (let l = 0; l < this.path.length; l++)
          this.path[l].updateScroll();
      const o = this.layout;
      this.layout = this.measure(!1), this.layoutVersion++, this.layoutCorrected || (this.layoutCorrected = N()), this.isLayoutDirty = !1, this.projectionDelta = void 0, this.notifyListeners("measure", this.layout.layoutBox);
      const { visualElement: a } = this.options;
      a && a.notify("LayoutMeasure", this.layout.layoutBox, o ? o.layoutBox : void 0);
    }
    updateScroll(o = "measure") {
      let a = !!(this.options.layoutScroll && this.instance);
      if (this.scroll && this.scroll.animationId === this.root.animationId && this.scroll.phase === o && (a = !1), a && this.instance) {
        const l = s(this.instance);
        this.scroll = {
          animationId: this.root.animationId,
          phase: o,
          isRoot: l,
          offset: n(this.instance),
          wasRoot: this.scroll ? this.scroll.isRoot : l
        };
      }
    }
    resetTransform() {
      if (!i)
        return;
      const o = this.isLayoutDirty || this.shouldResetTransform || this.options.alwaysMeasureLayout, a = this.projectionDelta && !Go(this.projectionDelta), l = this.getTransformTemplate(), c = l ? l(this.latestValues, "") : void 0, u = c !== this.prevTransformTemplateValue;
      o && this.instance && (a || yt(this.latestValues) || u) && (i(this.instance, c), this.shouldResetTransform = !1, this.scheduleRender());
    }
    measure(o = !0) {
      const a = this.measurePageBox();
      let l = this.removeElementScroll(a);
      return o && (l = this.removeTransform(l)), Fu(l), {
        animationId: this.root.animationId,
        measuredBox: a,
        layoutBox: l,
        latestValues: {},
        source: this.id
      };
    }
    measurePageBox() {
      var c;
      const { visualElement: o } = this.options;
      if (!o)
        return N();
      const a = o.measureViewportBox();
      if (!(((c = this.scroll) == null ? void 0 : c.wasRoot) || this.path.some(ju))) {
        const { scroll: u } = this.root;
        u && (it(a.x, u.offset.x), it(a.y, u.offset.y));
      }
      return a;
    }
    removeElementScroll(o) {
      var l;
      const a = N();
      if (J(a, o), (l = this.scroll) != null && l.wasRoot)
        return a;
      for (let c = 0; c < this.path.length; c++) {
        const u = this.path[c], { scroll: d, options: h } = u;
        u !== this.root && d && h.layoutScroll && (d.wasRoot && J(a, o), it(a.x, d.offset.x), it(a.y, d.offset.y));
      }
      return a;
    }
    applyTransform(o, a = !1, l) {
      var u, d;
      const c = l || N();
      J(c, o);
      for (let h = 0; h < this.path.length; h++) {
        const f = this.path[h];
        !a && f.options.layoutScroll && f.scroll && f !== f.root && (it(c.x, -f.scroll.offset.x), it(c.y, -f.scroll.offset.y)), yt(f.latestValues) && le(c, f.latestValues, (u = f.layout) == null ? void 0 : u.layoutBox);
      }
      return yt(this.latestValues) && le(c, this.latestValues, (d = this.layout) == null ? void 0 : d.layoutBox), c;
    }
    removeTransform(o) {
      var l;
      const a = N();
      J(a, o);
      for (let c = 0; c < this.path.length; c++) {
        const u = this.path[c];
        if (!yt(u.latestValues))
          continue;
        let d;
        u.instance && (dn(u.latestValues) && u.updateSnapshot(), d = N(), J(d, u.measurePageBox())), Bs(a, u.latestValues, (l = u.snapshot) == null ? void 0 : l.layoutBox, d);
      }
      return yt(this.latestValues) && Bs(a, this.latestValues), a;
    }
    setTargetDelta(o) {
      this.targetDelta = o, this.root.scheduleUpdateProjection(), this.isProjectionDirty = !0;
    }
    setOptions(o) {
      this.options = {
        ...this.options,
        ...o,
        crossfade: o.crossfade !== void 0 ? o.crossfade : !0
      };
    }
    clearMeasurements() {
      this.scroll = void 0, this.layout = void 0, this.snapshot = void 0, this.prevTransformTemplateValue = void 0, this.targetDelta = void 0, this.target = void 0, this.isLayoutDirty = !1;
    }
    forceRelativeParentToResolveTarget() {
      this.relativeParent && this.relativeParent.resolvedRelativeTargetAt !== W.timestamp && this.relativeParent.resolveTargetDelta(!0);
    }
    resolveTargetDelta(o = !1) {
      var f;
      const a = this.getLead();
      this.isProjectionDirty || (this.isProjectionDirty = a.isProjectionDirty), this.isTransformDirty || (this.isTransformDirty = a.isTransformDirty), this.isSharedProjectionDirty || (this.isSharedProjectionDirty = a.isSharedProjectionDirty);
      const l = !!this.resumingFrom || this !== a;
      if (!(o || l && this.isSharedProjectionDirty || this.isProjectionDirty || (f = this.parent) != null && f.isProjectionDirty || this.attemptToResolveRelativeTarget || this.root.updateBlockedByResize))
        return;
      const { layout: u, layoutId: d } = this.options;
      if (!this.layout || !(u || d))
        return;
      this.resolvedRelativeTargetAt = W.timestamp;
      const h = this.getClosestProjectingParent();
      h && this.linkedParentVersion !== h.layoutVersion && !h.options.layoutRoot && this.removeRelativeTarget(), !this.targetDelta && !this.relativeTarget && (this.options.layoutAnchor !== !1 && h && h.layout ? this.createRelativeTarget(h, this.layout.layoutBox, h.layout.layoutBox) : this.removeRelativeTarget()), !(!this.relativeTarget && !this.targetDelta) && (this.target || (this.target = N(), this.targetWithTransforms = N()), this.relativeTarget && this.relativeTargetOrigin && this.relativeParent && this.relativeParent.target ? (this.forceRelativeParentToResolveTarget(), iu(this.target, this.relativeTarget, this.relativeParent.target, this.options.layoutAnchor || void 0)) : this.targetDelta ? (this.resumingFrom ? this.applyTransform(this.layout.layoutBox, !1, this.target) : J(this.target, this.layout.layoutBox), Ro(this.target, this.targetDelta)) : J(this.target, this.layout.layoutBox), this.attemptToResolveRelativeTarget && (this.attemptToResolveRelativeTarget = !1, this.options.layoutAnchor !== !1 && h && !!h.resumingFrom == !!this.resumingFrom && !h.options.layoutScroll && h.target && this.animationProgress !== 1 ? this.createRelativeTarget(h, this.target, h.target) : this.relativeParent = this.relativeTarget = void 0));
    }
    getClosestProjectingParent() {
      if (!(!this.parent || dn(this.parent.latestValues) || Do(this.parent.latestValues)))
        return this.parent.isProjecting() ? this.parent : this.parent.getClosestProjectingParent();
    }
    isProjecting() {
      return !!((this.relativeTarget || this.targetDelta || this.options.layoutRoot) && this.layout);
    }
    createRelativeTarget(o, a, l) {
      this.relativeParent = o, this.linkedParentVersion = o.layoutVersion, this.forceRelativeParentToResolveTarget(), this.relativeTarget = N(), this.relativeTargetOrigin = N(), ve(this.relativeTargetOrigin, a, l, this.options.layoutAnchor || void 0), J(this.relativeTarget, this.relativeTargetOrigin);
    }
    removeRelativeTarget() {
      this.relativeParent = this.relativeTarget = void 0;
    }
    calcProjection() {
      var p;
      const o = this.getLead(), a = !!this.resumingFrom || this !== o;
      let l = !0;
      if ((this.isProjectionDirty || (p = this.parent) != null && p.isProjectionDirty) && (l = !1), a && (this.isSharedProjectionDirty || this.isTransformDirty) && (l = !1), this.resolvedRelativeTargetAt === W.timestamp && (l = !1), l)
        return;
      const { layout: c, layoutId: u } = this.options;
      if (this.isTreeAnimating = !!(this.parent && this.parent.isTreeAnimating || this.currentAnimation || this.pendingAnimation), this.isTreeAnimating || (this.targetDelta = this.relativeTarget = void 0), !this.layout || !(c || u))
        return;
      J(this.layoutCorrected, this.layout.layoutBox);
      const d = this.treeScale.x, h = this.treeScale.y;
      Lc(this.layoutCorrected, this.treeScale, this.path, a), o.layout && !o.target && (this.treeScale.x !== 1 || this.treeScale.y !== 1) && (o.target = o.layout.layoutBox, o.targetWithTransforms = N());
      const { target: f } = o;
      if (!f) {
        this.prevProjectionDelta && (this.createProjectionDeltas(), this.scheduleRender());
        return;
      }
      !this.projectionDelta || !this.prevProjectionDelta ? this.createProjectionDeltas() : (Es(this.prevProjectionDelta.x, this.projectionDelta.x), Es(this.prevProjectionDelta.y, this.projectionDelta.y)), Wt(this.projectionDelta, this.layoutCorrected, f, this.latestValues), (this.treeScale.x !== d || this.treeScale.y !== h || !zs(this.projectionDelta.x, this.prevProjectionDelta.x) || !zs(this.projectionDelta.y, this.prevProjectionDelta.y)) && (this.hasProjected = !0, this.scheduleRender(), this.notifyListeners("projectionUpdate", f));
    }
    hide() {
      this.isVisible = !1;
    }
    show() {
      this.isVisible = !0;
    }
    scheduleRender(o = !0) {
      var a;
      if ((a = this.options.visualElement) == null || a.scheduleRender(), o) {
        const l = this.getStack();
        l && l.scheduleRender();
      }
      this.resumingFrom && !this.resumingFrom.instance && (this.resumingFrom = void 0);
    }
    createProjectionDeltas() {
      this.prevProjectionDelta = Mt(), this.projectionDelta = Mt(), this.projectionDeltaWithTransform = Mt();
    }
    setAnimationOrigin(o, a = !1, l) {
      const c = this.snapshot, u = c ? c.latestValues : {}, d = { ...this.latestValues }, h = Mt();
      (!this.relativeParent || !this.relativeParent.options.layoutRoot) && (this.relativeTarget = this.relativeTargetOrigin = void 0), this.attemptToResolveRelativeTarget = !a;
      const f = N(), p = c ? c.source : void 0, m = this.layout ? this.layout.source : void 0, g = p !== m, y = this.getStack(), v = !y || y.members.length <= 1, b = !!(g && !v && this.options.crossfade === !0 && !this.path.some(Iu));
      this.animationProgress = 0;
      let x;
      const S = l == null ? void 0 : l.interpolateProjection(o);
      this.mixTargetDelta = (D) => {
        const M = D / 1e3, A = S == null ? void 0 : S(M);
        A ? (h.x.translate = A.x, h.x.scale = R(o.x.scale, 1, M), h.x.origin = o.x.origin, h.x.originPoint = o.x.originPoint, h.y.translate = A.y, h.y.scale = R(o.y.scale, 1, M), h.y.origin = o.y.origin, h.y.originPoint = o.y.originPoint) : (_s(h.x, o.x, M), _s(h.y, o.y, M)), this.setTargetDelta(h), this.relativeTarget && this.relativeTargetOrigin && this.layout && this.relativeParent && this.relativeParent.layout && (ve(f, this.layout.layoutBox, this.relativeParent.layout.layoutBox, this.options.layoutAnchor || void 0), Lu(this.relativeTarget, this.relativeTargetOrigin, f, M), x && lu(this.relativeTarget, x) && (this.isProjectionDirty = !1), x || (x = N()), J(x, this.relativeTarget)), g && (this.animationValues = d, du(d, u, this.latestValues, M, b, v)), A && A.rotate !== void 0 && (this.animationValues || (this.animationValues = d), this.animationValues.pathRotation = A.rotate), this.root.scheduleUpdateProjection(), this.scheduleRender(), this.animationProgress = M;
      }, this.mixTargetDelta(this.options.layoutRoot ? 1e3 : 0);
    }
    startAnimation(o) {
      var a, l, c;
      this.notifyListeners("animationStart"), (a = this.currentAnimation) == null || a.stop(), (c = (l = this.resumingFrom) == null ? void 0 : l.currentAnimation) == null || c.stop(), this.pendingAnimation && (ct(this.pendingAnimation), this.pendingAnimation = void 0), this.pendingAnimation = E.update(() => {
        ue.hasAnimatedSinceResize = !0, this.motionValue || (this.motionValue = St(0)), this.motionValue.jump(0, !1), this.currentAnimation = pu(this.motionValue, [0, 1e3], {
          ...o,
          velocity: 0,
          isSync: !0,
          onUpdate: (u) => {
            this.mixTargetDelta(u), o.onUpdate && o.onUpdate(u);
          },
          onComplete: () => {
            o.onComplete && o.onComplete(), this.completeAnimation();
          }
        }), this.resumingFrom && (this.resumingFrom.currentAnimation = this.currentAnimation), this.pendingAnimation = void 0;
      });
    }
    completeAnimation() {
      this.resumingFrom && (this.resumingFrom.currentAnimation = void 0, this.resumingFrom.preserveOpacity = void 0);
      const o = this.getStack();
      o && o.exitAnimationComplete(), this.resumingFrom = this.currentAnimation = this.animationValues = void 0, this.notifyListeners("animationComplete");
    }
    finishAnimation() {
      this.currentAnimation && (this.mixTargetDelta && this.mixTargetDelta(bu), this.currentAnimation.stop()), this.completeAnimation();
    }
    applyTransformsToTarget() {
      const o = this.getLead();
      let { targetWithTransforms: a, target: l, layout: c, latestValues: u } = o;
      if (!(!a || !l || !c)) {
        if (this !== o && this.layout && c && Xo(this.options.animationType, this.layout.layoutBox, c.layoutBox)) {
          l = this.target || N();
          const d = _(this.layout.layoutBox.x);
          l.x.min = o.target.x.min, l.x.max = l.x.min + d;
          const h = _(this.layout.layoutBox.y);
          l.y.min = o.target.y.min, l.y.max = l.y.min + h;
        }
        J(a, l), le(a, u), Wt(this.projectionDeltaWithTransform, this.layoutCorrected, a, u);
      }
    }
    registerSharedNode(o, a) {
      this.sharedNodes.has(o) || this.sharedNodes.set(o, new vu()), this.sharedNodes.get(o).add(a);
      const c = a.options.initialPromotionConfig;
      a.promote({
        transition: c ? c.transition : void 0,
        preserveFollowOpacity: c && c.shouldPreserveFollowOpacity ? c.shouldPreserveFollowOpacity(a) : void 0
      });
    }
    isLead() {
      const o = this.getStack();
      return o ? o.lead === this : !0;
    }
    getLead() {
      var a;
      const { layoutId: o } = this.options;
      return o ? ((a = this.getStack()) == null ? void 0 : a.lead) || this : this;
    }
    getPrevLead() {
      var a;
      const { layoutId: o } = this.options;
      return o ? (a = this.getStack()) == null ? void 0 : a.prevLead : void 0;
    }
    getStack() {
      const { layoutId: o } = this.options;
      if (o)
        return this.root.sharedNodes.get(o);
    }
    promote({ needsReset: o, transition: a, preserveFollowOpacity: l } = {}) {
      const c = this.getStack();
      c && c.promote(this, l), o && (this.projectionDelta = void 0, this.needsReset = !0), a && this.setOptions({ transition: a });
    }
    relegate() {
      const o = this.getStack();
      return o ? o.relegate(this) : !1;
    }
    resetSkewAndRotation() {
      const { visualElement: o } = this.options;
      if (!o)
        return;
      let a = !1;
      const { latestValues: l } = o;
      if ((l.z || l.rotate || l.rotateX || l.rotateY || l.rotateZ || l.skewX || l.skewY) && (a = !0), !a)
        return;
      const c = {};
      l.z && je("z", o, c, this.animationValues);
      for (let u = 0; u < Fe.length; u++)
        je(`rotate${Fe[u]}`, o, c, this.animationValues), je(`skew${Fe[u]}`, o, c, this.animationValues);
      o.render();
      for (const u in c)
        o.setStaticValue(u, c[u]), this.animationValues && (this.animationValues[u] = c[u]);
      o.scheduleRender();
    }
    applyProjectionStyles(o, a) {
      if (!this.instance || this.isSVG)
        return;
      if (!this.isVisible) {
        o.visibility = "hidden";
        return;
      }
      const l = this.getTransformTemplate();
      if (this.needsReset) {
        this.needsReset = !1, o.visibility = "", o.opacity = "", o.pointerEvents = ce(a == null ? void 0 : a.pointerEvents) || "", o.transform = l ? l(this.latestValues, "") : "none";
        return;
      }
      const c = this.getLead();
      if (!this.projectionDelta || !this.layout || !c.target) {
        this.options.layoutId && (o.opacity = this.latestValues.opacity !== void 0 ? this.latestValues.opacity : 1, o.pointerEvents = ce(a == null ? void 0 : a.pointerEvents) || ""), this.hasProjected && !yt(this.latestValues) && (o.transform = l ? l({}, "") : "none", this.hasProjected = !1);
        return;
      }
      o.visibility = "";
      const u = c.animationValues || c.latestValues;
      this.applyTransformsToTarget();
      let d = cu(this.projectionDeltaWithTransform, this.treeScale, u);
      l && (d = l(u, d)), o.transform = d;
      const { x: h, y: f } = this.projectionDelta;
      o.transformOrigin = `${h.origin * 100}% ${f.origin * 100}% 0`, c.animationValues ? o.opacity = c === this ? u.opacity ?? this.latestValues.opacity ?? 1 : this.preserveOpacity ? this.latestValues.opacity : u.opacityExit : o.opacity = c === this ? u.opacity !== void 0 ? u.opacity : "" : u.opacityExit !== void 0 ? u.opacityExit : 0;
      for (const p in fn) {
        if (u[p] === void 0)
          continue;
        const { correct: m, applyTo: g, isCSSVariable: y } = fn[p], v = d === "none" ? u[p] : m(u[p], c);
        if (g) {
          const b = g.length;
          for (let x = 0; x < b; x++)
            o[g[x]] = v;
        } else
          y ? this.options.visualElement.renderState.vars[p] = v : o[p] = v;
      }
      this.options.layoutId && (o.pointerEvents = c === this ? ce(a == null ? void 0 : a.pointerEvents) || "" : "none");
    }
    clearSnapshot() {
      this.resumeFrom = this.snapshot = void 0;
    }
    // Only run on root
    resetTree() {
      this.root.nodes.forEach((o) => {
        var a;
        return (a = o.currentAnimation) == null ? void 0 : a.stop();
      }), this.root.nodes.forEach($s), this.root.sharedNodes.clear();
    }
  };
}
function wu(t) {
  t.updateLayout();
}
function Tu(t) {
  var n;
  const e = ((n = t.resumeFrom) == null ? void 0 : n.snapshot) || t.snapshot;
  if (t.isLead() && t.layout && e && t.hasListeners("didUpdate")) {
    const { layoutBox: s, measuredBox: i } = t.layout, { animationType: r } = t.options, o = e.source !== t.layout.source;
    if (r === "size")
      st((d) => {
        const h = o ? e.measuredBox[d] : e.layoutBox[d], f = _(h);
        h.min = s[d].min, h.max = h.min + f;
      });
    else if (r === "x" || r === "y") {
      const d = r === "x" ? "y" : "x";
      pn(o ? e.measuredBox[d] : e.layoutBox[d], s[d]);
    } else Xo(r, e.layoutBox, s) && st((d) => {
      const h = o ? e.measuredBox[d] : e.layoutBox[d], f = _(s[d]);
      h.max = h.min + f, t.relativeTarget && !t.currentAnimation && (t.isProjectionDirty = !0, t.relativeTarget[d].max = t.relativeTarget[d].min + f);
    });
    const a = Mt();
    Wt(a, s, e.layoutBox);
    const l = Mt();
    o ? Wt(l, t.applyTransform(i, !0), e.measuredBox) : Wt(l, s, e.layoutBox);
    const c = !Go(a);
    let u = !1;
    if (!t.resumeFrom) {
      const d = t.getClosestProjectingParent();
      if (d && !d.resumeFrom) {
        const { snapshot: h, layout: f } = d;
        if (h && f) {
          const p = t.options.layoutAnchor || void 0, m = N();
          ve(m, e.layoutBox, h.layoutBox, p);
          const g = N();
          ve(g, s, f.layoutBox, p), $o(m, g) || (u = !0), d.options.layoutRoot && (t.relativeTarget = g, t.relativeTargetOrigin = m, t.relativeParent = d);
        }
      }
    }
    t.notifyListeners("didUpdate", {
      layout: s,
      snapshot: e,
      delta: l,
      layoutDelta: a,
      hasLayoutChanged: c,
      hasRelativeLayoutChanged: u
    });
  } else if (t.isLead()) {
    const { onExitComplete: s } = t.options;
    s && s();
  }
  t.options.transition = void 0;
}
function Su(t) {
  t.parent && (t.isProjecting() || (t.isProjectionDirty = t.parent.isProjectionDirty), t.isSharedProjectionDirty || (t.isSharedProjectionDirty = !!(t.isProjectionDirty || t.parent.isProjectionDirty || t.parent.isSharedProjectionDirty)), t.isTransformDirty || (t.isTransformDirty = t.parent.isTransformDirty));
}
function Pu(t) {
  t.isProjectionDirty = t.isSharedProjectionDirty = t.isTransformDirty = !1;
}
function Au(t) {
  t.clearSnapshot();
}
function $s(t) {
  t.clearMeasurements();
}
function Cu(t) {
  t.isLayoutDirty = !0, t.updateLayout();
}
function Ks(t) {
  t.isLayoutDirty = !1;
}
function Vu(t) {
  t.isAnimationBlocked && t.layout && !t.isLayoutDirty && (t.snapshot = t.layout, t.isLayoutDirty = !0);
}
function Mu(t) {
  const { visualElement: e } = t.options;
  e && e.getProps().onBeforeLayoutMeasure && e.notify("BeforeLayoutMeasure"), t.resetTransform();
}
function Hs(t) {
  t.finishAnimation(), t.targetDelta = t.relativeTarget = t.target = void 0, t.isProjectionDirty = !0;
}
function Eu(t) {
  t.resolveTargetDelta();
}
function Du(t) {
  t.calcProjection();
}
function Ru(t) {
  t.resetSkewAndRotation();
}
function ku(t) {
  t.removeLeadSnapshot();
}
function _s(t, e, n) {
  t.translate = R(e.translate, 0, n), t.scale = R(e.scale, 1, n), t.origin = e.origin, t.originPoint = e.originPoint;
}
function Xs(t, e, n, s) {
  t.min = R(e.min, n.min, s), t.max = R(e.max, n.max, s);
}
function Lu(t, e, n, s) {
  Xs(t.x, e.x, n.x, s), Xs(t.y, e.y, n.y, s);
}
function Iu(t) {
  return t.animationValues && t.animationValues.opacityExit !== void 0;
}
const Bu = {
  duration: 0.45,
  ease: [0.4, 0, 0.1, 1]
}, Ys = (t) => typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().includes(t), qs = Ys("applewebkit/") && !Ys("chrome/") ? Math.round : Z;
function Zs(t) {
  t.min = qs(t.min), t.max = qs(t.max);
}
function Fu(t) {
  Zs(t.x), Zs(t.y);
}
function Xo(t, e, n) {
  return t === "position" || t === "preserve-aspect" && !su(Ns(e), Ns(n), 0.2);
}
function ju(t) {
  var e;
  return t !== t.root && ((e = t.scroll) == null ? void 0 : e.wasRoot);
}
const Ou = _o({
  attachResizeListener: (t, e) => Xt(t, "resize", e),
  measureScroll: () => {
    var t, e;
    return {
      x: document.documentElement.scrollLeft || ((t = document.body) == null ? void 0 : t.scrollLeft) || 0,
      y: document.documentElement.scrollTop || ((e = document.body) == null ? void 0 : e.scrollTop) || 0
    };
  },
  checkIsScrollRoot: () => !0
}), Oe = {
  current: void 0
}, Yo = _o({
  measureScroll: (t) => ({
    x: t.scrollLeft,
    y: t.scrollTop
  }),
  defaultParent: () => {
    if (!Oe.current) {
      const t = new Ou({});
      t.mount(window), t.setOptions({ layoutScroll: !0 }), Oe.current = t;
    }
    return Oe.current;
  },
  resetTransform: (t, e) => {
    t.style.transform = e !== void 0 ? e : "none";
  },
  checkIsScrollRoot: (t) => window.getComputedStyle(t).position === "fixed"
}), Se = T.createContext({
  transformPagePoint: (t) => t,
  isStatic: !1,
  reducedMotion: "never"
});
function Nu(t = !0) {
  const e = T.useContext(xn);
  if (e === null)
    return [!0, null];
  const { isPresent: n, onExitComplete: s, register: i } = e, r = T.useId();
  T.useEffect(() => {
    if (t)
      return i(r);
  }, [t]);
  const o = T.useCallback(() => t && s && s(r), [r, s, t]);
  return !n && s ? [!1, o] : [!0];
}
const qo = T.createContext({ strict: !1 }), Js = {
  animation: [
    "animate",
    "variants",
    "whileHover",
    "whileTap",
    "exit",
    "whileInView",
    "whileFocus",
    "whileDrag"
  ],
  exit: ["exit"],
  drag: ["drag", "dragControls"],
  focus: ["whileFocus"],
  hover: ["whileHover", "onHoverStart", "onHoverEnd"],
  tap: ["whileTap", "onTap", "onTapStart", "onTapCancel"],
  pan: ["onPan", "onPanStart", "onPanSessionStart", "onPanEnd"],
  inView: ["whileInView", "onViewportEnter", "onViewportLeave"],
  layout: ["layout", "layoutId"]
};
let Qs = !1;
function zu() {
  if (Qs)
    return;
  const t = {};
  for (const e in Js)
    t[e] = {
      isEnabled: (n) => Js[e].some((s) => !!n[s])
    };
  Vo(t), Qs = !0;
}
function Zo() {
  return zu(), Ec();
}
function Uu(t) {
  const e = Zo();
  for (const n in t)
    e[n] = {
      ...e[n],
      ...t[n]
    };
  Vo(e);
}
const Wu = /* @__PURE__ */ new Set([
  "animate",
  "exit",
  "variants",
  "initial",
  "style",
  "values",
  "variants",
  "transition",
  "transformTemplate",
  "custom",
  "inherit",
  "onBeforeLayoutMeasure",
  "onAnimationStart",
  "onAnimationComplete",
  "onUpdate",
  "onDragStart",
  "onDrag",
  "onDragEnd",
  "onMeasureDragConstraints",
  "onDirectionLock",
  "onDragTransitionEnd",
  "_dragX",
  "_dragY",
  "onHoverStart",
  "onHoverEnd",
  "onViewportEnter",
  "onViewportLeave",
  "globalTapTarget",
  "propagate",
  "ignoreStrict",
  "viewport"
]);
function be(t) {
  return t.startsWith("while") || t.startsWith("drag") && t !== "draggable" || t.startsWith("layout") || t.startsWith("onTap") || t.startsWith("onPan") || t.startsWith("onLayout") || Wu.has(t);
}
let Jo = (t) => !be(t);
function Gu(t) {
  typeof t == "function" && (Jo = (e) => e.startsWith("on") ? !be(e) : t(e));
}
try {
  Gu(require("@emotion/is-prop-valid").default);
} catch {
}
function $u(t, e, n) {
  const s = {};
  for (const i in t)
    i === "values" && typeof t.values == "object" || z(t[i]) || (Jo(i) || n === !0 && be(i) || !e && !be(i) || // If trying to use native HTML drag events, forward drag listeners
    t.draggable && i.startsWith("onDrag")) && (s[i] = t[i]);
  return s;
}
const Pe = /* @__PURE__ */ T.createContext({});
function Ku(t, e) {
  if (Te(t)) {
    const { initial: n, animate: s } = t;
    return {
      initial: n === !1 || _t(n) ? n : void 0,
      animate: _t(s) ? s : void 0
    };
  }
  return t.inherit !== !1 ? e : {};
}
function Hu(t) {
  const { initial: e, animate: n } = Ku(t, T.useContext(Pe));
  return T.useMemo(() => ({ initial: e, animate: n }), [ti(e), ti(n)]);
}
function ti(t) {
  return Array.isArray(t) ? t.join(" ") : t;
}
const $n = () => ({
  style: {},
  transform: {},
  transformOrigin: {},
  vars: {}
});
function Qo(t, e, n) {
  for (const s in e)
    !z(e[s]) && !Io(s, n) && (t[s] = e[s]);
}
function _u({ transformTemplate: t }, e) {
  return T.useMemo(() => {
    const n = $n();
    return Wn(n, e, t), Object.assign({}, n.vars, n.style);
  }, [e]);
}
function Xu(t, e) {
  const n = t.style || {}, s = {};
  return Qo(s, n, t), Object.assign(s, _u(t, e)), s;
}
function Yu(t, e) {
  const n = {}, s = Xu(t, e);
  return t.drag && t.dragListener !== !1 && (n.draggable = !1, s.userSelect = s.WebkitUserSelect = s.WebkitTouchCallout = "none", s.touchAction = t.drag === !0 ? "none" : `pan-${t.drag === "x" ? "y" : "x"}`), t.tabIndex === void 0 && (t.onTap || t.onTapStart || t.whileTap) && (n.tabIndex = 0), n.style = s, n;
}
const tr = () => ({
  ...$n(),
  attrs: {}
});
function qu(t, e, n, s) {
  const i = T.useMemo(() => {
    const r = tr();
    return Bo(r, e, jo(s), t.transformTemplate, t.style), {
      ...r.attrs,
      style: { ...r.style }
    };
  }, [e]);
  if (t.style) {
    const r = {};
    Qo(r, t.style, t), i.style = { ...r, ...i.style };
  }
  return i;
}
const Zu = [
  "animate",
  "circle",
  "defs",
  "desc",
  "ellipse",
  "g",
  "image",
  "line",
  "filter",
  "marker",
  "mask",
  "metadata",
  "path",
  "pattern",
  "polygon",
  "polyline",
  "rect",
  "stop",
  "switch",
  "symbol",
  "svg",
  "text",
  "tspan",
  "use",
  "view"
];
function Kn(t) {
  return (
    /**
     * If it's not a string, it's a custom React component. Currently we only support
     * HTML custom React components.
     */
    typeof t != "string" || /**
     * If it contains a dash, the element is a custom HTML webcomponent.
     */
    t.includes("-") ? !1 : (
      /**
       * If it's in our list of lowercase SVG tags, it's an SVG component
       */
      !!(Zu.indexOf(t) > -1 || /**
       * If it contains a capital letter, it's an SVG component
       */
      /[A-Z]/u.test(t))
    )
  );
}
function Ju(t, e, n, { latestValues: s }, i, r = !1, o) {
  const l = (o ?? Kn(t) ? qu : Yu)(e, s, i, t), c = $u(e, typeof t == "string", r), u = t !== T.Fragment ? { ...c, ...l, ref: n } : {}, { children: d } = e, h = T.useMemo(() => z(d) ? d.get() : d, [d]);
  return T.createElement(t, {
    ...u,
    children: h
  });
}
function Qu({ scrapeMotionValuesFromProps: t, createRenderState: e }, n, s, i) {
  return {
    latestValues: td(n, s, i, t),
    renderState: e()
  };
}
function td(t, e, n, s) {
  const i = {}, r = s(t, {});
  for (const h in r)
    i[h] = ce(r[h]);
  let { initial: o, animate: a } = t;
  const l = Te(t), c = Ao(t);
  e && c && !l && t.inherit !== !1 && (o === void 0 && (o = e.initial), a === void 0 && (a = e.animate));
  let u = n ? n.initial === !1 : !1;
  u = u || o === !1;
  const d = u ? a : o;
  if (d && typeof d != "boolean" && !we(d)) {
    const h = Array.isArray(d) ? d : [d];
    for (let f = 0; f < h.length; f++) {
      const p = In(t, h[f]);
      if (p) {
        const { transitionEnd: m, transition: g, ...y } = p;
        for (const v in y) {
          let b = y[v];
          if (Array.isArray(b)) {
            const x = u ? b.length - 1 : 0;
            b = b[x];
          }
          b !== null && (i[v] = b);
        }
        for (const v in m)
          i[v] = m[v];
      }
    }
  }
  return i;
}
const er = (t) => (e, n) => {
  const s = T.useContext(Pe), i = T.useContext(xn), r = () => Qu(t, e, s, i);
  return n ? r() : bn(r);
}, ed = /* @__PURE__ */ er({
  scrapeMotionValuesFromProps: Gn,
  createRenderState: $n
}), nd = /* @__PURE__ */ er({
  scrapeMotionValuesFromProps: Oo,
  createRenderState: tr
}), sd = Symbol.for("motionComponentSymbol");
function id(t, e, n) {
  const s = T.useRef(n);
  T.useInsertionEffect(() => {
    s.current = n;
  });
  const i = T.useRef(null);
  return T.useCallback((r) => {
    var a;
    r && ((a = t.onMount) == null || a.call(t, r)), e && (r ? e.mount(r) : e.unmount());
    const o = s.current;
    if (typeof o == "function")
      if (r) {
        const l = o(r);
        typeof l == "function" && (i.current = l);
      } else i.current ? (i.current(), i.current = null) : o(r);
    else o && (o.current = r);
  }, [e]);
}
const nr = T.createContext({});
function At(t) {
  return t && typeof t == "object" && Object.prototype.hasOwnProperty.call(t, "current");
}
function od(t, e, n, s, i, r) {
  var b, x;
  const { visualElement: o } = T.useContext(Pe), a = T.useContext(qo), l = T.useContext(xn), c = T.useContext(Se), u = c.reducedMotion, d = c.skipAnimations, h = T.useRef(null), f = T.useRef(!1);
  s = s || a.renderer, !h.current && s && (h.current = s(t, {
    visualState: e,
    parent: o,
    props: n,
    presenceContext: l,
    blockInitialAnimation: l ? l.initial === !1 : !1,
    reducedMotionConfig: u,
    skipAnimations: d,
    isSVG: r
  }), f.current && h.current && (h.current.manuallyAnimateOnMount = !0));
  const p = h.current, m = T.useContext(nr);
  p && !p.projection && i && (p.type === "html" || p.type === "svg") && rd(h.current, n, i, m);
  const g = T.useRef(!1);
  T.useInsertionEffect(() => {
    p && g.current && p.update(n, l);
  });
  const y = n[fo], v = T.useRef(!!y && typeof window < "u" && !((b = window.MotionHandoffIsComplete) != null && b.call(window, y)) && ((x = window.MotionHasOptimisedAnimation) == null ? void 0 : x.call(window, y)));
  return Si(() => {
    f.current = !0, p && (g.current = !0, window.MotionIsMounted = !0, p.updateFeatures(), p.scheduleRenderMicrotask(), v.current && p.animationState && p.animationState.animateChanges());
  }), T.useEffect(() => {
    p && (!v.current && p.animationState && p.animationState.animateChanges(), v.current && (queueMicrotask(() => {
      var S;
      (S = window.MotionHandoffMarkAsComplete) == null || S.call(window, y);
    }), v.current = !1), p.enteringChildren = void 0);
  }), p;
}
function rd(t, e, n, s) {
  const { layoutId: i, layout: r, drag: o, dragConstraints: a, layoutScroll: l, layoutRoot: c, layoutAnchor: u, layoutCrossfade: d } = e;
  t.projection = new n(t.latestValues, e["data-framer-portal-id"] ? void 0 : sr(t.parent)), t.projection.setOptions({
    layoutId: i,
    layout: r,
    alwaysMeasureLayout: !!o || a && At(a),
    visualElement: t,
    /**
     * TODO: Update options in an effect. This could be tricky as it'll be too late
     * to update by the time layout animations run.
     * We also need to fix this safeToRemove by linking it up to the one returned by usePresence,
     * ensuring it gets called if there's no potential layout animations.
     *
     */
    animationType: typeof r == "string" ? r : "both",
    initialPromotionConfig: s,
    crossfade: d,
    layoutScroll: l,
    layoutRoot: c,
    layoutAnchor: u
  });
}
function sr(t) {
  if (t)
    return t.options.allowProjection !== !1 ? t.projection : sr(t.parent);
}
function Ne(t, { forwardMotionProps: e = !1, type: n } = {}, s, i) {
  s && Uu(s);
  const r = n ? n === "svg" : Kn(t), o = r ? nd : ed;
  function a(c, u) {
    let d;
    const h = {
      ...T.useContext(Se),
      ...c,
      layoutId: ad(c)
    }, { isStatic: f } = h, p = Hu(c), m = o(c, f);
    if (!f && typeof window < "u") {
      ld();
      const g = cd(h);
      d = g.MeasureLayout, p.visualElement = od(t, m, h, i, g.ProjectionNode, r);
    }
    return j.jsxs(Pe.Provider, { value: p, children: [d && p.visualElement ? j.jsx(d, { visualElement: p.visualElement, ...h }) : null, Ju(t, c, id(m, p.visualElement, u), m, f, e, r)] });
  }
  a.displayName = `motion.${typeof t == "string" ? t : `create(${t.displayName ?? t.name ?? ""})`}`;
  const l = T.forwardRef(a);
  return l[sd] = t, l;
}
function ad({ layoutId: t }) {
  const e = T.useContext(Ti).id;
  return e && t !== void 0 ? e + "-" + t : t;
}
function ld(t, e) {
  T.useContext(qo).strict;
}
function cd(t) {
  const e = Zo(), { drag: n, layout: s } = e;
  if (!n && !s)
    return {};
  const i = { ...n, ...s };
  return {
    MeasureLayout: n != null && n.isEnabled(t) || s != null && s.isEnabled(t) ? i.MeasureLayout : void 0,
    ProjectionNode: i.ProjectionNode
  };
}
function ud(t, e) {
  if (typeof Proxy > "u")
    return Ne;
  const n = /* @__PURE__ */ new Map(), s = (r, o) => Ne(r, o, t, e), i = (r, o) => s(r, o);
  return new Proxy(i, {
    /**
     * Called when `motion` is referenced with a prop: `motion.div`, `motion.input` etc.
     * The prop name is passed through as `key` and we can use that to generate a `motion`
     * DOM component with that name.
     */
    get: (r, o) => o === "create" ? s : (n.has(o) || n.set(o, Ne(o, void 0, t, e)), n.get(o))
  });
}
const dd = (t, e) => e.isSVG ?? Kn(t) ? new Hc(e) : new zc(e, {
  allowProjection: t !== T.Fragment
});
class hd extends mt {
  /**
   * We dynamically generate the AnimationState manager as it contains a reference
   * to the underlying animation library. We only want to load that if we load this,
   * so people can optionally code split it out using the `m` component.
   */
  constructor(e) {
    super(e), e.animationState || (e.animationState = Zc(e));
  }
  updateAnimationControlsSubscription() {
    const { animate: e } = this.node.getProps();
    we(e) && (this.unmountControls = e.subscribe(this.node));
  }
  /**
   * Subscribe any provided AnimationControls to the component's VisualElement
   */
  mount() {
    this.updateAnimationControlsSubscription();
  }
  update() {
    const { animate: e } = this.node.getProps(), { animate: n } = this.node.prevProps || {};
    e !== n && this.updateAnimationControlsSubscription();
  }
  unmount() {
    var e;
    this.node.animationState.reset(), (e = this.unmountControls) == null || e.call(this);
  }
}
let fd = 0;
class pd extends mt {
  constructor() {
    super(...arguments), this.id = fd++, this.isExitComplete = !1;
  }
  update() {
    var r;
    if (!this.node.presenceContext)
      return;
    const { isPresent: e, onExitComplete: n } = this.node.presenceContext, { isPresent: s } = this.node.prevPresenceContext || {};
    if (!this.node.animationState || e === s)
      return;
    if (e && s === !1) {
      if (this.isExitComplete) {
        const { initial: o, custom: a } = this.node.getProps();
        if (typeof o == "string" || typeof o == "object" && o !== null && !Array.isArray(o)) {
          const l = wt(this.node, o, a);
          if (l) {
            const { transition: c, transitionEnd: u, ...d } = l;
            for (const h in d)
              (r = this.node.getValue(h)) == null || r.jump(d[h]);
          }
        }
        this.node.animationState.reset(), this.node.animationState.animateChanges();
      } else
        this.node.animationState.setActive("exit", !1);
      this.isExitComplete = !1;
      return;
    }
    const i = this.node.animationState.setActive("exit", !e);
    n && !e && i.then(() => {
      this.isExitComplete = !0, n(this.id);
    });
  }
  mount() {
    const { register: e, onExitComplete: n } = this.node.presenceContext || {};
    n && n(this.id), e && (this.unmount = e(this.id));
  }
  unmount() {
  }
}
const md = {
  animation: {
    Feature: hd
  },
  exit: {
    Feature: pd
  }
};
function Qt(t) {
  return {
    point: {
      x: t.pageX,
      y: t.pageY
    }
  };
}
const gd = (t) => (e) => On(e) && t(e, Qt(e));
function Gt(t, e, n, s) {
  return Xt(t, e, gd(n), s);
}
const ir = ({ current: t }) => t ? t.ownerDocument.defaultView : null, ei = (t, e) => Math.abs(t - e);
function yd(t, e) {
  const n = ei(t.x, e.x), s = ei(t.y, e.y);
  return Math.sqrt(n ** 2 + s ** 2);
}
const ni = /* @__PURE__ */ new Set(["auto", "scroll"]);
class or {
  constructor(e, n, { transformPagePoint: s, contextWindow: i = window, dragSnapToOrigin: r = !1, distanceThreshold: o = 3, element: a } = {}) {
    if (this.startEvent = null, this.lastMoveEvent = null, this.lastMoveEventInfo = null, this.lastRawMoveEventInfo = null, this.handlers = {}, this.contextWindow = window, this.scrollPositions = /* @__PURE__ */ new Map(), this.removeScrollListeners = null, this.onElementScroll = (p) => {
      this.handleScroll(p.target);
    }, this.onWindowScroll = () => {
      this.handleScroll(window);
    }, this.updatePoint = () => {
      if (!(this.lastMoveEvent && this.lastMoveEventInfo))
        return;
      this.lastRawMoveEventInfo && (this.lastMoveEventInfo = ne(this.lastRawMoveEventInfo, this.transformPagePoint));
      const p = ze(this.lastMoveEventInfo, this.history), m = this.startEvent !== null, g = yd(p.offset, { x: 0, y: 0 }) >= this.distanceThreshold;
      if (!m && !g)
        return;
      const { point: y } = p, { timestamp: v } = W;
      this.history.push({ ...y, timestamp: v });
      const { onStart: b, onMove: x } = this.handlers;
      m || (b && b(this.lastMoveEvent, p), this.startEvent = this.lastMoveEvent), x && x(this.lastMoveEvent, p);
    }, this.handlePointerMove = (p, m) => {
      this.lastMoveEvent = p, this.lastRawMoveEventInfo = m, this.lastMoveEventInfo = ne(m, this.transformPagePoint), E.update(this.updatePoint, !0);
    }, this.handlePointerUp = (p, m) => {
      this.end();
      const { onEnd: g, onSessionEnd: y, resumeAnimation: v } = this.handlers;
      if ((this.dragSnapToOrigin || !this.startEvent) && v && v(), !(this.lastMoveEvent && this.lastMoveEventInfo))
        return;
      const b = ze(p.type === "pointercancel" ? this.lastMoveEventInfo : ne(m, this.transformPagePoint), this.history);
      this.startEvent && g && g(p, b), y && y(p, b);
    }, !On(e))
      return;
    this.dragSnapToOrigin = r, this.handlers = n, this.transformPagePoint = s, this.distanceThreshold = o, this.contextWindow = i || window;
    const l = Qt(e), c = ne(l, this.transformPagePoint), { point: u } = c, { timestamp: d } = W;
    this.history = [{ ...u, timestamp: d }];
    const { onSessionStart: h } = n;
    h && h(e, ze(c, this.history));
    const f = { passive: !0, capture: !0 };
    this.removeListeners = qt(Gt(this.contextWindow, "pointermove", this.handlePointerMove, f), Gt(this.contextWindow, "pointerup", this.handlePointerUp, f), Gt(this.contextWindow, "pointercancel", this.handlePointerUp, f)), a && this.startScrollTracking(a);
  }
  /**
   * Start tracking scroll on ancestors and window.
   */
  startScrollTracking(e) {
    let n = e.parentElement;
    for (; n; ) {
      const s = getComputedStyle(n);
      (ni.has(s.overflowX) || ni.has(s.overflowY)) && this.scrollPositions.set(n, {
        x: n.scrollLeft,
        y: n.scrollTop
      }), n = n.parentElement;
    }
    this.scrollPositions.set(window, {
      x: window.scrollX,
      y: window.scrollY
    }), window.addEventListener("scroll", this.onElementScroll, {
      capture: !0
    }), window.addEventListener("scroll", this.onWindowScroll), this.removeScrollListeners = () => {
      window.removeEventListener("scroll", this.onElementScroll, {
        capture: !0
      }), window.removeEventListener("scroll", this.onWindowScroll);
    };
  }
  /**
   * Handle scroll compensation during drag.
   *
   * For element scroll: adjusts history origin since pageX/pageY doesn't change.
   * For window scroll: adjusts lastMoveEventInfo since pageX/pageY would change.
   */
  handleScroll(e) {
    const n = this.scrollPositions.get(e);
    if (!n)
      return;
    const s = e === window, i = s ? { x: window.scrollX, y: window.scrollY } : {
      x: e.scrollLeft,
      y: e.scrollTop
    }, r = { x: i.x - n.x, y: i.y - n.y };
    r.x === 0 && r.y === 0 || (s ? this.lastMoveEventInfo && (this.lastMoveEventInfo.point.x += r.x, this.lastMoveEventInfo.point.y += r.y) : this.history.length > 0 && (this.history[0].x -= r.x, this.history[0].y -= r.y), this.scrollPositions.set(e, i), E.update(this.updatePoint, !0));
  }
  updateHandlers(e) {
    this.handlers = e;
  }
  end() {
    this.removeListeners && this.removeListeners(), this.removeScrollListeners && this.removeScrollListeners(), this.scrollPositions.clear(), ct(this.updatePoint);
  }
}
function ne(t, e) {
  return e ? { point: e(t.point) } : t;
}
function si(t, e) {
  return { x: t.x - e.x, y: t.y - e.y };
}
function ze({ point: t }, e) {
  return {
    point: t,
    delta: si(t, rr(e)),
    offset: si(t, vd(e)),
    velocity: bd(e, 0.1)
  };
}
function vd(t) {
  return t[0];
}
function rr(t) {
  return t[t.length - 1];
}
function bd(t, e) {
  if (t.length < 2)
    return { x: 0, y: 0 };
  let n = t.length - 1, s = null;
  const i = rr(t);
  for (; n >= 0 && (s = t[n], !(i.timestamp - s.timestamp > /* @__PURE__ */ X(e))); )
    n--;
  if (!s)
    return { x: 0, y: 0 };
  s === t[0] && t.length > 2 && i.timestamp - s.timestamp > /* @__PURE__ */ X(e) * 2 && (s = t[1]);
  const r = /* @__PURE__ */ q(i.timestamp - s.timestamp);
  if (r === 0)
    return { x: 0, y: 0 };
  const o = {
    x: (i.x - s.x) / r,
    y: (i.y - s.y) / r
  };
  return o.x === 1 / 0 && (o.x = 0), o.y === 1 / 0 && (o.y = 0), o;
}
function xd(t, { min: e, max: n }, s) {
  return e !== void 0 && t < e ? t = s ? R(e, t, s.min) : Math.max(t, e) : n !== void 0 && t > n && (t = s ? R(n, t, s.max) : Math.min(t, n)), t;
}
function ii(t, e, n) {
  return {
    min: e !== void 0 ? t.min + e : void 0,
    max: n !== void 0 ? t.max + n - (t.max - t.min) : void 0
  };
}
function wd(t, { top: e, left: n, bottom: s, right: i }) {
  return {
    x: ii(t.x, n, i),
    y: ii(t.y, e, s)
  };
}
function oi(t, e) {
  let n = e.min - t.min, s = e.max - t.max;
  return e.max - e.min < t.max - t.min && ([n, s] = [s, n]), { min: n, max: s };
}
function Td(t, e) {
  return {
    x: oi(t.x, e.x),
    y: oi(t.y, e.y)
  };
}
function Sd(t, e) {
  let n = 0.5;
  const s = _(t), i = _(e);
  return i > s ? n = /* @__PURE__ */ $t(e.min, e.max - s, t.min) : s > i && (n = /* @__PURE__ */ $t(t.min, t.max - i, e.min)), rt(0, 1, n);
}
function Pd(t, e) {
  const n = {};
  return e.min !== void 0 && (n.min = e.min - t.min), e.max !== void 0 && (n.max = e.max - t.min), n;
}
const mn = 0.35;
function Ad(t = mn) {
  return t === !1 ? t = 0 : t === !0 && (t = mn), {
    x: ri(t, "left", "right"),
    y: ri(t, "top", "bottom")
  };
}
function ri(t, e, n) {
  return {
    min: ai(t, e),
    max: ai(t, n)
  };
}
function ai(t, e) {
  return typeof t == "number" ? t : t[e] || 0;
}
const Cd = /* @__PURE__ */ new WeakMap();
class Vd {
  constructor(e) {
    this.openDragLock = null, this.isDragging = !1, this.currentDirection = null, this.originPoint = { x: 0, y: 0 }, this.constraints = !1, this.hasMutatedConstraints = !1, this.elastic = N(), this.latestPointerEvent = null, this.latestPanInfo = null, this.visualElement = e;
  }
  start(e, { snapToCursor: n = !1, distanceThreshold: s } = {}) {
    const { presenceContext: i } = this.visualElement;
    if (i && i.isPresent === !1)
      return;
    const r = (d) => {
      n && this.snapToCursor(Qt(d).point), this.stopAnimation();
    }, o = (d, h) => {
      const { drag: f, dragPropagation: p, onDragStart: m } = this.getProps();
      if (f && !p && (this.openDragLock && this.openDragLock(), this.openDragLock = sc(f), !this.openDragLock))
        return;
      this.latestPointerEvent = d, this.latestPanInfo = h, this.isDragging = !0, this.currentDirection = null, this.resolveConstraints(), this.visualElement.projection && (this.visualElement.projection.isAnimationBlocked = !0, this.visualElement.projection.target = void 0), st((y) => {
        let v = this.getAxisMotionValue(y).get() || 0;
        if (ot.test(v)) {
          const { projection: b } = this.visualElement;
          if (b && b.layout) {
            const x = b.layout.layoutBox[y];
            x && (v = _(x) * (parseFloat(v) / 100));
          }
        }
        this.originPoint[y] = v;
      }), m && E.update(() => m(d, h), !1, !0), on(this.visualElement, "transform");
      const { animationState: g } = this.visualElement;
      g && g.setActive("whileDrag", !0);
    }, a = (d, h) => {
      this.latestPointerEvent = d, this.latestPanInfo = h;
      const { dragPropagation: f, dragDirectionLock: p, onDirectionLock: m, onDrag: g } = this.getProps();
      if (!f && !this.openDragLock)
        return;
      const { offset: y } = h;
      if (p && this.currentDirection === null) {
        this.currentDirection = Ed(y), this.currentDirection !== null && m && m(this.currentDirection);
        return;
      }
      this.updateAxis("x", h.point, y), this.updateAxis("y", h.point, y), this.visualElement.render(), g && E.update(() => g(d, h), !1, !0);
    }, l = (d, h) => {
      this.latestPointerEvent = d, this.latestPanInfo = h, this.stop(d, h), this.latestPointerEvent = null, this.latestPanInfo = null;
    }, c = () => {
      const { dragSnapToOrigin: d } = this.getProps();
      (d || this.constraints) && this.startAnimation({ x: 0, y: 0 });
    }, { dragSnapToOrigin: u } = this.getProps();
    this.panSession = new or(e, {
      onSessionStart: r,
      onStart: o,
      onMove: a,
      onSessionEnd: l,
      resumeAnimation: c
    }, {
      transformPagePoint: this.visualElement.getTransformPagePoint(),
      dragSnapToOrigin: u,
      distanceThreshold: s,
      contextWindow: ir(this.visualElement),
      element: this.visualElement.current
    });
  }
  /**
   * @internal
   */
  stop(e, n) {
    const s = e || this.latestPointerEvent, i = n || this.latestPanInfo, r = this.isDragging;
    if (this.cancel(), !r || !i || !s)
      return;
    const { velocity: o } = i;
    this.startAnimation(o);
    const { onDragEnd: a } = this.getProps();
    a && E.postRender(() => a(s, i));
  }
  /**
   * @internal
   */
  cancel() {
    this.isDragging = !1;
    const { projection: e, animationState: n } = this.visualElement;
    e && (e.isAnimationBlocked = !1), this.endPanSession();
    const { dragPropagation: s } = this.getProps();
    !s && this.openDragLock && (this.openDragLock(), this.openDragLock = null), n && n.setActive("whileDrag", !1);
  }
  /**
   * Clean up the pan session without modifying other drag state.
   * This is used during unmount to ensure event listeners are removed
   * without affecting projection animations or drag locks.
   * @internal
   */
  endPanSession() {
    this.panSession && this.panSession.end(), this.panSession = void 0;
  }
  updateAxis(e, n, s) {
    const { drag: i } = this.getProps();
    if (!s || !se(e, i, this.currentDirection))
      return;
    const r = this.getAxisMotionValue(e);
    let o = this.originPoint[e] + s[e];
    this.constraints && this.constraints[e] && (o = xd(o, this.constraints[e], this.elastic[e])), r.set(o);
  }
  resolveConstraints() {
    var r;
    const { dragConstraints: e, dragElastic: n } = this.getProps(), s = this.visualElement.projection && !this.visualElement.projection.layout ? this.visualElement.projection.measure(!1) : (r = this.visualElement.projection) == null ? void 0 : r.layout, i = this.constraints;
    e && At(e) ? this.constraints || (this.constraints = this.resolveRefConstraints()) : e && s ? this.constraints = wd(s.layoutBox, e) : this.constraints = !1, this.elastic = Ad(n), i !== this.constraints && !At(e) && s && this.constraints && !this.hasMutatedConstraints && st((o) => {
      this.constraints !== !1 && this.getAxisMotionValue(o) && (this.constraints[o] = Pd(s.layoutBox[o], this.constraints[o]));
    });
  }
  resolveRefConstraints() {
    const { dragConstraints: e, onMeasureDragConstraints: n } = this.getProps();
    if (!e || !At(e))
      return !1;
    const s = e.current;
    Tt(s !== null, "If `dragConstraints` is set as a React ref, that ref must be passed to another component's `ref` prop.", "drag-constraints-ref");
    const { projection: i } = this.visualElement;
    if (!i || !i.layout)
      return !1;
    i.root && (i.root.scroll = void 0, i.root.updateScroll());
    const r = Ic(s, i.root, this.visualElement.getTransformPagePoint());
    let o = Td(i.layout.layoutBox, r);
    if (n) {
      const a = n(Rc(o));
      this.hasMutatedConstraints = !!a, a && (o = Eo(a));
    }
    return o;
  }
  startAnimation(e) {
    const { drag: n, dragMomentum: s, dragElastic: i, dragTransition: r, dragSnapToOrigin: o, onDragTransitionEnd: a } = this.getProps(), l = this.constraints || {}, c = st((u) => {
      if (!se(u, n, this.currentDirection))
        return;
      let d = l && l[u] || {};
      (o === !0 || o === u) && (d = { min: 0, max: 0 });
      const h = i ? 200 : 1e6, f = i ? 40 : 1e7, p = {
        type: "inertia",
        velocity: s ? e[u] : 0,
        bounceStiffness: h,
        bounceDamping: f,
        timeConstant: 750,
        restDelta: 1,
        restSpeed: 10,
        ...r,
        ...d
      };
      return this.startAxisValueAnimation(u, p);
    });
    return Promise.all(c).then(a);
  }
  startAxisValueAnimation(e, n) {
    const s = this.getAxisMotionValue(e);
    return on(this.visualElement, e), s.start(Ln(e, s, 0, n, this.visualElement, !1));
  }
  stopAnimation() {
    st((e) => this.getAxisMotionValue(e).stop());
  }
  /**
   * Drag works differently depending on which props are provided.
   *
   * - If _dragX and _dragY are provided, we output the gesture delta directly to those motion values.
   * - Otherwise, we apply the delta to the x/y motion values.
   */
  getAxisMotionValue(e) {
    const n = `_drag${e.toUpperCase()}`, i = this.visualElement.getProps()[n];
    return i || this.visualElement.getValue(e, this.visualElement.latestValues[e] ?? 0);
  }
  snapToCursor(e) {
    st((n) => {
      const { drag: s } = this.getProps();
      if (!se(n, s, this.currentDirection))
        return;
      const { projection: i } = this.visualElement, r = this.getAxisMotionValue(n);
      if (i && i.layout) {
        const { min: o, max: a } = i.layout.layoutBox[n], l = r.get() || 0;
        r.set(e[n] - R(o, a, 0.5) + l);
      }
    });
  }
  /**
   * When the viewport resizes we want to check if the measured constraints
   * have changed and, if so, reposition the element within those new constraints
   * relative to where it was before the resize.
   */
  scalePositionWithinConstraints() {
    if (!this.visualElement.current)
      return;
    const { drag: e, dragConstraints: n } = this.getProps(), { projection: s } = this.visualElement;
    if (!At(n) || !s || !this.constraints)
      return;
    this.stopAnimation();
    const i = { x: 0, y: 0 };
    st((o) => {
      const a = this.getAxisMotionValue(o);
      if (a && this.constraints !== !1) {
        const l = a.get();
        i[o] = Sd({ min: l, max: l }, this.constraints[o]);
      }
    });
    const { transformTemplate: r } = this.visualElement.getProps();
    this.visualElement.current.style.transform = r ? r({}, "") : "none", s.root && s.root.updateScroll(), s.updateLayout(), this.constraints = !1, this.resolveConstraints(), st((o) => {
      if (!se(o, e, null))
        return;
      const a = this.getAxisMotionValue(o), { min: l, max: c } = this.constraints[o];
      a.set(R(l, c, i[o]));
    }), this.visualElement.render();
  }
  addListeners() {
    if (!this.visualElement.current)
      return;
    Cd.set(this.visualElement, this);
    const e = this.visualElement.current, n = Gt(e, "pointerdown", (c) => {
      const { drag: u, dragListener: d = !0 } = this.getProps(), h = c.target, f = h !== e && cc(h);
      u && d && !f && this.start(c);
    });
    let s;
    const i = () => {
      const { dragConstraints: c } = this.getProps();
      At(c) && c.current && (this.constraints = this.resolveRefConstraints(), s || (s = Md(e, c.current, () => this.scalePositionWithinConstraints())));
    }, { projection: r } = this.visualElement, o = r.addEventListener("measure", i);
    r && !r.layout && (r.root && r.root.updateScroll(), r.updateLayout()), E.read(i);
    const a = Xt(window, "resize", () => this.scalePositionWithinConstraints()), l = r.addEventListener("didUpdate", ({ delta: c, hasLayoutChanged: u }) => {
      this.isDragging && u && (st((d) => {
        const h = this.getAxisMotionValue(d);
        h && (this.originPoint[d] += c[d].translate, h.set(h.get() + c[d].translate));
      }), this.visualElement.render());
    });
    return () => {
      a(), n(), o(), l && l(), s && s();
    };
  }
  getProps() {
    const e = this.visualElement.getProps(), { drag: n = !1, dragDirectionLock: s = !1, dragPropagation: i = !1, dragConstraints: r = !1, dragElastic: o = mn, dragMomentum: a = !0 } = e;
    return {
      ...e,
      drag: n,
      dragDirectionLock: s,
      dragPropagation: i,
      dragConstraints: r,
      dragElastic: o,
      dragMomentum: a
    };
  }
}
function li(t) {
  let e = !0;
  return () => {
    if (e) {
      e = !1;
      return;
    }
    t();
  };
}
function Md(t, e, n) {
  const s = gs(t, li(n)), i = gs(e, li(n));
  return () => {
    s(), i();
  };
}
function se(t, e, n) {
  return (e === !0 || e === t) && (n === null || n === t);
}
function Ed(t, e = 10) {
  let n = null;
  return Math.abs(t.y) > e ? n = "y" : Math.abs(t.x) > e && (n = "x"), n;
}
class Dd extends mt {
  constructor(e) {
    super(e), this.removeGroupControls = Z, this.removeListeners = Z, this.controls = new Vd(e);
  }
  mount() {
    const { dragControls: e } = this.node.getProps();
    e && (this.removeGroupControls = e.subscribe(this.controls)), this.removeListeners = this.controls.addListeners() || Z;
  }
  update() {
    const { dragControls: e } = this.node.getProps(), { dragControls: n } = this.node.prevProps || {};
    e !== n && (this.removeGroupControls(), e && (this.removeGroupControls = e.subscribe(this.controls)));
  }
  unmount() {
    this.removeGroupControls(), this.removeListeners(), this.controls.isDragging || this.controls.endPanSession();
  }
}
const Ue = (t) => (e, n) => {
  t && E.update(() => t(e, n), !1, !0);
};
class Rd extends mt {
  constructor() {
    super(...arguments), this.removePointerDownListener = Z;
  }
  onPointerDown(e) {
    this.session = new or(e, this.createPanHandlers(), {
      transformPagePoint: this.node.getTransformPagePoint(),
      contextWindow: ir(this.node)
    });
  }
  createPanHandlers() {
    const { onPanSessionStart: e, onPanStart: n, onPan: s, onPanEnd: i } = this.node.getProps();
    return {
      onSessionStart: Ue(e),
      onStart: Ue(n),
      onMove: Ue(s),
      onEnd: (r, o) => {
        delete this.session, i && E.postRender(() => i(r, o));
      }
    };
  }
  mount() {
    this.removePointerDownListener = Gt(this.node.current, "pointerdown", (e) => this.onPointerDown(e));
  }
  update() {
    this.session && this.session.updateHandlers(this.createPanHandlers());
  }
  unmount() {
    this.removePointerDownListener(), this.session && this.session.end();
  }
}
let We = !1;
class kd extends T.Component {
  /**
   * This only mounts projection nodes for components that
   * need measuring, we might want to do it for all components
   * in order to incorporate transforms
   */
  componentDidMount() {
    const { visualElement: e, layoutGroup: n, switchLayoutGroup: s, layoutId: i } = this.props, { projection: r } = e;
    r && (n.group && n.group.add(r), s && s.register && i && s.register(r), We && r.root.didUpdate(), r.addEventListener("animationComplete", () => {
      this.safeToRemove();
    }), r.setOptions({
      ...r.options,
      layoutDependency: this.props.layoutDependency,
      onExitComplete: () => this.safeToRemove()
    })), ue.hasEverUpdated = !0;
  }
  getSnapshotBeforeUpdate(e) {
    const { layoutDependency: n, visualElement: s, drag: i, isPresent: r } = this.props, { projection: o } = s;
    return o && (o.isPresent = r, e.layoutDependency !== n && o.setOptions({
      ...o.options,
      layoutDependency: n
    }), We = !0, i || e.layoutDependency !== n || n === void 0 || e.isPresent !== r ? o.willUpdate() : this.safeToRemove(), e.isPresent !== r && (r ? o.promote() : o.relegate() || E.postRender(() => {
      const a = o.getStack();
      (!a || !a.members.length) && this.safeToRemove();
    }))), null;
  }
  componentDidUpdate() {
    const { visualElement: e, layoutAnchor: n } = this.props, { projection: s } = e;
    s && (s.options.layoutAnchor = n, s.root.didUpdate(), jn.postRender(() => {
      !s.currentAnimation && s.isLead() && this.safeToRemove();
    }));
  }
  componentWillUnmount() {
    const { visualElement: e, layoutGroup: n, switchLayoutGroup: s } = this.props, { projection: i } = e;
    We = !0, i && (i.scheduleCheckAfterUnmount(), n && n.group && n.group.remove(i), s && s.deregister && s.deregister(i));
  }
  safeToRemove() {
    const { safeToRemove: e } = this.props;
    e && e();
  }
  render() {
    return null;
  }
}
function ar(t) {
  const [e, n] = Nu(), s = T.useContext(Ti);
  return j.jsx(kd, { ...t, layoutGroup: s, switchLayoutGroup: T.useContext(nr), isPresent: e, safeToRemove: n });
}
const Ld = {
  pan: {
    Feature: Rd
  },
  drag: {
    Feature: Dd,
    ProjectionNode: Yo,
    MeasureLayout: ar
  }
};
function ci(t, e, n) {
  const { props: s } = t;
  t.animationState && s.whileHover && t.animationState.setActive("whileHover", n === "Start");
  const i = "onHover" + n, r = s[i];
  r && E.postRender(() => r(e, Qt(e)));
}
class Id extends mt {
  mount() {
    const { current: e } = this.node;
    e && (this.unmount = oc(e, (n, s) => (ci(this.node, s, "Start"), (i) => ci(this.node, i, "End"))));
  }
  unmount() {
  }
}
class Bd extends mt {
  constructor() {
    super(...arguments), this.isActive = !1;
  }
  onFocus() {
    let e = !1;
    try {
      e = this.node.current.matches(":focus-visible");
    } catch {
      e = !0;
    }
    !e || !this.node.animationState || (this.node.animationState.setActive("whileFocus", !0), this.isActive = !0);
  }
  onBlur() {
    !this.isActive || !this.node.animationState || (this.node.animationState.setActive("whileFocus", !1), this.isActive = !1);
  }
  mount() {
    this.unmount = qt(Xt(this.node.current, "focus", () => this.onFocus()), Xt(this.node.current, "blur", () => this.onBlur()));
  }
  unmount() {
  }
}
function ui(t, e, n) {
  const { props: s } = t;
  if (t.current instanceof HTMLButtonElement && t.current.disabled)
    return;
  t.animationState && s.whileTap && t.animationState.setActive("whileTap", n === "Start");
  const i = "onTap" + (n === "End" ? "" : n), r = s[i];
  r && E.postRender(() => r(e, Qt(e)));
}
class Fd extends mt {
  mount() {
    const { current: e } = this.node;
    if (!e)
      return;
    const { globalTapTarget: n, propagate: s } = this.node.props;
    this.unmount = dc(e, (i, r) => (ui(this.node, r, "Start"), (o, { success: a }) => ui(this.node, o, a ? "End" : "Cancel")), {
      useGlobalTarget: n,
      stopPropagation: (s == null ? void 0 : s.tap) === !1
    });
  }
  unmount() {
  }
}
const gn = /* @__PURE__ */ new WeakMap(), Ge = /* @__PURE__ */ new WeakMap(), jd = (t) => {
  const e = gn.get(t.target);
  e && e(t);
}, Od = (t) => {
  t.forEach(jd);
};
function Nd({ root: t, ...e }) {
  const n = t || document;
  Ge.has(n) || Ge.set(n, {});
  const s = Ge.get(n), i = JSON.stringify(e);
  return s[i] || (s[i] = new IntersectionObserver(Od, { root: t, ...e })), s[i];
}
function zd(t, e, n) {
  const s = Nd(e);
  return gn.set(t, n), s.observe(t), () => {
    gn.delete(t), s.unobserve(t);
  };
}
const Ud = {
  some: 0,
  all: 1
};
class Wd extends mt {
  constructor() {
    super(...arguments), this.hasEnteredView = !1, this.isInView = !1;
  }
  startObserver() {
    var l;
    (l = this.stopObserver) == null || l.call(this);
    const { viewport: e = {} } = this.node.getProps(), { root: n, margin: s, amount: i = "some", once: r } = e, o = {
      root: n ? n.current : void 0,
      rootMargin: s,
      threshold: typeof i == "number" ? i : Ud[i]
    }, a = (c) => {
      const { isIntersecting: u } = c;
      if (this.isInView === u || (this.isInView = u, r && !u && this.hasEnteredView))
        return;
      u && (this.hasEnteredView = !0), this.node.animationState && this.node.animationState.setActive("whileInView", u);
      const { onViewportEnter: d, onViewportLeave: h } = this.node.getProps(), f = u ? d : h;
      f && f(c);
    };
    this.stopObserver = zd(this.node.current, o, a);
  }
  mount() {
    this.startObserver();
  }
  update() {
    if (typeof IntersectionObserver > "u")
      return;
    const { props: e, prevProps: n } = this.node;
    ["amount", "margin", "root"].some(Gd(e, n)) && this.startObserver();
  }
  unmount() {
    var e;
    (e = this.stopObserver) == null || e.call(this), this.hasEnteredView = !1, this.isInView = !1;
  }
}
function Gd({ viewport: t = {} }, { viewport: e = {} } = {}) {
  return (n) => t[n] !== e[n];
}
const $d = {
  inView: {
    Feature: Wd
  },
  tap: {
    Feature: Fd
  },
  focus: {
    Feature: Bd
  },
  hover: {
    Feature: Id
  }
}, Kd = {
  layout: {
    ProjectionNode: Yo,
    MeasureLayout: ar
  }
}, Hd = {
  ...md,
  ...$d,
  ...Ld,
  ...Kd
}, _d = /* @__PURE__ */ ud(Hd, dd);
function lr(t) {
  const e = bn(() => St(t)), { isStatic: n } = T.useContext(Se);
  if (n) {
    const [, s] = T.useState(t);
    T.useEffect(() => e.on("change", s), []);
  }
  return e;
}
function cr(t, e) {
  const n = lr(e()), s = () => n.set(e());
  return s(), Si(() => {
    const i = () => E.preRender(s, !1, !0), r = t.map((o) => o.on("change", i));
    return () => {
      r.forEach((o) => o()), ct(s);
    };
  }), n;
}
function Xd(t) {
  Ut.current = [], t();
  const e = cr(Ut.current, t);
  return Ut.current = void 0, e;
}
function yn(t, e, n, s) {
  if (typeof t == "function")
    return Xd(t);
  const r = typeof e == "function" ? e : wc(e, n, s), o = Array.isArray(t) ? di(t, r) : di([t], ([l]) => r(l)), a = Array.isArray(t) ? void 0 : t.accelerate;
  return a && !a.isTransformed && typeof e != "function" && Array.isArray(n) && (s == null ? void 0 : s.clamp) !== !1 && (o.accelerate = {
    ...a,
    times: e,
    keyframes: n,
    isTransformed: !0
  }), o;
}
function di(t, e) {
  const n = bn(() => []);
  return cr(t, () => {
    n.length = 0;
    const s = t.length;
    for (let i = 0; i < s; i++)
      n[i] = t[i].get();
    return e(n);
  });
}
function Yd(t, e = {}) {
  const { isStatic: n } = T.useContext(Se), s = () => z(t) ? t.get() : t;
  if (n)
    return yn(s);
  const i = lr(s());
  return T.useInsertionEffect(() => Tc(i, t, e), [i, JSON.stringify(e)]), i;
}
function hi(t, e = {}) {
  return Yd(t, { type: "spring", ...e });
}
function qd({
  className: t,
  size: e = 200,
  springOptions: n = { bounce: 0 }
}) {
  const s = T.useRef(null), [i, r] = T.useState(!1), [o, a] = T.useState(null), l = hi(0, n), c = hi(0, n), u = yn(l, (f) => `${f - e / 2}px`), d = yn(c, (f) => `${f - e / 2}px`);
  T.useEffect(() => {
    if (s.current) {
      const f = s.current.parentElement;
      f && (f.style.position = "relative", f.style.overflow = "hidden", a(f));
    }
  }, []);
  const h = T.useCallback(
    (f) => {
      if (!o) return;
      const { left: p, top: m } = o.getBoundingClientRect();
      l.set(f.clientX - p), c.set(f.clientY - m);
    },
    [l, c, o]
  );
  return T.useEffect(() => {
    if (o)
      return o.addEventListener("mousemove", h), o.addEventListener("mouseenter", () => r(!0)), o.addEventListener("mouseleave", () => r(!1)), () => {
        o.removeEventListener("mousemove", h), o.removeEventListener("mouseenter", () => r(!0)), o.removeEventListener(
          "mouseleave",
          () => r(!1)
        );
      };
  }, [o, h]), /* @__PURE__ */ j.jsx(
    _d.div,
    {
      ref: s,
      className: Pt(
        "pointer-events-none absolute rounded-full bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops),transparent_80%)] blur-xl transition-opacity duration-200",
        "from-zinc-50 via-zinc-100 to-zinc-200",
        i ? "opacity-100" : "opacity-0",
        t
      ),
      style: {
        width: e,
        height: e,
        left: u,
        top: d
      }
    }
  );
}
function Zd() {
  return /* @__PURE__ */ j.jsxs(wi, { className: "w-full h-[500px] bg-black/[0.96] relative overflow-hidden", children: [
    /* @__PURE__ */ j.jsx(
      qd,
      {
        className: "-top-40 left-0 md:left-60 md:-top-20",
        fill: "white"
      }
    ),
    /* @__PURE__ */ j.jsx("div", { className: "flex h-full", children: /* @__PURE__ */ j.jsx("div", { className: "flex-1 relative", children: /* @__PURE__ */ j.jsx(
      pr,
      {
        scene: "https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode",
        className: "w-full h-full"
      }
    ) }) })
  ] });
}
const fi = document.getElementById("react-spline-root");
fi && dr.createRoot(fi).render(
  /* @__PURE__ */ j.jsx(hr.StrictMode, { children: /* @__PURE__ */ j.jsx(Zd, {}) })
);
