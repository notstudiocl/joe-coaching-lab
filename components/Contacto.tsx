"use client";

import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { motion } from "framer-motion";
import { contarDigitos, enviarLead } from "@/lib/enviarLead";

interface FormValues {
  nombre: string;
  whatsapp: string;
  empresa: string;
}

export default function Contacto() {
  const [enviado, setEnviado] = useState(false);
  const [errorEnvio, setErrorEnvio] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setErrorEnvio(false);
    try {
      await enviarLead({
        nombre: data.nombre,
        whatsapp: data.whatsapp,
        origen: "Formulario de contacto",
        empresa: data.empresa,
      });
      setEnviado(true);
    } catch {
      setErrorEnvio(true);
    }
  };

  return (
    <section id="contacto" className="py-16 bg-[#0a0a0a] px-4">
      <div className="max-w-lg mx-auto">
        {/* Encabezado */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const }}
          className="mb-8"
        >
          <p className="text-[#00B4D8] text-[11px] font-bold tracking-widest uppercase mb-3">
            Da el primer paso
          </p>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight mb-3">
            ¿Listo para
            <br />
            <span className="text-[#00B4D8]">transformarte?</span>
          </h2>
          <p className="text-white/50 text-[14px] leading-relaxed">
            Déjame tus datos y me pongo en contacto contigo en menos de 24h
            para hablar de tu plan.
          </p>
        </motion.div>

        {/* Formulario o confirmación */}
        {enviado ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35 }}
            className="text-center py-14 px-6 rounded-2xl border border-[#00B4D8]/20 bg-[#00B4D8]/5"
          >
            <div className="text-5xl mb-4">🎉</div>
            <h3 className="text-xl font-bold text-white mb-2">¡Mensaje recibido!</h3>
            <p className="text-white/50 text-sm">
              Te escribo en menos de 24h. Prepárate para empezar.
            </p>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{
              duration: 0.5,
              ease: [0.25, 0.1, 0.25, 1] as const,
              delay: 0.08,
            }}
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="space-y-4"
          >
            {/* Nombre */}
            <div>
              <label
                htmlFor="nombre"
                className="block text-[13px] font-semibold text-white/65 mb-1.5"
              >
                Nombre <span className="text-[#00B4D8]">*</span>
              </label>
              <input
                id="nombre"
                type="text"
                placeholder="¿Cómo te llamas?"
                autoComplete="given-name"
                {...register("nombre", { required: "El nombre es obligatorio" })}
                className="w-full bg-white/5 border border-white/10 focus:border-[#00B4D8] text-white text-[15px] placeholder-white/20 rounded-xl px-4 py-3.5 outline-none transition-colors duration-200"
              />
              {errors.nombre && (
                <p className="mt-1 text-[12px] text-red-400">
                  {errors.nombre.message}
                </p>
              )}
            </div>

            {/* WhatsApp */}
            <div>
              <label
                htmlFor="whatsapp"
                className="block text-[13px] font-semibold text-white/65 mb-1.5"
              >
                WhatsApp <span className="text-[#00B4D8]">*</span>
              </label>
              <input
                id="whatsapp"
                type="tel"
                placeholder="+569 XXXX XXXX"
                autoComplete="tel"
                {...register("whatsapp", {
                  required: "El WhatsApp es obligatorio",
                  validate: (valor) =>
                    (contarDigitos(valor) >= 8 && contarDigitos(valor) <= 15) ||
                    "Revisa el número, por ejemplo +569 1234 5678",
                })}
                className="w-full bg-white/5 border border-white/10 focus:border-[#00B4D8] text-white text-[15px] placeholder-white/20 rounded-xl px-4 py-3.5 outline-none transition-colors duration-200"
              />
              {errors.whatsapp && (
                <p className="mt-1 text-[12px] text-red-400">
                  {errors.whatsapp.message}
                </p>
              )}
            </div>

            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="absolute -left-[9999px] h-0 w-0 opacity-0"
              {...register("empresa")}
            />

            {errorEnvio && (
              <p role="alert" className="text-center text-[13px] text-red-400">
                No pudimos enviar tus datos. Revisa tu conexión e inténtalo de nuevo.
              </p>
            )}

            {/* Botón */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#00B4D8] hover:bg-[#0077B6] active:bg-[#005f8c] disabled:opacity-60 text-[#0a0a0a] font-bold text-[15px] py-4 rounded-xl transition-colors duration-200 shadow-lg shadow-[#00B4D8]/20 mt-2"
            >
              {isSubmitting ? "Enviando..." : "Enviar y empezar mi plan"}
            </button>

            <p className="text-center text-white/25 text-[12px]">
              Sin spam. Solo te contacto para hablar de tu plan.
            </p>

            {/* Sello de marca */}
            <p className="text-center text-[10px] font-semibold tracking-[0.18em] uppercase text-white/14 select-none pt-2">
              Joe Coaching Lab
            </p>
          </motion.form>
        )}
      </div>
    </section>
  );
}
