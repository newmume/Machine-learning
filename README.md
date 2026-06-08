# 🤖 機器學習前十大學習法 互動教學平台

> 一個基於 **Next.js 14** 的互動式機器學習通識課程網頁，整合語音導讀、演算法即時沙盒、AI 助理問答三大核心功能。

---

## 🚀 Getting Started

### 💻 Next.js 本地開發 (Node.js)

```bash
npm run dev
```

開啟 [http://localhost:3000](http://localhost:3000) 即可查看。

### 🎈 Streamlit 本地執行與部署 (Python)

本專案支援將 Next.js 靜態導出，並使用 **Streamlit** 進行託管與部署。

#### 1. 本地執行
確保已安裝 Python，安裝依賴後執行 `app.py`：

```bash
pip install -r requirements.txt
streamlit run app.py
```

#### 2. Streamlit Cloud 部署步驟
1. 前往 [Streamlit Community Cloud](https://share.streamlit.io/) 並登入。
2. 點擊 **New app**，選擇您的 GitHub 儲存庫 `Machine-learning` 與 `main` 分支。
3. 將 **Main file path** 設為 `app.py`。
4. 點擊 **Deploy** 即可完成線上部署！

> [!NOTE]
> 當 Next.js 網頁程式碼有更動時，請先執行 `npm run build`，並將生成的 `out/` 資料夾內容複製覆蓋到 `static/` 資料夾，再進行 Git 提交與推送。

---

## 📁 專案結構

```
app/
  page.js          # 主頁面：12 張投影片、語音導讀、底部字幕欄
  globals.css      # 全域樣式：Heroic Faith 品牌色、light mode、動畫
components/
  MLVisualizer.js  # 演算法即時數學沙盒（10 大演算法互動圖）
  AIAssistant.js   # AI 真人助理（ML 知識庫問答）
```

---

## 🎯 課程內容（12 單元）

| # | 單元 | 類型 | 互動沙盒 |
|---|------|------|---------|
| 1 | 封面：機器學習前十大學習法 | OVERVIEW | 視覺化封面動畫 |
| 2 | 定義：什麼是機器學習？ | OVERVIEW | 定義比較投影片 |
| 3 | 概覽：十大學習法體系 | OVERVIEW | 四大陣營分類圖 |
| 4 | 基石：線性與邏輯迴歸 | SUPERVISED | 📊 線性/邏輯迴歸互動 Canvas（OLS 即時計算） |
| 5 | 結構：決策樹與隨機森林 | ENSEMBLE | 🌳 決策特徵輸入 + 森林投票模擬 |
| 6 | 幾何：SVM 與 KNN | SUPERVISED | 🔷 SVM 護城河 + KNN 拖曳點分類 |
| 7 | 自動：K-Means 分群 | UNSUPERVISED | 🔵 E-Step / M-Step 逐步動畫 |
| 8 | 壓縮：PCA 與單純貝氏 | UNSUPERVISED | 📐 PCA 旋轉投影 + 貝氏垃圾郵件過濾器 |
| 9 | 巔峰：XGBoost 提升法 | ENSEMBLE | 🌲 殘差疊加曲線動畫 |
| 10 | 終極：深度神經網路 | DEEP LEARNING | 🧠 DNN 前向傳播訊號動畫 |
| 11 | 實戰：如何挑選演算法？ | OVERVIEW | 🛠️ 互動式演算法挑選精靈 |
| 12 | 結尾：結尾與呼籲 | OVERVIEW | 🎓 通關證書頒發 |

---

## ✨ 核心功能

### 🎙️ 語音導讀
- 使用 Web Speech Synthesis API，自動選擇**溫柔女聲**（繁體中文 zh-TW）
- 逐句朗讀，字幕同步顯示於底部字幕欄
- 支援 播放 / 暫停 / 上一單元 / 下一單元
- 朗讀完畢後自動切換到下一單元

### 🧪 演算法即時數學沙盒
- 所有 Canvas 圖形使用真實演算法計算（OLS、SGD、KMeans EM、SVM Hinge Loss 等）
- 互動式滑桿即時調整參數，圖形同步更新
- DNN 前向傳播訊號動畫使用 `requestAnimationFrame` 驅動

### 🤖 AI 真人助理
- 嵌入於底部字幕欄右側
- 內建 ML 知識庫（30+ 條目），涵蓋演算法、評估指標、訓練技巧、MLOps
- 自動判斷是否為 ML 相關問題，非相關問題回覆「此非機器學習相關問題」
- 動態 AI 虛擬頭像（說話時嘴巴張開、思考時眼睛動畫）

---

## 🛠️ 今日下午開發紀錄（2026-06-08）

### 🔴 一、Bug 全面修復

#### Canvas CSS 變數無法渲染
- **問題**：所有 Canvas `fillStyle` / `strokeStyle` 使用了 CSS 變數（如 `var(--primary-cyan)`），但 Canvas 2D context **不支援** CSS 變數，導致所有顏色顯示為黑色
- **修復**：全部替換為實際 hex 值（`#CE0E2D`、`#3b82f6`、`#636569`、`#10b981` 等），涵蓋：drawRegression、drawSvmKnn、drawKMeans、drawPCA、drawBoosting、drawDNN 六個繪圖函數

#### K-Means 沙盒完全無法操作
- **問題 1**：`resetKMeans()` 只設 `kmeansStep=0`，沒有重置點的 cluster 歸屬（仍保留上一次 E-Step 的顏色）
- **問題 2**：data 生成 `useEffect` 的依賴陣列不含 reset 觸發條件，重置後畫面不更新
- **問題 3**：M-Step 讀取的是 stale `points` closure（E-Step 剛 commit 但尚未 re-render），導致群心計算錯誤
- **修復**：
  - 新增 `kmeansResetKey` state，重置時遞增以觸發 `useEffect` 重新生成資料
  - 新增 `pointsRef = useRef()`，即時同步最新 points，M-Step 讀 `pointsRef.current`
  - `resetKMeans` 同時重置：點的 cluster→-1、重新初始化 3 個群心位置、kmeansStep→0

#### DNN 動畫靜止不動
- **問題**：`Date.now() % 1500` 在靜態 `useEffect` 只執行一次，動畫無法連續播放
- **修復**：改用 `requestAnimationFrame` 循環（`dnnRafRef`），動畫持續 1800ms 後自動停止並清理

#### 標題文字不可見
- **問題**：header `h2` 使用 `linear-gradient(135deg, #CE0E2D 0%, #ffffff 100%)` 作為文字顏色，在白色背景上後半段完全不可見
- **修復**：改為純色 `color: var(--text-primary)`（深色 `#1e293b`）

#### Light Mode UI 問題
- Scrollbar thumb 白色半透明→深灰色 `rgba(99,101,105,0.25)`（在米白底上可見）
- Glass panel 陰影由 `0.37` 不透明度降為 `0.08`（符合淺色主題）
- `.glass-panel:hover` 邊框白色→深灰色 `rgba(99,101,105,0.22)`
- Sidebar hover 背景白色半透明→紅色調 `rgba(206,14,45,0.06)`
- `.formula-display` 文字顏色由紅色改為深色 `var(--text-primary)`

---

### 🟢 二、新功能：AI 真人助理（components/AIAssistant.js）

**設計目標**：在字幕欄右側嵌入一個可互動的 ML 問答助理

**元件架構**：

| 子元件 | 功能 |
|--------|------|
| `AvatarFace` | 動態 SVG 虛擬人臉：說話→嘴巴張開＋光暈；思考→三點跳動 |
| `MessageBubble` | 使用者（右對齊紅色）/ 助理（左對齊深色）氣泡 |
| `AIAssistant` | 主元件：浮動面板、知識庫查詢、非 ML 守門邏輯 |

**ML 知識庫涵蓋**：
- 演算法：線性迴歸、邏輯迴歸、決策樹、隨機森林、SVM、KNN、K-Means、PCA、單純貝氏、XGBoost、DNN、CNN
- 概念：過擬合、欠擬合、梯度下降、損失函數、正則化、交叉驗證、Dropout、遷移學習
- 評估：準確率、F1、AUC、MAE、MSE、R²
- 工程：特徵工程、資料不平衡、超參數調整、MLOps、CRISP-DM

**非 ML 問題守門**：廣義關鍵字比對，非機器學習問題回覆「❌ 此非機器學習相關問題」

**整合位置**：`app/page.js` 底部字幕欄（`.fixed-subtitle-bar`）右側，改為 `flex-direction: row` 並加入垂直分隔線

---

### 🔵 三、語音導讀品質優化

- `speakSentence()` 邏輯重構：分離「守門條件」與「自動換頁條件」，避免邏輯短路
- 新增 `utterance.pitch = 1.05`，讓女聲更溫柔自然
- 朗讀結束自動換頁邏輯更穩定

---

## 🎨 設計系統

| 項目 | 值 |
|------|----|
| 主色（Heroic Faith 品牌紅） | `#CE0E2D` |
| 輔色（Heroic Faith 碳灰） | `#636569` |
| 背景色 | `#fcfbf9`（米白） |
| 字幕欄 | `rgba(9,13,22,0.95)`（深色對比） |
| 字體 | Outfit + Noto Sans TC |
| Canvas 畫布底色 | `#ffffff`（白色，確保資料點清晰可讀） |

---

## 📦 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **UI**: Vanilla CSS + Inline React Styles
- **Fonts**: Google Fonts (Outfit, Noto Sans TC)
- **Speech**: Web Speech Synthesis API
- **Canvas**: HTML5 Canvas 2D（自製演算法模擬，無第三方繪圖庫）
- **AI Assistant**: 純前端知識庫（無需 API Key）
