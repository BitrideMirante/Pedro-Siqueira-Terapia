import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Medicao } from "@/components/Medicao";

export const metadata: Metadata = {
  metadataBase: new URL("https://pedrosiqueiraterapeuta.com.br"),
  title: "Pedro Siqueira — Terapeuta Manual · Quick Massagem & Recovery · Jeri, CE",
  description:
    "Está por Jeri? Recupere o corpo depois da praia, do esporte ou da estrada. Atendimento na hora ou combinado antes.",
  // Comprova pro Google que o site é nosso, pra poder pedir reindexação
  // no Search Console. Não remover: a verificação cai junto.
  verification: {
    google: "216ImHWX-k5X0DgqJ2Zf3cCXQczaICM54TMLhfcyCuY",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#161513",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        {children}
        <Medicao />
      </body>
    </html>
  );
}
