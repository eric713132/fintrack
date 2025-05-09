# 數據流向說明

本專案的數據流向如下：

1. **用戶操作** → 觸發 UI 畫面 (presentation)
2. **UI 畫面** → 透過 Provider 進行狀態管理
3. **Provider** → 呼叫 UseCase（用例）執行業務邏輯
4. **UseCase** → 透過 Repository（存儲庫）存取資料
5. **Repository** → 呼叫 DataSource（資料來源）
6. **DataSource** → 與 Firestore 或 Finnhub API 進行資料交換
7. **資料變更** → Provider 監聽並更新 UI 畫面

此流程確保資料流向單一、可追蹤，並有助於維護與測試。 