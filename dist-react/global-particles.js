import { r as i, j as n, c as l, R as d } from "./client-DCx-n2Z2.js";
function u() {
  const r = i.useCallback((e) => {
    var a;
    const o = document.querySelector("#particles-js canvas");
    o && o.remove(), ((a = window.pJSDom) == null ? void 0 : a.length) > 0 && (window.pJSDom.forEach((c) => c.pJS.fn.vendors.destroypJS()), window.pJSDom = []);
    const t = {
      particles: "#ffffff",
      lines: "#ffffff",
      accent: "#00ff88"
    };
    window.particlesJS("particles-js", {
      particles: {
        number: { value: 140, density: { enable: !0, value_area: 800 } },
        color: { value: t.particles },
        shape: { type: "circle", stroke: { width: 0.5, color: t.accent } },
        opacity: {
          value: 0.2,
          // Reduced opacity so it doesn't distract from text
          random: !0,
          anim: { enable: !0, speed: 1, opacity_min: 0.1 }
        },
        size: {
          value: 3,
          random: !0,
          anim: { enable: !0, speed: 2, size_min: 1 }
        },
        line_linked: {
          enable: !0,
          distance: 160,
          color: t.lines,
          opacity: 0.1,
          // Reduced line opacity
          width: 1
        },
        move: { enable: !0, speed: 1.5, random: !0, out_mode: "bounce" }
      },
      interactivity: {
        detect_on: "window",
        // Better interactivity when z-index is negative
        events: {
          onhover: { enable: !0, mode: "grab" },
          onclick: { enable: !0, mode: "push" },
          resize: !0
        },
        modes: {
          grab: { distance: 220, line_linked: { opacity: 0.4 } },
          push: { particles_nb: 4 },
          repulse: { distance: 180, duration: 0.4 }
        }
      },
      retina_detect: !0
    });
  }, []);
  return i.useEffect(() => {
    if (typeof window > "u") return;
    const e = document.createElement("script");
    return e.src = "https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js", e.async = !0, document.body.appendChild(e), e.onload = () => {
      r(!0);
    }, () => {
      document.body.removeChild(e);
    };
  }, [r]), /* @__PURE__ */ n.jsx(
    "div",
    {
      id: "particles-js",
      className: "fixed top-0 left-0 w-full h-full -z-10 pointer-events-auto",
      style: {
        background: "transparent"
        // No gradient, keep the site's existing dark theme
      }
    }
  );
}
const s = document.getElementById("particles-react-root");
s && l.createRoot(s).render(
  /* @__PURE__ */ n.jsx(d.StrictMode, { children: /* @__PURE__ */ n.jsx(u, {}) })
);
