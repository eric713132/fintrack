# 系統架構概述

本專案採用三層架構設計，結合 Flutter、Firebase 與 Finnhub API：

1. **表示層 (lib/presentation/)**：負責 UI 元件、畫面與用戶互動，並透過 Provider 管理狀態。
2. **領域層 (lib/domain/)**：負責業務邏輯、實體、用例與服務，確保商業規則與資料一致性。
3. **數據層 (lib/data/)**：負責資料存取、API 串接（如 Finnhub）、Firebase 資料庫操作與資料模型轉換。

### 技術棧
- **Flutter**：跨平台 UI 框架，負責前端開發。
- **Firebase**：提供認證、Firestore、雲端函數等後端服務。
- **Finnhub API**：提供即時金融數據，透過 webhook 與雲端函數整合。

此分層設計有助於維持程式碼的模組化、可維護性與擴充性。 