import Navbar from "@/components/Navbar";
import LandingClient from "@/components/LandingClient";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <LandingClient />
      </main>
      <Footer />
      <FloatingCTA />
    </>
  );
}
