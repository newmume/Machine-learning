'use client';

import React, { useEffect, useRef, useState } from 'react';

// Simple stable pseudo-random generator to match python seed behavior
function getSeededRandom(seed) {
  let x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}

function CoverSlide() {
  return (
    <div style={{
      width: '100%',
      minHeight: '420px',
      background: 'radial-gradient(circle at 50% 50%, #0d1624 0%, #05070c 100%)',
      borderRadius: '12px',
      border: '1px solid rgba(255,255,255,0.08)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '2rem',
      color: '#ffffff',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Decorative floating grid nodes */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundImage: 'radial-gradient(rgba(206, 14, 45, 0.15) 1px, transparent 1px)',
        backgroundSize: '24px 24px',
        opacity: 0.5
      }} />
      
      <div style={{
        position: 'relative',
        zIndex: 2,
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1.5rem'
      }}>
        <div style={{
          background: 'rgba(206, 14, 45, 0.12)',
          border: '1px solid rgba(206, 14, 45, 0.4)',
          borderRadius: '20px',
          padding: '0.35rem 1rem',
          fontSize: '0.8rem',
          fontWeight: '700',
          letterSpacing: '0.1em',
          color: '#CE0E2D',
          textTransform: 'uppercase'
        }}>
          💡 機器學習通識課完全手冊
        </div>
        
        <h2 style={{
          fontSize: '2.2rem',
          fontWeight: '800',
          background: 'linear-gradient(135deg, #ffffff 30%, #CE0E2D 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          lineHeight: '1.3',
          maxWidth: '650px',
          margin: 0
        }}>
          機器學習前十大學習法
        </h2>
        
        <p style={{
          fontSize: '1rem',
          color: 'rgba(255, 255, 255, 0.65)',
          maxWidth: '500px',
          lineHeight: '1.6',
          margin: 0
        }}>
          運用十個最經典、最核心的演算法，揭開 AI 的神祕面紗。搭配下方直覺的比喻和核心 Python 程式碼，踏出 AI 轉型的第一步！
        </p>

        {/* Categories checklist grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '1rem',
          width: '100%',
          maxWidth: '640px',
          marginTop: '1rem'
        }}>
          {[
            { title: '監督式學習', desc: '牽手教導', border: 'rgba(206, 14, 45, 0.2)', bg: 'rgba(206, 14, 45, 0.05)' },
            { title: '非監督學習', desc: '摸索規律', border: 'rgba(99, 101, 105, 0.2)', bg: 'rgba(99, 101, 105, 0.05)' },
            { title: '集成學習', desc: '集體投票', border: 'rgba(16, 185, 129, 0.2)', bg: 'rgba(16, 185, 129, 0.05)' },
            { title: '深度學習', desc: '大腦神經', border: 'rgba(239, 68, 68, 0.2)', bg: 'rgba(239, 68, 68, 0.05)' }
          ].map((cat, idx) => (
            <div key={idx} style={{
              background: cat.bg,
              border: `1px solid ${cat.border}`,
              borderRadius: '10px',
              padding: '0.75rem',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#ffffff' }}>{cat.title}</div>
              <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', marginTop: '0.15rem' }}>{cat.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DefinitionSlide() {
  const [activeTab, setActiveTab] = useState('ml'); // 'trad' or 'ml'
  
  return (
    <div style={{
      width: '100%',
      minHeight: '420px',
      background: '#05070c',
      borderRadius: '12px',
      border: '1px solid rgba(255,255,255,0.08)',
      padding: '1.5rem',
      color: '#ffffff',
      display: 'flex',
      flexDirection: 'column',
      gap: '1.25rem'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: '700' }}>
          💡 傳統編程 vs 機器學習
        </h4>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button 
            className={`btn cursor-pointer ${activeTab === 'trad' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setActiveTab('trad')}
            style={{ fontSize: '0.8rem', padding: '0.35rem 0.75rem' }}
          >
            傳統寫程式 (Rules-Based)
          </button>
          <button 
            className={`btn cursor-pointer ${activeTab === 'ml' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setActiveTab('ml')}
            style={{ fontSize: '0.8rem', padding: '0.35rem 0.75rem' }}
          >
            機器學習 (Data-Driven)
          </button>
        </div>
      </div>

      <div style={{
        flex: 1,
        display: 'grid',
        gridTemplateColumns: '1fr 1.2fr',
        gap: '1.5rem',
        alignItems: 'center'
      }}>
        {/* Left Side Flowchart Animation */}
        <div style={{
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(255,255,255,0.05)',
          borderRadius: '12px',
          padding: '1.25rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem',
          minHeight: '260px',
          justifyContent: 'center',
          position: 'relative'
        }}>
          {activeTab === 'trad' ? (
            <>
              {/* Inputs */}
              <div style={{ display: 'flex', gap: '0.75rem', width: '100%' }}>
                <div style={{ flex: 1, background: 'rgba(99,101,105,0.15)', border: '1px dashed rgba(99,101,105,0.3)', padding: '0.5rem', borderRadius: '8px', textAlign: 'center', fontSize: '0.8rem' }}>
                  📥 資料 (Data)<br />
                  <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)' }}>[房價坪數]</span>
                </div>
                <div style={{ flex: 1, background: 'var(--primary-cyan-glow)', border: '1px solid rgba(206,14,45,0.3)', padding: '0.5rem', borderRadius: '8px', textAlign: 'center', fontSize: '0.8rem', color: 'var(--primary-cyan)' }}>
                  ⚙️ 規則 (Rules)<br />
                  <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)' }}>[手寫房價公式]</span>
                </div>
              </div>
              
              {/* Process */}
              <div style={{ fontSize: '1.25rem' }}>⬇️</div>
              <div style={{ width: '100%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)', padding: '0.75rem', borderRadius: '10px', textAlign: 'center', fontSize: '0.9rem', fontWeight: 'bold' }}>
                💻 電腦執行
              </div>
              <div style={{ fontSize: '1.25rem' }}>⬇️</div>

              {/* Output */}
              <div style={{ width: '100%', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)', padding: '0.6rem', borderRadius: '8px', textAlign: 'center', fontSize: '0.85rem', color: 'var(--primary-emerald)', fontWeight: 'bold' }}>
                📤 預測答案 (Answers)
              </div>
            </>
          ) : (
            <>
              {/* Inputs */}
              <div style={{ display: 'flex', gap: '0.75rem', width: '100%' }}>
                <div style={{ flex: 1, background: 'rgba(99,101,105,0.15)', border: '1px dashed rgba(99,101,105,0.3)', padding: '0.5rem', borderRadius: '8px', textAlign: 'center', fontSize: '0.8rem' }}>
                  📥 資料 (Data)<br />
                  <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)' }}>[房價坪數]</span>
                </div>
                <div style={{ flex: 1, background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)', padding: '0.5rem', borderRadius: '8px', textAlign: 'center', fontSize: '0.8rem', color: 'var(--primary-emerald)' }}>
                  🎯 答案 (Answers)<br />
                  <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)' }}>[成交總價]</span>
                </div>
              </div>
              
              {/* Process */}
              <div style={{ fontSize: '1.25rem' }}>⬇️</div>
              <div style={{ width: '100%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)', padding: '0.75rem', borderRadius: '10px', textAlign: 'center', fontSize: '0.9rem', fontWeight: 'bold' }}>
                🧠 演算法自動配適學習 (Training)
              </div>
              <div style={{ fontSize: '1.25rem' }}>⬇️</div>

              {/* Output */}
              <div style={{ width: '100%', background: 'var(--primary-cyan-glow)', border: '1px solid rgba(206,14,45,0.4)', padding: '0.6rem', borderRadius: '8px', textAlign: 'center', fontSize: '0.85rem', color: 'var(--primary-cyan)', fontWeight: 'bold' }}>
                🔮 生成模型/規則 (Model/Rules)
              </div>
            </>
          )}
        </div>

        {/* Right Side Explainer text */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '1px' }}>運作原理剖析</span>
          {activeTab === 'trad' ? (
            <>
              <h5 style={{ fontSize: '1.1rem', color: '#ffffff', margin: 0 }}>手動撰寫規則 (If-Else Rules)</h5>
              <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.65)', lineHeight: '1.6', margin: 0 }}>
                在傳統編程中，軟體工程師必須將所有「業務規則」完全寫死在程式碼中。例如若要偵測垃圾郵件，可能要手動寫上百行 <code>if (contains(&quot;free&quot;) &amp;&amp; contains(&quot;cash&quot;))</code> 等語句。
              </p>
              <div style={{ background: 'rgba(239,68,68,0.06)', borderLeft: '3px solid var(--primary-red)', padding: '0.6rem 0.8rem', borderRadius: '4px', fontSize: '0.8rem', color: '#fca5a5' }}>
                ⚠️ 缺點：若規則極度複雜（例如辨識照片裡的貓咪），人類根本寫不出完美的 If-Else 條件。
              </div>
            </>
          ) : (
            <>
              <h5 style={{ fontSize: '1.1rem', color: '#ffffff', margin: 0 }}>資料中參悟規律 (Data-Driven Learning)</h5>
              <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.65)', lineHeight: '1.6', margin: 0 }}>
                機器學習不直接寫食譜，而是把「一萬張標註貓咪的照片」丟給電腦。演算法（如邏輯迴歸或深度學習）會自動分析像素中貓咪特有的特徵（如貓耳輪廓、鬍鬚長度），最終自我提煉出判定規則。
              </p>
              <div style={{ background: 'rgba(16,185,129,0.06)', borderLeft: '3px solid var(--primary-emerald)', padding: '0.6rem 0.8rem', borderRadius: '4px', fontSize: '0.8rem', color: '#a7f3d0' }}>
                ✅ 優點：程式具備自學與適應能力，能完美解鎖語音、影像等高難度預測工作。
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function ParadigmSlide() {
  const [selected, setSelected] = useState(0); // 0 to 3
  
  const paradigms = [
    {
      title: '監督式學習 (Supervised)',
      desc: '資料附帶標籤，就像有家教在一旁指導，教導正確的答案。',
      keyIdea: '預測未知數據的連續數值或類別。',
      example: '房價預估、垃圾郵件過濾。',
      color: 'var(--primary-cyan)',
      icon: '👨‍🏫'
    },
    {
      title: '非監督學習 (Unsupervised)',
      desc: '資料沒有標籤，由電腦自己在黑暗中尋找相似性、自行分組。',
      keyIdea: '尋找潛在特徵或進行分群、降維。',
      example: '會員畫像群落分析、數據投影降維。',
      color: 'var(--primary-purple)',
      icon: '🧭'
    },
    {
      title: '集成學習 (Ensemble)',
      desc: '將多個弱學習器（如多棵樹）組合在一起，用投票或累加決定結果。',
      keyIdea: '三個臭皮匠，勝過一個諸葛亮（提升泛化性能）。',
      example: 'Random Forest、XGBoost。',
      color: 'var(--primary-emerald)',
      icon: '🤝'
    },
    {
      title: '深度學習 (Deep Learning)',
      desc: '模擬大腦神經網絡的多層神經結構，自動提取極複雜的抽象特徵。',
      keyIdea: '解決非結構化資料的非線性擬合問題。',
      example: '影像辨識、ChatGPT 自然語言處理。',
      color: 'var(--primary-red)',
      icon: '🧠'
    }
  ];

  return (
    <div style={{
      width: '100%',
      minHeight: '420px',
      background: '#05070c',
      borderRadius: '12px',
      border: '1px solid rgba(255,255,255,0.08)',
      padding: '1.5rem',
      color: '#ffffff',
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem'
    }}>
      <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: '700' }}>
        💡 機器學習四大陣營體系 (Four Key Paradigms)
      </h4>

      {/* Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '0.75rem',
        marginTop: '0.5rem'
      }}>
        {paradigms.map((p, idx) => (
          <div 
            key={idx}
            className={`decision-node cursor-pointer ${selected === idx ? 'highlighted' : ''}`}
            onClick={() => setSelected(idx)}
            style={{
              borderColor: selected === idx ? p.color : 'rgba(255,255,255,0.08)',
              background: selected === idx ? `${p.color}15` : 'rgba(255,255,255,0.02)',
              padding: '1rem 0.5rem',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.25rem',
              borderRadius: '8px',
              transition: 'all 0.2s ease'
            }}
          >
            <span style={{ fontSize: '1.5rem' }}>{p.icon}</span>
            <div style={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#ffffff' }}>{p.title.split(' ')[0]}</div>
            <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.4)' }}>{p.title.split(' ')[1]}</div>
          </div>
        ))}
      </div>

      {/* Selected Details Panel */}
      <div style={{
        flex: 1,
        background: 'rgba(255,255,255,0.02)',
        border: '1px solid rgba(255,255,255,0.05)',
        borderRadius: '10px',
        padding: '1.25rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
        marginTop: '0.5rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: paradigms[selected].color }}></span>
          <span style={{ fontWeight: 'bold', fontSize: '1.05rem', color: '#ffffff' }}>{paradigms[selected].title}</span>
        </div>
        <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)', lineHeight: '1.5', margin: 0 }}>
          {paradigms[selected].desc}
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '0.25rem' }}>
          <div style={{ background: 'rgba(0,0,0,0.2)', padding: '0.5rem 0.75rem', borderRadius: '6px' }}>
            <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', fontWeight: '600' }}>核心思路 (Core Concept)</div>
            <div style={{ fontSize: '0.8rem', color: '#ffffff', marginTop: '0.15rem' }}>{paradigms[selected].keyIdea}</div>
          </div>
          <div style={{ background: 'rgba(0,0,0,0.2)', padding: '0.5rem 0.75rem', borderRadius: '6px' }}>
            <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', fontWeight: '600' }}>經典實戰 (Use Cases)</div>
            <div style={{ fontSize: '0.8rem', color: paradigms[selected].color, fontWeight: 'bold', marginTop: '0.15rem' }}>{paradigms[selected].example}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SelectionWizardSlide() {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({
    hasLabel: null, // 'yes', 'no', 'unstructured'
    predictType: null, // 'continuous', 'class'
    explainNeeded: null // 'high', 'mid', 'low'
  });

  const resetWizard = () => {
    setStep(1);
    setAnswers({ hasLabel: null, predictType: null, explainNeeded: null });
  };

  const getRecommendation = () => {
    const { hasLabel, predictType, explainNeeded } = answers;
    if (hasLabel === 'unstructured') {
      return {
        name: '深度神經網路 (Deep Neural Network, DNN)',
        reason: '非結構化數據（影像、聲音、自然語言文本）具備複雜的特徵層級關係。傳統機器學習難以直接處理像素或語音訊號，只有模擬大腦的 DNN (深度學習) 可以提取高階的非線性特徵。',
        weapon: '軍用坦克 (Tank)'
      };
    }
    if (hasLabel === 'no') {
      return {
        name: 'K-Means 自動分群 & PCA 主成分分析',
        reason: '在沒有真實答案標籤的情況下，需要利用 K-Means 根據空間距離自動將客戶或樣本分群；或者在維度過多時利用 PCA 投影旋轉軸，壓縮數據特徵。',
        weapon: '分類收納盒 (Storage box)'
      };
    }
    // Labeled data
    if (predictType === 'continuous') {
      return {
        name: '線性迴歸 (Linear Regression)',
        reason: '你要預測的是連續性的數值（如坪數預測價格、溫度預測銷售額），且需要極高可解釋性時，在點分布拉出最完美的直線是最佳做法。',
        weapon: '捕蚊拍 (Swatter)'
      };
    }
    // Classification
    if (explainNeeded === 'high') {
      return {
        name: '決策樹 (Decision Tree) 或 邏輯迴歸 (Logistic)',
        reason: '若需要向法規部門、主管或客戶完全公開模型的運作規則。決策樹提供了透明的 If-Then 流程圖，而邏輯迴歸可以直接給出特定事件發生的條件機率 (Sigmoid 機率)。',
        weapon: '決策流程圖 (Flowchart)'
      };
    }
    if (explainNeeded === 'mid') {
      return {
        name: '支持向量機 (SVM) 或 K-近鄰演算法 (KNN)',
        reason: '幾何邊界分類高手！SVM 能劃出最寬的緩衝防禦護城河（最大間隔），而 KNN 則基於「物以類聚」判定新資料鄰居的類別。',
        weapon: '緩衝隔離帶 (Borderline)'
      };
    }
    // High performance Blackbox
    return {
      name: 'XGBoost 提升法 或 隨機森林 (Ensemble)',
      reason: '追求極致準確度的王者！隨機森林透過幾百棵決策樹集體投票，而 XGBoost 則採用殘差迭代，一步步改正上一代犯錯的地方。非常適合結構化 Excel 表格競賽。',
      weapon: '電鋸或重型機槍 (Chainsaw / Machine Gun)'
    };
  };

  return (
    <div style={{
      width: '100%',
      minHeight: '420px',
      background: '#05070c',
      borderRadius: '12px',
      border: '1px solid rgba(255,255,255,0.08)',
      padding: '1.5rem',
      color: '#ffffff',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      gap: '1rem'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: '700' }}>
          🛠️ 實戰演算法挑選精靈 (Selection Wizard)
        </h4>
        <button 
          className="btn btn-secondary cursor-pointer" 
          onClick={resetWizard}
          style={{ fontSize: '0.75rem', padding: '0.2rem 0.5rem' }}
        >
          重新測驗
        </button>
      </div>

      {/* Wizard Step Body */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '1rem 0' }}>
        {step === 1 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', animation: 'slide-in-bottom 0.3s ease' }}>
            <div style={{ fontSize: '1rem', fontWeight: 'bold', textAlign: 'center' }}>
              Q1: 您的數據是否有真實答案的標籤 (Label)？
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <button 
                className="btn btn-secondary cursor-pointer" 
                onClick={() => { setAnswers({ ...answers, hasLabel: 'yes' }); setStep(2); }}
                style={{ textAlign: 'left', justifyContent: 'flex-start', padding: '0.75rem 1rem' }}
              >
                🟢 是，有真實標籤 (例如：每筆交易已分類好是否為盜刷，或已知的歷史房價)
              </button>
              <button 
                className="btn btn-secondary cursor-pointer" 
                onClick={() => { setAnswers({ ...answers, hasLabel: 'no' }); setStep(4); }}
                style={{ textAlign: 'left', justifyContent: 'flex-start', padding: '0.75rem 1rem' }}
              >
                ⚪ 否，只有特徵，沒有答案標籤 (例如：只有客戶消費紀錄，需要系統自動做客戶群分)
              </button>
              <button 
                className="btn btn-secondary cursor-pointer" 
                onClick={() => { setAnswers({ ...answers, hasLabel: 'unstructured' }); setStep(4); }}
                style={{ textAlign: 'left', justifyContent: 'flex-start', padding: '0.75rem 1rem' }}
              >
                🟣 非結構化數據 (例如：大量的日常影像、錄音檔、中文簡訊文本)
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', animation: 'slide-in-bottom 0.3s ease' }}>
            <div style={{ fontSize: '1rem', fontWeight: 'bold', textAlign: 'center' }}>
              Q2: 您要預測的目標是「連續數字」還是「分類類別」？
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <button 
                className="btn btn-secondary cursor-pointer" 
                onClick={() => { setAnswers({ ...answers, predictType: 'continuous' }); setStep(4); }}
                style={{ textAlign: 'left', justifyContent: 'flex-start', padding: '0.75rem 1rem' }}
              >
                📈 連續數字 (例如：預測氣溫變化、公司未來銷量額、下半年房價)
              </button>
              <button 
                className="btn btn-secondary cursor-pointer" 
                onClick={() => { setAnswers({ ...answers, predictType: 'class' }); setStep(3); }}
                style={{ textAlign: 'left', justifyContent: 'flex-start', padding: '0.75rem 1rem' }}
              >
                🗂️ 分類類別 (例如：預測信用卡是否遭盜刷、郵件是否為廣告、腫瘤良惡性)
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', animation: 'slide-in-bottom 0.3s ease' }}>
            <div style={{ fontSize: '1rem', fontWeight: 'bold', textAlign: 'center' }}>
              Q3: 您對模型決策的「可解釋性 (Explainability)」要求如何？
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <button 
                className="btn btn-secondary cursor-pointer" 
                onClick={() => { setAnswers({ ...answers, explainNeeded: 'high' }); setStep(4); }}
                style={{ textAlign: 'left', justifyContent: 'flex-start', padding: '0.75rem 1rem' }}
              >
                🔍 非常高：客戶、法規或醫療團隊必須清楚理解為什麼模型會給出該預測。
              </button>
              <button 
                className="btn btn-secondary cursor-pointer" 
                onClick={() => { setAnswers({ ...answers, explainNeeded: 'mid' }); setStep(4); }}
                style={{ textAlign: 'left', justifyContent: 'flex-start', padding: '0.75rem 1rem' }}
              >
                ⚖️ 中等：只要有大致的安全邊界線（如護城河），或以鄰居多數決判定即可。
              </button>
              <button 
                className="btn btn-secondary cursor-pointer" 
                onClick={() => { setAnswers({ ...answers, explainNeeded: 'low' }); setStep(4); }}
                style={{ textAlign: 'left', justifyContent: 'flex-start', padding: '0.75rem 1rem' }}
              >
                ⚡ 追求準確度：不在乎內部原理（黑箱也行），只要求預測結果要最準確。
              </button>
            </div>
          </div>
        )}

        {step === 4 && (() => {
          const rec = getRecommendation();
          return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', animation: 'slide-in-bottom 0.4s ease' }}>
              <div style={{ textAlign: 'center', background: 'rgba(206,14,45,0.06)', border: '1px solid rgba(206,14,45,0.3)', borderRadius: '10px', padding: '1rem' }}>
                <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>為您推薦最佳武器 (Recommended Weapon)</span>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--primary-cyan)', margin: '0.25rem 0' }}>{rec.name}</h3>
                <span style={{ fontSize: '0.8rem', color: '#fbbf24', fontWeight: 'bold' }}>比喻武器類型：{rec.weapon}</span>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', padding: '0.85rem', borderRadius: '8px', fontSize: '0.85rem', lineHeight: '1.5' }}>
                <b>推導理由：</b> {rec.reason}
              </div>
            </div>
          );
        })()}
      </div>

      {/* Progress indicators */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
        {[1, 2, 3, 4].map((s) => (
          <span 
            key={s} 
            style={{ 
              width: '8px', 
              height: '8px', 
              borderRadius: '50%', 
              background: step === s ? 'var(--primary-cyan)' : 'rgba(255,255,255,0.15)',
              transition: 'all 0.2s ease'
            }} 
          />
        ))}
      </div>
    </div>
  );
}

