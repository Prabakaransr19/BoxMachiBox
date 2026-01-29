import { AnalysisForm } from "@/components/analysis-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Driver Analysis | Box Machi Box",
    description: "Analyze F1 driver performance and predict race outcomes.",
};

export default function AnalyzePage() {
    return (
        <main className="min-h-screen bg-bmb-bg text-white p-6 md:p-12 flex flex-col items-center">
            <header className="max-w-4xl w-full mb-12 flex flex-col md:flex-row items-start md:items-center justify-between border-b border-neutral-800 pb-6">
                <div>
                    <h1 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-neutral-400">
                        RACE CONSOLE
                    </h1>
                    <p className="text-neutral-500 mt-2">Initialize prediction algorithms...</p>
                </div>

                <div className="flex items-center gap-2 mt-4 md:mt-0 text-xs font-mono text-bmb-accent-cyan">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-bmb-accent-cyan opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-bmb-accent-cyan"></span>
                    </span>
                    SYSTEM ONLINE
                </div>
            </header>

            <section className="w-full max-w-4xl relative z-10">
                <AnalysisForm />
            </section>

            {/* Background Decor */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[20%] left-[10%] w-[400px] h-[400px] bg-bmb-accent-cyan/5 rounded-full blur-[100px]" />
                <div className="absolute bottom-[20%] right-[10%] w-[300px] h-[300px] bg-bmb-accent-red/5 rounded-full blur-[120px]" />
            </div>
        </main>
    );
}
