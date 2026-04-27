# Banking App

This is a Python Flask backend application for a basic banking system. It uses MongoDB as its database. A frontend application for this project is currently under development and will be available soon.

## Tech Stack

- **Backend Framework**: Python 3.x, Flask
- **Database**: MongoDB
- **Database Driver**: PyMongo

## Project Structure

```text
banking-app/
├── Backend/
│   ├── app.py           # Main application file with all API endpoints
│   ├── test_db.py       # Database connection testing script
│   ├── .env             # Environment variables
│   └── route/           # Directory for modular routes
├── Forge/               # Additional project tools/files
├── venv/                # Python virtual environment
├── .gitignore           # Git ignore configurations
└── README.md            # Project documentation
```

## Prerequisites

- Python 3.x
- MongoDB running locally on the default port (27017)
- [Postman](https://www.postman.com/downloads/) (for testing APIs)

## Database Connection

This application connects to a local MongoDB instance. 
- **Connection URI**: `mongodb://localhost:27017`
- **Database Name**: `banking_app`

Collections (`users`, `accounts`, `transactions`) are created automatically when data is inserted.
You can verify the database connection and test data flow by running the included test script:
```bash
cd Backend
python test_db.py
```

## How to Run the Project

1. **Start MongoDB**: Ensure that your MongoDB server is running locally on `mongodb://localhost:27017`.
2. **Activate Virtual Environment** (optional but recommended):
   - Windows: `.\venv\Scripts\activate`
   - Mac/Linux: `source venv/bin/activate`
3. **Install Dependencies**:
   ```bash
   pip install Flask pymongo
   ```
4. **Run the Server**:
   ```bash
   cd Backend
   python app.py
   ```
   The API will be running and available at `http://127.0.0.1:5000/`.

## Testing with Postman

1. Download and open **Postman**.
2. Ensure the Flask backend is running.
3. For a simple test, create a **GET** request to `http://127.0.0.1:5000/` and click **Send**. You should receive `{"message": "API running"}`.
4. For endpoints that require data (e.g., POST `/users`):
   - Set the method to **POST** and URL to `http://127.0.0.1:5000/users`.
   - Go to the **Body** tab, select **raw**, and choose **JSON** from the dropdown.
   - Paste the sample JSON payload from the API reference below and click **Send**.

---

## API Endpoints

### 1. Home
- **Endpoint**: `/`
- **Method**: `GET`
- **Description**: Check if the API is running.
- **Response**:
  ```json
  {
    "message": "API running"
  }
  ```

---

### 👤 User APIs

#### 2. Create User
- **Endpoint**: `/users`
- **Method**: `POST`
- **Description**: Create a new user.
- **Request Body**:
  ```json
  {
    "name": "Sarveesh",
    "email": "sarveesh@example.com",
    "phone": "1234567890"
  }
  ```
- **Responses**:
  - Success (200): `{"status": "success", "userId": "..."}`
  - Failure (200, User exists): `{"status": "failure", "message": "User exists"}`

#### 3. Get All Users
- **Endpoint**: `/users`
- **Method**: `GET`
- **Description**: Retrieve a list of all users.
- **Response**:
  ```json
  {
    "status": "success",
    "users": [
      {
        "id": "...",
        "name": "Sarveesh"
      }
    ]
  }
  ```

#### 4. Get User by ID
- **Endpoint**: `/users/<user_id>`
- **Method**: `GET`
- **Description**: Retrieve details of a specific user.
- **Responses**:
  - Success (200):
    ```json
    {
      "status": "success",
      "user": {
        "id": "...",
        "name": "Sarveesh",
        "email": "sarveesh@example.com",
        "phone": "1234567890"
      }
    }
    ```
  - Failure (200, Not found / Invalid ID): `{"status": "failure", "message": "User not found"}` or `{"status": "failure", "message": "Invalid ID"}`

#### 5. Update User
- **Endpoint**: `/users/<user_id>`
- **Method**: `PUT`
- **Description**: Update user details.
- **Request Body**: Any user fields to update.
  ```json
  {
    "name": "Sarveesh"
  }
  ```
- **Responses**:
  - Success (200): `{"status": "success", "message": "User updated"}`
  - Failure (200): `{"status": "failure", "message": "User not found"}` or `{"status": "failure", "message": "Invalid ID"}`

#### 6. Delete User
- **Endpoint**: `/users/<user_id>`
- **Method**: `DELETE`
- **Description**: Delete a user.
- **Responses**:
  - Success (200): `{"status": "success", "message": "User deleted"}`
  - Failure (200): `{"status": "failure", "message": "User not found"}` or `{"status": "failure", "message": "Invalid ID"}`

---

### 🏦 Account APIs

#### 7. Create Account
- **Endpoint**: `/accounts`
- **Method**: `POST`
- **Description**: Create a new account for a user. The initial balance will be `0`.
- **Request Body**:
  ```json
  {
    "userId": "...",
    "accountNumber": "ACC123"
  }
  ```
- **Responses**:
  - Success (200): `{"status": "success", "message": "Account created"}`
  - Failure (200, Account exists): `{"status": "failure", "message": "Account exists"}`

#### 8. Get All Accounts
- **Endpoint**: `/accounts`
- **Method**: `GET`
- **Description**: Retrieve a list of all accounts.
- **Response**:
  ```json
  {
    "status": "success",
    "accounts": [
      {
        "accountNumber": "ACC123",
        "balance": 0
      }
    ]
  }
  ```

#### 9. Get Account Details + Transactions
- **Endpoint**: `/accounts/<account_number>`
- **Method**: `GET`
- **Description**: Retrieve details of an account including its transaction history.
- **Responses**:
  - Success (200):
    ```json
    {
      "status": "success",
      "account": {
        "accountNumber": "ACC123",
        "balance": 100,
        "transactions": [
          {
            "type": "CREDIT",
            "amount": 100,
            "balanceAfter": 100
          }
        ]
      }
    }
    ```
  - Failure (200): `{"status": "failure", "message": "Account not found"}`

#### 10. Delete Account
- **Endpoint**: `/accounts/<account_number>`
- **Method**: `DELETE`
- **Description**: Delete an account.
- **Responses**:
  - Success (200): `{"status": "success", "message": "Account deleted"}`
  - Failure (200): `{"status": "failure", "message": "Account not found"}`

---

### 💸 Transaction APIs

#### 11. Create Transaction (Credit/Debit)
- **Endpoint**: `/transactions`
- **Method**: `POST`
- **Description**: Create a transaction for an account. Modifies the account balance depending on the transaction type.
- **Request Body**:
  ```json
  {
    "accountNumber": "ACC123",
    "userId": "...",
    "type": "CREDIT",  // Can be "CREDIT" or "DEBIT"
    "amount": 100
  }
  ```
- **Responses**:
  - Success (200): 
    ```json
    {
      "status": "success",
      "message": "CREDIT successful",
      "balance": 100
    }
    ```
  - Failure (200, Insufficient balance): `{"status": "failure", "message": "Insufficient balance"}`
  - Failure (200, Account not found): `{"status": "failure", "message": "Account not found"}`
  - Failure (200, Invalid type): `{"status": "failure", "message": "Invalid type"}`
