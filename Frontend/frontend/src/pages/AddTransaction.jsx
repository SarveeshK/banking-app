import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createTransaction } from "../api";

function AddTransaction() {
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false);
    
    const [type, setType] = useState("CREDIT");
    const [category, setCategory] = useState("Salary");
    const [amount, setAmount] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const accountNumber = localStorage.getItem("accountNumber");

    const handleLogout = () => {
        localStorage.removeItem("accountNumber");
        localStorage.removeItem("userName");
        navigate("/");
    };

    const userName = localStorage.getItem("userName") || "User";
    const initials = userName.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase();

    const handleSubmit = async () => {
        if (!accountNumber) {
            navigate("/");
            return;
        }
        if (!amount || isNaN(amount) || Number(amount) <= 0) {
            return setError("Please enter a valid amount.");
        }
        
        setLoading(true);
        setError("");
        
        try {
            // userId isn't strictly validated, passing a placeholder
            const res = await createTransaction(accountNumber, "user_123", type, Number(amount), category);
            if (res.status === "success") {
                navigate("/dashboard");
            } else {
                setError(res.message);
            }
        } catch (err) {
            setError("Server error while saving transaction.");
        }
        setLoading(false);
    };

    return (
        <div className="app-wrapper">
            <div className="header-bar row justify-between">
                <div className="row gap-10">
                    <button className="btn-back" onClick={() => navigate("/dashboard")}>&lt;</button>
                    <span>Transaction Page</span>
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
                {error && <div style={{ color: "red", textAlign: "center", marginBottom: "16px", fontWeight: "600" }}>{error}</div>}

                <div className="label-text" style={{ marginTop: 0 }}>Transaction Type</div>
                <div className="row gap-10" style={{ marginBottom: "24px" }}>
                    <button 
                        className="btn-toggle-green" 
                        style={{ flex: 1, borderColor: type === "CREDIT" ? "#4ade80" : "transparent", background: type === "CREDIT" ? "#f0fdf4" : "#ffffff", color: type === "CREDIT" ? "#166534" : "#374151" }}
                        onClick={() => setType("CREDIT")}
                    >
                        Credit
                    </button>
                    <button 
                        className="btn-toggle-red" 
                        style={{ flex: 1, borderColor: type === "DEBIT" ? "#f87171" : "transparent", background: type === "DEBIT" ? "#fef2f2" : "#ffffff", color: type === "DEBIT" ? "#991b1b" : "#374151" }}
                        onClick={() => setType("DEBIT")}
                    >
                        Debit
                    </button>
                </div>

                <div className="label-text">Category</div>
                <select className="input-pill" value={category} onChange={e => setCategory(e.target.value)} style={{ appearance: "none", backgroundImage: "url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23111827%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')", backgroundRepeat: "no-repeat", backgroundPosition: "right 20px top 50%", backgroundSize: "12px auto" }}>
                    <option value="Salary">Salary</option>
                    <option value="Food">Food</option>
                    <option value="Travel">Travel</option>
                    <option value="Shopping">Shopping</option>
                    <option value="Bills">Bills</option>
                    <option value="Other">Other</option>
                </select>

                <div className="label-text">Amount</div>
                <input 
                    type="number" 
                    className="input-pill" 
                    placeholder="Enter amount" 
                    value={amount}
                    onChange={e => setAmount(e.target.value)}
                />

                <div style={{ marginTop: "40px" }}>
                    <button className="btn-pill-green" style={{ width: "100%" }} onClick={handleSubmit} disabled={loading}>
                        {loading ? "Saving..." : "Add Transaction"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AddTransaction;
