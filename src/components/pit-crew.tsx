"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Mic2,
    X,
    Github,
    Linkedin,
    Twitter,
    Terminal,
    Coffee,
    Bug,
    Activity,
    Zap,
    Clock,
    Database,
    Palette
} from "lucide-react";

// --- Types ---

interface RadioMessage {
    id: number;
    timestamp: string;
    speaker: "Backend" | "Frontend" | "Data";
    speakerName: string;
    message: string;
    role: string;
}

interface Developer {
    name: string;
    role: string;
    specialty: string;
    achievement: string;
    techStack: string[];
    base: string;
    coffee: string;
    favoriteDriver: string;
    socials: {
        github?: string;
        linkedin?: string;
        twitter?: string;
    };
    avatarColor: string; // fallback color
    messages: RadioMessage[];
}

// --- Data ---

const transcript: RadioMessage[] = [
    {
        id: 1,
        timestamp: "00:12",
        speaker: "Backend",
        role: "Chief Engineer",
        speakerName: "Prabakaran",
        message: "Box box, we have the prediction engine ready for deployment."
    },
    {
        id: 2,
        timestamp: "00:18",
        speaker: "Data",
        role: "Race Engineer",
        speakerName: "System",
        message: "Copy that, XGBoost model running at 93.89% accuracy."
    },
    {
        id: 3,
        timestamp: "00:24",
        speaker: "Frontend",
        role: "Lead Mechanic",
        speakerName: "UI Team",
        message: "Visuals are pushing hard, lap times looking good on the render."
    },
    {
        id: 4,
        timestamp: "00:30",
        speaker: "Backend",
        role: "Chief Engineer",
        speakerName: "Prabakaran",
        message: "Fantastic work team, API response times are lightning fast."
    },
    {
        id: 5,
        timestamp: "00:35",
        speaker: "Data",
        role: "Race Engineer",
        speakerName: "System",
        message: "Confirmed, seeing zero errors on the telemetry stream."
    },
    {
        id: 6,
        timestamp: "00:42",
        speaker: "Frontend",
        role: "Lead Mechanic",
        speakerName: "UI Team",
        message: "Dashboard is pixel-perfect, ready for the green flag."
    },
    {
        id: 7,
        timestamp: "00:48",
        speaker: "Backend",
        role: "Chief Engineer",
        speakerName: "Prabakaran",
        message: "And that's P1 for BoxMachiBox! Outstanding collaboration!"
    }
];

const developers: Developer[] = [
    {
        name: "Prabakaran",
        role: "Full Stack Lead",
        specialty: "System Architecture",
        achievement: "Orchestrated the entire Box Machi Box platform",
        techStack: ["Next.js", "Python", "FastAPI", "Tailwind"],
        base: "Chennai, India",
        coffee: "Filter Coffee",
        favoriteDriver: "Lewis Hamilton",
        socials: {
            github: "#",
            linkedin: "#",
            twitter: "#"
        },
        avatarColor: "bg-blue-600",
        messages: [] // Not used in card map, just for type
    },
    {
        name: "Box Machi Box AI",
        role: "Predictive Model",
        specialty: "Race Strategy & Outcomes",
        achievement: "Achieved 93.89% accuracy on 2024 holdout set",
        techStack: ["XGBoost", "Scikit Level", "Pandas", "NumPy"],
        base: "The Cloud",
        coffee: "High Octane Fuel",
        favoriteDriver: "Max Verstappen",
        socials: {},
        avatarColor: "bg-red-600",
        messages: []
    }
];

const teamStats = [
    { icon: Clock, label: "Combined Experience", value: "5+ Years" },
    { icon: Terminal, label: "Total Commits", value: "847" },
    { icon: Coffee, label: "Coffee Consumed", value: "Infinite ☕" },
    { icon: Bug, label: "Bugs Squashed", value: "Too Many" },
    { icon: Zap, label: "Deployments", value: "42" },
    { icon: Activity, label: "Fastest Debug", value: "12 mins" },
];

