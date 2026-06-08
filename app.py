import os
import mimetypes
import streamlit as st
import streamlit.components.v1 as components

# 確保 JS 和 CSS 的 MIME 類型正確，避免瀏覽器因 nosniff 安全設定而拒絕執行
mimetypes.add_type('application/javascript', '.js')
mimetypes.add_type('text/css', '.css')

st.set_page_config(
    page_title="機器學習前十大學習法 互動教學平台",
    page_icon="🤖",
    layout="wide",
    initial_sidebar_state="collapsed"
)

# 隱藏 Streamlit 預設元件與邊距，以滿版呈現
st.markdown("""
    <style>
    #MainMenu {visibility: hidden;}
    footer {visibility: hidden;}
    header {visibility: hidden;}
    .block-container {
        padding-top: 0px !important;
        padding-bottom: 0px !important;
        padding-left: 0px !important;
        padding-right: 0px !important;
    }
    iframe {
        border: none !important;
    }
    </style>
""", unsafe_allow_html=True)

# 取得靜態網頁資料夾的絕對路徑
root_dir = os.path.dirname(os.path.abspath(__file__))
build_dir = os.path.join(root_dir, "static")

# 使用 Streamlit 自定義元件服務，這會啟動內建的靜態檔案伺服器並正確設定 MIME 類型
ml_platform = components.declare_component("ml_platform", path=build_dir)

# 渲染網頁並設定高度
ml_platform(height=950)
