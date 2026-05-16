import React from "react";
import { Mail, Heart, Phone } from "lucide-react";

// Brand SVG Icons
const GithubIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.699-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.087.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z" />
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14zm-11.5 6H5v9h2.5V9zm-1.25-1c-.83 0-1.5-.67-1.5-1.5S5.42 5 6.25 5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm3.75 1h2.5v1.22c.35-.66 1.2-1.35 2.46-1.35 2.63 0 3.12 1.73 3.12 3.98V18h-2.5v-4.48c0-1.07-.02-2.45-1.49-2.45-1.5 0-1.73 1.17-1.73 2.37V18h-2.5V9z" />
  </svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

export function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-white/10 pt-16 pb-8 relative z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-orange-900/20 via-slate-950 to-slate-950 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent mb-6">
              Prasanth.
            </h3>
            <p className="text-slate-400 mb-6 font-light leading-relaxed">
              Full Stack Developer specializing in AI-Powered Web Apps, building responsive and intelligent digital experiences.
            </p>
            <div className="flex gap-4">
              <a href="https://github.com/Prasanthanupoju?tab=repositories" target="_blank" rel="noreferrer" className="p-2 rounded-full bg-white/5 hover:bg-orange-500 hover:text-white text-slate-300 transition-all">
                <GithubIcon className="w-5 h-5" />
              </a>
              <a href="https://www.linkedin.com/in/bhavani-prasanth-anupoju/" target="_blank" rel="noreferrer" className="p-2 rounded-full bg-white/5 hover:bg-orange-500 hover:text-white text-slate-300 transition-all">
                <LinkedinIcon className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/reel/Cr3h19YAGOC/?igsh=ZGw1NG80cG5yZW9i" target="_blank" rel="noreferrer" className="p-2 rounded-full bg-white/5 hover:bg-orange-500 hover:text-white text-slate-300 transition-all">
                <InstagramIcon className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3 text-slate-400 font-light">
              <li><a href="#" className="hover:text-orange-400 transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-orange-400 transition-colors">About</a></li>
              <li><a href="#projects" className="hover:text-orange-400 transition-colors">Projects</a></li>
              <li><a href="#skills" className="hover:text-orange-400 transition-colors">Skills</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-1 md:col-span-2 lg:col-span-2">
            <h4 className="text-white font-semibold mb-6">Contact Me</h4>
            <div className="flex flex-col gap-4 text-slate-400 font-light mb-8">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-orange-400" />
                <a href="mailto:anupojubhavani9849@gmail.com" className="hover:text-white transition-colors">
                  anupojubhavani9849@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-orange-400" />
                <span>9849392214</span>
              </div>
            </div>
          </div>

        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between text-slate-500 text-sm font-light">
          <p>
            &copy; {new Date().getFullYear()} Made by Prasanth Anupoju. All rights reserved.
          </p>
          <p className="flex items-center gap-2 mt-4 md:mt-0">
            Built with Next.js <Heart className="w-4 h-4 text-orange-500 fill-orange-500" />
          </p>
        </div>
      </div>
    </footer>
  );
}
