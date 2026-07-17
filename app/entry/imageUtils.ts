// クライアント側で画像を縮小・圧縮して data URL(base64) に変換するユーティリティ。
// Google Apps Script の受信ペイロード上限を避けつつ、園芸店側のアップロードを軽くするため、
// 送信前にブラウザ内でリサイズ・再エンコードする。

export type PreparedImage = {
  name: string;
  type: string;
  dataUrl: string; // "data:image/jpeg;base64,...."
  bytes: number; // 圧縮後のおおよそのバイト数
};

const MAX_DIMENSION = 1600; // 長辺の最大ピクセル
const JPEG_QUALITY = 0.82;

export function isImageFile(file: File): boolean {
  return file.type.startsWith("image/");
}

/**
 * 画像ファイルを長辺 MAX_DIMENSION 以下に縮小し、JPEG(base64) に変換する。
 * 元がアニメーションGIFなどの場合も1フレームのJPEGになる。
 */
export async function prepareImage(file: File): Promise<PreparedImage> {
  if (!isImageFile(file)) {
    throw new Error(`画像ファイルではありません: ${file.name}`);
  }

  const bitmap = await createImageBitmap(file);
  const { width, height } = bitmap;

  const scale = Math.min(1, MAX_DIMENSION / Math.max(width, height));
  const targetW = Math.round(width * scale);
  const targetH = Math.round(height * scale);

  const canvas = document.createElement("canvas");
  canvas.width = targetW;
  canvas.height = targetH;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    bitmap.close();
    throw new Error("画像の処理に失敗しました。");
  }
  // 透過画像を白背景に載せてJPEG化する（PNG等の透過対策）
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, targetW, targetH);
  ctx.drawImage(bitmap, 0, 0, targetW, targetH);
  bitmap.close();

  const dataUrl = canvas.toDataURL("image/jpeg", JPEG_QUALITY);
  const base64 = dataUrl.split(",")[1] ?? "";
  const bytes = Math.floor((base64.length * 3) / 4);

  return {
    name: file.name.replace(/\.[^.]+$/, "") + ".jpg",
    type: "image/jpeg",
    dataUrl,
    bytes,
  };
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
