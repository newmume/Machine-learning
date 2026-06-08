'use client';

import React, { useState, useRef, useEffect } from 'react';

// ─── Comprehensive ML Knowledge Base ───────────────────────────────────────────
const ML_KNOWLEDGE = [
  // --- Overview ---
  { keys: ['機器學習', '什麼是ml', 'machine learning', '定義', '機器學習是什麼'],
    answer: '機器學習（Machine Learning）是讓電腦從資料中自動學習規律，而非由人類手動撰寫規則。核心公式：ML = 資料 + 演算法 + 最佳化。分為「監督式學習」、「非監督式學習」、「集成學習」與「深度學習」四大陣營。' },
  { keys: ['監督式學習', 'supervised'],
    answer: '監督式學習（Supervised Learning）：訓練資料帶有標準答案（標籤）。電腦學習從輸入特徵 X 到輸出標籤 Y 的映射函數 f(X)≈Y。代表演算法：線性迴歸、邏輯迴歸、決策樹、SVM、KNN。' },
  { keys: ['非監督式學習', 'unsupervised'],
    answer: '非監督式學習（Unsupervised Learning）：資料沒有標籤，讓電腦自行在黑暗中找規律。代表演算法：K-Means 分群、PCA 降維。適合客戶分群、異常偵測、維度壓縮等場景。' },
  { keys: ['集成學習', 'ensemble'],
    answer: '集成學習（Ensemble Learning）：組合多個弱學習器，使整體表現超越個別模型。分為 Bagging（如隨機森林，並行訓練取平均/投票）與 Boosting（如 XGBoost，序列修正殘差）兩大流派。' },
  { keys: ['深度學習', 'deep learning', 'dnn', '神經網路'],
    answer: '深度學習（Deep Learning）：多層神經網路，模仿人腦神經元。擅長影像、語音、自然語言等非結構化資料。前向傳播計算預測，反向傳播（梯度下降）更新權重。代表：CNN、RNN、Transformer（ChatGPT 基礎架構）。' },

  // --- Algorithms ---
  { keys: ['線性迴歸', 'linear regression'],
    answer: '線性迴歸（Linear Regression）：尋找穿過數據點最完美的直線 y = wx + b，使殘差平方和最小（OLS）。適合預測「連續數值」，如房價、銷售額。可解釋性極高，是所有 ML 的起點。' },
  { keys: ['邏輯迴歸', 'logistic regression'],
    answer: '邏輯迴歸（Logistic Regression）：雖名為「迴歸」，實為「二元分類」。透過 Sigmoid 函數將線性輸出壓縮至 [0,1] 機率。公式：P(Y=1) = 1/(1+e^(-z))。適合垃圾郵件偵測、信用卡盜刷預測。' },
  { keys: ['決策樹', 'decision tree'],
    answer: '決策樹（Decision Tree）：模擬人類決策流程的 If-Then 樹狀結構。使用 Gini 不純度或資訊增益作為分割標準。優點：高度可解釋、直觀；缺點：容易過度擬合（Overfitting）。' },
  { keys: ['隨機森林', 'random forest'],
    answer: '隨機森林（Random Forest）：訓練數百棵性格各異的決策樹（隨機抽取特徵與樣本），最後多數決投票。屬於 Bagging 集成法。特點：穩健、抗過擬合、提供特徵重要性排名。是結構化資料的強力基準模型。' },
  { keys: ['svm', '支持向量機', '支援向量機'],
    answer: 'SVM（支持向量機）：在特徵空間中劃出最寬的「護城河」（最大間隔超平面）來分類。通過最佳化 min½‖w‖² 求解。參數 C 控制對誤分類的懲罰力道。適合高維小樣本、文字分類、基因資料。' },
  { keys: ['knn', 'k-近鄰', '近鄰演算法'],
    answer: 'KNN（K-近鄰演算法）：最懶惰的演算法——不訓練模型，預測時直接找最近的 K 個鄰居投票決定類別。適合低維度、資料量不大的場景。K 值越小越容易過擬合，K 值越大越平滑。' },
  { keys: ['k-means', 'kmeans', '分群', '聚類', 'clustering'],
    answer: 'K-Means 分群：無監督學習代表。隨機設 K 個群心，交替執行 E-Step（每點歸屬最近群心）與 M-Step（群心更新為群內均值）直到收斂。適合客戶分群、市場細分。選最佳 K 可用手肘法（Elbow Method）。' },
  { keys: ['pca', '主成分分析', '降維', 'dimensionality reduction'],
    answer: 'PCA（主成分分析）：透過奇異值分解（SVD）找出資料變異量最大的投影方向（主成分），將高維資料壓縮至低維。解決「維度災難」問題。評估指標：累積解釋變異數比例（>80% 為佳）。' },
  { keys: ['樸素貝氏', '單純貝氏', 'naive bayes', '貝氏', '條件機率'],
    answer: '單純貝氏（Naive Bayes）：基於貝氏定理 P(A|B)=P(B|A)P(A)/P(B)，假設特徵間條件獨立（這個假設「單純但有效」）。速度極快，適合文字分類、垃圾郵件過濾、情感分析。' },
  { keys: ['xgboost', 'gradient boosting', '梯度提升', '提升樹', 'lightgbm'],
    answer: 'XGBoost（梯度提升樹）：Boosting 序列集成法。每棵樹專門學習上一棵樹的殘差（錯誤），累加修正。公式：ŷ(t) = ŷ(t-1) + η·ft(x)。加入正則化防止過擬合。是 Kaggle 競賽的絕對王者，適合結構化表格資料。' },
  { keys: ['神經網路', 'neural network', '深度神經網路', 'dnn'],
    answer: '深度神經網路（DNN）：多個全連接層堆疊，使用 ReLU 等非線性活化函數學習複雜特徵。前向傳播：a[l] = σ(W[l]a[l-1]+b[l])；反向傳播：透過鏈式法則計算梯度，更新權重。' },

  // --- Concepts ---
  { keys: ['過擬合', 'overfitting'],
    answer: '過擬合（Overfitting）：模型在訓練集表現極好，但在測試集表現差——「只會背答案，不會舉一反三」。解決方法：正則化（L1/L2）、Dropout、增加訓練資料、減少模型複雜度、交叉驗證。' },
  { keys: ['欠擬合', 'underfitting'],
    answer: '欠擬合（Underfitting）：模型太簡單，連訓練集都學不好。解決方法：增加模型複雜度、加入更多特徵、降低正則化強度、訓練更多輪次。' },
  { keys: ['交叉驗證', 'cross validation', 'k-fold'],
    answer: '交叉驗證（K-Fold Cross Validation）：將資料切成 K 份，輪流用一份做驗證集、其餘做訓練集，取 K 次結果的平均作為模型效能估計，避免資料分割的偶然性偏差。' },
  { keys: ['正則化', 'regularization', 'l1', 'l2', 'ridge', 'lasso'],
    answer: '正則化（Regularization）：在損失函數中加入參數懲罰項，防止過擬合。L1（Lasso）= 絕對值懲罰，可使部分權重歸零（特徵選擇）；L2（Ridge）= 平方懲罰，使權重均勻縮小。' },
  { keys: ['梯度下降', 'gradient descent'],
    answer: '梯度下降（Gradient Descent）：機器學習的核心最佳化方法。沿著損失函數梯度的反方向更新參數，直到找到損失最小值。變體：批次梯度下降、隨機梯度下降（SGD）、Mini-Batch GD。' },
  { keys: ['損失函數', 'loss function', '目標函數', 'mse', 'cross entropy'],
    answer: '損失函數（Loss Function）：衡量模型預測值與真實值的差距。迴歸常用 MSE（均方誤差）；分類常用 Cross-Entropy（交叉熵）。訓練目標就是最小化損失函數。' },
  { keys: ['特徵工程', 'feature engineering'],
    answer: '特徵工程（Feature Engineering）：人工構建或轉換特徵，以提高模型效能。技術包括：One-Hot 編碼、標準化（Z-score）、歸一化（Min-Max）、特徵交叉、目標編碼等。往往比選擇更複雜的模型更重要。' },
  { keys: ['準確率', '精準率', '召回率', 'accuracy', 'precision', 'recall', 'f1'],
    answer: '分類評估指標：\n• 準確率（Accuracy）= 正確預測數/總樣本數\n• 精準率（Precision）= 真陽性/(真陽性+假陽性)\n• 召回率（Recall）= 真陽性/(真陽性+假陰性)\n• F1-Score = 2×Precision×Recall/(Precision+Recall)\n• 不平衡資料應優先看 F1 或 AUC-ROC。' },
  { keys: ['r2', '決定係數', 'r squared', 'mae', 'rmse'],
    answer: '迴歸評估指標：\n• MAE（平均絕對誤差）：直覺好解釋\n• MSE（均方誤差）：對離群值更敏感\n• RMSE = √MSE：與原始單位相同\n• R²（決定係數）：接近 1 表示模型解釋力強，負值代表比平均值基準更差。' },
  { keys: ['訓練集', '測試集', '驗證集', 'train test split'],
    answer: '資料集分割：通常將資料分為訓練集（70%）、驗證集（15%）、測試集（15%）。訓練集用於模型訓練；驗證集用於調整超參數；測試集用於最終公正評估，絕對不能在訓練期間接觸。' },
  { keys: ['超參數', 'hyperparameter', '調參'],
    answer: '超參數（Hyperparameter）：模型訓練前由人工設定的參數（非模型自動學習），如：學習率、樹的深度、K 值、正則化強度。調參方法：網格搜索（Grid Search）、隨機搜索（Random Search）、貝葉斯優化。' },
  { keys: ['批量', 'batch', 'epoch', 'iteration'],
    answer: '訓練術語：\n• Epoch：模型遍歷整個訓練集一次\n• Batch：每次更新梯度所用的樣本子集\n• Iteration：一次 Batch 的前向+反向傳播\n• 若訓練集有 1000 個樣本、Batch size=100，則 1 Epoch = 10 iterations。' },
  { keys: ['學習率', 'learning rate', 'lr'],
    answer: '學習率（Learning Rate）：梯度下降每步的步長大小。太大→震盪不收斂；太小→收斂速度極慢。常用技巧：學習率衰減（Decay）、預熱（Warmup）、自適應優化器（Adam/AdaGrad）。' },
  { keys: ['dropout', '隨機丟棄'],
    answer: 'Dropout：深度學習正則化技術。每次訓練時隨機將一定比例的神經元輸出設為 0，防止神經元過度依賴特定路徑，減少過擬合。典型 dropout rate：0.2～0.5。' },
  { keys: ['批次正規化', 'batch normalization', 'bn'],
    answer: 'Batch Normalization（批次正規化）：對每個 Mini-Batch 的輸出進行均值=0、方差=1 的歸一化，加速訓練收斂、允許使用更高學習率、起到一定正則化作用。' },
  { keys: ['遷移學習', 'transfer learning', '預訓練'],
    answer: '遷移學習（Transfer Learning）：將在大規模資料上預訓練好的模型（如 ResNet、BERT）進行微調（Fine-tuning），以適應新的特定任務。大幅減少所需訓練資料量，是現代 AI 應用的核心範式。' },
  { keys: ['自然語言處理', 'nlp', 'transformer', 'gpt', 'bert'],
    answer: 'NLP（自然語言處理）核心技術：Transformer 架構（2017年發表）使用自注意力機制（Self-Attention），能並行處理序列資料。BERT 為雙向預訓練；GPT 為自回歸生成式模型，是 ChatGPT 的基礎。' },
  { keys: ['卷積', 'cnn', '卷積神經網路', 'conv'],
    answer: 'CNN（卷積神經網路）：透過卷積核提取局部特徵，適合處理有空間結構的資料（圖像、語音）。關鍵組件：卷積層（特徵提取）→ 激活函數（ReLU）→ 池化層（降維）→ 全連接層（分類）。' },
  { keys: ['強化學習', 'reinforcement learning', 'rl'],
    answer: '強化學習（Reinforcement Learning）：Agent 透過與環境互動，根據獎勵/懲罰訊號不斷試誤學習最優策略。代表演算法：Q-Learning、PPO、DQN。代表應用：AlphaGo、遊戲 AI、機器人控制。' },
  { keys: ['資料不平衡', 'imbalanced', 'smote'],
    answer: '資料不平衡（Imbalanced Data）：正負樣本比例差距過大（如詐騙案例佔 1%）。解決方法：\n• 過採樣（SMOTE 合成少數樣本）\n• 欠採樣（減少多數類）\n• 調整類別權重（class_weight=balanced）\n• 使用 AUC-PR 而非 Accuracy 評估。' },
  { keys: ['特徵選擇', 'feature selection', '特徵重要性'],
    answer: '特徵選擇（Feature Selection）：找出對模型最有貢獻的特徵，移除無關或冗餘特徵。方法：過濾法（相關係數、卡方檢驗）、包裝法（RFE 遞迴消除）、嵌入法（LASSO 正則化、樹模型特徵重要性）。' },
  { keys: ['選哪個演算法', '如何選擇', '演算法選擇'],
    answer: '選演算法的黃金法則：\n1. 結構化表格資料 → 先用隨機森林或 XGBoost\n2. 需要高度可解釋 → 決策樹或線性迴歸\n3. 影像/語音/文字 → 深度學習（CNN/Transformer）\n4. 無標籤資料分群 → K-Means\n5. 高維特徵壓縮 → PCA\n原則：從最簡單的基準模型開始！' },
  { keys: ['mlops', '模型部署', '機器學習工程'],
    answer: 'MLOps（Machine Learning Operations）：將 ML 模型安全、持續地部署到生產環境的工程實踐。包含：版本管理、自動化訓練流水線（CI/CD）、模型監控（漂移偵測）、A/B 測試、線上預測服務。常用工具：MLflow、Kubeflow、Vertex AI。' },
  { keys: ['crisp-dm', '資料探勘流程', 'data mining'],
    answer: 'CRISP-DM 是業界標準的資料探勘流程：\n1. 業務理解（Business Understanding）\n2. 資料理解（Data Understanding）\n3. 資料準備（Data Preparation）\n4. 建立模型（Modeling）\n5. 模型評估（Evaluation）\n6. 部署應用（Deployment）' },
];

