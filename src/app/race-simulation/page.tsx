import type { Metadata } from "next";
import RaceSimulationView from "./race-simulator-view";

export const metadata: Metadata = {
    title: "Race Simulation | Box Machi Box",
    description: "Predict complete F1 race results with full grid simulation.",
};

export default function Page() {
    return <RaceSimulationView />;
}
