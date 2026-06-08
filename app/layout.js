import "./globals.css";

export const metadata = {
  title: "機器學習前十大學習法 - 互動式 AI 學習平台",
  description: "結合前端 Face API 情緒偵測與 Canvas 即時數學模擬，帶你動態探索機器學習最經典的十大核心演算法！",
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-TW">
      <body>
        {children}
      </body>
    </html>
  );
}
