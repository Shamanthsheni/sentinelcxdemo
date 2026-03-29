import React, { useState, useEffect } from 'react';
import { Shield, Building2, Activity, Users, AlertCircle, Loader2 } from 'lucide-react';
import CustomerList from './components/CustomerList';
import RajeshDetail from './components/RajeshDetail';
import ImpactMetrics from './components/ImpactMetrics';
import { api } from './api';

export default function App() {
  const [activeTab, setActiveTab] = useState('customers');
  const [selectedCustomerId, setSelectedCustomerId] = useState('CUST_4821');
  const [customers, setCustomers] = useState([]);
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.getCustomers().then(setCustomers),
      api.getMetrics().then(setMetrics)
    ])
    .then(() => setLoading(false))
    .catch(console.error);
  }, []);

  if (loading) {
     return (
        <div className="min-h-screen bg-grayBg flex items-center justify-center">
            <div className="flex flex-col items-center bg-white p-12 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100 animate-pulse">
                <Loader2 className="w-12 h-12 text-unionBlue animate-spin mb-6 drop-shadow" />
                <h1 className="text-xl font-black text-gray-800 tracking-tight">Initializing Dashboard</h1>
                <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mt-2">Connecting telemetry...</p>
            </div>
        </div>
     );
  }

  return (
    <div className="min-h-screen bg-grayBg font-sans text-gray-900 relative">
      <div className="fixed inset-0 pointer-events-none bg-gradient-to-br from-unionBlue/5 to-unionRed/5"></div>
      
      {/* Top Navbar */}
      <nav className="bg-white border-b border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-[76px] items-center">
            {/* Logo and Branding */}
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-tr from-unionBlue to-unionRed p-2.5 rounded-xl shadow-[0_4px_15px_-3px_rgba(227,30,36,0.3)] border border-white/20 hover:scale-105 transition-transform duration-300">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <div className="flex flex-col justify-center">
                <span className="text-2xl font-black tracking-tighter text-gray-900 leading-none drop-shadow-sm">
                  Sentinel<span className="text-transparent bg-clip-text bg-gradient-to-r from-unionBlue to-unionRed">CX</span>
                </span>
                <span className="text-[11px] font-bold text-gray-500 uppercase tracking-[0.18em] flex items-center mt-1">
                  <Building2 className="w-3 h-3 mr-1 text-unionBlue" strokeWidth={2.5} />
                  Union Bank
                </span>
              </div>
            </div>
            {/* Mobile Optional Menu (hidden for pure demo focus) */}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10 relative z-10 w-full overflow-x-hidden">
        
        {/* Tabs */}
        <div className="mb-10 block bg-white rounded-2xl p-2 shadow-sm border border-gray-200 w-full md:w-fit mx-auto backdrop-blur-md bg-white/90">
          <nav className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2" aria-label="Tabs">
            {[
              { id: 'customers', label: 'Customers', icon: Users },
              { id: 'rajesh', label: 'Rajesh Demo', icon: AlertCircle },
              { id: 'impact', label: 'Impact', icon: Activity }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    group flex justify-center items-center px-6 py-3.5 rounded-xl font-bold text-sm sm:text-base transition-all duration-300 w-full sm:w-auto
                    ${isActive
                      ? 'bg-gradient-to-r from-unionBlue to-unionBlueLight text-white shadow-lg shadow-unionBlue/20 transform scale-100 sm:scale-[1.02]'
                      : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900 border border-transparent hover:border-gray-200'
                    }
                  `}
                >
                  <Icon className={`w-4 h-4 mr-2.5 transition-transform duration-300 ${isActive ? 'animate-pulse' : 'group-hover:scale-110 group-hover:text-unionBlue'}`} />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Tab Content Router */}
        {/* We mount all and control visibility via CSS to ensure instant, pre-hydrated rendering with soft fades */}
        <div className="relative min-h-[600px] w-full">
           <div className={`transition-all duration-500 transform absolute w-full inset-0 ${activeTab === 'customers' ? 'opacity-100 translate-y-0 relative z-10' : 'opacity-0 translate-y-6 pointer-events-none'}`}>
              <CustomerList onSelectCustomer={(id) => {
                setSelectedCustomerId(id);
                setActiveTab('rajesh');
              }} />
           </div>

           <div className={`transition-all duration-500 transform absolute w-full inset-0 ${activeTab === 'rajesh' ? 'opacity-100 translate-y-0 relative z-10' : 'opacity-0 translate-y-6 pointer-events-none'}`}>
              <RajeshDetail customerId={selectedCustomerId} onBack={() => setActiveTab('customers')} />
           </div>

           <div className={`transition-all duration-500 transform absolute w-full inset-0 ${activeTab === 'impact' ? 'opacity-100 translate-y-0 relative z-10' : 'opacity-0 translate-y-6 pointer-events-none'}`}>
              <ImpactMetrics metrics={metrics} />
           </div>
        </div>

      </main>
    </div>
  );
}
