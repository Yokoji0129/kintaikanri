// ISO形式の日付文字列（例: "2025-07-01T09:00:00"）から「日付部分」だけを取り出す関数
// "T" が含まれていなければそのまま返す（例: "09:00" → "09:00"）
export const formatDay = (isoString) => {
  return isoString?.includes("T") ? isoString.split("T")[0] : isoString;
};

// ISO形式の日付文字列（例: "2025-07-01T09:00:00"）から「時間部分（hh:mm）」だけを取り出す関数
// "T" が含まれていなければそのままisoStringを返す
export const formatTime = (isoString) => {
  return isoString?.includes("T") ? isoString.split("T")[1].slice(0, 5) : isoString;
};
