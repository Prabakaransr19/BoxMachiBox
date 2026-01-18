"use client";

import { motion } from "framer-motion";

export const NarrativeBridge = () => {
    return (
        <section className="relative w-full bg-bmb-bg py-16 md:py-32 flex flex-col items-center justify-center border-t border-neutral-900/50">
            <div className="container mx-auto px-6 max-w-[1000px] text-center">
                {/* Title */}
                <motion.h2
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="text-2xl md:text-5xl font-bold text-white mb-6 md:mb-8 tracking-tight"
                >
                    Predicting Podiums Before the Lights Go Out
                </motion.h2>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="text-lg md:text-2xl font-medium text-bmb-accent-cyan mb-8 md:mb-10"
                >
                    Box for the winning strategy, Machi!
                </motion.p>

                {/* Body Copy */}
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="text-base md:text-lg text-neutral-300 max-w-[700px] mx-auto leading-relaxed mb-12 md:mb-16"
                >
                    Why wait for the chequered flag? We analyze every sector, tyre compound, and strategy call to reveal the race winner before it happens. Pure data, no drama.
                </motion.p>

                {/* Three Pillars */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    viewport={{ once: true }}
                    className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 text-sm text-neutral-500 font-mono tracking-widest uppercase"
                >
                    <span>Predict</span>
                    <span className="hidden md:inline text-neutral-700">•</span>
                    <span>Analyze</span>
                    <span className="hidden md:inline text-neutral-700">•</span>
                    <span>Dominate</span>
                </motion.div>
            </div>
        </section>
    );
};
