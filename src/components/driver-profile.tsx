"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { DriverStanding, RaceResult } from "@/lib/api";

interface DriverProfileProps {
    driver: DriverStanding;
    history: RaceResult[];
}

export const DriverProfile = ({ driver, history }: DriverProfileProps) => {
    return (
        <div className="w-full max-w-7xl mx-auto px-4 md:px-6">
            {/* Navigation */}
            <div className="mb-8">
                <Link href="/driver-info" className="text-neutral-500 hover:text-white transition-colors text-sm font-mono flex items-center">
                    ← RETURN TO DATABASE
                </Link>
            </div>

            {/* Hero Section */}
            <div className="relative overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900/50 backdrop-blur-md p-6 md:p-12 mb-8">
                <div
                    className="absolute top-0 right-0 w-32 h-full opacity-10 -skew-x-12 translate-x-12"
                    style={{ backgroundColor: driver.team_colour }}
                />
                <div className="absolute top-4 right-8 text-[6rem] md:text-[12rem] font-black text-white/5 pointer-events-none select-none leading-none -tracking-widest">
                    {driver.driver_number}
                </div>

                <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center md:items-end">
                    {/* Headshot / Placeholder */}
                    <div className="w-32 h-32 md:w-48 md:h-48 rounded-full bg-neutral-800 border-4 border-neutral-900 overflow-hidden flex-shrink-0 relative">
                        {driver.headshot_url ? (
                            <img src={driver.headshot_url} alt={driver.driver_name} className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-neutral-700">
                                {driver.driver_name.charAt(0)}
                            </div>
                        )}
                        <div className="absolute bottom-0 right-0 w-8 h-8 rounded-full border-2 border-neutral-900" style={{ backgroundColor: driver.team_colour }} />
                    </div>

                    <div className="flex-1 text-center md:text-left">
                        <div className="text-bmb-accent-cyan font-mono text-sm tracking-widest mb-2 uppercase">
                            {driver.team_name}
                        </div>
                        <h1 className="text-3xl md:text-6xl font-bold text-white tracking-tight mb-2">
                            {driver.driver_name}
                        </h1>
                        <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                            <div className="bg-neutral-800 px-3 py-1 rounded text-sm text-neutral-300">
                                #{driver.driver_number}
                            </div>
                            <div className="bg-neutral-800 px-3 py-1 rounded text-sm text-neutral-300">
                                2025 SEASON
                            </div>
                        </div>
                    </div>

                    <div className="text-center md:text-right">
                        <div className="text-neutral-500 font-mono text-sm mb-1">CHAMPIONSHIP RANK</div>
                        <div className="text-5xl font-bold text-white">P{driver.position}</div>
                        <div className="text-bmb-accent-cyan text-xl font-bold mt-1">{driver.points} PTS</div>
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="p-6 rounded-xl border border-neutral-800 bg-neutral-900/30 text-center">
                    <div className="text-2xl font-bold text-white mb-1">{history.length}</div>
                    <div className="text-xs text-neutral-500 font-mono">RACES RECORDED</div>
                </div>
                <div className="p-6 rounded-xl border border-neutral-800 bg-neutral-900/30 text-center">
                    <div className="text-2xl font-bold text-white mb-1">{driver.wins}</div>
                    <div className="text-xs text-neutral-500 font-mono">WINS</div>
                </div>
                <div className="p-6 rounded-xl border border-neutral-800 bg-neutral-900/30 text-center">
                    <div className="text-2xl font-bold text-white mb-1">{driver.podiums}</div>
                    <div className="text-xs text-neutral-500 font-mono">PODIUMS</div>
                </div>
                <div className="p-6 rounded-xl border border-neutral-800 bg-neutral-900/30 text-center">
                    {/* Avg Finish */}
                    <div className="text-2xl font-bold text-white mb-1">
                        {history.length > 0 ? (history.reduce((a, b) => a + b.position, 0) / history.length).toFixed(1) : "-"}
                    </div>
                    <div className="text-xs text-neutral-500 font-mono">AVG FINISH</div>
                </div>
            </div>

            {/* Recent Races */}
            <div className="border border-neutral-800 rounded-xl bg-neutral-900/20 overflow-hidden">
                <div className="px-6 py-4 border-b border-neutral-800 flex justify-between items-center bg-neutral-900/50">
                    <h3 className="font-bold text-white">RECENT RACE HISTORY</h3>
                    <span className="text-xs text-neutral-500 font-mono">LAST {history.length} RACES</span>
                </div>
                <div className="divide-y divide-neutral-800">
                    {history.length > 0 ? history.map((race, i) => (
                        <div key={i} className="px-4 md:px-6 py-4 flex items-center justify-between hover:bg-white/5 transition-colors">
                            <div>
                                <div className="text-white font-medium">{race.location}</div>
                                <div className="text-xs text-neutral-500">{new Date(race.date).toLocaleDateString()}</div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className={`text-lg font-bold w-8 h-8 flex items-center justify-center rounded ${race.position <= 3 ? "bg-white text-black" : race.position <= 10 ? "bg-neutral-800 text-bmb-accent-cyan" : "text-neutral-500"}`}>
                                    {race.position}
                                </div>
                            </div>
                        </div>
                    )) : (
                        <div className="p-8 text-center text-neutral-500">
                            No recent race data available via OpenF1 public API for this driver/season context.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
