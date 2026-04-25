from flask import Flask, request, jsonify
from pymongo import MongoClient
from bson import ObjectId
from datetime import datetime

app = Flask(__name__)

# ───── DB CONNECTION ─────
client = MongoClient("mongodb://localhost:27017")
db = client["banking_app"]

users_col = db["users"]
accounts_col = db["accounts"]
transactions_col = db["transactions"]


# ───── HOME ─────
@app.route("/")
def home():
    return jsonify({"message": "API running"})


# ===============================
# 👤 USER APIs
# ===============================

# CREATE USER
@app.route("/users", methods=["POST"])
def create_user():
    data = request.json

    if users_col.find_one({"email": data.get("email")}):
        return jsonify({"status": "failure", "message": "User exists"})

    user_id = users_col.insert_one({
        "name": data.get("name"),
        "email": data.get("email"),
        "phone": data.get("phone"),
        "createdAt": datetime.utcnow()
    }).inserted_id

    return jsonify({"status": "success", "userId": str(user_id)})


# GET ALL USERS
@app.route("/users", methods=["GET"])
def get_users():
    users = []
    for u in users_col.find():
        users.append({
            "id": str(u["_id"]),
            "name": u.get("name")
        })

    return jsonify({"status": "success", "users": users})


# GET USER BY ID
@app.route("/users/<user_id>", methods=["GET"])
def get_user(user_id):
    try:
        user = users_col.find_one({"_id": ObjectId(user_id)})

        if not user:
            return jsonify({"status": "failure", "message": "User not found"})

        return jsonify({
            "status": "success",
            "user": {
                "id": str(user["_id"]),
                "name": user.get("name"),
                "email": user.get("email"),
                "phone": user.get("phone")
            }
        })
    except:
        return jsonify({"status": "failure", "message": "Invalid ID"})


# UPDATE USER
@app.route("/users/<user_id>", methods=["PUT"])
def update_user(user_id):
    try:
        data = request.json

        result = users_col.update_one(
            {"_id": ObjectId(user_id)},
            {"$set": data}
        )

        if result.matched_count == 0:
            return jsonify({"status": "failure", "message": "User not found"})

        return jsonify({"status": "success", "message": "User updated"})
    except:
        return jsonify({"status": "failure", "message": "Invalid ID"})


# DELETE USER
@app.route("/users/<user_id>", methods=["DELETE"])
def delete_user(user_id):
    try:
        result = users_col.delete_one({"_id": ObjectId(user_id)})

        if result.deleted_count == 0:
            return jsonify({"status": "failure", "message": "User not found"})

        return jsonify({"status": "success", "message": "User deleted"})
    except:
        return jsonify({"status": "failure", "message": "Invalid ID"})


# ===============================
# 🏦 ACCOUNT APIs
# ===============================

# CREATE ACCOUNT
@app.route("/accounts", methods=["POST"])
def create_account():
    data = request.json

    if accounts_col.find_one({"accountNumber": data.get("accountNumber")}):
        return jsonify({"status": "failure", "message": "Account exists"})

    account = {
        "userId": data.get("userId"),
        "accountNumber": data.get("accountNumber"),
        "balance": 0,
        "createdAt": datetime.utcnow()
    }

    accounts_col.insert_one(account)

    return jsonify({"status": "success", "message": "Account created"})


# GET ALL ACCOUNTS
@app.route("/accounts", methods=["GET"])
def get_accounts():
    accounts = []

    for a in accounts_col.find():
        accounts.append({
            "accountNumber": a.get("accountNumber"),
            "balance": a.get("balance")
        })

    return jsonify({"status": "success", "accounts": accounts})


# GET ACCOUNT DETAILS + TRANSACTIONS
@app.route("/accounts/<account_number>", methods=["GET"])
def get_account(account_number):
    account = accounts_col.find_one({"accountNumber": account_number})

    if not account:
        return jsonify({"status": "failure", "message": "Account not found"})

    txns = []
    for t in transactions_col.find({"accountNumber": account_number}):
        txns.append({
            "type": t.get("transactionType"),
            "amount": t.get("amount"),
            "balanceAfter": t.get("balanceAfter")
        })

    return jsonify({
        "status": "success",
        "account": {
            "accountNumber": account_number,
            "balance": account.get("balance"),
            "transactions": txns
        }
    })


# DELETE ACCOUNT
@app.route("/accounts/<account_number>", methods=["DELETE"])
def delete_account(account_number):
    result = accounts_col.delete_one({"accountNumber": account_number})

    if result.deleted_count == 0:
        return jsonify({"status": "failure", "message": "Account not found"})

    return jsonify({"status": "success", "message": "Account deleted"})


# ===============================
# 💸 TRANSACTION API
# ===============================

@app.route("/transactions", methods=["POST"])
def create_transaction():
    data = request.json

    account = accounts_col.find_one({"accountNumber": data.get("accountNumber")})

    if not account:
        return jsonify({"status": "failure", "message": "Account not found"})

    balance_before = account["balance"]
    amount = data.get("amount")

    if data.get("type") == "CREDIT":
        balance_after = balance_before + amount
    elif data.get("type") == "DEBIT":
        if balance_before < amount:
            return jsonify({"status": "failure", "message": "Insufficient balance"})
        balance_after = balance_before - amount
    else:
        return jsonify({"status": "failure", "message": "Invalid type"})

    txn = {
        "accountNumber": data.get("accountNumber"),
        "userId": data.get("userId"),
        "transactionType": data.get("type"),
        "amount": amount,
        "balanceBefore": balance_before,
        "balanceAfter": balance_after,
        "createdAt": datetime.utcnow()
    }

    transactions_col.insert_one(txn)

    accounts_col.update_one(
        {"accountNumber": data.get("accountNumber")},
        {"$set": {"balance": balance_after}}
    )

    return jsonify({
        "status": "success",
        "message": f"{data.get('type')} successful",
        "balance": balance_after
    })


# ===============================
# RUN
# ===============================
if __name__ == "__main__":
    app.run(debug=True)