import type { OrigenLead } from "@/lib/enviarLead";

const NOTION_DATABASE_ID = "60dc8103adcc4c228f57c86faf6e9719";
const NOTION_VERSION = "2022-06-28";
export const NOTION_LEADS_URL = "https://www.notion.so/60dc8103adcc4c228f57c86faf6e9719";

export interface Lead {
  nombre: string;
  whatsapp: string;
  origen: OrigenLead;
}

interface LeadPendiente {
  nombre: string;
  linkWhatsApp: string | null;
  ingreso: Date;
}

function variable(nombre: string) {
  const valor = process.env[nombre];
  if (!valor) throw new Error(`Falta la variable de entorno ${nombre}`);
  return valor;
}

const escaparHtml = (texto: string) =>
  texto.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export function normalizarWhatsApp(valor: string) {
  const digitos = valor.replace(/\D/g, "");
  if (digitos.length === 8) return `569${digitos}`;
  if (digitos.length === 9 && digitos.startsWith("9")) return `56${digitos}`;
  return digitos;
}

export function formatearWhatsApp(digitos: string) {
  if (digitos.length === 11 && digitos.startsWith("569")) {
    return `+56 9 ${digitos.slice(3, 7)} ${digitos.slice(7)}`;
  }
  return `+${digitos}`;
}

function primerNombre(nombre: string) {
  const primero = nombre.trim().split(/\s+/)[0] ?? "";
  return primero.charAt(0).toLocaleUpperCase("es-CL") + primero.slice(1);
}

export function mensajeBienvenida(nombre: string) {
  return [
    `Hola ${primerNombre(nombre)}! soy Joe Vidal.`,
    "Gracias por dar el primer paso.",
    "Primero que todo, me gustaría saber por qué te interesa que trabajemos juntos y si tienes dudas acerca de la asesoría.",
    "Si gustas, podemos agendar una llamada sin compromiso para dejar todo claro.",
    "Quedo atento en caso de dudas para comentarte cómo partiríamos y el valor de la asesoría para comenzar a trabajar 🫡",
  ].join("\n");
}

export const linkWhatsApp = (lead: Lead) =>
  `https://wa.me/${lead.whatsapp}?text=${encodeURIComponent(mensajeBienvenida(lead.nombre))}`;

const fechaChile = (fecha: Date) =>
  new Intl.DateTimeFormat("es-CL", {
    timeZone: "America/Santiago",
    dateStyle: "medium",
    timeStyle: "short",
  }).format(fecha);

async function notion(ruta: string, cuerpo: unknown) {
  const respuesta = await fetch(`https://api.notion.com/v1/${ruta}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${variable("NOTION_TOKEN")}`,
      "Notion-Version": NOTION_VERSION,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cuerpo),
  });
  if (!respuesta.ok) throw new Error(`Notion respondió ${respuesta.status}: ${await respuesta.text()}`);
  return respuesta.json();
}

export async function crearLeadEnNotion(lead: Lead): Promise<string> {
  const pagina = await notion("pages", {
    parent: { database_id: NOTION_DATABASE_ID },
    properties: {
      Nombre: { title: [{ text: { content: lead.nombre } }] },
      WhatsApp: { phone_number: formatearWhatsApp(lead.whatsapp) },
      Estado: { select: { name: "Nuevo" } },
      Origen: { select: { name: lead.origen } },
      "Escribir por WhatsApp": { url: linkWhatsApp(lead) },
    },
  });
  return pagina.url;
}

export async function leadsPendientes(horas = 24): Promise<LeadPendiente[]> {
  const limite = new Date(Date.now() - horas * 60 * 60 * 1000).toISOString();
  const resultado = await notion(`databases/${NOTION_DATABASE_ID}/query`, {
    filter: {
      and: [
        { property: "Estado", select: { equals: "Nuevo" } },
        { timestamp: "created_time", created_time: { before: limite } },
      ],
    },
    sorts: [{ timestamp: "created_time", direction: "ascending" }],
    page_size: 50,
  });
  return resultado.results.map(
    (pagina: {
      created_time: string;
      properties: {
        Nombre: { title: { plain_text: string }[] };
        "Escribir por WhatsApp": { url: string | null };
      };
    }) => ({
      nombre: pagina.properties.Nombre.title.map((t) => t.plain_text).join("") || "Sin nombre",
      linkWhatsApp: pagina.properties["Escribir por WhatsApp"].url,
      ingreso: new Date(pagina.created_time),
    })
  );
}

