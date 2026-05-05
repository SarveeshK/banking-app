import { useState } from "react";
import { useNavigate } from "react-router-dom";

function History() {
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false);

    return (
        <div className="app-wrapper wide">
            <div className="header-bar row justify-between">
                <div className="row gap-10">
                    <button className="btn-back" onClick={() => navigate("/dashboard")}>&lt;</button>
                    <span>Transaction History</span>
                </div>
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
                <div className="title-text text-center" style={{ marginTop: "10px", marginBottom: "30px" }}>History</div>

                <div className="history-grid">
                    <div className="history-item green">
                        <div>
                            <div style={{ fontSize: "18px", fontWeight: "600", marginBottom: "6px" }}>Salary</div>
                            <div style={{ fontSize: "14px", color: "#6b7280" }}>15 Apr 2026</div>
                        </div>
                        <div style={{ fontSize: "18px", fontWeight: "700", color: "#059669" }}>+₹5000</div>
                    </div>

                    <div className="history-item red">
                        <div>
                            <div style={{ fontSize: "18px", fontWeight: "600", marginBottom: "6px" }}>Food</div>
                            <div style={{ fontSize: "14px", color: "#6b7280" }}>14 Apr 2026</div>
                        </div>
                        <div style={{ fontSize: "18px", fontWeight: "700", color: "#dc2626" }}>-₹200</div>
                    </div>

                    <div className="history-item red">
                        <div>
                            <div style={{ fontSize: "18px", fontWeight: "600", marginBottom: "6px" }}>Travel</div>
                            <div style={{ fontSize: "14px", color: "#6b7280" }}>13 Apr 2026</div>
                        </div>
                        <div style={{ fontSize: "18px", fontWeight: "700", color: "#dc2626" }}>-₹300</div>
                    </div>

                    <div className="history-item red">
                        <div>
                            <div style={{ fontSize: "18px", fontWeight: "600", marginBottom: "6px" }}>Entertainment</div>
                            <div style={{ fontSize: "14px", color: "#6b7280" }}>12 Apr 2026</div>
                        </div>
                        <div style={{ fontSize: "18px", fontWeight: "700", color: "#dc2626" }}>-₹190</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default History;
