// カテゴリページの動画（ホームのトップでもランダムに1本出す: 2026-10-18 増澤さん）
export const CATEGORY_VIDEOS: Record<string, { src: string; poster: string; label: string }> = {
  climb: { src: "/products/noboribo-howto.mp4", poster: "/products/noboribo-howto-poster.jpg", label: "上り棒セットが組み上がる映像" },
  pot: { src: "/video/hexpot-assemble.mp4", poster: "/video/hexpot-assemble-poster.jpg", label: "受け皿・六角鉢・PLANTS POLE が組み上がる映像" },
  // 2026-09-30 アイアン支柱の動画は一旦取り下げ（形状が実物と違うため。素材は cm-build/iron に保管）
  extension: { src: "/video/pole-extend.mp4", poster: "/video/pole-extend-poster.jpg", label: "1連の支柱に六角形と留め具を継ぎ足して伸ばす映像" },
  tool: { src: "/video/tool-tools.mp4", poster: "/video/tool-tools-poster.jpg", label: "ミニ土入れスコップとソイルスティックが回転して形と色を見せる映像" },
};
