import { lerStatus } from "@/lib/kv";
import { Video } from "@/components/Galeria";
import { BarraAcao } from "@/components/BarraAcao";

export const dynamic = "force-dynamic"; // sempre busca o status mais recente

const WHATSAPP = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "5551980602183").replace(/\D/g, "");
const INSTAGRAM_LINK = process.env.NEXT_PUBLIC_INSTAGRAM_LINK || "https://www.instagram.com/pedrosiqueiraterapeuta/";
const TIKTOK_ATIVO = process.env.NEXT_PUBLIC_TIKTOK_ATIVO === "true";
const TIKTOK_LINK_2 = process.env.NEXT_PUBLIC_TIKTOK_LINK_2 || "https://www.tiktok.com/@quickmassage.viladejeri";

// Quem atende. Pra trocar a foto, é só mudar o caminho em "foto".
const EQUIPE = [
  {
    nome: "Pedro Siqueira",
    funcao: "Terapeuta manual",
    foto: "/quem-atende/pedro-siqueira-noite.jpg",
    posicao: "50% 50%",
    texto: "Formação em terapia manual e chair massage. Quick massagem e recovery.",
  },
  {
    nome: "Marcela",
    funcao: "Fisioterapeuta",
    foto: "/quem-atende/marcela.jpg",
    posicao: "50% 0%",
    texto: "Quick massagem e massagem de panturrilhas e pés.",
  },
];