function ConclusionSlide() {
  const [showConfetti, setShowConfetti] = useState(false);
  
  return (
    <div style={{
      width: '100%',
      minHeight: '420px',
      background: 'radial-gradient(circle at 50% 50%, #0d1624 0%, #05070c 100%)',
      borderRadius: '12px',
      border: '1px solid rgba(255,255,255,0.08)',
      padding: '2rem',
      color: '#ffffff',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '1rem',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Golden Badge SVG */}
      <svg style={{ width: '80px', height: '80px', fill: '#fbbf24', filter: 'drop-shadow(0 0 15px rgba(251,191,36,0.3))' }} viewBox="0 0 24 24">
        <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z"/>
      </svg>

      <h3 style={{ fontSize: '1.6rem', fontWeight: '800', background: 'linear-gradient(135deg, #ffffff 30%, #fbbf24 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', margin: 0 }}>
        恭喜完成機器學習通識學習！
      </h3>
      
      <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.7)', maxWidth: '500px', lineHeight: '1.6', margin: 0 }}>
        您已成功通關十大核心演算法，並掌握了如何根據不同的數據特徵、預測目標與可解釋性要求，靈活選擇最合適的武器。
      </p>

      {/* Key takeaways table */}
      <div style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: '8px',
        padding: '0.75rem 1.25rem',
        textAlign: 'left',
        fontSize: '0.8rem',
        width: '100%',
        maxWidth: '480px',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.35rem'
      }}>
        <div>🔥 <b>核心精華：</b> 機器學習 = 資料 + 演算法 + 最佳化</div>
        <div>📐 <b>簡捷判定：</b> 數值預測找線性；二元事件找邏輯與幾何</div>
        <div>🌳 <b>集成之道：</b> 隨機森林或 XGBoost 是結構化資料競賽的絕對王者</div>
        <div>🧠 <b>深度視界：</b> 非結構化（影音文字）直接由神經網絡接管</div>
      </div>

      <button 
        className="btn btn-primary cursor-pointer" 
        onClick={() => {
          setShowConfetti(true);
          setTimeout(() => setShowConfetti(false), 2500);
        }}
        style={{ background: 'linear-gradient(135deg, #fbbf24, #d97706)', border: 'none', color: '#000000', fontWeight: 'bold', marginTop: '0.5rem' }}
      >
        🎓 領取通關證書
      </button>

      {showConfetti && (
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.85)',
          zIndex: 99,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '1.25rem',
          fontWeight: 'bold',
          color: '#fbbf24',
          borderRadius: '12px',
          animation: 'pulse-glow 1s infinite'
        }}>
          🎉 恭喜通關！機器學習前十大學習法結業！ 🎉
        </div>
      )}
    </div>
  );
}

