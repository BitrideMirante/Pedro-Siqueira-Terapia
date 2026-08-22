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
      <AdminForm statusInicial={status} />
    </div>
  );
}
