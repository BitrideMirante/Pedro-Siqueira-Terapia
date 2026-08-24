import { lerStatus } from "@/lib/kv";
import { Waves } from "@/components/Waves";
import { Galeria } from "@/components/Galeria";
import { BarraAcao } from "@/components/BarraAcao";

export const dynamic = "force-dynamic"; // sempre busca o status mais recente

const WHATSAPP = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "5551980602183").replace(/\D/g, "");
const TIKTOK_ATIVO = process.env.NEXT_PUBLIC_TIKTOK_ATIVO === "true";
const TIKTOK_LINK = process.env.NEXT_PUBLIC_TIKTOK_LINK || "https://tiktok.com/@...";

export default async function Home() {
  const status = await lerStatus();
  const msg = encodeURIComponent("Oi, Pedro! Vi seu cartão e queria saber sobre um atendimento.");
  const waUrl = `https://wa.me/${WHATSAPP}?text=${msg}`;

  return (
    <div style={{ position: "relative", height: "100dvh", maxWidth: 520, margin: "0 auto", background: "#F3E9DA", overflow: "hidden", containerType: "inline-size" as any }}>

      <div style={{ position: "absolute", inset: "-6% -4%", zIndex: 0, pointerEvents: "none", filter: "blur(2.5px) saturate(1.05)", animation: "drift 46s ease-in-out infinite alternate" }}>
        <Waves intensidade={1} tomAreia={1} />
      </div>
      <div style={{ position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none", background: "radial-gradient(120% 65% at 50% 0%, rgba(243,233,218,.35) 0%, rgba(243,233,218,.05) 42%, rgba(243,233,218,.55) 100%)" }} />

      <div className="snap" style={{ position: "relative", zIndex: 2, height: "100%", overflowY: "auto", padding: "0 18px calc(96px + env(safe-area-inset-bottom))" }}>

        {/* PAINEL 1 · foto + o que é + duração + ação */}
        <div id="hoje" className="panel" style={{ position: "relative", margin: "0 -18px" }}>
          <div style={{ position: "relative", width: "100%", aspectRatio: "4 / 5", overflow: "hidden" }}>
            <img src="/hero/massagem-praia.jpg" alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "60% 42%" }} />
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "36%", background: "linear-gradient(180deg, rgba(61,46,34,.55) 0%, rgba(61,46,34,0) 100%)" }} />
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "22%", background: "linear-gradient(180deg, rgba(243,233,218,0) 0%, #F3E9DA 100%)" }} />

            <div style={{ position: "absolute", top: 0, left: 0, right: 0, zIndex: 2, padding: "calc(20px + env(safe-area-inset-top)) 18px 0", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
              <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 10.5, letterSpacing: ".14em", textTransform: "uppercase", color: "#FBF3E7", opacity: 0.95 }}>Pedro Siqueira</span>
              <span style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: "'IBM Plex Mono',monospace", fontSize: 9.5, letterSpacing: ".1em", textTransform: "uppercase", color: "#5C3A20", background: "rgba(243,233,218,.75)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)", border: "1px solid rgba(61,46,34,.2)", borderRadius: 100, padding: "6px 10px" }}>
                <span style={{ position: "relative", width: 6, height: 6, borderRadius: "50%", background: "#C97B3D", flexShrink: 0 }}>
                  <span style={{ position: "absolute", inset: -6, borderRadius: "50%", border: "1px solid #C97B3D", animation: "pulse 2.4s ease-out infinite" }} />
                </span>
                <span>{status.ativo ? "Atendendo hoje" : "Sem ponto fixo hoje"}</span>
              </span>
            </div>
          </div>

          <div style={{ position: "relative", zIndex: 2, padding: "10px 18px 18px", color: "#3D2E22", background: "#F3E9DA" }}>
            <div style={{ fontFamily: "'Big Shoulders Display',sans-serif", fontWeight: 900, textTransform: "uppercase", lineHeight: 0.94, fontSize: "clamp(23px,6.4cqw,27px)", marginBottom: 6 }}>
              Massagem &amp; recovery<br />na praia
            </div>

            {status.ativo ? (
              <p style={{ fontSize: 14.5, opacity: 0.85, margin: "0 0 12px", maxWidth: "30ch", color: "#5C4632" }}>
                Hoje em <strong>{status.local || "local a confirmar"}</strong>{status.horario ? ` · ${status.horario}` : ""}. Encontrou por aqui ou combine antes — o corpo agradece.
              </p>
            ) : (
              <p style={{ fontSize: 14.5, opacity: 0.85, margin: "0 0 12px", maxWidth: "30ch", color: "#5C4632" }}>
                Hoje sem ponto fixo — chame no WhatsApp e combine. O corpo agradece.
              </p>
            )}

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 12 }}>
              <div style={{ background: "rgba(255,250,242,.7)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", border: "1px solid rgba(201,123,61,.35)", borderRadius: 14, padding: "9px 10px", display: "flex", alignItems: "baseline", justifyContent: "center", gap: 6 }}>
                <span style={{ fontFamily: "'Big Shoulders Display',sans-serif", fontWeight: 800, fontSize: 19, lineHeight: 1, color: "#3D2E22" }}>20 min</span>
                <span style={{ fontSize: 11, opacity: 0.75, color: "#5C4632" }}>· Alívio rápido</span>
              </div>
              <div style={{ background: "rgba(255,250,242,.7)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", border: "1px solid rgba(201,123,61,.35)", borderRadius: 14, padding: "9px 10px", display: "flex", alignItems: "baseline", justifyContent: "center", gap: 6 }}>
                <span style={{ fontFamily: "'Big Shoulders Display',sans-serif", fontWeight: 800, fontSize: 19, lineHeight: 1, color: "#3D2E22" }}>30 min</span>
                <span style={{ fontSize: 11, opacity: 0.75, color: "#5C4632" }}>· Completa</span>
              </div>
            </div>

            <a href={waUrl} target="_blank" rel="noreferrer" style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: 52, borderRadius: 16, background: "#C97B3D", color: "#FBF3E7", fontWeight: 600, fontSize: 15.5, textDecoration: "none" }}>Chamar no WhatsApp</a>
            <div style={{ textAlign: "center", marginTop: 8, fontSize: 11.5, color: "#7A5C3E", opacity: 0.9 }}>Pix, cartão ou dinheiro</div>
          </div>
        </div>

        {/* PAINEL 2 · galeria de atendimentos */}
        <div className="panel" style={{ minHeight: "calc(100dvh - 96px)", display: "flex", flexDirection: "column", justifyContent: "center", padding: "26px 0" }}>
          <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 10.5, letterSpacing: ".18em", textTransform: "uppercase", color: "#C97B3D", marginBottom: 4 }}>Atendimentos</div>
          <p style={{ fontSize: 14, opacity: 0.86, margin: "0 0 16px", maxWidth: "32ch", color: "#5C4632" }}>Rolante, na natureza e no consultório Alba.</p>
          <Galeria />
        </div>

        {/* PAINEL 3 · serviços + como funciona */}
        <div className="panel" style={{ minHeight: "calc(100dvh - 96px)", display: "flex", flexDirection: "column", justifyContent: "center", gap: 12, padding: "26px 0" }}>
          <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 10.5, letterSpacing: ".18em", textTransform: "uppercase", color: "#C97B3D" }}>O que eu faço</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <div style={{ background: "rgba(255,250,242,.6)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", border: "1px solid rgba(201,123,61,.3)", borderRadius: 18, padding: 16, display: "flex", flexDirection: "column", gap: 8, minHeight: 142 }}>
              <h3 style={{ fontFamily: "'Big Shoulders Display',sans-serif", fontWeight: 800, textTransform: "uppercase", margin: 0, fontSize: 24, lineHeight: 0.95, color: "#3D2E22" }}>Quick<br />Massagem</h3>
              <p style={{ margin: "auto 0 0", fontSize: 14, opacity: 0.88, color: "#5C4632" }}>Encontrou, é hora. Ou combine antes, se preferir.</p>
            </div>
            <div style={{ background: "rgba(232,206,171,.55)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", border: "1px solid rgba(168,187,147,.5)", borderRadius: 18, padding: 16, display: "flex", flexDirection: "column", gap: 8, minHeight: 142 }}>
              <h3 style={{ fontFamily: "'Big Shoulders Display',sans-serif", fontWeight: 800, textTransform: "uppercase", margin: 0, fontSize: 24, lineHeight: 0.95, color: "#3D2E22" }}>Recovery</h3>
              <p style={{ margin: "auto 0 0", fontSize: 14, opacity: 0.88, color: "#5C4632" }}>Cuidado pro corpo depois de um dia intenso.</p>
            </div>
          </div>

          <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 10.5, letterSpacing: ".18em", textTransform: "uppercase", color: "#C97B3D", marginTop: 12 }}>Como funciona</div>
          <div style={{ display: "grid", gap: 1, background: "rgba(61,46,34,.12)", borderRadius: 18, overflow: "hidden" }}>
            <div style={{ background: "rgba(255,250,242,.55)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", padding: 16 }}>
              <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 10, letterSpacing: ".12em", textTransform: "uppercase", color: "#C97B3D" }}>Espontâneo</div>
              <div style={{ fontWeight: 600, fontSize: 17, marginTop: 5, color: "#3D2E22" }}>Encontrou por aqui</div>
              <p style={{ fontSize: 14, margin: "5px 0 0", opacity: 0.86, color: "#5C4632" }}>Veja em &ldquo;Atendendo hoje&rdquo; onde estou e apareça.</p>
            </div>
            <div style={{ background: "rgba(255,250,242,.55)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", padding: 16 }}>
              <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 10, letterSpacing: ".12em", textTransform: "uppercase", color: "#7C9473" }}>Combinado</div>
              <div style={{ fontWeight: 600, fontSize: 17, marginTop: 5, color: "#3D2E22" }}>Prefere combinar</div>
              <p style={{ fontSize: 14, margin: "5px 0 0", opacity: 0.86, color: "#5C4632" }}>Quer garantir um horário? Chame no WhatsApp.</p>
            </div>
          </div>
        </div>

        {/* PAINEL 4 · sobre + pra quem */}
        <div className="panel" style={{ minHeight: "calc(100dvh - 96px)", display: "flex", flexDirection: "column", justifyContent: "center", padding: "26px 0" }}>
          <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 10.5, letterSpacing: ".18em", textTransform: "uppercase", color: "#C97B3D", marginBottom: 14 }}>Quem atende</div>
          <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
            <div style={{ width: 84, height: 106, borderRadius: 14, flexShrink: 0, background: "repeating-linear-gradient(135deg, rgba(61,46,34,.05) 0 6px, rgba(61,46,34,.02) 6px 12px)", border: "1px dashed rgba(201,123,61,.5)", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", fontFamily: "'IBM Plex Mono',monospace", fontSize: 9.5, color: "#7A5C3E", padding: 5 }}>sua<br />foto</div>
            <p style={{ fontSize: 15, opacity: 0.92, margin: 0, color: "#3D2E22" }}>Pedro Siqueira — terapeuta manual, com formação em terapia manual e chair massage. Construo minha prática ao lado da Marcela, fisioterapeuta, no consultório Alba, em Rolante (RS). Em Guriú, levo esse cuidado até a praia: um atendimento completo, feito ao ar livre, com os pés na areia.</p>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 20 }}>
            <span style={{ border: "1px solid rgba(61,46,34,.18)", borderRadius: 100, padding: "8px 14px", fontSize: 13.5, color: "#5C3A20" }}>Turistas</span>
            <span style={{ border: "1px solid rgba(61,46,34,.18)", borderRadius: 100, padding: "8px 14px", fontSize: 13.5, color: "#5C3A20" }}>Esportistas</span>
            <span style={{ border: "1px solid rgba(61,46,34,.18)", borderRadius: 100, padding: "8px 14px", fontSize: 13.5, color: "#5C3A20" }}>Hospedados por aqui</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, marginTop: 24, paddingTop: 16, borderTop: "1px solid rgba(61,46,34,.14)" }}>
            <div>
              <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 10, letterSpacing: ".16em", textTransform: "uppercase", color: "#C97B3D" }}>Bastidores · TikTok</div>
              <p style={{ fontSize: 13.5, opacity: 0.82, margin: "5px 0 0", color: "#5C4632" }}>
                {TIKTOK_ATIVO ? "Acompanhe os bastidores dos atendimentos em Guriú." : "Em breve, vídeos dos atendimentos e da rotina em Guriú."}
              </p>
            </div>
            {TIKTOK_ATIVO && (
              <a href={TIKTOK_LINK} target="_blank" rel="noreferrer" style={{ flexShrink: 0, padding: "11px 15px", borderRadius: 100, border: "1px solid rgba(61,46,34,.26)", color: "#3D2E22", fontWeight: 600, fontSize: 13.5 }}>Ver</a>
            )}
          </div>
        </div>

        {/* PAINEL 5 · contato */}
        <div id="contato" className="panel" style={{ minHeight: "calc(100dvh - 96px)", display: "flex", flexDirection: "column", justifyContent: "center", padding: "26px 0" }}>
          <div style={{ background: "rgba(255,250,242,.7)", backdropFilter: "blur(22px)", WebkitBackdropFilter: "blur(22px)", border: "1px solid rgba(201,123,61,.3)", borderRadius: 24, padding: 26, display: "flex", flexDirection: "column", alignItems: "center", gap: 18, boxShadow: "0 18px 50px rgba(61,40,20,.18)" }}>
            <div style={{ fontFamily: "'Big Shoulders Display',sans-serif", fontWeight: 800, textTransform: "uppercase", fontSize: 34, lineHeight: 0.92, textAlign: "center", color: "#3D2E22" }}>Fale comigo</div>
            <p style={{ fontSize: 15, opacity: 0.88, textAlign: "center", margin: 0, maxWidth: "26ch", color: "#5C4632" }}>Chame no WhatsApp e combine seu atendimento em Guriú.</p>
            <a href={waUrl} target="_blank" rel="noreferrer" style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: 52, padding: "14px 28px", borderRadius: 16, background: "#C97B3D", color: "#FBF3E7", fontWeight: 600, fontSize: 15.5 }}>Chamar no WhatsApp</a>
            <p style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 10, color: "#7A5C3E", letterSpacing: ".06em", margin: "4px 0 0", textAlign: "center" }}>PEDRO SIQUEIRA · TERAPEUTA MANUAL · GURIÚ, CE</p>
          </div>
        </div>

      </div>

      {/* BARRA DE AÇÃO FIXA */}
      <BarraAcao waUrl={waUrl} />
    </div>
  );
}
