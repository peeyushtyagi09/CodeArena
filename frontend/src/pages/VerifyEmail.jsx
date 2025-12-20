import { useLocation, useNavigate, Link } from "react-router-dom";
import React, { useState, useContext } from "react";
import api from "../api/api";
import { AuthContext } from "../auth/AuthContext";

export default function VerifyEmail() {
    const { state } = useLocation();
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const email = state?.email;
    const [otp, setOtp] = useState("");
    const [msg, setMsg] = useState("");
    const [loading, setLoading] = useState(false);
    const [resending, setResending] = useState(false);

    const submit = async e => {
        e.preventDefault();
        if (!email) {
            setMsg("Email not found. Please register again.");
            return;
        }

        setMsg("");
        setLoading(true);

        try {
            const r = await api.post("/verify/confirm", { email, otp });
            login(r.data.accessToken, r.data.refreshToken);
            navigate("/");
        } catch (e) {
            setMsg(e.response?.data?.error || "Verification failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const resendOtp = async () => {
        if (!email) return;
        
        setResending(true);
        setMsg("");
        
        try {
            await api.post("/verify/resend", { email });
            setMsg("Verification code resent! Check your email.");
        } catch (e) {
            setMsg(e.response?.data?.error || "Failed to resend code. Please try again.");
        } finally {
            setResending(false);
        }
    };

    if (!email) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4">
                <div className="card text-center">
                    <h1 className="text-2xl font-bold text-gray-800 mb-4">Email Not Found</h1>
                    <p className="text-gray-600 mb-6">Please register again to receive a verification code.</p>
                    <Link to="/register" className="btn">
                        Go to Register
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="card">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Verify Your Email</h1>
                    <p className="text-gray-600">
                        We sent a verification code to
                    </p>
                    <p className="text-gray-800 font-semibold mt-1">{email}</p>
                </div>

                <form onSubmit={submit} className="space-y-5">
                    <div>
                        <input
                            className="input text-center text-2xl tracking-widest font-mono"
                            type="text"
                            value={otp}
                            placeholder="Enter 6-digit code"
                            onChange={e => {
                                const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                                setOtp(value);
                            }}
                            maxLength={6}
                            required
                            disabled={loading}
                            autoFocus
                        />
                    </div>

                    {msg && (
                        <div className={msg.includes("resent") || msg.includes("Verified") ? "success-message" : "error-message"}>
                            {msg}
                        </div>
                    )}

                    <button 
                        type="submit" 
                        className="btn"
                        disabled={loading || otp.length !== 6}
                    >
                        {loading ? (
                            <>
                                <span className="spinner"></span>
                                Verifying...
                            </>
                        ) : (
                            "Verify Email"
                        )}
                    </button>

                    <div className="text-center space-y-3 pt-4">
                        <button
                            type="button"
                            onClick={resendOtp}
                            disabled={resending}
                            className="text-sm text-blue-600 hover:text-blue-800 underline transition-colors disabled:opacity-50"
                        >
                            {resending ? "Sending..." : "Resend verification code"}
                        </button>
                        <div className="text-sm text-gray-600">
                            Wrong email?{" "}
                            <Link to="/register" className="link font-semibold">
                                Register again
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}