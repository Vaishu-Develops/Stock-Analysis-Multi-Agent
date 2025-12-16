import React from 'react';
import { Activity } from 'lucide-react';

const TechnicalSection = ({ data }) => {
    if (!data) return null;

    const getSignalColor = (signal) => {
        if (typeof signal !== 'string') return 'text-cyber-neon-blue';
        if (signal.toLowerCase().includes('buy')) return 'text-cyber-neon-green';
        if (signal.toLowerCase().includes('sell')) return 'text-cyber-neon-pink';
        return 'text-cyber-neon-blue';
    };

    return (
        <div className="space-y-8 animate-fade-in">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-cyber-neon-blue/10 rounded-lg border border-cyber-neon-blue/20">
                    <Activity className="w-5 h-5 text-cyber-neon-blue" />
                </div>
                <h2 className="text-xl font-bold text-white">Technical Analysis</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {Object.entries(data).map(([key, value]) => {
                    if (typeof value === 'object') return null; // Skip nested objects
                    return (
                        <div key={key} className="metric-card group">
                            <h4 className="text-xs text-gray-500 uppercase tracking-wider mb-2 group-hover:text-cyber-neon-cyan transition-colors">
                                {key.replace(/_/g, ' ')}
                            </h4>
                            <div className="flex items-baseline gap-2">
                                <span className={`text-lg font-mono font-bold ${getSignalColor(value)}`}>
                                    {value}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Moving Averages Table if available */}
            {data.moving_averages && (
                <div className="glass-card rounded-2xl overflow-hidden border border-white/10">
                    <div className="px-6 py-4 border-b border-white/10 bg-white/5">
                        <h3 className="font-semibold text-white">Moving Averages</h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-gray-400 uppercase bg-white/5">
                                <tr>
                                    <th className="px-6 py-3">Period</th>
                                    <th className="px-6 py-3">Value</th>
                                    <th className="px-6 py-3">Type</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {Object.entries(data.moving_averages).map(([period, val]) => (
                                    <tr key={period} className="hover:bg-white/5 transition-colors">
                                        <td className="px-6 py-4 font-medium text-gray-300">{period}</td>
                                        <td className="px-6 py-4 font-mono text-cyber-neon-cyan">{val}</td>
                                        <td className="px-6 py-4">
                                            <span className="px-2 py-1 rounded text-xs bg-white/10 text-gray-300">SMA</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TechnicalSection;
