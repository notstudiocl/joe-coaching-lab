"use client";

import { useState } from "react";
import Hero from "@/components/Hero";
import Plan from "@/components/Plan";
import Contacto from "@/components/Contacto";

export default function LandingClient() {
  const [videoUnlocked, setVideoUnlocked] = useState(false);

  return (
    <>
      <Hero videoUnlocked={videoUnlocked} onUnlock={() => setVideoUnlocked(true)} />
      <Plan />
      <Contacto />
    </>
  );
}
