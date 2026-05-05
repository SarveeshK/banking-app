import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false);

    return (
        <div className="app-wrapper wide">
            <div className="header-bar row justify-between">
                <span>Dashboard</span>
                <div className="profile-dropdown-container">
                    <div className="profile-name" onClick={() => setShowMenu(!showMenu)}>
                        JD
                    </div>
                    {showMenu && (
                        <div className="profile-dropdown">
                            <button onClick={() => navigate("/")}>Logout</button>
                        </div>
                    )}
                </div>
            </div>
            
            <div className="content-area">
                <div className="dashboard-grid">
                    <div className="dashboard-main">
                        <div className="label-text text-center" style={{ marginTop: 0 }}>Account Balance</div>
                        <div className="card-white" style={{ fontSize: "28px", fontWeight: "700" }}>
                            ₹12,500
                        </div>
                        
                        <div className="link-red" onClick={() => navigate("/history")}>
                            [ View Transactions ]
                        </div>

                        <div className="row gap-10">
                            <div style={{ flex: 1 }}>
                                <div className="label-text text-center">Total Credit</div>
                                <div className="card-green" style={{ fontSize: "20px", fontWeight: "600" }}>
                                    ₹5,000
                                </div>
                            </div>
                            <div style={{ flex: 1 }}>
                                <div className="label-text text-center">Total Debit</div>
                                <div className="card-red" style={{ fontSize: "20px", fontWeight: "600" }}>
                                    ₹2,500
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="dashboard-sidebar">
                        <div className="text-center" style={{ marginTop: "12px", marginBottom: "20px" }}>
                            <span style={{ background: "#c0fb9e", color: "#064e3b", padding: "6px 16px", borderRadius: "20px", fontSize: "14px", fontWeight: "700", boxShadow: "0 2px 8px rgba(192,251,158,0.4)" }}>Recent Transaction</span>
                        </div>
                        <div className="card-white" style={{ padding: "24px" }}>
                            <div className="recent-txn-pill">
                                <span style={{ color: '#111827' }}>Salary</span>
                                <span style={{ color: '#059669', fontWeight: '500' }}>+₹5000</span>
                            </div>
                            <div className="recent-txn-pill">
                                <span style={{ color: '#111827' }}>Food</span>
                                <span style={{ color: '#dc2626', fontWeight: '500' }}>-₹200</span>
                            </div>
                            <div className="recent-txn-pill">
                                <span style={{ color: '#111827' }}>Travel</span>
                                <span style={{ color: '#dc2626', fontWeight: '500' }}>-₹300</span>
                            </div>
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
