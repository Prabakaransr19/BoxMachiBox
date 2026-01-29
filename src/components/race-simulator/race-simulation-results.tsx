"use client";

import { motion } from "framer-motion";
import { FullGridPredictionResponse, DriverResult } from "@/types/api";
import { TEAM_COLOR_MAP, fetchStandingsData } from "@/lib/api";
import { useEffect, useState } from "react";

interface RaceSimulationResultsProps {
    results: FullGridPredictionResponse;
    onReset: () => void;
}

export const RaceSimulationResults = ({ results, onReset }: RaceSimulationResultsProps) => {
    const [driverTeams, setDriverTeams] = useState<Record<string, string>>({});

    useEffect(() => {
        const loadTeamData = async () => {
            // We need to map driver names to teams to get colors
            // We can use fetchStandingsData() from lib which returns { drivers: DriverStanding[] }
            try {
                const data = await fetchStandingsData();
                const map: Record<string, string> = {};
                data.drivers.forEach(d => {
                    map[d.driver_name] = d.team_name;
                });
                setDriverTeams(map);
            } catch (e) {
                console.error("Failed to load team data for colors", e);
            }
        };
        loadTeamData();
    }, []);

    const getTeamColor = (driverName: string) => {
        const team = driverTeams[driverName];
        if (team && TEAM_COLOR_MAP[team]) return TEAM_COLOR_MAP[team];
        // Fallback or fuzzy match
        return "#fff";
    };

    const podium = [
        results.predicted_results.find(r => r.position === 2),
        results.predicted_results.find(r => r.position === 1),
        results.predicted_results.find(r => r.position === 3),
    ].filter(Boolean) as DriverResult[];

    return (
        <div className="space-y-12 animate-in fade-in duration-700">
            {/* HEADER */}
            <div className="text-center space-y-4">
                <div className="inline-block px-4 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-xs text-neutral-400 font-mono mb-2">
                    SIMULATION COMPLETE // CONFIDENCE: {results.predicted_results[0].confidence.toUpperCase()}
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-white">
                    <span className="text-bmb-accent-cyan">{results.metadata.circuit}</span> GRAND PRIX
                </h2>
                <div className="flex items-center justify-center gap-4 text-sm text-neutral-500">
                    <span>{results.metadata.weather} Conditions</span>
                    <span>•</span>
                    <span>20 Drivers Analyzed</span>
                </div>
            </div>

            {/* PODIUM */}
            <div className="relative h-64 md:h-80 w-full max-w-3xl mx-auto flex items-end justify-center gap-2 md:gap-4 mb-12">
                {podium.map((driver, idx) => {
                    const isP1 = driver.position === 1;
                    const height = isP1 ? 'h-full' : driver.position === 2 ? 'h-4/5' : 'h-2/3';
                    const color = getTeamColor(driver.driver);

                    return (
                        <motion.div
                            key={driver.driver}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: isP1 ? '100%' : driver.position === 2 ? '80%' : '60%', opacity: 1 }}
                            transition={{ delay: 0.2 + idx * 0.1, duration: 0.8, type: "spring" }}
                            className={`w-1/3 max-w-[180px] bg-neutral-800/80 backdrop-blur-md rounded-t-lg border-t-4 relative flex flex-col justify-end pb-4 items-center text-center shadow-2xl`}
                            style={{ borderColor: color }}
                        >
                            <div className="text-5xl mb-2">
                                {driver.position === 1 ? '🥇' : driver.position === 2 ? '🥈' : '🥉'}
                            </div>
                            <div className="font-bold text-white text-lg md:text-xl leading-tight px-2">
                                {driver.driver.split(' ').pop()}
                            </div>
                            <div className="text-xs text-neutral-400 mt-1">
                                P{driver.starting_grid} <span className="text-neutral-600">→</span> P{driver.position}
                            </div>
                            <div className="mt-2 text-xs font-mono px-2 py-0.5 rounded bg-neutral-900 text-bmb-accent-cyan">
                                {(driver.podium_probability * 100).toFixed(0)}% PROB
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* INSIGHTS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-neutral-900/40 p-5 rounded-lg border border-neutral-800">
                    <h4 className="text-xs text-neutral-400 uppercase tracking-widest mb-3">Fastest Lap</h4>
                    <div className="flex items-center gap-3">
                        <span className="text-2xl">⚡</span>
                        <div>
                            <div className="text-white font-bold">{results.fastest_lap_prediction}</div>
                            <div className="text-xs text-neutral-500">Predicted pace setter</div>
                        </div>
                    </div>
                </div>

                <div className="bg-neutral-900/40 p-5 rounded-lg border border-neutral-800">
                    <h4 className="text-xs text-neutral-400 uppercase tracking-widest mb-3">DNF Risk</h4>
                    <div className="flex flex-col gap-2">
                        {results.dnf_predictions.length > 0 ? results.dnf_predictions.slice(0, 2).map(d => (
                            <div key={d} className="flex items-center gap-2 text-sm text-red-300">
                                <span>⚠️</span> {d}
                            </div>
                        )) : <div className="text-sm text-green-400">Clean Race Predicted</div>}
                    </div>
                </div>

                <div className="bg-neutral-900/40 p-5 rounded-lg border border-neutral-800">
                    <h4 className="text-xs text-neutral-400 uppercase tracking-widest mb-3">Biggest Mover</h4>
                    {(() => {
                        const mover = [...results.predicted_results].sort((a, b) => (b.starting_grid - b.position) - (a.starting_grid - a.position))[0];
                        const gain = mover.starting_grid - mover.position;
                        return (
                            <div className="flex items-center gap-3">
                                <span className="text-2xl">📈</span>
                                <div>
                                    <div className="text-white font-bold">{mover.driver}</div>
                                    <div className="text-xs text-green-400">+{gain} positions</div>
                                </div>
                            </div>
                        );
                    })()}
                </div>

                <div className="bg-neutral-900/40 p-5 rounded-lg border border-neutral-800">
                    <h4 className="text-xs text-neutral-400 uppercase tracking-widest mb-3">Points Finishers</h4>
                    <div className="text-3xl font-bold text-white">10 <span className="text-lg text-neutral-500 font-normal">Drivers</span></div>
                    <div className="text-xs text-neutral-500 mt-1">Scoring points today</div>
                </div>
            </div>

            {/* FULL RESULTS TABLE */}
            <div className="overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900/20 backdrop-blur-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-neutral-900/80 border-b border-neutral-800 text-xs text-neutral-400 uppercase tracking-wider">
                                <th className="p-4">Pos</th>
                                <th className="p-4">Driver</th>
                                <th className="p-4 text-center">Start</th>
                                <th className="p-4 text-center">Gain/Loss</th>
                                <th className="p-4 text-right">Points</th>
                                <th className="p-4 text-right">Probability</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-800">
                            {results.predicted_results.map((row) => {
                                const gain = row.starting_grid - row.position;
                                const isPodium = row.position <= 3;
                                const isPoints = row.position <= 10;
                                const color = getTeamColor(row.driver);

                                return (
                                    <tr key={row.driver} className={`hover:bg-neutral-800/30 transition-colors ${isPodium ? 'bg-gradient-to-r from-yellow-500/5 to-transparent' : ''}`}>
                                        <td className="p-4 font-mono font-bold text-white">
                                            {row.position}
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-1 h-8 rounded-full" style={{ backgroundColor: color }} />
                                                <span className={`${isPodium ? 'font-bold text-white' : 'text-neutral-300'}`}>
                                                    {row.driver}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="p-4 text-center text-neutral-500 font-mono">
                                            P{row.starting_grid}
                                        </td>
                                        <td className="p-4 text-center">
                                            {gain > 0 ? (
                                                <span className="text-green-500 flex items-center justify-center gap-1">
                                                    ▲ {gain}
                                                </span>
                                            ) : gain < 0 ? (
                                                <span className="text-red-500 flex items-center justify-center gap-1">
                                                    ▼ {Math.abs(gain)}
                                                </span>
                                            ) : (
                                                <span className="text-neutral-600">-</span>
                                            )}
                                        </td>
                                        <td className="p-4 text-right font-bold text-white">
                                            {row.position <= 10 ? (
                                                <span className="px-2 py-1 bg-neutral-800 rounded text-bmb-accent-cyan">
                                                    +{row.expected_points}
                                                </span>
                                            ) : (
                                                <span className="text-neutral-600">0</span>
                                            )}
                                        </td>
                                        <td className="p-4 text-right text-xs text-neutral-500">
                                            {(row.podium_probability * 100).toFixed(0)}%
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="flex justify-center pt-8 pb-20">
                <button
                    onClick={onReset}
                    className="px-8 py-3 bg-neutral-800 hover:bg-neutral-700 text-white rounded-full font-medium transition-colors border border-neutral-700"
                >
                    Run Another Simulation
                </button>
            </div>
        </div>
    );
};
