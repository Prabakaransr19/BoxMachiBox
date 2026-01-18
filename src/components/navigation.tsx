"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const navItems = [
    { name: "Home", path: "/" },
    { name: "Analysis", path: "/analyze" },
    { name: "Standings", path: "/standings" },
    { name: "Driver Info", path: "/driver-info" },
    { name: "Insights", path: "/insights" },
];

export const Navigation = () => {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    // Lock body scroll when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => { document.body.style.overflow = "unset"; };
    }, [isOpen]);

    return (
        <>
            {/* Desktop Navigation */}
            <nav className="fixed top-6 right-6 z-50 hidden md:flex items-center gap-4">
                {navItems.map((item) => {
                    const isActive = pathname === item.path;
                    if (isActive) return null;

                    return (
                        <Link key={item.path} href={item.path}>
                            <motion.span
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="text-sm font-medium text-neutral-400 hover:text-white uppercase tracking-wider transition-colors cursor-pointer backdrop-blur-sm bg-neutral-900/30 px-3 py-1.5 rounded-full border border-neutral-800 hover:border-bmb-accent-cyan/50"
                            >
                                {item.name}
                            </motion.span>
                        </Link>
                    );
                })}
            </nav>

            {/* Mobile Navigation Trigger */}
            <div className="fixed top-6 right-6 z-50 md:hidden">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-11 h-11 flex flex-col justify-center items-center gap-1.5 bg-neutral-900/80 backdrop-blur-md rounded-full border border-neutral-800 text-white z-50 relative"
                    aria-label="Toggle Menu"
                >
                    <motion.span
                        animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 8 : 0 }}
                        className="w-6 h-0.5 bg-white block origin-center transition-transform"
                    />
                    <motion.span
                        animate={{ opacity: isOpen ? 0 : 1 }}
                        className="w-6 h-0.5 bg-white block transition-opacity"
                    />
                    <motion.span
                        animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -8 : 0 }}
                        className="w-6 h-0.5 bg-white block origin-center transition-transform"
                    />
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed inset-0 z-40 bg-neutral-950/95 backdrop-blur-xl md:hidden flex flex-col justify-center items-center"
                    >
                        <nav className="flex flex-col gap-8 text-center">
                            {navItems.map((item, index) => (
                                <Link
                                    key={item.path}
                                    href={item.path}
                                    onClick={() => setIsOpen(false)}
                                >
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 + index * 0.1 }}
                                        className={`text-3xl font-bold uppercase tracking-tight ${pathname === item.path
                                            ? "text-bmb-accent-cyan"
                                            : "text-white hover:text-neutral-400"
                                            }`}
                                    >
                                        {item.name}
                                    </motion.div>
                                </Link>
                            ))}
                        </nav>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="absolute bottom-12 text-neutral-500 text-sm"
                        >
                            Box Machi Box © {new Date().getFullYear()}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