// ─── ML Topic Detector ──────────────────────────────────────────────────────
function findMLAnswer(question) {
  const q = question.toLowerCase();
  // Look for keyword matches
  for (const item of ML_KNOWLEDGE) {
    for (const key of item.keys) {
      if (q.includes(key.toLowerCase())) {
        return item.answer;
      }
    }
  }
  return null;
}

const ML_KEYWORDS_BROAD = [
  'ml', 'ai', '機器', '學習', '演算', '模型', '資料', '數據', '訓練', '預測',
  '分類', '迴歸', '分群', '神經', '特徵', '參數', '梯度', '損失', '準確', '過擬',
  '深度', '監督', '非監督', '集成', '隨機', 'xgboost', 'svm', 'knn', 'pca',
  'bayes', '決策樹', '森林', '網路', '卷積', '注意力', '轉換', 'python',
  'sklearn', 'tensorflow', 'pytorch', 'data', 'algorithm', 'train', 'test',
  'accuracy', 'precision', 'recall', 'f1', 'roc', 'auc', 'epoch', 'batch',
  'learning', 'classification', 'regression', 'cluster', '人工智慧',
];

function isMLRelated(question) {
  const q = question.toLowerCase();
  return ML_KEYWORDS_BROAD.some(kw => q.includes(kw));
}

