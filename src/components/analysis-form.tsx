"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { PredictionRequest, PredictionResponse } from "@/types/api";

const API_BASE = "https://boxmachibox.onrender.com/api";

export const AnalysisForm = () => {
    // Data State
    const [drivers, setDrivers] = useState<string[]>([]);
    const [circuits, setCircuits] = useState<string[]>([]);
    const [isLoadingData, setIsLoadingData] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [result, setResult] = useState<PredictionResponse | null>(null);
    const [error, setError] = useState<string | null>(null);

    // Form State
    const [formData, setFormData] = useState<PredictionRequest>({
        driver: "",
        circuit: "",
        grid_position: 1,
        recent_form: "Average",
        weather: "Dry",
    });

    // Initial Fetch
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Helper for fallback logic
                const fetchWithFallback = async (endpoint: string, type: 'drivers' | 'circuits') => {
                    try {
                        const res = await fetch(`${API_BASE}/${endpoint}/enhanced`);
                        if (!res.ok) throw new Error("Enhanced endpoint failed");
                        const data = await res.json();

                        // Transform object data to strings if needed
                        if (type === 'drivers' && data.drivers && data.drivers.length > 0 && typeof data.drivers[0] === 'object') {
                            return { drivers: data.drivers.map((d: any) => d.name) };
                        }
                        if (type === 'circuits' && data.circuits && data.circuits.length > 0 && typeof data.circuits[0] === 'object') {
                            return { circuits: data.circuits.map((c: any) => c.name) };
                        }
                        return data;
                    } catch (err) {
                        // Fallback to basic
                        const res = await fetch(`${API_BASE}/${endpoint}`);
                        if (!res.ok) throw new Error(`Basic ${endpoint} endpoint failed`);
                        return await res.json();
                    }
                };

                // Parallel fetch with individual fallbacks
                const [dData, cData] = await Promise.all([
                    fetchWithFallback("drivers", "drivers"),
                    fetchWithFallback("circuits", "circuits")
                ]);

                // API returns { count: number, drivers: string[] }
                setDrivers(dData.drivers || []);
                setCircuits(cData.circuits || []);
            } catch (err) {
                console.error(err);
                setError("System Initialization Failed. API might be sleeping, please refresh in 30s.");
            } finally {
                setIsLoadingData(false);
            }
        };

        fetchData();
    }, []);

    const handleChange = (field: keyof PredictionRequest, value: string | number) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setResult(null);
        setIsSubmitting(true);

        // Validation
        if (!formData.driver || !formData.circuit) {
            setError("Please select both a driver and a circuit.");
            setIsSubmitting(false);
            return;
        }

        try {
            const res = await fetch(`${API_BASE}/predict`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!res.ok) {
                const errData = await res.json().catch(() => ({}));
                throw new Error(errData.detail || "Prediction Engine Failed");
            }

            const data: PredictionResponse = await res.json();
            setResult(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Prediction request failed.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoadingData) {
        return (
            <div className="flex flex-col items-center justify-center p-12 border border-neutral-800 rounded-xl bg-bmb-card/50 backdrop-blur-md">
                <div className="w-12 h-12 border-4 border-neutral-800 border-t-bmb-accent-cyan rounded-full animate-spin mb-4" />
                <p className="text-neutral-400 animate-pulse">Establishing uplink to telemetry server...</p>
                <p className="text-xs text-neutral-600 mt-2">(Cold start may take up to 30s)</p>
            </div>
        );
    }

    if (result) {
        return (
            <div className="space-y-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-8 border border-bmb-accent-cyan/30 bg-bmb-card/80 rounded-xl shadow-[0_0_30px_rgba(42,157,143,0.1)]"
                >
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8 pb-6 border-b border-neutral-800">
                        <div>
                            <h3 className="text-neutral-400 text-sm uppercase tracking-widest mb-1">Estimated Outcome</h3>
                            <div className="text-5xl font-bold text-white">
                                {result.predicted_position}
                            </div>
                        </div>
                        <div className="text-right">
                            <h3 className="text-neutral-400 text-sm uppercase tracking-widest mb-1">Podium Probability</h3>
                            <div className="text-4xl font-mono text-bmb-accent-cyan">
                                {(result.podium_probability * 100).toFixed(1)}%
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h4 className="font-medium text-white mb-4 flex items-center gap-2">
                                <span className={`w-2 h-2 rounded-full ${result.confidence === 'High' ? 'bg-green-500' : result.confidence === 'Medium' ? 'bg-yellow-500' : 'bg-red-500'}`} />
                                Confidence Model: {result.confidence}
                            </h4>
                            <p className="text-sm text-neutral-400">
                                Based on historical data, weather conditions, and current grid position analysis.
                            </p>
                        </div>

                        <div className="space-y-3">
                            <h4 className="font-medium text-white">Top Factors</h4>
                            {result.contributing_factors?.map((factor, idx) => (
                                <div key={idx} className="flex items-center justify-between text-sm p-3 bg-neutral-900/50 rounded border border-neutral-800">
                                    <span className="text-neutral-300">{factor.factor}</span>
                                    <span className="font-mono text-bmb-accent-cyan">{factor.impact}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <button
                        onClick={() => setResult(null)}
                        className="mt-8 w-full py-3 bg-neutral-800 hover:bg-neutral-700 text-white rounded font-medium transition-colors border border-neutral-700"
                    >
                        Run New Simulation
                    </button>
                </motion.div>
            </div>
        );
    }

    return (
        <motion.form
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onSubmit={handleSubmit}
            className="p-6 md:p-8 border border-neutral-800 bg-bmb-card/50 backdrop-blur-md rounded-xl space-y-8"
        >
            {error && (
                <div className="p-4 bg-red-900/20 border border-red-900/50 text-red-200 rounded text-sm mb-6">
                    {error}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm text-neutral-400 font-medium">Select Driver</label>
                    <div className="relative">
                        <select
                            className="w-full bg-neutral-900 border border-neutral-700 text-white rounded p-3 appearance-none focus:border-bmb-accent-cyan focus:outline-none transition-colors"
                            value={formData.driver}
                            onChange={(e) => handleChange("driver", e.target.value)}
                        >
                            <option value="">-- Select Pilot --</option>
                            {drivers.map(d => (
                                <option key={d} value={d}>{d}</option>
                            ))}
                        </select>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-500">▼</div>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm text-neutral-400 font-medium">Select Circuit</label>
                    <div className="relative">
                        <select
                            className="w-full bg-neutral-900 border border-neutral-700 text-white rounded p-3 appearance-none focus:border-bmb-accent-cyan focus:outline-none transition-colors"
                            value={formData.circuit}
                            onChange={(e) => handleChange("circuit", e.target.value)}
                        >
                            <option value="">-- Select Track --</option>
                            {circuits.map(c => (
                                <option key={c} value={c}>{c}</option>
                            ))}
                        </select>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-500">▼</div>
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <label className="text-sm text-neutral-400 font-medium">Grid Position</label>
                    <span className="text-2xl font-bold font-mono text-bmb-accent-cyan">P{formData.grid_position}</span>
                </div>
                <input
                    type="range"
                    min="1"
                    max="20"
                    className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-bmb-accent-cyan"
                    value={formData.grid_position}
                    onChange={(e) => handleChange("grid_position", parseInt(e.target.value))}
                />
                <div className="flex justify-between text-xs text-neutral-600 font-mono">
                    <span>POLE</span>
                    <span>BACK ROW</span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                    <label className="text-sm text-neutral-400 font-medium block">Recent Form</label>
                    <div className="grid grid-cols-2 gap-3">
                        {['Excellent', 'Good', 'Average', 'Poor'].map((level) => (
                            <button
                                key={level}
                                type="button"
                                onClick={() => handleChange("recent_form", level)}
                                className={`h-12 text-sm border rounded transition-colors ${formData.recent_form === level
                                    ? 'bg-bmb-accent-cyan/20 border-bmb-accent-cyan text-white'
                                    : 'border-neutral-800 text-neutral-500 hover:border-neutral-600'
                                    }`}
                            >
                                {level}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="space-y-3">
                    <label className="text-sm text-neutral-400 font-medium block">Track Conditions</label>
                    <div className="grid grid-cols-3 gap-3">
                        {['Dry', 'Mixed', 'Wet'].map((cond) => (
                            <button
                                key={cond}
                                type="button"
                                onClick={() => handleChange("weather", cond)}
                                className={`h-12 text-sm border rounded transition-colors ${formData.weather === cond
                                    ? 'bg-blue-500/20 border-blue-500 text-white'
                                    : 'border-neutral-800 text-neutral-500 hover:border-neutral-600'
                                    }`}
                            >
                                {cond}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="pt-6 sticky bottom-0 z-20 bg-gradient-to-t from-bmb-bg via-bmb-bg to-transparent pb-4 -mx-6 px-6 md:static md:bg-none md:p-0 md:mx-0">
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-14 bg-bmb-accent-red hover:bg-red-600 disabled:bg-neutral-800 text-white font-bold tracking-wide rounded transition-all flex items-center justify-center gap-2 group shadow-lg"
                >
                    {isSubmitting ? (
                        <>
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            PROCESSING...
                        </>
                    ) : (
                        <>
                            INITIATE PREDICTION
                            <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </>
                    )}
                </button>
            </div>
        </motion.form >
    );
};
