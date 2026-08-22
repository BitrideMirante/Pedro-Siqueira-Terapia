import { Redis } from "@upstash/redis";

// A Vercel descontinuou o pacote @vercel/kv — hoje o caminho recomendado é
// conectar um banco Upstash Redis pelo Marketplace da própria Vercel, que
// injeta as mesmas variáveis KV_REST_API_URL / KV_REST_API_TOKEN.
const redis = new Redis({
  url: process.env.KV_REST_API_URL || "",
  token: process.env.KV_REST_API_TOKEN || "",
});

// Um único registro: o status de atendimento de hoje.
// Guardado sob a chave "status:hoje" no Vercel KV (Redis).
export type StatusHoje = {
  ativo: boolean;
  local: string;
  horario: string;
  atualizadoEm: string; // ISO timestamp
};

const CHAVE = "status:hoje";

const PADRAO: StatusHoje = {
  ativo: false,
  local: "",
  horario: "",
  atualizadoEm: new Date(0).toISOString(),
};

export async function lerStatus(): Promise<StatusHoje> {
  try {
    const valor = await redis.get<StatusHoje>(CHAVE);
    return valor ?? PADRAO;
  } catch (e) {
    // Se o Redis ainda não estiver conectado (ex: rodando local sem env vars),
    // cai pro padrão em vez de derrubar a página.
    console.error("Erro ao ler status do Redis:", e);
    return PADRAO;
  }
}

export async function gravarStatus(novo: Omit<StatusHoje, "atualizadoEm">): Promise<StatusHoje> {
  const registro: StatusHoje = {
    ...novo,
    atualizadoEm: new Date().toISOString(),
  };
  await redis.set(CHAVE, registro);
  return registro;
}
