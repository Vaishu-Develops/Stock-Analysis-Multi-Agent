import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Database, Activity, FileText, CheckCircle, Loader2 } from 'lucide-react';

const steps = [
    { id: 1, label: 'Initializing AI Agents', icon: Cpu, color: 'text-cyber-neon-purple' },
    { id: 2, label: 'Fetching Market Data', icon: Database, color: 'text-cyber-neon-blue' },
    { id: 3, label: 'Computing Technicals', icon: Activity, color: 'text-cyber-neon-cyan' },
    { id: 4, label: 'Analyzing Fundamentals', icon: FileText, color: 'text-cyber-neon-green' },
    { id: 5, label: 'Generating Final Report', icon: CheckCircle, color: 'text-cyber-neon-pink' },
];

const ProcessAnimation = ({ loading }) => {
    const [currentStep, setCurrentStep] = useState(0);

    useEffect(() => {
        if (loading) {
            setCurrentStep(0);
            const interval = setInterval(() => {
                setCurrentStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
            }, 1500); // Advance step every 1.5s
            return () => clearInterval(interval);
        } else {
            setCurrentStep(0);
        }
    }, [loading]);

    if (!loading) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-cyber-black/90 backdrop-blur-md">
            <div className="w-full max-w-md p-8 rounded-2xl bg-cyber-slate/50 border border-white/10 shadow-glass relative overflow-hidden">
                {/* Background Glow */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyber-neon-purple via-cyber-neon-cyan to-cyber-neon-green animate-gradient"></div>

                <h3 className="text-2xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-cyber-neon-purple to-cyber-neon-cyan">
                    AI Analysis in Progress
                </h3>

                <div className="space-y-6">
                    {steps.map((step, index) => {
                        const isActive = index === currentStep;
                        const isCompleted = index < currentStep;
                        const isPending = index > currentStep;

                        return (
                            <motion.div
                                key={step.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className={`flex items-center gap-4 p-3 rounded-xl transition-all duration-300 ${isActive ? 'bg-white/5 border border-white/10 shadow-neon-purple' : 'opacity-50'
                                    }`}
                            >
                                <div className={`relative p-2 rounded-lg ${isActive ? 'bg-white/10' : ''}`}>
                                    <step.icon
                                        className={`w-6 h-6 ${step.color} ${isActive ? 'animate-pulse' : ''}`}
                                    />
                                    {isActive && (
                                        <motion.div
                                            layoutId="active-glow"
                                            className="absolute inset-0 rounded-lg bg-cyber-neon-purple/20 blur-md"
                                        />
                                    )}
                                </div>

                                <div className="flex-1">
                                    <p className={`font-medium ${isActive ? 'text-white' : 'text-gray-500'}`}>
                                        {step.label}
                                    </p>
                                </div>

                                <div className="w-6 flex justify-center">
                                    {isActive && <Loader2 className="w-5 h-5 text-cyber-neon-cyan animate-spin" />}
                                    {isCompleted && <CheckCircle className="w-5 h-5 text-cyber-neon-green" />}
                                    {isPending && <div className="w-2 h-2 rounded-full bg-gray-700" />}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default ProcessAnimation;
