"use client";

import React, { useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { DeveloperFrameScroll } from "@/components/DeveloperFrameScroll";
import { LaptopSkillsScroll } from "@/components/LaptopSkillsScroll";
import { Projects } from "@/components/Projects";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { developerStory } from "@/data/developer";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const developerData = developerStory[0];

  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);
  }, []);

  return (
    <AnimatePresence mode="wait">
      <motion.main 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen flex flex-col bg-slate-950 selection:bg-orange-500 selection:text-white"
      >
        <Navbar />
        
        {/* The Scrollytelling Experience spanning Hero & About Me */}
        <section id="hero-about-animation" className="relative w-full">
          <DeveloperFrameScroll folderPath={developerData.folderPath} />
        </section>

        {/* Cinematic Laptop Skills Section */}
        <section id="skills" className="relative w-full">
          <LaptopSkillsScroll />
        </section>

        {/* Projects Showcase Section */}
        <Projects />

        {/* Contact Form Section */}
        <Contact />

        <Footer />
      </motion.main>
    </AnimatePresence>
  );
}

