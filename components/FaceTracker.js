'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as faceapi from '@vladmandic/face-api';

export default function FaceTracker({ onExpressionChange, onFacePresenceChange }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [cameraActive, setCameraActive] = useState(false);
  const [error, setError] = useState(null);
  const [detectedEmotion, setDetectedEmotion] = useState('Neutral');
  const [simulatedEmotion, setSimulatedEmotion] = useState('');
  const [useSimulator, setUseSimulator] = useState(false);
  
  // Track last sent state to avoid repetitive state updates
  const lastEmotionRef = useRef('neutral');
  const lastPresenceRef = useRef(true);

  // Initialize models and camera
  useEffect(() => {
    let active = true;
    let stream = null;
    let animationId = null;

    async function setupFaceApi() {
      try {
        setLoading(true);
        // Load weights from public/models
        await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
        await faceapi.nets.faceExpressionNet.loadFromUri('/models');
        
        if (!active) return;
        setLoading(false);

        // Start video
        stream = await navigator.mediaDevices.getUserMedia({
          video: { width: 320, height: 240, facingMode: 'user' }
        });

        if (videoRef.current && active) {
          videoRef.current.srcObject = stream;
          setCameraActive(true);
          startDetectionLoop();
        }
      } catch (err) {
        console.error('Failed to initialize Face-API or Camera:', err);
        if (active) {
          setError(err.message || '無法開啟相機，切換為模擬器模式');
          setLoading(false);
          setUseSimulator(true);
        }
      }
    }

    function startDetectionLoop() {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      if (!video || !canvas) return;

      const displaySize = { width: 320, height: 240 };
      faceapi.matchDimensions(canvas, displaySize);

      const detect = async () => {
        if (!active || video.paused || video.ended || useSimulator) return;

        try {
          // Detect single face and expressions
          const detection = await faceapi.detectSingleFace(
            video,
            new faceapi.TinyFaceDetectorOptions({ inputSize: 160, scoreThreshold: 0.5 })
          ).withFaceExpressions();

          if (detection && canvas) {
            const ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const resizedDetections = faceapi.resizeResults(detection, displaySize);
            
            // Draw box
            const box = resizedDetections.detection.box;
            ctx.strokeStyle = '#CE0E2D';
            ctx.lineWidth = 2;
            ctx.strokeRect(box.x, box.y, box.width, box.height);

            // Find dominant expression
            let dominantExpression = 'neutral';
            let maxProb = 0;
            if (resizedDetections.expressions) {
              Object.entries(resizedDetections.expressions).forEach(([expr, prob]) => {
                if (prob > maxProb) {
                  maxProb = prob;
                  dominantExpression = expr;
                }
              });
            }

            // Map and update state
            let displayExpr = 'Neutral';
            if (dominantExpression === 'happy' && maxProb > 0.6) displayExpr = 'Happy';
            else if ((dominantExpression === 'sad' || dominantExpression === 'angry' || dominantExpression === 'fearful') && maxProb > 0.4) displayExpr = 'Confused';
            else if (dominantExpression === 'surprised' && maxProb > 0.5) displayExpr = 'Surprised';

            setDetectedEmotion(displayExpr);
            
            // Callbacks
            if (lastEmotionRef.current !== displayExpr) {
              lastEmotionRef.current = displayExpr;
              onExpressionChange(displayExpr);
            }

            if (!lastPresenceRef.current) {
              lastPresenceRef.current = true;
              onFacePresenceChange(true);
            }

            // Draw label
            ctx.fillStyle = '#CE0E2D';
            ctx.font = '12px Outfit';
            ctx.fillText(
              `${displayExpr} (${Math.round(maxProb * 100)}%)`,
              box.x,
              box.y > 15 ? box.y - 5 : box.y + 15
            );
          } else {
            // No face detected
            if (lastPresenceRef.current) {
              lastPresenceRef.current = false;
              onFacePresenceChange(false);
            }
          }
        } catch (e) {
          console.error(e);
        }

        // Loop next frame
        if (active && !useSimulator) {
          animationId = requestAnimationFrame(detect);
        }
      };

      animationId = requestAnimationFrame(detect);
    }

    setupFaceApi();

    return () => {
      active = false;
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [useSimulator]);

  // Handle Simulator State Changes
  const handleSimulatorSelect = (e) => {
    const value = e.target.value;
    setSimulatedEmotion(value);
    onExpressionChange(value || 'Neutral');
    onFacePresenceChange(value !== 'Away');
  };

  return (
    <div className="glass-panel face-tracker-card">
      <div className="narration-header" style={{ width: '100%' }}>
        <span>AI 學習專注力偵測</span>
        <button 
          className="btn btn-secondary" 
          style={{ padding: '0.15rem 0.5rem', fontSize: '0.7rem' }}
          onClick={() => setUseSimulator(!useSimulator)}
        >
          {useSimulator ? '切換相機' : '切換模擬器'}
        </button>
      </div>

      {!useSimulator ? (
        <>
          <div className="video-container">
            {loading && (
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)', background: 'rgba(0,0,0,0.8)', fontSize: '0.85rem' }}>
                <span className="indicator-dot active" style={{ marginRight: '8px' }}></span>
                載入 AI 模型中...
              </div>
            )}
            {error && !loading && (
              <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '1rem', color: '#fca5a5', background: 'rgba(0,0,0,0.8)', fontSize: '0.8rem', textAlign: 'center' }}>
                <p>⚠️ {error}</p>
                <p style={{ marginTop: '0.5rem', color: 'var(--text-secondary)' }}>已為您自動切換至模擬器模式</p>
              </div>
            )}
            <video 
              ref={videoRef} 
              autoPlay 
              muted 
              playsInline 
              className="webcam-video"
            />
            <canvas ref={canvasRef} className="overlay-canvas" />
          </div>

          <div className="camera-status-bar">
            <div className="status-indicator">
              <span className={`indicator-dot ${cameraActive ? 'active' : ''}`}></span>
              <span>{cameraActive ? '相機與表情偵測中' : '相機未啟動'}</span>
            </div>
            <span style={{ color: 'var(--primary-cyan)', fontWeight: '600' }}>
              偵測情緒：{detectedEmotion === 'Neutral' ? '專注 (Neutral)' : detectedEmotion === 'Happy' ? '興奮 (Happy)' : detectedEmotion === 'Confused' ? '困惑 (Confused)' : '驚奇 (Surprised)'}
            </span>
          </div>
        </>
      ) : (
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '0.75rem', padding: '0.5rem 0' }}>
          <div style={{ background: 'rgba(206, 14, 45, 0.05)', border: '1px solid rgba(206, 14, 45, 0.15)', padding: '0.75rem', borderRadius: '8px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            💡 <b>情緒模擬模式已啟用</b><br />
            如果您的裝置沒有視訊鏡頭、未授權相機，或是想快速測試不同的學習適應效果，可以手動模擬狀態。
          </div>
          
          <div className="slider-group">
            <label htmlFor="emotion-select">手動設定模擬狀態：</label>
            <select 
              id="emotion-select"
              className="btn btn-secondary" 
              style={{ width: '100%', padding: '0.5rem', background: 'rgba(255,255,255,0.05)', color: '#fff' }}
              value={simulatedEmotion}
              onChange={handleSimulatorSelect}
            >
              <option value="">正常專注 (Neutral)</option>
              <option value="Confused">感到困惑 (Confused / Frowned)</option>
              <option value="Surprised">感到驚奇 (Surprised / Smiley)</option>
              <option value="Happy">感到滿意 (Happy / Excited)</option>
              <option value="Away">短暫離開 (Face Not Detected)</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
}
