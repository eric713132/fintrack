# Firestore 數據結構

本專案使用 Firestore 儲存來自 Finnhub API 的即時通知。

## 集合：stockAlerts
存儲股票價格變動通知

| 欄位      | 類型      | 描述                 |
|-----------|-----------|----------------------|
| type      | string    | 通知類型 ("trade")  |
| symbol    | string    | 股票代碼             |
| price     | number    | 股票價格             |
| timestamp | timestamp | 通知時間             |
| rawData   | map       | 原始通知數據         |

## 集合：earningsAlerts
存儲財報公告通知

| 欄位      | 類型      | 描述                 |
|-----------|-----------|----------------------|
| type      | string    | 通知類型 ("earnings")|
| symbol    | string    | 股票代碼             |
| report    | map       | 財報內容             |
| timestamp | timestamp | 通知時間             |
| rawData   | map       | 原始通知數據         |

## 集合：newsAlerts
存儲新聞通知

| 欄位      | 類型      | 描述                 |
|-----------|-----------|----------------------|
| type      | string    | 通知類型 ("news")   |
| symbol    | string    | 股票代碼             |
| headline  | string    | 新聞標題             |
| url       | string    | 新聞連結             |
| timestamp | timestamp | 通知時間             |
| rawData   | map       | 原始通知數據         | 