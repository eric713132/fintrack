/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import {onRequest} from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import * as admin from "firebase-admin";

// 初始化 Firebase Admin SDK
admin.initializeApp();

// 資料庫參考
const db = admin.firestore();

/**
 * Finnhub 交易數據格式
 */
interface TradingData {
  type: string;
  symbol: string;
  price: number;
  [key: string]: unknown;
}

/**
 * Finnhub 財報數據格式
 */
interface EarningsData {
  type: string;
  symbol: string;
  eps?: number;
  epsEstimated?: number;
  revenue?: number;
  revenueEstimated?: number;
  quarter?: string;
  [key: string]: unknown;
}

/**
 * Finnhub 新聞數據格式
 */
interface NewsData {
  type: string;
  symbol: string;
  headline?: string;
  summary?: string;
  url?: string;
  [key: string]: unknown;
}

/**
 * Finnhub Webhook 接收器
 *
 * 此函數用於接收來自 Finnhub 的 webhook 通知，例如：
 * - 價格警報
 * - 財報公告
 * - 交易訊號
 */
export const finnhubWebhook = onRequest(async (request, response) => {
  // 記錄接收到的 webhook
  logger.info("接收到 Finnhub webhook", {
    method: request.method,
    contentType: request.headers["content-type"],
    payload: request.body,
  });

  // 確保是 POST 請求
  if (request.method !== "POST") {
    logger.warn("收到非 POST 請求", {method: request.method});
    response.status(405).send("僅接受 POST 請求");
    return;
  }

  try {
    // 從請求中獲取數據
    const webhookData = request.body;

    // 確保數據格式正確
    if (!webhookData || !webhookData.type) {
      logger.error("無效的 webhook 數據", {body: request.body});
      response.status(400).send("無效的請求數據");
      return;
    }

    // 根據不同類型的通知進行處理
    switch (webhookData.type) {
    case "trade":
      // 處理交易數據
      await handleTradeAlert(webhookData);
      break;

    case "earnings":
      // 處理財報數據
      await handleEarningsAlert(webhookData);
      break;

    case "news":
      // 處理新聞數據
      await handleNewsAlert(webhookData);
      break;

    default:
      logger.info("未處理的通知類型", {type: webhookData.type});
    }

    // 回應 Finnhub 成功接收
    response.status(200).send("通知已處理");
  } catch (error) {
    logger.error("處理 webhook 時發生錯誤", {error});
    response.status(500).send("處理請求時發生錯誤");
  }
});

/**
 * 處理交易警報
 * @param {TradingData} data - 來自 Finnhub 的交易數據
 */
async function handleTradeAlert(data: TradingData) {
  logger.info("處理交易警報", {data});

  try {
    // 將交易數據存入 Firestore
    await db.collection("stockAlerts").add({
      type: "trade",
      symbol: data.symbol,
      price: data.price,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
      rawData: data,
    });

    logger.info("交易警報已儲存", {symbol: data.symbol});
  } catch (error) {
    logger.error("儲存交易警報失敗", {error});
    throw error;
  }
}

/**
 * 處理財報警報
 * @param {EarningsData} data - 來自 Finnhub 的財報數據
 */
async function handleEarningsAlert(data: EarningsData) {
  logger.info("處理財報警報", {data});

  try {
    // 將財報數據存入 Firestore
    await db.collection("earningsAlerts").add({
      type: "earnings",
      symbol: data.symbol,
      eps: data.eps,
      epsEstimated: data.epsEstimated,
      revenue: data.revenue,
      revenueEstimated: data.revenueEstimated,
      quarter: data.quarter,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
      rawData: data,
    });

    logger.info("財報警報已儲存", {symbol: data.symbol});
  } catch (error) {
    logger.error("儲存財報警報失敗", {error});
    throw error;
  }
}

/**
 * 處理新聞警報
 * @param {NewsData} data - 來自 Finnhub 的新聞數據
 */
async function handleNewsAlert(data: NewsData) {
  logger.info("處理新聞警報", {data});

  try {
    // 將新聞數據存入 Firestore
    await db.collection("newsAlerts").add({
      type: "news",
      symbol: data.symbol,
      headline: data.headline,
      summary: data.summary,
      url: data.url,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
      rawData: data,
    });

    logger.info("新聞警報已儲存", {symbol: data.symbol});
  } catch (error) {
    logger.error("儲存新聞警報失敗", {error});
    throw error;
  }
}

/**
 * 基本的 Hello World 函數，用於測試 Firebase Functions 是否正常運作
 */
export const helloWorld = onRequest((request, response) => {
  logger.info("Hello 函數已呼叫", {structuredData: true});
  response.send("Hello from Firebase!");
});
