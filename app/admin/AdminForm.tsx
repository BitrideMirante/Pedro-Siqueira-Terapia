"use client";

import { useEffect, useState } from "react";

type Status = {
  ativo: boolean;
  local: string;
  horario: string;
  atualizadoEm: string;
};

// Atalhos de um toque. Pra mudar/adicionar um ponto, é só editar esta lista.
// horario vazio = Pedro preenche na hora.
const PONTOS_FIXOS: { nome: string; horario: string }[] = [
  { nome: "Praia principal", horario: "" },
  { nome: "Praça da vila, em frente ao Jeri 20", horario: "18h às 23h" },
];

export function AdminForm({ statusInicial }: { statusInicial: Status }) {
  const [token, setToken] = useState("");
  const [ativo, setAtivo] = useState(statusInicial.ativo);
  const [local, setLocal] = useState(statusInicial.local);
  const [horario, setHorario] = useState(statusInicial.horario);
  const [salvando, setSalvando] = useState(false);
  const [mensagem, setMensagem] = useState<string | null>(null);

  useEffect(() => {
    const salvo = window.localStorage.getItem("pedro-admin-token");
    if (salvo) setToken(salvo);
  }, []);

  async function salvar() {
    setSalvando(true);
    setMensagem(null);
    window.localStorage.setItem("pedro-admin-token", token);

    const res = await fetch("/api/status", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-admin-token": token },
      body: JSON.stringify({ ativo, local, horario }),
    });

    setSalvando(false);
    if (res.ok) {
      setMensagem("Salvo! O cartão já está atualizado.");
    } else if (res.status === 401) {
      setMensagem("Token errado — confere e tenta de novo.");
    } else {
      setMensagem("Deu erro ao salvar. Tenta de novo.");
    }
  }

  function escolherPonto(p: { nome: string; horario: string }) {
    setAtivo(true);
    setLocal(p.nome);
    setHorario(p.horario);
    setMensagem(null);
  }

  const campo: React.CSSProperties = {
    width: "100%",
    padding: "12px 14px",
    borderRadius: 12,
    border: "1px solid rgba(237,234,224,.22)",
    background: "rgba(10,32,36,.5)",
    color: "#EDEAE0",
    fontSize: 15,
    fontFamily: "'Work Sans', sans-serif",
  };
  const label: React.CSSProperties = {
    fontFamily: "'IBM Plex Mono',monospace",
    fontSize: 10.5,
    letterSpacing: ".12em",
    textTransform: "uppercase",
    color: "#8FE3CC",
    marginBottom: 6,
    display: "block",
  };

  return (
    <div style={{ maxWidth: 420, margin: "40px auto", padding: "0 20px", display: "flex", flexDirection: "column", gap: 18 }}>
      <h1 style={{ fontFamily: "'Big Shoulders Display',sans-serif", fontWeight: 800, textTransform: "uppercase", fontSize: 30, margin: 0 }}>
        Atendendo hoje
      </h1>

      <div>
        <label style={label}>Token de acesso</label>
        <input style={campo} type="password" value={token} onChange={(e) => setToken(e.target.value)} placeholder="Seu token" />
      </div>

      <div>
        <label style={label}>Pontos fixos</label>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {PONTOS_FIXOS.map((p) => {
            const selecionado = ativo && local === p.nome;
            return (
              <button
                key={p.nome}
                type="button"
                onClick={() => escolherPonto(p)}
                style={{
                  textAlign: "left",
                  padding: "12px 14px",
                  borderRadius: 12,
                  border: selecionado ? "1px solid #6FE0C0" : "1px solid rgba(237,234,224,.22)",
                  background: selecionado ? "rgba(111,224,192,.16)" : "rgba(10,32,36,.5)",
                  color: "#EDEAE0",
                  fontSize: 15,
                  fontFamily: "'Work Sans', sans-serif",
                  cursor: "pointer",
                }}
              >
                {p.nome}
                <span style={{ display: "block", fontSize: 12.5, opacity: 0.7, marginTop: 2 }}>
                  {p.horario || "horário você preenche"}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
        <input type="checkbox" checked={ativo} onChange={(e) => setAtivo(e.target.checked)} style={{ width: 20, height: 20 }} />
        <span>Estou num ponto fixo hoje</span>
      </label>

      {ativo && (
        <>
          <div>
            <label style={label}>Local</label>
            <input style={campo} value={local} onChange={(e) => setLocal(e.target.value)} placeholder="Nome do parceiro / praia" />
          </div>
          <div>
            <label style={label}>Horário</label>
            <input style={campo} value={horario} onChange={(e) => setHorario(e.target.value)} placeholder="ex: 14h às 19h" />
          </div>
        </>
      )}

      <button
        onClick={salvar}
        disabled={salvando}
        style={{
          minHeight: 52,
          borderRadius: 16,
          background: "#6FE0C0",
          color: "#062018",
          fontWeight: 600,
          fontSize: 15.5,
          border: "none",
          cursor: salvando ? "default" : "pointer",
          opacity: salvando ? 0.7 : 1,
        }}
      >
        {salvando ? "Salvando..." : "Salvar status"}
      </button>

      {mensagem && <p style={{ fontSize: 14, color: "#D3B79A", textAlign: "center" }}>{mensagem}</p>}
    </div>
  );
}
