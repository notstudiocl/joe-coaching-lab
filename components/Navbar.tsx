"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <a href="#" className="text-xl font-extrabold tracking-tight">
          <span className="text-[#00B4D8]">Joe</span>{" "}
          <span className="text-white">Coaching Lab</span>
        </a>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-white/70">
          <a href="#plan" className="hover:text-[#00B4D8] transition-colors">
            El Plan
          </a>
          <a href="#testimonios" className="hover:text-[#00B4D8] transition-colors">
            Resultados
          </a>
          <a
            href="#contacto"
            className="bg-[#00B4D8] text-[#0a0a0a] font-bold px-5 py-2 rounded-full hover:bg-[#90E0EF] transition-colors"
          >
            Empieza ya
          </a>
        </nav>

        <a
          href="#contacto"
          className="md:hidden bg-[#00B4D8] text-[#0a0a0a] font-bold text-sm px-4 py-2 rounded-full"
        >
          Empieza ya
        </a>
      </div>
    </motion.nav>
  );
}
