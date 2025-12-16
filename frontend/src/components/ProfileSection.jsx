import React from 'react';
import { Building, Globe, MapPin, Users, Tag, Activity } from 'lucide-react';

const ProfileSection = ({ data }) => {
    if (!data) return null;

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-cyber-neon-purple/10 rounded-lg border border-cyber-neon-purple/20">
                    <Building className="w-5 h-5 text-cyber-neon-purple" />
                </div>
                <h2 className="text-xl font-bold text-white">Business Overview</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Description Card */}
                <div className="lg:col-span-2 glass-card p-6 rounded-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-cyber-neon-purple/5 rounded-full blur-3xl group-hover:bg-cyber-neon-purple/10 transition-colors"></div>
                    <p className="text-gray-300 leading-relaxed relative z-10">
                        {data.description}
                    </p>
                </div>

                {/* Details Card */}
                <div className="space-y-4">
                    <div className="glass-card p-4 rounded-xl flex items-center justify-between group hover:border-cyber-neon-cyan/30 transition-colors">
                        <div className="flex items-center gap-3">
                            <Tag className="w-4 h-4 text-cyber-neon-cyan" />
                            <span className="text-sm text-gray-400">Sector</span>
                        </div>
                        <span className="font-medium text-white group-hover:text-cyber-neon-cyan transition-colors">{data.sector}</span>
                    </div>

                    <div className="glass-card p-4 rounded-xl flex items-center justify-between group hover:border-cyber-neon-cyan/30 transition-colors">
                        <div className="flex items-center gap-3">
                            <Activity className="w-4 h-4 text-cyber-neon-blue" />
                            <span className="text-sm text-gray-400">Industry</span>
                        </div>
                        <span className="font-medium text-white group-hover:text-cyber-neon-blue transition-colors text-right text-sm">{data.industry}</span>
                    </div>

                    <div className="glass-card p-4 rounded-xl flex items-center justify-between group hover:border-cyber-neon-cyan/30 transition-colors">
                        <div className="flex items-center gap-3">
                            <MapPin className="w-4 h-4 text-cyber-neon-green" />
                            <span className="text-sm text-gray-400">Country</span>
                        </div>
                        <span className="font-medium text-white group-hover:text-cyber-neon-green transition-colors">{data.country}</span>
                    </div>

                    <div className="glass-card p-4 rounded-xl flex items-center justify-between group hover:border-cyber-neon-cyan/30 transition-colors">
                        <div className="flex items-center gap-3">
                            <Users className="w-4 h-4 text-cyber-neon-pink" />
                            <span className="text-sm text-gray-400">Employees</span>
                        </div>
                        <span className="font-medium text-white group-hover:text-cyber-neon-pink transition-colors">{parseInt(data.fullTimeEmployees).toLocaleString()}</span>
                    </div>

                    <a
                        href={data.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="glass-card p-4 rounded-xl flex items-center justify-between group hover:bg-cyber-neon-purple/10 hover:border-cyber-neon-purple/50 transition-all cursor-pointer"
                    >
                        <div className="flex items-center gap-3">
                            <Globe className="w-4 h-4 text-cyber-neon-purple" />
                            <span className="text-sm text-gray-400 group-hover:text-white transition-colors">Website</span>
                        </div>
                        <span className="text-sm text-cyber-neon-purple group-hover:underline truncate max-w-[150px]">{data.website}</span>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ProfileSection;
