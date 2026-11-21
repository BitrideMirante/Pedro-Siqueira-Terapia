import type { Metadata } from "next";
import { Video } from "@/components/Galeria";

export const metadata: Metadata = {
  title: "Quick Massagem & Recovery · Pedro Siqueira & Marcela · Jeri, CE",
  description: "Quick massagem na cadeira, recovery e massagem de panturrilhas e pés. Sessões de 15, 20 ou 30 minutos.",
};

const WHATSAPP = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "5551980602183").replace(/\D/g, "");

const DURACOES = [
  { min: "15", desc: "Pausa rápida" },
  { min: "20", desc: "Alívio rápido" },
  { min: "30", desc: "Completa" },
];

export default function Servicos() {
  const msg = encodeURIComponent("Oi, Pedro! Vi seu site e queria saber sobre um atendimento.");
  const waUrl = `https://wa.me/${WHATSAPP}?text=${msg}`;
  const waEventos = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent("Oi, Pedro! Vi o site e quero conversar sobre massagem para um evento.")}`;

  return (
    <main>
      <div className="wrap voltar">
        <a href="/">← Voltar ao início</a>
      </div>

        <section className="secao secao-servicos">
          <div className="wrap">
            <div className="secao-topo">
              <div>
                <p className="rotulo">O que a gente faz</p>
                <h2 className="display">
                  Quick massagem
                  <br />
                  <span className="amp">&amp;</span> recovery
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

            <div className="servicos-bloco">
            {/* vídeos dos atendimentos: Marcela sempre primeiro */}
            <div className="servicos-videos">
              <div className="servicos-video">
                <Video src="/galeria/marcela-areia-de-cima.mp4" poster="/galeria/poster-marcela-areia.jpg" legenda="Marcela atendendo na areia, vista de cima" />
              </div>
              <div className="servicos-video">
                <Video src="/galeria/pedro-praca-noite.mp4" poster="/galeria/poster-pedro-praca-noite.jpg" legenda="Pedro atendendo na praça da vila, à noite" />
              </div>
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
                <p className="rotulo">Pernas e pés · com a Marcela</p>
                <p>Massagem nas pernas e nos pés, com drenagem e liberação, pra quem passou o dia caminhando ou no esporte.</p>
              </div>
              <div>
                <p className="rotulo">O mix de técnicas</p>
                <p>Shiatsu, liberação miofascial, técnicas de quiropraxia, movimentos de Thai massagem e alinhamento Seitai.</p>
              </div>
            </div>
            </div>

            <div className="como">
              <div>
                <p className="rotulo">Espontâneo</p>
                <h4>Encontrou por aqui</h4>
                <p>Veja na <a href="/#contato" className="link-sublinhado">página inicial</a> onde estamos atendendo hoje e apareça.</p>
              </div>
              <div>
                <p className="rotulo">Combinado</p>
                <h4>Prefere garantir horário</h4>
                <p>Chame no WhatsApp e a gente combina.</p>
              </div>
            </div>
          </div>
        </section>


      {/* EVENTOS */}
      <section className="secao eventos">
        <div className="wrap">
          <div className="eventos-grid">
            <div>
              <p className="rotulo">Para eventos</p>
              <h2 className="display">
                Massagem no
                <br />
                seu evento
              </h2>
            </div>
            <div className="eventos-texto">
              <p>
                Levamos a cadeira e montamos um espaço de quick massagem no seu evento. Além da quick, também fazemos massagem
                nas pernas, com drenagem e liberação. Um momento de cuidado pra equipe, convidados, atletas ou hóspedes.
              </p>
              <ul className="eventos-lista">
                <li>Empresas e eventos corporativos</li>
                <li>Casamentos e festas</li>
                <li>Eventos esportivos</li>
                <li>Pousadas e hotéis</li>
              </ul>
              <a className="btn btn-escuro" href={waEventos} target="_blank" rel="noreferrer">
                Falar sobre um evento
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="contato contato-curto">
        <div className="wrap">
          <h2 className="display">Bora marcar?</h2>
          <p className="lead">Chame no WhatsApp e combine seu atendimento.</p>
          <a className="btn btn-claro" href={waUrl} target="_blank" rel="noreferrer">
            Chamar no WhatsApp
          </a>
          <div className="assinatura">
            <span>Pedro Siqueira &amp; Marcela</span>
            <span>Quick Massagem &amp; Recovery</span>
          </div>
        </div>
      </section>
    </main>
  );
}
