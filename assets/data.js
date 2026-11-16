const CATEGORIES = {
  shinkansen: { label: "新幹線", color: "#2563eb" },
  commuter: { label: "通勤型", color: "#16a34a" },
  "limited-express": { label: "特急型", color: "#ea580c" },
  // 預留分類（尚未啟用）：
  // subway: { label: "地下鉄", color: "#7c3aed" },
  // private: { label: "私鉄", color: "#db2777" },
};

const CARS = [ { id: "shinkansen-e5", name: "E5 系", nameJa: "E5系", category:
"shinkansen", operator: "JR東日本", line: "東北新幹線", year: 2011, color: "#009a41", },
{ id: "shinkansen-n700s", name: "N700S", nameJa: "N700S", category:
"shinkansen", operator: "JR東海", line: "東海道新幹線", year: 2020, color: "#1e40af", },
{ id: "commuter-e235", name: "E235 系", nameJa: "E235系", category: "commuter",
operator: "JR東日本", line: "山手線", year: 2015, color: "#65a30d", }, { id:
"commuter-e233", name: "E233 系", nameJa: "E233系", category: "commuter",
operator: "JR東日本", line: "中央線快速", year: 2006, color: "#f59e0b", }, { id:
"commuter-223", name: "223 系", nameJa: "223系", category: "commuter", operator:
"JR西日本", line: "東海道本線", year: 1994, color: "#0891b2", }, { id:
"limited-express-e353", name: "E353 系", nameJa: "E353系", category:
"limited-express", operator: "JR東日本", line: "中央本線", year: 2017, color:
"#b91c1c", }, ];
