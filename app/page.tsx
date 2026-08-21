import BaseClone from "./components/BaseClone";
import { JsonLd } from "./components/JsonLd";

// 2026-08-21 増澤さん指示: BASEショップのホームと同一の見た目に変更。
// 旧セクション(Ducks風/白基調)のコンポーネントは components/ に温存（復帰可能）。
export default function Home() {
  return (
    <>
      <JsonLd />
      <BaseClone />
    </>
  );
}
