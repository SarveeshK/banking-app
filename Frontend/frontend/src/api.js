export const API_URL = '/api';

export const loginUser = async (email, password) => {
    const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });
    return res.json();
};

export const signupUser = async (email, password) => {
    const res = await fetch(`${API_URL}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });
    return res.json();
};

export const getAccount = async (accountNumber) => {
    const res = await fetch(`${API_URL}/accounts/${accountNumber}`);
    return res.json();
};

export const createAccount = async (accountNumber) => {
    const res = await fetch(`${API_URL}/accounts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: "user_" + Date.now(), accountNumber })
    });
    return res.json();
};

export const createTransaction = async (accountNumber, userId, type, amount, category) => {
    const res = await fetch(`${API_URL}/transactions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ accountNumber, userId, type, amount, category })
    });
    return res.json();
};