// ─── Typing animation hook ───────────────────────────────────────────────────
function useTypingEffect(text, speed = 18) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!text) { setDisplayed(''); setDone(false); return; }
    setDisplayed('');
    setDone(false);
    let i = 0;
    const timer = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) { clearInterval(timer); setDone(true); }
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed]);

  return { displayed, done };
}

// ─── Avatar SVG (animated AI face) ───────────────────────────────────────────
function AvatarFace({ isSpeaking, isThinking }) {
  return (
    <div style={{
      width: '52px',
      height: '52px',
      borderRadius: '50%',
      background: 'linear-gradient(135deg, #CE0E2D 0%, #9c0018 100%)',
      boxShadow: isSpeaking
        ? '0 0 0 3px rgba(206,14,45,0.6), 0 0 20px rgba(206,14,45,0.4)'
        : '0 0 0 2px rgba(206,14,45,0.25)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      transition: 'box-shadow 0.3s ease',
      position: 'relative',
      overflow: 'hidden',
      animation: isThinking ? 'ai-pulse 1.2s infinite' : 'none',
    }}>
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        {/* Head */}
        <circle cx="16" cy="16" r="14" fill="rgba(255,255,255,0.12)" />
        {/* Eyes */}
        <ellipse cx="11.5" cy="13" rx="2.2" ry={isSpeaking ? 1.8 : 2.2} fill="white"
          style={{ transition: 'ry 0.15s ease' }} />
        <ellipse cx="20.5" cy="13" rx="2.2" ry={isSpeaking ? 1.8 : 2.2} fill="white"
          style={{ transition: 'ry 0.15s ease' }} />
        {/* Pupils */}
        <circle cx="12" cy="13.5" r="1" fill="#CE0E2D" />
        <circle cx="21" cy="13.5" r="1" fill="#CE0E2D" />
        {/* Mouth */}
        {isSpeaking ? (
          <ellipse cx="16" cy="21" rx="4" ry="2.5" fill="white" opacity="0.9" />
        ) : (
          <path d="M12 20 Q16 23 20 20" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        )}
        {/* Thinking dots */}
        {isThinking && (
          <>
            <circle cx="10" cy="25" r="1.5" fill="white" opacity="0.6" style={{ animation: 'bounce 0.6s 0s infinite' }} />
            <circle cx="16" cy="25" r="1.5" fill="white" opacity="0.6" style={{ animation: 'bounce 0.6s 0.2s infinite' }} />
            <circle cx="22" cy="25" r="1.5" fill="white" opacity="0.6" style={{ animation: 'bounce 0.6s 0.4s infinite' }} />
          </>
        )}
      </svg>

      {/* Halo ring when speaking */}
      {isSpeaking && (
        <div style={{
          position: 'absolute', top: -4, left: -4, right: -4, bottom: -4,
          borderRadius: '50%',
          border: '2px solid rgba(206,14,45,0.4)',
          animation: 'halo-expand 1s infinite',
          pointerEvents: 'none',
        }} />
      )}
    </div>
  );
}

