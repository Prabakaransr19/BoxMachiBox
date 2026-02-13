import { StandingsView } from "@/components/standings-view";
import { fetchStandingsData } from "@/lib/api";

export default async function StandingsPage() {
    const { drivers, teams } = await fetchStandingsData();
    
    return (
        <main className="min-h-screen bg-bmb-bg flex flex-col pt-24 pb-10">
            <div className="text-center mb-10 px-4">
                <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-neutral-400 mb-4 tracking-tighter">
                    CHAMPIONSHIP STANDINGS
                </h1>
                <p className="text-neutral-500 text-lg max-w-2xl mx-auto">
                    Live championship points for the 2025 Formula 1 season.
                </p>
            </div>
            
            {drivers.length === 0 && teams.length === 0 ? (
                <div className="text-center text-neutral-500 py-10">
                    <p>No standings data available at the moment.</p>
                </div>
            ) : (
                <StandingsView drivers={drivers} teams={teams} />
            )}
            
            <footer className="w-full py-8 text-center text-neutral-700 text-sm mt-auto">
                <p>&copy; {new Date().getFullYear()} Box Machi Box. Data via OpenF1.</p>
            </footer>
        </main>
    );
}
