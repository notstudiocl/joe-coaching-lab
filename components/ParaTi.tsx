"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { rasgosNo, rasgosSi } from "@/components/paraTiData";
import { IconoCheck, IconoCruz } from "@/components/Iconos";

const ease = [0.25, 0.1, 0.25, 1] as const;

function resultado(marcados: number) {
  if (marcados === 0) {
    return { titulo: "Marca lo que va contigo", texto: "Sin presión: nadie más ve tus respuestas." };
  }
  if (marcados <= 2) {
    return {
      titulo: "Hay una base para empezar",
      texto: "Algunos puntos vas a tener que trabajarlos. Conversemos y vemos juntos si es el momento.",
    };
  }
  if (marcados <= 4) {
    return {
      titulo: "Tienes buena base",
      texto: "Este programa puede ser el empujón que te falta para ver resultados de verdad.",
    };
  }
  return { titulo: "Este programa es para ti", texto: "Tienes lo que hace falta. El siguiente paso es hablar." };
}

export default function ParaTi({ id = "para-ti" }: { id?: string }) {
  const [marcados, setMarcados] = useState<Set<number>>(new Set());
  const total = rasgosSi.length;
  const cantidad = marcados.size;
  const { titulo, texto } = resultado(cantidad);

  const alternar = (indice: number) => {
    setMarcados((prev) => {
      const siguiente = new Set(prev);
      if (siguiente.has(indice)) siguiente.delete(indice);
      else siguiente.add(indice);
      return siguiente;
    });
  };

  return (
    <section id={id} className="py-16 bg-[#0d0d0d] px-4">
      <div className="max-w-lg mx-auto">
        {/* Encabezado */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease }}
          className="mb-8"
        >
          <p className="text-[#00B4D8] text-[11px] font-bold tracking-widest uppercase mb-3">
            Autodiagnóstico
          </p>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight">
            ¿Es para ti?
            <br />
            <span className="text-[#00B4D8]">Compruébalo en 10 segundos</span>
          </h2>
          <p className="text-white/50 text-[13.5px] leading-relaxed mt-3">
            Toca cada frase que te describa.
          </p>
        </motion.div>

        {/* Opciones */}
        <ul className="space-y-2.5">
          {rasgosSi.map((rasgo, i) => {
            const activo = marcados.has(i);
            return (
              <motion.li
                key={rasgo.titulo}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.4, ease, delay: i * 0.05 }}
              >
                <button
                  type="button"
                  aria-pressed={activo}
                  onClick={() => alternar(i)}
                  className={`w-full flex items-start gap-3.5 text-left rounded-2xl border p-4 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B4D8] ${
                    activo
                      ? "border-[#00B4D8]/50 bg-[#00B4D8]/[0.08]"
                      : "border-white/8 bg-white/[0.03] hover:border-white/15"
                  }`}
                >
                  <span
                    className={`mt-0.5 w-6 h-6 rounded-md flex-shrink-0 flex items-center justify-center border-2 transition-colors duration-200 ${
                      activo ? "bg-[#00B4D8] border-[#00B4D8] text-[#0a0a0a]" : "border-white/20 text-transparent"
                    }`}
                  >
                    <motion.span
                      initial={false}
                      animate={{ scale: activo ? 1 : 0.4, opacity: activo ? 1 : 0 }}
                      transition={{ duration: 0.18, ease }}
                    >
                      <IconoCheck className="w-3.5 h-3.5" />
                    </motion.span>
                  </span>
                  <span>
                    <span className="block font-bold text-[15px] text-white mb-0.5">{rasgo.titulo}</span>
                    <span className="block text-white/45 text-[13px] leading-relaxed">{rasgo.descripcion}</span>
                  </span>
                </button>
              </motion.li>
            );
          })}
        </ul>

        {/* Resultado */}
        <div
          className={`mt-6 rounded-2xl border p-5 transition-colors duration-300 ${
            cantidad >= 5 ? "border-[#00B4D8]/40 bg-[#00B4D8]/10" : "border-white/8 bg-white/[0.03]"
          }`}
        >
          <div className="flex gap-1.5 mb-4" aria-hidden="true">
            {Array.from({ length: total }, (_, i) => (
              <div key={i} className="flex-1 h-1.5 rounded-full bg-white/8 overflow-hidden">
                <motion.div
                  initial={false}
                  animate={{ scaleX: i < cantidad ? 1 : 0 }}
                  transition={{ duration: 0.3, ease }}
                  className="h-full origin-left bg-[#00B4D8]"
                />
              </div>
            ))}
          </div>
          <p className="text-[11px] font-bold tracking-widest uppercase text-white/40 mb-1.5" aria-live="polite">
            Marcaste {cantidad} de {total}
          </p>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={titulo}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2, ease }}
            >
              <p className={`font-extrabold text-lg ${cantidad >= 5 ? "text-[#90E0EF]" : "text-white"}`}>{titulo}</p>
              <p className="text-white/55 text-[13.5px] leading-relaxed mt-1">{texto}</p>
            </motion.div>
          </AnimatePresence>
          <a
            href="#contacto"
            className={`mt-5 flex w-full items-center justify-center gap-2 font-bold text-sm py-3.5 rounded-full transition-colors duration-200 ${
              cantidad >= 3
                ? "bg-[#00B4D8] hover:bg-[#0077B6] active:bg-[#005f8c] text-[#0a0a0a] shadow-lg shadow-[#00B4D8]/20"
                : "border border-white/15 text-white/80 hover:border-[#00B4D8]/60 hover:text-white"
            }`}
          >
            {cantidad >= 3 ? "Quiero empezar" : "Hablemos de tu caso"}
          </a>
        </div>

        {/* Cuándo no es para ti */}
        <details className="group mt-4 rounded-2xl border border-white/8 bg-white/[0.02] open:bg-white/[0.03]">
          <summary className="flex items-center justify-between gap-3 cursor-pointer list-none p-5 text-[14px] font-bold text-white/70 hover:text-white transition-colors [&::-webkit-details-marker]:hidden">
            ¿Y cuándo no es para ti?
            <span className="text-[#00B4D8] text-xl leading-none transition-transform duration-200 group-open:rotate-45">
              +
            </span>
          </summary>
          <ul className="px-5 pb-5 space-y-3">
            {rasgosNo.map((rasgo) => (
              <li key={rasgo.titulo} className="flex gap-3">
                <IconoCruz className="w-4 h-4 mt-0.5 flex-shrink-0 text-white/35" />
                <div>
                  <p className="text-white/75 text-[14px] font-semibold">{rasgo.titulo}</p>
                  <p className="text-white/40 text-[12.5px] leading-relaxed">{rasgo.descripcion}</p>
                </div>
              </li>
            ))}
          </ul>
        </details>
      </div>
    </section>
  );
}