// ─── Message Bubble ───────────────────────────────────────────────────────────
function MessageBubble({ msg }) {
  const isUser = msg.role === 'user';
  return (
    <div style={{
      display: 'flex',
      flexDirection: isUser ? 'row-reverse' : 'row',
      gap: '0.5rem',
      alignItems: 'flex-start',
      animation: 'slide-in-bubble 0.25s ease-out',
    }}>
      {!isUser && (
        <div style={{
          width: '28px', height: '28px', borderRadius: '50%',
          background: 'linear-gradient(135deg, #CE0E2D, #9c0018)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0, fontSize: '14px'
        }}>🤖</div>
      )}
      <div style={{
        maxWidth: '85%',
        padding: '0.6rem 0.9rem',
        borderRadius: isUser ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
        background: isUser
          ? 'linear-gradient(135deg, #CE0E2D, #9c0018)'
          : 'rgba(255,255,255,0.08)',
        color: '#ffffff',
        fontSize: '0.82rem',
        lineHeight: '1.55',
        whiteSpace: 'pre-line',
        border: isUser ? 'none' : '1px solid rgba(255,255,255,0.1)',
        boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
      }}>
        {msg.content}
      </div>
      {isUser && (
        <div style={{
          width: '28px', height: '28px', borderRadius: '50%',
          background: 'rgba(255,255,255,0.15)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0, fontSize: '14px'
        }}>👤</div>
      )}
    </div>
  );
}

