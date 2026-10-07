export interface Rasgo {
  titulo: string;
  descripcion: string;
}

export const rasgosSi: Rasgo[] = [
  {
    titulo: "Estás comprometido/a",
    descripcion: "Tienes ganas reales de mejorar tu físico, tu salud y tus hábitos.",
  },
  {
    titulo: "Entrenas o quieres empezar",
    descripcion: "Ya tienes experiencia o estás listo/a para arrancar con constancia.",
  },
  {
    titulo: "Eres constante",
    descripcion: "Sabes que los resultados toman tiempo y estás dispuesto/a a sostener el esfuerzo.",
  },
  {
    titulo: "Te interesa aprender",
    descripcion: "Quieres entender el porqué de tu entrenamiento, tu nutrición y tu estilo de vida.",
  },
  {
    titulo: "Te haces responsable",
    descripcion: "Cumples lo que acordamos y buscas soluciones en vez de excusas.",
  },
  {
    titulo: "Quieres un cambio real",
    descripcion: "No buscas magia: quieres hábitos que te acompañen a largo plazo.",
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
