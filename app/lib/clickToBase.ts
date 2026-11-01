// 2026-11-01: BASE への <a> クリックを GA4 の click_to_base として送る。
// gtag のスタブを定義した直後に、同じインラインスクリプトへ連結する（測定IDが無いビルドでは出さない）。
// リンクの JSX は変えず、document の委譲リスナー1本（click と auxclick で共用）だけを付ける。

export const clickToBaseListener = String.raw`(function(){
  var hosts = { "shop.zukeplants.com": 1, "zukeplants.base.shop": 1 };
  function onClick(event) {
    try {
      if (!(event instanceof MouseEvent)) return;
      if (event.type === "click") {
        if (event.button !== 0) return;
      } else if (event.type === "auxclick") {
        if (event.button !== 1) return;
      } else return;
      if (event.defaultPrevented) return;
      if (typeof window.gtag !== "function") return;
      var node = event.target;
      var el = node instanceof Element ? node : (node instanceof Node ? node.parentElement : null);
      if (!el || typeof el.closest !== "function") return;
      var anchor = el.closest("a");
      if (!anchor || typeof anchor.href !== "string" || !anchor.hasAttribute("href")) return;
      var href = anchor.href;
      var url;
      try { url = new URL(href); } catch (e) { return; }
      if (url.protocol !== "http:" && url.protocol !== "https:") return;
      if (!hosts[url.hostname.toLowerCase()]) return;
      var match = url.pathname.match(/^\/items\/(\d+)\/?$/);
      window.gtag("event", "click_to_base", {
        item_id: match ? match[1] : "",
        link_url: href,
        page_path: location.pathname,
        transport_type: "beacon"
      });
    } catch (e) {}
  }
  document.addEventListener("click", onClick, true);
  document.addEventListener("auxclick", onClick, true);
})();`;
