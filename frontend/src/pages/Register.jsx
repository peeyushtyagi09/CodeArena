import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/api";

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const submit = async e => {
        e.preventDefault();
        setMsg("");
        setLoading(true);

        try {
            await api.post("/register", { email, password });
            navigate("/verify", { state: { email } });
        } catch (e) {
            setMsg(e.response?.data?.error || "Registration failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="card">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Create Account</h1>
                    <p className="text-gray-600">Sign up to get started</p>
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
                            placeholder="Password (min 8 chars, uppercase, lowercase, number)"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                            disabled={loading}
                        />
                        <p className="text-xs text-gray-500 mt-1">
                            Must contain uppercase, lowercase, and number
                        </p>
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
                                Creating account...
                            </>
                        ) : (
                            "Create Account"
                        )}
                    </button>

                    <div className="text-center pt-4">
                        <p className="text-sm text-gray-600">
                            Already have an account?{" "}
                            <Link to="/login" className="link font-semibold">
                                Sign in
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}
