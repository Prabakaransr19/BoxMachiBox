"use client";

import { motion } from "framer-motion";
import {
    Brain,
    Database,
    Settings,
    Zap,
    BarChart3,
    Target,
    Award,
    Activity,
    GitBranch,
    Layers,
    CheckCircle2,
    AlertTriangle,
    ChevronDown
} from "lucide-react";
import { useState } from "react";

const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay }}
        viewport={{ once: true }}
        className={className}
    >
        {children}
    </motion.div>
);

export const InsightsView = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="w-full max-w-7xl mx-auto px-4 md:px-6 pb-24">
            {/* 1. Hero Section */}
            <div className="py-20 text-center relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-bmb-accent-cyan/5 rounded-full blur-3xl -z-10" />
                <FadeIn>
                    <div className="inline-flex items-center justify-center p-3 bg-neutral-900/50 rounded-full border border-neutral-800 mb-6">
                        <Brain className="w-6 h-6 text-bmb-accent-cyan mr-2" />
                        <span className="text-sm font-mono text-neutral-400">MODEL ARCHITECTURE v2.5</span>
                    </div>
                    <h1 className="text-4xl md:text-7xl font-bold text-white tracking-tight mb-6">
                        Predictive <br />
                        <span className="text-4xl md:text-7xl font-bold text-white tracking-tight mb-6">
                            Methodology
                        </span>
                    </h1>
                    <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
                        How we predict F1 podium finishes with <span className="text-green-400 font-bold">93.89%</span> accuracy using multi-seed ensemble learning.
                    </p>
                </FadeIn>
            </div>

            {/* 2. Model Architecture Card */}
            <FadeIn delay={0.1}>
                <div className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-8 mb-16">
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                        <GitBranch className="mr-3 text-bmb-accent-cyan" />
                        System Specifications
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <div className="p-4 bg-neutral-950/50 rounded-lg">
                            <div className="text-xs text-neutral-500 font-mono mb-2">ALGORITHM</div>
                            <div className="text-xl md:text-lg font-bold text-white">XGBoost Ens.</div>
                        </div>
                        <div className="p-4 bg-neutral-950/50 rounded-lg">
                            <div className="text-xs text-neutral-500 font-mono mb-2">TRAINING</div>
                            <div className="text-xl md:text-lg font-bold text-white">1,558 Races</div>
                        </div>
                        <div className="p-4 bg-neutral-950/50 rounded-lg">
                            <div className="text-xs text-neutral-500 font-mono mb-2">FEATURES</div>
                            <div className="text-xl md:text-lg font-bold text-white">47 Eng.</div>
                        </div>
                        <div className="p-4 bg-neutral-950/50 rounded-lg border-l-2 border-green-500">
                            <div className="text-xs text-neutral-500 font-mono mb-2">ACCURACY</div>
                            <div className="text-xl md:text-lg font-bold text-green-400">93.89%</div>
                        </div>
                    </div>
                </div>
            </FadeIn>

            {/* 3. XGBoost Ensemble Explanation */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                <FadeIn delay={0.1} className="p-6 bg-neutral-900/30 border border-neutral-800 rounded-xl">
                    <Layers className="w-8 h-8 text-blue-400 mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">Multi-seed Embedding</h3>
                    <p className="text-neutral-400 text-sm leading-relaxed">
                        We deploy multiple XGBoost instances initialized with distinct random seeds, reducing variance and ensuring stable predictions across different race conditions.
                    </p>
                </FadeIn>
                <FadeIn delay={0.2} className="p-6 bg-neutral-900/30 border border-neutral-800 rounded-xl">
                    <Database className="w-8 h-8 text-purple-400 mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">Historical Depth</h3>
                    <p className="text-neutral-400 text-sm leading-relaxed">
                        Training data spans the modern ground-effect era (2022-2025), capturing the specific aerodynamic characteristics of current regulation cars.
                    </p>
                </FadeIn>
                <FadeIn delay={0.3} className="p-6 bg-neutral-900/30 border border-neutral-800 rounded-xl">
                    <Settings className="w-8 h-8 text-amber-400 mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">Feature Engineering</h3>
                    <p className="text-neutral-400 text-sm leading-relaxed">
                        47 predictive features combining telemetry, weather data, and historic track mastery to quantify driver potential before the lights go out.
                    </p>
                </FadeIn>
            </div>

            {/* 4. Performance Metrics */}
            <div className="mb-20">
                <h2 className="text-2xl font-bold text-white mb-8 text-center">Validation Metrics</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <FadeIn delay={0.1} className="p-6 rounded-2xl bg-gradient-to-br from-green-900/20 to-neutral-900 border border-green-900/50 text-center">
                        <Target className="w-8 h-8 text-green-500 mx-auto mb-2" />
                        <div className="text-4xl font-bold text-white mb-1">93.89%</div>
                        <div className="text-sm text-green-400 font-mono">Accuracy</div>
                    </FadeIn>
                    <FadeIn delay={0.2} className="p-6 rounded-2xl bg-neutral-900/50 border border-neutral-800 text-center">
                        <Award className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                        <div className="text-4xl font-bold text-white mb-1">91.2%</div>
                        <div className="text-sm text-blue-400 font-mono">Precision</div>
                    </FadeIn>
                    <FadeIn delay={0.3} className="p-6 rounded-2xl bg-neutral-900/50 border border-neutral-800 text-center">
                        <Activity className="w-8 h-8 text-orange-400 mx-auto mb-2" />
                        <div className="text-4xl font-bold text-white mb-1">89.7%</div>
                        <div className="text-sm text-orange-400 font-mono">Recall</div>
                    </FadeIn>
                    <FadeIn delay={0.4} className="p-6 rounded-2xl bg-neutral-900/50 border border-neutral-800 text-center">
                        <BarChart3 className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                        <div className="text-4xl font-bold text-white mb-1">90.4%</div>
                        <div className="text-sm text-purple-400 font-mono">F1 Score</div>
                    </FadeIn>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
                {/* 5. Feature Importance */}
                <FadeIn>
                    <h2 className="text-2xl font-bold text-white mb-2">What Drives Predictions</h2>
                    <p className="text-neutral-400 text-sm mb-6">Top determinant factors in our podium probability model.</p>

                    <div className="space-y-4">
                        {[
                            { name: "Grid Position", val: 24, color: "bg-red-500" },
                            { name: "Qualifying Pace", val: 18, color: "bg-orange-500" },
                            { name: "Recent Form (5 Races)", val: 15, color: "bg-amber-500" },
                            { name: "Circuit Mastery", val: 12, color: "bg-yellow-500" },
                            { name: "Weather Conditions", val: 10, color: "bg-green-500" },
                            { name: "Team Performance", val: 8, color: "bg-emerald-500" },
                            { name: "Tire Strategy", val: 6, color: "bg-teal-500" },
                            { name: "Historical H2H", val: 4, color: "bg-cyan-500" },
                        ].map((item, i) => (
                            <div key={i} className="group">
                                <div className="flex justify-between text-sm text-neutral-300 mb-1">
                                    <span>{item.name}</span>
                                    <span>{item.val}%</span>
                                </div>
                                <div className="h-2 w-full bg-neutral-800 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        whileInView={{ width: `${item.val}%` }}
                                        transition={{ duration: 1, delay: 0.2 }}
                                        className={`h-full ${item.color}`}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </FadeIn>

                {/* 6. Why It Works */}
                <div>
                    <h2 className="text-2xl font-bold text-white mb-6">Why It Works</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="p-5 bg-neutral-900/30 border border-neutral-800 rounded-lg">
                            <Database className="w-5 h-5 text-neutral-400 mb-3" />
                            <h4 className="font-bold text-white mb-2">Rich Historical Data</h4>
                            <p className="text-xs text-neutral-500 leading-relaxed">
                                Our model learns from over 1,500 race samples spanning multiple seasons, allowing it to adapt to track evolution.
                            </p>
                        </div>
                        <div className="p-5 bg-neutral-900/30 border border-neutral-800 rounded-lg">
                            <Settings className="w-5 h-5 text-neutral-400 mb-3" />
                            <h4 className="font-bold text-white mb-2">Engineered Precision</h4>
                            <p className="text-xs text-neutral-500 leading-relaxed">
                                47 bespoke features capture nuance that raw data misses, from tire degradation curves to driver confidence intervals.
                            </p>
                        </div>
                        <div className="p-5 bg-neutral-900/30 border border-neutral-800 rounded-lg">
                            <GitBranch className="w-5 h-5 text-neutral-400 mb-3" />
                            <h4 className="font-bold text-white mb-2">Ensemble Stability</h4>
                            <p className="text-xs text-neutral-500 leading-relaxed">
                                By combining multiple weak learners, we eliminate outliers and produce highly stable probability distributions.
                            </p>
                        </div>
                        <div className="p-5 bg-neutral-900/30 border border-neutral-800 rounded-lg">
                            <CheckCircle2 className="w-5 h-5 text-neutral-400 mb-3" />
                            <h4 className="font-bold text-white mb-2">Rigorous Validation</h4>
                            <p className="text-xs text-neutral-500 leading-relaxed">
                                5-fold stratified cross-validation ensures our accuracy isn't luck—it's repeatable performance on unseen data.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* 7. Timeline */}
            <div className="mb-20">
                <h2 className="text-2xl font-bold text-white mb-10 text-center">Training Pipeline</h2>
                <div className="relative max-w-4xl mx-auto">
                    {/* Vertical Line */}
                    <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-neutral-800" />

                    {[
                        { title: "Data Collection", desc: "Ingesting telemetry from 2022-2025 official sources.", icon: Database },
                        { title: "Feature Engineering", desc: "Creating 47 predictive variables from raw inputs.", icon: Zap },
                        { title: "Cross-Validation", desc: "5-fold stratified splitting to prevent overfitting.", icon: Layers },
                        { title: "Hyperparameter Tuning", desc: "Bayesian optimization of model parameters.", icon: Settings },
                        { title: "Validation", desc: "Final testing on 2025 holdout dataset.", icon: CheckCircle2 },
                    ].map((step, i) => (
                        <FadeIn key={i} delay={i * 0.1} className={`relative flex items-center md:justify-between mb-8 ${i % 2 === 0 ? "md:flex-row-reverse" : ""}`}>
                            <div className="hidden md:block w-5/12" />
                            <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-neutral-900 border-2 border-bmb-accent-cyan z-10 flex items-center justify-center">
                                <step.icon className="w-6 h-6 text-bmb-accent-cyan" />
                            </div>
                            <div className="ml-16 md:ml-0 w-full md:w-5/12 pl-4 md:pl-0 md:text-center p-6 bg-neutral-900/30 border border-neutral-800 rounded-lg">
                                <h3 className="text-white font-bold text-lg">{step.title}</h3>
                                <p className="text-sm text-neutral-500 mt-1">{step.desc}</p>
                            </div>
                        </FadeIn>
                    ))}
                </div>
            </div>

            {/* 8. Limitations */}
            <div className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                    <AlertTriangle className="mr-3 text-amber-500" />
                    Known Limitations
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                        "Cannot predict mechanical DNF/Failures accurately",
                        "Safety car timing is unpredictable",
                        "Driver changes impact short-term accuracy",
                        "Sprint formats have limited training samples",
                        "First-lap incidents are modeled as random variance"
                    ].map((lim, i) => (
                        <div key={i} className="flex items-start p-4 bg-amber-500/5 border border-amber-500/20 rounded-lg">
                            <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mr-3" />
                            <p className="text-sm text-amber-200/80">{lim}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* 9. Technical Details (Expandable) */}
            <div className="border border-neutral-800 rounded-xl bg-neutral-900/20 overflow-hidden">
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="w-full flex items-center justify-between p-6 hover:bg-white/5 transition-colors"
                >
                    <span className="font-bold text-white font-mono">VIEW FULL TECHNICAL SPECIFICATION</span>
                    <ChevronDown className={`transform transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                </button>
                {isExpanded && (
                    <div className="p-6 pt-0 border-t border-neutral-800">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-neutral-400 font-mono mt-4">
                            <div>
                                <h4 className="text-white mb-2">Hyperparameters</h4>
                                <ul className="space-y-1">
                                    <li>Learning Rate: 0.01</li>
                                    <li>Max Depth: 4</li>
                                    <li>Subsample: 0.8</li>
                                    <li>Colsample Bytree: 0.8</li>
                                    <li>N_Estimators: 1000</li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="text-white mb-2">Environment</h4>
                                <ul className="space-y-1">
                                    <li>Python 3.9</li>
                                    <li>XGBoost 1.7.1</li>
                                    <li>Scikit-Learn 1.2.0</li>
                                    <li>Pandas 1.5.2</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="text-center mt-12 text-xs text-neutral-600">
                Model continuously trained. Last updated: January 2025.
            </div>
        </div>
    );
};
