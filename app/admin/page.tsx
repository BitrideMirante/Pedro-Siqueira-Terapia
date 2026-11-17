import { lerStatus } from "@/lib/kv";
import { AdminForm } from "./AdminForm";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Admin · Atendendo hoje",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  const status = await lerStatus();
  return (
    <div style={{ minHeight: "100dvh", background: "#07131C", color: "#EDEAE0" }}>
      {/* fontes do painel (o site novo usa outras, já embutidas) */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@600;700;800;900&family=Work+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap"
        precedence="default"
      />
      <AdminForm statusInicial={status} />
    </div>
  );
}
