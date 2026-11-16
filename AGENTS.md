# AGENTS.md — 日本鐵道車輛圖鑑

## 1. 專案目的
建立一個可持續擴充的「日本鐵道車輛圖鑑」靜態網站。
收錄新幹線與在來線車輛，每款車型一頁，首頁以卡片列表呈現並可依分類篩選。
本檔案是本專案的唯一開發規範。任何 AI 或人員修改本專案前，必須先閱讀本檔並遵守全部規則。

## 2. 收錄範圍
- 目前分類：新幹線、通勤型、特急型
- 預留分類（尚未收錄，但架構必須支援）：地下鉄、私鉄
- 以 JR 各社車輛為主
- 未來擴充時，只新增分類與車型頁，不得更動既有架構

## 3. 技術限制
- 純靜態網站：僅 HTML + CSS + 原生 JavaScript
- 不使用任何框架、不使用 build 工具、不使用 npm
- 不引入任何外部 CDN（含 Google Fonts、Bootstrap、jQuery）
- 不使用 inline style，所有樣式只能寫在 `assets/style.css`
- 圖片一律不使用真實照片（版權問題），一律以「代表色色塊 + 車型代號文字」示意

## 4. 目錄結構（固定，不得新增層級）
```
/
├── index.html                      # 首頁：分類篩選 + 車型卡片列表
├── AGENTS.md                       # 本規範
├── assets/
│   ├── style.css                   # 全站唯一樣式檔
│   └── data.js                     # 全站唯一資料來源（分類 + 車型清單）
├── cars/                           # 每款車型一頁
│   └── <category>-<model>.html
└── templates/
    └── car-template.html           # 車型頁模板，新增頁面一律從此複製
```

## 5. 命名規則
- 檔名一律：全小寫、英文、kebab-case、不含空格與中文
- 車型頁檔名格式：`<category>-<model>.html`
  - 例：`shinkansen-e5.html`、`commuter-e235.html`、`limited-express-e353.html`
- 車型 id（用於 data.js）與檔名去掉 `.html` 後完全一致
- 分類代號（category）固定如下，不得自創：

  | 代號 | 中文 |
  |---|---|
  | `shinkansen` | 新幹線 |
  | `commuter` | 通勤型 |
  | `limited-express` | 特急型 |
  | `subway` | 地下鉄（預留） |
  | `private` | 私鉄（預留） |

## 6. 資料來源規則（data.js）
`assets/data.js` 是全站唯一資料來源，結構固定如下：

```js
const CATEGORIES = {
  shinkansen:        { label: "新幹線", color: "#2563eb" },
  commuter:          { label: "通勤型", color: "#16a34a" },
  "limited-express": { label: "特急型", color: "#ea580c" },
};

const CARS = [
  {
    id: "shinkansen-e5",        
    name: "E5 系",            
    nameJa: "E5系",              
    category: "shinkansen",      
    operator: "JR東日本",
    line: "東北新幹線",
    year: 2011,
    color: "#009a41"           
  },
];
```

規則：
- 新增車型 = 在 `CARS` 陣列**尾端追加**一筆，不得修改或刪除既有資料
- 新增分類 = 在 `CATEGORIES` 取消註解或追加一筆，並在 `index.html` 的篩選列同步加一顆按鈕
- 所有欄位皆為必填，缺欄位視為錯誤

## 7. 車型頁面結構（templates/car-template.html）
每頁固定由上到下：
1. 頁首：返回首頁連結（`../index.html`）
2. `<h1>` 車名（中文 + 日文）
3. 代表色色塊區（寬 100%、高 120px、背景為該車代表色，中央顯示車型代號）
4. 基本資料表（table）：分類、所屬公司、主要路線、編成輛數、最高速度、製造年份
5. `<h2>` 外觀特徵：3～5 句
6. `<h2>` 小知識：1～2 條，用 `<ul>`
7. 頁尾：`© 日本鐵道車輛圖鑑`

格式規則：
- 一頁只有一個 `<h1>`，小節一律 `<h2>`
- 不得新增 `<h3>` 以下層級
- 段落一律用 `<p>`，清單一律用 `<ul><li>`

## 8. 首頁結構（index.html）
1. 標題 `<h1>`：日本鐵道車輛圖鑑
2. 分類篩選列：由 `CATEGORIES` 自動產生按鈕，含「全部」
3. 卡片列表：由 `CARS` 自動產生，每張卡片顯示代表色塊、車名、分類標籤、公司
4. 點卡片 → 連到 `cars/<id>.html`

首頁不得寫死任何車型資料，一切從 `data.js` 讀取。

## 9. 樣式規範（assets/style.css）
- 全站配色由 `:root` CSS 變數控制，禁止在別處寫死色碼：

```css
:root {
  --bg: #f8fafc;
  --fg: #0f172a;
  --muted: #64748b;
  --card: #ffffff;
  --border: #e2e8f0;
  --accent: #1e3a5f;
  --radius: 12px;
}
```

- 字型：`system-ui, "Noto Sans TC", sans-serif`（不使用外部字型）
- 卡片圓角一律 `var(--radius)`
- 版面最大寬度 960px，置中
- 手機（< 640px）時卡片改為單欄

## 10. 新增一款車型的標準流程（SOP）
1. 在 `assets/data.js` 的 `CARS` 尾端追加一筆資料（欄位齊全）
2. 複製 `templates/car-template.html`
3. 存成 `cars/<category>-<model>.html`（id 必須一致）
4. 依資料填寫 `<h1>`、色塊、基本資料表、外觀特徵、小知識
5. 確認該頁樣式只引用 `../assets/style.css`、資料只引用 `../assets/data.js`
6. 回 `index.html` 確認新卡片自動出現，無需手動改首頁

## 11. 新增一個分類的標準流程
1. 在 `CATEGORIES` 新增一筆（取消註解或追加）
2. 在 `index.html` 篩選列加一顆對應按鈕
3. 之後新車型頁照第 10 節流程，category 用新代號
4. 不得為了新分類改動既有頁面結構

## 12. 禁止事項（AI 必守）
- 不得使用真實車輛照片或任何外部圖片
- 不得引入 CDN、框架、外部字型
- 不得使用 inline style
- 不得修改 `:root` 變數（除非使用者明確要求）
- 不得修改 `CARS` 既有資料，只能追加
- 不得新增目錄層級或更改檔名規則
- 不得把車型資料寫死在 HTML 裡
- 一次修改只處理一個頁面或一個資料檔，不要大範圍重寫

## 13. 語言與用字
- 網站介面與內文一律使用繁體中文
- 車型名稱保留日文原名，並附中文譯名
- 數字、單位使用半形（如 `320 km/h`）
