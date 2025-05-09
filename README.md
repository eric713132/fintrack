# fintrack

一個以 Flutter、Firebase 與 Finnhub API 打造的現代化財金記帳應用。

## 專案簡介

- 跨平台（iOS/Android）財金記帳 App
- 整合 Firebase 雲端服務與 Finnhub 金融數據
- 採用三層分層架構，易於維護與擴充

## 快速啟動

1. 安裝 Flutter SDK（3.0.0 以上）
2. 參考 [docs/setup/environment.md](docs/setup/environment.md) 完成環境設置
3. 執行 `flutter pub get` 安裝依賴
4. 執行 `flutter run` 啟動應用

## 主要技術棧
- Dart 3.x
- Flutter 3.x
- Firebase（firebase_core: ^3.13.0, firebase_auth: ^5.0.0, cloud_firestore: ^5.0.0, cloud_functions: ^5.0.0, firebase_data_connect: ^0.1.4）
- Finnhub API（金融數據串接）

## 文件化導覽

本專案詳細的架構、API、資料庫與環境設置說明，請參閱 [docs/ 文件資料夾](docs/README.md)。
