"use client";

import { useRef } from "react";
import Link from "next/link";
import { useScroll, useTransform, motion, MotionValue } from "framer-motion";
import { ScrollyCanvas } from "./scrolly-canvas";

const features = [
    {
        title: "AERODYNAMIC ANALYSIS",
        description: "Real-time CFD proxy modeling for drag vs. downforce optimization.",
        alignment: "left", // Screen position
        start: 0.25,
        end: 0.45,
    },
    {
        title: "TIRE DEGRADATION AI",
        description: "Predictive thermal models mapped to track surface granularity.",
        alignment: "right",
        start: 0.5,
        end: 0.7,
    },
    {
        title: "STRATEGY SIMULATION",
        description: "Monte Carlo simulations for 10,000+ race scenarios per second.",
        alignment: "center",
        start: 0.75,
        end: 0.95,
    },
];

const FeatureItem = ({
    feature,
    scrollProgress,
}: {
    feature: (typeof features)[0];
    scrollProgress: MotionValue<number>;
}) => {
    // Opacity peaks in the middle of the range
    const opacity = useTransform(
        scrollProgress,
        [feature.start, (feature.start + feature.end) / 2, feature.end],
        [0, 1, 0]
    );

    const y = useTransform(
        scrollProgress,
        [feature.start, feature.end],
        [50, -50]
    );

    let alignClass = "items-center md:items-start text-center md:text-left left-0 right-0 md:right-auto md:left-20 mx-auto md:mx-0 px-6 md:px-0";
    if (feature.alignment === "right") alignClass = "items-center md:items-end text-center md:text-right left-0 right-0 md:left-auto md:right-20 mx-auto md:mx-0 px-6 md:px-0";
    if (feature.alignment === "center") alignClass = "items-center text-center left-0 right-0 mx-auto px-6";

    return (
        <motion.div
            style={{ opacity, y }}
            className={`absolute top-1/2 -translate-y-1/2 w-full md:max-w-md flex flex-col pointer-events-none z-20 ${alignClass}`}
        >
            <span className="text-bmb-accent-cyan text-xs md:text-sm font-mono tracking-widest mb-2 border-b border-bmb-accent-cyan/30 pb-1">
                SYSTEM CHECK // {feature.title}
            </span>
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-3">
                {feature.title}
            </h3>
            <p className="text-bmb-text text-sm md:text-base leading-relaxed">
                {feature.description}
            </p>
        </motion.div>
    );
};

export const ScrollSequence = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const heroOpacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 1, 0]);
    const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
    const heroPointerEvents = useTransform(scrollYProgress, (val) => val > 0.9 ? "none" : "auto");

    return (
        <section ref={containerRef} className="relative h-[250vh] md:h-[400vh] bg-bmb-bg">
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                {/* Canvas Layer */}
                <div className="absolute inset-0 z-0">
                    <ScrollyCanvas scrollProgress={scrollYProgress} />
                </div>



                {/* Hero Layer (Scrolls away) */}
                <motion.div
                    style={{ opacity: heroOpacity, scale: heroScale, pointerEvents: heroPointerEvents }}
                    className="absolute inset-0 z-20 flex flex-col justify-center items-center px-6"
                >
                    {/* Logo removed from here */}

                    <div className="max-w-4xl text-center mt-20 px-4">
                        <h2 className="text-3xl md:text-7xl lg:text-9xl font-bold tracking-tight text-white mb-4 md:mb-6">
                            PRECISION <br />
                            <span className="text-3xl md:text-7xl lg:text-9xl font-bold tracking-tight text-white mb-6">
                                ENGINEERING
                            </span>
                        </h2>
                        <p className="text-base md:text-xl text-neutral-400 max-w-2xl mx-auto mb-8 md:mb-10 leading-relaxed">
                            The next generation of Formula 1 analytics.
                            Real-time insights, predictive modeling, and granular car telemetry.
                        </p>
                        <Link href="/analyze" className="block w-full md:w-auto">
                            <button className="w-full md:w-auto group relative inline-flex h-12 md:h-12 items-center justify-center overflow-hidden rounded-md bg-neutral-900 px-8 py-3 font-medium text-neutral-200 transition-all duration-300 hover:bg-neutral-800 hover:text-white border border-neutral-800 hover:border-bmb-accent-cyan/50 text-sm md:text-base">
                                <span className="mr-2">Go to Analysis</span>
                                <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                            </button>
                        </Link>
                    </div>
                </motion.div>

                {/* Overlay Gradient/Scanlines Optional */}
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-bmb-bg via-transparent to-transparent opacity-80 pointer-events-none" />

                {/* Features Layer */}
                {features.map((f, i) => (
                    <FeatureItem key={i} feature={f} scrollProgress={scrollYProgress} />
                ))}
            </div>
        </section>
    );
};