interface BotonTelegram {
  text: string;
  url: string;
}

export async function enviarTelegram(texto: string, botones: BotonTelegram[][]) {
  const respuesta = await fetch(`https://api.telegram.org/bot${variable("TELEGRAM_BOT_TOKEN")}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: variable("TELEGRAM_CHAT_ID"),
      text: texto,
      parse_mode: "HTML",
      disable_web_page_preview: true,
      reply_markup: botones.length ? { inline_keyboard: botones } : undefined,
    }),
  });
  if (!respuesta.ok) throw new Error(`Telegram respondió ${respuesta.status}: ${await respuesta.text()}`);
}

export async function avisarPorTelegram(lead: Lead, notionUrl: string | null) {
  const texto = [
    "🔔 <b>Nuevo lead en joecoachinglab.cl</b>",
    "",
    `👤 <b>${escaparHtml(lead.nombre)}</b>`,
    `📱 ${formatearWhatsApp(lead.whatsapp)}`,
    `📍 ${lead.origen}`,
    `🕒 ${fechaChile(new Date())}`,
  ].join("\n");
  const botones: BotonTelegram[][] = [[{ text: "💬 Escribir por WhatsApp", url: linkWhatsApp(lead) }]];
  if (notionUrl) botones.push([{ text: "📋 Abrir en Notion", url: notionUrl }]);
  await enviarTelegram(texto, botones);
}

export async function avisarPorCorreo(lead: Lead, notionUrl: string | null) {
  const nombre = escaparHtml(lead.nombre);
  const telefono = formatearWhatsApp(lead.whatsapp);
  const enlaceNotion = notionUrl
    ? `<p style="margin:16px 0 0"><a href="${notionUrl}" style="color:#0077B6">Abrir en Notion</a></p>`
    : "";
  const html = `<div style="font-family:Arial,Helvetica,sans-serif;max-width:480px;margin:0 auto;padding:24px;color:#0a0a0a">
  <p style="margin:0 0 4px;font-size:12px;letter-spacing:1px;text-transform:uppercase;color:#0077B6;font-weight:bold">Nuevo lead</p>
  <h1 style="margin:0 0 16px;font-size:22px">${nombre}</h1>
  <table style="font-size:15px;border-collapse:collapse">
    <tr><td style="padding:4px 12px 4px 0;color:#666">WhatsApp</td><td style="padding:4px 0"><b>${telefono}</b></td></tr>
    <tr><td style="padding:4px 12px 4px 0;color:#666">Origen</td><td style="padding:4px 0">${lead.origen}</td></tr>
    <tr><td style="padding:4px 12px 4px 0;color:#666">Fecha</td><td style="padding:4px 0">${fechaChile(new Date())}</td></tr>
  </table>
  <p style="margin:24px 0 0"><a href="${escaparHtml(linkWhatsApp(lead))}" style="display:inline-block;background:#00B4D8;color:#0a0a0a;font-weight:bold;text-decoration:none;padding:12px 20px;border-radius:999px">Escribir por WhatsApp</a></p>
  ${enlaceNotion}
</div>`;
  const texto = `Nuevo lead: ${lead.nombre}\nWhatsApp: ${telefono}\nOrigen: ${lead.origen}\n\nEscribirle: ${linkWhatsApp(lead)}${notionUrl ? `\nNotion: ${notionUrl}` : ""}`;

  const respuesta = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${variable("RESEND_API_KEY")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Joe Coaching Lab <avisos@joecoachinglab.cl>",
      to: [variable("AVISO_CORREO_PARA")],
      subject: `Nuevo lead: ${lead.nombre}`,
      html,
      text: texto,
    }),
  });
  if (!respuesta.ok) throw new Error(`Resend respondió ${respuesta.status}: ${await respuesta.text()}`);
}

export function textoRecordatorio(pendientes: LeadPendiente[]) {
  const ahora = Date.now();
  const lineas = pendientes.map((p) => {
    const horas = Math.floor((ahora - p.ingreso.getTime()) / 3_600_000);
    const hace = horas >= 48 ? `hace ${Math.floor(horas / 24)} días` : `hace ${horas} h`;
    return `• <b>${escaparHtml(p.nombre)}</b> · ${hace}`;
  });
  const titulo =
    pendientes.length === 1
      ? "⏰ <b>1 lead lleva más de 24 h sin contactar</b>"
      : `⏰ <b>${pendientes.length} leads llevan más de 24 h sin contactar</b>`;
  return [titulo, "", ...lineas].join("\n");
}
