# Flutter Android 建構疑難排解

## 概述
本文件記錄了 FinTrack 專案在 Android 平台上的常見建構問題及其解決方案。

## 問題 1: NDK 版本不相容

### 錯誤訊息
```
NDK version '25.1.8937393' used by this project is not compatible with the NDK version '27.0.12077973' requested by plugin :cloud_firestore
```

### 原因分析
- 專案原本設定的 NDK 版本 `25.1.8937393` 與 Firebase plugins（如 `cloud_firestore`、`cloud_functions`、`firebase_app_check`）所需的 NDK 版本不相容
- Firebase plugins 需要較新的 NDK 版本

### 解決方法
1. 在 `android/app/build.gradle.kts` 中更新 NDK 版本：
```kotlin
android {
    ndkVersion = "27.0.12077973"
    // ... 其他設定
}
```

## 問題 2: minSdkVersion 過低

### 錯誤訊息
```
Minimum supported Gradle version is X.X. Current version is Y.Y.
```

### 原因分析
Firebase plugins 需要較高的 minimum SDK 版本才能正常運作

### 解決方法
在 `android/app/build.gradle.kts` 中設定：
```kotlin
defaultConfig {
    minSdk = 23
    targetSdk = flutter.targetSdkVersion
    // ... 其他設定
}
```

## 問題 3: Google Services Plugin 找不到

### 錯誤訊息
```
Plugin [id: 'com.google.gms.google-services'] was not found in any of the following sources
```

### 原因分析
- `android/build.gradle.kts` 缺少 Google Services plugin 的 classpath 設定
- Firebase 相關功能需要此 plugin 才能運作

### 解決方法
1. 確保 `android/build.gradle.kts` 包含：
```kotlin
buildscript {
    repositories {
        google()
        mavenCentral()
    }
    dependencies {
        classpath("com.google.gms:google-services:4.3.15")
    }
}
```

2. 確保 `android/app/build.gradle.kts` 包含：
```kotlin
plugins {
    id("com.android.application")
    id("com.google.gms.google-services")
    id("kotlin-android")
    id("dev.flutter.flutter-gradle-plugin")
}
```

## 問題 4: google-services.json 遺失

### 錯誤訊息
```
File google-services.json is missing. The Google Services Plugin cannot function without it.
```

### 原因分析
Firebase 設定檔案遺失或放置位置錯誤

### 解決方法
1. 從 Firebase Console 下載 `google-services.json`
2. 將檔案放置於 `android/app/` 目錄下
3. 確保檔案名稱正確為 `google-services.json`

## 問題 5: 網路連線導致的依賴解析失敗

### 錯誤訊息
```
Could not resolve com.android.tools.lint:lint-gradle:31.7.3
無法識別這台主機。 (dl.google.com)
```

### 原因分析
- 網路連線問題
- Gradle 快取損壞
- DNS 解析問題

### 解決方法
1. **檢查網路連線**：
```powershell
ping dl.google.com
ping repo.maven.apache.org
```

2. **清理 Gradle 快取**：
```bash
flutter clean
```

3. **重新獲取依賴**：
```bash
flutter pub get
```

4. **重新執行建構**：
```bash
flutter run
```

## 問題 6: package identifier or launch activity not found

### 錯誤訊息
```
No application found for TargetPlatform.android_x64
package identifier or launch activity not found
```

### 原因分析
- Android 設定檔案不完整或損壞
- Flutter 專案的 Android 部分需要重新生成

### 解決方法
1. **重新生成 Android 設定**：
```bash
flutter create .
```

2. **如果問題持續，完全重建 Android 資料夾**：
```powershell
Remove-Item -Recurse -Force android
flutter create .
```

3. **重新套用必要的設定**（NDK 版本、minSdk 等）

## 通用解決步驟

當遇到任何建構問題時，建議按以下順序嘗試：

1. **清理專案**：
```bash
flutter clean
```

2. **重新獲取依賴**：
```bash
flutter pub get
```

3. **檢查 Flutter 環境**：
```bash
flutter doctor -v
```

4. **重新執行建構**：
```bash
flutter run
```

5. **如果問題持續，重新生成 Android 設定**：
```bash
flutter create .
```

## 環境資訊

### 成功建構環境
- **Flutter**: 3.32.0 (stable channel)
- **Dart**: 3.8.0
- **Android SDK**: 35.0.1
- **Android NDK**: 27.0.12077973
- **Java**: OpenJDK 21.0.6
- **Google Services Plugin**: 4.3.15

### 作業系統
- Windows 11 (版本 26100.4061)
- PowerShell 5.1

## 版本歷史
- **V.0.0.2** (2025-05-23): 初版，記錄 Firebase plugins NDK 相容性問題解決過程 