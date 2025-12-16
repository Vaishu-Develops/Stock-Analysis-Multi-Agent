import React, { useState } from 'react';
import axios from 'axios';
import { Search, Activity, TrendingUp, AlertTriangle, Users, FileText, Building, Sparkles, Loader2, BarChart3, Zap } from 'lucide-react';
import SummaryBar from './SummaryBar';
import ProfileSection from './ProfileSection';
import TechnicalSection from './TechnicalSection';
import FundamentalSection from './FundamentalSection';
import RiskSection from './RiskSection';
import PeersSection from './PeersSection';
import ReportSection from './ReportSection';
import ProcessAnimation from './ProcessAnimation';
import ChartSection from './ChartSection';

const Dashboard = () => {
    const [symbol, setSymbol] = useState('');
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('profile');

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!symbol) return;

        setLoading(true);
        setError(null);
        setData(null);

        try {
            const response = await axios.post('http://localhost:8000/analyze-stock', { symbol });
            setData(response.data);
        } catch (err) {
            console.error(err);
            setError("Failed to fetch analysis. Ensure backend is running.");
        } finally {
            setLoading(false);
        }
    };

    const tabs = [
        { id: 'profile', label: 'Profile', icon: Building },
        { id: 'technical', label: 'Technical', icon: Activity },
        { id: 'chart', label: 'Chart', icon: BarChart3 },
        { id: 'fundamental', label: 'Fundamentals', icon: TrendingUp },
        { id: 'risk', label: 'Risk', icon: AlertTriangle },
        { id: 'peers', label: 'Peers', icon: Users },
        { id: 'report', label: 'AI Report', icon: FileText },
    ];

    return (
        <div className="min-h-screen text-gray-100 selection:bg-cyber-neon-purple selection:text-white">
            <ProcessAnimation loading={loading} />

            {/* Cyber Header */}
            <header className="glass-card-premium sticky top-0 z-40 border-b border-white/5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        {/* Logo & Title */}
                        <div className="flex items-center gap-3 animate-fade-in group">
                            <div className="relative p-2 rounded-xl bg-gradient-to-br from-cyber-purple to-cyber-cyan shadow-neon-purple group-hover:shadow-neon-cyan transition-all duration-500">
                                <BarChart3 className="w-6 h-6 text-white" />
                                <Zap className="w-3 h-3 text-yellow-300 absolute -top-1 -right-1 animate-pulse" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-cyber-neon-cyan to-cyber-neon-purple">
                                    FinAgent<span className="font-light text-cyber-neon-cyan">.AI</span>
                                </h1>
                                <p className="text-[10px] text-gray-400 font-mono tracking-widest uppercase">Advanced Market Intelligence</p>
                            </div>
                        </div>

                        {/* Search Form Removed from Header */}
                        <div className="hidden sm:block"></div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
                {/* Background Grid Effect */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>

                {/* Error State */}
                {error && (
                    <div className="glass-card border-l-4 border-red-500 p-6 mb-6 animate-slide-up bg-red-500/5">
                        <div className="flex items-center gap-3">
                            <AlertTriangle className="w-6 h-6 text-red-500" />
                            <div>
                                <h3 className="font-semibold text-red-400">System Alert</h3>
                                <p className="text-sm text-gray-400 mt-1">{error}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Data Display */}
                {data && !loading && (
                    <div className="animate-slide-up space-y-8">
                        {/* Search Form in Main Area */}
                        <div className="flex justify-center mb-8">
                            <form onSubmit={handleSearch} className="flex gap-3 w-full max-w-2xl animate-fade-in">
                                <div className="relative flex-1 group">
                                    <input
                                        type="text"
                                        value={symbol}
                                        onChange={(e) => setSymbol(e.target.value.toUpperCase())}
                                        placeholder="ENTER SYMBOL (e.g. NVDA)"
                                        className="input-cyber w-full font-mono text-lg pl-14 py-4 group-hover:border-cyber-neon-cyan/50 transition-colors shadow-lg"
                                    />
                                    <Search className="w-6 h-6 text-gray-500 absolute left-4 top-1/2 -translate-y-1/2 group-hover:text-cyber-neon-cyan transition-colors" />
                                </div>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="btn-cyber flex items-center gap-2 px-8 py-4 text-lg shrink-0 relative overflow-hidden group shadow-lg"
                                >
                                    <span className="relative z-10 flex items-center gap-2">
                                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
                                        {loading ? 'ANALYZING' : 'ANALYZE'}
                                    </span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-cyber-neon-cyan to-cyber-neon-purple opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </button>
                            </form>
                        </div>

                        <SummaryBar data={data} />

                        {/* Cyber Tab Navigation */}
                        <div className="glass-card p-1.5 rounded-xl overflow-x-auto scrollbar-cyber">
                            <div className="flex gap-1 min-w-max">
                                {tabs.map(tab => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`
                                            flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium text-sm 
                                            transition-all duration-300 whitespace-nowrap relative overflow-hidden
                                            ${activeTab === tab.id
                                                ? 'text-white shadow-neon-purple'
                                                : 'text-gray-400 hover:text-white hover:bg-white/5'
                                            }
                                        `}
                                    >
                                        {activeTab === tab.id && (
                                            <div className="absolute inset-0 bg-gradient-to-r from-cyber-purple/80 to-cyber-cyan/80 backdrop-blur-sm"></div>
                                        )}
                                        <span className="relative z-10 flex items-center gap-2">
                                            <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? 'text-white' : ''}`} />
                                            {tab.label}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Content Area */}
                        <div className="glass-card-premium rounded-2xl p-8 min-h-[500px] animate-fade-in border-t border-white/10 relative">
                            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyber-neon-purple to-transparent opacity-50"></div>
                            {activeTab === 'profile' && <ProfileSection data={data.profile} />}
                            {activeTab === 'technical' && <TechnicalSection data={data.technical} />}
                            {activeTab === 'chart' && <ChartSection data={data.price_history} currency={data.profile.currency} />}
                            {activeTab === 'fundamental' && <FundamentalSection data={data.fundamentals} currency={data.profile.currency} />}
                            {activeTab === 'risk' && <RiskSection data={data.risk} />}
                            {activeTab === 'peers' && <PeersSection data={data.peers} />}
                            {activeTab === 'report' && <ReportSection report={data.report_markdown} points={data.key_investment_points} data={data} />}
                        </div>
                    </div>
                )}

                {/* Empty State */}
                {!data && !loading && !error && (
                    <div className="glass-card-premium rounded-3xl p-16 text-center animate-slide-up border border-white/5 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-b from-cyber-purple/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                        <div className="max-w-lg mx-auto relative z-10">
                            <div className="relative inline-block mb-8">
                                <div className="p-8 bg-white/5 rounded-full border border-white/10 shadow-neon-cyan group-hover:scale-110 transition-transform duration-500">
                                    <BarChart3 className="w-20 h-20 text-cyber-neon-cyan mx-auto" />
                                </div>
                                <Sparkles className="w-8 h-8 text-cyber-neon-purple absolute -top-2 -right-2 animate-pulse drop-shadow-lg" />
                            </div>
                            <h2 className="text-4xl font-bold text-white mb-4 tracking-tight">
                                Await <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-neon-cyan to-cyber-neon-purple">Directives</span>
                            </h2>
                            <p className="text-gray-400 mb-8 leading-relaxed text-lg">
                                Initialize the AI agent swarm to deconstruct market data and generate institutional-grade analysis.
                            </p>

                            {/* Prompt Box Search */}
                            <div className="mb-8">
                                <form onSubmit={handleSearch} className="relative group max-w-md mx-auto">
                                    <div className="absolute -inset-1 bg-gradient-to-r from-cyber-neon-purple to-cyber-neon-cyan rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                                    <div className="relative flex items-center bg-cyber-slate rounded-xl p-1">
                                        <input
                                            type="text"
                                            value={symbol}
                                            onChange={(e) => setSymbol(e.target.value.toUpperCase())}
                                            placeholder="ENTER SYMBOL (e.g. NVDA)..."
                                            className="w-full bg-transparent text-white font-mono text-lg px-4 py-3 focus:outline-none placeholder:text-gray-600"
                                        />
                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="p-3 rounded-lg bg-white/5 hover:bg-white/10 text-cyber-neon-cyan transition-colors"
                                        >
                                            <Sparkles className="w-5 h-5" />
                                        </button>
                                    </div>
                                </form>
                            </div>


                            {/* Nifty 50 Quick Access */}
                            <div className="mt-8 pt-8 border-t border-white/5">
                                <h3 className="text-sm font-mono text-gray-500 mb-4 tracking-widest uppercase">Nifty 50 Market Leaders</h3>
                                <div className="flex flex-wrap gap-2 justify-center max-h-[150px] overflow-y-auto scrollbar-cyber p-2">
                                    {[
                                        'RELIANCE.NS', 'TCS.NS', 'HDFCBANK.NS', 'ICICIBANK.NS', 'INFY.NS',
                                        'BHARTIARTL.NS', 'ITC.NS', 'SBIN.NS', 'LICI.NS', 'HINDUNILVR.NS',
                                        'LT.NS', 'BAJFINANCE.NS', 'HCLTECH.NS', 'KOTAKBANK.NS', 'AXISBANK.NS',
                                        'ADANIENT.NS', 'SUNPHARMA.NS', 'TITAN.NS', 'MARUTI.NS', 'ULTRACEMCO.NS',
                                        'ASIANPAINT.NS', 'TATAMOTORS.NS', 'NTPC.NS', 'POWERGRID.NS', 'M&M.NS',
                                        'WIPRO.NS', 'BAJAJFINSV.NS', 'ONGC.NS', 'COALINDIA.NS', 'ADANIPORTS.NS',
                                        'TATASTEEL.NS', 'JSWSTEEL.NS', 'HINDALCO.NS', 'GRASIM.NS', 'TECHM.NS',
                                        'EICHERMOT.NS', 'NESTLEIND.NS', 'DRREDDY.NS', 'CIPLA.NS', 'BRITANNIA.NS',
                                        'SBILIFE.NS', 'HDFCLIFE.NS', 'APOLLOHOSP.NS', 'TATACONSUM.NS', 'DIVISLAB.NS',
                                        'HEROMOTOCO.NS', 'BAJAJ-AUTO.NS', 'LTIM.NS', 'BPCL.NS', 'UPL.NS'
                                    ].map(sym => (
                                        <button
                                            key={sym}
                                            onClick={() => setSymbol(sym)}
                                            className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 hover:border-cyber-neon-cyan/50 text-[10px] sm:text-xs font-mono text-gray-400 hover:text-cyber-neon-cyan transition-all duration-300"
                                        >
                                            {sym.replace('.NS', '')}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>

            {/* Footer */}
            <footer className="mt-12 py-8 text-center text-xs text-gray-600 border-t border-white/5 bg-black/20 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-4 flex flex-col items-center gap-2">
                    <p className="font-mono tracking-widest uppercase">System Status: Online</p>
                    <div className="flex gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        <span className="text-gray-500">Connected to Neural Network</span>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Dashboard;
