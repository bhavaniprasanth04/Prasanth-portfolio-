"use client";

import React from "react";
import { motion } from "framer-motion";
import { projects } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";

export function Projects() {
  const fullstackProjects = projects.filter((p) => p.category === "fullstack");
  const automationProjects = projects.filter((p) => p.category === "automation");

  return (
    <section id="projects" className="relative w-full bg-[#050505] py-40 overflow-hidden">
      {/* Section Transition Blend */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-slate-950 to-[#050505] z-10" />

      {/* --- ADVANCED CINEMATIC BACKGROUND --- */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Animated Blue Light Sweeps */}
        <div className="absolute top-1/4 -left-1/4 w-[150%] h-[1px] bg-gradient-to-r from-transparent via-[#6EA8FF]/20 to-transparent rotate-12 animate-pulse" />
        <div className="absolute top-3/4 -right-1/4 w-[150%] h-[1px] bg-gradient-to-r from-transparent via-[#6EA8FF]/10 to-transparent -rotate-12 animate-pulse [animation-delay:2s]" />
        
        {/* Ambient Glows */}
        <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-blue-600/5 rounded-full blur-[160px]" />
        <div className="absolute bottom-0 right-1/4 w-[1000px] h-[1000px] bg-blue-400/5 rounded-full blur-[200px]" />

        {/* Holographic Grid Lines (Subtle) */}
        <div className="absolute inset-0 opacity-[0.03]" 
             style={{ backgroundImage: 'linear-gradient(#6EA8FF 1px, transparent 1px), linear-gradient(90deg, #6EA8FF 1px, transparent 1px)', backgroundSize: '100px 100px' }} 
        />
      </div>

      <div className="container relative mx-auto px-6 z-20">
        {/* --- FULL STACK SECTION --- */}
        <div className="mb-48">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="mb-24 text-center"
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.6em] text-[#6EA8FF]/50 mb-6 block">
              Phase 03 — Production Systems
            </span>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-white mb-8 leading-none">
              FULL STACK <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/30">
                PROJECTS
              </span>
            </h2>
            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-[#6EA8FF]/40" />
              <div className="w-2 h-2 rounded-full border border-[#6EA8FF]/40" />
              <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-[#6EA8FF]/40" />
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 items-stretch">
            {fullstackProjects.map((project, idx) => (
              <ProjectCard key={project.title} project={project} index={idx} />
            ))}
          </div>
        </div>

        {/* --- AI AUTOMATION SECTION --- */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="mb-24 text-center"
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.6em] text-[#6EA8FF]/50 mb-6 block">
              Phase 04 — Intelligent Flows
            </span>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-white mb-8 leading-none">
              AI & AUTOMATION <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/30">
                PROJECTS
              </span>
            </h2>
            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-[#6EA8FF]/40" />
              <div className="w-2 h-2 rounded-full border border-[#6EA8FF]/40" />
              <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-[#6EA8FF]/40" />
            </div>
          </motion.div>


          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {automationProjects.map((project, idx) => (
              <ProjectCard key={project.title} project={project} index={idx + 6} />
            ))}
          </div>
        </div>
      </div>

      {/* Section Transition Footer */}
      <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent z-10 pointer-events-none" />
    </section>
  );
}
