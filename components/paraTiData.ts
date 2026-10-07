export interface Rasgo {
  titulo: string;
  descripcion: string;
}

export const rasgosSi: Rasgo[] = [
  {
    titulo: "Estás comprometido/a",
    descripcion: "Quieres un cambio real, no una solución rápida. Buscas mejorar tu físico, hábitos y mentalidad.",
  },
  {
    titulo: "Estás abierto/a a cambiar hábitos",
    descripcion: "Sabes que el cambio no es solo entrenar: también es cómo comes, duermes y te organizas.",
  },
  {
    titulo: "Buscas un plan hecho para ti",
    descripcion: "No quieres una rutina genérica, quieres algo adaptado a tu horario, gustos y estilo de vida.",
  },
  {
    titulo: "Valoras un seguimiento cercano",
    descripcion: "Quieres a alguien que revise tu avance y te oriente cada semana, no solo un PDF.",
  },
  {
    titulo: "Quieres ser constante",
    descripcion:
      "Entiendes que los resultados se construyen semana a semana y estás dispuesto/a a sostener el proceso al menos 3 meses.",
  },
  {
    titulo: "Te interesa aprender",
    descripcion:
      "No solo quieres seguir un plan: quieres entender el porqué, para que tus resultados no dependan de mí para siempre.",
  },
];

export const rasgosNo: Rasgo[] = [
  {
    titulo: "Es solo una idea pasajera",
    descripcion: "Si todavía no sientes un interés genuino en cambiar, mejor espera a que llegue ese momento.",
  },
  {
    titulo: "Sueles dejar las cosas a medias",
    descripcion: "Empiezas con todo, pero te cuesta sostener lo que te propones.",
  },
  {
    titulo: "Buscas resultados rápidos y sin esfuerzo",
    descripcion: "Sin entrenar ni ajustar tus hábitos, ningún plan hace milagros.",
  },
  {
    titulo: "Solo quieres que te digan qué hacer",
    descripcion: "Si no te interesa entender el proceso, te va a costar sostenerlo solo/a.",
  },
  {
    titulo: "Siempre encuentras una excusa",
    descripcion: "Si cualquier motivo es suficiente para no entrenar o no seguir el plan, no vas a avanzar.",
  },
  {
    titulo: "No quieres salir de tu zona de confort",
    descripcion: "Si no estás dispuesto/a a mover tu rutina ni tu alimentación, el cambio no va a llegar.",
  },
];
