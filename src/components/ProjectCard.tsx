"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ExternalLink, ArrowUpRight } from "lucide-react";
import { Project } from "@/data/projects";

const GithubIcon = ({ size = 20 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);

  useGSAP(() => {
    const card = cardRef.current;
    const glow = glowRef.current;
    const content = contentRef.current;
    const button = buttonRef.current;

    if (!card || !glow || !content) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Tilt effect (Made more subtle)
      const rotateX = (y - centerY) / 50;
      const rotateY = (centerX - x) / 50;

      gsap.to(card, {
        rotateX: rotateX,
        rotateY: rotateY,
        duration: 0.5,
        ease: "power2.out",
      });

      // Glow follow
      gsap.to(glow, {
        left: x,
        top: y,
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
      });

      // Parallax content
      gsap.to(content, {
        x: (x - centerX) / 25,
        y: (y - centerY) / 25,
        duration: 0.5,
        ease: "power2.out",
      });

      // Magnetic Button pull
      if (button) {
        const btnRect = button.getBoundingClientRect();
        const btnCenterX = btnRect.left + btnRect.width / 2;
        const btnCenterY = btnRect.top + btnRect.height / 2;
        
        const dist = Math.hypot(e.clientX - btnCenterX, e.clientY - btnCenterY);
        
        if (dist < 100) {
          gsap.to(button, {
            x: (e.clientX - btnCenterX) * 0.3,
            y: (e.clientY - btnCenterY) * 0.3,
            scale: 1.05,
            duration: 0.4,
            ease: "power2.out",
          });
        } else {
          gsap.to(button, {
            x: 0,
            y: 0,
            scale: 1,
            duration: 0.4,
            ease: "power2.out",
          });
        }
      }
    };

    const handleMouseLeave = () => {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        duration: 1,
        ease: "elastic.out(1, 0.3)",
      });

      gsap.to(glow, {
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
      });

      gsap.to(content, {
        x: 0,
        y: 0,
        duration: 1,
        ease: "elastic.out(1, 0.3)",
      });

      if (button) {
        gsap.to(button, {
          x: 0,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "elastic.out(1, 0.3)",
        });
      }
    };

    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 1.2,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{ perspective: "1500px" }}
      className="group relative flex-1"
    >
      <div
        ref={cardRef}
        className="relative flex h-full flex-col overflow-hidden rounded-[24px] border border-white/10 bg-[#ffffff05] p-10 backdrop-blur-xl transition-all duration-700 hover:border-[#6EA8FF]/40 hover:bg-[#ffffff08] shadow-[0_8px_32px_0_rgba(0,0,0,0.8)]"
      >
        {/* Advanced Glow Effect */}
        <div
          ref={glowRef}
          className="pointer-events-none absolute h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 mix-blend-soft-light"
          style={{
            background: `radial-gradient(circle, rgba(110, 168, 255, 0.25) 0%, transparent 70%)`,
          }}
        />

        {/* Noise Texture Overlay */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.02] mix-blend-overlay"
             style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} />

        {/* Content Container for Parallax */}
        <div ref={contentRef} className="relative z-10 flex h-full flex-col">
          {/* Header */}
          <div className="mb-8 flex items-start justify-between">
            <div className="flex flex-wrap gap-2.5">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-lg border border-white/5 bg-white/5 px-3 py-1.5 text-[9px] font-bold tracking-[0.15em] text-[#6EA8FF]/80 uppercase backdrop-blur-md"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex gap-4">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/30 transition-all duration-300 hover:text-white hover:scale-110"
                >
                  <GithubIcon size={20} />
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/30 transition-all duration-300 hover:text-white hover:scale-110"
                >
                  <ArrowUpRight size={22} />
                </a>
              )}
            </div>
          </div>

          {/* Title & Description */}
          <div className="mt-auto">
            <h3 className="mb-4 text-3xl font-black tracking-tighter text-white/90 transition-colors duration-500 group-hover:text-white">
              {project.title}
            </h3>
            <p className="mb-10 text-sm leading-relaxed text-white/40 transition-colors duration-500 group-hover:text-white/70 font-light">
              {project.description}
            </p>

            {/* CTA Button */}
            {(() => {
              const href = project.liveUrl || project.githubUrl || "#";
              const isInactive = href === "#";
              
              return (
                <a
                  ref={buttonRef}
                  href={isInactive ? undefined : href}
                  target={isInactive ? undefined : "_blank"}
                  rel={isInactive ? undefined : "noopener noreferrer"}
                  className={`group/btn relative inline-flex items-center gap-3 overflow-hidden rounded-xl border border-white/10 bg-white/5 px-8 py-4 text-[10px] font-black uppercase tracking-[0.3em] text-white transition-all ${
                    isInactive 
                      ? 'cursor-default opacity-40' 
                      : 'hover:border-[#6EA8FF]/50 hover:shadow-[0_0_20px_rgba(110,168,255,0.2)]'
                  }`}
                >
                  <span className="relative z-10">{isInactive ? "Coming Soon" : "Visit Project"}</span>
                  {!isInactive && (
                    <ExternalLink size={14} className="relative z-10 transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
                  )}
                  {!isInactive && (
                    <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 group-hover/btn:translate-x-full" />
                  )}
                </a>
              );
            })()}

          </div>
        </div>

        {/* Cinematic Scanline Effect */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.03] mix-blend-overlay">
          <div className="h-full w-full bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.04),rgba(0,255,0,0.01),rgba(0,0,255,0.04))] bg-[length:100%_4px,4px_100%]" />
        </div>
      </div>

      {/* Outer Ambient Glow */}
      <div className="absolute -inset-8 z-[-1] rounded-[3rem] bg-blue-500/0 blur-3xl transition-all duration-700 group-hover:bg-blue-600/5" />
    </motion.div>
  );
}
