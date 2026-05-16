"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, MotionValue, useTransform } from "framer-motion";
import { developerStory } from "@/data/developer";

interface DeveloperTextOverlaysProps {
  scrollYProgress: MotionValue<number>;
}

// Word component:
// - locked=true  → plain <span> at opacity 1 (scrub done, stays white forever)
// - locked=false → <motion.span> scrubbing 0.1→1 based on scroll
function Word({
  word,
  progress,
  start,
  end,
  locked,
}: {
  word: string;
  progress: MotionValue<number>;
  start: number;
  end: number;
  locked: boolean;
}) {
  const animatedOpacity = useTransform(progress, [start, Math.min(end, 0.99)], [0.1, 1]);

  if (locked) {
    return (
      <span className="inline-block mr-[0.28em] mb-[0.05em]" style={{ opacity: 1 }}>
        {word}
      </span>
    );
  }

  return (
    <motion.span className="inline-block mr-[0.28em] mb-[0.05em]" style={{ opacity: animatedOpacity }}>
      {word}
    </motion.span>
  );
}

export function DeveloperTextOverlays({ scrollYProgress }: DeveloperTextOverlaysProps) {
  const data = developerStory[0];

  const [showAbout, setShowAbout] = useState(false);
  const [showHero, setShowHero] = useState(true);
  // scrubDone: true once all words reach full white (scroll >= scrubEnd=0.97)
  // Words stay locked white until user scrolls all the way back to hero (< 0.25)
  const [scrubDone, setScrubDone] = useState(false);
  const mountedRef = useRef(false);

  const fullText =
    "I'm a passionate full stack developer with a strong foundation in HTML, CSS, JavaScript, and backend technologies. I've developed responsive, user-centric web applications with a focus on clean design, functionality, and seamless user experiences. I'm especially interested in leveraging the latest AI tools and APIs to bring smart features and automation into the products I build. Beyond coding, I'm a collaborative team player who values communication, creativity, and continuous learning.";

  const words = fullText.split(" ");
  const totalWords = words.length;

  // Frame math: 117 real / 155 virtual → real animation ends at scroll 117/155 = 0.755
  // Last real frame (face fully revealed) freezes from 0.755 onward
  // Text scrub: starts just after freeze (0.76), all words fully white by 0.97
  const scrubStart = 0.76;
  const scrubEnd = 0.97;
  const scrubRange = scrubEnd - scrubStart;

  useEffect(() => {
    mountedRef.current = true;

    const unsub = scrollYProgress.on("change", (v) => {
      if (!mountedRef.current) return;

      // Hero: visible 0 → 0.28, then fully removed from DOM at 0.30
      setShowHero(v < 0.30);

      // About Me: ON at 0.72 (face revealed), OFF when scrolling back UP past 0.70
      // Symmetrical threshold ensures text exits right as the face re-animates on scroll-up
      setShowAbout((prev) => {
        if (!prev && v >= 0.72) return true;
        if (prev && v < 0.70) return false;
        return prev;
      });

      // Scrub lock:
      //   LOCK at white     → once v >= 0.97 (all words fully lit, in Skills section)
      //   UNLOCK            → as soon as v drops back below 0.97 (scrolling up into scrub zone)
      //   Also hard-reset   → when v drops below 0.70 (about-me is fully hidden)
      //   This lets useTransform reverse-scrub words dim→white as user scrolls back up
      setScrubDone((prev) => {
        if (!prev && v >= 0.97) return true;    // lock white when past scrub zone
        if (prev && v < 0.97) return false;     // unlock as soon as back in scrub zone
        return prev;
      });
    });

    // Initialise on mount
    const v = scrollYProgress.get();
    setShowHero(v < 0.30);
    if (v >= 0.72) setShowAbout(true);
    if (v >= 0.97) setScrubDone(true);

    return () => {
      mountedRef.current = false;
      unsub();
    };
  }, [scrollYProgress]);

  // Hero fade opacity (still animated while it's shown)
  const heroOpacity = useTransform(scrollYProgress, [0, 0.12, 0.28], [1, 1, 0]);

  return (
    <div className="absolute inset-0 w-full h-full" style={{ pointerEvents: "none" }}>

      {/* ── Hero Section ── */}
      {/* Use display:none (via conditional render) so it cannot bleed through About Me */}
      {showHero && (
        <motion.div
          style={{ opacity: heroOpacity }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-200 to-white mb-4 leading-none"
          >
            {data.name}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg sm:text-2xl md:text-3xl text-orange-100/80 font-medium max-w-2xl mx-auto"
          >
            {data.role}
          </motion.p>
          {/* Hidden anchor for About section scroll (approx 80% through the sequence) */}
          <div id="about" className="absolute top-[80%] left-0 w-full h-1 pointer-events-none" />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-10"
          >
            {/* Scroll indicator removed as per user request */}
          </motion.div>
        </motion.div>
      )}

      {/* ── About Me ── */}
      {/* Appears at face reveal (v ≥ 0.72).
          Exits when user scrolls back UP past 0.70 — slides upward out of view. */}
      <AnimatePresence>
        {showAbout && (
          <motion.div
            key="about-me"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: "easeIn" }}
            className="absolute inset-0 flex flex-col items-center justify-center px-6 md:px-16 lg:px-24"
            style={{ pointerEvents: "auto" }}
          >
            {/* Dark frosted-glass backdrop — cinematic navy-blue matching skills section ambience */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "radial-gradient(ellipse 90% 75% at 50% 55%, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.6) 60%, transparent 100%)",
                pointerEvents: "none",
              }}
            />

            <div className="w-full max-w-5xl mx-auto text-center" style={{ position: "relative" }}>
              {/* Label */}
              <p className="text-orange-400 text-xs font-bold uppercase tracking-[0.4em] mb-5">
                About Me
              </p>

              {/* Scrubbing paragraph — centered, words light up as you scroll */}
              <div
                style={{
                  fontSize: "clamp(1.3rem, 2.8vw, 2.5rem)",
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 600,
                  lineHeight: 1.3,
                  letterSpacing: "-0.02em",
                  color: "#ffffff",
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  alignItems: "baseline",
                }}
              >
                {words.map((word, i) => {
                  const wStart = scrubStart + (i / totalWords) * scrubRange;
                  const wEnd = wStart + (1 / totalWords) * scrubRange;
                  return (
                    <Word
                      key={i}
                      word={word}
                      progress={scrollYProgress}
                      start={wStart}
                      end={wEnd}
                      locked={scrubDone}
                    />
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
