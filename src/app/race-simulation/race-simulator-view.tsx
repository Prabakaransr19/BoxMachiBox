"use client";

import { useState } from "react";
import { FullGridPredictionResponse } from "@/types/api";
import { RaceSimulationForm } from "@/components/race-simulator/race-simulation-form";
import { RaceSimulationResults } from "@/components/race-simulator/race-simulation-results";
import { RaceConsoleLoading } from "@/components/race-console-loading";
import { motion } from "framer-motion";

export default function RaceSimulationPage() {
    const [results, setResults] = useState<FullGridPredictionResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleReset = () => {
        setResults(null);
        setError(null);
        setLoading(false);
    };

    return (
        <main className="min-h-screen bg-bmb-bg text-white p-6 md:p-12 flex flex-col items-center">
            {/* Background Decor */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[10%] left-[20%] w-[500px] h-[500px] bg-bmb-accent-cyan/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-[10%] right-[20%] w-[600px] h-[600px] bg-bmb-accent-red/5 rounded-full blur-[140px]" />
            </div>

            <header className="max-w-7xl w-full mb-12 flex flex-col md:flex-row items-start md:items-center justify-between border-b border-neutral-800 pb-6 relative z-10">
                <div>
                    <h1 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-neutral-400">
                        RACE SIMULATION
                    </h1>
                    <p className="text-neutral-500 mt-2">Full grid prediction engine • Multi-driver analysis</p>
                </div>

                <div className="flex items-center gap-2 mt-4 md:mt-0 text-xs font-mono text-bmb-accent-cyan">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-bmb-accent-cyan opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-bmb-accent-cyan"></span>
                    </span>
                    GRID SYSTEMS ACTIVE
                </div>
            </header>

            <section className="w-full max-w-7xl relative z-10">
                {error && (
                    <div className="mb-8 p-4 bg-red-900/20 border border-red-900/50 text-red-200 rounded flex justify-between items-center">
                        <span>{error}</span>
                        <button onClick={() => setError(null)} className="text-red-400 hover:text-white">✕</button>
                    </div>
                )}

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20 bg-neutral-900/20 rounded-xl border border-neutral-800 backdrop-blur-sm">
                        <RaceConsoleLoading />
                    </div>
                ) : results ? (
                    <RaceSimulationResults results={results} onReset={handleReset} />
                ) : (
                    <RaceSimulationForm
                        onResults={setResults}
                        onError={setError}
                        setLoading={setLoading}
                    />
                )}
            </section>
        </main>
    );
}
