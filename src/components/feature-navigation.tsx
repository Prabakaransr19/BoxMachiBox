"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const navItems = [
    {
        title: "Analyze",
        description: "Deep dive into telemetry, lap times, and sector performance. Get the real data, machi.",
        href: "/analyze",
        gradient: "from-bmb-white to-bmb-accent-cyan",
    },
    {
        title: "Standings",
        description: "Track the championship battle. Driver and constructor points in real-time.",
        href: "/standings",
        gradient: "from-bmb-white to-purple-400",
    },
    {
        title: "Driver Info",
        description: "Comprehensive profiles and stats. Know the heroes behind the wheel.",
        href: "/driver-info",
        gradient: "from-bmb-white to-amber-400",
    },
];

export const FeatureNavigation = () => {
    return (
        <section className="w-full bg-bmb-bg py-12 md:py-24 px-4 md:px-6 border-b border-neutral-900">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                    {navItems.map((item, index) => (
                        <Link key={item.title} href={item.href} className="group">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="h-full p-6 md:p-8 border border-neutral-800 rounded-lg bg-neutral-900/20 backdrop-blur-sm transition-all duration-300 hover:border-neutral-600 hover:bg-neutral-900/40 hover:-translate-y-1"
                            >
                                <div className="flex flex-col h-full justify-between">
                                    <div>
                                        <h3 className="text-2xl font-bold text-white mb-3 flex items-center group-hover:text-bmb-accent-cyan transition-colors">
                                            {item.title}
                                            <span className="ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                                                →
                                            </span>
                                        </h3>
                                        <p className="text-neutral-400 leading-relaxed">
                                            {item.description}
                                        </p>
                                    </div>
                                    <div className={`mt-6 h-1 w-12 rounded-full bg-gradient-to-r ${item.gradient} opacity-50 group-hover:w-full group-hover:opacity-100 transition-all duration-500`} />
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};
