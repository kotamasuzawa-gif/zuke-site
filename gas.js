/**
 * 植欲マップ 掲載情報フォーム — Apps Script 本体コード
 *
 * このファイルは Apps Script 側の「読み込みコード(ローダー)」が
 * raw.githubusercontent.com 経由で毎回取得して実行します。
 * ここを編集して main に push するだけで、再デプロイなしで反映されます。
 * (ローダーの手順は docs/entry-form-setup.md を参照)
 *
 * 保存先の解決: 下記の既定ID(kotaアカウント所有)にアクセスできない場合は、
 * 実行アカウント自身のドライブに保存先を自動作成し、以後はそれを使う
 * (IDはスクリプトプロパティに保存)。作成時は閲覧・管理用に VIEWER_EMAIL にも
 * 編集権限を自動付与する。
 *
 * 注意: Apps Script の権限(スコープ)はローダー側の scopes_() が担保するため、
 * ここで新しい Google サービスを使う場合はローダーにも参照を追加すること。
 */

var DEFAULT_SHEET_ID = '1NTeg0yQAgfBiZsAE_Xzj8sDD6f7Cl5hokB_KO3NKrZ8';
var DEFAULT_FOLDER_ID = '1la8Q2AGs1pkmdwp_ravf4BsQsrabS3zu';
var VIEWER_EMAIL = 'kota11.21soc28@icloud.com';

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
  var folder = null;
  try {
    var body = JSON.parse(e.postData.contents);

    folder = ensureFolder_();
    var sheet = ensureSheet_();

    var stamp = Utilities.formatDate(new Date(), 'Asia/Tokyo', 'yyyyMMdd-HHmmss');
    var subFolder = folder.createFolder(stamp + ' ' + (body.shopName || 'no-name'));

    var shopPhotoUrls = [];
    (body.shopPhotos || []).forEach(function (img, i) {
      var url = saveImage_(subFolder, img, 'shop-' + (i + 1));
      if (url) shopPhotoUrls.push(url);
    });

    var ownerPhotoUrl = '';
    if (body.ownerPhoto) {
      ownerPhotoUrl = saveImage_(subFolder, body.ownerPhoto, 'owner') || '';
    }

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
      (folder || ensureFolder_()).createFile(
        'ERROR-' + Utilities.formatDate(new Date(), 'Asia/Tokyo', 'yyyyMMdd-HHmmss') + '.txt',
        String((err && err.stack) || err),
      );
    } catch (ignore) {}
    return jsonOutput_({ ok: false, message: String(err) });
  }
}

/** 保存先フォルダを返す。既定→プロパティ→自動作成の順に解決する */
function ensureFolder_() {
  var props = PropertiesService.getScriptProperties();
  var candidates = [props.getProperty('FOLDER_ID'), DEFAULT_FOLDER_ID];
  for (var i = 0; i < candidates.length; i++) {
    if (!candidates[i]) continue;
    try {
      var f = DriveApp.getFolderById(candidates[i]);
      f.getName(); // アクセス確認
      return f;
    } catch (ignore) {}
  }
  var created = DriveApp.createFolder('植欲マップ 店舗写真');
  try {
    created.addEditor(VIEWER_EMAIL);
  } catch (ignore) {}
  props.setProperty('FOLDER_ID', created.getId());
  return created;
}

/** 記録先シートを返す。既定→プロパティ→自動作成の順に解決する */
function ensureSheet_() {
  var props = PropertiesService.getScriptProperties();
  var candidates = [props.getProperty('SHEET_ID'), DEFAULT_SHEET_ID];
  for (var i = 0; i < candidates.length; i++) {
    if (!candidates[i]) continue;
    try {
      return SpreadsheetApp.openById(candidates[i]).getSheets()[0];
    } catch (ignore) {}
  }
  var ss = SpreadsheetApp.create('植欲マップ 掲載情報フォーム回答');
  try {
    DriveApp.getFileById(ss.getId()).addEditor(VIEWER_EMAIL);
  } catch (ignore) {}
  props.setProperty('SHEET_ID', ss.getId());
  return ss.getSheets()[0];
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

function jsonOutput_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
