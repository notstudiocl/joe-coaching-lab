"use client";

import Image from "next/image";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";

const VIDEO_ID = "wMaZ-yzk1jI";

interface Props {
  videoUnlocked: boolean;
}

export default function VideoLeadGate({ videoUnlocked }: Props) {
  const handleClick = () => {
    document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" });
  };

  if (videoUnlocked) {
    return (
      <div className="rounded-2xl overflow-hidden border border-white/8 shadow-2xl shadow-black/40">
        <LiteYouTubeEmbed
          id={VIDEO_ID}
          title="Joe Coaching Lab"
          poster="maxresdefault"
          params="autoplay=1&modestbranding=1&rel=0&iv_load_policy=3&color=white"
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Déjanos tus datos para ver el video"
      className="relative w-full aspect-video rounded-2xl overflow-hidden border border-white/8 shadow-2xl shadow-black/40 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00B4D8]"
    >
      <Image
        src={`https://i.ytimg.com/vi/${VIDEO_ID}/maxresdefault.jpg`}
        alt="Miniatura del video Joe Coaching Lab"
        fill
        className="object-cover"
        unoptimized
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/55 group-hover:bg-black/45 transition-colors duration-200" />

      {/* Contenido centrado */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-4">
        {/* Icono play con candado */}
        <div className="relative">
          <div className="w-16 h-16 rounded-full bg-white/10 border border-white/20 flex items-center justify-center group-hover:bg-[#00B4D8]/20 group-hover:border-[#00B4D8]/40 transition-colors duration-200">
            <svg
              className="w-7 h-7 text-white/50 group-hover:text-[#00B4D8] ml-1 transition-colors duration-200"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
          {/* Candado */}
          <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#0a0a0a] border border-white/20 flex items-center justify-center">
            <svg
              className="w-2.5 h-2.5 text-white/60"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
        </div>

        <p className="text-white/80 text-sm font-semibold tracking-wide text-center leading-snug">
          Déjanos tus datos para ver el video
        </p>
        <p className="text-[#00B4D8] text-[11px] font-bold tracking-widest uppercase">
          Ir al formulario →
        </p>
      </div>
    </button>
  );
}
