# Finnhub API 整合

本專案透過 Firebase Cloud Functions 整合 Finnhub API，接收即時金融數據通知。

## Webhook 端點
- URL: https://finnhubwebhook-qxzub55zfq-uc.a.run.app
- 方法: POST
- 內容類型: application/json

## 請求格式
```json
{
  "type": "trade",
  "symbol": "AAPL",
  "price": 150.25
}
```

## 支援的通知類型
- `trade`: 交易通知
- `earnings`: 財報公告
- `news`: 相關新聞

## 數據存儲
所有接收到的通知將存儲於 Firestore 下列集合：
- `stockAlerts`
- `earningsAlerts`
- `newsAlerts` 