export interface Captura {
  src: string;
  alt: string;
  ancho: number;
  alto: number;
}

export const capturas: Captura[] = [
  {
    src: "/testimonios/testimonio-1.jpg",
    alt: "Mensaje de un alumno: llevaba años entrenando sin asesoría y estancado; con el proceso dejó de perder el tiempo y aprendió muchísimo.",
    ancho: 1140,
    alto: 1600,
  },
  {
    src: "/testimonios/testimonio-2.jpg",
    alt: "Mensaje de un alumno: temía que el déficit lo dejara fatigado, pero lleva dos meses y medio y le ha resultado llevadero, y controla mejor la ansiedad por lo dulce.",
    ancho: 1170,
    alto: 1389,
  },
  {
    src: "/testimonios/testimonio-3.jpg",
    alt: "Mensaje de un alumno: destaca el trabajo en la mentalidad y cómo el entrenamiento se adaptó a su capacidad física y mental.",
    ancho: 1098,
    alto: 1600,
  },
  {
    src: "/testimonios/testimonio-4.jpg",
    alt: "Mensaje de un alumno: aprendió a llevar el proceso de forma más amigable y a no frustrarse después de un mal entreno o de salirse de la dieta.",
    ancho: 1170,
    alto: 846,
  },
];
