"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { Send, Phone, Mail, User, MessageSquare } from "lucide-react";

export function Contact() {
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic for form submission would go here
    alert("Thank you for your feedback! This is a demo form.");
  };

  return (
    <section id="contact" className="relative w-full bg-[#050505] py-40 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/5 rounded-full blur-[160px]" />
      </div>

      <div className="container relative mx-auto px-6 z-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-20">
            <span className="text-[10px] font-bold uppercase tracking-[0.6em] text-[#6EA8FF]/50 mb-6 block">
              Phase 05 — Connection
            </span>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-white mb-8 leading-none">
              GET IN <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/30">
                TOUCH
              </span>
            </h2>
            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-[#6EA8FF]/40" />
              <div className="w-2 h-2 rounded-full border border-[#6EA8FF]/40" />
              <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-[#6EA8FF]/40" />
            </div>
          </div>

          {/* Form Card */}
          <div className="relative group">
            {/* Glass Card */}
            <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/5 p-8 md:p-16 backdrop-blur-2xl transition-all duration-700 hover:border-[#6EA8FF]/30">
              {/* Internal Glow */}
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-colors duration-700" />
              
              <form ref={formRef} onSubmit={handleSubmit} className="relative z-10 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Full Name */}
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50 flex items-center gap-2">
                      <User size={12} className="text-[#6EA8FF]" /> Full Name
                    </label>
                    <input 
                      type="text" 
                      placeholder="John Doe"
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-[#6EA8FF]/50 transition-all"
                    />
                  </div>

                  {/* Phone Number */}
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50 flex items-center gap-2">
                      <Phone size={12} className="text-[#6EA8FF]" /> Phone Number
                    </label>
                    <input 
                      type="tel" 
                      placeholder="+1 (555) 000-0000"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-[#6EA8FF]/50 transition-all"
                    />
                  </div>
                </div>

                {/* Email Address */}
                <div className="space-y-3">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50 flex items-center gap-2">
                    <Mail size={12} className="text-[#6EA8FF]" /> Email Address
                  </label>
                  <input 
                    type="email" 
                    placeholder="john@example.com"
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-[#6EA8FF]/50 transition-all"
                  />
                </div>

                {/* Feedback / Message */}
                <div className="space-y-3">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50 flex items-center gap-2">
                    <MessageSquare size={12} className="text-[#6EA8FF]" /> Your Feedback
                  </label>
                  <textarea 
                    rows={5}
                    placeholder="How can I help you?"
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-6 text-white placeholder:text-white/20 focus:outline-none focus:border-[#6EA8FF]/50 transition-all resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="group/btn relative w-full overflow-hidden rounded-2xl border border-white/10 bg-[#6EA8FF] px-8 py-5 text-[12px] font-black uppercase tracking-[0.4em] text-white transition-all hover:shadow-[0_0_30px_rgba(110,168,255,0.4)] active:scale-[0.98]"
                >
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    Send Message <Send size={16} className="transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
                  </span>
                  <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover/btn:translate-x-full" />
                </button>
              </form>
            </div>
            
            {/* Decorative Outer Glow */}
            <div className="absolute -inset-4 z-[-1] rounded-[40px] bg-blue-500/0 blur-3xl transition-all duration-700 group-hover:bg-blue-600/5" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
