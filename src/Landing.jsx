import React, { useState, useEffect } from "react";
import { motion,AnimatePresence } from "framer-motion";
import { CheckCircle, Image as ImageIcon, Zap, Quote } from "lucide-react";
import Navbar from "../src/navbar/Navbar";
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();
  const images = [
    "./overlays/luffy.png",
    "./overlays/naruto.png",
    "./overlays/Asta.png",
    "./overlays/zoro.png",
    "./overlays/ayankoji.png",
    "./overlays/eren.png",
    "./overlays/dazai.png",
  ];

  const quotes = [
    {
      text: "Power isn’t determined by your size, but by the size of your heart and dreams.",
      anime: "— Monkey D. Luffy (One Piece)",
    },
    {
      text: "When you give up, your dreams and everything else are gone.",
      anime: "— Naruto Uzumaki (Naruto)",
    },
    {
      text: "Surpass your limits, right here, right now!",
      anime: "— Asta (Black Clover)",
    },
    {
      text: "Only those who have suffered long can see the light within the shadows.",
      anime: "— Roronoa Zoro (One Piece)",
    },
    {
      text: "People who can’t think for themselves are worth less than nothing.",
      anime: "— Ayanokouji Kiyotaka (Classroom of the Elite)",
    },
    {
      text: "If you win, you live. If you lose, you die. If you don’t fight, you can’t win!",
      anime: "— Eren Yeager (Attack on Titan)",
    },
    {
      text: "I want to die only after accomplishing something truly magnificent.",
      anime: "— Osamu Dazai (Bungou Stray Dogs)",
    },
  ];

  const [currentImage, setCurrentImage] = useState(0);
  const [currentQuote, setCurrentQuote] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
      setCurrentQuote((prev) => (prev + 1) % quotes.length);
    }, 6000); 

    return () => clearInterval(interval);
  }, []);


  return (
    <>
      <Navbar />

      {/* --- Hero Section --- */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="min-h-screen flex flex-col items-center justify-center relative bg-black overflow-hidden px-6 md:px-12"
      >
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,0,0.1),transparent),radial-gradient(circle_at_80%_80%,rgba(255,255,0,0.15),transparent)] animate-pulse"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/70 to-transparent"></div>

        <div className="container mx-auto flex flex-col md:flex-row items-center justify-center md:justify-between gap-10 relative z-10 w-full">
          {/* --- Text Content --- */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="w-full md:w-1/2 space-y-6 text-center md:text-left"
          >
            <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight drop-shadow-[0_0_10px_rgba(255,255,0,0.4)] mt-25 md:mt-0 lg:mt-0">
              <span className="text-yellow-400">AniCraft</span> — Where
              Creativity Meets Anime
            </h1>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuote}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.6 }}
                className="bg-white/5 border border-yellow-400/20 rounded-xl p-4 shadow-md backdrop-blur-md"
              >
                <p className="text-lg md:text-xl text-yellow-200 italic flex items-start justify-center md:justify-start gap-2">
                  <Quote className="w-5 h-5 text-yellow-300 mt-1" />“
                  {quotes[currentQuote].text}”
                </p>
                <p className="text-sm text-gray-400 mt-2">
                  {quotes[currentQuote].anime}
                </p>
              </motion.div>
            </AnimatePresence>

            <p className="text-gray-300 text-base md:text-lg">
              Transform your images into breathtaking anime art with overlays
              inspired by your favorite worlds.
            </p>

            <div className="flex gap-4 justify-center md:justify-start">
              <motion.button
                onClick={() => navigate("/overlay")}
                whileHover={{
                  scale: 1.1,
                  boxShadow: "0px 0px 15px rgba(255, 255, 0, 0.6)",
                }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-yellow-300 to-yellow-500 text-black px-6 py-3 rounded-2xl font-semibold shadow-lg hover:shadow-yellow-400/50 transition-transform duration-300"
              >
                Start Editing ⚡
              </motion.button>
              <motion.a
                href="https://github.com/SachinPundir78/AniCraft"
                target="_blank"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="border border-yellow-400 text-yellow-300 px-6 py-3 rounded-2xl font-semibold shadow-md hover:bg-yellow-400 hover:text-black transition-all duration-300"
              >
                View on GitHub
              </motion.a>
            </div>
          </motion.div>

          {/* --- Image Showcase --- */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="w-full md:w-1/2 flex justify-center"
          >
            <div className="relative w-[450px] h-[550px] flex items-center justify-center">
              <div className="absolute inset-0 bg-yellow-400/10 rounded-3xl blur-3xl"></div>
              <motion.img
                key={currentImage}
                src={images[currentImage]}
                alt="Anime Character"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.8 }}
                className="rounded-3xl shadow-2xl object-contain transform scale-x-[-1] transition-all duration-500 w-full h-full"
              />
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* --- 🌟 Features Section (Improved) --- */}
      <section className="relative py-15 bg-gradient-to-b from-black via-zinc-900 to-black overflow-hidden text-white">
        {/* Animated gradient orbs for background depth */}
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-yellow-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-300/10 rounded-full blur-3xl"></div>

        <div className="relative container mx-auto px-6 md:px-12 text-center z-10">
          {/* Title */}
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
            Why Choose <span className="text-yellow-400">AniCraft?</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-10">
            Power your anime edits with precision-crafted overlays, blazing
            speed, and endless creativity.
          </p>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              {
                icon: (
                  <CheckCircle size={42} className="text-yellow-400 mb-5" />
                ),
                title: "High-Quality Overlays",
                description:
                  "Crisp, detailed anime overlays that bring cinematic depth and vibrancy to your visuals.",
                delay: 0.2,
              },
              {
                icon: <Zap size={42} className="text-yellow-400 mb-5" />,
                title: "Fast & Effortless",
                description:
                  "Skip complex editors—upload, apply, and export stunning results in seconds.",
                delay: 0.4,
              },
              {
                icon: <ImageIcon size={42} className="text-yellow-400 mb-5" />,
                title: "Diverse Collection",
                description:
                  "Access a growing library of overlays for every mood, tone, and animation style.",
                delay: 0.6,
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: feature.delay }}
                viewport={{ once: true }}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 hover:-translate-y-2 shadow-lg hover:shadow-yellow-400/10"
              >
                <div className="flex flex-col items-center text-center">
                  {feature.icon}
                  <h3 className="text-xl font-semibold mb-3 text-yellow-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="py-6 bg-black text-gray-400 text-center border-t border-yellow-400/10">
        <p>
          &copy; {new Date().getFullYear()} AniEditor. Built with ❤️ and anime
          spirit By Sachin Pundir.
        </p>
      </footer>
    </>
  );
}

// Reusable Feature Card Component
function FeatureCard({ icon, title, description, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay }}
      className="p-8 bg-gradient-to-b from-gray-900 to-black rounded-2xl border border-yellow-400/10 shadow-lg hover:shadow-yellow-400/30 transition-shadow duration-300"
    >
      {icon}
      <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </motion.div>
  );
}
