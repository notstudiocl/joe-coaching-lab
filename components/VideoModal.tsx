"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm, type SubmitHandler } from "react-hook-form";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (nombre: string, telefono: string) => void;
}

interface FormValues {
  nombre: string;
  telefono: string;
}

export default function VideoModal({ isOpen, onClose, onSuccess }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();

  const firstInputRef = useRef<HTMLInputElement>(null);

  // Bloquear scroll del body mientras el modal está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setTimeout(() => firstInputRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Cerrar con Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  const onSubmit: SubmitHandler<FormValues> = ({ nombre, telefono }) => {
    localStorage.setItem("jcl_lead", JSON.stringify({ nombre, telefono }));
    const text = `🔔 Nuevo lead - Joe Coaching Lab\nNombre: ${nombre}\nWhatsApp: ${telefono}`;
    window.open(`https://wa.me/56933495506?text=${encodeURIComponent(text)}`, "_blank");
    onSuccess(nombre, telefono);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          className="fixed inset-0 z-[100] flex items-center justify-center px-4"
          style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(6px)" }}
          onClick={(e) => e.target === e.currentTarget && onClose()}
          role="dialog"
          aria-modal="true"
          aria-labelledby="video-modal-title"
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative w-full max-w-[420px] bg-[#111] border border-white/8 rounded-2xl p-7 shadow-2xl shadow-black/60"
          >
            {/* Botón cerrar */}
            <button
              onClick={onClose}
              aria-label="Cerrar"
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/6 border border-white/10 text-white/50 hover:bg-white/12 hover:text-white transition-colors duration-200 text-lg leading-none"
            >
              ×
            </button>

            {/* Encabezado */}
            <p className="text-[#00B4D8] text-[11px] font-bold tracking-widest uppercase mb-2.5">
              Acceso al video
            </p>
            <h2
              id="video-modal-title"
              className="text-[1.3rem] font-extrabold leading-snug tracking-tight mb-2"
            >
              Antes de ver el video...
            </h2>
            <p className="text-white/50 text-[13.5px] leading-relaxed mb-6">
              y ver cómo otras personas transformaron su cuerpo y mente,{" "}
              <strong className="text-white/75">completa tus datos.</strong>
            </p>

            {/* Formulario */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="space-y-3.5"
            >
              {/* Nombre */}
              <div>
                <label
                  htmlFor="modal-nombre"
                  className="block text-[13px] font-semibold text-white/65 mb-1.5"
                >
                  Nombre <span className="text-[#00B4D8]">*</span>
                </label>
                <input
                  id="modal-nombre"
                  type="text"
                  placeholder="¿Cómo te llamas?"
                  autoComplete="given-name"
                  {...register("nombre", { required: "El nombre es obligatorio" })}
                  ref={(el) => {
                    register("nombre").ref(el);
                    (firstInputRef as React.MutableRefObject<HTMLInputElement | null>).current = el;
                  }}
                  className="w-full bg-white/5 border border-white/10 focus:border-[#00B4D8] text-white text-[15px] placeholder-white/20 rounded-xl px-4 py-3.5 outline-none transition-colors duration-200"
                />
                {errors.nombre && (
                  <p className="mt-1 text-[12px] text-red-400">{errors.nombre.message}</p>
                )}
              </div>

              {/* Teléfono */}
              <div>
                <label
                  htmlFor="modal-telefono"
                  className="block text-[13px] font-semibold text-white/65 mb-1.5"
                >
                  WhatsApp / Teléfono <span className="text-[#00B4D8]">*</span>
                </label>
                <input
                  id="modal-telefono"
                  type="tel"
                  placeholder="+34 600 000 000"
                  autoComplete="tel"
                  {...register("telefono", { required: "El teléfono es obligatorio" })}
                  className="w-full bg-white/5 border border-white/10 focus:border-[#00B4D8] text-white text-[15px] placeholder-white/20 rounded-xl px-4 py-3.5 outline-none transition-colors duration-200"
                />
                {errors.telefono && (
                  <p className="mt-1 text-[12px] text-red-400">{errors.telefono.message}</p>
                )}
              </div>

              {/* CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 bg-[#00B4D8] hover:bg-[#0077B6] disabled:opacity-60 text-[#0a0a0a] font-bold text-[15px] py-3.5 rounded-xl transition-colors duration-200 shadow-lg shadow-[#00B4D8]/20 mt-1"
              >
                Ver el video ahora
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>

              <p className="text-center text-white/22 text-[11.5px] pt-1">
                Tus datos están seguros y no serán compartidos.
              </p>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
