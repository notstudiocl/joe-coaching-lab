"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  MotionConfig,
  useReducedMotion,
  type PanInfo,
} from "framer-motion";
import Lightbox from "@/components/Lightbox";
import { capturas } from "@/components/capturasData";

interface Props {
  id?: string;
}

const ease = [0.25, 0.1, 0.25, 1] as const;
const total = capturas.length;

export default function Testimonios({ id = "testimonios" }: Props) {
  const [actual, setActual] = useState(0);
  const [abierta, setAbierta] = useState<number | null>(null);
  const tiraRef = useRef<HTMLDivElement>(null);
  const arrastrando = useRef(false);
  const reducir = useReducedMotion();

  const mover = (paso: number) => setActual((a) => (a + paso + total) % total);

  useEffect(() => {
    const tira = tiraRef.current;
    const miniatura = tira?.children[actual] as HTMLElement | undefined;
    if (!tira || !miniatura || tira.scrollWidth <= tira.clientWidth) return;
    tira.scrollTo({
      left: miniatura.offsetLeft - tira.clientWidth / 2 + miniatura.offsetWidth / 2,
      behavior: reducir ? "auto" : "smooth",
    });
  }, [actual, reducir]);

  const alSoltar = (_: PointerEvent | MouseEvent | TouchEvent, info: PanInfo) => {
    if (info.offset.x < -60 || info.velocity.x < -400) mover(1);
    else if (info.offset.x > 60 || info.velocity.x > 400) mover(-1);
    setTimeout(() => {
      arrastrando.current = false;
    }, 0);
  };

  const c = capturas[actual];

  return (
    <MotionConfig reducedMotion="user">
      <section id={id} className="py-16 bg-[#0a0a0a] px-4">
        <div className="max-w-lg lg:max-w-5xl mx-auto flex flex-col gap-8 lg:grid lg:grid-cols-2 lg:gap-x-14 lg:gap-y-8">
          {/* Encabezado */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease }}
            className="lg:col-start-2 lg:row-start-1 lg:self-end"
          >
            <p className="text-[#00B4D8] text-[11px] font-bold tracking-widest uppercase mb-3">
              Testimonios
            </p>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight">
              Resultados que
              <br />
              <span className="text-[#00B4D8]">se cuentan solos</span>
            </h2>
            <p className="mt-3 text-white/50 text-[13.5px] leading-relaxed">
              Capturas tal cual me llegan: avances, dudas resueltas y logros de mis
              alumnos durante su proceso.
            </p>
          </motion.div>

          {/* Captura destacada */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease, delay: 0.1 }}
            className="lg:col-start-1 lg:row-start-1 lg:row-span-2"
          >
            <motion.div
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              dragSnapToOrigin
              onDragStart={() => {
                arrastrando.current = true;
              }}
              onDragEnd={alSoltar}
              style={{ touchAction: "pan-y" }}
              className="relative mx-auto w-full max-w-[320px] lg:max-w-[360px]"
            >
              <button
                type="button"
                onClick={() => {
                  if (!arrastrando.current) setAbierta(actual);
                }}
                aria-label={`Ver captura ${actual + 1} en grande`}
                className="relative block w-full aspect-[9/16] rounded-2xl border border-white/8 bg-white/[0.03] overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B4D8]"
              >
                <div className="absolute top-0 left-0 right-0 h-[2px] z-10 bg-gradient-to-r from-transparent via-[#00B4D8]/60 to-transparent" />
                <AnimatePresence initial={false}>
                  <motion.div
                    key={c.src}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35, ease }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={c.src}
                      alt={c.alt}
                      fill
                      sizes="(max-width: 1024px) 320px, 360px"
                      draggable={false}
                      className="object-contain select-none"
                    />
                  </motion.div>
                </AnimatePresence>
              </button>
            </motion.div>

            <div className="mt-4 mx-auto max-w-[320px] lg:max-w-[360px] flex items-center justify-between">
              <button
                type="button"
                onClick={() => mover(-1)}
                aria-label="Captura anterior"
                className="w-10 h-10 rounded-full border border-white/10 text-white/70 hover:text-[#00B4D8] hover:border-[#00B4D8]/50 flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B4D8]"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <span className="text-white/40 text-[12px] font-semibold tabular-nums" aria-live="polite">
                <span className="text-[#00B4D8]">{actual + 1}</span> de {total}
              </span>
              <button
                type="button"
                onClick={() => mover(1)}
                aria-label="Captura siguiente"
                className="w-10 h-10 rounded-full border border-white/10 text-white/70 hover:text-[#00B4D8] hover:border-[#00B4D8]/50 flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B4D8]"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>
          </motion.div>

          {/* Miniaturas */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease, delay: 0.2 }}
            className="lg:col-start-2 lg:row-start-2 lg:self-start"
          >
            <div
              ref={tiraRef}
              className="relative -mx-4 px-4 py-2 flex gap-3 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:mx-0 lg:px-0 lg:grid lg:grid-cols-4 lg:overflow-visible"
            >
              {capturas.map((m, i) => (
                <button
                  key={m.src}
                  type="button"
                  onClick={() => setActual(i)}
                  aria-label={`Mostrar captura ${i + 1}`}
                  aria-current={actual === i}
                  className={`relative shrink-0 w-16 lg:w-auto aspect-[9/16] rounded-xl overflow-hidden border bg-white/[0.03] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B4D8] ${
                    actual === i
                      ? "border-transparent ring-2 ring-[#00B4D8] ring-offset-2 ring-offset-[#0a0a0a] opacity-100"
                      : "border-white/8 opacity-45 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={m.src}
                    alt=""
                    fill
                    sizes="(max-width: 1024px) 64px, 120px"
                    className="object-contain"
                  />
                </button>
              ))}
            </div>

            <a
              href="#contacto"
              className="mt-8 flex w-full items-center justify-center gap-2 bg-[#00B4D8] hover:bg-[#0077B6] active:bg-[#005f8c] text-[#0a0a0a] font-bold text-sm py-3.5 rounded-full transition-colors duration-200 shadow-lg shadow-[#00B4D8]/20"
            >
              Quiero mis propios resultados
            </a>
          </motion.div>
        </div>

        <Lightbox
          capturas={capturas}
          indice={abierta}
          onClose={() => setAbierta(null)}
          onChange={setAbierta}
        />
      </section>
    </MotionConfig>
  );
}
