"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FullGridPredictionRequest, GridPosition, FullGridPredictionResponse } from "@/types/api";
import { fetchWithRetry } from "@/lib/api";

const API_BASE = "https://boxmachibox.onrender.com/api";

interface RaceSimulationFormProps {
    onResults: (data: FullGridPredictionResponse) => void;
    onError: (error: string) => void;
    setLoading: (loading: boolean) => void;
}

export const RaceSimulationForm = ({ onResults, onError, setLoading }: RaceSimulationFormProps) => {
    const [drivers, setDrivers] = useState<string[]>([]);
    const [circuits, setCircuits] = useState<string[]>([]);
    const [isLoadingData, setIsLoadingData] = useState(true);

    const [circuit, setCircuit] = useState<string>("");
    const [weather, setWeather] = useState<'Dry' | 'Wet' | 'Mixed'>("Dry");

    // Initialize grid with 20 positions
    const [grid, setGrid] = useState<GridPosition[]>(
        Array.from({ length: 20 }, (_, i) => ({ position: i + 1, driver: "" }))
    );

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch drivers and circuits
                const [dRes, cRes] = await Promise.all([
                    fetch(`${API_BASE}/drivers/enhanced`).catch(() => fetch(`${API_BASE}/drivers`)),
                    fetch(`${API_BASE}/circuits/enhanced`).catch(() => fetch(`${API_BASE}/circuits`))
                ]);

                const dData = await dRes.json();
                const cData = await cRes.json();

                // Handle both simple string array and object array formats
                const driverList = dData.drivers ?
                    (typeof dData.drivers[0] === 'string' ? dData.drivers : dData.drivers.map((d: any) => d.name))
                    : [];

                const circuitList = cData.circuits ?
                    (typeof cData.circuits[0] === 'string' ? cData.circuits : cData.circuits.map((c: any) => c.name))
                    : [];

                setDrivers(driverList);
                setCircuits(circuitList);
            } catch (err) {
                console.error("Failed to load initial data", err);
                onError("System Initialization Failed. API might be sleeping, please refresh in 30s.");
            } finally {
                setIsLoadingData(false);
            }
        };

        fetchData();
    }, [onError]);

    const handleDriverSelect = (index: number, driverName: string) => {
        const newGrid = [...grid];
        newGrid[index].driver = driverName;
        setGrid(newGrid);
    };

    const randomizeGrid = () => {
        if (drivers.length < 20) return;
        const shuffled = [...drivers].sort(() => 0.5 - Math.random()).slice(0, 20);
        const newGrid = grid.map((pos, idx) => ({ ...pos, driver: shuffled[idx] }));
        setGrid(newGrid);
    };

    const setStandardGrid = () => {
        // Attempt to set a standard 2024/2025 order if driver names match
        // Ideally this would be hardcoded or fetched, for now let's just use the driver list order 
        // assuming the API returns them roughly in standing order.
        if (drivers.length < 20) return;
        const newGrid = grid.map((pos, idx) => ({ ...pos, driver: drivers[idx] || "" }));
        setGrid(newGrid);
    };

    const reverseGrid = () => {
        if (drivers.length < 20) return;
        const reversed = [...drivers].reverse().slice(0, 20);
        const newGrid = grid.map((pos, idx) => ({ ...pos, driver: reversed[idx] }));
        setGrid(newGrid);
    }

    // Clear the grid
    const clearGrid = () => {
        setGrid(grid.map(p => ({ ...p, driver: "" })));
    };

    const handleSubmit = async () => {
        // 1. Validation
        if (!circuit) {
            onError("Please select a circuit.");
            return;
        }

        const filledDrivers = grid.map(g => g.driver).filter(Boolean);
        if (filledDrivers.length !== 20) {
            onError(`Please assign drivers to all 20 grid positions. (${filledDrivers.length}/20 filled)`);
            return;
        }

        const uniqueDrivers = new Set(filledDrivers);
        if (uniqueDrivers.size !== 20) {
            onError("Duplicate drivers detected. Each driver can only start in one position.");
            return;
        }

        setLoading(true);
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 60000); // 60s timeout

        console.log('=== RACE SIMULATION REQUEST ===');
        console.log('Circuit:', circuit);
        console.log('Weather:', weather);
        console.log('Grid:', grid);

        try {
            const request: FullGridPredictionRequest = {
                grid,
                circuit,
                weather
            };

            const res = await fetch(`${API_BASE}/predict/full-grid`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(request),
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            console.log('Response Status:', res.status);

            if (!res.ok) {
                const errData = await res.json().catch(() => ({}));
                console.error('Error Response:', errData);
                throw new Error(errData.detail || `Simulation Failed (${res.status})`);
            }

            const data: FullGridPredictionResponse = await res.json();
            console.log('=== RACE SIMULATION RESPONSE ===', data);
            onResults(data);
        } catch (err: any) {
            console.error('=== RACE SIMULATION ERROR ===', err);
            if (err.name === 'AbortError') {
                onError("System timed out (60s). The prediction engine might be sleeping or overloaded. Please try again.");
            } else if (err.message?.includes('Failed to fetch')) {
                onError("Connection failed. Please check your internet or try again later.");
            } else {
                onError(err instanceof Error ? err.message : "Simulation request failed.");
            }
        } finally {
            setLoading(false);
            clearTimeout(timeoutId);
        }
    };

    if (isLoadingData) {
        return <div className="text-center text-neutral-500 py-10">Initializing Race Systems...</div>;
    }

    // Helper to check if driver is already selected elsewhere
    const isDriverSelected = (driver: string, currentIndex: number) => {
        if (!driver) return false;
        return grid.some((g, idx) => idx !== currentIndex && g.driver === driver);
    };

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* CONFIG COLUMN */}
                <div className="lg:col-span-1 space-y-8 bg-neutral-900/20 p-6 rounded-xl border border-neutral-800 h-fit sticky top-24">
                    <div>
                        <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                            <span className="text-bmb-accent-cyan">01</span> RACE CONFIGURATION
                        </h3>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm text-neutral-400 font-medium">Select Circuit</label>
                                <div className="relative">
                                    <select
                                        className="w-full bg-neutral-900 border border-neutral-700 text-white rounded p-3 appearance-none focus:border-bmb-accent-cyan focus:outline-none transition-colors"
                                        value={circuit}
                                        onChange={(e) => setCircuit(e.target.value)}
                                    >
                                        <option value="">-- Select Track --</option>
                                        {circuits.map(c => (
                                            <option key={c} value={c}>{c}</option>
                                        ))}
                                    </select>
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-500">▼</div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm text-neutral-400 font-medium">Track Conditions</label>
                                <div className="grid grid-cols-3 gap-2">
                                    {['Dry', 'Mixed', 'Wet'].map((cond) => (
                                        <button
                                            key={cond}
                                            onClick={() => setWeather(cond as any)}
                                            className={`py-2 text-sm border rounded transition-colors ${weather === cond
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
                    </div>

                    <div className="border-t border-neutral-800 pt-6">
                        <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                            <span className="text-bmb-accent-cyan">02</span> QUICK SETUP
                        </h3>
                        <div className="flex flex-col gap-2">
                            <button
                                onClick={setStandardGrid}
                                className="w-full py-2 px-4 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-sm rounded border border-neutral-700 transition-colors"
                            >
                                Use Championship Order
                            </button>
                            <button
                                onClick={randomizeGrid}
                                className="w-full py-2 px-4 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-sm rounded border border-neutral-700 transition-colors"
                            >
                                Randomize Grid
                            </button>
                            <button
                                onClick={reverseGrid}
                                className="w-full py-2 px-4 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-sm rounded border border-neutral-700 transition-colors"
                            >
                                Reverse Championship
                            </button>
                            <button
                                onClick={clearGrid}
                                className="w-full py-2 px-4 bg-red-900/20 hover:bg-red-900/40 text-red-400 text-sm rounded border border-red-900/30 transition-colors mt-2"
                            >
                                Clear Grid
                            </button>
                        </div>
                    </div>
                </div>

                {/* GRID BUILDER */}
                <div className="lg:col-span-2">
                    <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                        <span className="text-bmb-accent-cyan">03</span> STARTING GRID
                    </h3>

                    <div className="space-y-2">
                        {grid.map((pos, index) => (
                            <motion.div
                                key={pos.position}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.02 }}
                                className="flex items-center gap-3 bg-neutral-900/40 border border-neutral-800 p-2 rounded hover:border-neutral-700 transition-colors"
                            >
                                <div className="w-10 h-10 flex items-center justify-center bg-neutral-800 rounded font-mono font-bold text-neutral-400">
                                    P{pos.position}
                                </div>
                                <div className="flex-1">
                                    <select
                                        className={`w-full bg-transparent border-none text-sm focus:ring-0 ${isDriverSelected(pos.driver, index) ? 'text-red-400' : 'text-white'}`}
                                        value={pos.driver}
                                        onChange={(e) => handleDriverSelect(index, e.target.value)}
                                        style={{ colorScheme: 'dark' }}
                                    >
                                        <option value="" className="bg-neutral-900">-- Assign Driver --</option>
                                        {drivers.map(d => (
                                            <option
                                                key={d}
                                                value={d}
                                                disabled={isDriverSelected(d, index)}
                                                className="bg-neutral-900" // Fix for dark mode OS
                                            >
                                                {d} {isDriverSelected(d, index) ? '(Selected)' : ''}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="w-8 flex items-center justify-center text-neutral-600">
                                    ⋮⋮
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="mt-8">
                        <button
                            onClick={handleSubmit}
                            disabled={!circuit || grid.some(g => !g.driver)}
                            className="w-full h-16 bg-bmb-accent-red hover:bg-red-600 disabled:bg-neutral-800 disabled:text-neutral-500 text-white text-lg font-bold tracking-wide rounded transition-all flex items-center justify-center gap-2 group shadow-lg uppercase"
                        >
                            <span className="text-2xl">🏁</span> Simulate Race Results
                        </button>
                        {grid.some(g => !g.driver) && (
                            <p className="text-center text-neutral-500 text-sm mt-3">
                                Please assign all 20 driver positions to simulate.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
