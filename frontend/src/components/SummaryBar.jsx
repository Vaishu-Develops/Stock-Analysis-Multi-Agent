import React from 'react';
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';

const SummaryBar = ({ data }) => {
    if (!data) return null;

    const { profile, price_metrics } = data;
    const price = price_metrics?.current_price || 0;
    const change = price_metrics?.change || 0;
    const changePercent = price_metrics?.change_percent || 0;
    const isPositive = change >= 0;

    const currencySymbol = profile.currency === 'INR' ? '₹' : '$';

    return (
        <div className="glass-card-premium rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 animate-slide-in relative overflow-hidden">
            {/* Background Glow */}
            <div className={`absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-20 pointer-events-none ${isPositive ? 'bg-cyber-neon-green' : 'bg-cyber-neon-pink'}`}></div>

            <div className="flex items-center gap-4 relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center shadow-lg">
                    {profile.image ? (
                        <img src={profile.image} alt={profile.companyName} className="w-10 h-10 object-contain" />
                    ) : (
                        <span className="text-2xl font-bold text-black">{profile.symbol?.[0]}</span>
                    )}
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-white">{profile.companyName}</h2>
                    <div className="flex items-center gap-2 text-gray-400 font-mono text-sm">
                        <span className="px-2 py-0.5 rounded bg-white/10 text-white">{profile.symbol}</span>
                        <span>•</span>
                        <span>{profile.exchange}</span>
                        <span>•</span>
                        <span>{profile.currency}</span>
                    </div>
                </div>
            </div>

            <div className="text-right relative z-10">
                <div className="flex items-center justify-end gap-1 text-4xl font-bold text-white font-mono tracking-tight">
                    <span className="text-2xl text-gray-500">{currencySymbol}</span>
                    {price.toFixed(2)}
                </div>
                <div className={`flex items-center justify-end gap-2 mt-1 font-medium ${isPositive ? 'text-cyber-neon-green' : 'text-cyber-neon-pink'}`}>
                    {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                    <span className="font-mono">
                        {isPositive ? '+' : ''}{change.toFixed(2)} ({changePercent.toFixed(2)}%)
                    </span>
                </div>
                <div className="text-xs text-gray-500 mt-1 font-mono">
                    Market Cap: {profile.mktCap ? `${currencySymbol}${(profile.mktCap / 1e9).toFixed(2)}B` : 'N/A'}
                </div>
            </div>
        </div>
    );
};

export default SummaryBar;
