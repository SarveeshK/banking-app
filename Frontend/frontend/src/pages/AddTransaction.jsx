import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddTransaction() {
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false);

    return (
        <div className="app-wrapper">
            <div className="header-bar row justify-between">
                <div className="row gap-10">
                    <button className="btn-back" onClick={() => navigate("/dashboard")}>&lt;</button>
                    <span>Transaction Page</span>
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
                <div className="title-text text-center" style={{ marginTop: "10px" }}>Add Transaction</div>

                <div className="card-gray">
                    <div className="label-text" style={{ marginTop: 0 }}>Amount</div>
                    <input className="input-pill" placeholder="₹ Enter amount" type="number" />

                    <div className="label-text">Transaction Type</div>
                    <div className="row gap-10">
                        <button className="btn-toggle-red" style={{ flex: 1 }}>Debit</button>
                        <button className="btn-toggle-green" style={{ flex: 1 }}>Credit</button>
                    </div>

                    <div className="label-text">Description</div>
                    <input className="input-pill" placeholder="Enter details" type="text" />

                    <div className="label-text">Date</div>
                    <input className="input-pill" placeholder="Select Date" type="date" />
                </div>

                <div className="text-center">
                    <button className="btn-pill-green" onClick={() => navigate("/dashboard")} style={{ marginTop: "10px", width: "100%" }}>
                        Confirm Transaction
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AddTransaction;
