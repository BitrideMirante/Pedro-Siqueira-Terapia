"use client";

import Script from "next/script";
import { useEffect } from "react";

// Medição do Google Ads.
//
// O site dispara um evento chamado "contato_whatsapp" sempre que alguém
// clica num link de WhatsApp. Lá no Google Ads esse evento vira uma ação
// de conversão (Metas > Conversões > Nova conversão > Site), sem precisar
// colar rótulo nenhum aqui dentro.
//
// ID da conta de anúncios. Não é segredo: fica visível no código da página
// de qualquer site que anuncia. Dá pra sobrescrever pela Vercel se um dia
// mudar de conta.
const ID = process.env.NEXT_PUBLIC_GADS_ID || "AW-16735601874";

export function Medicao() {
  // Um ouvinte só, na página inteira: qualquer link de WhatsApp conta como
  // contato. Assim não precisa marcar botão por botão, e link novo que
  // aparecer no futuro já entra sozinho.
  useEffect(() => {
    if (!ID) return;

    const aoClicar = (evento: MouseEvent) => {
      const alvo = evento.target as HTMLElement | null;
      const link = alvo?.closest?.('a[href*="wa.me/"]');
      if (!link) return;

      const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
      if (typeof gtag !== "function") return;

      gtag("event", "contato_whatsapp", {
        origem: window.location.pathname,
      });
    };

    // captura: dispara antes de o navegador seguir o link
    document.addEventListener("click", aoClicar, true);
    return () => document.removeEventListener("click", aoClicar, true);
  }, []);

  if (!ID) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${ID}`}
        strategy="afterInteractive"
      />
      <Script id="gtag-base" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${ID}');`}
      </Script>
    </>
  );
}
