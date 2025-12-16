import React from 'react';
import { TrendingUp, DollarSign, Percent, BarChart } from 'lucide-react';

const FundamentalSection = ({ data, currency }) => {
    if (!data) return null;

    const currencySymbol = currency === 'INR' ? '₹' : '$';

    const metrics = [
        { label: 'Revenue (TTM)', value: data.revenue_ttm ? `${currencySymbol}${(data.revenue_ttm / 1e9).toFixed(2)}B` : 'N/A', icon: DollarSign, color: 'text-cyber-neon-green' },
        { label: 'Revenue Growth', value: data.revenue_growth_3y ? `${(data.revenue_growth_3y * 100).toFixed(2)}%` : 'N/A', icon: TrendingUp, color: 'text-cyber-neon-blue' },
        { label: 'Net Margin', value: data.net_margin ? `${(data.net_margin * 100).toFixed(2)}%` : 'N/A', icon: Percent, color: 'text-cyber-neon-purple' },
        { label: 'Operating Margin', value: data.operating_margin ? `${(data.operating_margin * 100).toFixed(2)}%` : 'N/A', icon: BarChart, color: 'text-cyber-neon-pink' },
        { label: 'ROE', value: data.roe ? `${(data.roe * 100).toFixed(2)}%` : 'N/A', icon: TrendingUp, color: 'text-cyber-neon-cyan' },
        { label: 'P/E Ratio', value: data.pe_ratio ? data.pe_ratio.toFixed(2) : 'N/A', icon: Percent, color: 'text-cyber-neon-green' },
        { label: 'Debt/Equity', value: data.debt_to_equity ? `${data.debt_to_equity.toFixed(2)}%` : 'N/A', icon: DollarSign, color: 'text-cyber-neon-blue' },
        { label: 'EV/EBITDA', value: data.ev_ebitda ? data.ev_ebitda.toFixed(2) : 'N/A', icon: BarChart, color: 'text-cyber-neon-purple' },
    ];

    return (
        <div className="space-y-8 animate-fade-in">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-cyber-neon-green/10 rounded-lg border border-cyber-neon-green/20">
                    <TrendingUp className="w-5 h-5 text-cyber-neon-green" />
                </div>
                <h2 className="text-xl font-bold text-white">Fundamental Analysis</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {metrics.map((metric, index) => (
                    <div key={index} className="metric-card group">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-sm text-gray-400 group-hover:text-white transition-colors">{metric.label}</span>
                            <metric.icon className={`w-4 h-4 ${metric.color} opacity-70 group-hover:opacity-100 transition-opacity`} />
                        </div>
                        <div className="text-xl font-mono font-bold text-white group-hover:text-cyber-neon-cyan transition-colors">
                            {metric.value || 'N/A'}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FundamentalSection;
