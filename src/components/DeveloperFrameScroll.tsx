"use client";

import React, { useRef, useEffect } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import { DeveloperTextOverlays } from "./DeveloperTextOverlays";

interface DeveloperFrameScrollProps {
  folderPath: string;
}

export function DeveloperFrameScroll({ folderPath }: DeveloperFrameScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Track scroll within the 500vh container for more "breathing room"
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Image frames — 117 real frames, 155 virtual
  // Real animation ends at scroll 117/155 = 0.755, then last frame freezes for text scrub
  const frameCount = 117;
  const virtualFrames = 155;
  const imagesRef = useRef<HTMLImageElement[]>([]);

  useEffect(() => {
    // Preload images
    const loadImages = async () => {
      const loadedImages: HTMLImageElement[] = [];
      for (let i = 1; i <= frameCount; i++) {
        const img = new Image();
        const paddedIndex = i.toString().padStart(3, "0");
        img.src = `${folderPath}/ezgif-frame-${paddedIndex}.jpg`;
        await new Promise((resolve) => {
          img.onload = resolve;
          img.onerror = resolve;
        });
        loadedImages.push(img);
      }
      imagesRef.current = loadedImages;

      if (loadedImages.length > 0 && canvasRef.current) {
        const dpr = window.devicePixelRatio || 1;
        const canvas = canvasRef.current;
        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.scale(dpr, dpr);
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = "high";
          drawFrame(ctx, loadedImages[0]);
        }
      }
    };
    loadImages();
  }, [folderPath]);

  // Handle canvas drawing on scroll and resize
  useEffect(() => {
    let animationFrameId: number;

    const render = () => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      const images = imagesRef.current;

      if (canvas && ctx && images.length > 0) {
        const progress = scrollYProgress.get();
        // Map 0-1 to 0-(virtualFrames - 1)
        const virtualIndex = Math.floor(progress * virtualFrames);
        // Cap at the last real image frame
        const frameIndex = Math.min(frameCount - 1, virtualIndex);

        const currentImage = images[frameIndex];
        if (currentImage) {
          drawFrame(ctx, currentImage);
        }
      }
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [scrollYProgress]);

  const drawFrame = (ctx: CanvasRenderingContext2D, img: HTMLImageElement) => {
    const canvas = ctx.canvas;
    const dpr = window.devicePixelRatio || 1;
    const bufW = Math.round(window.innerWidth * dpr);
    const bufH = Math.round(window.innerHeight * dpr);

    // Resize backing buffer only when viewport changes
    if (canvas.width !== bufW || canvas.height !== bufH) {
      canvas.width = bufW;
      canvas.height = bufH;
    }

    // Always set smoothing — resets on some browsers after a resize
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    // All coordinates in BUFFER pixels (hardware resolution, no ctx.scale)
    const canvasRatio = bufW / bufH;
    const imgRatio = img.naturalWidth / img.naturalHeight;

    let renderWidth: number, renderHeight: number, x: number, y: number;

    if (canvasRatio > imgRatio) {
      // Canvas is wider than image — fill width, letterbox vertically
      renderWidth = bufW;
      renderHeight = bufW / imgRatio;
      x = 0;
      y = (bufH - renderHeight) / 2;
    } else {
      // Canvas is taller than image — fill height, pillarbox horizontally
      renderHeight = bufH;
      renderWidth = bufH * imgRatio;
      y = 0;
      x = (bufW - renderWidth) / 2;
    }

    ctx.clearRect(0, 0, bufW, bufH);
    ctx.drawImage(img, x, y, renderWidth, renderHeight);
  };

  return (
    <div ref={containerRef} className="relative h-[500vh] w-full bg-slate-950">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none z-0"
        />
        <div className="relative z-10 w-full h-full">
          <DeveloperTextOverlays scrollYProgress={scrollYProgress} />
        </div>



      </div>
    </div>
  );
}

