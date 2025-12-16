import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import axios from 'axios';
import { FileText, Lightbulb, TrendingUp, TrendingDown, Minus, Download, Loader2 } from 'lucide-react';

const ReportSection = ({ report, points, data }) => {
    const [downloading, setDownloading] = useState(false);

    if (!report) return null;

    const getPointIcon = (type) => {
        if (type === 'Bullish') return <TrendingUp className="w-5 h-5 text-cyber-neon-green" />;
        if (type === 'Bearish') return <TrendingDown className="w-5 h-5 text-cyber-neon-pink" />;
        return <Minus className="w-5 h-5 text-gray-400" />;
    };

    const getPointColor = (type) => {
        if (type === 'Bullish') return 'border-cyber-neon-green/30 bg-cyber-neon-green/5';
        if (type === 'Bearish') return 'border-cyber-neon-pink/30 bg-cyber-neon-pink/5';
        return 'border-gray-500/30 bg-gray-500/5';
    };

    const handleDownloadPDF = async () => {
        if (!data) return;
        setDownloading(true);
        try {
            const response = await axios.post('http://localhost:8000/generate-pdf', data, {
                responseType: 'blob'
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${data.symbol || 'Report'}_Analysis.pdf`);
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error("PDF Download failed", error);
        } finally {
            setDownloading(false);
        }
    };

    return (
        <div className="space-y-8 animate-fade-in">
            {/* Key Investment Points */}
            {points && points.length > 0 && (
                <div className="space-y-4">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                            <Lightbulb className="w-5 h-5 text-yellow-500" />
                        </div>
                        <h2 className="text-xl font-bold text-white">Key Investment Points</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {points.map((point, index) => (
                            <div
                                key={index}
                                className={`p-5 rounded-xl border backdrop-blur-sm transition-all hover:scale-[1.02] ${getPointColor(point.type)}`}
                            >
                                <div className="flex items-start gap-3">
                                    <div className="mt-1 shrink-0">
                                        {getPointIcon(point.type)}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white mb-1">{point.title}</h4>
                                        <p className="text-sm text-gray-300 leading-relaxed">{point.detail}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Full Report */}
            <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-cyber-neon-purple/10 rounded-lg border border-cyber-neon-purple/20">
                            <FileText className="w-5 h-5 text-cyber-neon-purple" />
                        </div>
                        <h2 className="text-xl font-bold text-white">Comprehensive Analysis</h2>
                    </div>

                    <button
                        onClick={handleDownloadPDF}
                        disabled={downloading}
                        className="btn-cyber-outline py-2 px-4 flex items-center gap-2 text-sm"
                    >
                        {downloading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
                        {downloading ? 'Generating...' : 'Download PDF'}
                    </button>
                </div>

                <div className="glass-card p-8 rounded-2xl prose prose-invert max-w-none prose-headings:text-white prose-a:text-cyber-neon-cyan prose-strong:text-cyber-neon-purple">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{report}</ReactMarkdown>
                </div>
            </div>
        </div>
    );
};

export default ReportSection;