export const PitCrew = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const transcriptRef = useRef<HTMLDivElement>(null);

    // Auto-scroll transcript when opened
    useEffect(() => {
        if (isOpen && transcriptRef.current) {
            const scrollTimeout = setTimeout(() => {
                if (transcriptRef.current) {
                    transcriptRef.current.scrollTop = transcriptRef.current.scrollHeight;
                }
            }, 500);
            return () => clearTimeout(scrollTimeout);
        }
    }, [isOpen]);

    // Keyboard 'Escape' to close
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") setIsOpen(false);
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, []);

    // Prevent body scroll when modal is open
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
            {/* --- Pit Radio Button --- */}
            <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-40 flex flex-col items-center">
                <AnimatePresence>
                    {isHovered && !isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="absolute bottom-full mb-3 px-3 py-2 bg-neutral-900 text-white text-xs font-medium rounded-lg whitespace-nowrap border border-neutral-800 shadow-xl pointer-events-none"
                        >
                            Press to connect to pit crew
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-neutral-900 border-r border-b border-neutral-800"></div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <motion.button
                    onClick={() => setIsOpen(true)}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative w-12 h-12 md:w-14 md:h-14 rounded-full bg-neutral-800/90 backdrop-blur-md border-2 border-red-600/50 flex items-center justify-center shadow-lg shadow-red-900/30 group transition-all duration-300 hover:shadow-red-600/40 hover:border-red-500"
                >
                    {/* Pulse Animation */}
                    <span className="absolute inset-0 rounded-full border border-red-500/30 animate-[ping_2s_ease-out_infinite] opacity-50"></span>

                    <Mic2 className="w-5 h-5 md:w-6 md:h-6 text-red-500 group-hover:text-red-400 transition-colors" />
                </motion.button>
            </div>

            {/* --- Modal Overlay --- */}
            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-6">
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                        />

                        {/* Modal Content */}
                        <motion.div
                            initial={{ y: "100%", opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: "100%", opacity: 0 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="relative w-full md:w-[800px] h-full md:h-[90vh] max-h-[90vh] bg-neutral-900/95 border-x border-t md:border border-red-600/30 rounded-t-2xl md:rounded-2xl shadow-2xl shadow-red-900/20 flex flex-col overflow-hidden"
                        >
                            {/* Close Button */}
                            <div className="absolute top-4 right-4 z-20">
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="w-10 h-10 flex items-center justify-center rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Modal Header */}
                            <div className="p-6 md:p-8 border-b border-neutral-800 bg-neutral-900 sticky top-0 z-10">
                                <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
                                    🎙️ RACE CONTROL TRANSCRIPT
                                </h2>
                                <div className="flex items-center justify-between mt-2">
                                    <p className="text-xs md:text-sm text-neutral-400 font-mono">
                                        Session: BoxMachiBox Development
                                    </p>
                                    <div className="flex items-center gap-2 text-xs font-bold text-green-500">
                                        ONLINE <span className="relative flex h-2 w-2">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Scrollable Body */}
                            <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 scrollbar-thin scrollbar-thumb-neutral-700 scrollbar-track-transparent">

                                {/* 1. Transcript */}
                                <div ref={transcriptRef} className="space-y-4 mb-12">
                                    {transcript.map((msg, i) => (
                                        <motion.div
                                            key={msg.id}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.15 + 0.3 }}
                                            className={`bg-neutral-800/50 rounded-lg p-4 border-l-4 ${msg.speaker === "Backend" ? "border-blue-500" :
                                                    msg.speaker === "Frontend" ? "border-red-500" : "border-green-500"
                                                }`}
                                        >
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="text-xs text-neutral-500 font-mono">[{msg.timestamp}]</span>
                                                <span className={`text-xs font-bold uppercase tracking-wider flex items-center gap-1 ${msg.speaker === "Backend" ? "text-blue-400" :
                                                        msg.speaker === "Frontend" ? "text-red-400" : "text-green-400"
                                                    }`}>
                                                    {msg.speaker === "Backend" && "🔧"}
                                                    {msg.speaker === "Frontend" && "🎨"}
                                                    {msg.speaker === "Data" && "📊"}
                                                    {msg.role}
                                                </span>
                                            </div>
                                            <p className="text-neutral-300 italic">
                                                "{msg.message}"
                                            </p>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Divider */}
                                <div className="flex items-center gap-4 text-xs text-neutral-600 font-mono uppercase tracking-widest my-8">
                                    <div className="h-px bg-neutral-800 flex-1" />
                                    <span>Meet The Crew</span>
                                    <div className="h-px bg-neutral-800 flex-1" />
                                </div>

                                {/* 2. Developer Cards */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {developers.map((dev, idx) => (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 1.5 + idx * 0.2 }} // Wait for transcript
                                            className="group bg-neutral-800/40 border border-neutral-700 hover:border-red-600/50 rounded-xl p-6 transition-all duration-300 hover:-translate-y-1"
                                        >
                                            <div className="flex items-center gap-4 mb-6">
                                                <div className={`w-16 h-16 rounded-full border-2 border-red-600/30 flex items-center justify-center text-xl font-bold text-white shadow-lg ${dev.avatarColor}`}>
                                                    {dev.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-bold text-white">{dev.name}</h3>
                                                    <div className="text-sm text-red-400 font-medium">{dev.role}</div>
                                                </div>
                                            </div>

                                            <div className="space-y-3 text-sm">
                                                <div className="flex justify-between border-b border-neutral-800 pb-2">
                                                    <span className="text-neutral-500">Specialty</span>
                                                    <span className="text-neutral-300">{dev.specialty}</span>
                                                </div>
                                                <div className="flex justify-between border-b border-neutral-800 pb-2">
                                                    <span className="text-neutral-500">Base</span>
                                                    <span className="text-neutral-300">{dev.base}</span>
                                                </div>
                                                <div className="flex justify-between border-b border-neutral-800 pb-2">
                                                    <span className="text-neutral-500">Fuel</span>
                                                    <span className="text-neutral-300">{dev.coffee}</span>
                                                </div>

                                                <div className="pt-2">
                                                    <span className="text-xs text-neutral-500 block mb-1">ACHIEVEMENT UNLOCKED 🏆</span>
                                                    <p className="text-green-400 text-xs">{dev.achievement}</p>
                                                </div>

                                                <div className="pt-2">
                                                    <span className="text-xs text-neutral-500 block mb-1">TECH STACK</span>
                                                    <div className="flex flex-wrap gap-1">
                                                        {dev.techStack.map(tech => (
                                                            <span key={tech} className="px-1.5 py-0.5 bg-neutral-900 rounded text-[10px] text-neutral-400 border border-neutral-800">
                                                                {tech}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Socials */}
                                            {Object.keys(dev.socials).length > 0 && (
                                                <div className="flex gap-3 mt-6 pt-4 border-t border-neutral-800">
                                                    {dev.socials.github && <a href={dev.socials.github} className="text-neutral-500 hover:text-white transition-colors"><Github className="w-5 h-5" /></a>}
                                                    {dev.socials.linkedin && <a href={dev.socials.linkedin} className="text-neutral-500 hover:text-white transition-colors"><Linkedin className="w-5 h-5" /></a>}
                                                    {dev.socials.twitter && <a href={dev.socials.twitter} className="text-neutral-500 hover:text-white transition-colors"><Twitter className="w-5 h-5" /></a>}
                                                </div>
                                            )}
                                        </motion.div>
                                    ))}
                                </div>

                                {/* 3. Team Stats */}
                                <div className="mt-12 bg-neutral-900/50 rounded-xl p-6 border border-neutral-800">
                                    <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-6 text-center">Team Telemetry</h3>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                                        {teamStats.map((stat, i) => (
                                            <div key={i} className="flex flex-col items-center text-center">
                                                <stat.icon className="w-5 h-5 text-red-500 mb-2" />
                                                <div className="text-lg font-bold text-white">{stat.value}</div>
                                                <div className="text-xs text-neutral-500">{stat.label}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="mt-12 text-center">
                                    <p className="text-xs text-neutral-700 italic">
                                        "Radio check, copy. Box this lap for coffee."
                                    </p>
                                </div>

                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
};
