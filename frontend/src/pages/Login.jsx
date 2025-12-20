import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/api";
import { AuthContext } from "../auth/AuthContext";

export default function Login() {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState("");
    const [loading, setLoading] = useState(false);

    const submit = async e => {
        e.preventDefault();
        setMsg("");
        setLoading(true);
        
        try {
            const r = await api.post("/login", { email, password });
            login(r.data.accessToken, r.data.refreshToken);
            navigate("/");
        } catch(e) {
            setMsg(e.response?.data?.error || "Login failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="card">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h1>
                    <p className="text-gray-600">Sign in to your account</p>
                </div>

                <form onSubmit={submit} className="space-y-5">
                    <div>
                        <input 
                            className="input" 
                            type="email"
                            placeholder="Email address"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                            disabled={loading}
                        />
                    </div>
                    
                    <div>
                        <input 
                            className="input" 
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                            disabled={loading}
                        />
                    </div>

                    {msg && (
                        <div className="error-message">
                            {msg}
                        </div>
                    )}

                    <button 
                        type="submit" 
                        className="btn"
                        disabled={loading || !email || !password}
                    >
                        {loading ? (
                            <>
                                <span className="spinner"></span>
                                Logging in...
                            </>
                        ) : (
                            "Sign In"
                        )}
                    </button>

                    <div className="text-center space-y-3 pt-4">
                        <div className="text-sm text-gray-600">
                            Don't have an account?{" "}
                            <Link to="/register" className="link font-semibold">
                                Sign up
                            </Link>
                        </div>
                        <div className="text-sm text-gray-600">
                            Or{" "}
                            <Link to="/login-otp" className="link font-semibold">
                                login with OTP
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}