import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacidade · Pedro Siqueira — Quick Massagem & Recovery",
  description: "Como este site usa dados de navegação.",
};

export default function Privacidade() {
  return (
    <main>
      <div className="wrap voltar">
        <a href="/">← Voltar ao início</a>
      </div>

      <section className="secao">
        <div className="wrap">
          <div className="secao-topo">
            <div>
              <p className="rotulo">Privacidade</p>
              <h2 className="display">Como usamos seus dados</h2>
            </div>
          </div>

          <p className="lead">
            Este site é um cartão de visita. Não tem cadastro, não tem login e não
            pede nenhum dado seu.
          </p>

          <h3>O que a gente mede</h3>
          <p>
            Quando você chega aqui por um anúncio do Google e clica para falar no
            WhatsApp, avisamos ao Google que aquele clique virou um contato. Serve
            só pra sabermos se o anúncio está valendo a pena. O Google usa um
            cookie pra reconhecer que foi a mesma visita.
          </p>
          <p>
            A gente não recebe nome, telefone nem nada que identifique você — só o
            número total de contatos. O que você escrever no WhatsApp fica entre
            nós dois, no WhatsApp.
          </p>

          <h3>Como desligar</h3>
          <p>
            Dá pra bloquear cookies nas configurações do seu navegador, ou usar uma
            janela anônima. O site funciona igual.
          </p>

          <h3>Falar com a gente</h3>
          <p>
            Qualquer dúvida sobre isso, ou se quiser que a gente apague alguma
            coisa, é só chamar no WhatsApp pelo botão do site.
          </p>
        </div>
      </section>
    </main>
  );
}
