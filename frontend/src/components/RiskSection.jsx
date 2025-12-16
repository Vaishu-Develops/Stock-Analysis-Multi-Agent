import React from 'react';
import { AlertTriangle, Shield, Activity, TrendingDown } from 'lucide-react';

const RiskSection = ({ data }) => {
    if (!data) return null;

    return (
        <div className="space-y-8 animate-fade-in">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-cyber-neon-pink/10 rounded-lg border border-cyber-neon-pink/20">
                    <AlertTriangle className="w-5 h-5 text-cyber-neon-pink" />
                </div>
                <h2 className="text-xl font-bold text-white">Risk Analysis</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Volatility Card */}
                <div className="glass-card p-6 rounded-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-cyber-neon-pink/10 rounded-full blur-2xl group-hover:bg-cyber-neon-pink/20 transition-colors"></div>
                    <div className="flex items-center gap-3 mb-4 relative z-10">
                        <Activity className="w-5 h-5 text-cyber-neon-pink" />
                        <h3 className="font-semibold text-white">Volatility (1Y)</h3>
                    </div>
                    <div className="text-3xl font-mono font-bold text-white mb-2 relative z-10">
                        {typeof data.volatility_1y === 'number' ? (data.volatility_1y * 100).toFixed(2) + '%' : 'N/A'}
                    </div>
                    <p className="text-sm text-gray-400 relative z-10">Annualized standard deviation</p>
                </div>

                {/* Max Drawdown Card */}
                <div className="glass-card p-6 rounded-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/10 rounded-full blur-2xl group-hover:bg-red-500/20 transition-colors"></div>
                    <div className="flex items-center gap-3 mb-4 relative z-10">
                        <TrendingDown className="w-5 h-5 text-red-400" />
                        <h3 className="font-semibold text-white">Max Drawdown (1Y)</h3>
                    </div>
                    <div className="text-3xl font-mono font-bold text-red-400 mb-2 relative z-10">
                        {typeof data.max_drawdown_1y === 'number' ? (data.max_drawdown_1y * 100).toFixed(2) + '%' : 'N/A'}
                    </div>
                    <p className="text-sm text-gray-400 relative z-10">Maximum observed loss</p>
                </div>

                {/* Risk Assessment Card */}
                <div className="glass-card p-6 rounded-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-cyber-neon-blue/10 rounded-full blur-2xl group-hover:bg-cyber-neon-blue/20 transition-colors"></div>
                    <div className="flex items-center gap-3 mb-4 relative z-10">
                        <Shield className="w-5 h-5 text-cyber-neon-blue" />
                        <h3 className="font-semibold text-white">Assessment</h3>
                    </div>
                    <div className="text-xl font-bold text-white mb-2 relative z-10">
                        {data.risk_level || "Unknown"}
                    </div>
                    <p className="text-sm text-gray-400 relative z-10">Based on historical volatility</p>
                </div>
            </div>
        </div>
    );
};

export default RiskSection;
