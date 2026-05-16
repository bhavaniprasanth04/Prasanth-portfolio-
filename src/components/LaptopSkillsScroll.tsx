"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { skills } from "@/data/skills";

// ─── Constants ───────────────────────────────────────────────────────────────
const FRAME_COUNT = 150;
// We allocate extra virtual scroll so the last frame "holds" while skills reveal
const VIRTUAL_FRAMES = 190;
// Laptop opening completes by frame ~80. Skills UI fully visible by ~130.
// We start revealing skill cards once scroll > 0.55 and complete by 0.85
const SKILLS_SHOW_AT = 0.50;   // show overlay container
const SKILLS_HIDE_BELOW = 0.45; // hide again on scroll-up

// ─── Skill Card ───────────────────────────────────────────────────────────────
interface SkillCardProps {
  group: (typeof skills)[0];
  index: number;
  visible: boolean;
  totalGroups: number;
  scrollProgress: number; // 0‒1 within the skills reveal window
}

// Each card reveals at a staggered point in [SKILLS_SHOW_AT, 0.90]
function SkillCard({ group, index, totalGroups, scrollProgress }: SkillCardProps) {
  const revealWindow = 0.35; // progress range over which all cards appear
  const cardStart = SKILLS_SHOW_AT + (index / totalGroups) * revealWindow;
  // How far this card is into its own reveal window (0→1)
  const cardProgress = Math.max(0, Math.min(1, (scrollProgress - cardStart) / 0.08));

  const opacity = cardProgress;
  const translateY = (1 - cardProgress) * 40;
  return (
    <div
      style={{
        opacity,
        transform: `translateY(${translateY}px)`,
        transition: "none", // driven by scroll, not CSS transition
        willChange: "opacity, transform",
      }}
      className="flex flex-col gap-3"
    >
      {/* Category label */}
      <p
        className="text-[10px] font-bold uppercase tracking-[0.35em]"
        style={{ color: "#f97316", letterSpacing: "0.35em" }}
      >
        {group.category}
      </p>

      {/* Skill tags */}
      <div className="flex flex-wrap gap-2">
        {group.items.map((item, i) => {
          // Individual items stagger slightly within card
          const itemDelay = i * 0.015;
          const itemProgress = Math.max(0, Math.min(1, (scrollProgress - cardStart - itemDelay) / 0.07));
          const itemOpacity = itemProgress;
          const itemY = (1 - itemProgress) * 16;
          return (
            <span
              key={i}
              style={{
                opacity: itemOpacity,
                transform: `translateY(${itemY}px)`,
                willChange: "opacity, transform",
                transition: "none",
              }}
              className="px-3 py-1.5 rounded-full text-xs font-semibold text-slate-200 border border-white/10 bg-white/5 backdrop-blur-sm"
            >
              {item}
            </span>
          );
        })}
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export function LaptopSkillsScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [imagesReady, setImagesReady] = useState(false);
  const [showSkills, setShowSkills] = useState(false);
  const [scrollVal, setScrollVal] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // ── Preload all frames ──────────────────────────────────────────────────────
  useEffect(() => {
    let cancelled = false;
    const loadAll = async () => {
      const loaded: HTMLImageElement[] = [];
      for (let i = 1; i <= FRAME_COUNT; i++) {
        const img = new Image();
        const idx = i.toString().padStart(3, "0");
        img.src = `/images/skills/ezgif-frame-${idx}.jpg`;
        await new Promise<void>((res) => {
          img.onload = () => res();
          img.onerror = () => res();
        });
        loaded.push(img);
      }
      if (!cancelled) {
        imagesRef.current = loaded;
        setImagesReady(true);
      }
    };
    loadAll();
    return () => { cancelled = true; };
  }, []);

  // ── Draw frame on canvas — manual buffer mapping for max clarity ───────────
  const drawFrame = (ctx: CanvasRenderingContext2D, img: HTMLImageElement) => {
    const canvas = ctx.canvas;
    const dpr = window.devicePixelRatio || 1;
    const bufW = Math.round(window.innerWidth * dpr);
    const bufH = Math.round(window.innerHeight * dpr);

    if (canvas.width !== bufW || canvas.height !== bufH) {
      canvas.width = bufW;
      canvas.height = bufH;
    }

    // Set high-quality smoothing
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    // Calculate in hardware pixels
    const canvasRatio = bufW / bufH;
    const imgRatio = img.naturalWidth / img.naturalHeight;

    let rw: number, rh: number, rx: number, ry: number;
    if (canvasRatio > imgRatio) {
      rw = bufW; rh = bufW / imgRatio; rx = 0; ry = (bufH - rh) / 2;
    } else {
      rh = bufH; rw = bufH * imgRatio; ry = 0; rx = (bufW - rw) / 2;
    }

    ctx.clearRect(0, 0, bufW, bufH);
    ctx.drawImage(img, rx, ry, rw, rh);
  };

  // ── rAF render loop ─────────────────────────────────────────────────────────
  useEffect(() => {
    if (!imagesReady) return;
    let rafId: number;

    const render = () => {
      const canvas = canvasRef.current;
      if (!canvas) { rafId = requestAnimationFrame(render); return; }

      // getContext without extra options — DPR scaling handled in drawFrame
      const ctx = canvas.getContext("2d");
      if (!ctx) { rafId = requestAnimationFrame(render); return; }

      const progress = scrollYProgress.get();
      const virtualIndex = Math.floor(progress * VIRTUAL_FRAMES);
      const frameIndex = Math.min(FRAME_COUNT - 1, virtualIndex);
      const img = imagesRef.current[frameIndex];
      if (img) drawFrame(ctx, img);

      rafId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(rafId);
  }, [imagesReady, scrollYProgress]);

  // ── Show/hide skills overlay ────────────────────────────────────────────────
  useEffect(() => {
    const unsub = scrollYProgress.on("change", (v) => {
      setScrollVal(v);
      setShowSkills((prev) => {
        if (!prev && v >= SKILLS_SHOW_AT) return true;
        if (prev && v < SKILLS_HIDE_BELOW) return false;
        return prev;
      });
    });
    return () => unsub();
  }, [scrollYProgress]);

  // ── Skills label fade (same scrub style as hero) ───────────────────────────
  const sectionLabelOpacity = useTransform(
    scrollYProgress,
    [SKILLS_SHOW_AT, SKILLS_SHOW_AT + 0.05],
    [0, 1]
  );

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-slate-950"
      style={{ height: `${(VIRTUAL_FRAMES / FRAME_COUNT) * 500}vh` }}
    >
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">

        {/* Canvas — full bleed, laptop sequence */}
        <canvas
          ref={canvasRef}
          style={{ display: imagesReady ? "block" : "none" }}
          className="absolute inset-0 w-full h-full pointer-events-none z-0"
        />

        {/* Loading state */}
        {!imagesReady && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-950 z-10">
            <div className="flex flex-col items-center gap-4">
              <div className="w-10 h-10 rounded-full border-2 border-orange-500/30 border-t-orange-500 animate-spin" />
              <p className="text-slate-400 text-sm font-medium tracking-widest uppercase">
                Loading
              </p>
            </div>
          </div>
        )}

        {/* Ambient vignette gradient — matches hero section */}
        <div
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            background:
              "radial-gradient(ellipse 120% 100% at 50% 100%, rgba(2,6,23,0.6) 0%, transparent 70%)",
          }}
        />

        {/* Section label — fades in when skills section enters */}
        <AnimatePresence>
          {showSkills && (
            <motion.div
              key="skills-label"
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="absolute top-8 left-0 right-0 flex justify-center z-20 pointer-events-none"
            >
              <span className="text-orange-400 text-[10px] font-bold uppercase tracking-[0.4em]">
                Technical Skills
              </span>
            </motion.div>
          )}
        </AnimatePresence>




        {/* Skills overlay — appears after laptop is open */}
        <AnimatePresence>
          {showSkills && (
            <motion.div
              key="skills-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="absolute inset-0 z-10 pointer-events-none flex items-center justify-end"
            >
              {/* Right-side dark frosted panel — same radial-gradient style as About Me */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(ellipse 55% 90% at 95% 50%, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.4) 55%, transparent 100%)",
                  backdropFilter: "blur(4px)",
                  WebkitBackdropFilter: "blur(4px)",
                }}
              />

              {/* Skill cards — right side on desktop, bottom on mobile */}
              <div
                className="relative z-10 w-full md:w-[38%] lg:w-[32%] px-6 md:pr-12 lg:pr-20 md:pl-4 py-10 flex flex-col gap-7"
                style={{ marginLeft: "auto" }}
              >
                {/* Heading */}
                <div className="mb-2">
                  <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    animate={{
                      opacity: scrollVal >= SKILLS_SHOW_AT + 0.04 ? 1 : 0,
                      y: scrollVal >= SKILLS_SHOW_AT + 0.04 ? 0 : 30,
                    }}
                    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                    className="text-3xl md:text-4xl font-black tracking-tight text-white leading-none mb-2"
                  >
                    Skills &amp;
                    <br />
                    Technologies
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      opacity: scrollVal >= SKILLS_SHOW_AT + 0.07 ? 0.6 : 0,
                      y: scrollVal >= SKILLS_SHOW_AT + 0.07 ? 0 : 20,
                    }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="text-slate-300 text-sm font-light leading-relaxed"
                  >
                    Tools powering every project — from UI to AI.
                  </motion.p>
                </div>

                {/* Staggered skill groups */}
                {skills.map((group, i) => (
                  <SkillCard
                    key={group.category}
                    group={group}
                    index={i}
                    visible={showSkills}
                    totalGroups={skills.length}
                    scrollProgress={scrollVal}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Scroll hint — only shown at very top of this section */}
        <AnimatePresence>
          {imagesReady && scrollVal < 0.05 && (
            <motion.div
              key="scroll-hint"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="absolute bottom-10 left-0 right-0 flex justify-center z-20 pointer-events-none"
            >
              <div className="flex flex-col items-center gap-2">
                <span className="text-slate-400 text-xs font-semibold tracking-widest uppercase">
                  Scroll to open
                </span>
                <div className="w-px h-8 bg-gradient-to-b from-orange-500/60 to-transparent animate-pulse" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
