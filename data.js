/*
 * Dados de DEMONSTRAÇÃO.
 * Nesta versão de teste os anúncios são fictícios e gerados localmente.
 * Na versão real, cada fonte será consultada por um backend (APIs/parceiros),
 * e cada anúncio trará o link do anúncio original.
 */

const SOURCES = [
  { id: "webmotors", name: "Webmotors", cats: ["carro", "moto"], url: "https://www.webmotors.com.br" },
  { id: "olx", name: "OLX", cats: ["carro", "moto", "barco"], url: "https://www.olx.com.br" },
  { id: "icarros", name: "iCarros", cats: ["carro"], url: "https://www.icarros.com.br" },
  { id: "mobiauto", name: "Mobiauto", cats: ["carro", "moto"], url: "https://www.mobiauto.com.br" },
  { id: "kavak", name: "Kavak", cats: ["carro"], url: "https://www.kavak.com/br" },
  { id: "chavesnamao", name: "Chaves na Mão", cats: ["carro", "moto"], url: "https://www.chavesnamao.com.br" },
  { id: "bombarco", name: "Bombarco", cats: ["barco"], url: "https://www.bombarco.com.br" },
  { id: "nautica", name: "Náutica", cats: ["barco"], url: "https://www.nautica.com.br" },
];

const MODELS = {
  carro: [
    { marca: "Porsche", modelo: "Macan S", versao: "2.9 V6 PDK", base: 520000, ano: 2022, comb: "Gasolina", tone: "#3b3326", feats: ["Teto solar", "Bancos em couro", "Único dono"] },
    { marca: "Porsche", modelo: "911 Carrera", versao: "3.0 Biturbo", base: 890000, ano: 2021, comb: "Gasolina", tone: "#4a2a24", feats: ["Escape esportivo", "Revisões na concessionária"] },
    { marca: "BMW", modelo: "X5", versao: "xDrive45e M Sport", base: 480000, ano: 2022, comb: "Híbrido", tone: "#24303b", feats: ["Teto panorâmico", "Head-up display", "Blindado"] },
    { marca: "BMW", modelo: "320i", versao: "M Sport", base: 245000, ano: 2023, comb: "Flex", tone: "#26292f", feats: ["Único dono", "Garantia de fábrica"] },
    { marca: "Mercedes-Benz", modelo: "GLC 300", versao: "4MATIC Coupé", base: 395000, ano: 2022, comb: "Gasolina", tone: "#2c2c30", feats: ["Teto solar", "Som Burmester"] },
    { marca: "Mercedes-Benz", modelo: "C 300", versao: "AMG Line", base: 310000, ano: 2023, comb: "Gasolina", tone: "#30302c", feats: ["Bancos em couro", "Câmera 360°"] },
    { marca: "Audi", modelo: "Q5", versao: "Sportback S line", base: 340000, ano: 2022, comb: "Gasolina", tone: "#2f2a22", feats: ["Teto solar", "Virtual cockpit"] },
    { marca: "Volvo", modelo: "XC60", versao: "Recharge T8", base: 360000, ano: 2023, comb: "Híbrido", tone: "#283229", feats: ["Piloto automático adaptativo", "Único dono"] },
    { marca: "Toyota", modelo: "Corolla Cross", versao: "XRX Hybrid", base: 185000, ano: 2023, comb: "Híbrido", tone: "#2e2b27", feats: ["Revisões em dia", "Multimídia"] },
    { marca: "Toyota", modelo: "Hilux", versao: "SRX 2.8 4x4", base: 265000, ano: 2022, comb: "Diesel", tone: "#332b22", feats: ["Capota marítima", "Único dono"] },
    { marca: "Jeep", modelo: "Compass", versao: "Limited T270", base: 165000, ano: 2022, comb: "Flex", tone: "#2b2f2a", feats: ["Teto solar", "Bancos em couro"] },
    { marca: "Honda", modelo: "Civic", versao: "Touring 1.5 Turbo", base: 150000, ano: 2021, comb: "Gasolina", tone: "#2a2a30", feats: ["Teto solar", "Revisões em dia"] },
    { marca: "Volkswagen", modelo: "T-Cross", versao: "Highline 250 TSI", base: 135000, ano: 2023, comb: "Flex", tone: "#2c2a26", feats: ["Teto solar", "Garantia de fábrica"] },
    { marca: "Land Rover", modelo: "Range Rover Velar", versao: "R-Dynamic SE", base: 540000, ano: 2022, comb: "Gasolina", tone: "#272b2e", feats: ["Teto panorâmico", "Blindado", "Som Meridian"] },
    { marca: "BYD", modelo: "Seal", versao: "AWD Performance", base: 285000, ano: 2024, comb: "Elétrico", tone: "#1f2b33", feats: ["Teto panorâmico", "Garantia de fábrica"] },
  ],
  moto: [
    { marca: "Ducati", modelo: "Panigale V4", versao: "S", base: 165000, ano: 2022, comb: "Gasolina", tone: "#4a2422", feats: ["Escape Akrapovič", "Único dono"] },
    { marca: "BMW", modelo: "R 1250 GS", versao: "Adventure Premium", base: 115000, ano: 2022, comb: "Gasolina", tone: "#2a2e33", feats: ["Malas laterais", "Revisões em dia"] },
    { marca: "Harley-Davidson", modelo: "Fat Boy", versao: "114", base: 105000, ano: 2021, comb: "Gasolina", tone: "#2e2a24", feats: ["Bancos customizados", "Único dono"] },
    { marca: "Triumph", modelo: "Bonneville T120", versao: "Black", base: 62000, ano: 2022, comb: "Gasolina", tone: "#2b2925", feats: ["Revisões em dia"] },
    { marca: "Honda", modelo: "CB 650R", versao: "Neo Sports Café", base: 52000, ano: 2023, comb: "Gasolina", tone: "#352a26", feats: ["Garantia de fábrica"] },
    { marca: "Yamaha", modelo: "MT-09", versao: "SP", base: 68000, ano: 2023, comb: "Gasolina", tone: "#242a33", feats: ["Quickshifter", "Único dono"] },
    { marca: "Kawasaki", modelo: "Z900", versao: "RS", base: 72000, ano: 2022, comb: "Gasolina", tone: "#2a3326", feats: ["Revisões em dia"] },
  ],
  barco: [
    { marca: "Azimut", modelo: "Azimut 50", versao: "Fly", base: 4800000, ano: 2019, comb: "Diesel", pes: 50, tone: "#1f2c38", feats: ["Flybridge", "Gerador", "Ar-condicionado"] },
    { marca: "Schaefer", modelo: "Schaefer 400", versao: "Fly", base: 1650000, ano: 2018, comb: "Diesel", pes: 40, tone: "#22303a", feats: ["Flybridge", "Gerador"] },
    { marca: "Ferretti", modelo: "Ferretti 550", versao: "", base: 6200000, ano: 2020, comb: "Diesel", pes: 55, tone: "#1d2933", feats: ["Estabilizador", "Tender incluso"] },
    { marca: "Focker", modelo: "Focker 272", versao: "Gran Turismo", base: 360000, ano: 2021, comb: "Gasolina", pes: 27, tone: "#22323a", feats: ["Cabine", "Som premium"] },
    { marca: "Fishing Raptor", modelo: "Raptor 23", versao: "", base: 185000, ano: 2022, comb: "Gasolina", pes: 23, tone: "#263236", feats: ["Sonar", "Motor de popa"] },
    { marca: "Intermarine", modelo: "Intermarine 55", versao: "", base: 3900000, ano: 2017, comb: "Diesel", pes: 55, tone: "#1e2a30", feats: ["Flybridge", "Gerador", "Tender incluso"] },
    { marca: "Sea Ray", modelo: "SLX 310", versao: "", base: 980000, ano: 2020, comb: "Gasolina", pes: 31, tone: "#20303c", feats: ["Som premium", "Toldo"] },
  ],
};

