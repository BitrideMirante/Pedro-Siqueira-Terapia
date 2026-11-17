import { lerStatus } from "@/lib/kv";
import { Galeria } from "@/components/Galeria";
import { BarraAcao } from "@/components/BarraAcao";

export const dynamic = "force-dynamic"; // sempre busca o status mais recente

const WHATSAPP = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "5551980602183").replace(/\D/g, "");
const INSTAGRAM_LINK = process.env.NEXT_PUBLIC_INSTAGRAM_LINK || "https://www.instagram.com/pedrosiqueiraterapeuta/";
const TIKTOK_ATIVO = process.env.NEXT_PUBLIC_TIKTOK_ATIVO === "true";
const TIKTOK_LINK = process.env.NEXT_PUBLIC_TIKTOK_LINK || "https://www.tiktok.com/@pedrosiqueiraterapeuta";
const TIKTOK_LINK_2 = process.env.NEXT_PUBLIC_TIKTOK_LINK_2 || "https://www.tiktok.com/@quickmassage.viladejeri";

const DURACOES = [
  { min: "15", desc: "Pausa rápida" },
  { min: "20", desc: "Alívio rápido" },
  { min: "30", desc: "Completa" },
];

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

const TECNICAS = ["Shiatsu", "Liberação miofascial", "Técnicas de quiropraxia", "Movimentos de Thai massagem", "Alinhamento Seitai"];

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
          { href: TIKTOK_LINK, externo: true, foto: "/galeria/poster-1.jpg", rotulo: "TikTok", titulo: "Vídeos", desc: "@pedrosiqueiraterapeuta" },
          { href: TIKTOK_LINK_2, externo: true, foto: "/galeria/poster-praia-1.jpg", posicao: "50% 70%", rotulo: "TikTok", titulo: "Quick massage Jeri", desc: "@quickmassage.viladejeri" },
        ]
      : []),
  ];

  return (
    <>
      {/* STATUS DO DIA · sempre visível no topo */}
      <div className="status-barra">
        <div className="wrap">
          <div className="info">
            <span className={`ponto ${ativo ? "ao-vivo" : ""}`} />
            <strong>{ativo ? "Atendendo hoje" : "Sem ponto fixo hoje"}</strong>
            <span style={{ opacity: 0.75 }}>
              {ativo ? `${local}${status.horario ? ` · ${status.horario}` : ""}` : "Combine no WhatsApp"}
            </span>
          </div>
          <a href="#hoje">Ver →</a>
        </div>
      </div>

      <main>
        {/* HERO */}
        <section className="hero" id="topo">
          <div className="wrap">
            <div className="hero-cabeca">
              <div className="marca">
                <b>Pedro Siqueira</b>
                <span>Terapeuta manual</span>
              </div>
              <h1 className="display">
                Massagem
                <br className="so-celular" />
                {" "}&amp; recovery
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
                <small>Pix, cartão ou dinheiro</small>
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

        {/* ATENDIMENTOS · o trabalho em foto e vídeo */}
        <section className="secao">
          <div className="wrap">
            <div className="secao-topo">
              <div>
                <p className="rotulo">Atendimentos</p>
                <h2 className="display">O trabalho</h2>
              </div>
              <p>Jeri, Rolante e no consultório Alba.</p>
            </div>
            <Galeria />
          </div>
        </section>

        {/* SERVIÇO */}
        <section className="secao">
          <div className="wrap">
            <div className="secao-topo">
              <div>
                <p className="rotulo">O que a gente faz</p>
                <h2 className="display">
                  Quick massagem
                  <br />
                  &amp; recovery
                </h2>
              </div>
            </div>

            <div className="duracoes">
              {DURACOES.map((d) => (
                <div key={d.min}>
                  <div className="num">
                    {d.min}
                    <small>min</small>
                  </div>
                  <div className="desc">{d.desc}</div>
                </div>
              ))}
            </div>

            <div className="servicos">
              <div>
                <p className="rotulo">Quick Massagem · a cadeira</p>
                <p>A cadeira de massagem que levamos até você: leve, prática e pronta pra atender ao ar livre.</p>
              </div>
              <div>
                <p className="rotulo">Recovery · a técnica</p>
                <p>
                  Misturo várias terapias numa sessão só, de acordo com o que o seu corpo está pedindo naquele dia. Na Quick,
                  a massagem é objetiva: vai direto no que precisa de alívio, pra recuperar o corpo de atletas e de quem
                  está cansado.
                </p>
              </div>
              <div>
                <p className="rotulo">Panturrilhas e pés · com a Marcela</p>
                <p>Massagem nas panturrilhas e nos pés, pra quem passou o dia caminhando ou no esporte.</p>
              </div>
              <div>
                <p className="rotulo">O mix de técnicas</p>
                <div className="chips">
                  {TECNICAS.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="como">
              <div>
                <p className="rotulo">Espontâneo</p>
                <h4>Encontrou por aqui</h4>
                <p>Veja no topo do site onde estamos atendendo hoje e apareça.</p>
              </div>
              <div>
                <p className="rotulo">Combinado</p>
                <h4>Prefere garantir horário</h4>
                <p>Chame no WhatsApp e a gente combina.</p>
              </div>
            </div>
          </div>
        </section>

        {/* QUEM ATENDE */}
        <section className="secao">
          <div className="wrap">
            <div className="secao-topo">
              <div>
                <p className="rotulo">Quem atende</p>
                <h2 className="display">Pedro &amp; Marcela</h2>
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
                      {l.externo ? "↗" : "↑"}
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
              <span>Quick Massagem &amp; Recovery · Pix, cartão ou dinheiro</span>
            </div>
          </div>
        </section>
      </main>

      <BarraAcao waUrl={waUrl} />
    </>
  );
}
