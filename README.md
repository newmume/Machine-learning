# 🤖 機器學習前十大學習法 互動教學平台


開啟 [[(https://machine-learning-ten-delta.vercel.app/)](https://machine-learning-ten-delta.vercel.app/) 即可查看。

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

**ML 知識庫涵蓋**：
- 演算法：線性迴歸、邏輯迴歸、決策樹、隨機森林、SVM、KNN、K-Means、PCA、單純貝氏、XGBoost、DNN、CNN
- 概念：過擬合、欠擬合、梯度下降、損失函數、正則化、交叉驗證、Dropout、遷移學習
- 評估：準確率、F1、AUC、MAE、MSE、R²
- 工程：特徵工程、資料不平衡、超參數調整、MLOps、CRISP-DM


---

## 📦 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **UI**: Vanilla CSS + Inline React Styles
- **Fonts**: Google Fonts (Outfit, Noto Sans TC)
- **Speech**: Web Speech Synthesis API
- **Canvas**: HTML5 Canvas 2D（自製演算法模擬，無第三方繪圖庫）
- **AI Assistant**: 純前端知識庫（無需 API Key）
