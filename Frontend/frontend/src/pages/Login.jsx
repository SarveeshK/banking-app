import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();

    return (
        <div className="app-wrapper">
            <div className="header-bar">
                App Name
            </div>
            
            <div className="content-area" style={{ marginTop: "40px" }}>
                <div className="title-text text-center">Login to App Name</div>

                <div className="card-gray">
                    <div className="label-text" style={{ marginTop: 0 }}>Email id</div>
                    <input className="input-pill" placeholder="Enter your email" type="email" />

                    <div className="label-text">Password</div>
                    <input className="input-pill" type="password" placeholder="Enter your password" />
                </div>

                <div className="text-center">
                    <button className="btn-pill-gray" onClick={() => navigate("/dashboard")} style={{ padding: "14px 40px" }}>
                        Login
                    </button>
                </div>

                <div className="login-bottom">
                    <span>Don't have an account ?</span>
                    <button className="btn-pill-gray">Sign up</button>
                </div>
            </div>
        </div>
    );
}

export default Login;