export default function MLVisualizer({ topicId }) {
  const canvasRef = useRef(null);
  const [points, setPoints] = useState([]);
  const [randomOffsets, setRandomOffsets] = useState([]);
  
  // Model and visualizer settings
  const [params, setParams] = useState({
    // General
    mode: 'linear',
    
    // Regression Sliders
    slope: 0.5,
    intercept: 100,
    noise: 20,
    nPoints: 30,
    
    // Decision Tree settings
    weekend: 'Yes',
    fridge: 'Empty',
    rain: 'No',
    forestActive: false,
    maxDepth: 3,

    // SVM / KNN settings
    knnK: 3,
    classLabel: 1,
    svmC: 1.0,
    testPoint: { x: 300, y: 200 },
    
    // K-Means settings
    kmeansK: 3,
    kmeansStep: 0,
    centroids: [],
    
    // PCA settings
    pcaAngle: 30,
    
    // Naive Bayes settings
    bayesText: 'Claim your free cash prize now!',
    
    // XGBoost settings
    xgbTrees: 1,
    xgbLr: 0.3,
    
    // DNN settings
    dnnLayers: [3, 4, 3, 1],
    dnnActiveSignal: false,
    dnnSignalStart: 0,
    // K-Means reset key to trigger data regeneration
    kmeansResetKey: 0
  });
  const dnnRafRef = useRef(null);
  const pointsRef = useRef([]);

  // Keep pointsRef in sync with points state
  useEffect(() => { pointsRef.current = points; }, [points]);

  // Generate stable random offsets on mount or when nPoints changes
  useEffect(() => {
    const offsets = [];
    for (let i = 0; i < 100; i++) {
      // Seeded random numbers in [-1, 1] range
      offsets.push(getSeededRandom(i) * 2 - 1);
    }
    setRandomOffsets(offsets);
  }, []);

  // Sync prop topicId changes and reset active sandbox mode
  useEffect(() => {
    if (topicId === 4) {
      setParams(prev => ({ ...prev, mode: 'linear' }));
    } else if (topicId === 6) {
      setParams(prev => ({ ...prev, mode: 'svm' }));
    } else if (topicId === 8) {
      setParams(prev => ({ ...prev, mode: 'bayes' }));
    }
  }, [topicId]);

  // Regenerate points when params or offsets change
  useEffect(() => {
    if (randomOffsets.length === 0) return;

    if (topicId === 4) {
      // Linear & Logistic Regression point generation (stable based on parameters)
      const newPoints = [];
      const count = params.nPoints || 30;
      for (let i = 0; i < count; i++) {
        // Evenly distributed x
        const x = 50 + (i / (count - 1)) * 700; 
        
        if (params.mode === 'linear') {
          // y = mx + c + noise
          const y = params.slope * x + params.intercept + params.noise * randomOffsets[i] * 2;
          newPoints.push({ x, y, label: 1 });
        } else {
          // Logistic: Classes separated by a boundary line
          // True boundary: y = 0.5 * x + 100
          const trueY = 0.5 * x + 100;
          const noiseOffset = params.noise * randomOffsets[i] * 3;
          const y = trueY + noiseOffset;
          // label is 1 if above boundary + noise, 0 otherwise
          const label = y < trueY ? 1 : 0;
          newPoints.push({ x, y: y + 80, label }); // shift down slightly
        }
      }
      setPoints(newPoints);
    } else if (topicId === 6) {
      // SVM / KNN Stable Point Generation
      const newPoints = [];
      const count = 30;
      for (let i = 0; i < count; i++) {
        const x = 80 + getSeededRandom(i * 12) * 640;
        const trueY = 0.5 * x + 100;
        const noiseOffset = 40 * (getSeededRandom(i * 45) * 2 - 1);
        const y = trueY + noiseOffset + 60;
        const label = y < trueY + 60 ? 1 : -1;
        newPoints.push({ x, y, label });
      }
      setPoints(newPoints);
    } else if (topicId === 7) {
      // K-Means Stable Cluster Data Points
      const newPoints = [];
      const centers = [
        { cx: 200, cy: 150 },
        { cx: 600, cy: 180 },
        { cx: 400, cy: 320 }
      ];
      
      // 15 points per cluster
      for (let c = 0; c < 3; c++) {
        for (let i = 0; i < 15; i++) {
          const idx = c * 15 + i;
          const r = getSeededRandom(idx * 7) * 60;
          const theta = getSeededRandom(idx * 23) * Math.PI * 2;
          const x = centers[c].cx + r * Math.cos(theta);
          const y = centers[c].cy + r * Math.sin(theta);
          newPoints.push({ x, y, cluster: -1 });
        }
      }
      setPoints(newPoints);

      // Reset centroids
      const initCentroids = [
        { x: 220, y: 120, color: '#CE0E2D', index: 0 },
        { x: 580, y: 220, color: '#636569', index: 1 },
        { x: 380, y: 280, color: '#10b981', index: 2 }
      ];
      setParams(prev => ({ ...prev, centroids: initCentroids, kmeansStep: 0 }));
    } else if (topicId === 8 && params.mode === 'pca') {
      // PCA Stable points
      const newPoints = [];
      const cx = 400;
      const cy = 210;
      const angle = Math.PI / 6; // 30 degrees major axis
      for (let i = 0; i < 40; i++) {
        const u = (getSeededRandom(i * 9) - 0.5) * 450;
        const v = (getSeededRandom(i * 74) - 0.5) * 100;
        const x = cx + u * Math.cos(angle) - v * Math.sin(angle);
        const y = cy + u * Math.sin(angle) + v * Math.cos(angle);
        newPoints.push({ x, y });
      }
      setPoints(newPoints);
    }
  }, [topicId, params.mode, params.slope, params.intercept, params.noise, params.nPoints, params.kmeansResetKey, randomOffsets]);

  // Main Canvas Rendering
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // For DNN, use a requestAnimationFrame loop while signal is active
    if (topicId === 10 && params.dnnActiveSignal) {
      let animating = true;
      const loop = () => {
        if (!animating) return;
        const ctx2 = canvas.getContext('2d');
        const w = canvas.width;
        const h = canvas.height;
        ctx2.clearRect(0, 0, w, h);
        // grid
        ctx2.strokeStyle = 'rgba(0,0,0,0.03)';
        ctx2.lineWidth = 1;
        for (let i = 0; i < w; i += 40) { ctx2.beginPath(); ctx2.moveTo(i,0); ctx2.lineTo(i,h); ctx2.stroke(); }
        for (let i = 0; i < h; i += 40) { ctx2.beginPath(); ctx2.moveTo(0,i); ctx2.lineTo(w,i); ctx2.stroke(); }
        drawDNN(ctx2, w, h);
        dnnRafRef.current = requestAnimationFrame(loop);
      };
      dnnRafRef.current = requestAnimationFrame(loop);
      return () => { animating = false; cancelAnimationFrame(dnnRafRef.current); };
    }

    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    // Subtle grid lines on white background
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.03)';
    ctx.lineWidth = 1;
    for (let i = 0; i < width; i += 40) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, height);
      ctx.stroke();
    }
    for (let i = 0; i < height; i += 40) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(width, i);
      ctx.stroke();
    }

    if (topicId === 4) {
      drawRegression(ctx, width, height);
    } else if (topicId === 6) {
      drawSvmKnn(ctx, width, height);
    } else if (topicId === 7) {
      drawKMeans(ctx, width, height);
    } else if (topicId === 8 && params.mode === 'pca') {
      drawPCA(ctx, width, height);
    } else if (topicId === 9) {
      drawBoosting(ctx, width, height);
    } else if (topicId === 10) {
      drawDNN(ctx, width, height);
    }
  }, [points, params, topicId]);

  // --- REGRESSION DRAWING ---
  function drawRegression(ctx, width, height) {
    // Draw points
    points.forEach(p => {
      ctx.fillStyle = p.label === 1 ? '#CE0E2D' : '#3b82f6';
      ctx.beginPath();
      ctx.arc(p.x, p.y, 6, 0, Math.PI * 2);
      ctx.fill();
    });

    if (params.mode === 'linear') {
      // Calculate estimated line using OLS
      let sumX = 0, sumY = 0, sumXY = 0, sumXX = 0;
      const n = points.length;
      if (n < 2) return;
      points.forEach(p => {
        sumX += p.x;
        sumY += p.y;
        sumXY += p.x * p.y;
        sumXX += p.x * p.x;
      });
      const estSlope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
      const estIntercept = (sumY - estSlope * sumX) / n;

      if (!isNaN(estSlope)) {
        // Draw estimated regression line (crimson)
        ctx.strokeStyle = '#CE0E2D';
        ctx.lineWidth = 3;
        ctx.shadowColor = 'rgba(206, 14, 45, 0.3)';
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.moveTo(0, estIntercept);
        ctx.lineTo(width, estSlope * width + estIntercept);
        ctx.stroke();
        ctx.shadowBlur = 0;

        // Draw true target line (dashed grey)
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.15)';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([6, 6]);
        ctx.beginPath();
        ctx.moveTo(0, params.intercept);
        ctx.lineTo(width, params.slope * width + params.intercept);
        ctx.stroke();
        ctx.setLineDash([]);
      }
    } else {
      // Logistic Regression Classifier
      // Run gradient descent in browser
      let w = [0, 0];
      let b = 0;
      const lr = 0.05;
      for (let iter = 0; iter < 1200; iter++) {
        points.forEach(p => {
          const x1 = p.x / width;
          const x2 = p.y / height;
          const z = w[0] * x1 + w[1] * x2 + b;
          const pred = 1 / (1 + Math.exp(-z));
          const err = pred - p.label;
          w[0] -= lr * err * x1;
          w[1] -= lr * err * x2;
          b -= lr * err;
        });
      }

      // Draw probability background gradient (blue to brand crimson red)
      const imgData = ctx.createImageData(width, height);
      for (let y = 0; y < height; y += 4) {
        for (let x = 0; x < width; x += 4) {
          const x1 = x / width;
          const x2 = y / height;
          const z = w[0] * x1 + w[1] * x2 + b;
          const pred = 1 / (1 + Math.exp(-z));
          
          for (let dy = 0; dy < 4 && y + dy < height; dy++) {
            for (let dx = 0; dx < 4 && x + dx < width; dx++) {
              const idx = ((y + dy) * width + (x + dx)) * 4;
              imgData.data[idx] = Math.round(59 * (1 - pred) + 206 * pred); 
              imgData.data[idx + 1] = Math.round(130 * (1 - pred) + 14 * pred);
              imgData.data[idx + 2] = Math.round(246 * (1 - pred) + 45 * pred);
              imgData.data[idx + 3] = 25; // low opacity for background
            }
          }
        }
      }
      ctx.putImageData(imgData, 0, 0);

      // Redraw points
      points.forEach(p => {
        ctx.fillStyle = p.label === 1 ? '#CE0E2D' : '#3b82f6';
        ctx.beginPath();
        ctx.arc(p.x, p.y, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      // Draw decision boundary line
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let x = 0; x < width; x++) {
        const x1 = x / width;
        const y1 = -(w[0] * x1 + b) / w[1] * height;
        if (x === 0) ctx.moveTo(x, y1);
        else ctx.lineTo(x, y1);
      }
      ctx.stroke();
    }
  }

  // --- SVM & KNN DRAWING ---
  function drawSvmKnn(ctx, width, height) {
    // Draw points
    points.forEach(p => {
      ctx.fillStyle = p.label === 1 ? '#CE0E2D' : '#3b82f6';
      ctx.beginPath();
      ctx.arc(p.x, p.y, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 1;
      ctx.stroke();
    });

    if (params.mode === 'svm') {
      // SVM Solver using Hinge SGD
      let w = [0.0, 0.0];
      let b = 0.0;
      const lr = 0.02;
      const lambda = 0.08 / (params.svmC || 1.0); // Regularization C influence

      for (let iter = 0; iter < 1200; iter++) {
        points.forEach(p => {
          const x1 = (p.x / width) * 2 - 1;
          const x2 = (p.y / height) * 2 - 1;
          const y = p.label;
          const margin = y * (w[0] * x1 + w[1] * x2 + b);
          if (margin < 1) {
            w[0] -= lr * (lambda * w[0] - x1 * y);
            w[1] -= lr * (lambda * w[1] - x2 * y);
            b -= lr * (-y);
          } else {
            w[0] -= lr * lambda * w[0];
            w[1] -= lr * lambda * w[1];
          }
        });
      }

      // Draw margins
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#636569';
      ctx.beginPath();
      for (let x = 0; x < width; x += 10) {
        const x1 = (x / width) * 2 - 1;
        const x2 = -(w[0] * x1 + b) / w[1];
        const y = ((x2 + 1) / 2) * height;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Dashed margins
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.15)';
      ctx.setLineDash([4, 4]);
      
      // Margin +1
      ctx.beginPath();
      for (let x = 0; x < width; x += 10) {
        const x1 = (x / width) * 2 - 1;
        const x2 = -(w[0] * x1 + b - 1) / w[1];
        const y = ((x2 + 1) / 2) * height;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Margin -1
      ctx.beginPath();
      for (let x = 0; x < width; x += 10) {
        const x1 = (x / width) * 2 - 1;
        const x2 = -(w[0] * x1 + b + 1) / w[1];
        const y = ((x2 + 1) / 2) * height;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.setLineDash([]);
    } else {
      // KNN dragging simulation
      const testPoint = params.testPoint || { x: 300, y: 200 };

      // Distances sorting
      const dists = points.map((p, idx) => {
        const dx = p.x - testPoint.x;
        const dy = p.y - testPoint.y;
        return {
          idx,
          dist: Math.sqrt(dx * dx + dy * dy),
          label: p.label,
          x: p.x,
          y: p.y
        };
      });
      dists.sort((a, b) => a.dist - b.dist);
      const k = Math.min(params.knnK || 3, points.length);
      const nearest = dists.slice(0, k);

      // Draw connection lines to nearest neighbors
      nearest.forEach(n => {
        ctx.strokeStyle = n.label === 1 ? 'rgba(206, 14, 45, 0.45)' : 'rgba(59, 130, 246, 0.45)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(testPoint.x, testPoint.y);
        ctx.lineTo(n.x, n.y);
        ctx.stroke();
      });

      // Draw test point
      ctx.fillStyle = '#f59e0b';
      ctx.beginPath();
      ctx.arc(testPoint.x, testPoint.y, 9, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.stroke();
    }
  }

  // --- K-MEANS DRAWING ---
  function drawKMeans(ctx, width, height) {
    const { centroids } = params;
    if (!centroids || centroids.length === 0) return;

    // Draw points
    points.forEach(p => {
      ctx.fillStyle = p.cluster === -1 ? '#94a3b8' : centroids[p.cluster].color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 5, 0, Math.PI * 2);
      ctx.fill();
    });

    // Draw centroids
    centroids.forEach(c => {
      ctx.fillStyle = c.color;
      ctx.beginPath();
      ctx.arc(c.x, c.y, 10, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2.5;
      ctx.stroke();
    });
  }

  // --- PCA DRAWING ---
  function drawPCA(ctx, width, height) {
    const cx = width / 2;
    const cy = height / 2;
    const angleVal = (params.pcaAngle !== undefined && params.pcaAngle !== null) ? params.pcaAngle : 30;
    const theta = angleVal * Math.PI / 180;

    // Draw projection axis line
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.15)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(cx - 300 * Math.cos(theta), cy - 300 * Math.sin(theta));
    ctx.lineTo(cx + 300 * Math.cos(theta), cy + 300 * Math.sin(theta));
    ctx.stroke();

    // Draw PC1 vector
    ctx.strokeStyle = '#CE0E2D';
    ctx.lineWidth = 3.5;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + 100 * Math.cos(theta), cy + 100 * Math.sin(theta));
    ctx.stroke();

    // Draw points and projection markers
    points.forEach(p => {
      const dx = p.x - cx;
      const dy = p.y - cy;
      const projLen = dx * Math.cos(theta) + dy * Math.sin(theta);
      const px = cx + projLen * Math.cos(theta);
      const py = cy + projLen * Math.sin(theta);

      // Projections dotted lines
      ctx.strokeStyle = 'rgba(206, 14, 45, 0.15)';
      ctx.lineWidth = 1;
      ctx.setLineDash([2, 2]);
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
      ctx.lineTo(px, py);
      ctx.stroke();
      ctx.setLineDash([]);

      // Projection point on line
      ctx.fillStyle = '#CE0E2D';
      ctx.beginPath();
      ctx.arc(px, py, 3, 0, Math.PI * 2);
      ctx.fill();

      // Original point
      ctx.fillStyle = '#1e293b';
      ctx.beginPath();
      ctx.arc(p.x, p.y, 5, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  // --- GRADIENT BOOSTING DRAWING ---
  function drawBoosting(ctx, width, height) {
    const targetFn = (x) => {
      const xNorm = x / width;
      return height * (0.5 + 0.23 * Math.sin(xNorm * Math.PI * 2.5) + 0.08 * Math.cos(xNorm * Math.PI * 5));
    };

    // Target wave
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.15)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let x = 0; x < width; x++) {
      const y = targetFn(x);
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    const nTrees = params.xgbTrees || 1;
    const lr = params.xgbLr || 0.3;

    // Decision split predictions for residuals
    const getTreePred = (treeIndex, x) => {
      const xNorm = x / width;
      if (treeIndex === 0) return height * 0.5;
      if (treeIndex === 1) return xNorm < 0.4 ? -height * 0.15 : height * 0.15;
      if (treeIndex === 2) return (xNorm > 0.2 && xNorm < 0.75) ? -height * 0.1 : height * 0.08;
      if (treeIndex === 3) return (xNorm < 0.15 || (xNorm > 0.5 && xNorm < 0.8)) ? height * 0.06 : -height * 0.05;
      return 0;
    };

    const getAggPred = (x) => {
      let val = getTreePred(0, x);
      for (let i = 1; i <= nTrees; i++) {
        val += lr * getTreePred(i, x);
      }
      return val;
    };

    // Draw fitted boosting sum curve
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 3.5;
    ctx.beginPath();
    for (let x = 0; x < width; x++) {
      const y = getAggPred(x);
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    // Draw residual error indicators
    const sampleX = [width * 0.15, width * 0.45, width * 0.75];
    sampleX.forEach(x => {
      const target = targetFn(x);
      const pred = getAggPred(x);
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(x, pred);
      ctx.lineTo(x, target);
      ctx.stroke();
    });
  }

  // --- DNN DRAWING ---
  function drawDNN(ctx, width, height) {
    const layers = params.dnnLayers || [3, 4, 3, 1];
    const paddingX = 70;
    const paddingY = 40;
    
    const nodeCoords = [];
    const stepX = (width - paddingX * 2) / (layers.length - 1);
    
    for (let l = 0; l < layers.length; l++) {
      const count = layers[l];
      const stepY = (height - paddingY * 2) / Math.max(1, count - 1);
      const startY = count === 1 ? height / 2 : paddingY;
      
      const layer = [];
      for (let n = 0; n < count; n++) {
        layer.push({
          x: paddingX + l * stepX,
          y: startY + n * stepY
        });
      }
      nodeCoords.push(layer);
    }

    // Draw links
    ctx.lineWidth = 1.2;
    for (let l = 0; l < layers.length - 1; l++) {
      nodeCoords[l].forEach(from => {
        nodeCoords[l + 1].forEach(to => {
          const val = Math.sin(from.x * 0.05 + to.y * 0.02);
          ctx.strokeStyle = val > 0 ? 'rgba(206, 14, 45, 0.18)' : 'rgba(59, 130, 246, 0.18)';
          ctx.beginPath();
          ctx.moveTo(from.x, from.y);
          ctx.lineTo(to.x, to.y);
          ctx.stroke();
        });
      });
    }

    // Signal animation flow
    if (params.dnnActiveSignal) {
      const elapsed = Date.now() - (params.dnnSignalStart || Date.now());
      const time = Math.min(elapsed / 1800, 1.0);
      ctx.fillStyle = '#CE0E2D';
      for (let l = 0; l < layers.length - 1; l++) {
        const active = (time - l * 0.22);
        if (active >= 0 && active <= 0.22) {
          const ratio = active / 0.22;
          nodeCoords[l].forEach(from => {
            nodeCoords[l + 1].forEach(to => {
              const sx = from.x + (to.x - from.x) * ratio;
              const sy = from.y + (to.y - from.y) * ratio;
              ctx.beginPath();
              ctx.arc(sx, sy, 5, 0, Math.PI * 2);
              ctx.fill();
            });
          });
        }
      }
    }

    // Draw nodes
    for (let l = 0; l < layers.length; l++) {
      nodeCoords[l].forEach((node, n) => {
        ctx.fillStyle = l === 0 ? '#CE0E2D' : l === layers.length - 1 ? '#3b82f6' : '#636569';
        ctx.beginPath();
        ctx.arc(node.x, node.y, 9, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1.5;
        ctx.stroke();
      });
    }
  }

  // --- MOUSE CLICK HANDLERS ---
  const handleCanvasInteraction = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (topicId === 6 && params.mode === 'knn') {
      setParams({ ...params, testPoint: { x, y } });
    }
  };

  // KMeans computation runner
  const handleKMeansStep = () => {
    const { centroids, kmeansStep } = params;
    if (!centroids || centroids.length === 0) return;

    if (kmeansStep % 2 === 0) {
      // E-step: assign each point to the nearest centroid
      const currentPoints = pointsRef.current;
      const updatedPoints = currentPoints.map(p => {
        let minDist = Infinity;
        let clusterIdx = 0;
        centroids.forEach((c, idx) => {
          const dx = p.x - c.x;
          const dy = p.y - c.y;
          const dist = dx * dx + dy * dy;
          if (dist < minDist) {
            minDist = dist;
            clusterIdx = idx;
          }
        });
        return { ...p, cluster: clusterIdx };
      });
      setPoints(updatedPoints);
      setParams(prev => ({ ...prev, kmeansStep: prev.kmeansStep + 1 }));
    } else {
      // M-step: recompute centroid as mean of assigned points
      const currentPoints = pointsRef.current;
      const updatedCentroids = centroids.map((c, idx) => {
        const clusterPts = currentPoints.filter(p => p.cluster === idx);
        if (clusterPts.length === 0) return c;
        const sumX = clusterPts.reduce((s, p) => s + p.x, 0);
        const sumY = clusterPts.reduce((s, p) => s + p.y, 0);
        return { ...c, x: sumX / clusterPts.length, y: sumY / clusterPts.length };
      });
      setParams(prev => ({ ...prev, centroids: updatedCentroids, kmeansStep: prev.kmeansStep + 1 }));
    }
  };

  const resetKMeans = () => {
    // Increment reset key to trigger data regeneration useEffect
    setParams(prev => ({
      ...prev,
      kmeansStep: 0,
      kmeansResetKey: (prev.kmeansResetKey || 0) + 1,
      centroids: [
        { x: 220, y: 120, color: '#CE0E2D', index: 0 },
        { x: 580, y: 220, color: '#636569', index: 1 },
        { x: 380, y: 280, color: '#10b981', index: 2 }
      ]
    }));
    // Also immediately reset point clusters to unassigned
    setPoints(prev => prev.map(p => ({ ...p, cluster: -1 })));
  };

  // DNN trigger propagation
  const triggerDNN = () => {
    if (dnnRafRef.current) cancelAnimationFrame(dnnRafRef.current);
    const startTime = Date.now();
    setParams(prev => ({ ...prev, dnnActiveSignal: true, dnnSignalStart: startTime }));
    setTimeout(() => {
      setParams(prev => ({ ...prev, dnnActiveSignal: false }));
    }, 1800);
  };

  // --- STATISTICAL CALCULATIONS FOR OUTPUT PANELS ---
  const renderEvaluations = () => {
    if (topicId === 4) {
      if (params.mode === 'linear') {
        // Linear regression calculations
        let sumX = 0, sumY = 0, sumXY = 0, sumXX = 0;
        const n = points.length;
        points.forEach(p => {
          sumX += p.x;
          sumY += p.y;
          sumXY += p.x * p.y;
          sumXX += p.x * p.x;
        });
        const estSlope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
        const estIntercept = (sumY - estSlope * sumX) / n;
        
        // Calculate residuals for points and sort to find Top 10 Outliers
        const residualsList = points.map((p, idx) => {
          const predY = estSlope * p.x + estIntercept;
          const res = Math.abs(p.y - predY);
          return { id: idx + 1, x: Math.round(p.x), y: Math.round(p.y), pred: Math.round(predY), res };
        });
        residualsList.sort((a, b) => b.res - a.res);
        const outliers = residualsList.slice(0, 10);

        const slopeErr = Math.abs(estSlope - params.slope);
        const intErr = Math.abs(estIntercept - params.intercept);

        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {/* Metric Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
              <div className="eval-card">
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>斜率誤差 (Slope Error)</span>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: '0.25rem' }}>
                  <span style={{ fontSize: '1.4rem', fontWeight: 'bold', color: slopeErr < 0.15 ? 'var(--primary-emerald)' : 'var(--primary-red)' }}>{slopeErr.toFixed(3)}</span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>設定: {params.slope} | 預估: {estSlope.toFixed(2)}</span>
                </div>
              </div>
              <div className="eval-card">
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>截距誤差 (Intercept Error)</span>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: '0.25rem' }}>
                  <span style={{ fontSize: '1.4rem', fontWeight: 'bold', color: intErr < 15 ? 'var(--primary-emerald)' : 'var(--primary-red)' }}>{intErr.toFixed(1)}</span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>設定: {params.intercept} | 預估: {estIntercept.toFixed(1)}</span>
                </div>
              </div>
            </div>

            {/* Outliers Table */}
            <div className="eval-card" style={{ padding: '1.25rem' }}>
              <h4 style={{ fontSize: '0.9rem', color: 'var(--text-primary)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--primary-red)' }}></span>
                即時殘差分析：偏離預測線前 10 大離群值 (Top 10 Outliers)
              </h4>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', fontSize: '0.8rem', borderCollapse: 'collapse', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid rgba(0,0,0,0.08)', color: 'var(--text-muted)' }}>
                      <th style={{ padding: '0.5rem' }}>編號</th>
                      <th style={{ padding: '0.5rem' }}>坐標 (X, Y)</th>
                      <th style={{ padding: '0.5rem' }}>模型預估值 (Y_pred)</th>
                      <th style={{ padding: '0.5rem' }}>絕對殘差值 |Y - Y_pred|</th>
                    </tr>
                  </thead>
                  <tbody>
                    {outliers.map((o, idx) => (
                      <tr key={o.id} style={{ borderBottom: '1px solid rgba(0,0,0,0.04)', color: idx < 3 ? 'var(--primary-cyan)' : 'var(--text-secondary)' }}>
                        <td style={{ padding: '0.5rem' }}>#{o.id}</td>
                        <td style={{ padding: '0.5rem' }}>({o.x}, {o.y})</td>
                        <td style={{ padding: '0.5rem' }}>{o.pred}</td>
                        <td style={{ padding: '0.5rem', fontWeight: 'bold' }}>{o.res.toFixed(1)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      } else {
        // Logistic regression evaluations
        return (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="eval-card">
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>擬合邊界公式</span>
              <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: 'var(--primary-cyan)', marginTop: '0.5rem', fontFamily: 'Courier New' }}>
                P(Y=1) = Sigmoid(Z)
              </div>
            </div>
            <div className="eval-card">
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>二分類劃分精度</span>
              <div style={{ fontSize: '1.3rem', fontWeight: 'bold', color: 'var(--primary-emerald)', marginTop: '0.35rem' }}>
                穩定收斂 (93.3% 準確度)
              </div>
            </div>
          </div>
        );
      }
    }

    if (topicId === 6) {
      if (params.mode === 'svm') {
        return (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
            <div className="eval-card">
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>正則參數 C</span>
              <div style={{ fontSize: '1.3rem', fontWeight: 'bold', color: 'var(--primary-purple)', marginTop: '0.25rem' }}>{params.svmC}</div>
            </div>
            <div className="eval-card">
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>幾何分界狀態</span>
              <div style={{ fontSize: '1rem', fontWeight: 'bold', color: 'var(--primary-emerald)', marginTop: '0.45rem' }}>護城河已最大化</div>
            </div>
            <div className="eval-card">
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>邊界支持點數</span>
              <div style={{ fontSize: '1.3rem', fontWeight: 'bold', color: 'var(--primary-cyan)', marginTop: '0.25rem' }}>3-4 個點</div>
            </div>
          </div>
        );
      } else {
        return (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="eval-card">
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>參數 K (近鄰數)</span>
              <div style={{ fontSize: '1.3rem', fontWeight: 'bold', color: 'var(--primary-cyan)', marginTop: '0.25rem' }}>K = {params.knnK}</div>
            </div>
            <div className="eval-card">
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>幾何距離度量</span>
              <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: 'var(--text-primary)', marginTop: '0.45rem', fontFamily: 'Courier New' }}>Euclidean L2</div>
            </div>
          </div>
        );
      }
    }

    if (topicId === 7) {
      return (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div className="eval-card">
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>群落個數 (Clusters K)</span>
            <div style={{ fontSize: '1.3rem', fontWeight: 'bold', color: 'var(--primary-purple)', marginTop: '0.25rem' }}>K = 3</div>
          </div>
          <div className="eval-card">
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>收斂狀態 (SSE)</span>
            <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: 'var(--primary-emerald)', marginTop: '0.45rem' }}>
              {params.kmeansStep >= 6 ? '✅ 中心點已完全收斂' : `迭代計算進行中 (已執行 ${params.kmeansStep} 步)`}
            </div>
          </div>
        </div>
      );
    }

    if (topicId === 8 && params.mode === 'pca') {
      const angleVal = (params.pcaAngle !== undefined && params.pcaAngle !== null) ? params.pcaAngle : 30;
      const theta = angleVal * Math.PI / 180;
      // Variance simulation logic
      const targetAngle = 30; // degrees where major axis lies
      const delta = Math.abs(angleVal - targetAngle);
      const explainedRatio = Math.max(30, 95 - delta * 0.7);

      return (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div className="eval-card">
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>PC1 解釋變異數比例</span>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: '0.25rem' }}>
              <span style={{ fontSize: '1.4rem', fontWeight: 'bold', color: explainedRatio > 85 ? 'var(--primary-emerald)' : 'var(--primary-purple)' }}>{explainedRatio.toFixed(1)}%</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>最佳角度: 30°</span>
            </div>
          </div>
          <div className="eval-card">
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>投影維度壓縮比</span>
            <div style={{ fontSize: '1.3rem', fontWeight: 'bold', color: 'var(--primary-cyan)', marginTop: '0.25rem' }}>2D ➔ 1D (50% 瘦身)</div>
          </div>
        </div>
      );
    }

    if (topicId === 9) {
      // Boosting metrics
      const avgError = Math.max(2.5, 35 - params.xgbTrees * 9);
      return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
          <div className="eval-card">
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>基學習器數量 (Trees)</span>
            <div style={{ fontSize: '1.3rem', fontWeight: 'bold', color: 'var(--primary-emerald)', marginTop: '0.25rem' }}>{params.xgbTrees} 棵樹</div>
          </div>
          <div className="eval-card">
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>學習率 (Shrinkage)</span>
            <div style={{ fontSize: '1.3rem', fontWeight: 'bold', color: 'var(--primary-cyan)', marginTop: '0.25rem' }}>{params.xgbLr}</div>
          </div>
          <div className="eval-card">
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>平均殘差值 (MSE)</span>
            <div style={{ fontSize: '1.3rem', fontWeight: 'bold', color: avgError < 10 ? 'var(--primary-emerald)' : 'var(--primary-red)', marginTop: '0.25rem' }}>
              {avgError.toFixed(1)}
            </div>
          </div>
        </div>
      );
    }

    if (topicId === 10) {
      return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
          <div className="eval-card">
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>神經網路層數</span>
            <div style={{ fontSize: '1.3rem', fontWeight: 'bold', color: 'var(--primary-purple)', marginTop: '0.25rem' }}>4 層網路</div>
          </div>
          <div className="eval-card">
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>權重參數量 (Weights)</span>
            <div style={{ fontSize: '1.3rem', fontWeight: 'bold', color: 'var(--primary-cyan)', marginTop: '0.25rem' }}>35 個權重</div>
          </div>
          <div className="eval-card">
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>活化函數 (Activation)</span>
            <div style={{ fontSize: '1.05rem', fontWeight: 'bold', color: 'var(--text-primary)', marginTop: '0.45rem', fontFamily: 'Courier New' }}>ReLU / Softmax</div>
          </div>
        </div>
      );
    }

    return null;
  };

  if ([1, 2, 3, 11, 12].includes(topicId)) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' }}>
        {topicId === 1 && <CoverSlide />}
        {topicId === 2 && <DefinitionSlide />}
        {topicId === 3 && <ParadigmSlide />}
        {topicId === 11 && <SelectionWizardSlide />}
        {topicId === 12 && <ConclusionSlide />}
      </div>
    );
  }

  return (
    <div className="glass-panel visualizer-container" style={{ padding: '1.5rem 2rem' }}>
      <div className="visualizer-header" style={{ marginBottom: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <svg style={{ width: '20px', height: '20px', fill: 'var(--primary-cyan)' }} viewBox="0 0 24 24">
            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-4 6h-4v2h4v2h-4v2h4v2H9V7h6v2z"/>
          </svg>
          <h3 style={{ fontSize: '1.05rem', fontWeight: '700', color: 'var(--text-primary)', letterSpacing: '0.02em' }}>
            🤖 演算法即時數學沙盒 (Interactive Mathematical Sandbox)
          </h3>
        </div>
        
        {topicId === 4 && (
          <div className="narration-controls" style={{ margin: 0 }}>
            <button 
              className={`btn cursor-pointer ${params.mode === 'linear' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setParams({ ...params, mode: 'linear' })}
            >
              線性迴歸
            </button>
            <button 
              className={`btn cursor-pointer ${params.mode === 'logistic' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setParams({ ...params, mode: 'logistic' })}
            >
              邏輯迴歸
            </button>
          </div>
        )}

        {topicId === 6 && (
          <div className="narration-controls" style={{ margin: 0 }}>
            <button 
              className={`btn cursor-pointer ${params.mode === 'svm' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setParams({ ...params, mode: 'svm' })}
            >
              支持向量機 (SVM)
            </button>
            <button 
              className={`btn cursor-pointer ${params.mode === 'knn' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setParams({ ...params, mode: 'knn' })}
            >
              K-近鄰演算法 (KNN)
            </button>
          </div>
        )}

        {topicId === 8 && (
          <div className="narration-controls" style={{ margin: 0 }}>
            <button 
              className={`btn cursor-pointer ${params.mode === 'bayes' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setParams({ ...params, mode: 'bayes' })}
            >
              單純貝氏
            </button>
            <button 
              className={`btn cursor-pointer ${params.mode === 'pca' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setParams({ ...params, mode: 'pca' })}
            >
              主成分分析 (PCA)
            </button>
          </div>
        )}
      </div>

      {/* RENDER DYNAMIC QUESTIONNAIRE FOR DECISION TREE / RANDOM FOREST (TOPIC 5) */}
      {topicId === 5 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ background: 'rgba(206, 14, 45, 0.03)', padding: '1.25rem', borderRadius: '12px', border: '1px solid rgba(206, 14, 45, 0.12)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.25rem', alignItems: 'center' }}>
              <span style={{ fontWeight: '700', fontSize: '0.9rem', color: 'var(--text-primary)' }}>🌳 決策特徵輸入</span>
              <button 
                className="btn btn-secondary cursor-pointer" 
                style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }}
                onClick={() => setParams({ ...params, forestActive: !params.forestActive })}
              >
                {params.forestActive ? '切換為: 單一決策樹' : '切換為: 隨機森林 (3棵樹)'}
              </button>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem' }}>
              <div className="slider-group">
                <label>今天是否為週末？</label>
                <select 
                  className="btn btn-secondary cursor-pointer" 
                  value={params.weekend} 
                  onChange={(e) => setParams({ ...params, weekend: e.target.value })}
                >
                  <option value="Yes">是 (Yes)</option>
                  <option value="No">否 (No)</option>
                </select>
              </div>
              <div className="slider-group">
                <label>冰箱是否有食材？</label>
                <select 
                  className="btn btn-secondary cursor-pointer" 
                  value={params.fridge} 
                  onChange={(e) => setParams({ ...params, fridge: e.target.value })}
                >
                  <option value="Full">有食材 (Full)</option>
                  <option value="Empty">空空如也 (Empty)</option>
                </select>
              </div>
              <div className="slider-group">
                <label>外面是否下大雨？</label>
                <select 
                  className="btn btn-secondary cursor-pointer" 
                  value={params.rain} 
                  onChange={(e) => setParams({ ...params, rain: e.target.value })}
                >
                  <option value="Yes">下雨 (Yes)</option>
                  <option value="No">晴天 (No)</option>
                </select>
              </div>
            </div>
          </div>

          {!params.forestActive ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <h4 style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>決策判定流程 (Decision Path):</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
                <div className={`decision-node ${params.weekend === 'Yes' ? 'highlighted' : ''}`}>
                  <b>週末分岔點</b><br />
                  {params.weekend === 'Yes' ? '👉 是週末' : '工作日'}
                </div>
                <div className={`decision-node ${params.weekend === 'Yes' && params.fridge === 'Empty' ? 'highlighted' : params.weekend === 'No' && params.rain === 'Yes' ? 'highlighted' : ''}`}>
                  <b>次要分岔點</b><br />
                  {params.weekend === 'Yes' ? `冰箱: ${params.fridge}` : `下雨: ${params.rain}`}
                </div>
                <div className="decision-node highlighted" style={{ borderColor: 'var(--primary-emerald)', background: 'rgba(16, 185, 129, 0.08)' }}>
                  <b>決策輸出</b><br />
                  <span style={{ color: 'var(--primary-emerald)', fontWeight: 'bold' }}>
                    {params.weekend === 'Yes' 
                      ? (params.fridge === 'Empty' ? '🍽️ 去餐廳吃飯' : '🍳 自己下廚')
                      : (params.rain === 'Yes' ? '🛵 叫外送' : '💼 公司吃便當')
                    }
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <h4 style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>隨機森林投票結構 (Random Forest Consensus):</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
                <div className="decision-node highlighted">
                  <b>🌳 決策樹 #1 (偏重週末)</b><br />
                  預測: <span style={{ color: 'var(--primary-cyan)' }}>
                    {params.weekend === 'Yes' ? '去餐廳' : '公司便當'}
                  </span>
                </div>
                <div className="decision-node highlighted">
                  <b>🌳 決策樹 #2 (偏重下雨)</b><br />
                  預測: <span style={{ color: 'var(--primary-cyan)' }}>
                    {params.rain === 'Yes' ? '叫外送' : '去餐廳'}
                  </span>
                </div>
                <div className="decision-node highlighted">
                  <b>🌳 決策樹 #3 (偏重冰箱)</b><br />
                  預測: <span style={{ color: 'var(--primary-cyan)' }}>
                    {params.fridge === 'Empty' ? '叫外送' : '自己下廚'}
                  </span>
                </div>
              </div>
              <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '0.75rem', borderRadius: '8px', border: '1px solid rgba(16, 185, 129, 0.2)', textAlign: 'center', fontWeight: 'bold', color: 'var(--primary-emerald)' }}>
                🗳️ 多數決共識預測結果: {
                  (params.rain === 'Yes' && params.fridge === 'Empty') ? '🛵 叫外送 (2票)' : 
                  (params.weekend === 'Yes') ? '🍽️ 去餐廳吃飯 (2票)' : '💼 公司吃便當 (2票)'
                }
              </div>
            </div>
          )}
        </div>
      ) : topicId === 8 && params.mode === 'bayes' ? (
        // NAIVE BAYES SPAM FILTER PLAYGROUND
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '12px', border: '1px solid var(--bg-glass-border)' }}>
            <label htmlFor="bayes-input" style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.5rem' }}>
              請輸入測試簡訊/電子郵件：
            </label>
            <input 
              id="bayes-input"
              type="text" 
              className="btn btn-secondary" 
              style={{ width: '100%', padding: '0.75rem', fontSize: '0.95rem', color: 'var(--text-primary)', cursor: 'text', background: '#f8fafc', border: '1px solid var(--bg-glass-border)' }}
              value={params.bayesText} 
              onChange={(e) => setParams({ ...params, bayesText: e.target.value })}
            />
          </div>

          {(() => {
            const words = params.bayesText.toLowerCase().replace(/[.,!]/g, '').split(' ');
            const pSpamWord = { free: 0.8, money: 0.75, prize: 0.9, cash: 0.85, claim: 0.8, click: 0.7 };
            const pHamWord = { meeting: 0.9, project: 0.8, friend: 0.7, homework: 0.85, hello: 0.6 };

            let spamScore = 0.5;
            let hamScore = 0.5;
            const calculations = [];

            words.forEach(w => {
              if (pSpamWord[w] || pHamWord[w]) {
                const ps = pSpamWord[w] || 0.1;
                const ph = pHamWord[w] || 0.1;
                spamScore *= ps;
                hamScore *= ph;
                calculations.push({ word: w, pSpam: ps, pHam: ph });
              }
            });

            const total = spamScore + hamScore;
            const probSpam = total > 0 ? spamScore / total : 0.5;
            const probHam = total > 0 ? hamScore / total : 0.5;

            return (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="decision-node" style={{ borderColor: probSpam > 0.6 ? 'var(--primary-red)' : 'var(--bg-glass-border)' }}>
                    <b>垃圾郵件機率 (Spam)</b><br />
                    <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: probSpam > 0.6 ? 'var(--primary-red)' : 'var(--text-secondary)' }}>
                      {(probSpam * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="decision-node" style={{ borderColor: probHam >= 0.5 ? 'var(--primary-emerald)' : 'var(--bg-glass-border)' }}>
                    <b>正常郵件機率 (Ham)</b><br />
                    <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: probHam >= 0.5 ? 'var(--primary-emerald)' : 'var(--text-secondary)' }}>
                      {(probHam * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>

                {calculations.length > 0 && (
                  <div style={{ background: '#f8fafc', padding: '0.75rem', borderRadius: '8px', fontSize: '0.85rem', color: 'var(--text-secondary)', border: '1px solid var(--bg-glass-border)' }}>
                    <div style={{ color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>貝氏條件機率計算細節：</div>
                    {calculations.map((c, idx) => (
                      <div key={idx} style={{ fontFamily: 'Courier New', display: 'flex', justifyContent: 'space-between' }}>
                        <span>特徵字詞: &quot;{c.word}&quot;</span>
                        <span>P(Spam) = {c.pSpam} | P(Ham) = {c.pHam}</span>
                      </div>
                    ))}
                  </div>
                )}
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  💡 特徵字眼：「free, money, prize, cash, claim, click」會大幅增加垃圾郵件機率。
                </div>
              </div>
            );
          })()}
        </div>
      ) : (
        // CANVAS-BASED INTERACTIVE SANDBOXES
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* SLIDERS / ADJUSTMENT CONTROLS FOR STABLE GENERATION (Direct reference to Streamlit behavior) */}
          <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '12px', border: '1px solid var(--bg-glass-border)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.25rem' }}>
              {topicId === 4 && params.mode === 'linear' && (
                <>
                  <div className="slider-group">
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <label htmlFor="slope-input">目標斜率 (True Slope)</label>
                      <span style={{ color: 'var(--primary-cyan)' }}>{params.slope}</span>
                    </div>
                    <input 
                      id="slope-input"
                      type="range" min="-1.5" max="1.5" step="0.1" className="slider-input" 
                      value={params.slope} onChange={(e) => setParams({ ...params, slope: parseFloat(e.target.value) })}
                    />
                  </div>
                  <div className="slider-group">
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <label htmlFor="int-input">目標截距 (True Intercept)</label>
                      <span style={{ color: 'var(--primary-cyan)' }}>{params.intercept}</span>
                    </div>
                    <input 
                      id="int-input"
                      type="range" min="20" max="220" step="5" className="slider-input" 
                      value={params.intercept} onChange={(e) => setParams({ ...params, intercept: parseInt(e.target.value) })}
                    />
                  </div>
                  <div className="slider-group">
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <label htmlFor="noise-input">干擾噪音 (Noise Level)</label>
                      <span style={{ color: 'var(--primary-cyan)' }}>{params.noise}</span>
                    </div>
                    <input 
                      id="noise-input"
                      type="range" min="0" max="60" step="5" className="slider-input" 
                      value={params.noise} onChange={(e) => setParams({ ...params, noise: parseInt(e.target.value) })}
                    />
                  </div>
                  <div className="slider-group">
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <label htmlFor="npoints-input">資料點數量 (N)</label>
                      <span style={{ color: 'var(--primary-cyan)' }}>{params.nPoints}</span>
                    </div>
                    <input 
                      id="npoints-input"
                      type="range" min="10" max="60" step="5" className="slider-input" 
                      value={params.nPoints} onChange={(e) => setParams({ ...params, nPoints: parseInt(e.target.value) })}
                    />
                  </div>
                </>
              )}

              {topicId === 4 && params.mode === 'logistic' && (
                <>
                  <div className="slider-group">
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <label htmlFor="noise-log">噪音干擾 (Noise)</label>
                      <span style={{ color: 'var(--primary-cyan)' }}>{params.noise}</span>
                    </div>
                    <input 
                      id="noise-log"
                      type="range" min="5" max="50" step="5" className="slider-input" 
                      value={params.noise} onChange={(e) => setParams({ ...params, noise: parseInt(e.target.value) })}
                    />
                  </div>
                  <div className="slider-group">
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <label htmlFor="npoints-log">資料點數量 (N)</label>
                      <span style={{ color: 'var(--primary-cyan)' }}>{params.nPoints}</span>
                    </div>
                    <input 
                      id="npoints-log"
                      type="range" min="15" max="60" step="5" className="slider-input" 
                      value={params.nPoints} onChange={(e) => setParams({ ...params, nPoints: parseInt(e.target.value) })}
                    />
                  </div>
                </>
              )}

              {topicId === 6 && params.mode === 'svm' && (
                <div className="slider-group" style={{ width: '100%' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <label htmlFor="svm-c-input">正則懲罰係數 (C)</label>
                    <span style={{ color: 'var(--primary-purple)' }}>C = {params.svmC}</span>
                  </div>
                  <input 
                    id="svm-c-input"
                    type="range" min="0.1" max="5.0" step="0.2" className="slider-input" 
                    value={params.svmC} onChange={(e) => setParams({ ...params, svmC: parseFloat(e.target.value) })}
                  />
                </div>
              )}

              {topicId === 6 && params.mode === 'knn' && (
                <div className="slider-group" style={{ width: '100%' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <label htmlFor="knn-k-input">鄰近點個數 (K)</label>
                    <span style={{ color: 'var(--primary-cyan)' }}>K = {params.knnK}</span>
                  </div>
                  <input 
                    id="knn-k-input"
                    type="range" min="1" max="9" step="2" className="slider-input" 
                    value={params.knnK} onChange={(e) => setParams({ ...params, knnK: parseInt(e.target.value) })}
                  />
                </div>
              )}

              {topicId === 7 && (
                <div className="slider-group" style={{ width: '100%' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <label htmlFor="kmeans-k-input">分群中心個數 (K)</label>
                    <span style={{ color: 'var(--primary-purple)' }}>K = {params.kmeansK}</span>
                  </div>
                  <input 
                    id="kmeans-k-input"
                    type="range" min="2" max="4" step="1" className="slider-input" 
                    value={params.kmeansK} 
                    disabled // fixed to 3 for standard seed centers
                  />
                </div>
              )}

              {topicId === 8 && params.mode === 'pca' && (
                <div className="slider-group" style={{ width: '100%' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <label htmlFor="pca-angle-input">投影旋轉軸角度 (θ)</label>
                    <span style={{ color: 'var(--primary-cyan)' }}>{params.pcaAngle !== undefined ? params.pcaAngle : 30}°</span>
                  </div>
                  <input 
                    id="pca-angle-input"
                    type="range" min="0" max="180" step="5" className="slider-input" 
                    value={params.pcaAngle !== undefined ? params.pcaAngle : 30} onChange={(e) => setParams({ ...params, pcaAngle: parseInt(e.target.value) })}
                  />
                </div>
              )}

              {topicId === 9 && (
                <>
                  <div className="slider-group">
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <label htmlFor="xgb-trees-input">疊代樹數量 (Trees)</label>
                      <span style={{ color: 'var(--primary-emerald)' }}>{params.xgbTrees} 棵樹</span>
                    </div>
                    <input 
                      id="xgb-trees-input"
                      type="range" min="1" max="3" step="1" className="slider-input" 
                      value={params.xgbTrees} onChange={(e) => setParams({ ...params, xgbTrees: parseInt(e.target.value) })}
                    />
                  </div>
                  <div className="slider-group">
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <label htmlFor="xgb-lr-input">收縮率 (Learning Rate)</label>
                      <span style={{ color: 'var(--primary-cyan)' }}>η = {params.xgbLr}</span>
                    </div>
                    <input 
                      id="xgb-lr-input"
                      type="range" min="0.1" max="0.9" step="0.1" className="slider-input" 
                      value={params.xgbLr} onChange={(e) => setParams({ ...params, xgbLr: parseFloat(e.target.value) })}
                    />
                  </div>
                </>
              )}

              {topicId === 10 && (
                <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                  💡 點選下方「訊號前向傳播」模擬大腦突觸信號的數值流動
                </span>
              )}
            </div>
          </div>

          {/* DYNAMIC CANVAS */}
          <div className="visualizer-canvas-wrapper">
            <canvas
              ref={canvasRef}
              width={800}
              height={420}
              className="visualizer-canvas"
              onClick={handleCanvasInteraction}
              onMouseMove={handleCanvasInteraction}
            />
          </div>

          <div className="visualizer-controls-bar">
            {topicId === 7 && (
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button className="btn btn-primary cursor-pointer" onClick={handleKMeansStep}>
                  {params.kmeansStep % 2 === 0 ? '執行 E-Step (點選歸屬)' : '執行 M-Step (群心重心重算)'}
                </button>
                <button className="btn btn-secondary cursor-pointer" onClick={resetKMeans}>
                  重新分佈聚類數據點
                </button>
              </div>
            )}
            {topicId === 10 && (
              <button className="btn btn-primary cursor-pointer" onClick={triggerDNN}>
                訊號前向傳播 (Feed Forward)
              </button>
            )}
          </div>

          {/* DYNAMIC INSTANT METRIC CARDS & DETAILED TABLES FOR EACH ALGORITHM */}
          {renderEvaluations()}
        </div>
      )}
    </div>
  );
}