// ─── Main AI Assistant Component ──────────────────────────────────────────────
export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: '你好！我是 ML 助理 🤖\n我可以回答機器學習相關問題，例如演算法原理、模型評估、特徵工程等。請問有什麼想了解的？',
    }
  ]);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const thinkTimeoutRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      setUnreadCount(0);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const handleSend = () => {
    const q = input.trim();
    if (!q || isThinking) return;

    const userMsg = { role: 'user', content: q };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsThinking(true);
    setIsSpeaking(false);

    // Simulate processing delay
    const delay = 600 + Math.random() * 800;
    thinkTimeoutRef.current = setTimeout(() => {
      setIsThinking(false);

      let answer;
      if (!isMLRelated(q)) {
        answer = '❌ 此非機器學習相關問題。\n\n我僅能回答機器學習、深度學習、演算法、資料科學相關問題。請問您有 ML 方面的問題嗎？';
      } else {
        const found = findMLAnswer(q);
        if (found) {
          answer = found;
        } else {
          answer = `📚 關於「${q}」：\n這是一個機器學習相關的好問題！目前我的知識庫中有以下可以參考的主題：\n\n• 演算法：線性迴歸、邏輯迴歸、決策樹、隨機森林、SVM、KNN\n• 非監督：K-Means、PCA、貝氏分類\n• 集成：XGBoost、隨機森林\n• 深度學習：DNN、CNN、RNN、Transformer\n• 評估：準確率、F1、AUC、MAE\n\n請嘗試用更具體的關鍵字提問，例如「什麼是過擬合？」或「梯度下降怎麼運作？」`;
        }
      }

      setMessages(prev => [...prev, { role: 'assistant', content: answer }]);
      setIsSpeaking(true);
      setTimeout(() => setIsSpeaking(false), 2000);

      if (!isOpen) setUnreadCount(prev => prev + 1);
    }, delay);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const QUICK_QUESTIONS = [
    '什麼是過擬合？',
    '如何選擇演算法？',
    'XGBoost 原理？',
    '梯度下降怎麼運作？',
  ];

  return (
    <>
      {/* ── Inline CSS animations ── */}
      <style>{`
        @keyframes ai-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        @keyframes halo-expand {
          0% { transform: scale(1); opacity: 0.8; }
          100% { transform: scale(1.4); opacity: 0; }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        @keyframes slide-in-bubble {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes badge-pop {
          0% { transform: scale(0); }
          80% { transform: scale(1.25); }
          100% { transform: scale(1); }
        }
        .ai-panel-enter {
          animation: ai-panel-in 0.28s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        @keyframes ai-panel-in {
          from { opacity: 0; transform: translateY(16px) scale(0.95); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        .ai-input:focus { outline: none; }
        .quick-q-btn:hover { background: rgba(206,14,45,0.25) !important; }
        .ai-send-btn:hover { background: #9c0018 !important; }
      `}</style>

      {/* ── Assistant Panel ── */}
      {isOpen && (
        <div
          className="ai-panel-enter"
          style={{
            position: 'fixed',
            bottom: '152px',
            right: '16px',
            width: '340px',
            height: '480px',
            background: 'rgba(9, 13, 22, 0.97)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(206, 14, 45, 0.3)',
            borderRadius: '20px',
            zIndex: 99998,
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 -4px 40px rgba(206, 14, 45, 0.15), 0 8px 40px rgba(0,0,0,0.6)',
            overflow: 'hidden',
          }}
        >
          {/* Header */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '0.9rem 1rem',
            borderBottom: '1px solid rgba(255,255,255,0.08)',
            background: 'rgba(206,14,45,0.08)',
          }}>
            <AvatarFace isSpeaking={isSpeaking} isThinking={isThinking} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '0.9rem', fontWeight: '700', color: '#ffffff' }}>ML 智能助理</div>
              <div style={{ fontSize: '0.72rem', color: isThinking ? '#fbbf24' : '#10b981', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: isThinking ? '#fbbf24' : '#10b981', display: 'inline-block', animation: isThinking ? 'ai-pulse 0.8s infinite' : 'none' }} />
                {isThinking ? '思考中...' : '線上 · 機器學習專家'}
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px',
                color: 'rgba(255,255,255,0.6)',
                padding: '0.3rem 0.5rem',
                cursor: 'pointer',
                fontSize: '1rem',
                lineHeight: 1,
              }}
            >✕</button>
          </div>

          {/* Messages */}
          <div style={{
            flex: 1,
            overflowY: 'auto',
            padding: '0.75rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.6rem',
            scrollbarWidth: 'thin',
            scrollbarColor: 'rgba(206,14,45,0.3) transparent',
          }}>
            {messages.map((msg, i) => (
              <MessageBubble key={i} msg={msg} />
            ))}
            {isThinking && (
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'linear-gradient(135deg, #CE0E2D, #9c0018)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '14px' }}>🤖</div>
                <div style={{ padding: '0.6rem 0.9rem', borderRadius: '14px 14px 14px 4px', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', gap: '4px', alignItems: 'center' }}>
                  {[0, 0.2, 0.4].map((d, i) => (
                    <div key={i} style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#CE0E2D', animation: `bounce 0.6s ${d}s infinite` }} />
                  ))}
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick questions */}
          <div style={{ padding: '0.4rem 0.75rem', display: 'flex', gap: '0.4rem', flexWrap: 'wrap', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
            {QUICK_QUESTIONS.map((q, i) => (
              <button
                key={i}
                className="quick-q-btn"
                onClick={() => { setInput(q); setTimeout(() => inputRef.current?.focus(), 50); }}
                style={{
                  background: 'rgba(206,14,45,0.12)',
                  border: '1px solid rgba(206,14,45,0.25)',
                  borderRadius: '20px',
                  color: 'rgba(255,255,255,0.75)',
                  fontSize: '0.7rem',
                  padding: '0.2rem 0.6rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  whiteSpace: 'nowrap',
                }}
              >{q}</button>
            ))}
          </div>

          {/* Input */}
          <div style={{
            display: 'flex',
            gap: '0.5rem',
            padding: '0.6rem 0.75rem',
            borderTop: '1px solid rgba(255,255,255,0.08)',
            background: 'rgba(0,0,0,0.3)',
          }}>
            <input
              ref={inputRef}
              className="ai-input"
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="輸入機器學習問題..."
              style={{
                flex: 1,
                background: 'rgba(255,255,255,0.07)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: '12px',
                color: '#ffffff',
                fontSize: '0.82rem',
                padding: '0.55rem 0.85rem',
                fontFamily: 'inherit',
              }}
              disabled={isThinking}
            />
            <button
              className="ai-send-btn"
              onClick={handleSend}
              disabled={isThinking || !input.trim()}
              style={{
                background: input.trim() && !isThinking ? '#CE0E2D' : 'rgba(255,255,255,0.08)',
                border: 'none',
                borderRadius: '12px',
                color: input.trim() && !isThinking ? '#ffffff' : 'rgba(255,255,255,0.3)',
                padding: '0.55rem 0.85rem',
                cursor: input.trim() && !isThinking ? 'pointer' : 'default',
                fontSize: '1rem',
                transition: 'all 0.2s ease',
                flexShrink: 0,
              }}
            >➤</button>
          </div>
        </div>
      )}

      {/* ── Floating Trigger Button ── */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.65rem',
          cursor: 'pointer',
          flexShrink: 0,
          position: 'relative',
        }}
        onClick={() => setIsOpen(o => !o)}
        title={isOpen ? '關閉助理' : '開啟 ML 助理'}
      >
        {/* Label */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: '2px',
        }}>
          <span style={{
            fontSize: '0.72rem',
            fontWeight: '700',
            color: 'rgba(255,255,255,0.9)',
            letterSpacing: '0.04em',
            textShadow: '0 1px 4px rgba(0,0,0,0.5)',
            whiteSpace: 'nowrap',
          }}>AI 助理</span>
          <span style={{
            fontSize: '0.62rem',
            color: '#10b981',
            letterSpacing: '0.02em',
          }}>ML 專家線上</span>
        </div>

        {/* Avatar button */}
        <div style={{ position: 'relative' }}>
          <AvatarFace isSpeaking={false} isThinking={false} />
          {unreadCount > 0 && (
            <div style={{
              position: 'absolute',
              top: '-4px',
              right: '-4px',
              background: '#10b981',
              color: '#000',
              borderRadius: '50%',
              width: '18px',
              height: '18px',
              fontSize: '0.65rem',
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              animation: 'badge-pop 0.3s ease',
              border: '2px solid rgba(9,13,22,0.9)',
            }}>{unreadCount}</div>
          )}
          {/* Pulse ring */}
          <div style={{
            position: 'absolute',
            top: -6, left: -6, right: -6, bottom: -6,
            borderRadius: '50%',
            border: `2px solid ${isOpen ? 'rgba(206,14,45,0.6)' : 'rgba(206,14,45,0.25)'}`,
            transition: 'border-color 0.3s ease',
            animation: !isOpen ? 'halo-expand 2s infinite' : 'none',
            pointerEvents: 'none',
          }} />
        </div>
      </div>
    </>
  );
}
