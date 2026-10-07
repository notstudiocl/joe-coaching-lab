"use client";

import { useState } from "react";
import Hero from "@/components/Hero";
import Plan from "@/components/Plan";
import Testimonios from "@/components/Testimonios";
import ParaTi from "@/components/ParaTi";
import Contacto from "@/components/Contacto";

export default function LandingClient() {
  const [videoUnlocked, setVideoUnlocked] = useState(false);

  return (
    <>
      <Hero videoUnlocked={videoUnlocked} onUnlock={() => setVideoUnlocked(true)} />
      <Plan />
      <Testimonios />
      <ParaTi />
      <Contacto />
    </>
  );
}
