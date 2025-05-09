# Webhook 處理說明

本專案使用 Firebase Cloud Functions 作為 Finnhub API 的 webhook 接收端。

## 用途
- 接收來自 Finnhub 的即時金融事件（如交易、財報、新聞）。
- 將事件資料依類型存入 Firestore 對應集合。

## 觸發流程
1. Finnhub 發送 HTTP POST 請求至 webhook 端點。
2. Cloud Function 解析請求內容，依 type 分類。
3. 將資料寫入 Firestore 對應集合。

## 安全性建議
- 建議驗證 webhook 來源（如檢查 API 金鑰或簽章）。
- 設定防火牆或存取權限，避免未授權請求。 