# 專案結構與技術棧說明

本專案採用 Dart 3.x、Flutter 3.x、Firebase 3.x 相關套件（firebase_core: ^3.13.0, firebase_auth: ^5.0.0, cloud_firestore: ^5.0.0, cloud_functions: ^5.0.0, firebase_data_connect: ^0.1.4），並結合 Finnhub API（以 dio 串接）為核心技術。架構設計遵循三層分層（表示層、領域層、數據層）與 DDD 思維，強調模組化、可維護性與可測試性。

---

## 目錄結構

- `lib/`：主要程式碼目錄，分為 presentation、domain、data、core 等子目錄。
- `docs/`：專案文件資料夾，包含：
  - `README.md`：文件總覽與導覽
  - `architecture/overview.md`：系統架構概述
  - `architecture/data-flow.md`：數據流向說明
  - `api/finnhub.md`：Finnhub API 整合說明
  - `api/webhooks.md`：Webhook 處理說明
  - `database/firestore.md`：Firestore 結構說明
  - `setup/environment.md`：環境設置步驟
  - `setup/troubleshooting.md`：Flutter Android 建構疑難排解指南
  - `project-structure.md`：專案結構與技術棧說明（本文件）
- 其他如 pubspec.yaml、Firebase 設定檔等。

---

## Android 開發環境需求

### 核心設定
- **Android NDK**: 27.0.12077973（與 Firebase plugins 相容）
- **minSdk**: 23（Firebase plugins 最低需求）
- **Google Services Plugin**: 4.3.15+

### 常見建構問題
遇到 Android 建構問題時，請優先查閱 `setup/troubleshooting.md`，該文件記錄了：
- NDK 版本不相容問題
- Firebase plugins 設定問題
- 網路連線導致的依賴解析失敗
- google-services.json 相關問題

---

## 代碼與文件規範

- 自動生成的單一程式碼檔案應盡量控制在 500 行以內，功能複雜時請拆分模組。
- 代碼必須符合 Dart 3.x、Flutter 3.x、Firebase 3.x 相關套件、Finnhub API 官方文件的語法與最佳實踐。
- 大型功能應拆分為可重用模組，並於 docs/ 文件中補充設計說明。
- 重大程式碼變更時，必須同步更新 docs/ 相關文件，並於 commit message 註明。
- 文件同步更新應納入自動化流程（如 PR、CI），並自動檢查 docs/ 是否有異動。
- 如有架構圖、流程圖，請放於 docs/ 並於相關 md 檔引用。

---

## 文件化與模型指引

- 模型在理解專案架構、API、資料庫設計與開發流程時，應優先參考 docs/ 目錄下的文件內容，並引用具體文件段落。
- 回答專案相關問題時，請以 docs/ 內容為依據，確保資訊正確且與實作同步。
- 遇到環境設置或建構問題時，請優先參考 `setup/environment.md` 和 `setup/troubleshooting.md`。

---

## 文件維護最佳實踐

- 文件應簡潔明確，聚焦於重要與不明顯內容。
- 代碼與文件應及時同步更新。
- 適當使用圖表、流程圖輔助說明。
- 文件內容應假設讀者為半年後的自己或新成員。
- **環境設置變更時，必須同時更新 environment.md 和 troubleshooting.md**。

---

## 代碼行數規範

為提升可讀性與維護性，自動生成的單一程式碼檔案應盡量控制在 500 行以內。若功能複雜，請適當拆分為多個模組或檔案。

---

## 最佳實踐規則

- 保持所有規則簡潔明確，建議每條自動生成的程式碼檔案控制在 500 行以內。
- 所有自動生成的程式碼必須符合 Flutter、Firebase 及 Finnhub API 的最新語法規範與最佳實踐。
- 將大型功能或概念拆分為多個可組合、可重用的模組或規則。
- 當有助於理解時，請提供具體範例或參考檔案。
- 規則內容應避免模糊，務必如同撰寫清楚的內部文件。
- 發現重複內容時，請將其整理為可重用的規則或模組。

---

## 文件化與自動化規範

- 每次重大程式碼變更時，應同步更新 docs 目錄下相關文件，並於 commit message 註明文件已更新。
- 建議將文件同步更新納入自動化流程（如 Pull Request、CI），確保文件與程式碼一致。
- 模型在理解專案架構、API、資料庫設計與開發流程時，應優先參考 docs 目錄下的文件內容，以獲得最完整的專案脈絡與設計依據。
- CI/CD（如 flutter_test.yml）會自動產生並上傳測試覆蓋率（coverage）到 Codecov，請於每次 PR 或合併時檢查覆蓋率變化，確保關鍵邏輯有測試覆蓋。

---

## 版本歷史

- **V.0.0.2** (2025-05-23): 新增 Android 建構疑難排解指南，更新環境設置需求，修復 Firebase plugins NDK 相容性問題 