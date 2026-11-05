/*
 * Dados de DEMONSTRAÇÃO.
 * Nesta versão de teste os anúncios são fictícios e gerados localmente.
 * Na versão real, cada fonte será consultada por um backend (APIs/parcerias),
 * e cada anúncio trará a ligação para o anúncio original.
 */

const COUNTRIES = {
  PT: "Portugal", ES: "Espanha", FR: "França", DE: "Alemanha", IT: "Itália",
  NL: "Países Baixos", BE: "Bélgica", LU: "Luxemburgo", AT: "Áustria", PL: "Polónia",
  IE: "Irlanda", SE: "Suécia", HR: "Croácia", GR: "Grécia",
};

const DISTRITOS = ["Aveiro", "Braga", "Coimbra", "Faro", "Leiria", "Lisboa", "Porto", "Setúbal", "Viseu", "Madeira", "Açores"];

/* countries: onde cada fonte tem anúncios */
const SOURCES = [
  // Portugal
  { id: "standvirtual", name: "Standvirtual", cats: ["carro", "moto"], countries: ["PT"], url: "https://www.standvirtual.com" },
  { id: "olx", name: "OLX Portugal", cats: ["carro", "moto", "barco"], countries: ["PT"], url: "https://www.olx.pt" },
  { id: "custojusto", name: "CustoJusto", cats: ["carro", "moto", "barco"], countries: ["PT"], url: "https://www.custojusto.pt" },
  { id: "piscapisca", name: "Piscapisca", cats: ["carro"], countries: ["PT"], url: "https://www.piscapisca.pt" },
  // Europa
  { id: "autoscout24", name: "AutoScout24", cats: ["carro", "moto"], countries: ["DE", "IT", "NL", "BE", "LU", "AT", "ES", "FR"], url: "https://www.autoscout24.com" },
  { id: "mobilede", name: "mobile.de", cats: ["carro", "moto"], countries: ["DE", "AT"], url: "https://www.mobile.de" },
  { id: "cochesnet", name: "coches.net", cats: ["carro"], countries: ["ES"], url: "https://www.coches.net" },
  { id: "lacentrale", name: "La Centrale", cats: ["carro", "moto"], countries: ["FR"], url: "https://www.lacentrale.fr" },
  { id: "subito", name: "Subito", cats: ["carro", "moto", "barco"], countries: ["IT"], url: "https://www.subito.it" },
  { id: "marktplaats", name: "Marktplaats", cats: ["carro", "moto", "barco"], countries: ["NL"], url: "https://www.marktplaats.nl" },
  { id: "otomoto", name: "Otomoto", cats: ["carro", "moto"], countries: ["PL"], url: "https://www.otomoto.pl" },
  // Náutica (Europa inteira, incluindo Portugal)
  { id: "boat24", name: "Boat24", cats: ["barco"], countries: ["PT", "ES", "FR", "DE", "IT", "NL", "HR", "GR"], url: "https://www.boat24.com" },
  { id: "yachtworld", name: "YachtWorld", cats: ["barco"], countries: ["PT", "ES", "FR", "IT", "HR", "GR"], url: "https://www.yachtworld.com" },
  { id: "bandofboats", name: "Band of Boats", cats: ["barco"], countries: ["PT", "FR", "ES", "IT"], url: "https://www.bandofboats.com" },
];

