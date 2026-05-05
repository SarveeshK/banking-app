import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAccount } from "../api";

function History() {
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false);
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    const accountNumber = localStorage.getItem("accountNumber");

    useEffect(() => {
        if (!accountNumber) {
            navigate("/");
            return;
        }
        getAccount(accountNumber).then(res => {
            if (res.status === "success") {
                setTransactions(res.account.transactions);
            }
            setLoading(false);
        });
    }, [accountNumber, navigate]);

    const handleLogout = () => {
        localStorage.removeItem("accountNumber");
        localStorage.removeItem("userName");
        navigate("/");
    };

    const userName = localStorage.getItem("userName") || "User";
    const initials = userName.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase();

    return (
        <div className="app-wrapper wide">
            <div className="header-bar row justify-between">
                <div className="row gap-10">
                    <button className="btn-back" onClick={() => navigate("/dashboard")}>&lt;</button>
                    <span>Transaction History</span>
                </div>
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
                {loading ? (
                    <div style={{ textAlign: "center", marginTop: "40px", color: "#64748b" }}>Loading transactions...</div>
                ) : transactions.length === 0 ? (
                    <div style={{ textAlign: "center", marginTop: "40px", color: "#64748b" }}>No transactions found.</div>
                ) : (
                    <div className="history-grid">
                        {transactions.map((txn) => (
                            <div className={`history-item ${txn.type === "CREDIT" ? "green" : "red"}`} key={txn.id || Math.random()}>
                                <div>
                                    <div style={{ fontSize: "16px", fontWeight: "600", marginBottom: "4px" }}>{txn.category}</div>
                                    <div style={{ fontSize: "13px", color: "#64748b" }}>Bal: ₹{txn.balanceAfter}</div>
                                </div>
                                <div style={{ fontSize: "18px", fontWeight: "700", color: txn.type === "CREDIT" ? "#059669" : "#dc2626" }}>
                                    {txn.type === "CREDIT" ? "+" : "-"}₹{txn.amount}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default History;
