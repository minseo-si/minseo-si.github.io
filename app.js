(() => {
  const { profile = {}, videos = [], aspect = "9:16" } = window.PORTFOLIO || {};
  const $ = (id) => document.getElementById(id);

  // "9:16" → { css: "9 / 16", vertical: true }
  const ratio = (a) => {
    const [w, h] = String(a).split(/[:/]/).map(Number);
    return w > 0 && h > 0 ? { css: `${w} / ${h}`, vertical: h > w } : { css: "16 / 9", vertical: false };
  };
  const site = ratio(aspect);
  document.documentElement.style.setProperty("--ratio", site.css);
  document.documentElement.dataset.layout = site.vertical ? "vertical" : "horizontal";
  const esc = (s = "") =>
    String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  // 각 영상에 고유 slug 부여 (URL #해시 공유용)
  const slugCount = {};
  videos.forEach((v) => {
    let s = (v.title || "video").toLowerCase().trim().replace(/[^\p{L}\p{N}]+/gu, "-").replace(/^-|-$/g, "") || "video";
    slugCount[s] = (slugCount[s] || 0) + 1;
    v._slug = slugCount[s] > 1 ? `${s}-${slugCount[s]}` : s;
  });

  /* ---------- 테마 ---------- */
  const root = document.documentElement;
  const saved = (() => { try { return localStorage.getItem("theme"); } catch { return null; } })();
  root.dataset.theme = saved || (matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
  $("themeToggle").onclick = () => {
    root.dataset.theme = root.dataset.theme === "light" ? "dark" : "light";
    try { localStorage.setItem("theme", root.dataset.theme); } catch {}
  };

  /* ---------- 프로필 ---------- */
  document.title = profile.name ? `${profile.name} — Video Portfolio` : "Video Portfolio";
  $("name").textContent = profile.name || "";
  $("role").textContent = profile.role || "";
  $("bio").textContent = profile.bio || "";
  // 이메일(mailto:) 링크는 오른쪽 위 Contact 버튼으로, 나머지는 로고 버튼으로
  const ICONS = {
    youtube: `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="1" y="4" width="22" height="16" rx="5" fill="#FF0000"/><path d="M10 8.5v7l6-3.5z" fill="#fff"/></svg>`,
    instagram: `<svg viewBox="0 0 24 24" aria-hidden="true"><defs><linearGradient id="igg" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stop-color="#FEDA75"/><stop offset=".35" stop-color="#FA7E1E"/><stop offset=".6" stop-color="#D62976"/><stop offset=".85" stop-color="#962FBF"/><stop offset="1" stop-color="#4F5BD5"/></linearGradient></defs><rect x="1" y="1" width="22" height="22" rx="6.5" fill="url(#igg)"/><rect x="5.5" y="5.5" width="13" height="13" rx="4" fill="none" stroke="#fff" stroke-width="1.8"/><circle cx="12" cy="12" r="3.1" fill="none" stroke="#fff" stroke-width="1.8"/><circle cx="16.4" cy="7.6" r="1.1" fill="#fff"/></svg>`,
  };
  const kindOf = (url = "") =>
    /^mailto:/i.test(url) ? "mail" : /youtu\.?be/i.test(url) ? "youtube" : /instagram\.com/i.test(url) ? "instagram" : "link";
  const allLinks = profile.links || [];
  const mail = allLinks.find((l) => kindOf(l.url) === "mail");
  // Contact 버튼: 메일 앱을 열지 않고 이메일 주소를 보여 줘요
  if (mail) {
    const addr = mail.url.replace(/^mailto:/i, "").split("?")[0];
    const btn = $("contact"), pop = $("contactPop"), copy = $("contactCopy");
    $("contactEmail").textContent = addr;
    $("contactWrap").hidden = false;
    const toggle = (show) => { pop.hidden = !show; btn.setAttribute("aria-expanded", show); };
    btn.onclick = (e) => { e.stopPropagation(); toggle(pop.hidden); };
    pop.onclick = (e) => e.stopPropagation();
    document.addEventListener("click", () => toggle(false));
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") toggle(false); });
    copy.onclick = async () => {
      try { await navigator.clipboard.writeText(addr); }
      catch {
        const r = document.createRange(); r.selectNodeContents($("contactEmail"));
        getSelection().removeAllRanges(); getSelection().addRange(r); document.execCommand("copy");
      }
      copy.textContent = "복사됨 ✓";
      setTimeout(() => (copy.textContent = "복사"), 1500);
    };
  }
  $("links").innerHTML = allLinks
    .filter((l) => kindOf(l.url) !== "mail")
    .map((l) => {
      const k = kindOf(l.url);
      return `<a class="social ${k}" href="${esc(l.url)}" target="_blank" rel="noopener" aria-label="${esc(l.label)} 바로가기">${ICONS[k] || ""}<span>${esc(l.label)}</span><span class="go">바로가기 ↗</span></a>`;
    })
    .join("");
  $("copyright").textContent = `© ${new Date().getFullYear()} ${profile.name || ""}`;

  /* ---------- 썸네일 / 임베드 ---------- */
  // 영상 ID 또는 전체 주소(watch, youtu.be, shorts, embed, live) 모두 허용
  const ytId = (s = "") => {
    s = String(s).trim();
    const m = s.match(/(?:youtu\.be\/|[?&]v=|\/(?:shorts|embed|live|v)\/)([\w-]{11})/);
    return m ? m[1] : s;
  };
  const vimeoId = (s = "") => {
    const m = String(s).match(/(\d{6,})/);
    return m ? m[1] : String(s).trim();
  };

  const igCode = (s = "") => {
    const m = String(s).match(/\/(?:reels?|p|tv)\/([\w-]+)/);
    return m ? m[1] : String(s).trim();
  };

  // source 를 { youtube | vimeo | instagram | file } 중 하나로 정리.
  // 키를 잘못 써도 주소를 보고 자동으로 알아챕니다. (예: youtube 칸에 릴스 주소)
  const srcOf = (v) => {
    const s = v.source || {};
    const raw = s.instagram || s.youtube || s.vimeo || s.url || "";
    if (/instagram\.com/.test(raw) || s.instagram) return { instagram: igCode(raw) };
    if (/vimeo\.com/.test(raw) || s.vimeo) return { vimeo: vimeoId(raw) };
    if (/youtu/.test(raw) || s.youtube) return { youtube: ytId(raw) };
    if (s.file) return { file: s.file };
    return {};
  };

  const thumbOf = (v) => {
    if (v.thumbnail) return v.thumbnail;
    const s = srcOf(v);
    return s.youtube ? `https://i.ytimg.com/vi/${s.youtube}/hqdefault.jpg` : "";
  };

  const embedOf = (v) => {
    const s = srcOf(v);
    if (s.instagram) return `<iframe src="https://www.instagram.com/reel/${encodeURIComponent(s.instagram)}/embed/" allow="autoplay; encrypted-media; fullscreen" allowfullscreen title="${esc(v.title)}"></iframe>`;
    if (s.youtube) return `<iframe src="https://www.youtube-nocookie.com/embed/${encodeURIComponent(ytId(s.youtube))}?autoplay=1&rel=0" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen title="${esc(v.title)}"></iframe>`;
    if (s.vimeo) return `<iframe src="https://player.vimeo.com/video/${encodeURIComponent(vimeoId(s.vimeo))}?autoplay=1" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen title="${esc(v.title)}"></iframe>`;
    if (s.file) return `<video src="${esc(s.file)}" controls autoplay playsinline${v.thumbnail ? ` poster="${esc(v.thumbnail)}"` : ""}></video>`;
    return "";
  };

  // 12345 → "1.2만", 3400 → "3,400", "12만" 처럼 글자로 써도 그대로 표시
  const fmtViews = (n) => {
    if (typeof n !== "number") return String(n);
    if (n >= 1e8) return `${+(n / 1e8).toFixed(1)}억`;
    if (n >= 1e4) return `${+(n / 1e4).toFixed(1)}만`;
    return n.toLocaleString("ko-KR");
  };

  const metaOf = (v) => [v.category, v.year, v.role].filter(Boolean).map(esc).join(" · ");

  const thumbHTML = (v) => {
    const t = thumbOf(v);
    const s = srcOf(v);
    const label = s.instagram ? "Reels" : "Video";
    let media;
    if (t) media = `<img src="${esc(t)}" alt="" loading="lazy" />`;
    // mp4 파일: 영상의 첫 장면을 썸네일로 자동 사용 + 마우스 올리면 미리보기
    else if (s.file) media = `<video src="${esc(s.file)}#t=0.1" preload="metadata" muted playsinline loop></video>`;
    else media = `<span class="ph">${label}<small>${esc(v.title)}</small></span>`;
    const own = v.aspect ? ` style="aspect-ratio:${ratio(v.aspect).css}"` : "";
    return `<div class="thumb${t || s.file ? "" : " noimg"}"${own}>
      ${media}
      ${v.views != null && v.views !== "" ? `<span class="views">▶ ${esc(fmtViews(v.views))}</span>` : ""}
      ${v.duration ? `<span class="dur">${esc(v.duration)}</span>` : ""}
      <span class="play" aria-hidden="true"></span>
    </div>`;
  };

  /* ---------- 대표작 ---------- */
  const featured = videos.find((v) => v.featured);
  if (featured) {
    const el = $("featured");
    el.hidden = false;
    el.tabIndex = 0;
    el.setAttribute("role", "button");
    el.setAttribute("aria-label", `${featured.title} 재생`);
    el.innerHTML = `${thumbHTML(featured)}
      <div class="info">
        <span class="badge">Featured</span>
        <h2>${esc(featured.title)}</h2>
        <p class="meta">${metaOf(featured)}</p>
        ${featured.description ? `<p>${esc(featured.description)}</p>` : ""}
      </div>`;
    el.onclick = () => open(featured);
    el.onkeydown = (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(featured); } };
  }

  /* ---------- 필터 & 검색 ---------- */
  const cats = ["전체", ...new Set(videos.map((v) => v.category).filter(Boolean))];
  let active = "전체";
  let query = "";

  $("filters").innerHTML = cats
    .map((c) => `<button role="tab" aria-selected="${c === active}" data-cat="${esc(c)}">${esc(c)}</button>`)
    .join("");
  $("filters").onclick = (e) => {
    const b = e.target.closest("button");
    if (!b) return;
    active = b.dataset.cat;
    $("filters").querySelectorAll("button").forEach((x) => x.setAttribute("aria-selected", x === b));
    render();
  };
  $("search").oninput = (e) => { query = e.target.value.trim().toLowerCase(); render(); };

  function render() {
    const list = videos.filter((v) =>
      (active === "전체" || v.category === active) &&
      (!query || [v.title, v.description, v.category, v.role, v.year].join(" ").toLowerCase().includes(query))
    );
    $("grid").innerHTML = list
      .map((v) => `<button class="card${v.aspect && ratio(v.aspect).vertical !== site.vertical ? " wide" : ""}" data-slug="${esc(v._slug)}" aria-label="${esc(v.title)} 재생">
          ${thumbHTML(v)}
          <h3>${esc(v.title)}</h3>
          <p class="meta">${metaOf(v)}</p>
        </button>`)
      .join("");
    $("count").textContent = `${list.length}개의 영상`;
    $("empty").hidden = list.length > 0;
  }
  // mp4 카드에 마우스를 올리면 소리 없이 미리보기 재생
  const hover = (on) => (e) => {
    const vid = e.target.closest?.(".card, .featured")?.querySelector(".thumb video");
    if (!vid) return;
    if (on) vid.play().catch(() => {});
    else { vid.pause(); vid.currentTime = 0.1; }
  };
  document.addEventListener("mouseover", hover(true));
  document.addEventListener("mouseout", (e) => {
    const card = e.target.closest?.(".card, .featured");
    if (card && !card.contains(e.relatedTarget)) hover(false)(e);
  });

  $("grid").onclick = (e) => {
    const c = e.target.closest(".card");
    if (c) open(videos.find((v) => v._slug === c.dataset.slug));
  };

  /* ---------- 플레이어 ---------- */
  const dlg = $("player");
  function open(v, fromHash = false) {
    if (!v) return;
    const r = v.aspect ? ratio(v.aspect) : site;
    $("frame").style.aspectRatio = r.css;
    $("frame").classList.toggle("vertical", r.vertical);
    $("frame").classList.toggle("ig", !!srcOf(v).instagram);
    $("frame").innerHTML = embedOf(v);
    $("pTitle").textContent = v.title || "";
    $("pMeta").innerHTML = [metaOf(v), v.duration && esc(v.duration), v.views != null && v.views !== "" && `조회수 ${esc(fmtViews(v.views))}회`].filter(Boolean).join(" · ");
    $("pDesc").textContent = v.description || "";
    if (!dlg.open) dlg.showModal();
    if (!fromHash) history.replaceState(null, "", `#${v._slug}`);
  }
  function close() {
    $("frame").innerHTML = ""; // 재생 정지
    if (dlg.open) dlg.close();
    history.replaceState(null, "", location.pathname + location.search);
  }
  $("closePlayer").onclick = close;
  dlg.addEventListener("close", close);
  dlg.onclick = (e) => { if (e.target === dlg || e.target.classList.contains("player-inner")) close(); };

  // 공유 링크(#slug)로 들어오면 바로 재생
  const fromHash = () => {
    const slug = decodeURIComponent(location.hash.slice(1));
    if (slug) open(videos.find((v) => v._slug === slug), true);
  };

  render();
  fromHash();
  addEventListener("hashchange", fromHash);
})();
