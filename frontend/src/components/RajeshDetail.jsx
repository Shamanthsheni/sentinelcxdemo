import React, { useState, useEffect } from 'react';
import { ArrowLeft, Play, RotateCcw, ShieldAlert, CheckCircle, MessageCircle, AlertTriangle, IndianRupee, Activity, ServerCrash } from 'lucide-react';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from 'recharts';

const API_BASE = 'http://localhost:8000';

const AnimatedNumber = ({ value }) => {
  const [displayValue, setDisplayValue] = useState(value);
  
  useEffect(() => {
    if (value === displayValue) return;
    const diff = Math.abs(value - displayValue);
    const step = value > displayValue ? 1 : -1;
    const intervalTime = Math.max(10, Math.floor(1000 / diff));
    
    let current = displayValue;
    const timer = setInterval(() => {
      current += step;
      setDisplayValue(current);
      if (current === value) clearInterval(timer);
    }, intervalTime);
    
    return () => clearInterval(timer);
  }, [value, displayValue]);

  return <span>{displayValue}</span>;
};

export default function RajeshDetail({ customerId = 'CUST_4821', onBack }) {
  const [customer, setCustomer] = useState(null);
  const [demoStages, setDemoStages] = useState({ showRootCause: false, showSms: false, showPrevented: false });
  const [isDemoRunning, setIsDemoRunning] = useState(false);

  useEffect(() => {
    fetchCustomerData();
  }, [customerId]);

  const fetchCustomerData = async () => {
    try {
      const res = await fetch(`${API_BASE}/customers/${customerId}`);
      const data = await res.json();
      setCustomer(data);
      setDemoStages({
         showRootCause: data.risk_score > 65,
         showSms: data.sms_sent,
         showPrevented: data.sms_sent
      });
    } catch (e) {
      console.error(e);
    }
  };

  const startDemo = async () => {
    setIsDemoRunning(true);
    setDemoStages({ showRootCause: false, showSms: false, showPrevented: false });
    
    try {
      const res = await fetch(`${API_BASE}/demo/rajesh`, { method: 'POST' });
      const data = await res.json();
      const updatedBackendCustomer = data.customer;

      setCustomer(prev => ({ ...prev, risk_score: updatedBackendCustomer.risk_score }));

      setTimeout(() => {
        setCustomer(prev => ({ ...prev, root_cause: updatedBackendCustomer.root_cause }));
        setDemoStages(s => ({ ...s, showRootCause: true }));
      }, 2000);

      setTimeout(() => {
        setCustomer(prev => ({ ...prev, sms_sent: updatedBackendCustomer.sms_sent, sms_text: updatedBackendCustomer.sms_text }));
        setDemoStages(s => ({ ...s, showSms: true }));
      }, 4000);

      setTimeout(() => {
        setDemoStages(s => ({ ...s, showPrevented: true }));
        setIsDemoRunning(false);
      }, 6000);

    } catch (e) {
      console.error(e);
      setIsDemoRunning(false);
    }
  };

  const resetDemo = async () => {
    setIsDemoRunning(true);
    try {
      await fetch(`${API_BASE}/demo/reset`, { method: 'POST' });
      await fetchCustomerData();
    } catch (e) {
      console.error(e);
    } finally {
      setIsDemoRunning(false);
    }
  };

  if (!customer) return <div className="p-10 text-center animate-pulse text-gray-500 font-bold">Loading Data Intelligence...</div>;

  const chartData = [
    { time: '10:00', risk: 12 },
    { time: '10:30', risk: 15 },
    { time: '11:00', risk: 22 },
    { time: '11:40', risk: 45 },
    { time: 'Now', risk: customer.risk_score }
  ];

  const getRiskStyle = (score) => {
    if (score >= 80) return 'text-red-700 bg-red-50 border-red-200';
    if (score >= 65) return 'text-orange-600 bg-orange-50 border-orange-200';
    return 'text-green-600 bg-green-50 border-green-200';
  };
  const getRiskHex = (score) => score >= 80 ? '#ef4444' : score >= 65 ? '#f97316' : '#22c55e';

  return (
    <div className="space-y-6">
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes slideInUpPop {
          0% { opacity: 0; transform: translateY(20px) scale(0.95); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-reveal { animation: slideInUpPop 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}} />

      {/* Buttons Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center bg-white p-4 rounded-2xl shadow-sm border border-gray-100 gap-4">
        <button onClick={onBack} className="flex items-center text-sm font-bold text-gray-400 hover:text-blue-600 transition-colors">
          <ArrowLeft className="w-5 h-5 mr-2" /> Back
        </button>
        <div className="flex space-x-3 w-full sm:w-auto">
          <button onClick={resetDemo} disabled={isDemoRunning} className="flex-1 sm:flex-none flex items-center justify-center px-4 py-3 bg-gray-50 text-gray-600 font-bold text-sm rounded-xl hover:bg-gray-100 border border-gray-200 transition-colors disabled:opacity-50">
            <RotateCcw className="w-4 h-4 mr-2" /> Reset
          </button>
          <button onClick={startDemo} disabled={isDemoRunning} className="flex-1 sm:flex-none flex items-center justify-center px-6 py-3 bg-gradient-to-r from-red-600 to-red-500 text-white font-black uppercase tracking-wider text-sm rounded-xl shadow-lg hover:shadow-red-500/30 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:scale-100 active:scale-95">
            <Play className={`w-5 h-5 mr-2 ${isDemoRunning ? 'animate-spin' : ''}`} /> 🚀 Run Rajesh Demo
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT COLUMN */}
        <div className="lg:col-span-7 space-y-6">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Profile Card */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-center">
               <h2 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Customer Profile</h2>
               <div className="space-y-1">
                  <p className="text-3xl font-black text-gray-900 tracking-tight">{customer.name}</p>
                  <p className="text-gray-500 font-semibold text-sm">Account: <span className="font-mono text-gray-900 bg-gray-50 px-2 py-0.5 rounded ml-1">{customer.account}</span></p>
                  <p className="text-gray-500 font-semibold text-sm pt-2">{customer.phone}</p>
               </div>
            </div>

            {/* Risk Score Display */}
            <div className={`p-6 rounded-2xl shadow-sm border transition-colors duration-700 flex flex-col items-center justify-center relative overflow-hidden ${getRiskStyle(customer.risk_score)}`}>
               {customer.risk_score >= 80 && <div className="absolute inset-0 bg-red-500/10 animate-pulse pointer-events-none"></div>}
               <h2 className="text-[10px] font-black uppercase tracking-widest mb-1 relative z-10 opacity-80">Live Risk Score</h2>
               <div className={`text-8xl font-black tracking-tighter relative z-10 transition-transform duration-300 ${isDemoRunning ? 'animate-number-scale text-unionRed' : ''}`}>
                  <AnimatedNumber value={customer.risk_score} />
               </div>
            </div>
          </div>

          {/* Recharts Timeline */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-64">
             <h2 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4 flex items-center">
               <Activity className="w-3.5 h-3.5 mr-2" /> Risk Trajectory
             </h2>
             <ResponsiveContainer width="100%" height="85%">
                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                   <defs>
                      <linearGradient id="colorRisk" x1="0" y1="0" x2="0" y2="1">
                         <stop offset="5%" stopColor={getRiskHex(customer.risk_score)} stopOpacity={0.4}/>
                         <stop offset="95%" stopColor={getRiskHex(customer.risk_score)} stopOpacity={0}/>
                      </linearGradient>
                   </defs>
                   <XAxis dataKey="time" stroke="#cbd5e1" fontSize={12} tickLine={false} axisLine={false} />
                   <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 15px -3px rgb(0 0 0 / 0.1)', fontWeight: 'bold' }}/>
                   <Area type="monotone" dataKey="risk" stroke={getRiskHex(customer.risk_score)} fillOpacity={1} fill="url(#colorRisk)" strokeWidth={4} isAnimationActive={true} animationDuration={1000} />
                </AreaChart>
             </ResponsiveContainer>
          </div>

          {/* Transactions Table */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
             <h2 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Recent Transactions</h2>
             <div className="space-y-3">
               {customer.transactions?.map(txn => (
                 <div key={txn.id} className="flex items-center justify-between p-4 rounded-xl border border-gray-100 bg-gray-50 hover:bg-white transition-colors">
                    <div>
                      <p className="font-bold text-gray-900">{txn.merchant}</p>
                      <p className="text-[11px] text-gray-500 font-bold uppercase tracking-wider mt-0.5">{txn.time} • {txn.type}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-black text-gray-900">₹{txn.amount}</p>
                      {txn.status === 'failed' ? (
                        <span className="inline-block mt-1 px-2 py-0.5 rounded-md text-[9px] uppercase font-black tracking-widest bg-red-100 text-red-600 border border-red-200">Failed</span>
                      ) : (
                        <span className="inline-block mt-1 px-2 py-0.5 rounded-md text-[9px] uppercase font-black tracking-widest bg-green-100 text-green-700 border border-green-200">{txn.status}</span>
                      )}
                    </div>
                 </div>
               ))}
               {(!customer.transactions || customer.transactions.length === 0) && (
                 <p className="text-sm text-gray-400 font-bold text-center py-6">No recent transactions flagged.</p>
               )}
             </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Status Badge */}
          {demoStages.showPrevented && (
            <div className="animate-bounce-pulse">
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-8 rounded-3xl shadow-xl shadow-green-500/20 border border-green-400 text-white relative overflow-hidden group">
                <div className="absolute -right-6 -top-6 opacity-20 transform group-hover:scale-110 transition-transform duration-700">
                  <ShieldAlert className="w-40 h-40" />
                </div>
                <div className="relative z-10 flex flex-col items-center text-center">
                   <CheckCircle className="w-16 h-16 text-white mb-4 shadow-2xl rounded-full bg-green-500" />
                   <h2 className="text-3xl font-black mb-2 drop-shadow-md tracking-tight">Complaint Prevented ✅</h2>
                   <div className="bg-black/15 px-5 py-2 rounded-full mt-3 flex items-center shadow-inner backdrop-blur-sm border border-white/10">
                     <IndianRupee className="w-4 h-4 mr-1 text-green-200" /> 
                     <span className="text-green-50 font-bold tracking-wide">1,000 saved</span>
                   </div>
                </div>
              </div>
            </div>
          )}

          {/* Root Cause Box */}
          {demoStages.showRootCause && (
            <div className="animate-scale-fade">
              <div className="bg-unionRed/5 p-6 rounded-3xl shadow-sm border border-unionRed/20">
                <h2 className="text-[10px] font-black text-unionRed uppercase tracking-widest mb-3 flex items-center">
                  <ServerCrash className="w-4 h-4 mr-2" /> Root Cause Analysis
                </h2>
                <div className="flex items-start bg-white p-4 rounded-xl border border-unionRed/10 shadow-sm">
                   <AlertTriangle className="w-6 h-6 text-unionRed mr-3 shrink-0 mt-0.5" />
                   <p className="text-gray-900 font-bold leading-snug">{customer.root_cause}</p>
                </div>
              </div>
            </div>
          )}

          {/* SMS Preview */}
          {demoStages.showSms && (
            <div className="animate-slide-in-right">
              <div className="bg-gradient-to-br from-gray-100 to-gray-200 p-6 rounded-[2.5rem] shadow-2xl border-[8px] border-white relative max-w-sm mx-auto">
                 {/* Mock phone notch */}
                 <div className="absolute top-0 inset-x-0 h-5 bg-black/5 rounded-b-2xl max-w-[35%] mx-auto backdrop-blur-sm"></div>
                 
                 <h2 className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-6 text-center mt-3 flex justify-center items-center">
                   <MessageCircle className="w-3 h-3 mr-1" /> Proactive SMS Triggered
                 </h2>
                 <div className="bg-white p-4 rounded-2xl rounded-tl-sm shadow-sm border border-gray-100 relative mb-2">
                    <p className="text-gray-800 text-sm font-medium leading-relaxed">{customer.sms_text}</p>
                 </div>
                 <p className="text-[10px] font-black uppercase text-green-600 flex justify-end items-center mr-1">
                   Sent ✓✓
                 </p>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
