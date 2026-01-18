"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const EasterEgg = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isRacing, setIsRacing] = useState(false);
    const [position, setPosition] = useState({ top: "50%", right: "5%" });

    useEffect(() => {
        // Random appearance logic
        const randomChance = Math.random();
        if (randomChance > 0.6) { // 40% chance
            const randomTop = 20 + Math.random() * 60; // 20% to 80%
            // Random horizontal position (keep it somewhat right-aligned or random)
            // User requested random vertical, let's keep it on the right or left edge to be unobtrusive?
            // "anywhere from top 20% to bottom 80%".
            // Let's place it randomly on the screen but avoid center. 
            // Actually, let's stick to the right side for the button to race left-to-right? 
            // Or button triggers car from left.

            // Random Delay
            const delay = 2000 + Math.random() * 2000; // 2-4s

            const timer = setTimeout(() => {
                setPosition({
                    top: `${randomTop}%`,
                    right: `${10 + Math.random() * 20}%` // Random horizontal on right side
                });
                setIsVisible(true);
            }, delay);

            return () => clearTimeout(timer);
        }
    }, []);

    const startRace = () => {
        setIsVisible(false);
        setIsRacing(true);
        // Reset racing state after animation
        setTimeout(() => {
            setIsRacing(false);
        }, 4000);
    };

    return (
        <>
            {/* The Trigger Button */}
            <AnimatePresence>
                {isVisible && (
                    <motion.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={startRace}
                        className="fixed z-50 w-12 h-12 bg-bmb-accent-red/80 hover:bg-bmb-accent-red rounded-full hidden md:flex items-center justify-center shadow-lg border border-white/20 backdrop-blur-sm cursor-pointer"
                        style={{ top: position.top, right: position.right }}
                    >
                        <span className="text-xl">🏎️</span>
                    </motion.button>
                )}
            </AnimatePresence>

            {/* The Racing Car */}
            <AnimatePresence>
                {isRacing && (
                    <motion.div
                        initial={{ x: "-20vw", opacity: 1 }}
                        animate={{ x: "120vw" }}
                        transition={{
                            duration: 2.5,
                            ease: "easeInOut"
                        }}
                        className="fixed top-1/2 z-[60] text-[100px] pointer-events-none drop-shadow-2xl"
                        style={{
                            top: position.top, // Race at the same level as the button? Or random?
                            y: "-50%"
                        }}
                    >
                        <div className="relative transform -scale-x-100"> {/* Emoji faces left usually, flip to face right */}
                            🏎️
                            {/* Motion Blur / Speed Lines */}
                            <motion.div
                                initial={{ opacity: 0, width: 0 }}
                                animate={{ opacity: 0.5, width: "300px" }}
                                className="absolute top-1/2 left-full h-4 bg-gradient-to-r from-red-500/0 to-red-500/50 blur-sm -z-10 -translate-y-1/2"
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
