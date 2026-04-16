"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";
import VideoModal from "@/components/VideoModal";

const LS_KEY = "jcl_lead";
const VIDEO_ID = "wMaZ-yzk1jI";

export default function VideoLeadGate() {
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(LS_KEY)) {
      setHasSubmitted(true);
    }
  }, []);

  const handlePlayClick = () => {
    if (localStorage.getItem(LS_KEY)) {
      setHasSubmitted(true);
    } else {
      setModalOpen(true);
    }
  };

  const handleModalSuccess = () => {
    setModalOpen(false);
    setHasSubmitted(true);
  };

  if (hasSubmitted) {
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
    <>
      <button
        type="button"
        onClick={handlePlayClick}
        aria-label="Ver el video"
        className="relative w-full aspect-video rounded-2xl overflow-hidden border border-white/8 shadow-2xl shadow-black/40 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00B4D8]"
      >
        <Image
          src={`https://i.ytimg.com/vi/${VIDEO_ID}/maxresdefault.jpg`}
          alt="Miniatura del video Joe Coaching Lab"
          fill
          className="object-cover"
          unoptimized
        />
        {/* Overlay oscuro */}
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-200" />
        {/* Boton de play */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-[#00B4D8]/20 border border-[#00B4D8]/50 flex items-center justify-center group-hover:bg-[#00B4D8]/35 group-hover:border-[#00B4D8]/80 transition-colors duration-200">
            <svg
              className="w-7 h-7 text-[#00B4D8] ml-1"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      </button>

      <VideoModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSuccess={handleModalSuccess}
      />
    </>
  );
}
