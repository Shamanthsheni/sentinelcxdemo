import json
import random

first_customer = {
  "id": "CUST_4821",
  "name": "Rajesh Kumar",
  "phone": "+91-9876543210",
  "account": "4821",
  "risk_score": 45,
  "status": "normal",
  "transactions": [
    {
      "id": "TXN_001",
      "time": "11:43 AM",
      "type": "UPI",
      "merchant": "Swiggy",
      "amount": 450,
      "status": "failed",
      "reason": "Gateway timeout"
    },
    {
      "id": "TXN_002", 
      "time": "11:44 AM",
      "type": "UPI",
      "merchant": "Swiggy",
      "amount": 450,
      "status": "failed",
      "reason": "Gateway timeout"
    },
    {
      "id": "TXN_003",
      "time": "11:45 AM", 
      "type": "UPI",
      "merchant": "Swiggy",
      "amount": 450,
      "status": "failed",
      "reason": "Gateway timeout"
    }
  ],
  "root_cause": "Payment gateway timeout detected",
  "sms_sent": False,
  "sms_text": "Hi Rajesh, we noticed your payment to Swiggy failed. This was due to a temporary gateway issue now resolved. Your ₹450 was not deducted. You can retry now. - Union Bank"
}

names = ["Priya Sharma", "Amit Patel", "Sneha Gupta", "Vikram Singh", "Anjali Desai", "Rahul Verma", "Neha Reddy", "Rohan Joshi", "Pooja Malhotra", "Karan Kapoor", "Simran Kaur", "Arjun Bhatia", "Kavita Rathi", "Suresh Menon", "Divya Nair", "Ravi Iyer", "Meera Pillai", "Aditya Bose", "Swati Das"]
merchants = ["Amazon", "Flipkart", "Paytm", "PhonePe", "Zomato", "Myntra", "Uber", "Ola", "IRCTC", "MakeMyTrip"]
statuses = ["normal", "at_risk", "resolved"]
txn_types = ["UPI", "NEFT", "IMPS", "Card", "RTGS"]

customers = [first_customer]

for i in range(19):
    has_txns = random.choice([True, True, False])
    txns = []
    if has_txns:
        num_txns = random.randint(1, 4)
        for j in range(num_txns):
            txns.append({
                "id": f"TXN_{(i+1)*100 + j}",
                "time": f"{random.randint(1,12):02d}:{random.randint(0,59):02d} {'AM' if random.choice([True, False]) else 'PM'}",
                "type": random.choice(txn_types),
                "merchant": random.choice(merchants),
                "amount": random.randint(100, 10000),
                "status": random.choice(["success", "failed", "pending"]),
                "reason": random.choice(["Insufficient funds", "Gateway timeout", "None", "Invalid PIN"]) if random.choice([True, False]) else "None"
            })
            
    status = random.choice(statuses)
    
    customers.append({
        "id": f"CUST_{random.randint(1000, 9999)}",
        "name": names[i],
        "phone": f"+91-{random.randint(6000000000, 9999999999)}",
        "account": f"{random.randint(1000, 9999)}",
        "risk_score": random.randint(10, 90),
        "status": status,
        "transactions": txns,
        "root_cause": random.choice(["High velocity transactions", "Frequent failures", "Card blocked", "None"]) if status == "at_risk" else "None",
        "sms_sent": random.choice([True, False]),
        "sms_text": f"Hi {names[i].split()[0]}, a recent transaction update from Union Bank." if random.choice([True, False]) else ""
    })

data = {
    "customers": customers,
    "impactMetrics": {
        "totalAtRisk": sum(1 for c in customers if c["status"] == "at_risk"),
        "potentialChurnValue": random.randint(500000, 2000000),
        "topComplaintDrivers": ["UPI Failures", "Hidden Fees", "Server Downtime"],
        "resolutionRate": random.randint(60, 95)
    }
}

with open("d:/Sentinelcx/backend/data.json", "w") as f:
    json.dump(data, f, indent=2)
