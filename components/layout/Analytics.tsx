"use client";
import Script from "next/script";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { captureAttribution, readConsent, track, writeConsent, type Consent } from "@/lib/analytics";

const GTM = process.env.NEXT_PUBLIC_GTM_ID;
const GA = process.env.NEXT_PUBLIC_GA_ID;
const PIXEL = process.env.NEXT_PUBLIC_META_PIXEL_ID;

/**
 * Consent-gated analytics. Nothing third-party loads until the visitor opts in.
 * Delegated click tracking: any element with data-track, tel: links and WhatsApp links.
 */
export function Analytics() {
  const [consent, setConsent] = useState<Consent | null>(null);
  const [open, setOpen] = useState(false);
  const [custom, setCustom] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const c = readConsent();
    setConsent(c);
    setOpen(!c.decided);
    captureAttribution();
    const onConsent = (e: Event) => setConsent({ ...(e as CustomEvent).detail, decided: true });
    const onOpen = () => { setOpen(true); setCustom(true); };
    window.addEventListener("fb:consent", onConsent);
    window.addEventListener("fb:open-consent", onOpen);
    return () => { window.removeEventListener("fb:consent", onConsent); window.removeEventListener("fb:open-consent", onOpen); };
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest("a,button") as HTMLAnchorElement | null;
      if (!el) return;
      const label = el.dataset.track;
      const href = el.getAttribute("href") || "";
      if (href.startsWith("tel:")) track("phone_click", { location: pathname });
      else if (href.includes("wa.me") || href.includes("whatsapp")) track("whatsapp_click", { location: pathname });
      else if (href.startsWith("mailto:")) track("email_click", { location: pathname });
      if (label) track("cta_click", { label, href, location: pathname });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [pathname]);

  useEffect(() => {
    if (pathname?.startsWith("/products/")) track("product_view", { product: pathname.split("/")[2] });
    if (pathname?.startsWith("/blog/") && pathname.split("/").length === 3) track("blog_view", { slug: pathname.split("/")[2] });
  }, [pathname]);

  const decide = (analytics: boolean, marketing: boolean) => {
    writeConsent({ analytics, marketing });
    setOpen(false);
  };

  return (
    <>
      {consent?.analytics && GTM && (
        <Script id="gtm" strategy="afterInteractive">{`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM}');`}</Script>
      )}
      {consent?.analytics && GA && !GTM && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA}`} strategy="afterInteractive" />
          <Script id="ga" strategy="afterInteractive">{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','${GA}',{anonymize_ip:true});`}</Script>
        </>
      )}
      {consent?.marketing && PIXEL && (
        <Script id="meta-pixel" strategy="lazyOnload">{`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${PIXEL}');fbq('track','PageView');`}</Script>
      )}

      {open && (
        <div role="dialog" aria-modal="false" aria-labelledby="consent-title" className="fixed inset-x-3 bottom-3 z-[60] mx-auto max-w-xl rounded-2xl border border-line bg-white p-5 shadow-[var(--shadow-lift)] sm:inset-x-auto sm:right-5 sm:bottom-5">
          <h2 id="consent-title" className="text-base font-semibold">Your privacy choices</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            We use essential cookies to run this site. With your permission we also use analytics and marketing cookies to understand usage and measure campaigns. See our <Link href="/cookie-policy" className="text-brand-600 underline">Cookie Policy</Link>.
          </p>
          {custom && consent && (
            <fieldset className="mt-4 space-y-2 text-sm">
              <legend className="sr-only">Cookie categories</legend>
              <label className="flex items-center gap-2"><input type="checkbox" checked disabled className="accent-brand-500" /> Essential (always on)</label>
              <label className="flex items-center gap-2"><input id="c-analytics" type="checkbox" defaultChecked={consent.analytics} className="accent-brand-500" /> Analytics</label>
              <label className="flex items-center gap-2"><input id="c-marketing" type="checkbox" defaultChecked={consent.marketing} className="accent-brand-500" /> Marketing</label>
            </fieldset>
          )}
          <div className="mt-4 flex flex-wrap gap-2">
            <button onClick={() => decide(true, true)} className="h-10 rounded-full bg-brand-500 px-5 text-sm font-semibold text-white hover:bg-brand-600">Accept all</button>
            <button onClick={() => decide(false, false)} className="h-10 rounded-full px-5 text-sm font-semibold text-ink-900 ring-1 ring-line hover:ring-brand-300">Reject non-essential</button>
            {custom ? (
              <button
                onClick={() => decide((document.getElementById("c-analytics") as HTMLInputElement)?.checked, (document.getElementById("c-marketing") as HTMLInputElement)?.checked)}
                className="h-10 rounded-full px-5 text-sm font-semibold text-brand-700 hover:bg-brand-50"
              >Save choices</button>
            ) : (
              <button onClick={() => setCustom(true)} className="h-10 rounded-full px-5 text-sm font-semibold text-brand-700 hover:bg-brand-50">Customise</button>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export function CookieSettingsButton({ className = "" }: { className?: string }) {
  return (
    <button type="button" onClick={() => window.dispatchEvent(new Event("fb:open-consent"))} className={className}>
      Cookie settings
    </button>
  );
}
