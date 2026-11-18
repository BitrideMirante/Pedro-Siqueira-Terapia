"use client";

import { useEffect, useRef } from "react";

type ItemGaleria = {
  tipo: "video" | "foto";
  src: string;
  poster?: string;
  legenda: string;
  soCelular?: boolean; // aparece só no celular (no computador ele já está nos serviços)
};

// A primeira posição aparece maior no celular.
const ITENS: ItemGaleria[] = [
  { tipo: "video", src: "/galeria/pedro-praca-noite.mp4", poster: "/galeria/poster-pedro-praca-noite.jpg", legenda: "Pedro · praça da vila", soCelular: true },
  { tipo: "video", src: "/galeria/atendimento-praia-1.mp4", poster: "/galeria/poster-praia-1.jpg", legenda: "Praia de Jeri · CE" },
  { tipo: "video", src: "/galeria/atendimento-praca-1.mp4", poster: "/galeria/poster-praca-1.jpg", legenda: "Praça da vila · Jeri" },
  { tipo: "video", src: "/galeria/atendimento-rio-1.mp4", poster: "/galeria/poster-1.jpg", legenda: "Rolante · RS" },
  { tipo: "video", src: "/galeria/atendimento-rio-2.mp4", poster: "/galeria/poster-2.jpg", legenda: "Rolante · RS" },
  { tipo: "video", src: "/galeria/atendimento-rio-3.mp4", poster: "/galeria/poster-3.jpg", legenda: "Consultório Alba" },
];

export function Video({ src, poster, legenda }: { src: string; poster?: string; legenda: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  // Só toca quando o vídeo aparece na tela — economiza dados de quem está no 4G.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.play().catch(() => {});
        else el.pause();
      },
      { threshold: 0.35 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return <video ref={ref} src={src} poster={poster} muted loop playsInline preload="none" aria-label={legenda} />;
}

export function Galeria() {
  return (
    <div className="galeria">
      {ITENS.map((item) => (
        <div className={`item${item.soCelular ? " so-celular-item" : ""}`} key={item.src}>
          {item.tipo === "video" ? (
            <Video src={item.src} poster={item.poster} legenda={item.legenda} />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={item.src} alt={item.legenda} loading="lazy" />
          )}
          <div className="legenda">{item.legenda}</div>
        </div>
      ))}
    </div>
  );
}
