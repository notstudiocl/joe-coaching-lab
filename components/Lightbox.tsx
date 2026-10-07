"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import type { Captura } from "@/components/capturasData";

interface Props {
  capturas: Captura[];
  indice: number | null;
  onClose: () => void;
  onChange: (i: number) => void;
}

export default function Lightbox({ capturas, indice, onClose, onChange }: Props) {
  const abierto = indice !== null;
  const total = capturas.length;
  const cerrarRef = useRef<HTMLButtonElement>(null);
  const esCliente = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  useEffect(() => {
    if (!abierto) return;
    const previo = document.body.style.overflow;
    const foco = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    cerrarRef.current?.focus();
    return () => {
      document.body.style.overflow = previo;
      foco?.focus();
    };
  }, [abierto]);

  useEffect(() => {
    if (indice === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onChange((indice + 1) % total);
      if (e.key === "ArrowLeft") onChange((indice - 1 + total) % total);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [indice, total, onClose, onChange]);

  const captura = indice !== null ? capturas[indice] : null;

  if (!esCliente) return null;

  return createPortal(
    <AnimatePresence>
      {captura && indice !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm px-4"
          onClick={(e) => e.target === e.currentTarget && onClose()}
          role="dialog"
          aria-modal="true"
          aria-label={`Captura ${indice + 1} de ${total}`}
        >
          <button
            ref={cerrarRef}
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="absolute top-4 right-4 w-10 h-10 rounded-full border border-white/10 bg-white/5 text-white/70 hover:text-white hover:border-[#00B4D8]/50 flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B4D8]"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>

          <span className="absolute top-6 left-1/2 -translate-x-1/2 text-[11px] font-bold tracking-widest text-white/50 tabular-nums">
            {indice + 1} / {total}
          </span>

          <button
            type="button"
            onClick={() => onChange((indice - 1 + total) % total)}
            aria-label="Captura anterior"
            className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full border border-white/10 bg-[#0a0a0a]/80 text-white/70 hover:text-[#00B4D8] hover:border-[#00B4D8]/50 flex items-center justify-center transition-colors z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B4D8]"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <AnimatePresence mode="wait">
            <motion.div
              key={indice}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
              className="flex items-center justify-center"
            >
              <Image
                src={captura.src}
                alt={captura.alt}
                width={captura.ancho}
                height={captura.alto}
                sizes="(max-width: 640px) 90vw, 480px"
                className="max-h-[85vh] w-auto max-w-[90vw] object-contain rounded-2xl border border-white/8"
              />
            </motion.div>
          </AnimatePresence>

          <button
            type="button"
            onClick={() => onChange((indice + 1) % total)}
            aria-label="Captura siguiente"
            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full border border-white/10 bg-[#0a0a0a]/80 text-white/70 hover:text-[#00B4D8] hover:border-[#00B4D8]/50 flex items-center justify-center transition-colors z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B4D8]"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
