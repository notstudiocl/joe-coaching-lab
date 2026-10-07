import { NOTION_LEADS_URL, enviarTelegram, leadsPendientes, textoRecordatorio } from "@/lib/leads";

export async function GET(request: Request) {
  const secreto = process.env.CRON_SECRET;
  if (!secreto || request.headers.get("authorization") !== `Bearer ${secreto}`) {
    return Response.json({ ok: false }, { status: 401 });
  }

  const pendientes = await leadsPendientes(24);
  if (pendientes.length === 0) return Response.json({ ok: true, pendientes: 0 });

  const botones = pendientes
    .filter((p) => p.linkWhatsApp)
    .slice(0, 8)
    .map((p) => [{ text: `💬 ${p.nombre}`, url: p.linkWhatsApp as string }]);
  botones.push([{ text: "📋 Ver todos en Notion", url: NOTION_LEADS_URL }]);

  await enviarTelegram(textoRecordatorio(pendientes), botones);
  return Response.json({ ok: true, pendientes: pendientes.length });
}
