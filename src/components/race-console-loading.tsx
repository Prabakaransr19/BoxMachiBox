'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const LoadingStages = {
    WAKING: { message: '🏎️ Starting prediction engine...', progress: 25 },
    LOADING: { message: '📊 Loading 2025 driver data...', progress: 50 },
    INITIALIZING: { message: '⚡ Initializing ML model...', progress: 75 },
    READY: { message: '✅ Ready to predict!', progress: 100 }
};

export function RaceConsoleLoading() {
    const [stage, setStage] = useState<keyof typeof LoadingStages>('WAKING');
    const [tip, setTip] = useState('');

    const tips = [
        '💡 Grid position has 16% importance in predictions',
        '💡 Constructor form contributes 7.9% to accuracy',
        '💡 Our model achieves 93.89% accuracy on 2025 data',
        '💡 First prediction takes longer. Subsequent ones are instant!',
        '💡 The model analyzes 47 different features per driver'
    ];

    useEffect(() => {
        setTip(tips[0]); // Initial tip

        // Rotate tips every 3 seconds
        const tipInterval = setInterval(() => {
            setTip(tips[Math.floor(Math.random() * tips.length)]);
        }, 3000);

        // Progress through stages
        const stages: (keyof typeof LoadingStages)[] = ['WAKING', 'LOADING', 'INITIALIZING'];
        let currentStageIndex = 0;

        const stageInterval = setInterval(() => {
            if (currentStageIndex < stages.length - 1) {
                currentStageIndex++;
                setStage(stages[currentStageIndex]);
            }
        }, 10000); // 10s per stage

        return () => {
            clearInterval(tipInterval);
            clearInterval(stageInterval);
        };
    }, []);

    return (
        <div className="flex flex-col items-center gap-6 p-8">
            {/* Spinning Wheel */}
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                className="w-20 h-20"
            >
                <svg viewBox="0 0 100 100" className="w-full h-full">
                    {/* Tire */}
                    <circle cx="50" cy="50" r="45" stroke="#1f2937" strokeWidth="8" fill="transparent" />
                    {/* Rim */}
                    <circle cx="50" cy="50" r="30" stroke="#374151" strokeWidth="2" fill="transparent" />
                    {/* Spokes */}
                    <path d="M50 10 L50 90 M10 50 L90 50 M22 22 L78 78 M78 22 L22 78" stroke="#10b981" strokeWidth="3" strokeLinecap="round" />
                    {/* Center Nut */}
                    <circle cx="50" cy="50" r="5" fill="#10b981" />
                </svg>
            </motion.div>

            <div className="text-center space-y-2">
                <p className="text-lg font-medium text-emerald-400">
                    {LoadingStages[stage].message}
                </p>
                <p className="text-sm text-gray-400">
                    Cold start may take 15-30s
                </p>
            </div>

            {/* Progress Bar */}
            <div className="w-full max-w-md h-2 bg-gray-800 rounded-full overflow-hidden">
                <div
                    className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500 transition-all duration-1000"
                    style={{ width: `${LoadingStages[stage].progress}%` }}
                />
            </div>

            {/* Rotating Tip */}
            <div className="text-center max-w-md mt-4">
                <p className="text-sm text-gray-300 animate-pulse">
                    {tip}
                </p>
            </div>
        </div>
    );
}
