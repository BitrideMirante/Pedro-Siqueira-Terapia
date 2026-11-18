"use client";

import { useEffect, useRef } from "react";

// Vídeo de fundo do topo, só no celular. No computador fica a foto
// (o vídeo é em pé e não tem resolução pra tela grande), e ele nem baixa.
export function HeroVideo({ src, poster }: { src: string; poster: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const celular = window.matchMedia("(max-width: 899px)");
    const aplicar = () => {
      if (celular.matches) {
        if (!el.src) el.src = src;
        el.play().catch(() => {});
      } else {
        el.pause();
      }
    };
    aplicar();
    celular.addEventListener("change", aplicar);
    return () => celular.removeEventListener("change", aplicar);
  }, [src]);

  return <video ref={ref} className="hero-video" poster={poster} muted loop playsInline preload="none" aria-hidden />;
}
