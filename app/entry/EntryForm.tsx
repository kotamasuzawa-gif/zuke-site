"use client";

import { useState, useRef } from "react";
import { prepareImage, formatBytes, isImageFile, type PreparedImage } from "./imageUtils";

type ListingStatus = "listed" | "not_listed" | "unknown";
type FlyerAnswer = "yes" | "consider" | "no";

type FieldErrors = Partial<{
  shopName: string;
  location: string;
  ownerName: string;
  email: string;
  flyer: string;
  consent: string;
  photos: string;
}>;

const MAX_SHOP_PHOTOS = 5;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function EntryForm() {
  // テキスト系
  const [shopName, setShopName] = useState("");
  const [location, setLocation] = useState("");
  const [listingStatus, setListingStatus] = useState<ListingStatus | "">("");
  const [ownerName, setOwnerName] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const [note, setNote] = useState("");
  const [flyer, setFlyer] = useState<FlyerAnswer | "">("");
  const [consent, setConsent] = useState(false);
  const [appUse, setAppUse] = useState(false);

  // 画像系
  const [shopPhotos, setShopPhotos] = useState<PreparedImage[]>([]);
  const [ownerPhoto, setOwnerPhoto] = useState<PreparedImage | null>(null);
  const [processing, setProcessing] = useState(false);

  // 送信状態
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const shopPhotoInput = useRef<HTMLInputElement>(null);
  const ownerPhotoInput = useRef<HTMLInputElement>(null);

  async function handleShopPhotos(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    e.target.value = ""; // 同じファイルを再選択できるようにリセット
    if (files.length === 0) return;

    const remaining = MAX_SHOP_PHOTOS - shopPhotos.length;
    if (remaining <= 0) {
      setErrors((prev) => ({ ...prev, photos: `店舗写真は最大${MAX_SHOP_PHOTOS}枚までです。` }));
      return;
    }

    setProcessing(true);
    setErrors((prev) => ({ ...prev, photos: undefined }));
    try {
      const prepared: PreparedImage[] = [];
      for (const file of files.slice(0, remaining)) {
        if (!isImageFile(file)) continue;
        prepared.push(await prepareImage(file));
      }
      setShopPhotos((prev) => [...prev, ...prepared]);
    } catch {
      setErrors((prev) => ({ ...prev, photos: "画像の読み込みに失敗しました。別の画像でお試しください。" }));
    } finally {
      setProcessing(false);
    }
  }

  async function handleOwnerPhoto(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    if (!isImageFile(file)) return;
    setProcessing(true);
    try {
      setOwnerPhoto(await prepareImage(file));
    } catch {
      setErrors((prev) => ({ ...prev, photos: "画像の読み込みに失敗しました。別の画像でお試しください。" }));
    } finally {
      setProcessing(false);
    }
  }

  function validate(): boolean {
    const next: FieldErrors = {};
    if (!shopName.trim()) next.shopName = "店舗名を入力してください。";
    if (!location.trim()) next.location = "所在地を入力してください。";
    if (!ownerName.trim()) next.ownerName = "ご担当者・オーナー名を入力してください。";
    if (!email.trim()) next.email = "メールアドレスを入力してください。";
    else if (!emailPattern.test(email.trim())) next.email = "メールアドレスの形式が正しくありません。";
    if (!flyer) next.flyer = "チラシ設置についてお選びください。";
    if (!consent) next.consent = "掲載・紹介での利用に同意が必要です。";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitError(null);
    if (!validate()) {
      // 最初のエラー項目までスクロール
      const first = document.querySelector("[data-error='true']");
      first?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        shopName: shopName.trim(),
        location: location.trim(),
        listingStatus: listingStatus || "unknown",
        ownerName: ownerName.trim(),
        email: email.trim(),
        comment: comment.trim(),
        note: note.trim(),
        flyer,
        appUse,
        shopPhotos: shopPhotos.map((p) => ({ name: p.name, type: p.type, dataUrl: p.dataUrl })),
        ownerPhoto: ownerPhoto ? { name: ownerPhoto.name, type: ownerPhoto.type, dataUrl: ownerPhoto.dataUrl } : null,
      };

      const res = await fetch("/api/shop-entry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.message || "送信に失敗しました。");
      }
      setDone(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "送信に失敗しました。時間をおいて再度お試しください。");
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <div className="max-w-xl mx-auto text-center py-16">
        <div className="w-16 h-16 mx-auto mb-8 rounded-full bg-green-50 flex items-center justify-center">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-stone-800 mb-4">ご協力ありがとうございます！</h2>
        <p className="text-stone-600 text-sm leading-relaxed">
          いただいた情報は「植欲マップ」の掲載に活用させていただきます。<br />
          内容を確認のうえ、必要に応じてご入力のメールアドレスへご連絡いたします。
        </p>
        <p className="text-stone-500 text-xs leading-relaxed mt-6">
          確定後の内容変更は随時お受付します。変更をご希望の際はいつでもお気軽にご連絡ください。
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="max-w-xl mx-auto space-y-10">
      {/* 店舗情報 */}
      <fieldset className="space-y-6">
        <legend className="text-xs tracking-[0.3em] text-green-700 uppercase mb-2">Shop</legend>

        <Field label="店舗名" required error={errors.shopName}>
          <input
            type="text"
            value={shopName}
            onChange={(e) => setShopName(e.target.value)}
            placeholder="例）みどり園芸店"
            className={inputCls(!!errors.shopName)}
          />
        </Field>

        <Field label="所在地（都道府県・市区町村）" required error={errors.location}>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="例）東京都世田谷区"
            className={inputCls(!!errors.location)}
          />
        </Field>

        <Field label="「植欲マップ」への掲載状況">
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            {(
              [
                { v: "listed", l: "掲載済み" },
                { v: "not_listed", l: "まだ掲載されていない" },
                { v: "unknown", l: "わからない" },
              ] as { v: ListingStatus; l: string }[]
            ).map((o) => (
              <Radio
                key={o.v}
                name="listingStatus"
                checked={listingStatus === o.v}
                onChange={() => setListingStatus(o.v)}
                label={o.l}
              />
            ))}
          </div>
        </Field>
      </fieldset>

      {/* ご担当者 */}
      <fieldset className="space-y-6">
        <legend className="text-xs tracking-[0.3em] text-green-700 uppercase mb-2">Contact</legend>

        <Field label="ご担当者・オーナー名" required error={errors.ownerName}>
          <input
            type="text"
            value={ownerName}
            onChange={(e) => setOwnerName(e.target.value)}
            placeholder="例）山田 花子"
            className={inputCls(!!errors.ownerName)}
          />
        </Field>

        <Field label="メールアドレス" required error={errors.email} hint="確認のご連絡に使用します。">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="例）shop@example.com"
            inputMode="email"
            autoComplete="email"
            className={inputCls(!!errors.email)}
          />
        </Field>
      </fieldset>

      {/* 写真 */}
      <fieldset className="space-y-6">
        <legend className="text-xs tracking-[0.3em] text-green-700 uppercase mb-2">Photos</legend>

        <Field label="店舗／店内のお写真" hint={`最大${MAX_SHOP_PHOTOS}枚。送信前に自動で軽量化されます。`}>
          <div className="flex flex-wrap gap-3">
            {shopPhotos.map((p, i) => (
              <Thumb key={i} src={p.dataUrl} caption={formatBytes(p.bytes)} onRemove={() => setShopPhotos((prev) => prev.filter((_, idx) => idx !== i))} />
            ))}
            {shopPhotos.length < MAX_SHOP_PHOTOS && (
              <AddButton onClick={() => shopPhotoInput.current?.click()} disabled={processing} />
            )}
          </div>
          <input ref={shopPhotoInput} type="file" accept="image/*" multiple hidden onChange={handleShopPhotos} />
        </Field>

        <Field label="オーナーのお写真 or イラスト" hint="1枚。似顔絵イラストでもOKです。">
          <div className="flex flex-wrap gap-3">
            {ownerPhoto ? (
              <Thumb src={ownerPhoto.dataUrl} caption={formatBytes(ownerPhoto.bytes)} onRemove={() => setOwnerPhoto(null)} />
            ) : (
              <AddButton onClick={() => ownerPhotoInput.current?.click()} disabled={processing} />
            )}
          </div>
          <input ref={ownerPhotoInput} type="file" accept="image/*" hidden onChange={handleOwnerPhoto} />
        </Field>

        {errors.photos && <p className="text-xs text-red-600 -mt-2">{errors.photos}</p>}
        {processing && <p className="text-xs text-stone-500 -mt-2">画像を処理しています…</p>}
      </fieldset>

      {/* コメント・チラシ */}
      <fieldset className="space-y-6">
        <legend className="text-xs tracking-[0.3em] text-green-700 uppercase mb-2">Message</legend>

        <Field label="オーナーからのひとことコメント" hint="お店の魅力やこだわりなど（任意）">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={4}
            maxLength={300}
            placeholder="例）珍しい観葉植物を中心に、育て方のご相談もお気軽にどうぞ。"
            className={`${inputCls(false)} resize-none`}
          />
          <p className="text-right text-xs text-stone-400 mt-1">{comment.length} / 300</p>
        </Field>

        <Field label="アプリのチラシを店頭に置いていただけますか？" required error={errors.flyer}>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            {(
              [
                { v: "yes", l: "はい、置けます" },
                { v: "consider", l: "検討したい" },
                { v: "no", l: "今回は見送る" },
              ] as { v: FlyerAnswer; l: string }[]
            ).map((o) => (
              <Radio key={o.v} name="flyer" checked={flyer === o.v} onChange={() => setFlyer(o.v)} label={o.l} />
            ))}
          </div>
        </Field>

        <Field label="その他ご連絡・ご質問">
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={3}
            maxLength={500}
            placeholder="任意"
            className={`${inputCls(false)} resize-none`}
          />
        </Field>
      </fieldset>

      {/* ご確認・ご同意 */}
      <div className="space-y-4 border-t border-stone-100 pt-8">
        <div data-error={errors.consent ? "true" : undefined}>
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="mt-1 h-4 w-4 shrink-0 accent-green-700"
            />
            <span className="text-sm text-stone-600 leading-relaxed">
              いただいた写真・コメント等を「植欲マップ」および関連SNSでの店舗紹介に利用することに同意します。
              <span className="text-red-500 ml-1">*</span>
            </span>
          </label>
          {errors.consent && <p className="text-xs text-red-600 mt-1 ml-7">{errors.consent}</p>}
        </div>

        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={appUse}
            onChange={(e) => setAppUse(e.target.checked)}
            className="mt-1 h-4 w-4 shrink-0 accent-green-700"
          />
          <span className="text-sm text-stone-600 leading-relaxed">
            オーナーからのメッセージ・イラスト・写真などを「植欲マップ」アプリ内で使わせていただくことに同意します。
          </span>
        </label>

        <p className="text-xs text-stone-400 leading-relaxed ml-7">
          ※確定後の内容変更は随時お受付します。変更をご希望の際はいつでもご連絡ください。
        </p>
      </div>

      {submitError && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded px-4 py-3">{submitError}</p>
      )}

      <button
        type="submit"
        disabled={submitting || processing}
        className="w-full py-4 bg-stone-800 text-white text-sm tracking-widest hover:bg-stone-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {submitting ? "送信中…" : "この内容で送信する"}
      </button>
    </form>
  );
}

