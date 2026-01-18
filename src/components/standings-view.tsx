"use client";

import { useState } from "react";
import { StandingsTable } from "./standings-table";
import { DriverStanding, ConstructorStanding } from "@/lib/api";

type Tab = "drivers" | "teams";

interface StandingsViewProps {
    drivers: DriverStanding[];
    teams: ConstructorStanding[];
}

export const StandingsView = ({ drivers, teams }: StandingsViewProps) => {
    const [activeTab, setActiveTab] = useState<Tab>("drivers");


    return (
        <div className="w-full max-w-5xl mx-auto px-4 pb-20">
            {/* Tabs */}
            <div className="flex justify-center mb-6 md:mb-10">
                <div className="flex w-full md:w-auto p-1 bg-neutral-900 rounded-lg border border-neutral-800">
                    <button
                        onClick={() => setActiveTab("drivers")}
                        className={`flex-1 md:flex-none px-4 md:px-8 py-3 md:py-2 rounded-md font-medium text-sm transition-all duration-300 ${activeTab === "drivers"
                            ? "bg-bmb-accent-cyan text-black shadow-lg shadow-bmb-accent-cyan/20"
                            : "text-neutral-400 hover:text-white"
                            }`}
                    >
                        DRIVERS
                    </button>
                    <button
                        onClick={() => setActiveTab("teams")}
                        className={`flex-1 md:flex-none px-4 md:px-8 py-3 md:py-2 rounded-md font-medium text-sm transition-all duration-300 ${activeTab === "teams"
                            ? "bg-bmb-accent-cyan text-black shadow-lg shadow-bmb-accent-cyan/20"
                            : "text-neutral-400 hover:text-white"
                            }`}
                    >
                        TEAMS
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="min-h-[500px]">
                {activeTab === "drivers" ? (
                    <StandingsTable data={drivers} type="driver" />
                ) : (
                    <StandingsTable data={teams} type="team" />
                )}
            </div>

            <div className="text-center mt-10 text-neutral-600 text-xs font-mono">
                DATA SOURCE: OPENF1 API // UPDATED: LIVE
            </div>
        </div>
    );
};
