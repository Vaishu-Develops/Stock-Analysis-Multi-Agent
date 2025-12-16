import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity } from 'lucide-react';

const ChartSection = ({ data, currency }) => {
    if (!data || data.length === 0) return null;

    const currencySymbol = currency === 'INR' ? '₹' : '$';

    // Calculate min/max for Y-axis domain to make chart look dynamic
    const prices = data.map(d => d.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const domain = [minPrice - (minPrice * 0.05), maxPrice + (maxPrice * 0.05)];

    return (
        <div className="space-y-8 animate-fade-in">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-cyber-neon-cyan/10 rounded-lg border border-cyber-neon-cyan/20">
                    <Activity className="w-5 h-5 text-cyber-neon-cyan" />
                </div>
                <h2 className="text-xl font-bold text-white">Price History (1 Year)</h2>
            </div>

            <div className="glass-card-premium p-6 rounded-2xl h-[400px] w-full relative">
                <div className="absolute inset-0 bg-gradient-to-t from-cyber-purple/5 to-transparent pointer-events-none rounded-2xl"></div>
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <XAxis
                            dataKey="date"
                            stroke="#64748b"
                            fontSize={12}
                            tickMargin={10}
                            tickFormatter={(value) => {
                                const date = new Date(value);
                                return `${date.toLocaleString('default', { month: 'short' })} ${date.getDate()}`;
                            }}
                            minTickGap={30}
                        />
                        <YAxis
                            domain={domain}
                            stroke="#64748b"
                            fontSize={12}
                            tickFormatter={(value) => `${currencySymbol}${value.toLocaleString()}`}
                            width={60}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'rgba(15, 23, 42, 0.9)',
                                backdropFilter: 'blur(8px)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                borderRadius: '12px',
                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                            }}
                            itemStyle={{ color: '#fff', fontSize: '14px', fontFamily: 'monospace' }}
                            labelStyle={{ color: '#94a3b8', fontSize: '12px', marginBottom: '4px' }}
                            formatter={(value) => [`${currencySymbol}${value}`, 'Price']}
                            labelFormatter={(label) => new Date(label).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                        />
                        <Area
                            type="monotone"
                            dataKey="price"
                            stroke="#06b6d4"
                            strokeWidth={2}
                            fillOpacity={1}
                            fill="url(#colorPrice)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default ChartSection;
