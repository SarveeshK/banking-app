import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAccount } from "../api";

function Dashboard() {
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false);
    const [data, setData] = useState({ balance: 0, transactions: [] });
    const accountNumber = localStorage.getItem("accountNumber");

    useEffect(() => {
        if (!accountNumber) {
            navigate("/");
            return;
        }
        getAccount(accountNumber).then(res => {
            if (res.status === "success") {
                setData(res.account);
            }
        });
    }, [accountNumber, navigate]);

    const totalCredit = data.transactions.filter(t => t.type === "CREDIT").reduce((acc, t) => acc + t.amount, 0);
    const totalDebit = data.transactions.filter(t => t.type === "DEBIT").reduce((acc, t) => acc + t.amount, 0);
    const recentTxns = data.transactions.slice(0, 3); // latest 3 since backend sorts descending

    const userName = localStorage.getItem("userName") || "User";
    const initials = userName.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase();

    const handleLogout = () => {
        localStorage.removeItem("accountNumber");
        localStorage.removeItem("userName");
        navigate("/");
    };

    return (
        <div className="app-wrapper wide">
            <div className="header-bar row justify-between">
                <span>Dashboard</span>
                <div className="profile-dropdown-container">
                    <div className="profile-name" onClick={() => setShowMenu(!showMenu)}>
                        {initials}
                    </div>
                    {showMenu && (
                        <div className="profile-dropdown">
                            <button onClick={handleLogout}>Logout</button>
                        </div>
                    )}
                </div>
            </div>
            
            <div className="content-area">
                <div className="dashboard-grid">
                    <div className="dashboard-main">
                        <div className="label-text text-center" style={{ marginTop: 0 }}>Account Balance</div>
                        <div className="card-white" style={{ fontSize: "36px", fontWeight: "700", color: "#0f766e" }}>
                            ₹{data.balance}
                        </div>

                        <div className="text-center" style={{ marginBottom: "32px" }}>
                            <span className="link-red" onClick={() => navigate("/history")}>[ View Transactions ]</span>
                        </div>

                        <div className="row gap-10">
                            <div style={{ flex: 1 }}>
                                <div className="label-text text-center">Total Credit</div>
                                <div className="card-green" style={{ fontSize: "20px", fontWeight: "600" }}>
                                    ₹{totalCredit}
                                </div>
                            </div>
                            <div style={{ flex: 1 }}>
                                <div className="label-text text-center">Total Debit</div>
                                <div className="card-red" style={{ fontSize: "20px", fontWeight: "600" }}>
                                    ₹{totalDebit}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="dashboard-sidebar">
                        <div className="text-center" style={{ marginTop: "12px", marginBottom: "20px" }}>
                            <span style={{ background: "#c0fb9e", color: "#064e3b", padding: "6px 16px", borderRadius: "20px", fontSize: "14px", fontWeight: "700", boxShadow: "0 2px 8px rgba(192,251,158,0.4)" }}>Recent Transaction</span>
                        </div>
                        <div className="card-white" style={{ padding: "24px" }}>
                            {recentTxns.length === 0 ? (
                                <div style={{ color: "#64748b", fontWeight: "500" }}>No transactions yet</div>
                            ) : (
                                recentTxns.map((txn) => (
                                    <div className="recent-txn-pill" key={txn.id || Math.random()}>
                                        <span style={{ color: '#111827' }}>{txn.category}</span>
                                        <span style={{ color: txn.type === 'CREDIT' ? '#059669' : '#dc2626', fontWeight: '500' }}>
                                            {txn.type === 'CREDIT' ? '+' : '-'}₹{txn.amount}
                                        </span>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>

                <div style={{ marginTop: "24px" }}>
                    <button className="btn-pill-green" onClick={() => navigate("/add")}>
                        <span style={{ background: 'rgba(255,255,255,0.4)', borderRadius: '50%', width: '24px', height: '24px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginRight: '10px', fontSize: '18px', color: '#064e3b' }}>+</span> 
                        Add Transaction
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
