import {
  avisarPorCorreo,
  avisarPorTelegram,
  crearLeadEnNotion,
  normalizarWhatsApp,
  type Lead,
} from "@/lib/leads";
import type { DatosLead, OrigenLead } from "@/lib/enviarLead";

const ORIGENES: OrigenLead[] = ["Formulario de contacto", "Video"];

export async function POST(request: Request) {
  let datos: Partial<DatosLead>;
  try {
    datos = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Formato inválido" }, { status: 400 });
  }

  if (datos.empresa) return Response.json({ ok: true });

  const nombre = String(datos.nombre ?? "").trim().slice(0, 80);
  const whatsapp = normalizarWhatsApp(String(datos.whatsapp ?? ""));
  const origen = ORIGENES.includes(datos.origen as OrigenLead)
    ? (datos.origen as OrigenLead)
    : "Formulario de contacto";

  if (!nombre || whatsapp.length < 10 || whatsapp.length > 15) {
    return Response.json({ ok: false, error: "Revisa tu nombre y tu WhatsApp" }, { status: 400 });
  }

  const lead: Lead = { nombre, whatsapp, origen };

  let notionUrl: string | null = null;
  try {
    notionUrl = await crearLeadEnNotion(lead);
  } catch (error) {
    console.error("[leads] Notion:", error);
  }

  const avisos = await Promise.allSettled([
    avisarPorTelegram(lead, notionUrl),
    avisarPorCorreo(lead, notionUrl),
  ]);
  avisos.forEach((aviso, i) => {
    if (aviso.status === "rejected") {
      console.error(`[leads] ${i === 0 ? "Telegram" : "Correo"}:`, aviso.reason);
    }
  });

  const guardado = notionUrl !== null || avisos.some((aviso) => aviso.status === "fulfilled");
  if (!guardado) {
    return Response.json({ ok: false, error: "No pudimos registrar tus datos" }, { status: 502 });
  }
  return Response.json({ ok: true });
}
