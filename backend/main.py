from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import json
import os
import copy
from datetime import datetime

app = FastAPI()

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DATA_FILE = os.path.join(os.path.dirname(__file__), 'data.json')

# Load customer data
with open(DATA_FILE, 'r') as f:
    data_payload = json.load(f)
    # Adapt depending on whether the json is {"customers": [...]} or raw array
    customers = data_payload.get("customers", []) if isinstance(data_payload, dict) else data_payload

# Store initial state for resetting
INITIAL_CUSTOMERS = copy.deepcopy(customers)

@app.get("/customers")
def get_customers():
    # Return all customers with id, name, account, risk_score, status
    # Sort by risk_score descending
    print(f"[{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] GET /customers requested")
    sorted_customers = sorted(customers, key=lambda x: x.get("risk_score", 0), reverse=True)
    result = [
        {
            "id": c.get("id"),
            "name": c.get("name"),
            "phone": c.get("phone"),
            "account": c.get("account"),
            "risk_score": c.get("risk_score"),
            "status": c.get("status")
        }
        for c in sorted_customers
    ]
    return result

@app.get("/customers/{customer_id}")
def get_customer(customer_id: str):
    print(f"[{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] GET /customers/{customer_id} requested")
    for c in customers:
        if c.get("id") == customer_id:
            return c
    raise HTTPException(status_code=404, detail="Customer not found")

@app.post("/demo/rajesh")
def demo_rajesh():
    print(f"[{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] POST /demo/rajesh requested")
    rajesh_data = None
    for c in customers:
        if c.get("id") == "CUST_4821":
            # Update Rajesh's risk_score from 45 -> 87
            c["risk_score"] = 87
            # Set root_cause as visible (already present in the initial load, just ensuring it's not None)
            if c.get("root_cause") in [None, "None", ""]:
                c["root_cause"] = "Payment gateway timeout detected"
            # Mark sms_sent = true
            c["sms_sent"] = True
            c["status"] = "at_risk" # logically makes sense
            rajesh_data = c
            break
            
    if not rajesh_data:
        raise HTTPException(status_code=404, detail="Rajesh not found")
        
    return {
        "timestamp": datetime.now().isoformat(),
        "customer": rajesh_data
    }

@app.post("/demo/reset")
def demo_reset():
    print(f"[{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] POST /demo/reset requested")
    rajesh_backup = None
    for c in INITIAL_CUSTOMERS:
        if c.get("id") == "CUST_4821":
            rajesh_backup = c
            break
            
    if rajesh_backup:
        for idx, c in enumerate(customers):
            if c.get("id") == "CUST_4821":
                customers[idx] = copy.deepcopy(rajesh_backup)
                break
        print(f"[{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] Rajesh reset to initial state")
        return {"status": "success", "message": "Demo data reset successfully"}
    
    raise HTTPException(status_code=404, detail="Could not find backup data for Rajesh")

@app.get("/metrics")
def get_metrics():
    print(f"[{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] GET /metrics requested")
    return {
       "complaints_prevented": 47,
       "savings_today": 47000,
       "avg_risk_score": 34,
       "high_risk_count": 5
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

app = app  # Vercel needs this
