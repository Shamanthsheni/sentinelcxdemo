const API_BASE = 'https://sentinelcxdemo.vercel.app';

export const api = {
  // Get all customers
  getCustomers: async () => {
    try {
      console.log(`[API] Fetching all customers from ${API_BASE}/customers`);
      const response = await fetch(`${API_BASE}/customers`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      console.log('[API] Successfully fetched customers:', data.length);
      return data;
    } catch (error) {
      console.error('[API] Error fetching customers:', error);
      throw error;
    }
  },
  
  // Get single customer
  getCustomer: async (customerId) => {
    try {
      console.log(`[API] Fetching details for customer: ${customerId}`);
      const response = await fetch(`${API_BASE}/customers/${customerId}`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      console.log(`[API] Successfully retrieved details for ${customerId}`);
      return data;
    } catch (error) {
      console.error(`[API] Error fetching customer ${customerId}:`, error);
      throw error;
    }
  },
  
  // Run Rajesh demo
  runRajeshDemo: async () => {
    try {
      console.log('[API] Triggering Rajesh demo sequence (POST /demo/rajesh)...');
      const response = await fetch(`${API_BASE}/demo/rajesh`, {
        method: 'POST'
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      console.log('[API] Successfully mutated Rajesh profile for demo run');
      return data;
    } catch (error) {
      console.error('[API] Error running Rajesh demo:', error);
      throw error;
    }
  },
  
  // Reset demo
  resetDemo: async () => {
    try {
      console.log('[API] Resetting Rajesh demo to initial state (POST /demo/reset)...');
      const response = await fetch(`${API_BASE}/demo/reset`, {
        method: 'POST'
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      console.log('[API] Successfully reset demo state');
      return data;
    } catch (error) {
      console.error('[API] Error resetting demo:', error);
      throw error;
    }
  },
  
  // Get metrics
  getMetrics: async () => {
    try {
      console.log(`[API] Fetching impact telemetry metrics from ${API_BASE}/metrics`);
      const response = await fetch(`${API_BASE}/metrics`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      console.log('[API] Successfully fetched impact metrics data');
      return data;
    } catch (error) {
      console.error('[API] Error fetching metrics:', error);
      throw error;
    }
  }
};
