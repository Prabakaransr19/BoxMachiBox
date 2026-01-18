"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { DriverStanding, ConstructorStanding } from "@/lib/api";

type StandingData = DriverStanding | ConstructorStanding;

interface StandingsTableProps {
    data: StandingData[];
    type: "driver" | "team";
}

const TableRow = ({ item, index, type }: { item: StandingData; index: number; type: "driver" | "team" }) => {
    const isDriver = type === "driver";
    const driverItem = item as DriverStanding;
    const teamItem = item as ConstructorStanding;

    // Highlight top 3
    let posClass = "text-neutral-400";
    let rowBg = "border-neutral-800 bg-neutral-900/20";
    if (item.position === 1) {
        posClass = "text-yellow-400 font-bold";
        rowBg = "border-yellow-500/20 bg-yellow-500/5";
    } else if (item.position === 2) {
        posClass = "text-slate-300 font-bold";
        rowBg = "border-slate-500/20 bg-slate-500/5";
    } else if (item.position === 3) {
        posClass = "text-amber-600 font-bold";
        rowBg = "border-amber-600/20 bg-amber-600/5";
    }

    return (
        <motion.tr
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className={`border-b border-l-2 last:border-b-0 hover:bg-white/5 transition-colors ${rowBg} ${index < 3 ? "border-l-current" : "border-l-transparent"}`}
            style={{ borderLeftColor: index < 3 ? undefined : "transparent" }}
        >
            <td className={`px-4 py-4 text-center ${posClass}`}>
                {item.position}
            </td>
            <td className="px-4 py-4">
                {isDriver ? (
                    <Link href={`/driver-info/${driverItem.driver_number}`} className="flex items-center gap-3 group">
                        <div className="w-1 h-8 rounded-full" style={{ backgroundColor: driverItem.team_colour }} />
                        <div>
                            <div className="font-bold text-white group-hover:text-bmb-accent-cyan transition-colors">{driverItem.driver_name}</div>
                            <div className="text-xs text-neutral-400 md:hidden">{driverItem.team_name}</div>
                        </div>
                    </Link>
                ) : (
                    <div className="flex items-center gap-3">
                        <div className="w-1 h-8 rounded-full" style={{ backgroundColor: teamItem.team_colour }} />
                        <div className="font-bold text-white">{teamItem.team_name}</div>
                    </div>
                )}
            </td>
            {isDriver && (
                <td className="px-4 py-4 hidden md:table-cell text-neutral-300">
                    {driverItem.team_name}
                </td>
            )}
            <td className="px-4 py-4 text-center font-mono font-bold text-bmb-accent-cyan text-lg">
                {item.points}
            </td>
            <td className="px-4 py-4 text-center hidden sm:table-cell text-neutral-400">
                {item.wins}
            </td>
            <td className="px-4 py-4 text-center hidden sm:table-cell text-neutral-400">
                {item.podiums}
            </td>
        </motion.tr>
    );
};

const MobileCard = ({ item, index, type }: { item: StandingData; index: number; type: "driver" | "team" }) => {
    const isDriver = type === "driver";
    const driverItem = item as DriverStanding;
    const teamItem = item as ConstructorStanding;

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="flex items-center justify-between p-4 bg-neutral-900/40 border border-neutral-800 rounded-lg mb-3"
        >
            <div className="flex items-center gap-4">
                <div className={`text-xl font-bold font-mono w-8 text-center ${index < 3 ? "text-bmb-accent-cyan" : "text-neutral-500"}`}>
                    {item.position}
                </div>
                <div className="h-10 w-1 rounded-full" style={{ backgroundColor: isDriver ? driverItem.team_colour : teamItem.team_colour }} />
                <div>
                    {isDriver ? (
                        <Link href={`/driver-info/${driverItem.driver_number}`}>
                            <div className="font-bold text-white text-lg">{driverItem.driver_name}</div>
                            <div className="text-xs text-neutral-400 uppercase tracking-wider">{driverItem.team_name}</div>
                        </Link>
                    ) : (
                        <div className="font-bold text-white text-lg">{teamItem.team_name}</div>
                    )}
                </div>
            </div>
            <div className="flex flex-col items-end">
                <div className="text-2xl font-bold font-mono text-white">{item.points} <span className="text-xs text-neutral-500 font-sans font-normal">PTS</span></div>
                {item.wins > 0 && (
                    <div className="text-xs text-yellow-500 flex items-center gap-1">
                        <span>🏆</span> {item.wins}
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export const StandingsTable = ({ data, type }: StandingsTableProps) => {
    if (!data || data.length === 0) {
        return <div className="p-8 text-center text-neutral-500">No data available.</div>;
    }

    return (
        <div className="w-full">
            {/* Mobile View */}
            <div className="md:hidden">
                {data.map((item, i) => (
                    <MobileCard key={i} item={item} index={i} type={type} />
                ))}
            </div>

            {/* Desktop View */}
            <div className="hidden md:block w-full overflow-hidden rounded-lg border border-neutral-800 bg-neutral-900/50 backdrop-blur-sm">
                <table className="w-full border-collapse text-left text-sm">
                    <thead className="bg-neutral-950/50 text-neutral-500 uppercase tracking-widest text-xs font-mono">
                        <tr className="border-b border-neutral-800">
                            <th className="px-4 py-3 text-center w-16">Pos</th>
                            <th className="px-4 py-3">{type === "driver" ? "Driver" : "Team"}</th>
                            {type === "driver" && <th className="px-4 py-3 hidden md:table-cell">Team</th>}
                            <th className="px-4 py-3 text-center">Pts</th>
                            <th className="px-4 py-3 text-center hidden sm:table-cell">Wins</th>
                            <th className="px-4 py-3 text-center hidden sm:table-cell">Podiums</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-800">
                        {data.map((item, i) => (
                            <TableRow key={i} item={item} index={i} type={type} />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
