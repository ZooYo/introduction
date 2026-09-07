/* ------------------------------------------------------------
   Renders window.INTRO_CONTENTS[lang] (see ../content/zh.js, en.js)
   into a keyboard-navigable slide deck with language / theme toggles
   and a project picker (choose + order which project slides to show).

   You normally never need to edit this file. Change the text in
   content/*.js instead.

   URL options:
     ?lang=en|zh          language
     ?theme=dark|light    theme
     ?projects=a,b,c      which project slides to show, in order
     ?embed=1             compact chrome (used by self_prepare)
     #slide-id            start slide
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

  // ---------- project selection (ordered list of project slide ids) ----------
  const allProjectIds = () => ALL[lang].slides.filter((s) => s.type === "project").map((s) => s.id);
  let selected = null;
  function loadSelection() {
    const valid = allProjectIds();
    let ids = null;
    const q = params.get("projects");
    if (q !== null) ids = q.split(",").map((s) => s.trim()).filter(Boolean);
    else { try { ids = JSON.parse(store.get("intro.projects") || "null"); } catch (e) { ids = null; } }
    if (!Array.isArray(ids)) ids = ALL[lang].defaultProjects || valid.slice(0, 3);
    selected = ids.filter((id) => valid.includes(id));
  }
  function saveSelection() {
    store.set("intro.projects", JSON.stringify(selected));
    const p = new URLSearchParams(location.search);
    if (JSON.stringify(selected) === JSON.stringify(ALL[lang].defaultProjects || [])) p.delete("projects");
    else p.set("projects", selected.join(","));
    const qs = p.toString();
    history.replaceState(null, "", `${location.pathname}${qs ? "?" + qs : ""}${location.hash}`);
  }

  // ---------- helpers ----------
  const esc = (s) => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  const md = (s) => esc(s).replace(/\{count\}/g, String(selected ? selected.length : 0)).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>").replace(/`(.+?)`/g, "<code>$1</code>");
  const list = (items, cls = "list") => `<ul class="${cls}">${(items || []).map((i) => `<li>${md(i)}</li>`).join("")}</ul>`;
  const steps = (items) => `<ol class="steps">${(items || []).map((s) => `<li><span>${s.label ? `<b>${md(s.label)}</b> ` : ""}${md(s.text)}</span></li>`).join("")}</ol>`;
  const chips = (items, cls = "") => `<div class="chips">${(items || []).map((c) => `<span class="chip ${cls}">${md(c)}</span>`).join("")}</div>`;
  const flow = (nodes) => `<div class="flow">${(nodes || []).map((n, i) => {
    const node = typeof n === "string" ? { label: n } : n;
    return (i ? `<span class="arrow">→</span>` : "") + `<span class="node ${node.hl ? "hl" : ""}">${md(node.label)}${node.sub ? `<small>${md(node.sub)}</small>` : ""}</span>`;
  }).join("")}</div>`;
  const num2 = (n) => String(n).padStart(2, "0");
  const fmtMin = (m) => { const C = ALL[lang]; const L = C.labels; return m >= 1 ? `${Math.round(m * 10) / 10} ${L.minutes}` : `${Math.round(m * 60)} ${L.seconds}`; };

  // ---------- slide renderers (n = section number shown in the eyebrow) ----------
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

    about(s, C, n) {
      return `
        <div class="eyebrow">${num2(n)} · ${md(s.eyebrow || "")}</div>
        <h2>${md(s.title)}</h2>
        <p class="lead">${md(s.summary)}</p>
        ${(s.stats || []).length ? `<div class="stat-row">${s.stats.map((st) => `<div class="card stat"><div class="num">${esc(st.num)}</div><div class="label">${md(st.label)}</div></div>`).join("")}</div>` : ""}
        <div class="about-grid">
          <div class="card">
            <h3>${md(s.timelineTitle || "")}</h3>
            <div class="timeline">
              ${(s.timeline || []).map((t) => `<div class="item"><div class="when">${esc(t.when)}</div><div class="what"><b>${md(t.title)}</b><span>${md(t.text)}</span></div></div>`).join("")}
            </div>
          </div>
          <div>
            <div class="highlights">
              ${(s.highlights || []).map((h) => `<div class="hl"><span class="ic">${esc(h.icon || "•")}</span><div><b>${md(h.title)}</b><span>${md(h.text)}</span></div></div>`).join("")}
            </div>
            ${s.skills ? `<h3 style="margin-top:16px">${md(s.skillsTitle || "")}</h3>${chips(s.skills)}` : ""}
          </div>
        </div>`;
    },

    project(s, C, n) {
      const L = C.labels;
      return `
        <div class="eyebrow">
          <span>${num2(n)} · ${md(s.eyebrow)}</span>
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

    closing(s, C, n) {
      return `
        <div class="closing">
          <div class="eyebrow">${num2(n)} · ${md(s.eyebrow || "")}</div>
          <p class="big">${md(s.title)}</p>
          ${s.lead ? `<p class="lead">${md(s.lead)}</p>` : ""}
          ${(s.points || []).length ? `<div class="grid-3">${s.points.map((p) => `<div class="card"><b>${md(p.title)}</b><span>${md(p.text)}</span></div>`).join("")}</div>` : ""}
          <div class="contact">${(s.contact || []).map((c) => `<span>${md(c)}</span>`).join("")}</div>
        </div>`;
    },
  };

  // ---------- project picker panel ----------
  function pickerHTML(C) {
    const L = C.labels;
    const byId = Object.fromEntries(C.slides.map((s) => [s.id, s]));
    const rows = [...selected, ...allProjectIds().filter((id) => !selected.includes(id))];
    const total = (C.baseMinutes || 2) + selected.reduce((a, id) => a + (byId[id].minutes || 0), 0);
    return `
      <div class="picker-hd">
        <div><b>${esc(L.pickerTitle)}</b><div class="muted">${esc(L.pickerHint)}</div></div>
        <button class="btn icon" id="pickerClose" title="Close (Esc)">✕</button>
      </div>
      <div class="picker-list">
        ${rows.map((id) => {
          const s = byId[id], on = selected.includes(id), pos = selected.indexOf(id);
          return `
            <label class="picker-row ${on ? "on" : ""}" data-id="${esc(id)}">
              <input type="checkbox" ${on ? "checked" : ""}>
              <span class="pos">${on ? pos + 1 : ""}</span>
              <span class="txt"><b>${md(s.title)}</b><span>${md(s.pickerNote || s.tagline)}</span></span>
              <span class="mins">${s.minutes ? fmtMin(s.minutes) : ""}</span>
              <span class="ord">
                <button class="mv" data-dir="-1" title="↑" ${!on || pos === 0 ? "disabled" : ""}>↑</button>
                <button class="mv" data-dir="1" title="↓" ${!on || pos === selected.length - 1 ? "disabled" : ""}>↓</button>
              </span>
            </label>`;
        }).join("")}
      </div>
      <div class="picker-ft">
        <span class="muted">${esc(L.pickerTotal)} <b>${selected.length}</b> · ≈ <b>${fmtMin(total)}</b></span>
        <span class="spacer"></span>
        <button class="btn" id="pickerReset">${esc(L.pickerReset)}</button>
        <button class="btn primary" id="pickerCopy">${esc(L.pickerCopy)}</button>
      </div>`;
  }

  let pickerOpen = false;
  function renderPicker() {
    const el = document.getElementById("picker");
    if (!el) return;
    el.innerHTML = pickerHTML(ALL[lang]);
    el.querySelectorAll(".picker-row").forEach((row) => {
      const id = row.dataset.id;
      row.querySelector("input").addEventListener("change", (e) => {
        if (e.target.checked) { if (!selected.includes(id)) selected.push(id); }
        else selected = selected.filter((x) => x !== id);
        commitSelection();
      });
      row.querySelectorAll(".mv").forEach((b) => b.addEventListener("click", (e) => {
        e.preventDefault(); e.stopPropagation();
        const i = selected.indexOf(id), j = i + Number(b.dataset.dir);
        if (i < 0 || j < 0 || j >= selected.length) return;
        [selected[i], selected[j]] = [selected[j], selected[i]];
        commitSelection();
      }));
    });
    document.getElementById("pickerClose").addEventListener("click", () => togglePicker(false));
    document.getElementById("pickerReset").addEventListener("click", () => { selected = (ALL[lang].defaultProjects || allProjectIds().slice(0, 3)).slice(); commitSelection(); });
    document.getElementById("pickerCopy").addEventListener("click", copyLink);
  }
  function commitSelection() {
    saveSelection();
    render(true);
    renderPicker();
  }
  function togglePicker(open) {
    pickerOpen = typeof open === "boolean" ? open : !pickerOpen;
    document.getElementById("picker").hidden = !pickerOpen;
    document.getElementById("pickerBackdrop").hidden = !pickerOpen;
    document.getElementById("pickerBtn")?.classList.toggle("active", pickerOpen);
    if (pickerOpen) renderPicker();
  }
  function shareUrl() {
    const u = new URL(location.href);
    u.searchParams.set("lang", lang);
    u.searchParams.set("projects", selected.join(","));
    u.searchParams.delete("embed");
    u.hash = "";
    return u.toString();
  }
  async function copyLink() {
    const L = ALL[lang].labels, url = shareUrl(), b = document.getElementById("pickerCopy");
    try { await navigator.clipboard.writeText(url); b.textContent = L.pickerCopied; }
    catch (e) { window.prompt(L.pickerCopy, url); }
    setTimeout(() => { if (b.isConnected) b.textContent = L.pickerCopy; }, 1500);
  }

  // ---------- state ----------
  const app = document.getElementById("app");
  let C, slides, deck, sections, dots, counter, progress, io;
  let current = 0;

  function visibleSlides(C) {
    const byId = Object.fromEntries(C.slides.map((s) => [s.id, s]));
    const out = [];
    for (const s of C.slides) {
      if (s.type === "project") continue;
      out.push(s);
    }
    // insert selected projects (in chosen order) before the closing slide
    const closingIdx = out.findIndex((s) => s.type === "closing");
    const projects = selected.map((id) => byId[id]).filter(Boolean);
    if (closingIdx < 0) out.push(...projects); else out.splice(closingIdx, 0, ...projects);
    return out;
  }

  function render(keepIndex) {
    C = ALL[lang];
    if (!selected) loadSelection();
    const prevId = keepIndex && slides ? slides[Math.min(current, slides.length - 1)]?.id : null;
    slides = visibleSlides(C);
    document.title = C.meta.pageTitle || C.meta.name;
    document.documentElement.lang = C.lang || lang;
    const otherLang = LANGS.find((l) => l !== lang);
    const L = C.labels;
    if (io) io.disconnect();

    let n = 0; // section number for the eyebrow (cover excluded)
    app.innerHTML = `
      <div class="progress" id="progress"></div>
      <header class="topbar">
        <div class="brand"><span class="dot"></span>${md(C.meta.name)} <span class="sub">· ${md(C.meta.role)}</span></div>
        <div class="tools">
          <span class="counter" id="counter">1 / ${slides.length}</span>
          <button class="btn" id="pickerBtn" title="${esc(L.pickerTitle)} (P)">${esc(L.pickerBtn)} <span class="count">${selected.length}</span></button>
          ${otherLang ? `<button class="btn lang" id="langBtn" title="Language (L)">${esc(LANG_LABEL[otherLang] || otherLang)}</button>` : ""}
          <button class="btn icon" id="themeBtn" title="Theme (D)"></button>
          <button class="btn icon" id="fs" title="Fullscreen (F)">⛶</button>
        </div>
      </header>
      <div class="picker-backdrop" id="pickerBackdrop" hidden></div>
      <aside class="picker" id="picker" hidden></aside>
      <nav class="dots" id="dots">
        ${slides.map((s, i) => `<a href="#${esc(s.id)}" data-i="${i}"><span>${esc(s.navLabel || s.title || s.id)}</span></a>`).join("")}
      </nav>
      <main class="deck" id="deck">
        ${slides.map((s, i) => {
          if (s.type !== "cover") n += 1;
          return `<section class="slide" id="${esc(s.id)}" data-i="${i}"><div class="slide-inner">${(R[s.type] || R.project)(s, C, n)}</div></section>`;
        }).join("")}
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
    document.getElementById("pickerBtn").addEventListener("click", () => togglePicker());
    document.getElementById("pickerBackdrop").addEventListener("click", () => togglePicker(false));
    const lb = document.getElementById("langBtn");
    if (lb) lb.addEventListener("click", () => setLang(otherLang));
    if (pickerOpen) togglePicker(true);

    const startId = prevId ?? location.hash.replace("#", "");
    const startIdx = Math.max(0, slides.findIndex((s) => s.id === startId));
    current = -1;
    if (startIdx > 0) goTo(startIdx, "auto"); else setCurrent(0, { silent: true });
    announceSlides();
  }

  function announceSlides() {
    if (window.parent === window) return;
    window.parent.postMessage({
      type: "intro:slides", lang, theme,
      slides: slides.map((s) => ({ id: s.id, label: s.navLabel || s.title || s.id, type: s.type, minutes: s.minutes || null })),
    }, "*");
  }

  function setLang(l, persist = true) {
    if (!ALL[l] || l === lang) return;
    lang = l;
    if (persist) store.set("intro.lang", l);
    selected = selected.filter((id) => allProjectIds().includes(id));
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
    if (e.key === "Escape" && pickerOpen) { togglePicker(false); return; }
    if (pickerOpen && e.target.closest?.("#picker")) return;
    switch (e.key) {
      case "ArrowRight": case "ArrowDown": case "PageDown": case " ":
        e.preventDefault(); goTo(current + 1); break;
      case "ArrowLeft": case "ArrowUp": case "PageUp":
        e.preventDefault(); goTo(current - 1); break;
      case "Home": e.preventDefault(); goTo(0); break;
      case "End": e.preventDefault(); goTo(slides.length - 1); break;
      case "f": case "F": toggleFullscreen(); break;
      case "d": case "D": applyTheme(theme === "dark" ? "light" : "dark", true); break;
      case "p": case "P": togglePicker(); break;
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
    else if (m.type === "intro:hello") { announceSlides(); setCurrent(current, { silent: true }); }
  });

  render(false);
})();
