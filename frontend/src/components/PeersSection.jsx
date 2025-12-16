import React from 'react';
import { Users, ArrowRight } from 'lucide-react';

const PeersSection = ({ data }) => {
    // data is the object returned by peer_tools.compare_with_peers
    // It contains { peers: [...], peer_table: [...], ... }
    const peerTable = data?.peer_table || [];

    if (!peerTable || peerTable.length === 0) return null;

    return (
        <div className="space-y-8 animate-fade-in">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-cyber-neon-purple/10 rounded-lg border border-cyber-neon-purple/20">
                    <Users className="w-5 h-5 text-cyber-neon-purple" />
                </div>
                <h2 className="text-xl font-bold text-white">Peer Comparison</h2>
            </div>

            <div className="glass-card rounded-2xl overflow-hidden border border-white/10">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-gray-400 uppercase bg-white/5">
                            <tr>
                                <th className="px-6 py-4 font-medium">Company</th>
                                <th className="px-6 py-4 font-medium">Market Cap</th>
                                <th className="px-6 py-4 font-medium">P/E Ratio</th>
                                <th className="px-6 py-4 font-medium">Revenue Growth</th>
                                <th className="px-6 py-4 font-medium">Net Margin</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {peerTable.map((peer, index) => (
                                <tr key={index} className="hover:bg-white/5 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="font-bold text-white group-hover:text-cyber-neon-cyan transition-colors">{peer.symbol}</div>
                                        <div className="text-xs text-gray-500">{peer.company_name}</div>
                                    </td>
                                    <td className="px-6 py-4 font-mono text-gray-300">
                                        {peer.market_cap ? `$${(peer.market_cap / 1e9).toFixed(2)}B` : 'N/A'}
                                    </td>
                                    <td className="px-6 py-4 font-mono text-gray-300">
                                        {peer.pe ? peer.pe.toFixed(2) : 'N/A'}
                                    </td>
                                    <td className="px-6 py-4 font-mono">
                                        <span className={peer.revenue_growth > 0 ? 'text-cyber-neon-green' : 'text-cyber-neon-pink'}>
                                            {peer.revenue_growth ? `${(peer.revenue_growth * 100).toFixed(2)}%` : 'N/A'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 font-mono text-gray-300">
                                        {peer.net_margin ? `${(peer.net_margin * 100).toFixed(2)}%` : 'N/A'}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default PeersSection;
