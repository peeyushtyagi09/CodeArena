import api from "../api/api";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";

export default function Dashboard() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const logoutEverywhere = async () => {
    setLoading(true);
    setMsg("");
    
    try {
      await api.post("/logout-everywhere");
      setMsg("Logged out successfully!");
      setTimeout(() => {
        logout();
        navigate("/login");
      }, 1000);
    } catch (e) {
      setMsg(e.response?.data?.error || "Logout failed, but clearing local session...");
      setTimeout(() => {
        logout();
        navigate("/login");
      }, 2000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="card">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome!</h1>
          <p className="text-gray-600">You are successfully authenticated</p>
        </div>

        {msg && (
          <div className={msg.includes("successfully") ? "success-message mb-4" : "error-message mb-4"}>
            {msg}
          </div>
        )}

        <div className="space-y-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-2">Session Status</p>
            <p className="text-green-600 font-semibold">✓ Active</p>
          </div>

          <button
            className="btn bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800"
            onClick={logoutEverywhere}
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner"></span>
                Logging out...
              </>
            ) : (
              "Logout Everywhere"
            )}
          </button>

          <p className="text-xs text-gray-500 text-center mt-4">
            This will log you out from all devices and sessions
          </p>
        </div>
      </div>
    </div>
  );
}
