# Prasanth Anupoju | Cinematic Scrollytelling Portfolio

A high-end, production-grade portfolio built with **Next.js 16** and **React 19**, featuring a state-of-the-art "scrollytelling" experience. This project demonstrates advanced frontend engineering techniques, including hardware-accelerated canvas rendering, complex scroll-driven animations, and premium UI interactions.

---

## 🚀 Technologies & Architecture

### **Core Stack**
- **Next.js 16 (App Router)**: Utilizing the latest React 19 features, Server Components for performance, and optimized client-side hydration.
- **TypeScript**: Ensuring type safety across complex animation data and component props.
- **Tailwind CSS**: Implementing a custom design system with utility-first styling, glassmorphism, and responsive layouts.
- **Hardware-Accelerated Canvas**: The hero and skills sections use HTML5 Canvas to render high-fidelity image sequences (260+ frames total), ensuring 60fps performance by offloading rendering from the DOM.

### **Animation Ecosystem**
- **Framer Motion**: 
  - Powers the **Scroll-Scrubbing Logic**: Maps vertical scroll progress to image sequence indices.
  - **Dynamic Text Reveal**: Implements a word-by-word "scrub reveal" where text opacity is tied to specific scroll windows.
  - **Layout Transitions**: Handles smooth entrance/exit animations for UI overlays using `AnimatePresence`.
- **GSAP (GreenSock Animation Platform)**:
  - **3D Tilt Effect**: Used in Project Cards to provide a tactile, interactive feel through mouse-tracking transformations.
  - **Magnetic Buttons**: High-performance "magnetic" pull effect on CTAs using GSAP's optimized transform engine.
  - **Parallax Layers**: Creates depth in project cards by moving content layers at different speeds relative to mouse position.
- **Lenis**:
  - Provides **Inertial Smooth Scrolling**, which is critical for cinematic experiences. It synchronizes native scroll events with our animation timelines for a fluid, lag-free feel.

---

## 🎨 Design & Aesthetics

### **Color Grading & Visual Language**
- **Primary Palette**: Deep `Slate-950` (#020617) for the backdrop, creating a "black hole" depth.
- **Accent Tones**: `Orange-500` for primary actions and highlights, contrasting with `Blue-600/400` ambient glows for a futuristic tech aesthetic.
- **Cinematic Lighting**: Extensive use of `radial-gradients` and `blur` filters to create "ambient light sweeps" and "holographic grids" that feel alive.
- **Glassmorphism**: UI cards utilize `backdrop-blur-xl` and semi-transparent white borders (`white/10`) to simulate high-end frosted glass.

### **Micro-Animations**
- **Scanlines & Noise**: Subtle overlay textures (`grainy-gradients`) and CSS scanline animations provide a "monitored" or "holographic" feel to the interface.
- **Staggered Reveals**: Skills and project tags use index-based delays to create a rhythmic, structured appearance as they enter the viewport.

---

## 📦 Dependencies & Purpose

| Dependency | Purpose in this Project |
| :--- | :--- |
| `framer-motion` | Orchestrates the primary scroll-to-animation mapping and text scrubbing. |
| `gsap` & `@gsap/react` | Handles high-frequency mouse interactions (tilt, magnetic) for superior performance. |
| `lenis` | Normalizes scrolling behavior across browsers, providing the "luxury" smooth-scroll feel. |
| `lucide-react` | Provides consistent, lightweight SVG icons for the interface. |
| `clsx` & `tailwind-merge` | Ensures clean management of dynamic Tailwind classes without style conflicts. |

---

## 🛠️ Configuration & Architecture

To maintain this project at a professional level, it is important to understand the role of each configuration file:

- **`next.config.mjs`**: The main brain of the app. It handles the static export settings (`output: 'export'`) and allows images to work without a dedicated server.
- **`tsconfig.json`**: The rulebook for TypeScript. It ensures the computer understands our advanced `.tsx` component structure.
- **`postcss.config.mjs`**: The engine behind our styling. It processes Tailwind CSS so the browser can render our cinematic designs.
- **`.gitignore`**: The "filter." It tells GitHub to ignore large temporary folders like `node_modules` and `.next`, keeping your repository light and clean.

---

## 🚀 Deployment Guide (Render)

Since this project is configured for **Static Export**, it is perfect for the **Render Static Site** service. Follow these steps for a flawless production launch:

### **1. Push to GitHub**
Push your code to a new repository. Only your source files will be pushed; build artifacts like `.next` and `node_modules` are automatically ignored by our `.gitignore`.

### **2. Connect to Render**
1.  Log in to [Render.com](https://render.com).
2.  Click **New +** and select **Static Site**.
3.  Connect your GitHub account and select this repository (`Prasanth-portfolio-main`).

### **3. Configure Build Settings**
In the Render dashboard, use the following settings:
- **Build Command**: `npm install && npm run build`
- **Publish Directory**: `out`

### **4. Environment Variables**
This app is fully self-contained and does not require external environment variables for basic deployment.

---

## 🧠 Interviewer's Deep Dive: Key Technical Decisions

### **1. Why Canvas instead of Video?**
Traditional video elements struggle with precise "scrubbing" (reverse playback is slow, seeking causes frame skips). By pre-loading image sequences and drawing them to a **Canvas**, we gain frame-perfect control. This allows the user to "play" the animation forward and backward at the speed of their scroll with zero latency.

### **2. Handling Performance on Mobile**
To prevent memory issues, we use `rAF` (requestAnimationFrame) for the canvas render loop and handle Device Pixel Ratio (DPR) scaling manually. This ensures images look sharp on Retina displays without over-rendering on lower-end devices.

### **3. The "Scrollytelling" State Machine**
The `DeveloperTextOverlays` and `LaptopSkillsScroll` components act as state machines. They track `scrollYProgress` and trigger visibility changes for UI elements at specific "keyframe" thresholds (e.g., 0.28 for Hero exit, 0.72 for About Me entrance). This ensures the story unfolds exactly as the visuals transition.

---

## 🛠️ Local Development

1. **Install Dependencies**:
   ```bash
   npm install
   ```
2. **Run Development Server**:
   ```bash
   npm run dev
   ```
3. **Build for Production**:
   ```bash
   npm run build
   ```

---
*Created with precision by Prasanth Anupoju.*
