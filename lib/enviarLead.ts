export type OrigenLead = "Formulario de contacto" | "Video";

export interface DatosLead {
  nombre: string;
  whatsapp: string;
  origen: OrigenLead;
  empresa?: string;
}

export const contarDigitos = (valor: string) => valor.replace(/\D/g, "").length;

export async function enviarLead(datos: DatosLead) {
  const respuesta = await fetch("/api/leads", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datos),
  });
  if (!respuesta.ok) throw new Error("No se pudo enviar el lead");
}
