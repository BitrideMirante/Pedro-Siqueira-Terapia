import { lerStatus } from "@/lib/kv";
import { Video } from "@/components/Galeria";
import { BarraAcao } from "@/components/BarraAcao";

export const dynamic = "force-dynamic"; // sempre busca o status mais recente

const WHATSAPP = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "5551980602183").replace(/\D/g, "");
const INSTAGRAM_LINK = process.env.NEXT_PUBLIC_INSTAGRAM_LINK || "https://www.instagram.com/pedrosiqueiraterapeuta/";
const TIKTOK_ATIVO = process.env.NEXT_PUBLIC_TIKTOK_ATIVO === "true";
// Link do nosso ponto no Google Maps. Quando existir, é só colar aqui
// (ou criar NEXT_PUBLIC_MAPS_LINK na Vercel) que o "Onde estamos hoje" passa a abrir o mapa.
const MAPS_LINK = process.env.NEXT_PUBLIC_MAPS_LINK || "";
const TIKTOK_LINK_2 = process.env.NEXT_PUBLIC_TIKTOK_LINK_2 || "https://www.tiktok.com/@quickmassage.viladejeri";

// Quem atende. Pra trocar a foto, é só mudar o caminho em "foto".
const EQUIPE = [
  {
    nome: "Pedro Siqueira",
    funcao: "Terapeuta manual",
    foto: "/quem-atende/pedro-braco.jpg",
    posicao: "57% 50%",
    texto: "Formação em terapia manual e chair massage. Quick massagem e recovery.",
  },
  {
    nome: "Marcela",
    funcao: "Fisioterapeuta",
    foto: "/quem-atende/marcela-retrato.jpg",
    posicao: "50% 35%",
    texto: "Quick massagem e massagem nas pernas, com drenagem e liberação.",
  },
];

export default async function Home() {
  const status = await lerStatus();
  const msg = encodeURIComponent("Oi, Pedro! Vi seu site e queria saber sobre um atendimento.");
  const waUrl = `https://wa.me/${WHATSAPP}?text=${msg}`;
  const ativo = status.ativo;
  const local = status.local || "Local a confirmar";

  // Links com foto da seção final. Cada bloco inteiro é clicável.
  type LinkFoto = { href: string; externo: boolean; foto: string; video?: string; posicao?: string; rotulo: string; aoVivo?: boolean; paisagem?: boolean; titulo: string; desc: string };
  const links: LinkFoto[] = [
    {
      href: waUrl,
      externo: true,
      foto: "/quem-atende/pedro-braco.jpg",
      posicao: "50% 45%",
      paisagem: true,
      rotulo: "WhatsApp",
      titulo: "Agendar atendimento",
      desc: "Combine o horário e o local que ficam bons pra você.",
    },
    {
      href: MAPS_LINK,
      externo: true,
      foto: "/fotos/pedro-jeri.jpg",
      posicao: "60% 40%",
      paisagem: true,
      rotulo: ativo ? "Atendendo hoje" : "Hoje",
      aoVivo: ativo,
      titulo: "Onde estamos hoje",
      desc: ativo ? `${local}${status.horario ? ` · ${status.horario}` : ""}` : "Sem ponto fixo. Combine pelo WhatsApp.",
    },
    {
      href: "/servicos",
      externo: false,
      foto: "/galeria/poster-marcela-areia.jpg",
      video: "/galeria/marcela-areia-de-cima.mp4",
      rotulo: "O que a gente faz",
      titulo: "Quick massagem & recovery",
      desc: "Durações, técnicas e como funciona.",
    },
    {
      href: INSTAGRAM_LINK,
      externo: true,
      foto: "/fotos/marcela-atendendo.jpg",
      posicao: "50% 6%",
      rotulo: "Instagram",
      titulo: "Bastidores",
      desc: "@pedrosiqueiraterapeuta",
    },
    ...(TIKTOK_ATIVO
      ? [
          { href: TIKTOK_LINK_2, externo: true, foto: "/fotos/pedro-gesto.jpg", posicao: "50% 55%", rotulo: "TikTok", titulo: "Quick massage Jeri", desc: "@quickmassage.viladejeri" },
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
                Quick massagem na cadeira que levamos até você: na praia, na pousada ou no seu evento. Sessão objetiva,
                direto no que o corpo está pedindo.
              </p>
              <div className="hero-acoes">
                <a className="btn btn-escuro" href={waUrl} target="_blank" rel="noreferrer">
                  Chamar no WhatsApp
                </a>
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
          <div className="wrap casal">
            <div className="casal-foto">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/quem-atende/pedro-e-marcela.jpg" alt="Pedro e Marcela, sorrindo, à noite em Jeri" loading="lazy" />
            </div>

            <div className="casal-texto">
              <p className="rotulo">Quem atende</p>
              <h2 className="display">
                Pedro <span className="amp">&amp;</span> Marcela
              </h2>
              <p className="casal-intro">
                Construímos nossa prática juntos no consultório Alba, em Rolante (RS). Em Jeri, levamos esse cuidado até a
                praia: um atendimento completo, feito ao ar livre, com os pés na areia.
              </p>

              <div className="casal-pessoas">
                {EQUIPE.map((p) => (
                  <div key={p.nome}>
                    <p className="rotulo">{p.funcao}</p>
                    <h3 className="pessoa-nome">{p.nome}</h3>
                    <p className="pessoa-texto">{p.texto}</p>
                  </div>
                ))}
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
              {links.map((l) => {
                const conteudo = (
                  <>
                    <div className="link-foto">
                      {l.video ? (
                        <Video src={l.video} poster={l.foto} legenda={l.titulo} />
                      ) : (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={l.foto} alt="" loading="lazy" style={{ objectPosition: l.posicao || "50% 50%" }} />
                      )}
                      {l.href && (
                        <span className="link-seta" aria-hidden>
                          {l.externo ? "↗" : "→"}
                        </span>
                      )}
                    </div>
                    <div className="link-texto">
                      <span className="link-rotulo">
                        {l.aoVivo && <span className="ponto ao-vivo" />}
                        {l.rotulo}
                      </span>
                      <span className="link-titulo">{l.titulo}</span>
                      <span className="link-desc">{l.desc}</span>
                    </div>
                  </>
                );
                // sem link (ex.: Maps ainda não existe) vira só um bloco, sem seta
                return l.href ? (
                  <a
                    key={l.titulo}
                    className={`link${l.paisagem ? " link-paisagem" : ""}`}
                    href={l.href}
                    {...(l.externo ? { target: "_blank", rel: "noreferrer" } : {})}
                  >
                    {conteudo}
                  </a>
                ) : (
                  <div key={l.titulo} className={`link link-sem-acao${l.paisagem ? " link-paisagem" : ""}`} id="onde-estamos">
                    {conteudo}
                  </div>
                );
              })}
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
