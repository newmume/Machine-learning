import streamlit as st
import streamlit.components.v1 as components

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

# 嵌入由 Next.js 靜態導出的網頁首頁
# 在 Streamlit 啟用 enableStaticServing = true 時，static/ 資料夾的檔案會掛載於 /app/static/
components.iframe(src="/app/static/index.html", height=950, scrolling=True)
