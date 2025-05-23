# 文件資料夾導覽

本資料夾收錄本專案的架構、API、資料庫、環境設置等詳細說明，協助開發者快速查閱與維護。

## 文件結構

- **architecture/overview.md**：系統三層分層與技術棧概述
- **architecture/data-flow.md**：數據流向與資料傳遞流程
- **api/finnhub.md**：Finnhub API 串接與 webhook 格式
- **api/webhooks.md**：Webhook 處理流程與安全建議
- **database/firestore.md**：Firestore 各集合欄位設計
- **setup/environment.md**：本地與雲端環境設置步驟
- **setup/troubleshooting.md**：Flutter Android 建構疑難排解指南
- **flutter_test.yml**：自動執行 Flutter 測試、靜態分析，並產生測試覆蓋率（coverage），自動上傳到 Codecov，方便在 PR、Actions 或 Codecov 網站查閱覆蓋率報告。

## 查閱建議
- 若需理解專案架構，請先看 architecture/overview.md
- 若需查詢 API 串接或 webhook，請看 api/ 相關文件
- 若需了解資料庫設計，請看 database/firestore.md
- 若需設置開發環境，請看 setup/environment.md
- **若遇到 Android 建構問題，請優先查閱 setup/troubleshooting.md**
- 若需檢查測試覆蓋率，請參考 workflow log 或 Codecov 網站（https://app.codecov.io/）。

如有架構圖、流程圖，亦會附於對應 md 檔中。

## 版本歷史
- **V.0.0.2** (2025-05-23): 新增 Android 建構疑難排解指南，更新環境設置需求 