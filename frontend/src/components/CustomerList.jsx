import React, { useState, useEffect } from 'react';
import { Search, Loader2, ChevronRight, UserCircle } from 'lucide-react';
import { api } from '../api';

export default function CustomerList({ onSelectCustomer }) {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const loadCustomers = async () => {
      try {
        const data = await api.getCustomers();
        setCustomers(data);
      } catch (error) {
        console.error("Error fetching customers:", error);
      } finally {
        setLoading(false);
      }
    };
    loadCustomers();
  }, []);

  const getRiskScoreBadge = (score) => {
    let bgColor = 'bg-green-500 text-white border-green-600';
    if (score >= 80) bgColor = 'bg-unionRed text-white border-unionRedLight shadow-md';
    else if (score >= 65) bgColor = 'bg-orange-500 text-white border-orange-600 shadow-md';

    return (
      <span className={`inline-flex items-center justify-center w-12 h-10 rounded-xl text-xl font-black border transition-colors duration-500 ${bgColor}`}>
        {score}
      </span>
    );
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'at_risk':
        return <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-bold bg-red-50 text-red-700 uppercase tracking-widest border border-red-200">At Risk</span>;
      case 'resolved':
        return <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-bold bg-unionBlue/10 text-unionBlue uppercase tracking-widest border border-unionBlue/20">Resolved</span>;
      default:
        return <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-bold bg-gray-50 text-gray-600 uppercase tracking-widest border border-gray-200">Normal</span>;
    }
  };

  const filtered = customers.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()));
  
  const pinnedRajesh = filtered.find(c => c.id === 'CUST_4821' || c.name === 'Rajesh Kumar');
  const others = filtered.filter(c => c.id !== 'CUST_4821' && c.name !== 'Rajesh Kumar');
  const displayList = pinnedRajesh ? [pinnedRajesh, ...others] : others;

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-20 bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100">
        <Loader2 className="w-12 h-12 text-unionBlue animate-spin mb-6 drop-shadow" />
        <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">Aggregating AI Network...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden flex flex-col">
      {/* Header and Search */}
      <div className="p-6 md:p-8 border-b border-gray-100 bg-grayBg flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-xl font-black text-gray-900 tracking-tight">Customer Intelligence</h2>
          <p className="text-sm text-gray-500 mt-1 font-medium">Real-time telemetry and risk assessment</p>
        </div>
        <div className="relative w-full md:w-80">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-11 pr-4 py-3 border border-gray-200 rounded-2xl leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-unionBlue focus:border-unionBlue sm:text-sm transition-all shadow-sm"
            placeholder="Search by customer name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Table grid */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50/80">
            <tr>
              <th scope="col" className="px-6 py-4 text-left text-xs font-black text-gray-400 uppercase tracking-widest">Customer Profile</th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-black text-gray-400 uppercase tracking-widest">Account Details</th>
              <th scope="col" className="px-6 py-4 text-center text-xs font-black text-gray-400 uppercase tracking-widest">Risk Score</th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-black text-gray-400 uppercase tracking-widest">Status</th>
              <th scope="col" className="relative px-6 py-4"><span className="sr-only">Action</span></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {displayList.map((customer) => {
              const isRajesh = customer.id === 'CUST_4821' || customer.name === 'Rajesh Kumar';
              return (
                <tr 
                  key={customer.id}
                  onClick={() => onSelectCustomer && onSelectCustomer(customer.id)}
                  className={`
                    group cursor-pointer transition-all duration-300 hover:bg-unionBlue/5 hover:shadow-[inset_4px_0_0_0_#003d6a] relative
                    ${isRajesh ? 'bg-unionBlue/5 shadow-[inset_4px_0_0_0_#003d6a]' : ''}
                  `}
                >
                  <td className="px-6 py-5 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className={`flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full border shadow-sm transition-colors duration-300 ${isRajesh ? 'bg-unionBlue border-unionBlueLight text-white' : 'bg-gray-50 border-gray-200 text-gray-400 group-hover:bg-white group-hover:text-unionBlue'}`}>
                        <UserCircle className="h-6 w-6" />
                      </div>
                      <div className="ml-4">
                        <div className={`text-sm tracking-tight flex items-center transition-colors ${isRajesh ? 'font-black text-unionBlue' : 'font-bold text-gray-900 group-hover:text-unionBlue'}`}>
                          {customer.name}
                          {isRajesh && <span className="ml-3 inline-flex items-center px-2 py-0.5 rounded text-[9px] font-black bg-unionRed text-white uppercase tracking-widest shadow-sm">Demo Target</span>}
                        </div>
                        <div className="text-xs text-gray-500 mt-0.5 font-medium">{customer.phone}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap">
                    <div className="text-sm font-bold text-gray-900">ACCT-{customer.account}</div>
                    <div className="text-xs text-gray-400 mt-0.5 font-mono">{customer.id}</div>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap text-center">
                    {getRiskScoreBadge(customer.risk_score)}
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap">
                    {getStatusBadge(customer.status)}
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap text-right text-sm font-medium">
                     <ChevronRight className={`w-5 h-5 transition-all duration-300 transform group-hover:translate-x-1 border border-transparent group-hover:border-unionBlue/20 rounded-full group-hover:bg-white p-0.5 ${isRajesh ? 'text-unionBlue border-unionBlue/30 bg-white ml-auto translate-x-1' : 'text-gray-300 group-hover:text-unionBlue ml-auto'}`} />
                  </td>
                </tr>
              );
            })}
            
            {displayList.length === 0 && (
              <tr>
                <td colSpan="5" className="px-6 py-12 text-center text-sm text-gray-500 font-bold">
                   No customers found matching classification.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
