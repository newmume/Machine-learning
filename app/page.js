'use client';

import React, { useState, useEffect, useRef } from 'react';
import MLVisualizer from '@/components/MLVisualizer';
import AIAssistant from '@/components/AIAssistant';

// Full 12 slides data from the storyboard, augmented with CRISP-DM definitions
const SLIDES_DATA = [
  {
    id: 1,
    title: "1. 封面：機器學習前十大學習法",
    tag: "OVERVIEW",
    tagClass: "tag-supervised",
    duration: 35,
    visual: "科技感深色背景，浮現標題「機器學習前十大學習法完全入門教學手冊」",
    voiceOver: "哈囉大家好，歡迎來到這堂機器學習通識課。大數據和人工智慧時代已經來臨，不論你是想做商業分析，還是想踏入 AI 領域，機器學習都是最核心的武器。但是，那麼多複雜的數學公式和演算法，到底該從哪裡學起？今天這支影片，我們不談高深的微積分，而是用最直覺的日常比喻，帶你 360 度快速通關機器學習最經典、最常被使用的前十大演算法。讓我們開始吧！",
    analogy: "機器學習就像是讓電腦「像人類一樣學習」。想像你教小嬰兒認貓咪，你不會給他貓咪的解剖報告（傳統規則），而是指著各種貓咪說「這是貓」，指著狗說「這不是貓」。久而久之，小嬰兒自己就會抓出「有鬍鬚、三角形耳朵、會喵喵叫」的規律！",
    deepDive: {
      formula: "ML = Data + Algorithm + Optimization",
      code: "# 機器學習核心工作流\nfrom sklearn.model_selection import train_test_split\n# 1. 準備數據\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)\n# 2. 訓練模型\nmodel.fit(X_train, y_train)\n# 3. 預測未來\npredictions = model.predict(X_test)"
    },
    crispDm: {
      business: "明確機器學習通識學習目標，降低新手理解複雜演算法的進入門檻。",
      dataUnderstanding: "梳理十大學習法的分類邏輯（四大陣營）及日常生活的隱喻案例。",
      preparation: "將文檔、腳本分鏡進行頁面劃分，控制每頁旁白長度於 30-60 秒之間。",
      modeling: "分類演算法架構體系，設計對應的視覺化互動圖例與教學模組。",
      evaluation: "以非技術背景使用者的直覺理解程度、系統響應速度作為評估指標。",
      deployment: "使用 Next.js 部署為具備前端 Face API 的動態互動式線上學習平台。"
    }
  },
  {
    id: 2,
    title: "2. 定義：什麼是機器學習？",
    tag: "OVERVIEW",
    tagClass: "tag-supervised",
    duration: 50,
    visual: "左側傳統寫程式與機器學習的對比圖，右側彈出「輸入、過程、輸出」",
    voiceOver: "在進入演算法之前，我們先釐清一個最根本的問題：什麼是機器學習？傳統寫程式，就像是廚師寫食譜，人類必須把詳細的如果、就的規則寫死給電腦。但如果是機器學習，我們不寫食譜，我們是把一萬張成功的菜餚照片，和一萬張失敗的照片直接丟給電腦，讓電腦自己去參悟其中的規律。簡單來說，機器學習的精髓，就是給予歷史數據，讓電腦自己找出規則，進而預測未來。這讓電腦具備了像人類一樣從經驗中學習的能力。",
    analogy: "傳統編程 = 填鴨式教育（把考題與答案死記下來，沒見過的題目就不會寫）。\n機器學習 = 啟發式教育（做了一萬道模擬題，自己歸納出解題技巧與邏輯，能應對真實大考）。",
    deepDive: {
      formula: "f(X) \\approx Y \\quad (找出映射函數 f，使預測與真實誤差最小)",
      code: "# 傳統與機器學習的對比\n# 傳統編程: \ndef predict_traditional(x):\n    if x > 100: return 'Spam'\n    else: return 'Normal'\n\n# 機器學習: \n# 透過訓練數據讓演算法自動擬合分類邊界\nclassifier.fit(training_features, labels)"
    },
    crispDm: {
      business: "解決傳統軟體工程難以人工窮舉極複雜規則（如影像辨識、詐騙檢測）的商業痛點。",
      dataUnderstanding: "分析歷史累積的巨量多維特徵資料，觀測特徵與預測目標之間的關聯性。",
      preparation: "清洗雜訊、填補遺失值，並將特徵矩陣與標籤陣列拆分為訓練集與測試集。",
      modeling: "藉由演算法自動迭代計算參數（權重），使模型內部參數逼近數據分佈規律。",
      evaluation: "計算測試集上的指標，驗證模型對於未見過之資料的預測精準度（泛化能力）。",
      deployment: "將擬合好的模型參數導出為 API 服務，供業務前端應用即時調用進行預測。"
    }
  },
  {
    id: 3,
    title: "3. 概覽：十大學習法體系",
    tag: "OVERVIEW",
    tagClass: "tag-supervised",
    duration: 40,
    visual: "四大陣營（監督、集成、非監督、深度學習）分類表格橫向展開",
    voiceOver: "龐大的機器學習家族，主要可以劃分為四大陣營。第一是監督式學習，代表資料有標準答案，老師牽著手教；第二是集成學習，講求團結力量大，把多個小模型結合起來；第三是非監督式學習，資料沒有標籤，讓電腦自己在黑暗中找規律；第四則是模擬大腦的深度學習。這四大陣營衍生出了我們今天搬上檯面的十種經典核心演算法。接下來，我們會逐一拆解。",
    analogy: "監督式學習 = 有老師改作業的學生。\n集成學習 = 專題小組討論（每人負責一部分，最後投票表決）。\n非監督式學習 = 沒有標準答案，去倉庫把相同外觀的貨物分堆整理。\n深度學習 = 模仿人類大腦神經網絡的極限學習法。",
    deepDive: {
      formula: "\\text{ML Architecture} = \\begin{cases} \\text{Supervised} \\\\ \\text{Unsupervised} \\\\ \\text{Ensemble} \\\\ \\text{Deep Learning} \\end{cases}",
      code: "# 各大陣營代表模組\nfrom sklearn.linear_model import LinearRegression # 監督\nfrom sklearn.cluster import KMeans # 非監督\nfrom sklearn.ensemble import RandomForestClassifier # 集成\nimport tensorflow as tf # 深度學習"
    },
    crispDm: {
      business: "針對不同的商業場景（預測數值、客戶分群、高維特徵壓縮）選擇合適的演算法大類。",
      dataUnderstanding: "判斷目標資料是否具備真實標籤，以及特徵維度大小，以決定學習範式。",
      preparation: "依據所選陣營轉換資料格式（如：監督式需合併 X/Y 標籤；非監督式僅保留特徵）。",
      modeling: "在各自的體系下配適模型（如：線性模型、樹狀模型、分群模型、神經網路）。",
      evaluation: "使用不同的評估標準（如：分類準確率、分群緊密度、決定係數 R2）進行橫向比對。",
      deployment: "根據資源載體（雲端伺服器 vs 邊緣端設備）進行對應大類模型的微調與部署。"
    }
  },
  {
    id: 4,
    title: "4. 基石：線性與邏輯迴歸",
    tag: "SUPERVISED",
    tagClass: "tag-supervised",
    duration: 55,
    visual: "左邊顯示一條直線穿過數據點，右邊顯示一條 S 型的機率曲線",
    voiceOver: "首先登場的是監督式學習的兩大基石。第一種是線性迴歸，它的目標是在數據點中拉出一條最完美的直線。像是我們用氣溫來預測雞排的銷量、或是用坪數預測房價，只要是預測這種連續性的數值，找它就對了。第二種叫做邏輯迴歸，請注意，它雖然名字有迴歸，但它其實是個分類高手！它透過數學魔法，把輸出的數值限制在零到一之間，用來計算事件發生的機率。像是這封信是垃圾郵件的機率有多少？這筆交易是刷卡盜刷的機率有多高？是商務上最愛用的二分法工具。",
    analogy: "線性迴歸 = 水平線（例如量身高，多吃一碗飯身高長高 0.1 公分，呈現直線成長趨勢）。\n邏輯迴歸 = 門檻線（開關。例如考試及格，60分以上是一 (通過)，60分以下是零 (被當)，或計算及格的百分比機率）。",
    deepDive: {
      formula: "y = wx + b \\quad \\text{(線性)} \\quad \\Big| \\quad P(y=1) = \\frac{1}{1 + e^{-(wx+b)}} \\quad \\text{(邏輯)}",
      code: "from sklearn.linear_model import LinearRegression, LogisticRegression\n\n# 1. 線性迴歸預測連續房價\nlin_reg = LinearRegression().fit(X, y_prices)\n\n# 2. 邏輯迴歸預測二分類是否盜刷 (機率)\nlog_reg = LogisticRegression().fit(X, y_fraud)\nprob = log_reg.predict_proba(X_test) # 輸出為 0 ~ 1 之間"
    },
    crispDm: {
      business: "利用線性模型預測連續商業指標（營收、點擊率），或預測二元分類事件的機率（流失機率、欺詐風險）。",
      dataUnderstanding: "蒐集自變數 $x$ 與目標因變數 $y$，檢視是否存在線性相關性或邏輯分類邊界。",
      preparation: "將自變數 $x$ 重新塑形為符合 sklearn 規範的二維特徵矩陣 $X$。",
      modeling: "調用 `LinearRegression`（最小平方法 OLS）配適直線，或調用 `LogisticRegression` 擬合 S 型 Sigmoid 曲線。",
      evaluation: "計算擬合斜率與截距誤差，並計算絕對殘差 $|y - \\hat{y}|$，從中找出偏離最嚴重的 Outliers。",
      deployment: "將回歸方程公式部署於業務後台，提供毫秒級的快速趨勢預測與二分類預警服務。"
    }
  },
  {
    id: 5,
    title: "5. 結構：決策樹與隨機森林",
    tag: "ENSEMBLE",
    tagClass: "tag-ensemble",
    duration: 50,
    visual: "心理測驗樹狀圖展開（決策樹），隨後分裂成許多棵樹（隨機森林）",
    voiceOver: "第三個是決策樹，它完美模擬了人類做決策的思考流程，就像在玩二選一的心理測驗。透過今天是週末嗎？、冰箱空了嗎？這類一連串對與錯的問題，層層切分資料。它的優點是邏輯非常透明、很好懂。但是，單一棵樹很容易因為長得太茂盛而產生看太細、過度擬合的缺點。於是科學家發明了第六種學習法：隨機森林。它同時訓練幾百棵性格、視角都不同的決策樹，當新資料進來時，讓這群森林裡的樹集體投票。這就是三個臭皮匠，勝過一個諸葛亮的經典代表，性能非常穩定。",
    analogy: "決策樹 = 流程圖式心理測驗（如果週末 $\\rightarrow$ 如果下雨 $\\rightarrow$ 待在家）。\n隨機森林 = 董事會決策（召集 100 位專家，每位專家根據自己的觀點做決策樹，最後投票決定公司走向）。",
    deepDive: {
      formula: "\\text{Gini Impurity} = 1 - \\sum (p_i)^2 \\quad \\Big| \\quad \\text{Consensus} = \\text{Mode}(T_1, T_2, \\dots, T_n)",
      code: "from sklearn.ensemble import RandomForestClassifier\n\n# 初始化 100 棵決策樹組成的隨機森林\nforest = RandomForestClassifier(n_estimators=100, max_depth=5)\nforest.fit(X_train, y_train)\n\n# 查看特徵重要性 (隨機森林的核心優勢)\nprint(forest.feature_importances_)"
    },
    crispDm: {
      business: "提供高度可解釋的信用評級決策規則，或藉由隨機森林進行穩健的商品銷售分類預測。",
      dataUnderstanding: "判斷分類特徵（週末、天氣、冰箱狀態）的分佈，檢查是否有高相關的關鍵分割特徵。",
      preparation: "將類別文字特徵進行熱編碼（One-Hot Encoding）或標籤編碼，以便進行數學分割點計算。",
      modeling: "使用 Gini 不純度或 Entropy 遞迴分割特徵（決策樹），或隨機抽取樣本與特徵建立多棵獨立樹（隨機森林）。",
      evaluation: "比對單棵決策樹的深度與過擬合狀況，透過森林的多數決投票機制輸出最終的預測共識。",
      deployment: "導出決策樹的 IF-THEN 規則至業務端直接轉為程式碼，或部署森林物件以進行高精度分類判斷。"
    }
  },
  {
    id: 6,
    title: "6. 幾何：SVM 與 KNN",
    tag: "SUPERVISED",
    tagClass: "tag-supervised",
    duration: 45,
    visual: "紅、藍兩色彈珠，中間有極寬分界帶（SVM），後切換成鄰居包圍（KNN）",
    voiceOver: "接下來看兩個很有幾何感的演算法。第四種是支持向量機，簡稱 SVM。想像桌上有紅藍兩色的彈珠，SVM 的任務就是劃出一條最寬敞、最安全的護城河，把兩類資料分得清清楚楚，常用在文字分類或基因序列。第五種則是K-近鄰演算法，簡稱 KNN，它是全宇宙最懶惰、但也最符合直覺的演算法，核心概念就是物以類聚。想知道一個新資料屬於哪一類？不用算公式，看它身邊最近的 K 個鄰居大多是什麼人，它就是什麼人。鄰居有四個有錢人、一個窮人，那它大概就是有錢人。",
    analogy: "SVM = 劃清界線的邊防防線（在兩國國界中央蓋一條最寬的緩衝隔離帶）。\nKNN = 近朱者赤、近墨者黑（你想知道自己受不受歡迎？去問離你最近的五個鄰居就知道了）。",
    deepDive: {
      formula: "\\min \\frac{1}{2} \\|w\\|^2 \\quad \\text{s.t.} \\quad y_i(w \\cdot x_i + b) \\ge 1 \\quad (SVM \\text{ 最佳化寬度})",
      code: "from sklearn.svm import SVC\nfrom sklearn.neighbors import KNeighborsClassifier\n\n# 1. 尋找最佳邊界 (SVM)\nsvm_model = SVC(kernel='linear', C=1.0).fit(X, y)\n\n# 2. 靠鄰居分類 (KNN, 設定鄰居數 K=5)\nknn_model = KNeighborsClassifier(n_neighbors=5).fit(X, y)"
    },
    crispDm: {
      business: "在高安全性要求的場景（如腫瘤良惡性分類、基因圖譜檢測）劃出最大寬度安全邊界，或在動態推薦系統中利用鄰近性分類。",
      dataUnderstanding: "觀測特徵空間中不同類別（紅點、藍點）的空間分佈、幾何重疊度與離群程度。",
      preparation: "對所有特徵進行特徵縮放（Feature Scaling），以防止某一個維度尺度過大主導了距離計算。",
      modeling: "使用二次規劃求解器最大化分類間隔（SVM），或載入訓練數據，在預測時即時搜尋近鄰（KNN）。",
      evaluation: "識別支持向量並估算邊界寬度，或透過調整鄰居數 $K$ 觀測 KNN 的決策邊界變化。",
      deployment: "將 SVM 的支持向量與參數部署至辨識引擎中，或將 KNN 的局部距離檢索算法封裝至推薦微服務。"
    }
  },
  {
    id: 7,
    title: "7. 自動：K-Means 分群",
    tag: "UNSUPERVISED",
    tagClass: "tag-unsupervised",
    duration: 45,
    visual: "散落點隨三個閃爍中心移動，最後自動聚集成三個色彩鮮明分組",
    voiceOver: "現在我們進入非監督式學習的陣營。如果主管丟給你百萬筆會員資料，裡面完全沒有標籤，要你自動把會員分組，這時候就要派出第八種學習法：K-Means 自動分群。它的運作就像政黨拉攏選民：先隨機設定幾個黨主席中心點，讓周圍的資料依據距離選邊站；接著黨主席根據新黨員的位置重新計算並移動，大家再重新洗牌選邊站。這個過程不斷迭代，直到隊伍穩定為止。在商業上，這是做客戶畫像、識別 VIP 與小資族群的終極利器。",
    analogy: "K-Means = 下課分組。大家先隨便找三個人當組長（中心點），其他人自動走到離自己最近的組長身邊；接著三組人重新算出各自的隊伍中心（物理重心），把組長推到新位置，大家再次重新尋找最近的組長，直到所有人不再動為止。",
    deepDive: {
      formula: "J = \\sum_{j=1}^{K} \\sum_{x_i \\in S_j} \\|x_i - \\mu_j\\|^2 \\quad (\\text{最小化各群內點到中心點的距離平方和})",
      code: "from sklearn.cluster import KMeans\n\n# 將客戶自動分為 3 群 (K=3)\nkmeans = KMeans(n_clusters=3, random_state=42)\nkmeans.fit(customer_data)\n\n# 取得每個客戶的分群標籤與中心點\nlabels = kmeans.labels_\ncentroids = kmeans.cluster_centers_"
    },
    crispDm: {
      business: "在無任何預先分類標籤的客戶庫中，自動識別出具備相似購買特徵的子群體，以實施精準的市場細分營銷。",
      dataUnderstanding: "收集客戶的多維度特徵（如年齡、消費頻次、客單價），確認特徵間的分佈密度。",
      preparation: "將連續型數值特徵進行 Min-Max 正規化，防止消費金額等高權重特徵主導了距離計算。",
      modeling: "初始化 $K$ 個群心，交替進行 E-Step（資料點歸屬最近中心）與 M-Step（中心更新為群內平均）至收斂。",
      evaluation: "計算群內平方和（SSE/Inertia），利用手肘法（Elbow Method）或輪廓係數評估最佳分群數 $K$。",
      deployment: "將分群標籤標註回 CRM 資料庫中，定期自動更新會員的群體類別以利精準推送廣告。"
    }
  },
  {
    id: 8,
    title: "8. 壓縮：PCA 與 單純貝氏",
    tag: "UNSUPERVISED",
    tagClass: "tag-unsupervised",
    duration: 45,
    visual: "Excel欄位經過漏斗壓縮變成三個精華指標，隨後浮現條件機率公式",
    voiceOver: "當我們的數據欄位多到爆炸、讓電腦跑不動時，我們需要第九種方法：主成分分析，簡稱 PCA。它是一門拍照的藝術，能把上百個維度的複雜數據，尋找最佳的投影角度，壓縮成幾個核心的精華指標，既幫數據瘦身，又保留了最多的原始訊息，成功解決維度災難。而第七種叫做單純貝氏，它基於經典的條件機率，雖然假設特徵之間互相獨立這個前提有點太過單純，但它算起來速度飛快，在過濾垃圾郵件和文字情感分析上，表現出奇地強大。",
    analogy: "PCA = 拍照。立體的人（3D）投影到照片紙上（2D），選一個好的拍照角度（主成分），依然可以一眼認出是誰。\n單純貝氏 = 醫生問診（根據你發燒、咳嗽的機率，回推你感冒的機率是多少）。",
    deepDive: {
      formula: "P(A|B) = \\frac{P(B|A)P(A)}{P(B)} \\quad (\\text{貝氏定理}) \\quad \\Big| \\quad \\mathbf{X}_{proj} = \\mathbf{X} \\mathbf{W} \\quad (\\text{PCA 投影})",
      code: "from sklearn.decomposition import PCA\nfrom sklearn.naive_bayes import GaussianNB\n\n# 1. PCA 將 100 維降到 3 維\npca = PCA(n_components=3)\nX_reduced = pca.fit_transform(X_100d)\n\n# 2. 單純貝氏垃圾郵件快速分類\nnb_classifier = GaussianNB().fit(X_train, y_train)"
    },
    crispDm: {
      business: "在高維度圖像/特徵處理中降低運算成本並視覺化資料（PCA），或快速辨識垃圾郵件及分析文字情感（單純貝氏）。",
      dataUnderstanding: "檢視多維資料的變異數分佈、共變異數特徵，或計算文本特徵字句中單詞的聯合出現頻率。",
      preparation: "將資料中心化（減去均值），或將字詞進行斷詞（Tokenization）並統計詞頻矩陣。",
      modeling: "通過奇異值分解 SVD 計算特徵向量投影（PCA），或計算單詞在正負樣本下的條件機率乘積（單純貝氏）。",
      evaluation: "計算前幾個主成分的累積解釋變異數比例（需大於 80%），或檢驗貝氏分類的精準度與召回率。",
      deployment: "將降維投影矩陣（Weights）或貝氏詞頻機率查表封裝，對即時輸入的文字流進行即時過濾。"
    }
  },
  {
    id: 9,
    title: "9. 巔峰：XGBoost 提升法",
    tag: "ENSEMBLE",
    tagClass: "tag-ensemble",
    duration: 50,
    visual: "第一棵樹預測失誤，第二棵樹修正殘差的箭頭流向圖",
    voiceOver: "在結構化表格資料、也就是我們常見的 Excel 欄位中，目前統治世界的絕對王者，是第十種方法：梯度提升樹系列，代表作是 XGBoost 和 LightGBM。它屬於集成學習的 Boosting 流派。跟隨機森林同時投票不同，它是循序漸進的：第一棵樹先做粗糙的預測，第二棵樹不猜正確答案、而是專門去猜第一棵樹猜錯的差距，也就是修正殘差。下一代踩在上一代的肩膀上精益求精。這種模式讓它的預測精準度達到了巔峰，是各大資料科學競賽參賽者的必備秘密武器。",
    analogy: "XGBoost = 錯題本學習法。寫考卷時，第一遍隨便寫寫（第一棵樹），接著挑出寫錯的題目（殘差），第二遍只專攻錯題（第二棵樹），第三遍再專攻剩下的死角，最後把所有的訂正結果加起來，功力達到滿分！",
    deepDive: {
      formula: "\\hat{y}_i^{(t)} = \\hat{y}_i^{(t-1)} + \\eta f_t(x_i) \\quad (\\text{累加殘差預測值})",
      code: "import xgboost as xgb\n\n# 初始化 XGBoost 分類器 (梯度提升樹)\nxgb_model = xgb.XGBClassifier(\n    n_estimators=100,\n    learning_rate=0.1, # 即 eta\n    max_depth=3\n)\nxgb_model.fit(X_train, y_train)\n# 競賽王者的預測\npreds = xgb_model.predict(X_test)"
    },
    crispDm: {
      business: "於結構化商業數據庫（如信用評分、房地產價格預估、廣告推薦）中榨乾最後一分預測精準度，以獲得最優商業收益。",
      dataUnderstanding: "讀取大維度表格數據，分析各特徵的分佈與缺漏狀況（XGBoost 可自動處理缺失值）。",
      preparation: "將資料集分割為訓練集與驗證集，並進行特徵重要性初步篩選。",
      modeling: "使用加法模型（Additive Training），每一步樹皆配適前一輪預測之負梯度（殘差），並加入正則化項控制複雜度。",
      evaluation: "在驗證集上監控損失函數收斂狀況，使用早停法（Early Stopping）防止疊代次數過多導致過擬合。",
      deployment: "將優化後的集成提升樹物件包裝為高併發預測服務，支持百萬量級資料的即時特徵計算與判定。"
    }
  },
  {
    id: 10,
    title: "10. 終極：深度神經網路",
    tag: "DEEP LEARNING",
    tagClass: "tag-deep",
    duration: 55,
    visual: "輸入層、多個隱藏層、輸出層的多層網狀結構，光點在線條間流動",
    voiceOver: "最後，當我們要處理的不是整齊的表格，而是高解析度照片、語音、或是人類書寫的文章這類非結構化數據時，傳統演算法就無能為力了。這時我們必須動用終極武器，也就是現代深度學習的基石：深度神經網路，簡稱 DNN。它完全抄襲了人類大腦的神經元設計，數據從輸入層進來，透過好幾層隱藏層自動提取特徵──第一層看線條，第二層看形狀，第三層拼湊出貓耳朵。透過無數次的正面猜測與反向修正，它能參透極其複雜的非線性關係。人臉辨識、自動駕駛，甚至當紅的 ChatGPT，背後全都是這套架構的變形與延伸。",
    analogy: "DNN = 生產流水線。原料（輸入層）進來，第一道工序做小零件，第二道工序拼裝成大組件，第三道工序拋光，最後組裝成手機（輸出層）。每一道工序的工人都不知道最終產品長怎樣，但分工合作能產出極精密的作品。",
    deepDive: {
      formula: "a^{[l]} = \\sigma\\left(W^{[l]} a^{[l-1]} + b^{[l]}\\right) \\quad (\\text{前向傳播活化公式})",
      code: "import tensorflow as tf\nfrom tensorflow.keras import layers, models\n\n# 建立一個包含兩個隱藏層的深度神經網路 (DNN)\ndnn_model = models.Sequential([\n    layers.Dense(64, activation='relu', input_shape=(784,)), # 輸入層 + 隱藏層 1\n    layers.Dense(32, activation='relu'),                     # 隱藏層 2\n    layers.Dense(10, activation='softmax')                   # 輸出層 (十類分類)\n])\n\ndnn_model.compile(optimizer='adam', loss='sparse_categorical_crossentropy')"
    },
    crispDm: {
      business: "解鎖影像辨識（瑕疵檢測）、語音交互、智慧客服自然語言理解等傳統模型無法處理的黑科技場景。",
      dataUnderstanding: "蒐集非結構化的多媒體數據（影像像素矩陣、波形特徵、詞嵌入向量），確認資料多樣度。",
      preparation: "進行影像尺寸裁剪縮放、通道歸一化（Normalize），或將文本向量化為稠密嵌入向量。",
      modeling: "設計多層稠密連接層（Dense Layers）及活化函數，透過前向傳播計算預測，並使用反向傳播梯度下降修正權重。",
      evaluation: "在獨立的驗證集與測試集上計算交叉熵損失（Cross Entropy Loss）與精準度曲線，避免過擬合。",
      deployment: "使用 TensorRT 或 ONNX 進行權重剪枝與量化壓縮，部署至 GPU 雲端伺服器或智慧邊緣硬體晶片中。"
    }
  },
  {
    id: 11,
    title: "11. 實戰：如何挑選演算法？",
    tag: "OVERVIEW",
    tagClass: "tag-supervised",
    duration: 50,
    visual: "出現動態長條圖與決策分支（如：表格 -> XGBoost；圖像 -> DNN；需要合理解釋 -> 決策樹）",
    voiceOver: "一口氣看完了這十大演算法，在實戰中我們該怎麼選？請記住這個黃金法則：如果你的資料是規整的表格，想追求極致精準，直接選隨機森林或XGBoost；如果你需要向主管或客戶清楚解釋模型的決策邏輯，請選決策樹或線性迴歸；如果是處理影像、聲音或複雜文本，不用懷疑，直接上深度學習。如果是沒有標籤的資料想自動分組，那就派出K-Means。實務上的原則永遠是：先從最簡單的演算法開始建立基準，效果不夠好，再逐步增加模型的複雜度。",
    analogy: "選演算法就像選武器。打蚊子用捕蚊拍（線性迴歸），砍樹用電鋸（隨機森林），打仗開坦克（深度學習）。如果用坦克去打蚊子，不但油錢貴（耗費運算資源），還可能把家裡牆壁轟垮（過度擬合且無法解釋原因）。",
    deepDive: {
      formula: "\\text{No Free Lunch Theorem: 沒有任何一個演算法能在所有問題上都表現最優}",
      code: "# 實務上多模型基準評估 (Baseline Benchmark)\nmodels = [\n    ('Linear', LogisticRegression()),\n    ('RF', RandomForestClassifier()),\n    ('XGB', xgb.XGBClassifier())\n]\nfor name, model in models:\n    model.fit(X_train, y_train)\n    print(f'{name} Accuracy: {model.score(X_test, y_test)}')"
    },
    crispDm: {
      business: "綜合商業預算、專案交付時效、法規可解釋性要求，制定最合適的機器學習建模架構策略。",
      dataUnderstanding: "判斷資料集大小、資料結構特徵，分析是否有足夠算力支持複雜模型的維護。",
      preparation: "設計統一的特徵工程管線（Pipeline），使其能無縫轉換資料以輸入不同陣營的模型。",
      modeling: "並行訓練多個候選模型（Baseline Models），涵蓋迴歸、決策樹、提升樹與神經網路。",
      evaluation: "比對交叉驗證得分，評估模型可解釋性、預測延遲、記憶體佔用與 R2/F1-Score 指標。",
      deployment: "根據評估結果，決定採用輕量化模型（如迴歸/決策樹）或是高複雜度模型，包裝為可維護的預測微服務。"
    }
  },
  {
    id: 12,
    title: "12. 結尾：結尾與呼籲",
    tag: "OVERVIEW",
    tagClass: "tag-supervised",
    duration: 30,
    visual: "畫面出現畢業帽圖示與標語「選對武器，數據將成為您的最強戰力」",
    voiceOver: "機器學習聽起來像是黑科技，但拆開來看，全都是源自於我們日常生活的思考智慧。選對武器，數據就能轉化為你的最強戰力。這堂機器學習前十大學習法的通識課就到這邊，希望對你的 AI 入門之路有所幫助。如果你喜歡這支影片，歡迎點讚、訂閱並分享。我們下次見，拜拜！",
    analogy: "師父領進門，修行在個人。十大演算法是內功心法，而真正的招式需要你在實戰中不斷修練。恭喜你完成了這堂機器學習大通關！",
    deepDive: {
      formula: "\\text{AI Mastery} = \\text{Continuous Practice} + \\text{Curiosity}",
      code: "# 恭喜畢業！開啟你的 AI 專案吧！\ndef start_ai_journey():\n    skills = ['Regression', 'Trees', 'Clustering', 'DeepLearning']\n    for skill in skills:\n        apply_to_real_world_problem(skill)\n    print('You are ready to change the world with AI!')"
    },
    crispDm: {
      business: "將機器學習能力實質轉化為商業價值，開啟個人或企業的 AI 數據轉型旅程。",
      dataUnderstanding: "在實際業務環境中收集真實用戶的回饋數據，建立持續反饋漏斗。",
      preparation: "將線上即時數據（Production Data）進行定時清洗、儲存以供後續增量學習。",
      modeling: "建立線上模型監控機制，當檢測到模型飄移時觸發自動重新訓練引擎。",
      evaluation: "計算模型上線後的商業實質指標提升（如客單價增長、作業流程縮短）。",
      deployment: "藉由 CI/CD 與 MLOps 工具，實現模型的自動化無縫熱滾動更新部署。"
    }
  }
];