const MODELS = {
  carro: [
    { marca: "Porsche", modelo: "Macan S", versao: "2.9 V6 PDK", base: 72000, ano: 2022, comb: "Gasolina", tone: "#3b3326", feats: ["Teto de abrir", "Bancos em pele", "Um só dono"] },
    { marca: "Porsche", modelo: "911 Carrera", versao: "3.0 Biturbo", base: 125000, ano: 2021, comb: "Gasolina", tone: "#4a2a24", feats: ["Escape desportivo", "Revisões na marca"] },
    { marca: "BMW", modelo: "X5", versao: "xDrive45e M Sport", base: 68000, ano: 2022, comb: "Híbrido plug-in", tone: "#24303b", feats: ["Teto panorâmico", "Head-up display", "Livro de revisões"] },
    { marca: "BMW", modelo: "320d", versao: "Pack M", base: 36000, ano: 2022, comb: "Gasóleo", tone: "#26292f", feats: ["Um só dono", "Garantia"] },
    { marca: "Mercedes-Benz", modelo: "GLC 300 de", versao: "4MATIC AMG Line", base: 58000, ano: 2022, comb: "Híbrido plug-in", tone: "#2c2c30", feats: ["Teto de abrir", "Som Burmester"] },
    { marca: "Mercedes-Benz", modelo: "Classe A 180 d", versao: "Style", base: 27000, ano: 2022, comb: "Gasóleo", tone: "#30302c", feats: ["Câmara traseira", "Livro de revisões"] },
    { marca: "Audi", modelo: "Q5 Sportback", versao: "40 TDI S line", base: 52000, ano: 2022, comb: "Gasóleo", tone: "#2f2a22", feats: ["Teto de abrir", "Virtual cockpit"] },
    { marca: "Volvo", modelo: "XC60", versao: "Recharge T6", base: 49000, ano: 2023, comb: "Híbrido plug-in", tone: "#283229", feats: ["Cruise control adaptativo", "Um só dono"] },
    { marca: "Tesla", modelo: "Model 3", versao: "Long Range AWD", base: 38000, ano: 2023, comb: "Elétrico", tone: "#1f2b33", feats: ["Teto panorâmico", "Garantia"] },
    { marca: "Volkswagen", modelo: "Golf", versao: "1.5 eTSI Life", base: 26000, ano: 2023, comb: "Gasolina", tone: "#2c2a26", feats: ["Livro de revisões", "Garantia"] },
    { marca: "Peugeot", modelo: "3008", versao: "1.5 BlueHDi GT", base: 29000, ano: 2022, comb: "Gasóleo", tone: "#2b2f2a", feats: ["Teto de abrir", "Um só dono"] },
    { marca: "Renault", modelo: "Clio", versao: "E-Tech Híbrido", base: 19500, ano: 2023, comb: "Híbrido", tone: "#33282a", feats: ["Garantia", "Livro de revisões"] },
    { marca: "Cupra", modelo: "Formentor", versao: "1.5 TSI DSG", base: 33000, ano: 2023, comb: "Gasolina", tone: "#2e2b27", feats: ["Bancos desportivos", "Um só dono"] },
    { marca: "Land Rover", modelo: "Range Rover Velar", versao: "D300 R-Dynamic", base: 74000, ano: 2022, comb: "Gasóleo", tone: "#272b2e", feats: ["Teto panorâmico", "Som Meridian"] },
    { marca: "Toyota", modelo: "C-HR", versao: "1.8 Hybrid Exclusive", base: 25000, ano: 2022, comb: "Híbrido", tone: "#2a2a30", feats: ["Livro de revisões", "Garantia"] },
  ],
  moto: [
    { marca: "Ducati", modelo: "Panigale V4", versao: "S", base: 29000, ano: 2022, comb: "Gasolina", tone: "#4a2422", feats: ["Escape Akrapovič", "Um só dono"] },
    { marca: "BMW", modelo: "R 1250 GS", versao: "Adventure", base: 21000, ano: 2022, comb: "Gasolina", tone: "#2a2e33", feats: ["Malas laterais", "Livro de revisões"] },
    { marca: "Harley-Davidson", modelo: "Fat Boy", versao: "114", base: 22000, ano: 2021, comb: "Gasolina", tone: "#2e2a24", feats: ["Banco personalizado", "Um só dono"] },
    { marca: "Triumph", modelo: "Bonneville T120", versao: "Black", base: 12500, ano: 2022, comb: "Gasolina", tone: "#2b2925", feats: ["Livro de revisões"] },
    { marca: "Vespa", modelo: "GTS 300", versao: "Super Sport", base: 6500, ano: 2023, comb: "Gasolina", tone: "#2f3329", feats: ["Garantia", "Top case"] },
    { marca: "Yamaha", modelo: "MT-09", versao: "SP", base: 11500, ano: 2023, comb: "Gasolina", tone: "#242a33", feats: ["Quickshifter", "Um só dono"] },
    { marca: "Honda", modelo: "Africa Twin", versao: "Adventure Sports DCT", base: 15500, ano: 2022, comb: "Gasolina", tone: "#352a26", feats: ["Malas laterais", "Garantia"] },
  ],
  barco: [
    { marca: "Azimut", modelo: "Azimut 50", versao: "Fly", base: 780000, ano: 2019, comb: "Gasóleo", m: 15.5, tone: "#1f2c38", feats: ["Flybridge", "Gerador", "Ar condicionado"] },
    { marca: "Sunseeker", modelo: "Manhattan 55", versao: "", base: 950000, ano: 2018, comb: "Gasóleo", m: 17.2, tone: "#22303a", feats: ["Flybridge", "Estabilizadores"] },
    { marca: "Princess", modelo: "V40", versao: "", base: 320000, ano: 2019, comb: "Gasóleo", m: 12.4, tone: "#1d2933", feats: ["Gerador", "Bow thruster"] },
    { marca: "Beneteau", modelo: "Oceanis 40.1", versao: "Veleiro", base: 230000, ano: 2021, comb: "Gasóleo", m: 12.0, tone: "#22323a", feats: ["Velas novas", "Piloto automático"] },
    { marca: "Jeanneau", modelo: "Cap Camarat 7.5 WA", versao: "", base: 62000, ano: 2022, comb: "Gasolina", m: 7.5, tone: "#263236", feats: ["Motor fora de borda", "Atrelado incluído"] },
    { marca: "Quicksilver", modelo: "Activ 605 Open", versao: "", base: 34000, ano: 2022, comb: "Gasolina", m: 6.0, tone: "#20303c", feats: ["Motor fora de borda", "Toldo"] },
    { marca: "Sea Ray", modelo: "SLX 310", versao: "", base: 210000, ano: 2020, comb: "Gasolina", m: 9.5, tone: "#1e2a30", feats: ["Som premium", "Toldo"] },
  ],
};

