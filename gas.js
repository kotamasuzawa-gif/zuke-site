/**
 * 植欲マップ 掲載情報フォーム — Apps Script 本体コード
 *
 * このファイルは Apps Script 側の「読み込みコード(ローダー)」が
 * raw.githubusercontent.com 経由で毎回取得して実行します。
 * ここを編集して main に push するだけで、再デプロイなしで反映されます。
 * (ローダーの手順は docs/entry-form-setup.md を参照)
 *
 * 注意: Apps Script の権限(スコープ)はローダー側の scopes_() が担保するため、
 * ここで新しい Google サービスを使う場合はローダーにも参照を追加すること。
 */

var SHEET_ID = '15UfoQTGJwVxjYNDqUsDTIrInBzmWo4a6D2bCy_KZF3E';
var DRIVE_FOLDER_ID = '19LN801ypdlgefGAoJrbmgFICFqwRF1CQ';

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

function MAIN(e) {
  try {
    var body = JSON.parse(e.postData.contents);

    var parentFolder = DriveApp.getFolderById(DRIVE_FOLDER_ID);
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

    var sheet = SpreadsheetApp.openById(SHEET_ID).getSheets()[0];
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        '受信日時', '店舗名', '所在地', '掲載状況', 'ご担当者', 'メール',
        'ひとことコメント', 'その他連絡', 'チラシ設置', 'アプリ内利用同意',
        '店舗写真', 'オーナー写真', '保存フォルダ',
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
      body.appUse ? '同意する' : '未同意',
      shopPhotoUrls.join('\n'),
      ownerPhotoUrl,
      subFolder.getUrl(),
    ]);

    return jsonOutput_({ ok: true });
  } catch (err) {
    // 失敗の詳細を写真フォルダにテキストで残す(リモートからの原因調査用)
    try {
      DriveApp.getFolderById(DRIVE_FOLDER_ID).createFile(
        'ERROR-' + Utilities.formatDate(new Date(), 'Asia/Tokyo', 'yyyyMMdd-HHmmss') + '.txt',
        String((err && err.stack) || err),
      );
    } catch (ignore) {}
    return jsonOutput_({ ok: false, message: String(err) });
  }
}

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

function jsonOutput_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