const CITIES = [
  ["São Paulo", "SP"], ["Campinas", "SP"], ["Rio de Janeiro", "RJ"], ["Niterói", "RJ"],
  ["Belo Horizonte", "MG"], ["Curitiba", "PR"], ["Florianópolis", "SC"], ["Balneário Camboriú", "SC"],
  ["Porto Alegre", "RS"], ["Brasília", "DF"], ["Salvador", "BA"], ["Goiânia", "GO"], ["Recife", "PE"],
];
const COLORS = ["Preto", "Branco", "Prata", "Cinza", "Azul", "Vermelho"];

/* Gerador determinístico para que a demo seja sempre igual */
function seeded(seed) {
  let s = seed;
  return () => (s = (s * 16807) % 2147483647) / 2147483647;
}

function buildListings() {
  const rnd = seeded(42);
  const pick = (arr) => arr[Math.floor(rnd() * arr.length)];
  const list = [];
  let id = 1;

  for (const cat of Object.keys(MODELS)) {
    const sources = SOURCES.filter((s) => s.cats.includes(cat));
    for (const m of MODELS[cat]) {
      const variants = 2 + Math.floor(rnd() * 2);
      for (let v = 0; v < variants; v++) {
        const ano = m.ano - Math.floor(rnd() * 3) + (v === 0 ? 1 : 0);
        const idade = Math.max(0, 2026 - ano);
        const preco = Math.round((m.base * (1 - idade * 0.05) * (0.92 + rnd() * 0.16)) / 500) * 500;
        const [cidade, estado] = pick(CITIES);
        const src = pick(sources);
        const extras = m.feats.filter(() => rnd() > 0.3);
        const item = {
          id: id++,
          cat,
          marca: m.marca,
          modelo: m.modelo,
          versao: m.versao,
          ano,
          preco,
          combustivel: m.comb,
          cor: pick(COLORS),
          cidade,
          estado,
          source: src.id,
          feats: extras.length ? extras : [m.feats[0]],
          tone: m.tone,
        };
        if (cat === "barco") {
          item.pes = m.pes;
          item.horas = Math.round((idade * 90 + rnd() * 200) / 10) * 10;
        } else {
          item.km = Math.round(((idade + rnd()) * (cat === "moto" ? 6000 : 11000)) / 100) * 100;
          item.cambio = cat === "moto" ? "Manual" : (rnd() > 0.15 ? "Automático" : "Manual");
        }
        list.push(item);
      }
    }
  }
  return list;
}

const LISTINGS = buildListings();
