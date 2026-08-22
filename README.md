# Cartão Pedro Siqueira — Next.js + Vercel KV

Cartão-site de Pedro Siqueira (terapeuta manual · Quick Massagem & Recovery ·
Guriú, CE), agora com o status "atendendo hoje" gravado num banco de verdade
em vez de editado direto no HTML.

## O que mudou em relação à versão anterior (arquivo `.dc.html`)

- O visual e o texto são os mesmos, validados nas conversas anteriores.
- "Atendendo hoje" (ativo/local/horário) agora vive num banco **Upstash
  Redis** (conectado pelo Marketplace da Vercel — o antigo "Vercel KV" foi
  descontinuado e esse é o caminho atual recomendado) e é lido toda vez que
  alguém abre o cartão — não precisa mais editar HTML.
- Existe uma página `/admin` protegida por token, pra você atualizar o status
  em 1 minuto pelo celular quando chegar num ponto novo.
- QR code aponta pro domínio real (`NEXT_PUBLIC_SITE_URL`), não mais pra
  `window.location.href`.

## Passo a passo pra colocar no ar

### 1. Suba pro GitHub
```bash
cd pedro-card
git init
git add .
git commit -m "primeiro commit"
```
Crie um repositório vazio no GitHub (ex: `pedro-siqueira-cartao`) e siga as
instruções que ele mostra pra conectar (`git remote add origin ...` e
`git push`).

### 2. Importe na Vercel
No dashboard da Vercel: **Add New → Project → Import Git Repository** e
escolha o repositório. A Vercel detecta que é Next.js sozinha — não precisa
mudar nenhuma configuração de build.

### 3. Crie o banco (Upstash Redis)
Dentro do projeto na Vercel: **Storage → Marketplace Database Providers →
Upstash → Redis** (o antigo "Vercel KV" saiu de linha; hoje é assim que se
conecta um Redis). Depois de criado, conecte ao projeto — a Vercel injeta
as variáveis `KV_REST_API_URL` e `KV_REST_API_TOKEN` automaticamente, sem
você precisar copiar nada.

### 4. Configure as demais variáveis de ambiente
Em **Settings → Environment Variables**, adicione (veja `.env.example`):
- `NEXT_PUBLIC_WHATSAPP_NUMBER`
- `NEXT_PUBLIC_SITE_URL` (o domínio final, ver passo 6)
- `NEXT_PUBLIC_TIKTOK_ATIVO` / `NEXT_PUBLIC_TIKTOK_LINK`
- `ADMIN_TOKEN` — invente uma senha longa só sua, é o que protege a página
  `/admin`. Guarde ela em algum lugar seguro (ex: seu gerenciador de senhas).

Depois de adicionar, clique em **Redeploy** pra elas entrarem em vigor.

### 5. Teste
- `seu-projeto.vercel.app` → cartão
- `seu-projeto.vercel.app/admin` → tela de atualizar status (pede o
  `ADMIN_TOKEN` que você definiu)

### 6. Domínio próprio
Compre o domínio (Registro.br pra `.com.br`, ou direto pela Vercel/Namecheap
pra `.com`). Em **Settings → Domains** no projeto da Vercel, adicione o
domínio — ela mostra exatamente quais registros DNS configurar no
registrador. Depois de propagado (leva de minutos a poucas horas), atualize
`NEXT_PUBLIC_SITE_URL` pra esse domínio e faça redeploy, pra o QR code
apontar pro lugar certo.

## Rodando local (opcional, pra testar antes de subir)
```bash
npm install
cp .env.example .env.local
# preencha .env.local com valores de teste
npm run dev
```
Sem `KV_REST_API_URL`/`KV_REST_API_TOKEN` configuradas, a leitura do status
cai num padrão vazio (sem quebrar a página) — só a gravação por `/admin`
exige o banco conectado.

## Pendências que continuam em aberto
- Foto de perfil (placeholder tracejado no lugar)
- TikTok ainda não criado
- Lista de parceiros/pontos fixos (pra virar botões de 1 toque no `/admin`
  no futuro, em vez de digitar o local toda vez)
- Preços e duração — decisão de manter fora do site, resolvido por
  WhatsApp/presencial
