(() => {
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => [...document.querySelectorAll(sel)];

  const state = { cat: "carro", ambito: "PT", results: [], sourceFilter: "all", sort: "relevancia", terms: [] };

  const ICONS = {
    carro: '<svg viewBox="0 0 120 60"><path d="M8 42c0-4 2-7 6-8l14-3 16-12c3-2 6-3 10-3h22c5 0 9 2 12 5l10 10 10 2c4 1 6 4 6 8v4c0 2-1 3-3 3h-8"/><path d="M30 49H54M80 49H54"/><circle cx="22" cy="48" r="7"/><circle cx="92" cy="48" r="7"/><path d="M46 31l8-9c2-2 4-3 7-3h7v12zM74 19h6c3 0 5 1 7 3l8 9H74z"/></svg>',
    moto: '<svg viewBox="0 0 120 60"><circle cx="24" cy="42" r="13"/><circle cx="96" cy="42" r="13"/><path d="M24 42l20-18h22l10 8h12l8 10M44 24l-6-8h-8M66 24l8-10h10M58 32h18"/></svg>',
    barco: '<svg viewBox="0 0 120 60"><path d="M6 40h108l-12 12H20z"/><path d="M26 40V30h44l12 10M38 30v-8h22l8 8M44 26h10"/><path d="M4 56c6 0 6-2 12-2s6 2 12 2 6-2 12-2 6 2 12 2 6-2 12-2 6 2 12 2 6-2 12-2 6 2 12 2"/></svg>',
  };
  const EXT = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17L17 7M9 7h8v8"/></svg>';

  const STOP = new Set(["de", "da", "do", "e", "com", "em", "a", "o", "para", "um", "uma", "que", "os", "as", "no", "na", "so"]);
  const SYN = {
    suv: ["macan", "x5", "glc", "q5", "xc60", "3008", "formentor", "velar", "c-hr"],
    citadino: ["clio", "golf", "classe a"],
    desportivo: ["911", "panigale", "macan", "pack m", "amg", "mt-09", "formentor"],
    automatico: ["automatica"],
    diesel: ["gasoleo"],
    hibrido: ["hibrido"],
    eletrico: ["eletrico"],
    lancha: ["cap camarat", "activ", "sea ray", "v40"],
    iate: ["azimut", "sunseeker", "princess"],
    veleiro: ["oceanis", "veleiro"],
    scooter: ["vespa"],
    trail: ["gs", "africa twin"],
  };

  const norm = (s) => String(s).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  const eur = (n) => n.toLocaleString("pt-PT", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });
  const num = (n) => n.toLocaleString("pt-PT");
  const sourceById = (id) => SOURCES.find((s) => s.id === id);
  const catLabel = { carro: "Carros", moto: "Motos", barco: "Barcos" };

  function activeSources() {
    return SOURCES.filter((s) => s.cats.includes(state.cat) && (state.ambito === "UE" || s.countries.includes("PT")));
  }

  function sourceLink(item) {
    const src = sourceById(item.source);
    const q = encodeURIComponent(`${item.marca} ${item.modelo}`.toLowerCase());
    if (src.id === "olx") return `${src.url}/ads/q-${q.replace(/%20/g, "-")}/`;
    return src.url;
  }

  /* ---------- Form setup ---------- */
  function fillBrands() {
    const brands = [...new Set(LISTINGS.filter((l) => l.cat === state.cat).map((l) => l.marca))].sort();
    $("#marca").innerHTML = '<option value="">Todas</option>' + brands.map((b) => `<option>${b}</option>`).join("");
  }
  function fillYears() {
    const years = [];
    for (let y = 2026; y >= 2010; y--) years.push(`<option>${y}</option>`);
    $("#anoMin").insertAdjacentHTML("beforeend", years.join(""));
  }
  function fillRegion() {
    const sel = $("#regiao");
    if (state.ambito === "PT") {
      $("#regiaoLabel").textContent = "Distrito";
      sel.innerHTML = '<option value="">Todo o país</option>' + DISTRITOS.map((d) => `<option>${d}</option>`).join("");
    } else {
      $("#regiaoLabel").textContent = "País";
      const codes = Object.keys(COUNTRIES).filter((c) => activeSources().some((s) => s.countries.includes(c)));
      sel.innerHTML = '<option value="">Toda a UE</option>' + codes.map((c) => `<option value="${c}">${COUNTRIES[c]}</option>`).join("");
    }
  }
  function updateCatFields() {
    $$("[data-only]").forEach((el) => {
      el.hidden = !el.dataset.only.split(" ").includes(state.cat);
    });
    const placeholders = {
      carro: "Ex.: SUV automático, teto de abrir, um só dono, livro de revisões",
      moto: "Ex.: Trail, um só dono, menos de 20 000 km, malas laterais",
      barco: "Ex.: Lancha com cabine, flybridge, gerador, mais de 9 m",
    };
    $("#q").placeholder = placeholders[state.cat];
    $("#sourceCount").textContent = activeSources().length;
    $("#scopeHint").textContent = state.ambito === "PT" ? "Portugal" : "Portugal e União Europeia";
    fillRegion();
  }

  $$(".tab").forEach((tab) =>
    tab.addEventListener("click", () => {
      $$(".tab").forEach((t) => { t.classList.remove("active"); t.setAttribute("aria-selected", "false"); });
      tab.classList.add("active");
      tab.setAttribute("aria-selected", "true");
      state.cat = tab.dataset.cat;
      fillBrands();
      updateCatFields();
    })
  );

  $$('input[name="ambito"]').forEach((r) =>
    r.addEventListener("change", () => { state.ambito = r.value; updateCatFields(); })
  );

  $("#toggleAdvanced").addEventListener("click", (e) => {
    const adv = $("#advanced");
    adv.hidden = !adv.hidden;
    e.currentTarget.setAttribute("aria-expanded", String(!adv.hidden));
  });

  /* ---------- Search ---------- */
  function haystack(l) {
    return norm([l.marca, l.modelo, l.versao, l.cor, l.combustivel, l.caixa, l.cidade, l.distrito, COUNTRIES[l.pais], ...l.feats].join(" "));
  }

  function search(f) {
    const terms = norm(f.q).split(/[\s,;]+/).filter((t) => t.length > 1 && !STOP.has(t));
    state.terms = terms;

    return LISTINGS.filter((l) => {
      if (l.cat !== state.cat) return false;
      if (state.ambito === "PT" && l.pais !== "PT") return false;
      if (f.regiao) {
        if (state.ambito === "PT" && l.distrito !== f.regiao) return false;
        if (state.ambito === "UE" && l.pais !== f.regiao) return false;
      }
      if (f.marca && l.marca !== f.marca) return false;
      if (f.modelo && !norm(`${l.modelo} ${l.versao}`).includes(norm(f.modelo))) return false;
      if (f.anoMin && l.ano < +f.anoMin) return false;
      if (f.precoMax && l.preco > +f.precoMax) return false;
      if (f.kmMax && l.km != null && l.km > +f.kmMax) return false;
      if (f.caixa && l.caixa && l.caixa !== f.caixa) return false;
      if (f.combustivel && l.combustivel !== f.combustivel) return false;
      if (f.cor && l.cor !== f.cor) return false;
      if (f.comprimento && l.comprimento != null && l.comprimento < +f.comprimento) return false;
      return true;
    })
      .map((l) => {
        const h = haystack(l);
        let score = 0;
        for (const t of terms) {
          if (h.includes(t)) score += 2;
          else if (SYN[t] && SYN[t].some((s) => h.includes(s))) score += 1;
        }
        return { ...l, score };
      })
      .filter((l) => !terms.length || l.score > 0);
  }

  function sorted(list) {
    const by = {
      "relevancia": (a, b) => b.score - a.score || (a.pais === "PT" ? -1 : 0) - (b.pais === "PT" ? -1 : 0) || b.ano - a.ano,
      "preco-asc": (a, b) => a.preco - b.preco,
      "preco-desc": (a, b) => b.preco - a.preco,
      "ano-desc": (a, b) => b.ano - a.ano,
      "km-asc": (a, b) => (a.km ?? a.horas) - (b.km ?? b.horas),
    };
    return [...list].sort(by[state.sort]);
  }

  /* ---------- Render ---------- */
  function isMatch(text) {
    const t = norm(text);
    return state.terms.some((term) => t.includes(term));
  }

  function card(l, i) {
    const src = sourceById(l.source);
    const specs = [
      l.km != null ? `${num(l.km)} km` : null,
      l.horas != null ? `${num(l.horas)} h de motor` : null,
      l.comprimento != null ? `${num(l.comprimento)} m` : null,
      l.caixa ? `Caixa ${l.caixa.toLowerCase()}` : null,
      l.combustivel,
      l.cor,
      ...l.feats,
    ].filter(Boolean);
    const local = l.pais === "PT" ? `${l.cidade} · ${l.distrito === l.cidade ? "Portugal" : l.distrito}` : `${l.cidade} · ${COUNTRIES[l.pais]}`;
    const importNote = l.pais !== "PT"
      ? `<p class="import-note">Fora de Portugal: ${l.cat === "barco" ? "custos de registo e transporte" : "ISV e legalização"} a considerar.</p>`
      : "";

    return `
      <article class="card" style="--tone:${l.tone}; animation-delay:${Math.min(i, 12) * 40}ms">
        <div class="card-media">
          <span class="badge">${src.name}</span>
          <span class="badge year-badge">${l.ano}</span>
          <span class="badge country-badge${l.pais === "PT" ? " is-pt" : ""}">${l.pais}</span>
          ${ICONS[l.cat]}
        </div>
        <div class="card-body">
          <div>
            <h3 class="card-title">${l.marca} ${l.modelo}</h3>
            <p class="card-sub">${l.versao || "&nbsp;"}</p>
          </div>
          <p class="card-price">${eur(l.preco)}</p>
          <div class="specs">
            ${specs.map((s) => `<span class="spec${isMatch(s) ? " match" : ""}">${s}</span>`).join("")}
          </div>
          ${importNote}
          <div class="card-foot">
            <span class="location">${local}</span>
            <a class="card-link" href="${sourceLink(l)}" target="_blank" rel="noopener noreferrer">
              Ver anúncio original ${EXT}
            </a>
          </div>
        </div>
      </article>`;
  }

  function renderSourceFilter() {
    const counts = {};
    state.results.forEach((r) => (counts[r.source] = (counts[r.source] || 0) + 1));
    const chips = [`<button type="button" class="chip ${state.sourceFilter === "all" ? "active" : ""}" data-src="all">Todas as fontes<span class="n">${state.results.length}</span></button>`];
    SOURCES.filter((s) => counts[s.id]).forEach((s) => {
      chips.push(`<button type="button" class="chip ${state.sourceFilter === s.id ? "active" : ""}" data-src="${s.id}">${s.name}<span class="n">${counts[s.id]}</span></button>`);
    });
    $("#sourceFilter").innerHTML = chips.join("");
    $$("#sourceFilter .chip").forEach((c) =>
      c.addEventListener("click", () => { state.sourceFilter = c.dataset.src; renderResults(); })
    );
  }

  function renderResults() {
    renderSourceFilter();
    const visible = sorted(state.results.filter((r) => state.sourceFilter === "all" || r.source === state.sourceFilter));
    $("#cards").innerHTML = visible.map(card).join("");
    $("#empty").hidden = visible.length > 0;
    $("#sourceFilter").hidden = state.results.length === 0;

    const n = state.results.length;
    const nSources = new Set(state.results.map((r) => r.source)).size;
    const nCountries = new Set(state.results.map((r) => r.pais)).size;
    $("#resultsTitle").textContent = `${n} ${n === 1 ? "anúncio encontrado" : "anúncios encontrados"}`;
    $("#resultsMeta").textContent = n
      ? `${catLabel[state.cat]} reunidos de ${nSources} ${nSources === 1 ? "site" : "sites"} de confiança` +
        (state.ambito === "UE" ? ` em ${nCountries} ${nCountries === 1 ? "país" : "países"}.` : " em Portugal.")
      : "";
  }

  /* Simula a pesquisa nas fontes (na versão real, chamadas em paralelo ao backend) */
  function runScan(done) {
    const sources = activeSources();
    const scan = $("#scan");
    const bar = $("#scan .scan-bar span");
    $("#scanList").innerHTML = sources.map((s) => `<li data-id="${s.id}">${s.name}</li>`).join("");
    scan.hidden = false;
    $("#cards").innerHTML = "";
    $("#empty").hidden = true;
    $("#sourceFilter").hidden = true;
    $("#resultsTitle").textContent = "A pesquisar anúncios…";
    $("#resultsMeta").textContent = state.ambito === "PT"
      ? "A consultar os sites de confiança em Portugal."
      : "A consultar os sites de confiança em Portugal e na União Europeia.";
    bar.style.width = "0";

    const step = Math.max(120, 1800 / sources.length);
    sources.forEach((s, i) => {
      setTimeout(() => {
        $(`#scanList li[data-id="${s.id}"]`).classList.add("done");
        bar.style.width = `${((i + 1) / sources.length) * 100}%`;
        if (i === sources.length - 1) setTimeout(() => { scan.hidden = true; done(); }, 350);
      }, 220 + i * step);
    });
  }

  $("#searchForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const f = Object.fromEntries(new FormData(e.currentTarget).entries());
    state.sourceFilter = "all";
    $("#resultados").hidden = false;
    $("#resultados").scrollIntoView({ behavior: "smooth", block: "start" });
    runScan(() => {
      state.results = search(f);
      renderResults();
    });
  });

  $("#sort").addEventListener("change", (e) => { state.sort = e.target.value; renderResults(); });

  /* ---------- Sources section ---------- */
  const sourceTile = (s) => {
    const where = s.countries.length > 2 ? `${s.countries.length} países` : s.countries.map((c) => COUNTRIES[c]).join(" · ");
    return `<a class="source" href="${s.url}" target="_blank" rel="noopener noreferrer">
      <span class="source-name">${s.name}</span>
      <span class="source-cats">${s.cats.map((c) => catLabel[c]).join(" · ")}</span>
      <span class="source-where">${where}</span>
    </a>`;
  };
  const isPT = (s) => s.countries.length === 1 && s.countries[0] === "PT";
  $("#sourcesPT").innerHTML = SOURCES.filter(isPT).map(sourceTile).join("");
  $("#sourcesUE").innerHTML = SOURCES.filter((s) => !isPT(s)).map(sourceTile).join("");

  fillBrands();
  fillYears();
  updateCatFields();
})();
