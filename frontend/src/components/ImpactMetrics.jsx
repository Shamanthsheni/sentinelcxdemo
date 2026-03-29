import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from 'recharts';
import { ShieldCheck, IndianRupee, AlertTriangle, TrendingDown, Activity } from 'lucide-react';

import { api } from '../api';

export default function ImpactMetrics() {
  const [metrics, setMetrics] = useState(null);

  useEffect(() => {
    api.getMetrics()
      .then(data => setMetrics(data))
      .catch(console.error);
  }, []);

  if (!metrics) {
    return (
      <div className="p-20 flex justify-center items-center h-[500px]">
        <div className="flex flex-col items-center animate-pulse">
           <Activity className="w-10 h-10 text-blue-500 mb-4 animate-[spin_3s_linear_infinite]" />
           <p className="text-gray-400 font-black uppercase tracking-[0.2em] text-xs">Aggregating Impact Telemetry...</p>
        </div>
      </div>
    );
  }

  const chartData = [
    { day: 'Mon', prevented: 12 },
    { day: 'Tue', prevented: 18 },
    { day: 'Wed', prevented: 23 },
    { day: 'Thu', prevented: 31 },
    { day: 'Fri', prevented: 28 },
    { day: 'Sat', prevented: 39 },
    { day: 'Today', prevented: metrics.complaints_prevented || 47 }
  ];

  return (
    <div className="space-y-6">
      
      {/* 2x2 Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Card 1: Prevented Today */}
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 rounded-3xl shadow-xl shadow-blue-500/20 border border-blue-400/50 text-white relative overflow-hidden group">
          <div className="absolute -right-6 -bottom-6 opacity-[0.08] transform group-hover:scale-110 group-hover:-rotate-12 transition-all duration-700 pointer-events-none">
             <ShieldCheck className="w-48 h-48" />
          </div>
          <div className="relative z-10 flex flex-col h-full justify-between">
             <p className="text-xs font-black uppercase tracking-[0.2em] text-blue-100 drop-shadow flex items-center">
                <ShieldCheck className="w-4 h-4 mr-2" /> Complaints Prevented Today
             </p>
             <div className="mt-8 mb-6">
                <p className="text-7xl xl:text-8xl font-black tracking-tighter drop-shadow-md text-white">
                   {metrics.complaints_prevented}
                </p>
             </div>
             <div className="inline-flex w-fit items-center text-xs font-bold bg-white/10 px-4 py-2 rounded-xl backdrop-blur-md shadow-inner border border-white/10">
                <span className="bg-white/20 px-1.5 py-0.5 rounded text-blue-100 mr-2">↓</span> 30% reduction vs yesterday
             </div>
          </div>
        </div>

        {/* Card 2: Savings Today */}
        <div className="bg-gradient-to-br from-emerald-500 to-green-700 p-8 rounded-3xl shadow-xl shadow-green-500/20 border border-green-400/50 text-white relative overflow-hidden group">
          <div className="absolute -right-6 -bottom-6 opacity-[0.08] transform group-hover:scale-110 transition-all duration-700 pointer-events-none">
             <IndianRupee className="w-48 h-48" />
          </div>
          <div className="relative z-10 flex flex-col h-full justify-between">
             <p className="text-xs font-black uppercase tracking-[0.2em] text-green-100 drop-shadow flex items-center">
                <IndianRupee className="w-4 h-4 mr-2" /> Savings Today
             </p>
             <div className="mt-8 mb-6">
                <p className="text-6xl xl:text-7xl font-black tracking-tighter drop-shadow-md text-white">
                   ₹{(metrics.savings_today).toLocaleString()}
                </p>
             </div>
             <div className="inline-flex w-fit items-center text-xs font-bold bg-white/10 px-4 py-2 rounded-xl backdrop-blur-md shadow-inner border border-white/10">
                <span className="mr-2">⭐</span> ₹1,000 per prevention
             </div>
          </div>
        </div>

        {/* Card 3: High Risk Customers */}
        <div className="bg-gradient-to-br from-rose-500 to-red-700 p-8 rounded-3xl shadow-xl shadow-red-500/20 border border-red-400/50 text-white relative overflow-hidden group">
          <div className="absolute -right-6 -bottom-6 opacity-[0.08] transform group-hover:-translate-x-4 transition-all duration-700 pointer-events-none">
             <AlertTriangle className="w-48 h-48" />
          </div>
          <div className="relative z-10 flex flex-col h-full justify-between">
             <p className="text-xs font-black uppercase tracking-[0.2em] text-red-100 drop-shadow flex items-center">
                <AlertTriangle className="w-4 h-4 mr-2" /> High Risk Customers
             </p>
             <div className="mt-8 mb-6">
                <p className="text-7xl xl:text-8xl font-black tracking-tighter drop-shadow-md text-white">
                   {metrics.high_risk_count}
                </p>
             </div>
             <div className="inline-flex w-fit items-center text-xs font-bold bg-white/10 px-4 py-2 rounded-xl backdrop-blur-md shadow-inner border border-white/10">
                <span className="bg-red-900/40 px-1.5 py-0.5 rounded mr-2 text-white">⚠️</span> Require immediate attention
             </div>
          </div>
        </div>

        {/* Card 4: Average Risk Score */}
        <div className="bg-gradient-to-br from-orange-400 to-amber-600 p-8 rounded-3xl shadow-xl shadow-orange-500/20 border border-orange-300/50 text-white relative overflow-hidden group">
          <div className="absolute -right-6 -bottom-6 opacity-[0.08] transform group-hover:translate-x-4 transition-all duration-700 pointer-events-none">
             <TrendingDown className="w-48 h-48" />
          </div>
          <div className="relative z-10 flex flex-col h-full justify-between">
             <p className="text-xs font-black uppercase tracking-[0.2em] text-orange-100 drop-shadow flex items-center">
                <TrendingDown className="w-4 h-4 mr-2" /> Average Risk Score
             </p>
             <div className="mt-8 mb-6">
                <p className="text-7xl xl:text-8xl font-black tracking-tighter drop-shadow-md text-white">
                   {metrics.avg_risk_score}
                </p>
             </div>
             <div className="inline-flex w-fit items-center text-xs font-bold bg-white/10 px-4 py-2 rounded-xl backdrop-blur-md shadow-inner border border-white/10">
                <TrendingDown className="w-3 h-3 mr-2" /> Trending down globally
             </div>
          </div>
        </div>

      </div>

      {/* Chart Section */}
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 mt-6 md:col-span-2">
        <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-8 flex items-center">
           <Activity className="w-4 h-4 mr-2" /> 7-Day Prevention Trajectory
        </h3>
        <div className="h-80 w-full mb-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
              <defs>
                 <linearGradient id="colorToday" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2563eb" stopOpacity={1}/>
                    <stop offset="100%" stopColor="#4f46e5" stopOpacity={0.8}/>
                 </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 13, fontWeight: 700}} dy={15} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 700}} />
              <Tooltip 
                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px -5px rgb(0 0 0 / 0.1)', fontWeight: 'bold' }}
                cursor={{fill: '#f8fafc'}}
              />
              <Bar dataKey="prevented" radius={[8, 8, 0, 0]} maxBarSize={70} animationDuration={1800}>
                 {
                    chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index === chartData.length - 1 ? 'url(#colorToday)' : '#cbd5e1'} />
                    ))
                 }
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
    </div>
  );
}