export default async function Home() {
  const status = await lerStatus();
  const msg = encodeURIComponent("Oi, Pedro! Vi seu site e queria saber sobre um atendimento.");
  const waUrl = `https://wa.me/${WHATSAPP}?text=${msg}`;
  const ativo = status.ativo;
  const local = status.local || "Local a confirmar";

  // Links com foto da seção final. Cada bloco inteiro é clicável.
  type LinkFoto = { href: string; externo: boolean; foto: string; posicao?: string; rotulo: string; titulo: string; desc: string };
  const links: LinkFoto[] = [
    {
      href: waUrl,
      externo: true,
      foto: "/fotos/pedro-jeri.jpg",
      posicao: "78% 40%",
      rotulo: "WhatsApp",
      titulo: "Agendar atendimento",
      desc: "Combine o horário e o local que ficam bons pra você.",
    },
    {
      href: "/servicos",
      externo: false,
      foto: "/galeria/atendimento-foto-1.jpg",
      posicao: "72% 50%",
      rotulo: "O que a gente faz",
      titulo: "Quick massagem & recovery",
      desc: "Durações, técnicas e como funciona.",
    },
    {
      href: "#hoje",
      externo: false,
      foto: "/fotos/marcela-atendendo.jpg",
      posicao: "50% 25%",
      rotulo: ativo ? "Atendendo hoje" : "Hoje",
      titulo: "Onde estamos hoje",
      desc: ativo ? `${local}${status.horario ? ` · ${status.horario}` : ""}` : "Sem ponto fixo. Combine pelo WhatsApp.",
    },
    {
      href: INSTAGRAM_LINK,
      externo: true,
      foto: "/fotos/pedro-ombro.jpg",
      posicao: "12% 50%",
      rotulo: "Instagram",
      titulo: "Bastidores",
      desc: "@pedrosiqueiraterapeuta",
    },
    ...(TIKTOK_ATIVO
      ? [
          { href: TIKTOK_LINK_2, externo: true, foto: "/galeria/poster-praia-1.jpg", posicao: "50% 70%", rotulo: "TikTok", titulo: "Quick massage Jeri", desc: "@quickmassage.viladejeri" },
        ]
      : []),
  ];

  return (
    <>
      <main>
        {/* HERO */}
        <section className="hero" id="topo">
          <div className="wrap">
            <div className="hero-cabeca">
              <h1 className="display">
                Massagem
                <br />
                {" "}<span className="amp">&amp;</span> recovery
              </h1>
            </div>

            <div className="hero-corpo">
              <p className="lead">
                Quick massagem na cadeira que levamos até você. Sessão objetiva, direto no que o corpo está pedindo.
              </p>
              <div className="hero-acoes">
                <a className="btn btn-escuro" href={waUrl} target="_blank" rel="noreferrer">
                  Chamar no WhatsApp
                </a>
              </div>

              <div className="hoje" id="hoje">
                <div className={`topo ${ativo ? "ao-vivo" : "fora"}`}>
                  <span className={`ponto ${ativo ? "ao-vivo" : ""}`} />
                  {ativo ? "Atendendo hoje" : "Hoje sem ponto fixo"}
                </div>
                {ativo ? (
                  <>
                    <div className="local">{local}</div>
                    {status.horario && <div className="horario">{status.horario}</div>}
                    <div className="nota">Encontrou por aqui? Pode chegar. Prefere garantir horário? Chame no WhatsApp.</div>
                  </>
                ) : (
                  <>
                    <div className="local">Combine seu horário</div>
                    <div className="nota">Chame no WhatsApp e a gente marca onde e quando fica bom pra você.</div>
                  </>
                )}
              </div>
            </div>

            <div className="hero-foto">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/hero/atendimento-noite-jeri.jpg" alt="Pedro Siqueira fazendo massagem na cadeira, à noite em Jeri" />
            </div>
          </div>
        </section>

        {/* QUEM ATENDE */}
        <section className="secao">
          <div className="wrap">
            <div className="secao-topo">
              <div>
                <p className="rotulo">Quem atende</p>
                <h2 className="display">Pedro <span className="amp">&amp;</span> Marcela</h2>
              </div>
              <p>
                Construímos nossa prática juntos no consultório Alba, em Rolante (RS). Em Jeri, levamos esse cuidado até a
                praia: um atendimento completo, feito ao ar livre, com os pés na areia.
              </p>
            </div>

            <div className="pessoas">
              {EQUIPE.map((p) => (
                <div className="pessoa" key={p.nome}>
                  <div className="pessoa-foto">
                    {p.foto ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={p.foto} alt={`${p.nome}, ${p.funcao.toLowerCase()}`} loading="lazy" style={{ objectPosition: p.posicao }} />
                    ) : (
                      <span className="pessoa-sem-foto">{p.nome[0]}</span>
                    )}
                  </div>
                  <p className="rotulo">{p.funcao}</p>
                  <h3 className="pessoa-nome">{p.nome}</h3>
                  <p className="pessoa-texto">{p.texto}</p>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* VÍDEOS NOVOS · Marcela sempre primeiro */}
        <section className="secao secao-videos">
          <div className="wrap">
            <div className="videos-dupla">
              <div className="videos-texto">
                <p className="rotulo">Atendimentos</p>
                <h2 className="display">Na areia e na praça</h2>
                <a className="btn btn-escuro" href="/servicos">
                  Conheça os serviços →
                </a>
              </div>
              <div className="servicos-video">
                <Video src="/galeria/marcela-areia-de-cima.mp4" poster="/galeria/poster-marcela-areia.jpg" legenda="Marcela atendendo na areia, vista de cima" />
              </div>
              <div className="servicos-video">
                <Video src="/galeria/pedro-praca-noite.mp4" poster="/galeria/poster-pedro-praca-noite.jpg" legenda="Pedro atendendo na praça da vila, à noite" />
              </div>
            </div>
          </div>
        </section>

        {/* CONTATO */}
        <section className="contato" id="contato">
          <div className="wrap">
            <h2 className="display">Fale com a gente</h2>
            <p className="lead">Chame no WhatsApp e combine seu atendimento.</p>

            <div className="links">
              {links.map((l) => (
                <a
                  key={l.href + l.titulo}
                  className="link"
                  href={l.href}
                  {...(l.externo ? { target: "_blank", rel: "noreferrer" } : {})}
                >
                  <div className="link-foto">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={l.foto} alt="" loading="lazy" style={{ objectPosition: l.posicao || "50% 50%" }} />
                    <span className="link-seta" aria-hidden>
                      {l.externo ? "↗" : l.href.startsWith("#") ? "↑" : "→"}
                    </span>
                  </div>
                  <div className="link-texto">
                    <span className="link-rotulo">{l.rotulo}</span>
                    <span className="link-titulo">{l.titulo}</span>
                    <span className="link-desc">{l.desc}</span>
                  </div>
                </a>
              ))}
            </div>

            <div className="assinatura">
              <span>Pedro Siqueira &amp; Marcela</span>
              <span>Quick Massagem &amp; Recovery</span>
            </div>
          </div>
        </section>
      </main>

      <BarraAcao waUrl={waUrl} />
    </>
  );
}