/* ---------- 小さなUI部品 ---------- */

function inputCls(hasError: boolean): string {
  return [
    "w-full px-4 py-3 text-sm text-stone-800 bg-white border rounded",
    "placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-green-600/30",
    hasError ? "border-red-400" : "border-stone-300 focus:border-green-600",
  ].join(" ");
}

function Field({
  label,
  required,
  hint,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div data-error={error ? "true" : undefined}>
      <label className="block text-sm font-medium text-stone-700 mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {hint && <p className="text-xs text-stone-400 mb-2">{hint}</p>}
      {children}
      {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
    </div>
  );
}

function Radio({ name, checked, onChange, label }: { name: string; checked: boolean; onChange: () => void; label: string }) {
  return (
    <label
      className={`flex-1 flex items-center gap-2 px-4 py-3 border rounded cursor-pointer text-sm transition-colors ${
        checked ? "border-green-600 bg-green-50 text-stone-800" : "border-stone-300 text-stone-600 hover:border-stone-400"
      }`}
    >
      <input type="radio" name={name} checked={checked} onChange={onChange} className="accent-green-700" />
      {label}
    </label>
  );
}

function Thumb({ src, caption, onRemove }: { src: string; caption: string; onRemove: () => void }) {
  return (
    <div className="relative w-24 h-24">
      {/* アップロード前のプレビュー用途なので通常のimgで十分 */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt="プレビュー" className="w-24 h-24 object-cover rounded border border-stone-200" />
      <button
        type="button"
        onClick={onRemove}
        aria-label="削除"
        className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-stone-800 text-white flex items-center justify-center hover:bg-stone-900"
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <path d="M18 6 6 18M6 6l12 12" />
        </svg>
      </button>
      <span className="absolute bottom-0 left-0 right-0 text-[10px] text-white bg-black/40 text-center rounded-b">{caption}</span>
    </div>
  );
}

function AddButton({ onClick, disabled }: { onClick: () => void; disabled?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="w-24 h-24 border-2 border-dashed border-stone-300 rounded flex flex-col items-center justify-center gap-1 text-stone-400 hover:border-green-500 hover:text-green-600 disabled:opacity-50 transition-colors"
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 5v14M5 12h14" />
      </svg>
      <span className="text-[10px]">写真を追加</span>
    </button>
  );
}
