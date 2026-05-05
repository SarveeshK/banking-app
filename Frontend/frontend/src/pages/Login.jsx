import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, signupUser } from "../api";

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        if (!email || !password) return setError("Please enter Email and Password");
        setLoading(true);
        setError("");
        try {
            const res = await loginUser(email, password);
            if (res.status === "success") {
                localStorage.setItem("accountNumber", res.accountNumber);
                localStorage.setItem("userName", res.name);
                navigate("/dashboard");
            } else {
                setError(res.message);
            }
        } catch (err) {
            setError("Server error.");
        }
        setLoading(false);
    };

    const handleSignup = async () => {
        if (!email || !password) return setError("Please enter Email and Password");
        setLoading(true);
        setError("");
        try {
            const res = await signupUser(email, password);
            if (res.status === "success") {
                localStorage.setItem("accountNumber", res.accountNumber);
                localStorage.setItem("userName", res.name);
                navigate("/dashboard");
            } else {
                setError(res.message);
            }
        } catch (err) {
            setError("Server error.");
        }
        setLoading(false);
    };

    return (
        <div className="app-wrapper" style={{ justifyContent: "center" }}>
            <div className="content-area" style={{ marginTop: "40px" }}>
                <div className="title-text text-center" style={{ fontSize: "32px", marginBottom: "40px" }}>
                    Welcome to <span style={{ color: "#0d9488" }}>Bank</span>
                </div>
                
                {error && <div style={{ color: "red", textAlign: "center", marginBottom: "16px", fontWeight: "600" }}>{error}</div>}

                <div className="label-text">Email Address</div>
                <input 
                    type="email" 
                    className="input-pill" 
                    placeholder="name@example.com" 
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />

                <div className="label-text" style={{ marginTop: "24px" }}>Password</div>
                <input 
                    type="password" 
                    className="input-pill" 
                    placeholder="Enter your password" 
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />

                <div style={{ marginTop: "32px" }}>
                    <button className="btn-pill-green" onClick={handleLogin} style={{ width: "100%" }} disabled={loading}>
                        {loading ? "Loading..." : "Login"}
                    </button>
                </div>
                
                <div className="login-bottom">
                    <span style={{ display: 'inline-block', marginRight: '8px', marginBottom: 0 }}>Don't have an account?</span>
                    <strong style={{ color: '#0d9488', cursor: 'pointer' }} onClick={handleSignup}>Sign up</strong>
                </div>
            </div>
        </div>
    );
}

export default Login;
