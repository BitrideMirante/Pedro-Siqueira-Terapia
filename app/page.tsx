import { lerStatus } from "@/lib/kv";
import { Waves } from "@/components/Waves";
import { Galeria } from "@/components/Galeria";

export const dynamic = "force-dynamic"; // sempre busca o status mais recente

const WHATSAPP = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "5551980602183").replace(/\D/g, "");
const TIKTOK_ATIVO = process.env.NEXT_PUBLIC_TIKTOK_ATIVO === "true";
const TIKTOK_LINK = process.env.NEXT_PUBLIC_TIKTOK_LINK || "https://tiktok.com/@...";

export default async function Home() {
  const status = await lerStatus();
  const msg = encodeURIComponent("Oi, Pedro! Vi seu cartão e queria saber sobre um atendimento.");
  const waUrl = `https://wa.me/${WHATSAPP}?text=${msg}`;

  return (
    <div style={{ position: "relative", height: "100dvh", maxWidth: 520, margin: "0 auto", background: "#07131C", overflow: "hidden" }}>

      <div style={{ position: "absolute", inset: "-6% -4%", zIndex: 0, pointerEvents: "none", filter: "blur(2.5px) saturate(1.05)", animation: "drift 46s ease-in-out infinite alternate" }}>
        <Waves intensidade={1} tomAreia={1} />
      </div>
      <div style={{ position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none", background: "radial-gradient(120% 65% at 50% 0%, rgba(7,19,28,.5) 0%, rgba(7,19,28,.1) 42%, rgba(7,19,28,.8) 100%)" }} />

      <div className="snap" style={{ position: "relative", zIndex: 2, height: "100%", overflowY: "auto", padding: "0 18px calc(96px + env(safe-area-inset-bottom))" }}>

        {/* PAINEL 1 · identidade + hoje */}
        <div className="panel" style={{ minHeight: "calc(100dvh - 96px)", display: "flex", flexDirection: "column", paddingTop: "calc(20px + env(safe-area-inset-top))" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
            <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 10.5, letterSpacing: ".2em", textTransform: "uppercase", color: "#8FE3CC" }}>Guriú · Ceará</span>
            <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 10.5, letterSpacing: ".14em", textTransform: "uppercase", color: "#E0BE99" }}>Cartão de visita</span>
          </div>

          <div style={{ marginTop: "auto", paddingTop: 34 }}>
            <h1 style={{ fontFamily: "'Big Shoulders Display',sans-serif", fontWeight: 900, textTransform: "uppercase", margin: 0, lineHeight: 0.85, fontSize: "clamp(52px,17vw,72px)", textShadow: "0 8px 40px rgba(4,14,22,.55)" }}>Pedro<br />Siqueira</h1>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 9, marginTop: 12 }}>
              <span style={{ fontSize: 16, fontWeight: 500, color: "#E0BE99" }}>Terapeuta manual</span>
              <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#8FE3CC" }} />
              <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 10.5, letterSpacing: ".1em", textTransform: "uppercase", color: "#8FE3CC", whiteSpace: "nowrap" }}>Quick Massagem &amp; Recovery</span>
            </div>
            <p style={{ margin: "16px 0 0", fontSize: 17, maxWidth: "28ch" }}>Está por Guriú? Recupere o corpo depois da praia, do esporte ou da estrada.</p>
          </div>

          <div id="hoje" style={{ marginTop: 22, marginBottom: 22, background: "rgba(10,32,36,.5)", backdropFilter: "blur(24px) saturate(1.2)", WebkitBackdropFilter: "blur(24px) saturate(1.2)", border: "1px solid rgba(143,227,204,.28)", borderRadius: 22, padding: 18 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 9, fontFamily: "'IBM Plex Mono',monospace", fontSize: 10.5, letterSpacing: ".14em", textTransform: "uppercase", color: "#8FE3CC" }}>
              <span style={{ position: "relative", width: 7, height: 7, borderRadius: "50%", background: "#8FE3CC", flexShrink: 0 }}>
                <span style={{ position: "absolute", inset: -6, borderRadius: "50%", border: "1px solid #8FE3CC", animation: "pulse 2.4s ease-out infinite" }} />
              </span>
              <span>{status.ativo ? "ATENDENDO HOJE" : "SEM PONTO FIXO HOJE"}</span>
            </div>

            {status.ativo ? (
              <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12, marginTop: 9 }}>
                <div style={{ fontFamily: "'Big Shoulders Display',sans-serif", fontWeight: 800, textTransform: "uppercase", fontSize: 26, lineHeight: 0.95 }}>{status.local || "Local a confirmar"}</div>
                <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 12, color: "#E0BE99", whiteSpace: "nowrap" }}>{status.horario}</div>
              </div>
            ) : (
              <p style={{ fontSize: 14.5, color: "#D3B79A", margin: "9px 0 0" }}>Hoje sem ponto fixo — chame no WhatsApp pra combinar.</p>
            )}
          </div>

          <div style={{ display: "flex", justifyContent: "center", paddingBottom: 10 }}>
            <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 10, letterSpacing: ".18em", textTransform: "uppercase", color: "rgba(237,234,224,.55)" }}>deslize ↓</span>
          </div>
        </div>

        {/* PAINEL 2 · serviços + como funciona */}
        <div className="panel" style={{ minHeight: "calc(100dvh - 96px)", display: "flex", flexDirection: "column", justifyContent: "center", gap: 12, padding: "26px 0" }}>
          <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 10.5, letterSpacing: ".18em", textTransform: "uppercase", color: "#8FE3CC" }}>O que eu faço</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <div style={{ background: "rgba(10,32,36,.42)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", border: "1px solid rgba(143,227,204,.22)", borderRadius: 18, padding: 16, display: "flex", flexDirection: "column", gap: 8, minHeight: 142 }}>
              <h3 style={{ fontFamily: "'Big Shoulders Display',sans-serif", fontWeight: 800, textTransform: "uppercase", margin: 0, fontSize: 24, lineHeight: 0.95 }}>Quick<br />Massagem</h3>
              <p style={{ margin: "auto 0 0", fontSize: 14, opacity: 0.88 }}>Encontrou, é hora. Ou combine antes, se preferir.</p>
            </div>
            <div style={{ background: "rgba(48,30,23,.44)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", border: "1px solid rgba(201,138,96,.35)", borderRadius: 18, padding: 16, display: "flex", flexDirection: "column", gap: 8, minHeight: 142 }}>
              <h3 style={{ fontFamily: "'Big Shoulders Display',sans-serif", fontWeight: 800, textTransform: "uppercase", margin: 0, fontSize: 24, lineHeight: 0.95 }}>Recovery</h3>
              <p style={{ margin: "auto 0 0", fontSize: 14, opacity: 0.88 }}>Cuidado pro corpo depois de um dia intenso.</p>
            </div>
          </div>

          <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 10.5, letterSpacing: ".18em", textTransform: "uppercase", color: "#8FE3CC", marginTop: 12 }}>Como funciona</div>
          <div style={{ display: "grid", gap: 1, background: "rgba(237,234,224,.14)", borderRadius: 18, overflow: "hidden" }}>
            <div style={{ background: "rgba(7,19,28,.55)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", padding: 16 }}>
              <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 10, letterSpacing: ".12em", textTransform: "uppercase", color: "#8FE3CC" }}>Espontâneo</div>
              <div style={{ fontWeight: 600, fontSize: 17, marginTop: 5 }}>Encontrou por aqui</div>
              <p style={{ fontSize: 14, margin: "5px 0 0", opacity: 0.86 }}>Veja em &ldquo;Atendendo hoje&rdquo; onde estou e apareça.</p>
            </div>
            <div style={{ background: "rgba(7,19,28,.55)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", padding: 16 }}>
              <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 10, letterSpacing: ".12em", textTransform: "uppercase", color: "#E6A87C" }}>Combinado</div>
              <div style={{ fontWeight: 600, fontSize: 17, marginTop: 5 }}>Prefere combinar</div>
              <p style={{ fontSize: 14, margin: "5px 0 0", opacity: 0.86 }}>Quer garantir um horário? Chame no WhatsApp.</p>
            </div>
          </div>
        </div>

        {/* PAINEL 2.5 · galeria de atendimentos */}
        <div className="panel" style={{ minHeight: "calc(100dvh - 96px)", display: "flex", flexDirection: "column", justifyContent: "center", padding: "26px 0" }}>
          <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 10.5, letterSpacing: ".18em", textTransform: "uppercase", color: "#8FE3CC", marginBottom: 4 }}>Atendimentos</div>
          <p style={{ fontSize: 14.5, opacity: 0.86, margin: "0 0 16px", maxWidth: "32ch" }}>Alguns registros do trabalho em Rolante — na natureza e no consultório Alba.</p>
          <Galeria />
        </div>

        {/* PAINEL 3 · sobre + pra quem */}
        <div className="panel" style={{ minHeight: "calc(100dvh - 96px)", display: "flex", flexDirection: "column", justifyContent: "center", padding: "26px 0" }}>
          <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 10.5, letterSpacing: ".18em", textTransform: "uppercase", color: "#8FE3CC", marginBottom: 14 }}>Quem atende</div>
          <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
            <div style={{ width: 84, height: 106, borderRadius: 14, flexShrink: 0, background: "repeating-linear-gradient(135deg, rgba(237,234,224,.08) 0 6px, rgba(237,234,224,.02) 6px 12px)", border: "1px dashed rgba(201,160,122,.6)", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", fontFamily: "'IBM Plex Mono',monospace", fontSize: 9.5, color: "#D3B79A", padding: 5 }}>sua<br />foto</div>
            <p style={{ fontSize: 15, opacity: 0.92, margin: 0 }}>Pedro Siqueira — terapeuta manual, com formação em terapia manual e chair massage. Construo minha prática ao lado da Marcela, fisioterapeuta, no consultório Alba, em Rolante (RS). Em Guriú, levo esse cuidado até a praia: um atendimento completo, feito ao ar livre, com os pés na areia.</p>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 20 }}>
            <span style={{ border: "1px solid rgba(237,234,224,.18)", borderRadius: 100, padding: "8px 14px", fontSize: 13.5, color: "#E0BE99" }}>Turistas</span>
            <span style={{ border: "1px solid rgba(237,234,224,.18)", borderRadius: 100, padding: "8px 14px", fontSize: 13.5, color: "#E0BE99" }}>Esportistas</span>
            <span style={{ border: "1px solid rgba(237,234,224,.18)", borderRadius: 100, padding: "8px 14px", fontSize: 13.5, color: "#E0BE99" }}>Hospedados por aqui</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, marginTop: 24, paddingTop: 16, borderTop: "1px solid rgba(237,234,224,.14)" }}>
            <div>
              <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 10, letterSpacing: ".16em", textTransform: "uppercase", color: "#8FE3CC" }}>Bastidores · TikTok</div>
              <p style={{ fontSize: 13.5, opacity: 0.82, margin: "5px 0 0" }}>
                {TIKTOK_ATIVO ? "Acompanhe os bastidores dos atendimentos em Guriú." : "Em breve, vídeos dos atendimentos e da rotina em Guriú."}
              </p>
            </div>
            {TIKTOK_ATIVO && (
              <a href={TIKTOK_LINK} target="_blank" rel="noreferrer" style={{ flexShrink: 0, padding: "11px 15px", borderRadius: 100, border: "1px solid rgba(237,234,224,.26)", color: "#EDEAE0", fontWeight: 600, fontSize: 13.5 }}>Ver</a>
            )}
          </div>
        </div>

        {/* PAINEL 4 · contato */}
        <div className="panel" style={{ minHeight: "calc(100dvh - 96px)", display: "flex", flexDirection: "column", justifyContent: "center", padding: "26px 0" }}>
          <div style={{ background: "rgba(10,32,36,.5)", backdropFilter: "blur(22px)", WebkitBackdropFilter: "blur(22px)", border: "1px solid rgba(143,227,204,.26)", borderRadius: 24, padding: 26, display: "flex", flexDirection: "column", alignItems: "center", gap: 18, boxShadow: "0 18px 50px rgba(3,12,18,.45)" }}>
            <div style={{ fontFamily: "'Big Shoulders Display',sans-serif", fontWeight: 800, textTransform: "uppercase", fontSize: 34, lineHeight: 0.92, textAlign: "center" }}>Fale comigo</div>
            <p style={{ fontSize: 15, opacity: 0.88, textAlign: "center", margin: 0, maxWidth: "26ch" }}>Chame no WhatsApp e combine seu atendimento em Guriú.</p>
            <a href={waUrl} target="_blank" rel="noreferrer" style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: 52, padding: "14px 28px", borderRadius: 16, background: "#6FE0C0", color: "#062018", fontWeight: 600, fontSize: 15.5 }}>Chamar no WhatsApp</a>
            <p style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 10, color: "#B58A69", letterSpacing: ".06em", margin: "4px 0 0", textAlign: "center" }}>PEDRO SIQUEIRA · TERAPEUTA MANUAL · GURIÚ, CE</p>
          </div>
        </div>

      </div>

      {/* BARRA DE AÇÃO FIXA */}
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, zIndex: 5, padding: "12px 18px calc(12px + env(safe-area-inset-bottom))", background: "linear-gradient(180deg, rgba(7,19,28,0) 0%, rgba(7,19,28,.82) 45%)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 9 }}>
          <a href={waUrl} target="_blank" rel="noreferrer" style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: 52, padding: "14px 18px", borderRadius: 16, background: "#6FE0C0", color: "#062018", fontWeight: 600, fontSize: 15.5 }}>Chamar no WhatsApp</a>
          <a href="#hoje" style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: 52, padding: "14px 18px", borderRadius: 16, border: "1px solid rgba(237,234,224,.26)", color: "#EDEAE0", fontFamily: "'IBM Plex Mono',monospace", fontSize: 11, letterSpacing: ".12em", textTransform: "uppercase" }}>Hoje</a>
        </div>
      </div>
    </div>
  );
}