export default function Home() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [sentences, setSentences] = useState([]);
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [browserVoices, setBrowserVoices] = useState([]);

  // Audio elements using SpeechSynthesis
  const synthRef = useRef(null);
  const utteranceRef = useRef(null);

  // Helper to select a gentle female voice
  const getGentleFemaleVoice = (voices) => {
    // Keywords for popular traditional Chinese/mainland gentle female voices
    const femaleKeywords = ['hsiaochen', 'yating', 'hanhan', 'meijia', 'sinji', 'xiaoxiao', 'liting', 'tingting', 'yaoyao', 'huihui', 'shan', 'xiaoyi', 'female'];
    
    // 1. Search traditional Chinese Taiwan voices with female keywords
    const twVoices = voices.filter(v => v.lang.includes('ZH-TW') || v.lang.includes('zh-TW') || v.lang.includes('zh-tw'));
    for (const kw of femaleKeywords) {
      const found = twVoices.find(v => v.name.toLowerCase().includes(kw));
      if (found) return found;
    }
    
    // 2. Fallback to any Traditional Chinese Taiwan voice
    if (twVoices.length > 0) return twVoices[0];
    
    // 3. Search any Chinese voices with female keywords
    const zhVoices = voices.filter(v => v.lang.includes('ZH') || v.lang.includes('zh'));
    for (const kw of femaleKeywords) {
      const found = zhVoices.find(v => v.name.toLowerCase().includes(kw));
      if (found) return found;
    }
    
    // 4. Fallback to any Chinese voice
    if (zhVoices.length > 0) return zhVoices[0];
    
    // 5. Fallback to default
    return voices.find(v => v.default) || voices[0];
  };

  const currentSlide = SLIDES_DATA[currentSlideIndex];

  // Helper to split text into Chinese sentences, preserving the punctuation
  const splitIntoSentences = (text) => {
    const parts = text.split(/([。！？；])/);
    const result = [];
    for (let i = 0; i < parts.length; i += 2) {
      const main = parts[i];
      const punct = parts[i + 1] || '';
      const full = (main + punct).trim();
      if (full) {
        result.push(full);
      }
    }
    return result;
  };

  // Split slide text atomically on slide changes
  useEffect(() => {
    const list = splitIntoSentences(currentSlide.voiceOver);
    setSentences(list);
    setCurrentSentenceIndex(0);
  }, [currentSlideIndex]);

  // Initialize SpeechSynthesis on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      synthRef.current = window.speechSynthesis;
      const updateVoices = () => {
        if (window.speechSynthesis) {
          setBrowserVoices(window.speechSynthesis.getVoices());
        }
      };
      updateVoices();
      window.speechSynthesis.onvoiceschanged = updateVoices;
    }
    return () => {
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    };
  }, []);

  // Speak a single sentence
  const speakSentence = (sentenceIndex) => {
    if (!synthRef.current) return;
    synthRef.current.cancel();

    // Guard: not in playing state or no sentences loaded
    if (!isPlaying || sentences.length === 0) return;

    // All sentences for this slide finished -> auto-advance to next slide
    if (sentenceIndex >= sentences.length) {
      if (currentSlideIndex < SLIDES_DATA.length - 1) {
        setCurrentSlideIndex(prev => prev + 1);
      } else {
        setIsPlaying(false);
      }
      return;
    }

    const textToSpeak = sentences[sentenceIndex];
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = 'zh-TW';
    
    // Choose gentle female voice
    const voicesList = synthRef.current.getVoices();
    const gentleVoice = getGentleFemaleVoice(voicesList.length > 0 ? voicesList : browserVoices);
    if (gentleVoice) {
      utterance.voice = gentleVoice;
    }
    utterance.rate = 0.95;
    utterance.pitch = 1.05; // slightly higher pitch for gentle female feel

    utterance.onend = () => {
      setCurrentSentenceIndex(prev => prev + 1);
    };

    utterance.onerror = (e) => {
      console.error('SpeechSynthesis error:', e);
      setCurrentSentenceIndex(prev => prev + 1);
    };

    utteranceRef.current = utterance;
    synthRef.current.speak(utterance);
  };

  // Trigger speech when states update
  useEffect(() => {
    if (isPlaying) {
      if (synthRef.current && synthRef.current.paused) {
        synthRef.current.resume();
      } else {
        speakSentence(currentSentenceIndex);
      }
    } else {
      if (synthRef.current) {
        synthRef.current.pause();
      }
    }
  }, [isPlaying, currentSentenceIndex, sentences]);



  const handlePlayPause = () => {
    if (isPlaying) {
      setIsPlaying(false);
      if (synthRef.current) {
        synthRef.current.pause();
      }
    } else {
      setIsPlaying(true);
      if (synthRef.current && synthRef.current.paused) {
        synthRef.current.resume();
      } else {
        speakSentence(currentSentenceIndex);
      }
    }
  };

  const handleNext = () => {
    if (currentSlideIndex < SLIDES_DATA.length - 1) {
      setCurrentSlideIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(prev => prev - 1);
    }
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar Navigation */}
      <aside className="sidebar">
        <div className="logo-section">
          <svg style={{ width: '28px', height: '28px', fill: 'var(--primary-cyan)' }} viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
          </svg>
          <h1>ML TOP 10 TUTOR</h1>
        </div>

        <ul className="topic-list">
          {SLIDES_DATA.map((slide, idx) => (
            <li 
              key={slide.id} 
              className={`topic-item ${idx === currentSlideIndex ? 'active' : ''}`}
              onClick={() => {
                setCurrentSlideIndex(idx);
              }}
            >
              <span style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                {slide.title}
              </span>
              <span className={`topic-tag ${slide.tagClass}`}>
                {slide.tag}
              </span>
            </li>
          ))}
        </ul>

        <div style={{ marginTop: 'auto', paddingTop: '1.5rem', borderTop: '1px solid var(--bg-glass-border)', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          <p>智能機器學習前十大學習法</p>
          <p>Powered by Next.js &amp; Speech Synthesis</p>
        </div>
      </aside>

      {/* Main learning workspace */}
      <main className="main-content">
        <header className="header">
        <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '700', letterSpacing: '0.02em', color: 'var(--text-primary)' }}>
              {currentSlide.title}
            </h2>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              主題大綱位置: 頁面 {currentSlideIndex + 1} / {SLIDES_DATA.length} | 時長約 {currentSlide.duration} 秒
            </span>
          </div>
        </header>

        <div className="main-workspace">
          <div className="workspace-left">
            {/* Algorithm Simulation Sandbox */}
            <MLVisualizer topicId={currentSlide.id} />

            {/* LEARNING RESOURCES BLOCK: Analogy & Deep Dive Formula */}
            <div className="adapted-container">
              {/* Everyday Analogy */}
              <div className="glass-panel adapted-card analogy">
                <div className="adapted-header analogy">
                  <svg style={{ width: '16px', height: '16px', fill: 'currentColor' }} viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 16h-2v-2h2v2zm1.07-7.75l-.9.92C12.45 11.9 12 12.5 12 14h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H7c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.04-.42 1.99-1.07 2.75z"/>
                  </svg>
                  <span>日常生活直覺比喻 (Everyday Analogy)</span>
                </div>
                <p style={{ fontSize: '0.95rem', lineHeight: '1.6', color: 'var(--text-primary)', whiteSpace: 'pre-line' }}>
                  {currentSlide.analogy}
                </p>
              </div>

              {/* Deep Dive Formula & Python Code */}
              <div className="glass-panel adapted-card deep-dive">
                <div className="adapted-header deep-dive">
                  <svg style={{ width: '16px', height: '16px', fill: 'currentColor' }} viewBox="0 0 24 24">
                    <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/>
                  </svg>
                  <span>核心數學公式與 Python 程式碼 (Deep Dive)</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <div className="formula-display">
                    {currentSlide.deepDive.formula}
                  </div>
                  <pre className="code-block">
                    <code>{currentSlide.deepDive.code}</code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Fixed bottom subtitle bar */}
      <div className="fixed-subtitle-bar">
        {/* Left: controls + subtitle */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem', minWidth: 0 }}>
          <div className="narration-controls" style={{ margin: 0 }}>
            <button className="btn btn-secondary cursor-pointer" onClick={handlePrev} disabled={currentSlideIndex === 0}>
              <svg style={{ width: '16px', height: '16px', fill: 'currentColor' }} viewBox="0 0 24 24">
                <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
              </svg>
              上一單元
            </button>
            <button className="btn btn-primary cursor-pointer" onClick={handlePlayPause}>
              {isPlaying ? (
                <>
                  <svg style={{ width: '16px', height: '16px', fill: 'currentColor' }} viewBox="0 0 24 24">
                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                  </svg>
                  暫停導讀
                </>
              ) : (
                <>
                  <svg style={{ width: '16px', height: '16px', fill: 'currentColor' }} viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                  語音導讀
                </>
              )}
            </button>
            <button className="btn btn-secondary cursor-pointer" onClick={handleNext} disabled={currentSlideIndex === SLIDES_DATA.length - 1}>
              下一單元
              <svg style={{ width: '16px', height: '16px', fill: 'currentColor' }} viewBox="0 0 24 24">
                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
              </svg>
            </button>
          </div>
          <p className="fixed-subtitle-text">
            {sentences[currentSentenceIndex] || '語音導讀準備中...'}
          </p>
        </div>

        {/* Right: AI Assistant */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          paddingLeft: '1rem',
          borderLeft: '1px solid rgba(255,255,255,0.1)',
          flexShrink: 0,
          height: '100%',
        }}>
          <AIAssistant />
        </div>
      </div>
    </div>
  );
}
