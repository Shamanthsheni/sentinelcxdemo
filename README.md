# 🛡️ SentinelCX

SentinelCX is a next-generation predictive banking dashboard designed specifically for Union Bank. It proactively identifies customers experiencing transaction failures (like UPI gateway timeouts) and simulates an automated outreach workflow to dramatically improve customer experience (CX) before they can even file a complaint.

![Dashboard Preview]() *(Local Demo Only)*

---

### 🚀 Quick Start Instructions

You must run both the backend (API) and frontend (React interface) concurrently.

#### 1. Start the FastAPI Backend
Open a terminal instance and run:
```bash
cd backend
python -m pip install -r requirements.txt
python -m uvicorn main:app --reload
```
*The API will run on `http://localhost:8000`*

#### 2. Start the Frontend Application
Open a second terminal instance and run:
```bash
cd frontend
npm install
npm run dev
\`\`\`
*The web dashboard will instantly launch at \`http://localhost:5173\`*

---

### 🎭 Demo Script for Judges

This script walks through the exact 2-minute scenario to wow the judges:

1. **The Global View (Impact Tab):**
   * **Start** on the **Impact Tab**. 
   * **Say:** *"SentinelCX monitors Union Bank's enterprise telemetry in real-time. Notice we are already saving ₹47,000 today by automatically intercepting failures."*
   
2. **Identifying the Risk (Customers Tab):**
   * **Switch** to the **Customers Tab**.
   * **Say:** *"Our AI engine has just pinned Rajesh Kumar to the top of our queue. He's experienced a spike in risk score up to 45. Let's see why."*
   * **Action:** Click on Rajesh Kumar's row. 

3. **The Incident (Rajesh Demo Tab):**
   * The page dynamically loads Rajesh's profile. Point out the **3 Failed Swiggy UPI Transactions**.
   * **Say:** *"Rajesh just tried to pay for dinner three times, and his UPI ping failed. Usually, this means an angry phone call to support in 5 minutes."*

4. **The "Wow" Moment (Run Demo):**
   * **Say:** *"Instead of waiting, SentinelCX intervenes proactively."*
   * **Action:** Click the big red **"🚀 Run Rajesh Demo"** button.
   * **Watch** the sequence dynamically unfold:
      1. Risk score jumps from 45 to **87** in real-time as the system alerts us.
      2. The **Root Cause Analysis** pops in instantly—recognizing a Payment Gateway Timeout.
      3. An **Automated SMS** notification swoops in, reading: *"Hi Rajesh, we noticed your payment to Swiggy failed... We have temporarily credited ₹450."*
      4. A massive **Complaint Prevented ✅** badge locks into the screen!
   * **Concluding Note:** *"We just saved the relationship and a ₹1,000 operational support ticket.*"

5. **Resetting for the Next Judge:**
   * Simply click **Reset Demo** to completely reset the state to initial values.

---

### 💻 Tech Stack Explanation

- **Frontend:** Built with **React** & **Vite**. 
   - **Styling:** Fully customized **Tailwind CSS** configured with Union Bank's exact hex color branding (\`#003d6a\` & \`#e31e24\`). 
   - **Component UI:** **Lucide-react** for crystal-clear vector iconography.
   - **Charting:** **Recharts** for real-time risk score trajectories and the 7-day prevention bar chart. 
- **Backend:** Handled seamlessly by **FastAPI** (Python). 
   - Exposes asynchronous JSON-based REST APIs (\`GET /customers\`, \`POST /demo/rajesh\`, etc.) that manipulate an in-memory mutable data array acting as entirely stateless AI mock telemetry.
- **Workflow / Database:** Pure JSON mock data implementation. No external database setups needed for instantaneous local pitching.

---

### ⚠️ Known Limitations
- **In-Memory Storage:** Any data manipulated using the `POST /demo/rajesh` endpoint is stored strictly in-memory. If the Uvicorn terminal crashes or restarts, the demo resets all states naturally to baseline.
- **Mock Data Focus:** The list of 20 customers is synthetically generated exactly for this workflow context and does not connect to any actual transaction lakes.
- **Mobile Responsive Adjustments:** While 375px rendering is fully supported via Tailwind `md:` breakpoints, complex nested charts operate optimally on desktop viewport layouts.