/* Localidades: Portugal por distrito, restantes por país */
const PLACES = [
  ["Lisboa", "PT", "Lisboa"], ["Cascais", "PT", "Lisboa"], ["Sintra", "PT", "Lisboa"],
  ["Porto", "PT", "Porto"], ["Vila Nova de Gaia", "PT", "Porto"], ["Matosinhos", "PT", "Porto"],
  ["Braga", "PT", "Braga"], ["Aveiro", "PT", "Aveiro"], ["Coimbra", "PT", "Coimbra"],
  ["Leiria", "PT", "Leiria"], ["Setúbal", "PT", "Setúbal"], ["Faro", "PT", "Faro"],
  ["Lagos", "PT", "Faro"], ["Viseu", "PT", "Viseu"], ["Funchal", "PT", "Madeira"], ["Ponta Delgada", "PT", "Açores"],
  ["Madrid", "ES"], ["Barcelona", "ES"], ["Vigo", "ES"], ["Málaga", "ES"],
  ["Paris", "FR"], ["Lyon", "FR"], ["Nice", "FR"],
  ["Munique", "DE"], ["Estugarda", "DE"], ["Hamburgo", "DE"], ["Berlim", "DE"],
  ["Milão", "IT"], ["Roma", "IT"], ["Génova", "IT"],
  ["Amesterdão", "NL"], ["Roterdão", "NL"], ["Bruxelas", "BE"], ["Antuérpia", "BE"],
  ["Luxemburgo", "LU"], ["Viena", "AT"], ["Varsóvia", "PL"],
  ["Split", "HR"], ["Atenas", "GR"],
];
const COLORS = ["Preto", "Branco", "Cinzento", "Prateado", "Azul", "Vermelho"];

/* Gerador determinístico para que a demo seja sempre igual */
function seeded(seed) {
  let s = seed;
  return () => (s = (s * 16807) % 2147483647) / 2147483647;
}

function buildListings() {
  const rnd = seeded(7);
  const pick = (arr) => arr[Math.floor(rnd() * arr.length)];
  const list = [];
  let id = 1;

  for (const cat of Object.keys(MODELS)) {
    const catSources = SOURCES.filter((s) => s.cats.includes(cat));
    const placesForCat = PLACES.filter(([, c]) => catSources.some((s) => s.countries.includes(c)));
    const ptPlaces = placesForCat.filter(([, c]) => c === "PT");
    const euPlaces = placesForCat.filter(([, c]) => c !== "PT");

    for (const m of MODELS[cat]) {
      const variants = 3 + Math.floor(rnd() * 2);
      for (let v = 0; v < variants; v++) {
        // cerca de metade dos anúncios em Portugal, os restantes no resto da UE
        const place = v % 2 === 0 ? pick(ptPlaces) : pick(euPlaces);
        const [cidade, pais, distrito] = place;
        const src = pick(catSources.filter((s) => s.countries.includes(pais)));
        const ano = m.ano - Math.floor(rnd() * 3) + (v === 0 ? 1 : 0);
        const idade = Math.max(0, 2026 - ano);
        // carros importados costumam aparecer mais baratos lá fora (antes de ISV/legalização)
        const fator = pais === "PT" ? 1 : 0.9;
        const preco = Math.round((m.base * fator * (1 - idade * 0.06) * (0.92 + rnd() * 0.16)) / 100) * 100;
        const extras = m.feats.filter(() => rnd() > 0.3);
        const item = {
          id: id++, cat,
          marca: m.marca, modelo: m.modelo, versao: m.versao,
          ano, preco,
          combustivel: m.comb,
          cor: pick(COLORS),
          cidade, pais, distrito: distrito || null,
          source: src.id,
          feats: extras.length ? extras : [m.feats[0]],
          tone: m.tone,
        };
        if (cat === "barco") {
          item.comprimento = m.m;
          item.horas = Math.round((idade * 80 + rnd() * 200) / 10) * 10;
        } else {
          item.km = Math.round(((idade + rnd()) * (cat === "moto" ? 5000 : 13000)) / 100) * 100;
          item.caixa = cat === "moto"
            ? (m.versao.includes("DCT") ? "Automática" : "Manual")
            : (rnd() > 0.25 ? "Automática" : "Manual");
        }
        list.push(item);
      }
    }
  }
  return list;
}

const LISTINGS = buildListings();
