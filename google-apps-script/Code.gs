/**
 * 植欲マップ 掲載情報フォーム — 受信用 Google Apps Script(Webアプリ)
 *
 * 役割:
 *   - Next.js の /api/shop-entry から送られる JSON を受け取る
 *   - スプレッドシートに1行追記する
 *   - 送られた写真(base64)を Google ドライブのフォルダに保存し、そのURLを記録する
 *
 * セットアップ手順は docs/entry-form-setup.md を参照。
 *
 * スクリプトプロパティ(プロジェクトの設定 → スクリプト プロパティ):
 *   SHEET_ID        … 記録先スプレッドシートのID(必須)
 *   DRIVE_FOLDER_ID … 写真を保存する親フォルダのID(必須)
 *   SHARED_SECRET   … Next.js の ENTRY_SHARED_SECRET と同じ値(任意・推奨)
 */

var LISTING_LABELS = {
  listed: '掲載済み',
  not_listed: '未掲載',
  unknown: 'わからない',
};

var FLYER_LABELS = {
  yes: 'はい、置ける',
  consider: '検討したい',
  no: '見送る',
};

function doPost(e) {
  try {
    var body = JSON.parse(e.postData.contents);

    // 簡易トークン照合(設定されている場合のみ)
    var expected = PropertiesService.getScriptProperties().getProperty('SHARED_SECRET');
    if (expected && body.secret !== expected) {
      return jsonOutput({ ok: false, message: 'unauthorized' });
    }

    var props = PropertiesService.getScriptProperties();
    var sheetId = props.getProperty('SHEET_ID');
    var folderId = props.getProperty('DRIVE_FOLDER_ID');

    // 店舗ごとのサブフォルダを作成して写真を保存
    var parentFolder = DriveApp.getFolderById(folderId);
    var stamp = Utilities.formatDate(new Date(), 'Asia/Tokyo', 'yyyyMMdd-HHmmss');
    var subFolder = parentFolder.createFolder(stamp + ' ' + (body.shopName || 'no-name'));

    var shopPhotoUrls = [];
    (body.shopPhotos || []).forEach(function (img, i) {
      var url = saveImage_(subFolder, img, 'shop-' + (i + 1));
      if (url) shopPhotoUrls.push(url);
    });

    var ownerPhotoUrl = '';
    if (body.ownerPhoto) {
      ownerPhotoUrl = saveImage_(subFolder, body.ownerPhoto, 'owner') || '';
    }

    // スプレッドシートに追記
    var sheet = SpreadsheetApp.openById(sheetId).getSheets()[0];
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        '受信日時', '店舗名', '所在地', '掲載状況', 'ご担当者', 'メール',
        'ひとことコメント', 'その他連絡', 'チラシ設置', '店舗写真', 'オーナー写真', '保存フォルダ',
      ]);
    }
    sheet.appendRow([
      Utilities.formatDate(new Date(), 'Asia/Tokyo', 'yyyy/MM/dd HH:mm:ss'),
      body.shopName || '',
      body.location || '',
      LISTING_LABELS[body.listingStatus] || body.listingStatus || '',
      body.ownerName || '',
      body.email || '',
      body.comment || '',
      body.note || '',
      FLYER_LABELS[body.flyer] || body.flyer || '',
      shopPhotoUrls.join('\n'),
      ownerPhotoUrl,
      subFolder.getUrl(),
    ]);

    return jsonOutput({ ok: true });
  } catch (err) {
    return jsonOutput({ ok: false, message: String(err) });
  }
}

/** data URL(base64) を Drive フォルダに画像として保存し、閲覧URLを返す */
function saveImage_(folder, img, baseName) {
  if (!img || !img.dataUrl) return '';
  var match = /^data:([^;]+);base64,(.*)$/.exec(img.dataUrl);
  if (!match) return '';
  var contentType = match[1];
  var bytes = Utilities.base64Decode(match[2]);
  var ext = contentType.indexOf('png') > -1 ? '.png' : '.jpg';
  var blob = Utilities.newBlob(bytes, contentType, baseName + ext);
  var file = folder.createFile(blob);
  file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
  return file.getUrl();
}

function jsonOutput(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
