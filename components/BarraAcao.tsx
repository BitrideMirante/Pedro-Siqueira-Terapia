"use client";

import { useEffect, useState } from "react";

// Botão de WhatsApp que aparece no rodapé da tela depois que a pessoa passa do topo.
// Some de novo quando chega na seção de contato (que já tem o botão dela).
export function BarraAcao({ waUrl }: { waUrl: string }) {
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    const topo = document.getElementById("topo");
    const contato = document.getElementById("contato");
    if (!topo || !contato) return;

    let topoVisivel = true;
    let contatoVisivel = false;
    const atualizar = () => setVisivel(!topoVisivel && !contatoVisivel);

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.target === topo) topoVisivel = e.isIntersecting;
          if (e.target === contato) contatoVisivel = e.isIntersecting;
        });
        atualizar();
      },
      { threshold: 0.05 }
    );

    obs.observe(topo);
    obs.observe(contato);
    return () => obs.disconnect();
  }, []);

  return (
    <div className={`flutuante ${visivel ? "visivel" : ""}`} aria-hidden={!visivel}>
      <a className="btn btn-escuro" href={waUrl} target="_blank" rel="noreferrer" tabIndex={visivel ? 0 : -1}>
        Chamar no WhatsApp
      </a>
    </div>
  );
}
