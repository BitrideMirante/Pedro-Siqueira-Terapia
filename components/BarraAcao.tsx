"use client";

import { useEffect, useState } from "react";

export function BarraAcao({ waUrl }: { waUrl: string }) {
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    const alvos = ["hoje", "contato"]
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);

    if (alvos.length === 0) return;

    const estados = new Map<Element, boolean>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          estados.set(entry.target, entry.intersectionRatio > 0.55);
        });
        const algumPainelProprioVisivel = Array.from(estados.values()).some(Boolean);
        setVisivel(!algumPainelProprioVisivel);
      },
      { threshold: [0, 0.55, 1] }
    );

    alvos.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 5,
        padding: "12px 18px calc(12px + env(safe-area-inset-bottom))",
        background: "linear-gradient(180deg, rgba(243,233,218,0) 0%, rgba(243,233,218,.92) 45%)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        opacity: visivel ? 1 : 0,
        transform: visivel ? "translateY(0)" : "translateY(12px)",
        pointerEvents: visivel ? "auto" : "none",
        transition: "opacity .25s ease, transform .25s ease",
      }}
    >
      <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 9 }}>
        <a href={waUrl} target="_blank" rel="noreferrer" style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: 52, padding: "14px 18px", borderRadius: 16, background: "#C97B3D", color: "#FBF3E7", fontWeight: 600, fontSize: 15.5 }}>Chamar no WhatsApp</a>
        <a href="#hoje" style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: 52, padding: "14px 18px", borderRadius: 16, border: "1px solid rgba(61,46,34,.22)", color: "#3D2E22", fontFamily: "'IBM Plex Mono',monospace", fontSize: 11, letterSpacing: ".12em", textTransform: "uppercase" }}>Hoje</a>
      </div>
    </div>
  );
}
