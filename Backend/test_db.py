from pymongo import MongoClient
from datetime import datetime, UTC

# ───── DATABASE CONNECTION ─────
client = MongoClient("mongodb://localhost:27017")
db = client["banking_app"]

users = db["users"]
accounts = db["accounts"]
transactions = db["transactions"]


# ───── DEMO DATA (CHANGE FOR NEW USER) ─────
NAME = "Demo User"
EMAIL = "demo_final@test.com"
ACCOUNT_NO = "8888888888"


# ───── CREATE USER ─────
def create_user():
    user = users.find_one({"email": EMAIL})

    if user:
        print("User exists")
        return user["_id"]

    user_id = users.insert_one({
        "name": NAME,
        "email": EMAIL,
        "createdAt": datetime.now(UTC)
    }).inserted_id

    print("User created")
    return user_id


# ───── CREATE ACCOUNT ─────
def create_account(user_id):
    acc = accounts.find_one({"accountNumber": ACCOUNT_NO})

    if acc:
        print("Account exists")
        return

    accounts.insert_one({
        "userId": str(user_id),
        "accountNumber": ACCOUNT_NO,
        "bankName": "App Bank",
        "ifscCode": "APPB0001234",
        "accountType": "SAVINGS",
        "branch": "Chennai",
        "balance": 0,
        "createdAt": datetime.now(UTC)
    })

    print("Account created")


# ───── TRANSACTION FUNCTION ─────
def transact(type, amount):
    acc = accounts.find_one({"accountNumber": ACCOUNT_NO})

    balance = acc["balance"]

    # Prevent negative balance
    if type == "DEBIT" and balance < amount:
        print("Insufficient balance")
        return

    new_balance = balance + amount if type == "CREDIT" else balance - amount

    # Save transaction
    transactions.insert_one({
        "accountNumber": ACCOUNT_NO,
        "transactionType": type,
        "amount": amount,
        "balanceBefore": balance,
        "balanceAfter": new_balance,
        "createdAt": datetime.now(UTC)
    })

    # Update balance
    accounts.update_one(
        {"accountNumber": ACCOUNT_NO},
        {"$set": {"balance": new_balance}}
    )

    print(f"{type} ₹{amount} → {new_balance}")


# ───── READ FUNCTIONS ─────
def show_balance():
    acc = accounts.find_one({"accountNumber": ACCOUNT_NO})
    print("Final Balance:", acc["balance"])


def show_history():
    print("\nTransaction History:")
    for t in transactions.find({"accountNumber": ACCOUNT_NO}):
        print(f"{t.get('transactionType')} ₹{t.get('amount')} → {t.get('balanceAfter')}")


# ───── MAIN FLOW ─────
user_id = create_user()
create_account(user_id)

transact("CREDIT", 1000)
transact("CREDIT", 500)
transact("DEBIT", 200)
transact("CREDIT", 700)

show_balance()
show_history()