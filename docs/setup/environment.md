# 環境設置指南

## 必要條件
- Flutter SDK (3.32.0+)
- Firebase CLI
- Node.js (14+)
- Android SDK (API 35+)
- Android NDK (27.0.12077973+)
- Java JDK (21+)

## Android 開發環境

### Android SDK 設定
- **compileSdk**: 使用 Flutter 預設值
- **minSdk**: 23 (為了相容 Firebase plugins)
- **targetSdk**: 使用 Flutter 預設值
- **NDK 版本**: 27.0.12077973

### Gradle 設定
- **Android Gradle Plugin**: 使用 Flutter 預設版本
- **Google Services Plugin**: 4.3.15+

### 常見問題解決

#### 1. NDK 版本不相容錯誤
如果遇到 `cloud_firestore`、`cloud_functions`、`firebase_app_check` 等 Firebase plugin 的 NDK 版本錯誤：

**解決方法**：
在 `android/app/build.gradle.kts` 中設定：
```kotlin
android {
    ndkVersion = "27.0.12077973"
    // ... 其他設定
}
```

#### 2. minSdk 版本過低
Firebase plugins 需要 minSdk 23 以上：

**解決方法**：
在 `android/app/build.gradle.kts` 中設定：
```kotlin
defaultConfig {
    minSdk = 23
    // ... 其他設定
}
```

#### 3. Google Services Plugin 找不到
**解決方法**：
確保 `android/build.gradle.kts` 包含：
```kotlin
buildscript {
    dependencies {
        classpath("com.google.gms:google-services:4.3.15")
    }
}
```

#### 4. 網路連線問題導致依賴解析失敗
**解決方法**：
1. 確認網路連線正常
2. 執行 `flutter clean`
3. 執行 `flutter pub get`
4. 重新執行 `flutter run`

## Firebase 設定步驟
1. 創建 Firebase 專案
2. 啟用 Firestore 數據庫
3. 升級到 Blaze 計劃
4. 部署 Cloud Functions
5. 下載 `google-services.json` 並放置於 `android/app/` 目錄

## 本地開發建議
- 建議使用 .env 檔案管理 API 金鑰與敏感資訊，並確保 .gitignore 已排除。
- 參考專案 README.md 進行 Flutter 相關依賴安裝。
- 如遇建構問題，請優先嘗試 `flutter clean` 和 `flutter pub get`。

## 版本歷史
- **V.0.0.2** (2025-05-23): 更新 Android 建構環境設定，修復 Firebase plugins NDK 相容性問題 