/* ------------------------------------------------------------
   Renders window.INTRO_CONTENTS[lang] (see ../content/zh.js, en.js)
   into a keyboard-navigable slide deck with language + theme toggles.

   You normally never need to edit this file. Change the text in
   content/*.js instead.

   URL options:  ?lang=en|zh   ?theme=dark|light   ?embed=1   #slide-id
   ------------------------------------------------------------ */
(function () {
  "use strict";

  const ALL = window.INTRO_CONTENTS || {};
  const LANGS = Object.keys(ALL);
  if (!LANGS.length) {
    document.body.innerHTML = "<p style='padding:40px'>content files missing (window.INTRO_CONTENTS)</p>";
    return;
  }

  const params = new URLSearchParams(location.search);
  const embed = params.get("embed") === "1";
  if (embed) document.body.classList.add("embed");

  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} },
  };

  // ---------- language ----------
  const LANG_LABEL = { zh: "中文", en: "EN" };
  let lang = params.get("lang");
  if (!ALL[lang]) lang = store.get("intro.lang");
  if (!ALL[lang]) lang = LANGS.includes("zh") ? "zh" : LANGS[0];

  // ---------- theme ----------
  const mq = window.matchMedia("(prefers-color-scheme: dark)");
  let theme = params.get("theme");
  if (theme !== "dark" && theme !== "light") theme = store.get("intro.theme");
  if (theme !== "dark" && theme !== "light") theme = mq.matches ? "dark" : "light";
  function applyTheme(t, persist) {
    theme = t;
    document.documentElement.setAttribute("data-theme", t);
    const b = document.getElementById("themeBtn");
    if (b) { b.textContent = t === "dark" ? "☀" : "☾"; b.title = t === "dark" ? "Light mode (D)" : "Dark mode (D)"; }
    if (persist) store.set("intro.theme", t);
  }
  applyTheme(theme, false);
  mq.addEventListener?.("change", (e) => { if (!store.get("intro.theme") && !params.get("theme")) applyTheme(e.matches ? "dark" : "light", false); });

  // ---------- helpers ----------
  const esc = (s) => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  const md = (s) => esc(s).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>").replace(/`(.+?)`/g, "<code>$1</code>");
  const list = (items, cls = "list") => `<ul class="${cls}">${(items || []).map((i) => `<li>${md(i)}</li>`).join("")}</ul>`;
  const steps = (items) => `<ol class="steps">${(items || []).map((s) => `<li><span>${s.label ? `<b>${md(s.label)}</b> ` : ""}${md(s.text)}</span></li>`).join("")}</ol>`;
  const chips = (items, cls = "") => `<div class="chips">${(items || []).map((c) => `<span class="chip ${cls}">${md(c)}</span>`).join("")}</div>`;
  const flow = (nodes) => `<div class="flow">${(nodes || []).map((n, i) => {
    const node = typeof n === "string" ? { label: n } : n;
    return (i ? `<span class="arrow">→</span>` : "") + `<span class="node ${node.hl ? "hl" : ""}">${md(node.label)}${node.sub ? `<small>${md(node.sub)}</small>` : ""}</span>`;
  }).join("")}</div>`;

  // ---------- slide renderers ----------
  const R = {
    cover(s, C) {
      const m = C.meta;
      return `
        <div class="cover cover-grid">
          <div>
            <div class="eyebrow">${md(s.eyebrow || "")}</div>
            <p class="name-zh">${md(s.nameSecondary || "")}</p>
            <h1>${md(s.name || m.name)}</h1>
            <p class="role">${md(s.role || "")}</p>
            <p class="lead">${md(s.tagline || "")}</p>
            ${chips(s.stack, "accent")}
            <div class="contact">${(s.contact || []).map((c) => `<span>${md(c)}</span>`).join("")}</div>
            <div class="hint"><kbd>→</kbd> ${esc(s.hint || "")}</div>
          </div>
          <div class="aside">
            ${(s.facts || []).map((f) => `<div class="card"><div class="k">${md(f.k)}</div><div class="v">${md(f.v)}</div></div>`).join("")}
          </div>
        </div>`;
    },

    about(s) {
      return `
        <div class="eyebrow">${md(s.eyebrow || "")}</div>
        <h2>${md(s.title)}</h2>
        <p class="lead">${md(s.summary)}</p>
        <div class="stat-row">
          ${(s.stats || []).map((st) => `<div class="card stat"><div class="num">${esc(st.num)}</div><div class="label">${md(st.label)}</div></div>`).join("")}
        </div>
        <div class="about-grid">
          <div>
            <div class="highlights">
              ${(s.highlights || []).map((h) => `<div class="hl"><span class="ic">${esc(h.icon || "•")}</span><div><b>${md(h.title)}</b><span>${md(h.text)}</span></div></div>`).join("")}
            </div>
            ${s.skills ? `<h3 style="margin-top:16px">${md(s.skillsTitle || "")}</h3>${chips(s.skills)}` : ""}
          </div>
          <div class="card">
            <h3>${md(s.timelineTitle || "")}</h3>
            <div class="timeline">
              ${(s.timeline || []).map((t) => `<div class="item"><div class="when">${esc(t.when)}</div><div class="what"><b>${md(t.title)}</b><span>${md(t.text)}</span></div></div>`).join("")}
            </div>
          </div>
        </div>`;
    },

    project(s, C) {
      const L = C.labels;
      return `
        <div class="eyebrow">
          <span>${md(s.eyebrow)}</span>
          ${s.period ? `<span class="sep">·</span><span class="muted">${md(s.period)}</span>` : ""}
          ${s.role ? `<span class="sep">·</span><span class="muted">${md(s.role)}</span>` : ""}
        </div>
        <h2>${md(s.title)}</h2>
        <p class="lead">${md(s.tagline)}</p>
        ${chips(s.tech)}
        <div class="grid-3">
          <div class="card problem"><h3><span class="tag">!</span>${esc(L.problem)}</h3>${list(s.problem)}</div>
          <div class="card solution"><h3><span class="tag">⚙</span>${esc(L.solution)}</h3>${steps(s.solution)}</div>
          <div class="card result">
            <h3><span class="tag">✓</span>${esc(L.result)}</h3>
            ${s.stat ? `<div class="stat" style="margin-bottom:12px"><div class="num">${esc(s.stat.num)}</div><div class="label">${md(s.stat.label)}</div></div>` : ""}
            ${list(s.result)}
          </div>
        </div>
        ${s.flow ? flow(s.flow) : ""}
        ${s.footnote ? `<p class="footnote">${md(s.footnote)}</p>` : ""}`;
    },

    closing(s) {
      return `
        <div class="closing">
          <div class="eyebrow">${md(s.eyebrow || "")}</div>
          <p class="big">${md(s.title)}</p>
          <p class="lead">${md(s.lead || "")}</p>
          <div class="grid-3">
            ${(s.points || []).map((p) => `<div class="card"><b>${md(p.title)}</b><span>${md(p.text)}</span></div>`).join("")}
          </div>
          <div class="contact">${(s.contact || []).map((c) => `<span>${md(c)}</span>`).join("")}</div>
        </div>`;
    },
  };

  // ---------- state ----------
  const app = document.getElementById("app");
  let C, slides, deck, sections, dots, counter, progress, io;
  let current = 0;

  function render(keepIndex) {
    C = ALL[lang];
    slides = C.slides;
    document.title = C.meta.pageTitle || C.meta.name;
    document.documentElement.lang = C.lang || lang;
    const otherLang = LANGS.find((l) => l !== lang);
    if (io) io.disconnect();

    app.innerHTML = `
      <div class="progress" id="progress"></div>
      <header class="topbar">
        <div class="brand"><span class="dot"></span>${md(C.meta.name)} <span class="sub">· ${md(C.meta.role)}</span></div>
        <div class="tools">
          <span class="counter" id="counter">1 / ${slides.length}</span>
          ${otherLang ? `<button class="btn lang" id="langBtn" title="Language (L)">${esc(LANG_LABEL[otherLang] || otherLang)}</button>` : ""}
          <button class="btn icon" id="themeBtn" title="Theme (D)"></button>
          <button class="btn icon" id="fs" title="Fullscreen (F)">⛶</button>
        </div>
      </header>
      <nav class="dots" id="dots">
        ${slides.map((s, i) => `<a href="#${esc(s.id)}" data-i="${i}"><span>${esc(s.navLabel || s.title || s.id)}</span></a>`).join("")}
      </nav>
      <main class="deck" id="deck">
        ${slides.map((s, i) => `<section class="slide" id="${esc(s.id)}" data-i="${i}"><div class="slide-inner">${(R[s.type] || R.project)(s, C)}</div></section>`).join("")}
      </main>`;

    deck = document.getElementById("deck");
    sections = [...deck.querySelectorAll(".slide")];
    dots = [...document.querySelectorAll("#dots a")];
    counter = document.getElementById("counter");
    progress = document.getElementById("progress");
    applyTheme(theme, false);

    io = new IntersectionObserver((entries) => {
      const best = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (best) setCurrent(Number(best.target.dataset.i));
    }, { root: deck, threshold: [0.5, 0.75] });
    sections.forEach((s) => io.observe(s));

    dots.forEach((d) => d.addEventListener("click", (e) => { e.preventDefault(); goTo(Number(d.dataset.i)); }));
    document.getElementById("fs").addEventListener("click", toggleFullscreen);
    document.getElementById("themeBtn").addEventListener("click", () => applyTheme(theme === "dark" ? "light" : "dark", true));
    const lb = document.getElementById("langBtn");
    if (lb) lb.addEventListener("click", () => setLang(otherLang));

    const startId = keepIndex ? slides[Math.min(current, slides.length - 1)]?.id : location.hash.replace("#", "");
    const startIdx = Math.max(0, slides.findIndex((s) => s.id === startId));
    current = -1;
    if (startIdx > 0) goTo(startIdx, "auto"); else setCurrent(0, { silent: true });
  }

  function setLang(l, persist = true) {
    if (!ALL[l] || l === lang) return;
    lang = l;
    if (persist) store.set("intro.lang", l);
    render(true);
  }

  function setCurrent(i, { silent } = {}) {
    i = Math.max(0, Math.min(slides.length - 1, i));
    if (i === current && !silent) return;
    current = i;
    dots.forEach((d, k) => d.classList.toggle("active", k === i));
    counter.textContent = `${i + 1} / ${slides.length}`;
    progress.style.width = `${((i + 1) / slides.length) * 100}%`;
    if (history.replaceState) history.replaceState(null, "", `${location.search}#${slides[i].id}`);
    if (window.parent !== window) {
      window.parent.postMessage({ type: "intro:slide", id: slides[i].id, index: i, total: slides.length, lang, theme }, "*");
    }
  }

  function goTo(i, behavior = "smooth") {
    i = Math.max(0, Math.min(slides.length - 1, i));
    sections[i].scrollIntoView({ behavior, block: "start" });
    setCurrent(i);
  }

  function toggleFullscreen() {
    if (!document.fullscreenElement) document.documentElement.requestFullscreen?.();
    else document.exitFullscreen?.();
  }

  document.addEventListener("keydown", (e) => {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    switch (e.key) {
      case "ArrowRight": case "ArrowDown": case "PageDown": case " ":
        e.preventDefault(); goTo(current + 1); break;
      case "ArrowLeft": case "ArrowUp": case "PageUp":
        e.preventDefault(); goTo(current - 1); break;
      case "Home": e.preventDefault(); goTo(0); break;
      case "End": e.preventDefault(); goTo(slides.length - 1); break;
      case "f": case "F": toggleFullscreen(); break;
      case "d": case "D": applyTheme(theme === "dark" ? "light" : "dark", true); break;
      case "l": case "L": { const o = LANGS.find((l) => l !== lang); if (o) setLang(o); break; }
      default: if (/^[1-9]$/.test(e.key)) goTo(Number(e.key) - 1);
    }
  });

  // commands from an embedding page (self_prepare)
  window.addEventListener("message", (e) => {
    const m = e.data || {};
    if (m.type === "intro:goto") {
      const i = typeof m.index === "number" ? m.index : slides.findIndex((s) => s.id === m.id);
      if (i >= 0) goTo(i, m.behavior || "smooth");
    } else if (m.type === "intro:next") goTo(current + 1);
    else if (m.type === "intro:prev") goTo(current - 1);
    else if (m.type === "intro:lang") setLang(m.lang, false);
    else if (m.type === "intro:theme") applyTheme(m.theme, false);
    else if (m.type === "intro:hello") setCurrent(current, { silent: true });
  });

  render(false);
})();
