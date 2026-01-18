"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useMotionValueEvent, MotionValue } from "framer-motion";

const FRAME_COUNT = 32;
const IMAGES_DIR = "/car-sequence";

function currentFrame(index: number) {
    return `${IMAGES_DIR}/ezgif-frame-${index.toString().padStart(3, "0")}.jpg`;
}

interface ScrollyCanvasProps {
    scrollProgress: MotionValue<number>;
}

export const ScrollyCanvas = ({ scrollProgress }: ScrollyCanvasProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // Device Detection
    useEffect(() => {
        const checkMobile = () => {
            const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
                || window.innerWidth < 768;
            setIsMobile(mobile);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Configuration based on device
    const config = isMobile ? {
        frameCount: 30,
        dir: "/mobile_car_animation",
        prefix: "mobile_frame_",
        ext: ".png"
    } : {
        frameCount: 32,
        dir: "/car-sequence",
        prefix: "ezgif-frame-",
        ext: ".jpg"
    };

    // Preload images when device config changes
    useEffect(() => {
        setIsLoaded(false);
        const imgs: HTMLImageElement[] = [];
        let loadedCount = 0;
        let errorCount = 0;

        // Fallback check
        const fallbackToDesktop = () => {
            console.warn("Mobile assets missing, falling back to desktop assets.");
            // Force desktop config for this session
            setIsMobile(false);
        };

        for (let i = 1; i <= config.frameCount; i++) {
            const img = new Image();
            const paddedIndex = i.toString().padStart(3, "0");
            img.src = `${config.dir}/${config.prefix}${paddedIndex}${config.ext}`;

            img.onload = () => {
                loadedCount++;
                if (loadedCount === config.frameCount) {
                    setIsLoaded(true);
                }
            };
            img.onerror = () => {
                errorCount++;
                loadedCount++; // Mark as processed
                if (errorCount > 5 && isMobile) {
                    // If multiple mobile frames fail, assume directory is missing and fallback
                    fallbackToDesktop();
                    return;
                }
                if (loadedCount === config.frameCount) setIsLoaded(true);
            };
            imgs.push(img);
        }
        setImages(imgs);
    }, [isMobile]); // Re-run when device changes

    // Draw Logic
    const drawImage = useCallback((index: number) => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");
        const img = images[index];

        if (!canvas || !ctx || !img) return;

        // Prevent drawing broken images (Fix for InvalidStateError)
        if (!img.complete || img.naturalWidth === 0) return;

        // Responsive Canvas Dimensions
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Scale Logic: Contain for Mobile, Cover for Desktop (optional, or just adjust ratio)
        // Mobile usually needs 'contain' entire car width, while desktop might 'cover' styling.
        const hRatio = canvas.width / img.width;
        const vRatio = canvas.height / img.height;

        // For mobile, maybe we prioritize fitting width?
        const ratio = isMobile
            ? Math.min(hRatio, vRatio) // Contain
            : Math.max(hRatio, vRatio); // Cover (Zoomed in effect) - revert to min if standard is preferred

        // Adjust scale factor slightly
        const scale = isMobile ? ratio * 1.0 : ratio * 0.9;

        const centerShift_x = (canvas.width - img.width * scale) / 2;
        const centerShift_y = (canvas.height - img.height * scale) / 2;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.drawImage(
            img,
            0,
            0,
            img.width,
            img.height,
            centerShift_x,
            centerShift_y,
            img.width * scale,
            img.height * scale
        );
    }, [images, isMobile]);

    // Sync with scroll
    useMotionValueEvent(scrollProgress, "change", (latest) => {
        if (!isLoaded || images.length === 0) return;

        // Map 0-1 to 0-(total-1)
        const frameIndex = Math.min(
            config.frameCount - 1,
            Math.floor(latest * config.frameCount)
        );

        requestAnimationFrame(() => drawImage(frameIndex));
    });

    // Handle Resize (redraw current)
    useEffect(() => {
        const handleResize = () => {
            const currentScroll = scrollProgress.get();
            const frameIndex = Math.min(
                config.frameCount - 1,
                Math.floor(currentScroll * config.frameCount)
            );
            if (isLoaded) drawImage(frameIndex);
        }
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [isLoaded, scrollProgress, drawImage, config.frameCount]);

    // Initial Draw
    useEffect(() => {
        if (isLoaded) drawImage(0);
    }, [isLoaded, drawImage]);

    return (
        <div className="relative w-full h-full flex items-center justify-center bg-black">
            {!isLoaded && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-bmb-text">
                    <div className="w-8 h-8 border-2 border-red-600 border-t-white rounded-full animate-spin mb-4" />
                    <span className="text-xs font-mono tracking-widest animate-pulse">
                        {isMobile ? "INITIALIZING MOBILE TELEMETRY..." : "LOADING SIMULATION MODEL..."}
                    </span>
                </div>
            )}
            <canvas ref={canvasRef} className="block w-full h-full" />
        </div>
    );
};
