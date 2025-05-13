// GoogleAppsScript型定義を利用するための参照宣言
/// <reference types="@types/google-apps-script" />

// API Config
const API_KEY =
  PropertiesService.getScriptProperties().getProperty("API_KEY") || "";
// API_KEYが設定されていて空でない場合に自動的に認証を有効にする
const REQUIRE_API_KEY = API_KEY !== "";

// Interface for event response
interface CalendarEvent {
  id: string;
  calendarId: string;
  title: string;
  description: string | null;
  startTime: string;
  endTime: string;
  location: string | null;
  isAllDay: boolean;
  creators?: string[];
  guestList?: {
    email: string;
    name: string;
    status: string;
  }[];
}

// Interface for GET request parameters
interface GetEventsRequest {
  parameter: {
    startDate?: string;
    endDate?: string;
    calendarIds?: string;
    apiKey?: string;
  };
}

/**
 * GET リクエストを処理する関数 - イベント一覧取得
 */
function doGet(e: GetEventsRequest): GoogleAppsScript.Content.TextOutput {
  try {
    // API Key Authentication (if enabled)
    if (REQUIRE_API_KEY && !isValidApiKey(e.parameter.apiKey)) {
      // 注: ステータスコードは Google Apps Script の制限により実際には適用されません
      return sendResponse(403, { error: "Invalid or missing API key" });
    }

    // startDateの必須チェック
    const startDate = e.parameter.startDate;
    if (!startDate) {
      // 注: ステータスコードは Google Apps Script の制限により実際には適用されません
      return sendResponse(400, { error: "Start date is required" });
    }

    // パラメータを取得
    const endDate = e.parameter.endDate;
    const calendarIdsString = e.parameter.calendarIds;

    // calendarIdsをカンマで分割して配列に変換する（存在する場合）
    const calendarIds = calendarIdsString ? calendarIdsString.split(",") : [];

    return handleListEvents({
      startDate,
      endDate,
      calendarIds,
    });
  } catch (error) {
    // 注: ステータスコードは Google Apps Script の制限により実際には適用されません
    return sendResponse(500, {
      error: error instanceof Error ? error.toString() : "Unknown error",
    });
  }
}

/**
 * イベント一覧を取得する関数
 */
function handleListEvents(request: {
  startDate: string;
  endDate?: string;
  calendarIds?: string[];
}): GoogleAppsScript.Content.TextOutput {
  // 日付範囲パラメータを取得
  const startDate = new Date(request.startDate);

  // endDateが未指定の場合は、開始日の1日分のみ（23:59:59まで）を設定
  const endDate = request.endDate
    ? new Date(request.endDate)
    : new Date(
        startDate.getFullYear(),
        startDate.getMonth(),
        startDate.getDate(),
        23,
        59,
        59
      );

  // カレンダーIDによるフィルタリング（配列として受け取る）
  const calendarIds = request.calendarIds || [];
  let events: GoogleAppsScript.Calendar.CalendarEvent[] = [];

  if (calendarIds.length > 0) {
    // 指定されたカレンダーIDからイベントを取得
    for (const calendarId of calendarIds) {
      const calendar = CalendarApp.getCalendarById(calendarId);
      if (!calendar) {
        continue; // カレンダーが見つからない場合はスキップ
      }
      const calendarEvents = calendar.getEvents(startDate, endDate);
      events = events.concat(calendarEvents);
    }
  } else {
    // カレンダーIDが指定されていない場合は全カレンダーから取得
    const calendars = CalendarApp.getAllCalendars();

    for (const calendar of calendars) {
      const calendarEvents = calendar.getEvents(startDate, endDate);
      events = events.concat(calendarEvents);
    }
  }

  // イベントを簡略化した形式に変換（calendarIdフィールドを追加）
  const eventList = events.map((event) => formatEvent(event));

  // 注: ステータスコードは Google Apps Script の制限により実際には適用されません
  return sendResponse(200, { events: eventList });
}

/**
 * イベントを整形する関数
 */
function formatEvent(
  event: GoogleAppsScript.Calendar.CalendarEvent
): CalendarEvent {
  return {
    id: event.getId(),
    calendarId: event.getOriginalCalendarId(),
    title: event.getTitle(),
    description: event.getDescription(),
    startTime: event.getStartTime().toISOString(),
    endTime: event.getEndTime().toISOString(),
    location: event.getLocation(),
    isAllDay: event.isAllDayEvent(),
    creators: event.getCreators(),
    guestList: event.getGuestList().map((guest) => ({
      email: guest.getEmail(),
      name: guest.getName(),
      status: guest.getStatus(),
    })),
  };
}

/**
 * API認証キーを検証する関数
 */
function isValidApiKey(key?: string): boolean {
  return key === API_KEY;
}

/**
 * JSON応答を送信する関数
 * 注意: Google Apps Scriptの制限により、実際にはHTTPステータスコードを設定できず、
 * すべてのレスポンスは200または500（システムエラー時）で返されます。
 * エラー情報はJSONレスポンスボディに含めて返します。
 */
function sendResponse(
  statusCode: number,
  body: any
): GoogleAppsScript.Content.TextOutput {
  // ステータスコードをログに記録
  console.log(
    `Response status code: ${statusCode}, body: ${JSON.stringify(body)}`
  );

  // Google Apps Scriptの制限によりHTTPステータスコードは設定できませんが
  // レスポンスボディはJSON形式で返します
  return ContentService.createTextOutput(JSON.stringify(body)).setMimeType(
    ContentService.MimeType.JSON
  );
}

/**
 * API認証キーを設定する関数
 */
function setupApiKey(key: string): { success: boolean; message: string } {
  PropertiesService.getScriptProperties().setProperty("API_KEY", key);
  return { success: true, message: "API key has been set" };
}
