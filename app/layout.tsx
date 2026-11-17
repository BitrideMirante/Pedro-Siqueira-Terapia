import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://pedrosiqueiraterapeuta.com.br"),
  title: "Pedro Siqueira — Terapeuta Manual · Quick Massagem & Recovery · Jeri, CE",
  description:
    "Está por Jeri? Recupere o corpo depois da praia, do esporte ou da estrada. Atendimento na hora ou combinado antes.",
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
      <body>{children}</body>
    </html>
  );
}
