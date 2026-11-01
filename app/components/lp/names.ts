/**
 * BASE に出した新しい商品名（product_names.txt の「新しい商品名」）。
 * products.ts の name / fullName は商品ページの見出しとして残す。
 * キーは slug。item id はコメント。
 */
export const LP_PRODUCT_NAMES: Record<string, string> = {
  hex5: 'PLANTS POLE "5つの六角形" 39cm｜モンステラ・ポトスの支柱 アイアン', // 117375069
  hex2: 'PLANTS POLE "2つの六角形" 19.5cm｜小鉢の植物支柱 アイアン', // 124680568
  hex3: 'PLANTS POLE "3つの六角形" 22cm｜観葉植物の支柱 アイアン', // 128906974
  uneune: 'PLANTS POLE "うねうね" 35cm｜横に広がる観葉植物の支柱 アイアン', // 130117282
  "hexpot-set": '六角鉢セット "3つの六角形"｜支柱が差せる鉢・受け皿・支柱', // 159039931
  pole3pla: 'PLANTS POLE "3つの六角形" 樹脂版 22cm｜3Dプリントの植物支柱', // 159046672
  pole2pla: 'PLANTS POLE "2つの六角形" 樹脂版 17cm｜3Dプリントの植物支柱', // 159046887
  hexpot: "六角鉢＋受け皿｜支柱が差せる3Dプリント鉢", // 159048204
  "hexpot-set2": '六角鉢セット "2つの六角形"｜支柱が差せる鉢・受け皿・支柱', // 159049724
  pole1pla: 'PLANTS POLE "1つの六角形" 樹脂版｜小さな植物支柱', // 159543555
  hexparts: "拡張パーツ 六角形＋留め具 樹脂版｜植物支柱を後から伸ばす", // 159543653
  hexclip5: "留め具 5個入り 樹脂版｜植物支柱の拡張パーツ用クリップ", // 159749568
  "marupot-stand": "丸鉢スタンドセット｜3Dプリントの鉢カバー＋3本脚スタンド", // 161140229
  "hex-set-2pcs": "PLANTS POLE 2本セット 22cm＋39cm｜観葉植物の支柱 アイアン", // 162185287
  scoop: "ミニ土入れスコップ｜ふるい穴付き 小鉢の土入れ", // 162202851
  soilstick: "ソイルスティック｜植え替え用の土入れ棒・ヘラ付き", // 162230038
  noboribo: '上り棒セット "3つの六角形"｜モンステラ・ポトスの水苔支柱＋鉢', // 162757270
  hexhanging: "六角形ハンギング鉢｜S字フックで吊るす着生植物の鉢", // 163355667
  "hexwall-set": "壁掛け六角鉢3個＋壁掛けプレートセット｜壁面緑化", // 164000445
  hexwallpot: "壁掛け六角鉢（単品）｜壁掛けプレート用", // 164004153
  hexwallplate: "壁掛けプレート（単品）｜壁掛け六角鉢を掛ける壁面緑化パネル", // 164005125
};

export function lpProductName(slug: string): string | undefined {
  return LP_PRODUCT_NAMES[slug];
}
