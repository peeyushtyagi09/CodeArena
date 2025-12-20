import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/api";
import { AuthContext } from "../auth/AuthContext";

export default function LoginOtp() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);

  const request = async () => {
    if (!email) {
      setMsg("Please enter your email address.");
      return;
    }

    setMsg("");
    setLoading(true);

    try {
      await api.post("/login/otp/request", { email });
      setStep(2);
      setMsg("Verification code sent! Check your email.");
    } catch (e) {
      setMsg(e.response?.data?.error || "Failed to send code. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const verify = async () => {
    if (!otp || otp.length !== 6) {
      setMsg("Please enter a valid 6-digit code.");
      return;
    }

    setMsg("");
    setLoading(true);

    try {
      const r = await api.post("/login/otp/verify", { email, otp });
      login(r.data.accessToken, r.data.refreshToken);
      navigate("/");
    } catch (e) {
      setMsg(e.response?.data?.error || "Invalid code. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const resendOtp = async () => {
    setResending(true);
    setMsg("");
    
    try {
      await api.post("/login/otp/request", { email });
      setMsg("Code resent! Check your email.");
    } catch (e) {
      setMsg(e.response?.data?.error || "Failed to resend code.");
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="card">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {step === 1 ? "Passwordless Login" : "Enter Verification Code"}
          </h1>
          <p className="text-gray-600">
            {step === 1 
              ? "Enter your email to receive a login code"
              : `Code sent to ${email}`
            }
          </p>
        </div>

        {step === 1 ? (
          <div className="space-y-5">
            <div>
              <input 
                className="input" 
                type="email"
                placeholder="Email address"
                value={email}
                onChange={e => setEmail(e.target.value)}
                disabled={loading}
                required
              />
            </div>

            {msg && (
              <div className="error-message">
                {msg}
              </div>
            )}

            <button 
              className="btn"
              onClick={request}
              disabled={loading || !email}
            >
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Sending code...
                </>
              ) : (
                "Send Login Code"
              )}
            </button>

            <div className="text-center pt-4">
              <p className="text-sm text-gray-600">
                Prefer password?{" "}
                <Link to="/login" className="link font-semibold">
                  Sign in with password
                </Link>
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-5">
            <div>
              <input
                className="input text-center text-2xl tracking-widest font-mono"
                type="text"
                placeholder="Enter 6-digit code"
                value={otp}
                onChange={e => {
                  const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                  setOtp(value);
                }}
                maxLength={6}
                disabled={loading}
                autoFocus
                required
              />
            </div>

            {msg && (
              <div className={msg.includes("sent") || msg.includes("resent") ? "success-message" : "error-message"}>
                {msg}
              </div>
            )}

            <button 
              className="btn"
              onClick={verify}
              disabled={loading || otp.length !== 6}
            >
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Verifying...
                </>
              ) : (
                "Verify & Login"
              )}
            </button>

            <div className="text-center space-y-3 pt-4">
              <button
                type="button"
                onClick={resendOtp}
                disabled={resending}
                className="text-sm text-blue-600 hover:text-blue-800 underline transition-colors disabled:opacity-50"
              >
                {resending ? "Sending..." : "Resend code"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setStep(1);
                  setOtp("");
                  setMsg("");
                }}
                className="text-sm text-gray-600 hover:text-gray-800 underline transition-colors"
              >
                Use different email
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
