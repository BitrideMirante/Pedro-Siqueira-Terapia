"use client";

import Script from "next/script";
import { useEffect } from "react";

// Medição do Google Ads.
//
// Só liga se as duas variáveis existirem. Sem elas, o componente não
// renderiza nada e o site fica exatamente como era — nenhum script a mais,
// nenhum cookie.
//
// Onde pegar os valores: Google Ads > Metas > Conversões > ação "Contato"
// > Configuração da tag. O ID é o AW-0000000000 e o rótulo é a string que
// aparece depois da barra em send_to.
const ID = process.env.NEXT_PUBLIC_GADS_ID || "";
const ROTULO = process.env.NEXT_PUBLIC_GADS_LABEL || "";

export function Medicao() {
  // Um ouvinte só, na página inteira: qualquer link de WhatsApp conta como
  // contato. Assim não precisa marcar botão por botão, e link novo que
  // aparecer no futuro já entra sozinho.
  useEffect(() => {
    if (!ID || !ROTULO) return;

    const aoClicar = (evento: MouseEvent) => {
      const alvo = evento.target as HTMLElement | null;
      const link = alvo?.closest?.('a[href*="wa.me/"]');
      if (!link) return;

      const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
      if (typeof gtag !== "function") return;

      gtag("event", "conversion", { send_to: `${ID}/${ROTULO}` });
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
